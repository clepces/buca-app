// services/auth.service.js

import { 
  getAuth, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase-config'; // Importa tus instancias de FB
import { setLoading, setUser, clearUser } from '../store/actions';
import { logActivity } from './logger.service'; // Usamos la función logActivity
import { handleError } from './error.service';
import { traceExecution } from '../utils/traceExecution';
import { state } from '../store/state.js';
/**
 * Inicia el listener de autenticación de Firebase.
 * Se ejecuta al cargar la app para verificar si hay una sesión activa.
 */
export const initAuthListener = traceExecution('auth.service', 'initAuthListener')(() => {
  return new Promise((resolve) => {
    // Usamos 'unsubscribe' para poder limpiar el listener si es necesario, aunque aquí no lo usamos.
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setLoading(true); // Mostrar loader global
        try {
          // El usuario está autenticado en Firebase, ahora buscamos su contexto en Firestore
          const sessionData = await fetchUserSessionContext(user.uid, user.email);
          
          if (sessionData) {
            // ¡Contexto encontrado! Actualizamos el estado global (esto carga permisos)
            setUser(sessionData); // Llama a la ACCIÓN que actualiza state.js
            
            // Registramos el evento (opcional, podría ir dentro de setUser si siempre quieres loguearlo)
            logActivity({
              type: 'AUTH_SESSION_RESUMED',
              message: `Sesión reanudada para ${sessionData.name}`,
              userId: sessionData.uid,
              businessId: sessionData.businessId, // Será null para super_admin
            });
            resolve(user); // Resolvemos la promesa con el usuario
          } else {
            // El usuario existe en Firebase Auth pero no tiene contexto en nuestra BD (caso raro/error)
            throw new Error('AUTH_USER_CONTEXT_NOT_FOUND');
          }
        } catch (error) {
          // Si falla la carga del contexto, manejamos el error y forzamos logout
          handleError(error, 'auth.service:initAuthListener'); 
          await internalLogout(); // Forzar cierre de sesión en Firebase y limpiar estado
          resolve(null); // Resolvemos como null porque la sesión no es válida
        } finally {
          setLoading(false); // Ocultar loader global
        }
      } else {
        // No hay usuario en Firebase Auth, aseguramos que el estado local esté limpio
        clearUser(); // Llama a la ACCIÓN que resetea state.js
        setLoading(false); // Ocultar loader si estaba visible
        resolve(null); // Resolvemos como null
      }
    }, (error) => {
        // Manejo de errores del propio onAuthStateChanged (raro)
        handleError(error, 'auth.service:onAuthStateChangedError');
        clearUser();
        setLoading(false);
        resolve(null);
    });
    // Podríamos devolver 'unsubscribe' si quisiéramos detener el listener manualmente en algún punto.
  });
});


/**
 * Maneja el inicio de sesión con email y contraseña.
 * Implementa la cadena de 3 pasos.
 */
export const loginEmailPassword = traceExecution('auth.service', 'loginEmailPassword')(async (email, password) => {
  setLoading(true);
  let sessionData = null; // Para poder usarlo en el log de éxito
  try {
    // --- PASO 1: Autenticación (Firebase Auth) ---
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // --- PASOS 2 y 3: Obtener Contexto de Sesión (Firestore) ---
    sessionData = await fetchUserSessionContext(user.uid, user.email);

    if (!sessionData) {
      // Si no se encuentra el contexto después de un login exitoso, es un error grave de configuración
      throw new Error('AUTH_USER_CONTEXT_NOT_FOUND');
    }

    // ¡ÉXITO! Guardar sesión completa en el state (via action)
    setUser(sessionData); // Llama a la ACCIÓN (esto carga permisos también)

    // Registrar en el log (AHORA tenemos sessionData disponible)
    logActivity({
      type: 'AUTH_LOGIN',
      message: `Inicio de sesión exitoso para ${sessionData.name}`,
      userId: sessionData.uid,
      businessId: sessionData.businessId, // Null para admin
      departmentId: sessionData.departmentId, // Null para admin
    });

    setLoading(false);
    // Devolvemos éxito y los datos de sesión para que Login.js pueda usarlos si necesita
    return { success: true, user: sessionData }; 

  } catch (error) {
    setLoading(false);
    // Manejamos el error (muestra toast y loguea)
    handleError(error, 'auth.service:loginEmailPassword'); 
    // Aseguramos que el estado quede limpio si el login falló en cualquier punto
    clearUser(); 
    // Devolvemos fracaso y el mensaje de error para Login.js
    // Usamos el mensaje traducido por handleError si está disponible
    const friendlyMessage = getFriendlyErrorMessage(error.message || error.code); // Necesitarías exportar esta función de error.service o duplicarla aquí
    return { success: false, message: friendlyMessage || 'Error desconocido' };
  }
});

