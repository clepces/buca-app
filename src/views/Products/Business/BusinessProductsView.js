// ======================================================
// ARCHIVO: src/views/Products/Business/BusinessProductsView.js
// PROPÓSITO: Vista de gestión de productos para el negocio.
// VERSIÓN: 2.0 (Refactorizada con useListController y ViewHeader)
// ======================================================

import { deleteProduct } from '../../../../store/actions.js';
import { showConfirmationModal, openProductModal } from '../../../../services/modal.service.js';
import { Logger } from '../../../../services/logger.service.js';
import { state as globalState } from '../../../../store/state.js';
import { can } from '../../../../services/permissions.service.js';
import { PERMISSIONS } from '../../../../services/roles.config.js';
import { EmptyState } from '../../../../components/Common/EmptyState.js';
import { PaginationControls } from '../../../../components/Common/PaginationControls.js';
import { ViewHeader } from '../../../../components/Common/ViewHeader.js';
import { showToast } from '../../../../services/toast.service.js';
import { renderProductCards } from './cards/ProductCards.js';
import { initTippy, destroyTippy } from '../../../../utils/tippy-helper.js';
import { useListController } from '../../../../utils/useListController.js';

export function BusinessProductsView(element, state) {
    
    // --- 1. CONFIGURACIÓN E INICIALIZACIÓN DEL CONTROLADOR ---
    const listController = useListController({
        itemsPerPage: 8,
        searchKeys: ['name', 'brand', 'categoryId'] // Campos donde buscará el filtro
    });
    
    // Cargar datos iniciales del estado global
    listController.setData(globalState.products);

    // --- 2. FUNCIONES DE UTILIDAD Y RENDERIZADO ---
    
    // Carga de estilos específicos para las tarjetas de producto
    const loadCSS = () => {
        const viewCSS = 'src/styles/views/inventory/products/product-view.css';
        if (!document.querySelector(`link[href="${viewCSS}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = viewCSS;
            document.head.appendChild(link);
        }
    };

    // Actualiza la cuadrícula de productos y la paginación
    const updateGrid = () => {
        const container = element.querySelector(".product-list-container");
        const paginationContainer = element.querySelector("#product-pagination-container");
        const titleCounter = element.querySelector("#view-title-counter");
        
        if (!container) return;

        // 1. Obtener datos procesados (filtrados y paginados)
        const productsToShow = listController.paginatedData;
        
        // 2. Renderizar tarjetas o estado vacío
        if (productsToShow.length > 0) {
            container.innerHTML = renderProductCards(productsToShow, globalState.settings);
        } else if (listController.searchTerm) {
            container.innerHTML = EmptyState({
                icon: 'bi-search',
                message: 'No se encontraron productos',
                instructions: 'Intenta con otro término de búsqueda.'
            });
        } else {
            container.innerHTML = EmptyState({
                icon: 'bi-box-seam',
                message: 'Aún no has añadido ningún producto.',
                instructions: 'Haz clic en "Añadir Producto" para empezar.'
            });
        }

        // 3. Renderizar Paginación
        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationControls({
                currentPage: listController.currentPage,
                totalPages: listController.totalPages,
                totalItems: listController.totalItems,
                itemsPerPage: listController.itemsPerPage
            });
            paginationContainer.style.display = listController.totalItems > 0 ? 'flex' : 'none';
        }

        // 4. Actualizar contador del header (si existe)
        if (titleCounter) {
            titleCounter.textContent = listController.totalItems;
        }

        // Reinicializar tooltips para los nuevos elementos
        initTippy(container);
    };

    // Renderizado de la estructura principal (Layout)
    const render = () => {
        const canCreate = can(PERMISSIONS.CREATE_PRODUCT);
        
        // Generar Header estandarizado
        const headerHTML = ViewHeader({
            title: 'Inventario',
            subtitle: `Gestión de catálogo`,
            icon: 'bi-boxes',
            actions: canCreate ? [
                { label: 'Filtros', action: 'filter-products', icon: 'bi-filter', variant: 'secondary' },
                { label: 'Añadir Producto', action: 'add-product', icon: 'bi-plus-circle-fill' }
            ] : []
        });

        // Inyectar HTML con marcadores de posición para el título
        element.innerHTML = `
            <div class="view-panel-content">
                ${headerHTML}
                
                <style> .view-title { display: flex; align-items: center; } </style>
                <script>
                    document.querySelector('.view-title').insertAdjacentHTML('beforeend', 
                    '<span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">0</span>');
                </script>

                <div class="product-list-container mb-4 pb-4">
                    </div>
                
                <div class="pagination-container" id="product-pagination-container" style="display: none;">
                    </div>
            </div>
        `;
        
        // Conectar evento de búsqueda del input generado por ViewHeader
        const searchInput = element.querySelector('#view-search-input');
        if (searchInput) {
            searchInput.placeholder = "Buscar por nombre, marca...";
            searchInput.value = listController.searchTerm;
            searchInput.addEventListener('input', (e) => {
                listController.setSearch(e.target.value);
                updateGrid();
            });
        }
    };

    // --- 3. MANEJADORES DE EVENTOS (ACTIONS) ---
    const handleActions = async (e) => {
        const target = e.target;
        
        // -- Paginación --
        if (target.closest('.btn-page')) {
            listController.setPage(parseInt(target.closest('.btn-page').dataset.page));
            updateGrid();
            return;
        }
        if (target.closest('#btn-next-page') && listController.currentPage < listController.totalPages) {
            listController.setPage(listController.currentPage + 1);
            updateGrid();
            return;
        }
        if (target.closest('#btn-prev-page') && listController.currentPage > 1) {
            listController.setPage(listController.currentPage - 1);
            updateGrid();
            return;
        }
        
        // -- Items por página --
        if (target.id === 'items-per-page') {
            listController.setItemsPerPage(parseInt(target.value));
            updateGrid();
            return;
        }

        // -- Botones de Acción --
        const btn = target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const card = btn.closest('.product-card');
        const productId = card?.dataset.productId;

        // 1. Añadir Producto
        if (action === 'add-product') {
            const modalClosed = await openProductModal(null);
            if (modalClosed) {
                listController.setData(globalState.products); // Recargar datos frescos
                updateGrid();
            }
            return;
        }

        // 2. Expandir Imagen
        if (action === 'expand-image') {
            e.stopPropagation();
            showToast('Función "Ampliar Imagen" (Próximamente)', 'info');
            return;
        }
        
        // 3. Toggle Menú de Tarjeta
        if (action === 'menu-toggle') {
            e.stopPropagation();
            card.classList.toggle('menu-open');
            // Cerrar otros menús abiertos
            document.querySelectorAll('.product-card.menu-open').forEach(otherCard => {
                if (otherCard !== card) otherCard.classList.remove('menu-open');
            });
            return;
        }

        // Validar que haya ID para las siguientes acciones
        if (!productId) return;

        // 4. Editar Producto
        if (action === 'editar') {
            e.stopPropagation(); // Evitar disparar otros eventos de la tarjeta
            if (can(PERMISSIONS.EDIT_PRODUCT)) {
                const product = globalState.products.find(p => p.id === productId);
                if (product) {
                    const modalClosed = await openProductModal(product);
                    if (modalClosed) {
                        listController.setData(globalState.products);
                        updateGrid();
                    }
                } else { 
                    Logger.error(`Producto ${productId} no encontrado.`); 
                }
            } else { 
                Logger.warn(`Sin permiso para editar.`); 
            }
        }

        // 5. Eliminar Producto
        if (action === 'eliminar') {
            e.stopPropagation();
            if (can(PERMISSIONS.DELETE_PRODUCT)) {
                // CORRECCIÓN: Usamos 'productToDelete' consistentemente
                const productToDelete = globalState.products.find(p => p.id === productId);
                if (productToDelete) {
                    showConfirmationModal(
                        'Confirmar Eliminación',
                        `¿Estás seguro de que deseas eliminar <strong>${productToDelete.name}</strong>?`,
                        async () => {
                            Logger.trace(`[BusinessProductsView] Eliminando ${productId}`);
                            await deleteProduct(globalState, productId);
                            listController.setData(globalState.products); // Actualizar lista local
                            updateGrid();
                        },
                        { 
                            icon: 'bi bi-trash3-fill text-danger', 
                            confirmText: 'Sí, eliminar', 
                            confirmButtonClass: 'btn-danger' 
                        }
                    );
                } else { Logger.error(`Producto no encontrado.`); }
            } else { Logger.warn(`Sin permiso para eliminar.`); }
        }

        // 6. Abastecer (Placeholder)
        if (action === 'abastecer') {
            e.stopPropagation();
             Logger.info(`Acción 'abastecer' para ${productId}`);
             showToast('Función "Abastecer" (Próximamente)', 'info');
        }

        // 7. Toggle Moneda (Visualización)
        if (action === 'toggle-currency') {
            e.stopPropagation();
            const priceStats = card.querySelectorAll('.product-stat.price .stat-value[data-currency]');
            priceStats.forEach(statValue => {
                const current = statValue.dataset.currency;
                // Intercambia entre 'principal' y 'base'
                statValue.textContent = statValue.dataset[current === 'principal' ? 'baseVal' : 'principalVal'];
                statValue.dataset.currency = (current === 'principal' ? 'base' : 'principal');
            });
        }
    };

    // --- 4. CIERRE DE MENÚS AL HACER CLIC FUERA ---
    const closeAllMenus = (e) => {
        if (!e.target.closest('.product-actions-menu')) {
            document.querySelectorAll('.product-card.menu-open').forEach(c => c.classList.remove('menu-open'));
        }
    };

    // --- 5. INICIALIZACIÓN Y LIMPIEZA ---
    loadCSS();
    render();
    updateGrid();

    element.addEventListener('click', handleActions);
    document.addEventListener('click', closeAllMenus);

    return () => {
        Logger.info('Limpiando BusinessProductsView...');
        destroyTippy(element);
        element.removeEventListener('click', handleActions);
        document.removeEventListener('click', closeAllMenus);
    };
}