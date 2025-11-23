// ======================================================
// ARCHIVO: src/views/Companies/CompaniesView.js
// VERSIÓN: 4.0 (Con Papelera de Reciclaje)
// ======================================================

import { StatCard } from '../../components/Common/StatCard.js';
import { CompaniesTable } from '../../components/Companies/CompaniesTable.js';
import { PaginationControls } from '../../components/Common/PaginationControls.js';
import { EmptyState } from '../../components/Common/EmptyState.js';
import { Logger } from '../../services/logger.service.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';
import { debounce } from '../../utils/debounce.js';
import { paginate, getTotalPages } from '../../services/pagination.service.js';
import { initTippy, destroyTippy } from '../../utils/tippy-helper.js';
import { openCompanyModal, showConfirmationModal } from '../../services/modal.service.js';
import { loadAllBusinesses } from '../../services/storage.service.js'; 
import { showToast } from '../../services/toast.service.js';
import { deleteBusiness, restoreBusiness } from '../../services/admin.service.js';

export function CompaniesView(element, state) {
    const canCreate = can(PERMISSIONS.CREATE_COMPANY);

    const viewState = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        searchTerm: '',
        filterStatus: 'active', // 'active' | 'deleted' (Nuevo estado de filtro)
        selectedCompanies: new Set(),
        allBusinesses: [], // Almacenamos todo aquí
        companiesToDisplay: [], // Lo que se muestra en tabla
        stats: { total: 0, active: 0, inactive: 0, deleted: 0 }
    };
    
    let paginatedCompanies = [];

    const applyFilters = () => {
        // 1. Filtrar por Estado (Activo vs Papelera)
        let filtered = viewState.allBusinesses.filter(b => {
            if (viewState.filterStatus === 'deleted') {
                return b.status === 'deleted';
            }
            return b.status !== 'deleted'; // 'active', 'inactive', etc.
        });

        // 2. Filtrar por Búsqueda
        const term = viewState.searchTerm;
        if (term) {
            filtered = filtered.filter(c => c.name.toLowerCase().includes(term));
        }

        viewState.companiesToDisplay = filtered;
        viewState.totalItems = filtered.length;
    };
    
    const updateTableAndPagination = () => {
        applyFilters();
        paginatedCompanies = paginate(viewState.companiesToDisplay, viewState.currentPage, viewState.itemsPerPage);
        
        const totalPages = getTotalPages(viewState.totalItems, viewState.itemsPerPage);

        // Actualizar Tabla
        const tableContainer = element.querySelector("#companies-table-container");
        if (tableContainer) {
            tableContainer.innerHTML = CompaniesTable({ 
                companies: paginatedCompanies,
                selectedIds: viewState.selectedCompanies,
                isAllSelected: paginatedCompanies.length > 0 && paginatedCompanies.every(c => viewState.selectedCompanies.has(c.id))
            });
        }

        // Actualizar Paginación
        const paginationContainer = element.querySelector("#companies-pagination-container");
        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationControls({
                currentPage: viewState.currentPage,
                totalPages,
                totalItems: viewState.totalItems,
                itemsPerPage: viewState.itemsPerPage
            });
            paginationContainer.style.display = viewState.totalItems > 0 ? 'flex' : 'none';
        }
        
        // Actualizar contador título
        element.querySelector("#view-title-counter").textContent = viewState.totalItems;
        
        // Actualizar Botones de Filtro (Estilos)
        updateFilterButtonsUI();
    };

    const updateFilterButtonsUI = () => {
        const btnActive = element.querySelector('[data-filter="active"]');
        const btnDeleted = element.querySelector('[data-filter="deleted"]');
        
        if (btnActive && btnDeleted) {
            if (viewState.filterStatus === 'active') {
                btnActive.classList.add('active', 'bg-primary-subtle', 'text-primary');
                btnDeleted.classList.remove('active', 'bg-danger-subtle', 'text-danger');
                btnDeleted.classList.add('text-muted');
            } else {
                btnDeleted.classList.add('active', 'bg-danger-subtle', 'text-danger');
                btnDeleted.classList.remove('text-muted');
                btnActive.classList.remove('active', 'bg-primary-subtle', 'text-primary');
            }
        }
    };
    
    const updateStatCards = () => {
        element.querySelector('#stat-total-companies .stat-card-value').textContent = viewState.stats.total;
        element.querySelector('#stat-active-companies .stat-card-value').textContent = viewState.stats.active;
        // Reutilizamos la tarjeta de "Inactive" para mostrar "Papelera" si queremos, o la dejamos igual
        const trashCard = element.querySelector('#stat-inactive-companies');
        if (trashCard) {
            trashCard.querySelector('.stat-card-title').textContent = 'En Papelera';
            trashCard.querySelector('.stat-card-value').textContent = viewState.stats.deleted;
            trashCard.querySelector('.stat-card-icon i').className = 'bi bi-trash3';
        }
    };

    const renderLayout = () => {
        element.innerHTML = `
        <div class="view-panel-content">
            <div class="view-header align-items-center mb-4">
                <div>
                    <h2 class="view-title mb-1">
                        <i class="bi bi-building me-2"></i> 
                        Companies 
                        <span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">0</span>
                    </h2>
                    <p class="text-muted mb-0">Gestión global de negocios.</p>
                </div>
                <div class="ms-auto d-flex gap-2">
                    <button class="btn-icon btn-info" data-action="refresh-data" data-tippy-content="Actualizar"><i class="bi bi-arrow-clockwise"></i></button>
                    ${canCreate ? `
                    <button id="btn-add-company" class="btn-primary" data-action="add-company">
                        <i class="bi bi-plus-circle-fill me-1"></i> Nueva
                    </button>` : ''}
                </div>
            </div>

            <div class="panel-grid mb-4">
                ${StatCard({ id: 'stat-total-companies', title: 'Total Registros', value: '...', icon: 'bi-building', className: 'stat-card-total-companies' })}
                ${StatCard({ id: 'stat-active-companies', title: 'Activas', value: '...', icon: 'bi-building-check', className: 'stat-card-active-companies' })}
                ${StatCard({ id: 'stat-inactive-companies', title: 'Papelera', value: '...', icon: 'bi-trash3', className: 'stat-card-inactive-companies' })}
                ${StatCard({ id: 'stat-location', title: 'Ubicaciones', value: '...', icon: 'bi-geo-alt-fill', className: 'stat-card-location' })}
            </div>

            <div class="table-container-wrapper mt-4">
                <div class="table-filters d-flex justify-content-between">
                    
                    <div class="filter-tabs d-flex gap-2 bg-light p-1 rounded">
                        <button class="btn btn-sm px-3 fw-bold rounded" data-action="filter-view" data-filter="active">
                            <i class="bi bi-check-circle me-1"></i> Activos
                        </button>
                        <button class="btn btn-sm px-3 fw-bold rounded text-muted" data-action="filter-view" data-filter="deleted">
                            <i class="bi bi-trash3 me-1"></i> Papelera
                        </button>
                    </div>

                    <div class="search-container">
                        <i class="bi bi-search search-icon"></i>
                        <input type="search" id="search-companies" class="form-control" placeholder="Buscar empresa...">
                    </div>
                </div>

                <div id="companies-table-container">
                    ${EmptyState({ icon: 'bi-hourglass-split', message: 'Cargando...' })}
                </div>
                <div class="pagination-container" id="companies-pagination-container"></div>
            </div>
        </div>
        `;
        setTimeout(() => initTippy(element), 100);
    };
    
    async function loadData() {
        try {
            const rawData = await loadAllBusinesses();
            
            viewState.allBusinesses = rawData.map(b => ({
                id: b.id,
                name: b.name || b.info?.name || 'Sin Nombre',
                planId: b.planId || b.info?.plan || 'plan_basic',
                status: b.status || b.info?.subscriptionStatus || 'active',
                createdAt: b.createdAt 
            }));
            
            // Recalcular Stats
            viewState.stats.total = viewState.allBusinesses.length;
            viewState.stats.deleted = viewState.allBusinesses.filter(b => b.status === 'deleted').length;
            viewState.stats.active = viewState.allBusinesses.filter(b => b.status !== 'deleted' && b.status === 'active').length;
            viewState.stats.inactive = viewState.stats.total - (viewState.stats.active + viewState.stats.deleted);

            updateStatCards();
            updateTableAndPagination(); // Esto aplicará el filtro actual ('active' por defecto)

        } catch (error) {
            Logger.error('Error cargando data:', error);
            element.querySelector("#companies-table-container").innerHTML = EmptyState({ icon: 'bi-wifi-off', message: 'Error de conexión' });
        }
    }
    
    const handleActions = async (e) => {
        const btn = e.target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const companyId = btn.closest('[data-company-id]')?.dataset.companyId;

        if (action === 'filter-view') {
            const newFilter = btn.dataset.filter;
            if (viewState.filterStatus !== newFilter) {
                viewState.filterStatus = newFilter;
                viewState.currentPage = 1; // Reset página
                updateTableAndPagination();
            }
            return;
        }

        if (action === 'add-company') {
            if (await openCompanyModal()) loadData();
            return;
        }

        if (action === 'refresh-data') {
            showToast('Actualizando...', 'info');
            loadData();
            return;
        }
        
        if (action === 'edit-company') {
            const companyData = viewState.allBusinesses.find(c => c.id === companyId);
            if (companyData && await openCompanyModal(companyData)) loadData();
            return;
        }

        if (action === 'delete-company') {
            const companyData = viewState.allBusinesses.find(c => c.id === companyId);
            showConfirmationModal(
                'Mover a Papelera',
                `¿Desactivar <strong>${companyData?.name}</strong>?<br>
                <small class="text-muted">Podrás restaurarlo después.</small>`,
                async () => {
                    try {
                        await deleteBusiness(companyId);
                        showToast('Empresa movida a la papelera.', 'success');
                        loadData();
                    } catch (e) { showToast(e.message, 'error'); }
                },
                { confirmText: 'Desactivar', confirmButtonClass: 'btn-danger', icon: 'bi bi-archive-fill text-warning' }
            );
            return;
        }

        // --- RESTAURAR (DESDE PAPELERA) ---
        if (action === 'restore-company') {
            const companyData = viewState.allBusinesses.find(c => c.id === companyId);
            showConfirmationModal(
                'Restaurar Empresa',
                `¿Reactivar <strong>${companyData?.name}</strong>?<br>
                <small class="text-success">Volverá a estar visible y operativa.</small>`,
                async () => {
                    try {
                        await restoreBusiness(companyId);
                        showToast('Empresa restaurada exitosamente.', 'success');
                        loadData();
                    } catch (e) { showToast(e.message, 'error'); }
                },
                { 
                    confirmText: 'Restaurar', 
                    confirmButtonClass: 'btn-success', 
                    icon: 'bi bi-arrow-counterclockwise text-success' 
                }
            );
            return;
        }
    };
    
    // Listeners
    renderLayout();
    loadData();
    
    element.addEventListener('click', handleActions);
    element.addEventListener('input', (e) => {
        if (e.target.id === 'search-companies') {
            viewState.searchTerm = e.target.value.toLowerCase();
            viewState.currentPage = 1;
            debounce(() => updateTableAndPagination(), 300)();
        }
    });

    return () => {
        destroyTippy(element);
        element.removeEventListener('click', handleActions);
    };
}