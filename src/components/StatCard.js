// ======================================================
// ARCHIVO: src/components/StatCard.js
// VERSIÓN 4.1: Corregido ID y footer (change + description)
// ======================================================

/**
 * Genera un SVG de 5 barras basado en un array de datos.
 * @param {number[]} data - Array de números (ej. [10, 41, 35, 51, 49])
 * @returns {string} String del SVG
 */
function generateMiniGraphSVG(data = []) {
    const MAX_HEIGHT = 35; // Altura máxima de la barra en 'px'
    const VIEW_HEIGHT = 40; // Altura total del SVG
    const BAR_WIDTH = 12;
    const SPACING = 20; // Espacio entre el inicio de cada barra

    // Si no hay datos, usamos barras estáticas de "carga"
    const defaultData = [15, 30, 25, 35, 20];
    const dataToRender = (data && data.length > 0) ? data : defaultData;
    
    // Usamos los últimos 5 puntos de datos
    const lastFivePoints = dataToRender.slice(-5);
    
    // Rellenamos con 0 si hay menos de 5 puntos
    while (lastFivePoints.length < 5) {
        lastFivePoints.unshift(0);
    }
    
    const maxVal = Math.max(...lastFivePoints);
    
    // Si el valor máximo es 0, todas las barras tendrán altura 0
    if (maxVal === 0) {
        return `
        <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            ${[0,1,2,3,4].map(i => `
                <rect class="graph-bar" 
                      x="${5 + (i * SPACING)}" 
                      y="40" 
                      width="${BAR_WIDTH}" 
                      height="0"></rect>
            `).join('')}
        </svg>`;
    }

    const bars = lastFivePoints.map((val, i) => {
        // Normalizamos la altura (con un mínimo de 1px si hay valor)
        let height = (val / maxVal) * MAX_HEIGHT;
        if (height < 1 && val > 0) height = 1; 
        
        const y = VIEW_HEIGHT - height;
        const x = 5 + (i * SPACING);
        
        return `
            <rect class="graph-bar" 
                  x="${x}" 
                  y="${y}" 
                  width="${BAR_WIDTH}" 
                  height="${height}"
                  style="animation-delay: ${i * 0.05}s">
            </rect>
        `;
    }).join('');

    return `<svg viewBox="0 0 100 40" preserveAspectRatio="none">${bars}</svg>`;
}


/**
 * @param {object} props
 * @param {string} [props.id] - ID para el querySelector
 * @param {string} props.title
 * @param {string} props.value
 * @param {string} props.icon
 * @param {string} [props.className]
 * @param {boolean} [props.isNegative]
 * @param {object} [props.change]
 * @param {string} [props.description]
 * @param {number[]} [props.miniGraphData] - Array de números para el gráfico
 */
export function StatCard({ 
    id = '', // <-- AÑADIR ID
    title, 
    value, 
    icon, 
    className = '', 
    isNegative = false, 
    change = null, 
    description = '', 
    miniGraphData = null
}) {
    const valueClass = isNegative ? 'negative' : '';

    // --- ¡INICIO DE CORRECCIÓN FOOTER! ---
    const changeHTML = change ? `
        <span class="stat-card-change ${change.type === 'positive' ? 'positive' : 'negative'}">
            ${change.type === 'positive' ? '<i class="bi bi-arrow-up-short"></i>' : '<i class="bi bi-arrow-down-short"></i>'}
            ${change.value}
        </span>
    ` : '';

    const descriptionText = description ? `
        <span class="stat-card-footer-text">${description}</span>
    ` : '';

    // Renderizar footer SÓLO si hay change o description
    const footerHTML = (changeHTML || descriptionText) ? `
        <div class="stat-card-footer">
            ${changeHTML}
            ${descriptionText}
        </div>
    ` : '';
    // --- FIN DE CORRECCIÓN FOOTER ---

    const miniGraphSVG = generateMiniGraphSVG(miniGraphData);
    
    const miniGraphHTML = miniGraphData ? `
        <div class="stat-card-mini-graph">
            ${miniGraphSVG}
        </div>
    ` : '';

    return `
        <div class="stat-card ${className}" ${id ? `id="${id}"` : ''}> <div class="stat-card-main">
                <div class="stat-card-icon">
                    <i class="bi ${icon}"></i>
                </div>
                
                <div class="stat-card-info">
                    <span class="stat-card-title">${title}</span>
                    <span class="stat-card-value ${valueClass}">${value}</span>
                </div>
                
                ${miniGraphHTML}
            </div>
            
            ${footerHTML} </div>
    `;
}