import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config'; // Importa tus instancias de FB
import { setLoading, setUser, clearUser } from '../store/actions';
import { logActivity } from './logger.service'; // Usamos la función logActivity
import { handleError, getFriendlyErrorMessage } from './error.service';
import { traceExecution } from '../utils/traceExecution';
import { state } from '../store/state.js';

export const initAuthListener = traceExecution('auth.service', 'initAuthListener')(() => {
	return new Promise((resolve) => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				setLoading(true);
				try {
					const sessionData = await fetchUserSessionContext(user.uid, user.email);
					if (sessionData) {
						setUser(sessionData);
						logActivity({
							type: 'AUTH_SESSION_RESUMED',
							message: `Sesión reanudada para ${sessionData.name}`,
							userId: sessionData.uid,
							businessId: sessionData.businessId,
						});
						resolve(user);
					} else {
						throw new Error('AUTH_USER_CONTEXT_NOT_FOUND');
					}
				} catch (error) {
					handleError(error, 'auth.service:initAuthListener'); 
					await internalLogout(); 
					resolve(null);
				} finally {
					setLoading(false);
				}
			} else {
				clearUser();
				setLoading(false);
				resolve(null);
			}
		}, (error) => {
			handleError(error, 'auth.service:onAuthStateChangedError');
			clearUser();
			setLoading(false);
			resolve(null);
		});
	});
});

export const loginEmailPassword = traceExecution('auth.service', 'loginEmailPassword')(async (email, password) => {
	setLoading(true);
	let sessionData = null;
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		const user = userCredential.user;
		sessionData = await fetchUserSessionContext(user.uid, user.email);
		if (!sessionData) {
	  		throw new Error('AUTH_USER_CONTEXT_NOT_FOUND');
	  	}
	  	setUser(sessionData);
	  	logActivity({
	  		type: 'AUTH_LOGIN',
	  		message: `Inicio de sesión exitoso para ${sessionData.name}`,
	  		userId: sessionData.uid,
	  		businessId: sessionData.businessId,
	  		departmentId: sessionData.departmentId,
	  	});
	  	setLoading(false);
	  	return { 
	  		success: true, 
	  		user: sessionData 
	  	};
	} catch (error) {
		setLoading(false);
		handleError(error, 'auth.service:loginEmailPassword');
		clearUser();
		const friendlyMessage = getFriendlyErrorMessage(error.message || error.code);
		return { 
			success: false, 
			message: friendlyMessage || 'Error desconocido'
		};
	}
});

export const logout = traceExecution('auth.service', 'logout')(async () => {
	setLoading(true);
	try {
		const userIdForLog = state.user ? state.user.uid : 'unknown'; 
		logActivity({
			type: 'AUTH_LOGOUT',
			message: 'Usuario cerró sesión',
			userId: userIdForLog,
		});
		await internalLogout();
	} catch (error) {
		handleError(error, 'auth.service:logout');
		clearUser();
	} finally {
		setLoading(false);
	}
});

const internalLogout = async () => {
	try {
		await signOut(auth);
	} catch (signOutError) {
		handleError(signOutError, 'auth.service:internalLogout:signOut');
	} finally {
		clearUser();
	}
};

export const tracedLoadUserData = traceExecution('auth.service', 'tracedLoadUserData')(async (user) => {
	try {
		const sessionData = await fetchUserSessionContext(user.uid, user.email);
		if (sessionData) {
			return {
				user: {
					uid: sessionData.uid,
					email: sessionData.email,
					name: sessionData.name,
					role: sessionData.role
				},
				business: {
					id: sessionData.businessId,
					departmentId: sessionData.departmentId
				}
			};
		}
		return null;
	} catch (error) {
		Logger.error('Error en tracedLoadUserData después de fetchUserSessionContext:', error);
		return null; 
	}
});

export const login = loginEmailPassword;
const fetchUserSessionContext = async (uid, email) => {
	const userDirRef = doc(db, 'user_directory', uid);
	const userDirSnap = await getDoc(userDirRef);

	// >>> AÑADIR ESTAS LÍNEAS PARA DEPURAR <<<
	console.log('--- DEBUG: Datos leídos de user_directory ---');
	console.log('userDirSnap.exists():', userDirSnap.exists())

	if (userDirSnap.exists()) {
		const userDirData = userDirSnap.data();
		console.log('userDirData:', userDirData);
		console.log('Tipo de businessId:', typeof userDirData.businessId);
		console.log('Valor de businessId:', userDirData.businessId);

		if (userDirData.role === 'super_admin') {
			const superAdminRef = doc(db, 'super_admins', uid);
			const superAdminSnap = await getDoc(superAdminRef);
			let adminName = 'Super Admin';
			if (superAdminSnap.exists()) {
				adminName = superAdminSnap.data()['name '] || superAdminSnap.data().name || 'Super Admin';
			} else {
				console.warn(`Super Admin con UID ${uid} no encontrado en super_admins.`);
			}
			return { 
				uid, 
				email, 
				name: adminName, 
				businessId: null, 
				departmentId: null, 
				role: 'super_admin' 
			};
		}

	console.log('[DEBUG] userDirData:', userDirData); // O usa el log más detallado de arriba
	const { businessId } = userDirData;
	if (!businessId) throw new Error('AUTH_NO_BUSINESS_ID');

	// --- PASO 3: Obtener Perfil del Negocio (LEYENDO jobTitle) ---
	const userProfileRef = doc(db, 'businesses', businessId, 'users', uid);
	const userProfileSnap = await getDoc(userProfileRef);

	if (!userProfileSnap.exists()) throw new Error('AUTH_USER_PROFILE_NOT_FOUND');

	const userProfileData = userProfileSnap.data();
	// --- ¡CAMBIO AQUÍ! Leemos 'name', 'jobTitle', 'departmentIds' ---
	const { name, jobTitle, departmentIds } = userProfileData;

	// Verificación y Mapeo de Rol
	if (!name || !jobTitle) {
		// La advertencia original ahora es más precisa
		console.warn(`Perfil de usuario ${uid} en negocio ${businessId} incompleto. Falta name o jobTitle.`);
		// Puedes decidir si lanzar un error o continuar con valores por defecto
	}

	// --- ¡CAMBIO AQUÍ! Mapeamos jobTitle a role ---
	let userRole = 'user'; // Rol por defecto si jobTitle no existe o no coincide
	if (jobTitle === 'Propietario') {
	  userRole = 'admin';
	} else if (jobTitle === 'Cajero') {
	  userRole = 'cajero';
	} else if (jobTitle === 'Empleado') { // Añadimos mapeo para 'Empleado' si lo usas
	  userRole = 'user';
	}

	return {
	  uid: uid,
	  email: email,
	  name: name || email, // Usamos email como fallback
	  businessId: businessId,
	  departmentId: (departmentIds && departmentIds.length > 0) ? departmentIds[0] : null, // Tomamos el primero o null
	  role: userRole, // Usamos el rol mapeado
	};

  } else {
	console.log('El documento NO existe en user_directory para UID:', uid);
	throw new Error('AUTH_USER_NOT_IN_DIRECTORY');
  }
};