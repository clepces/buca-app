// ======================================================
// ARCHIVO: src/views/Companies/CompaniesView.js
// VERSIÓN: 4.1 (Refactorizada con useListController y ViewHeader)
// ======================================================

import { StatCard } from '../../components/Common/StatCard.js';
import { CompaniesTable } from '../../components/Companies/CompaniesTable.js';
import { PaginationControls } from '../../components/Common/PaginationControls.js';
import { EmptyState } from '../../components/Common/EmptyState.js';
import { ViewHeader } from '../../components/Common/ViewHeader.js'; // <--- NUEVO
import { Logger } from '../../services/logger.service.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';
import { initTippy, destroyTippy } from '../../utils/tippy-helper.js';
import { openCompanyModal, showConfirmationModal } from '../../services/modal.service.js';
import { loadAllBusinesses } from '../../services/storage.service.js';
import { showToast } from '../../services/toast.service.js';
import { deleteBusiness, restoreBusiness } from '../../services/admin.service.js';
import { useListController } from '../../utils/useListController.js'; // <--- NUEVO
import { debounce } from '../../utils/debounce.js';

export function CompaniesView(element, state) {

    // --- 1. INICIALIZACIÓN ---
    const canCreate = can(PERMISSIONS.CREATE_COMPANY);

    // Estado local mínimo (solo lo que el controlador no maneja)
    const viewState = {
        allBusinesses: [], // "Fuente de verdad" completa
        currentFilter: 'active', // 'active' | 'deleted'
        selectedCompanies: new Set(),
        stats: { total: 0, active: 0, inactive: 0, deleted: 0 }
    };

    // Controlador de lista (maneja búsqueda y paginación)
    const listController = useListController({
        itemsPerPage: 10,
        searchKeys: ['name', 'id'] // Buscar por nombre o ID
    });

    // --- 2. LÓGICA DE DATOS ---

    // Filtra la lista global según el tab y actualiza el controlador
    const applyTabFilter = (filterType) => {
        viewState.currentFilter = filterType;

        let filteredData = [];
        if (filterType === 'deleted') {
            filteredData = viewState.allBusinesses.filter(b => b.status === 'deleted');
        } else {
            // 'active' muestra todo lo que NO está borrado
            filteredData = viewState.allBusinesses.filter(b => b.status !== 'deleted');
        }

        // Le damos los datos filtrados al controlador para que él pagine y busque
        listController.setData(filteredData);
        updateGrid();
        updateFilterButtonsUI();
    };

    const loadData = async () => {
        try {
            // Cargar datos crudos
            const rawData = await loadAllBusinesses();

            // Normalizar datos
            viewState.allBusinesses = rawData.map(b => ({
                id: b.id,
                name: b.name || b.info?.name || 'Sin Nombre',
                planId: b.planId || b.info?.plan || 'plan_basic',
                status: b.status || b.info?.subscriptionStatus || 'active',
                createdAt: b.createdAt
            }));

            // Calcular estadísticas
            viewState.stats.total = viewState.allBusinesses.length;
            viewState.stats.deleted = viewState.allBusinesses.filter(b => b.status === 'deleted').length;
            viewState.stats.active = viewState.allBusinesses.filter(b => b.status !== 'deleted' && b.status === 'active').length;
            viewState.stats.inactive = viewState.stats.total - (viewState.stats.active + viewState.stats.deleted);

            // Actualizar UI
            updateStatCards();
            applyTabFilter(viewState.currentFilter); // Esto llama a updateGrid

        } catch (error) {
            Logger.error('Error cargando data:', error);
            const container = element.querySelector("#companies-table-container");
            if (container) container.innerHTML = EmptyState({ icon: 'bi-wifi-off', message: 'Error de conexión' });
        }
    };

    // --- 3. RENDERIZADO ---

    const updateStatCards = () => {
        const setVal = (id, val) => {
            const el = element.querySelector(`#${id} .stat-card-value`);
            if (el) el.textContent = val;
        };
        setVal('stat-total-companies', viewState.stats.total);
        setVal('stat-active-companies', viewState.stats.active);

        // Ajuste dinámico para la tarjeta de "Inactivos/Papelera"
        const trashCard = element.querySelector('#stat-inactive-companies');
        if (trashCard) {
            trashCard.querySelector('.stat-card-title').textContent = 'En Papelera';
            trashCard.querySelector('.stat-card-value').textContent = viewState.stats.deleted;
            trashCard.querySelector('.stat-card-icon i').className = 'bi bi-trash3';
        }
    };

    const updateFilterButtonsUI = () => {
        const btnActive = element.querySelector('[data-filter="active"]');
        const btnDeleted = element.querySelector('[data-filter="deleted"]');

        if (btnActive && btnDeleted) {
            const isDeletedMode = viewState.currentFilter === 'deleted';

            btnActive.classList.toggle('active', !isDeletedMode);
            btnActive.classList.toggle('bg-primary-subtle', !isDeletedMode);
            btnActive.classList.toggle('text-primary', !isDeletedMode);

            btnDeleted.classList.toggle('active', isDeletedMode);
            btnDeleted.classList.toggle('bg-danger-subtle', isDeletedMode);
            btnDeleted.classList.toggle('text-danger', isDeletedMode);
            btnDeleted.classList.toggle('text-muted', !isDeletedMode);
        }
    };

    const updateGrid = () => {
        const tableContainer = element.querySelector("#companies-table-container");
        const paginationContainer = element.querySelector("#companies-pagination-container");
        const titleCounter = element.querySelector("#view-title-counter");

        if (!tableContainer) return;

        const itemsToShow = listController.paginatedData;

        // Renderizar Tabla
        tableContainer.innerHTML = CompaniesTable({
            companies: itemsToShow,
            selectedIds: viewState.selectedCompanies,
            isAllSelected: itemsToShow.length > 0 && itemsToShow.every(c => viewState.selectedCompanies.has(c.id))
        });

        // Renderizar Paginación
        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationControls({
                currentPage: listController.currentPage,
                totalPages: listController.totalPages,
                totalItems: listController.totalItems,
                itemsPerPage: listController.itemsPerPage
            });
            paginationContainer.style.display = listController.totalItems > 0 ? 'flex' : 'none';
        }

        // Actualizar contador del título
        if (titleCounter) {
            titleCounter.textContent = listController.totalItems;
        }

        initTippy(tableContainer);
    };

    const renderLayout = () => {
        const headerHTML = ViewHeader({
            title: 'Companies',
            subtitle: 'Gestión global de negocios',
            icon: 'bi-building',
            actions: [
                { label: 'Actualizar', action: 'refresh-data', icon: 'bi-arrow-clockwise', variant: 'info' },
                ...(canCreate ? [{ label: 'Nueva', action: 'add-company', icon: 'bi-plus-circle-fill' }] : [])
            ]
        });

        element.innerHTML = `
        <div class="view-panel-content">
            ${headerHTML}
            
            <style> .view-title { display: flex; align-items: center; } </style>
            <script>
                document.querySelector('.view-title').insertAdjacentHTML('beforeend', 
                '<span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">0</span>');
            </script>

            <div class="panel-grid mb-4">
                ${StatCard({ id: 'stat-total-companies', title: 'Total Registros', value: '...', icon: 'bi-building', className: 'stat-card-total-companies' })}
                ${StatCard({ id: 'stat-active-companies', title: 'Activas', value: '...', icon: 'bi-building-check', className: 'stat-card-active-companies' })}
                ${StatCard({ id: 'stat-inactive-companies', title: 'Papelera', value: '...', icon: 'bi-trash3', className: 'stat-card-inactive-companies' })}
                ${StatCard({ id: 'stat-location', title: 'Ubicaciones', value: '0', icon: 'bi-geo-alt-fill', className: 'stat-card-location' })}
            </div>

            <div class="table-container-wrapper mt-4">
                <div class="table-filters d-flex justify-content-between align-items-center p-3 border-bottom">
                    <div class="filter-tabs d-flex gap-2 bg-light p-1 rounded">
                        <button class="btn btn-sm px-3 fw-bold rounded" data-action="filter-view" data-filter="active">
                            <i class="bi bi-check-circle me-1"></i> Activos
                        </button>
                        <button class="btn btn-sm px-3 fw-bold rounded text-muted" data-action="filter-view" data-filter="deleted">
                            <i class="bi bi-trash3 me-1"></i> Papelera
                        </button>
                    </div>
                    </div>

                <div id="companies-table-container">
                    ${EmptyState({ icon: 'bi-hourglass-split', message: 'Cargando...' })}
                </div>
                <div class="pagination-container" id="companies-pagination-container"></div>
            </div>
        </div>
        `;

        // Conectar buscador del Header
        const searchInput = element.querySelector('#view-search-input');
        if (searchInput) {
            searchInput.placeholder = "Buscar empresa...";
            searchInput.addEventListener('input', debounce((e) => {
                listController.setSearch(e.target.value);
                updateGrid();
            }, 300));
        }
    };

    // --- 4. MANEJADORES DE EVENTOS ---

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
        if (target.id === 'items-per-page') {
            listController.setItemsPerPage(parseInt(target.value));
            updateGrid();
            return;
        }

        // -- Botones --
        const btn = target.closest('[data-action]');
        if (!btn) return;
        const action = btn.dataset.action;
        const companyId = btn.closest('[data-company-id]')?.dataset.companyId;

        // Filtros de Tab
        if (action === 'filter-view') {
            applyTabFilter(btn.dataset.filter);
            return;
        }

        // Crear/Refrescar
        if (action === 'add-company') {
            if (await openCompanyModal()) loadData();
            return;
        }
        if (action === 'refresh-data') {
            showToast('Actualizando...', 'info');
            loadData();
            return;
        }

        // Acciones de Fila
        if (!companyId) return;

        if (action === 'edit-company') {
            const companyData = viewState.allBusinesses.find(c => c.id === companyId);
            if (companyData && await openCompanyModal(companyData)) loadData();
        }

        if (action === 'delete-company') {
            const companyData = viewState.allBusinesses.find(c => c.id === companyId);
            showConfirmationModal(
                'Mover a Papelera',
                `¿Desactivar <strong>${companyData?.name}</strong>?<br><small class="text-muted">Podrás restaurarlo después.</small>`,
                async () => {
                    try {
                        await deleteBusiness(companyId);
                        showToast('Empresa movida a la papelera.', 'success');
                        loadData();
                    } catch (e) { showToast(e.message, 'error'); }
                },
                { confirmText: 'Desactivar', confirmButtonClass: 'btn-danger', icon: 'bi bi-archive-fill text-warning' }
            );
        }

        if (action === 'restore-company') {
            const companyData = viewState.allBusinesses.find(c => c.id === companyId);
            showConfirmationModal(
                'Restaurar Empresa',
                `¿Reactivar <strong>${companyData?.name}</strong>?`,
                async () => {
                    try {
                        await restoreBusiness(companyId);
                        showToast('Empresa restaurada exitosamente.', 'success');
                        loadData();
                    } catch (e) { showToast(e.message, 'error'); }
                },
                { confirmText: 'Restaurar', confirmButtonClass: 'btn-success', icon: 'bi bi-arrow-counterclockwise text-success' }
            );
        }
    };

    // --- 5. START ---
    renderLayout();
    loadData();

    element.addEventListener('click', handleActions);

    return () => {
        destroyTippy(element);
        element.removeEventListener('click', handleActions);
    };
}