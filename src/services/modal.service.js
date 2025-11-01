// ======================================================
// ARCHIVO: src/services/modal.service.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: (Anotaciones Q-1, Q-2, Q-3, AA-1)
// 1. Se elimina 'openModal' y 'closeModal' (código muerto).
// 2. Se importa 'ProductForm' y 'Modal'.
// 3. Se AÑADE 'openProductModal', moviendo la lógica desde 'ProductsView'.
// ======================================================

import { state } from '../store/state.js';
import { Modal } from '../components/Modal.js';
import { ProductForm } from '../components/ProductForm.js'; // <-- 1. Importar Formulario
import { Logger } from './logger.service.js';

/**
 * Muestra un modal de confirmación genérico pero personalizable.
 * (Esta función se mantiene igual, es nuestro estándar de oro)
 * @param {string} title - El título del modal.
 * @param {string} messageHTML - El mensaje principal (puede ser HTML).
 * @param {function} onConfirm - Callback si el usuario presiona "Confirmar".
 * @param {object} [options={}] - Opciones de personalización.
 */
export function showConfirmationModal(title, messageHTML, onConfirm, options = {}) {
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
    const config = { ...defaults, ...options };

    const content = document.createElement('div');
    content.innerHTML = `<p style="font-size: 1.1rem; line-height: 1.6; color: var(--bs-gray-700);">${messageHTML}</p>`;
    if (document.documentElement.getAttribute('data-bs-theme') === 'dark') {
         content.querySelector('p').style.color = 'var(--bs-gray-300)';
    }

    const confirmButton = document.createElement('button');
    confirmButton.className = config.confirmButtonClass;
    confirmButton.innerHTML = `<i class="${config.confirmIcon} me-1"></i> ${config.confirmText}`;

    const cancelButton = document.createElement('button');
    cancelButton.className = config.cancelButtonClass;
    cancelButton.innerHTML = `<i class="${config.cancelIcon} me-1"></i> ${config.cancelText}`;

    const footerContainer = document.createElement('div');
    footerContainer.append(cancelButton, confirmButton);

    const modal = Modal({
        title: `<i class="${config.icon} me-2"></i> ${title}`,
        contentElement: content,
        id: config.modalId
    });

    const modalFooterTarget = modal.querySelector('#modal-footer-container');
    if (modalFooterTarget) {
         modalFooterTarget.append(cancelButton, confirmButton);
    } else {
         console.error("No se encontró #modal-footer-container en el modal de confirmación.");
    }

    const closeModalFunc = () => modal.remove();

    cancelButton.addEventListener('click', closeModalFunc);
    confirmButton.addEventListener('click', () => {
        onConfirm();
        closeModalFunc();
    });

    document.body.appendChild(modal);
}


// --- ¡NUEVA FUNCIÓN AÑADIDA! (Movida desde ProductsView.js) ---

/**
 * Abre el modal de creación o edición de productos.
 * @param {object | null} productToEdit - El producto a editar, o null para crear uno nuevo.
 * @returns {Promise<boolean>} - Devuelve una promesa que se resuelve (true) si el modal
 * se cerró (para indicar que la tabla debe refrescarse).
 */
export function openProductModal(productToEdit = null) {
    // Retornamos una promesa para que la vista sepa cuándo se cerró el modal
    return new Promise((resolve) => {
        Logger.trace('[modal.service] openProductModal iniciado. Modo Edición:', !!productToEdit);
        
        const isEditMode = productToEdit !== null;
        const modalTitle = isEditMode 
            ? `<i class="bi bi-pencil-fill me-2"></i> Editar Producto`
            : '<i class="bi bi-plus-circle-fill me-2"></i> Añadir Nuevo Producto';
        const modalId = isEditMode ? 'edit-product-modal' : 'add-product-modal';

        // 1. Crear un 'div' placeholder. ProductForm es complejo y se autoconstruye.
        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando formulario...';

        // 2. Crear el cascarón del Modal
        const productModalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: modalId
        });

        // 3. Inicializar el ProductForm
        // ProductForm tomará control del modalElementRef que le pasamos
        const formElement = ProductForm(productToEdit, productModalElement);

        // 4. Inyectar el formulario en el cuerpo del modal
        const modalBodyContainer = productModalElement.querySelector('#modal-body-container');
        if (!modalBodyContainer) {
            Logger.error('[modal.service] ¡Error Crítico! No se encontró #modal-body-container.');
            productModalElement?.remove();
            resolve(false); // Resuelve la promesa con 'false' (sin éxito)
            return;
        }
        modalBodyContainer.innerHTML = '';
        modalBodyContainer.appendChild(formElement);

        // 5. Añadir el modal completo al body
        document.body.appendChild(productModalElement);

        // 6. Enfocar el primer input
        const firstInput = formElement.querySelector('input, select');
        if (firstInput) {
            firstInput.focus();
        }
        
        // 7. Resolver la promesa cuando el modal se cierre
        // Sobrescribimos la función 'remove' que 'Modal.js' nos da
        const originalRemove = productModalElement.remove;
        productModalElement.remove = function() {
            Logger.trace('[modal.service] Modal de producto cerrado. Resolviendo promesa.');
            originalRemove.call(this);
            resolve(true); // Resuelve 'true' para indicar que la tabla debe refrescarse
        };
    });
}