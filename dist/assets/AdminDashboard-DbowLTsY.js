import{S as s}from"./StatCard-DJ07MMaI.js";import{s as t,L as r}from"./index-D_o6p_Zt.js";import{g as d}from"./dashboard.service-Dg9AhmKQ.js";function u(e,n){const l=t.user?.name||"Usuario",c=t.settings.currencies.principal.symbol||"$",i=o=>`${c}${new Intl.NumberFormat("es-VE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(o)}`,a=d(n.products);return e.innerHTML=`
        <div class="dashboard-header">
            <h2 class="view-title"><i class="bi bi-speedometer2 me-2"></i> Panel de Control</h2>
            <p class="dashboard-subtitle">Bienvenido, ${l}. Resumen general de tu negocio.</p>
        </div>
        
        <div class="panel-grid">
            ${s({title:"Total de Productos",value:a.totalProducts,icon:"bi-box-seam",className:"productos",change:{value:"+0",type:"positive"}})}
            ${s({title:"Inversión Total (Costo)",value:i(a.totalInvestment),icon:"bi-cash-coin",className:"inversion",change:{value:"+0%",type:"positive"}})}
            ${s({title:"Valor Total del Stock",value:i(a.totalStockValue),icon:"bi-boxes",className:"stock",change:{value:"+0%",type:"positive"}})}
            ${s({title:"Ganancia Potencial",value:i(a.potentialProfit),icon:"bi-graph-up-arrow",className:"ganancia",isNegative:a.potentialProfit<0,change:{value:a.potentialProfit>=0?"+0%":"-0%",type:a.potentialProfit>=0?"positive":"negative"}})}
        </div>
        
        <div class="dashboard-actions mt-4">
            <div class="row">
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-box-seam me-2"></i>Inventario</h4>
                        <p>Gestiona tu inventario</p>
                        <a href="#/inventory/products" class="btn btn-primary" data-route="#/inventory/products">
                            <i class="bi bi-boxes me-1"></i>Ver Inventario
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-cart-plus me-2"></i>Punto de Venta</h4>
                        <p>Procesa ventas rápidamente</p>
                        <a href="#/pos" class="btn btn-success" data-route="#/pos">
                            <i class="bi bi-cash-coin me-1"></i>Ir a POS
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-people me-2"></i>Clientes</h4>
                        <p>Administra tu base de clientes</p>
                        <a href="#/clients" class="btn btn-secondary" data-route="#/clients">
                            <i class="bi bi-person-lines-fill me-1"></i>Ver Clientes
                        </a>
                    </div>
                </div>
                <div class="col-md-3">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-gear me-2"></i>Configuración</h4>
                        <p>Ajusta la configuración</p>
                        <button class="btn btn-warning" onclick="alert('Próximamente: Configuración')">
                            <i class="bi bi-sliders me-1"></i>Configurar
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="dashboard-analytics mt-4">
            <div class="row">
                <div class="col-md-6">
                    <div class="analytics-card">
                        <h4><i class="bi bi-graph-up me-2"></i>Resumen Financiero</h4>
                        <div class="analytics-grid">
                            <div class="analytics-item">
                                <span class="analytics-label">Margen de Ganancia:</span>
                                <span class="analytics-value ${a.totalInvestment>0?a.potentialProfit/a.totalInvestment*100>=0?"positive":"negative":"neutral"}">
                                    ${a.totalInvestment>0?(a.potentialProfit/a.totalInvestment*100).toFixed(1):"0"}%
                                </span>
                            </div>
                            <div class="analytics-item">
                                <span class="analytics-label">Valor Promedio por Producto:</span>
                                <span class="analytics-value">
                                    ${a.totalProducts>0?i(a.totalStockValue/a.totalProducts):i(0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="analytics-card">
                        <h4><i class="bi bi-info-circle me-2"></i>Estado del Sistema</h4>
                        <div class="analytics-grid">
                            <div class="analytics-item">
                                <span class="analytics-label">Última actualización:</span>
                                <span class="analytics-value">${new Date().toLocaleString("es-VE")}</span>
                            </div>
                            <div class="analytics-item">
                                <span class="analytics-label">Estado:</span>
                                <span class="analytics-value status-active">Operativo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,()=>{r.info("Limpiando AdminDashboard...")}}export{u as AdminDashboard};
