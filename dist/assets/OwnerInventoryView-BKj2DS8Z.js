import{E as o}from"./EmptyState-Cydos9GH.js";import{s as r,L as l}from"./index-C5SNnDkz.js";import{S as s}from"./StatCard-B6sN2hmT.js";import{g as v}from"./dashboard.service-DfL4DnDB.js";function g(d,m){const n=()=>{const t="src/styles/views/inventory/inventory.css";if(!document.querySelector(`link[href="${t}"]`)){const e=document.createElement("link");e.rel="stylesheet",e.href=t,document.head.appendChild(e)}},a=v(r.products),c=r.settings.currencies.principal.symbol||"$",i=t=>`${c}${new Intl.NumberFormat("es-VE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t)}`;return d.innerHTML=`
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
                 ${s({title:"Productos Registrados",value:a.totalProducts,icon:"bi-boxes",className:"productos"})}
                 ${s({title:"Inversión Total",value:i(a.totalInvestment),icon:"bi-cash-coin",className:"inversion"})}
                 ${s({title:"Valor de Stock",value:i(a.totalStockValue),icon:"bi-box-seam",className:"stock"})}
                 ${s({title:"Ganancia Potencial",value:i(a.potentialProfit),icon:"bi-graph-up-arrow",className:"ganancia",isNegative:a.potentialProfit<0})}
             </div>
             
             <div class="dashboard-grid-2-col mt-4">
                
                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Productos Más Vendidos</h4>
                        <a href="#" class="view-all-link" data-action="view-top-selling">Ver Todos</a>
                        </div>
                    <div class="dashboard-card-body">
                        ${o({icon:"bi-graph-up",message:"Lista de productos más vendidos próximamente."})}
                    </div>
                </div>

                <div class="dashboard-card">
                    <div class="dashboard-card-header">
                        <h4 class="dashboard-card-title">Productos con Bajo Stock</h4>
                        <a href="#" class="view-all-link" data-action="view-low-stock">Ver Todos</a>
                    </div>
                    <div class="dashboard-card-body">
                        ${o({icon:"bi-exclamation-triangle",message:"No hay productos con bajo stock."})}
                        </div>
                </div>

             </div>
        </div>
    `,n(),()=>{l.info("Limpiando OwnerInventoryView...")}}export{g as OwnerInventoryView};
