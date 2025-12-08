import { showToast } from '../../services/toast.service.js';
import { createClient, updateClient } from '../../services/client.service.js';
import { state as globalState, triggerRerender } from '../../store/state.js';

export function ClientForm(modalElementRef, clientToEdit = null) {
    const isEditMode = clientToEdit !== null;
    const element = document.createElement('div');
    element.className = 'client-form-wrapper';

    const initialData = {
        name: isEditMode ? (clientToEdit.name || '') : '',
        email: isEditMode ? (clientToEdit.email || '') : '',
        phone: isEditMode ? (clientToEdit.phone || '') : '',
        type: isEditMode ? (clientToEdit.type || 'Particular') : 'Particular',
        address: isEditMode ? (clientToEdit.address || '') : '',
        identification: isEditMode ? (clientToEdit.identification || '') : '' // CI / RIF
    };

    element.innerHTML = `
        <form id="client-form" class="premium-form">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="client-name" class="form-label">Nombre Completo / Razón Social <span class="text-danger">*</span></label>
                        <input type="text" id="client-name" class="form-control" required value="${initialData.name}" placeholder="Ej: Juan Pérez">
                    </div>
                </div>
                <div class="col-md-6">
                     <div class="form-group mb-3">
                        <label for="client-id" class="form-label">Identificación (CI / RIF) <span class="text-danger">*</span></label>
                        <input type="text" id="client-id" class="form-control" required value="${initialData.identification}" placeholder="Ej: V-12345678">
                    </div>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6">
                    <div class="form-group mb-3">
                         <label for="client-email" class="form-label">Correo Electrónico</label>
                        <input type="email" id="client-email" class="form-control" value="${initialData.email}" placeholder="cliente@email.com">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group mb-3">
                        <label for="client-phone" class="form-label">Teléfono</label>
                        <input type="tel" id="client-phone" class="form-control" value="${initialData.phone}" placeholder="+58 ...">
                    </div>
                </div>
            </div>

            <div class="form-group mb-3">
                <label for="client-type" class="form-label">Tipo de Cliente</label>
                <select id="client-type" class="form-select">
                    <option value="Particular" ${initialData.type === 'Particular' ? 'selected' : ''}>Particular</option>
                    <option value="Empresa" ${initialData.type === 'Empresa' ? 'selected' : ''}>Empresa</option>
                    <option value="VIP" ${initialData.type === 'VIP' ? 'selected' : ''}>VIP</option>
                </select>
            </div>

            <div class="form-group mb-4">
                <label for="client-address" class="form-label">Dirección Fiscal / Habitación</label>
                <textarea id="client-address" class="form-control" rows="3" placeholder="Dirección completa...">${initialData.address}</textarea>
            </div>

            <div class="d-flex justify-content-end gap-2 pt-3 border-top">
                <button type="button" class="btn btn-secondary" id="btn-cancel-client">Cancelar</button>
                <button type="submit" class="btn btn-primary" id="btn-save-client">
                    <i class="bi bi-save me-1"></i> ${isEditMode ? 'Actualizar' : 'Guardar'}
                </button>
            </div>
        </form>
    `;

    // --- Lógica de Control ---
    const form = element.querySelector('#client-form');
    const btnCancel = element.querySelector('#btn-cancel-client');
    const btnSave = element.querySelector('#btn-save-client');

    btnCancel.addEventListener('click', () => {
        if (modalElementRef) modalElementRef.remove();
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Recolección
        const formData = {
            name: element.querySelector('#client-name').value.trim(),
            identification: element.querySelector('#client-id').value.trim(),
            email: element.querySelector('#client-email').value.trim(),
            phone: element.querySelector('#client-phone').value.trim(),
            type: element.querySelector('#client-type').value,
            address: element.querySelector('#client-address').value.trim()
        };

        // 2. Validación Básica
        if (!formData.name || !formData.identification) {
            showToast('Nombre e Identificación son obligatorios.', 'warning');
            return;
        }

        // 3. Envío
        const originalBtnText = btnSave.innerHTML;
        btnSave.innerHTML = '<i class="bi bi-hourglass-split animate-spin"></i> Procesando...';
        btnSave.disabled = true;

        try {
            const businessId = globalState.session.business?.id;
            if (!businessId) throw new Error("No business session found.");

            if (isEditMode) {
                await updateClient(businessId, clientToEdit.id, formData);
                showToast('Cliente actualizado correctamente.', 'success');
            } else {
                await createClient(businessId, formData);
                showToast('Cliente creado exitosamente.', 'success');
            }

            // Cerrar y refrescar (idealmente usaríamos un evento, pero por ahora cerramos)
            if (modalElementRef) {
                modalElementRef.remove();
                // Forzamos un re-render general o emitimos evento global
                // Para simplificar, asumimos que ClientsView recargará al detectar cambios si usáramos store
                // Pero como ClientsView lee de servico al cargar, podríamos necesitar un mecanismo de refresh.
                // Disparamos un evento custom al documento para que ClientsView lo escuche
                const event = new CustomEvent('buca:client-updated');
                document.dispatchEvent(event);
            }

        } catch (error) {
            console.error(error);
            showToast('Error al guardar cliente: ' + error.message, 'error');
            btnSave.innerHTML = originalBtnText;
            btnSave.disabled = false;
        }
    });

    return element;
}
