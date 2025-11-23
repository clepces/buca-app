// ======================================================
// ARCHIVO: src/views/Products/Super_admin/SuperAdminProductsView.js
// VERSIÓN: 3.0 (Refactorizada con useListController)
// ======================================================

import { Logger } from '../../../services/logger.service.js';
import { ViewHeader } from '../../../components/Common/ViewHeader.js';
import { DataTable } from '../../../components/Common/DataTable.js';
import { PaginationControls } from '../../../components/Common/PaginationControls.js';
import { EmptyState } from '../../../components/Common/EmptyState.js';
import { showToast } from '../../../services/toast.service.js';
import { openProductModal, showConfirmationModal } from '../../../services/modal.service.js';
import { loadGlobalTemplates } from '../../../services/storage.service.js';
import { deleteTemplate } from '../../../store/actions.js';
import { useListController } from '../../../utils/useListController.js'; // <--- EL CEREBRO

export function SuperAdminProductsView(element, state) {
    
    Logger.info('[SuperAdminProductsView] Inicializando...');

    // --- 1. CONTROLADOR DE LISTA ---
    const listController = useListController({
        itemsPerPage: 10,
        searchKeys: ['name', 'category', 'brand'] // Buscar por estos campos
    });

    // Configuración de columnas para DataTable
    const columns = [
        { header: 'Plantilla', key: 'name', render: (item) => `<strong>${item.name}</strong>` },
        { header: 'Marca', key: 'brand' },
        { header: 'Categoría', key: 'categoryId' },
        { header: 'Costo Ref.', render: (item) => `$${(item.pricing?.packageCost || 0).toFixed(2)}` },
        { header: 'Acciones', render: (item) => `
            <div class="list-actions">
                <button class="btn-icon btn-icon-sm" data-action="edit" data-id="${item.id}" title="Editar Plantilla"><i class="bi bi-pencil"></i></button>
                <button class="btn-icon btn-icon-sm danger" data-action="delete" data-id="${item.id}" title="Eliminar"><i class="bi bi-trash"></i></button>
            </div>
        `}
    ];

    // --- 2. CARGA DE DATOS ---
    const loadData = async () => {
        try {
            const templates = await loadGlobalTemplates();
            listController.setData(templates);
            updateTable();
        } catch (error) {
            Logger.error('Error cargando plantillas:', error);
            element.querySelector('#templates-table-container').innerHTML = EmptyState({
                icon: 'bi-wifi-off',
                message: 'No se pudieron cargar las plantillas.'
            });
        }
    };

    // --- 3. RENDERIZADO (UI) ---
    const updateTable = () => {
        const tableContainer = element.querySelector('#templates-table-container');
        const paginationContainer = element.querySelector('#templates-pagination-container');
        const titleCounter = element.querySelector("#view-title-counter");

        if (!tableContainer) return;

        const itemsToShow = listController.paginatedData;

        // Actualizar Tabla
        if (itemsToShow.length > 0) {
            tableContainer.innerHTML = DataTable({ columns, data: itemsToShow });
        } else {
            tableContainer.innerHTML = EmptyState({
                icon: 'bi-search',
                message: listController.searchTerm ? 'No se encontraron plantillas.' : 'No hay plantillas registradas.',
                instructions: listController.searchTerm ? 'Intenta con otro término.' : 'Crea la primera plantilla global.'
            });
        }

        // Actualizar Paginación
        if (paginationContainer) {
            paginationContainer.innerHTML = PaginationControls({
                currentPage: listController.currentPage,
                totalPages: listController.totalPages,
                totalItems: listController.totalItems,
                itemsPerPage: listController.itemsPerPage
            });
            paginationContainer.style.display = listController.totalItems > 0 ? 'flex' : 'none';
        }

        // Actualizar contador
        if (titleCounter) titleCounter.textContent = listController.totalItems;
    };

    const renderLayout = () => {
        // Usamos ViewHeader para consistencia visual
        const headerHTML = ViewHeader({
            title: 'Catálogo Maestro',
            subtitle: 'Plantillas globales para todos los negocios',
            icon: 'bi-globe-americas',
            actions: [
                { label: 'Actualizar', action: 'refresh', icon: 'bi-arrow-clockwise', variant: 'secondary' },
                { label: 'Nueva Plantilla', action: 'create-template', icon: 'bi-plus-lg' }
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

                <div id="templates-table-container" class="mt-4">
                    <div class="d-flex justify-content-center p-4"><div class="spinner-border text-primary"></div></div>
                </div>
                
                <div class="pagination-container" id="templates-pagination-container"></div>
            </div>
        `;

        // Conectar el buscador generado por ViewHeader
        const searchInput = element.querySelector('#view-search-input');
        if (searchInput) {
            searchInput.placeholder = "Buscar plantilla...";
            searchInput.addEventListener('input', (e) => {
                listController.setSearch(e.target.value);
                updateTable();
            });
        }
    };

    // --- 4. MANEJADORES DE EVENTOS ---
    const handleActions = async (e) => {
        const target = e.target;
        const btn = target.closest('[data-action]');
        
        // Paginación
        if (target.closest('.btn-page')) {
            listController.setPage(parseInt(target.closest('.btn-page').dataset.page));
            updateTable();
            return;
        }
        if (target.closest('#btn-next-page') && listController.currentPage < listController.totalPages) {
            listController.setPage(listController.currentPage + 1);
            updateTable();
            return;
        }
        if (target.closest('#btn-prev-page') && listController.currentPage > 1) {
            listController.setPage(listController.currentPage - 1);
            updateTable();
            return;
        }
        if (target.id === 'items-per-page') {
            listController.setItemsPerPage(parseInt(target.value));
            updateTable();
            return;
        }

        if (!btn) return;
        const action = btn.dataset.action;
        const id = btn.dataset.id;

        // Acciones Principales
        if (action === 'create-template') {
            const created = await openProductModal(null, { isGlobal: true });
            if (created) loadData();
        }

        if (action === 'refresh') {
            showToast('Actualizando catálogo...', 'info');
            loadData();
        }

        if (action === 'edit') {
            // Buscamos en los datos cargados en el controlador
            const item = listController.allData.find(t => t.id === id); // Acceso directo a allData
            if (item) {
                const updated = await openProductModal(item, { isGlobal: true });
                if (updated) loadData();
            }
        }

        if(action === 'delete') {
            const item = listController.allData.find(t => t.id === id);
            showConfirmationModal(
                'Eliminar Plantilla',
                `¿Eliminar <strong>${item.name}</strong>? Esta acción es irreversible.`,
                async () => {
                    await deleteTemplate(id);
                    showToast('Plantilla eliminada', 'success');
                    loadData();
                },
                { confirmButtonClass: 'btn-danger', confirmText: 'Sí, eliminar' }
            );
        }
    };

    // --- 5. INICIALIZACIÓN ---
    renderLayout();
    loadData();
    element.addEventListener('click', handleActions);

    return () => {
        element.removeEventListener('click', handleActions);
    };
}