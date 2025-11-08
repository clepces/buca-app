// ======================================================
// ARCHIVO: src/components/ProductFormWizard.js
// Propósito: Controla toda la lógica de UI para el 
// wizard de 4 pasos (pasos, botones, navegación).
// ======================================================

import { Logger } from '../services/logger.service.js';

/**
 * Inicializa y controla un wizard de 4 pasos dentro de un modal.
 * @param {object} config - Objeto de configuración.
 * @param {HTMLElement} config.modalElementRef - La referencia al elemento del modal principal.
 * @param {HTMLElement} config.wizardStepperEl - El elemento stepper del header.
 * @param {NodeListOf<HTMLElement>} config.wizardStepsEls - Una lista de los 4 divs de contenido.
 * @param {boolean} config.isEditMode - Para etiqutar los botones correctamente.
 * @param {object} config.callbacks - Funciones que el wizard llamará.
 * @param {function} config.callbacks.onStepNext - Se llama al pulsar "Siguiente".
 * @param {function} config.callbacks.onStepPrev - Se llama al pulsar "Anterior".
 * @param {function} config.callbacks.onCalculate - Se llama al pulsar "Calcular".
 * @param {function} config.callbacks.onSubmit - Se llama al pulsar "Guardar/Actualizar".
 * @returns {object} - Una API para controlar el wizard externamente.
 */
export function initProductFormWizard(config) {
    const { modalElementRef, wizardStepperEl, wizardStepsEls, isEditMode, callbacks } = config;

    let currentStep = 1;
    let btnPrev = null;
    let btnNext = null;
    let btnCalculate = null;
    let btnSave = null;

    // --- MEJORA: Definimos los handlers para poder removerlos en cleanup() ---
    const handlePrev = () => callbacks.onStepPrev();
    const handleNext = () => callbacks.onStepNext();
    const handleCalculate = () => callbacks.onCalculate();
    const handleSubmit = () => callbacks.onSubmit();

    /**
     * Muestra u oculta los botones del footer según el paso actual.
     */
    function updateFooterButtons(stepNum) {
        if (!btnPrev || !btnNext || !btnCalculate || !btnSave) { 
            // console.log("Botones de footer aún no creados.");
            return; 
        }
        
        btnPrev.style.display = 'none'; 
        btnNext.style.display = 'none'; 
        btnCalculate.style.display = 'none'; 
        btnSave.style.display = 'none';

        switch (stepNum) {
            case 1: 
                btnNext.style.display = 'inline-flex'; 
                btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`; 
                break;
            case 2: 
                btnPrev.style.display = 'inline-flex'; 
                btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`; 
                btnNext.style.display = 'inline-flex'; 
                btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`; 
                break;
            case 3: 
                btnPrev.style.display = 'inline-flex'; 
                btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`; 
                btnCalculate.style.display = 'inline-flex'; 
                break;
            case 4: 
                btnPrev.style.display = 'inline-flex'; 
                btnPrev.innerHTML = `<i class="bi bi-pencil-fill me-1"></i> Volver a Editar`; 
                btnSave.style.display = 'inline-flex'; 
                break;
        }
    };

    /**
     * Muestra un paso específico del wizard y actualiza la UI.
     * @param {number} stepNum - El número del paso (1-4).
     */
    function showStep(stepNum) {
        if (stepNum < 1 || stepNum > 4) { 
            // console.log(`Número de paso inválido: ${stepNum}`);
            return; 
        }
        
        currentStep = stepNum;

        // Actualizar paneles de contenido
        wizardStepsEls.forEach(step => { 
            step.style.display = (parseInt(step.dataset.step) === currentStep) ? 'block' : 'none'; 
        });

        // Actualizar stepper de header
        wizardStepperEl.querySelectorAll('.step').forEach(step => { 
            const stepData = parseInt(step.dataset.step); 
            step.classList.toggle('active', stepData === currentStep); 
            step.classList.toggle('completed', stepData < currentStep); 
            if (stepData >= currentStep) { 
                step.classList.remove('completed'); 
            } 
        }); 

        updateFooterButtons(currentStep);
    };

    /**
     * Crea los botones del footer y los añade al modal.
     */
    function createFooterButtons() {
        const modalFooterContainer = modalElementRef.querySelector('#modal-footer-container');
        if (!modalFooterContainer) {
            Logger.error("[ProductFormWizard] ¡Error fatal! No se encontró #modal-footer-container.");
            return;
        }
        modalFooterContainer.innerHTML = '';
        
        btnPrev = document.createElement('button');
        btnPrev.type = 'button';
        btnPrev.id = 'modal-btn-prev';
        btnPrev.className = 'btn-secondary me-auto';
        
        btnNext = document.createElement('button');
        btnNext.type = 'button';
        btnNext.id = 'modal-btn-next';
        btnNext.className = 'btn-primary';

        btnCalculate = document.createElement('button');
        btnCalculate.type = 'button';
        btnCalculate.id = 'modal-btn-calculate';
        btnCalculate.className = 'btn-primary';
        btnCalculate.innerHTML = `<i class="bi bi-calculator me-1"></i> Calcular y Revisar`;

        btnSave = document.createElement('button');
        btnSave.type = 'button';
        btnSave.id = isEditMode ? 'modal-btn-update' : 'modal-btn-save';
        btnSave.className = 'btn-primary';
        btnSave.innerHTML = `<i class="bi ${isEditMode ? 'bi-arrow-repeat' : 'bi-save-fill'} me-1"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`;

        // Asignar Callbacks (referenciados)
        btnPrev.addEventListener('click', handlePrev);
        btnNext.addEventListener('click', handleNext);
        btnCalculate.addEventListener('click', handleCalculate);
        btnSave.addEventListener('click', handleSubmit);

        modalFooterContainer.append(btnPrev, btnCalculate, btnNext, btnSave);
    }

    /**
     * Mueve el stepper a la cabecera del modal.
     */
    function moveStepperToHeader() {
        try {
            const modalHeader = modalElementRef.querySelector('.modal-header');
            const closeButton = modalElementRef.querySelector('.modal-header .close');
            if (modalHeader && wizardStepperEl && closeButton) {
                modalHeader.insertBefore(wizardStepperEl, closeButton);
            }
        } catch (error) {
            Logger.error('[ProductFormWizard] Error al mover el stepper:', error);
        }
    }

    /**
     * Limpia los event listeners creados por este wizard.
     */
    function cleanup() {
        // console.log("Limpiando listeners del wizard...");
        btnPrev?.removeEventListener('click', handlePrev);
        btnNext?.removeEventListener('click', handleNext);
        btnCalculate?.removeEventListener('click', handleCalculate);
        btnSave?.removeEventListener('click', handleSubmit);
    }

    // --- Inicialización ---
    createFooterButtons();
    moveStepperToHeader();
    showStep(1); // Iniciar en el paso 1

    // Devolver la API pública del wizard
    return {
        showStep,
        cleanup,
        getStep: () => currentStep,
        /**
         * Pone el botón de guardar en estado de "ocupado" o "listo".
         * @param {boolean} isBusy - True para "Guardando...", false para "Guardar".
         */
        setSaveButtonBusy: (isBusy = true) => {
            if (btnSave) {
                btnSave.disabled = isBusy;
                if (isBusy) {
                    btnSave.innerHTML = `<i class="bi bi-hourglass-split me-1"></i> Guardando...`;
                } else {
                    btnSave.innerHTML = `<i class="bi ${isEditMode ? 'bi-arrow-repeat' : 'bi-save-fill'} me-1"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`;
                }
            }
        }
    };
}