// ======================================================
// ARCHIVO: src/services/logger.service.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: (Anotación J-2)
// 1. 'logActivity' ahora lee desde 'state.session'.
// ======================================================

import { db } from '../firebase-config.js';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { state } from '../store/state.js';

const activityLogRef = collection(db, 'activity_log');
const IS_PRODUCTION = import.meta.env.PROD;

export async function logActivity(logData) {
  if (!logData.type || !logData.context) {
    console.warn('[Logger] logActivity necesita type y context.', logData);
    return;
  }

  // --- ¡INICIO DE CORRECCIÓN! ---
  // Leemos desde la fuente de verdad unificada
  const userId = state.session?.user?.uid || 'system';
  const businessId = state.session?.business?.id || 'unknown_business';
  const departmentId = state.session?.business?.departmentId || 'unknown_dept';
  // --- FIN DE CORRECCIÓN! ---

  const fullLogData = {
    ...logData,
    timestamp: serverTimestamp(),
    environment: IS_PRODUCTION ? 'production' : 'development',
    userId,
    businessId,
    departmentId,
    userAgent: navigator.userAgent
  };

  try {
    if (IS_PRODUCTION) {
      await addDoc(activityLogRef, fullLogData);
    } else {
      console.log('Activity Log (DEV):', fullLogData);
    }
  } catch (error) {
    console.error('Error al guardar log de actividad:', error);
  }
}

// Clase Logger para consola (sin cambios)
class ConsoleLogger {
  constructor() {
    this.IS_PRODUCTION = IS_PRODUCTION;
  }
  info(message, ...args) {
    console.log(`[INFO] 🔵 ${message}`, ...args);
  }
  warn(message, ...args) {
    console.warn(`[WARN] 🟡 ${message}`, ...args);
  }
  error(message, ...args) {
    console.error(`[ERROR] 🔴 ${message}`, ...args);
  }
  debug(message, ...args) {
    if (!this.IS_PRODUCTION) {
      console.debug(`[DEBUG] 🐞 ${message}`, ...args);
    }
  }
  trace(message, ...args) {
    if (!this.IS_PRODUCTION) {
      console.log(`[TRACE] ιχ ${message}`, ...args);
    }
  }
}

export const Logger = new ConsoleLogger();