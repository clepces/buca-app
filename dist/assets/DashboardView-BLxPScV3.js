const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/SuperAdminDashboard-4Z8TdF0v.js","assets/StatCard-B6sN2hmT.js","assets/index-C5SNnDkz.js","assets/index-DgGX93HT.css","assets/EmptyState-Cydos9GH.js","assets/AdminDashboard-DczrjgOk.js","assets/CashierDashboard-Sc6S4FaS.js","assets/UserDashboard-CWoDc8rO.js","assets/dashboard.service-DfL4DnDB.js"])))=>i.map(i=>d[i]);
import{s as d,L as o,_ as t,R as e}from"./index-C5SNnDkz.js";const b=()=>t(()=>import("./SuperAdminDashboard-4Z8TdF0v.js"),__vite__mapDeps([0,1,2,3,4])).then(a=>a.SuperAdminDashboard),l=()=>t(()=>import("./AdminDashboard-DczrjgOk.js"),__vite__mapDeps([5,1,2,3,4])).then(a=>a.AdminDashboard),h=()=>t(()=>import("./CashierDashboard-Sc6S4FaS.js"),__vite__mapDeps([6,1,2,3])).then(a=>a.CashierDashboard),c=()=>t(()=>import("./UserDashboard-CWoDc8rO.js"),__vite__mapDeps([7,1,2,3,8])).then(a=>a.UserDashboard);async function _(a,i){let n=()=>{};const s=d.session?.user?.role;o.info(`[DashboardView] Iniciando carga para rol: ${s}`);try{a.innerHTML='<div class="d-flex justify-content-center p-5"><div class="spinner-border text-primary" role="status"></div></div>';let r=null;switch(s){case e.SUPER_ADMIN:o.trace("-> Cargando Dashboard de Super Admin"),r=await b();break;case e.PROPIETARIO:o.trace("-> Cargando Dashboard de Propietario"),r=await l();break;case e.CAJERO:o.trace("-> Cargando Dashboard de Cajero"),r=await h();break;case e.OPERADOR:o.trace("-> Cargando Dashboard de Operador"),r=await c();break;default:o.warn(`Rol '${s}' no reconocido. Cargando Dashboard por defecto.`),r=await c();break}if(r)a.innerHTML="",n=r(a,d);else throw new Error("El componente del dashboard no se pudo cargar.")}catch(r){o.error("[DashboardView] Error Crítico:",r),p(a,r)}return n}function p(a,i){a.innerHTML=`
        <div class="p-5 text-center">
            <i class="bi bi-exclamation-octagon text-danger" style="font-size: 3rem;"></i>
            <h3 class="mt-3">Error al cargar el Panel</h3>
            <p class="text-muted">No pudimos cargar tu dashboard. Por favor, verifica tu conexión.</p>
            <p class="small text-danger mb-4">${i.message||"Error desconocido"}</p>
            <button class="btn btn-secondary" onclick="window.location.reload()">
                <i class="bi bi-arrow-clockwise"></i> Recargar Página
            </button>
        </div>
    `}export{_ as DashboardView};
