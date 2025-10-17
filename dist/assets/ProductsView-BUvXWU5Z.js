import{L as v,s as C,u as w,a as V,d as U}from"./index-D79SGgO_.js";import{E as k}from"./EmptyState-DllPb4lQ.js";function I(e,o,r,n){if(v.info("--- Iniciando de Cálculo ---"),v.info("Costo recibido:",e),v.info("% Ganancia:",o),r<=0)return null;const a=n.products.tax_rate/100,i=n.products.calculation_method;let c;if(i==="margin"){if(o>=100)return console.error("El margen no puede ser 100% o más."),null;c=e/(1-o/100)}else c=e*(1+o/100);v.info("Subtotal (sin IVA):",c);const s=c*a;v.info("Monto del IVA:",s);const t=c+s;v.info("Precio Final Total:",t);const d=t/r;return v.info("Precio Final por Unidad:",d),v.info("--- Final de Cálculo ---"),{costoUnitarioDolar:e/r,subtotalMayorDolar:c,montoIVAMayorDolar:s,precioFinalMayorDolar:t,precioFinalUnitarioDolar:d}}function H(e,o,r,n,a,i,c,s,t,d){const y=s>0?s:c,p=I(a,i,y,d);if(!p)return console.error("Error al calcular el precio en la creación del producto."),null;const _=a*(t||1),g=_/c;return{product_info:{id:Date.now()+Math.floor(Math.random()*1e3),product_name:e,product_brand:o,product_category:r,description:n,purchase_history:[{date:new Date().toISOString(),quantity_added:c,total_cost:_,cost_per_unit:g}],product_estado:{disponible:c}},product_price:{costo_inicial_paquete:a,costo_promedio_paquete:a,unidades_por_paquete:y,venta_unidad:p.precioFinalUnitarioDolar,venta_paquete:p.precioFinalMayorDolar},product_ajuste:{percentage:i/100}}}function N(...e){return e.every(o=>o&&o.trim()!=="")}function B(e,o,r,n=null){return r.some(a=>a.product_info.product_name.toLowerCase()===e.toLowerCase()&&a.product_info.product_brand.toLowerCase()===o.toLowerCase()&&a.product_info.id!==n)}function j(e,o=300){let r;return(...n)=>{clearTimeout(r),r=setTimeout(()=>{e.apply(this,n)},o)}}function D(e,o=null){const r=document.createElement("div");r.className="calculator-container";const n=o!==null,a=e.settings.products.available_categories||[],i=e.settings.currencies.principal.symbol||"$",c=e.settings.currencies.base.symbol||"Bs.",s=e.settings.products.tax_rate;r.innerHTML=`
        <div class="calculator" id="calculator-form">
            <h2 class="calculator-title"><i class="fas fa-boxes"></i> ${n?"Editar Producto":"Datos del Producto"}</h2>

            <div class="form-grid-layout">
                <div class="form-column-left">
                    <section class="form-section">
                        <h3><i class="fas fa-info-circle"></i> Información Básica</h3>
                        <div>
                            <label for="producto">Nombre del Producto <span class="text-danger">*</span></label>
                            <input type="text" id="producto" placeholder="Nombre del producto" required>
                        </div>
                        <div>
                            <label for="marca">Marca <span class="text-danger">*</span></label>
                            <input type="text" id="marca" placeholder="Ej: P.A.N., Coca-Cola" required>
                        </div>
                        <div>
                            <label for="categoria">Categoría <span class="text-danger">*</span></label>
                            <select id="categoria" required>
                                <option value="">Selecciona una categoría</option>
                                ${a.map(l=>`<option value="${l}">${l}</option>`).join("")}
                            </select>
                        </div>
                    </section>
                </div>

                <div class="form-column-right">
                    <section class="form-section">
                        <h3><i class="fas fa-calculator"></i> Cálculo de Precios</h3>
                        <div>
                            <label for="costo">Costo por Paquete/Bulto (${i}) <span class="text-danger">*</span></label>
                            <input type="number" id="costo" placeholder="Costo de 1 paquete" step="0.01" required>
                        </div>
                        <div>
                            <label for="ganancia">Porcentaje de Ganancia (%)<span class="text-danger">*</span></label>
                            <input type="number" id="ganancia" placeholder="% Ganancia" step="0.1" required>
                        </div>
                        <div class="input-group" style="display: flex; gap: 1rem;">
                            <div style="flex: 1;">
                                <label for="paquetes">Paquetes/Cajas</label>
                                <input type="number" id="paquetes" placeholder="Opcional" min="1">
                            </div>
                            <div style="flex: 1;">
                                <label for="unidades-por-paquete">Unidades por Paquete</label>
                                <input type="number" id="unidades-por-paquete" placeholder="Opcional" min="1">
                            </div>
                        </div>
                        <div>
                            <label for="unidades">Total de Unidades a Registrar <span class="text-danger">*</span></label>
                            <input type="number" id="unidades" placeholder="Total de unidades individuales" required min="1">
                        </div>
                    </section>
                </div>
            </div>

            <div class="calcular-y-save">
                <button id="btn-calcular-precio" class="btn-secondary"><i class="fas fa-calculator"></i> Calcular</button>
                <button id="btn-principal-action" class="btn-primary">
                    <i class="fas ${n?"fa-sync-alt":"fa-save"}"></i>
                    ${n?"Actualizar Producto":"Guardar Producto"}
                </button>
            </div>

            <div id="results-panel" class="results-panel" style="display: none;">
                <h4><i class="fas fa-poll"></i> Resumen del Cálculo</h4>
                <table class="results-table">
                    <tbody>
                        <tr><td class="label">Costo Total Registrado</td><td class="value" id="res-costo-total-principal">${i}0.00</td><td class="value" id="res-costo-total-base">${c}0.00</td></tr>
                        <tr><td class="label">Subtotal Venta (sin IVA)</td><td class="value" id="res-subtotal-principal">${i}0.00</td><td class="value" id="res-subtotal-base">${c}0.00</td></tr>
                        <tr><td class="label">IVA (${s}%)</td><td class="value" id="res-iva-principal">${i}0.00</td><td class="value" id="res-iva-base">${c}0.00</td></tr>
                        <tr class="total-row"><td class="label">Precio Final (Paquete)</td><td class="value" id="res-total-paquete-principal">${i}0.00</td><td class="value" id="res-total-paquete-base">${c}0.00</td></tr>
                        <tr class="total-row"><td class="label">Precio Final (Unidad)</td><td class="value" id="res-total-unidad-principal">${i}0.00</td><td class="value" id="res-total-unidad-base">${c}0.00</td></tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;const t=r.querySelector("#calculator-form"),d=r.querySelector("#results-panel"),y=r.querySelector("#paquetes"),p=r.querySelector("#unidades-por-paquete"),_=r.querySelector("#unidades"),g=t.querySelector("#costo"),E=t.querySelector("#ganancia"),q=t.querySelector("#btn-principal-action");n&&(l=>{t.querySelector("#producto").value=l.product_info.product_name,t.querySelector("#marca").value=l.product_info.product_brand,t.querySelector("#categoria").value=l.product_info.product_category,g.value=l.product_price.costo_inicial_paquete,E.value=l.product_ajuste.percentage*100,_.value=l.product_info.product_estado.disponible,p.value=l.product_price.unidades_por_paquete})(o);const m=l=>new Intl.NumberFormat("es-VE",{minimumFractionDigits:2,maximumFractionDigits:2}).format(l),L=()=>{const l=parseFloat(g.value)||0,f=parseFloat(E.value)||0,$=parseInt(p.value)||1,b=e.settings.currencies.principal.rate;if(l<=0){d.style.display="none";return}const u=I(l,f,$,e.settings);u?(t.querySelector("#res-costo-total-principal").textContent=`${i}${m(l)}`,t.querySelector("#res-costo-total-base").textContent=`${c}${m(l*b)}`,t.querySelector("#res-subtotal-principal").textContent=`${i}${m(u.subtotalMayorDolar)}`,t.querySelector("#res-subtotal-base").textContent=`${c}${m(u.subtotalMayorDolar*b)}`,t.querySelector("#res-iva-principal").textContent=`${i}${m(u.montoIVAMayorDolar)}`,t.querySelector("#res-iva-base").textContent=`${c}${m(u.montoIVAMayorDolar*b)}`,t.querySelector("#res-total-paquete-principal").textContent=`${i}${m(u.precioFinalMayorDolar)}`,t.querySelector("#res-total-paquete-base").textContent=`${c}${m(u.precioFinalMayorDolar*b)}`,t.querySelector("#res-total-unidad-principal").textContent=`${i}${m(u.precioFinalUnitarioDolar)}`,t.querySelector("#res-total-unidad-base").textContent=`${c}${m(u.precioFinalUnitarioDolar*b)}`,d.style.display="block"):d.style.display="none"},F=()=>{const l=parseInt(y.value)||0,f=parseInt(p.value)||0;l>0&&f>0&&(_.value=l*f)},S=j(L,350);return y.addEventListener("input",F),p.addEventListener("input",F),g.addEventListener("input",S),E.addEventListener("input",S),p.addEventListener("input",S),t.querySelector("#btn-calcular-precio").addEventListener("click",()=>{L(),d.style.display==="none"&&C("Introduce un costo válido para calcular.","error")}),q.addEventListener("click",async()=>{const l=t.querySelector("#producto").value,f=t.querySelector("#marca").value,$=t.querySelector("#categoria").value,b=parseFloat(t.querySelector("#costo").value),u=parseFloat(t.querySelector("#ganancia").value),P=parseInt(_.value),x=parseInt(p.value),A=parseInt(y.value);if(!N(l,f,$)||!P||P<=0){C("Los campos con * son requeridos.","error");return}if(q.disabled=!0,q.innerHTML='<i class="fas fa-spinner animate-spin"></i> Guardando...',n){const h=I(b,u,x||1,e.settings),M={product_info:{product_name:l,product_brand:f,product_category:$,product_estado:{disponible:P}},product_price:{costo_inicial_paquete:b,unidades_por_paquete:x,venta_unidad:h.precioFinalUnitarioDolar,venta_paquete:h.precioFinalMayorDolar},product_ajuste:{percentage:u/100}};await w(e,o.id,M),C(`Producto "${l}" actualizado.`,"success"),document.querySelector("#edit-product-modal")?.remove()}else{if(B(l,f,e.products)){C("Ya existe un producto con este nombre y marca.","error"),q.disabled=!1,q.innerHTML='<i class="fas fa-save"></i> Guardar Producto';return}const h=H(l,f,$,"",b,u,P,x,A,e.settings);h?(await V(e,h),t.querySelectorAll("input, select").forEach(M=>M.value=""),d.style.display="none"):C("Error al crear el producto. Revisa los datos.","error")}q.disabled=!1,q.innerHTML=`<i class="fas ${n?"fa-sync-alt":"fa-save"}"></i> ${n?"Actualizar Producto":"Guardar Producto"}`}),r}function z(e,o){const r=o.currencies.principal.symbol;return!e||e.length===0?k({icon:"fa-box-open",message:"Aún no hay productos registrados"}):`
        <table>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Categoría</th>
                    <th>Precio Mayor (${r})</th>
                    <th>Precio Unitario (${r})</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                ${e.map(n=>`
                    <tr data-product-id="${n.id}"> 
                        <td data-label="Producto">${n.product_info.product_name}</td>
                        <td data-label="Categoría">${n.product_info.product_category}</td>
                        <td data-label="Precio Mayor">${r}${n.product_price.venta_paquete.toFixed(2)}</td>
                        <td data-label="Precio Unitario">${r}${n.product_price.venta_unidad.toFixed(2)}</td>
                        <td data-label="Acciones" class="actions">
                            <div class="list-actions">
                                <button class="btn-icon" data-action="abastecer" title="Abastecer Inventario"><i class="fas fa-plus-circle"></i></button>
                                <button class="btn-icon" data-action="editar" title="Editar Producto"><i class="fas fa-edit"></i></button>
                                <button class="btn-icon danger" data-action="eliminar" title="Eliminar Producto"><i class="fas fa-trash"></i></button>
                            </div>
                        </td>
                    </tr>
                `).join("")}
            </tbody>
        </table>
    `}function T({title:e,contentElement:o,footerElement:r=null,id:n="genericModal"}){const a=document.createElement("div");return a.className="modal",a.id=n,a.style.display="flex",a.innerHTML=`
        <div class="modal-content">
            <div class="modal-header">
                <h3 class="modal-title">${e}</h3>
                <button class="close" data-action="close-modal">&times;</button>
            </div>
            <div class="modal-body" id="modal-body-container">
            </div>
        </div>
    `,a.querySelector("#modal-body-container").appendChild(o),r&&a.querySelector(".modal-content").appendChild(r),a.addEventListener("click",i=>{(i.target===a||i.target.closest('[data-action="close-modal"]'))&&a.remove()}),a}function G(e,o,r){const n=document.createElement("div");n.innerHTML=`<p>${o}</p>`;const a=document.createElement("button");a.className="btn-danger",a.innerHTML='<i class="fas fa-check"></i> Sí, continuar';const i=document.createElement("button");i.className="btn-secondary",i.innerHTML='<i class="fas fa-times"></i> Cancelar';const c=document.createElement("div");c.className="modal-footer",c.append(i,a);const s=T({title:`<i class="fas fa-exclamation-triangle"></i> ${e}`,contentElement:n,footerElement:c,id:"confirmation-modal"}),t=()=>s.remove();i.addEventListener("click",t),a.addEventListener("click",()=>{r(),t()}),document.body.appendChild(s)}function J(e,o){const r=()=>{const a=D(o),i=z(o.products,o.settings);e.innerHTML=`
            <h2 class="view-title"><i class="fas fa-box"></i> Productos</h2>
            <div class="products-layout">
                <div id="form-container"></div>
                <div class="product-list-container">${i}</div>
            </div>
        `,e.querySelector("#form-container").appendChild(a)},n=async a=>{const i=a.target.closest("[data-action]");if(!i)return;const c=i.dataset.action,s=i.closest("[data-product-id]")?.dataset.productId;if(c==="editar"&&s){const t=o.products.find(d=>d.id===s);if(t){const d=D(o,t),y=T({title:`<i class="fas fa-edit"></i> Editar Producto: ${t.product_info.product_name}`,contentElement:d,id:"edit-product-modal"});document.body.appendChild(y)}}if(c==="eliminar"&&s){const t=o.products.find(d=>d.id===s);t&&G("Eliminar Producto",`¿Estás seguro de que quieres eliminar "<strong>${t.product_info.product_name}</strong>"? Esta acción no se puede deshacer.`,async()=>{await U(o,s)})}};return r(),e.addEventListener("click",n),()=>{v.info("Limpiando ProductsView..."),e.removeEventListener("click",n)}}export{J as ProductsView};
