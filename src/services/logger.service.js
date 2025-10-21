// services/logger.service.js
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase-config';
import { state } from '../store/state';
import { traceExecution } from '../utils/traceExecution.js'; // Lo mantenemos simple

/**
 * Escribe un nuevo log en la colección global 'activity_log'.
 * Esta función está decorada con traceExecution para medir el tiempo.
 */
export const logActivity = traceExecution('logger.service', 'logActivity')(async (logData) => {
  try {
    // 1. Apuntar directamente a la colección raíz
    const logCollectionRef = collection(db, 'activity_log');
    
    // 2. Enriquecer el log con datos de sesión (si existen) y timestamp
    const fullLogData = {
      ...logData,
      timestamp: serverTimestamp(), // Usar la hora del servidor
      // Agregar contexto de sesión si está disponible
      userId: logData.userId || (state.user ? state.user.uid : 'system'),
      businessId: logData.businessId || (state.businessId || null),
      departmentId: logData.departmentId || (state.departmentId || null),
    };

    // 3. Escribir el documento
    await addDoc(logCollectionRef, fullLogData);

  } catch (error) {
    // Error MUY grave: si el logger falla, solo podemos reportar a consola
    console.error('Error CRÍTICO: No se pudo registrar el log:', error, logData);
  }
});

// Exportamos la CLASE Logger solo para que los archivos que la importan no fallen,
// pero no la usamos. La función principal es logActivity.
export class Logger {
    static info(message, ...args) {
        console.log(`[INFO] 🔵 ${message}`, ...args);
    }
    static warn(message, ...args) {
        console.warn(`[WARN] 🟡 ${message}`, ...args);
    }
    static error(message, ...args) {
        console.error(`[ERROR] 🔴 ${message}`, ...args);
    }
    static trace(message, ...args) {
        if (import.meta.env.DEV) {
            console.log(`[TRACE] ιχ ${message}`, ...args);
        }
    }
}