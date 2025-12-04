import{S as i}from"./StatCard-B6sN2hmT.js";import{L as s}from"./index-C5SNnDkz.js";function d(l){s.info("[SuperAdminInventoryView] Cargando Analítica de Catálogo...");const a={totalGlobales:150,totalPrivados:8500,plantillasMasUsadas:45};return l.innerHTML=`
    <div class="view-panel-content">
        <div class="view-header">
            <div>
                <h2 class="view-title"><i class="bi bi-graph-up-arrow me-2"></i> Inteligencia de Catálogo</h2>
                <p class="text-muted mb-0">Monitoreo del uso de productos en toda la plataforma.</p>
            </div>
            <div class="view-header-actions">
                <button class="btn-secondary" onclick="alert('Generar Reporte Global')">
                    <i class="bi bi-download me-1"></i> Reporte de Uso
                </button>
            </div>
        </div>

        <div class="panel-grid mb-4">
             ${i({title:"Plantillas Globales",value:a.totalGlobales,icon:"bi-globe-americas",className:"productos"})}
             ${i({title:"Productos Privados",value:a.totalPrivados,icon:"bi-incognito",className:"stock",description:"Creados por clientes"})}
             ${i({title:"Adopción",value:a.plantillasMasUsadas+"%",icon:"bi-check-circle",className:"ganancia",description:"Clientes usan plantillas"})}
        </div>

        <div class="dashboard-grid-2-col">
            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h4 class="dashboard-card-title">Categorías Más Populares</h4>
                </div>
                <div class="dashboard-card-body d-flex align-items-center justify-content-center" style="min-height: 200px;">
                    <p class="text-muted">Gráfico de distribución próximamente...</p>
                    </div>
            </div>

            <div class="dashboard-card">
                <div class="dashboard-card-header">
                    <h4 class="dashboard-card-title">Plantillas Más Importadas</h4>
                </div>
                <ul class="dashboard-list">
                    <li class="dashboard-list-item">
                        <div class="list-item-info"><span class="list-item-title">Harina PAN 1kg</span></div>
                        <div class="list-item-value">1,204 Tiendas</div>
                    </li>
                    <li class="dashboard-list-item">
                        <div class="list-item-info"><span class="list-item-title">Coca-Cola 2L</span></div>
                        <div class="list-item-value">980 Tiendas</div>
                    </li>
                    <li class="dashboard-list-item">
                        <div class="list-item-info"><span class="list-item-title">Arroz Mary</span></div>
                        <div class="list-item-value">850 Tiendas</div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
    `,()=>s.info("Limpiando SuperAdminInventoryView")}export{d as SuperAdminInventoryView};