// Helper para obtener mensajes amigables (alternativa a exportar desde error.service)
function getFriendlyErrorMessage(errorCode) {
    switch (errorCode) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
        case 'auth/invalid-credential': return 'Correo o contraseña incorrectos.';
        case 'auth/invalid-email': return 'El formato del correo no es válido.';
        case 'AUTH_USER_CONTEXT_NOT_FOUND': return 'Error al cargar el perfil de usuario.';
        // ... otros casos ...
        default: return 'Ocurrió un error inesperado.';
    }
}


/**
 * --- ¡FUNCIÓN MODIFICADA! ---
 * Cierra la sesión del usuario.
 */
export const logout = traceExecution('auth.service', 'logout')(async () => {
  setLoading(true);
  try {
    // --- ¡CAMBIO DE ORDEN! ---
    // 1. Registra el evento de logout PRIMERO (mientras el usuario aún está autenticado)
    //    Usamos el estado global para obtener el userId si está disponible.
    const userIdForLog = state.user ? state.user.uid : 'unknown'; 
    logActivity({
      type: 'AUTH_LOGOUT',
      message: 'Usuario cerró sesión',
      userId: userIdForLog, // Añadimos el ID si lo tenemos
    });
    
    // 2. AHORA cierra la sesión de Firebase Y limpia el estado local
    await internalLogout();
    // -------------------------

  } catch (error) {
    // Si algo falla (ej. el logActivity o el signOut), lo manejamos
    handleError(error, 'auth.service:logout'); 
    // Igualmente intentamos limpiar el estado local por si acaso
    clearUser();
  } finally {
    setLoading(false);
  }
});


/**
 * Función interna para cerrar sesión en Firebase y limpiar el estado.
 */
const internalLogout = async () => {
  try {
      await signOut(auth); // Cierra sesión en Firebase
  } catch (signOutError) {
      // Manejar error de signOut si ocurre (raro)
      handleError(signOutError, 'auth.service:internalLogout:signOut');
  } finally {
       // SIEMPRE limpia el estado local, incluso si signOut falla
       clearUser(); // Llama a la ACCIÓN que resetea state.js
  }
};


/**
 * Función para cargar datos de usuario con tracing (usada por App.js al recargar)
 */
export const tracedLoadUserData = traceExecution('auth.service', 'tracedLoadUserData')(async (user) => {
  // Esta función ahora es solo un wrapper sobre fetchUserSessionContext con tracing
  try {
    const sessionData = await fetchUserSessionContext(user.uid, user.email);
    
    if (sessionData) {
      // Formateamos los datos para que coincidan con la estructura que App.js usaba ANTES.
      // Es MEJOR si App.js usa directamente la estructura de sessionData.
      return {
        user: {
          uid: sessionData.uid,
          email: sessionData.email,
          name: sessionData.name,
          role: sessionData.role // Incluimos el rol aquí
        },
        business: {
          // Usamos 'null' si es admin, o el ID si es usuario regular
          id: sessionData.businessId, 
          // Mantenemos 'admin_view' como fallback por si App.js lo necesita temporalmente
          // pero lo ideal es eliminar 'admin_view' y usar solo 'null'
          // id: sessionData.businessId || 'admin_view', 
          departmentId: sessionData.departmentId // Incluimos departmentId
        }
      };
    }
    
    return null; // Devuelve null si fetchUserSessionContext falla o devuelve null
  } catch (error) {
    // fetchUserSessionContext ya debería haber llamado a handleError.
    // Aquí solo nos aseguramos de devolver null para que App.js muestre el login.
    // Podríamos añadir un log adicional si queremos:
    // Logger.error('Error en tracedLoadUserData después de fetchUserSessionContext:', error);
    return null; 
  }
});

