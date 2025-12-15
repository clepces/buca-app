// ======================================================
// ARCHIVO: src/views/GenericModuleView.js
// VERSIÓN: 1.1.0 (Diseño Custom - No Bootstrap)
// AUTOR: Clepces & IA Team
// PROPÓSITO: Controlador visual universal para módulos CRUD.
// ======================================================

import { state } from '../store/state.js';
import { loadResource, addResourceItem, updateResourceItem, deleteResourceItem } from '../store/actions.js';

// Componentes Visuales
import { DataTable } from '../components/Common/DataTable.js';
import { Button } from '../components/Common/Button.js';
import DynamicWizard from '../components/dynamic/DynamicWizard.js';

// Servicios
import { openGenericModal, showConfirmationModal } from '../services/modal.service.js';
import { showToast } from '../services/toast.service.js';

export default class GenericModuleView {
    /**
     * @param {object} config - Configuración del módulo (ej: roles.config.js)
     */
    constructor(config) {
        if (!config) throw new Error("GenericModuleView: Falta la configuración (config is undefined)");
        this.config = config;
        this.collection = config.collection;
    }

    /**
     * Método principal llamado por el Router.
     * @param {string} containerId - ID del div donde se pintará la vista.
     */
    async render(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        // 1. Limpieza inicial
        container.innerHTML = '';

        // Contenedor principal de la vista
        const viewWrapper = document.createElement('div');
        viewWrapper.className = 'generic-view-wrapper'; // Clase custom para CSS

        // 2. Construcción del Header (Título + Botón Crear)
        const header = document.createElement('div');
        header.className = 'view-header';

        const titleGroup = document.createElement('div');
        titleGroup.className = 'view-title-group';
        titleGroup.innerHTML = `
            <h2 class="view-title">${this.config.title}</h2>
            <p class="view-subtitle">${this.config.description || 'Gestión del módulo'}</p>
        `;
        header.appendChild(titleGroup);

        // Botón "Nuevo Registro" (Reutilizando Button.js)
        const createBtn = Button({
            text: 'Nuevo Registro',
            icon: 'bi-plus-lg',
            variant: 'primary',
            onClick: () => this._openModal() // Modo Crear
        });

        const btnWrapper = document.createElement('div');
        btnWrapper.className = 'view-actions';
        if (typeof createBtn === 'string') {
            btnWrapper.innerHTML = createBtn;
        } else {
            btnWrapper.appendChild(createBtn);
        }
        header.appendChild(btnWrapper);
        viewWrapper.appendChild(header);

        // 1. Contenedor de la Tabla
        const tableWrapper = document.createElement('div');
        tableWrapper.id = 'generic-table-container';
        tableWrapper.className = 'module-container'; // Estilo tarjeta de tu app
        viewWrapper.appendChild(tableWrapper);

        container.appendChild(viewWrapper);

        // --- LÓGICA DE ESTADOS (Carga / Error / Datos) ---
        const flags = state.resourceFlags?.[this.collection] || { loading: false, loaded: false };

        // 4. Si hay error -> Mostrar mensaje (PRIORIDAD ALTA: Detiene el bucle)
        if (flags.error) {
            this._renderState(tableWrapper, 'error', flags.error);
            return;
        }

        // 2. Si no hay datos y no se ha cargado -> Pedir carga
        if (!flags.loaded && !flags.loading) {
            this._renderState(tableWrapper, 'loading', 'Cargando datos...');
            await loadResource(this.collection);
            return;
        }

        // 3. Si está cargando -> Mantener spinner
        if (flags.loading) {
            this._renderState(tableWrapper, 'loading', 'Actualizando...');
            return;
        }

        // 5. Si ya cargó -> Renderizar Tabla
        this._renderTable(tableWrapper);
    }

