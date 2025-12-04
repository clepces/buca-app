import{S as v}from"./StatCard-B6sN2hmT.js";import{E as C}from"./EmptyState-Cydos9GH.js";import{c as h,P as y,d as L,l as E,L as I,o as $,a as g,b as x,e as A,r as D,i as N}from"./index-C5SNnDkz.js";import{u as B,V as T,P as k}from"./useListController-B6sTLGuA.js";function M({companies:r=[],selectedIds:P,isAllSelected:w}){if(!r||r.length===0)return C({icon:"bi-building-slash",message:"No se encontraron compañías en esta vista."});function e(a="plan_basic"){const l=a.toLowerCase();let c="bg-primary-subtle text-primary-emphasis",b="Básico";return l.includes("enterprise")?(c="bg-dark-subtle text-dark-emphasis",b="Empresarial"):l.includes("advanced")&&(c="bg-info-subtle text-info-emphasis",b="Avanzado"),`<span class="badge ${c}">${b}</span>`}function n(a="active"){const l=a.toLowerCase();if(l==="deleted")return`<span class="badge bg-secondary text-white badge-with-icon">
                        <i class="bi bi-trash3"></i> Eliminado
                    </span>`;let c="bg-success-subtle text-success-emphasis",b="bi-check-circle-fill";return l!=="active"&&(c="bg-danger-subtle text-danger-emphasis",b="bi-x-circle-fill"),`<span class="badge ${c} badge-with-icon">
                    <i class="bi ${b}"></i> ${a}
                </span>`}function f(a){return`/assets/img/company/company-${(parseInt(a,36)%28+1).toString().padStart(2,"0")}.svg`}function p(a){return a?a.seconds?new Date(a.seconds*1e3).toLocaleDateString("es-VE"):new Date(a).toLocaleDateString("es-VE"):"N/A"}return`
        <table class="table-companies">
            <thead>
                <tr>
                    <th>
                        <input type="checkbox" class="form-check-input" id="select-all-companies" data-action="select-all" ${w?"checked":""}>
                    </th>
                    <th>Nombre de la Compañía</th>
                    <th>Plan</th>
                    <th>Fecha</th>
                    <th>Status</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${r.map(a=>{const l=P.has(a.id),c=a.status==="deleted";return`
                    <tr data-company-id="${a.id}" class="${l?"selected":""} ${c?"row-deleted":""}">
                        <td data-label="Select">
                            <input type="checkbox" class="form-check-input company-checkbox" data-action="select-one" data-company-id="${a.id}" ${l?"checked":""}>
                        </td>
                        <td data-label="Company Name">
                            <div class="company-name-cell">
                                <div class="company-avatar">
                                    <img src="${f(a.id)}" alt="${a.name} logo" style="${c?"filter: grayscale(100%); opacity: 0.6;":""}">
                                </div>
                                <div class="company-info">
                                    <span class="company-name" style="${c?"text-decoration: line-through; color: var(--bs-gray-500);":""}">${a.name}</span>
                                    <span class="company-domain">ID: ${a.id}</span>
                                </div>
                            </div>
                        </td>
                        <td data-label="Plan">${e(a.planId)}</td>
                        <td data-label="Created Date">${p(a.createdAt)}</td>
                        <td data-label="Status">${n(a.status)}</td>
                        <td data-label="Actions">
                            <div class="list-actions">
                                
                                
                                ${c?`
                                    <button class="btn-icon btn-icon-sm btn-success" data-action="restore-company" title="Restaurar Compañía">
                                        <i class="bi bi-arrow-counterclockwise"></i>
                                    </button>
                                `:`
                                    ${h(y.VIEW_COMPANIES)?`
                                    <button class="btn-icon btn-icon-sm btn-info" data-action="view-company" title="Ver">
                                        <i class="bi bi-eye-fill"></i>
                                    </button>`:""}

                                    ${h(y.EDIT_COMPANY)?`
                                    <button class="btn-icon btn-icon-sm" data-action="edit-company" title="Editar">
                                        <i class="bi bi-pencil-square"></i>
                                    </button>`:""}
                                    
                                    ${h(y.DELETE_COMPANY)?`
                                    <button class="btn-icon btn-icon-sm danger" data-action="delete-company" title="Mover a Papelera">
                                        <i class="bi bi-trash3-fill"></i>
                                    </button>`:""}
                                `}

                            </div>
                        </td>
                    </tr>
                `}).join("")}
            </tbody>
        </table>
    `}function R(r,P){const w=h(y.CREATE_COMPANY),e={allBusinesses:[],currentFilter:"active",selectedCompanies:new Set,stats:{total:0,active:0,inactive:0,deleted:0}},n=B({itemsPerPage:10,searchKeys:["name","id"]}),f=i=>{e.currentFilter=i;let t=[];i==="deleted"?t=e.allBusinesses.filter(s=>s.status==="deleted"):t=e.allBusinesses.filter(s=>s.status!=="deleted"),n.setData(t),c(),l()},p=async()=>{try{const i=await E();e.allBusinesses=i.map(t=>({id:t.id,name:t.name||t.info?.name||"Sin Nombre",planId:t.planId||t.info?.plan||"plan_basic",status:t.status||t.info?.subscriptionStatus||"active",createdAt:t.createdAt})),e.stats.total=e.allBusinesses.length,e.stats.deleted=e.allBusinesses.filter(t=>t.status==="deleted").length,e.stats.active=e.allBusinesses.filter(t=>t.status!=="deleted"&&t.status==="active").length,e.stats.inactive=e.stats.total-(e.stats.active+e.stats.deleted),a(),f(e.currentFilter)}catch(i){I.error("Error cargando data:",i);const t=r.querySelector("#companies-table-container");t&&(t.innerHTML=C({icon:"bi-wifi-off",message:"Error de conexión"}))}},a=()=>{const i=(s,o)=>{const d=r.querySelector(`#${s} .stat-card-value`);d&&(d.textContent=o)};i("stat-total-companies",e.stats.total),i("stat-active-companies",e.stats.active);const t=r.querySelector("#stat-inactive-companies");t&&(t.querySelector(".stat-card-title").textContent="En Papelera",t.querySelector(".stat-card-value").textContent=e.stats.deleted,t.querySelector(".stat-card-icon i").className="bi bi-trash3")},l=()=>{const i=r.querySelector('[data-filter="active"]'),t=r.querySelector('[data-filter="deleted"]');if(i&&t){const s=e.currentFilter==="deleted";i.classList.toggle("active",!s),i.classList.toggle("bg-primary-subtle",!s),i.classList.toggle("text-primary",!s),t.classList.toggle("active",s),t.classList.toggle("bg-danger-subtle",s),t.classList.toggle("text-danger",s),t.classList.toggle("text-muted",!s)}},c=()=>{const i=r.querySelector("#companies-table-container"),t=r.querySelector("#companies-pagination-container"),s=r.querySelector("#view-title-counter");if(!i)return;const o=n.paginatedData;i.innerHTML=M({companies:o,selectedIds:e.selectedCompanies,isAllSelected:o.length>0&&o.every(d=>e.selectedCompanies.has(d.id))}),t&&(t.innerHTML=k({currentPage:n.currentPage,totalPages:n.totalPages,totalItems:n.totalItems,itemsPerPage:n.itemsPerPage}),t.style.display=n.totalItems>0?"flex":"none"),s&&(s.textContent=n.totalItems),N(i)},b=()=>{const i=T({title:"Companies",subtitle:"Gestión global de negocios",icon:"bi-building",actions:[{label:"Actualizar",action:"refresh-data",icon:"bi-arrow-clockwise",variant:"info"},...w?[{label:"Nueva",action:"add-company",icon:"bi-plus-circle-fill"}]:[]]});r.innerHTML=`
        <div class="view-panel-content">
            ${i}
            
            <style> .view-title { display: flex; align-items: center; } </style>
            <script>
                document.querySelector('.view-title').insertAdjacentHTML('beforeend', 
                '<span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">0</span>');
            <\/script>

            <div class="panel-grid mb-4">
                ${v({id:"stat-total-companies",title:"Total Registros",value:"...",icon:"bi-building",className:"stat-card-total-companies"})}
                ${v({id:"stat-active-companies",title:"Activas",value:"...",icon:"bi-building-check",className:"stat-card-active-companies"})}
                ${v({id:"stat-inactive-companies",title:"Papelera",value:"...",icon:"bi-trash3",className:"stat-card-inactive-companies"})}
                ${v({id:"stat-location",title:"Ubicaciones",value:"0",icon:"bi-geo-alt-fill",className:"stat-card-location"})}
            </div>

            <div class="table-container-wrapper mt-4">
                <div class="table-filters d-flex justify-content-between align-items-center p-3 border-bottom">
                    <div class="filter-tabs d-flex gap-2 bg-light p-1 rounded">
                        <button class="btn btn-sm px-3 fw-bold rounded" data-action="filter-view" data-filter="active">
                            <i class="bi bi-check-circle me-1"></i> Activos
                        </button>
                        <button class="btn btn-sm px-3 fw-bold rounded text-muted" data-action="filter-view" data-filter="deleted">
                            <i class="bi bi-trash3 me-1"></i> Papelera
                        </button>
                    </div>
                    </div>

                <div id="companies-table-container">
                    ${C({icon:"bi-hourglass-split",message:"Cargando..."})}
                </div>
                <div class="pagination-container" id="companies-pagination-container"></div>
            </div>
        </div>
        `;const t=r.querySelector("#view-search-input");t&&(t.placeholder="Buscar empresa...",t.addEventListener("input",s=>{n.setSearch(s.target.value),c()}))},S=async i=>{const t=i.target;if(t.closest(".btn-page")){n.setPage(parseInt(t.closest(".btn-page").dataset.page)),c();return}if(t.closest("#btn-next-page")&&n.currentPage<n.totalPages){n.setPage(n.currentPage+1),c();return}if(t.closest("#btn-prev-page")&&n.currentPage>1){n.setPage(n.currentPage-1),c();return}if(t.id==="items-per-page"){n.setItemsPerPage(parseInt(t.value)),c();return}const s=t.closest("[data-action]");if(!s)return;const o=s.dataset.action,d=s.closest("[data-company-id]")?.dataset.companyId;if(o==="filter-view"){f(s.dataset.filter);return}if(o==="add-company"){await $()&&p();return}if(o==="refresh-data"){g("Actualizando...","info"),p();return}if(d){if(o==="edit-company"){const m=e.allBusinesses.find(u=>u.id===d);m&&await $(m)&&p()}if(o==="delete-company"){const m=e.allBusinesses.find(u=>u.id===d);x("Mover a Papelera",`¿Desactivar <strong>${m?.name}</strong>?<br><small class="text-muted">Podrás restaurarlo después.</small>`,async()=>{try{await A(d),g("Empresa movida a la papelera.","success"),p()}catch(u){g(u.message,"error")}},{confirmText:"Desactivar",confirmButtonClass:"btn-danger",icon:"bi bi-archive-fill text-warning"})}if(o==="restore-company"){const m=e.allBusinesses.find(u=>u.id===d);x("Restaurar Empresa",`¿Reactivar <strong>${m?.name}</strong>?`,async()=>{try{await D(d),g("Empresa restaurada exitosamente.","success"),p()}catch(u){g(u.message,"error")}},{confirmText:"Restaurar",confirmButtonClass:"btn-success",icon:"bi bi-arrow-counterclockwise text-success"})}}};return b(),p(),r.addEventListener("click",S),()=>{L(r),r.removeEventListener("click",S)}}export{R as CompaniesView};
