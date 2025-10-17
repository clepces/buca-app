import{R as r,L as d}from"./index-D79SGgO_.js";function u(t){if(!t||t.length===0)return{totalProducts:0,totalInvestment:0,totalStockValue:0,potentialProfit:0};const s=t.reduce((i,o)=>{const a=o.product_info.product_estado.disponible||0,l=o.product_price.costo_promedio_paquete||0,n=o.product_price.venta_paquete||0;return i.investment+=l*a,i.stockValue+=n*a,i},{investment:0,stockValue:0});return{totalProducts:t.length,totalInvestment:s.investment,totalStockValue:s.stockValue,potentialProfit:s.stockValue-s.investment}}function e({title:t,value:s,icon:i,className:o=""}){return`
        <div class="stat-card ${o}">
            <div class="stat-card-icon">
                <i class="fas ${i}"></i>
            </div>
            <div class="stat-card-info">
                <span class="stat-card-title">${t}</span>
                <span class="stat-card-value">${s}</span>
            </div>
        </div>
    `}function m(t,s){const i=s.session.user?.roles?.[0];if(s.session.business?.id==="admin_view")t.innerHTML=`
            <h2 class="view-title"><i class="fas fa-user-shield"></i> Panel de Administración</h2>
            <div class="panel-grid">
                ${e({title:"Clientes Registrados",value:"1",icon:"fa-store",className:"inversion"})}
                ${e({title:"Estado del Sistema",value:"Operacional",icon:"fa-server",className:"stock"})}
            </div>
        `;else if(i===r.CAJERO){const a=s.settings.currencies.principal.symbol||"$";t.innerHTML=`
            <h2 class="view-title"><i class="fas fa-cash-register"></i> Panel de Caja</h2>
            <div class="panel-grid">
                ${e({title:"Ventas del Día",value:`${a}1,250.50`,icon:"fa-dollar-sign",className:"inversion"})}
                ${e({title:"Clientes Atendidos",value:"82",icon:"fa-users",className:"productos"})}
                ${e({title:"Último Cierre",value:"Ayer, 9:30 PM",icon:"fa-clock",className:"stock"})}
            </div>
        `}else{const a=u(s.products),l=s.settings.currencies.principal.symbol||"$",n=c=>`${l}${new Intl.NumberFormat("es-VE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(c)}`;t.innerHTML=`
            <h2 class="view-title"><i class="fas fa-chart-pie"></i> Panel de Control</h2>
            <div class="panel-grid">
                ${e({title:"Total de Productos",value:a.totalProducts,icon:"fa-box-open",className:"productos"})}
                ${e({title:"Inversión Total (Costo)",value:n(a.totalInvestment),icon:"fa-dollar-sign",className:"inversion"})}
                ${e({title:"Valor Total del Stock",value:n(a.totalStockValue),icon:"fa-warehouse",className:"stock"})}
                ${e({title:"Ganancia Potencial",value:n(a.potentialProfit),icon:"fa-chart-line",className:"ganancia"})}
            </div>
        `}return()=>{d.info("Limpiando DashboardView...")}}export{m as DashboardView};
