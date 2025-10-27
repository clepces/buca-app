// services/modal.service.js

import { state } from '../store/state';
import { Modal } from '../components/Modal.js';
import { triggerRerender } from '../store/actions.js'; // Importamos el re-render

/**
 * Abre la ventana modal.
 * @param {string} content - El tipo de contenido (ej. 'productForm').
 * @param {object} [props={}] - Propiedades para pasar al componente del modal.
 */
export function openModal(content, props = {}) {
  state.ui.modal.isOpen = true;
  state.ui.modal.content = content;
  state.ui.modal.props = props;
  triggerRerender(); // Avisamos a la UI que debe re-dibujar
}

/**
 * Cierra la ventana modal.
 */
export function closeModal() {
  state.ui.modal.isOpen = false;
  state.ui.modal.content = null;
  state.ui.modal.props = {};
  triggerRerender(); // Avisamos a la UI que debe re-dibujar
}

/**
 * --- ¡FUNCIÓN MEJORADA! ---
 * Muestra un modal de confirmación genérico pero personalizable.
 * @param {string} title - El título del modal.
 * @param {string} messageHTML - El mensaje principal (puede ser HTML).
 * @param {function} onConfirm - Callback si el usuario presiona "Confirmar".
 * @param {object} [options={}] - Opciones de personalización.
 * @param {string} [options.icon='bi bi-exclamation-triangle-fill text-warning'] - Clase de icono para el título.
 * @param {string} [options.confirmText='Sí, continuar'] - Texto del botón de confirmación.
 * @param {string} [options.cancelText='Cancelar'] - Texto del botón de cancelación.
 * @param {string} [options.confirmButtonClass='btn-primary'] - Clase CSS para el botón de confirmación.
 * @param {string} [options.cancelButtonClass='btn-secondary'] - Clase CSS para el botón de cancelación.
 * @param {string} [options.confirmIcon='bi bi-check-lg'] - Icono para el botón de confirmación.
 * @param {string} [options.cancelIcon='bi bi-x-lg'] - Icono para el botón de cancelación.
 * @param {string} [options.modalId='confirmation-modal'] - ID para el elemento modal.
 */
export function showConfirmationModal(title, messageHTML, onConfirm, options = {}) {
    // Valores por defecto para las opciones
    const defaults = {
        icon: 'bi bi-exclamation-triangle-fill text-warning',
        confirmText: 'Sí, continuar',
        cancelText: 'Cancelar',
        confirmButtonClass: 'btn-primary',
        cancelButtonClass: 'btn-secondary',
        confirmIcon: 'bi bi-check-lg',
        cancelIcon: 'bi bi-x-lg',
        modalId: 'confirmation-modal'
    };
    const config = { ...defaults, ...options }; // Combina defaults con opciones pasadas

    // Contenido del modal
    const content = document.createElement('div');
    // --- INICIO MODIFICACIÓN: Permitir HTML en el mensaje ---
    content.innerHTML = `<p style="font-size: 1.1rem; line-height: 1.6; color: var(--bs-gray-700);">${messageHTML}</p>`; // Estilo inline simple para el párrafo
    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
         content.querySelector('p').style.color = 'var(--bs-gray-300)'; // Ajuste para tema oscuro
    }
    // --- FIN MODIFICACIÓN ---

    // Botones del footer
    const confirmButton = document.createElement('button');
    confirmButton.className = config.confirmButtonClass; // Clase configurable
    confirmButton.innerHTML = `<i class="${config.confirmIcon} me-1"></i> ${config.confirmText}`; // Icono y texto configurables

    const cancelButton = document.createElement('button');
    cancelButton.className = config.cancelButtonClass; // Clase configurable
    cancelButton.innerHTML = `<i class="${config.cancelIcon} me-1"></i> ${config.cancelText}`; // Icono y texto configurables

    // Contenedor del footer (se pasa directamente)
    const footerContainer = document.createElement('div');
    // No necesita la clase 'modal-footer' aquí, Modal.js la añade
    footerContainer.append(cancelButton, confirmButton);

    const modal = Modal({
        // --- INICIO MODIFICACIÓN: Icono configurable en título ---
        title: `<i class="${config.icon} me-2"></i> ${title}`,
        // --- FIN MODIFICACIÓN ---
        contentElement: content,
        // footerElement: footer, // Modal.js ahora usa #modal-footer-container
        id: config.modalId // ID configurable
    });

    // Añadimos los botones al contenedor del footer que Modal.js espera
    const modalFooterTarget = modal.querySelector('#modal-footer-container');
    if (modalFooterTarget) {
         modalFooterTarget.append(cancelButton, confirmButton);
    } else {
         console.error("No se encontró #modal-footer-container en el modal de confirmación.");
    }


    const closeModalFunc = () => modal.remove();

    cancelButton.addEventListener('click', closeModalFunc);
    confirmButton.addEventListener('click', () => {
        onConfirm(); // Ejecuta la acción de confirmación
        closeModalFunc(); // Cierra el modal
    });

    // Añadimos el modal al body
    document.body.appendChild(modal);
}