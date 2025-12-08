// ======================================================
// ARCHIVO: src/views/People/ClientsView.js
// PROPÓSITO: Controlador principal del módulo de Clientes.
// ESTRUCTURA: Carga dinámica según rol (Super Admin vs Negocio).
// ======================================================
import { state as globalState } from '../../store/state.js';
import { ROLES } from '../../services/roles.config.js';
import { Logger } from '../../services/logger.service.js';

// --- Importaciones Dinámicas ---
const SuperAdminClientsView = () => import('./Super_admin/SuperAdminClientsView.js')
    .then(m => m.SuperAdminClientsView);
const BusinessClientsView = () => import('./Business/BusinessClientsView.js')
    .then(m => m.BusinessClientsView);
export async function ClientsView(element, state) {
    let cleanupFunction = () => { };
    const userRole = globalState.session?.user?.role;
    Logger.info(`[ClientsView] Iniciando módulo para: ${userRole}`);
    try {
        // Spinner de carga inicial
        element.innerHTML = '<div class="d-flex justify-content-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';
        let ComponentToRender = null;
        switch (userRole) {
            case ROLES.SUPER_ADMIN:
                Logger.trace('-> Cargando Vista Clientes Super Admin');
                ComponentToRender = await SuperAdminClientsView();
                break;
            case ROLES.PROPIETARIO:
            case ROLES.OPERADOR:
            case ROLES.CAJERO:
                Logger.trace('-> Cargando Vista Clientes Negocio');
                ComponentToRender = await BusinessClientsView();
                break;
            default:
                Logger.warn(`Rol '${userRole}' no reconocido. Cargando vista de negocio por defecto.`);
                ComponentToRender = await BusinessClientsView();
                break;
        }
        if (ComponentToRender) {
            element.innerHTML = ''; // Limpiar spinner
            cleanupFunction = ComponentToRender(element, state);
        } else {
            throw new Error("No se pudo cargar la vista de clientes.");
        }
    } catch (error) {
        Logger.error('[ClientsView] Error fatal:', error);
        element.innerHTML = `
        <div class="alert alert-danger m-4">
            <i class="bi bi-exclamation-triangle-fill me-2"></i>
            Error cargando el módulo de clientes: ${error.message}
        </div>
    `;
    }
    return cleanupFunction;
}
