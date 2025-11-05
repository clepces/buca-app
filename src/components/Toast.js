// ======================================================
// ARCHIVO: src/components/Toast.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.1 - FILE: 1.1.1
// CORRECCIÓN: (Bug K-1 Reactividad)
// 1. El componente ahora crea y devuelve un ELEMENTO DOM
//    en lugar de un string de HTML, para ser manejado
//    manualmente por el servicio de toast.
// ======================================================

import { state } from '../store/state.js';

// --- Helper para mapear tipos a UI ---
const toastConfig = {
    info: {
        icon: 'bi-info-circle-fill',
        title: 'Información'
    },
    success: {
        icon: 'bi-check-circle-fill',
        title: 'Éxito'
    },
    error: {
        icon: 'bi-exclamation-triangle-fill',
        title: 'Error'
    },
    warning: {
        icon: 'bi-exclamation-diamond-fill',
        title: 'Advertencia'
    }
};


/**
 * Renderiza el componente de toast.
 * @param {object} props - Propiedades { message, type }
 * @returns {HTMLElement} El elemento DOM del toast.
 */
export function Toast({ message, type = 'info' }) {
    
    // --- ¡INICIO DE CORRECCIÓN! ---
    const config = toastConfig[type] || toastConfig.info;

    const element = document.createElement('div');
    element.className = `toast toast-${type}`;
    element.id = `toast-${Date.now()}`; // ID único

    element.innerHTML = `
        <div class="toast-icon">
            <i class="bi ${config.icon}"></i>
        </div>
        <div class="toast-content">
            <span class="toast-title">${config.title}</span>
            <span class="toast-message">${message}</span>
        </div>
        <button class="toast-close">&times;</button>
    `;

    return element;
    // --- FIN DE CORRECCIÓN ---
}