    // Helper para renderizar estados (Carga, Error, Vacío)
    _renderState(container, type, message) {
        container.innerHTML = '';
        const stateContainer = document.createElement('div');

        if (type === 'loading') {
            stateContainer.className = 'state-container loading-state';
            stateContainer.innerHTML = `
                <div class="custom-loader"></div>
                <p>${message}</p>
            `;
        } else if (type === 'error') {
            stateContainer.className = 'state-container error-state';
            stateContainer.innerHTML = `
                <div class="error-icon-box">
                    <i class="bi bi-shield-lock-fill"></i>
                </div>
                <h3 class="error-title">Acceso Restringido</h3>
                <p class="error-desc">${message}</p>
                <div class="error-actions">
                    <button class="btn-secondary" onclick="window.location.reload()">
                        <i class="bi bi-arrow-clockwise"></i> Reintentar
                    </button>
                </div>
            `;
        }
        container.appendChild(stateContainer);
    }

    /**
     * Renderiza el componente DataTable con los datos del State.
     */
    _renderTable(container) {
        const data = state.resources[this.collection] || [];
        // Preparamos columnas. Agregamos columna de acciones si no existe.
        const columns = [...this.config.tableColumns];
        // Inyectamos acciones (Editar/Eliminar) al final
        columns.push({
            header: 'Acciones',
            render: (item) => {
                // Generamos botones HTML. Nota: DataTable usa innerHTML, así que devolvemos strings.
                // Usamos atributos data-id para capturar eventos después.
                return `
                    <div class="table-actions">
                        <button class="icon-btn edit-btn btn-edit-generic" data-id="${item.id}" title="Editar">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="icon-btn delete-btn btn-delete-generic" data-id="${item.id}" title="Eliminar">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                `;
            }
        });

        // Usamos TU componente DataTable
        const tableHTML = DataTable({ columns: columns, data: data });

        // DataTable devuelve string, lo inyectamos
        container.innerHTML = tableHTML;
        this._attachTableEvents(container, data);
    }

    _attachTableEvents(container, data) {
        container.querySelectorAll('.btn-edit-generic').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = data.find(d => d.id === btn.dataset.id);
                if (item) this._openModal(item);
            });
        });
        container.querySelectorAll('.btn-delete-generic').forEach(btn => {
            btn.addEventListener('click', () => this._handleDelete(btn.dataset.id));
        });
    }

    /**
     * Abre el modal (Modo Crear o Editar).
     * @param {object|null} itemToEdit - Si es null, es CREAR. Si tiene datos, es EDITAR.
     */
    _openModal(itemToEdit = null) {
        const isEdit = !!itemToEdit;

        // 1. Instanciar el Wizard
        // Usamos la configuración del config
        const wizard = new DynamicWizard(this.config.wizardSteps);

        // 2. Si es edición, pre-cargar los datos en el Wizard
        if (isEdit) {
            // Inyectamos los datos en el objeto formData del wizard
            wizard.formData = { ...itemToEdit };
            // (El método render del wizard leerá formData para llenar los values)
        }

        // 3. Abrir Modal Genérico
        openGenericModal({
            title: isEdit
                ? `Editar ${this.config.title.replace('Gestión de ', '')}`
                : `Crear ${this.config.title.replace('Gestión de ', '')}`,
            wizard: wizard,
            onSave: async (formData) => {
                if (isEdit) {
                    await updateResourceItem(this.collection, itemToEdit.id, formData);
                    showToast('Registro actualizado correctamente', 'success');
                } else {
                    await addResourceItem(this.collection, formData);
                    showToast('Registro creado exitosamente', 'success');
                }
                // La tabla se actualizará sola gracias a actions.js -> triggerRerender
            }
        });
    }

    /**
     * Maneja la eliminación.
     */
    _handleDelete(id) {
        showConfirmationModal('¿Eliminar?', 'Esta acción es irreversible.', async () => {
            try {
                await deleteResourceItem(this.collection, id);
                showToast('Registro eliminado', 'info');
            } catch (error) {
                showToast('Error al eliminar', 'error');
            }
        }
        );
    }
}