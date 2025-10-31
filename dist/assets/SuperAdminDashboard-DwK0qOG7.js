import{S as t}from"./StatCard-DJ07MMaI.js";import{s as c,L as s}from"./index-D_o6p_Zt.js";function A(o,$){const n=c.user?.name||"Admin",d=c.settings.currencies.principal.symbol||"$",h="5468",p="4598",b="3698",v=`${d}89,878.58`;o.innerHTML=`
        <div class="view-header align-items-start mb-4">
            <div>
                <h2 class="view-title mb-1"><i class="bi bi-shield-lock-fill me-2"></i> Panel de Super Admin</h2>
                <p class="text-muted mb-0">Bienvenido, ${n}. Resumen del estado de la plataforma.</p>
            </div>
            <div class="ms-auto text-end">
                 <div class="dashboard-date-picker">
                    <i class="bi bi-calendar3 me-1"></i>
                    <input type="text" id="superadmin-datepicker" placeholder="Seleccionar rango...">
                 </div>
            </div>
            </div>

        <div class="panel-grid mb-4" style="padding-bottom: 1rem;">
            ${t({title:"Total Companies",value:h,icon:"bi-building",className:"stat-card-companies",change:{value:"+19.01%",type:"positive"},miniGraph:!0})}
             ${t({title:"Active Companies",value:p,icon:"bi-building-check",className:"stat-card-active-companies",change:{value:"-12%",type:"negative"},miniGraph:!0})}
             ${t({title:"Total Subscribers",value:b,icon:"bi-person-badge",className:"stat-card-subscribers",change:{value:"+6%",type:"positive"},miniGraph:!0})}
             ${t({title:"Total Earnings",value:v,icon:"bi-currency-dollar",className:"stat-card-earnings",change:{value:"+14%",type:"positive"},miniGraph:!0})}
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
                    ${a("Stellar Dynamics","#12457","+$245","Basic","list-avatar-1")}
                    ${a("Quantum Nexus","payment","+$395","Enterprise","list-avatar-2")}
                    ${a("Aurora Technologies","#43412","+$145","Premium","list-avatar-3")}
                    ${a("TerraFusion Energy","#43412","+$1145","Enterprise","list-avatar-4")}
                    ${a("Epicurean Delights","#43412","+$597","Premium","list-avatar-5")}
                </ul>
            </div>

            <div class="dashboard-card h-100">
                <div class="dashboard-card-header">
                    <h4 class="dashboard-card-title">Recently Registered</h4>
                    <a href="#" class="view-all-link">View All</a>
                </div>
                <ul class="dashboard-list">
                    ${a("Pitch","Basic (Monthly)","150 Users","","list-avatar-6")}
                    ${a("Initech","Enterprise (Yearly)","420 Users","","list-avatar-7")}
                    ${a("Umbrella Corp","Premium (Yearly)","129 Users","","list-avatar-8")}
                    ${a("Capital Partners","Enterprise (Monthly)","103 Users","","list-avatar-9")}
                </ul>
            </div>

            <div class="dashboard-card h-100">
                <div class="dashboard-card-header">
                    <h4 class="dashboard-card-title">Recent Plan Expired</h4>
                    <a href="#" class="view-all-link">View All</a>
                </div>
                <ul class="dashboard-list">
                    ${a("Silicon Corp","Expired - 10 Apr 2025","Send Reminder","","list-avatar-3",!0)}
                    ${a("Hubspot","Expired - 12 Jun 2025","Send Reminder","","list-avatar-1",!0)}
                    ${a("Licon Industries","Expired - 12 May 2025","Send Reminder","","list-avatar-2",!0)}
                </ul>
            </div>
        </div>
        `;function a(e,r,i,l,g,y=!1){return`
            <li class="dashboard-list-item">
                <div class="list-item-avatar ${g}"><i class="bi bi-building"></i></div>
                <div class="list-item-info">
                    <span class="list-item-title">${e}</span>
                    <span class="list-item-subtitle">${r}</span>
                </div>
                <div class="list-item-value ${y?"is-action":""}">
                    <span class="list-item-title">${i}</span>
                    ${l?`<span class="list-item-subtitle">${l}</span>`:""}
                </div>
            </li>
        `}setTimeout(()=>{if(typeof ApexCharts<"u")try{m(),u(),f(),s.info("Gráficos del SuperAdmin renderizados.")}catch(e){s.error("Error al renderizar gráficos de ApexCharts:",e)}else s.warn("ApexCharts no está definido. No se pueden renderizar los gráficos.");if(typeof flatpickr<"u")try{flatpickr.localize(flatpickr.l10ns.es),flatpickr("#superadmin-datepicker",{mode:"range",dateFormat:"m/d/Y",defaultDate:["10/21/2025","10/27/2025"]}),s.info("Selector de fechas (flatpickr) inicializado.")}catch(e){s.error("Error al inicializar flatpickr:",e)}else s.warn("flatpickr no está definido. No se puede renderizar el selector de fechas.")},100);function m(){const e={series:[{name:"Companies",data:[10,41,35,51,49,62,69]}],chart:{type:"bar",height:365,toolbar:{show:!1}},plotOptions:{bar:{columnWidth:"40%",borderRadius:4,horizontal:!1}},dataLabels:{enabled:!1},colors:["#4B5675"],xaxis:{categories:["M","T","W","T","F","S","S"],labels:{style:{colors:"#6c757d"}}},yaxis:{labels:{style:{colors:"#6c757d"}}},tooltip:{y:{formatter:i=>`${i} companies`}}};new ApexCharts(document.querySelector("#companies-chart"),e).render()}function u(){const e={series:[{name:"Revenue",data:[40,30,42,80,85,70,80,70,82,20,70,60]}],chart:{type:"bar",height:365,toolbar:{show:!1}},plotOptions:{bar:{columnWidth:"60%",borderRadius:4,horizontal:!1}},dataLabels:{enabled:!1},colors:["#2563eb"],xaxis:{categories:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],labels:{style:{colors:"#6c757d"}}},yaxis:{labels:{style:{colors:"#6c757d"}}},tooltip:{y:{formatter:i=>`${d}${i}K`}}};new ApexCharts(document.querySelector("#revenue-chart"),e).render()}function f(){const e={series:[60,20,20],chart:{type:"donut",height:350},labels:["Basic","Premium","Enterprise"],colors:["#0dcaf0","#f59e0b","#071437"],legend:{position:"bottom",labels:{colors:"#6c757d"}},dataLabels:{enabled:!1},responsive:[{breakpoint:480,options:{chart:{width:"100%"},legend:{position:"bottom"}}}]};new ApexCharts(document.querySelector("#plans-chart"),e).render()}return()=>{s.info("Limpiando SuperAdminDashboard...")}}export{A as SuperAdminDashboard};
