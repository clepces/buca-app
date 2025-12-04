import{S as i}from"./StatCard-B6sN2hmT.js";import{s,L as u}from"./index-C5SNnDkz.js";function p(e,v){const t=s.user?.name||"Usuario",c=s.settings.currencies.principal.symbol||"$",n=d=>`${c}${new Intl.NumberFormat("es-VE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(d)}`,a=new Date().getHours(),o=a<12?"Mañana":a<18?"Tarde":"Noche",r=0,l=0;return e.innerHTML=`
        <div class="dashboard-header">
            <h2 class="view-title"><i class="bi bi-keyboard me-2"></i> Panel de Caja</h2>
            <p class="dashboard-subtitle">Bienvenido, ${t}. Listo para registrar ventas.</p>
        </div>
        
        <div class="panel-grid">
            ${i({title:"Turno Actual",value:o,icon:"bi-clock-history",className:"productos",change:{value:"Activo",type:"positive"}})}
            ${i({title:"Ventas del Turno",value:n(r),icon:"bi-receipt",className:"inversion",change:{value:"+0%",type:"positive"}})}
            ${i({title:"Clientes Atendidos",value:l.toString(),icon:"bi-person-check-fill",className:"stock",change:{value:"Hoy",type:"positive"}})}
            ${i({title:"Acceso Rápido",value:'<a href="#/pos" class="btn btn-sm btn-light" data-route="#/pos"><i class="bi bi-cart-plus-fill me-1"></i> Ir a Caja</a>',icon:"bi-lightning-charge-fill",className:"ganancia"})}
        </div>
        
        <div class="dashboard-actions mt-4">
            <div class="row">
                <div class="col-md-6">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-cash-coin me-2"></i>Venta Rápida</h4>
                        <p>Inicia una nueva venta directamente</p>
                        <a href="#/pos" class="btn btn-primary" data-route="#/pos">
                            <i class="bi bi-plus-circle me-1"></i>Nueva Venta
                        </a>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="quick-action-card">
                        <h4><i class="bi bi-clock-history me-2"></i>Historial</h4>
                        <p>Revisa las ventas del día</p>
                        <button class="btn btn-secondary" onclick="alert('Próximamente: Historial de ventas')">
                            <i class="bi bi-list-ul me-1"></i>Ver Historial
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `,()=>{u.info("Limpiando CashierDashboard...")}}export{p as CashierDashboard};
