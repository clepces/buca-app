// utils/traceExecution.js

// --- ¡ERROR ELIMINADO! ---
// Se eliminó: import { Logger } from '../services/logger.service';
// Esta utilidad no debe depender de un servicio.
// -------------------------

const TRACE_ENABLED = import.meta.env.VITE_APP_ENV === 'development';

/**
 * Un decorador de funciones de alto orden para medir y trazar el tiempo de ejecución.
 * Solo se activa si VITE_APP_ENV es 'development'.
 * * @param {string} moduleName - El nombre del módulo/servicio (ej. 'auth.service').
 * @param {string} functionName - El nombre de la función.
 * @returns {function} - Un decorador que envuelve la función original.
 */
export const traceExecution = (moduleName, functionName) => (fn) => {
  if (!TRACE_ENABLED) {
    return fn; // En producción, devuelve la función original sin sobrecarga.
  }

  const context = `${moduleName}:${functionName}`;

  // Devuelve la función envuelta (wrapper)
  return async (...args) => {
    // --- ¡CAMBIO AQUÍ! ---
    // Reemplazado Logger.trace por console.log
    console.log(`[TRACE] Entrando: ${context}`);
    // -------------------
    
    const startTime = performance.now();
    
    try {
      // Ejecuta la función original y espera su resultado
      const result = await fn.apply(this, args);
      
      const endTime = performance.now();
      const duration = endTime - startTime;

      // --- ¡CAMBIO AQUÍ! ---
      // Reemplazado Logger.trace por console.log
      console.log(`[TRACE] Saliendo: ${context}. Duración: ${duration.toFixed(2)}ms`);
      // -------------------
      
      return result;

    } catch (error) {
      const endTime = performance.now();
      const duration = endTime - startTime;

      // --- ¡CAMBIO AQUÍ! ---
      // Reemplazado Logger.error por console.error
      console.error(
        `[TRACE] Error en: ${context}. Duración: ${duration.toFixed(2)}ms. Error: ${error.message}`
      );
      // -------------------
      
      // Relanza el error para que los servicios (como error.service) lo manejen
      throw error;
    }
  };
};