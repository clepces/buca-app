// ======================================================
// ARCHIVO: src/views/Inventory/products/cards/ProductCards.js
// ACTUALIZACIÓN: Tooltips precisos y uso de tasa normalizada
// ======================================================

import { EmptyState } from '../../../../components/EmptyState.js';

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

// Formateador estricto para tooltips (siempre muestra todos los decimales necesarios)
const fullFormat = (num, symbol) => {
    return `${symbol} ` + new Intl.NumberFormat('es-VE', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(num);
};

function renderSingleProductCard(product, settings) {
    // --- 1. Lógica de Monedas y Precios ---
    const { symbol: simboloPrincipal } = settings.currencies.principal;
    const { symbol: simboloBase } = settings.currencies.base;
    
    // CORRECCIÓN CRÍTICA: Aseguramos que la tasa tenga solo 2 decimales para el cálculo
    // Esto evita que 233.56999 use los decimales ocultos.
    const tasaCambio = Number(settings.currencies.principal.rate.toFixed(2));

    const stock = product.stock?.current ?? 0;
    const stockMin = product.stock?.minThreshold ?? 10;
    
    // Precios base en USD (también aseguramos que sean números)
    const pvp_paq = Number(product.pricing?.priceLists?.[0]?.packageSellPrice ?? 0);
    const pvp_unit = Number(product.pricing?.priceLists?.[0]?.unitSellPrice ?? 0);
    
    // CÁLCULO MATEMÁTICO EXACTO
    // Ejemplo: 1.21 * 233.56 = 282.6076 -> ToFixed(2) -> "282.61"
    const pvp_paq_base = pvp_paq * tasaCambio;
    const pvp_unit_base = pvp_unit * tasaCambio;

    // ... (resto de lógica de stock igual) ...
    let stockStatus = 'stock-ok';
    if (stock === 0) stockStatus = 'stock-out';
    else if (stock <= stockMin) stockStatus = 'stock-low';

    // --- 2. FORMATEADORES CON PRECISIÓN ---
    // Usamos maximumFractionDigits: 2 para mostrar exactamente lo que vale
    const formatMoney = (val) => new Intl.NumberFormat('es-VE', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(val);

    // Tooltips mostrando el cálculo real
    const unitTooltipTitle = `${simboloPrincipal} ${formatMoney(pvp_unit)} x ${tasaCambio} = ${simboloBase} ${formatMoney(pvp_unit_base)}`;
    const paqTooltipTitle = `${simboloPrincipal} ${formatMoney(pvp_paq)} x ${tasaCambio} = ${simboloBase} ${formatMoney(pvp_paq_base)}`;
    
    const unitDisplayVal = `${simboloPrincipal} ${formatNumberAbbreviated(pvp_unit)}`;
    const paqDisplayVal = `${simboloPrincipal} ${formatNumberAbbreviated(pvp_paq)}`;

    // ... (resto del HTML igual) ...
    return `
        <div class="product-card" data-product-id="${product.id}" data-action="editar">
            <div class="card-image-placeholder">
                <div class="card-header-overlay">
                    <div class="card-category-group">
                        <span class="product-category">${product.categoryId ?? 'Sin Categoría'}</span>
                    </div>
                    <div class="product-actions-menu">
                        <button type="button" class="btn-icon-round" data-action="menu-toggle">
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
                <p class="product-brand" title="${product.brand ?? ''}">${product.brand ?? 'Generico'}</p>
            </div>
            
            <div class="card-footer">
                <div class="product-stat stock ${stockStatus}">
                    <span class="stat-label">Stock</span>
                    <span class="stat-value">${formatNumberAbbreviated(stock)} <small>Ud.</small></span>
                </div>
                
                <div class="price-group">
                    <div class="product-stat price" data-action="toggle-currency" title="Clic para cambiar moneda">
                        <span class="stat-label">Unitario</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${unitDisplayVal}"
                              data-base-val="${simboloBase} ${formatNumberAbbreviated(pvp_unit_base)}"
                              title="${unitTooltipTitle}">
                            ${unitDisplayVal}
                        </span>
                    </div>
                    <div class="product-stat price" data-action="toggle-currency" title="Clic para cambiar moneda">
                        <span class="stat-label">Paquete</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${paqDisplayVal}"
                              data-base-val="${simboloBase} ${formatNumberAbbreviated(pvp_paq_base)}"
                              title="${paqTooltipTitle}">
                            ${paqDisplayVal}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;
}

export function renderProductCards(products, settings) {
    if (!products || products.length === 0) {
        return EmptyState({
            icon: 'bi-box-seam',
            message: 'No hay productos que coincidan.'
        });
    }
    const cardsHTML = products.map(product => renderSingleProductCard(product, settings)).join('');
    return `<div class="product-card-grid">${cardsHTML}</div>`;
}