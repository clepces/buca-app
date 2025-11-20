// ======================================================
// ARCHIVO: src/views/Dashboard/DashboardView.js
// PROPÓSITO: Controlador principal del Dashboard.
// MEJORA: Carga robusta con manejo de errores y switch.
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { state as globalState } from '../../store/state.js';
import { ROLES } from '../../services/roles.config.js';

// --- Importaciones Dinámicas (Lazy Loading) ---
const SuperAdminDashboard = () => import('./Super_admin/SuperAdminDashboard.js').then(m => m.SuperAdminDashboard);
const AdminDashboard = () => import('./Business_admin/AdminDashboard.js').then(m => m.AdminDashboard);
const CashierDashboard = () => import('./Cashier/CashierDashboard.js').then(m => m.CashierDashboard);
const UserDashboard = () => import('./User/UserDashboard.js').then(m => m.UserDashboard);

export async function DashboardView(element, state) {
    let cleanupFunction = () => {};
    
    // 1. Obtener Rol
    const userRole = globalState.session?.user?.role;
    Logger.info(`[DashboardView] Iniciando carga para rol: ${userRole}`);

    try {
        // 2. Spinner de carga local (opcional, para mejor UX instantánea)
        element.innerHTML = '<div class="d-flex justify-content-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';

        let DashboardComponent = null;

        // 3. Selección de Componente según Rol (Switch Escalable)
        switch (userRole) {
            case ROLES.SUPER_ADMIN:
                Logger.trace('-> Cargando Dashboard de Super Admin');
                DashboardComponent = await SuperAdminDashboard();
                break;

            case ROLES.PROPIETARIO:
                Logger.trace('-> Cargando Dashboard de Propietario');
                DashboardComponent = await AdminDashboard();
                break;

            case ROLES.CAJERO:
                Logger.trace('-> Cargando Dashboard de Cajero');
                DashboardComponent = await CashierDashboard();
                break;

            case ROLES.OPERADOR:
                Logger.trace('-> Cargando Dashboard de Operador');
                DashboardComponent = await UserDashboard();
                break;

            default:
                Logger.warn(`Rol '${userRole}' no reconocido. Cargando Dashboard por defecto.`);
                DashboardComponent = await UserDashboard();
                break;
        }

        // 4. Renderizado Seguro
        if (DashboardComponent) {
            element.innerHTML = ''; // Limpiar spinner
            cleanupFunction = DashboardComponent(element, globalState);
        } else {
            throw new Error("El componente del dashboard no se pudo cargar.");
        }

    } catch (error) {
        // 5. Manejo de Errores (UI de Fallo)
        Logger.error('[DashboardView] Error Crítico:', error);
        renderErrorState(element, error);
    }

    return cleanupFunction;
}

// Helper para renderizar el error
function renderErrorState(element, error) {
    element.innerHTML = `
        <div class="p-5 text-center">
            <i class="bi bi-exclamation-octagon text-danger" style="font-size: 3rem;"></i>
            <h3 class="mt-3">Error al cargar el Panel</h3>
            <p class="text-muted">No pudimos cargar tu dashboard. Por favor, verifica tu conexión.</p>
            <p class="small text-danger mb-4">${error.message || 'Error desconocido'}</p>
            <button class="btn btn-secondary" onclick="window.location.reload()">
                <i class="bi bi-arrow-clockwise"></i> Recargar Página
            </button>
        </div>
    `;
}