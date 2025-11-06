// ==========================================================================
// ARCHIVO: src/views/Dashboard/Super_admin/SuperAdminDashboard.js
// VERSIÓN 2.0: Layout de 3 columnas y Selector de Fechas
// ==========================================================================
import { StatCard } from '../../../components/StatCard.js';
import { Logger } from '../../../services/logger.service.js';
import { state as globalState } from '../../../store/state.js';

export function SuperAdminDashboard(element, state) {
    const userName = globalState.user?.name || 'Admin';
    const symbol = globalState.settings.currencies.principal.symbol || '$';
    
    // --- Datos de Platzhalter ---
    const companiesPlaceholder = '5468';
    const activeCompaniesPlaceholder = '4598';
    const subscribersPlaceholder = '3698';
    const earningsPlaceholder = `${symbol}89,878.58`;

    element.innerHTML = `
        <div class="view-header align-items-start mb-4">
            <div>
                <h2 class="view-title mb-1"><i class="bi bi-shield-lock-fill me-2"></i> Panel de Super Admin</h2>
                <p class="text-muted mb-0">Bienvenido, ${userName}. Resumen del estado de la plataforma.</p>
            </div>
            <div class="ms-auto text-end">
                 <div class="dashboard-date-picker">
                    <i class="bi bi-calendar3 me-1"></i>
                    <input type="text" id="superadmin-datepicker" placeholder="Seleccionar rango...">
                 </div>
            </div>
        </div>

        <div class="panel-grid mb-4" style="padding-bottom: 1rem;">
            ${StatCard({
                title: 'Total Companies',
                value: companiesPlaceholder,
                icon: 'bi-building',
                className: 'stat-card-companies',
                change: { value: '+19.01%', type: 'positive' },
                miniGraph: true 
            })}
             ${StatCard({
                title: 'Active Companies',
                value: activeCompaniesPlaceholder,
                icon: 'bi-building-check',
                className: 'stat-card-active-companies',
                change: { value: '-12%', type: 'negative' },
                miniGraph: true
            })}
             ${StatCard({
                title: 'Total Subscribers',
                value: subscribersPlaceholder,
                icon: 'bi-person-badge',
                className: 'stat-card-subscribers',
                change: { value: '+6%', type: 'positive' },
                miniGraph: true
            })}
             ${StatCard({
                title: 'Total Earnings',
                value: earningsPlaceholder,
                icon: 'bi-currency-dollar',
                className: 'stat-card-earnings',
                change: { value: '+14%', type: 'positive' },
                miniGraph: true
            })}
        </div>

        <div class="dashboard-grid-3-col mb-4" style="padding-bottom: 1rem;">
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

        <div class="dashboard-grid-3-col">
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
        `;

    // --- Funciones Helper para Listas (igual que antes) ---
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

    // --- INICIALIZAR GRÁFICOS Y SELECTOR DE FECHAS ---
    // setTimeout(() => {
        // Inicializar Gráficos
        if (typeof ApexCharts !== 'undefined') {
            try {
                renderCompaniesChart(); // <-- Lo cambiamos a gráfico de barras
                renderRevenueChart();
                renderPlansChart();
                Logger.info('Gráficos del SuperAdmin renderizados.');
            } catch (e) {
                Logger.error('Error al renderizar gráficos de ApexCharts:', e);
            }
        } else {
            Logger.warn('ApexCharts no está definido. No se pueden renderizar los gráficos.');
        }

        // --- INICIO CAMBIO: Inicializar Flatpickr ---
        if (typeof flatpickr !== 'undefined') {
            try {
                // Le pasamos la configuración de idioma 'es'
                flatpickr.localize(flatpickr.l10ns.es);
                
                flatpickr("#superadmin-datepicker", {
                    mode: "range", // Modo de Rango
                    dateFormat: "m/d/Y", // Formato de fecha
                    defaultDate: ["10/21/2025", "10/27/2025"], // ¡Fechas de la imagen!
                });
                Logger.info('Selector de fechas (flatpickr) inicializado.');
            } catch (e) {
                 Logger.error('Error al inicializar flatpickr:', e);
            }
        } else {
             Logger.warn('flatpickr no está definido. No se puede renderizar el selector de fechas.');
        }
        // --- FIN CAMBIO ---

    // }, 100);

    // --- Funciones de Gráficos (¡Companies modificado!) ---

    function renderCompaniesChart() {
        // --- INICIO CAMBIO: Gráfico de Barras (como en la foto) ---
        const options = {
            series: [{ name: 'Companies', data: [10, 41, 35, 51, 49, 62, 69] }],
            chart: { type: 'bar', height: 365, toolbar: { show: false } },
            plotOptions: { bar: { columnWidth: '40%', borderRadius: 4, horizontal: false } },
            dataLabels: { enabled: false },
            colors: ['#4B5675'], // Color oscuro
            xaxis: {
                categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
                labels: { style: { colors: '#6c757d' } }
            },
            yaxis: {
                labels: { style: { colors: '#6c757d' } }
            },
            tooltip: { y: { formatter: (val) => `${val} companies` } }
        };
        // --- FIN CAMBIO ---
        const chart = new ApexCharts(document.querySelector("#companies-chart"), options);
        chart.render();
    }

    function renderRevenueChart() {
        const options = {
            series: [{ name: 'Revenue', data: [40, 30, 42, 80, 85, 70, 80, 70, 82, 20, 70, 60] }],
            chart: { type: 'bar', height: 365, toolbar: { show: false } },
            plotOptions: { bar: { columnWidth: '60%', borderRadius: 4, horizontal: false } },
            dataLabels: { enabled: false },
            colors: ['#2563eb'],
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                labels: { style: { colors: '#6c757d' } }
            },
            yaxis: {
                labels: { style: { colors: '#6c757d' } }
            },
            tooltip: { y: { formatter: (val) => `${symbol}${val}K` } }
        };
        const chart = new ApexCharts(document.querySelector("#revenue-chart"), options);
        chart.render();
    }

    function renderPlansChart() {
        const options = {
            series: [60, 20, 20],
            chart: { type: 'donut', height: 350 },
            labels: ['Basic', 'Premium', 'Enterprise'],
            colors: ['#0dcaf0', '#f59e0b', '#071437'], // Cian, Naranja, Oscuro
            legend: { position: 'bottom', labels: { colors: '#6c757d' } },
            dataLabels: { enabled: false },
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


    // Función de limpieza
    return () => {
        Logger.info('Limpiando SuperAdminDashboard...');
    };
}