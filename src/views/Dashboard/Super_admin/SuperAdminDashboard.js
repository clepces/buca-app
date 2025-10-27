// src/views/Dashboard/SuperAdminDashboard.js
import { StatCard } from '../../../components/StatCard.js';
import { Logger } from '../../../services/logger.service.js';
import { state as globalState } from '../../../store/state.js'; // Necesitamos el estado global aquí

export function SuperAdminDashboard(element, state) {
    const userName = globalState.user?.name || 'Usuario'; // Usar globalState o state pasado
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    const formatCurrency = (num) => `${symbol}${new Intl.NumberFormat('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(num)}`;

    const today = new Date();
    const formattedDate = today.toLocaleDateString('es-VE', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const ordersPlaceholder = '0';
    const newCompaniesPlaceholder = '0';
    const companiesPlaceholder = '0';
    const activeCompaniesPlaceholder = '0';
    const subscribersPlaceholder = '0';
    const earningsPlaceholder = formatCurrency(0);

    element.innerHTML = `
        <div class="view-header align-items-start mb-4">
            <div>
                <h2 class="view-title mb-1"><i class="bi bi-shield-lock-fill me-2"></i> Welcome, Admin</h2>
                <p class="text-muted mb-0">
                    Tienes <strong class="text-success">${ordersPlaceholder}+</strong> pedidos hoy. |
                    <strong class="text-primary">${newCompaniesPlaceholder}</strong> Nuevas Compañías Suscritas Hoy!
                </p>
            </div>
            <div class="ms-auto text-end">
                 <span class="badge bg-light text-dark p-2">
                     <i class="bi bi-calendar3 me-1"></i> ${formattedDate}
                 </span>
            </div>
        </div>

        <div class="panel-grid">
            ${StatCard({
                title: 'Total Empresas',
                value: companiesPlaceholder,
                icon: 'bi-building',
                className: 'stat-card-companies',
                change: { value: '+19.01%', type: 'positive' },
                miniGraph: true
            })}
             ${StatCard({
                title: 'Empresas Activas',
                value: activeCompaniesPlaceholder,
                icon: 'bi-building-check',
                className: 'stat-card-active-companies',
                change: { value: '-12%', type: 'negative' },
                miniGraph: true
            })}
             ${StatCard({
                title: 'Total Suscriptores',
                value: subscribersPlaceholder,
                icon: 'bi-person-badge',
                className: 'stat-card-subscribers',
                change: { value: '+6%', type: 'positive' },
                miniGraph: true
            })}
             ${StatCard({
                title: 'Ganancias Totales',
                value: earningsPlaceholder,
                icon: 'bi-currency-dollar',
                className: 'stat-card-earnings',
                change: { value: '-14%', type: 'negative' },
                miniGraph: true
            })}
        </div>
        
        <div class="dashboard-actions mt-4">
            <div class="row">
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-building me-2"></i>Gestionar Empresas</h4>
                        <p>Administra todas las empresas del sistema</p>
                        <button class="btn btn-primary" onclick="alert('Próximamente: Gestión de empresas')">
                            <i class="bi bi-building me-1"></i>Gestionar
                        </button>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-people me-2"></i>Usuarios</h4>
                        <p>Administra usuarios y permisos</p>
                        <button class="btn btn-success" onclick="alert('Próximamente: Gestión de usuarios')">
                            <i class="bi bi-person-gear me-1"></i>Usuarios
                        </button>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-graph-up me-2"></i>Reportes</h4>
                        <p>Genera reportes del sistema</p>
                        <button class="btn btn-secondary" onclick="alert('Próximamente: Reportes')">
                            <i class="bi bi-file-earmark-bar-graph me-1"></i>Reportes
                        </button>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-gear me-2"></i>Configuración</h4>
                        <p>Configuración del sistema</p>
                        <button class="btn btn-warning" onclick="alert('Próximamente: Configuración del sistema')">
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
                        <h4><i class="bi bi-graph-up me-2"></i>Métricas del Sistema</h4>
                        <div class="analytics-grid">
                            <div class="analytics-item">
                                <span class="analytics-label">Uptime del Sistema:</span>
                                <span class="analytics-value positive">99.9%</span>
                            </div>
                            <div class="analytics-item">
                                <span class="analytics-label">Empresas Activas:</span>
                                <span class="analytics-value">${activeCompaniesPlaceholder}</span>
                            </div>
                            <div class="analytics-item">
                                <span class="analytics-label">Crecimiento Mensual:</span>
                                <span class="analytics-value positive">+12.5%</span>
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
                                <span class="analytics-label">Estado del servidor:</span>
                                <span class="analytics-value status-active">Operativo</span>
                            </div>
                            <div class="analytics-item">
                                <span class="analytics-label">Versión del sistema:</span>
                                <span class="analytics-value">v3.0.0</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    return () => {
        Logger.info('Limpiando SuperAdminDashboard...');
    };
}