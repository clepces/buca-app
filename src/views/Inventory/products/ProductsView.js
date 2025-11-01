// ======================================================
// ARCHIVO: src/views/Inventory/products/ProductsView.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: (Anotaciones AA-1, AA-3)
// 1. Se elimina la función local 'openProductModal'.
// 2. Se elimina el 'MutationObserver'.
// 3. Se importa y usa 'openProductModal' desde 'modal.service.js'.
// ======================================================

import { ProductTable } from '../../../components/ProductTable.js';
// --- ¡IMPORTACIONES ACTUALIZADAS! ---
import { deleteProduct, triggerRerender } from '../../../store/actions.js';
import { showConfirmationModal, openProductModal } from '../../../services/modal.service.js'; // <-- Importar 'openProductModal'
import { Logger } from '../../../services/logger.service.js';
import { state as globalState } from '../../../store/state.js';
import { can } from '../../../services/permissions.service.js';
import { PERMISSIONS } from '../../../services/roles.config.js';

export function ProductsView(element, state) {

    const renderMainContent = () => {
        Logger.trace('[ProductsView] renderMainContent ejecutado.');
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

    // --- ¡FUNCIÓN 'openProductModal' ELIMINADA DE AQUÍ! ---
    // (Ahora vive en modal.service.js)

    const handleViewClick = async (e) => {
        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;
        const action = actionElement.dataset.action;
        const productId = actionElement.closest('[data-product-id]')?.dataset.productId;

        Logger.trace(`[ProductsView] Clic detectado. Acción: ${action}, ID Producto: ${productId}`);

        if (action === 'add-product') {
             if (can(PERMISSIONS.CREATE_PRODUCT)) {
                 // --- ¡INICIO DE CORRECCIÓN! ---
                 // Usamos el servicio y esperamos a que se cierre
                 const modalClosed = await openProductModal(null);
                 if (modalClosed) {
                     // El formulario se cerró (probablemente guardó),
                     // así que forzamos un re-renderizado de la tabla.
                     renderMainContent();
                 }
                 // --- FIN DE CORRECCIÓN! ---
             }
             else { Logger.warn("Intento de añadir producto sin permiso."); }
        }
        
        if (action === 'editar' && productId) {
             if (can(PERMISSIONS.EDIT_PRODUCT)) {
                 const productToEdit = globalState.products.find(p => p.id === productId);
                 if (productToEdit) {
                     // --- ¡INICIO DE CORRECCIÓN! ---
                     // Usamos el servicio
                     const modalClosed = await openProductModal(productToEdit);
                     if (modalClosed) {
                         renderMainContent(); // Refrescar tabla al cerrar
                     }
                     // --- FIN DE CORRECCIÓN! ---
                 }
                 else { Logger.error(`Producto ${productId} no encontrado para editar.`); }
             } else { Logger.warn(`Intento de editar ${productId} sin permiso.`); }
        }
        
        if (action === 'eliminar' && productId) {
            if (can(PERMISSIONS.DELETE_PRODUCT)) {
                 const productToDelete = globalState.products.find(p => p.id === productId);
                 if (productToDelete) {
                     const productName = productToDelete.name || 'este producto';
                     showConfirmationModal(
                         'Confirmar Eliminación',
                         `¿Estás seguro de que deseas eliminar D <strong>${productName}</strong>? <br><small>Esta acción no se puede deshacer.</small>`,
                         async () => {
                             Logger.trace(`[ProductsView] Confirmada eliminación de ${productId}`);
                             await deleteProduct(globalState, productId);
                             // triggerRerender(); // 'deleteProduct' ya llama a triggerRerender
                             renderMainContent(); // Forzamos el re-renderizado local
                         },
                         {
                            icon: 'bi bi-trash3-fill text-danger',
                            confirmText: 'Sí, eliminar',
                            confirmButtonClass: 'btn-danger',
                            modalId: 'delete-product-confirmation-modal'
                         }
                     );
                 } else { Logger.error(`Producto ${productId} no encontrado para eliminar.`); }
             } else { Logger.warn(`Intento de eliminar ${productId} sin permiso.`); }
        }
        
        if (action === 'abastecer' && productId) {
             Logger.info(`Acción 'abastecer' para ${productId} (Pendiente)`);
        }
    };

    renderMainContent();
    element.addEventListener('click', handleViewClick);

    // --- ¡OBSERVER ELIMINADO! ---
    // Ya no necesitamos el 'MutationObserver' porque la promesa
    // de 'openProductModal' nos dice cuándo refrescar.

    return () => {
        Logger.info('Limpiando ProductsView...');
        element.removeEventListener('click', handleViewClick);
    };
}