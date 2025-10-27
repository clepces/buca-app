// src/views/Dashboard/DashboardView.js (¡Ahora es el Dispatcher!)
import { Logger } from '../../services/logger.service.js';
import { ROLES } from '../../services/roles.config.js';
import { state as globalState } from '../../store/state.js';

// Hacemos la función async para poder usar await con import()
export async function DashboardView(element, state) {
    const currentUserRole = globalState.role; // Obtenemos el rol del estado global
    let cleanupFunction = () => {}; // Función de limpieza por defecto

    element.innerHTML = '<p>Cargando panel...</p>'; // Mensaje mientras carga

    try {
        let DashboardComponentModule; // Variable para guardar el módulo importado

        // Usamos un switch para cargar dinámicamente el componente correcto
        switch (currentUserRole) {
            case ROLES.SUPER_ADMIN:
                // Importa dinámicamente el componente específico
                DashboardComponentModule = await import('./Super_admin/SuperAdminDashboard.js');
                // Llama a la función exportada del módulo, pasando element y state
                cleanupFunction = DashboardComponentModule.SuperAdminDashboard(element, state);
                break;
            case ROLES.ADMIN:
                DashboardComponentModule = await import('./Business_admin/AdminDashboard.js');
                cleanupFunction = DashboardComponentModule.AdminDashboard(element, state);
                break;
            case ROLES.CAJERO:
                DashboardComponentModule = await import('./Cashier/CashierDashboard.js');
                cleanupFunction = DashboardComponentModule.CashierDashboard(element, state);
                break;
            case ROLES.USER:
            default: // Caso por defecto (o si es USER explícitamente)
                DashboardComponentModule = await import('./User/UserDashboard.js');
                cleanupFunction = DashboardComponentModule.UserDashboard(element, state);
                if (currentUserRole !== ROLES.USER) {
                    // Log si el rol no era esperado pero caímos en el default
                    Logger.warn(`Rol desconocido o sin dashboard específico: '${currentUserRole}'. Mostrando dashboard de Usuario.`);
                }
                break;
        }
    } catch (error) {
        // Manejo de errores si falla la importación dinámica o la ejecución del componente
        Logger.error(`Error al cargar el dashboard para el rol ${currentUserRole}:`, error);
        element.innerHTML = '<p class="text-danger">Error al cargar el panel principal. Por favor, recarga la página.</p>';
        cleanupFunction = () => { Logger.error("Limpiando vista de error del Dashboard.");}; // Limpieza simple para el error
    }

    // Retornamos la función de limpieza específica del componente cargado (o la de error)
    return cleanupFunction;
}