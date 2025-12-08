// ======================================================
// ARCHIVO: src/components/Team/EmployeeFormWizard.js
// PROPÓSITO: Controlador del Wizard para el formulario de Empleados.
// BASADO EN: src/components/Products/ProductFormWizard.js
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { Button } from '../Common/Button.js';

/**
 * Inicializa y controla el wizard de pasos para Empleados.
 * Reutiliza la lógica de navegación y gestión de botones del ProductWizard.
 * * @param {object} config - Objeto de configuración.
 * @param {HTMLElement} config.modalElementRef - Referencia al modal.
 * @param {HTMLElement} config.wizardStepperEl - Elemento visual de los pasos (header).
 * @param {NodeListOf<HTMLElement>} config.wizardStepsEls - Lista de divs de contenido (pasos).
 * @param {boolean} config.isEditMode - Define si es creación o edición.
 * @param {object} config.texts - Personalización de textos de botones.
 * @param {object} config.callbacks - Funciones para next, prev, calculate (revisar) y submit.
 */
export function EmployeeFormWizard(config) {
    const { modalElementRef, wizardStepperEl, wizardStepsEls, isEditMode, callbacks, texts } = config;

    // --- 1. Configuración de Textos (Adaptados a Empleados) ---
    const defaultTexts = {
        save: 'Crear Empleado',
        update: 'Actualizar Empleado',
        calculate: 'Revisar Datos', // En lugar de "Calcular Precio"
        next: 'Siguiente',
        prev: 'Anterior'
    };
    const uiTexts = { ...defaultTexts, ...texts };

    // --- 2. Estado Interno ---
    const totalSteps = wizardStepsEls.length;
    let currentStep = 1;

    // Referencias a botones
    let btnPrev = null;
    let btnNext = null;
    let btnReview = null; // Equivalente a btnCalculate
    let btnSave = null;

    Logger.info(`[EmployeeWizard] Inicializado con ${totalSteps} pasos.`);

    // --- 3. Handlers (Listeners) ---
    const handlePrev = () => callbacks.onStepPrev();
    const handleNext = () => callbacks.onStepNext();
    const handleReview = () => callbacks.onCalculate(); // Usamos onCalculate como "Review"
    const handleSubmit = () => callbacks.onSubmit();

    /**
     * Gestiona la visibilidad de los botones según el paso actual.
     */
    function updateFooterButtons(stepNum) {
        if (!btnPrev || !btnNext || !btnReview || !btnSave) return;

        // Ocultar todos por defecto
        btnPrev.style.display = 'none';
        btnNext.style.display = 'none';
        btnReview.style.display = 'none';
        btnSave.style.display = 'none';

        // Botón "Anterior" (visible a partir del paso 2)
        if (stepNum > 1) {
            btnPrev.style.display = 'inline-flex';

            // Si estamos en el último paso (Resumen), cambiamos el texto
            if (stepNum === totalSteps) {
                btnPrev.innerHTML = `<i class="bi bi-pencil-fill me-1"></i> Volver a Editar`;
            } else {
                btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> ${uiTexts.prev}`;
            }
        }

        // Lógica de pasos
        if (stepNum === totalSteps) {
            // --- PASO FINAL (Guardar) ---
            btnSave.style.display = 'inline-flex';

        } else if (stepNum === totalSteps - 1) {
            // --- PENÚLTIMO PASO (Revisión) ---
            // Muestra el botón de "Revisar" antes de ir al resumen final
            btnReview.style.display = 'inline-flex';

        } else {
            // --- PASOS INTERMEDIOS ---
            btnNext.style.display = 'inline-flex';
            btnNext.innerHTML = `${uiTexts.next} <i class="bi bi-arrow-right ms-1"></i>`;
        }

        // Caso especial: Si solo hay 2 pasos (ej: Datos -> Resumen)
        if (totalSteps === 2 && stepNum === 1) {
            btnNext.style.display = 'none';
            btnReview.style.display = 'inline-flex';
        }
    }

    /**
     * Cambia el paso visible y actualiza el stepper visual.
     */
    function showStep(stepNum) {
        if (stepNum < 1 || stepNum > totalSteps) {
            Logger.warn(`[EmployeeWizard] Paso inválido: ${stepNum}`);
            return;
        }

        currentStep = stepNum;

        // 1. Mostrar/Ocultar Contenido
        wizardStepsEls.forEach(step => {
            step.style.display = (parseInt(step.dataset.step) === currentStep) ? 'block' : 'none';
        });

        // 2. Actualizar Stepper (Círculos superiores)
        if (wizardStepperEl) {
            wizardStepperEl.querySelectorAll('.step').forEach(step => {
                const stepData = parseInt(step.dataset.step);
                step.classList.toggle('active', stepData === currentStep);
                step.classList.toggle('completed', stepData < currentStep);
                if (stepData >= currentStep) {
                    step.classList.remove('completed');
                }
            });
        }

        // 3. Actualizar Botones
        updateFooterButtons(currentStep);
    }

    /**
     * Genera los botones y los inyecta en el footer del modal.
     */
    function createFooterButtons() {
        const modalFooterContainer = modalElementRef.querySelector('#modal-footer-container');
        if (!modalFooterContainer) {
            Logger.error("[EmployeeWizard] No se encontró #modal-footer-container.");
            return;
        }
        modalFooterContainer.innerHTML = '';

        // Botón Anterior
        btnPrev = Button({
            text: uiTexts.prev,
            variant: 'secondary',
            id: 'modal-btn-emp-prev',
            classes: 'me-auto', // Empuja los otros a la derecha
            icon: 'bi-arrow-left',
            onClick: handlePrev
        });

        // Botón Siguiente
        btnNext = Button({
            text: uiTexts.next,
            variant: 'primary',
            id: 'modal-btn-emp-next',
            icon: 'bi-arrow-right',
            iconPosition: 'end',
            onClick: handleNext
        });

        // Botón Revisar (Equivalente a Calculate)
        btnReview = Button({
            text: uiTexts.calculate,
            variant: 'primary',
            id: 'modal-btn-emp-review',
            icon: 'bi-eye-fill', // Icono diferente a la calculadora
            iconPosition: 'start',
            onClick: handleReview
        });

        // Botón Guardar
        btnSave = Button({
            text: isEditMode ? uiTexts.update : uiTexts.save,
            variant: 'primary',
            id: isEditMode ? 'modal-btn-emp-update' : 'modal-btn-emp-save',
            icon: isEditMode ? 'bi-arrow-repeat' : 'bi-person-check-fill',
            iconPosition: 'start',
            onClick: handleSubmit
        });

        modalFooterContainer.append(btnPrev, btnReview, btnNext, btnSave);
    }

    /**
     * Mueve el stepper HTML al header del modal para que sea persistente.
     */
    function moveStepperToHeader() {
        try {
            const modalHeader = modalElementRef.querySelector('.modal-header');
            const closeButton = modalElementRef.querySelector('.modal-header .close');
            if (modalHeader && wizardStepperEl && closeButton) {
                modalHeader.insertBefore(wizardStepperEl, closeButton);
            }
        } catch (error) {
            Logger.error('[EmployeeWizard] Error moviendo stepper:', error);
        }
    }

    /**
     * Limpieza de listeners.
     */
    function cleanup() {
        btnPrev?.removeEventListener('click', handlePrev);
        btnNext?.removeEventListener('click', handleNext);
        btnReview?.removeEventListener('click', handleReview);
        btnSave?.removeEventListener('click', handleSubmit);
    }

    // --- Inicialización ---
    createFooterButtons();
    moveStepperToHeader();
    showStep(1);

    // --- API Pública ---
    return {
        showStep,
        cleanup,
        getStep: () => currentStep,
        setSaveButtonBusy: (isBusy = true) => {
            if (btnSave) {
                btnSave.setLoading(isBusy);
            }
        }
    };
}