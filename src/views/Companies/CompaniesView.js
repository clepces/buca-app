// ======================================================
// ARCHIVO: src/views/Companies/CompaniesView.js
// VERSIÓN 3.1: CORREGIDO (Error 'toLowerCase' de 'name')
// CORRECCIÓN: La carga de datos ahora lee 'b.name' (para
//             nuevos negocios) o 'b.info.name' (para la
//             plantilla 'business_mega_center').
// ======================================================

import { StatCard } from '../../components/Common/StatCard.js';
import { CompaniesTable } from '../../components/Companies/CompaniesTable.js';
import { PaginationControls } from '../../components/Common/PaginationControls.js';
import { EmptyState } from '../../components/Common/EmptyState.js';
import { Logger } from '../../services/logger.service.js';
import { state as globalState } from '../../store/state.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';
import { debounce } from '../../utils/debounce.js';
import { paginate, getTotalPages } from '../../services/pagination.service.js';
import { initTippy, destroyTippy } from '../../utils/tippy-helper.js';
import { openCompanyModal } from '../../services/modal.service.js';
import { loadAllBusinesses } from '../../services/storage.service.js'; 

export function CompaniesView(element, state) {
    const canCreate = can(PERMISSIONS.CREATE_COMPANY);

    const viewState = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        searchTerm: '',
        selectedCompanies: new Set(),
        companies: [], 
        stats: { 
            total: 0,
            active: 0,
            inactive: 0,
            locations: 0 
        }
    };
    
    let paginatedCompanies = [];
    let filteredCompanies = [];

    const applyFilters = () => {
        // Filtramos la data real en 'viewState.companies'
        filteredCompanies = viewState.companies.filter(c => 
            // Esta línea ya no fallará
            c.name.toLowerCase().includes(viewState.searchTerm)
        );
        viewState.totalItems = filteredCompanies.length;
    };
    
    const applyPagination = () => {
        paginatedCompanies = paginate(
            filteredCompanies, 
            viewState.currentPage, 
            viewState.itemsPerPage
        );
    };

    const isAllVisibleSelected = () => {
        if (paginatedCompanies.length === 0) return false;
        return paginatedCompanies.every(c => viewState.selectedCompanies.has(c.id));
    };

    const updateTableAndPagination = () => {
        Logger.trace('[CompaniesView] Actualizando solo tabla y paginación...');
        applyFilters();
        applyPagination();
        
        const totalPages = getTotalPages(viewState.totalItems, viewState.itemsPerPage);

        const tableContainer = element.querySelector("#companies-table-container");
        if (tableContainer) {
            tableContainer.innerHTML = CompaniesTable({ 
                companies: paginatedCompanies,
                selectedIds: viewState.selectedCompanies,
                isAllSelected: isAllVisibleSelected()
            });
        }

        const paginationContainer = element.querySelector("#companies-pagination-container");
        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationControls({
                currentPage: viewState.currentPage,
                totalPages: totalPages,
                totalItems: viewState.totalItems,
                itemsPerPage: viewState.itemsPerPage
            });
            paginationContainer.style.display = viewState.totalItems > 0 ? 'flex' : 'none';
        }
        
        const titleCounter = element.querySelector("#view-title-counter");
        if (titleCounter) {
            titleCounter.textContent = viewState.totalItems;
        }
    };
    
    const updateStatCards = () => {
        const totalEl = element.querySelector('#stat-total-companies');
        const activeEl = element.querySelector('#stat-active-companies');
        const inactiveEl = element.querySelector('#stat-inactive-companies');

        if (totalEl) totalEl.querySelector('.stat-card-value').textContent = viewState.stats.total;
        if (activeEl) activeEl.querySelector('.stat-card-value').textContent = viewState.stats.active;
        if (inactiveEl) inactiveEl.querySelector('.stat-card-value').textContent = viewState.stats.inactive;
    };

    const renderLayout = () => {
        // Renderiza el esqueleto con placeholders
        element.innerHTML = `
        <div class="view-panel-content">
            <div class="view-header align-items-center mb-4">
                <div>
                    <h2 class="view-title mb-1">
                        <i class="bi bi-building me-2"></i> 
                        Companies 
                        <span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">0</span>
                    </h2>
                    <p class="text-muted mb-0">Administra todas las compañías en la plataforma.</p>
                </div>
                <div class="ms-auto d-flex gap-2">
                    <button class="btn-icon btn-danger" data-action="export-pdf" data-tippy-content="Exportar a PDF" disabled>
                        <i class="bi bi-file-earmark-pdf-fill"></i>
                    </button>
                    <button class="btn-icon btn-success" data-action="export-excel" data-tippy-content="Exportar a Excel" disabled>
                        <i class="bi bi-file-earmark-excel-fill"></i>
                    </button>
                    <button class="btn-icon btn-info" data-action="refresh-data" data-tippy-content="Actualizar Datos">
                        <i class="bi bi-arrow-clockwise"></i>
                    </button>
                    ${canCreate ? `
                    <button id="btn-add-company" class="btn-primary" data-action="add-company" data-tippy-content="Añadir nueva compañía">
                        <i class="bi bi-plus-circle-fill me-1"></i> Add Company
                    </button>` : ''}
                </div>
            </div>

            <div class="panel-grid mb-4">
                ${StatCard({ 
                    id: 'stat-total-companies', 
                    title: 'Total Companies', 
                    value: '...', 
                    icon: 'bi-building', 
                    className: 'stat-card-total-companies', 
                    miniGraph: true 
                })}
                ${StatCard({ 
                    id: 'stat-active-companies', 
                    title: 'Active Companies', 
                    value: '...', 
                    icon: 'bi-building-check', 
                    className: 'stat-card-active-companies', 
                    miniGraph: true 
                })}
                ${StatCard({ 
                    id: 'stat-inactive-companies', 
                    title: 'Inactive Companies', 
                    value: '...', 
                    icon: 'bi-building-dash', 
                    className: 'stat-card-inactive-companies', 
                    miniGraph: true 
                })}
                ${StatCard({ 
                    id: 'stat-location', 
                    title: 'Company Location', 
                    value: '...', 
                    icon: 'bi-geo-alt-fill', 
                    className: 'stat-card-location', 
                    miniGraph: true 
                })}
            </div>

            <div class="table-container-wrapper mt-4">
                <div class="table-filters">
                    <div class="search-container">
                        <i class="bi bi-search search-icon"></i>
                        <input type="search" id="search-companies" class="form-control" placeholder="Buscar por nombre..." value="${viewState.searchTerm}">
                    </div>
                </div>

                <div id="companies-table-container">
                    ${EmptyState({ icon: 'bi-hourglass-split', message: 'Cargando compañías...' })}
                </div>
                <div class="pagination-container" id="companies-pagination-container">
                </div>
            </div>
        </div>
        `;
        
        setTimeout(() => {
            initTippy(element);
        }, 100);
    };
    
    // --- ¡FUNCIÓN ASÍNCRONA CORREGIDA! ---
    async function loadDataAndRender() {
        try {
            const businesses = await loadAllBusinesses();
            
            // Mapeamos los datos reales
            viewState.companies = businesses.map(b => ({
                id: b.id,
                // --- ¡INICIO DE CORRECCIÓN! ---
                name: b.name || b.info?.name || 'Nombre no encontrado', // <-- Lee b.name O b.info.name
                // --- FIN DE CORRECCIÓN! ---
                planId: b.planId || b.info?.plan || 'plan_basic', // <-- Hacemos lo mismo para plan
                status: b.status || b.info?.subscriptionStatus || 'active', // <-- Y para status
                createdAt: b.createdAt 
            }));
            
            // Calculamos stats reales
            viewState.stats.total = businesses.length;
            viewState.stats.active = businesses.filter(b => (b.status || b.info?.subscriptionStatus) === 'active').length;
            viewState.stats.inactive = viewState.stats.total - viewState.stats.active;
            // viewState.stats.locations = ... (lógica futura)

            // Actualizamos la UI
            updateStatCards();
            updateTableAndPagination();

        } catch (error) {
            Logger.error('Error cargando la data de CompaniesView:', error);
            element.querySelector("#companies-table-container").innerHTML = EmptyState({
                icon: 'bi-wifi-off',
                message: 'Error al cargar compañías'
            });
        }
    }
    
    const debouncedSearchHandler = debounce(() => {
        updateTableAndPagination(); 
    }, 300);

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
            updateTableAndPagination(); 
        }
    };

    const handleItemsPerPageChange = (e) => {
        if (e.target.id === 'items-per-page') {
            viewState.itemsPerPage = parseInt(e.target.value, 10);
            viewState.currentPage = 1;
            updateTableAndPagination();
        }
    };

    const handleSearch = (e) => {
        if (e.target.id === 'search-companies') {
            viewState.searchTerm = e.target.value.toLowerCase();
            viewState.currentPage = 1;
            debouncedSearchHandler(); 
        }
    };

    const handleSelection = (e) => {
        // ... (código de selección sin cambios) ...
        const target = e.target;
        const action = target.dataset.action;
        let needsUpdate = false;

        if (action === 'select-all') {
            const isChecked = target.checked;
            if (isChecked) {
                paginatedCompanies.forEach(c => viewState.selectedCompanies.add(c.id));
            } else {
                paginatedCompanies.forEach(c => viewState.selectedCompanies.delete(c.id));
            }
            needsUpdate = true;
        }

        if (action === 'select-one') {
            const companyId = target.dataset.companyId;
            if (target.checked) {
                viewState.selectedCompanies.add(companyId);
            } else {
                viewState.selectedCompanies.delete(companyId);
            }
            needsUpdate = true;
        }

        if (needsUpdate) {
            updateTableAndPagination(); 
        }
    };

    const handleActions = async (e) => {
        const actionButton = e.target.closest('[data-action]');
        if (!actionButton) return;
        const action = actionButton.dataset.action;
        const companyId = actionButton.closest('[data-company-id]')?.dataset.companyId;

        if (action === 'select-all' || action === 'select-one') {
            handleSelection(e);
            return;
        }

        if (action === 'add-company') {
            Logger.info('Abriendo modal para añadir compañía...');
            const modalClosed = await openCompanyModal(); 
            if (modalClosed) {
                Logger.info('Modal de compañía cerrado, refrescando tabla...');
                loadDataAndRender(); // <-- Recargamos los datos reales
            }
            return;
        }

        if (action === 'refresh-data') { 
            Logger.info('Refrescando datos de compañías...');
            showToast('Actualizando lista de compañías...', 'info');
            loadDataAndRender();
        }
        
        if (action === 'view-company') { Logger.info(`Abrir modal para VER compañía: ${companyId}`); }
        if (action === 'edit-company') { Logger.info(`Abrir modal para EDITAR compañía: ${companyId}`); }
        if (action === 'delete-company') { Logger.info(`Abrir modal para ELIMINAR compañía: ${companyId}`); }
        if (action === 'manage-columns') { Logger.info('Abrir modal "Manage Columns" (Próximamente)...'); }
    };
    
    // --- ¡INICIALIZACIÓN DE LA VISTA! ---
    renderLayout(); // 1. Dibuja el esqueleto
    loadDataAndRender(); // 2. Pide los datos y llena la tabla/stats
    
    element.addEventListener('click', handleActions);
    element.addEventListener('click', handlePagination);
    element.addEventListener('input', handleSearch);
    element.addEventListener('change', handleItemsPerPageChange);

    return () => {
        Logger.info('Limpiando CompaniesView y sus listeners...');
        destroyTippy(element);
        element.removeEventListener('click', handleActions);
        element.removeEventListener('click', handlePagination);
        element.removeEventListener('input', handleSearch);
        element.removeEventListener('change', handleItemsPerPageChange);
    };
}