// ======================================================
// ARCHIVO: src/views/Team/Business/TeamBusinessView.js
// ACTUALIZADO: Usa modal.service y elimina código redundante
// ======================================================

import { EmptyState } from '../../../components/Common/EmptyState.js';
import { Logger } from '../../../services/logger.service.js';
import { ViewHeader } from '../../../components/Common/ViewHeader.js';
import { DataTable } from '../../../components/Common/DataTable.js';
import { ROLES } from '../../../services/roles.config.js';
import { showToast } from '../../../services/toast.service.js';

// --- CAMBIO: Importamos las funciones centralizadas del servicio ---
import { openEmployeeModal, showConfirmationModal } from '../../../services/modal.service.js';

export function TeamBusinessView(element, state) {
    try {
        Logger.info('[TeamBusinessView] Inicializando...');
        let employees = [];

        // --- 1. Definición de Columnas ---
        const columns = [
            // ... (Mismo código de columnas que tenías, no cambia) ...
            {
                header: 'Empleado',
                render: (item) => {
                    const isOwner = item.role === ROLES.PROPIETARIO;
                    const badge = isOwner ? '<span class="badge bg-primary-subtle text-primary border border-primary-subtle ms-2">Propietario</span>' : '';
                    return `
                    <div class="d-flex flex-column">
                        <span class="fw-bold text-heading d-flex align-items-center">
                            ${item.name || 'Sin nombre'} ${badge}
                        </span>
                        <small class="text-muted"><i class="bi bi-envelope me-1"></i> ${item.email}</small>
                    </div>`;
                }
            },
            {
                header: 'Cargo / Rol',
                render: (item) => `
                    <div class="d-flex flex-column">
                        <span class="fw-medium">${item.jobTitle || item.role}</span>
                        <small class="text-muted text-capitalize">${item.role}</small>
                    </div>`
            },
            {
                header: 'Contacto',
                render: (item) => item.phone ? `<span class="text-muted small"><i class="bi bi-telephone me-1"></i> ${item.phone}</span>` : '<span class="text-muted small">-</span>'
            },
            {
                header: 'Estado',
                render: (item) => item.isActive === false
                    ? `<span class="badge bg-secondary-subtle text-secondary-emphasis">Inactivo</span>`
                    : `<span class="badge bg-success-subtle text-success-emphasis">Activo</span>`
            },
            {
                header: 'Acciones',
                render: (item) => {
                    if (item.role === ROLES.PROPIETARIO) return `<small class="text-muted fst-italic">Sin acciones</small>`;

                    const suspendIcon = item.isActive === false ? 'bi-play-fill' : 'bi-pause-fill';
                    const suspendTitle = item.isActive === false ? 'Reactivar' : 'Suspender';
                    const suspendClass = item.isActive === false ? 'text-success' : 'text-warning';

                    return `
                        <div class="d-flex gap-1 justify-content-end">
                            <button class="btn-icon btn-icon-sm" data-action="edit-employee" data-id="${item.id}" title="Editar">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn-icon btn-icon-sm ${suspendClass}" data-action="toggle-status" data-id="${item.id}" title="${suspendTitle}">
                                <i class="bi ${suspendIcon}"></i>
                            </button>
                            <div class="vr mx-1 opacity-25"></div>
                            <button class="btn-icon btn-icon-sm text-danger" data-action="delete-employee" data-id="${item.id}" title="Eliminar Definitivamente">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    `;
                }
            }
        ];

        // --- 2. (ELIMINADO openEmployeeWizard local) ---
        // Ahora usaremos openEmployeeModal del servicio directamente

        // --- 3. Lógica de Acciones ---
        const handleTableActions = async (e) => {
            const btn = e.target.closest('button[data-action]');
            if (!btn) return;

            const action = btn.dataset.action;
            const id = btn.dataset.id;
            const employee = employees.find(emp => emp.id === id);

            if (!employee) return;

            // --- EDITAR ---
            if (action === 'edit-employee') {
                // CAMBIO: Llamada al servicio
                const modalClosed = await openEmployeeModal(employee);
                if (modalClosed) loadEmployees(); // Recargar si se cerró (asumimos posible cambio)
            }

            // --- SUSPENDER/REACTIVAR (Soft) ---
            if (action === 'toggle-status') {
                const newStatus = !employee.isActive;
                const actionText = newStatus ? 'reactivar' : 'suspender';

                // CAMBIO: Usamos el modal de confirmación estándar
                showConfirmationModal(
                    `¿${newStatus ? 'Reactivar' : 'Suspender'} Usuario?`,
                    `¿Estás seguro de que deseas <strong>${actionText}</strong> a ${employee.name}?`,
                    async () => {
                        try {
                            const { toggleEmployeeStatus } = await import('../../../services/employee.service.js');
                            const businessId = state?.session?.business?.id;
                            await toggleEmployeeStatus(id, newStatus, businessId);
                            showToast(`Estado actualizado correctamente`, 'success');
                            loadEmployees();
                        } catch (error) {
                            showToast('Error al cambiar estado', 'error');
                        }
                    },
                    {
                        confirmText: newStatus ? 'Reactivar' : 'Suspender',
                        confirmButtonClass: newStatus ? 'btn-success' : 'btn-warning',
                        icon: newStatus ? 'bi bi-check-circle' : 'bi bi-pause-circle text-warning'
                    }
                );
            }

            // --- ELIMINAR (Hard) ---
            if (action === 'delete-employee') {
                // CAMBIO: Usamos el modal de confirmación estándar en lugar de DeleteConfirmationModal
                showConfirmationModal(
                    'Eliminar Empleado',
                    `Esta acción eliminará permanentemente a <strong>${employee.name}</strong>.<br>Esta acción no se puede deshacer.`,
                    async () => {
                        try {
                            const { deleteEmployee } = await import('../../../services/employee.service.js');
                            const businessId = state?.session?.business?.id;
                            await deleteEmployee(id, businessId);
                            showToast('Empleado eliminado permanentemente', 'success');
                            loadEmployees();
                        } catch (error) {
                            showToast('Error al eliminar empleado', 'error');
                        }
                    },
                    { confirmButtonClass: 'btn-danger', confirmText: 'Sí, eliminar', icon: 'bi bi-exclamation-triangle-fill text-danger' }
                );
            }
        };

        // --- 4. Renderizado ---
        const render = () => {
            const headerHTML = ViewHeader({
                title: 'Mi Equipo',
                subtitle: 'Gestiona el acceso y roles de tus colaboradores',
                icon: 'bi-people-fill',
                actions: [
                    { label: 'Nuevo Empleado', action: 'create-employee', icon: 'bi-plus-lg' }
                ]
            });

            element.innerHTML = `
                <div class="view-panel-content">
                    ${headerHTML}
                    <div class="card shadow-sm mt-4">
                        <div class="card-body p-0" id="team-list-container">
                            <div class="text-center p-5"><div class="spinner-border text-primary"></div></div>
                        </div>
                    </div>
                </div>
            `;

            // Global Listeners (Header Action)
            const createBtn = element.querySelector('[data-action="create-employee"]');
            if (createBtn) {
                createBtn.addEventListener('click', async () => {
                    const closed = await openEmployeeModal(null);
                    if (closed) loadEmployees();
                });
            }

            // Table Listeners
            const container = element.querySelector('#team-list-container');
            if (container) container.addEventListener('click', handleTableActions);
        };

        // ... (loadEmployees se mantiene igual) ...
        const loadEmployees = async () => {
            // Copiar la lógica de carga de tu archivo original aquí,
            // solo asegúrate de que use el container correcto.
            // ...
            // (Para brevedad, asumo que mantienes el mismo loadEmployees)
            const container = element.querySelector('#team-list-container');
            if (!container) return;

            try {
                // ... lógica de obtención de ID y servicio ...
                let globalState = state;
                if (!globalState || !globalState.session) {
                    const store = await import('../../../store/state.js');
                    globalState = store.state;
                }
                const businessId = globalState?.session?.business?.id;
                const { getEmployees } = await import('../../../services/employee.service.js');
                employees = await getEmployees(businessId);

                if (employees && employees.length > 0) {
                    container.innerHTML = DataTable({ columns, data: employees });
                } else {
                    container.innerHTML = EmptyState({ icon: 'bi-people', message: 'No hay empleados registrados.' });
                }
            } catch (e) {
                Logger.error(e);
                container.innerHTML = '<div class="alert alert-danger">Error cargando lista.</div>';
            }
        };

        render();
        loadEmployees();

        return () => { Logger.info('Limpiando TeamBusinessView...'); };

    } catch (error) {
        Logger.error('[TeamBusinessView] Error:', error);
        element.innerHTML = `<div class="alert alert-danger">Error: ${error.message}</div>`;
        return () => { };
    }
}