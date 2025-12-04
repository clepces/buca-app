import{s as p,L as m,d as L,c as $,P as h,i as I,g as T,a as C,b as k,j as D}from"./index-C5SNnDkz.js";import{E as w}from"./EmptyState-Cydos9GH.js";import{u as q,V as M,P as F}from"./useListController-B6sTLGuA.js";function f(a){return a<1e4?new Intl.NumberFormat("es-VE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(a):new Intl.NumberFormat("es-VE",{notation:"compact",maximumFractionDigits:2}).format(a)}function _(a,g){const{symbol:t}=g.currencies.principal,{symbol:d}=g.currencies.base,s=g.currencies.principal.rate,v=a.stock?.current??0,y=a.stock?.minThreshold??10,b=Number(a.pricing?.priceLists?.[0]?.packageSellPrice??0),e=Number(a.pricing?.priceLists?.[0]?.unitSellPrice??0),i=b*s,r=e*s,n=Number(i.toFixed(2)),u=Number(r.toFixed(2));let c="stock-ok";v===0?c="stock-out":v<=y&&(c="stock-low");const o=x=>new Intl.NumberFormat("es-VE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(x),l=`${t}${e} × ${s.toFixed(4)} = ${d}${o(u)}`,P=`${t}${b} × ${s.toFixed(4)} = ${d}${o(n)}`,S=`${t} ${f(e)}`,E=`${t} ${f(b)}`;return`
        <div class="product-card" data-product-id="${a.id}" data-action="editar">
            <div class="card-image-placeholder">
                <div class="card-header-overlay">
                    <div class="card-category-group">
                        <span class="product-category">${a.categoryId??"Sin Categoría"}</span>
                    </div>
                    <div class="product-actions-menu">
                        <button type="button" 
                                class="btn-icon-round" 
                                data-action="menu-toggle"
                                data-tippy-content="Más opciones">
                            <i class="bi bi-three-dots-vertical"></i>
                        </button>
                        <div class="menu-dropdown">
                            <button class="menu-item" data-action="editar">
                                <i class="bi bi-pencil-fill"></i> Editar
                            </button>
                            <button class="menu-item" data-action="abastecer">
                                <i class="bi bi-box-arrow-in-down"></i> Abastecer
                            </button>
                            <div class="menu-divider"></div>
                            <button class="menu-item text-danger" data-action="eliminar">
                                <i class="bi bi-trash3-fill"></i> Eliminar
                            </button>
                        </div>
                    </div>
                </div>
                <i class="bi bi-image placeholder-icon"></i>
            </div>

            <div class="card-body">
                <h3 class="product-name" 
                    data-tippy-content="${a.name}">
                    ${a.name}
                </h3>
                <p class="product-brand" 
                   data-tippy-content="${a.brand??"Marca genérica"}">
                   ${a.brand??"Generico"}
                </p>
            </div>
            
            <div class="card-footer">
                <div class="product-stat stock ${c}">
                    <span class="stat-label">Stock</span>
                    <span class="stat-value">${f(v)} <small>Ud.</small></span>
                </div>
                
                <div class="price-group">
                    <div class="product-stat price" 
                         data-action="toggle-currency" 
                         data-tippy-content="${l}"
                         data-tippy-placement="bottom">
                        <span class="stat-label">Unitario</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${S}"
                              data-base-val="${d} ${f(u)}">
                            ${S}
                        </span>
                    </div>
                    
                    <div class="product-stat price" 
                         data-action="toggle-currency" 
                         data-tippy-content="${P}"
                         data-tippy-placement="bottom">
                        <span class="stat-label">Paquete</span>
                        <span class="stat-value"
                              data-currency="principal"
                              data-principal-val="${E}"
                              data-base-val="${d} ${f(n)}">
                            ${E}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `}function A(a,g){return!a||a.length===0?w({icon:"bi-box-seam",message:"No hay productos que coincidan."}):`<div class="product-card-grid">${a.map(d=>_(d,g)).join("")}</div>`}function B(a,g){const t=q({itemsPerPage:8,searchKeys:["name","brand","categoryId"]});t.setData(p.products);const d=()=>{const e="src/styles/views/inventory/products/product-view.css";if(!document.querySelector(`link[href="${e}"]`)){const i=document.createElement("link");i.rel="stylesheet",i.href=e,document.head.appendChild(i)}},s=()=>{const e=a.querySelector(".product-list-container"),i=a.querySelector("#product-pagination-container"),r=a.querySelector("#view-title-counter");if(!e)return;const n=t.paginatedData;n.length>0?e.innerHTML=A(n,p.settings):t.searchTerm?e.innerHTML=w({icon:"bi-search",message:"No se encontraron productos"}):e.innerHTML=w({icon:"bi-box-seam",message:"Aún no has añadido ningún producto."}),i&&(i.innerHTML=F({currentPage:t.currentPage,totalPages:t.totalPages,totalItems:t.totalItems,itemsPerPage:t.itemsPerPage}),i.style.display=t.totalItems>0?"flex":"none"),r&&(r.textContent=t.totalItems),I(e)},v=()=>{const e=$(h.CREATE_PRODUCT),i=M({title:"Inventario",subtitle:"Gestión de catálogo",icon:"bi-boxes",actions:e?[{label:"Filtros",action:"filter-products",icon:"bi-filter",variant:"secondary"},{label:"Añadir Producto",action:"add-product",icon:"bi-plus-circle-fill"}]:[]});a.innerHTML=`
            <div class="view-panel-content">
                ${i}
                
                <style> .view-title { display: flex; align-items: center; } </style>
                <script>
                    document.querySelector('.view-title').insertAdjacentHTML('beforeend', 
                    '<span class="badge bg-primary-subtle text-primary-emphasis ms-2" id="view-title-counter">0</span>');
                <\/script>

                <div class="product-list-container mb-4 pb-4">
                    </div>
                
                <div class="pagination-container" id="product-pagination-container" style="display: none;">
                    </div>
            </div>
        `;const r=a.querySelector("#view-search-input");r&&(r.placeholder="Buscar por nombre, marca...",r.value=t.searchTerm,r.addEventListener("input",n=>{t.setSearch(n.target.value),s()}))},y=async e=>{const i=e.target;if(i.closest(".btn-page")){t.setPage(parseInt(i.closest(".btn-page").dataset.page)),s();return}if(i.closest("#btn-next-page")&&t.currentPage<t.totalPages){t.setPage(t.currentPage+1),s();return}if(i.closest("#btn-prev-page")&&t.currentPage>1){t.setPage(t.currentPage-1),s();return}if(i.id==="items-per-page"){t.setItemsPerPage(parseInt(i.value)),s();return}const r=i.closest("[data-action]");if(!r)return;const n=r.dataset.action,u=r.closest(".product-card"),c=u?.dataset.productId;if(n==="add-product"){await T(null)&&(t.setData(p.products),s());return}if(n==="expand-image"){e.stopPropagation(),C('Función "Ampliar Imagen" (Próximamente)',"info");return}if(n==="menu-toggle"){e.stopPropagation(),u.classList.toggle("menu-open"),document.querySelectorAll(".product-card.menu-open").forEach(o=>{o!==u&&o.classList.remove("menu-open")});return}if(c){if(n==="editar")if(e.stopPropagation(),$(h.EDIT_PRODUCT)){const o=p.products.find(l=>l.id===c);o?await T(o)&&(t.setData(p.products),s()):m.error(`Producto ${c} no encontrado.`)}else m.warn("Sin permiso para editar.");if(n==="eliminar")if(e.stopPropagation(),$(h.DELETE_PRODUCT)){const o=p.products.find(l=>l.id===c);o?k("Confirmar Eliminación",`¿Estás seguro de que deseas eliminar <strong>${o.name}</strong>?`,async()=>{m.trace(`[BusinessProductsView] Eliminando ${c}`),await D(p,c),t.setData(p.products),s()},{icon:"bi bi-trash3-fill text-danger",confirmText:"Sí, eliminar",confirmButtonClass:"btn-danger"}):m.error("Producto no encontrado.")}else m.warn("Sin permiso para eliminar.");n==="abastecer"&&(e.stopPropagation(),m.info(`Acción 'abastecer' para ${c}`),C('Función "Abastecer" (Próximamente)',"info")),n==="toggle-currency"&&(e.stopPropagation(),u.querySelectorAll(".product-stat.price .stat-value[data-currency]").forEach(l=>{const P=l.dataset.currency;l.textContent=l.dataset[P==="principal"?"baseVal":"principalVal"],l.dataset.currency=P==="principal"?"base":"principal"}))}},b=e=>{e.target.closest(".product-actions-menu")||document.querySelectorAll(".product-card.menu-open").forEach(i=>i.classList.remove("menu-open"))};return d(),v(),s(),a.addEventListener("click",y),document.addEventListener("click",b),()=>{m.info("Limpiando BusinessProductsView..."),L(a),a.removeEventListener("click",y),document.removeEventListener("click",b)}}export{B as BusinessProductsView};
