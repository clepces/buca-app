// ======================================================
// ARCHIVO: src/components/dynamic/DynamicWizard.js
// VERSIÓN: 1.0.0 (Arquitectura Híbrida)
// AUTOR: Clepces & IA Team
// PROPÓSITO: Generador de formularios paso a paso basado en configuración.
// DEPENDENCIAS: Usa tus componentes 'Common' para mantener el diseño.
// ======================================================

import { FormInput } from '../Common/FormInput.js'; // Tu componente de inputs
import { Button } from '../Common/Button.js';       // Tu componente de botones

export default class DynamicWizard {
    /**
     * @param {Array} schema - Array de pasos (definido en roles.config.js, etc.)
     * Ejemplo de schema: [{ title: 'Datos', fields: [...] }, { title: 'Permisos', ... }]
     */
    constructor(schema) {
        if (!Array.isArray(schema) || schema.length === 0) {
            throw new Error("DynamicWizard: El esquema debe ser un array con al menos un paso.");
        }
        this.steps = schema;
        this.currentStepIndex = 0;
        this.formData = {}; // Aquí acumularemos los datos de todos los pasos
    }

    /**
     * Renderiza el contenido del paso actual (HTML).
     * @returns {HTMLElement} El contenedor del formulario para el Body del Modal.
     */
    render() {
        const step = this.steps[this.currentStepIndex];

        // 1. Contenedor Principal (Estilo limpio)
        const container = document.createElement('div');
        container.className = 'wizard-content';

        // 2. Indicador de Pasos (Opcional: Solo si hay más de 1 paso)
        if (this.steps.length > 1) {
            const progress = document.createElement('div');
            progress.className = 'wizard-progress';
            progress.innerHTML = `
                <span class="step-count">Paso ${this.currentStepIndex + 1}/${this.steps.length}</span>
                <span class="step-title">${step.title}</span>
            `;
            container.appendChild(progress);
        } else if (step.title) {
            // Título simple si es un solo paso
            const title = document.createElement('h4');
            title.className = 'wizard-step-title';
            title.innerText = step.title;
            container.appendChild(title);
        }

        // 3. El Formulario
        const form = document.createElement('form');
        form.id = 'dynamic-wizard-form';
        form.className = 'wizard-form-grid'; // Clase para Grid Layout CSS

        // 4. Generación de Campos (Loop Mágico)
        if (step.fields && step.fields.length > 0) {
            step.fields.forEach(field => {

                // Inyectamos el valor previo si el usuario retrocedió
                const savedValue = this.formData[field.name] || field.value || '';

                // Wrapper para cada input
                const fieldWrapper = document.createElement('div');
                fieldWrapper.className = 'form-field-wrapper';

                // Usamos TU componente FormInput
                // FormInput devuelve un elemento DOM (wrapper)
                const inputElement = FormInput({
                    label: field.label,
                    name: field.name,
                    type: field.type, // 'text', 'select', 'password', 'number', 'textarea'
                    value: savedValue,
                    placeholder: field.placeholder || '',
                    required: field.required || false,
                    options: field.options || [], // Para selects
                    helperText: field.helperText || '',
                    icon: field.icon || '', // Soporte para iconos

                    // Evento para guardar datos en tiempo real (opcional pero recomendado)
                    onChange: (e) => {
                        this.formData[field.name] = e.target.value;
                    }
                });

                // Agregamos el input al wrapper
                fieldWrapper.appendChild(inputElement);

                // Agregamos el wrapper al formulario
                form.appendChild(fieldWrapper);
            });

        } else {
            form.innerHTML = '<p class="text-muted">No hay campos definidos para este paso.</p>';
        }

        container.appendChild(form);
        return container;
    }

    /**
     * Calcula y genera los botones del Footer para el Modal.
     * Esta función es llamada por modal.service.js.
     * * @param {function} onComplete - Acción al terminar (Guardar)
     * @param {function} onCancel - Acción al cancelar (Cerrar)
     * @param {function} onStepChange - Acción para refrescar el modal al cambiar de paso
     * @returns {Array<HTMLElement>} Array de botones
     */
    getFooterButtons(onComplete, onCancel, onStepChange) {
        const buttons = [];
        const isFirstStep = this.currentStepIndex === 0;
        const isLastStep = this.currentStepIndex === this.steps.length - 1;

        // --- Botón 1: Cancelar / Atrás ---
        if (isFirstStep) {
            buttons.push(Button({
                text: 'Cancelar',
                variant: 'secondary', // Estilo gris
                onClick: onCancel
            }));
        } else {
            buttons.push(Button({
                text: 'Atrás',
                variant: 'outline-secondary',
                icon: 'bi-arrow-left',
                onClick: () => {
                    this._saveCurrentStepData(); // Guardar antes de salir
                    this.currentStepIndex--;
                    onStepChange(); // Pedir al modal que se repinte
                }
            }));
        }

        // --- Botón 2: Siguiente / Guardar ---
        buttons.push(Button({
            text: isLastStep ? 'Guardar' : 'Siguiente',
            variant: 'primary', // Estilo principal (Azul/Verde)
            icon: isLastStep ? 'bi-check-lg' : 'bi-arrow-right',
            iconPosition: isLastStep ? 'start' : 'end',
            onClick: async (e) => {
                // 1. Validar formulario actual
                const form = document.getElementById('dynamic-wizard-form');
                if (!form.checkValidity()) {
                    form.reportValidity(); // Mostrar globos de error nativos
                    return;
                }

                // 2. Guardar datos en memoria
                this._saveCurrentStepData();

                // 3. Decidir acción
                if (isLastStep) {
                    // Estado de carga visual en el botón
                    const btn = e.target.closest('button');
                    if (btn) {
                        const originalText = btn.innerHTML;
                        btn.disabled = true;
                        btn.innerHTML = '<span class="loader-spinner-sm"></span> Guardando...';

                        try {
                            await onComplete(this.formData); // Enviar todo al backend
                        } catch (error) {
                            // Si falla, restaurar botón
                            btn.disabled = false;
                            btn.innerHTML = originalText;
                            console.error("Error en DynamicWizard:", error);
                        }
                    }
                } else {
                    // Avanzar paso
                    this.currentStepIndex++;
                    onStepChange(); // Pedir al modal que se repinte
                }
            }
        }));

        return buttons;
    }

    /**
     * Método interno para extraer datos del formulario HTML y guardarlos en el objeto JS.
     */
    _saveCurrentStepData() {
        const form = document.getElementById('dynamic-wizard-form');
        if (!form) return;

        const formData = new FormData(form);
        const stepData = Object.fromEntries(formData.entries());

        // Fusión inteligente: Mantenemos datos viejos y sobreescribimos con nuevos
        this.formData = { ...this.formData, ...stepData };

        // NOTA: Si usas checkboxes múltiples, FormData solo toma el último.
        // Si necesitas checkboxes, aquí iría la lógica especial. 
        // Por ahora, para roles simples, esto basta.
    }
}