// ARCHIVO MEJORADO: src/services/logger.service.js

const IS_DEV_MODE = import.meta.env.DEV;
const TRACE_ENABLED = true; 

export const Logger = {
    info: (message, ...args) => {
        if (IS_DEV_MODE) {
            console.log(`[INFO] 🔵 ${message}`, ...args);
        }
    },
    warn: (message, ...args) => {
        if (IS_DEV_MODE) {
            console.warn(`[WARN] 🟡 ${message}`, ...args);
        }
    },
    error: (message, ...args) => {
        console.error(`[ERROR] 🔴 ${message}`, ...args);
    },
    trace: (message, ...args) => {
        if (IS_DEV_MODE && TRACE_ENABLED) {
            console.log(`[TRACE] ιχ ${message}`, ...args);
        }
    }
};