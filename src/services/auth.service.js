// ARCHIVO CORREGIDO Y FINAL: src/services/auth.service.js

import { auth, db } from '../firebase-config.js';
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, query, getDocs, doc, getDoc } from "firebase/firestore";
import { loadUserPermissions } from './permissions.service.js';
import { Logger } from './logger.service.js';
import { errorService } from './error.service.js';
import { traceExecution } from '../utils/traceExecution.js';

/**
 * Carga los datos del usuario y del negocio basado en la nueva estructura de user_directory.
 * @param {object} firebaseUser - El objeto de usuario de Firebase Auth.
 * @returns {object|null} Un objeto con los datos de sesión o null si hay un error.
 */
const loadUserDataAndPermissions = async (firebaseUser) => {
    // 1. Buscamos el UID del usuario en el nuevo directorio central.
    const directoryRef = doc(db, "user_directory", firebaseUser.uid);
    const directorySnap = await getDoc(directoryRef);

    if (!directorySnap.exists()) {
        await signOut(auth);
        errorService.handle(new Error("User not found in directory"), "Tu usuario no está registrado en el sistema.");
        return null;
    }

    const directoryData = directorySnap.data();

    // 2. Verificamos si es un Super Admin.
    if (directoryData.role === 'super_admin') {
        Logger.info(`Bienvenido, Super Admin ${firebaseUser.email}`);
        const userRoles = ['super_admin']; // Usamos el rol correcto para el super admin
        loadUserPermissions(userRoles);
        return {
            user: { 
                uid: firebaseUser.uid, 
                email: firebaseUser.email, 
                name: 'Admin B.U.C.A', // Nombre genérico para el super admin
                roles: userRoles 
            },
            business: { 
                id: 'admin_view', 
                name: 'Panel de Super Admin' 
            }
        };
    }
    
    // 3. Si no, es un usuario de un negocio. Obtenemos los detalles.
    if (directoryData.businessId) {
        const businessId = directoryData.businessId;
        const businessRef = doc(db, "businesses", businessId);
        // La información del usuario (nombre, etc.) ahora está DENTRO de la colección de usuarios del negocio.
        const userInBusinessRef = doc(db, `businesses/${businessId}/users`, firebaseUser.uid);
        
        const [businessSnap, userSnap] = await Promise.all([getDoc(businessRef), getDoc(userInBusinessRef)]);

        if (!businessSnap.exists() || !userSnap.exists()) {
            await signOut(auth);
            errorService.handle(new Error("Business or user role not found"), "Error de configuración de la cuenta.");
            return null;
        }

        const userData = userSnap.data();
        const userRoles = userData.role ? [userData.role] : ['user']; // Usamos el rol definido en el documento del usuario.
        loadUserPermissions(userRoles);
        
        return {
            user: { 
                uid: firebaseUser.uid, 
                email: firebaseUser.email, 
                ...userData // Esto incluye el 'name' y 'role' del documento.
            },
            business: { 
                id: businessId, 
                ...businessSnap.data().info // La info del negocio (nombre, plan, etc.)
            }
        };
    }

    // Si no es ni super admin ni tiene businessId, es un error de configuración.
    await signOut(auth);
    errorService.handle(new Error("Invalid user record in directory"), "Registro de usuario inválido.");
    return null;
};

// Envolvemos la función con nuestro trazador de ejecución.
export const tracedLoadUserData = traceExecution(loadUserDataAndPermissions, 'loadUserDataAndPermissions');

export const login = traceExecution(async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        return { success: true };
    } catch (error) {
        let message = 'Error inesperado.';
        if (['auth/invalid-credential', 'auth/user-not-found', 'auth/wrong-password'].includes(error.code)) {
            message = 'Correo o contraseña incorrectos.';
        } else if (error.code === 'auth/network-request-failed') {
            message = 'Fallo de red. Revisa tu conexión.';
        }
        return { success: false, message };
    }
}, 'login');

export const logout = traceExecution(async () => {
    try {
        await signOut(auth);
        loadUserPermissions([]);
    } catch (error) {
        errorService.handle(error, "Ocurrió un error al cerrar la sesión.");
    }
}, 'logout');
