// src/views/ProductsView.js

import { ProductForm } from '../../../components/ProductForm.js';
import { ProductTable } from '../../../components/ProductTable.js';
import { deleteProduct, triggerRerender } from '../../../store/actions.js';
import { Modal } from '../../../components/Modal.js';
import { showConfirmationModal } from '../../../services/modal.service.js';
import { Logger } from '../../../services/logger.service.js';
import { state as globalState } from '../../../store/state.js';
import { can } from '../../../services/permissions.service.js';
import { PERMISSIONS } from '../../../services/roles.config.js';
import { handleError } from '../../../services/error.service.js';

export function ProductsView(element, state) {

    const renderMainContent = () => {
        Logger.trace('[ProductsView] renderMainContent ejecutado.'); // <-- Log de Depuración A
        const tableHTML = ProductTable(globalState.products, globalState.settings);
        const canCreate = can(PERMISSIONS.CREATE_PRODUCT);
        element.innerHTML = `
            <div class="view-header">
                <h2 class="view-title"><i class="bi bi-box-seam me-2"></i> Productos</h2>
                ${canCreate ? `
                <button id="btn-add-product" class="btn-primary" data-action="add-product">
                    <i class="bi bi-plus-circle-fill me-1"></i> Añadir Producto
                </button>` : ''}
            </div>
            <div class="product-list-container">${tableHTML}</div>
        `;
    };

    const openProductModal = (productToEdit = null) => {
        Logger.trace('[ProductsView] openProductModal iniciado. Modo Edición:', !!productToEdit); // <-- Log de Depuración B
        const isEditMode = productToEdit !== null;
        const modalTitle = isEditMode ? `<i class="bi bi-pencil-fill me-2"></i> Editar Producto: ${productToEdit.name || 'N/A'}` : '<i class="bi bi-plus-circle-fill me-2"></i> Añadir Nuevo Producto';
        const modalId = isEditMode ? 'edit-product-modal' : 'add-product-modal';

        const dummyContent = document.createElement('div');
        dummyContent.textContent = 'Cargando formulario...'; // Mensaje placeholder
        const productModalElement = Modal({
            title: modalTitle,
            contentElement: dummyContent,
            id: modalId
        });

        Logger.trace('[ProductsView] Elemento Modal creado:', productModalElement); // <-- Log de Depuración C

        const formElement = ProductForm(productToEdit, productModalElement);

        Logger.trace('[ProductsView] Elemento Formulario creado:', formElement); // <-- Log de Depuración D

        const modalBodyContainer = productModalElement.querySelector('#modal-body-container');

        // Depuración: Verificar si modalBodyContainer existe
        console.log('[ProductsView] Verificando modalBodyContainer:', modalBodyContainer); // <-- Log de Depuración E

        if (!modalBodyContainer) {
            Logger.error('[ProductsView] ¡Error Crítico! No se encontró #modal-body-container.');
            console.error('[ProductsView] productModalElement:', productModalElement); // <-- Log de Depuración F (Error)
            handleError(new Error("Fallo al encontrar el cuerpo del modal."), "ProductsView.js:openProductModal");
            // Intentar remover el modal si se creó parcialmente
            productModalElement?.remove();
            return;
        }
        modalBodyContainer.innerHTML = '';
        modalBodyContainer.appendChild(formElement);

        // Depuración: Log antes de añadir modal al body
        Logger.trace('[ProductsView] Añadiendo modal completo al body.'); // <-- Log de Depuración G

        document.body.appendChild(productModalElement);

        const firstInput = formElement.querySelector('input, select');
        if (firstInput) {
            // Depuración: Log antes de enfocar
            Logger.trace('[ProductsView] Enfocando primer input:', firstInput); // <-- Log de Depuración H
            firstInput.focus();
        } else {
            Logger.warn("[ProductsView] No se encontró input/select para enfocar.");
        }
        Logger.trace('[ProductsView] openProductModal finalizado.'); // <-- Log de Depuración I
    };

    const handleViewClick = async (e) => {
        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;
        const action = actionElement.dataset.action;
        const productId = actionElement.closest('[data-product-id]')?.dataset.productId;

        Logger.trace(`[ProductsView] Clic detectado. Acción: ${action}, ID Producto: ${productId}`); // <-- Log de Depuración J

        if (action === 'add-product') {
             if (can(PERMISSIONS.CREATE_PRODUCT)) { openProductModal(); }
             else { Logger.warn("Intento de añadir producto sin permiso."); }
        }
        if (action === 'editar' && productId) {
             if (can(PERMISSIONS.EDIT_PRODUCT)) {
                 const productToEdit = globalState.products.find(p => p.id === productId);
                 if (productToEdit) { openProductModal(productToEdit); }
                 else { Logger.error(`Producto ${productId} no encontrado para editar.`); }
             } else { Logger.warn(`Intento de editar ${productId} sin permiso.`); }
        }
        if (action === 'eliminar' && productId) {
            if (can(PERMISSIONS.DELETE_PRODUCT)) {
                 const productToDelete = globalState.products.find(p => p.id === productId);
                 if (productToDelete) {
                    // --- INICIO MODIFICACIÓN: Llamada a showConfirmationModal mejorada ---
                     const productName = productToDelete.name || 'este producto'; // Nombre o texto genérico
                     showConfirmationModal(
                         'Confirmar Eliminación', // Título
                         `¿Estás seguro de que deseas eliminar el producto <strong>${productName}</strong>? <br><small>Esta acción no se puede deshacer.</small>`, // Mensaje HTML
                         async () => { // Callback onConfirm
                             Logger.trace(`[ProductsView] Confirmada eliminación de ${productId}`);
                             // NOTA: Asumiendo que deleteProduct ahora recibe solo el ID
                             // Si deleteProduct necesita el state, pásalo: await deleteProduct(globalState, productId);
                             await deleteProduct(productId); // Asegúrate que deleteProduct esté bien importado y funcione así
                             triggerRerender(); // Actualiza la tabla
                         },
                         { // Opciones de personalización
                            icon: 'bi bi-trash3-fill text-danger', // Icono de papelera rojo
                            confirmText: 'Sí, eliminar',
                            cancelText: 'No, cancelar',
                            confirmButtonClass: 'btn-danger', // Botón rojo
                            cancelButtonClass: 'btn-secondary', // Botón gris
                            confirmIcon: 'bi bi-check-lg',
                            cancelIcon: 'bi bi-x-lg',
                            modalId: 'delete-product-confirmation-modal' // ID específico
                         }
                     );
                     // --- FIN MODIFICACIÓN ---
                 } else { Logger.error(`Producto ${productId} no encontrado para eliminar.`); }
             } else { Logger.warn(`Intento de eliminar ${productId} sin permiso.`); }
        }
        if (action === 'abastecer' && productId) {
             Logger.info(`Acción 'abastecer' para ${productId} (Pendiente)`);
        }
    };

    renderMainContent();
    element.addEventListener('click', handleViewClick);

    const handleModalClose = (event) => {
        Logger.trace('[ProductsView] Evento modal-closed recibido:', event.detail); // <-- Log de Depuración L
        renderMainContent();
    };
    // Asumiendo que Modal emite 'modal-closed' (necesitaría ajuste en Modal.js)
    // document.body.addEventListener('modal-closed', handleModalClose);

    // Alternativa: Usar MutationObserver para detectar cuándo se quita el modal
    const observer = new MutationObserver((mutationsList) => {
        for(let mutation of mutationsList) {
            if (mutation.removedNodes) {
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === 1 && (node.id === 'add-product-modal' || node.id === 'edit-product-modal')) {
                        Logger.trace('[ProductsView] Modal removido detectado por MutationObserver. Re-renderizando tabla.'); // <-- Log de Depuración M
                        renderMainContent();
                    }
                });
            }
        }
    });
    observer.observe(document.body, { childList: true, subtree: false });


    return () => {
        Logger.info('Limpiando ProductsView...'); // <-- Log de Depuración N
        element.removeEventListener('click', handleViewClick);
        // document.body.removeEventListener('modal-closed', handleModalClose);
        observer.disconnect(); // Detener el observer
    };
}