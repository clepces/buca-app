// ARCHIVO ACTUALIZADO: src/views/DashboardView.js

import { getDashboardStats } from '../services/dashboard.service.js';
import { StatCard } from '../components/StatCard.js';
import { Logger } from '../services/logger.service.js';
import { ROLES } from '../services/roles.config.js'; // <-- ¡IMPORTANTE!

export function DashboardView(element, state) {
    const currentUserRole = state.session.user?.roles?.[0]; // Los roles están en un array
    const businessId = state.session.business?.id;

    // 1. Vista para el Super Admin
    if (businessId === 'admin_view') {
        element.innerHTML = `
            <h2 class="view-title"><i class="fas fa-user-shield"></i> Panel de Administración</h2>
            <div class="panel-grid">
                ${StatCard({ title: 'Clientes Registrados', value: '1', icon: 'fa-store', className: 'inversion' })}
                ${StatCard({ title: 'Estado del Sistema', value: 'Operacional', icon: 'fa-server', className: 'stock' })}
            </div>
        `;
    } 
    // 2. Vista para el Cajero (comprobamos su rol directamente)
    else if (currentUserRole === ROLES.CAJERO) {
        const symbol = state.settings.currencies.principal.symbol || '$';
        element.innerHTML = `
            <h2 class="view-title"><i class="fas fa-cash-register"></i> Panel de Caja</h2>
            <div class="panel-grid">
                ${StatCard({ title: 'Ventas del Día', value: `${symbol}1,250.50`, icon: 'fa-dollar-sign', className: 'inversion' })}
                ${StatCard({ title: 'Clientes Atendidos', value: '82', icon: 'fa-users', className: 'productos' })}
                ${StatCard({ title: 'Último Cierre', value: 'Ayer, 9:30 PM', icon: 'fa-clock', className: 'stock' })}
            </div>
        `;
    } 
    // 3. Vista por defecto para el Admin del negocio
    else {
        const stats = getDashboardStats(state.products);
        const symbol = state.settings.currencies.principal.symbol || '$';
        const formatCurrency = (num) => `${symbol}${new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)}`;
        
        element.innerHTML = `
            <h2 class="view-title"><i class="fas fa-chart-pie"></i> Panel de Control</h2>
            <div class="panel-grid">
                ${StatCard({ title: 'Total de Productos', value: stats.totalProducts, icon: 'fa-box-open', className: 'productos' })}
                ${StatCard({ title: 'Inversión Total (Costo)', value: formatCurrency(stats.totalInvestment), icon: 'fa-dollar-sign', className: 'inversion' })}
                ${StatCard({ title: 'Valor Total del Stock', value: formatCurrency(stats.totalStockValue), icon: 'fa-warehouse', className: 'stock' })}
                ${StatCard({ title: 'Ganancia Potencial', value: formatCurrency(stats.potentialProfit), icon: 'fa-chart-line', className: 'ganancia' })}
            </div>
        `;
    }

    return () => {
        Logger.info('Limpiando DashboardView...');
    };
}