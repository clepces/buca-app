import{S as d}from"./StatCard-B6sN2hmT.js";import{s as n,L as i,i as x,d as S,l as A}from"./index-C5SNnDkz.js";import{E}from"./EmptyState-Cydos9GH.js";function D(r,C){const h=n.session?.user?.name||"Admin",o=n.settings.currencies.principal.symbol||"$",t={stats:{total:0,active:0,inactive:0,subscribers:0,earnings:0},graphs:{companies:[10,41,35,51,62],active:[8,30,30,40,50],subscribers:[5,20,15,25,30],earnings:[10,15,12,18,25]}},p="0",v=`${o}0,00`;r.innerHTML=`
    <div class="view-panel-content">

        <div class="view-header align-items-start mb-4">
            <div>
                <h2 class="view-title mb-1"><i class="bi bi-shield-lock-fill me-2"></i> Panel de Super Admin</h2>
                <p class="text-muted mb-0">Bienvenido, ${h}. Resumen del estado de la plataforma.</p>
            </div>
            <div class="ms-auto text-end">
                 <div class="dashboard-date-picker">
                    <i class="bi bi-calendar3"></i>
                    <input type="text" id="superadmin-datepicker" placeholder="Seleccionar rango...">
                 </div>
            </div>
        </div>

        <div class="panel-grid mb-4">
            ${d({id:"stat-total-companies",title:"Total Companies",value:"...",icon:"bi-building",className:"stat-card-companies",change:{value:"+0",type:"positive"},description:"Total de negocios registrados",miniGraphData:t.graphs.companies})}
             ${d({id:"stat-active-companies",title:"Active Companies",value:"...",icon:"bi-building-check",className:"stat-card-active-companies",change:{value:"+0",type:"positive"},description:"Negocios con plan activo",miniGraphData:t.graphs.active})}
             ${d({id:"stat-total-subscribers",title:"Total Subscribers",value:p,icon:"bi-person-badge",className:"stat-card-subscribers",change:{value:"+0%",type:"positive"},description:"desde el último mes",miniGraphData:t.graphs.subscribers})}
             ${d({id:"stat-total-earnings",title:"Total Earnings",value:v,icon:"bi-currency-dollar",className:"stat-card-earnings",change:{value:"-14%",type:"negative"},description:"desde el último mes",miniGraphData:t.graphs.earnings})}
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
                        ${s("Stellar Dynamics","#12457","+$245","Basic","list-avatar-1")}
                        ${s("Quantum Nexus","payment","+$395","Enterprise","list-avatar-2")}
                        ${s("Aurora Technologies","#43412","+$145","Premium","list-avatar-3")}
                        ${s("TerraFusion Energy","#43412","+$1145","Enterprise","list-avatar-4")}
                        ${s("Epicurean Delights","#43412","+$597","Premium","list-avatar-5")}
                    </ul>
                </div>

                <div class="dashboard-card h-100">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Recently Registered</h4>
                        <a href="#" class="view-all-link">View All</a>
                    </div>
                    <ul class="dashboard-list">
                        ${s("Pitch","Basic (Monthly)","150 Users","","list-avatar-6")}
                        ${s("Initech","Enterprise (Yearly)","420 Users","","list-avatar-7")}
                        ${s("Umbrella Corp","Premium (Yearly)","129 Users","","list-avatar-8")}
                        ${s("Capital Partners","Enterprise (Monthly)","103 Users","","list-avatar-9")}
                    </ul>
                </div>

                <div class="dashboard-card h-100">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Recent Plan Expired</h4>
                        <a href="#" class="view-all-link">View All</a>
                    </div>
                    <ul class="dashboard-list">
                        ${s("Silicon Corp","Expired - 10 Apr 2025","Send Reminder","","list-avatar-3",!0)}
                        ${s("Hubspot","Expired - 12 Jun 2025","Send Reminder","","list-avatar-1",!0)}
                        ${s("Licon Industries","Expired - 12 May 2025","Send Reminder","","list-avatar-2",!0)}
                    </ul>
                </div>
            </div>
        </div>
    </div>
    `;function b(){const a=r.querySelector("#stat-total-companies .stat-card-value"),e=r.querySelector("#stat-active-companies .stat-card-value");a&&(a.textContent=t.stats.total),e&&(e.textContent=t.stats.active)}async function m(){try{const a=await A();t.stats.total=a.length,t.stats.active=a.filter(e=>(e.status||e.info?.subscriptionStatus)==="active").length,t.stats.inactive=t.stats.total-t.stats.active,b()}catch(a){i.error("Error cargando data en SuperAdminDashboard:",a),r.querySelector(".panel-grid").innerHTML=E({icon:"bi-wifi-off",message:"Error al cargar estadísticas de compañías"})}}function s(a,e,l,c,y,$=!1){return`
            <li class="dashboard-list-item">
                <div class="list-item-avatar ${y}"><i class="bi bi-building"></i></div>
                <div class="list-item-info">
                    <span class="list-item-title">${a}</span>
                    <span class="list-item-subtitle">${e}</span>
                </div>
                <div class="list-item-value ${$?"is-action":""}">
                    <span class="list-item-title">${l}</span>
                    ${c?`<span class="list-item-subtitle">${c}</span>`:""}
                </div>
            </li>
        `}function u(){const a={series:[{name:"Companies",data:[10,41,35,51,49,62,69]}],chart:{type:"bar",height:365,toolbar:{show:!1}},plotOptions:{bar:{columnWidth:"40%",borderRadius:4,horizontal:!1}},dataLabels:{enabled:!1},colors:["#4B5675"],xaxis:{categories:["M","T","W","T","F","S","S"],labels:{style:{colors:"var(--bs-gray-600)"}}},yaxis:{labels:{style:{colors:"var(--bs-gray-600)"}}},tooltip:{y:{formatter:l=>`${l} companies`},theme:document.documentElement.getAttribute("data-bs-theme")||"light"},grid:{borderColor:"var(--bs-border-color)",strokeDashArray:4}};new ApexCharts(document.querySelector("#companies-chart"),a).render()}function g(){const a={series:[{name:"Revenue",data:[40,30,42,80,85,70,80,70,82,20,70,60]}],chart:{type:"bar",height:365,toolbar:{show:!1}},plotOptions:{bar:{columnWidth:"60%",borderRadius:4,horizontal:!1}},dataLabels:{enabled:!1},colors:["var(--primary-color)"],xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],labels:{style:{colors:"var(--bs-gray-600)"}}},yaxis:{labels:{style:{colors:"var(--bs-gray-600)"}}},tooltip:{y:{formatter:l=>`${o}${l}K`},theme:document.documentElement.getAttribute("data-bs-theme")||"light"},grid:{borderColor:"var(--bs-border-color)",strokeDashArray:4}};new ApexCharts(document.querySelector("#revenue-chart"),a).render()}function f(){const a={series:[60,20,20],chart:{type:"donut",height:350},labels:["Basic","Premium","Enterprise"],colors:["#0dcaf0","#f59e0b","#071437"],legend:{position:"bottom",labels:{colors:"var(--bs-gray-600)"}},dataLabels:{enabled:!1},tooltip:{theme:document.documentElement.getAttribute("data-bs-theme")||"light"},responsive:[{breakpoint:480,options:{chart:{width:"100%"},legend:{position:"bottom"}}}]};new ApexCharts(document.querySelector("#plans-chart"),a).render()}return(function(){setTimeout(()=>{if(typeof ApexCharts<"u")try{u(),g(),f(),i.info("Gráficos del SuperAdmin renderizados.")}catch(e){i.error("Error al renderizar gráficos de ApexCharts:",e)}else i.warn("ApexCharts no está definido.");if(x(r),typeof flatpickr<"u")try{flatpickr.localize(flatpickr.l10ns.es),flatpickr("#superadmin-datepicker",{mode:"range",dateFormat:"m/d/Y",defaultDate:["10/21/2025","10/27/2025"]}),i.info("Selector de fechas (flatpickr) inicializado.")}catch(e){i.error("Error al inicializar flatpickr:",e)}else i.warn("flatpickr no está definido.")},100)})(),m(),()=>{i.info("Limpiando SuperAdminDashboard..."),S(r),["#companies-chart","#revenue-chart","#plans-chart"].forEach(a=>{const e=document.querySelector(a);e&&e.chart&&e.chart.destroy()})}}export{D as SuperAdminDashboard};
