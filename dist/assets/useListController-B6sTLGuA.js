function h({currentPage:a,totalPages:i,totalItems:l,itemsPerPage:e,itemsPerPageOptions:o=[10,25,50]}){const n=(a-1)*e+1,p=Math.min(a*e,l),d=l>0?`Mostrando ${n}-${p} de ${l}`:"No hay entradas";function g(){let s="",r=Math.max(1,a-1),c=Math.min(i,a+1);a===1&&i>2&&(c=3),a===i&&i>2&&(r=i-2);for(let u=r;u<=c;u++)s+=`
                <button class="btn-page ${u===a?"active":""}" data-page="${u}">
                    ${u}
                </button>
            `;return s}const t=i>1?`
        <button class="btn-icon" id="btn-prev-page" ${a===1?"disabled":""}>
            <i class="bi bi-chevron-left"></i>
        </button>
        <span class="pagination-pages">
            ${g()}
        </span>
        <button class="btn-icon" id="btn-next-page" ${a===i?"disabled":""}>
            <i class="bi bi-chevron-right"></i>
        </button>
    `:"";return`
        <div class="pagination-info">
            <span>Row Per Page:</span>
            <select id="items-per-page" class="form-control" style="width: 70px;">
                ${o.map(s=>`
                    <option value="${s}" ${s===e?"selected":""}>
                        ${s}
                    </option>
                `).join("")}
            </select>
            <span>${d}</span>
        </div>
        <div class="pagination-controls">
            ${t} 
        </div>
    `}function m({title:a,subtitle:i,icon:l,actions:e=[]}){const o=e.map(n=>`
        <button class="btn-${n.variant||"primary"}" data-action="${n.action}">
            ${n.icon?`<i class="${n.icon} me-1"></i>`:""} ${n.label}
        </button>
    `).join("");return`
        <div class="view-header align-items-start mb-4"">
            <div>
                <h2 class="view-title">
                    <i class="${l} me-2"></i> 
                    ${a}
                </h2>
                ${i?`<p class="text-muted mb-0">${i}</p>`:""}
            </div>
            <div class="view-header-actions">
                <div class="search-container">
                    <i class="bi bi-search search-icon"></i>
                    <input type="search" id="view-search-input" class="form-control" placeholder="Buscar...">
                </div>
                ${o}
            </div>
        </div>
    `}function b(a={}){const{itemsPerPage:i=10,searchKeys:l=["name"]}=a;let e={allData:[],filteredData:[],currentPage:1,itemsPerPage:i,searchTerm:"",filters:{}};const o=t=>{e.allData=t,d()},n=t=>{e.searchTerm=t.toLowerCase(),e.currentPage=1,d()},p=(t,s)=>{e.filters[t]=s,e.currentPage=1,d()},d=()=>{let t=e.allData;Object.keys(e.filters).forEach(s=>{const r=e.filters[s];r!=="all"&&r!==null&&(t=t.filter(c=>c[s]===r))}),e.searchTerm&&(t=t.filter(s=>l.some(r=>{const c=s[r];return c&&String(c).toLowerCase().includes(e.searchTerm)}))),e.filteredData=t},g=()=>{const t=(e.currentPage-1)*e.itemsPerPage;return e.filteredData.slice(t,t+e.itemsPerPage)};return{setData:o,setSearch:n,setFilter:p,setPage:t=>e.currentPage=t,setItemsPerPage:t=>{e.itemsPerPage=t,e.currentPage=1},get paginatedData(){return g()},get totalItems(){return e.filteredData.length},get totalPages(){return Math.ceil(e.filteredData.length/e.itemsPerPage)},get currentPage(){return e.currentPage},get itemsPerPage(){return e.itemsPerPage}}}export{h as P,m as V,b as u};
