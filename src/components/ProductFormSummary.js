// ======================================================
// ARCHIVO: src/components/ProductFormSummary.js
// Propósito: Funciones de renderizado para el Paso 4
// (Resumen) del ProductForm.
// ======================================================

import { diff, fText, fCurr, fPerc, fStock, fPeso } from '../utils/productFormHelpers.js';

/**
 * Helper local para formatear números, ya que es usado por
 * renderPriceCardsHTML y fCurr (que está en helpers).
 */
const formatNumber = (num, decimals = 2) => new Intl.NumberFormat('es-VE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num);

/**
 * Renderiza el HTML para las tarjetas de precio (usado en MODO CREAR).
 */
function renderPriceCardsHTML(precios, costo, ganancia, unidadesPaquete, config) {
    // Extraemos la configuración de moneda y tasas
    const { simboloPrincipal, simboloBase, tasaIVA, tasaCambio } = config;

    const precioUnidadUSD = precios.precioFinalUnitarioDolar;
    const precioUnidadVES = precioUnidadUSD * tasaCambio;
    const precioPaqueteUSD = precios.precioFinalMayorDolar;
    const precioPaqueteVES = precioPaqueteUSD * tasaCambio;
    const ofertaDescuento = 0.025;
    const precioOfertaUSD = precioPaqueteUSD * (1 - ofertaDescuento);

    return `
        <div class="summary-price-card unit-price">
            <div class="card-header"><i class="bi bi-box me-1"></i> Precio Unitario</div>
            <div class="card-body">
                <div class="price-header-grid">
                    <div class="price-cluster">
                        <span class="price-main currency-toggle" id="summary-precio-unidad-principal" data-usd-value="${precioUnidadUSD}" data-ves-value="${precioUnidadVES}" data-current-currency="usd" title="Clic para cambiar">${simboloPrincipal}${formatNumber(precioUnidadUSD)}</span>
                        <span class="price-secondary currency-toggle" id="summary-precio-unidad-base" data-usd-value="${precioUnidadUSD}" data-ves-value="${precioUnidadVES}" data-current-currency="ves" title="Clic para cambiar">${simboloBase}${formatNumber(precioUnidadVES)}</span>
                    </div>
                    <small class="price-details">
                        Costo Unitario: <span>${simboloPrincipal}${formatNumber(precios.costoUnitarioDolar, 4)}</span><br/>
                        Ganancia: <span>${ganancia}</span>% | IVA: ${tasaIVA}%
                    </small>
                </div>
            </div>
        </div>
        <div class="summary-price-card package-price">
            <div class="card-header"><i class="bi bi-boxes me-1"></i> Precio Paquete (<span>${unidadesPaquete}</span> Unid.)</div>
            <div class="card-body">
                <div class="price-header-grid">
                    <div class="price-cluster">
                        <span class="price-main currency-toggle" id="summary-precio-paquete-principal" data-usd-value="${precioPaqueteUSD}" data-ves-value="${precioPaqueteVES}" data-current-currency="usd" title="Clic para cambiar">${simboloPrincipal}${formatNumber(precioPaqueteUSD)}</span>
                        <span class="price-secondary currency-toggle" id="summary-precio-paquete-base" data-usd-value="${precioPaqueteUSD}" data-ves-value="${precioPaqueteVES}" data-current-currency="ves" title="Clic para cambiar">${simboloBase}${formatNumber(precioPaqueteVES)}</span>
                    </div>
                    <small class="price-details">
                        Costo Paquete: <span>${simboloPrincipal}${formatNumber(costo)}</span><br/>
                        Ganancia: <span>${ganancia}</span>% | IVA: ${tasaIVA}%
                    </small>
                </div>
            </div>
        </div>
        <div class="summary-price-card package-price">
            <div class="card-header"><i class="bi bi-star-fill me-1"></i> Precio Paquete Oferta</div>
            <div class="card-body">
                <div class="package-controls-grid">
                    <div class="discount-suggestion-box">
                        <div class="discount-header">
                            <span><i class="bi bi-star-fill"></i> Oferta (2.5%)</span>
                            <strong id="summary-precio-paquete-oferta">${simboloPrincipal}${formatNumber(precioOfertaUSD)}</strong>
                        </div>
                        <button type="button" class="btn-apply-discount" id="btn-apply-package-offer" data-offer-price="${precioOfertaUSD.toFixed(2)}" title="Aplicar precio de oferta">Aplicar</button>
                    </div>
                    <div class="manual-input-box" id="manual-package-price-box">
                        <label for="override-package-price" class="package-price-label" id="manual-package-price-label">
                            <i class="bi bi-pencil-fill me-1"></i> O establecer manual:
                        </label>
                        <div class="input-group input-group-sm override-price-group">
                            <span class="input-group-text">${simboloPrincipal}</span>
                            <input type="number" step="0.01" class="form-control form-control-sm" id="override-package-price" placeholder="${formatNumber(precioOfertaUSD, 2)}" title="Opcional: Establecer precio de paquete manualmente">
                        </div>
                    </div>
                </div>
                <span class="package-price-note">
                    Precio calculado: <span id="summary-paquete-precio-calculado-nota">${simboloPrincipal}${formatNumber(precioPaqueteUSD)}</span>.
                </span>
            </div>
        </div>
    `;
}

/**
 * GENERA EL HTML PARA EL RESUMEN DE UN PRODUCTO NUEVO (PASO 4)
 * @param {object} data - El objeto newData con toda la información.
 * @param {object} config - Objeto con { simboloPrincipal, simboloBase, tasaIVA, tasaCambio }
 * @returns {string} El HTML del resumen.
 */
export function renderNewProductSummary(data, config) {
    const { simboloPrincipal } = config;
    return `
        <div class="summary-grid-layout">
            <div class="summary-column-left">
                 <section class="summary-section">
                    <h3><i class="bi bi-info-circle-fill me-1"></i> Información Básica</h3>
                    <div class="summary-basic-info summary-purchase-info">
                        <div class="info-item"><span>Nombre:</span> <strong id="summary-nombre">${data.nombre}</strong></div>
                        <div class="info-item"><span>Marca:</span> <strong id="summary-marca">${data.marca}</strong></div>
                        <div class="info-item"><span>Categoría:</span> <strong id="summary-categoria">${data.categoria}</strong></div>
                        <div class="info-item description-item"><span>Descripción:</span> <em id="summary-descripcion">${data.descripcion || 'Ninguna'}</em></div>
                    </div>
                </section>
                <section class="summary-section">
                    <h3><i class="bi bi-receipt me-1"></i> Resumen de Compra</h3>
                    <div class="summary-purchase-info">
                        <div class="info-item purchase-item"><span>Costo Paquete:</span> <strong><span id="summary-costo-paquete">${simboloPrincipal}${formatNumber(data.costo)}</span></strong></div>
                        <div class="info-item purchase-item"><span>Cantidad Paquetes:</span> <strong id="summary-cantidad-paquetes">${data.paquetes || 'N/A'}</strong></div>
                        <div class="info-item purchase-item"><span>Unidades/Paquete:</span> <strong id="summary-unidades-paquete">${data.unidadesPorPaquete || 'N/A'}</strong></div>
                        <div class="purchase-item"><span>Stock Inicial (Unidades):</span> <strong id="summary-stock-inicial">${data.totalUnidades}</strong></div>
                        <div class="total-cost"><span>Costo Total Compra:</span> <strong><span id="summary-costo-total">${simboloPrincipal}${formatNumber(data.costo * (data.paquetes || 1))}</span></strong></div>
                    </div>
                </section>
            </div>
            <div class="summary-column-right">
                <section class="summary-section prices-section">
                    <h3><i class="bi bi-tags-fill me-1"></i> Precios de Venta</h3>
                    <div class="summary-prices-grid">
                        ${renderPriceCardsHTML(data.precios, data.costo, data.ganancia, (data.unidadesPorPaquete || data.totalUnidades), config)}
                    </div>
                </section>
            </div>
        </div>
    `;
}

/**
 * GENERA EL HTML PARA EL RESUMEN DE EDICIÓN (PASO 4)
 * @param {object} newData - El objeto con los datos del formulario.
 * @param {object} originalData - El objeto con los datos originales.
 * @param {object} config - Objeto con { simboloPrincipal }
 * @returns {string} El HTML del resumen.
 */
export function renderEditProductSummary(newData, originalData, config) {
    const { simboloPrincipal } = config;

    // console.group('🔍 DEBUG: renderEditProductSummary');
    // console.log('📦 newData recibido:', newData);
    // console.log('📦 originalData recibido:', originalData);
    
    // console.log('--- Generando secciones ---');
    
    // Genera el HTML para cada sección de comparación
    const infoChanges = [
        diff('Nombre', newData.nombre, originalData.nombre, fText),
        diff('Marca', newData.marca, originalData.marca, fText),
        diff('Categoría', newData.categoria, originalData.categoria, fText),
        diff('Descripción', newData.descripcion, originalData.descripcion, fText)
    ].join('');
    
    const logisticsChanges = [
        diff('SKU', newData.sku, originalData.sku, fText),
        diff('Cód. Barras', newData.barcode, originalData.barcode, fText),
        diff('Peso', newData.peso, originalData.peso, fPeso)
    ].join('');

    const nuevoValorInventario = (newData.precios.costoUnitarioDolar * newData.totalUnidades);

    const costStockChanges = [
        diff('Costo Paquete', newData.costo, originalData.costo, fCurr, simboloPrincipal),
        diff('Ganancia', newData.ganancia, originalData.ganancia, fPerc),
        diff('Unid. p/ Paquete', newData.unidadesPorPaquete, originalData.unidadesPorPaquete, fStock),
        diff('Stock Total', newData.totalUnidades, originalData.stock, fStock),
        diff('Valor Inventario (Costo)', nuevoValorInventario, originalData.valorInventarioOriginal, fCurr, simboloPrincipal)
    ].join('');

    const newUnitPrice = newData.precios.precioFinalUnitarioDolar;
    const newPackagePrice = newData.precios.precioFinalMayorDolar;
    
    const priceChanges = [
        diff('Precio Unitario', newUnitPrice, originalData.precioUnitario, fCurr, simboloPrincipal),
        diff('Precio Paquete', newPackagePrice, originalData.precioPaquete, fCurr, simboloPrincipal)
    ].join('');
    
    /*
    // --- INICIO DE LOGS DE DEPURACIÓN ---
    console.log('--- Inputs para .some() ---');
    console.log('infoChanges contiene "changed":', infoChanges.includes('diff-item changed'), infoChanges);
    console.log('logisticsChanges contiene "changed":', logisticsChanges.includes('diff-item changed'), logisticsChanges);
    console.log('costStockChanges contiene "changed":', costStockChanges.includes('diff-item changed'), costStockChanges);
    console.log('priceChanges contiene "changed":', priceChanges.includes('diff-item changed'), priceChanges);
    // --- FIN DE LOGS DE DEPURACIÓN ---
    */
    
    // Detectar si hay cambios
    // ¡BUG CORREGIDO! Buscamos la clase exacta 'diff-item changed'
    const anyChanges = [
        infoChanges, 
        logisticsChanges, 
        costStockChanges, 
        priceChanges
    ].some(html => html.includes('diff-item changed')); 

    // console.log('✅ ¿Hay cambios?:', anyChanges);
    // console.groupEnd();

    // Renderiza la alerta de cabecera
    let alertHTML = '';
    if (anyChanges) {
        alertHTML = `
        <div class="summary-changes-detected">
            <i class="bi bi-exclamation-triangle-fill me-1"></i> 
            ¡Atención! Revisa los cambios antes de guardar.
        </div>`;
    } else {
        alertHTML = `
        <div class="summary-no-changes">
            <i class="bi bi-info-circle me-1"></i> 
            No se detectaron cambios en los campos.
        </div>`;
    }

    // Devuelve el HTML final
    return `
    <div class="summary-diff-view">
        ${alertHTML}
        <div class="summary-grid-layout">
            <div class="summary-column-left">
                <section class="summary-section">
                    <h3><i class="bi bi-info-circle-fill me-1"></i> Información Básica</h3>
                    ${infoChanges}
                </section>
                <section class="summary-section">
                    <h3><i class="bi bi-calculator-fill me-1"></i> Costos y Stock</h3>
                    ${costStockChanges}
                </section>
            </div>
            <div class="summary-column-right">
                <section class="summary-section">
                    <h3><i class="bi bi-archive-fill me-1"></i> Inventario y Logística</h3>
                    ${logisticsChanges}
                </section>
                <section class="summary-section">
                    <h3><i class="bi bi-tags-fill me-1"></i> Precios de Venta</h3>
                    ${priceChanges}
                </section>
            </div>
        </div>
    </div>`;
}

/**
 * Añade listeners a los botones de oferta (MODO CREAR)
 */
export function bindOfferButtonEvents(summaryContainer) {
    const manualPriceBox = summaryContainer.querySelector('#manual-package-price-box');
    const manualPriceLabel = summaryContainer.querySelector('#manual-package-price-label');
    const overridePackagePriceInput = summaryContainer.querySelector('#override-package-price');
    
    const applyButton = summaryContainer.querySelector('#btn-apply-package-offer');
    if (applyButton) {
        applyButton.addEventListener('click', (e) => {
            const button = e.currentTarget;
            const offerPrice = button.dataset.offerPrice;
            const isApplied = manualPriceBox.classList.contains('price-applied');

            if (isApplied) {
                // Modo "Cancelar"
                manualPriceBox.classList.remove('price-applied');
                manualPriceLabel.innerHTML = '<i class="bi bi-pencil-fill me-1"></i> Establecer manual:';
                button.textContent = 'Aplicar';
                button.classList.remove('cancel-mode');
                overridePackagePriceInput.value = '';
            } else {
                // Modo "Aplicar"
                overridePackagePriceInput.value = offerPrice;
                manualPriceBox.classList.add('price-applied');
                manualPriceLabel.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Precio Aplicado:';
                button.textContent = 'Cancelar';
                button.classList.add('cancel-mode');
            }
        });
    }
    
    // Si el usuario escribe manualmente, se desactiva el modo "Aplicado"
    if (overridePackagePriceInput) {
        overridePackagePriceInput.addEventListener('input', () => {
            manualPriceBox.classList.remove('price-applied');
            manualPriceLabel.innerHTML = '<i class="bi bi-pencil-fill me-1"></i> Establecer manual:';
            applyButton.textContent = 'Aplicar';
            applyButton.classList.remove('cancel-mode');
        });
    }
}

/**
 * Añade listeners al toggle de moneda (MODO CREAR)
 */
export function bindCurrencyToggleEvents(summaryContainer) {
    summaryContainer.addEventListener('click', (e) => {
        const target = e.target.closest('.currency-toggle');
        if (!target) return;
        const priceCard = target.closest('.summary-price-card');
        if (!priceCard) return;
        
        const principalElement = priceCard.querySelector('.price-main.currency-toggle');
        const baseElement = priceCard.querySelector('.price-secondary.currency-toggle');
        if (!principalElement || !baseElement) return;

        // Leer valores de los atributos data-*
        const usdValue = parseFloat(principalElement.dataset.usdValue);
        const vesValue = parseFloat(principalElement.dataset.vesValue);
        if (isNaN(usdValue) || isNaN(vesValue)) return;
        
        // Determinar qué moneda se está mostrando actualmente
        const isPrincipalTarget = target === principalElement;
        const currentCurrency = target.dataset.currentCurrency;
        const otherElement = isPrincipalTarget ? baseElement : principalElement;

        // Obtener símbolos de la configuración global (pasada en config)
        // Nota: Este helper es simple y asume que config está disponible en un scope superior
        // O mejor, extraemos los símbolos de los elementos
        const simboloPrincipal = principalElement.textContent.startsWith('$') ? '$' : (baseElement.textContent.startsWith('$') ? '$' : 'ERR');
        const simboloBase = baseElement.textContent.startsWith('Bs') ? 'Bs.' : (principalElement.textContent.startsWith('Bs') ? 'Bs.' : 'ERR');

        // Intercambiar
        if (currentCurrency === 'usd') {
            target.textContent = `${simboloBase}${formatNumber(vesValue)}`;
            target.dataset.currentCurrency = 'ves';
            otherElement.textContent = `${simboloPrincipal}${formatNumber(usdValue)}`;
            otherElement.dataset.currentCurrency = 'usd';
        } else {
            target.textContent = `${simboloPrincipal}${formatNumber(usdValue)}`;
            target.dataset.currentCurrency = 'usd';
            otherElement.textContent = `${simboloBase}${formatNumber(vesValue)}`;
            otherElement.dataset.currentCurrency = 'ves';
        }
    });
}