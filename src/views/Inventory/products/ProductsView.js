// ======================================================
// ARCHIVO: src/views/Inventory/products/ProductsView.js
// VERSIÓN CORREGIDA: Separa 'change' de 'click'
// ======================================================

import { deleteProduct } from '../../../store/actions.js';
import { showConfirmationModal, openProductModal } from '../../../services/modal.service.js';
import { Logger } from '../../../services/logger.service.js';
import { state as globalState } from '../../../store/state.js';
import { can } from '../../../services/permissions.service.js';
import { PERMISSIONS } from '../../../services/roles.config.js';
import { EmptyState } from '../../../components/EmptyState.js';
import { showToast } from '../../../services/toast.service.js';
import { PaginationControls } from '../../../components/PaginationControls.js';
import { paginate, getTotalPages } from '../../../services/pagination.service.js';
import { debounce } from '../../../utils/debounce.js';

// --- ¡IMPORTACIÓN ACTUALIZADA! ---
import { renderProductCards } from './cards/ProductCards.js';


export function ProductsView(element, state) {
    
    // --- ESTADO LOCAL DE LA VISTA (PARA PAGINACIÓN Y BÚSQUEDA) ---
    const viewState = {
        currentPage: 1,
        itemsPerPage: 8, // Default
        totalItems: 0,
        searchTerm: '',
    };
    
    let paginatedProducts = [];
    let filteredProducts = [];

    // --- LÓGICA DE FILTRADO Y PAGINACIÓN ---
    const applyFilters = () => {
        const term = viewState.searchTerm.toLowerCase();
        filteredProducts = globalState.products.filter(p => 
            p.name.toLowerCase().includes(term) ||
            (p.brand && p.brand.toLowerCase().includes(term)) ||
            (p.categoryId && p.categoryId.toLowerCase().includes(term))
        );
        viewState.totalItems = filteredProducts.length;
    };
    
    const applyPagination = () => {
        paginatedProducts = paginate(
            filteredProducts, 
            viewState.currentPage, 
            viewState.itemsPerPage
        );
    };

    // --- RENDERIZADO INTELIGENTE (SOLO ACTUALIZA LO NECESARIO) ---
    const updateCardsAndPagination = () => {
        Logger.trace('[ProductsView] Actualizando tarjetas y paginación...');
        applyFilters();
        applyPagination();
        
        const totalPages = getTotalPages(viewState.totalItems, viewState.itemsPerPage);

        // 1. Actualizar las tarjetas
        const cardsContainer = element.querySelector(".product-list-container");
        
        if (cardsContainer) {

            // --- INICIO DE MODIFICACIÓN ---
            cardsContainer.classList.add('fade-out'); // 1. Ocultar
            
            // 2. Esperar que termine la animación
            setTimeout(() => { 
                if (paginatedProducts.length > 0) {
                    cardsContainer.innerHTML = renderProductCards(paginatedProducts, globalState.settings);
                } else if (viewState.searchTerm) {
                    cardsContainer.innerHTML = EmptyState({
                        icon: 'bi-search',
                        message: 'No se encontraron productos',
                        instructions: 'Intenta con un término de búsqueda diferente.'
                    });
                } else {
                    cardsContainer.innerHTML = EmptyState({
                        icon: 'bi-box-seam',
                        message: 'Aún no has añadido ningún producto.',
                        instructions: 'Haz clic en "Añadir Producto" para empezar.'
                    });
                }
                cardsContainer.classList.remove('fade-out'); // 3. Mostrar
            }, 150); // 150ms (coincide con la transición CSS)
            // --- FIN DE MODIFICACIÓN ---
            
        } else {
            Logger.error("[ProductsView] No se pudo encontrar '.product-list-container' para actualizar las tarjetas.");
        }

        // 2. Actualizar la paginación
        const paginationContainer = element.querySelector("#product-pagination-container");
        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationControls({
                currentPage: viewState.currentPage,
                totalPages: totalPages,
                totalItems: viewState.totalItems,
                itemsPerPage: viewState.itemsPerPage
            });
            paginationContainer.style.display = viewState.totalItems > 0 ? 'flex' : 'none';
        }
        
        // 3. Actualizar contador del título
        const titleCounter = element.querySelector("#view-title-counter");
        if (titleCounter) {
            titleCounter.textContent = viewState.totalItems;
        }
    };
    
    const debouncedSearchHandler = debounce(() => {
        updateCardsAndPagination();
    }, 300);

    const loadCSS = () => {
        const viewCSS = 'src/styles/views/inventory/products/product-view.css';
        if (!document.querySelector(`link[href="${viewCSS}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = viewCSS;
            document.head.appendChild(link);
        }
    };

    const renderMainContent = () => {
        Logger.trace('[ProductsView] renderMainContent ejecutado (Layout).');
        
        applyFilters(); 
        viewState.totalItems = filteredProducts.length; 
        const canCreate = can(PERMISSIONS.CREATE_PRODUCT);
        
        element.innerHTML = `
            <div class="view-panel-content">
                <div class="view-header">
                    <h2 class="view-title">
                        <i class="bi bi-boxes me-2"></i> 
                        Productos
                        <span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">
                            ${viewState.totalItems}
                        </span>
                    </h2>
                    <div class="view-header-actions">
                        <div class="search-container" style="min-width: 250px;">
                            <i class="bi bi-search search-icon"></i>
                            <input type="search" id="search-products" class="form-control" placeholder="Buscar por nombre, marca..." value="${viewState.searchTerm}">
                        </div>
                        
                        <button class="btn-secondary" data-action="filter-products" disabled>
                            <i class="bi bi-filter me-1"></i> Filtros
                        </button>
                        <button class="btn-secondary" data-action="export-products" disabled>
                            <i class="bi bi-download me-1"></i> Exportar
                        </button>

                        ${canCreate ? `
                        <button id="btn-add-product" class="btn-primary" data-action="add-product">
                            <i class="bi bi-plus-circle-fill me-1"></i> Añadir Producto
                        </button>` : ''}
                    </div>
                </div>
                
                <div class="product-list-container mb-4 pb-4">
                    ${EmptyState({ icon: 'bi-hourglass-split', message: 'Cargando productos...' })}
                </div>
                
                <div class="pagination-container" id="product-pagination-container" style="display: none;">
                </div>
            </div>
        `;
    };

    // --- MANEJADORES DE EVENTOS ---
    
    const handlePagination = (e) => {
        const target = e.target;
        let needsUpdate = false;

        const pageButton = target.closest('.btn-page');
        if (pageButton) {
            viewState.currentPage = parseInt(pageButton.dataset.page, 10);
            needsUpdate = true;
        }

        if (target.closest('#btn-next-page')) {
            const totalPages = getTotalPages(viewState.totalItems, viewState.itemsPerPage);
            if (viewState.currentPage < totalPages) {
                viewState.currentPage++;
                needsUpdate = true;
            }
        }

        if (target.closest('#btn-prev-page')) {
            if (viewState.currentPage > 1) {
                viewState.currentPage--;
                needsUpdate = true;
            }
        }

        if (needsUpdate) {
            updateCardsAndPagination();
        }
    };
    
    // --- ✅ NUEVO MANEJADOR PARA EL EVENTO 'CHANGE' ---
    const handleItemsPerPageChange = (e) => {
        if (e.target.id === 'items-per-page') {
            viewState.itemsPerPage = parseInt(e.target.value, 10);
            viewState.currentPage = 1; // Resetear a página 1
            updateCardsAndPagination(); // Actualizar la vista
        }
    };
    
    const handleSearch = (e) => {
        if (e.target.id === 'search-products') {
            viewState.searchTerm = e.target.value;
            viewState.currentPage = 1; 
            debouncedSearchHandler();
        }
    };

    const handleActions = async (e) => {
        const actionElement = e.target.closest('[data-action]');
        if (!actionElement) return;

        const action = actionElement.dataset.action;

        if (action === 'add-product') {
             if (can(PERMISSIONS.CREATE_PRODUCT)) {
                 const modalClosed = await openProductModal(null);
                 if (modalClosed) {
                     updateCardsAndPagination(); 
                 }
             }
             else { Logger.warn("Intento de añadir producto sin permiso."); }
             return;
        }

        const card = actionElement.closest('.product-card');
        const productId = card?.dataset.productId;

        if (action === 'menu-toggle') {
            e.stopPropagation();
            card.classList.toggle('menu-open');
            document.querySelectorAll('.product-card.menu-open').forEach(otherCard => {
                if (otherCard !== card) otherCard.classList.remove('menu-open');
            });
            return;
        }
        
        if (action === 'toggle-currency') {
            e.stopPropagation();
            const priceStats = card.querySelectorAll('.product-stat.price .stat-value[data-currency]');
            priceStats.forEach(statValue => {
                const current = statValue.dataset.currency;
                statValue.textContent = statValue.dataset[current === 'principal' ? 'baseVal' : 'principalVal'];
                statValue.dataset.currency = (current === 'principal' ? 'base' : 'principal');
            });
            return;
        }

        if (action === 'expand-image') {
            e.stopPropagation();
            Logger.info('Acción: Expandir Imagen (Próximamente)');
            showToast('Función "Ampliar Imagen" (Próximamente)', 'info');
            return;
        }

        if (!productId) return;

        if (action === 'editar') {
             if (can(PERMISSIONS.EDIT_PRODUCT)) {
                 const productToEdit = globalState.products.find(p => p.id === productId);
                 if (productToEdit) {
                     const modalClosed = await openProductModal(productToEdit);
                     if (modalClosed) {
                         updateCardsAndPagination(); 
                     }
                 }
                 else { Logger.error(`Producto ${productId} no encontrado para editar.`); }
             } else { Logger.warn(`Intento de editar ${productId} sin permiso.`); }
        }
        
        if (action === 'eliminar') {
            e.stopPropagation();
            if (can(PERMISSIONS.DELETE_PRODUCT)) {
                 const productToDelete = globalState.products.find(p => p.id === productId);
                 if (productToDelete) {
                     showConfirmationModal(
                         'Confirmar Eliminación',
                         `¿Estás seguro de que deseas eliminar <strong>${productToDelete.name}</strong>?`,
                         async () => {
                             Logger.trace(`[ProductsView] Confirmada eliminación de ${productId}`);
                             await deleteProduct(globalState, productId);
                             updateCardsAndPagination(); 
                         },
                         { icon: 'bi bi-trash3-fill text-danger', confirmText: 'Sí, eliminar', confirmButtonClass: 'btn-danger' }
                     );
                 } else { Logger.error(`Producto ${productId} no encontrado para eliminar.`); }
             } else { Logger.warn(`Intento de eliminar ${productId} sin permiso.`); }
        }
        
        if (action === 'abastecer') {
            e.stopPropagation();
             Logger.info(`Acción 'abastecer' para ${productId} (Pendiente)`);
             showToast('Función "Abastecer" (Próximamente)', 'info');
        }
    };

    // --- INICIALIZACIÓN ---
    loadCSS();
    renderMainContent(); 
    updateCardsAndPagination(); 

    // --- ✅ LISTENERS ACTUALIZADOS ---
    element.addEventListener('click', handleActions);
    element.addEventListener('click', handlePagination); // Solo para botones de pág.
    element.addEventListener('input', handleSearch); // Para búsqueda
    element.addEventListener('change', handleItemsPerPageChange); // Para el <select>

    const closeAllMenus = (e) => {
        if (!e.target.closest('.product-actions-menu')) {
            document.querySelectorAll('.product-card.menu-open').forEach(card => {
                card.classList.remove('menu-open');
            });
        }
    };
    document.addEventListener('click', closeAllMenus);


    // --- LIMPIEZA ---
    return () => {
        Logger.info('Limpiando ProductsView...');
        // --- ✅ LISTENERS ACTUALIZADOS ---
        element.removeEventListener('click', handleActions);
        element.removeEventListener('click', handlePagination);
        element.removeEventListener('input', handleSearch);
        element.removeEventListener('change', handleItemsPerPageChange);
        
        document.removeEventListener('click', closeAllMenus);
        // const link = document.querySelector('link[href="src/styles/views/inventory/products/product-view.css"]');
        // if (link) link.remove();
    };
}