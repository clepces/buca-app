// ======================================================
// ARCHIVO: src/views/Inventory/InventoryView.js
// PROPÓSITO: Controlador principal de Inventario.
// ESTRUCTURA: Carpetas separadas por rol.
// ======================================================

import { state as globalState } from '../../store/state.js';
import { ROLES } from '../../services/roles.config.js';
import { Logger } from '../../services/logger.service.js';

// --- Importaciones Dinámicas (Rutas Actualizadas) ---

// 1. Vista para Super Admin (Catálogo Global)
const SuperAdminInventoryView = () => import('./Super_admin/SuperAdminInventoryView.js')
    .then(m => m.SuperAdminInventoryView);

// 2. Vista para Propietario/Admin (Dashboard de Inventario)
const OwnerInventoryView = () => import('./Business_admin/OwnerInventoryView.js')
    .then(m => m.OwnerInventoryView);

export async function InventoryDashboardView(element, state) {
    let cleanupFunction = () => {};
    const userRole = globalState.session?.user?.role;
    Logger.info(`[InventoryView] Iniciando módulo para: ${userRole}`);

    try {
        // Spinner de carga inicial
        element.innerHTML = '<div class="d-flex justify-content-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';
        
        let ComponentToRender = null;

        switch (userRole) {
            case ROLES.SUPER_ADMIN:
                Logger.trace('-> Ruta: /Super_admin/SuperAdminInventoryView');
                ComponentToRender = await SuperAdminInventoryView();
                break;

            case ROLES.PROPIETARIO:
            case ROLES.OPERADOR: // El operador suele ver lo mismo o una versión reducida
                Logger.trace('-> Ruta: /Business_admin/OwnerInventoryView');
                ComponentToRender = await OwnerInventoryView();
                break;

            default:
                Logger.warn(`Rol '${userRole}' no tiene vista asignada. Usando vista de negocio por defecto.`);
                ComponentToRender = await OwnerInventoryView();
                break;
        }

        if (ComponentToRender) {
            element.innerHTML = ''; // Limpiar spinner
            cleanupFunction = ComponentToRender(element, state);
        } else {
            throw new Error("No se encontró el componente de inventario para este rol.");
        }

    } catch (error) {
        Logger.error('[InventoryView] Error fatal cargando vistas:', error);
        element.innerHTML = `
            <div class="p-5 text-center">
                <i class="bi bi-box-seam text-danger" style="font-size: 3rem;"></i>
                <h3 class="mt-3">Error de Módulo</h3>
                <p class="text-muted">No pudimos cargar la sección de inventario.</p>
                <div class="alert alert-danger d-inline-block mt-2 py-1 px-3">${error.message}</div>
                <div class="mt-3">
                    <button class="btn btn-primary" onclick="window.location.reload()">
                        <i class="bi bi-arrow-clockwise me-1"></i> Reintentar
                    </button>
                </div>
            </div>
        `;
    }

    return cleanupFunction;
}