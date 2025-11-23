// ======================================================
// ARCHIVO: src/views/People/ClientsView.js
// PROPÓSITO: Gestión de Clientes (CRM)
// VERSIÓN: 2.0 (Estandarizada)
// ======================================================

import { ViewHeader } from '../../components/Common/ViewHeader.js';
import { DataTable } from '../../components/Common/DataTable.js';
import { PaginationControls } from '../../components/Common/PaginationControls.js';
import { EmptyState } from '../../components/Common/EmptyState.js';
import { Logger } from '../../services/logger.service.js';
import { showToast } from '../../services/toast.service.js';
import { useListController } from '../../utils/useListController.js';

export function ClientsView(element, state) {
    
    Logger.info('[ClientsView] Inicializando...');

    // 1. Generación de Datos Simulados (MOCK)
    // TODO: Reemplazar esto con loadClients() desde storage.service.js cuando exista
    const mockClients = Array.from({ length: 25 }, (_, i) => ({
        id: `cli_${i + 1}`,
        name: `Cliente ${i + 1}`,
        email: `cliente${i + 1}@ejemplo.com`,
        phone: `+58 412 555 00${(i % 90) + 10}`,
        type: i % 3 === 0 ? 'Empresa' : 'Particular',
        status: i % 5 === 0 ? 'inactive' : 'active',
        totalPurchases: Math.floor(Math.random() * 500)
    }));

    // 2. Configuración del Controlador
    const listController = useListController({
        itemsPerPage: 10,
        searchKeys: ['name', 'email', 'phone']
    });

    // Cargar datos iniciales
    listController.setData(mockClients);

    // 3. Definición de Columnas para DataTable
    const columns = [
        { 
            header: 'Cliente', 
            render: (item) => `
                <div class="d-flex flex-column">
                    <span class="fw-bold text-heading">${item.name}</span>
                    <small class="text-muted" style="font-size: 0.8rem;">${item.type}</small>
                </div>` 
        },
        { 
            header: 'Contacto', 
            render: (item) => `
                <div class="d-flex flex-column">
                    <span><i class="bi bi-envelope me-1"></i> ${item.email}</span>
                    <small class="text-muted"><i class="bi bi-telephone me-1"></i> ${item.phone}</small>
                </div>` 
        },
        { 
            header: 'Estado', 
            render: (item) => {
                const isAct = item.status === 'active';
                return `<span class="badge ${isAct ? 'bg-success-subtle text-success-emphasis' : 'bg-secondary-subtle text-secondary-emphasis'}">
                    ${isAct ? 'Activo' : 'Inactivo'}
                </span>`;
            }
        },
        { 
            header: 'Compras', 
            render: (item) => `<span class="fw-medium">${item.totalPurchases} Ventas</span>` 
        },
        { 
            header: 'Acciones', 
            render: (item) => `
                <div class="list-actions">
                    <button class="btn-icon btn-icon-sm" data-action="edit" data-id="${item.id}" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn-icon btn-icon-sm" data-action="view-history" data-id="${item.id}" title="Historial">
                        <i class="bi bi-clock-history"></i>
                    </button>
                </div>
            ` 
        }
    ];

    // 4. Renderizado Principal
    const renderLayout = () => {
        const headerHTML = ViewHeader({
            title: 'Clientes',
            subtitle: 'Gestión de cartera de clientes',
            icon: 'bi-people-fill',
            actions: [
                { label: 'Exportar', action: 'export-clients', icon: 'bi-download', variant: 'secondary' },
                { label: 'Nuevo Cliente', action: 'create-client', icon: 'bi-person-plus-fill' }
            ]
        });

        element.innerHTML = `
            <div class="view-panel-content">
                ${headerHTML}
                
                <script>
                    document.querySelector('.view-title').insertAdjacentHTML('beforeend', 
                    '<span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">${listController.totalItems}</span>');
                </script>

                <div id="clients-table-container" class="mt-4">
                    </div>
                
                <div class="pagination-container" id="clients-pagination-container">
                    </div>
            </div>
        `;

        // Conectar Buscador
        const searchInput = element.querySelector('#view-search-input');
        if (searchInput) {
            searchInput.placeholder = "Buscar por nombre, email...";
            searchInput.addEventListener('input', (e) => {
                listController.setSearch(e.target.value);
                updateGrid();
            });
        }
    };

    // 5. Actualización de la Grilla
    const updateGrid = () => {
        const tableContainer = element.querySelector('#clients-table-container');
        const paginationContainer = element.querySelector('#clients-pagination-container');
        const titleCounter = element.querySelector("#view-title-counter");

        if (!tableContainer) return;

        const itemsToShow = listController.paginatedData;

        if (itemsToShow.length > 0) {
            tableContainer.innerHTML = DataTable({ columns, data: itemsToShow });
        } else {
            tableContainer.innerHTML = EmptyState({
                icon: 'bi-search',
                message: listController.searchTerm 
                    ? 'No se encontraron clientes con ese criterio.' 
                    : 'Aún no tienes clientes registrados.'
            });
        }

        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationControls({
                currentPage: listController.currentPage,
                totalPages: listController.totalPages,
                totalItems: listController.totalItems,
                itemsPerPage: listController.itemsPerPage
            });
            paginationContainer.style.display = listController.totalItems > 0 ? 'flex' : 'none';
        }

        if (titleCounter) titleCounter.textContent = listController.totalItems;
    };

    // 6. Manejadores de Eventos
    const handleActions = (e) => {
        const target = e.target;
        const btn = target.closest('[data-action]');
        
        // Paginación
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

        if (!btn) return;
        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (action === 'create-client') {
            showToast('Formulario de Cliente (Próximamente)', 'info');
        }
        if (action === 'export-clients') {
            showToast('Exportando CSV...', 'success');
        }
        if (action === 'edit') {
            showToast(`Editar cliente ${id}`, 'info');
        }
    };

    // 7. Start
    renderLayout();
    updateGrid();
    element.addEventListener('click', handleActions);

    return () => {
        element.removeEventListener('click', handleActions);
    };
}