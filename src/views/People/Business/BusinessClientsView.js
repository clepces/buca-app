// ======================================================
// ARCHIVO: src/views/People/Business/BusinessClientsView.js
// PROPÓSITO: Gestión de clientes para Propietarios y Empleados.
// ======================================================

import { ViewHeader } from '../../../components/Common/ViewHeader.js';
import { DataTable } from '../../../components/Common/DataTable.js';
import { PaginationControls } from '../../../components/Common/PaginationControls.js';
import { EmptyState } from '../../../components/Common/EmptyState.js';
import { Logger } from '../../../services/logger.service.js';
import { showToast } from '../../../services/toast.service.js';
import { useListController } from '../../../utils/useListController.js';
import { debounce } from '../../../utils/debounce.js';
import { state as globalState } from '../../../store/state.js';
import { getClients, deleteClient } from '../../../services/client.service.js';
import { openClientModal, showConfirmationModal } from '../../../services/modal.service.js';

export function BusinessClientsView(element, state) {

    Logger.info('[BusinessClientsView] Inicializando...');

    // 1. Configuración del Controlador de Lista
    const listController = useListController({
        itemsPerPage: 10,
        searchKeys: ['name', 'email', 'phone', 'identification', 'type']
    });

    let isViewMounted = true;

    // 2. Definición de Columnas
    const columns = [
        {
            header: 'Cliente / Razón Social',
            render: (item) => `
                <div class="d-flex flex-column">
                    <span class="fw-bold text-heading">${item.name}</span>
                    <small class="text-muted" style="font-size: 0.8rem;">
                        <i class="bi bi-card-heading me-1"></i>${item.identification || 'Sin ID'}
                    </small>
                </div>`
        },
        {
            header: 'Tipo',
            render: (item) => {
                const isCompany = item.type === 'Empresa';
                return `<span class="badge ${isCompany ? 'bg-primary-subtle text-primary-emphasis' : 'bg-secondary-subtle text-secondary-emphasis'}">
                    <i class="bi ${isCompany ? 'bi-briefcase' : 'bi-person'} me-1"></i> ${item.type}
                </span>`;
            }
        },
        {
            header: 'Contacto',
            render: (item) => {
                if (!item.email && !item.phone) return '<span class="text-muted small italic">Sin datos</span>';
                return `
                <div class="d-flex flex-column gap-1">
                    ${item.email ? `<span class="small"><i class="bi bi-envelope me-1 text-muted"></i> ${item.email}</span>` : ''}
                    ${item.phone ? `<span class="small"><i class="bi bi-telephone me-1 text-muted"></i> ${item.phone}</span>` : ''}
                </div>`;
            }
        },
        {
            header: 'Estado',
            render: (item) => item.isActive
                ? '<span class="badge bg-success-subtle text-success-emphasis">Activo</span>'
                : '<span class="badge bg-danger-subtle text-danger-emphasis">Inactivo</span>'
        },
        {
            header: 'Acciones',
            render: (item) => `
                <div class="list-actions">
                    <button class="btn-icon btn-icon-sm" data-action="edit" data-id="${item.id}" title="Editar Cliente">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn-icon btn-icon-sm text-danger" data-action="delete" data-id="${item.id}" title="Eliminar Cliente">
                        <i class="bi bi-trash"></i>
                    </button>
                </div>
            `
        }
    ];

    // 3. Carga de Datos
    const loadData = async () => {
        const businessId = globalState.session.business?.id;

        if (!businessId) {
            showToast('Error de sesión: No se encontró el negocio.', 'error');
            return;
        }

        try {
            const container = element.querySelector('#clients-table-container');
            if (container) {
                container.innerHTML = `
                    <div class="d-flex flex-column justify-content-center align-items-center py-5">
                        <div class="spinner-border text-primary mb-2" role="status"></div>
                        <span class="text-muted small">Cargando cartera de clientes...</span>
                    </div>`;
            }

            const clients = await getClients(businessId);

            // Filtramos solo los activos para la vista principal
            // (Podríamos añadir un tab de "Papelera" en el futuro)
            const activeClients = clients.filter(c => c.isActive !== false);

            if (isViewMounted) {
                listController.setData(activeClients);
                updateGrid();
            }
        } catch (error) {
            Logger.error('Error cargando clientes:', error);
            const container = element.querySelector('#clients-table-container');
            if (container) {
                container.innerHTML = EmptyState({
                    icon: 'bi-wifi-off',
                    message: 'Error al conectar con la base de datos.'
                });
            }
        }
    };

    // 4. Renderizado Layout
    const renderLayout = () => {
        const headerHTML = ViewHeader({
            title: 'Cartera de Clientes',
            subtitle: 'Gestión de relaciones comerciales',
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
                    const titleEl = document.querySelector('.view-title');
                    if(titleEl && !document.getElementById('view-title-counter')) {
                        titleEl.insertAdjacentHTML('beforeend', 
                        '<span class="badge bg-primary-subtle text-primary-emphasis ms-2 fs-6 align-middle" id="view-title-counter">0</span>');
                    }
                </script>

                <div id="clients-table-container" class="mt-4"></div>
                <div class="pagination-container" id="clients-pagination-container"></div>
            </div>
        `;

        const searchInput = element.querySelector('#view-search-input');
        if (searchInput) {
            searchInput.placeholder = "Buscar por nombre, CI/RIF...";
            searchInput.addEventListener('input', debounce((e) => {
                listController.setSearch(e.target.value);
                updateGrid();
            }, 300));
        }

        // Inyección manual del badge si el script inline no corre
        setTimeout(() => {
            const titleEl = element.querySelector('.view-title');
            if (titleEl && !element.querySelector('#view-title-counter')) {
                const badge = document.createElement('span');
                badge.className = "badge bg-primary-subtle text-primary-emphasis ms-2 fs-6 align-middle";
                badge.id = "view-title-counter";
                badge.textContent = "0";
                titleEl.appendChild(badge);
            }
        }, 0);
    };

    // 5. Actualización Grid
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
                    ? 'No se encontraron coincidencias.'
                    : 'No tienes clientes registrados aún.'
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

        // Inicializar tooltips
        try {
            if (window.tippy) tippy('[title]', { content: (reference) => reference.getAttribute('title') });
        } catch (e) { }
    };

    // 6. Manejo de Acciones
    const handleActions = async (e) => {
        const target = e.target;
        const btn = target.closest('[data-action]');

        // Navegación Paginación
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
            await openClientModal(); // Espera a que cierre
            loadData(); // Recarga
        }

        if (action === 'edit') {
            const client = listController.allData.find(c => c.id === id);
            if (client) {
                // Pasamos el cliente mapeado al modal
                await openClientModal(client);
                loadData();
            }
        }

        if (action === 'delete') {
            showConfirmationModal(
                '¿Eliminar Cliente?',
                'El cliente será movido a la papelera. Podrás restaurarlo después.',
                async () => {
                    try {
                        const businessId = globalState.session.business.id;
                        await deleteClient(businessId, id);
                        showToast('Cliente eliminado correctamente.', 'success');
                        loadData();
                    } catch (err) {
                        Logger.error(err);
                        showToast('Error al eliminar cliente.', 'error');
                    }
                },
                { confirmText: 'Sí, eliminar', confirmButtonClass: 'btn-danger', icon: 'bi-trash' }
            );
        }

        if (action === 'export-clients') {
            showToast('Generando reporte CSV...', 'info');
        }
    };

    // 7. Eventos Globales
    const onExternalUpdate = () => {
        if (isViewMounted) loadData();
    };
    document.addEventListener('buca:client-updated', onExternalUpdate);

    // 8. Init
    renderLayout();
    loadData();
    element.addEventListener('click', handleActions);

    return () => {
        isViewMounted = false;
        element.removeEventListener('click', handleActions);
        document.removeEventListener('buca:client-updated', onExternalUpdate);
    };
}