import{L as l,s as q,a as S,u as ue,b as pe,c as _,P as G,h as me,d as be,t as ge}from"./index-D_o6p_Zt.js";import{E as ve}from"./EmptyState-DllPb4lQ.js";function fe(o,v,e,t){if(l.info("--- Iniciando de Cálculo ---"),l.info("Costo recibido:",o),l.info("% Ganancia:",v),e<=0)return null;const h=t.products.tax_rate/100,i=t.products.calculation_method;let d;if(i==="margin"){if(v>=100)return console.error("El margen no puede ser 100% o más."),null;d=o/(1-v/100)}else d=o*(1+v/100);l.info("Subtotal (sin IVA):",d);const u=d*h;l.info("Monto del IVA:",u);const m=d+u;l.info("Precio Final Total:",m);const p=m/e;return l.info("Precio Final por Unidad:",p),l.info("--- Final de Cálculo ---"),{costoUnitarioDolar:o/e,subtotalMayorDolar:d,montoIVAMayorDolar:u,precioFinalMayorDolar:m,precioFinalUnitarioDolar:p}}function te(...o){return o.every(v=>v&&v.trim()!=="")}function ye(o,v,e,t=null){return e.some(h=>h.name.toLowerCase()===o.toLowerCase()&&h.brand.toLowerCase()===v.toLowerCase()&&h.id!==t)}function he(o=null,v){const e=document.createElement("div");e.className="product-form-wrapper";const t=o!==null,h=q.settings.products.available_categories||[],i=q.settings.currencies.principal.symbol||"$",d=q.settings.currencies.base.symbol||"Bs.",u=q.settings.products.tax_rate,m=q.settings.currencies.principal.rate;let p=null,b=1,n=null,f=null,x=null,y=null,I=null,k=null,L=null,K=null;e.innerHTML=`
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
                                    <input type="text" id="producto" required value="${t&&o?.name||""}">
                                </div>
                                <div class="form-group">
                                    <label for="marca">Marca <span class="text-danger">*</span></label>
                                    <input type="text" id="marca" required value="${t&&o?.brand||""}">
                                </div>
                                <div class="form-group">
                                    <label for="categoria">Categoría <span class="text-danger">*</span></label>
                                    <select id="categoria" required>
                                        <option value="">Selecciona</option>
                                        ${h.map(r=>`<option value="${r}" ${t&&o?.categoryId===r?"selected":""}>${r}</option>`).join("")}
                                    </select>
                                </div>
                            </section>
                        </div>
                        <div class="form-column-right">
                            <section class="form-section">
                                <h3><i class="bi bi-pencil-square me-1"></i> Detalles</h3>
                                <div class="form-group">
                                    <label for="descripcion">Descripción</label>
                                    <textarea id="descripcion" placeholder="Detalles del producto (opcional)" rows="8">${t&&o?.description||""}</textarea>
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
                                    <label for="costo">Costo Paquete (${i}) <span class="text-danger">*</span></label>
                                    <input type="number" id="costo" step="0.01" required value="${t&&o?.pricing?.packageCost||""}">
                                </div>
                                <div class="form-group">
                                    <label for="ganancia">Ganancia (%) <span class="text-danger">*</span></label>
                                    <input type="number" id="ganancia" step="0.1" required value="${t&&o?.pricing?.marginPercentage||""}">
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
                                        <input type="number" id="unidades-por-paquete" placeholder="Opc." min="1" value="${t&&o?.pricing?.unitsPerPackage||""}">
                                    </div>
                                </div>
                                <div class="form-group" style="margin-bottom: 3.5rem;">
                                    <label for="unidades">Stock Inicial (Unidades) <span class="text-danger">*</span></label>
                                    <input type="number" id="unidades" required min="1" value="${t&&o?.stock?.current||""}">
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
                                                <span class="price-main currency-toggle" id="summary-precio-unidad-principal" data-usd-value="0" data-ves-value="0" data-current-currency="usd" title="Clic para cambiar">${i}0.00</span>
                                                <span class="price-secondary currency-toggle" id="summary-precio-unidad-base" data-usd-value="0" data-ves-value="0" data-current-currency="ves" title="Clic para cambiar">${d}0.00</span>
                                            </div>
                                            <small class="price-details">
                                                Costo Unitario: <span id="summary-costo-unidad">$0.00</span><br/>
                                                Ganancia: <span id="summary-ganancia-pct">0</span>% | IVA: ${u}%
                                            </small>
                                        </div>
                                    </div>

                                    <div class="summary-price-card package-price">
                                        <div class="card-header"><i class="bi bi-boxes me-1"></i>Precio Paquete (<span id="summary-paquete-unidades">?</span> Unid.)</div>
                                        <div class="card-body">
                                            
                                            <div class="price-header-grid">
                                                <div class="price-cluster">
                                                    <span class="price-main currency-toggle" id="summary-precio-paquete-principal" data-usd-value="0" data-ves-value="0" data-current-currency="usd" title="Clic para cambiar">${i}0.00</span>
                                                    <span class="price-secondary currency-toggle" id="summary-precio-paquete-base" data-usd-value="0" data-ves-value="0" data-current-currency="ves" title="Clic para cambiar">${d}0.00</span>
                                                </div>
                                                <small class="price-details">
                                                    Costo Paquete: <span id="summary-costo-paquete-detalle">$0.00</span><br/>
                                                    Ganancia: <span id="summary-ganancia-pct-detalle">0</span>% | IVA: ${u}%
                                                </small>
                                            </div>

                                            <div class="package-controls-grid">
                                                <div class="discount-suggestion-box">
                                                    <div class="discount-header">
                                                        <span><i class="bi bi-star-fill"></i> Oferta (2.5%)</span>
                                                        <strong id="summary-precio-paquete-oferta">${i}0.00</strong>
                                                    </div>
                                                    <button type="button" class="btn-apply-discount" id="btn-apply-package-offer" title="Aplicar precio de oferta">Aplicar</button>
                                                </div>
                                                
                                                <div class="manual-input-box" id="manual-package-price-box">
                                                    <label for="override-package-price" class="package-price-label" id="manual-package-price-label">
                                                        <i class="bi bi-pencil-fill me-1"></i> O establecer manual:
                                                    </label>
                                                    <div class="input-group input-group-sm override-price-group">
                                                        <span class="input-group-text">${i}</span>
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
    `;const M=e.querySelector("#product-form"),T=e.querySelector("#paquetes"),F=e.querySelector("#unidades-por-paquete"),B=e.querySelector("#unidades"),Y=M.querySelector("#costo"),X=M.querySelector("#ganancia"),O=M.querySelector("#producto"),H=M.querySelector("#marca"),R=M.querySelector("#categoria"),J=M.querySelector("#descripcion"),A=e.querySelector("#override-package-price"),V=e.querySelector("#manual-package-price-box"),j=e.querySelector("#manual-package-price-label");L=e.querySelector("#product-wizard-stepper"),K=e.querySelectorAll(".wizard-step");const s={nombre:e.querySelector("#summary-nombre"),marca:e.querySelector("#summary-marca"),categoria:e.querySelector("#summary-categoria"),descripcion:e.querySelector("#summary-descripcion"),costoPaquete:e.querySelector("#summary-costo-paquete"),cantidadPaquetes:e.querySelector("#summary-cantidad-paquetes"),unidadesPaquete:e.querySelector("#summary-unidades-paquete"),stockInicial:e.querySelector("#summary-stock-inicial"),costoTotal:e.querySelector("#summary-costo-total"),precioUnidadPrincipal:e.querySelector("#summary-precio-unidad-principal"),precioUnidadBase:e.querySelector("#summary-precio-unidad-base"),costoUnidad:e.querySelector("#summary-costo-unidad"),gananciaPct:e.querySelector("#summary-ganancia-pct"),paqueteUnidades:e.querySelector("#summary-paquete-unidades"),precioPaquetePrincipal:e.querySelector("#summary-precio-paquete-principal"),precioPaqueteBase:e.querySelector("#summary-precio-paquete-base"),precioPaqueteOferta:e.querySelector("#summary-precio-paquete-oferta"),btnApplyOffer:e.querySelector("#btn-apply-package-offer"),precioCalculadoNota:e.querySelector("#summary-paquete-precio-calculado-nota"),costoPaqueteDetalle:e.querySelector("#summary-costo-paquete-detalle"),gananciaPctDetalle:e.querySelector("#summary-ganancia-pct-detalle")},P=(r,a=2)=>new Intl.NumberFormat("es-VE",{minimumFractionDigits:a,maximumFractionDigits:a}).format(r);t&&o&&(r=>{O.value=r.name||"",H.value=r.brand||"",R.value=r.categoryId||"",J.value=r.description||"",Y.value=r.pricing?.packageCost||"",X.value=r.pricing?.marginPercentage||"",B.value=r.stock?.current||"",F.value=r.pricing?.unitsPerPackage||"",e.querySelector("#sku").value=r.sku||"",e.querySelector("#barcode").value=r.barcode||"",e.querySelector("#proveedor").value=r.supplier||"",e.querySelector("#peso").value=r.weightKg||""})(o);const Z=r=>{if(!(!n||!f||!x||!y||!I||!k))switch(n.style.display="none",f.style.display="none",x.style.display="none",y.style.display="none",I.style.display="none",k.style.display="none",r){case 1:f.style.display="inline-flex",f.innerHTML='Siguiente <i class="bi bi-arrow-right ms-1"></i>';break;case 2:n.style.display="inline-flex",n.innerHTML='<i class="bi bi-arrow-left me-1"></i> Anterior',f.style.display="inline-flex",f.innerHTML='Siguiente <i class="bi bi-arrow-right ms-1"></i>';break;case 3:n.style.display="inline-flex",n.innerHTML='<i class="bi bi-arrow-left me-1"></i> Anterior',x.style.display="inline-flex";break;case 4:n.style.display="inline-flex",n.innerHTML='<i class="bi bi-pencil-fill me-1"></i> Volver a Editar',k.style.display="inline-flex",I.style.display="inline-flex",y.style.display="inline-flex";break}},E=r=>{r<1||r>4||(b=r,K&&K.forEach(a=>{a.style.display=parseInt(a.dataset.step)===b?"block":"none"}),L&&L.querySelectorAll(".step").forEach(a=>{const c=parseInt(a.dataset.step);a.classList.toggle("active",c===b),a.classList.toggle("completed",c<b),c>=b&&a.classList.remove("completed")}),Z(b))},Q=(r=!1)=>{const a=s.btnApplyOffer;V&&j&&a&&(V.classList.remove("price-applied"),j.innerHTML='<i class="bi bi-pencil-fill me-1"></i> Establecer manual:',a.textContent="Aplicar",a.classList.remove("cancel-mode"),a.title="Aplicar precio de oferta",r&&(A.value=""))},ie=r=>{Q(),s.nombre.textContent=r.nombre,s.marca.textContent=r.marca,s.categoria.textContent=r.categoria,s.descripcion.textContent=r.descripcion||"Ninguna",s.costoPaquete.textContent=`${i}${P(r.costo)}`,s.cantidadPaquetes.textContent=r.paquetes||"N/A",s.unidadesPaquete.textContent=r.unidadesPorPaquete||"N/A",s.stockInicial.textContent=r.totalUnidades,s.costoTotal.textContent=`${i}${P(r.costo*(r.paquetes||1))}`,s.costoUnidad.textContent=`${i}${P(r.precios.costoUnitarioDolar,4)}`,s.gananciaPct.textContent=r.ganancia,s.paqueteUnidades.textContent=r.unidadesPorPaquete||r.totalUnidades;const a=r.precios.precioFinalUnitarioDolar,c=a*m;s.precioUnidadPrincipal.textContent=`${i}${P(a)}`,s.precioUnidadPrincipal.dataset.usdValue=a,s.precioUnidadPrincipal.dataset.vesValue=c,s.precioUnidadPrincipal.dataset.currentCurrency="usd",s.precioUnidadBase.textContent=`${d}${P(c)}`,s.precioUnidadBase.dataset.usdValue=a,s.precioUnidadBase.dataset.vesValue=c,s.precioUnidadBase.dataset.currentCurrency="ves";const g=r.precios.precioFinalMayorDolar,C=g*m,w=g*(1-.025);s.precioPaquetePrincipal.textContent=`${i}${P(g)}`,s.precioPaquetePrincipal.dataset.usdValue=g,s.precioPaquetePrincipal.dataset.vesValue=C,s.precioPaquetePrincipal.dataset.currentCurrency="usd",s.precioPaqueteBase.textContent=`${d}${P(C)}`,s.precioPaqueteBase.dataset.usdValue=g,s.precioPaqueteBase.dataset.vesValue=C,s.precioPaqueteBase.dataset.currentCurrency="ves",s.costoPaqueteDetalle.textContent=`${i}${P(r.costo)}`,s.gananciaPctDetalle.textContent=r.ganancia,s.precioPaqueteOferta.textContent=`${i}${P(w)}`,s.btnApplyOffer.dataset.offerPrice=w.toFixed(2),A.placeholder=`${P(w,2)}`,A.value="",s.precioCalculadoNota.textContent=`${i}${P(g)}`},se=()=>{const r=parseFloat(Y.value)||0,a=parseFloat(X.value)||0,c=parseInt(F.value),g=parseInt(B.value),C=parseInt(T.value);if(r<=0||isNaN(a)||a<0||!g||g<=0)return S("Completa Costo(*), Ganancia(*) y Stock Inicial(*) con valores válidos.","warning"),!1;const N=O.value,w=H.value,$=R.value,D=J.value,z=c>0?c:1,U=g>0?g:C>0&&c>0?C*c:0;return p=fe(r,a,z,q.settings),p?(ie({nombre:N,marca:w,categoria:$,descripcion:D,costo:r,ganancia:a,paquetes:C,unidadesPorPaquete:c,totalUnidades:U,precios:p}),E(4),!0):(S("Error al calcular precios.","error"),!1)},ee=()=>{const r=parseInt(T.value)||0,a=parseInt(F.value)||0;r>0&&a>0&&(B.value=r*a)};return T.addEventListener("input",ee),F.addEventListener("input",ee),setTimeout(()=>{const r=v.querySelector("#modal-footer-container");if(!r){l.error("¡Error fatal! No se encontró #modal-footer-container."),S("Error interno al inicializar botones.","error");return}r.innerHTML="",n=document.createElement("button"),n.type="button",n.id="modal-btn-prev",n.className="btn-secondary me-auto",n.innerHTML='<i class="bi bi-arrow-left me-1"></i> Anterior',k=document.createElement("button"),k.type="button",k.id="modal-btn-attach-invoice",k.className="btn-secondary btn-sm me-auto",k.innerHTML='<i class="bi bi-paperclip me-1"></i> Adjuntar Factura',k.disabled=!0,k.title="Adjuntar Factura (Próximamente)",k.style.backgroundColor="var(--bs-gray-500)",I=document.createElement("button"),I.type="button",I.id="modal-btn-copy-summary",I.className="btn-secondary btn-sm me-auto",I.innerHTML='<i class="bi bi-clipboard-check me-1"></i> Copiar',I.addEventListener("click",()=>{}),f=document.createElement("button"),f.type="button",f.id="modal-btn-next",f.className="btn-primary",f.innerHTML='Siguiente <i class="bi bi-arrow-right ms-1"></i>',x=document.createElement("button"),x.type="button",x.id="modal-btn-calculate",x.className="btn-primary",x.innerHTML='<i class="bi bi-calculator me-1"></i> Calcular y Revisar',y=document.createElement("button"),y.type="submit",y.id=t?"modal-btn-update":"modal-btn-save",y.className="btn-primary",y.innerHTML=`<i class="bi ${t?"bi-arrow-repeat":"bi-save-fill"} me-1"></i> ${t?"Actualizar Producto":"Guardar Producto"}`,y.setAttribute("form","product-form"),r.append(n,k,I,x,f,y);try{const a=v.querySelector(".modal-header"),c=v.querySelector(".modal-header .close");a&&L&&c?a.insertBefore(L,c):l.warn("[ProductForm] No se pudo mover el stepper al header.")}catch(a){l.error("[ProductForm] Error al mover el stepper:",a)}n.addEventListener("click",()=>{b===4?E(3):b===3?E(2):b===2&&E(1)}),f.addEventListener("click",()=>{if(b===1){const a=O.value,c=H.value,g=R.value;if(!te(a,c,g)){S("Completa Nombre, Marca y Categoría (*).","warning");return}E(2)}else b===2&&E(3)}),x.addEventListener("click",se),M.addEventListener("submit",async a=>{if(a.preventDefault(),!p){S("Calcula los precios antes de guardar.","warning");return}const c=O.value,g=H.value,C=R.value,N=parseFloat(Y.value),w=parseFloat(X.value),$=parseInt(B.value),D=parseInt(F.value)||null;parseInt(T.value);const z=J.value,U=parseFloat(A.value),ne=e.querySelector("#sku").value,ce=e.querySelector("#barcode").value,le=e.querySelector("#proveedor").value,re=e.querySelector("#peso").value;if(!te(c,g,C)||!$||$<=0||isNaN(N)||N<0||isNaN(w)||w<0){S("Completa campos requeridos (*).","error"),E(1);return}y.disabled=!0,y.innerHTML='<i class="bi bi-hourglass-split me-1"></i> Guardando...';const de=!isNaN(U)&&U>0?U:p.precioFinalMayorDolar,W={id:t?o.id:Date.now().toString()+Math.random().toString(36).substring(2,7),name:c,brand:g,categoryId:C,description:z,sku:ne||null,barcode:ce||null,supplier:le||null,weightKg:isNaN(parseFloat(re))?null:parseFloat(re),stock:{current:$,minThreshold:o?.stock?.minThreshold??10,warehouseId:o?.stock?.warehouseId??"wh_principal"},pricing:{packageCost:N,unitsPerPackage:D,taxRatePercentage:u,unitSellPrice:p.precioFinalUnitarioDolar,packageSellPrice:de,marginPercentage:w},isActive:o?.isActive??!0};try{if(t)await ue(q,W.id,W),S(`Producto "${c}" actualizado.`,"success");else{if(ye(c,g,q.products))throw S("Ya existe producto con nombre y marca.","error"),E(1),new Error("Producto duplicado");await pe(q,W),S(`Producto "${c}" creado.`,"success")}v.remove()}catch(ae){l.error("Error al guardar:",ae),ae.message!=="Producto duplicado"&&S("Error al guardar.","error")}finally{y.disabled=!1,y.innerHTML=`<i class="bi ${t?"bi-arrow-repeat":"bi-save-fill"} me-1"></i> ${t?"Actualizar Producto":"Guardar Producto"}`}}),Z(b)},50),e.querySelector("#btn-apply-package-offer").addEventListener("click",r=>{const a=r.currentTarget,c=a.dataset.offerPrice;V.classList.contains("price-applied")?Q(!0):c&&V&&j&&(A.value=c,V.classList.add("price-applied"),j.innerHTML='<i class="bi bi-check-circle-fill me-1"></i> Precio Aplicado:',a.textContent="Cancelar",a.classList.add("cancel-mode"),a.title="Cancelar aplicación de oferta")}),A.addEventListener("input",()=>{Q(!1)}),e.querySelector("#summary-view").addEventListener("click",r=>{const a=r.target.closest(".currency-toggle");if(!a)return;const c=a.closest(".summary-price-card");if(!c)return;const g=c.querySelector(".price-main.currency-toggle"),C=c.querySelector(".price-secondary.currency-toggle");if(!g||!C)return;const N=a===g,w=parseFloat(g.dataset.usdValue),$=parseFloat(g.dataset.vesValue),D=a.dataset.currentCurrency,z=N?C:g;isNaN(w)||isNaN($)||(D==="usd"?(a.textContent=`${d}${P($)}`,a.dataset.currentCurrency="ves",z.textContent=`${i}${P(w)}`,z.dataset.currentCurrency="usd"):(a.textContent=`${i}${P(w)}`,a.dataset.currentCurrency="usd",z.textContent=`${d}${P($)}`,z.dataset.currentCurrency="ves"))}),e}function xe(o,v){const e=v.currencies.principal.symbol;return!o||o.length===0?ve({icon:"fa-box-open",message:"Aún no hay productos registrados"}):`
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio Paquete (${e})</th>
                    <th>Precio Unitario (${e})</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${o.map(t=>{const h=t.name||"N/A",i=t.categoryId||"N/A",d=t.pricing?.packageSellPrice?.toFixed(2)||"0.00",u=t.pricing?.unitSellPrice?.toFixed(2)||"0.00";return`
                    <tr data-product-id="${t.id}">
                        <td data-label="Producto">${h}</td>
                        <td data-label="Categoría">${i}</td>
                        <td data-label="Precio Paquete">${e}${d}</td>
                        <td data-label="Precio Unitario">${e}${u}</td>
                        <td data-label="Acciones" class="actions">
                            <div class="list-actions">
                                <button class="btn-icon" data-action="abastecer" title="Abastecer Inventario"><i class="fas fa-plus-circle"></i></button>
                                <button class="btn-icon" data-action="editar" title="Editar Producto"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon danger" data-action="eliminar" title="Eliminar Producto"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                `}).join("")}
            </tbody>
        </table>
    `}function oe({title:o,contentElement:v,id:e="genericModal"}){const t=document.createElement("div");t.className="modal",t.id=e,t.style.display="flex",t.innerHTML=`
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${o}</h3>
                <!-- {/* El botón 'X' se encarga de cerrar */} -->
                <button class="close" data-action="close-modal" aria-label="Cerrar">&times;</button>
            </div>
            <div class="modal-body custom-scrollbar" id="modal-body-container">
                <!-- {/* El contentElement (ej. ProductForm) irá aquí */} -->
            </div>
            <!-- {/* Contenedor vacío para los botones del pie de página */} -->
            <div class="modal-footer" id="modal-footer-container"></div>
        </div>
    `,t.querySelector("#modal-body-container").appendChild(v),t.addEventListener("click",i=>{(i.target===t||i.target.closest('[data-action="close-modal"]'))&&t.remove()}),document.body.classList.add("modal-open");const h=t.remove;return t.remove=function(){h.call(this),document.querySelector(".modal")||document.body.classList.remove("modal-open")},t}function Pe(o,v,e,t={}){const i={...{icon:"bi bi-exclamation-triangle-fill text-warning",confirmText:"Sí, continuar",cancelText:"Cancelar",confirmButtonClass:"btn-primary",cancelButtonClass:"btn-secondary",confirmIcon:"bi bi-check-lg",cancelIcon:"bi bi-x-lg",modalId:"confirmation-modal"},...t},d=document.createElement("div");d.innerHTML=`<p style="font-size: 1.1rem; line-height: 1.6; color: var(--bs-gray-700);">${v}</p>`,document.documentElement.getAttribute("data-bs-theme")==="dark"&&(d.querySelector("p").style.color="var(--bs-gray-300)");const u=document.createElement("button");u.className=i.confirmButtonClass,u.innerHTML=`<i class="${i.confirmIcon} me-1"></i> ${i.confirmText}`;const m=document.createElement("button");m.className=i.cancelButtonClass,m.innerHTML=`<i class="${i.cancelIcon} me-1"></i> ${i.cancelText}`,document.createElement("div").append(m,u);const b=oe({title:`<i class="${i.icon} me-2"></i> ${o}`,contentElement:d,id:i.modalId}),n=b.querySelector("#modal-footer-container");n?n.append(m,u):console.error("No se encontró #modal-footer-container en el modal de confirmación.");const f=()=>b.remove();m.addEventListener("click",f),u.addEventListener("click",()=>{e(),f()}),document.body.appendChild(b)}function ke(o,v){const e=()=>{l.trace("[ProductsView] renderMainContent ejecutado.");const d=xe(q.products,q.settings),u=_(G.CREATE_PRODUCT);o.innerHTML=`
            <div class="view-header">
                <h2 class="view-title"><i class="bi bi-box-seam me-2"></i> Productos</h2>
                ${u?`
                <button id="btn-add-product" class="btn-primary" data-action="add-product">
                    <i class="bi bi-plus-circle-fill me-1"></i> Añadir Producto
                </button>`:""}
            </div>
            <div class="product-list-container">${d}</div>
        `},t=(d=null)=>{l.trace("[ProductsView] openProductModal iniciado. Modo Edición:",!!d);const u=d!==null,m=u?`<i class="bi bi-pencil-fill me-2"></i> Editar Producto: ${d.name||"N/A"}`:'<i class="bi bi-plus-circle-fill me-2"></i> Añadir Nuevo Producto',p=u?"edit-product-modal":"add-product-modal",b=document.createElement("div");b.textContent="Cargando formulario...";const n=oe({title:m,contentElement:b,id:p});l.trace("[ProductsView] Elemento Modal creado:",n);const f=he(d,n);l.trace("[ProductsView] Elemento Formulario creado:",f);const x=n.querySelector("#modal-body-container");if(console.log("[ProductsView] Verificando modalBodyContainer:",x),!x){l.error("[ProductsView] ¡Error Crítico! No se encontró #modal-body-container."),console.error("[ProductsView] productModalElement:",n),me(new Error("Fallo al encontrar el cuerpo del modal."),"ProductsView.js:openProductModal"),n?.remove();return}x.innerHTML="",x.appendChild(f),l.trace("[ProductsView] Añadiendo modal completo al body."),document.body.appendChild(n);const y=f.querySelector("input, select");y?(l.trace("[ProductsView] Enfocando primer input:",y),y.focus()):l.warn("[ProductsView] No se encontró input/select para enfocar."),l.trace("[ProductsView] openProductModal finalizado.")},h=async d=>{const u=d.target.closest("[data-action]");if(!u)return;const m=u.dataset.action,p=u.closest("[data-product-id]")?.dataset.productId;if(l.trace(`[ProductsView] Clic detectado. Acción: ${m}, ID Producto: ${p}`),m==="add-product"&&(_(G.CREATE_PRODUCT)?t():l.warn("Intento de añadir producto sin permiso.")),m==="editar"&&p)if(_(G.EDIT_PRODUCT)){const b=q.products.find(n=>n.id===p);b?t(b):l.error(`Producto ${p} no encontrado para editar.`)}else l.warn(`Intento de editar ${p} sin permiso.`);if(m==="eliminar"&&p)if(_(G.DELETE_PRODUCT)){const b=q.products.find(n=>n.id===p);if(b){const n=b.name||"este producto";Pe("Confirmar Eliminación",`¿Estás seguro de que deseas eliminar el producto <strong>${n}</strong>? <br><small>Esta acción no se puede deshacer.</small>`,async()=>{l.trace(`[ProductsView] Confirmada eliminación de ${p}`),await be(q,p),ge()},{icon:"bi bi-trash3-fill text-danger",confirmText:"Sí, eliminar",cancelText:"No, cancelar",confirmButtonClass:"btn-danger",cancelButtonClass:"btn-secondary",confirmIcon:"bi bi-check-lg",cancelIcon:"bi bi-x-lg",modalId:"delete-product-confirmation-modal"})}else l.error(`Producto ${p} no encontrado para eliminar.`)}else l.warn(`Intento de eliminar ${p} sin permiso.`);m==="abastecer"&&p&&l.info(`Acción 'abastecer' para ${p} (Pendiente)`)};e(),o.addEventListener("click",h);const i=new MutationObserver(d=>{for(let u of d)u.removedNodes&&u.removedNodes.forEach(m=>{m.nodeType===1&&(m.id==="add-product-modal"||m.id==="edit-product-modal")&&(l.trace("[ProductsView] Modal removido detectado por MutationObserver. Re-renderizando tabla."),e())})});return i.observe(document.body,{childList:!0,subtree:!1}),()=>{l.info("Limpiando ProductsView..."),o.removeEventListener("click",h),i.disconnect()}}export{ke as ProductsView};
