// src/views/Dashboard/Business_admin/User/UserDashboard.js
import { StatCard } from '../../../components/Common/StatCard.js';
import { Logger } from '../../../services/logger.service.js';
import { getDashboardStats } from '../../../services/dashboard.service.js';
import { state as globalState } from '../../../store/state.js';

export function UserDashboard(element, state) {
    const userName = globalState.user?.name || 'Usuario';
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    const formatCurrency = (num) => `${symbol}${new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)}`;
    const stats = getDashboardStats(state.products);

    element.innerHTML = `
        <div class="dashboard-header">
            <h2 class="view-title"><i class="bi bi-grid-1x2-fill me-2"></i> Panel Principal</h2>
            <p class="dashboard-subtitle">Bienvenido, ${userName}. Resumen de tu actividad.</p>
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
                title: 'Valor Total del Stock', 
                value: formatCurrency(stats.totalStockValue), 
                icon: 'bi-boxes', 
                className: 'stock',
                change: { value: '+0%', type: 'positive' }
            })}
            ${StatCard({ 
                title: 'Acceso Rápido', 
                value: '<a href="#/inventory/products" class="btn btn-sm btn-light" data-route="#/inventory/products"><i class="bi bi-search me-1"></i> Ver Productos</a>', 
                icon: 'bi-lightning-charge-fill', 
                className: 'ganancia' 
            })}
        </div>
        
        <div class="dashboard-actions mt-4">
            <div class="row">
                <div class="col-md-4">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-search me-2"></i>Buscar Productos</h4>
                        <p>Encuentra productos rápidamente</p>
                        <a href="#/inventory/products" class="btn btn-primary" data-route="#/inventory/products">
                            <i class="bi bi-search me-1"></i>Buscar
                        </a>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-plus-circle me-2"></i>Agregar Producto</h4>
                        <p>Registra un nuevo producto</p>
                        <button class="btn btn-success" onclick="alert('Próximamente: Agregar producto')">
                            <i class="bi bi-plus me-1"></i>Agregar
                        </button>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-people me-2"></i>Clientes</h4>
                        <p>Gestiona tu base de clientes</p>
                        <a href="#/clients" class="btn btn-secondary" data-route="#/clients">
                            <i class="bi bi-people me-1"></i>Ver Clientes
                        </a>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-info mt-4">
            <div class="info-card">
                <h4><i class="bi bi-info-circle me-2"></i>Información del Sistema</h4>
                <div class="info-grid">
                    <div class="info-item">
                        <span class="info-label">Última actualización:</span>
                        <span class="info-value">${new Date().toLocaleString('es-VE')}</span>
                    </div>
                    <div class="info-item">
                        <span class="info-label">Estado del sistema:</span>
                        <span class="info-value status-active">Activo</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    return () => {
        Logger.info('Limpiando UserDashboard...');
    };
}