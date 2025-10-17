// ======================================================
// ARCHIVO: src/components/Header.js
// ======================================================
import { sanitizeHTML } from '../utils/sanitize.js';

/**
 * EXPLICACIÓN:
 * Este es nuestro primer componente. Es una simple función que recibe datos (el estado)
 * y devuelve un string de HTML. No modifica nada, solo presenta la información.
 * Esto lo hace predecible y fácil de probar.
 */

export function Header(state) {
    // Extraemos la información que necesitamos del estado para que el código sea más legible.
    const storeName = sanitizeHTML(state.settings.store.store_name || 'Mi Tienda');
    const storeDescription = sanitizeHTML(state.settings.store.store_description || 'Descripción...');
    
    // Aquí irían los cálculos de las estadísticas, por ahora usamos valores de ejemplo.
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