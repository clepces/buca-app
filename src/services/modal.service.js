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
 * --- ¡FUNCIÓN AÑADIDA! ---
 * Muestra un modal de confirmación genérico.
 * @param {string} title - El título del modal.
 * @param {string} message - El mensaje en HTML.
 * @param {function} onConfirm - Callback que se ejecuta si el usuario presiona "Sí".
 */
export function showConfirmationModal(title, message, onConfirm) {
    const content = document.createElement('div');
    content.innerHTML = `<p>${message}</p>`;

    const confirmButton = document.createElement('button');
    confirmButton.className = 'btn-danger';
    confirmButton.innerHTML = '<i class="fas fa-check"></i> Sí, continuar';

    const cancelButton = document.createElement('button');
    cancelButton.className = 'btn-secondary';
    cancelButton.innerHTML = '<i class="fas fa-times"></i> Cancelar';

    const footer = document.createElement('div');
    footer.className = 'modal-footer';
    footer.append(cancelButton, confirmButton);

    const modal = Modal({
        title: `<i class="fas fa-exclamation-triangle"></i> ${title}`,
        contentElement: content,
        footerElement: footer,
        id: 'confirmation-modal'
    });

    const closeModalFunc = () => modal.remove();

    cancelButton.addEventListener('click', closeModalFunc);
    confirmButton.addEventListener('click', () => {
        onConfirm();
        closeModalFunc();
    });

    // Añadimos el modal al body
    document.body.appendChild(modal);
}