import { StatCard } from '../../../components/Common/StatCard.js'; // Reutilizamos las cards
import { Logger } from '../../../services/logger.service.js';

export function SuperAdminInventoryView(element) {
    
    Logger.info('[SuperAdminInventoryView] Cargando Analítica de Catálogo...');

    // Datos simulados de inteligencia (luego vendrán de Firebase)
    const stats = {
        totalGlobales: 150, // Plantillas creadas por ti
        totalPrivados: 8500, // Productos creados por clientes
        topCategoria: 'Alimentos',
        plantillasMasUsadas: 45 // % de adopción
    };

    element.innerHTML = `
    <div class="view-panel-content">
        <div class="view-header">
            <div>
                <h2 class="view-title"><i class="bi bi-graph-up-arrow me-2"></i> Inteligencia de Catálogo</h2>
                <p class="text-muted mb-0">Monitoreo del uso de productos en toda la plataforma.</p>
            </div>
            <div class="view-header-actions">
                <button class="btn-secondary" onclick="alert('Generar Reporte Global')">
                    <i class="bi bi-download me-1"></i> Reporte de Uso
                </button>
            </div>
        </div>

        <div class="panel-grid mb-4">
             ${StatCard({ 
                title: 'Plantillas Globales', 
                value: stats.totalGlobales, 
                icon: 'bi-globe-americas', 
                className: 'productos' 
             })}
             ${StatCard({ 
                title: 'Productos Privados', 
                value: stats.totalPrivados, 
                icon: 'bi-incognito', 
                className: 'stock',
                description: 'Creados por clientes'
             })}
             ${StatCard({ 
                title: 'Adopción', 
                value: stats.plantillasMasUsadas + '%', 
                icon: 'bi-check-circle', 
                className: 'ganancia',
                description: 'Clientes usan plantillas'
             })}
        </div>

        <div class="dashboard-grid-2-col">
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h4 class="dashboard-card-title">Categorías Más Populares</h4>
                </div>
                <div class="dashboard-card-body d-flex align-items-center justify-content-center" style="min-height: 200px;">
                    <p class="text-muted">Gráfico de distribución próximamente...</p>
                    </div>
            </div>

            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h4 class="dashboard-card-title">Plantillas Más Importadas</h4>
                </div>
                <ul class="dashboard-list">
                    <li class="dashboard-list-item">
                        <div class="list-item-info"><span class="list-item-title">Harina PAN 1kg</span></div>
                        <div class="list-item-value">1,204 Tiendas</div>
                    </li>
                    <li class="dashboard-list-item">
                        <div class="list-item-info"><span class="list-item-title">Coca-Cola 2L</span></div>
                        <div class="list-item-value">980 Tiendas</div>
                    </li>
                    <li class="dashboard-list-item">
                        <div class="list-item-info"><span class="list-item-title">Arroz Mary</span></div>
                        <div class="list-item-value">850 Tiendas</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `;

    return () => Logger.info('Limpiando SuperAdminInventoryView');
}