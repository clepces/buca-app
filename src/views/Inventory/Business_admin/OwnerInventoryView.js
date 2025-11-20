// ======================================================
// ARCHIVO: src/views/Inventory/OwnerInventoryView.js
// PROPÓSITO: Dashboard de inventario para Propietarios/Operadores.
// (Anteriormente InventoryView.js)
// ======================================================

import { EmptyState } from '../../../components/Common/EmptyState.js';
import { Logger } from '../../../services/logger.service.js';
import { StatCard } from '../../../components/Common/StatCard.js';
import { getDashboardStats } from '../../../services/dashboard.service.js';
import { state as globalState } from '../../../store/state.js';

export function OwnerInventoryView(element, state) {

    // Cargar CSS específico
    const loadCSS = () => {
        const viewCSS = 'src/styles/views/inventory/inventory.css';
        if (!document.querySelector(`link[href="${viewCSS}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = viewCSS;
            document.head.appendChild(link);
        }
    };
    
    // Obtener estadísticas
    const stats = getDashboardStats(globalState.products);
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    
    const formatCurrency = (num) => `${symbol}${new Intl.NumberFormat('es-VE', { 
        minimumFractionDigits: 2, maximumFractionDigits: 2 
    }).format(num)}`;

    element.innerHTML = `
        <div class="view-panel-content">
            <div class="view-header">
                <h2 class="view-title"><i class="bi bi-pie-chart-fill me-2"></i> Resumen de Inventario</h2>
                <div class="view-header-actions">
                    <button class="btn-secondary" data-action="run-inventory-report" disabled>
                        <i class="bi bi-file-earmark-spreadsheet me-1"></i> Reporte
                    </button>
                    <button class="btn-secondary" data-action="go-to-restock" disabled>
                        <i class="bi bi-box-arrow-in-down me-1"></i> Abastecer Stock
                    </button>
                    <button class="btn-primary" data-route="#/inventory/products">
                        <i class="bi bi-list-task me-1"></i> Ver Lista de Productos
                    </button>
                </div>
            </div>

            <div class="panel-grid">
                 ${StatCard({ 
                    title: 'Productos Registrados', 
                    value: stats.totalProducts, 
                    icon: 'bi-boxes', 
                    className: 'productos' 
                 })}
                 ${StatCard({ 
                    title: 'Inversión Total', 
                    value: formatCurrency(stats.totalInvestment), 
                    icon: 'bi-cash-coin', 
                    className: 'inversion' 
                 })}
                 ${StatCard({ 
                    title: 'Valor de Stock', 
                    value: formatCurrency(stats.totalStockValue), 
                    icon: 'bi-box-seam', 
                    className: 'stock' 
                 })}
                 ${StatCard({ 
                    title: 'Ganancia Potencial', 
                    value: formatCurrency(stats.potentialProfit), 
                    icon: 'bi-graph-up-arrow', 
                    className: 'ganancia',
                    isNegative: stats.potentialProfit < 0
                 })}
             </div>
             
             <div class="dashboard-grid-2-col mt-4">
                
                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Productos Más Vendidos</h4>
                        <a href="#" class="view-all-link" data-action="view-top-selling">Ver Todos</a>
                        </div>
                    <div class="dashboard-card-body">
                        ${EmptyState({
                            icon: 'bi-graph-up',
                            message: 'Lista de productos más vendidos próximamente.'
                        })}
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Productos con Bajo Stock</h4>
                        <a href="#" class="view-all-link" data-action="view-low-stock">Ver Todos</a>
                    </div>
                    <div class="dashboard-card-body">
                        ${EmptyState({
                            icon: 'bi-exclamation-triangle',
                            message: 'No hay productos con bajo stock.'
                        })}
                        </div>
                </div>

             </div>
        </div>
    `;

    loadCSS();

    return () => {
        Logger.info('Limpiando OwnerInventoryView...');
    };
}