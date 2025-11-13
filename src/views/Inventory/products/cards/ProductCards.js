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
    // --- 1. Datos Financieros ---
    const { symbol: simboloPrincipal } = settings.currencies.principal;
    const { symbol: simboloBase } = settings.currencies.base;
    
    // La tasa ya viene corregida a 2 decimales desde rate.service.js
    const tasaCambio = settings.currencies.principal.rate; 

    const stock = product.stock?.current ?? 0;
    const stockMin = product.stock?.minThreshold ?? 10;
    
    // Precios base (USD)
    const pvp_paq = product.pricing?.priceLists?.[0]?.packageSellPrice ?? 0;
    const pvp_unit = product.pricing?.priceLists?.[0]?.unitSellPrice ?? 0;
    
    // Conversión Exacta (Bs)
    // Al ser tasaCambio de 2 decimales, este cálculo coincidirá con la calculadora
    const pvp_paq_base = pvp_paq * tasaCambio;
    const pvp_unit_base = pvp_unit * tasaCambio;

    let stockStatus = 'stock-ok';
    if (stock === 0) stockStatus = 'stock-out';
    else if (stock <= stockMin) stockStatus = 'stock-low';

    // --- 2. Tooltips (Muestran la matemática real) ---
    // Ejemplo: "$ 12.06 / Bs. 2,816.73"
    const unitTooltipTitle = `${fullFormat(pvp_unit, simboloPrincipal)} / ${fullFormat(pvp_unit_base, simboloBase)}`;
    const paqTooltipTitle = `${fullFormat(pvp_paq, simboloPrincipal)} / ${fullFormat(pvp_paq_base, simboloBase)}`;

    // --- 3. Valores Visuales (Abreviados si son grandes) ---
    const unitDisplayVal = `${simboloPrincipal} ${formatNumberAbbreviated(pvp_unit)}`;
    const paqDisplayVal = `${simboloPrincipal} ${formatNumberAbbreviated(pvp_paq)}`;

    return `
        <div class="product-card" data-product-id="${product.id}" data-action="editar">
            
            <div class="card-image-placeholder">
                <div class="card-header-overlay">
                    <div class="card-category-group">
                        <span class="product-category">${product.categoryId ?? 'Sin Cat.'}</span>
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
                    <div class="product-stat price" data-action="toggle-currency">
                        <span class="stat-label">Unitario</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${unitDisplayVal}"
                              data-base-val="${simboloBase} ${formatNumberAbbreviated(pvp_unit_base)}"
                              title="${unitTooltipTitle}">
                            ${unitDisplayVal}
                        </span>
                    </div>
                    <div class="product-stat price" data-action="toggle-currency">
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