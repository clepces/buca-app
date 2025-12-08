// ======================================================
// ARCHIVO: src/views/Team/TeamView.js
// REGISTRO: Controlador principal del módulo de Equipo
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { state as globalState } from '../../store/state.js';
import { ROLES } from '../../services/roles.config.js';

// --- Importaciones Dinámicas (Lazy Loading) ---
const TeamSuperAdminView = () => import('./Super_admin/TeamSuperAdminView.js')
    .then(m => m.TeamSuperAdminView);

const TeamBusinessView = () => import('./Business/TeamBusinessView.js')
    .then(m => m.TeamBusinessView);

export async function TeamView(element, state) {
    let cleanupFunction = () => { };
    // Use globalState as primary source, fallback to passed state if needed
    const userRole = globalState?.session?.user?.role || state?.session?.user?.role;

    Logger.info(`[TeamView Controller] Cargando módulo para rol: ${userRole}`);

    try {
        // Spinner de carga
        element.innerHTML = `
            <div class="d-flex justify-content-center p-5">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando...</span>
                </div>
            </div>
        `;

        let ComponentToRender = null;

        switch (userRole) {
            case ROLES.SUPER_ADMIN:
                Logger.trace('-> Cargando Vista Team Super Admin');
                ComponentToRender = await TeamSuperAdminView();
                break;

            case ROLES.PROPIETARIO:
            case ROLES.OPERADOR: // Operadores también ven la vista de negocio (con permisos limitados quizás, pero misma vista base)
                Logger.trace('-> Cargando Vista Team Negocio');
                ComponentToRender = await TeamBusinessView();
                break;

            default:
                Logger.warn(`Rol '${userRole}' no reconocido. Cargando vista de negocio por defecto.`);
                ComponentToRender = await TeamBusinessView();
                break;
        }

        if (ComponentToRender) {
            element.innerHTML = ''; // Limpiar spinner
            cleanupFunction = ComponentToRender(element, state);
        } else {
            throw new Error("No se pudo cargar la vista de equipo.");
        }

    } catch (error) {
        Logger.error('[TeamView] Error fatal:', error);
        element.innerHTML = `
            <div class="alert alert-danger m-4">
                Error cargando módulo de equipo: ${error.message}
            </div>
        `;
    }

    return cleanupFunction;
}