// ======================================================
// ARCHIVO: src/components/Toast.js
// ======================================================

import { state } from '../store/state.js';

/**
 * Renderiza el componente de toast.
 * @returns {string} El string de HTML para el toast.
 */
export function Toast() {
    if (!state.ui.toast.isVisible) {
        return '';
    }

    const { message, type } = state.ui.toast;
    
    return `
        <div class="toast toast-${type}" id="toast-container">
            <div class="toast-content">
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="this.parentElement.parentElement.remove()">&times;</button>
            </div>
        </div>
    `;
}
