// ======================================================
// ARCHIVO: src/views/Companies/CompaniesView.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.2 - FILE: 1.0.2
// CORRECCIÓN: (Anotaciones K-1, AP-1)
// 1. Refactorizado para usar el patrón de renderizado inteligente.
// 2. 'render()' solo crea el layout y 'updateTable()' actualiza los datos.
// 3. Se elimina el "hack" de guardar/restaurar foco.
// 4. Se usa 'pagination.service.js' (AP-1).
// ======================================================

import { StatCard } from '../../components/StatCard.js';
import { CompaniesTable } from '../../components/CompaniesTable.js';
import { PaginationControls } from '../../components/PaginationControls.js';
import { EmptyState } from '../../components/EmptyState.js';
import { Logger } from '../../services/logger.service.js';
import { state as globalState } from '../../store/state.js';
import { can } from '../../services/permissions.service.js';
import { PERMISSIONS } from '../../services/roles.config.js';
import { debounce } from '../../utils/debounce.js';
// --- ¡IMPORTACIÓN AÑADIDA! (Anotación AP-1) ---
import { paginate, getTotalPages } from '../../services/pagination.service.js';

export function CompaniesView(element, state) {
    const canCreate = can(PERMISSIONS.CREATE_COMPANY);

    const viewState = {
        currentPage: 1,
        itemsPerPage: 10,
        totalItems: 0,
        searchTerm: '',
        selectedCompanies: new Set(),
        // Datos de Platzhalter
        companies: [
            { id: '1', name: 'BrightWave Innovations', domain: 'brightwave.com', email: 'michael@example.com', accountUrl: 'https://bwi.example.com', plan: 'Advanced (Monthly)', createdDate: '12 Sep 2024', status: 'Active' },
            { id: '2', name: 'Stellar Dynamics', domain: 'stellar.com', email: 'sophie@example.com', accountUrl: 'https://sd.example.com', plan: 'Basic (Yearly)', createdDate: '24 Oct 2024', status: 'Active' },
            { id: '3', name: 'Quantum Nexus', domain: 'quantum.com', email: 'cameron@example.com', accountUrl: 'https://qn.example.com', plan: 'Advanced (Monthly)', createdDate: '18 Feb 2024', status: 'Active' },
            { id: '4', name: 'EcoVision Enterprises', domain: 'ecovision.com', email: 'doris@example.com', accountUrl: 'https://eve.example.com', plan: 'Advanced (Monthly)', createdDate: '17 Oct 2024', status: 'Active' },
            { id: '5', name: 'Aurora Insights', domain: 'aurora.com', email: 'aurora@example.com', accountUrl: 'https://ai.example.com', plan: 'Enterprise (Monthly)', createdDate: '20 Jul 2024', status: 'Active' },
            { id: '6', name: 'BlueSky Ventures', domain: 'bluesky.com', email: 'kathleen@example.com', accountUrl: 'https://bsv.example.com', plan: 'Advanced (Monthly)', createdDate: '10 Apr 2024', status: 'Active' },
            { id: '7', name: 'TerraFusion', domain: 'terrafusion.com', email: 'bruce@example.com', accountUrl: 'https://tf.example.com', plan: 'Advanced (Monthly)', createdDate: '29 Aug 2024', status: 'Active' },
            { id: '8', name: 'UrbanPulse Design', domain: 'urbanpulse.com', email: 'estelle@example.com', accountUrl: 'https://upd.example.com', plan: 'Basic (Monthly)', createdDate: '22 Feb 2024', status: 'Inactive' },
            { id: '9', name: 'Nimbus Networks', domain: 'nimbus.com', email: 'stephen@example.com', accountUrl: 'https://nn.example.com', plan: 'Basic (Monthly)', createdDate: '03 Nov 2024', status: 'Active' }
        ]
    };
    
    // --- Lógica de Filtro y Paginación ---
    let paginatedCompanies = [];
    let filteredCompanies = [];

    const applyFilters = () => {
        filteredCompanies = viewState.companies.filter(c => 
            c.name.toLowerCase().includes(viewState.searchTerm) ||
            c.email.toLowerCase().includes(viewState.searchTerm)
        );
        viewState.totalItems = filteredCompanies.length;
    };
    
    const applyPagination = () => {
        // --- ¡CORRECCIÓN! (Anotación AP-1) ---
        // Usamos el servicio de paginación
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


    // --- ¡NUEVA FUNCIÓN DE RENDERIZADO PARCIAL! ---
    const updateTableAndPagination = () => {
        Logger.trace('[CompaniesView] Actualizando solo tabla y paginación...');
        applyFilters();
        applyPagination();
        
        const totalPages = getTotalPages(viewState.totalItems, viewState.itemsPerPage);

        // 1. Actualizar la tabla
        const tableContainer = element.querySelector("#companies-table-container");
        if (tableContainer) {
            tableContainer.innerHTML = CompaniesTable({ 
                companies: paginatedCompanies,
                selectedIds: viewState.selectedCompanies,
                isAllSelected: isAllVisibleSelected()
            });
        }

        // 2. Actualizar la paginación
        const paginationContainer = element.querySelector("#companies-pagination-container");
        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationControls({
                currentPage: viewState.currentPage,
                totalPages: totalPages,
                totalItems: viewState.totalItems,
                itemsPerPage: viewState.itemsPerPage
            });
        }
        
        // 3. Actualizar el contador del título
        const titleCounter = element.querySelector("#view-title-counter");
        if (titleCounter) {
            titleCounter.textContent = viewState.totalItems;
        }
    };


    // --- FUNCIÓN DE RENDERIZADO PRINCIPAL (SOLO SE EJECUTA UNA VEZ) ---
    const renderLayout = () => {
        const totalCompanies = '950';
        const activeCompanies = '920';
        const inactiveCompanies = '30';
        const companyLocation = '180';

        element.innerHTML = `
            <div class="view-header align-items-center mb-4">
                <div>
                    <h2 class="view-title mb-1">
                        <i class="bi bi-building me-2"></i> 
                        Companies 
                        <span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">${viewState.totalItems}</span>
                    </h2>
                    <p class="text-muted mb-0">Administra todas las compañías en la plataforma.</p>
                </div>
                <div class="ms-auto d-flex gap-2">
                    <button class="btn-icon btn-danger" data-action="export-pdf" data-tippy-content="Exportar a PDF">
                        <i class="bi bi-file-earmark-pdf-fill"></i>
                    </button>
                    <button class="btn-icon btn-success" data-action="export-excel" data-tippy-content="Exportar a Excel">
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
                ${StatCard({ title: 'Total Companies', value: totalCompanies, icon: 'bi-building', className: 'stat-card-total-companies', miniGraph: true })}
                ${StatCard({ title: 'Active Companies', value: activeCompanies, icon: 'bi-building-check', className: 'stat-card-active-companies', miniGraph: true })}
                ${StatCard({ title: 'Inactive Companies', value: inactiveCompanies, icon: 'bi-building-dash', className: 'stat-card-inactive-companies', miniGraph: true })}
                ${StatCard({ title: 'Company Location', value: companyLocation, icon: 'bi-geo-alt-fill', className: 'stat-card-location', miniGraph: true })}
            </div>

            <div class="table-container-wrapper mt-4">
                <div class="table-filters">
                    <div class="search-container">
                        <i class="bi bi-search search-icon"></i>
                        <input type="search" id="search-companies" class="form-control" placeholder="Buscar por nombre, email..." value="${viewState.searchTerm}">
                    </div>
                    <div class="d-flex gap-2" style="margin-left: auto;">
                        <select id="filter-plan" class="form-control" style="min-width: 150px;">
                            <option value="">Select Plan</option>
                            <option value="basic">Basic</option>
                        </select>
                        <select id="filter-status" class="form-control" style="min-width: 150px;">
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                        </select>
                        <select id="filter-sort" class="form-control" style="min-width: 180px;">
                            <option value="last_7_days">Sort By: Last 7 Days</option>
                        </select>
                        <button class="btn-icon btn-secondary" data-action="manage-columns" data-tippy-content="Administrar Columnas">
                            <i class="bi bi-layout-three-columns"></i>
                        </button>
                    </div>
                </div>

                <div id="companies-table-container">
                    ${EmptyState({ icon: 'bi-hourglass-split', message: 'Cargando compañías...' })}
                </div>
                <div class="pagination-container" id="companies-pagination-container">
                    </div>
            </div>
        `;
        
        // Inicializar Tooltips (solo una vez)
        setTimeout(() => {
            if (typeof tippy !== 'undefined') {
                tippy('[data-tippy-content]');
            } else {
                Logger.warn('Tippy.js no está definido.');
            }
        }, 100);
    };
    
    // --- Renderizado con Debounce (llama a la nueva función) ---
    const debouncedSearchHandler = debounce(() => {
        // No necesitamos guardar el foco, solo actualizamos la tabla
        updateTableAndPagination(); 
    }, 300);

    // --- Manejadores de Eventos ---
    
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

        if (target.id === 'items-per-page') {
            viewState.itemsPerPage = parseInt(target.value, 10);
            viewState.currentPage = 1;
            needsUpdate = true;
        }
        
        if (needsUpdate) {
            updateTableAndPagination(); // <-- Llama a la nueva función
        }
    };

    const handleSearch = (e) => {
        if (e.target.id === 'search-companies') {
            viewState.searchTerm = e.target.value.toLowerCase();
            viewState.currentPage = 1;
            debouncedSearchHandler(); // <-- Llama al debounce
        }
    };

    const handleSelection = (e) => {
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
            updateTableAndPagination(); // <-- Llama a la nueva función
        }
    };

    const handleActions = (e) => {
        const actionButton = e.target.closest('[data-action]');
        if (!actionButton) return;
        const action = actionButton.dataset.action;
        const companyId = actionButton.closest('[data-company-id]')?.dataset.companyId;

        if (action === 'select-all' || action === 'select-one') {
            handleSelection(e);
            return;
        }

        if (action === 'add-company') { Logger.info('Abrir modal para añadir compañía...'); }
        if (action === 'view-company') { Logger.info(`Abrir modal para VER compañía: ${companyId}`); }
        if (action === 'edit-company') { Logger.info(`Abrir modal para EDITAR compañía: ${companyId}`); }
        if (action === 'delete-company') { Logger.info(`Abrir modal para ELIMINAR compañía: ${companyId}`); }
        if (action === 'refresh-data') { Logger.info('Refrescando datos de compañías...'); updateTableAndPagination(); }
        if (action === 'manage-columns') { Logger.info('Abrir modal "Manage Columns" (Próximamente)...'); }
    };

    // --- CICLO DE VIDA DE LA VISTA ---
    
    // 1. Renderizado inicial del Layout
    renderLayout();
    
    // 2. Carga inicial de datos de la tabla
    updateTableAndPagination();

    // 3. Adjuntar Listeners (una sola vez)
    element.addEventListener('click', handleActions);
    element.addEventListener('click', handlePagination);
    element.addEventListener('input', handleSearch);

    // 4. Función de limpieza
    return () => {
        Logger.info('Limpiando CompaniesView y sus listeners...');
        element.removeEventListener('click', handleActions);
        element.removeEventListener('click', handlePagination);
        element.removeEventListener('input', handleSearch);
    };
}