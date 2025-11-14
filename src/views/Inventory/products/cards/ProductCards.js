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
    const { symbol: simboloPrincipal } = settings.currencies.principal;
    const { symbol: simboloBase } = settings.currencies.base;
    
    // ✅ CORRECCIÓN: Usamos la tasa SIN redondear
    const tasaCambio = settings.currencies.principal.rate; // <-- Sin toFixed()

    const stock = product.stock?.current ?? 0;
    const stockMin = product.stock?.minThreshold ?? 10;
    
    // Precios base en USD
    const pvp_paq = Number(product.pricing?.priceLists?.[0]?.packageSellPrice ?? 0);
    const pvp_unit = Number(product.pricing?.priceLists?.[0]?.unitSellPrice ?? 0);
    
    // ✅ CÁLCULO PRECISO: Multiplicamos con toda la precisión
    // Ejemplo: 19.91 × 234.8765 = 4,676.2617
    const pvp_paq_base_raw = pvp_paq * tasaCambio;
    const pvp_unit_base_raw = pvp_unit * tasaCambio;
    
    // ✅ REDONDEAMOS SOLO EL RESULTADO FINAL (para visualización)
    const pvp_paq_base = Number(pvp_paq_base_raw.toFixed(2));
    const pvp_unit_base = Number(pvp_unit_base_raw.toFixed(2));

    // Stock status logic (sin cambios)
    let stockStatus = 'stock-ok';
    if (stock === 0) stockStatus = 'stock-out';
    else if (stock <= stockMin) stockStatus = 'stock-low';

    // ✅ Formateadores: Ahora muestran el valor YA redondeado
    const formatMoney = (val) => new Intl.NumberFormat('es-VE', { 
        minimumFractionDigits: 2, 
        maximumFractionDigits: 2 
    }).format(val);

    // ✅ Tooltips mostrando el cálculo EXACTO
    const unitTooltipTitle = `${simboloPrincipal}${pvp_unit} × ${tasaCambio.toFixed(4)} = ${simboloBase}${formatMoney(pvp_unit_base)}`;
    const paqTooltipTitle = `${simboloPrincipal}${pvp_paq} × ${tasaCambio.toFixed(4)} = ${simboloBase}${formatMoney(pvp_paq_base)}`;
    
    const unitDisplayVal = `${simboloPrincipal} ${formatNumberAbbreviated(pvp_unit)}`;
    const paqDisplayVal = `${simboloPrincipal} ${formatNumberAbbreviated(pvp_paq)}`;

    // ✅ Tooltips mejorados con HTML
    const unitTooltip = `
        <div style="text-align: center;">
            <strong style="color: var(--primary-color);">${simboloPrincipal}${pvp_unit}</strong> 
            × <strong>${tasaCambio.toFixed(4)}</strong><br>
            = <strong style="color: var(--bs-success);">${simboloBase}${formatMoney(pvp_unit_base)}</strong>
        </div>
    `;
    
    const paqTooltip = `
        <div style="text-align: center;">
            <strong style="color: var(--primary-color);">${simboloPrincipal}${pvp_paq}</strong> 
            × <strong>${tasaCambio.toFixed(4)}</strong><br>
            = <strong style="color: var(--bs-success);">${simboloBase}${formatMoney(pvp_paq_base)}</strong>
        </div>
    `;

    return `
        <div class="product-card" data-product-id="${product.id}" data-action="editar">
            <div class="card-image-placeholder">
                <div class="card-header-overlay">
                    <div class="card-category-group">
                        <span class="product-category">${product.categoryId ?? 'Sin Categoría'}</span>
                    </div>
                    <div class="product-actions-menu">
                        <button type="button" 
                                class="btn-icon-round" 
                                data-action="menu-toggle"
                                data-tippy-content="Más opciones">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <div class="menu-dropdown">
                            <button class="menu-item" data-action="editar">
                                <i class="bi bi-pencil-fill"></i> Editar
                            </button>
                            <button class="menu-item" data-action="abastecer">
                                <i class="bi bi-box-arrow-in-down"></i> Abastecer
                            </button>
                            <div class="menu-divider"></div>
                            <button class="menu-item text-danger" data-action="eliminar">
                                <i class="bi bi-trash3-fill"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <i class="bi bi-image placeholder-icon"></i>
            </div>

            <div class="card-body">
                <h3 class="product-name" 
                    data-tippy-content="${product.name}">
                    ${product.name}
                </h3>
                <p class="product-brand" 
                   data-tippy-content="${product.brand ?? 'Marca genérica'}">
                   ${product.brand ?? 'Generico'}
                </p>
            </div>
            
            <div class="card-footer">
                <div class="product-stat stock ${stockStatus}">
                    <span class="stat-label">Stock</span>
                    <span class="stat-value">${formatNumberAbbreviated(stock)} <small>Ud.</small></span>
                </div>
                
                <div class="price-group">
                    <div class="product-stat price" 
                         data-action="toggle-currency" 
                         data-tippy-content="${unitTooltip}"
                         data-tippy-placement="bottom">
                        <span class="stat-label">Unitario</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${unitDisplayVal}"
                              data-base-val="${simboloBase} ${formatNumberAbbreviated(pvp_unit_base)}">
                            ${unitDisplayVal}
                        </span>
                    </div>
                    
                    <div class="product-stat price" 
                         data-action="toggle-currency" 
                         data-tippy-content="${paqTooltip}"
                         data-tippy-placement="bottom">
                        <span class="stat-label">Paquete</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${paqDisplayVal}"
                              data-base-val="${simboloBase} ${formatNumberAbbreviated(pvp_paq_base)}">
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