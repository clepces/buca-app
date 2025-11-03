// ======================================================
// ARCHIVO: src/views/Dashboard/DashboardView.js
// VERSION APP: 3.0.0 - MODULE:CORE: 1.1.0 - FILE: 1.0.2
// CORRECCIÓN: (Refactorización de Roles)
// 1. Se importa 'ROLES' desde 'roles.config.js'.
// 2. Se actualiza el 'switch' para usar los nuevos
//    nombres de roles (Propietario, Operador, Cajero).
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { state as globalState } from '../../store/state.js';

// --- ¡INICIO DE CORRECCIÓN! ---
import { ROLES } from '../../services/roles.config.js';
// --- FIN DE CORRECCIÓN! ---

// Importaciones dinámicas para cada dashboard
const SuperAdminDashboard = () => import('./Super_admin/SuperAdminDashboard.js').then(m => m.SuperAdminDashboard);
const AdminDashboard = () => import('./Business_admin/AdminDashboard.js').then(m => m.AdminDashboard);
const CashierDashboard = () => import('./Cashier/CashierDashboard.js').then(m => m.CashierDashboard);
const UserDashboard = () => import('./User/UserDashboard.js').then(m => m.UserDashboard);

export async function DashboardView(element, state) {
    let cleanupFunction = () => {};
    
    // --- ¡INICIO DE CORRECCIÓN! ---
    const userRole = globalState.session?.user?.role;
    Logger.trace(`[DashboardView] Despachando dashboard para el rol: ${userRole}`);
    // --- FIN DE CORRECCIÓN ---

    let DashboardComponent;

    // --- ¡INICIO DE CORRECCIÓN! ---
    // Actualizamos los 'case' a los nuevos roles
    switch (userRole) {
        case ROLES.SUPER_ADMIN:
            DashboardComponent = await SuperAdminDashboard();
            break;
        case ROLES.PROPIETARIO: // Antes: 'admin'
            DashboardComponent = await AdminDashboard();
            break;
        case ROLES.CAJERO: // Antes: 'cajero'
            DashboardComponent = await CashierDashboard();
            break;
        case ROLES.OPERADOR: // Antes: 'user'
            DashboardComponent = await UserDashboard();
            break;
        default:
            Logger.warn(`Rol desconocido o sin dashboard específico: '${userRole}'. Mostrando dashboard de Operador.`);
            DashboardComponent = await UserDashboard(); // El default es el dashboard más simple
            break;
    }

    if (DashboardComponent) {
        // Renderiza el dashboard específico y guarda su función de limpieza
        cleanupFunction = DashboardComponent(element, globalState);
    } else {
        element.innerHTML = '<p>Error al cargar el dashboard.</p>';
        Logger.error(`No se pudo cargar el componente de dashboard para el rol: ${userRole}`);
    }

    // Devuelve la función de limpieza del dashboard cargado
    return cleanupFunction;
}