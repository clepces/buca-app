// ======================================================
// ARCHIVO: src/components/StatCard.js
// VERSIÓN 3.0: Corrige el parpadeo del mini-gráfico (SVG estático)
// ======================================================

export function StatCard({ title, value, icon, className = '', isNegative = false, change = null, miniGraph = false, description = '' }) {
    const valueClass = isNegative ? 'negative' : '';

    const changeHTML = change ? `
        <span class="stat-card-change ${change.type === 'positive' ? 'positive' : 'negative'}">
            ${change.type === 'positive' ? '<i class="bi bi-arrow-up-short"></i>' : '<i class="bi bi-arrow-down-short"></i>'}
            ${change.value}
        </span>
    ` : '';

    const descriptionHTML = description ? `
        <div class="stat-card-footer">
            <span class="stat-card-footer-text">${description}</span>
        </div>
    ` : (change ? `
        <div class="stat-card-footer">
            ${changeHTML}
            <span class="stat-card-footer-text">desde el último mes</span> 
        </div>
    ` : '');

    // --- INICIO DE LA CORRECCIÓN: SVG con valores estáticos ---
    // Usamos alturas fijas en lugar de Math.random() para evitar el parpadeo
    const miniGraphSVG = `
        <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <rect class="graph-bar" x="5" y="20" width="12" height="20"></rect>
            <rect class="graph-bar" x="25" y="10" width="12" height="30"></rect>
            <rect class="graph-bar" x="45" y="15" width="12" height="25"></rect>
            <rect class="graph-bar" x="65" y="5" width="12" height="35"></rect>
            <rect class="graph-bar" x="85" y="25" width="12" height="15"></rect>
        </svg>
    `;
    // --- FIN DE LA CORRECCIÓN ---

    const miniGraphHTML = miniGraph ? `
        <div class="stat-card-mini-graph">
            ${miniGraphSVG}
        </div>
    ` : '';

    return `
        <div class="stat-card ${className}">
            <div class="stat-card-main">
                <div class="stat-card-icon">
                    <i class="bi ${icon}"></i>
                </div>
                
                <div class="stat-card-info">
                    <span class="stat-card-title">${title}</span>
                    <span class="stat-card-value ${valueClass}">${value}</span>
                </div>
                
                ${miniGraphHTML}
            </div>
            
            ${descriptionHTML}
        </div>
    `;
}