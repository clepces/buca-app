// services/toast.service.js

import { state } from '../store/state';
import { traceExecution } from '../utils/traceExecution';
import { triggerRerender } from '../store/actions';

// Timer para ocultar el toast
let toastTimer = null;

/**
 * Muestra un mensaje toast.
 * Si ya hay un toast visible, lo reemplaza.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} [type='info'] - Tipo de toast ('info', 'success', 'error', 'warning').
 * @param {number} [duration=3000] - Duración en milisegundos.
 */
export const showToast = traceExecution('toast.service', 'showToast')((message, type = 'info', duration = 3000) => {
  // Si hay un timer activo, limpiarlo para que el nuevo toast se muestre
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }

  // Asignar los nuevos valores al estado
  state.ui.toast.message = message;
  state.ui.toast.type = type;
  state.ui.toast.isVisible = true;
  
  // Disparar re-renderizado para mostrar el toast
  triggerRerender();

  // Crear un nuevo timer para ocultar el toast
  toastTimer = setTimeout(() => {
    hideToast();
    toastTimer = null;
  }, duration);
});

/**
 * Oculta el toast inmediatamente.
 */
export const hideToast = traceExecution('toast.service', 'hideToast')(() => {
  state.ui.toast.isVisible = false;
  state.ui.toast.message = '';
  state.ui.toast.type = 'info';
  
  // Disparar re-renderizado para ocultar el toast
  triggerRerender();
  
  // Limpiar el timer si se llama manualmente
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }
});