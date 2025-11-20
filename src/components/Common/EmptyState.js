// ======================================================
// ARCHIVO: src/components/EmptyState.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: Cambiar de Font Awesome (fas) a Bootstrap Icons (bi)
// ======================================================

/**
 * Renderiza un mensaje de estado vacío con un icono.
 * @param {object} props - Propiedades del componente.
 * @param {string} props.icon - Clase del icono de Bootstrap (ej. 'bi-box-open').
 * @param {string} props.message - El mensaje principal.
 * @returns {string} El string de HTML para el estado vacío.
 */
export function EmptyState({ icon, message }) {
    return `
        <div class="empty-state">
            <i class="bi ${icon} empty-state-icon"></i>
            <p class="empty-state-message">${message}</p>
        </div>
    `;
}