// ======================================================
// ARCHIVO: src/views/Dashboard/DashboardView.js
// VERSION APP: 3.0.0 - MODULE:{NAME}: 1.0.1 - FILE: 1.0.1
// CORRECCIÓN: (Anotación J-2)
// 1. Lee el rol desde 'globalState.session.user.role'
//    en lugar de 'globalState.role'.
// ======================================================

import { Logger } from '../../services/logger.service.js';
import { state as globalState } from '../../store/state.js';

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

    switch (userRole) {
        case 'super_admin':
            DashboardComponent = await SuperAdminDashboard();
            break;
        case 'admin':
            DashboardComponent = await AdminDashboard();
            break;
        case 'cajero':
            DashboardComponent = await CashierDashboard();
            break;
        case 'user':
            DashboardComponent = await UserDashboard();
            break;
        default:
            // Este es el warning que viste en la consola
            Logger.warn(`Rol desconocido o sin dashboard específico: '${userRole}'. Mostrando dashboard de Usuario.`);
            DashboardComponent = await UserDashboard();
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