/**
 * Alias para loginEmailPassword (usado por Login.js)
 */
export const login = loginEmailPassword;


/**
 * --- FUNCIÓN CENTRAL DE CONTEXTO (SIN CAMBIOS RESPECTO A LA ÚLTIMA VERSIÓN) ---
 * Realiza los pasos 2 y 3: Buscar en user_directory y luego en el perfil del negocio/super_admin.
 * @param {string} uid - El UID del usuario de Firebase Auth
 * @param {string} email - El email del usuario de Firebase Auth (opcional, para fallback)
 * @returns {object | null} - El objeto sessionData completo o lanza un error si falla.
 */
const fetchUserSessionContext = async (uid, email) => {
  
  // --- PASO 2: Obtener el documento del directorio ---
  const userDirRef = doc(db, 'user_directory', uid);
  const userDirSnap = await getDoc(userDirRef);

  if (userDirSnap.exists()) {
    const userDirData = userDirSnap.data();

    // --- LÓGICA PARA DISTINGUIR ROLES ---
    // CASO A: Es un Super Admin (identificado por el rol en el directorio)
    if (userDirData.role === 'super_admin') {
      const superAdminRef = doc(db, 'super_admins', uid);
      const superAdminSnap = await getDoc(superAdminRef);
      
      let adminName = 'Super Admin'; // Nombre por defecto
      if (superAdminSnap.exists()) {
        // Manejamos el posible espacio en "name "
        adminName = superAdminSnap.data()['name '] || superAdminSnap.data().name || 'Super Admin';
      } else {
          // Advertencia: El super admin está en el directorio pero no en la colección super_admins
          console.warn(`Super Admin con UID ${uid} encontrado en user_directory pero no en super_admins collection.`);
      }

      return {
        uid: uid,
        email: email, // Usamos el email de Firebase Auth
        name: adminName,
        businessId: null, // super_admin no tiene businessId
        departmentId: null, // super_admin no tiene departmentId
        role: 'super_admin', // Rol global
      };
    }

    // CASO B: Es un usuario regular, DEBE tener un businessId
    const { businessId } = userDirData;
    if (!businessId) {
      // Si no es super_admin y no tiene businessId, es un error de configuración
      throw new Error('AUTH_NO_BUSINESS_ID');
    }

    // --- PASO 3: Obtener Perfil del Negocio ---
    const userProfileRef = doc(db, 'businesses', businessId, 'users', uid);
    const userProfileSnap = await getDoc(userProfileRef);

    if (!userProfileSnap.exists()) {
      // El usuario está en el directorio y tiene businessId, pero no existe en la subcolección users del negocio
      throw new Error('AUTH_USER_PROFILE_NOT_FOUND');
    }
    
    // Asumimos que el perfil del usuario en el negocio tiene 'name', 'role', y 'departmentId'
    const userProfileData = userProfileSnap.data();
    const { name, role, departmentId } = userProfileData;

    // Verificación adicional (opcional pero recomendada)
    if (!name || !role) {
        console.warn(`Perfil de usuario ${uid} en negocio ${businessId} incompleto. Falta name o role.`);
        // Podrías lanzar un error o usar valores por defecto
    }


    // ¡Contexto completo de usuario regular encontrado!
    return {
      uid: uid,
      email: email, // Usamos el email de Firebase Auth
      name: name || email, // Usamos email como fallback si no hay nombre
      businessId: businessId,
      departmentId: departmentId || null, // Usamos null si no hay departmentId
      role: role || 'user', // Usamos 'user' como rol por defecto si no existe
    };
    
  } else {
    // El usuario está en Firebase Auth pero NO en user_directory.
    // Podría ser un usuario recién creado que aún no se ha añadido al directorio,
    // o un error. Por ahora, lo tratamos como error.
    throw new Error('AUTH_USER_NOT_IN_DIRECTORY');
  }
};