// ==========================================================================
// ARCHIVO: src/views/Dashboard/Super_admin/SuperAdminDashboard.js
// VERSIÓN 3.1: Conectado a datos reales (loadAllBusinesses)
// ==========================================================================
import { StatCard } from '../../../components/Common/StatCard.js';
import { Logger } from '../../../services/logger.service.js';
import { state as globalState } from '../../../store/state.js';
import { initTippy, destroyTippy } from '../../../utils/tippy-helper.js';
// --- ¡NUEVAS IMPORTACIONES! ---
import { loadAllBusinesses } from '../../../services/storage.service.js';
import { EmptyState } from '../../../components/Common/EmptyState.js';

export function SuperAdminDashboard(element, state) {
    const userName = globalState.session?.user?.name || 'Admin';
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    
    // --- Estado local de la vista ---
    const viewState = {
        stats: {
            total: 0,
            active: 0,
            inactive: 0,
            subscribers: 0, // Aún no tenemos este dato real
            earnings: 0.00 // Aún no tenemos este dato real
        },
        graphs: {
            companies: [10, 41, 35, 51, 62],
            active: [8, 30, 30, 40, 50],
            subscribers: [5, 20, 15, 25, 30],
            earnings: [10, 15, 12, 18, 25]
        }
    };
    
    // --- DATOS REALES (PENDIENTES) ---
    const subscribersPlaceholder = '0'; // Mantenemos placeholder
    const earningsPlaceholder = `${symbol}0,00`; // Mantenemos placeholder

    element.innerHTML = `
    <div class="view-panel-content">

        <div class="view-header align-items-start mb-4">
            <div>
                <h2 class="view-title mb-1"><i class="bi bi-shield-lock-fill me-2"></i> Panel de Super Admin</h2>
                <p class="text-muted mb-0">Bienvenido, ${userName}. Resumen del estado de la plataforma.</p>
            </div>
            <div class="ms-auto text-end">
                 <div class="dashboard-date-picker">
                    <i class="bi bi-calendar3"></i>
                    <input type="text" id="superadmin-datepicker" placeholder="Seleccionar rango...">
                 </div>
            </div>
        </div>

        <div class="panel-grid mb-4">
            ${StatCard({
                id: 'stat-total-companies', // <-- AÑADIR ID
                title: 'Total Companies',
                value: '...', // <-- Valor inicial
                icon: 'bi-building',
                className: 'stat-card-companies', 
                change: { value: '+0', type: 'positive' },
                description: 'Total de negocios registrados',
                miniGraphData: viewState.graphs.companies
            })}
             ${StatCard({
                id: 'stat-active-companies', // <-- AÑADIR ID
                title: 'Active Companies',
                value: '...', // <-- Valor inicial
                icon: 'bi-building-check',
                className: 'stat-card-active-companies',
                change: { value: '+0', type: 'positive' },
                description: 'Negocios con plan activo',
                miniGraphData: viewState.graphs.active 
            })}
             ${StatCard({
                id: 'stat-total-subscribers', // <-- AÑADIR ID
                title: 'Total Subscribers',
                value: subscribersPlaceholder, // <-- Mantenemos placeholder
                icon: 'bi-person-badge',
                className: 'stat-card-subscribers',
                change: { value: '+0%', type: 'positive' },
                description: 'desde el último mes',
                miniGraphData: viewState.graphs.subscribers
            })}
             ${StatCard({
                id: 'stat-total-earnings', // <-- AÑADIR ID
                title: 'Total Earnings',
                value: earningsPlaceholder, // <-- Mantenemos placeholder
                icon: 'bi-currency-dollar',
                className: 'stat-card-earnings',
                change: { value: '-14%', type: 'negative' },
                description: 'desde el último mes',
                miniGraphData: viewState.graphs.earnings
            })}
        </div>
        
        <div class="dashboard-analytics mb-4">
            <div class="row" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                <div class="dashboard-card h-100">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Companies</h4>
                        <span class="badge bg-light-subtle text-dark">This Week</span>
                    </div>
                    <div class="dashboard-card-body">
                        <div id="companies-chart" class="chart-placeholder"></div>
                    </div>
                </div>

                <div class="dashboard-card h-100">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Revenue</h4>
                        <span class="badge bg-light-subtle text-dark">2025</span>
                    </div>
                    <div class="dashboard-card-body">
                        <div id="revenue-chart" class="chart-placeholder"></div>
                    </div>
                </div>

                <div class="dashboard-card h-100">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Top Plans</h4>
                        <span class="badge bg-light-subtle text-dark">This Month</span>
                    </div>
                    <div class="dashboard-card-body">
                        <div id="plans-chart" class="chart-placeholder" style="min-height: 365px;"></div>
                    </div>
                </div>
            </div>
        </div>

        <div class="dashboard-analytics">
             <div class="row" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                <div class="dashboard-card h-100">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Recent Transactions</h4>
                        <a href="#" class="view-all-link">View All</a>
                    </div>
                    <ul class="dashboard-list">
                        ${renderListItem('Stellar Dynamics', '#12457', '+$245', 'Basic', 'list-avatar-1')}
                        ${renderListItem('Quantum Nexus', 'payment', '+$395', 'Enterprise', 'list-avatar-2')}
                        ${renderListItem('Aurora Technologies', '#43412', '+$145', 'Premium', 'list-avatar-3')}
                        ${renderListItem('TerraFusion Energy', '#43412', '+$1145', 'Enterprise', 'list-avatar-4')}
                        ${renderListItem('Epicurean Delights', '#43412', '+$597', 'Premium', 'list-avatar-5')}
                    </ul>
                </div>

                <div class="dashboard-card h-100">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Recently Registered</h4>
                        <a href="#" class="view-all-link">View All</a>
                    </div>
                    <ul class="dashboard-list">
                        ${renderListItem('Pitch', 'Basic (Monthly)', '150 Users', '', 'list-avatar-6')}
                        ${renderListItem('Initech', 'Enterprise (Yearly)', '420 Users', '', 'list-avatar-7')}
                        ${renderListItem('Umbrella Corp', 'Premium (Yearly)', '129 Users', '', 'list-avatar-8')}
                        ${renderListItem('Capital Partners', 'Enterprise (Monthly)', '103 Users', '', 'list-avatar-9')}
                    </ul>
                </div>

                <div class="dashboard-card h-100">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Recent Plan Expired</h4>
                        <a href="#" class="view-all-link">View All</a>
                    </div>
                    <ul class="dashboard-list">
                        ${renderListItem('Silicon Corp', 'Expired - 10 Apr 2025', 'Send Reminder', '', 'list-avatar-3', true)}
                        ${renderListItem('Hubspot', 'Expired - 12 Jun 2025', 'Send Reminder', '', 'list-avatar-1', true)}
                        ${renderListItem('Licon Industries', 'Expired - 12 May 2025', 'Send Reminder', '', 'list-avatar-2', true)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;

    // --- ¡NUEVAS FUNCIONES DE CARGA Y ACTUALIZACIÓN! ---

    /**
     * Actualiza los valores de las StatCards en el DOM.
     */
    function updateStatCards() {
        const totalEl = element.querySelector('#stat-total-companies .stat-card-value');
        const activeEl = element.querySelector('#stat-active-companies .stat-card-value');
        // const subsEl = element.querySelector('#stat-total-subscribers .stat-card-value');
        // const earnEl = element.querySelector('#stat-total-earnings .stat-card-value');

        if (totalEl) totalEl.textContent = viewState.stats.total;
        if (activeEl) activeEl.textContent = viewState.stats.active;
        
        // TODO: Actualizar Subscribers y Earnings cuando los datos estén disponibles
    }

    /**
     * Carga los datos de todas las compañías y actualiza el dashboard.
     */
    async function loadDataAndRender() {
        try {
            const businesses = await loadAllBusinesses();
            
            // Calcular stats
            viewState.stats.total = businesses.length;
            viewState.stats.active = businesses.filter(b => (b.status || b.info?.subscriptionStatus) === 'active').length;
            viewState.stats.inactive = viewState.stats.total - viewState.stats.active;
            // viewState.stats.subscribers = ... (lógica futura)
            // viewState.stats.earnings = ... (lógica futura)

            // Actualizar la UI
            updateStatCards();

        } catch (error) {
            Logger.error('Error cargando data en SuperAdminDashboard:', error);
            element.querySelector('.panel-grid').innerHTML = EmptyState({
                icon: 'bi-wifi-off',
                message: 'Error al cargar estadísticas de compañías'
            });
        }
    }

    // --- (Funciones Helper para Listas) ---
    function renderListItem(title, subtitle, value, valueSubtitle, avatarClass, isAction = false) {
        return `
            <li class="dashboard-list-item">
                <div class="list-item-avatar ${avatarClass}"><i class="bi bi-building"></i></div>
                <div class="list-item-info">
                    <span class="list-item-title">${title}</span>
                    <span class="list-item-subtitle">${subtitle}</span>
                </div>
                <div class="list-item-value ${isAction ? 'is-action' : ''}">
                    <span class="list-item-title">${value}</span>
                    ${valueSubtitle ? `<span class="list-item-subtitle">${valueSubtitle}</span>` : ''}
                </div>
            </li>
        `;
    }

    // --- (Funciones de Gráficos ApexCharts) ---
    function renderCompaniesChart() {
        const options = {
            series: [{ name: 'Companies', data: [10, 41, 35, 51, 49, 62, 69] }],
            chart: { type: 'bar', height: 365, toolbar: { show: false } },
            plotOptions: { bar: { columnWidth: '40%', borderRadius: 4, horizontal: false } },
            dataLabels: { enabled: false },
            colors: ['#4B5675'], 
            xaxis: {
                categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                labels: { style: { colors: 'var(--bs-gray-600)' } } // Color de tema
            },
            yaxis: {
                labels: { style: { colors: 'var(--bs-gray-600)' } } // Color de tema
            },
            tooltip: { 
                y: { formatter: (val) => `${val} companies` },
                theme: document.documentElement.getAttribute('data-bs-theme') || 'light' // Tema
            },
            grid: { // Rejilla de tema
                borderColor: 'var(--bs-border-color)',
                strokeDashArray: 4
            }
        };
        const chart = new ApexCharts(document.querySelector("#companies-chart"), options);
        chart.render();
    }

    function renderRevenueChart() {
        const options = {
            series: [{ name: 'Revenue', data: [40, 30, 42, 80, 85, 70, 80, 70, 82, 20, 70, 60] }],
            chart: { type: 'bar', height: 365, toolbar: { show: false } },
            plotOptions: { bar: { columnWidth: '60%', borderRadius: 4, horizontal: false } },
            dataLabels: { enabled: false },
            colors: ['var(--primary-color)'], // Color de tema
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: { style: { colors: 'var(--bs-gray-600)' } }
            },
            yaxis: {
                labels: { style: { colors: 'var(--bs-gray-600)' } }
            },
            tooltip: { 
                y: { formatter: (val) => `${symbol}${val}K` },
                theme: document.documentElement.getAttribute('data-bs-theme') || 'light'
            },
            grid: {
                borderColor: 'var(--bs-border-color)',
                strokeDashArray: 4
            }
        };
        const chart = new ApexCharts(document.querySelector("#revenue-chart"), options);
        chart.render();
    }

    function renderPlansChart() {
        const options = {
            series: [60, 20, 20],
            chart: { type: 'donut', height: 350 },
            labels: ['Basic', 'Premium', 'Enterprise'],
            colors: ['#0dcaf0', '#f59e0b', '#071437'], 
            legend: { 
                position: 'bottom', 
                labels: { colors: 'var(--bs-gray-600)' } // Color de tema
            },
            dataLabels: { enabled: false },
            tooltip: {
                theme: document.documentElement.getAttribute('data-bs-theme') || 'light'
            },
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: { width: '100%' },
                    legend: { position: 'bottom' }
                }
            }]
        };
        const chart = new ApexCharts(document.querySelector("#plans-chart"), options);
        chart.render();
    }

    // --- INICIALIZAR UI ---
    (function initSuperAdminUI() {
        setTimeout(() => {
            if (typeof ApexCharts !== 'undefined') {
                try {
                    renderCompaniesChart(); 
                    renderRevenueChart();
                    renderPlansChart();
                    Logger.info('Gráficos del SuperAdmin renderizados.');
                } catch (e) {
                    Logger.error('Error al renderizar gráficos de ApexCharts:', e);
                }
            } else {
                Logger.warn('ApexCharts no está definido.');
            }
            
            initTippy(element);
            
            if (typeof flatpickr !== 'undefined') {
                try {
                    flatpickr.localize(flatpickr.l10ns.es);
                    flatpickr("#superadmin-datepicker", {
                        mode: "range", 
                        dateFormat: "m/d/Y", 
                        defaultDate: ["10/21/2025", "10/27/2025"], 
                    });
                    Logger.info('Selector de fechas (flatpickr) inicializado.');
                } catch (e) {
                    Logger.error('Error al inicializar flatpickr:', e);
                }
            } else {
                Logger.warn('flatpickr no está definido.');
            }
        }, 100);
    })();
    
    // --- ¡LLAMAR A LA CARGA DE DATOS! ---
    loadDataAndRender();

    return () => {
        Logger.info('Limpiando SuperAdminDashboard...');
        destroyTippy(element);
        // (Añadimos destrucción de gráficos para limpiar memoria)
        ['#companies-chart', '#revenue-chart', '#plans-chart'].forEach(selector => {
            const el = document.querySelector(selector);
            if (el && el.chart) {
                el.chart.destroy();
            }
        });
    };
}