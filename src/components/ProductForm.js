// ======================================================
// ARCHIVO: src/components/ProductForm.js
// VERSION APP: 3.0.0 - MODULE:SGA_SCM: 1.2.1 - FILE: 1.1.1
// CORRECCIÓN: (Resumen de Edición Inteligente v2)
// 1. El Resumen de Edición ahora se muestra en 2 columnas.
// 2. Corregido el bug que mostraba "¡Atención!..." cuando no
//    había cambios (comparación de 'null' vs '').
// ======================================================
    
import { calcularPrecioVenta } from '../services/calculation.service.js';
import { validarCamposTexto, productoExiste } from '../services/validation.service.js';
import { addProductToState, updateProductInState } from '../store/actions.js';
import { showToast } from '../services/toast.service.js';
import { state as globalState } from '../store/state.js';
import { Logger } from '../services/logger.service.js';

export function ProductForm(productToEdit = null, modalElementRef) {
    const element = document.createElement('div');
    element.className = 'product-form-wrapper';
    const isEditMode = productToEdit !== null;
    const categories = globalState.settings.products.available_categories || [];
    const simboloPrincipal = globalState.settings.currencies.principal.symbol || '$';
    const simboloBase = globalState.settings.currencies.base.symbol || 'Bs.';
    const tasaIVA = globalState.settings.products.tax_rate;
    const tasaCambio = globalState.settings.currencies.principal.rate;
    let lastCalculatedPrices = null;
    let currentStep = 1;

    let btnPrev = null;
    let btnNext = null;
    let btnCalculate = null;
    let btnSave = null;
    let copyButton = null;
    let attachInvoiceButton = null;

    let wizardStepper = null;
    let wizardSteps = null;

    // --- GUARDAMOS LOS VALORES ORIGINALES PARA COMPARAR ---
    const originalPriceList = isEditMode ? (productToEdit?.pricing?.priceLists?.[0] || {}) : {};
    const originalData = {
        nombre: isEditMode ? (productToEdit?.name || '') : '',
        marca: isEditMode ? (productToEdit?.brand || '') : '',
        categoria: isEditMode ? (productToEdit?.categoryId || '') : '',
        descripcion: isEditMode ? (productToEdit?.description || '') : '',
        costo: isEditMode ? (productToEdit?.pricing?.packageCost || '') : '',
        unidadesPorPaquete: isEditMode ? (productToEdit?.pricing?.unitsPerPackage || '') : '',
        stock: isEditMode ? (productToEdit?.stock?.current || '') : '',
        ganancia: isEditMode ? (originalPriceList.marginPercentage || productToEdit?.pricing?.marginPercentage || '') : '',
        peso: isEditMode ? (productToEdit?.dimensions?.weight || '') : '',
        sku: isEditMode ? (productToEdit?.sku || '') : '',
        barcode: isEditMode ? (productToEdit?.barcode || '') : '',
        
        // Precios originales calculados
        precioUnitario: isEditMode ? (originalPriceList.unitSellPrice || productToEdit?.pricing?.unitSellPrice || 0) : 0,
        precioPaquete: isEditMode ? (originalPriceList.packageSellPrice || productToEdit?.pricing?.packageSellPrice || 0) : 0,
    };
    
    element.innerHTML = `
        <div class="wizard-stepper" id="product-wizard-stepper">
            <div class="step active" data-step="1"><span>Paso 1</span>Básico</div>
            <div class="step" data-step="2"><span>Paso 2</span>Inventario</div>
            <div class="step" data-step="3"><span>Paso 3</span>Precios</div>
            <div class="step" data-step="4"><span>Paso 4</span>Resumen</div>
        </div>

        <div class="wizard-content">
            <form class="product-form" id="product-form">
                <div class="wizard-step" data-step="1" style="display: block;">
                     <div class="form-grid-layout">
                        <div class="form-column-left">
                            <section class="form-section">
                                <h3><i class="bi bi-info-circle-fill me-1"></i> Información Básica</h3>
                                <div class="form-group">
                                    <label for="producto">Nombre <span class="text-danger">*</span></label>
                                    <input type="text" id="producto" required value="${originalData.nombre}">
                                </div>
                                <div class="form-group">
                                    <label for="marca">Marca <span class="text-danger">*</span></label>
                                    <input type="text" id="marca" required value="${originalData.marca}">
                                </div>
                                <div class="form-group">
                                    <label for="categoria">Categoría <span class="text-danger">*</span></label>
                                    <select id="categoria" required>
                                        <option value="">Selecciona</option>
                                       ${categories.map(cat => `<option value="${cat}" ${originalData.categoria === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                                    </select>
                                </div>
                            </section>
                        </div>
                        <div class="form-column-right">
                            <section class="form-section">
                                <h3><i class="bi bi-pencil-square me-1"></i> Detalles</h3>
                                <div class="form-group">
                                    <label for="descripcion">Descripción</label>
                                    <textarea id="descripcion" placeholder="Detalles del producto (opcional)" rows="8">${originalData.descripcion}</textarea>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="2" style="display: none;">
                    <div class="form-grid-layout">
                         <div class="form-column-left">
                            <section class="form-section">
                                <h3><i class="bi bi-archive-fill me-1"></i> Identificadores</h3>
                                <div class="form-group">
                                    <label for="sku">SKU</label>
                                    <input type="text" id="sku" placeholder="Código único (Opcional)" value="${originalData.sku}">
                                </div>
                                <div class="form-group">
                                    <label for="barcode">Código de Barras</label>
                                    <input type="text" id="barcode" placeholder="Ej: 759..." value="${originalData.barcode}">
                                </div>
                            </section>
                        </div>
                        <div class="form-column-right">
                             <section class="form-section">
                                <h3><i class="bi bi-truck me-1"></i> Logística</h3>
                                <div class="form-group">
                                    <label for="proveedor">Proveedor</label>
                                    <select disabled id="proveedor"><option value="">Selecciona (Próximamente)</option></select>
                                </div>
                                <div class="form-group">
                                    <label for="peso">Peso (Kg)</label>
                                    <input type="number" id="peso" step="0.01" placeholder="Opcional" value="${originalData.peso}">
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="3" style="display: none;">
                     <div class="form-grid-layout">
                         <div class="form-column-left">
                             <section class="form-section">
                                <h3><i class="bi bi-calculator-fill me-1"></i> Cálculo de Precios</h3>
                                <div class="form-group">
                                    <label for="costo">Costo Paquete (${simboloPrincipal}) <span class="text-danger">*</span></label>
                                    <input type="number" id="costo" step="0.01" required value="${originalData.costo}">
                                </div>
                                <div class="form-group">
                                    <label for="ganancia">Ganancia (%) <span class="text-danger">*</span></label>
                                    <input type="number" id="ganancia" step="0.1" required value="${originalData.ganancia}">
                                </div>
                             </section>
                         </div>
                         <div class="form-column-right">
                            <section class="form-section">
                                <h3><i class="bi bi-box-seam me-1"></i> Inventario Inicial</h3>
                                <div class="input-group" style="display: flex; gap: 1rem;">
                                    <div style="flex: 1;" class="form-group">
                                        <label for="paquetes">Paquetes</label>
                                        <input type="number" id="paquetes" placeholder="Opc." min="1">
                                    </div>
                                    <div style="flex: 1;" class="form-group">
                                        <label for="unidades-por-paquete">Unid./Paquete</label>
                                        <input type="number" id="unidades-por-paquete" placeholder="Opc." min="1" value="${originalData.unidadesPorPaquete}">
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom: 3.5rem;">
                                    <label for="unidades">Stock ${isEditMode ? 'Total' : 'Inicial'} (Unidades) <span class="text-danger">*</span></label>
                                    <input type="number" id="unidades" required min="1" value="${originalData.stock}">
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </form>
            
            <div class="wizard-step" data-step="4" style="display: none;">
                 <div class="product-summary-view" id="summary-view">
                    </div>
            </div>
        </div>
    `;

    // --- Selectores de Formulario ---
    const form = element.querySelector('#product-form');
    const paquetesInput = element.querySelector('#paquetes');
    const unidadesPorPaqueteInput = element.querySelector('#unidades-por-paquete');
    const totalUnidadesInput = element.querySelector('#unidades');
    const costoInput = form.querySelector('#costo');
    const gananciaInput = form.querySelector('#ganancia');
    const nombreInput = form.querySelector('#producto');
    const marcaInput = form.querySelector('#marca');
    const categoriaSelect = form.querySelector('#categoria');
    const descripcionInput = form.querySelector('#descripcion');
    const skuInput = element.querySelector('#sku');
    const barcodeInput = element.querySelector('#barcode');
    const pesoInput = element.querySelector('#peso');

    wizardStepper = element.querySelector('#product-wizard-stepper');
    wizardSteps = element.querySelectorAll('.wizard-step');

    const formatNumber = (num, decimals = 2) => new Intl.NumberFormat('es-VE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num);

    // --- Lógica del Wizard (Navegación) ---

    const updateFooterButtons = (stepNum) => {
        // ... (Esta función se mantiene igual que antes) ...
        if (!btnPrev || !btnNext || !btnCalculate || !btnSave || !copyButton || !attachInvoiceButton) { return; }
        btnPrev.style.display = 'none'; btnNext.style.display = 'none'; btnCalculate.style.display = 'none'; btnSave.style.display = 'none'; copyButton.style.display = 'none'; attachInvoiceButton.style.display = 'none';
        switch (stepNum) {
            case 1: btnNext.style.display = 'inline-flex'; btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`; break;
            case 2: btnPrev.style.display = 'inline-flex'; btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`; btnNext.style.display = 'inline-flex'; btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`; break;
            case 3: btnPrev.style.display = 'inline-flex'; btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`; btnCalculate.style.display = 'inline-flex'; break;
            case 4: btnPrev.style.display = 'inline-flex'; btnPrev.innerHTML = `<i class="bi bi-pencil-fill me-1"></i> Volver a Editar`; /*attachInvoiceButton.style.display = 'inline-flex';*/ /*copyButton.style.display = 'inline-flex';*/ btnSave.style.display = 'inline-flex'; break;
        }
    };

    const showStep = (stepNum) => {
        // ... (Esta función se mantiene igual que antes) ...
        if (stepNum < 1 || stepNum > 4) { return; } currentStep = stepNum;
        if (wizardSteps) { wizardSteps.forEach(step => { step.style.display = (parseInt(step.dataset.step) === currentStep) ? 'block' : 'none'; }); }
        if (wizardStepper) { wizardStepper.querySelectorAll('.step').forEach(step => { const stepData = parseInt(step.dataset.step); step.classList.toggle('active', stepData === currentStep); step.classList.toggle('completed', stepData < currentStep); if (stepData >= currentStep) { step.classList.remove('completed'); } }); }
        updateFooterButtons(currentStep);
    };

    // --- Lógica de Resumen (¡Aquí está la magia!) ---

    /**
     * Controlador principal para el Paso 4.
     * Decide si mostrar el resumen de "Crear" o el de "Editar".
     */
    const calculateAndShowSummary = () => {
        // 1. Obtener todos los valores NUEVOS del formulario
        const costoPorPaquete = parseFloat(costoInput.value) || 0;
        const ganancia = parseFloat(gananciaInput.value) || 0;
        const unidadesEnPaqueteInput = parseInt(unidadesPorPaqueteInput.value);
        const totalUnidadesRegistrarInput = parseInt(totalUnidadesInput.value);
        const paquetes = parseInt(paquetesInput.value);
        
        // 2. Validar campos de cálculo
        if (costoPorPaquete <= 0 || isNaN(ganancia) || ganancia < 0 || !totalUnidadesRegistrarInput || totalUnidadesRegistrarInput <= 0) {
            showToast("Completa Costo(*), Ganancia(*) y Stock(*) con valores válidos.", "warning");
            return false;
        }

        // 3. Obtener valores de texto
        const nombre = nombreInput.value;
        const marca = marcaInput.value;
        const categoria = categoriaSelect.value;
        const descripcion = descripcionInput.value;
        const sku = skuInput.value;
        const barcode = barcodeInput.value;
        const peso = parseFloat(pesoInput.value) || null;

        // 4. Calcular precios
        const unidadesParaCalculoPrecio = unidadesEnPaqueteInput > 0 ? unidadesEnPaqueteInput : 1;
        lastCalculatedPrices = calcularPrecioVenta(costoPorPaquete, ganancia, unidadesParaCalculoPrecio, globalState.settings);

        if (lastCalculatedPrices) {
            // 5. Empaquetar todos los datos NUEVOS
            const newData = {
                nombre, marca, categoria, descripcion, sku, barcode, peso,
                costo: costoPorPaquete,
                ganancia,
                paquetes,
                unidadesPorPaquete: unidadesEnPaqueteInput,
                totalUnidades: totalUnidadesRegistrarInput,
                precios: lastCalculatedPrices
            };

            const summaryContainer = element.querySelector('#summary-view');

            // 6. Decidir qué resumen renderizar
            if (isEditMode) {
                // Modo Edición: Mostrar "diff"
                summaryContainer.innerHTML = renderEditProductSummary(newData, originalData);
            } else {
                // Modo Creación: Mostrar resumen normal
                summaryContainer.innerHTML = renderNewProductSummary(newData);
                // (Se necesitan listeners para el toggle de moneda en el modo "Crear")
                bindCurrencyToggleEvents(summaryContainer);
                bindOfferButtonEvents(summaryContainer);
            }

            showStep(4);
            return true;
        } else {
            showToast("Error al calcular precios.", "error");
            return false;
        }
    };

    /**
     * GENERA EL HTML PARA EL RESUMEN DE UN PRODUCTO NUEVO (PASO 4)
     */
    function renderNewProductSummary(data) {
        // (Esta función no tiene cambios)
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
                            ${renderPriceCardsHTML(data.precios, data.costo, data.ganancia, (data.unidadesPorPaquete || data.totalUnidades))}
                        </div>
                    </section>
                </div>
            </div>
        `;
    }

    /**
     * GENERA EL HTML PARA EL RESUMEN DE EDICIÓN (PASO 4)
     * ¡VERSIÓN 2.0 con Columnas y Lógica de Alerta Corregida!
     */
    function renderEditProductSummary(newData, originalData) {
        
        // --- INICIO DE CORRECCIÓN (Lógica de Alerta) ---
        // Normaliza (null, undefined) a string vacío para una comparación segura
        const fNull = (val) => (val === null || val === undefined) ? '' : val;
        
        // Helper para comparar de forma segura
        const hasChanged = (newVal, oldVal) => {
            const oldSafe = String(fNull(oldVal)).trim();
            const newSafe = String(fNull(newVal)).trim();
            return newSafe !== oldSafe;
        };
        // --- FIN DE CORRECCIÓN (Lógica de Alerta) ---

        // Helper para formatear
        const fCurr = (val) => `${simboloPrincipal}${formatNumber(val)}`;
        const fPerc = (val) => `${val}%`;
        const fStock = (val) => `${val} Unid.`;
        const fText = (val) => fNull(val) || 'N/A';
        const fPeso = (val) => val ? `${val} Kg` : 'N/A';

        // Helper para generar HTML
        const diff = (label, newVal, oldVal, formatter = fText) => {
            if (hasChanged(newVal, oldVal)) {
                // Si cambió
                return `
                <div class="diff-item changed">
                    <span class="diff-label">${label}:</span>
                    <span class="diff-value">
                        <span class="diff-old">${formatter(oldVal)}</span>
                        <i class="bi bi-arrow-right-short"></i>
                        <span class="diff-new">${formatter(newVal)}</span>
                    </span>
                </div>`;
            } else {
                // Si no cambió
                return `
                <div class="diff-item unchanged">
                    <span class="diff-label">${label}:</span>
                    <span class="diff-value">${formatter(newVal)}</span>
                </div>`;
            }
        };

        // --- INICIO DE CORRECCIÓN (Layout de Columnas) ---
        
        // Generar los HTML de cambios por secciones
        const infoChanges = [
            diff('Nombre', newData.nombre, originalData.nombre),
            diff('Marca', newData.marca, originalData.marca),
            diff('Categoría', newData.categoria, originalData.categoria)
        ].join('');
        
        const logisticsChanges = [
            diff('SKU', newData.sku, originalData.sku),
            diff('Cód. Barras', newData.barcode, originalData.barcode),
            diff('Peso', newData.peso, originalData.peso, fPeso)
        ].join('');

        const costStockChanges = [
            diff('Costo Paquete', newData.costo, originalData.costo, fCurr),
            diff('Ganancia', newData.ganancia, originalData.ganancia, fPerc),
            diff('Unid. p/ Paquete', newData.unidadesPorPaquete, originalData.unidadesPorPaquete, fStock),
            diff('Stock Total', newData.totalUnidades, originalData.stock, fStock)
        ].join('');

        const newUnitPrice = newData.precios.precioFinalUnitarioDolar;
        const newPackagePrice = newData.precios.precioFinalMayorDolar;
        const priceChanges = [
            diff('Precio Unitario', newUnitPrice, originalData.precioUnitario, fCurr),
            diff('Precio Paquete', newPackagePrice, originalData.precioPaquete, fCurr)
        ].join('');
        
        // Comprobar si hubo algún cambio EN CUALQUIER SECCIÓN
        const anyChanges = [infoChanges, logisticsChanges, costStockChanges, priceChanges].some(html => html.includes('changed'));

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

        // Devolver el HTML final con el layout de 2 columnas
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
        // --- FIN DE CORRECCIÓN (Layout de Columnas) ---
    }

    /**
     * Helper para renderizar las tarjetas de precio (para MODO CREAR)
     */
    function renderPriceCardsHTML(precios, costo, ganancia, unidadesPaquete) {
        // (Esta función no tiene cambios)
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
     * Añade listeners a los botones de oferta (MODO CREAR)
     */
    function bindOfferButtonEvents(summaryContainer) {
        // (Esta función no tiene cambios)
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
                    manualPriceBox.classList.remove('price-applied');
                    manualPriceLabel.innerHTML = '<i class="bi bi-pencil-fill me-1"></i> Establecer manual:';
                    button.textContent = 'Aplicar';
                    button.classList.remove('cancel-mode');
                    overridePackagePriceInput.value = '';
                } else {
                    overridePackagePriceInput.value = offerPrice;
                    manualPriceBox.classList.add('price-applied');
                    manualPriceLabel.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Precio Aplicado:';
                    button.textContent = 'Cancelar';
                    button.classList.add('cancel-mode');
                }
            });
        }
        
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
    function bindCurrencyToggleEvents(summaryContainer) {
        // (Esta función no tiene cambios)
        summaryContainer.addEventListener('click', (e) => {
            const target = e.target.closest('.currency-toggle');
            if (!target) return;
            const priceCard = target.closest('.summary-price-card');
            if (!priceCard) return;
            
            const principalElement = priceCard.querySelector('.price-main.currency-toggle');
            const baseElement = priceCard.querySelector('.price-secondary.currency-toggle');
            if (!principalElement || !baseElement) return;

            const usdValue = parseFloat(principalElement.dataset.usdValue);
            const vesValue = parseFloat(principalElement.dataset.vesValue);
            if (isNaN(usdValue) || isNaN(vesValue)) return;
            
            const isPrincipalTarget = target === principalElement;
            const currentCurrency = target.dataset.currentCurrency;
            const otherElement = isPrincipalTarget ? baseElement : principalElement;

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

    // --- Lógica de Auto-cálculo y Submit ---

    const autoCalcularUnidades = () => {
        // (Esta función no tiene cambios)
        const paquetes = parseInt(paquetesInput.value) || 0;
        const unidadesPorPaquete = parseInt(unidadesPorPaqueteInput.value) || 0;
        if (paquetes > 0 && unidadesPorPaquete > 0) {
            totalUnidadesInput.value = paquetes * unidadesPorPaquete;
        }
    };

    paquetesInput.addEventListener('input', autoCalcularUnidades);
    unidadesPorPaqueteInput.addEventListener('input', autoCalcularUnidades);

    // --- Inicialización de Botones del Footer ---
    setTimeout(() => {
        // (Esta función no tiene cambios en su lógica)
        const modalFooterContainer = modalElementRef.querySelector('#modal-footer-container');
        if (!modalFooterContainer) {
            Logger.error("¡Error fatal! No se encontró #modal-footer-container.");
            showToast("Error interno al inicializar botones.", "error");
            return;
        }
        modalFooterContainer.innerHTML = '';
        
        btnPrev = document.createElement('button');
        btnPrev.type = 'button';
        btnPrev.id = 'modal-btn-prev';
        btnPrev.className = 'btn-secondary me-auto';
        btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`;

        attachInvoiceButton = document.createElement('button');
        attachInvoiceButton.type = 'button';
        attachInvoiceButton.id = 'modal-btn-attach-invoice';
        attachInvoiceButton.className = 'btn-secondary btn-sm me-auto';
        attachInvoiceButton.innerHTML = `<i class="bi bi-paperclip me-1"></i> Adjuntar Factura`;
        attachInvoiceButton.disabled = true;
        attachInvoiceButton.title = 'Adjuntar Factura (Próximamente)';
        attachInvoiceButton.style.backgroundColor = 'var(--bs-gray-500)';

        copyButton = document.createElement('button');
        copyButton.type = 'button';
        copyButton.id = 'modal-btn-copy-summary';
        copyButton.className = 'btn-secondary btn-sm me-auto';
        copyButton.innerHTML = `<i class="bi bi-clipboard-check me-1"></i> Copiar`;
        copyButton.addEventListener('click', () => { /* ... lógica copiar ... */ });
        
        btnNext = document.createElement('button');
        btnNext.type = 'button';
        btnNext.id = 'modal-btn-next';
        btnNext.className = 'btn-primary';
        btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`;

        btnCalculate = document.createElement('button');
        btnCalculate.type = 'button';
        btnCalculate.id = 'modal-btn-calculate';
        btnCalculate.className = 'btn-primary';
        btnCalculate.innerHTML = `<i class="bi bi-calculator me-1"></i> Calcular y Revisar`;

        btnSave = document.createElement('button');
        btnSave.type = 'submit';
        btnSave.id = isEditMode ? 'modal-btn-update' : 'modal-btn-save';
        btnSave.className = 'btn-primary';
        btnSave.innerHTML = `<i class="bi ${isEditMode ? 'bi-arrow-repeat' : 'bi-save-fill'} me-1"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`;
        btnSave.setAttribute('form', 'product-form');

        modalFooterContainer.append(btnPrev, /*attachInvoiceButton, copyButton,*/ btnCalculate, btnNext, btnSave);

        // Mover stepper al header
        try {
            const modalHeader = modalElementRef.querySelector('.modal-header');
            const closeButton = modalElementRef.querySelector('.modal-header .close');
            if (modalHeader && wizardStepper && closeButton) {
                modalHeader.insertBefore(wizardStepper, closeButton);
            }
        } catch (error) {
            Logger.error('[ProductForm] Error al mover el stepper:', error);
        }

        // Listeners de botones del footer
        btnPrev.addEventListener('click', () => {
            if (currentStep === 4) showStep(3);
            else if (currentStep === 3) showStep(2);
            else if (currentStep === 2) showStep(1);
        });

        btnNext.addEventListener('click', () => {
            if (currentStep === 1) {
                const nombre = nombreInput.value;
                const marca = marcaInput.value;
                const categoria = categoriaSelect.value;
                if (!validarCamposTexto(nombre, marca, categoria)) {
                    showToast("Completa Nombre, Marca y Categoría (*).", "warning");
                    return;
                }
                showStep(2);
            } else if (currentStep === 2) {
                showStep(3);
            }
        });

        btnCalculate.addEventListener('click', calculateAndShowSummary);

        // --- Lógica de SUBMIT (Guardar/Actualizar) ---
        form.addEventListener('submit', async (e) => {
            // (Esta función no tiene cambios)
            e.preventDefault();
            if (currentStep !== 4) {
                // Si el usuario presiona "Enter" en un paso anterior, lo forzamos a revisar
                if (calculateAndShowSummary()) {
                    showToast("Por favor, revisa los cambios y presiona 'Actualizar Producto'", "info");
                }
                return;
            }
            if (!lastCalculatedPrices) {
                showToast("Hubo un error al calcular precios. Vuelve al Paso 3.", "warning");
                showStep(3);
                return;
            }

            // Obtener todos los datos finales
            const nombre = nombreInput.value;
            const marca = marcaInput.value;
            const categoria = categoriaSelect.value;
            const descripcion = descripcionInput.value;
            const costo = parseFloat(costoInput.value);
            const ganancia = parseFloat(gananciaInput.value);
            const totalUnidades = parseInt(totalUnidadesInput.value);
            const unidadesPorPaquete = parseInt(unidadesPorPaqueteInput.value) || null;
            const sku = skuInput.value;
            const barcode = barcodeInput.value;
            const peso = parseFloat(pesoInput.value) || null;
            
            // Decidir el precio final del paquete (manual o calculado)
            const overridePackagePriceInput = element.querySelector('#override-package-price');
            const precioPaqueteManual = overridePackagePriceInput ? parseFloat(overridePackagePriceInput.value) : NaN;
            const precioPaqueteFinal = !isNaN(precioPaqueteManual) && precioPaqueteManual > 0 ? precioPaqueteManual : lastCalculatedPrices.precioFinalMayorDolar;

            btnSave.disabled = true;
            btnSave.innerHTML = `<i class="bi bi-hourglass-split me-1"></i> Guardando...`;

            // Construir el objeto final (estructura ideal)
            const productData = {
                name: nombre,
                brand: marca,
                categoryId: categoria,
                description: descripcion,
                sku: sku || null,
                barcode: barcode || null,
                isActive: productToEdit?.isActive ?? true,
                isFeatured: productToEdit?.isFeatured ?? false,
                
                dimensions: {
                    weight: peso,
                    weightUnit: 'kg',
                    width: productToEdit?.dimensions?.width || null,
                    height: productToEdit?.dimensions?.height || null,
                    depth: productToEdit?.dimensions?.depth || null,
                    dimensionUnit: productToEdit?.dimensions?.dimensionUnit || 'cm'
                },

                stock: { 
                    current: totalUnidades, 
                    minThreshold: productToEdit?.stock?.minThreshold ?? 10, 
                    warehouseId: productToEdit?.stock?.warehouseId ?? 'wh_principal' 
                }, 

                pricing: {
                    packageCost: costo,
                    unitsPerPackage: unidadesPorPaquete,
                    taxRatePercentage: tasaIVA,
                    priceLists: [
                        {
                            id: "publico",
                            name: "Precio Público",
                            marginPercentage: ganancia,
                            unitSellPrice: lastCalculatedPrices.precioFinalUnitarioDolar,
                            packageSellPrice: precioPaqueteFinal
                        }
                    ]
                },

                createdAt: productToEdit?.createdAt || new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                supplier: productToEdit?.supplier || null // (Campo 'proveedor' aún no está implementado)
            };
            
            if (isEditMode) {
                productData.id = productToEdit.id;
            }
            
            try { 
                if (isEditMode) { 
                    await updateProductInState(globalState, productData.id, productData); 
                    showToast(`Producto "${nombre}" actualizado.`, "success"); 
                } else { 
                    if (productoExiste(nombre, marca, globalState.products)) { 
                        showToast("Ya existe producto con nombre y marca.", "error"); 
                        showStep(1); 
                        throw new Error("Producto duplicado"); 
                    } else {
                        // NOTA: 'addProductToState' AÚN NO CREA LA SUB-COLECCIÓN 'inventory_lots'
                        // Eso lo haremos con un WriteBatch en el futuro.
                        await addProductToState(globalState, productData); 
                        showToast(`Producto "${nombre}" creado.`, "success"); 
                    } 
                } 
                modalElementRef.remove(); 
            } catch (error) { 
                Logger.error("Error al guardar:", error); 
                if (error.message !== "Producto duplicado") { 
                    showToast("Error al guardar.", "error"); 
                } 
            } finally { 
                btnSave.disabled = false; 
                btnSave.innerHTML = `<i class="bi ${isEditMode ? 'bi-arrow-repeat' : 'bi-save-fill'} me-1"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`; 
            }
        });

        // Mostrar el primer paso
        updateFooterButtons(currentStep);
    }, 50);

    return element;
}