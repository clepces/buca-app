// ======================================================
// ARCHIVO: src/views/People/ClientsView.js
// PROPÓSITO: Gestión de Clientes (CRM)
// VERSIÓN: 2.1 (Implementación Real)
// ======================================================

import { ViewHeader } from '../../components/Common/ViewHeader.js';
import { DataTable } from '../../components/Common/DataTable.js';
import { PaginationControls } from '../../components/Common/PaginationControls.js';
import { EmptyState } from '../../components/Common/EmptyState.js';
import { Logger } from '../../services/logger.service.js';
import { showToast } from '../../services/toast.service.js';
import { useListController } from '../../utils/useListController.js';
import { debounce } from '../../utils/debounce.js';
import { state as globalState } from '../../store/state.js';
import { getClients, deleteClient, updateClient } from '../../services/client.service.js';
import { openClientModal, showConfirmationModal } from '../../services/modal.service.js';

export function ClientsView(element, state) {

    Logger.info('[ClientsView] Inicializando...');

    // 1. Configuración del Controlador
    const listController = useListController({
        itemsPerPage: 10,
        searchKeys: ['name', 'email', 'phone', 'identification', 'type']
    });

    let isViewMounted = true;

    // 2. Carga de Datos
    const loadData = async () => {
        const businessId = globalState.session.business?.id;
        if (!businessId) {
            showToast('No se encontró información del negocio.', 'error');
            return;
        }

        try {
            // Mostrar estado de carga si fuera necesario, o el componente EmptyState 'Cargando...'
            const container = element.querySelector('#clients-table-container');
            if (container) {
                container.innerHTML = `
                    <div class="d-flex justify-content-center align-items-center py-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Cargando...</span>
                        </div>
                    </div>`;
            }

            const clients = await getClients(businessId);

            // Filtramos localmente los activos si no se filtró en query (soft delete check)
            const activeClients = clients.filter(c => c.isActive !== false);

            if (isViewMounted) {
                listController.setData(activeClients);
                updateGrid();
            }
        } catch (error) {
            Logger.error('Error cargando clientes:', error);
            showToast('Error al cargar clientes.', 'error');
        }
    };

    // 3. Definición de Columnas para DataTable
    const columns = [
        {
            header: 'Cliente / Razón Social',
            render: (item) => `
                <div class="d-flex flex-column">
                    <span class="fw-bold text-heading">${item.name}</span>
                    <small class="text-muted" style="font-size: 0.8rem;">${item.identification || 'N/A'}</small>
                </div>`
        },
        {
            header: 'Tipo',
            render: (item) => `<span class="badge ${item.type === 'Empresa' ? 'bg-primary-subtle text-primary-emphasis' : 'bg-light text-dark border'}">${item.type}</span>`
        },
        {
            header: 'Contacto',
            render: (item) => `
                <div class="d-flex flex-column">
                    ${item.email ? `<span><i class="bi bi-envelope me-1"></i> ${item.email}</span>` : ''}
                    ${item.phone ? `<small class="text-muted"><i class="bi bi-telephone me-1"></i> ${item.phone}</small>` : ''}
                    ${!item.email && !item.phone ? '<span class="text-muted italic">--</span>' : ''}
                </div>`
        },
        {
            header: 'Acciones',
            render: (item) => `
                <div class="list-actions">
                    <button class="btn-icon btn-icon-sm" data-action="edit" data-id="${item.id}" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn-icon btn-icon-sm text-danger-hover" data-action="delete" data-id="${item.id}" title="Eliminar">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `
        }
    ];

    // 4. Renderizado Principal (Layout)
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
                    // Update Title Counter Logic moved to updateGrid
                </script>

                <div id="clients-table-container" class="mt-4">
                    <!-- Table or Loading or Empty State -->
                </div>
                
                <div class="pagination-container" id="clients-pagination-container">
                    <!-- Pagination -->
                </div>
            </div>
        `;

        // Conectar Buscador
        const searchInput = element.querySelector('#view-search-input');
        if (searchInput) {
            searchInput.placeholder = "Buscar por nombre, CI/RIF...";
            searchInput.addEventListener('input', debounce((e) => {
                listController.setSearch(e.target.value);
                updateGrid();
            }, 300));
        }

        // Add view title counter span
        const titleEl = element.querySelector('.view-title');
        if (titleEl) {
            titleEl.insertAdjacentHTML('beforeend', '<span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter" style="font-size: 0.5em; vertical-align: middle;">...</span>');
        }
    };

    // 5. Actualización de la Grilla
    const updateGrid = () => {
        if (!isViewMounted) return;

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
                    : 'Aún no tienes clientes registrados. ¡Crea el primero!'
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
    const handleActions = async (e) => {
        const target = e.target;
        const btn = target.closest('[data-action]');

        // Paginación
        if (target.closest('.btn-page')) {
            listController.setPage(parseInt(target.closest('.btn-page').dataset.page));
            updateGrid();
            return;
        }
        if (target.closest('#btn-next-page')) {
            listController.setPage(listController.currentPage + 1);
            updateGrid();
            return;
        }
        if (target.closest('#btn-prev-page')) {
            listController.setPage(listController.currentPage - 1);
            updateGrid();
            return;
        }

        if (!btn) return;
        const action = btn.dataset.action;
        const id = btn.dataset.id;

        if (action === 'create-client') {
            await openClientModal();
            loadData(); // Recargar tras crear (aunque el modal ya emite evento, recargamos por si acaso)
        }

        if (action === 'edit') {
            const client = listController.allData.find(c => c.id === id);
            if (client) {
                await openClientModal(client);
                loadData();
            }
        }

        if (action === 'delete') {
            showConfirmationModal(
                '¿Eliminar Cliente?',
                'El cliente será movido a la papelera y no podrá realizar compras.',
                async () => {
                    try {
                        await deleteClient(globalState.session.business.id, id);
                        showToast('Cliente eliminado.', 'success');
                        loadData();
                    } catch (err) {
                        showToast('Error al eliminar.', 'error');
                    }
                },
                { confirmText: 'Sí, eliminar', confirmButtonClass: 'btn-danger', confirmIcon: 'bi-trash' }
            );
        }

        if (action === 'export-clients') {
            showToast('Exportando CSV... (Simulado)', 'info');
        }
    };

    // 7. Configuración de Eventos Externos
    // Escuchar evento de actualización para recargar la lista sin recargar toda la vista
    const onExternalUpdate = () => {
        if (isViewMounted) loadData();
    };
    document.addEventListener('buca:client-updated', onExternalUpdate);

    // 8. Start
    renderLayout();
    loadData();
    element.addEventListener('click', handleActions);

    return () => {
        isViewMounted = false;
        element.removeEventListener('click', handleActions);
        document.removeEventListener('buca:client-updated', onExternalUpdate);
    };
}