function g(a=[]){const r=[15,30,25,35,20],s=(a&&a.length>0?a:r).slice(-5);for(;s.length<5;)s.unshift(0);const n=Math.max(...s);return n===0?`
        <svg viewBox="0 0 100 40" preserveAspectRatio="none">
            ${[0,1,2,3,4].map(t=>`
                <rect class="graph-bar" 
                      x="${5+t*20}" 
                      y="40" 
                      width="12" 
                      height="0"></rect>
            `).join("")}
        </svg>`:`<svg viewBox="0 0 100 40" preserveAspectRatio="none">${s.map((t,c)=>{let i=t/n*35;i<1&&t>0&&(i=1);const o=40-i;return`
            <rect class="graph-bar" 
                  x="${5+c*20}" 
                  y="${o}" 
                  width="12" 
                  height="${i}"
                  style="animation-delay: ${c*.05}s">
            </rect>
        `}).join("")}</svg>`}function u({id:a="",title:l,value:d,icon:v,className:p="",isNegative:r=!1,change:e=null,description:s="",miniGraphData:n=null}){const $=r?"negative":"",t=e?`
        <span class="stat-card-change ${e.type==="positive"?"positive":"negative"}">
            ${e.type==="positive"?'<i class="bi bi-arrow-up-short"></i>':'<i class="bi bi-arrow-down-short"></i>'}
            ${e.value}
        </span>
    `:"",c=s?`
        <span class="stat-card-footer-text">${s}</span>
    `:"",i=t||c?`
        <div class="stat-card-footer">
            ${t}
            ${c}
        </div>
    `:"",o=g(n),h=n?`
        <div class="stat-card-mini-graph">
            ${o}
        </div>
    `:"";return`
        <div class="stat-card ${p}" ${a?`id="${a}"`:""}> <div class="stat-card-main">
                <div class="stat-card-icon">
                    <i class="bi ${v}"></i>
                </div>
                
                <div class="stat-card-info">
                    <span class="stat-card-title">${l}</span>
                    <span class="stat-card-value ${$}">${d}</span>
                </div>
                
                ${h}
            </div>
            
            ${i} </div>
    `}export{u as S};
