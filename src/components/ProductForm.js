import { calcularPrecioVenta, crearProducto } from '../services/calculation.service.js';
import { validarCamposTexto, productoExiste } from '../services/validation.service.js';
import { addProduct, updateProduct } from '../store/actions.js';
import { showToast } from '../services/toast.service.js';
import { debounce } from '../utils/debounce.js';

export function ProductForm(state, productToEdit = null) {
    const element = document.createElement('div');
    element.className = 'calculator-container';
    const isEditMode = productToEdit !== null;
    const categories = state.settings.products.available_categories || [];
    const simboloPrincipal = state.settings.currencies.principal.symbol || '$';
    const simboloBase = state.settings.currencies.base.symbol || 'Bs.';
    const tasaIVA = state.settings.products.tax_rate;

    element.innerHTML = `
        <div class="calculator" id="calculator-form">
            <h2 class="calculator-title"><i class="fas fa-boxes"></i> ${isEditMode ? 'Editar Producto' : 'Datos del Producto'}</h2>

            <div class="form-grid-layout">
                <div class="form-column-left">
                    <section class="form-section">
                        <h3><i class="fas fa-info-circle"></i> Información Básica</h3>
                        <div>
                            <label for="producto">Nombre del Producto <span class="text-danger">*</span></label>
                            <input type="text" id="producto" placeholder="Nombre del producto" required>
                        </div>
                        <div>
                            <label for="marca">Marca <span class="text-danger">*</span></label>
                            <input type="text" id="marca" placeholder="Ej: P.A.N., Coca-Cola" required>
                        </div>
                        <div>
                            <label for="categoria">Categoría <span class="text-danger">*</span></label>
                            <select id="categoria" required>
                                <option value="">Selecciona una categoría</option>
                                ${categories.map(cat => `<option value="${cat}">${cat}</option>`).join('')}
                            </select>
                        </div>
                    </section>
                </div>

                <div class="form-column-right">
                    <section class="form-section">
                        <h3><i class="fas fa-calculator"></i> Cálculo de Precios</h3>
                        <div>
                            <label for="costo">Costo por Paquete/Bulto (${simboloPrincipal}) <span class="text-danger">*</span></label>
                            <input type="number" id="costo" placeholder="Costo de 1 paquete" step="0.01" required>
                        </div>
                        <div>
                            <label for="ganancia">Porcentaje de Ganancia (%)<span class="text-danger">*</span></label>
                            <input type="number" id="ganancia" placeholder="% Ganancia" step="0.1" required>
                        </div>
                        <div class="input-group" style="display: flex; gap: 1rem;">
                            <div style="flex: 1;">
                                <label for="paquetes">Paquetes/Cajas</label>
                                <input type="number" id="paquetes" placeholder="Opcional" min="1">
                            </div>
                            <div style="flex: 1;">
                                <label for="unidades-por-paquete">Unidades por Paquete</label>
                                <input type="number" id="unidades-por-paquete" placeholder="Opcional" min="1">
                            </div>
                        </div>
                        <div>
                            <label for="unidades">Total de Unidades a Registrar <span class="text-danger">*</span></label>
                            <input type="number" id="unidades" placeholder="Total de unidades individuales" required min="1">
                        </div>
                    </section>
                </div>
            </div>

            <div class="calcular-y-save">
                <button id="btn-calcular-precio" class="btn-secondary"><i class="fas fa-calculator"></i> Calcular</button>
                <button id="btn-principal-action" class="btn-primary">
                    <i class="fas ${isEditMode ? 'fa-sync-alt' : 'fa-save'}"></i>
                    ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}
                </button>
            </div>

            <div id="results-panel" class="results-panel" style="display: none;">
                <h4><i class="fas fa-poll"></i> Resumen del Cálculo</h4>
                <table class="results-table">
                    <tbody>
                        <tr><td class="label">Costo Total Registrado</td><td class="value" id="res-costo-total-principal">${simboloPrincipal}0.00</td><td class="value" id="res-costo-total-base">${simboloBase}0.00</td></tr>
                        <tr><td class="label">Subtotal Venta (sin IVA)</td><td class="value" id="res-subtotal-principal">${simboloPrincipal}0.00</td><td class="value" id="res-subtotal-base">${simboloBase}0.00</td></tr>
                        <tr><td class="label">IVA (${tasaIVA}%)</td><td class="value" id="res-iva-principal">${simboloPrincipal}0.00</td><td class="value" id="res-iva-base">${simboloBase}0.00</td></tr>
                        <tr class="total-row"><td class="label">Precio Final (Paquete)</td><td class="value" id="res-total-paquete-principal">${simboloPrincipal}0.00</td><td class="value" id="res-total-paquete-base">${simboloBase}0.00</td></tr>
                        <tr class="total-row"><td class="label">Precio Final (Unidad)</td><td class="value" id="res-total-unidad-principal">${simboloPrincipal}0.00</td><td class="value" id="res-total-unidad-base">${simboloBase}0.00</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    const form = element.querySelector('#calculator-form');
    const resultsPanel = element.querySelector('#results-panel');
    const paquetesInput = element.querySelector('#paquetes');
    const unidadesPorPaqueteInput = element.querySelector('#unidades-por-paquete');
    const totalUnidadesInput = element.querySelector('#unidades');
    const costoInput = form.querySelector('#costo');
    const gananciaInput = form.querySelector('#ganancia');
    const mainActionButton = form.querySelector('#btn-principal-action');

    const populateForm = (product) => {
        form.querySelector('#producto').value = product.product_info.product_name;
        form.querySelector('#marca').value = product.product_info.product_brand;
        form.querySelector('#categoria').value = product.product_info.product_category;
        costoInput.value = product.product_price.costo_inicial_paquete;
        gananciaInput.value = product.product_ajuste.percentage * 100;
        totalUnidadesInput.value = product.product_info.product_estado.disponible;
        unidadesPorPaqueteInput.value = product.product_price.unidades_por_paquete;
    };

    if (isEditMode) {
        populateForm(productToEdit);
    }

    const formatNumber = (num) => new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num);

    const realizarYMostrarCalculo = () => {
        const costoPorPaquete = parseFloat(costoInput.value) || 0;
        const ganancia = parseFloat(gananciaInput.value) || 0;
        const unidades = parseInt(unidadesPorPaqueteInput.value) || 1;
        const tasaCambio = state.settings.currencies.principal.rate;

        if (costoPorPaquete <= 0) {
            resultsPanel.style.display = 'none';
            return;
        }

        const precios = calcularPrecioVenta(costoPorPaquete, ganancia, unidades, state.settings);
        if (precios) {
            form.querySelector('#res-costo-total-principal').textContent = `${simboloPrincipal}${formatNumber(costoPorPaquete)}`;
            form.querySelector('#res-costo-total-base').textContent = `${simboloBase}${formatNumber(costoPorPaquete * tasaCambio)}`;
            form.querySelector('#res-subtotal-principal').textContent = `${simboloPrincipal}${formatNumber(precios.subtotalMayorDolar)}`;
            form.querySelector('#res-subtotal-base').textContent = `${simboloBase}${formatNumber(precios.subtotalMayorDolar * tasaCambio)}`;
            form.querySelector('#res-iva-principal').textContent = `${simboloPrincipal}${formatNumber(precios.montoIVAMayorDolar)}`;
            form.querySelector('#res-iva-base').textContent = `${simboloBase}${formatNumber(precios.montoIVAMayorDolar * tasaCambio)}`;
            form.querySelector('#res-total-paquete-principal').textContent = `${simboloPrincipal}${formatNumber(precios.precioFinalMayorDolar)}`;
            form.querySelector('#res-total-paquete-base').textContent = `${simboloBase}${formatNumber(precios.precioFinalMayorDolar * tasaCambio)}`;
            form.querySelector('#res-total-unidad-principal').textContent = `${simboloPrincipal}${formatNumber(precios.precioFinalUnitarioDolar)}`;
            form.querySelector('#res-total-unidad-base').textContent = `${simboloBase}${formatNumber(precios.precioFinalUnitarioDolar * tasaCambio)}`;
            resultsPanel.style.display = 'block';
        } else {
            resultsPanel.style.display = 'none';
        }
    };

    const autoCalcularUnidades = () => {
        const paquetes = parseInt(paquetesInput.value) || 0;
        const unidadesPorPaquete = parseInt(unidadesPorPaqueteInput.value) || 0;
        if (paquetes > 0 && unidadesPorPaquete > 0) {
            totalUnidadesInput.value = paquetes * unidadesPorPaquete;
        }
    };

    const debouncedCalculation = debounce(realizarYMostrarCalculo, 350);

    paquetesInput.addEventListener('input', autoCalcularUnidades);
    unidadesPorPaqueteInput.addEventListener('input', autoCalcularUnidades);
    costoInput.addEventListener('input', debouncedCalculation);
    gananciaInput.addEventListener('input', debouncedCalculation);
    unidadesPorPaqueteInput.addEventListener('input', debouncedCalculation);

    form.querySelector('#btn-calcular-precio').addEventListener('click', () => {
        realizarYMostrarCalculo();
        if (resultsPanel.style.display === 'none') {
            showToast("Introduce un costo válido para calcular.", "error");
        }
    });

    mainActionButton.addEventListener('click', async () => {
        const nombre = form.querySelector('#producto').value;
        const marca = form.querySelector('#marca').value;
        const categoria = form.querySelector('#categoria').value;
        const costo = parseFloat(form.querySelector('#costo').value);
        const ganancia = parseFloat(form.querySelector('#ganancia').value);
        const totalUnidades = parseInt(totalUnidadesInput.value);
        const unidadesPorPaquete = parseInt(unidadesPorPaqueteInput.value);
        const paquetes = parseInt(paquetesInput.value);

        if (!validarCamposTexto(nombre, marca, categoria) || !totalUnidades || totalUnidades <= 0) {
            showToast("Los campos con * son requeridos.", "error");
            return;
        }

        mainActionButton.disabled = true;
        mainActionButton.innerHTML = `<i class="fas fa-spinner animate-spin"></i> Guardando...`;

        if (isEditMode) {
            const precios = calcularPrecioVenta(costo, ganancia, unidadesPorPaquete || 1, state.settings);
            const updatedData = {
                product_info: {
                    product_name: nombre,
                    product_brand: marca,
                    product_category: categoria,
                    product_estado: { disponible: totalUnidades }
                },
                product_price: {
                    costo_inicial_paquete: costo,
                    unidades_por_paquete: unidadesPorPaquete,
                    venta_unidad: precios.precioFinalUnitarioDolar,
                    venta_paquete: precios.precioFinalMayorDolar,
                },
                product_ajuste: {
                    percentage: ganancia / 100
                }
            };
            await updateProduct(state, productToEdit.id, updatedData);
            showToast(`Producto "${nombre}" actualizado.`, "success");
            document.querySelector('#edit-product-modal')?.remove();
        } else {
            if (productoExiste(nombre, marca, state.products)) {
                showToast("Ya existe un producto con este nombre y marca.", "error");
                mainActionButton.disabled = false;
                mainActionButton.innerHTML = `<i class="fas fa-save"></i> Guardar Producto`;
                return;
            }

            const nuevoProducto = crearProducto(nombre, marca, categoria, "", costo, ganancia, totalUnidades, unidadesPorPaquete, paquetes, state.settings);
            if (nuevoProducto) {
                await addProduct(state, nuevoProducto);
                form.querySelectorAll('input, select').forEach(input => input.value = '');
                resultsPanel.style.display = 'none';
            } else {
                showToast("Error al crear el producto. Revisa los datos.", "error");
            }
        }

        mainActionButton.disabled = false;
        mainActionButton.innerHTML = `<i class="fas ${isEditMode ? 'fa-sync-alt' : 'fa-save'}"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`;
    });

    return element;
}