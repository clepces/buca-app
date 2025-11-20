// src/views/Dashboard/Business_admin/Cashier/CashierDashboard.js
import { StatCard } from '../../../components/Common/StatCard.js';
import { Logger } from '../../../services/logger.service.js';
import { state as globalState } from '../../../store/state.js';

export function CashierDashboard(element, state) {
    const userName = globalState.user?.name || 'Usuario';
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    const formatCurrency = (num) => `${symbol}${new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)}`;
    
    // Calcular estadísticas básicas del turno
    const currentHour = new Date().getHours();
    const turnoActual = currentHour < 12 ? 'Mañana' : currentHour < 18 ? 'Tarde' : 'Noche';
    const ventasDelTurno = 0; // TODO: Implementar cálculo real de ventas
    const clientesAtendidos = 0; // TODO: Implementar cálculo real de clientes

    element.innerHTML = `
        <div class="dashboard-header">
            <h2 class="view-title"><i class="bi bi-keyboard me-2"></i> Panel de Caja</h2>
            <p class="dashboard-subtitle">Bienvenido, ${userName}. Listo para registrar ventas.</p>
        </div>
        
        <div class="panel-grid">
            ${StatCard({ 
                title: 'Turno Actual', 
                value: turnoActual, 
                icon: 'bi-clock-history', 
                className: 'productos',
                change: { value: 'Activo', type: 'positive' }
            })}
            ${StatCard({ 
                title: 'Ventas del Turno', 
                value: formatCurrency(ventasDelTurno), 
                icon: 'bi-receipt', 
                className: 'inversion',
                change: { value: '+0%', type: 'positive' }
            })}
            ${StatCard({ 
                title: 'Clientes Atendidos', 
                value: clientesAtendidos.toString(), 
                icon: 'bi-person-check-fill', 
                className: 'stock',
                change: { value: 'Hoy', type: 'positive' }
            })}
            ${StatCard({ 
                title: 'Acceso Rápido', 
                value: '<a href="#/pos" class="btn btn-sm btn-light" data-route="#/pos"><i class="bi bi-cart-plus-fill me-1"></i> Ir a Caja</a>', 
                icon: 'bi-lightning-charge-fill', 
                className: 'ganancia' 
            })}
        </div>
        
        <div class="dashboard-actions mt-4">
            <div class="row">
                <div class="col-md-6">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-cash-coin me-2"></i>Venta Rápida</h4>
                        <p>Inicia una nueva venta directamente</p>
                        <a href="#/pos" class="btn btn-primary" data-route="#/pos">
                            <i class="bi bi-plus-circle me-1"></i>Nueva Venta
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-clock-history me-2"></i>Historial</h4>
                        <p>Revisa las ventas del día</p>
                        <button class="btn btn-secondary" onclick="alert('Próximamente: Historial de ventas')">
                            <i class="bi bi-list-ul me-1"></i>Ver Historial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;

    return () => {
        Logger.info('Limpiando CashierDashboard...');
    };
}