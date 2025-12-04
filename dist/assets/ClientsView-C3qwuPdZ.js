import{u as m,V as b,P as g}from"./useListController-B6sTLGuA.js";import{D as f}from"./DataTable-Cqt80ZsM.js";import{E as v}from"./EmptyState-Cydos9GH.js";import{L as h,a as o}from"./index-C5SNnDkz.js";function w(n,P){h.info("[ClientsView] Inicializando...");const l=Array.from({length:25},(t,e)=>({id:`cli_${e+1}`,name:`Cliente ${e+1}`,email:`cliente${e+1}@ejemplo.com`,phone:`+58 412 555 00${e%90+10}`,type:e%3===0?"Empresa":"Particular",status:e%5===0?"inactive":"active",totalPurchases:Math.floor(Math.random()*500)})),a=m({itemsPerPage:10,searchKeys:["name","email","phone"]});a.setData(l);const d=[{header:"Cliente",render:t=>`
                <div class="d-flex flex-column">
                    <span class="fw-bold text-heading">${t.name}</span>
                    <small class="text-muted" style="font-size: 0.8rem;">${t.type}</small>
                </div>`},{header:"Contacto",render:t=>`
                <div class="d-flex flex-column">
                    <span><i class="bi bi-envelope me-1"></i> ${t.email}</span>
                    <small class="text-muted"><i class="bi bi-telephone me-1"></i> ${t.phone}</small>
                </div>`},{header:"Estado",render:t=>{const e=t.status==="active";return`<span class="badge ${e?"bg-success-subtle text-success-emphasis":"bg-secondary-subtle text-secondary-emphasis"}">
                    ${e?"Activo":"Inactivo"}
                </span>`}},{header:"Compras",render:t=>`<span class="fw-medium">${t.totalPurchases} Ventas</span>`},{header:"Acciones",render:t=>`
                <div class="list-actions">
                    <button class="btn-icon btn-icon-sm" data-action="edit" data-id="${t.id}" title="Editar">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn-icon btn-icon-sm" data-action="view-history" data-id="${t.id}" title="Historial">
                        <i class="bi bi-clock-history"></i>
                    </button>
                </div>
            `}],p=()=>{const t=b({title:"Clientes",subtitle:"Gestión de cartera de clientes",icon:"bi-people-fill",actions:[{label:"Exportar",action:"export-clients",icon:"bi-download",variant:"secondary"},{label:"Nuevo Cliente",action:"create-client",icon:"bi-person-plus-fill"}]});n.innerHTML=`
            <div class="view-panel-content">
                ${t}
                
                <script>
                    document.querySelector('.view-title').insertAdjacentHTML('beforeend', 
                    '<span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">${a.totalItems}</span>');
                <\/script>

                <div id="clients-table-container" class="mt-4">
                    </div>
                
                <div class="pagination-container" id="clients-pagination-container">
                    </div>
            </div>
        `;const e=n.querySelector("#view-search-input");e&&(e.placeholder="Buscar por nombre, email...",e.addEventListener("input",s=>{a.setSearch(s.target.value),i()}))},i=()=>{const t=n.querySelector("#clients-table-container"),e=n.querySelector("#clients-pagination-container"),s=n.querySelector("#view-title-counter");if(!t)return;const r=a.paginatedData;r.length>0?t.innerHTML=f({columns:d,data:r}):t.innerHTML=v({icon:"bi-search",message:a.searchTerm?"No se encontraron clientes con ese criterio.":"Aún no tienes clientes registrados."}),e&&(e.innerHTML=g({currentPage:a.currentPage,totalPages:a.totalPages,totalItems:a.totalItems,itemsPerPage:a.itemsPerPage}),e.style.display=a.totalItems>0?"flex":"none"),s&&(s.textContent=a.totalItems)},c=t=>{const e=t.target,s=e.closest("[data-action]");if(e.closest(".btn-page")){a.setPage(parseInt(e.closest(".btn-page").dataset.page)),i();return}if(e.closest("#btn-next-page")&&a.currentPage<a.totalPages){a.setPage(a.currentPage+1),i();return}if(e.closest("#btn-prev-page")&&a.currentPage>1){a.setPage(a.currentPage-1),i();return}if(e.id==="items-per-page"){a.setItemsPerPage(parseInt(e.value)),i();return}if(!s)return;const r=s.dataset.action,u=s.dataset.id;r==="create-client"&&o("Formulario de Cliente (Próximamente)","info"),r==="export-clients"&&o("Exportando CSV...","success"),r==="edit"&&o(`Editar cliente ${u}`,"info")};return p(),i(),n.addEventListener("click",c),()=>{n.removeEventListener("click",c)}}export{w as ClientsView};
