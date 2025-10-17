import { ProductForm } from '../components/ProductForm.js';
import { ProductTable } from '../components/ProductTable.js';
import { deleteProduct } from '../store/actions.js';
import { Modal } from '../components/Modal.js';
import { showConfirmationModal } from '../services/modal.service.js';
import { Logger } from '../services/logger.service.js';

export function ProductsView(element, state) {
    const render = () => {
        const formElement = ProductForm(state);
        const tableHTML = ProductTable(state.products, state.settings);
        element.innerHTML = `
            <h2 class="view-title"><i class="fas fa-box"></i> Productos</h2>
            <div class="products-layout">
                <div id="form-container"></div>
                <div class="product-list-container">${tableHTML}</div>
            </div>
        `;
        element.querySelector('#form-container').appendChild(formElement);
    };

    const handleViewClick = async (e) => {
        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;

        const action = actionElement.dataset.action;
        const productId = actionElement.closest('[data-product-id]')?.dataset.productId;

        if (action === 'editar' && productId) {
            const productToEdit = state.products.find(p => p.id === productId);
            if (productToEdit) {
                const form = ProductForm(state, productToEdit);
                const editModal = Modal({
                    title: `<i class="fas fa-edit"></i> Editar Producto: ${productToEdit.product_info.product_name}`,
                    contentElement: form,
                    id: 'edit-product-modal'
                });
                document.body.appendChild(editModal);
            }
        }
        
        if (action === 'eliminar' && productId) {
            const productToDelete = state.products.find(p => p.id === productId);
            if (productToDelete) {
                showConfirmationModal(
                    'Eliminar Producto',
                    `¿Estás seguro de que quieres eliminar "<strong>${productToDelete.product_info.product_name}</strong>"? Esta acción no se puede deshacer.`,
                    async () => {
                        await deleteProduct(state, productId);
                    }
                );
            }
        }
    };

    render();
    element.addEventListener('click', handleViewClick);

    return () => {
        Logger.info('Limpiando ProductsView...'); // Ahora sí funcionará
        element.removeEventListener('click', handleViewClick);
    };
}