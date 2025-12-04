import{L as g,f as y,g as u,a as m,b as v,h}from"./index-C5SNnDkz.js";import{u as w,V as T,P as L}from"./useListController-B6sTLGuA.js";import{D as C}from"./DataTable-Cqt80ZsM.js";import{E as b}from"./EmptyState-Cydos9GH.js";function H(i,S){g.info("[SuperAdminProductsView] Inicializando...");const t=w({itemsPerPage:10,searchKeys:["name","category","brand"]}),f=[{header:"Plantilla",key:"name",render:e=>`<strong>${e.name}</strong>`},{header:"Marca",key:"brand"},{header:"Categoría",key:"categoryId"},{header:"Costo Ref.",render:e=>`$${(e.pricing?.packageCost||0).toFixed(2)}`},{header:"Acciones",render:e=>`
            <div class="list-actions">
                <button class="btn-icon btn-icon-sm" data-action="edit" data-id="${e.id}" title="Editar Plantilla"><i class="bi bi-pencil"></i></button>
                <button class="btn-icon btn-icon-sm danger" data-action="delete" data-id="${e.id}" title="Eliminar"><i class="bi bi-trash"></i></button>
            </div>
        `}],o=async()=>{try{const e=await y();t.setData(e),s()}catch(e){g.error("Error cargando plantillas:",e),i.querySelector("#templates-table-container").innerHTML=b({icon:"bi-wifi-off",message:"No se pudieron cargar las plantillas."})}},s=()=>{const e=i.querySelector("#templates-table-container"),a=i.querySelector("#templates-pagination-container"),n=i.querySelector("#view-title-counter");if(!e)return;const r=t.paginatedData;r.length>0?e.innerHTML=C({columns:f,data:r}):e.innerHTML=b({icon:"bi-search",message:t.searchTerm?"No se encontraron plantillas.":"No hay plantillas registradas."}),a&&(a.innerHTML=L({currentPage:t.currentPage,totalPages:t.totalPages,totalItems:t.totalItems,itemsPerPage:t.itemsPerPage}),a.style.display=t.totalItems>0?"flex":"none"),n&&(n.textContent=t.totalItems)},P=()=>{const e=T({title:"Catálogo Maestro",subtitle:"Plantillas globales para todos los negocios",icon:"bi-globe-americas",actions:[{label:"Actualizar",action:"refresh",icon:"bi-arrow-clockwise",variant:"secondary"},{label:"Nueva Plantilla",action:"create-template",icon:"bi-plus-lg"}]});i.innerHTML=`
            <div class="view-panel-content">
                ${e}
                
                <style> .view-title { display: flex; align-items: center; } </style>
                <script>
                    document.querySelector('.view-title').insertAdjacentHTML('beforeend', 
                    '<span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">0</span>');
                <\/script>

                <div id="templates-table-container" class="mt-4">
                    <div class="d-flex justify-content-center p-4"><div class="spinner-border text-primary"></div></div>
                </div>
                
                <div class="pagination-container" id="templates-pagination-container"></div>
            </div>
        `;const a=i.querySelector("#view-search-input");a&&(a.placeholder="Buscar plantilla...",a.addEventListener("input",n=>{t.setSearch(n.target.value),s()}))},p=async e=>{const a=e.target,n=a.closest("[data-action]");if(a.closest(".btn-page")){t.setPage(parseInt(a.closest(".btn-page").dataset.page)),s();return}if(a.closest("#btn-next-page")&&t.currentPage<t.totalPages){t.setPage(t.currentPage+1),s();return}if(a.closest("#btn-prev-page")&&t.currentPage>1){t.setPage(t.currentPage-1),s();return}if(a.id==="items-per-page"){t.setItemsPerPage(parseInt(a.value)),s();return}if(!n)return;const r=n.dataset.action,d=n.dataset.id;if(r==="create-template"&&await u(null,{isGlobal:!0})&&o(),r==="refresh"&&(m("Actualizando catálogo...","info"),o()),r==="edit"){const l=t.allData.find(c=>c.id===d);l&&await u(l,{isGlobal:!0})&&o()}if(r==="delete"){const l=t.allData.find(c=>c.id===d);v("Eliminar Plantilla",`¿Eliminar <strong>${l.name}</strong>? Esta acción es irreversible.`,async()=>{await h(d),m("Plantilla eliminada","success"),o()},{confirmButtonClass:"btn-danger",confirmText:"Sí, eliminar"})}};return P(),o(),i.addEventListener("click",p),()=>{i.removeEventListener("click",p)}}export{H as SuperAdminProductsView};
