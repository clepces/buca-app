// ======================================================
// ARCHIVO NUEVO: src/views/Inventory/products/cards/ProductCards.js
// PROPÓSITO: Contiene toda la lógica de renderizado
// para las tarjetas de producto.
// (Anotación Y-13)
// ======================================================

import { EmptyState } from '../../../../components/EmptyState.js';

/**
 * 🎨 HELPER DE ABREVIACIÓN
 * Formatea números grandes a "K" (miles) o "M" (millones).
 */
function formatNumberAbbreviated(num) {
    if (num < 10000) { 
         return new Intl.NumberFormat('es-VE', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
        }).format(num);
    }
    return new Intl.NumberFormat('es-VE', { 
        notation: 'compact', 
        maximumFractionDigits: 2 
    }).format(num);
}

/**
 * 🎨 FUNCIÓN DE RENDERIZADO DE TARJETA INDIVIDUAL
 * (VERSIÓN 5.0 - Con Abreviación de Números)
 */
function renderSingleProductCard(product, settings) {
    // --- 1. Lógica de Monedas y Precios ---
    const { symbol: simboloPrincipal } = settings.currencies.principal;
    const { symbol: simboloBase } = settings.currencies.base;
    const tasaCambio = settings.currencies.principal.rate;
    const stock = product.stock?.current ?? 0;
    const stockMin = product.stock?.minThreshold ?? 10;
    const pvp_paq = product.pricing?.priceLists?.[0]?.packageSellPrice ?? 0;
    const pvp_unit = product.pricing?.priceLists?.[0]?.unitSellPrice ?? 0;
    const pvp_paq_base = pvp_paq * tasaCambio;
    const pvp_unit_base = pvp_unit * tasaCambio;
    let stockStatus = 'stock-ok';
    if (stock === 0) stockStatus = 'stock-out';
    else if (stock <= stockMin) stockStatus = 'stock-low';

    // --- 2. FORMATEADORES ---
    const formatTooltipPrincipal = (val) => new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'USD', currencyDisplay: 'code' }).format(val).replace('USD', simboloPrincipal);
    const formatTooltipBase = (val) => new Intl.NumberFormat('es-VE', { style: 'currency', currency: 'VES', currencyDisplay: 'code' }).format(val).replace('VES', simboloBase);
    const formatDisplayPrincipal = (val) => `${simboloPrincipal} ${formatNumberAbbreviated(val)}`;
    const formatDisplayBase = (val) => `${simboloBase} ${formatNumberAbbreviated(val)}`;
    const unitTooltipTitle = `${formatTooltipPrincipal(pvp_unit)} / ${formatTooltipBase(pvp_unit_base)}`;
    const paqTooltipTitle = `${formatTooltipPrincipal(pvp_paq)} / ${formatTooltipBase(pvp_paq_base)}`;
    const unitDisplayVal = formatDisplayPrincipal(pvp_unit);
    const paqDisplayVal = formatDisplayPrincipal(pvp_paq);

    // --- 3. RENDERIZADO DEL HTML ---
    return `
        <div class="product-card" data-product-id="${product.id}" data-action="editar">
            
            <div class="card-image-placeholder">
                <div class="card-header-overlay">
                    <div class="card-category-group">
                        <span class="product-category">${product.categoryId ?? 'Sin Categoría'}</span>
                        <button class="btn-icon-round btn-expand-image" data-action="expand-image" title="Ampliar Imagen">
                            <i class="bi bi-arrows-fullscreen"></i>
                        </button>
                    </div>
                    <div class="product-actions-menu">
                        <button type="button" class="btn-icon-round" data-action="menu-toggle" title="Más opciones">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <div class="menu-dropdown">
                            <button class="menu-item" data-action="editar"><i class="bi bi-pencil-fill"></i> Editar</button>
                            <button class="menu-item" data-action="abastecer"><i class="bi bi-box-arrow-in-down"></i> Abastecer</button>
                            <div class="menu-divider"></div>
                            <button class="menu-item text-danger" data-action="eliminar"><i class="bi bi-trash3-fill"></i> Eliminar</button>
                        </div>
                    </div>
                </div>
                <i class="bi bi-image placeholder-icon"></i>
            </div>
            <div class="card-body">
                <h3 class="product-name" title="${product.name}">${product.name}</h3>
                <p class="product-brand" title="${product.brand ?? ''}">${product.brand ?? 'Sin Marca'}</p>
            </div>
            
            <div class="card-footer">
                <div class="product-stat stock ${stockStatus}">
                    <span class="stat-label">Stock</span>
                    <span class="stat-value" title="${stock} Unid.">${stock} <small>Unid.</small></span>
                </div>
                
                <div class="price-group">
                    <div class="product-stat price" data-action="toggle-currency" title="Clic para cambiar moneda">
                        <span class="stat-label">P.V.P (Unit.)</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${formatDisplayPrincipal(pvp_unit)}"
                              data-base-val="${formatDisplayBase(pvp_unit_base)}"
                              title="${unitTooltipTitle}">
                            ${unitDisplayVal}
                        </span>
                    </div>
                    <div class="product-stat price" data-action="toggle-currency" title="Clic para cambiar moneda">
                        <span class="stat-label">P.V.P (Paq.)</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${formatDisplayPrincipal(pvp_paq)}"
                              data-base-val="${formatDisplayBase(pvp_paq_base)}"
                              title="${paqTooltipTitle}">
                            ${paqDisplayVal}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

/**
 * 🎨 FUNCIÓN DE RENDERIZADO (EXPORTADA)
 * Genera el HTML para todas las tarjetas y el grid.
 * @param {Array} products - Lista de productos del estado.
 * @param {object} settings - Configuración global.
 * @returns {string} HTML del grid de productos.
 */
export function renderProductCards(products, settings) {
    if (!products || products.length === 0) {
        // Esta función ahora debe ser genérica
        return EmptyState({
            icon: 'bi-box-seam',
            message: 'No hay productos que coincidan con tu búsqueda.'
        });
    }
    const cardsHTML = products.map(product => renderSingleProductCard(product, settings)).join('');
    return `<div class="product-card-grid">${cardsHTML}</div>`;
}