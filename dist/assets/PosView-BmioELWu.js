import{E as a}from"./EmptyState-Cydos9GH.js";import{L as r}from"./index-C5SNnDkz.js";function o(e,t){try{return e.innerHTML=`
        <div class="view-panel-content">
            <div class="view-header align-items-start mb-4">
                <div>
                    <h2 class="view-title">
                        <i class="bi bi-printer-fill me-2"></i> Punto de Venta (POS)
                    </h2>
                </div>
                <div class="ms-auto text-end">
                    <button class="btn-primary"><i class="bi bi-plus-lg"></i> Nueva Venta</button>
                </div>
            </div>

            ${a({icon:"bi-cart",message:"La interfaz de caja se construirá aquí."})}
        </div>
        `,()=>{r.info("Limpiando PosView...")}}catch(i){return r.error("[PosView] Error de renderizado:",i),e.innerHTML=`<div class="alert alert-danger m-4">Error al cargar el Punto de Venta: ${i.message}</div>`,()=>{}}}export{o as PosView};
