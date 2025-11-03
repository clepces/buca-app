// ======================================================
// ARCHIVO: src/services/error.service.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.0 - FILE: 1.0.1
// CORRECCIÓN: (Bug de Log) Se añade 'context' al nivel
//             superior del objeto 'logData' para que
//             'logger.service.js' pueda validarlo.
// ======================================================

import { showToast } from './toast.service.js';
import { logActivity } from './logger.service.js';
import { state } from '../store/state.js';

/**
 * Manejador central de errores.
 * Muestra un mensaje amigable al usuario y registra el error detallado.
 * @param {Error} error - El objeto de error.
 * @param {string} context - Dónde se originó el error (ej. 'storage.service:getProducts').
 */
export const handleError = (error, context = 'unknown') => {
  // 1. Registrar en Consola
  console.error(`[Error en ${context}]:`, error.message, error);

  // 2. Obtener mensaje amigable para el usuario
  const userMessage = getFriendlyErrorMessage(error.message || error.code);
  
  // 3. Mostrar Toast al usuario
  showToast(userMessage, 'error');

  // 4. Registrar en el log de la base de datos (activity_log)
  try {
    
    // --- ¡INICIO DE CORRECCIÓN! ---
    const logData = {
      type: 'ERROR',
      context: context, // <-- Se añade el contexto al nivel superior
      message: `Error en ${context}: ${error.message}`,
      details: {
        code: error.code || 'UNKNOWN',
        stack: error.stack || 'No stack available',
        context: context, // Se mantiene por redundancia
      },
    };
    // --- FIN DE CORRECCIÓN! ---

    logActivity(logData);
    
  } catch (logError) {
    console.error('Error CRÍTICO: No se pudo registrar el error en el log:', logError);
  }
};

/**
 * Traduce códigos de error (especialmente de Firebase) a mensajes amigables.
 * (Sin cambios)
 */
export function getFriendlyErrorMessage(errorCode) {
  // Mensajes de Autenticación
  switch (errorCode) {
    case 'auth/user-not-found':
    case 'auth/wrong-password':
    case 'auth/invalid-credential':
      return 'Correo o contraseña incorrectos.';
    case 'auth/invalid-email':
      return 'El formato del correo no es válido.';
    case 'auth/email-already-in-use':
      return 'Este correo ya está registrado.';
    case 'auth/network-request-failed':
      return 'Error de red. Revisa tu conexión a internet.';
    case 'auth/too-many-requests':
      return 'Demasiados intentos. Intenta más tarde.';
      
    // Errores de Contexto (nuestros)
    case 'AUTH_USER_CONTEXT_NOT_FOUND':
    case 'AUTH_USER_NOT_IN_DIRECTORY':
    case 'AUTH_NO_BUSINESS_ID':
    case 'AUTH_USER_PROFILE_NOT_FOUND':
      return 'Error al cargar el perfil de usuario. Contacte a soporte.';

    // Errores de Firestore
    case 'permission-denied':
    case 'PERMISSION_DENIED':
      return 'No tienes permiso para realizar esta acción.';
    case 'unavailable':
      return 'Servicio no disponible temporalmente. Intenta de nuevo.';
      
    // Por defecto
    default:
      return 'Ocurrió un error inesperado. Inténtalo de nuevo.';
  }
}

// Exportamos esto solo por compatibilidad con la IA, pero no lo usamos.
export const errorService = {
    handle: handleError
};