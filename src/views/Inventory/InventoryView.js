// ======================================================
// ARCHIVO: src/views/Inventory/DashboardView.js
// MEJORA: (Anotación Y-14)
// 1. Rediseño completo para ser un dashboard útil.
// 2. Añade 4 tarjetas de estadísticas (incluyendo Ganancia).
// 3. Añade botones de acción (Reportes, Abastecer).
// 4. Añade layout de 2 columnas para futuros gráficos y listas.
//
// MEJORA 2 (BASADA EN TU SUGERENCIA):
// 1. Los placeholders ahora son para "Más Vendidos" y "Bajo Stock".
// ======================================================

import { EmptyState } from '../../components/EmptyState.js';
import { Logger } from '../../services/logger.service.js';
import { StatCard } from '../../components/StatCard.js';
import { getDashboardStats } from '../../services/dashboard.service.js'; // <-- Importamos el servicio
import { state as globalState } from '../../store/state.js';

export function InventoryDashboardView(element, state) {

    // --- ¡INICIO DE MEJORA! ---
    // Cargar el CSS específico de esta vista
    const loadCSS = () => {
        const viewCSS = 'src/styles/views/inventory/inventory.css'; // <-- Ruta al nuevo archivo
        if (!document.querySelector(`link[href="${viewCSS}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = viewCSS;
            document.head.appendChild(link);
        }
    };
    // --- FIN DE MEJORA ---
    
    // Obtenemos las estadísticas reales
    const stats = getDashboardStats(globalState.products);
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    
    // Formateador de moneda
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
                            /* *** INICIO DE CAMBIO *** */
                            icon: 'bi-graph-up',
                            message: 'Lista de productos más vendidos próximamente.'
                            /* *** FIN DE CAMBIO *** */
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

    // --- ¡INICIO DE MEJORA! ---
    loadCSS(); // Llamamos a la función
    // --- FIN DE MEJORA ---

    return () => {
        Logger.info('Limpiando InventoryDashboardView...');
        // --- ¡INICIO DE MEJORA! ---
        // Limpiamos el CSS al salir de la vista
        // const link = document.querySelector('link[href="src/styles/views/inventory/inventory.css"]');
        // if (link) link.remove();
        // --- FIN DE MEJORA ---
    };
}