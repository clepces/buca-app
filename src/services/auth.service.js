// ======================================================
// ARCHIVO: src/services/auth.service.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.4 - FILE: 1.0.4
// CORRECCIÓN: (Refactorización de Roles)
// 1. Se importa 'ROLES' desde 'roles.config.js'.
// 2. Se actualiza el mapeo de 'jobTitle' a los nuevos
//    roles (Propietario, Operador, Cajero).
// ======================================================

import { getAuth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config.js';
import { setLoading, setUser, clearUser } from '../store/actions';
import { logActivity, Logger } from './logger.service.js';
import { handleError, getFriendlyErrorMessage } from './error.service.js';
import { traceExecution } from '../utils/traceExecution.js';
import { state } from '../store/state.js';

// --- ¡INICIO DE CORRECCIÓN! ---
// Importamos los nuevos roles
import { ROLES } from './roles.config.js'; 
// --- FIN DE CORRECCIÓN! ---

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
							context: 'auth.service:initAuthListener',
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
            context: 'auth.service:loginEmailPassword',
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
		Logger.error('Error en auth.service:loginEmailPassword', error); 

		// --- ¡INICIO DE CORRECCIÓN! ---
		// Se prioriza 'error.code' para que el servicio
		// de errores pueda traducir 'auth/invalid-credential'.
		const friendlyMessage = getFriendlyErrorMessage(error.code || error.message);
		// --- FIN DE CORRECCIÓN! ---

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
			context: 'auth.service:logout',
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

// --- (El resto del archivo 'auth.service.js' no tiene cambios) ---

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
				role: ROLES.SUPER_ADMIN // Usamos la constante
			};
		}

	console.log('[DEBUG] userDirData:', userDirData);
	const { businessId } = userDirData;
	if (!businessId) throw new Error('AUTH_NO_BUSINESS_ID');

	const userProfileRef = doc(db, 'businesses', businessId, 'users', uid);
	const userProfileSnap = await getDoc(userProfileRef);

	if (!userProfileSnap.exists()) throw new Error('AUTH_USER_PROFILE_NOT_FOUND');

	const userProfileData = userProfileSnap.data();
	const { name, jobTitle, departmentIds } = userProfileData;

	if (!name || !jobTitle) {
		console.warn(`Perfil de usuario ${uid} en negocio ${businessId} incompleto. Falta name o jobTitle.`);
	}

	let userRole = ROLES.OPERADOR; // Rol por defecto es Operador
	if (jobTitle === 'Propietario') {
    	userRole = ROLES.PROPIETARIO;
	} else if (jobTitle === 'Cajero') {
		userRole = ROLES.CAJERO;
	} else if (jobTitle === 'Empleado') { 
		userRole = ROLES.OPERADOR;
	}

	return {
	  uid: uid,
	  email: email,
	  name: name || email,
	  businessId: businessId,
	  departmentId: (departmentIds && departmentIds.length > 0) ? departmentIds[0] : null,
	  role: userRole,
	};

  } else {
	console.log('El documento NO existe en user_directory para UID:', uid);
	throw new Error('AUTH_USER_NOT_IN_DIRECTORY');
  }
};