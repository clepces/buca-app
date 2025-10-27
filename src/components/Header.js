// ======================================================
// ARCHIVO: src/components/Header.js
// ======================================================
import { sanitizeHTML } from '../utils/sanitize.js';

export function Header(state) {
    // Leemos la nueva config global cargada desde Firebase
    const appConfig = state.settings.appConfig;

    // Extraemos la información del NUEVO formato (con fallbacks al formato antiguo/default)
    const storeName = sanitizeHTML(
        appConfig?.system?.metadata?.appNameSimplify || // <-- "B.U.C.A"
        state.settings.store.store_name || 
        'B.U.C.A'
    );
    const storeDescription = sanitizeHTML(
        appConfig?.system?.metadata?.appName || // <-- "Business Under Control Access"
        state.settings.store.store_description || 
        'Descripción...'
    );

    // El resto de la lógica se mantiene
    const totalProductos = state.products.length;
    const tasaBcv = state.settings.currencies.principal.rate;
    const simboloPrincipal = state.settings.currencies.principal.symbol;

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
                            <div class="stat-item">
                                <span class="stat-label">Tasa:</span>
                                <span class="stat-value">Bs. ${tasaBcv.toFixed(2)}</span>
                            </div>
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