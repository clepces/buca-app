// ======================================================
// ARCHIVO: src/components/ProductFormWizard.js
// PROPÓSITO: Controla la lógica de UI para el wizard.
// CORRECCIÓN: (Bug de Pasos)
// 1. El wizard ahora es dinámico. Obtiene 'totalSteps'
//    del número de elementos (divs) recibidos.
// 2. 'showStep' valida contra 'totalSteps' dinámico.
// 3. 'updateFooterButtons' muestra 'Calcular' en el paso
//    (totalSteps - 1) y 'Guardar' en el paso (totalSteps).
// ======================================================

import { Logger } from '../services/logger.service.js';

/**
 * Inicializa y controla un wizard de N pasos dentro de un modal.
 * @param {object} config - Objeto de configuración.
 * @param {HTMLElement} config.modalElementRef - La referencia al elemento del modal principal.
 * @param {HTMLElement} config.wizardStepperEl - El elemento stepper del header.
 * @param {NodeListOf<HTMLElement>} config.wizardStepsEls - Una lista de N divs de contenido.
 * @param {boolean} config.isEditMode - Para etiqutar los botones correctamente.
 * @param {object} config.callbacks - Funciones que el wizard llamará.
 * @param {function} config.callbacks.onStepNext - Se llama al pulsar "Siguiente".
 * @param {function} config.callbacks.onStepPrev - Se llama al pulsar "Anterior".
 * @param {function} config.callbacks.onCalculate - Se llama al pulsar "Calcular/Revisar".
 * @param {function} config.callbacks.onSubmit - Se llama al pulsar "Guardar/Actualizar".
 * @returns {object} - Una API para controlar el wizard externamente.
 */
export function initProductFormWizard(config) {
    const { modalElementRef, wizardStepperEl, wizardStepsEls, isEditMode, callbacks } = config;

    // --- ¡INICIO DE CORRECCIÓN 1! ---
    const totalSteps = wizardStepsEls.length; // ¡Dinámico! (Será 4 para Productos, 3 para Compañía)
    Logger.info(`[Wizard] Inicializado con ${totalSteps} pasos.`);
    // --- FIN DE CORRECCIÓN 1 ---

    let currentStep = 1;
    let btnPrev = null;
    let btnNext = null;
    let btnCalculate = null;
    let btnSave = null;

    // --- IMPORTANTE: Definimos los listeners aquí para poder removerlos ---
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
        
        // Ocultar todos primero
        btnPrev.style.display = 'none'; 
        btnNext.style.display = 'none'; 
        btnCalculate.style.display = 'none'; 
        btnSave.style.display = 'none';

        // --- ¡INICIO DE CORRECCIÓN 3! ---
        // Lógica de botones dinámicos
            
        if (stepNum > 1) {
            btnPrev.style.display = 'inline-flex';
        }

        if (stepNum === totalSteps) {
            // --- PASO FINAL (Resumen) ---
            // (Ej: 4 de 4, o 3 de 3)
            btnPrev.innerHTML = `<i class="bi bi-pencil-fill me-1"></i> Volver a Editar`; 
            btnSave.style.display = 'inline-flex';
        
        } else if (stepNum === totalSteps - 1) {
            // --- PENÚLTIMO PASO (Datos antes de Resumen) ---
            // (Ej: 3 de 4, o 2 de 3)
            btnCalculate.style.display = 'inline-flex';
        
        } else {
            // --- CUALQUIER PASO ANTERIOR ---
            // (Ej: 1 de 4, 2 de 4, o 1 de 3)
            btnNext.style.display = 'inline-flex'; 
            btnNext.innerHTML = `Siguiente <i class="bi bi-arrow-right ms-1"></i>`; 
        }

        // Caso especial: Si el wizard solo tiene 2 pasos (ej. Info y Resumen)
        if (totalSteps === 2 && stepNum === 1) {
             btnNext.style.display = 'none'; // Ocultar "Siguiente"
             btnCalculate.style.display = 'inline-flex'; // Mostrar "Revisar" de una vez
        }

        // Renombrar "Anterior" en el paso 2 (siempre es el mismo)
        if (stepNum === 2) {
             btnPrev.innerHTML = `<i class="bi bi-arrow-left me-1"></i> Anterior`; 
        }
        // --- FIN DE CORRECCIÓN 3 ---
    };

    /**
     * Muestra un paso específico del wizard y actualiza la UI.
     * @param {number} stepNum - El número del paso (1 a N).
     */
    function showStep(stepNum) {
        
        // --- ¡INICIO DE CORRECCIÓN 2! ---
        if (stepNum < 1 || stepNum > totalSteps) { // ¡Validación dinámica!
            Logger.warn(`[Wizard] Número de paso inválido: ${stepNum} (Total: ${totalSteps})`);
            return; 
        }
        // --- FIN DE CORRECCIÓN 2 ---
        
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

        // Actualizar botones del footer
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
        
        // --- Crear Botones ---
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
        btnSave.type = 'button'; // Es 'button' para prevenir submit del form
        btnSave.id = isEditMode ? 'modal-btn-update' : 'modal-btn-save';
        btnSave.className = 'btn-primary';
        btnSave.innerHTML = `<i class="bi ${isEditMode ? 'bi-arrow-repeat' : 'bi-save-fill'} me-1"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`;

        // --- Asignar Callbacks (CORREGIDO) ---
        btnPrev.addEventListener('click', handlePrev);
        btnNext.addEventListener('click', handleNext);
        btnCalculate.addEventListener('click', handleCalculate);
        btnSave.addEventListener('click', handleSubmit);

        // Añadir botones al DOM
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
                // Inserta el stepper antes del botón de cerrar
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
        
        // --- CORREGIDO: Ahora sí se pueden remover ---
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
        setSaveButtonBusy: (isBusy = true) => {
            if (btnSave) {
                btnSave.disabled = isBusy;
                if (isBusy) {
                    btnSave.innerHTML = `<i class="bi bi-hourglass-split me-1"></i> Guardando...`;
                } else {
                    // Re-establece el texto correcto (Guardar o Actualizar)
                    btnSave.innerHTML = `<i class="bi ${isEditMode ? 'bi-arrow-repeat' : 'bi-save-fill'} me-1"></i> ${isEditMode ? 'Actualizar Producto' : 'Guardar Producto'}`;
                    
                    // Asegurarse de que el botón de Guardar Compañía también se resetee
                    if (modalElementRef.id === 'add-company-modal') {
                         btnSave.innerHTML = `<i class="bi bi-check-circle-fill me-1"></i> Crear Negocio`;
                    }
                }
            }
        }
    };
}