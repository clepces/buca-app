import{E as p}from"./EmptyState-Cydos9GH.js";function c({columns:n,data:r,onRenderRow:s}){if(!r||r.length===0)return p({icon:"bi-table",message:"No hay datos para mostrar."});const d=n.map(e=>`<th>${e.header}</th>`).join(""),i=r.map(e=>s?s(e):`<tr>${n.map(t=>{let a="N/A";return t.render?a=t.render(e):t.key&&(a=t.key.split(".").reduce((o,l)=>o?.[l],e)||""),`<td data-label="${t.header}">${a}</td>`}).join("")}</tr>`).join("");return`
        <div class="table-container-wrapper">
            <table>
                <thead>
                    <tr>${d}</tr>
                </thead>
                <tbody>
                    ${i}
                </tbody>
            </table>
        </div>
    `}export{c as D};
