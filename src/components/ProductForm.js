// ======================================================
// ARCHIVO: src/components/ProductForm.js
// VERSION: 4.0.0 (Refactorizado)
// PROPÓSITO: Orquesta el formulario, maneja la lógica de 
// negocio y delega la UI al Wizard y al Summary.
// ======================================================
    
import { calcularPrecioVenta } from '../services/calculation.service.js';
import { validarCamposTexto, productoExiste } from '../services/validation.service.js';
import { addProductToState, updateProductInState } from '../store/actions.js';
import { showToast } from '../services/toast.service.js';
import { state as globalState } from '../store/state.js';
import { Logger } from '../services/logger.service.js';

// --- ¡NUEVAS IMPORTACIONES DE REFACTORIZACIÓN! ---
import { initProductFormWizard } from './ProductFormWizard.js';
import { 
    renderNewProductSummary, 
    renderEditProductSummary, 
    bindOfferButtonEvents, 
    bindCurrencyToggleEvents 
} from './ProductFormSummary.js';

/**
 * Componente principal del Formulario de Producto.
 * @param {object | null} productToEdit - El producto a editar, o null si es nuevo.
 * @param {HTMLElement} modalElementRef - La referencia al elemento del modal (pasada por modal.service).
 */
export function ProductForm(productToEdit = null, modalElementRef) {
    const element = document.createElement('div');
    element.className = 'product-form-wrapper';
    
    // --- 1. Configuración y Estado ---
    const isEditMode = productToEdit !== null;
    const categories = globalState.settings.products.available_categories || [];
    const simboloPrincipal = globalState.settings.currencies.principal.symbol || '$';
    const simboloBase = globalState.settings.currencies.base.symbol || 'Bs.';
    const tasaIVA = globalState.settings.products.tax_rate;
    const tasaCambio = globalState.settings.currencies.principal.rate;
    
    let lastCalculatedPrices = null;
    let wizardAPI = null; // API para controlar el wizard (showStep, setSaveButtonBusy, etc.)

    // --- 2. Captura de Datos Originales (Lógica de Negocio) ---
    const originalPriceList = isEditMode ? (productToEdit?.pricing?.priceLists?.[0] || {}) : {};
    
    // (Opcional: Logs de depuración)
    // if (isEditMode) {
    //     console.group('🔍 DEBUG: Captura de Valores Originales');
    //     console.log('productToEdit completo:', productToEdit);
    //     console.log('originalPriceList:', originalPriceList);
    // }
    
    const originalData = {

        // Texto (con .trim())
        nombre: isEditMode ? (productToEdit?.name?.trim() || '') : '',
        marca: isEditMode ? (productToEdit?.brand?.trim() || '') : '',
        categoria: isEditMode ? (productToEdit?.categoryId?.trim() || '') : '',
        descripcion: isEditMode ? (productToEdit?.description?.trim() || '') : '',
        sku: isEditMode ? (productToEdit?.sku?.trim() || '') : '',
        barcode: isEditMode ? (productToEdit?.barcode?.trim() || '') : '',

        // Números (con || 0)
        costo: isEditMode ? (productToEdit?.pricing?.packageCost || 0) : 0,
        unidadesPorPaquete: isEditMode ? (productToEdit?.pricing?.unitsPerPackage || 0) : 0,
        stock: isEditMode ? (productToEdit?.stock?.current || 0) : 0,
        ganancia: isEditMode ? (originalPriceList.marginPercentage || productToEdit?.pricing?.marginPercentage || 0) : 0,
        
        // Números (con || null)
        peso: isEditMode ? (productToEdit?.dimensions?.weight || null) : null,
        
        // Precios (con || 0)
        precioUnitario: isEditMode ? (originalPriceList.unitSellPrice || productToEdit?.pricing?.unitSellPrice || 0) : 0,
        precioPaquete: isEditMode ? (originalPriceList.packageSellPrice || productToEdit?.pricing?.packageSellPrice || 0) : 0,
        
        // Valor de inventario (calculado)
        valorInventarioOriginal: isEditMode ? ( 
                (productToEdit?.pricing?.packageCost || 0) / (productToEdit?.pricing?.unitsPerPackage || 1) 
        ) * (productToEdit?.stock?.current || 0) : 0,
    };
    
    // (Opcional: Logs de depuración)
    // if (isEditMode) {
    //     console.log('originalData construido:', originalData);
    //     console.groupEnd();
    // }
    
    // --- 3. Renderizado del HTML (Vista) ---
    // Este HTML es el "esqueleto" que controlará el Wizard.
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
                                    <input type="number" id="peso" step="0.01" placeholder="Opcional" value="${originalData.peso || ''}">
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
                                        <input type="number" id="unidades-por-paquete" placeholder="Opc." min="1" value="${originalData.unidadesPorPaquete || ''}">
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
                
                <div class="wizard-step" data-step="4" style="display: none;">
                     <div class="product-summary-view" id="summary-view">
                     </div>
                </div>
            </form>
        </div>
    `;

    // --- 4. Selectores de Elementos ---
    // (Necesarios para leer los datos del formulario)
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

    // (Necesarios para pasarlos al Wizard)
    const wizardStepper = element.querySelector('#product-wizard-stepper');
    const wizardSteps = element.querySelectorAll('.wizard-step');


    // --- 5. Lógica de Negocio y Callbacks ---

    /**
     * Valida, calcula precios y muestra el resumen (Paso 4).
     * Esta es la lógica del botón "Calcular y Revisar".
     */
    function calculateAndShowSummary() {
        // console.group('🔍 DEBUG: calculateAndShowSummary');

        // 1. Obtener valores NUEVOS (normalizados)
        const costoPorPaquete = parseFloat(costoInput.value) || 0;
        const ganancia = parseFloat(gananciaInput.value) || 0;
        const unidadesEnPaqueteInput = parseInt(unidadesPorPaqueteInput.value) || 0;
        const totalUnidadesRegistrarInput = parseInt(totalUnidadesInput.value);
        const paquetes = parseInt(paquetesInput.value) || 0;
        
        // 2. Validar campos requeridos
        if (costoPorPaquete <= 0 || ganancia < 0 || !totalUnidadesRegistrarInput || totalUnidadesRegistrarInput <= 0) {
            showToast("Completa Costo(*), Ganancia(*) y Stock(*) con valores válidos.", "warning");
            return false;
        }

        // 3. Obtener valores de texto (normalizados)
        const nombre = nombreInput.value.trim();
        const marca = marcaInput.value.trim();
        const categoria = categoriaSelect.value.trim();
        const descripcion = descripcionInput.value.trim();
        const sku = skuInput.value.trim();
        const barcode = barcodeInput.value.trim();
        const peso = parseFloat(pesoInput.value) || null;

        // 4. Calcular precios
        const unidadesParaCalculoPrecio = unidadesEnPaqueteInput > 0 ? unidadesEnPaqueteInput : 1;
        lastCalculatedPrices = calcularPrecioVenta(
            costoPorPaquete, 
            ganancia, 
            unidadesParaCalculoPrecio, 
            globalState.settings
        );

        if (lastCalculatedPrices) {
            // 5. Empaquetar datos nuevos
            const newData = {
                nombre, marca, categoria, descripcion, sku, barcode, peso,
                costo: costoPorPaquete,
                ganancia,
                paquetes,
                unidadesPorPaquete: unidadesEnPaqueteInput,
                totalUnidades: totalUnidadesRegistrarInput,
                precios: lastCalculatedPrices
            };

            // console.log('newData construido:', newData);
            // console.groupEnd();
            
            // 6. Renderizar el resumen (usando los componentes importados)
            const summaryContainer = element.querySelector('#summary-view');
            const config = { simboloPrincipal, simboloBase, tasaIVA, tasaCambio };

            if (isEditMode) {
                summaryContainer.innerHTML = renderEditProductSummary(newData, originalData, config);
            } else {
                summaryContainer.innerHTML = renderNewProductSummary(newData, config);
                // Bindear eventos solo para el resumen de "Crear"
                bindCurrencyToggleEvents(summaryContainer);
                bindOfferButtonEvents(summaryContainer);
            }

            // 7. Mover el wizard al paso 4
            wizardAPI.showStep(4);
            return true;
        } else {
            // console.groupEnd();
            showToast("Error al calcular precios.", "error");
            return false;
        }
    };

    /**
     * Lógica para guardar o actualizar el producto.
     * Esta es la lógica del botón "Guardar Producto" / "Actualizar Producto".
     */
    async function handleSave() {
        // Si no estamos en el paso 4, forzar revisión
        if (wizardAPI.getStep() !== 4) {
            if (calculateAndShowSummary()) {
                showToast("Por favor, revisa los cambios y presiona 'Actualizar Producto'", "info");
            }
            return;
        }
        
        // Si no se han calculado precios, volver al paso 3
        if (!lastCalculatedPrices) {
            showToast("Hubo un error al calcular precios. Vuelve al Paso 3.", "warning");
            wizardAPI.showStep(3);
            return;
        }

        // Obtener todos los datos finales (normalizados)
        const nombre = nombreInput.value.trim();
        const marca = marcaInput.value.trim();
        const categoria = categoriaSelect.value.trim();
        const descripcion = descripcionInput.value.trim();
        const costo = parseFloat(costoInput.value) || 0;
        const ganancia = parseFloat(gananciaInput.value) || 0;
        const totalUnidades = parseInt(totalUnidadesInput.value);
        const unidadesPorPaquete = parseInt(unidadesPorPaqueteInput.value) || null;
        const sku = skuInput.value.trim();
        const barcode = barcodeInput.value.trim();
        const peso = parseFloat(pesoInput.value) || null;
        
        // Decidir el precio final del paquete (manual o calculado)
        const overridePackagePriceInput = element.querySelector('#override-package-price');
        const precioPaqueteManual = overridePackagePriceInput ? parseFloat(overridePackagePriceInput.value) : NaN;
        const precioPaqueteFinal = !isNaN(precioPaqueteManual) && precioPaqueteManual > 0 ? precioPaqueteManual : lastCalculatedPrices.precioFinalMayorDolar;

        // Poner el botón en modo "ocupado"
        wizardAPI.setSaveButtonBusy(true);

        // Construir el objeto final
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
            supplier: productToEdit?.supplier || null
        };
        
        if (isEditMode) {
            productData.id = productToEdit.id;
        }
        
        // Guardar en la base de datos
        try { 
            if (isEditMode) { 
                await updateProductInState(globalState, productData.id, productData); 
                showToast(`Producto "${nombre}" actualizado.`, "success"); 
            } else { 
                if (productoExiste(nombre, marca, globalState.products)) { 
                    showToast("Ya existe producto con nombre y marca.", "error"); 
                    wizardAPI.showStep(1); 
                    throw new Error("Producto duplicado"); 
                } else {
                    await addProductToState(globalState, productData); 
                    showToast(`Producto "${nombre}" creado.`, "success"); 
                } 
            } 
            modalElementRef.remove(); // Cerrar el modal
        } catch (error) { 
            Logger.error("Error al guardar:", error); 
            if (error.message !== "Producto duplicado") { 
                showToast("Error al guardar.", "error"); 
            } 
        } finally { 
            wizardAPI.setSaveButtonBusy(false); // Reactivar el botón
        }
    };

    /**
     * Lógica de UI simple (ej. auto-cálculo de unidades).
     */
    const autoCalcularUnidades = () => {
        const paquetes = parseInt(paquetesInput.value) || 0;
        const unidadesPorPaquete = parseInt(unidadesPorPaqueteInput.value) || 0;
        if (paquetes > 0 && unidadesPorPaquete > 0) {
            totalUnidadesInput.value = paquetes * unidadesPorPaquete;
        }
    };
    paquetesInput.addEventListener('input', autoCalcularUnidades);
    unidadesPorPaqueteInput.addEventListener('input', autoCalcularUnidades);

    
    // --- 6. Inicialización del Wizard ---
    // (Se ejecuta después de un breve delay para asegurar que el modal esté en el DOM)
    setTimeout(() => {
        
        // Definir los callbacks que el Wizard ejecutará
        const wizardCallbacks = {
            
            onStepNext: () => {
                const currentStep = wizardAPI.getStep();
                if (currentStep === 1) {
                    // Validar Paso 1
                    const nombre = nombreInput.value;
                    const marca = marcaInput.value;
                    const categoria = categoriaSelect.value;
                    if (!validarCamposTexto(nombre, marca, categoria)) {
                        showToast("Completa Nombre, Marca y Categoría (*).", "warning");
                        return; // No avanzar
                    }
                    wizardAPI.showStep(2);
                } else if (currentStep === 2) {
                    // Validar Paso 2 (si es necesario)
                    wizardAPI.showStep(3);
                }
            },
            
            onStepPrev: () => {
                const currentStep = wizardAPI.getStep();
                if (currentStep === 4) wizardAPI.showStep(3);
                else if (currentStep === 3) wizardAPI.showStep(2);
                else if (currentStep === 2) wizardAPI.showStep(1);
            },
            
            onCalculate: () => {
                calculateAndShowSummary();
            },
            
            onSubmit: () => {
                handleSave();
            }
        };

        // Inicializar el controlador del wizard
        wizardAPI = initProductFormWizard({
            modalElementRef,
            wizardStepperEl: wizardStepper,
            wizardStepsEls: wizardSteps,
            isEditMode,
            callbacks: wizardCallbacks
        });

    }, 50); // 50ms de espera

    return element;
}