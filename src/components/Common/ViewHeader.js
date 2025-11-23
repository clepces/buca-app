// ======================================================
// ARCHIVO: src/components/Common/ViewHeader.js
// PROPÓSITO: Generar encabezados consistentes para todas las vistas.
// ======================================================

export function ViewHeader({ title, subtitle, icon, actions = [] }) {
    
    // Generar HTML de los botones de acción
    const actionsHTML = actions.map(action => `
        <button class="btn-${action.variant || 'primary'}" data-action="${action.action}">
            ${action.icon ? `<i class="${action.icon} me-1"></i>` : ''} ${action.label}
        </button>
    `).join('');

    return `
        <div class="view-header align-items-start mb-4"">
            <div>
                <h2 class="view-title">
                    <i class="${icon} me-2"></i> 
                    ${title}
                </h2>
                ${subtitle ? `<p class="text-muted mb-0">${subtitle}</p>` : ''}
            </div>
            <div class="view-header-actions">
                <div class="search-container">
                    <i class="bi bi-search search-icon"></i>
                    <input type="search" id="view-search-input" class="form-control" placeholder="Buscar...">
                </div>
                ${actionsHTML}
            </div>
        </div>
    `;
}