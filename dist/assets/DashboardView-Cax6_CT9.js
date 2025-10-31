import{E as i}from"./EmptyState-DllPb4lQ.js";import{L as o}from"./index-D_o6p_Zt.js";import{S as e}from"./StatCard-DJ07MMaI.js";function c(a,t){const s=t.products.length;return a.innerHTML=`
        <div class="view-header">
            <h2 class="view-title"><i class="bi bi-box-seam me-2"></i> Resumen de Inventario</h2>
             <!--{/* Botón para ir a productos, aunque ya está en el menú contextual */} -->
            <a href="#/products" class="btn-secondary" data-route="#/products">
                 <i class="bi bi-list-task me-1"></i> Ver Lista de Productos
            </a>
        </div>

        <!--{/* Puedes añadir StatCards o un EmptyState */} -->
         <div class="panel-grid">
             ${e({title:"Productos Registrados",value:s,icon:"bi-boxes",className:"productos"})}
             ${e({title:"Productos Bajos de Stock",value:"0",icon:"bi-exclamation-triangle-fill",className:"inversion"})}
             ${e({title:"Valor Estimado",value:"$0.00",icon:"bi-calculator-fill",className:"stock"})}
         </div>

        <!--{/* O si prefieres empezar simple: */} -->
        <!--{/* ${i({icon:"bi-graph-up",message:"El panel de resumen de inventario se mostrará aquí."})} */} -->
    `,()=>{o.info("Limpiando InventoryDashboardView...")}}export{c as InventoryDashboardView};
