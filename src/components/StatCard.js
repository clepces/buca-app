// src/components/StatCard.js

/**
 * Renderiza una tarjeta de estadística para el panel de control.
 * @param {object} props - Propiedades para la tarjeta.
 * @param {string} props.title - El título de la tarjeta.
 * @param {string|number} props.value - El valor a mostrar (puede ser HTML).
 * @param {string} props.icon - La clase del icono de Bootstrap Icons.
 * @param {string} props.className - Clase CSS adicional para estilizar.
 * @param {boolean} [props.isNegative=false] - Si el valor principal es negativo.
 * @param {object} [props.change] - Info sobre cambio porcentual { value: '+5%', type: 'positive'|'negative' }.
 * @param {boolean} [props.miniGraph=false] - Si mostrar un placeholder para mini gráfico.
 * @returns {string} El string de HTML para la tarjeta.
 */
export function StatCard({ title, value, icon, className = '', isNegative = false, change = null, miniGraph = false }) {
    const valueClass = isNegative ? 'negative' : '';

    const changeHTML = change ? `
        <span class="stat-card-change ${change.type === 'positive' ? 'positive' : 'negative'}">
            ${change.type === 'positive' ? '<i class="bi bi-arrow-up-short"></i>' : '<i class="bi bi-arrow-down-short"></i>'}
            ${change.value}
        </span>
    ` : '';

    // --- INICIO MODIFICACIÓN: SVG Placeholder ---
    // Placeholder simple de gráfico de barras SVG
    const generateBarHeight = () => 40 - (Math.random() * 20 + 5); // Alturas entre 15 y 35
    const miniGraphSVG = `
        <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <rect class="graph-bar" x="5" y="${40 - generateBarHeight()}" width="12" height="${generateBarHeight()}"></rect>
            <rect class="graph-bar" x="25" y="${40 - generateBarHeight()}" width="12" height="${generateBarHeight()}"></rect>
            <rect class="graph-bar" x="45" y="${40 - generateBarHeight()}" width="12" height="${generateBarHeight()}"></rect>
            <rect class="graph-bar" x="65" y="${40 - generateBarHeight()}" width="12" height="${generateBarHeight()}"></rect>
            <rect class="graph-bar" x="85" y="${40 - generateBarHeight()}" width="12" height="${generateBarHeight()}"></rect>
        </svg>
    `;

    const miniGraphHTML = miniGraph ? `
        <div class="stat-card-mini-graph">
            ${miniGraphSVG}
        </div>
    ` : '';
    // --- FIN MODIFICACIÓN ---


    // --- INICIO MODIFICACIÓN: Nueva Estructura HTML ---
    return `
        <div class="stat-card ${className}">
            <div class="stat-card-main">
                 <div class="stat-card-icon">
                    <i class="bi ${icon}"></i>
                </div>
                <div class="stat-card-info">
                    <!-- {/* Header: Título y Cambio % */} -->
                    <div class="stat-card-header">
                         <span class="stat-card-title">${title}</span>
                         ${changeHTML} <!-- {/* Cambio % va aquí ahora */} -->
                    </div>
                    <!-- {/* Valor principal */} -->
                    <span class="stat-card-value ${valueClass}">${value}</span>
                </div>
            </div>
            <!-- {/* Gráfico (si existe) va directamente después de .stat-card-main */} -->
            ${miniGraphHTML}
        </div>
    `;
    // --- FIN MODIFICACIÓN ---
}