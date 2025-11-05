// ======================================================
// ARCHIVO: src/services/toast.service.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.1 - FILE: 1.1.1
// CORRECCIÓN: (Bug K-1 Reactividad)
// 1. El servicio ya NO usa state.ui.toast ni triggerRerender().
// 2. Ahora crea y destruye manualmente los toasts en el DOM,
//    igual que el modal.service.js.
// 3. Esto evita que la vista principal se recargue.
// ======================================================

// --- ¡IMPORTS MODIFICADOS! ---
// import { state } from '../store/state'; // <-- ELIMINADO
import { traceExecution } from '../utils/traceExecution';
// import { triggerRerender } from '../store/actions'; // <-- ELIMINADO
import { Toast } from '../components/Toast.js'; // <-- AÑADIDO

// Timer para ocultar el toast
let activeToast = null;
let toastTimer = null;

/**
 * Muestra un mensaje toast.
 * Si ya hay un toast visible, lo reemplaza.
 * @param {string} message - El mensaje a mostrar.
 * @param {string} [type='info'] - Tipo de toast ('info', 'success', 'error', 'warning').
 * @param {number} [duration=3000] - Duración en milisegundos.
 */
export const showToast = traceExecution('toast.service', 'showToast')((message, type = 'info', duration = 3000) => {
  
  // --- ¡INICIO DE CORRECCIÓN! ---
  
  // Si hay un toast activo, eliminarlo inmediatamente
  if (activeToast) {
    hideToast(true); // Ocultar sin animación
  }
  if (toastTimer) {
    clearTimeout(toastTimer);
  }

  // 1. Crear el elemento Toast
  activeToast = Toast({ message, type });

  // 2. Añadir listener al botón de cerrar
  const closeButton = activeToast.querySelector('.toast-close');
  if (closeButton) {
    closeButton.onclick = () => hideToast();
  }

  // 3. Añadir al body
  document.body.appendChild(activeToast);

  // 4. Programar su eliminación
  toastTimer = setTimeout(() => {
    hideToast();
  }, duration);
  // --- FIN DE CORRECCIÓN! ---
});

/**
 * Oculta el toast inmediatamente.
 * @param {boolean} [immediate=false] - Si es true, lo elimina del DOM sin animación.
 */
export const hideToast = traceExecution('toast.service', 'hideToast')((immediate = false) => {
  
  // --- ¡INICIO DE CORRECCIÓN! ---
  if (toastTimer) {
    clearTimeout(toastTimer);
    toastTimer = null;
  }
  
  if (activeToast) {
    if (immediate) {
        // Eliminación instantánea (para reemplazo)
        activeToast.remove();
    } else {
        // Aplicar animación de salida
        activeToast.style.animation = 'toastSlideOut 0.4s ease-in forwards';
        // Esperar a que termine la animación para borrarlo
        setTimeout(() => {
            activeToast?.remove();
            if (!immediate) activeToast = null; // Limpiar solo si no es un reemplazo
        }, 400);
    }
    
    if(immediate) activeToast = null; // Limpiar la referencia
  }
  // --- FIN DE CORRECCIÓN! ---
});