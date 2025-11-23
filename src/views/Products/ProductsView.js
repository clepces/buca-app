// ======================================================
// ARCHIVO: src/views/Products/ProductsView.js
// PROPÓSITO: Controlador principal del módulo de Productos.
// Decide si cargar el Catálogo Maestro (Super Admin)
// o el Catálogo de Negocio (Business Admin/User).
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { state as globalState } from '../../store/state.js';
import { ROLES } from '../../services/roles.config.js';

// --- Importaciones Dinámicas (Lazy Loading) ---
const SuperAdminProductsView = () => import('./Super_admin/SuperAdminProductsView.js')
    .then(m => m.SuperAdminProductsView);

const BusinessProductsView = () => import('./Business/BusinessProductsView.js')
    .then(m => m.BusinessProductsView);

export async function ProductsView(element, state) {
    let cleanupFunction = () => {};
    const userRole = globalState.session?.user?.role;
    
    Logger.info(`[ProductsView Controller] Cargando módulo para rol: ${userRole}`);

    try {
        // Spinner de carga mientras resolvemos la vista
        element.innerHTML = '<div class="d-flex justify-content-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';
        
        let ComponentToRender = null;

        switch (userRole) {
            case ROLES.SUPER_ADMIN:
                Logger.trace('-> Cargando Catálogo Maestro (Super Admin)');
                ComponentToRender = await SuperAdminProductsView();
                break;

            case ROLES.PROPIETARIO:
            case ROLES.OPERADOR:
                Logger.trace('-> Cargando Productos de Negocio');
                ComponentToRender = await BusinessProductsView();
                break;

            default:
                Logger.warn(`Rol '${userRole}' no reconocido. Cargando vista de negocio por defecto.`);
                ComponentToRender = await BusinessProductsView();
                break;
        }

        if (ComponentToRender) {
            element.innerHTML = ''; // Limpiar spinner
            cleanupFunction = ComponentToRender(element, state);
        } else {
            throw new Error("No se pudo cargar la vista de productos.");
        }

    } catch (error) {
        Logger.error('[ProductsView] Error fatal:', error);
        element.innerHTML = `<div class="alert alert-danger">Error cargando módulo de productos: ${error.message}</div>`;
    }

    return cleanupFunction;
}