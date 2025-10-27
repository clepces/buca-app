// src/views/Dashboard/AdminDashboard.js
import { StatCard } from '../../../components/StatCard.js';
import { Logger } from '../../../services/logger.service.js';
import { getDashboardStats } from '../../../services/dashboard.service.js'; // Importar stats
import { state as globalState } from '../../../store/state.js';

export function AdminDashboard(element, state) {
    const userName = globalState.user?.name || 'Usuario';
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    const formatCurrency = (num) => `${symbol}${new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)}`;
    const stats = getDashboardStats(state.products); // Calcular stats aquí

    element.innerHTML = `
        <div class="dashboard-header">
            <h2 class="view-title"><i class="bi bi-speedometer2 me-2"></i> Panel de Control</h2>
            <p class="dashboard-subtitle">Bienvenido, ${userName}. Resumen general de tu negocio.</p>
        </div>
        
        <div class="panel-grid">
            ${StatCard({ 
                title: 'Total de Productos', 
                value: stats.totalProducts, 
                icon: 'bi-box-seam', 
                className: 'productos',
                change: { value: '+0', type: 'positive' }
            })}
            ${StatCard({ 
                title: 'Inversión Total (Costo)', 
                value: formatCurrency(stats.totalInvestment), 
                icon: 'bi-cash-coin', 
                className: 'inversion',
                change: { value: '+0%', type: 'positive' }
            })}
            ${StatCard({ 
                title: 'Valor Total del Stock', 
                value: formatCurrency(stats.totalStockValue), 
                icon: 'bi-boxes', 
                className: 'stock',
                change: { value: '+0%', type: 'positive' }
            })}
            ${StatCard({ 
                title: 'Ganancia Potencial', 
                value: formatCurrency(stats.potentialProfit), 
                icon: 'bi-graph-up-arrow', 
                className: 'ganancia', 
                isNegative: stats.potentialProfit < 0,
                change: { value: stats.potentialProfit >= 0 ? '+0%' : '-0%', type: stats.potentialProfit >= 0 ? 'positive' : 'negative' }
            })}
        </div>
        
        <div class="dashboard-actions mt-4">
            <div class="row">
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-box-seam me-2"></i>Inventario</h4>
                        <p>Gestiona tu inventario</p>
                        <a href="#/inventory/products" class="btn btn-primary" data-route="#/inventory/products">
                            <i class="bi bi-boxes me-1"></i>Ver Inventario
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-cart-plus me-2"></i>Punto de Venta</h4>
                        <p>Procesa ventas rápidamente</p>
                        <a href="#/pos" class="btn btn-success" data-route="#/pos">
                            <i class="bi bi-cash-coin me-1"></i>Ir a POS
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-people me-2"></i>Clientes</h4>
                        <p>Administra tu base de clientes</p>
                        <a href="#/clients" class="btn btn-secondary" data-route="#/clients">
                            <i class="bi bi-person-lines-fill me-1"></i>Ver Clientes
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-gear me-2"></i>Configuración</h4>
                        <p>Ajusta la configuración</p>
                        <button class="btn btn-warning" onclick="alert('Próximamente: Configuración')">
                            <i class="bi bi-sliders me-1"></i>Configurar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-analytics mt-4">
            <div class="row">
                <div class="col-md-6">
                    <div class="analytics-card">
                        <h4><i class="bi bi-graph-up me-2"></i>Resumen Financiero</h4>
                        <div class="analytics-grid">
                            <div class="analytics-item">
                                <span class="analytics-label">Margen de Ganancia:</span>
                                <span class="analytics-value ${stats.totalInvestment > 0 ? (stats.potentialProfit / stats.totalInvestment * 100) >= 0 ? 'positive' : 'negative' : 'neutral'}">
                                    ${stats.totalInvestment > 0 ? ((stats.potentialProfit / stats.totalInvestment) * 100).toFixed(1) : '0'}%
                                </span>
                            </div>
                            <div class="analytics-item">
                                <span class="analytics-label">Valor Promedio por Producto:</span>
                                <span class="analytics-value">
                                    ${stats.totalProducts > 0 ? formatCurrency(stats.totalStockValue / stats.totalProducts) : formatCurrency(0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="analytics-card">
                        <h4><i class="bi bi-info-circle me-2"></i>Estado del Sistema</h4>
                        <div class="analytics-grid">
                            <div class="analytics-item">
                                <span class="analytics-label">Última actualización:</span>
                                <span class="analytics-value">${new Date().toLocaleString('es-VE')}</span>
                            </div>
                            <div class="analytics-item">
                                <span class="analytics-label">Estado:</span>
                                <span class="analytics-value status-active">Operativo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return () => {
        Logger.info('Limpiando AdminDashboard...');
    };
}