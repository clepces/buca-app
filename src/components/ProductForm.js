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


    element.innerHTML = `
        <style>
            .form-section, .summary-section {padding-bottom: 0rem;}
            /* ... (Estilos CSS anteriores se mantienen) ... */
            .product-form-wrapper { display: flex; flex-direction: column; width: 100%; flex-grow: 1; }
            .wizard-stepper { display: flex; justify-content: space-between; width: 100%; padding: 1.5rem 1rem; border-bottom: 1px solid var(--bs-border-color); }
            .wizard-stepper .step { display: flex; flex-direction: column; align-items: center; color: var(--bs-gray-500); font-size: 0.8rem; position: relative; flex-grow: 1; }
            .wizard-stepper .step span { font-weight: 600; font-size: 0.9rem; }
            .wizard-stepper .step:not(:last-child)::after { content: ''; position: absolute; top: 50%; left: 50%; height: 2px; width: 100%; background-color: var(--bs-border-color); transform: translateY(-50%); z-index: -1; }
            .wizard-stepper .step.active, .wizard-stepper .step.completed { color: var(--primary-color); }
            .wizard-stepper .step.completed::before { content: '✓'; display: flex; align-items: center; justify-content: center; width: 28px; height: 28px; border-radius: 50%; background-color: var(--primary-color); color: var(--bs-white); margin-bottom: 4px; font-weight: 700; }
            .wizard-stepper .step.active::before { content: ''; display: flex; width: 28px; height: 28px; border-radius: 50%; background-color: var(--bs-white); border: 2px solid var(--primary-color); box-shadow: 0 0 0 4px var(--primary-light-hover); margin-bottom: 4px; }
            .wizard-stepper .step:not(.active):not(.completed)::before { content: ''; display: flex; width: 28px; height: 28px; border-radius: 50%; background-color: var(--bs-gray-200); border: 2px solid var(--bs-border-color); margin-bottom: 4px; }
            .wizard-stepper .step.completed:not(:last-child)::after { background-color: var(--primary-color); }
            .wizard-stepper .step.disabled:not(:last-child)::after { background-color: var(--bs-border-color); }
            .wizard-stepper .step.disabled { color: var(--bs-gray-400); cursor: not-allowed; }
            .wizard-stepper .step.disabled::before { background-color: var(--bs-gray-100); border-color: var(--bs-gray-200); }
            .wizard-content { padding: 1.5rem 0rem 1rem 0rem; flex-grow: 1; display: flex; flex-direction: column; }
            .wizard-step { flex-grow: 1; }
            .modal-header .wizard-stepper { padding: 0; border-bottom: none; flex-grow: 1; margin: 0 1.5rem; max-width: 550px; }
            .modal-header .wizard-stepper .step { font-size: 0.7rem; padding: 0 0.25rem; }
            .modal-header .wizard-stepper .step span { font-size: 0.8rem; font-weight: 500; }
            .modal-header .wizard-stepper .step::before, .modal-header .wizard-stepper .step.completed::before, .modal-header .wizard-stepper .step.active::before { width: 20px; height: 20px; font-size: 0.8rem; margin-bottom: 2px; }
            .modal-header .wizard-stepper .step.active::before { border-width: 2px; box-shadow: 0 0 0 3px var(--primary-light-hover); }
            .modal-header .wizard-stepper .step:not(:last-child)::after { top: 10px; }
            .modal-header .modal-title { flex-shrink: 0; }
            .summary-price-card .card-header { display: flex; align-items: center; gap: 0.5rem; justify-content: center; }
            .summary-price-card .card-header i { font-size: 1rem; }
            
            .unit-price .card-body {
                display: grid;
                grid-template-columns: 1fr auto; 
                align-items: center;
                gap: 1rem;
                text-align: left; 
            }
            .unit-price .price-cluster .price-main {
                font-size: 2rem; 
                font-weight: 700;
                color: var(--primary-color);
                line-height: 1.1;
                cursor: pointer;
            }
            .unit-price .price-cluster .price-secondary {
                font-size: 1rem;
                color: var(--bs-gray-600);
                cursor: pointer;
                line-height: 1.1;
            }
            .unit-price .price-details, .package-price .price-details {
                font-size: 0.85rem;
                color: var(--bs-gray-600);
                line-height: 1.4;
                text-align: right; 
            }

            .package-price .card-body {
                display: flex;
                flex-direction: column;
                align-items: stretch; 
                gap: 1rem; 
            }
            
            .package-price .price-header-grid {
                display: grid;
                grid-template-columns: 1fr auto; 
                align-items: center;
                gap: 1rem;
                text-align: left;
            }

            .package-price .price-cluster .price-main {
                font-size: 1.8rem;
                font-weight: 700;
                color: var(--primary-color);
                line-height: 1.1;
                cursor: pointer;
            }
            .package-price .price-cluster .price-secondary {
                font-size: 1rem;
                color: var(--bs-gray-600);
                cursor: pointer;
                line-height: 1.1;
            }
            .package-controls-grid {
                display: grid;
                grid-template-columns: 1fr 1fr; 
                gap: 1rem;
                align-items: stretch; 
            }
            .discount-suggestion-box {
                background-color: var(--primary-light-hover);
                border: 1px dashed var(--primary-color);
                border-radius: var(--bs-border-radius);
                padding: 0.75rem 1rem;
                display: flex;
                flex-direction: column; 
                justify-content: center; 
                width: 100%;
                gap: 0.5rem;
            }
            [data-bs-theme="dark"] .discount-suggestion-box {
                 background-color: rgba(59, 130, 246, 0.15);
                 border-color: var(--primary-color);
            }
            .discount-suggestion-box .discount-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
            }
            .discount-suggestion-box span {
                font-size: 0.8rem;
                font-weight: 600;
                color: var(--primary-dark);
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            [data-bs-theme="dark"] .discount-suggestion-box span { color: var(--primary-light); }
            .discount-suggestion-box span i { color: var(--primary-color); font-size: 0.9rem; }
            .discount-suggestion-box strong {
                font-size: 1rem;
                font-weight: 700;
                color: var(--primary-color);
            }
            .btn-apply-discount {
                background-color: var(--primary-color);
                color: var(--bs-white);
                border: none;
                border-radius: var(--bs-border-radius-sm);
                padding: 0.25rem 0.75rem;
                font-size: 0.8rem;
                font-weight: 600;
                cursor: pointer;
                transition: background-color 0.2s;
                align-self: auto; 
            }
            .btn-apply-discount:hover { background-color: var(--primary-dark); }
            
            /* --- INICIO MODIFICACIÓN: Estilo botón Cancelar Oferta --- */
            .btn-apply-discount.cancel-mode {
                background-color: var(--bs-gray-500); /* Color gris para cancelar */
                color: var(--bs-white);
            }
            .btn-apply-discount.cancel-mode:hover {
                background-color: var(--bs-gray-600);
            }
            /* --- FIN MODIFICACIÓN --- */

            .manual-input-box {
                display: flex;
                flex-direction: column; 
                justify-content: center; 
                border: 1px solid var(--bs-border-color); 
                border-radius: var(--bs-border-radius);
                padding: 0.75rem 1rem;
                background-color: var(--bs-gray-50); 
                transition: background-color 0.3s, border-color 0.3s; 
            }
            [data-bs-theme="dark"] .manual-input-box {
                background-color: rgba(75, 85, 99, 0.2);
                border-color: var(--bs-border-color);
            }
            .package-price-label {
                font-size: 0.8rem;
                color: var(--bs-gray-600);
                margin-bottom: 0.5rem; 
                display: flex; 
                align-items: center;
                gap: 0.35rem;
                text-align: left; 
                font-weight: 600; 
                transition: color 0.3s; 
            }
            .override-price-group {
                display: flex; 
                width: 100%; 
                max-width: none; 
                margin-top: 0; 
            }
            
            /* --- INICIO MODIFICACIÓN: Estilos base para input-group-text --- */
            .override-price-group .input-group-text {
                font-size: 1.2rem; 
                font-weight: 600;
                color: var(--bs-gray-600);
                padding: 0.5rem 0.75rem;
                transition: color 0.3s, background-color 0.3s, border-color 0.3s; 
                background-color: var(--bs-gray-200); 
                border-top: 1px solid var(--bs-border-color); /* Borde superior */
                border-bottom: 1px solid var(--bs-border-color); /* Borde inferior */
                border-left: 1px solid var(--bs-border-color); /* Borde izquierdo */
                border-right: none; /* Sin borde derecho */
                border-radius: var(--bs-border-radius-sm) 0 0 var(--bs-border-radius-sm);
            }
            /* --- FIN MODIFICACIÓN --- */
            .override-price-group input.form-control {
                flex: 1 1 auto;
                font-size: 1.1rem;
                font-weight: 600;
                text-align: center;
                transition: color 0.3s, background-color 0.3s, border-color 0.3s;
                border-radius: 0 var(--bs-border-radius-sm) var(--bs-border-radius-sm) 0;
                border-top: 1px solid var(--bs-border-color);
                border-bottom: 1px solid var(--bs-border-color);
                border-left: none;
                border-right: 1px solid var(--bs-border-color);
                /* Hereda border-color de input base */
            }

            [data-bs-theme="dark"] .override-price-group .input-group-text {
                  background-color: #3a3f51;
                  border-color: var(--bs-border-color); /* Asegura que los 3 bordes usen el color correcto */
                  color: var(--bs-gray-400);
             }

            .manual-input-box.price-applied {
                background-color: rgba(23, 198, 83, 0.1); 
                border-color: var(--bs-success); 
            }
            .manual-input-box.price-applied .package-price-label {
                color: var(--bs-success); 
            }
            
            /* --- INICIO MODIFICACIÓN: Estilos aplicados para input-group-text --- */
            .manual-input-box.price-applied .override-price-group .input-group-text {
                color: var(--bs-success); 
                background-color: rgba(23, 198, 83, 0.05);
                border-top-color: var(--bs-success); /* Colorea borde superior */
                border-bottom-color: var(--bs-success); /* Colorea borde inferior */
                border-left-color: var(--bs-success); /* Colorea borde izquierdo */
                /* border-right sigue siendo none */
            }
            /* --- FIN MODIFICACIÓN --- */

             .manual-input-box.price-applied .override-price-group input.form-control {
                 color: var(--bs-success); 
                 border-color: var(--bs-success);
                 background-color: rgba(23, 198, 83, 0.05);
             }
            
            .package-price-note {
                font-size: 0.75rem;
                color: var(--bs-gray-500);
                margin-top: 0.75rem; 
                text-align: center;
                display: block;
                width: 100%;
            }

            #modal-body-container { height: 75vh;  }

            .construction-notice {
                background-color: var(--primary-light-hover);
                border: 1px solid var(--primary-light);
                color: var(--primary-dark);
                border-radius: var(--bs-border-radius);
                padding: 1rem 1.5rem;
                margin-bottom: 1.5rem;
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-size: 0.9rem;
                font-weight: 500;
            }
            .construction-notice i {
                font-size: 1.2rem;
                color: var(--primary-color);
            }
            [data-bs-theme="dark"] .construction-notice {
                background-color: rgba(59, 130, 246, 0.15);
                border-color: var(--primary-color);
                color: var(--primary-light);
            }
             [data-bs-theme="dark"] .construction-notice i {
                 color: var(--primary-light);
             }
        </style>

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
                                    <input type="text" id="producto" required value="${isEditMode ? (productToEdit?.name || '') : ''}">
                                </div>
                                <div class="form-group">
                                    <label for="marca">Marca <span class="text-danger">*</span></label>
                                    <input type="text" id="marca" required value="${isEditMode ? (productToEdit?.brand || '') : ''}">
                                </div>
                                <div class="form-group">
                                    <label for="categoria">Categoría <span class="text-danger">*</span></label>
                                    <select id="categoria" required>
                                        <option value="">Selecciona</option>
                                        ${categories.map(cat => `<option value="${cat}" ${isEditMode && productToEdit?.categoryId === cat ? 'selected' : ''}>${cat}</option>`).join('')}
                                    </select>
                                </div>
                            </section>
                        </div>
                        <div class="form-column-right">
                            <section class="form-section">
                                <h3><i class="bi bi-pencil-square me-1"></i> Detalles</h3>
                                <div class="form-group">
                                    <label for="descripcion">Descripción</label>
                                    <textarea id="descripcion" placeholder="Detalles del producto (opcional)" rows="8">${isEditMode ? (productToEdit?.description || '') : ''}</textarea>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>

                <div class="wizard-step" data-step="2" style="display: none;">

                    <div class="construction-notice">
                        <i class="bi bi-tools"></i>
                        <span>Esta sección está en construcción. ¡Próximamente podrás gestionar el inventario detallado!</span>
                    </div>

                    <div class="form-grid-layout">
                         <div class="form-column-left future-section">
                            <section class="form-section">
                                <h3><i class="bi bi-archive-fill me-1"></i> Inventario</h3>
                                <div class="form-group">
                                    <label for="sku">SKU</label>
                                    <input disabled type="text" id="sku" placeholder="Código único (Opcional)">
                                </div>
                                <div class="form-group">
                                    <label for="barcode">Código de Barras</label>
                                    <input disabled type="text" id="barcode" placeholder="Ej: 759...">
                                </div>
                            </section>
                        </div>
                        <div class="form-column-right future-section">
                             <section class="form-section">
                                <h3><i class="bi bi-truck me-1"></i> Logística</h3>
                                <div class="form-group">
                                    <label for="proveedor">Proveedor</label>
                                    <select disabled id="proveedor"><option value="">Selecciona (Opcional)</option></select>
                                </div>
                                <div class="form-group">
                                    <label for="peso">Peso (Kg)</label>
                                    <input disabled type="number" id="peso" step="0.01" placeholder="Opcional">
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
                                    <input type="number" id="costo" step="0.01" required value="${isEditMode ? (productToEdit?.pricing?.packageCost || '') : ''}">
                                </div>
                                <div class="form-group">
                                    <label for="ganancia">Ganancia (%) <span class="text-danger">*</span></label>
                                    <input type="number" id="ganancia" step="0.1" required value="${isEditMode ? (productToEdit?.pricing?.marginPercentage || '') : ''}">
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
                                        <input type="number" id="unidades-por-paquete" placeholder="Opc." min="1" value="${isEditMode ? (productToEdit?.pricing?.unitsPerPackage || '') : ''}">
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom: 3.5rem;">
                                    <label for="unidades">Stock Inicial (Unidades) <span class="text-danger">*</span></label>
                                    <input type="number" id="unidades" required min="1" value="${isEditMode ? (productToEdit?.stock?.current || '') : ''}">
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </form>
            <div class="wizard-step" data-step="4" style="display: none;">
                 <div class="product-summary-view" id="summary-view">
                    <div class="summary-grid-layout">
                        <div class="summary-column-left">
                             <section class="summary-section">
                                <h3><i class="bi bi-info-circle-fill me-1"></i> Información Básica</h3>
                                <div class="summary-basic-info summary-purchase-info">
                                    <div class="info-item"><span>Nombre:</span> <strong id="summary-nombre">N/A</strong></div>
                                    <div class="info-item"><span>Marca:</span> <strong id="summary-marca">N/A</strong></div>
                                    <div class="info-item"><span>Categoría:</span> <strong id="summary-categoria">N/A</strong></div>
                                    <div class="info-item description-item"><span>Descripción:</span> <em id="summary-descripcion">Ninguna</em></div>
                                </div>
                            </section>
                            <section class="summary-section">
                                <h3><i class="bi bi-receipt me-1"></i> Resumen de Compra</h3>
                                <div class="summary-purchase-info">
                                    <div class="purchase-item"><span>Costo Paquete:</span> <strong><span id="summary-costo-paquete">$0.00</span></strong></div>
                                    <div class="purchase-item"><span>Cantidad Paquetes:</span> <strong id="summary-cantidad-paquetes">N/A</strong></div>
                                    <div class="purchase-item"><span>Unidades/Paquete:</span> <strong id="summary-unidades-paquete">N/A</strong></div>
                                    <div class="purchase-item"><span>Stock Inicial (Unidades):</span> <strong id="summary-stock-inicial">0</strong></div>
                                    <div class="total-cost"><span>Costo Total Compra:</span> <strong><span id="summary-costo-total">$0.00</span></strong></div>
                                </div>
                            </section>
                        </div>
                        <div class="summary-column-right">
                            <section class="summary-section prices-section">
                                <h3><i class="bi bi-tags-fill me-1"></i> Precios de Venta</h3>
                                <div class="summary-prices-grid">
                                    
                                    <div class="summary-price-card unit-price">
                                        <div class="card-header"><i class="bi bi-box me-1"></i>Precio Unitario</div>
                                        <div class="card-body">
                                            <div class="price-cluster">
                                                <span class="price-main currency-toggle" id="summary-precio-unidad-principal" data-usd-value="0" data-ves-value="0" data-current-currency="usd" title="Clic para cambiar">${simboloPrincipal}0.00</span>
                                                <span class="price-secondary currency-toggle" id="summary-precio-unidad-base" data-usd-value="0" data-ves-value="0" data-current-currency="ves" title="Clic para cambiar">${simboloBase}0.00</span>
                                            </div>
                                            <small class="price-details">
                                                Costo Unitario: <span id="summary-costo-unidad">$0.00</span><br/>
                                                Ganancia: <span id="summary-ganancia-pct">0</span>% | IVA: ${tasaIVA}%
                                            </small>
                                        </div>
                                    </div>

                                    <div class="summary-price-card package-price">
                                        <div class="card-header"><i class="bi bi-boxes me-1"></i>Precio Paquete (<span id="summary-paquete-unidades">?</span> Unid.)</div>
                                        <div class="card-body">
                                            
                                            <div class="price-header-grid">
                                                <div class="price-cluster">
                                                    <span class="price-main currency-toggle" id="summary-precio-paquete-principal" data-usd-value="0" data-ves-value="0" data-current-currency="usd" title="Clic para cambiar">${simboloPrincipal}0.00</span>
                                                    <span class="price-secondary currency-toggle" id="summary-precio-paquete-base" data-usd-value="0" data-ves-value="0" data-current-currency="ves" title="Clic para cambiar">${simboloBase}0.00</span>
                                                </div>
                                                <small class="price-details">
                                                    Costo Paquete: <span id="summary-costo-paquete-detalle">$0.00</span><br/>
                                                    Ganancia: <span id="summary-ganancia-pct-detalle">0</span>% | IVA: ${tasaIVA}%
                                                </small>
                                            </div>

                                            <div class="package-controls-grid">
                                                <div class="discount-suggestion-box">
                                                    <div class="discount-header">
                                                        <span><i class="bi bi-star-fill"></i> Oferta (2.5%)</span>
                                                        <strong id="summary-precio-paquete-oferta">${simboloPrincipal}0.00</strong>
                                                    </div>
                                                    <button type="button" class="btn-apply-discount" id="btn-apply-package-offer" title="Aplicar precio de oferta">Aplicar</button>
                                                </div>
                                                
                                                <div class="manual-input-box" id="manual-package-price-box">
                                                    <label for="override-package-price" class="package-price-label" id="manual-package-price-label">
                                                        <i class="bi bi-pencil-fill me-1"></i> O establecer manual:
                                                    </label>
                                                    <div class="input-group input-group-sm override-price-group">
                                                        <span class="input-group-text">${simboloPrincipal}</span>
                                                        <input type="number" step="0.01" class="form-control form-control-sm" id="override-package-price" placeholder="0.00" title="Opcional: Establecer precio de paquete manualmente">
                                                    </div>
                                                </div>
                                            </div>
                                             
                                            <span class="package-price-note">
                                                Precio calculado: <span id="summary-paquete-precio-calculado-nota">$0.00</span>.
                                            </span>
                                            
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    // --- (El resto del código JS sigue exactamente igual que en la respuesta anterior) ---
    // ...
    // ... (populateForm, updateFooterButtons, showStep, resetManualInputStyle, populateSummaryView, etc.) ...
    // ...
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
    const overridePackagePriceInput = element.querySelector('#override-package-price');
    const manualPriceBox = element.querySelector('#manual-package-price-box');
    const manualPriceLabel = element.querySelector('#manual-package-price-label');

    wizardStepper = element.querySelector('#product-wizard-stepper');
    wizardSteps = element.querySelectorAll('.wizard-step');

    const summaryElements = {
        nombre: element.querySelector('#summary-nombre'),
        marca: element.querySelector('#summary-marca'),
        categoria: element.querySelector('#summary-categoria'),
        descripcion: element.querySelector('#summary-descripcion'),
        costoPaquete: element.querySelector('#summary-costo-paquete'),
        cantidadPaquetes: element.querySelector('#summary-cantidad-paquetes'),
        unidadesPaquete: element.querySelector('#summary-unidades-paquete'),
        stockInicial: element.querySelector('#summary-stock-inicial'),
        costoTotal: element.querySelector('#summary-costo-total'),
        precioUnidadPrincipal: element.querySelector('#summary-precio-unidad-principal'),
        precioUnidadBase: element.querySelector('#summary-precio-unidad-base'),
        costoUnidad: element.querySelector('#summary-costo-unidad'),
        gananciaPct: element.querySelector('#summary-ganancia-pct'),
        paqueteUnidades: element.querySelector('#summary-paquete-unidades'),
        precioPaquetePrincipal: element.querySelector('#summary-precio-paquete-principal'),
        precioPaqueteBase: element.querySelector('#summary-precio-paquete-base'),
        precioPaqueteOferta: element.querySelector('#summary-precio-paquete-oferta'),
        btnApplyOffer: element.querySelector('#btn-apply-package-offer'),
        precioCalculadoNota: element.querySelector('#summary-paquete-precio-calculado-nota'),
        costoPaqueteDetalle: element.querySelector('#summary-costo-paquete-detalle'),
        gananciaPctDetalle: element.querySelector('#summary-ganancia-pct-detalle'),
    };

    const formatNumber = (num, decimals = 2) => new Intl.NumberFormat('es-VE', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(num);

    const populateForm = (product) => { /* ... (igual) ... */
        nombreInput.value = product.name || '';
        marcaInput.value = product.brand || '';
        categoriaSelect.value = product.categoryId || '';
        descripcionInput.value = product.description || '';
        costoInput.value = product.pricing?.packageCost || '';
        gananciaInput.value = product.pricing?.marginPercentage || '';
        totalUnidadesInput.value = product.stock?.current || '';
        unidadesPorPaqueteInput.value = product.pricing?.unitsPerPackage || '';
        element.querySelector('#sku').value = product.sku || '';
        element.querySelector('#barcode').value = product.barcode || '';
        element.querySelector('#proveedor').value = product.supplier || '';
        element.querySelector('#peso').value = product.weightKg || '';
     };
    if (isEditMode && productToEdit) { populateForm(productToEdit); }

    const updateFooterButtons = (stepNum) => { /* ... (igual) ... */
        if (!btnPrev || !btnNext || !btnCalculate || !btnSave || !copyButton || !attachInvoiceButton) { return; }
        btnPrev.style.display = 'none'; btnNext.style.display = 'none'; btnCalculate.style.display = 'none'; btnSave.style.display = 'none'; copyButton.style.display = 'none'; attachInvoiceButton.style.display = 'none';
        switch (stepNum) {
            case 1: btnNext.style.display = 'inline-flex'; btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`; break;
            case 2: btnPrev.style.display = 'inline-flex'; btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`; btnNext.style.display = 'inline-flex'; btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`; break;
            case 3: btnPrev.style.display = 'inline-flex'; btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`; btnCalculate.style.display = 'inline-flex'; break;
            case 4: btnPrev.style.display = 'inline-flex'; btnPrev.innerHTML = `<i class="bi bi-pencil-fill me-1"></i> Volver a Editar`; attachInvoiceButton.style.display = 'inline-flex'; copyButton.style.display = 'inline-flex'; btnSave.style.display = 'inline-flex'; break;
        }
     };

    const showStep = (stepNum) => { /* ... (igual) ... */
        if (stepNum < 1 || stepNum > 4) { return; } currentStep = stepNum;
        if (wizardSteps) { wizardSteps.forEach(step => { step.style.display = (parseInt(step.dataset.step) === currentStep) ? 'block' : 'none'; }); }
        if (wizardStepper) { wizardStepper.querySelectorAll('.step').forEach(step => { const stepData = parseInt(step.dataset.step); step.classList.toggle('active', stepData === currentStep); step.classList.toggle('completed', stepData < currentStep); if (stepData >= currentStep) { step.classList.remove('completed'); } }); }
        updateFooterButtons(currentStep);
     };

    // --- INICIO MODIFICACIÓN: Función para resetear estilo visual Y el botón de oferta ---
    const resetManualInputStyle = (resetInputValue = false) => {
        const applyButton = summaryElements.btnApplyOffer;
        if (manualPriceBox && manualPriceLabel && applyButton) {
            manualPriceBox.classList.remove('price-applied');
            manualPriceLabel.innerHTML = '<i class="bi bi-pencil-fill me-1"></i> Establecer manual:';
            applyButton.textContent = 'Aplicar';
            applyButton.classList.remove('cancel-mode'); // Quita el estilo 'cancelar'
            applyButton.title = 'Aplicar precio de oferta';
            if (resetInputValue) {
                overridePackagePriceInput.value = ''; // Limpia el input si se cancela
            }
        }
    };
    // --- FIN MODIFICACIÓN ---

    const populateSummaryView = (data) => { /* ... (igual) ... */
        resetManualInputStyle();
        summaryElements.nombre.textContent = data.nombre; summaryElements.marca.textContent = data.marca; summaryElements.categoria.textContent = data.categoria; summaryElements.descripcion.textContent = data.descripcion || 'Ninguna'; summaryElements.costoPaquete.textContent = `${simboloPrincipal}${formatNumber(data.costo)}`; summaryElements.cantidadPaquetes.textContent = data.paquetes || 'N/A'; summaryElements.unidadesPaquete.textContent = data.unidadesPorPaquete || 'N/A'; summaryElements.stockInicial.textContent = data.totalUnidades; summaryElements.costoTotal.textContent = `${simboloPrincipal}${formatNumber(data.costo * (data.paquetes || 1))}`; summaryElements.costoUnidad.textContent = `${simboloPrincipal}${formatNumber(data.precios.costoUnitarioDolar, 4)}`; summaryElements.gananciaPct.textContent = data.ganancia; summaryElements.paqueteUnidades.textContent = data.unidadesPorPaquete || data.totalUnidades;
        const precioUnidadUSD = data.precios.precioFinalUnitarioDolar; const precioUnidadVES = precioUnidadUSD * tasaCambio;
        summaryElements.precioUnidadPrincipal.textContent = `${simboloPrincipal}${formatNumber(precioUnidadUSD)}`; summaryElements.precioUnidadPrincipal.dataset.usdValue = precioUnidadUSD; summaryElements.precioUnidadPrincipal.dataset.vesValue = precioUnidadVES; summaryElements.precioUnidadPrincipal.dataset.currentCurrency = 'usd'; summaryElements.precioUnidadBase.textContent = `${simboloBase}${formatNumber(precioUnidadVES)}`; summaryElements.precioUnidadBase.dataset.usdValue = precioUnidadUSD; summaryElements.precioUnidadBase.dataset.vesValue = precioUnidadVES; summaryElements.precioUnidadBase.dataset.currentCurrency = 'ves';
        const precioPaqueteUSD = data.precios.precioFinalMayorDolar; const precioPaqueteVES = precioPaqueteUSD * tasaCambio; const ofertaDescuento = 0.025; const precioOfertaUSD = precioPaqueteUSD * (1 - ofertaDescuento);
        summaryElements.precioPaquetePrincipal.textContent = `${simboloPrincipal}${formatNumber(precioPaqueteUSD)}`; summaryElements.precioPaquetePrincipal.dataset.usdValue = precioPaqueteUSD; summaryElements.precioPaquetePrincipal.dataset.vesValue = precioPaqueteVES; summaryElements.precioPaquetePrincipal.dataset.currentCurrency = 'usd'; summaryElements.precioPaqueteBase.textContent = `${simboloBase}${formatNumber(precioPaqueteVES)}`; summaryElements.precioPaqueteBase.dataset.usdValue = precioPaqueteUSD; summaryElements.precioPaqueteBase.dataset.vesValue = precioPaqueteVES; summaryElements.precioPaqueteBase.dataset.currentCurrency = 'ves';
        summaryElements.costoPaqueteDetalle.textContent = `${simboloPrincipal}${formatNumber(data.costo)}`; summaryElements.gananciaPctDetalle.textContent = data.ganancia;
        summaryElements.precioPaqueteOferta.textContent = `${simboloPrincipal}${formatNumber(precioOfertaUSD)}`; summaryElements.btnApplyOffer.dataset.offerPrice = precioOfertaUSD.toFixed(2);
        overridePackagePriceInput.placeholder = `${formatNumber(precioOfertaUSD, 2)}`; overridePackagePriceInput.value = ''; summaryElements.precioCalculadoNota.textContent = `${simboloPrincipal}${formatNumber(precioPaqueteUSD)}`;
     };

    const calculateAndShowSummary = () => { /* ... (igual) ... */
         const costoPorPaquete = parseFloat(costoInput.value) || 0; const ganancia = parseFloat(gananciaInput.value) || 0; const unidadesEnPaqueteInput = parseInt(unidadesPorPaqueteInput.value); const totalUnidadesRegistrarInput = parseInt(totalUnidadesInput.value); const paquetes = parseInt(paquetesInput.value);
        if (costoPorPaquete <= 0 || isNaN(ganancia) || ganancia < 0 || !totalUnidadesRegistrarInput || totalUnidadesRegistrarInput <= 0) { showToast("Completa Costo(*), Ganancia(*) y Stock Inicial(*) con valores válidos.", "warning"); return false; }
        const nombre = nombreInput.value; const marca = marcaInput.value; const categoria = categoriaSelect.value; const descripcion = descripcionInput.value;
        const unidadesParaCalculoPrecio = unidadesEnPaqueteInput > 0 ? unidadesEnPaqueteInput : 1; const stockInicial = totalUnidadesRegistrarInput > 0 ? totalUnidadesRegistrarInput : (paquetes > 0 && unidadesEnPaqueteInput > 0 ? paquetes * unidadesEnPaqueteInput : 0);
        lastCalculatedPrices = calcularPrecioVenta(costoPorPaquete, ganancia, unidadesParaCalculoPrecio, globalState.settings);
        if (lastCalculatedPrices) { populateSummaryView({ nombre, marca, categoria, descripcion, costo: costoPorPaquete, ganancia, paquetes, unidadesPorPaquete: unidadesEnPaqueteInput, totalUnidades: stockInicial, precios: lastCalculatedPrices }); showStep(4); return true; } else { showToast("Error al calcular precios.", "error"); return false; }
     };
    const autoCalcularUnidades = () => { /* ... (igual) ... */
        const paquetes = parseInt(paquetesInput.value) || 0; const unidadesPorPaquete = parseInt(unidadesPorPaqueteInput.value) || 0; if (paquetes > 0 && unidadesPorPaquete > 0) { totalUnidadesInput.value = paquetes * unidadesPorPaquete; }
     };

    paquetesInput.addEventListener('input', autoCalcularUnidades);
    unidadesPorPaqueteInput.addEventListener('input', autoCalcularUnidades);

    setTimeout(() => { /* ... (igual: creación botones, mover stepper, listeners prev/next/calculate) ... */
        const modalFooterContainer = modalElementRef.querySelector('#modal-footer-container'); if (!modalFooterContainer) { Logger.error("¡Error fatal! No se encontró #modal-footer-container."); showToast("Error interno al inicializar botones.", "error"); return; } modalFooterContainer.innerHTML = '';
        btnPrev = document.createElement('button'); btnPrev.type = 'button'; btnPrev.id = 'modal-btn-prev'; btnPrev.className = 'btn-secondary me-auto'; btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`;
        attachInvoiceButton = document.createElement('button'); attachInvoiceButton.type = 'button'; attachInvoiceButton.id = 'modal-btn-attach-invoice'; attachInvoiceButton.className = 'btn-secondary btn-sm me-auto'; attachInvoiceButton.innerHTML = `<i class="bi bi-paperclip me-1"></i> Adjuntar Factura`; attachInvoiceButton.disabled = true; attachInvoiceButton.title = 'Adjuntar Factura (Próximamente)'; attachInvoiceButton.style.backgroundColor = 'var(--bs-gray-500)';
        copyButton = document.createElement('button'); copyButton.type = 'button'; copyButton.id = 'modal-btn-copy-summary'; copyButton.className = 'btn-secondary btn-sm me-auto'; copyButton.innerHTML = `<i class="bi bi-clipboard-check me-1"></i> Copiar`; copyButton.addEventListener('click', () => { /* ... lógica copiar ... */ });
        btnNext = document.createElement('button'); btnNext.type = 'button'; btnNext.id = 'modal-btn-next'; btnNext.className = 'btn-primary'; btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`;
        btnCalculate = document.createElement('button'); btnCalculate.type = 'button'; btnCalculate.id = 'modal-btn-calculate'; btnCalculate.className = 'btn-primary'; btnCalculate.innerHTML = `<i class="bi bi-calculator me-1"></i> Calcular y Revisar`;
        btnSave = document.createElement('button'); btnSave.type = 'submit'; btnSave.id = isEditMode ? 'modal-btn-update' : 'modal-btn-save'; btnSave.className = 'btn-primary'; btnSave.innerHTML = `<i class="bi ${isEditMode ? 'bi-arrow-repeat' : 'bi-save-fill'} me-1"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`; btnSave.setAttribute('form', 'product-form');
        modalFooterContainer.append(btnPrev, attachInvoiceButton, copyButton, btnCalculate, btnNext, btnSave);
        try { const modalHeader = modalElementRef.querySelector('.modal-header'); const closeButton = modalElementRef.querySelector('.modal-header .close'); if (modalHeader && wizardStepper && closeButton) { modalHeader.insertBefore(wizardStepper, closeButton); } else { Logger.warn('[ProductForm] No se pudo mover el stepper al header.'); } } catch (error) { Logger.error('[ProductForm] Error al mover el stepper:', error); }
        btnPrev.addEventListener('click', () => { if (currentStep === 4) showStep(3); else if (currentStep === 3) showStep(2); else if (currentStep === 2) showStep(1); });
        btnNext.addEventListener('click', () => { if (currentStep === 1) { const nombre = nombreInput.value; const marca = marcaInput.value; const categoria = categoriaSelect.value; if (!validarCamposTexto(nombre, marca, categoria)) { showToast("Completa Nombre, Marca y Categoría (*).", "warning"); return; } showStep(2); } else if (currentStep === 2) { showStep(3); } });
        btnCalculate.addEventListener('click', calculateAndShowSummary);

        form.addEventListener('submit', async (e) => { /* ... (igual: submit logic) ... */
            e.preventDefault(); if (!lastCalculatedPrices) { showToast("Calcula los precios antes de guardar.", "warning"); return; }
            const nombre = nombreInput.value; const marca = marcaInput.value; const categoria = categoriaSelect.value; const costo = parseFloat(costoInput.value); const ganancia = parseFloat(gananciaInput.value); const totalUnidades = parseInt(totalUnidadesInput.value); const unidadesPorPaquete = parseInt(unidadesPorPaqueteInput.value) || null; const paquetes = parseInt(paquetesInput.value) || null; const descripcion = descripcionInput.value; const precioPaqueteManual = parseFloat(overridePackagePriceInput.value); const sku = element.querySelector('#sku').value; const barcode = element.querySelector('#barcode').value; const proveedor = element.querySelector('#proveedor').value; const peso = element.querySelector('#peso').value;
            if (!validarCamposTexto(nombre, marca, categoria) || !totalUnidades || totalUnidades <= 0 || isNaN(costo) || costo < 0 || isNaN(ganancia) || ganancia < 0) { showToast("Completa campos requeridos (*).", "error"); showStep(1); return; }
            btnSave.disabled = true; btnSave.innerHTML = `<i class="bi bi-hourglass-split me-1"></i> Guardando...`;
            const precioPaqueteFinal = !isNaN(precioPaqueteManual) && precioPaqueteManual > 0 ? precioPaqueteManual : lastCalculatedPrices.precioFinalMayorDolar;
            const productData = { id: isEditMode ? productToEdit.id : Date.now().toString() + Math.random().toString(36).substring(2, 7), name: nombre, brand: marca, categoryId: categoria, description: descripcion, sku: sku || null, barcode: barcode || null, supplier: proveedor || null, weightKg: !isNaN(parseFloat(peso)) ? parseFloat(peso) : null, stock: { current: totalUnidades, minThreshold: productToEdit?.stock?.minThreshold ?? 10, warehouseId: productToEdit?.stock?.warehouseId ?? 'wh_principal' }, pricing: { packageCost: costo, unitsPerPackage: unidadesPorPaquete, taxRatePercentage: tasaIVA, unitSellPrice: lastCalculatedPrices.precioFinalUnitarioDolar, packageSellPrice: precioPaqueteFinal, marginPercentage: ganancia }, isActive: productToEdit?.isActive ?? true, };
            try { if (isEditMode) { await updateProductInState(globalState, productData.id, productData); showToast(`Producto "${nombre}" actualizado.`, "success"); } else { if (productoExiste(nombre, marca, globalState.products)) { showToast("Ya existe producto con nombre y marca.", "error"); showStep(1); throw new Error("Producto duplicado"); } else { await addProductToState(globalState, productData); showToast(`Producto "${nombre}" creado.`, "success"); } } modalElementRef.remove(); } catch (error) { Logger.error("Error al guardar:", error); if (error.message !== "Producto duplicado") { showToast("Error al guardar.", "error"); } } finally { btnSave.disabled = false; btnSave.innerHTML = `<i class="bi ${isEditMode ? 'bi-arrow-repeat' : 'bi-save-fill'} me-1"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`; }
        });
        updateFooterButtons(currentStep);
    }, 50);

    // --- INICIO MODIFICACIÓN: Listener botón "Aplicar/Cancelar" ---
    element.querySelector('#btn-apply-package-offer').addEventListener('click', (e) => {
        const button = e.currentTarget;
        const offerPrice = button.dataset.offerPrice;
        const isApplied = manualPriceBox.classList.contains('price-applied');

        if (isApplied) {
            // Si ya está aplicado -> Cancelar
            resetManualInputStyle(true); // Resetea estilo Y limpia el input
        } else {
            // Si no está aplicado -> Aplicar
            if (offerPrice && manualPriceBox && manualPriceLabel) {
                overridePackagePriceInput.value = offerPrice;
                manualPriceBox.classList.add('price-applied'); // Añade clase verde
                manualPriceLabel.innerHTML = '<i class="bi bi-check-circle-fill me-1"></i> Precio Aplicado:'; // Cambia texto y icono
                button.textContent = 'Cancelar'; // Cambia texto del botón
                button.classList.add('cancel-mode'); // Añade clase para estilo gris
                button.title = 'Cancelar aplicación de oferta';
            }
        }
    });
    // --- FIN MODIFICACIÓN ---

    overridePackagePriceInput.addEventListener('input', () => {
        // Quita estilo verde y restaura texto/botón al escribir manualmente
        resetManualInputStyle(false); // Pasamos 'false' para NO limpiar el input
    });

    element.querySelector('#summary-view').addEventListener('click', (e) => { /* ... (igual: currency toggle logic) ... */
        const target = e.target.closest('.currency-toggle'); if (!target) return; const priceCard = target.closest('.summary-price-card'); if (!priceCard) return; const principalElement = priceCard.querySelector('.price-main.currency-toggle'); const baseElement = priceCard.querySelector('.price-secondary.currency-toggle'); if (!principalElement || !baseElement) return; const isPrincipalTarget = target === principalElement; const usdValue = parseFloat(principalElement.dataset.usdValue); const vesValue = parseFloat(principalElement.dataset.vesValue); const currentCurrency = target.dataset.currentCurrency; const otherElement = isPrincipalTarget ? baseElement : principalElement; if (isNaN(usdValue) || isNaN(vesValue) ) return; if (currentCurrency === 'usd') { target.textContent = `${simboloBase}${formatNumber(vesValue)}`; target.dataset.currentCurrency = 'ves'; otherElement.textContent = `${simboloPrincipal}${formatNumber(usdValue)}`; otherElement.dataset.currentCurrency = 'usd'; } else { target.textContent = `${simboloPrincipal}${formatNumber(usdValue)}`; target.dataset.currentCurrency = 'usd'; otherElement.textContent = `${simboloBase}${formatNumber(vesValue)}`; otherElement.dataset.currentCurrency = 'ves'; }
    });

    return element;
}