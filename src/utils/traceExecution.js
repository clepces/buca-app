// ARCHIVO NUEVO: src/utils/traceExecution.js

import { Logger } from '../services/logger.service.js';

/**
 * Un decorador que envuelve una función para medir su tiempo de ejecución.
 * @param {Function} fn La función original (puede ser async).
 * @param {string} functionName El nombre de la función para los logs.
 * @returns {Function} La nueva función "envuelta".
 */
export function traceExecution(fn, functionName) {
    return async function(...args) {
        Logger.trace(`Entrando a -> ${functionName}`);
        const startTime = performance.now();
        try {
            const result = await fn.apply(this, args);
            return result;
        } catch (error) {
            Logger.error(`Error dentro de ${functionName}`, error);
            throw error;
        } finally {
            const endTime = performance.now();
            const duration = (endTime - startTime).toFixed(2);
            Logger.trace(`Saliendo de <- ${functionName} (Duración: ${duration} ms)`);
        }
    };
}