// src/views/Inventory/DashboardView.js
import { EmptyState } from '../../components/EmptyState.js';
import { Logger } from '../../services/logger.service.js';
import { StatCard } from '../../components/StatCard.js'; // Podrías usar StatCard si quieres

export function InventoryDashboardView(element, state) {
    // Aquí podrías calcular algunas estadísticas básicas de inventario si quisieras
    const totalProducts = state.products.length;
    // const lowStockProducts = state.products.filter(p => p.stock?.current < p.stock?.minThreshold).length;

    element.innerHTML = `
        <div class="view-header">
            <h2 class="view-title"><i class="bi bi-box-seam me-2"></i> Resumen de Inventario</h2>
             <!--{/* Botón para ir a productos, aunque ya está en el menú contextual */} -->
            <a href="#/products" class="btn-secondary" data-route="#/products">
                 <i class="bi bi-list-task me-1"></i> Ver Lista de Productos
            </a>
        </div>

        <!--{/* Puedes añadir StatCards o un EmptyState */} -->
         <div class="panel-grid">
             ${StatCard({ title: 'Productos Registrados', value: totalProducts, icon: 'bi-boxes', className: 'productos' })}
             ${StatCard({ title: 'Productos Bajos de Stock', value: '0', icon: 'bi-exclamation-triangle-fill', className: 'inversion' })}
             ${StatCard({ title: 'Valor Estimado', value: '$0.00', icon: 'bi-calculator-fill', className: 'stock' })}
         </div>

        <!--{/* O si prefieres empezar simple: */} -->
        <!--{/* ${EmptyState({
            icon: 'bi-graph-up',
            message: 'El panel de resumen de inventario se mostrará aquí.'
        })} */} -->
    `;

    return () => {
        Logger.info('Limpiando InventoryDashboardView...');
    };
}