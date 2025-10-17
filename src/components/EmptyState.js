// ======================================================
// ARCHIVO: src/components/EmptyState.js
// ======================================================

/**
 * Renderiza un mensaje de estado vacío con un icono.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.icon - Clase del icono de FontAwesome (ej. 'fa-box-open').
 * @param {string} props.message - El mensaje principal.
 * @returns {string} El string de HTML para el estado vacío.
 */
export function EmptyState({ icon, message }) {
    return `
        <div class="empty-state">
            <i class="fas ${icon} empty-state-icon"></i>
            <p class="empty-state-message">${message}</p>
        </div>
    `;
}