// ======================================================
// ARCHIVO: src/components/Header.js
// CORRECCIÓN: Definición de 'simboloPrincipal' agregada
// ======================================================
import { sanitizeHTML } from '../../utils/sanitize.js';
import { state as globalState } from '../../store/state.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';

export function Header(state) {
    // Leemos la nueva config global cargada desde Firebase
    const appConfig = state.settings.appConfig;

    // Extraemos la información del NUEVO formato (con fallbacks)
    const storeName = sanitizeHTML(
        appConfig?.system?.metadata?.appNameSimplify || 
        state.settings.store.store_name || 
        'B.U.C.A'
    );

    const storeDescription = sanitizeHTML(
        appConfig?.system?.metadata?.appName || 
        state.settings.store.store_description || 
        'Descripción...'
    );

    const totalProductos = state.products.length;
    const tasaBcv = state.settings.currencies.principal.rate;
    const tasaDisplay = tasaBcv.toFixed(4).replace(/\.?0+$/, ''); // Elimina ceros finales

    // --- ¡CORRECCIÓN AQUÍ! ---
    // Recuperamos el símbolo principal ($) que faltaba
    const simboloPrincipal = state.settings.currencies.principal.symbol || '$';
    // -------------------------

    const trend = state.settings.currencies.principal.trend || 'neutral';
    
    // Definir icono y color según tendencia
    let trendIcon = '';
    let trendClass = '';
    
    if (trend === 'up') {
        trendIcon = '<i class="bi bi-arrow-up-short"></i>';
        trendClass = 'text-success'; // Verde
    } else if (trend === 'down') {
        trendIcon = '<i class="bi bi-arrow-down-short"></i>';
        trendClass = 'text-danger'; // Rojo
    }

    // Comprobar si el usuario tiene permiso para editar la tasa
    const canEditRate = can(PERMISSIONS.EDIT_SETTINGS_BUSINESS) || can(PERMISSIONS.EDIT_SETTINGS_SYSTEM);

    const rateStatHTML = canEditRate ? `
        <button class="stat-item stat-item-clickable" data-action="open-rate-modal" title="Actualizar Tasa">
            <span class="stat-label">Tasa BCV ${trendIcon}</span>
            <span class="stat-value ${trendClass}">Bs. ${tasaDisplay}</span>
        </button>
    ` : `
        <div class="stat-item">
            <span class="stat-label">Tasa BCV ${trendIcon}</span>
            <span class="stat-value ${trendClass}">Bs. ${tasaDisplay}</span>
        </div>
    `;

    return `
        <header class="menu">
            <nav class="top-nav">
                <div class="nav-container">
                    <div class="nav-brand">
                        <i class="fas fa-fire"></i>
                        <span class="nav-title-app">
                            <span id="nav-store-name">${storeName}</span>
                            <span id="nav-store-description" class="nav-brand-description">
                                ${storeDescription}
                            </span>
                        </span>
                    </div>
                    <div class="nav-stats" id="nav-stats">
                        <div class="stats-grid">
                            
                            ${rateStatHTML}

                            <div class="stat-item">
                                <span class="stat-label">Productos:</span>
                                <span class="stat-value">${totalProductos}</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Inversión:</span>
                                <span class="stat-value">${simboloPrincipal}0.00</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Valor stock:</span>
                                <span class="stat-value">${simboloPrincipal}0.00</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Ganancia:</span>
                                <span class="stat-value">${simboloPrincipal}0.00</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-label">Ventas:</span>
                                <span class="stat-value">${simboloPrincipal}0.00</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    `;
}