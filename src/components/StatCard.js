// ======================================================
// ARCHIVO: src/components/StatCard.js
// ======================================================

/**
 * Renderiza una tarjeta de estadística para el panel de control.
 * @param {object} props - Propiedades para la tarjeta.
 * @param {string} props.title - El título de la tarjeta.
 * @param {string|number} props.value - El valor a mostrar.
 * @param {string} props.icon - La clase del icono de FontAwesome.
 * @param {string} props.className - Una clase CSS adicional para estilizar.
 * @returns {string} El string de HTML para la tarjeta.
 */
export function StatCard({ title, value, icon, className = '' }) {
    return `
        <div class="stat-card ${className}">
            <div class="stat-card-icon">
                <i class="fas ${icon}"></i>
            </div>
            <div class="stat-card-info">
                <span class="stat-card-title">${title}</span>
                <span class="stat-card-value">${value}</span>
            </div>
        </div>
    `;
}