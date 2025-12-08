// ======================================================
// ARCHIVO: src/components/People/ClientForm.js
// PROPÓSITO: Formulario de Cliente con estructura Wizard.
// ESTILO: Premium (Consistente con Productos/Equipo)
// ======================================================

import { showToast } from '../../services/toast.service.js';
import { createClient, updateClient } from '../../services/client.service.js';
import { state as globalState } from '../../store/state.js';
import { Logger } from '../../services/logger.service.js';
import { initProductFormWizard } from '../Products/ProductFormWizard.js'; // Reutilizamos el motor del Wizard
import { diff, fText } from '../../utils/productFormHelpers.js';

export function ClientForm(modalElementRef, clientToEdit = null) {
    const element = document.createElement('div');
    element.className = 'product-form-wrapper'; // Usamos wrapper estándar

    const isEditMode = !!clientToEdit;
    let wizardAPI = null;

    // 1. Datos Iniciales (Normalizados)
    const initialData = {
        name: isEditMode ? (clientToEdit.name || '') : '',
        identification: isEditMode ? (clientToEdit.identification || '') : '',
        type: isEditMode ? (clientToEdit.type || 'Particular') : 'Particular',
        email: isEditMode ? (clientToEdit.email || '') : '',
        phone: isEditMode ? (clientToEdit.phone || '') : '',
        address: isEditMode ? (clientToEdit.address || '') : '',
        isActive: isEditMode ? (clientToEdit.isActive !== false) : true
    };

    // 2. Estructura HTML (Wizard)
    element.innerHTML = `
        <div class="wizard-stepper" id="client-wizard-stepper">
            <div class="step active" data-step="1"><span>Paso 1</span>Identidad</div>
            <div class="step" data-step="2"><span>Paso 2</span>Contacto</div>
            <div class="step" data-step="3"><span>Paso 3</span>Confirmar</div>
        </div>

        <div class="wizard-content">
            <form id="client-form" class="h-100">
                
                <div class="wizard-step" data-step="1" style="display: block;">
                    <div class="form-grid-layout" style="grid-template-columns: 1fr;">
                        <div class="summary-card-premium">
                            <div class="card-premium-header">
                                <i class="bi bi-person-vcard"></i> 
                                <span>Información Legal</span>
                            </div>
                            <div class="card-premium-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <div class="form-group">
                                            <label class="form-label fw-semibold" for="client-name">Nombre / Razón Social <span class="text-danger">*</span></label>
                                            <input type="text" id="client-name" class="form-control" required value="${initialData.name}" placeholder="Ej: Juan Pérez">
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <label class="form-label fw-semibold" for="client-type">Tipo</label>
                                            <select id="client-type" class="form-select">
                                                <option value="Particular" ${initialData.type === 'Particular' ? 'selected' : ''}>Particular</option>
                                                <option value="Empresa" ${initialData.type === 'Empresa' ? 'selected' : ''}>Empresa</option>
                                                <option value="VIP" ${initialData.type === 'VIP' ? 'selected' : ''}>VIP</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div class="form-group mt-3">
                                    <label class="form-label fw-semibold" for="client-id">Identificación (CI / RIF) <span class="text-danger">*</span></label>
                                    <div class="input-group">
                                        <span class="input-group-text bg-white border-end-0"><i class="bi bi-card-heading text-muted"></i></span>
                                        <input type="text" id="client-id" class="form-control border-start-0 ps-0" required value="${initialData.identification}" placeholder="Ej: V-12345678">
                                    </div>
                                    <small class="text-muted">Este campo será usado para facturación.</small>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="wizard-step" data-step="2" style="display: none;">
                    <div class="form-grid-layout" style="grid-template-columns: 1fr;">
                        
                        <div class="summary-card-premium mb-3">
                            <div class="card-premium-header"><i class="bi bi-geo-alt-fill"></i> <span>Ubicación y Contacto</span></div>
                            <div class="card-premium-body">
                                <div class="row">
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label fw-semibold" for="client-email">Email</label>
                                            <input type="email" id="client-email" class="form-control" value="${initialData.email}" placeholder="cliente@email.com">
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <label class="form-label fw-semibold" for="client-phone">Teléfono</label>
                                            <input type="tel" id="client-phone" class="form-control" value="${initialData.phone}" placeholder="+58 412...">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group mt-3">
                                    <label class="form-label fw-semibold" for="client-address">Dirección Fiscal / Entrega</label>
                                    <textarea id="client-address" class="form-control" rows="3" placeholder="Av. Principal, Edificio...">${initialData.address}</textarea>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="wizard-step" data-step="3" style="display: none;">
                    <div id="summary-view"></div>
                </div>

            </form>
        </div>
    `;

    // 3. Selectores
    const nameInput = element.querySelector('#client-name');
    const idInput = element.querySelector('#client-id');
    const typeSelect = element.querySelector('#client-type');
    const emailInput = element.querySelector('#client-email');
    const phoneInput = element.querySelector('#client-phone');
    const addressInput = element.querySelector('#client-address');

    // 4. Validaciones
    const validateStep1 = () => {
        if (!nameInput.value.trim() || !idInput.value.trim()) {
            showToast('Nombre e Identificación son obligatorios.', 'warning');
            return false;
        }
        return true;
    };

    const validateStep2 = () => {
        // Contacto es opcional, pero si ponen email debe ser válido (simple check)
        if (emailInput.value && !emailInput.value.includes('@')) {
            showToast('El formato del correo no es válido.', 'warning');
            return false;
        }
        return true;
    };

    // 5. Renderizar Resumen
    const showSummary = () => {
        const container = element.querySelector('#summary-view');

        let contentHTML = '';

        if (isEditMode) {
            // Comparación de cambios
            contentHTML = `
                <div class="summary-alert-premium info">
                    <div class="alert-icon"><i class="bi bi-info-circle-fill"></i></div>
                    <div class="alert-content">
                        <div class="alert-title">Confirmar Cambios</div>
                        <div class="alert-subtitle">Revisa los datos antes de actualizar al cliente.</div>
                    </div>
                </div>
                <div class="summary-grid-premium">
                    <div class="summary-card-premium">
                        <div class="card-premium-header"><i class="bi bi-person-vcard"></i><span>Datos Legales</span></div>
                        <div class="card-premium-body">
                            ${diff('Nombre', nameInput.value, initialData.name, fText)}
                            ${diff('ID / RIF', idInput.value, initialData.identification, fText)}
                            ${diff('Tipo', typeSelect.value, initialData.type, fText)}
                        </div>
                    </div>
                    <div class="summary-card-premium">
                        <div class="card-premium-header"><i class="bi bi-geo-alt"></i><span>Contacto</span></div>
                        <div class="card-premium-body">
                            ${diff('Email', emailInput.value, initialData.email, fText)}
                            ${diff('Teléfono', phoneInput.value, initialData.phone, fText)}
                            ${diff('Dirección', addressInput.value, initialData.address, fText)}
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Resumen de creación simple
            contentHTML = `
                <div class="summary-card-premium">
                    <div class="card-premium-header"><i class="bi bi-check-circle-fill"></i><span>Resumen de Nuevo Cliente</span></div>
                    <div class="card-premium-body">
                        <div class="d-flex justify-content-between border-bottom py-2">
                            <span class="text-muted">Cliente:</span> 
                            <strong class="text-end">${nameInput.value}<br><small class="text-primary">${typeSelect.value}</small></strong>
                        </div>
                        <div class="d-flex justify-content-between border-bottom py-2">
                            <span class="text-muted">ID Fiscal:</span> <strong>${idInput.value}</strong>
                        </div>
                        <div class="d-flex justify-content-between border-bottom py-2">
                            <span class="text-muted">Contacto:</span> 
                            <div class="text-end">
                                ${emailInput.value ? `<div>${emailInput.value}</div>` : ''}
                                ${phoneInput.value ? `<div>${phoneInput.value}</div>` : '<em class="text-muted">Sin contacto</em>'}
                            </div>
                        </div>
                        <div class="mt-2">
                            <span class="text-muted d-block mb-1">Dirección:</span>
                            <div class="p-2 bg-light rounded border small text-secondary">
                                ${addressInput.value || 'Sin dirección registrada'}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        container.innerHTML = contentHTML;
        wizardAPI.showStep(3);
    };

    // 6. Guardar
    const handleSave = async () => {
        if (!validateStep1()) { wizardAPI.showStep(1); return; }

        wizardAPI.setSaveButtonBusy(true);

        const formData = {
            name: nameInput.value.trim(),
            identification: idInput.value.trim(),
            type: typeSelect.value,
            email: emailInput.value.trim(),
            phone: phoneInput.value.trim(),
            address: addressInput.value.trim(),
            isActive: true
        };

        try {
            const businessId = globalState.session.business?.id;
            if (!businessId) throw new Error("No se encontró sesión de negocio.");

            if (isEditMode) {
                await updateClient(businessId, clientToEdit.id, formData);
                showToast('Cliente actualizado correctamente.', 'success');
            } else {
                await createClient(businessId, formData);
                showToast('Cliente creado exitosamente.', 'success');
            }

            modalElementRef.remove();
            // Disparar evento para que la vista se actualice sin recargar
            document.dispatchEvent(new CustomEvent('buca:client-updated'));

        } catch (error) {
            Logger.error(error);
            showToast('Error al guardar: ' + error.message, 'error');
        } finally {
            wizardAPI.setSaveButtonBusy(false);
        }
    };

    // 7. Inicialización del Wizard
    setTimeout(() => {
        const wizardCallbacks = {
            onStepNext: () => {
                const current = wizardAPI.getStep();
                if (current === 1 && validateStep1()) wizardAPI.showStep(2);
                else if (current === 2 && validateStep2()) showSummary();
            },
            onStepPrev: () => {
                const current = wizardAPI.getStep();
                if (current > 1) wizardAPI.showStep(current - 1);
            },
            onCalculate: () => { // "Revisar"
                if (validateStep1()) showSummary();
            },
            onSubmit: handleSave
        };

        wizardAPI = initProductFormWizard({
            modalElementRef,
            wizardStepperEl: element.querySelector('#client-wizard-stepper'),
            wizardStepsEls: element.querySelectorAll('.wizard-step'),
            isEditMode,
            callbacks: wizardCallbacks,
            texts: {
                save: 'Crear Cliente',
                update: 'Actualizar Cliente',
                calculate: 'Revisar'
            }
        });

    }, 50);

    return element;
}