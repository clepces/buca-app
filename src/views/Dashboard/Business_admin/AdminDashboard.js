// src/views/Dashboard/Business_admin/AdminDashboard.js
import { StatCard } from '../../../components/StatCard.js';
import { Logger } from '../../../services/logger.service.js';
import { state as globalState } from '../../../store/state.js';
import { EmptyState } from '../../../components/EmptyState.js';

export function AdminDashboard(element, state) {
    const userName = globalState.session?.user?.name || 'Usuario';
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    const formatCurrency = (num) => `${symbol}${new Intl.NumberFormat('es-VE', { 
        minimumFractionDigits: 2, maximumFractionDigits: 2 
    }).format(num)}`;
    
    // Datos estáticos para las nuevas 8 tarjetas
    const stats = {
        totalSales: 120500.75,
        salesReturn: 1500.20,
        totalPurchases: 80300.00,
        purchaseReturn: 750.00,
        profit: 40200.55,
        overdueInvoices: 3200.00,
        totalExpenses: 5100.00,
        paymentReturns: 200.00
    };

    element.innerHTML = `
        <div class="view-header align-items-start mb-4">
            <div>
                <h2 class="view-title"><i class="bi bi-bar-chart-line-fill me-2"></i> Panel de Control</h2>
                <p class="dashboard-subtitle">Bienvenido, ${userName}. Resumen general de tu negocio.</p>
            </div>
            <div class="ms-auto text-end">
                 <div class="dashboard-date-picker">
                    <i class="bi bi-calendar3 me-1"></i>
                    <input type="text" id="admin-datepicker" placeholder="Seleccionar rango...">
                 </div>
            </div>
        </div>
        
        <div class="panel-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
            ${StatCard({ 
                title: 'Ventas Totales', 
                value: formatCurrency(stats.totalSales), 
                icon: 'bi-cart-check-fill', 
                className: 'productos',
                change: { value: '+12%', type: 'positive' },
                description: 'Total de ventas facturadas'
            })}
            ${StatCard({ 
                title: 'Retorno Total de Ventas', 
                value: formatCurrency(stats.salesReturn), 
                icon: 'bi-cart-x-fill', 
                className: 'ganancia',
                change: { value: '+5%', type: 'negative' },
                description: 'Total de devoluciones de clientes'
            })}
            ${StatCard({ 
                title: 'Compras Totales', 
                value: formatCurrency(stats.totalPurchases), 
                icon: 'bi-truck', 
                className: 'inversion',
                change: { value: '+8%', type: 'positive' },
                description: 'Total de compras a proveedores'
            })}
             ${StatCard({ 
                title: 'Retorno Total de Compras', 
                value: formatCurrency(stats.purchaseReturn), 
                icon: 'bi-box-arrow-left', 
                className: 'stock',
                change: { value: '+1%', type: 'negative' },
                description: 'Total de devoluciones a proveedores'
            })}
            ${StatCard({ 
                title: 'Beneficio', 
                value: formatCurrency(stats.profit), 
                icon: 'bi-graph-up-arrow', 
                className: 'productos',
                change: { value: '+15%', type: 'positive' },
                description: 'Ganancia neta (Ventas - Costos)'
            })}
            ${StatCard({ 
                title: 'Facturas Vencidas', 
                value: formatCurrency(stats.overdueInvoices), 
                icon: 'bi-file-earmark-excel-fill', 
                className: 'ganancia',
                isNegative: true,
                change: { value: '2 Pendientes', type: 'negative' },
                description: 'Facturas de clientes por cobrar'
            })}
            ${StatCard({ 
                title: 'Gastos Totales', 
                value: formatCurrency(stats.totalExpenses), 
                icon: 'bi-receipt-cutoff', 
                className: 'inversion',
                change: { value: '+3%', type: 'negative' },
                description: 'Gastos operativos (luz, agua, etc.)'
            })}
            ${StatCard({ 
                title: 'Devolución de Pagos', 
                value: formatCurrency(stats.paymentReturns), 
                icon: 'bi-cash-coin', 
                className: 'stock',
                change: { value: 'Este mes', type: 'negative' },
                description: 'Pagos devueltos o contracargos'
            })}
        </div>
        
        <div class="dashboard-grid-2-col mt-4">
            
            <div class="d-flex flex-column gap-3">
                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Ventas y Compras</h4>
                        <div class="d-flex gap-1">
                            <button class="btn-secondary btn-icon-sm" data-tippy-content="Día">1D</button>
                            <button class="btn-secondary btn-icon-sm active" data-tippy-content="Semana">1W</button>
                            <button class="btn-secondary btn-icon-sm" data-tippy-content="Mes">1M</button>
                            <button class="btn-secondary btn-icon-sm" data-tippy-content="Año">1Y</button>
                        </div>
                    </div>
                    <div class="dashboard-card-body" style="min-height: 300px;">
                        <div id="admin-sales-chart" class="chart-placeholder"></div>
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Transacciones Recientes</h4>
                        <a href="#" class="view-all-link">Ver todo</a>
                    </div>
                    <div class="dashboard-card-body">
                         ${EmptyState({ icon: 'bi-list-ul', message: 'Lista de transacciones recientes próximamente.' })}
                    </div>
                </div>
            </div>
            
            <div class="d-flex flex-column gap-3">
                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Información General</h4>
                    </div>
                    <div class="dashboard-card-body">
                        <div class="quick-action-card mb-3" style="text-align: left; padding: 1rem;">
                            <h4 style="justify-content: flex-start;"><i class="bi bi-people-fill me-2"></i> Clientes</h4>
                            <h3 class="stat-card-value" style="font-size: 1.5rem;">6,987</h3>
                        </div>
                        <div class="quick-action-card mb-3" style="text-align: left; padding: 1rem;">
                            <h4 style="justify-content: flex-start;"><i class="bi bi-truck me-2"></i> Proveedores</h4>
                            <h3 class="stat-card-value" style="font-size: 1.5rem;">4,896</h3>
                        </div>
                        <div class="quick-action-card" style="text-align: left; padding: 1rem;">
                            <h4 style="justify-content: flex-start;"><i class="bi bi-box-seam me-2"></i> Órdenes</h4>
                            <h3 class="stat-card-value" style="font-size: 1.5rem;">587</h3>
                        </div>
                    </div>
                </div>

                 <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Descripción de Clientes</h4>
                         <button class="btn-secondary btn-icon-sm" data-tippy-content="Hoy">Hoy <i class="bi bi-chevron-down ms-1"></i></button>
                    </div>
                    <div class="dashboard-card-body">
                         <div id="admin-customer-chart" class="chart-placeholder"></div>
                         <div class="d-flex justify-content-around mt-3 text-center">
                            <div>
                                <h4 class="stat-card-value mb-0" style="color: var(--primary-color);">5.5K</h4>
                                <span class="text-muted" style="font-size: 0.9rem;">Primera Vez</span>
                            </div>
                            <div>
                                <h4 class="stat-card-value mb-0" style="color: var(--bs-gray-600);">3.5K</h4>
                                <span class="text-muted" style="font-size: 0.9rem;">Devolución</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    `;

    // --- INICIO DE LÓGICA DE GRÁFICOS Y TOOLTIPS ---

    /**
     * Renderiza el gráfico de barras Agrupadas (Ventas vs Compras)
     */
    function renderSalesChart() {
        const options = {
            series: [{
                name: 'Ventas',
                data: [50, 40, 300, 220, 500, 250, 400, 230, 500, 300, 450, 350]
            }, {
                name: 'Compras',
                data: [30, 90, 40, 140, 290, 190, 250, 100, 320, 150, 200, 180]
            }],
            chart: {
                type: 'bar',
                height: 300,
                toolbar: { show: false },
                stacked: false, 
            },
            plotOptions: {
                bar: {
                    columnWidth: '60%',
                    borderRadius: 4,
                },
            },
            colors: ['var(--bs-success)', 'var(--error-color)'],
            dataLabels: { enabled: false },
            xaxis: {
                categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                labels: { style: { colors: 'var(--bs-gray-600)' } }
            },
            yaxis: {
                labels: { 
                    style: { colors: 'var(--bs-gray-600)' },
                    formatter: (val) => `${symbol}${val >= 1000 ? (val / 1000) + 'K' : val}`
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                markers: {
                    fillColors: ['var(--bs-success)', 'var(--error-color)']
                },
                labels: {
                    colors: 'var(--bs-gray-600)'
                }
            },
            tooltip: {
                y: {
                    formatter: (val) => formatCurrency(val)
                },
                theme: document.documentElement.getAttribute('data-bs-theme') || 'light'
            },
            grid: {
                borderColor: 'var(--bs-border-color)',
                strokeDashArray: 4
            }
        };

        const chart = new ApexCharts(document.querySelector("#admin-sales-chart"), options);
        chart.render();
    }
    
    /**
     * Renderiza el gráfico Donut (Clientes)
     */
    function renderCustomerChart() {
        const options = {
            series: [5500, 3500],
            chart: {
                type: 'donut',
                height: 200
            },
            labels: ['Primera Vez', 'Devolución'],
            colors: ['var(--primary-color)', 'var(--bs-gray-300)'],
             legend: { 
                show: false
            },
            dataLabels: { enabled: false },
            tooltip: {
                y: {
                    formatter: (val, { seriesIndex, w }) => {
                        // --- ¡INICIO DE CORRECCIÓN! (Añadido ?. y fallbacks) ---
                        const total = w?.globals?.series?.reduce((a, b) => a + b, 0);
                        if (!total) return `${val}`; // Fallback si el total es 0 o undefined

                        const percent = (val / total * 100).toFixed(1);
                        const label = w?.config?.labels?.[seriesIndex] || 'Data'; 
                        return `${label}: ${val} (${percent}%)`;
                        // --- FIN DE CORRECCIÓN! ---
                    }
                },
                theme: document.documentElement.getAttribute('data-bs-theme') || 'light'
            },
            plotOptions: {
                pie: {
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total',
                                formatter: function (w) {
                                    // --- ¡INICIO DE CORRECCIÓN! (Añadido ?. y fallbacks) ---
                                    const total = w?.globals?.series?.reduce((a, b) => a + b, 0);
                                    if (!total) return 0; 

                                    return total >= 1000 ? (total / 1000).toFixed(1) + 'K' : total;
                                    // --- FIN DE CORRECCIÓN! ---
                                }
                            }
                        }
                    }
                }
            }
        };
        const chart = new ApexCharts(document.querySelector("#admin-customer-chart"), options);
        chart.render();
    }

    /**
     * Función auto-ejecutable para inicializar la UI
     */
    (function initAdminUI() {
        // Usamos setTimeout para asegurar que el DOM esté listo
        setTimeout(() => {
            // 1. Inicializar Gráficos
            if (typeof ApexCharts !== 'undefined') {
                try {
                    renderSalesChart();
                    renderCustomerChart();
                    Logger.info('Gráficos del AdminDashboard renderizados.');
                } catch (e) {
                    Logger.error('Error al renderizar gráficos de ApexCharts:', e);
                    // Mostramos el error en el contenedor del gráfico
                    const salesChartEl = document.querySelector("#admin-sales-chart");
                    if(salesChartEl) salesChartEl.innerHTML = `<p class="text-danger">Error al cargar gráfico: ${e.message}</p>`;
                    const customerChartEl = document.querySelector("#admin-customer-chart");
                    if(customerChartEl) customerChartEl.innerHTML = `<p class="text-danger">Error al cargar gráfico: ${e.message}</p>`;
                }
            } else {
                Logger.warn('ApexCharts no está definido. No se pueden renderizar los gráficos.');
            }

            // 2. Inicializar Tooltips
            if (typeof tippy !== 'undefined') {
                try {
                    tippy('[data-tippy-content]', {
                        animation: 'scale-subtle',
                        theme: 'light-border',
                    });
                    Logger.info('Tooltips (tippy) inicializados.');
                } catch (e) {
                    Logger.error('Error al inicializar tippy:', e);
                }
            } else {
                Logger.warn('Tippy.js no está definido.');
            }

            // 3. Inicializar Flatpickr
            if (typeof flatpickr !== 'undefined') {
                try {
                    flatpickr.localize(flatpickr.l10ns.es);
                    flatpickr("#admin-datepicker", {
                        mode: "range",
                        dateFormat: "m/d/Y",
                        defaultDate: ["10/20/2025", "10/26/2025"],
                    });
                    Logger.info('Selector de fechas (flatpickr) inicializado.');
                } catch (e) {
                    Logger.error('Error al inicializar flatpickr:', e);
                }
            } else {
                Logger.warn('flatpickr no está definido.');
            }
        }, 100); // 100ms de retraso para asegurar que el DOM esté pintado
    })();
    
    // --- FIN DE LÓGICA ---

    return () => {
        Logger.info('Limpiando AdminDashboard...');
        // Destruimos los gráficos para liberar memoria
         const salesChartEl = document.querySelector("#admin-sales-chart");
        if (salesChartEl && salesChartEl.chart) {
            salesChartEl.chart.destroy();
        }
        const customerChartEl = document.querySelector("#admin-customer-chart");
        if (customerChartEl && customerChartEl.chart) {
            customerChartEl.chart.destroy();
        }
    };
}