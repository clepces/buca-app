// ======================================================
// ARCHIVO: src/components/Companies/CompanyForm.js
// VERSIÓN: Soporte para CREAR y EDITAR (FIXED)
// CORRECCIÓN: Definición de 'wizardStepper' agregada.
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { showToast } from '../../services/toast.service.js';
import { createNewBusiness, updateBusiness } from '../../services/admin.service.js';
import { initProductFormWizard } from '../Products/ProductFormWizard.js';

/**
 * Componente para el Formulario de Creación/Edición de Compañía.
 * @param {HTMLElement} modalElementRef - La referencia al elemento del modal.
 * @param {object|null} companyToEdit - Objeto con datos de la empresa si se va a editar.
 */
export function CompanyForm(modalElementRef, companyToEdit = null) {
    const element = document.createElement('div');
    element.className = 'product-form-wrapper'; 
    
    let wizardAPI = null;
    const isEditMode = !!companyToEdit; // true si estamos editando

    // Planes
    const plans = [
        { id: 'plan_basic', name: 'Básico' },
        { id: 'plan_advanced', name: 'Avanzado' },
        { id: 'plan_enterprise', name: 'Empresarial' }
    ];

    // Valores iniciales
    const initialValues = {
        name: isEditMode ? companyToEdit.name : '',
        plan: isEditMode ? companyToEdit.planId : ''
    };

    // 1. Renderizado del HTML
    element.innerHTML = `
        <div class="wizard-stepper" id="company-wizard-stepper">
            <div class="step active" data-step="1"><span>Paso 1</span>Negocio</div>
            <div class="step" data-step="2" style="${isEditMode ? 'display:none;' : ''}"><span>Paso 2</span>Propietario</div>
            <div class="step" data-step="3"><span>Paso 3</span>Confirmar</div>
        </div>

        <div class="wizard-content">
            <form class="product-form" id="company-form">
                
                <div class="wizard-step" data-step="1" style="display: block;">
                    <div class="form-grid-layout" style="grid-template-columns: 1fr;">
                        <div class="form-column-left">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-building"></i> 
                                    <span>${isEditMode ? 'Editar Datos' : 'Detalles del Negocio'}</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="form-group">
                                        <label for="company-name">Nombre de la Compañía <span class="text-danger">*</span></label>
                                        <input type="text" id="company-name" required 
                                               value="${initialValues.name}"
                                               placeholder="Ej: Abarrotes La Esquina">
                                    </div>
                                    <div class="form-group">
                                        <label for="company-plan">Plan Asignado <span class="text-danger">*</span></label>
                                        <select id="company-plan" required>
                                            <option value="">Selecciona un plan...</option>
                                            ${plans.map(plan => `
                                                <option value="${plan.id}" ${plan.id === initialValues.plan ? 'selected' : ''}>
                                                    ${plan.name}
                                                </option>
                                            `).join('')}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="2" style="display: none;">
                    <div class="form-grid-layout" style="grid-template-columns: 1fr;">
                         <div class="form-column-left">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-person-fill-gear"></i> 
                                    <span>Usuario Propietario</span>
                                </div>
                                <div class="card-premium-body">
                                    ${isEditMode ? '<p class="text-muted p-3">La gestión del propietario se realiza desde el módulo de usuarios.</p>' : `
                                    <div class="form-group">
                                        <label for="owner-name">Nombre del Propietario <span class="text-danger">*</span></label>
                                        <input type="text" id="owner-name" required placeholder="Ej: Juan Pérez">
                                    </div>
                                    <div class="form-group">
                                        <label for="owner-email">Email de Acceso <span class="text-danger">*</span></label>
                                        <input type="email" id="owner-email" required placeholder="juan.perez@email.com">
                                    </div>
                                    <div class="form-group">
                                        <label for="owner-password">Contraseña Temporal <span class="text-danger">*</span></label>
                                        <input type="password" id="owner-password" required autocomplete="new-password">
                                    </div>
                                    `}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="3" style="display: none;">
                    <div class="product-summary-view" id="summary-view">
                        </div>
                </div>
            </form>
        </div>
    `;

    // 2. Selectores
    const companyNameInput = element.querySelector('#company-name');
    const companyPlanInput = element.querySelector('#company-plan');
    
    // Estos pueden ser null en modo edición si no se renderizaron
    const ownerNameInput = element.querySelector('#owner-name');
    const ownerEmailInput = element.querySelector('#owner-email');
    const ownerPasswordInput = element.querySelector('#owner-password');

    // 3. Lógica y Callbacks

    function validateStep1() {
        if (!companyNameInput.value.trim() || !companyPlanInput.value) {
            showToast("Debes completar el nombre y el plan del negocio.", "warning");
            return false;
        }
        return true;
    }

    function validateStep2() {
        if (isEditMode) return true; // En edición no validamos paso 2

        if (!ownerNameInput.value.trim() || !ownerEmailInput.value.trim()) {
            showToast("Debes completar el nombre y email del propietario.", "warning");
            return false;
        }
        if (ownerPasswordInput.value.length < 6) {
            showToast("La contraseña debe tener al menos 6 caracteres.", "warning");
            return false;
        }
        return true;
    }

    /**
     * Muestra el resumen (Paso 3)
     */
    function showSummary() {
        const summaryContainer = element.querySelector('#summary-view');
        
        const businessData = {
            name: companyNameInput.value,
            plan: companyPlanInput.options[companyPlanInput.selectedIndex].text,
        };
        
        // Si es creación, mostramos también el dueño
        let ownerHtml = '';
        if (!isEditMode && ownerNameInput) {
            const ownerData = {
                name: ownerNameInput.value,
                email: ownerEmailInput.value,
            };
            ownerHtml = `
                <div class="summary-card-premium mt-3">
                    <div class="card-premium-header"><i class="bi bi-person-fill-gear"></i><span>Propietario</span></div>
                    <div class="card-premium-body">
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Nombre</span></div><div class="diff-value-premium"><span class="diff-current-value">${ownerData.name}</span></div></div>
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Email</span></div><div class="diff-value-premium"><span class="diff-current-value">${ownerData.email}</span></div></div>
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Contraseña</span></div><div class="diff-value-premium"><span class="diff-current-value">********</span></div></div>
                    </div>
                </div>
            `;
        }

        summaryContainer.innerHTML = `
            <div class="summary-alert-premium info">
                <div class="alert-icon"><i class="bi bi-info-circle-fill"></i></div>
                <div class="alert-content">
                    <div class="alert-title">${isEditMode ? 'Confirmar Cambios' : 'Revisar Datos'}</div>
                    <div class="alert-subtitle">Verifica la información antes de ${isEditMode ? 'actualizar' : 'crear'}.</div>
                </div>
            </div>
            <div class="summary-grid-premium">
                <div class="summary-card-premium">
                    <div class="card-premium-header"><i class="bi bi-building"></i><span>Negocio</span></div>
                    <div class="card-premium-body">
                        <div class="diff-item-premium ${isEditMode ? 'changed' : 'unchanged'}"><div class="diff-header-premium"><span class="diff-label-premium">Nombre</span></div><div class="diff-value-premium"><span class="diff-current-value">${businessData.name}</span></div></div>
                        <div class="diff-item-premium ${isEditMode ? 'changed' : 'unchanged'}"><div class="diff-header-premium"><span class="diff-label-premium">Plan</span></div><div class="diff-value-premium"><span class="diff-current-value">${businessData.plan}</span></div></div>
                    </div>
                </div>
                ${ownerHtml}
            </div>
        `;
        wizardAPI.showStep(3);
        return true;
    }

    /**
     * Lógica de Guardado (Submit)
     */
    async function handleSave() {
        if (!validateStep1()) { wizardAPI.showStep(1); return; }
        if (!isEditMode && !validateStep2()) { wizardAPI.showStep(2); return; }

        wizardAPI.setSaveButtonBusy(true);

        try {
            if (isEditMode) {
                // --- MODO EDICIÓN ---
                await updateBusiness(companyToEdit.id, {
                    name: companyNameInput.value.trim(),
                    planId: companyPlanInput.value
                });
                showToast("Compañía actualizada exitosamente.", "success");
            } else {
                // --- MODO CREACIÓN ---
                const businessData = { name: companyNameInput.value.trim(), planId: companyPlanInput.value };
                const ownerData = { name: ownerNameInput.value.trim(), email: ownerEmailInput.value.trim(), password: ownerPasswordInput.value };
                await createNewBusiness(businessData, ownerData);
                showToast(`Negocio "${businessData.name}" creado exitosamente.`, "success");
            }
            modalElementRef.remove(); 

        } catch (error) {
            Logger.error("Error en formulario:", error);
            showToast(error.message || "Error en la operación.", "error");
            wizardAPI.setSaveButtonBusy(false);
        }
    }

    // 4. Inicialización del Wizard
    setTimeout(() => {
        const wizardCallbacks = {
            onStepNext: () => {
                const currentStep = wizardAPI.getStep();
                if (currentStep === 1) {
                    if (validateStep1()) {
                        // Si es edición, salta el paso 2 directo al resumen
                        isEditMode ? showSummary() : wizardAPI.showStep(2);
                    }
                } else if (currentStep === 2) {
                    if (validateStep2()) showSummary();
                }
            },
            onStepPrev: () => {
                const current = wizardAPI.getStep();
                // Si es edición y estamos en el 3, volver al 1 (saltar el 2)
                if (isEditMode && current === 3) wizardAPI.showStep(1);
                else if (current > 1) wizardAPI.showStep(current - 1);
            },
            onCalculate: () => { 
                if(validateStep1()) showSummary(); 
            },
            onSubmit: handleSave
        };

        // --- CORRECCIÓN: Definimos wizardStepper explícitamente ---
        const wizardStepper = element.querySelector('#company-wizard-stepper');
        
        wizardAPI = initProductFormWizard({
            modalElementRef,
            wizardStepperEl: wizardStepper, // <--- Ahora sí está definido
            wizardStepsEls: element.querySelectorAll('.wizard-step'),
            isEditMode: isEditMode, 
            callbacks: wizardCallbacks
        });
        
        // Ajustar textos de botones
        const btnCalculate = modalElementRef.querySelector('#modal-btn-calculate');
        const btnSave = modalElementRef.querySelector('#modal-btn-save');

        if (btnCalculate) btnCalculate.innerHTML = `<i class="bi bi-eye-fill me-1"></i> Revisar`;
        if (btnSave) {
            btnSave.innerHTML = isEditMode 
                ? `<i class="bi bi-arrow-repeat me-1"></i> Actualizar Negocio`
                : `<i class="bi bi-check-circle-fill me-1"></i> Crear Negocio`;
        }

    }, 50);

    return element;
}