function $({title:i,value:r,icon:e,className:c="",isNegative:d=!1,change:s=null,miniGraph:l=!1,description:t=""}){const n=d?"negative":"",o=s?`
        <span class="stat-card-change ${s.type==="positive"?"positive":"negative"}">
            ${s.type==="positive"?'<i class="bi bi-arrow-up-short"></i>':'<i class="bi bi-arrow-down-short"></i>'}
            ${s.value}
        </span>
    `:"",p=t?`
        <div class="stat-card-footer">
            <span class="stat-card-footer-text">${t}</span>
        </div>
    `:s?`
        <div class="stat-card-footer">
            ${o}
            <span class="stat-card-footer-text">desde el último mes</span> 
        </div>
    `:"",a=()=>40-(Math.random()*20+5),v=`
        <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            <rect class="graph-bar" x="5" y="${40-a()}" width="12" height="${a()}"></rect>
            <rect class="graph-bar" x="25" y="${40-a()}" width="12" height="${a()}"></rect>
            <rect class="graph-bar" x="45" y="${40-a()}" width="12" height="${a()}"></rect>
            <rect class="graph-bar" x="65" y="${40-a()}" width="12" height="${a()}"></rect>
            <rect class="graph-bar" x="85" y="${40-a()}" width="12" height="${a()}"></rect>
        </svg>
    `,h=l?`
        <div class="stat-card-mini-graph">
            ${v}
        </div>
    `:"";return`
        <div class="stat-card ${c}">
            <div class="stat-card-main">
                <div class="stat-card-icon">
                    <i class="bi ${e}"></i>
                </div>
                
                <div class="stat-card-info">
                    <span class="stat-card-title">${i}</span>
                    <span class="stat-card-value ${n}">${r}</span>
                </div>
                
                ${h}
            </div>
            
            ${p}
        </div>
    `}export{$ as S};
