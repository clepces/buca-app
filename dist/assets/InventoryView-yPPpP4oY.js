const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SuperAdminInventoryView-B2J5aPoe.js","assets/StatCard-B6sN2hmT.js","assets/index-C5SNnDkz.js","assets/index-DgGX93HT.css","assets/OwnerInventoryView-BKj2DS8Z.js","assets/EmptyState-Cydos9GH.js","assets/dashboard.service-DfL4DnDB.js"])))=>i.map(i=>d[i]);
import{s as d,L as r,_ as s,R as i}from"./index-C5SNnDkz.js";const l=()=>s(()=>import("./SuperAdminInventoryView-B2J5aPoe.js"),__vite__mapDeps([0,1,2,3])).then(e=>e.SuperAdminInventoryView),o=()=>s(()=>import("./OwnerInventoryView-BKj2DS8Z.js"),__vite__mapDeps([4,5,2,3,1,6])).then(e=>e.OwnerInventoryView);async function u(e,c){let a=()=>{};const t=d.session?.user?.role;r.info(`[InventoryView] Iniciando módulo para: ${t}`);try{e.innerHTML='<div class="d-flex justify-content-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';let n=null;switch(t){case i.SUPER_ADMIN:r.trace("-> Ruta: /Super_admin/SuperAdminInventoryView"),n=await l();break;case i.PROPIETARIO:case i.OPERADOR:r.trace("-> Ruta: /Business_admin/OwnerInventoryView"),n=await o();break;default:r.warn(`Rol '${t}' no tiene vista asignada. Usando vista de negocio por defecto.`),n=await o();break}if(n)e.innerHTML="",a=n(e,c);else throw new Error("No se encontró el componente de inventario para este rol.")}catch(n){r.error("[InventoryView] Error fatal cargando vistas:",n),e.innerHTML=`
            <div class="p-5 text-center">
                <i class="bi bi-box-seam text-danger" style="font-size: 3rem;"></i>
                <h3 class="mt-3">Error de Módulo</h3>
                <p class="text-muted">No pudimos cargar la sección de inventario.</p>
                <div class="alert alert-danger d-inline-block mt-2 py-1 px-3">${n.message}</div>
                <div class="mt-3">
                    <button class="btn btn-primary" onclick="window.location.reload()">
                        <i class="bi bi-arrow-clockwise me-1"></i> Reintentar
                    </button>
                </div>
            </div>
        `}return a}export{u as InventoryDashboardView};
