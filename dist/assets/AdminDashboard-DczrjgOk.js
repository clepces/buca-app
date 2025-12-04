import{S as c}from"./StatCard-B6sN2hmT.js";import{s as u,L as s}from"./index-C5SNnDkz.js";import{E as g}from"./EmptyState-Cydos9GH.js";function z(m,x){const p=u.session?.user?.name||"Usuario",d=u.settings.currencies.principal.symbol||"$",r=t=>`${d}${new Intl.NumberFormat("es-VE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}`,o={totalSales:0,salesReturn:0,totalPurchases:0,purchaseReturn:0,profit:0,overdueInvoices:0,totalExpenses:0,paymentReturns:0};m.innerHTML=`
    <div class="view-panel-content">
        <div class="view-header align-items-start mb-4">
            <div>
                <h2 class="view-title"><i class="bi bi-bar-chart-line-fill me-2"></i> Panel de Control</h2>
                <p class="dashboard-subtitle">Bienvenido, ${p}. Resumen general de tu negocio.</p>
            </div>
            <div class="ms-auto text-end">
                 <div class="dashboard-date-picker">
                    <i class="bi bi-calendar-range me-1"></i>
                    <input type="text" id="admin-datepicker" placeholder="Seleccionar rango...">
                 </div>
            </div>
        </div>
        
        <div class="panel-grid" style="grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));">
            ${c({title:"Ventas Totales",value:r(o.totalSales),icon:"bi-cart-check-fill",className:"productos",change:{value:"+12%",type:"positive"},description:"Total de ventas facturadas"})}
            ${c({title:"Retorno Total de Ventas",value:r(o.salesReturn),icon:"bi-cart-x-fill",className:"ganancia",change:{value:"+5%",type:"negative"},description:"Total de devoluciones de clientes"})}
            ${c({title:"Compras Totales",value:r(o.totalPurchases),icon:"bi-truck",className:"inversion",change:{value:"+8%",type:"positive"},description:"Total de compras a proveedores"})}
             ${c({title:"Retorno Total de Compras",value:r(o.purchaseReturn),icon:"bi-box-arrow-left",className:"stock",change:{value:"+1%",type:"negative"},description:"Total de devoluciones a proveedores"})}
            ${c({title:"Beneficio",value:r(o.profit),icon:"bi-graph-up-arrow",className:"productos",change:{value:"+15%",type:"positive"},description:"Ganancia neta (Ventas - Costos)"})}
            ${c({title:"Facturas Vencidas",value:r(o.overdueInvoices),icon:"bi-file-earmark-excel-fill",className:"ganancia",isNegative:!0,change:{value:"2 Pendientes",type:"negative"},description:"Facturas de clientes por cobrar"})}
            ${c({title:"Gastos Totales",value:r(o.totalExpenses),icon:"bi-receipt-cutoff",className:"inversion",change:{value:"+3%",type:"negative"},description:"Gastos operativos (luz, agua, etc.)"})}
            ${c({title:"Devolución de Pagos",value:r(o.paymentReturns),icon:"bi-cash-coin",className:"stock",change:{value:"Este mes",type:"negative"},description:"Pagos devueltos o contracargos"})}
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
                         ${g({icon:"bi-list-ul",message:"Lista de transacciones recientes próximamente."})}
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
                        <button class="btn-secondary btn-icon-sm" data-tippy-content="Hoy">
                            Hoy <i class="bi bi-chevron-down ms-1"></i>
                        </button>
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

    </div>
    `;function h(){const t={series:[{name:"Ventas",data:[50,40,300,220,500,250,400,230,500,300,450,350]},{name:"Compras",data:[30,90,40,140,290,190,250,100,320,150,200,180]}],chart:{type:"bar",height:300,toolbar:{show:!1},stacked:!1},plotOptions:{bar:{columnWidth:"60%",borderRadius:4}},colors:["var(--bs-success)","var(--error-color)"],dataLabels:{enabled:!1},xaxis:{categories:["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"],labels:{style:{colors:"var(--bs-gray-600)"}}},yaxis:{labels:{style:{colors:"var(--bs-gray-600)"},formatter:e=>`${d}${e>=1e3?e/1e3+"K":e}`}},legend:{position:"top",horizontalAlign:"right",markers:{fillColors:["var(--bs-success)","var(--error-color)"]},labels:{colors:"var(--bs-gray-600)"}},tooltip:{y:{formatter:e=>r(e)},theme:document.documentElement.getAttribute("data-bs-theme")||"light"},grid:{borderColor:"var(--bs-border-color)",strokeDashArray:4}};new ApexCharts(document.querySelector("#admin-sales-chart"),t).render()}function v(){const t={series:[5500,3500],chart:{type:"donut",height:200},labels:["Primera Vez","Devolución"],colors:["var(--primary-color)","var(--bs-gray-300)"],legend:{show:!1},dataLabels:{enabled:!1},tooltip:{y:{formatter:(e,{seriesIndex:i,w:n})=>{const l=n?.globals?.series?.reduce((f,y)=>f+y,0);if(!l)return`${e}`;const b=(e/l*100).toFixed(1);return`${n?.config?.labels?.[i]||"Data"}: ${e} (${b}%)`}},theme:document.documentElement.getAttribute("data-bs-theme")||"light"},plotOptions:{pie:{donut:{labels:{show:!0,total:{show:!0,label:"Total",formatter:function(e){const i=e?.globals?.series?.reduce((n,l)=>n+l,0);return i?i>=1e3?(i/1e3).toFixed(1)+"K":i:0}}}}}}};new ApexCharts(document.querySelector("#admin-customer-chart"),t).render()}return(function(){setTimeout(()=>{if(typeof ApexCharts<"u")try{h(),v(),s.info("Gráficos del AdminDashboard renderizados.")}catch(a){s.error("Error al renderizar gráficos de ApexCharts:",a);const e=document.querySelector("#admin-sales-chart");e&&(e.innerHTML=`<p class="text-danger">Error al cargar gráfico: ${a.message}</p>`);const i=document.querySelector("#admin-customer-chart");i&&(i.innerHTML=`<p class="text-danger">Error al cargar gráfico: ${a.message}</p>`)}else s.warn("ApexCharts no está definido. No se pueden renderizar los gráficos.");if(typeof tippy<"u")try{tippy("[data-tippy-content]",{animation:"scale-subtle",theme:"light-border"}),s.info("Tooltips (tippy) inicializados.")}catch(a){s.error("Error al inicializar tippy:",a)}else s.warn("Tippy.js no está definido.");if(typeof flatpickr<"u")try{flatpickr.localize(flatpickr.l10ns.es),flatpickr("#admin-datepicker",{mode:"range",dateFormat:"m/d/Y",defaultDate:["10/20/2025","10/26/2025"]}),s.info("Selector de fechas (flatpickr) inicializado.")}catch(a){s.error("Error al inicializar flatpickr:",a)}else s.warn("flatpickr no está definido.")},100)})(),()=>{s.info("Limpiando AdminDashboard...");const t=document.querySelector("#admin-sales-chart");t&&t.chart&&t.chart.destroy();const a=document.querySelector("#admin-customer-chart");a&&a.chart&&a.chart.destroy()}}export{z as AdminDashboard};
