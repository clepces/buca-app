// ======================================================
// ARCHIVO NUEVO: src/components/CompanyForm.js
// PROPÓSITO: Wizard para crear una nueva Compañía y
//            su usuario Propietario.
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { showToast } from '../../services/toast.service.js';
import { createNewBusiness } from '../../services/admin.service.js'; // <-- ¡NUEVO SERVICIO!
import { initProductFormWizard } from '../ProductFormWizard.js'; // Reutilizamos el wizard

/**
 * Componente para el Formulario de Creación de Compañía.
 * @param {HTMLElement} modalElementRef - La referencia al elemento del modal.
 */
export function CompanyForm(modalElementRef) {
    const element = document.createElement('div');
    // Usamos las clases premium que ya tenemos
    element.className = 'product-form-wrapper'; 
    
    let wizardAPI = null;

    // Planes (placeholder, deberías cargarlos desde appConfig)
    const plans = [
        { id: 'plan_basic', name: 'Básico' },
        { id: 'plan_advanced', name: 'Avanzado' },
        { id: 'plan_enterprise', name: 'Empresarial' }
    ];

    // 1. Renderizado del HTML
    element.innerHTML = `
        <div class="wizard-stepper" id="company-wizard-stepper">
            <div class="step active" data-step="1"><span>Paso 1</span>Negocio</div>
            <div class="step" data-step="2"><span>Paso 2</span>Propietario</div>
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
                                    <span>Detalles del Negocio</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="form-group">
                                        <label for="company-name">Nombre de la Compañía <span class="text-danger">*</span></label>
                                        <input type="text" id="company-name" required placeholder="Ej: Abarrotes La Esquina">
                                    </div>
                                    <div class="form-group">
                                        <label for="company-plan">Plan Asignado <span class="text-danger">*</span></label>
                                        <select id="company-plan" required>
                                            <option value="">Selecciona un plan...</option>
                                            ${plans.map(plan => `<option value="${plan.id}">${plan.name}</option>`).join('')}
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

    // 2. Selectores de Elementos
    const form = element.querySelector('#company-form');
    const wizardStepper = element.querySelector('#company-wizard-stepper');
    const wizardSteps = element.querySelectorAll('.wizard-step');
    
    // Inputs Paso 1
    const companyNameInput = element.querySelector('#company-name');
    const companyPlanInput = element.querySelector('#company-plan');
    
    // Inputs Paso 2
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
        
        const ownerData = {
            name: ownerNameInput.value,
            email: ownerEmailInput.value,
        };

        // Usamos la UI premium
        summaryContainer.innerHTML = `
            <div class="summary-alert-premium info">
                <div class="alert-icon"><i class="bi bi-info-circle-fill"></i></div>
                <div class="alert-content">
                    <div class="alert-title">Revisa los datos</div>
                    <div class="alert-subtitle">Confirma la creación del nuevo negocio y su propietario.</div>
                </div>
            </div>
            <div class="summary-grid-premium">
                <div class="summary-card-premium">
                    <div class="card-premium-header"><i class="bi bi-building"></i><span>Negocio</span></div>
                    <div class="card-premium-body">
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Nombre</span></div><div class="diff-value-premium"><span class="diff-current-value">${businessData.name}</span></div></div>
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Plan</span></div><div class="diff-value-premium"><span class="diff-current-value">${businessData.plan}</span></div></div>
                    </div>
                </div>
                <div class="summary-card-premium">
                    <div class="card-premium-header"><i class="bi bi-person-fill-gear"></i><span>Propietario</span></div>
                    <div class="card-premium-body">
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Nombre</span></div><div class="diff-value-premium"><span class="diff-current-value">${ownerData.name}</span></div></div>
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Email</span></div><div class="diff-value-premium"><span class="diff-current-value">${ownerData.email}</span></div></div>
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Contraseña</span></div><div class="diff-value-premium"><span class="diff-current-value">********</span></div></div>
                    </div>
                </div>
            </div>
        `;
        wizardAPI.showStep(3);
        return true;
    }

    /**
     * Lógica de Guardado (Submit)
     */
    async function handleSave() {
        // Doble validación
        if (!validateStep1() || !validateStep2()) {
            wizardAPI.showStep(1);
            return;
        }

        wizardAPI.setSaveButtonBusy(true);

        const businessData = {
            name: companyNameInput.value.trim(),
            planId: companyPlanInput.value,
            // ... (aquí irían más datos del negocio si los hubiera)
        };
        
        const ownerData = {
            name: ownerNameInput.value.trim(),
            email: ownerEmailInput.value.trim(),
            password: ownerPasswordInput.value,
        };

        try {
            // ¡Llamada al nuevo servicio de admin!
            await createNewBusiness(businessData, ownerData);
            
            showToast(`Negocio "${businessData.name}" creado exitosamente.`, "success");
            modalElementRef.remove(); // Cerrar el modal

        } catch (error) {
            Logger.error("Error al crear negocio:", error);
            // La Cloud Function debería devolver un error amigable
            showToast(error.message || "Error al crear el negocio.", "error");
            wizardAPI.setSaveButtonBusy(false);
        }
    }

    // 4. Inicialización del Wizard
    setTimeout(() => {
        const wizardCallbacks = {
            onStepNext: () => {
                const currentStep = wizardAPI.getStep();
                if (currentStep === 1) {
                    if (validateStep1()) wizardAPI.showStep(2);
                }
            },
            onStepPrev: () => {
                const currentStep = wizardAPI.getStep();
                if (currentStep === 3) wizardAPI.showStep(2);
                else if (currentStep === 2) wizardAPI.showStep(1);
            },
            onCalculate: () => { // Botón "Calcular" ahora es "Revisar"
                if (validateStep1() && validateStep2()) {
                    showSummary();
                } else {
                    wizardAPI.showStep(1); // Vuelve al paso 1 si falla
                }
            },
            onSubmit: () => {
                handleSave();
            }
        };

        wizardAPI = initProductFormWizard({
            modalElementRef,
            wizardStepperEl: wizardStepper,
            wizardStepsEls: wizardSteps,
            isEditMode: false, // Siempre es modo crear
            callbacks: wizardCallbacks
        });
        
        // Renombramos los botones para que tengan sentido
        const btnCalculate = modalElementRef.querySelector('#modal-btn-calculate');
        const btnSave = modalElementRef.querySelector('#modal-btn-save');

        if (btnCalculate) {
            btnCalculate.innerHTML = `<i class="bi bi-eye-fill me-1"></i> Revisar y Confirmar`;
        }
        if (btnSave) {
            btnSave.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i> Crear Negocio`;
        }

    }, 50);

    return element;
}