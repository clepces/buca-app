const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CompaniesView-C3haYZNP.js","assets/StatCard-B6sN2hmT.js","assets/EmptyState-Cydos9GH.js","assets/useListController-B6sTLGuA.js","assets/PosView-BmioELWu.js","assets/ClientsView-C3qwuPdZ.js","assets/DataTable-Cqt80ZsM.js"])))=>i.map(i=>d[i]);
(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(s){if(s.ep)return;s.ep=!0;const i=t(s);fetch(s.href,i)}})();const t_=()=>{};var Lu={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xd=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},n_=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const i=n[t++];e[r++]=String.fromCharCode((s&31)<<6|i&63)}else if(s>239&&s<365){const i=n[t++],o=n[t++],c=n[t++],l=((s&7)<<18|(i&63)<<12|(o&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(l>>10)),e[r++]=String.fromCharCode(56320+(l&1023))}else{const i=n[t++],o=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(i&63)<<6|o&63)}}return e.join("")},Zd={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const i=n[s],o=s+1<n.length,c=o?n[s+1]:0,l=s+2<n.length,h=l?n[s+2]:0,f=i>>2,p=(i&3)<<4|c>>4;let g=(c&15)<<2|h>>6,w=h&63;l||(w=64,o||(g=64)),r.push(t[f],t[p],t[g],t[w])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Xd(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):n_(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const i=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const p=s<n.length?t[n.charAt(s)]:64;if(++s,i==null||c==null||h==null||p==null)throw new r_;const g=i<<2|c>>4;if(r.push(g),h!==64){const w=c<<4&240|h>>2;if(r.push(w),p!==64){const A=h<<6&192|p;r.push(A)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class r_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const s_=function(n){const e=Xd(n);return Zd.encodeByteArray(e,!0)},ef=function(n){return s_(n).replace(/\./g,"")},tf=function(n){try{return Zd.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function nf(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const i_=()=>nf().__FIREBASE_DEFAULTS__,o_=()=>{if(typeof process>"u"||typeof Lu>"u")return;const n=Lu.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},a_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&tf(n[1]);return e&&JSON.parse(e)},Vo=()=>{try{return t_()||i_()||o_()||a_()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},c_=n=>Vo()?.emulatorHosts?.[n],rf=()=>Vo()?.config,sf=n=>Vo()?.[`_${n}`];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class l_{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Kr(n){try{return(n.startsWith("http://")||n.startsWith("https://")?new URL(n).hostname:n).endsWith(".cloudworkstations.dev")}catch{return!1}}async function of(n){return(await fetch(n,{credentials:"include"})).ok}const Ds={};function u_(){const n={prod:[],emulator:[]};for(const e of Object.keys(Ds))Ds[e]?n.emulator.push(e):n.prod.push(e);return n}function h_(n){let e=document.getElementById(n),t=!1;return e||(e=document.createElement("div"),e.setAttribute("id",n),t=!0),{created:t,element:e}}let Mu=!1;function d_(n,e){if(typeof window>"u"||typeof document>"u"||!Kr(window.location.host)||Ds[n]===e||Ds[n]||Mu)return;Ds[n]=e;function t(g){return`__firebase__banner__${g}`}const r="__firebase__banner",i=u_().prod.length>0;function o(){const g=document.getElementById(r);g&&g.remove()}function c(g){g.style.display="flex",g.style.background="#7faaf0",g.style.position="fixed",g.style.bottom="5px",g.style.left="5px",g.style.padding=".5em",g.style.borderRadius="5px",g.style.alignItems="center"}function l(g,w){g.setAttribute("width","24"),g.setAttribute("id",w),g.setAttribute("height","24"),g.setAttribute("viewBox","0 0 24 24"),g.setAttribute("fill","none"),g.style.marginLeft="-6px"}function h(){const g=document.createElement("span");return g.style.cursor="pointer",g.style.marginLeft="16px",g.style.fontSize="24px",g.innerHTML=" &times;",g.onclick=()=>{Mu=!0,o()},g}function f(g,w){g.setAttribute("id",w),g.innerText="Learn more",g.href="https://firebase.google.com/docs/studio/preview-apps#preview-backend",g.setAttribute("target","__blank"),g.style.paddingLeft="5px",g.style.textDecoration="underline"}function p(){const g=h_(r),w=t("text"),A=document.getElementById(w)||document.createElement("span"),V=t("learnmore"),D=document.getElementById(V)||document.createElement("a"),j=t("preprendIcon"),$=document.getElementById(j)||document.createElementNS("http://www.w3.org/2000/svg","svg");if(g.created){const U=g.element;c(U),f(D,V);const z=h();l($,j),U.append($,A,D,z),document.body.appendChild(U)}i?(A.innerText="Preview backend disconnected.",$.innerHTML=`<g clip-path="url(#clip0_6013_33858)">
<path d="M4.8 17.6L12 5.6L19.2 17.6H4.8ZM6.91667 16.4H17.0833L12 7.93333L6.91667 16.4ZM12 15.6C12.1667 15.6 12.3056 15.5444 12.4167 15.4333C12.5389 15.3111 12.6 15.1667 12.6 15C12.6 14.8333 12.5389 14.6944 12.4167 14.5833C12.3056 14.4611 12.1667 14.4 12 14.4C11.8333 14.4 11.6889 14.4611 11.5667 14.5833C11.4556 14.6944 11.4 14.8333 11.4 15C11.4 15.1667 11.4556 15.3111 11.5667 15.4333C11.6889 15.5444 11.8333 15.6 12 15.6ZM11.4 13.6H12.6V10.4H11.4V13.6Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6013_33858">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`):($.innerHTML=`<g clip-path="url(#clip0_6083_34804)">
<path d="M11.4 15.2H12.6V11.2H11.4V15.2ZM12 10C12.1667 10 12.3056 9.94444 12.4167 9.83333C12.5389 9.71111 12.6 9.56667 12.6 9.4C12.6 9.23333 12.5389 9.09444 12.4167 8.98333C12.3056 8.86111 12.1667 8.8 12 8.8C11.8333 8.8 11.6889 8.86111 11.5667 8.98333C11.4556 9.09444 11.4 9.23333 11.4 9.4C11.4 9.56667 11.4556 9.71111 11.5667 9.83333C11.6889 9.94444 11.8333 10 12 10ZM12 18.4C11.1222 18.4 10.2944 18.2333 9.51667 17.9C8.73889 17.5667 8.05556 17.1111 7.46667 16.5333C6.88889 15.9444 6.43333 15.2611 6.1 14.4833C5.76667 13.7056 5.6 12.8778 5.6 12C5.6 11.1111 5.76667 10.2833 6.1 9.51667C6.43333 8.73889 6.88889 8.06111 7.46667 7.48333C8.05556 6.89444 8.73889 6.43333 9.51667 6.1C10.2944 5.76667 11.1222 5.6 12 5.6C12.8889 5.6 13.7167 5.76667 14.4833 6.1C15.2611 6.43333 15.9389 6.89444 16.5167 7.48333C17.1056 8.06111 17.5667 8.73889 17.9 9.51667C18.2333 10.2833 18.4 11.1111 18.4 12C18.4 12.8778 18.2333 13.7056 17.9 14.4833C17.5667 15.2611 17.1056 15.9444 16.5167 16.5333C15.9389 17.1111 15.2611 17.5667 14.4833 17.9C13.7167 18.2333 12.8889 18.4 12 18.4ZM12 17.2C13.4444 17.2 14.6722 16.6944 15.6833 15.6833C16.6944 14.6722 17.2 13.4444 17.2 12C17.2 10.5556 16.6944 9.32778 15.6833 8.31667C14.6722 7.30555 13.4444 6.8 12 6.8C10.5556 6.8 9.32778 7.30555 8.31667 8.31667C7.30556 9.32778 6.8 10.5556 6.8 12C6.8 13.4444 7.30556 14.6722 8.31667 15.6833C9.32778 16.6944 10.5556 17.2 12 17.2Z" fill="#212121"/>
</g>
<defs>
<clipPath id="clip0_6083_34804">
<rect width="24" height="24" fill="white"/>
</clipPath>
</defs>`,A.innerText="Preview backend running in this workspace."),A.setAttribute("id",w)}document.readyState==="loading"?window.addEventListener("DOMContentLoaded",p):p()}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Se(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function f_(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Se())}function af(){const n=Vo()?.forceEnvironment;if(n==="node")return!0;if(n==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function p_(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function m_(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function g_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function __(){const n=Se();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function cf(){return!af()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function lf(){return!af()&&!!navigator.userAgent&&(navigator.userAgent.includes("Safari")||navigator.userAgent.includes("WebKit"))&&!navigator.userAgent.includes("Chrome")}function uf(){try{return typeof indexedDB=="object"}catch{return!1}}function y_(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{e(s.error?.message||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const v_="FirebaseError";class $t extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=v_,Object.setPrototypeOf(this,$t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ri.prototype.create)}}class ri{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,i=this.errors[e],o=i?E_(i,r):"Error",c=`${this.serviceName}: ${o} (${s}).`;return new $t(s,c,r)}}function E_(n,e){return n.replace(I_,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const I_=/\{\$([^}]+)}/g;function w_(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function zn(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const i=n[s],o=e[s];if(Fu(i)&&Fu(o)){if(!zn(i,o))return!1}else if(i!==o)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Fu(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function si(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function bs(n){const e={};return n.replace(/^\?/,"").split("&").forEach(r=>{if(r){const[s,i]=r.split("=");e[decodeURIComponent(s)]=decodeURIComponent(i)}}),e}function Ts(n){const e=n.indexOf("?");if(!e)return"";const t=n.indexOf("#",e);return n.substring(e,t>0?t:void 0)}function b_(n,e){const t=new T_(n,e);return t.subscribe.bind(t)}class T_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");A_(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=Ca),s.error===void 0&&(s.error=Ca),s.complete===void 0&&(s.complete=Ca);const i=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),i}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function A_(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Ca(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Ve(n){return n&&n._delegate?n._delegate:n}class jn{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cn="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class S_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new l_;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){const t=this.normalizeInstanceIdentifier(e?.identifier),r=e?.optional??!1;if(this.isInitialized(t)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:t})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(R_(e))try{this.getOrInitializeService({instanceIdentifier:Cn})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const i=this.getOrInitializeService({instanceIdentifier:s});r.resolve(i)}catch{}}}}clearInstance(e=Cn){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Cn){return this.instances.has(e)}getOptions(e=Cn){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[i,o]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(i);r===c&&o.resolve(s)}return s}onInit(e,t){const r=this.normalizeInstanceIdentifier(t),s=this.onInitCallbacks.get(r)??new Set;s.add(e),this.onInitCallbacks.set(r,s);const i=this.instances.get(r);return i&&e(i,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:P_(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=Cn){return this.component?this.component.multipleInstances?e:Cn:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function P_(n){return n===Cn?void 0:n}function R_(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class C_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new S_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Z;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(Z||(Z={}));const D_={debug:Z.DEBUG,verbose:Z.VERBOSE,info:Z.INFO,warn:Z.WARN,error:Z.ERROR,silent:Z.SILENT},V_=Z.INFO,N_={[Z.DEBUG]:"log",[Z.VERBOSE]:"log",[Z.INFO]:"info",[Z.WARN]:"warn",[Z.ERROR]:"error"},k_=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=N_[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};let Oc=class{constructor(e){this.name=e,this._logLevel=V_,this._logHandler=k_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in Z))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?D_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,Z.DEBUG,...e),this._logHandler(this,Z.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,Z.VERBOSE,...e),this._logHandler(this,Z.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,Z.INFO,...e),this._logHandler(this,Z.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,Z.WARN,...e),this._logHandler(this,Z.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,Z.ERROR,...e),this._logHandler(this,Z.ERROR,...e)}};const x_=(n,e)=>e.some(t=>n instanceof t);let Uu,Bu;function O_(){return Uu||(Uu=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function L_(){return Bu||(Bu=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const hf=new WeakMap,Ka=new WeakMap,df=new WeakMap,Da=new WeakMap,Lc=new WeakMap;function M_(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(an(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&hf.set(t,n)}).catch(()=>{}),Lc.set(e,n),e}function F_(n){if(Ka.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Ka.set(n,e)}let Wa={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ka.get(n);if(e==="objectStoreNames")return n.objectStoreNames||df.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return an(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function U_(n){Wa=n(Wa)}function B_(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(Va(this),e,...t);return df.set(r,e.sort?e.sort():[e]),an(r)}:L_().includes(n)?function(...e){return n.apply(Va(this),e),an(hf.get(this))}:function(...e){return an(n.apply(Va(this),e))}}function $_(n){return typeof n=="function"?B_(n):(n instanceof IDBTransaction&&F_(n),x_(n,O_())?new Proxy(n,Wa):n)}function an(n){if(n instanceof IDBRequest)return M_(n);if(Da.has(n))return Da.get(n);const e=$_(n);return e!==n&&(Da.set(n,e),Lc.set(e,n)),e}const Va=n=>Lc.get(n);function q_(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=an(o);return r&&o.addEventListener("upgradeneeded",l=>{r(an(o.result),l.oldVersion,l.newVersion,an(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const z_=["get","getKey","getAll","getAllKeys","count"],j_=["put","add","delete","clear"],Na=new Map;function $u(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Na.get(e))return Na.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=j_.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||z_.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return Na.set(e,i),i}U_(n=>({...n,get:(e,t,r)=>$u(e,t)||n.get(e,t,r),has:(e,t)=>!!$u(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class G_{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(H_(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function H_(n){return n.getComponent()?.type==="VERSION"}const Qa="@firebase/app",qu="0.14.3";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Lt=new Oc("@firebase/app"),K_="@firebase/app-compat",W_="@firebase/analytics-compat",Q_="@firebase/analytics",Y_="@firebase/app-check-compat",J_="@firebase/app-check",X_="@firebase/auth",Z_="@firebase/auth-compat",ey="@firebase/database",ty="@firebase/data-connect",ny="@firebase/database-compat",ry="@firebase/functions",sy="@firebase/functions-compat",iy="@firebase/installations",oy="@firebase/installations-compat",ay="@firebase/messaging",cy="@firebase/messaging-compat",ly="@firebase/performance",uy="@firebase/performance-compat",hy="@firebase/remote-config",dy="@firebase/remote-config-compat",fy="@firebase/storage",py="@firebase/storage-compat",my="@firebase/firestore",gy="@firebase/ai",_y="@firebase/firestore-compat",yy="firebase",vy="12.3.0";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ya="[DEFAULT]",Ey={[Qa]:"fire-core",[K_]:"fire-core-compat",[Q_]:"fire-analytics",[W_]:"fire-analytics-compat",[J_]:"fire-app-check",[Y_]:"fire-app-check-compat",[X_]:"fire-auth",[Z_]:"fire-auth-compat",[ey]:"fire-rtdb",[ty]:"fire-data-connect",[ny]:"fire-rtdb-compat",[ry]:"fire-fn",[sy]:"fire-fn-compat",[iy]:"fire-iid",[oy]:"fire-iid-compat",[ay]:"fire-fcm",[cy]:"fire-fcm-compat",[ly]:"fire-perf",[uy]:"fire-perf-compat",[hy]:"fire-rc",[dy]:"fire-rc-compat",[fy]:"fire-gcs",[py]:"fire-gcs-compat",[my]:"fire-fst",[_y]:"fire-fst-compat",[gy]:"fire-vertex","fire-js":"fire-js",[yy]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const io=new Map,Iy=new Map,Ja=new Map;function zu(n,e){try{n.container.addComponent(e)}catch(t){Lt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function Dr(n){const e=n.name;if(Ja.has(e))return Lt.debug(`There were multiple attempts to register component ${e}.`),!1;Ja.set(e,n);for(const t of io.values())zu(t,n);for(const t of Iy.values())zu(t,n);return!0}function Mc(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function ht(n){return n==null?!1:n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const wy={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},cn=new ri("app","Firebase",wy);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class by{constructor(e,t,r){this._isDeleted=!1,this._options={...e},this._config={...t},this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new jn("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw cn.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wr=vy;function ff(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r={name:Ya,automaticDataCollectionEnabled:!0,...e},s=r.name;if(typeof s!="string"||!s)throw cn.create("bad-app-name",{appName:String(s)});if(t||(t=rf()),!t)throw cn.create("no-options");const i=io.get(s);if(i){if(zn(t,i.options)&&zn(r,i.config))return i;throw cn.create("duplicate-app",{appName:s})}const o=new C_(s);for(const l of Ja.values())o.addComponent(l);const c=new by(t,r,o);return io.set(s,c),c}function Ty(n=Ya){const e=io.get(n);if(!e&&n===Ya&&rf())return ff();if(!e)throw cn.create("no-app",{appName:n});return e}function ln(n,e,t){let r=Ey[n]??n;t&&(r+=`-${t}`);const s=r.match(/\s|\//),i=e.match(/\s|\//);if(s||i){const o=[`Unable to register library "${r}" with version "${e}":`];s&&o.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&i&&o.push("and"),i&&o.push(`version name "${e}" contains illegal characters (whitespace or "/")`),Lt.warn(o.join(" "));return}Dr(new jn(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay="firebase-heartbeat-database",Sy=1,$s="firebase-heartbeat-store";let ka=null;function pf(){return ka||(ka=q_(Ay,Sy,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore($s)}catch(t){console.warn(t)}}}}).catch(n=>{throw cn.create("idb-open",{originalErrorMessage:n.message})})),ka}async function Py(n){try{const t=(await pf()).transaction($s),r=await t.objectStore($s).get(mf(n));return await t.done,r}catch(e){if(e instanceof $t)Lt.warn(e.message);else{const t=cn.create("idb-get",{originalErrorMessage:e?.message});Lt.warn(t.message)}}}async function ju(n,e){try{const r=(await pf()).transaction($s,"readwrite");await r.objectStore($s).put(e,mf(n)),await r.done}catch(t){if(t instanceof $t)Lt.warn(t.message);else{const r=cn.create("idb-set",{originalErrorMessage:t?.message});Lt.warn(r.message)}}}function mf(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ry=1024,Cy=30;class Dy{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Ny(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){try{const t=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=Gu();if(this._heartbeatsCache?.heartbeats==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(s=>s.date===r))return;if(this._heartbeatsCache.heartbeats.push({date:r,agent:t}),this._heartbeatsCache.heartbeats.length>Cy){const s=ky(this._heartbeatsCache.heartbeats);this._heartbeatsCache.heartbeats.splice(s,1)}return this._storage.overwrite(this._heartbeatsCache)}catch(e){Lt.warn(e)}}async getHeartbeatsHeader(){try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,this._heartbeatsCache?.heartbeats==null||this._heartbeatsCache.heartbeats.length===0)return"";const e=Gu(),{heartbeatsToSend:t,unsentEntries:r}=Vy(this._heartbeatsCache.heartbeats),s=ef(JSON.stringify({version:2,heartbeats:t}));return this._heartbeatsCache.lastSentHeartbeatDate=e,r.length>0?(this._heartbeatsCache.heartbeats=r,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s}catch(e){return Lt.warn(e),""}}}function Gu(){return new Date().toISOString().substring(0,10)}function Vy(n,e=Ry){const t=[];let r=n.slice();for(const s of n){const i=t.find(o=>o.agent===s.agent);if(i){if(i.dates.push(s.date),Hu(t)>e){i.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),Hu(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class Ny{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return uf()?y_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Py(this.app);return t?.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return ju(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){if(await this._canUseIndexedDBPromise){const r=await this.read();return ju(this.app,{lastSentHeartbeatDate:e.lastSentHeartbeatDate??r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return}}function Hu(n){return ef(JSON.stringify({version:2,heartbeats:n})).length}function ky(n){if(n.length===0)return-1;let e=0,t=n[0].date;for(let r=1;r<n.length;r++)n[r].date<t&&(t=n[r].date,e=r);return e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xy(n){Dr(new jn("platform-logger",e=>new G_(e),"PRIVATE")),Dr(new jn("heartbeat",e=>new Dy(e),"PRIVATE")),ln(Qa,qu,n),ln(Qa,qu,"esm2020"),ln("fire-js","")}xy("");function gf(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const Oy=gf,_f=new ri("auth","Firebase",gf());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oo=new Oc("@firebase/auth");function Ly(n,...e){oo.logLevel<=Z.WARN&&oo.warn(`Auth (${Wr}): ${n}`,...e)}function qi(n,...e){oo.logLevel<=Z.ERROR&&oo.error(`Auth (${Wr}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pt(n,...e){throw Fc(n,...e)}function wt(n,...e){return Fc(n,...e)}function yf(n,e,t){const r={...Oy(),[e]:t};return new ri("auth","Firebase",r).create(e,{appName:n.name})}function un(n){return yf(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Fc(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return _f.create(n,...e)}function W(n,e,...t){if(!n)throw Fc(e,...t)}function Nt(n){const e="INTERNAL ASSERTION FAILED: "+n;throw qi(e),new Error(e)}function Mt(n,e){n||Nt(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xa(){return typeof self<"u"&&self.location?.href||""}function My(){return Ku()==="http:"||Ku()==="https:"}function Ku(){return typeof self<"u"&&self.location?.protocol||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Fy(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(My()||m_()||"connection"in navigator)?navigator.onLine:!0}function Uy(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e,t){this.shortDelay=e,this.longDelay=t,Mt(t>e,"Short delay should be less than long delay!"),this.isMobile=f_()||g_()}get(){return Fy()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Uc(n,e){Mt(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vf{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Nt("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Nt("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Nt("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const By={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $y=["/v1/accounts:signInWithCustomToken","/v1/accounts:signInWithEmailLink","/v1/accounts:signInWithIdp","/v1/accounts:signInWithPassword","/v1/accounts:signInWithPhoneNumber","/v1/token"],qy=new ii(3e4,6e4);function Zn(n,e){return n.tenantId&&!e.tenantId?{...e,tenantId:n.tenantId}:e}async function yn(n,e,t,r,s={}){return Ef(n,s,async()=>{let i={},o={};r&&(e==="GET"?o=r:i={body:JSON.stringify(r)});const c=si({key:n.config.apiKey,...o}).slice(1),l=await n._getAdditionalHeaders();l["Content-Type"]="application/json",n.languageCode&&(l["X-Firebase-Locale"]=n.languageCode);const h={method:e,headers:l,...i};return p_()||(h.referrerPolicy="no-referrer"),n.emulatorConfig&&Kr(n.emulatorConfig.host)&&(h.credentials="include"),vf.fetch()(await If(n,n.config.apiHost,t,c),h)})}async function Ef(n,e,t){n._canInitEmulator=!1;const r={...By,...e};try{const s=new jy(n),i=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const o=await i.json();if("needConfirmation"in o)throw Ni(n,"account-exists-with-different-credential",o);if(i.ok&&!("errorMessage"in o))return o;{const c=i.ok?o.errorMessage:o.error.message,[l,h]=c.split(" : ");if(l==="FEDERATED_USER_ID_ALREADY_LINKED")throw Ni(n,"credential-already-in-use",o);if(l==="EMAIL_EXISTS")throw Ni(n,"email-already-in-use",o);if(l==="USER_DISABLED")throw Ni(n,"user-disabled",o);const f=r[l]||l.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw yf(n,f,h);pt(n,f)}}catch(s){if(s instanceof $t)throw s;pt(n,"network-request-failed",{message:String(s)})}}async function No(n,e,t,r,s={}){const i=await yn(n,e,t,r,s);return"mfaPendingCredential"in i&&pt(n,"multi-factor-auth-required",{_serverResponse:i}),i}async function If(n,e,t,r){const s=`${e}${t}?${r}`,i=n,o=i.config.emulator?Uc(n.config,s):`${n.config.apiScheme}://${s}`;return $y.includes(t)&&(await i._persistenceManagerAvailable,i._getPersistenceType()==="COOKIE")?i._getPersistence()._getFinalTarget(o).toString():o}function zy(n){switch(n){case"ENFORCE":return"ENFORCE";case"AUDIT":return"AUDIT";case"OFF":return"OFF";default:return"ENFORCEMENT_STATE_UNSPECIFIED"}}class jy{clearNetworkTimeout(){clearTimeout(this.timer)}constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(wt(this.auth,"network-request-failed")),qy.get())})}}function Ni(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=wt(n,e,r);return s.customData._tokenResponse=t,s}function Wu(n){return n!==void 0&&n.enterprise!==void 0}class Gy{constructor(e){if(this.siteKey="",this.recaptchaEnforcementState=[],e.recaptchaKey===void 0)throw new Error("recaptchaKey undefined");this.siteKey=e.recaptchaKey.split("/")[3],this.recaptchaEnforcementState=e.recaptchaEnforcementState}getProviderEnforcementState(e){if(!this.recaptchaEnforcementState||this.recaptchaEnforcementState.length===0)return null;for(const t of this.recaptchaEnforcementState)if(t.provider&&t.provider===e)return zy(t.enforcementState);return null}isProviderEnabled(e){return this.getProviderEnforcementState(e)==="ENFORCE"||this.getProviderEnforcementState(e)==="AUDIT"}isAnyProviderEnabled(){return this.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")||this.isProviderEnabled("PHONE_PROVIDER")}}async function Hy(n,e){return yn(n,"GET","/v2/recaptchaConfig",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ky(n,e){return yn(n,"POST","/v1/accounts:delete",e)}async function ao(n,e){return yn(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function Wy(n,e=!1){const t=Ve(n),r=await t.getIdToken(e),s=Bc(r);W(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const i=typeof s.firebase=="object"?s.firebase:void 0,o=i?.sign_in_provider;return{claims:s,token:r,authTime:Vs(xa(s.auth_time)),issuedAtTime:Vs(xa(s.iat)),expirationTime:Vs(xa(s.exp)),signInProvider:o||null,signInSecondFactor:i?.sign_in_second_factor||null}}function xa(n){return Number(n)*1e3}function Bc(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return qi("JWT malformed, contained fewer than 3 sections"),null;try{const s=tf(t);return s?JSON.parse(s):(qi("Failed to decode base64 JWT payload"),null)}catch(s){return qi("Caught error parsing JWT payload as JSON",s?.toString()),null}}function Qu(n){const e=Bc(n);return W(e,"internal-error"),W(typeof e.exp<"u","internal-error"),W(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function qs(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof $t&&Qy(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function Qy({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yy{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){if(e){const t=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),t}else{this.errorBackoff=3e4;const r=(this.user.stsTokenManager.expirationTime??0)-Date.now()-3e5;return Math.max(0,r)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){e?.code==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Za{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Vs(this.lastLoginAt),this.creationTime=Vs(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function co(n){const e=n.auth,t=await n.getIdToken(),r=await qs(n,ao(e,{idToken:t}));W(r?.users.length,e,"internal-error");const s=r.users[0];n._notifyReloadListener(s);const i=s.providerUserInfo?.length?wf(s.providerUserInfo):[],o=Xy(n.providerData,i),c=n.isAnonymous,l=!(n.email&&s.passwordHash)&&!o?.length,h=c?l:!1,f={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Za(s.createdAt,s.lastLoginAt),isAnonymous:h};Object.assign(n,f)}async function Jy(n){const e=Ve(n);await co(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function Xy(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function wf(n){return n.map(({providerId:e,...t})=>({providerId:e,uid:t.rawId||"",displayName:t.displayName||null,email:t.email||null,phoneNumber:t.phoneNumber||null,photoURL:t.photoUrl||null}))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Zy(n,e){const t=await Ef(n,{},async()=>{const r=si({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:i}=n.config,o=await If(n,s,"/v1/token",`key=${i}`),c=await n._getAdditionalHeaders();c["Content-Type"]="application/x-www-form-urlencoded";const l={method:"POST",headers:c,body:r};return n.emulatorConfig&&Kr(n.emulatorConfig.host)&&(l.credentials="include"),vf.fetch()(o,l)});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function ev(n,e){return yn(n,"POST","/v2/accounts:revokeToken",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class br{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){W(e.idToken,"internal-error"),W(typeof e.idToken<"u","internal-error"),W(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):Qu(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){W(e.length!==0,"internal-error");const t=Qu(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(W(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:i}=await Zy(e,t);this.updateTokensAndExpiration(r,s,Number(i))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:i}=t,o=new br;return r&&(W(typeof r=="string","internal-error",{appName:e}),o.refreshToken=r),s&&(W(typeof s=="string","internal-error",{appName:e}),o.accessToken=s),i&&(W(typeof i=="number","internal-error",{appName:e}),o.expirationTime=i),o}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new br,this.toJSON())}_performRefresh(){return Nt("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(n,e){W(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class ft{constructor({uid:e,auth:t,stsTokenManager:r,...s}){this.providerId="firebase",this.proactiveRefresh=new Yy(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=e,this.auth=t,this.stsTokenManager=r,this.accessToken=r.accessToken,this.displayName=s.displayName||null,this.email=s.email||null,this.emailVerified=s.emailVerified||!1,this.phoneNumber=s.phoneNumber||null,this.photoURL=s.photoURL||null,this.isAnonymous=s.isAnonymous||!1,this.tenantId=s.tenantId||null,this.providerData=s.providerData?[...s.providerData]:[],this.metadata=new Za(s.createdAt||void 0,s.lastLoginAt||void 0)}async getIdToken(e){const t=await qs(this,this.stsTokenManager.getToken(this.auth,e));return W(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return Wy(this,e)}reload(){return Jy(this)}_assign(e){this!==e&&(W(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>({...t})),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new ft({...this,auth:e,stsTokenManager:this.stsTokenManager._clone()});return t.metadata._copy(this.metadata),t}_onReload(e){W(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await co(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(ht(this.auth.app))return Promise.reject(un(this.auth));const e=await this.getIdToken();return await qs(this,Ky(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return{uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>({...e})),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId,...this.metadata.toJSON(),apiKey:this.auth.config.apiKey,appName:this.auth.name}}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){const r=t.displayName??void 0,s=t.email??void 0,i=t.phoneNumber??void 0,o=t.photoURL??void 0,c=t.tenantId??void 0,l=t._redirectEventId??void 0,h=t.createdAt??void 0,f=t.lastLoginAt??void 0,{uid:p,emailVerified:g,isAnonymous:w,providerData:A,stsTokenManager:V}=t;W(p&&V,e,"internal-error");const D=br.fromJSON(this.name,V);W(typeof p=="string",e,"internal-error"),Yt(r,e.name),Yt(s,e.name),W(typeof g=="boolean",e,"internal-error"),W(typeof w=="boolean",e,"internal-error"),Yt(i,e.name),Yt(o,e.name),Yt(c,e.name),Yt(l,e.name),Yt(h,e.name),Yt(f,e.name);const j=new ft({uid:p,auth:e,email:s,emailVerified:g,displayName:r,isAnonymous:w,photoURL:o,phoneNumber:i,tenantId:c,stsTokenManager:D,createdAt:h,lastLoginAt:f});return A&&Array.isArray(A)&&(j.providerData=A.map($=>({...$}))),l&&(j._redirectEventId=l),j}static async _fromIdTokenResponse(e,t,r=!1){const s=new br;s.updateFromServerResponse(t);const i=new ft({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await co(i),i}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];W(s.localId!==void 0,"internal-error");const i=s.providerUserInfo!==void 0?wf(s.providerUserInfo):[],o=!(s.email&&s.passwordHash)&&!i?.length,c=new br;c.updateFromIdToken(r);const l=new ft({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:o}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:i,metadata:new Za(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!i?.length};return Object.assign(l,h),l}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yu=new Map;function kt(n){Mt(n instanceof Function,"Expected a class definition");let e=Yu.get(n);return e?(Mt(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Yu.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bf{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}bf.type="NONE";const Ju=bf;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zi(n,e,t){return`firebase:${n}:${e}:${t}`}class Tr{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:i}=this.auth;this.fullUserKey=zi(this.userKey,s.apiKey,i),this.fullPersistenceKey=zi("persistence",s.apiKey,i),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);if(!e)return null;if(typeof e=="string"){const t=await ao(this.auth,{idToken:e}).catch(()=>{});return t?ft._fromGetAccountInfoResponse(this.auth,t,e):null}return ft._fromJSON(this.auth,e)}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new Tr(kt(Ju),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let i=s[0]||kt(Ju);const o=zi(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(o);if(f){let p;if(typeof f=="string"){const g=await ao(e,{idToken:f}).catch(()=>{});if(!g)break;p=await ft._fromGetAccountInfoResponse(e,g,f)}else p=ft._fromJSON(e,f);h!==i&&(c=p),i=h;break}}catch{}const l=s.filter(h=>h._shouldAllowMigration);return!i._shouldAllowMigration||!l.length?new Tr(i,e,r):(i=l[0],c&&await i._set(o,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==i)try{await h._remove(o)}catch{}})),new Tr(i,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xu(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(Pf(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(Tf(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(Cf(e))return"Blackberry";if(Df(e))return"Webos";if(Af(e))return"Safari";if((e.includes("chrome/")||Sf(e))&&!e.includes("edge/"))return"Chrome";if(Rf(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if(r?.length===2)return r[1]}return"Other"}function Tf(n=Se()){return/firefox\//i.test(n)}function Af(n=Se()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function Sf(n=Se()){return/crios\//i.test(n)}function Pf(n=Se()){return/iemobile/i.test(n)}function Rf(n=Se()){return/android/i.test(n)}function Cf(n=Se()){return/blackberry/i.test(n)}function Df(n=Se()){return/webos/i.test(n)}function $c(n=Se()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function tv(n=Se()){return $c(n)&&!!window.navigator?.standalone}function nv(){return __()&&document.documentMode===10}function Vf(n=Se()){return $c(n)||Rf(n)||Df(n)||Cf(n)||/windows phone/i.test(n)||Pf(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nf(n,e=[]){let t;switch(n){case"Browser":t=Xu(Se());break;case"Worker":t=`${Xu(Se())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${Wr}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rv{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=i=>new Promise((o,c)=>{try{const l=e(i);o(l)}catch(l){c(l)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r?.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sv(n,e={}){return yn(n,"GET","/v2/passwordPolicy",Zn(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const iv=6;class ov{constructor(e){const t=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=t.minPasswordLength??iv,t.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=t.maxPasswordLength),t.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=t.containsLowercaseCharacter),t.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=t.containsUppercaseCharacter),t.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=t.containsNumericCharacter),t.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=t.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=e.allowedNonAlphanumericCharacters?.join("")??"",this.forceUpgradeOnSignin=e.forceUpgradeOnSignin??!1,this.schemaVersion=e.schemaVersion}validatePassword(e){const t={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,t),this.validatePasswordCharacterOptions(e,t),t.isValid&&(t.isValid=t.meetsMinPasswordLength??!0),t.isValid&&(t.isValid=t.meetsMaxPasswordLength??!0),t.isValid&&(t.isValid=t.containsLowercaseLetter??!0),t.isValid&&(t.isValid=t.containsUppercaseLetter??!0),t.isValid&&(t.isValid=t.containsNumericCharacter??!0),t.isValid&&(t.isValid=t.containsNonAlphanumericCharacter??!0),t}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,i){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=i))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class av{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Zu(this),this.idTokenSubscription=new Zu(this),this.beforeStateQueue=new rv(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=_f,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this._resolvePersistenceManagerAvailable=void 0,this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion,this._persistenceManagerAvailable=new Promise(i=>this._resolvePersistenceManagerAvailable=i)}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=kt(t)),this._initializationPromise=this.queue(async()=>{if(!this._deleted&&(this.persistenceManager=await Tr.create(this,e),this._resolvePersistenceManagerAvailable?.(),!this._deleted)){if(this._popupRedirectResolver?._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=this.currentUser?.uid||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await ao(this,{idToken:e}),r=await ft._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){if(ht(this.app)){const i=this.app.settings.authIdToken;return i?new Promise(o=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(i).then(o,o))}):this.directlySetCurrentUser(null)}const t=await this.assertedPersistence.getCurrentUser();let r=t,s=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const i=this.redirectUser?._redirectEventId,o=r?._redirectEventId,c=await this.tryRedirectSignIn(e);(!i||i===o)&&c?.user&&(r=c.user,s=!0)}if(!r)return this.directlySetCurrentUser(null);if(!r._redirectEventId){if(s)try{await this.beforeStateQueue.runMiddleware(r)}catch(i){r=t,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(i))}return r?this.reloadAndSetCurrentUserOrClear(r):this.directlySetCurrentUser(null)}return W(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===r._redirectEventId?this.directlySetCurrentUser(r):this.reloadAndSetCurrentUserOrClear(r)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await co(e)}catch(t){if(t?.code!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=Uy()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(ht(this.app))return Promise.reject(un(this));const t=e?Ve(e):null;return t&&W(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&W(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return ht(this.app)?Promise.reject(un(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return ht(this.app)?Promise.reject(un(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(kt(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await sv(this),t=new ov(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistenceType(){return this.assertedPersistence.persistence.type}_getPersistence(){return this.assertedPersistence.persistence}_updateErrorMap(e){this._errorFactory=new ri("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await ev(this,r)}}toJSON(){return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:this._currentUser?.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&kt(e)||this._popupRedirectResolver;W(t,this,"argument-error"),this.redirectPersistenceManager=await Tr.create(this,[kt(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){return this._isInitialized&&await this.queue(async()=>{}),this._currentUser?._redirectEventId===e?this._currentUser:this.redirectUser?._redirectEventId===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const e=this.currentUser?.uid??null;this.lastNotifiedUid!==e&&(this.lastNotifiedUid=e,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const i=typeof t=="function"?t:t.next.bind(t);let o=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(W(c,this,"internal-error"),c.then(()=>{o||i(this.currentUser)}),typeof t=="function"){const l=e.addObserver(t,r,s);return()=>{o=!0,l()}}else{const l=e.addObserver(t);return()=>{o=!0,l()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return W(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=Nf(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){const e={"X-Client-Version":this.clientVersion};this.app.options.appId&&(e["X-Firebase-gmpid"]=this.app.options.appId);const t=await this.heartbeatServiceProvider.getImmediate({optional:!0})?.getHeartbeatsHeader();t&&(e["X-Firebase-Client"]=t);const r=await this._getAppCheckToken();return r&&(e["X-Firebase-AppCheck"]=r),e}async _getAppCheckToken(){if(ht(this.app)&&this.app.settings.appCheckToken)return this.app.settings.appCheckToken;const e=await this.appCheckServiceProvider.getImmediate({optional:!0})?.getToken();return e?.error&&Ly(`Error while retrieving App Check token: ${e.error}`),e?.token}}function Qr(n){return Ve(n)}class Zu{constructor(e){this.auth=e,this.observer=null,this.addObserver=b_(t=>this.observer=t)}get next(){return W(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ko={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function cv(n){ko=n}function kf(n){return ko.loadJS(n)}function lv(){return ko.recaptchaEnterpriseScript}function uv(){return ko.gapiScript}function hv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}class dv{constructor(){this.enterprise=new fv}ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}class fv{ready(e){e()}execute(e,t){return Promise.resolve("token")}render(e,t){return""}}const pv="recaptcha-enterprise",xf="NO_RECAPTCHA";class mv{constructor(e){this.type=pv,this.auth=Qr(e)}async verify(e="verify",t=!1){async function r(i){if(!t){if(i.tenantId==null&&i._agentRecaptchaConfig!=null)return i._agentRecaptchaConfig.siteKey;if(i.tenantId!=null&&i._tenantRecaptchaConfigs[i.tenantId]!==void 0)return i._tenantRecaptchaConfigs[i.tenantId].siteKey}return new Promise(async(o,c)=>{Hy(i,{clientType:"CLIENT_TYPE_WEB",version:"RECAPTCHA_ENTERPRISE"}).then(l=>{if(l.recaptchaKey===void 0)c(new Error("recaptcha Enterprise site key undefined"));else{const h=new Gy(l);return i.tenantId==null?i._agentRecaptchaConfig=h:i._tenantRecaptchaConfigs[i.tenantId]=h,o(h.siteKey)}}).catch(l=>{c(l)})})}function s(i,o,c){const l=window.grecaptcha;Wu(l)?l.enterprise.ready(()=>{l.enterprise.execute(i,{action:e}).then(h=>{o(h)}).catch(()=>{o(xf)})}):c(Error("No reCAPTCHA enterprise script loaded."))}return this.auth.settings.appVerificationDisabledForTesting?new dv().execute("siteKey",{action:"verify"}):new Promise((i,o)=>{r(this.auth).then(c=>{if(!t&&Wu(window.grecaptcha))s(c,i,o);else{if(typeof window>"u"){o(new Error("RecaptchaVerifier is only supported in browser"));return}let l=lv();l.length!==0&&(l+=c),kf(l).then(()=>{s(c,i,o)}).catch(h=>{o(h)})}}).catch(c=>{o(c)})})}}async function eh(n,e,t,r=!1,s=!1){const i=new mv(n);let o;if(s)o=xf;else try{o=await i.verify(t)}catch{o=await i.verify(t,!0)}const c={...e};if(t==="mfaSmsEnrollment"||t==="mfaSmsSignIn"){if("phoneEnrollmentInfo"in c){const l=c.phoneEnrollmentInfo.phoneNumber,h=c.phoneEnrollmentInfo.recaptchaToken;Object.assign(c,{phoneEnrollmentInfo:{phoneNumber:l,recaptchaToken:h,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}else if("phoneSignInInfo"in c){const l=c.phoneSignInInfo.recaptchaToken;Object.assign(c,{phoneSignInInfo:{recaptchaToken:l,captchaResponse:o,clientType:"CLIENT_TYPE_WEB",recaptchaVersion:"RECAPTCHA_ENTERPRISE"}})}return c}return r?Object.assign(c,{captchaResp:o}):Object.assign(c,{captchaResponse:o}),Object.assign(c,{clientType:"CLIENT_TYPE_WEB"}),Object.assign(c,{recaptchaVersion:"RECAPTCHA_ENTERPRISE"}),c}async function th(n,e,t,r,s){if(n._getRecaptchaConfig()?.isProviderEnabled("EMAIL_PASSWORD_PROVIDER")){const i=await eh(n,e,t,t==="getOobCode");return r(n,i)}else return r(n,e).catch(async i=>{if(i.code==="auth/missing-recaptcha-token"){console.log(`${t} is protected by reCAPTCHA Enterprise for this project. Automatically triggering the reCAPTCHA flow and restarting the flow.`);const o=await eh(n,e,t,t==="getOobCode");return r(n,o)}else return Promise.reject(i)})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gv(n,e){const t=Mc(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),i=t.getOptions();if(zn(i,e??{}))return s;pt(s,"already-initialized")}return t.initialize({options:e})}function _v(n,e){const t=e?.persistence||[],r=(Array.isArray(t)?t:[t]).map(kt);e?.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e?.popupRedirectResolver)}function yv(n,e,t){const r=Qr(n);W(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,i=Of(e),{host:o,port:c}=vv(e),l=c===null?"":`:${c}`,h={url:`${i}//${o}${l}/`},f=Object.freeze({host:o,port:c,protocol:i.replace(":",""),options:Object.freeze({disableWarnings:s})});if(!r._canInitEmulator){W(r.config.emulator&&r.emulatorConfig,r,"emulator-config-failed"),W(zn(h,r.config.emulator)&&zn(f,r.emulatorConfig),r,"emulator-config-failed");return}r.config.emulator=h,r.emulatorConfig=f,r.settings.appVerificationDisabledForTesting=!0,Kr(o)?(of(`${i}//${o}${l}`),d_("Auth",!0)):Ev()}function Of(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function vv(n){const e=Of(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const i=s[1];return{host:i,port:nh(r.substr(i.length+1))}}else{const[i,o]=r.split(":");return{host:i,port:nh(o)}}}function nh(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Ev(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Nt("not implemented")}_getIdTokenResponse(e){return Nt("not implemented")}_linkToIdToken(e,t){return Nt("not implemented")}_getReauthenticationResolver(e){return Nt("not implemented")}}async function Iv(n,e){return yn(n,"POST","/v1/accounts:signUp",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function wv(n,e){return No(n,"POST","/v1/accounts:signInWithPassword",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function bv(n,e){return No(n,"POST","/v1/accounts:signInWithEmailLink",Zn(n,e))}async function Tv(n,e){return No(n,"POST","/v1/accounts:signInWithEmailLink",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zs extends qc{constructor(e,t,r,s=null){super("password",r),this._email=e,this._password=t,this._tenantId=s}static _fromEmailAndPassword(e,t){return new zs(e,t,"password")}static _fromEmailAndCode(e,t,r=null){return new zs(e,t,"emailLink",r)}toJSON(){return{email:this._email,password:this._password,signInMethod:this.signInMethod,tenantId:this._tenantId}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e;if(t?.email&&t?.password){if(t.signInMethod==="password")return this._fromEmailAndPassword(t.email,t.password);if(t.signInMethod==="emailLink")return this._fromEmailAndCode(t.email,t.password,t.tenantId)}return null}async _getIdTokenResponse(e){switch(this.signInMethod){case"password":const t={returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return th(e,t,"signInWithPassword",wv);case"emailLink":return bv(e,{email:this._email,oobCode:this._password});default:pt(e,"internal-error")}}async _linkToIdToken(e,t){switch(this.signInMethod){case"password":const r={idToken:t,returnSecureToken:!0,email:this._email,password:this._password,clientType:"CLIENT_TYPE_WEB"};return th(e,r,"signUpPassword",Iv);case"emailLink":return Tv(e,{idToken:t,email:this._email,oobCode:this._password});default:pt(e,"internal-error")}}_getReauthenticationResolver(e){return this._getIdTokenResponse(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ar(n,e){return No(n,"POST","/v1/accounts:signInWithIdp",Zn(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Av="http://localhost";class Gn extends qc{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Gn(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):pt("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s,...i}=t;if(!r||!s)return null;const o=new Gn(r,s);return o.idToken=i.idToken||void 0,o.accessToken=i.accessToken||void 0,o.secret=i.secret,o.nonce=i.nonce,o.pendingToken=i.pendingToken||null,o}_getIdTokenResponse(e){const t=this.buildRequest();return Ar(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,Ar(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,Ar(e,t)}buildRequest(){const e={requestUri:Av,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=si(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sv(n){switch(n){case"recoverEmail":return"RECOVER_EMAIL";case"resetPassword":return"PASSWORD_RESET";case"signIn":return"EMAIL_SIGNIN";case"verifyEmail":return"VERIFY_EMAIL";case"verifyAndChangeEmail":return"VERIFY_AND_CHANGE_EMAIL";case"revertSecondFactorAddition":return"REVERT_SECOND_FACTOR_ADDITION";default:return null}}function Pv(n){const e=bs(Ts(n)).link,t=e?bs(Ts(e)).deep_link_id:null,r=bs(Ts(n)).deep_link_id;return(r?bs(Ts(r)).link:null)||r||t||e||n}class zc{constructor(e){const t=bs(Ts(e)),r=t.apiKey??null,s=t.oobCode??null,i=Sv(t.mode??null);W(r&&s&&i,"argument-error"),this.apiKey=r,this.operation=i,this.code=s,this.continueUrl=t.continueUrl??null,this.languageCode=t.lang??null,this.tenantId=t.tenantId??null}static parseLink(e){const t=Pv(e);try{return new zc(t)}catch{return null}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(){this.providerId=Yr.PROVIDER_ID}static credential(e,t){return zs._fromEmailAndPassword(e,t)}static credentialWithLink(e,t){const r=zc.parseLink(t);return W(r,"argument-error"),zs._fromEmailAndCode(e,r.code,r.tenantId)}}Yr.PROVIDER_ID="password";Yr.EMAIL_PASSWORD_SIGN_IN_METHOD="password";Yr.EMAIL_LINK_SIGN_IN_METHOD="emailLink";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lf{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class oi extends Lf{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class en extends oi{constructor(){super("facebook.com")}static credential(e){return Gn._fromParams({providerId:en.PROVIDER_ID,signInMethod:en.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return en.credentialFromTaggedObject(e)}static credentialFromError(e){return en.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return en.credential(e.oauthAccessToken)}catch{return null}}}en.FACEBOOK_SIGN_IN_METHOD="facebook.com";en.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn extends oi{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Gn._fromParams({providerId:tn.PROVIDER_ID,signInMethod:tn.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return tn.credentialFromTaggedObject(e)}static credentialFromError(e){return tn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return tn.credential(t,r)}catch{return null}}}tn.GOOGLE_SIGN_IN_METHOD="google.com";tn.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn extends oi{constructor(){super("github.com")}static credential(e){return Gn._fromParams({providerId:nn.PROVIDER_ID,signInMethod:nn.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return nn.credentialFromTaggedObject(e)}static credentialFromError(e){return nn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return nn.credential(e.oauthAccessToken)}catch{return null}}}nn.GITHUB_SIGN_IN_METHOD="github.com";nn.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rn extends oi{constructor(){super("twitter.com")}static credential(e,t){return Gn._fromParams({providerId:rn.PROVIDER_ID,signInMethod:rn.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return rn.credentialFromTaggedObject(e)}static credentialFromError(e){return rn.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return rn.credential(t,r)}catch{return null}}}rn.TWITTER_SIGN_IN_METHOD="twitter.com";rn.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vr{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const i=await ft._fromIdTokenResponse(e,r,s),o=rh(r);return new Vr({user:i,providerId:o,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=rh(r);return new Vr({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function rh(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lo extends $t{constructor(e,t,r,s){super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,lo.prototype),this.customData={appName:e.name,tenantId:e.tenantId??void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new lo(e,t,r,s)}}function Mf(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(i=>{throw i.code==="auth/multi-factor-auth-required"?lo._fromErrorAndOperation(n,i,e,r):i})}async function Rv(n,e,t=!1){const r=await qs(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return Vr._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Cv(n,e,t=!1){const{auth:r}=n;if(ht(r.app))return Promise.reject(un(r));const s="reauthenticate";try{const i=await qs(n,Mf(r,s,e,n),t);W(i.idToken,r,"internal-error");const o=Bc(i.idToken);W(o,r,"internal-error");const{sub:c}=o;return W(n.uid===c,r,"user-mismatch"),Vr._forOperation(n,s,i)}catch(i){throw i?.code==="auth/user-not-found"&&pt(r,"user-mismatch"),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Ff(n,e,t=!1){if(ht(n.app))return Promise.reject(un(n));const r="signIn",s=await Mf(n,r,e),i=await Vr._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(i.user),i}async function Dv(n,e){return Ff(Qr(n),e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Vv(n){const e=Qr(n);e._getPasswordPolicyInternal()&&await e._updatePasswordPolicy()}function Nv(n,e,t){return ht(n.app)?Promise.reject(un(n)):Dv(Ve(n),Yr.credential(e,t)).catch(async r=>{throw r.code==="auth/password-does-not-meet-requirements"&&Vv(n),r})}function kv(n,e,t,r){return Ve(n).onIdTokenChanged(e,t,r)}function xv(n,e,t){return Ve(n).beforeAuthStateChanged(e,t)}function Ov(n,e,t,r){return Ve(n).onAuthStateChanged(e,t,r)}function Lv(n){return Ve(n).signOut()}const uo="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uf{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(uo,"1"),this.storage.removeItem(uo),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mv=1e3,Fv=10;class Bf extends Uf{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=Vf(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((o,c,l)=>{this.notifyListeners(o,l)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const o=this.storage.getItem(r);!t&&this.localCache[r]===o||this.notifyListeners(r,o)},i=this.storage.getItem(r);nv()&&i!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,Fv):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},Mv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}Bf.type="LOCAL";const Uv=Bf;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $f extends Uf{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}$f.type="SESSION";const qf=$f;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Bv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new xo(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:i}=t.data,o=this.handlersMap[s];if(!o?.size)return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(o).map(async h=>h(t.origin,i)),l=await Bv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:l})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}xo.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function jc(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $v{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let i,o;return new Promise((c,l)=>{const h=jc("",20);s.port1.start();const f=setTimeout(()=>{l(new Error("unsupported_event"))},r);o={messageChannel:s,onMessage(p){const g=p;if(g.data.eventId===h)switch(g.data.status){case"ack":clearTimeout(f),i=setTimeout(()=>{l(new Error("timeout"))},3e3);break;case"done":clearTimeout(i),c(g.data.response);break;default:clearTimeout(f),clearTimeout(i),l(new Error("invalid_response"));break}}},this.handlers.add(o),s.port1.addEventListener("message",o.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{o&&this.removeMessageHandler(o)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function bt(){return window}function qv(n){bt().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zf(){return typeof bt().WorkerGlobalScope<"u"&&typeof bt().importScripts=="function"}async function zv(){if(!navigator?.serviceWorker)return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function jv(){return navigator?.serviceWorker?.controller||null}function Gv(){return zf()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jf="firebaseLocalStorageDb",Hv=1,ho="firebaseLocalStorage",Gf="fbase_key";class ai{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Oo(n,e){return n.transaction([ho],e?"readwrite":"readonly").objectStore(ho)}function Kv(){const n=indexedDB.deleteDatabase(jf);return new ai(n).toPromise()}function ec(){const n=indexedDB.open(jf,Hv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(ho,{keyPath:Gf})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(ho)?e(r):(r.close(),await Kv(),e(await ec()))})})}async function sh(n,e,t){const r=Oo(n,!0).put({[Gf]:e,value:t});return new ai(r).toPromise()}async function Wv(n,e){const t=Oo(n,!1).get(e),r=await new ai(t).toPromise();return r===void 0?null:r.value}function ih(n,e){const t=Oo(n,!0).delete(e);return new ai(t).toPromise()}const Qv=800,Yv=3;class Hf{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await ec(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>Yv)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return zf()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=xo._getInstance(Gv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){if(this.activeServiceWorker=await zv(),!this.activeServiceWorker)return;this.sender=new $v(this.activeServiceWorker);const e=await this.sender._send("ping",{},800);e&&e[0]?.fulfilled&&e[0]?.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||jv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await ec();return await sh(e,uo,"1"),await ih(e,uo),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>sh(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Wv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>ih(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const i=Oo(s,!1).getAll();return new ai(i).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:i}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(i)&&(this.notifyListeners(s,i),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Qv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Hf.type="LOCAL";const Jv=Hf;new ii(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xv(n,e){return e?kt(e):(W(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gc extends qc{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return Ar(e,this._buildIdpRequest())}_linkToIdToken(e,t){return Ar(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return Ar(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function Zv(n){return Ff(n.auth,new Gc(n),n.bypassAuthState)}function eE(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Cv(t,new Gc(n),n.bypassAuthState)}async function tE(n){const{auth:e,user:t}=n;return W(t,e,"internal-error"),Rv(t,new Gc(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kf{constructor(e,t,r,s,i=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=i,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:i,error:o,type:c}=e;if(o){this.reject(o);return}const l={auth:this.auth,requestUri:t,sessionId:r,tenantId:i||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(l))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return Zv;case"linkViaPopup":case"linkViaRedirect":return tE;case"reauthViaPopup":case"reauthViaRedirect":return eE;default:pt(this.auth,"internal-error")}}resolve(e){Mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){Mt(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nE=new ii(2e3,1e4);class Er extends Kf{constructor(e,t,r,s,i){super(e,t,s,i),this.provider=r,this.authWindow=null,this.pollId=null,Er.currentPopupAction&&Er.currentPopupAction.cancel(),Er.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return W(e,this.auth,"internal-error"),e}async onExecution(){Mt(this.filter.length===1,"Popup operations only handle one event");const e=jc();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(wt(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){return this.authWindow?.associatedEvent||null}cancel(){this.reject(wt(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,Er.currentPopupAction=null}pollUserCancellation(){const e=()=>{if(this.authWindow?.window?.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(wt(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,nE.get())};e()}}Er.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rE="pendingRedirect",ji=new Map;class sE extends Kf{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ji.get(this.auth._key());if(!e){try{const r=await iE(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ji.set(this.auth._key(),e)}return this.bypassAuthState||ji.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function iE(n,e){const t=cE(e),r=aE(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function oE(n,e){ji.set(n._key(),e)}function aE(n){return kt(n._redirectPersistence)}function cE(n){return zi(rE,n.config.apiKey,n.name)}async function lE(n,e,t=!1){if(ht(n.app))return Promise.reject(un(n));const r=Qr(n),s=Xv(r,e),o=await new sE(r,s,t).execute();return o&&!t&&(delete o.user._redirectEventId,await r._persistUserIfCurrent(o.user),await r._setRedirectUser(null,e)),o}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const uE=600*1e3;class hE{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!dE(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){if(e.error&&!Wf(e)){const r=e.error.code?.split("auth/")[1]||"internal-error";t.onError(wt(this.auth,r))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=uE&&this.cachedEventUids.clear(),this.cachedEventUids.has(oh(e))}saveEventToCache(e){this.cachedEventUids.add(oh(e)),this.lastProcessedEventTime=Date.now()}}function oh(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function Wf({type:n,error:e}){return n==="unknown"&&e?.code==="auth/no-auth-event"}function dE(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return Wf(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function fE(n,e={}){return yn(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pE=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,mE=/^https?/;async function gE(n){if(n.config.emulator)return;const{authorizedDomains:e}=await fE(n);for(const t of e)try{if(_E(t))return}catch{}pt(n,"unauthorized-domain")}function _E(n){const e=Xa(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const o=new URL(n);return o.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&o.hostname===r}if(!mE.test(t))return!1;if(pE.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yE=new ii(3e4,6e4);function ah(){const n=bt().___jsl;if(n?.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function vE(n){return new Promise((e,t)=>{function r(){ah(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ah(),t(wt(n,"network-request-failed"))},timeout:yE.get()})}if(bt().gapi?.iframes?.Iframe)e(gapi.iframes.getContext());else if(bt().gapi?.load)r();else{const s=hv("iframefcb");return bt()[s]=()=>{gapi.load?r():t(wt(n,"network-request-failed"))},kf(`${uv()}?onload=${s}`).catch(i=>t(i))}}).catch(e=>{throw Gi=null,e})}let Gi=null;function EE(n){return Gi=Gi||vE(n),Gi}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const IE=new ii(5e3,15e3),wE="__/auth/iframe",bE="emulator/auth/iframe",TE={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},AE=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function SE(n){const e=n.config;W(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Uc(e,bE):`https://${n.config.authDomain}/${wE}`,r={apiKey:e.apiKey,appName:n.name,v:Wr},s=AE.get(n.config.apiHost);s&&(r.eid=s);const i=n._getFrameworks();return i.length&&(r.fw=i.join(",")),`${t}?${si(r).slice(1)}`}async function PE(n){const e=await EE(n),t=bt().gapi;return W(t,n,"internal-error"),e.open({where:document.body,url:SE(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:TE,dontclear:!0},r=>new Promise(async(s,i)=>{await r.restyle({setHideOnLeave:!1});const o=wt(n,"network-request-failed"),c=bt().setTimeout(()=>{i(o)},IE.get());function l(){bt().clearTimeout(c),s(r)}r.ping(l).then(l,()=>{i(o)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const RE={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},CE=500,DE=600,VE="_blank",NE="http://localhost";class ch{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function kE(n,e,t,r=CE,s=DE){const i=Math.max((window.screen.availHeight-s)/2,0).toString(),o=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const l={...RE,width:r.toString(),height:s.toString(),top:i,left:o},h=Se().toLowerCase();t&&(c=Sf(h)?VE:t),Tf(h)&&(e=e||NE,l.scrollbars="yes");const f=Object.entries(l).reduce((g,[w,A])=>`${g}${w}=${A},`,"");if(tv(h)&&c!=="_self")return xE(e||"",c),new ch(null);const p=window.open(e||"",c,f);W(p,n,"popup-blocked");try{p.focus()}catch{}return new ch(p)}function xE(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const OE="__/auth/handler",LE="emulator/auth/handler",ME=encodeURIComponent("fac");async function lh(n,e,t,r,s,i){W(n.config.authDomain,n,"auth-domain-config-required"),W(n.config.apiKey,n,"invalid-api-key");const o={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:Wr,eventId:s};if(e instanceof Lf){e.setDefaultLanguage(n.languageCode),o.providerId=e.providerId||"",w_(e.getCustomParameters())||(o.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,p]of Object.entries({}))o[f]=p}if(e instanceof oi){const f=e.getScopes().filter(p=>p!=="");f.length>0&&(o.scopes=f.join(","))}n.tenantId&&(o.tid=n.tenantId);const c=o;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const l=await n._getAppCheckToken(),h=l?`#${ME}=${encodeURIComponent(l)}`:"";return`${FE(n)}?${si(c).slice(1)}${h}`}function FE({config:n}){return n.emulator?Uc(n,LE):`https://${n.authDomain}/${OE}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oa="webStorageSupport";class UE{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=qf,this._completeRedirectFn=lE,this._overrideRedirectResult=oE}async _openPopup(e,t,r,s){Mt(this.eventManagers[e._key()]?.manager,"_initialize() not called before _openPopup()");const i=await lh(e,t,r,Xa(),s);return kE(e,i,jc())}async _openRedirect(e,t,r,s){await this._originValidation(e);const i=await lh(e,t,r,Xa(),s);return qv(i),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:i}=this.eventManagers[t];return s?Promise.resolve(s):(Mt(i,"If manager is not set, promise should be"),i)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await PE(e),r=new hE(e);return t.register("authEvent",s=>(W(s?.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Oa,{type:Oa},s=>{const i=s?.[0]?.[Oa];i!==void 0&&t(!!i),pt(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=gE(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return Vf()||Af()||$c()}}const BE=UE;var uh="@firebase/auth",hh="1.11.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $E{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){return this.assertAuthConfigured(),this.auth.currentUser?.uid||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e(r?.stsTokenManager.accessToken||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){W(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qE(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function zE(n){Dr(new jn("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),i=e.getProvider("app-check-internal"),{apiKey:o,authDomain:c}=r.options;W(o&&!o.includes(":"),"invalid-api-key",{appName:r.name});const l={apiKey:o,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:Nf(n)},h=new av(r,s,i,l);return _v(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),Dr(new jn("auth-internal",e=>{const t=Qr(e.getProvider("auth").getImmediate());return(r=>new $E(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),ln(uh,hh,qE(n)),ln(uh,hh,"esm2020")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const jE=300,GE=sf("authIdTokenMaxAge")||jE;let dh=null;const HE=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>GE)return;const s=t?.token;dh!==s&&(dh=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function KE(n=Ty()){const e=Mc(n,"auth");if(e.isInitialized())return e.getImmediate();const t=gv(n,{popupRedirectResolver:BE,persistence:[Jv,Uv,qf]}),r=sf("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const i=new URL(r,location.origin);if(location.origin===i.origin){const o=HE(i.toString());xv(t,o,()=>o(t.currentUser)),kv(t,c=>o(c))}}const s=c_("auth");return s&&yv(t,`http://${s}`),t}function WE(){return document.getElementsByTagName("head")?.[0]??document}cv({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const i=wt("internal-error");i.customData=s,t(i)},r.type="text/javascript",r.charset="UTF-8",WE().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});zE("Browser");var QE="firebase",YE="12.3.0";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */ln(QE,YE,"app");var fh=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var hn,Qf;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(E,_){function v(){}v.prototype=_.prototype,E.F=_.prototype,E.prototype=new v,E.prototype.constructor=E,E.D=function(b,I,S){for(var y=Array(arguments.length-2),Ie=2;Ie<arguments.length;Ie++)y[Ie-2]=arguments[Ie];return _.prototype[I].apply(b,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.C=Array(this.blockSize),this.o=this.h=0,this.u()}e(r,t),r.prototype.u=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(E,_,v){v||(v=0);const b=Array(16);if(typeof _=="string")for(var I=0;I<16;++I)b[I]=_.charCodeAt(v++)|_.charCodeAt(v++)<<8|_.charCodeAt(v++)<<16|_.charCodeAt(v++)<<24;else for(I=0;I<16;++I)b[I]=_[v++]|_[v++]<<8|_[v++]<<16|_[v++]<<24;_=E.g[0],v=E.g[1],I=E.g[2];let S=E.g[3],y;y=_+(S^v&(I^S))+b[0]+3614090360&4294967295,_=v+(y<<7&4294967295|y>>>25),y=S+(I^_&(v^I))+b[1]+3905402710&4294967295,S=_+(y<<12&4294967295|y>>>20),y=I+(v^S&(_^v))+b[2]+606105819&4294967295,I=S+(y<<17&4294967295|y>>>15),y=v+(_^I&(S^_))+b[3]+3250441966&4294967295,v=I+(y<<22&4294967295|y>>>10),y=_+(S^v&(I^S))+b[4]+4118548399&4294967295,_=v+(y<<7&4294967295|y>>>25),y=S+(I^_&(v^I))+b[5]+1200080426&4294967295,S=_+(y<<12&4294967295|y>>>20),y=I+(v^S&(_^v))+b[6]+2821735955&4294967295,I=S+(y<<17&4294967295|y>>>15),y=v+(_^I&(S^_))+b[7]+4249261313&4294967295,v=I+(y<<22&4294967295|y>>>10),y=_+(S^v&(I^S))+b[8]+1770035416&4294967295,_=v+(y<<7&4294967295|y>>>25),y=S+(I^_&(v^I))+b[9]+2336552879&4294967295,S=_+(y<<12&4294967295|y>>>20),y=I+(v^S&(_^v))+b[10]+4294925233&4294967295,I=S+(y<<17&4294967295|y>>>15),y=v+(_^I&(S^_))+b[11]+2304563134&4294967295,v=I+(y<<22&4294967295|y>>>10),y=_+(S^v&(I^S))+b[12]+1804603682&4294967295,_=v+(y<<7&4294967295|y>>>25),y=S+(I^_&(v^I))+b[13]+4254626195&4294967295,S=_+(y<<12&4294967295|y>>>20),y=I+(v^S&(_^v))+b[14]+2792965006&4294967295,I=S+(y<<17&4294967295|y>>>15),y=v+(_^I&(S^_))+b[15]+1236535329&4294967295,v=I+(y<<22&4294967295|y>>>10),y=_+(I^S&(v^I))+b[1]+4129170786&4294967295,_=v+(y<<5&4294967295|y>>>27),y=S+(v^I&(_^v))+b[6]+3225465664&4294967295,S=_+(y<<9&4294967295|y>>>23),y=I+(_^v&(S^_))+b[11]+643717713&4294967295,I=S+(y<<14&4294967295|y>>>18),y=v+(S^_&(I^S))+b[0]+3921069994&4294967295,v=I+(y<<20&4294967295|y>>>12),y=_+(I^S&(v^I))+b[5]+3593408605&4294967295,_=v+(y<<5&4294967295|y>>>27),y=S+(v^I&(_^v))+b[10]+38016083&4294967295,S=_+(y<<9&4294967295|y>>>23),y=I+(_^v&(S^_))+b[15]+3634488961&4294967295,I=S+(y<<14&4294967295|y>>>18),y=v+(S^_&(I^S))+b[4]+3889429448&4294967295,v=I+(y<<20&4294967295|y>>>12),y=_+(I^S&(v^I))+b[9]+568446438&4294967295,_=v+(y<<5&4294967295|y>>>27),y=S+(v^I&(_^v))+b[14]+3275163606&4294967295,S=_+(y<<9&4294967295|y>>>23),y=I+(_^v&(S^_))+b[3]+4107603335&4294967295,I=S+(y<<14&4294967295|y>>>18),y=v+(S^_&(I^S))+b[8]+1163531501&4294967295,v=I+(y<<20&4294967295|y>>>12),y=_+(I^S&(v^I))+b[13]+2850285829&4294967295,_=v+(y<<5&4294967295|y>>>27),y=S+(v^I&(_^v))+b[2]+4243563512&4294967295,S=_+(y<<9&4294967295|y>>>23),y=I+(_^v&(S^_))+b[7]+1735328473&4294967295,I=S+(y<<14&4294967295|y>>>18),y=v+(S^_&(I^S))+b[12]+2368359562&4294967295,v=I+(y<<20&4294967295|y>>>12),y=_+(v^I^S)+b[5]+4294588738&4294967295,_=v+(y<<4&4294967295|y>>>28),y=S+(_^v^I)+b[8]+2272392833&4294967295,S=_+(y<<11&4294967295|y>>>21),y=I+(S^_^v)+b[11]+1839030562&4294967295,I=S+(y<<16&4294967295|y>>>16),y=v+(I^S^_)+b[14]+4259657740&4294967295,v=I+(y<<23&4294967295|y>>>9),y=_+(v^I^S)+b[1]+2763975236&4294967295,_=v+(y<<4&4294967295|y>>>28),y=S+(_^v^I)+b[4]+1272893353&4294967295,S=_+(y<<11&4294967295|y>>>21),y=I+(S^_^v)+b[7]+4139469664&4294967295,I=S+(y<<16&4294967295|y>>>16),y=v+(I^S^_)+b[10]+3200236656&4294967295,v=I+(y<<23&4294967295|y>>>9),y=_+(v^I^S)+b[13]+681279174&4294967295,_=v+(y<<4&4294967295|y>>>28),y=S+(_^v^I)+b[0]+3936430074&4294967295,S=_+(y<<11&4294967295|y>>>21),y=I+(S^_^v)+b[3]+3572445317&4294967295,I=S+(y<<16&4294967295|y>>>16),y=v+(I^S^_)+b[6]+76029189&4294967295,v=I+(y<<23&4294967295|y>>>9),y=_+(v^I^S)+b[9]+3654602809&4294967295,_=v+(y<<4&4294967295|y>>>28),y=S+(_^v^I)+b[12]+3873151461&4294967295,S=_+(y<<11&4294967295|y>>>21),y=I+(S^_^v)+b[15]+530742520&4294967295,I=S+(y<<16&4294967295|y>>>16),y=v+(I^S^_)+b[2]+3299628645&4294967295,v=I+(y<<23&4294967295|y>>>9),y=_+(I^(v|~S))+b[0]+4096336452&4294967295,_=v+(y<<6&4294967295|y>>>26),y=S+(v^(_|~I))+b[7]+1126891415&4294967295,S=_+(y<<10&4294967295|y>>>22),y=I+(_^(S|~v))+b[14]+2878612391&4294967295,I=S+(y<<15&4294967295|y>>>17),y=v+(S^(I|~_))+b[5]+4237533241&4294967295,v=I+(y<<21&4294967295|y>>>11),y=_+(I^(v|~S))+b[12]+1700485571&4294967295,_=v+(y<<6&4294967295|y>>>26),y=S+(v^(_|~I))+b[3]+2399980690&4294967295,S=_+(y<<10&4294967295|y>>>22),y=I+(_^(S|~v))+b[10]+4293915773&4294967295,I=S+(y<<15&4294967295|y>>>17),y=v+(S^(I|~_))+b[1]+2240044497&4294967295,v=I+(y<<21&4294967295|y>>>11),y=_+(I^(v|~S))+b[8]+1873313359&4294967295,_=v+(y<<6&4294967295|y>>>26),y=S+(v^(_|~I))+b[15]+4264355552&4294967295,S=_+(y<<10&4294967295|y>>>22),y=I+(_^(S|~v))+b[6]+2734768916&4294967295,I=S+(y<<15&4294967295|y>>>17),y=v+(S^(I|~_))+b[13]+1309151649&4294967295,v=I+(y<<21&4294967295|y>>>11),y=_+(I^(v|~S))+b[4]+4149444226&4294967295,_=v+(y<<6&4294967295|y>>>26),y=S+(v^(_|~I))+b[11]+3174756917&4294967295,S=_+(y<<10&4294967295|y>>>22),y=I+(_^(S|~v))+b[2]+718787259&4294967295,I=S+(y<<15&4294967295|y>>>17),y=v+(S^(I|~_))+b[9]+3951481745&4294967295,E.g[0]=E.g[0]+_&4294967295,E.g[1]=E.g[1]+(I+(y<<21&4294967295|y>>>11))&4294967295,E.g[2]=E.g[2]+I&4294967295,E.g[3]=E.g[3]+S&4294967295}r.prototype.v=function(E,_){_===void 0&&(_=E.length);const v=_-this.blockSize,b=this.C;let I=this.h,S=0;for(;S<_;){if(I==0)for(;S<=v;)s(this,E,S),S+=this.blockSize;if(typeof E=="string"){for(;S<_;)if(b[I++]=E.charCodeAt(S++),I==this.blockSize){s(this,b),I=0;break}}else for(;S<_;)if(b[I++]=E[S++],I==this.blockSize){s(this,b),I=0;break}}this.h=I,this.o+=_},r.prototype.A=function(){var E=Array((this.h<56?this.blockSize:this.blockSize*2)-this.h);E[0]=128;for(var _=1;_<E.length-8;++_)E[_]=0;_=this.o*8;for(var v=E.length-8;v<E.length;++v)E[v]=_&255,_/=256;for(this.v(E),E=Array(16),_=0,v=0;v<4;++v)for(let b=0;b<32;b+=8)E[_++]=this.g[v]>>>b&255;return E};function i(E,_){var v=c;return Object.prototype.hasOwnProperty.call(v,E)?v[E]:v[E]=_(E)}function o(E,_){this.h=_;const v=[];let b=!0;for(let I=E.length-1;I>=0;I--){const S=E[I]|0;b&&S==_||(v[I]=S,b=!1)}this.g=v}var c={};function l(E){return-128<=E&&E<128?i(E,function(_){return new o([_|0],_<0?-1:0)}):new o([E|0],E<0?-1:0)}function h(E){if(isNaN(E)||!isFinite(E))return p;if(E<0)return D(h(-E));const _=[];let v=1;for(let b=0;E>=v;b++)_[b]=E/v|0,v*=4294967296;return new o(_,0)}function f(E,_){if(E.length==0)throw Error("number format error: empty string");if(_=_||10,_<2||36<_)throw Error("radix out of range: "+_);if(E.charAt(0)=="-")return D(f(E.substring(1),_));if(E.indexOf("-")>=0)throw Error('number format error: interior "-" character');const v=h(Math.pow(_,8));let b=p;for(let S=0;S<E.length;S+=8){var I=Math.min(8,E.length-S);const y=parseInt(E.substring(S,S+I),_);I<8?(I=h(Math.pow(_,I)),b=b.j(I).add(h(y))):(b=b.j(v),b=b.add(h(y)))}return b}var p=l(0),g=l(1),w=l(16777216);n=o.prototype,n.m=function(){if(V(this))return-D(this).m();let E=0,_=1;for(let v=0;v<this.g.length;v++){const b=this.i(v);E+=(b>=0?b:4294967296+b)*_,_*=4294967296}return E},n.toString=function(E){if(E=E||10,E<2||36<E)throw Error("radix out of range: "+E);if(A(this))return"0";if(V(this))return"-"+D(this).toString(E);const _=h(Math.pow(E,6));var v=this;let b="";for(;;){const I=z(v,_).g;v=j(v,I.j(_));let S=((v.g.length>0?v.g[0]:v.h)>>>0).toString(E);if(v=I,A(v))return S+b;for(;S.length<6;)S="0"+S;b=S+b}},n.i=function(E){return E<0?0:E<this.g.length?this.g[E]:this.h};function A(E){if(E.h!=0)return!1;for(let _=0;_<E.g.length;_++)if(E.g[_]!=0)return!1;return!0}function V(E){return E.h==-1}n.l=function(E){return E=j(this,E),V(E)?-1:A(E)?0:1};function D(E){const _=E.g.length,v=[];for(let b=0;b<_;b++)v[b]=~E.g[b];return new o(v,~E.h).add(g)}n.abs=function(){return V(this)?D(this):this},n.add=function(E){const _=Math.max(this.g.length,E.g.length),v=[];let b=0;for(let I=0;I<=_;I++){let S=b+(this.i(I)&65535)+(E.i(I)&65535),y=(S>>>16)+(this.i(I)>>>16)+(E.i(I)>>>16);b=y>>>16,S&=65535,y&=65535,v[I]=y<<16|S}return new o(v,v[v.length-1]&-2147483648?-1:0)};function j(E,_){return E.add(D(_))}n.j=function(E){if(A(this)||A(E))return p;if(V(this))return V(E)?D(this).j(D(E)):D(D(this).j(E));if(V(E))return D(this.j(D(E)));if(this.l(w)<0&&E.l(w)<0)return h(this.m()*E.m());const _=this.g.length+E.g.length,v=[];for(var b=0;b<2*_;b++)v[b]=0;for(b=0;b<this.g.length;b++)for(let I=0;I<E.g.length;I++){const S=this.i(b)>>>16,y=this.i(b)&65535,Ie=E.i(I)>>>16,Xe=E.i(I)&65535;v[2*b+2*I]+=y*Xe,$(v,2*b+2*I),v[2*b+2*I+1]+=S*Xe,$(v,2*b+2*I+1),v[2*b+2*I+1]+=y*Ie,$(v,2*b+2*I+1),v[2*b+2*I+2]+=S*Ie,$(v,2*b+2*I+2)}for(E=0;E<_;E++)v[E]=v[2*E+1]<<16|v[2*E];for(E=_;E<2*_;E++)v[E]=0;return new o(v,0)};function $(E,_){for(;(E[_]&65535)!=E[_];)E[_+1]+=E[_]>>>16,E[_]&=65535,_++}function U(E,_){this.g=E,this.h=_}function z(E,_){if(A(_))throw Error("division by zero");if(A(E))return new U(p,p);if(V(E))return _=z(D(E),_),new U(D(_.g),D(_.h));if(V(_))return _=z(E,D(_)),new U(D(_.g),_.h);if(E.g.length>30){if(V(E)||V(_))throw Error("slowDivide_ only works with positive integers.");for(var v=g,b=_;b.l(E)<=0;)v=M(v),b=M(b);var I=q(v,1),S=q(b,1);for(b=q(b,2),v=q(v,2);!A(b);){var y=S.add(b);y.l(E)<=0&&(I=I.add(v),S=y),b=q(b,1),v=q(v,1)}return _=j(E,I.j(_)),new U(I,_)}for(I=p;E.l(_)>=0;){for(v=Math.max(1,Math.floor(E.m()/_.m())),b=Math.ceil(Math.log(v)/Math.LN2),b=b<=48?1:Math.pow(2,b-48),S=h(v),y=S.j(_);V(y)||y.l(E)>0;)v-=b,S=h(v),y=S.j(_);A(S)&&(S=g),I=I.add(S),E=j(E,y)}return new U(I,E)}n.B=function(E){return z(this,E).h},n.and=function(E){const _=Math.max(this.g.length,E.g.length),v=[];for(let b=0;b<_;b++)v[b]=this.i(b)&E.i(b);return new o(v,this.h&E.h)},n.or=function(E){const _=Math.max(this.g.length,E.g.length),v=[];for(let b=0;b<_;b++)v[b]=this.i(b)|E.i(b);return new o(v,this.h|E.h)},n.xor=function(E){const _=Math.max(this.g.length,E.g.length),v=[];for(let b=0;b<_;b++)v[b]=this.i(b)^E.i(b);return new o(v,this.h^E.h)};function M(E){const _=E.g.length+1,v=[];for(let b=0;b<_;b++)v[b]=E.i(b)<<1|E.i(b-1)>>>31;return new o(v,E.h)}function q(E,_){const v=_>>5;_%=32;const b=E.g.length-v,I=[];for(let S=0;S<b;S++)I[S]=_>0?E.i(S+v)>>>_|E.i(S+v+1)<<32-_:E.i(S+v);return new o(I,E.h)}r.prototype.digest=r.prototype.A,r.prototype.reset=r.prototype.u,r.prototype.update=r.prototype.v,Qf=r,o.prototype.add=o.prototype.add,o.prototype.multiply=o.prototype.j,o.prototype.modulo=o.prototype.B,o.prototype.compare=o.prototype.l,o.prototype.toNumber=o.prototype.m,o.prototype.toString=o.prototype.toString,o.prototype.getBits=o.prototype.i,o.fromNumber=h,o.fromString=f,hn=o}).apply(typeof fh<"u"?fh:typeof self<"u"?self:typeof window<"u"?window:{});var ki=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Yf,As,Jf,Hi,tc,Xf,Zf,ep;(function(){var n,e=Object.defineProperty;function t(a){a=[typeof globalThis=="object"&&globalThis,a,typeof window=="object"&&window,typeof self=="object"&&self,typeof ki=="object"&&ki];for(var u=0;u<a.length;++u){var d=a[u];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(a,u){if(u)e:{var d=r;a=a.split(".");for(var m=0;m<a.length-1;m++){var P=a[m];if(!(P in d))break e;d=d[P]}a=a[a.length-1],m=d[a],u=u(m),u!=m&&u!=null&&e(d,a,{configurable:!0,writable:!0,value:u})}}s("Symbol.dispose",function(a){return a||Symbol("Symbol.dispose")}),s("Array.prototype.values",function(a){return a||function(){return this[Symbol.iterator]()}}),s("Object.entries",function(a){return a||function(u){var d=[],m;for(m in u)Object.prototype.hasOwnProperty.call(u,m)&&d.push([m,u[m]]);return d}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var i=i||{},o=this||self;function c(a){var u=typeof a;return u=="object"&&a!=null||u=="function"}function l(a,u,d){return a.call.apply(a.bind,arguments)}function h(a,u,d){return h=l,h.apply(null,arguments)}function f(a,u){var d=Array.prototype.slice.call(arguments,1);return function(){var m=d.slice();return m.push.apply(m,arguments),a.apply(this,m)}}function p(a,u){function d(){}d.prototype=u.prototype,a.Z=u.prototype,a.prototype=new d,a.prototype.constructor=a,a.Ob=function(m,P,R){for(var O=Array(arguments.length-2),J=2;J<arguments.length;J++)O[J-2]=arguments[J];return u.prototype[P].apply(m,O)}}var g=typeof AsyncContext<"u"&&typeof AsyncContext.Snapshot=="function"?a=>a&&AsyncContext.Snapshot.wrap(a):a=>a;function w(a){const u=a.length;if(u>0){const d=Array(u);for(let m=0;m<u;m++)d[m]=a[m];return d}return[]}function A(a,u){for(let m=1;m<arguments.length;m++){const P=arguments[m];var d=typeof P;if(d=d!="object"?d:P?Array.isArray(P)?"array":d:"null",d=="array"||d=="object"&&typeof P.length=="number"){d=a.length||0;const R=P.length||0;a.length=d+R;for(let O=0;O<R;O++)a[d+O]=P[O]}else a.push(P)}}class V{constructor(u,d){this.i=u,this.j=d,this.h=0,this.g=null}get(){let u;return this.h>0?(this.h--,u=this.g,this.g=u.next,u.next=null):u=this.i(),u}}function D(a){o.setTimeout(()=>{throw a},0)}function j(){var a=E;let u=null;return a.g&&(u=a.g,a.g=a.g.next,a.g||(a.h=null),u.next=null),u}class ${constructor(){this.h=this.g=null}add(u,d){const m=U.get();m.set(u,d),this.h?this.h.next=m:this.g=m,this.h=m}}var U=new V(()=>new z,a=>a.reset());class z{constructor(){this.next=this.g=this.h=null}set(u,d){this.h=u,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let M,q=!1,E=new $,_=()=>{const a=Promise.resolve(void 0);M=()=>{a.then(v)}};function v(){for(var a;a=j();){try{a.h.call(a.g)}catch(d){D(d)}var u=U;u.j(a),u.h<100&&(u.h++,a.next=u.g,u.g=a)}q=!1}function b(){this.u=this.u,this.C=this.C}b.prototype.u=!1,b.prototype.dispose=function(){this.u||(this.u=!0,this.N())},b.prototype[Symbol.dispose]=function(){this.dispose()},b.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function I(a,u){this.type=a,this.g=this.target=u,this.defaultPrevented=!1}I.prototype.h=function(){this.defaultPrevented=!0};var S=(function(){if(!o.addEventListener||!Object.defineProperty)return!1;var a=!1,u=Object.defineProperty({},"passive",{get:function(){a=!0}});try{const d=()=>{};o.addEventListener("test",d,u),o.removeEventListener("test",d,u)}catch{}return a})();function y(a){return/^[\s\xa0]*$/.test(a)}function Ie(a,u){I.call(this,a?a.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,a&&this.init(a,u)}p(Ie,I),Ie.prototype.init=function(a,u){const d=this.type=a.type,m=a.changedTouches&&a.changedTouches.length?a.changedTouches[0]:null;this.target=a.target||a.srcElement,this.g=u,u=a.relatedTarget,u||(d=="mouseover"?u=a.fromElement:d=="mouseout"&&(u=a.toElement)),this.relatedTarget=u,m?(this.clientX=m.clientX!==void 0?m.clientX:m.pageX,this.clientY=m.clientY!==void 0?m.clientY:m.pageY,this.screenX=m.screenX||0,this.screenY=m.screenY||0):(this.clientX=a.clientX!==void 0?a.clientX:a.pageX,this.clientY=a.clientY!==void 0?a.clientY:a.pageY,this.screenX=a.screenX||0,this.screenY=a.screenY||0),this.button=a.button,this.key=a.key||"",this.ctrlKey=a.ctrlKey,this.altKey=a.altKey,this.shiftKey=a.shiftKey,this.metaKey=a.metaKey,this.pointerId=a.pointerId||0,this.pointerType=a.pointerType,this.state=a.state,this.i=a,a.defaultPrevented&&Ie.Z.h.call(this)},Ie.prototype.h=function(){Ie.Z.h.call(this);const a=this.i;a.preventDefault?a.preventDefault():a.returnValue=!1};var Xe="closure_listenable_"+(Math.random()*1e6|0),rr=0;function de(a,u,d,m,P){this.listener=a,this.proxy=null,this.src=u,this.type=d,this.capture=!!m,this.ha=P,this.key=++rr,this.da=this.fa=!1}function ue(a){a.da=!0,a.listener=null,a.proxy=null,a.src=null,a.ha=null}function _e(a,u,d){for(const m in a)u.call(d,a[m],m,a)}function qe(a,u){for(const d in a)u.call(void 0,a[d],d,a)}function Qe(a){const u={};for(const d in a)u[d]=a[d];return u}const me="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ie(a,u){let d,m;for(let P=1;P<arguments.length;P++){m=arguments[P];for(d in m)a[d]=m[d];for(let R=0;R<me.length;R++)d=me[R],Object.prototype.hasOwnProperty.call(m,d)&&(a[d]=m[d])}}function ke(a){this.src=a,this.g={},this.h=0}ke.prototype.add=function(a,u,d,m,P){const R=a.toString();a=this.g[R],a||(a=this.g[R]=[],this.h++);const O=it(a,u,m,P);return O>-1?(u=a[O],d||(u.fa=!1)):(u=new de(u,this.src,R,!!m,P),u.fa=d,a.push(u)),u};function Dt(a,u){const d=u.type;if(d in a.g){var m=a.g[d],P=Array.prototype.indexOf.call(m,u,void 0),R;(R=P>=0)&&Array.prototype.splice.call(m,P,1),R&&(ue(u),a.g[d].length==0&&(delete a.g[d],a.h--))}}function it(a,u,d,m){for(let P=0;P<a.length;++P){const R=a[P];if(!R.da&&R.listener==u&&R.capture==!!d&&R.ha==m)return P}return-1}var lt="closure_lm_"+(Math.random()*1e6|0),xe={};function Re(a,u,d,m,P){if(Array.isArray(u)){for(let R=0;R<u.length;R++)Re(a,u[R],d,m,P);return null}return d=$l(d),a&&a[Xe]?a.J(u,d,c(m)?!!m.capture:!1,P):sr(a,u,d,!1,m,P)}function sr(a,u,d,m,P,R){if(!u)throw Error("Invalid event type");const O=c(P)?!!P.capture:!!P;let J=ua(a);if(J||(a[lt]=J=new ke(a)),d=J.add(u,d,m,O,R),d.proxy)return d;if(m=Ze(),d.proxy=m,m.src=a,m.listener=d,a.addEventListener)S||(P=O),P===void 0&&(P=!1),a.addEventListener(u.toString(),m,P);else if(a.attachEvent)a.attachEvent(Bl(u.toString()),m);else if(a.addListener&&a.removeListener)a.addListener(m);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Ze(){function a(d){return u.call(a.src,a.listener,d)}const u=Rg;return a}function Vt(a,u,d,m,P){if(Array.isArray(u))for(var R=0;R<u.length;R++)Vt(a,u[R],d,m,P);else m=c(m)?!!m.capture:!!m,d=$l(d),a&&a[Xe]?(a=a.i,R=String(u).toString(),R in a.g&&(u=a.g[R],d=it(u,d,m,P),d>-1&&(ue(u[d]),Array.prototype.splice.call(u,d,1),u.length==0&&(delete a.g[R],a.h--)))):a&&(a=ua(a))&&(u=a.g[u.toString()],a=-1,u&&(a=it(u,d,m,P)),(d=a>-1?u[a]:null)&&la(d))}function la(a){if(typeof a!="number"&&a&&!a.da){var u=a.src;if(u&&u[Xe])Dt(u.i,a);else{var d=a.type,m=a.proxy;u.removeEventListener?u.removeEventListener(d,m,a.capture):u.detachEvent?u.detachEvent(Bl(d),m):u.addListener&&u.removeListener&&u.removeListener(m),(d=ua(u))?(Dt(d,a),d.h==0&&(d.src=null,u[lt]=null)):ue(a)}}}function Bl(a){return a in xe?xe[a]:xe[a]="on"+a}function Rg(a,u){if(a.da)a=!0;else{u=new Ie(u,this);const d=a.listener,m=a.ha||a.src;a.fa&&la(a),a=d.call(m,u)}return a}function ua(a){return a=a[lt],a instanceof ke?a:null}var ha="__closure_events_fn_"+(Math.random()*1e9>>>0);function $l(a){return typeof a=="function"?a:(a[ha]||(a[ha]=function(u){return a.handleEvent(u)}),a[ha])}function Oe(){b.call(this),this.i=new ke(this),this.M=this,this.G=null}p(Oe,b),Oe.prototype[Xe]=!0,Oe.prototype.removeEventListener=function(a,u,d,m){Vt(this,a,u,d,m)};function ze(a,u){var d,m=a.G;if(m)for(d=[];m;m=m.G)d.push(m);if(a=a.M,m=u.type||u,typeof u=="string")u=new I(u,a);else if(u instanceof I)u.target=u.target||a;else{var P=u;u=new I(m,a),ie(u,P)}P=!0;let R,O;if(d)for(O=d.length-1;O>=0;O--)R=u.g=d[O],P=Ei(R,m,!0,u)&&P;if(R=u.g=a,P=Ei(R,m,!0,u)&&P,P=Ei(R,m,!1,u)&&P,d)for(O=0;O<d.length;O++)R=u.g=d[O],P=Ei(R,m,!1,u)&&P}Oe.prototype.N=function(){if(Oe.Z.N.call(this),this.i){var a=this.i;for(const u in a.g){const d=a.g[u];for(let m=0;m<d.length;m++)ue(d[m]);delete a.g[u],a.h--}}this.G=null},Oe.prototype.J=function(a,u,d,m){return this.i.add(String(a),u,!1,d,m)},Oe.prototype.K=function(a,u,d,m){return this.i.add(String(a),u,!0,d,m)};function Ei(a,u,d,m){if(u=a.i.g[String(u)],!u)return!0;u=u.concat();let P=!0;for(let R=0;R<u.length;++R){const O=u[R];if(O&&!O.da&&O.capture==d){const J=O.listener,Ae=O.ha||O.src;O.fa&&Dt(a.i,O),P=J.call(Ae,m)!==!1&&P}}return P&&!m.defaultPrevented}function Cg(a,u){if(typeof a!="function")if(a&&typeof a.handleEvent=="function")a=h(a.handleEvent,a);else throw Error("Invalid listener argument");return Number(u)>2147483647?-1:o.setTimeout(a,u||0)}function ql(a){a.g=Cg(()=>{a.g=null,a.i&&(a.i=!1,ql(a))},a.l);const u=a.h;a.h=null,a.m.apply(null,u)}class Dg extends b{constructor(u,d){super(),this.m=u,this.l=d,this.h=null,this.i=!1,this.g=null}j(u){this.h=arguments,this.g?this.i=!0:ql(this)}N(){super.N(),this.g&&(o.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function ns(a){b.call(this),this.h=a,this.g={}}p(ns,b);var zl=[];function jl(a){_e(a.g,function(u,d){this.g.hasOwnProperty(d)&&la(u)},a),a.g={}}ns.prototype.N=function(){ns.Z.N.call(this),jl(this)},ns.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var da=o.JSON.stringify,Vg=o.JSON.parse,Ng=class{stringify(a){return o.JSON.stringify(a,void 0)}parse(a){return o.JSON.parse(a,void 0)}};function Gl(){}function Hl(){}var rs={OPEN:"a",hb:"b",ERROR:"c",tb:"d"};function fa(){I.call(this,"d")}p(fa,I);function pa(){I.call(this,"c")}p(pa,I);var wn={},Kl=null;function Ii(){return Kl=Kl||new Oe}wn.Ia="serverreachability";function Wl(a){I.call(this,wn.Ia,a)}p(Wl,I);function ss(a){const u=Ii();ze(u,new Wl(u))}wn.STAT_EVENT="statevent";function Ql(a,u){I.call(this,wn.STAT_EVENT,a),this.stat=u}p(Ql,I);function je(a){const u=Ii();ze(u,new Ql(u,a))}wn.Ja="timingevent";function Yl(a,u){I.call(this,wn.Ja,a),this.size=u}p(Yl,I);function is(a,u){if(typeof a!="function")throw Error("Fn must not be null and must be a function");return o.setTimeout(function(){a()},u)}function os(){this.g=!0}os.prototype.ua=function(){this.g=!1};function kg(a,u,d,m,P,R){a.info(function(){if(a.g)if(R){var O="",J=R.split("&");for(let le=0;le<J.length;le++){var Ae=J[le].split("=");if(Ae.length>1){const Ce=Ae[0];Ae=Ae[1];const gt=Ce.split("_");O=gt.length>=2&&gt[1]=="type"?O+(Ce+"="+Ae+"&"):O+(Ce+"=redacted&")}}}else O=null;else O=R;return"XMLHTTP REQ ("+m+") [attempt "+P+"]: "+u+`
`+d+`
`+O})}function xg(a,u,d,m,P,R,O){a.info(function(){return"XMLHTTP RESP ("+m+") [ attempt "+P+"]: "+u+`
`+d+`
`+R+" "+O})}function ir(a,u,d,m){a.info(function(){return"XMLHTTP TEXT ("+u+"): "+Lg(a,d)+(m?" "+m:"")})}function Og(a,u){a.info(function(){return"TIMEOUT: "+u})}os.prototype.info=function(){};function Lg(a,u){if(!a.g)return u;if(!u)return null;try{const R=JSON.parse(u);if(R){for(a=0;a<R.length;a++)if(Array.isArray(R[a])){var d=R[a];if(!(d.length<2)){var m=d[1];if(Array.isArray(m)&&!(m.length<1)){var P=m[0];if(P!="noop"&&P!="stop"&&P!="close")for(let O=1;O<m.length;O++)m[O]=""}}}}return da(R)}catch{return u}}var wi={NO_ERROR:0,cb:1,qb:2,pb:3,kb:4,ob:5,rb:6,Ga:7,TIMEOUT:8,ub:9},Jl={ib:"complete",Fb:"success",ERROR:"error",Ga:"abort",xb:"ready",yb:"readystatechange",TIMEOUT:"timeout",sb:"incrementaldata",wb:"progress",lb:"downloadprogress",Nb:"uploadprogress"},Xl;function ma(){}p(ma,Gl),ma.prototype.g=function(){return new XMLHttpRequest},Xl=new ma;function as(a){return encodeURIComponent(String(a))}function Mg(a){var u=1;a=a.split(":");const d=[];for(;u>0&&a.length;)d.push(a.shift()),u--;return a.length&&d.push(a.join(":")),d}function jt(a,u,d,m){this.j=a,this.i=u,this.l=d,this.S=m||1,this.V=new ns(this),this.H=45e3,this.J=null,this.o=!1,this.u=this.B=this.A=this.M=this.F=this.T=this.D=null,this.G=[],this.g=null,this.C=0,this.m=this.v=null,this.X=-1,this.K=!1,this.P=0,this.O=null,this.W=this.L=this.U=this.R=!1,this.h=new Zl}function Zl(){this.i=null,this.g="",this.h=!1}var eu={},ga={};function _a(a,u,d){a.M=1,a.A=Ti(mt(u)),a.u=d,a.R=!0,tu(a,null)}function tu(a,u){a.F=Date.now(),bi(a),a.B=mt(a.A);var d=a.B,m=a.S;Array.isArray(m)||(m=[String(m)]),pu(d.i,"t",m),a.C=0,d=a.j.L,a.h=new Zl,a.g=Nu(a.j,d?u:null,!a.u),a.P>0&&(a.O=new Dg(h(a.Y,a,a.g),a.P)),u=a.V,d=a.g,m=a.ba;var P="readystatechange";Array.isArray(P)||(P&&(zl[0]=P.toString()),P=zl);for(let R=0;R<P.length;R++){const O=Re(d,P[R],m||u.handleEvent,!1,u.h||u);if(!O)break;u.g[O.key]=O}u=a.J?Qe(a.J):{},a.u?(a.v||(a.v="POST"),u["Content-Type"]="application/x-www-form-urlencoded",a.g.ea(a.B,a.v,a.u,u)):(a.v="GET",a.g.ea(a.B,a.v,null,u)),ss(),kg(a.i,a.v,a.B,a.l,a.S,a.u)}jt.prototype.ba=function(a){a=a.target;const u=this.O;u&&Kt(a)==3?u.j():this.Y(a)},jt.prototype.Y=function(a){try{if(a==this.g)e:{const J=Kt(this.g),Ae=this.g.ya(),le=this.g.ca();if(!(J<3)&&(J!=3||this.g&&(this.h.h||this.g.la()||Iu(this.g)))){this.K||J!=4||Ae==7||(Ae==8||le<=0?ss(3):ss(2)),ya(this);var u=this.g.ca();this.X=u;var d=Fg(this);if(this.o=u==200,xg(this.i,this.v,this.B,this.l,this.S,J,u),this.o){if(this.U&&!this.L){t:{if(this.g){var m,P=this.g;if((m=P.g?P.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!y(m)){var R=m;break t}}R=null}if(a=R)ir(this.i,this.l,a,"Initial handshake response via X-HTTP-Initial-Response"),this.L=!0,va(this,a);else{this.o=!1,this.m=3,je(12),bn(this),cs(this);break e}}if(this.R){a=!0;let Ce;for(;!this.K&&this.C<d.length;)if(Ce=Ug(this,d),Ce==ga){J==4&&(this.m=4,je(14),a=!1),ir(this.i,this.l,null,"[Incomplete Response]");break}else if(Ce==eu){this.m=4,je(15),ir(this.i,this.l,d,"[Invalid Chunk]"),a=!1;break}else ir(this.i,this.l,Ce,null),va(this,Ce);if(nu(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),J!=4||d.length!=0||this.h.h||(this.m=1,je(16),a=!1),this.o=this.o&&a,!a)ir(this.i,this.l,d,"[Invalid Chunked Response]"),bn(this),cs(this);else if(d.length>0&&!this.W){this.W=!0;var O=this.j;O.g==this&&O.aa&&!O.P&&(O.j.info("Great, no buffering proxy detected. Bytes received: "+d.length),Pa(O),O.P=!0,je(11))}}else ir(this.i,this.l,d,null),va(this,d);J==4&&bn(this),this.o&&!this.K&&(J==4?Ru(this.j,this):(this.o=!1,bi(this)))}else Zg(this.g),u==400&&d.indexOf("Unknown SID")>0?(this.m=3,je(12)):(this.m=0,je(13)),bn(this),cs(this)}}}catch{}finally{}};function Fg(a){if(!nu(a))return a.g.la();const u=Iu(a.g);if(u==="")return"";let d="";const m=u.length,P=Kt(a.g)==4;if(!a.h.i){if(typeof TextDecoder>"u")return bn(a),cs(a),"";a.h.i=new o.TextDecoder}for(let R=0;R<m;R++)a.h.h=!0,d+=a.h.i.decode(u[R],{stream:!(P&&R==m-1)});return u.length=0,a.h.g+=d,a.C=0,a.h.g}function nu(a){return a.g?a.v=="GET"&&a.M!=2&&a.j.Aa:!1}function Ug(a,u){var d=a.C,m=u.indexOf(`
`,d);return m==-1?ga:(d=Number(u.substring(d,m)),isNaN(d)?eu:(m+=1,m+d>u.length?ga:(u=u.slice(m,m+d),a.C=m+d,u)))}jt.prototype.cancel=function(){this.K=!0,bn(this)};function bi(a){a.T=Date.now()+a.H,ru(a,a.H)}function ru(a,u){if(a.D!=null)throw Error("WatchDog timer not null");a.D=is(h(a.aa,a),u)}function ya(a){a.D&&(o.clearTimeout(a.D),a.D=null)}jt.prototype.aa=function(){this.D=null;const a=Date.now();a-this.T>=0?(Og(this.i,this.B),this.M!=2&&(ss(),je(17)),bn(this),this.m=2,cs(this)):ru(this,this.T-a)};function cs(a){a.j.I==0||a.K||Ru(a.j,a)}function bn(a){ya(a);var u=a.O;u&&typeof u.dispose=="function"&&u.dispose(),a.O=null,jl(a.V),a.g&&(u=a.g,a.g=null,u.abort(),u.dispose())}function va(a,u){try{var d=a.j;if(d.I!=0&&(d.g==a||Ea(d.h,a))){if(!a.L&&Ea(d.h,a)&&d.I==3){try{var m=d.Ba.g.parse(u)}catch{m=null}if(Array.isArray(m)&&m.length==3){var P=m;if(P[0]==0){e:if(!d.v){if(d.g)if(d.g.F+3e3<a.F)Ci(d),Pi(d);else break e;Sa(d),je(18)}}else d.xa=P[1],0<d.xa-d.K&&P[2]<37500&&d.F&&d.A==0&&!d.C&&(d.C=is(h(d.Va,d),6e3));ou(d.h)<=1&&d.ta&&(d.ta=void 0)}else An(d,11)}else if((a.L||d.g==a)&&Ci(d),!y(u))for(P=d.Ba.g.parse(u),u=0;u<P.length;u++){let le=P[u];const Ce=le[0];if(!(Ce<=d.K))if(d.K=Ce,le=le[1],d.I==2)if(le[0]=="c"){d.M=le[1],d.ba=le[2];const gt=le[3];gt!=null&&(d.ka=gt,d.j.info("VER="+d.ka));const Sn=le[4];Sn!=null&&(d.za=Sn,d.j.info("SVER="+d.za));const Wt=le[5];Wt!=null&&typeof Wt=="number"&&Wt>0&&(m=1.5*Wt,d.O=m,d.j.info("backChannelRequestTimeoutMs_="+m)),m=d;const Qt=a.g;if(Qt){const Vi=Qt.g?Qt.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Vi){var R=m.h;R.g||Vi.indexOf("spdy")==-1&&Vi.indexOf("quic")==-1&&Vi.indexOf("h2")==-1||(R.j=R.l,R.g=new Set,R.h&&(Ia(R,R.h),R.h=null))}if(m.G){const Ra=Qt.g?Qt.g.getResponseHeader("X-HTTP-Session-Id"):null;Ra&&(m.wa=Ra,he(m.J,m.G,Ra))}}d.I=3,d.l&&d.l.ra(),d.aa&&(d.T=Date.now()-a.F,d.j.info("Handshake RTT: "+d.T+"ms")),m=d;var O=a;if(m.na=Vu(m,m.L?m.ba:null,m.W),O.L){au(m.h,O);var J=O,Ae=m.O;Ae&&(J.H=Ae),J.D&&(ya(J),bi(J)),m.g=O}else Su(m);d.i.length>0&&Ri(d)}else le[0]!="stop"&&le[0]!="close"||An(d,7);else d.I==3&&(le[0]=="stop"||le[0]=="close"?le[0]=="stop"?An(d,7):Aa(d):le[0]!="noop"&&d.l&&d.l.qa(le),d.A=0)}}ss(4)}catch{}}var Bg=class{constructor(a,u){this.g=a,this.map=u}};function su(a){this.l=a||10,o.PerformanceNavigationTiming?(a=o.performance.getEntriesByType("navigation"),a=a.length>0&&(a[0].nextHopProtocol=="hq"||a[0].nextHopProtocol=="h2")):a=!!(o.chrome&&o.chrome.loadTimes&&o.chrome.loadTimes()&&o.chrome.loadTimes().wasFetchedViaSpdy),this.j=a?this.l:1,this.g=null,this.j>1&&(this.g=new Set),this.h=null,this.i=[]}function iu(a){return a.h?!0:a.g?a.g.size>=a.j:!1}function ou(a){return a.h?1:a.g?a.g.size:0}function Ea(a,u){return a.h?a.h==u:a.g?a.g.has(u):!1}function Ia(a,u){a.g?a.g.add(u):a.h=u}function au(a,u){a.h&&a.h==u?a.h=null:a.g&&a.g.has(u)&&a.g.delete(u)}su.prototype.cancel=function(){if(this.i=cu(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const a of this.g.values())a.cancel();this.g.clear()}};function cu(a){if(a.h!=null)return a.i.concat(a.h.G);if(a.g!=null&&a.g.size!==0){let u=a.i;for(const d of a.g.values())u=u.concat(d.G);return u}return w(a.i)}var lu=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function $g(a,u){if(a){a=a.split("&");for(let d=0;d<a.length;d++){const m=a[d].indexOf("=");let P,R=null;m>=0?(P=a[d].substring(0,m),R=a[d].substring(m+1)):P=a[d],u(P,R?decodeURIComponent(R.replace(/\+/g," ")):"")}}}function Gt(a){this.g=this.o=this.j="",this.u=null,this.m=this.h="",this.l=!1;let u;a instanceof Gt?(this.l=a.l,ls(this,a.j),this.o=a.o,this.g=a.g,us(this,a.u),this.h=a.h,wa(this,mu(a.i)),this.m=a.m):a&&(u=String(a).match(lu))?(this.l=!1,ls(this,u[1]||"",!0),this.o=hs(u[2]||""),this.g=hs(u[3]||"",!0),us(this,u[4]),this.h=hs(u[5]||"",!0),wa(this,u[6]||"",!0),this.m=hs(u[7]||"")):(this.l=!1,this.i=new fs(null,this.l))}Gt.prototype.toString=function(){const a=[];var u=this.j;u&&a.push(ds(u,uu,!0),":");var d=this.g;return(d||u=="file")&&(a.push("//"),(u=this.o)&&a.push(ds(u,uu,!0),"@"),a.push(as(d).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.u,d!=null&&a.push(":",String(d))),(d=this.h)&&(this.g&&d.charAt(0)!="/"&&a.push("/"),a.push(ds(d,d.charAt(0)=="/"?jg:zg,!0))),(d=this.i.toString())&&a.push("?",d),(d=this.m)&&a.push("#",ds(d,Hg)),a.join("")},Gt.prototype.resolve=function(a){const u=mt(this);let d=!!a.j;d?ls(u,a.j):d=!!a.o,d?u.o=a.o:d=!!a.g,d?u.g=a.g:d=a.u!=null;var m=a.h;if(d)us(u,a.u);else if(d=!!a.h){if(m.charAt(0)!="/")if(this.g&&!this.h)m="/"+m;else{var P=u.h.lastIndexOf("/");P!=-1&&(m=u.h.slice(0,P+1)+m)}if(P=m,P==".."||P==".")m="";else if(P.indexOf("./")!=-1||P.indexOf("/.")!=-1){m=P.lastIndexOf("/",0)==0,P=P.split("/");const R=[];for(let O=0;O<P.length;){const J=P[O++];J=="."?m&&O==P.length&&R.push(""):J==".."?((R.length>1||R.length==1&&R[0]!="")&&R.pop(),m&&O==P.length&&R.push("")):(R.push(J),m=!0)}m=R.join("/")}else m=P}return d?u.h=m:d=a.i.toString()!=="",d?wa(u,mu(a.i)):d=!!a.m,d&&(u.m=a.m),u};function mt(a){return new Gt(a)}function ls(a,u,d){a.j=d?hs(u,!0):u,a.j&&(a.j=a.j.replace(/:$/,""))}function us(a,u){if(u){if(u=Number(u),isNaN(u)||u<0)throw Error("Bad port number "+u);a.u=u}else a.u=null}function wa(a,u,d){u instanceof fs?(a.i=u,Kg(a.i,a.l)):(d||(u=ds(u,Gg)),a.i=new fs(u,a.l))}function he(a,u,d){a.i.set(u,d)}function Ti(a){return he(a,"zx",Math.floor(Math.random()*2147483648).toString(36)+Math.abs(Math.floor(Math.random()*2147483648)^Date.now()).toString(36)),a}function hs(a,u){return a?u?decodeURI(a.replace(/%25/g,"%2525")):decodeURIComponent(a):""}function ds(a,u,d){return typeof a=="string"?(a=encodeURI(a).replace(u,qg),d&&(a=a.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),a):null}function qg(a){return a=a.charCodeAt(0),"%"+(a>>4&15).toString(16)+(a&15).toString(16)}var uu=/[#\/\?@]/g,zg=/[#\?:]/g,jg=/[#\?]/g,Gg=/[#\?@]/g,Hg=/#/g;function fs(a,u){this.h=this.g=null,this.i=a||null,this.j=!!u}function Tn(a){a.g||(a.g=new Map,a.h=0,a.i&&$g(a.i,function(u,d){a.add(decodeURIComponent(u.replace(/\+/g," ")),d)}))}n=fs.prototype,n.add=function(a,u){Tn(this),this.i=null,a=or(this,a);let d=this.g.get(a);return d||this.g.set(a,d=[]),d.push(u),this.h+=1,this};function hu(a,u){Tn(a),u=or(a,u),a.g.has(u)&&(a.i=null,a.h-=a.g.get(u).length,a.g.delete(u))}function du(a,u){return Tn(a),u=or(a,u),a.g.has(u)}n.forEach=function(a,u){Tn(this),this.g.forEach(function(d,m){d.forEach(function(P){a.call(u,P,m,this)},this)},this)};function fu(a,u){Tn(a);let d=[];if(typeof u=="string")du(a,u)&&(d=d.concat(a.g.get(or(a,u))));else for(a=Array.from(a.g.values()),u=0;u<a.length;u++)d=d.concat(a[u]);return d}n.set=function(a,u){return Tn(this),this.i=null,a=or(this,a),du(this,a)&&(this.h-=this.g.get(a).length),this.g.set(a,[u]),this.h+=1,this},n.get=function(a,u){return a?(a=fu(this,a),a.length>0?String(a[0]):u):u};function pu(a,u,d){hu(a,u),d.length>0&&(a.i=null,a.g.set(or(a,u),w(d)),a.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const a=[],u=Array.from(this.g.keys());for(let m=0;m<u.length;m++){var d=u[m];const P=as(d);d=fu(this,d);for(let R=0;R<d.length;R++){let O=P;d[R]!==""&&(O+="="+as(d[R])),a.push(O)}}return this.i=a.join("&")};function mu(a){const u=new fs;return u.i=a.i,a.g&&(u.g=new Map(a.g),u.h=a.h),u}function or(a,u){return u=String(u),a.j&&(u=u.toLowerCase()),u}function Kg(a,u){u&&!a.j&&(Tn(a),a.i=null,a.g.forEach(function(d,m){const P=m.toLowerCase();m!=P&&(hu(this,m),pu(this,P,d))},a)),a.j=u}function Wg(a,u){const d=new os;if(o.Image){const m=new Image;m.onload=f(Ht,d,"TestLoadImage: loaded",!0,u,m),m.onerror=f(Ht,d,"TestLoadImage: error",!1,u,m),m.onabort=f(Ht,d,"TestLoadImage: abort",!1,u,m),m.ontimeout=f(Ht,d,"TestLoadImage: timeout",!1,u,m),o.setTimeout(function(){m.ontimeout&&m.ontimeout()},1e4),m.src=a}else u(!1)}function Qg(a,u){const d=new os,m=new AbortController,P=setTimeout(()=>{m.abort(),Ht(d,"TestPingServer: timeout",!1,u)},1e4);fetch(a,{signal:m.signal}).then(R=>{clearTimeout(P),R.ok?Ht(d,"TestPingServer: ok",!0,u):Ht(d,"TestPingServer: server error",!1,u)}).catch(()=>{clearTimeout(P),Ht(d,"TestPingServer: error",!1,u)})}function Ht(a,u,d,m,P){try{P&&(P.onload=null,P.onerror=null,P.onabort=null,P.ontimeout=null),m(d)}catch{}}function Yg(){this.g=new Ng}function ba(a){this.i=a.Sb||null,this.h=a.ab||!1}p(ba,Gl),ba.prototype.g=function(){return new Ai(this.i,this.h)};function Ai(a,u){Oe.call(this),this.H=a,this.o=u,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.A=new Headers,this.h=null,this.F="GET",this.D="",this.g=!1,this.B=this.j=this.l=null,this.v=new AbortController}p(Ai,Oe),n=Ai.prototype,n.open=function(a,u){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.F=a,this.D=u,this.readyState=1,ms(this)},n.send=function(a){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");if(this.v.signal.aborted)throw this.abort(),Error("Request was aborted.");this.g=!0;const u={headers:this.A,method:this.F,credentials:this.m,cache:void 0,signal:this.v.signal};a&&(u.body=a),(this.H||o).fetch(new Request(this.D,u)).then(this.Pa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.A=new Headers,this.status=0,this.v.abort(),this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),this.readyState>=1&&this.g&&this.readyState!=4&&(this.g=!1,ps(this)),this.readyState=0},n.Pa=function(a){if(this.g&&(this.l=a,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=a.headers,this.readyState=2,ms(this)),this.g&&(this.readyState=3,ms(this),this.g)))if(this.responseType==="arraybuffer")a.arrayBuffer().then(this.Na.bind(this),this.ga.bind(this));else if(typeof o.ReadableStream<"u"&&"body"in a){if(this.j=a.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.B=new TextDecoder;gu(this)}else a.text().then(this.Oa.bind(this),this.ga.bind(this))};function gu(a){a.j.read().then(a.Ma.bind(a)).catch(a.ga.bind(a))}n.Ma=function(a){if(this.g){if(this.o&&a.value)this.response.push(a.value);else if(!this.o){var u=a.value?a.value:new Uint8Array(0);(u=this.B.decode(u,{stream:!a.done}))&&(this.response=this.responseText+=u)}a.done?ps(this):ms(this),this.readyState==3&&gu(this)}},n.Oa=function(a){this.g&&(this.response=this.responseText=a,ps(this))},n.Na=function(a){this.g&&(this.response=a,ps(this))},n.ga=function(){this.g&&ps(this)};function ps(a){a.readyState=4,a.l=null,a.j=null,a.B=null,ms(a)}n.setRequestHeader=function(a,u){this.A.append(a,u)},n.getResponseHeader=function(a){return this.h&&this.h.get(a.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const a=[],u=this.h.entries();for(var d=u.next();!d.done;)d=d.value,a.push(d[0]+": "+d[1]),d=u.next();return a.join(`\r
`)};function ms(a){a.onreadystatechange&&a.onreadystatechange.call(a)}Object.defineProperty(Ai.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(a){this.m=a?"include":"same-origin"}});function _u(a){let u="";return _e(a,function(d,m){u+=m,u+=":",u+=d,u+=`\r
`}),u}function Ta(a,u,d){e:{for(m in d){var m=!1;break e}m=!0}m||(d=_u(d),typeof a=="string"?d!=null&&as(d):he(a,u,d))}function ye(a){Oe.call(this),this.headers=new Map,this.L=a||null,this.h=!1,this.g=null,this.D="",this.o=0,this.l="",this.j=this.B=this.v=this.A=!1,this.m=null,this.F="",this.H=!1}p(ye,Oe);var Jg=/^https?$/i,Xg=["POST","PUT"];n=ye.prototype,n.Fa=function(a){this.H=a},n.ea=function(a,u,d,m){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+a);u=u?u.toUpperCase():"GET",this.D=a,this.l="",this.o=0,this.A=!1,this.h=!0,this.g=this.L?this.L.g():Xl.g(),this.g.onreadystatechange=g(h(this.Ca,this));try{this.B=!0,this.g.open(u,String(a),!0),this.B=!1}catch(R){yu(this,R);return}if(a=d||"",d=new Map(this.headers),m)if(Object.getPrototypeOf(m)===Object.prototype)for(var P in m)d.set(P,m[P]);else if(typeof m.keys=="function"&&typeof m.get=="function")for(const R of m.keys())d.set(R,m.get(R));else throw Error("Unknown input type for opt_headers: "+String(m));m=Array.from(d.keys()).find(R=>R.toLowerCase()=="content-type"),P=o.FormData&&a instanceof o.FormData,!(Array.prototype.indexOf.call(Xg,u,void 0)>=0)||m||P||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[R,O]of d)this.g.setRequestHeader(R,O);this.F&&(this.g.responseType=this.F),"withCredentials"in this.g&&this.g.withCredentials!==this.H&&(this.g.withCredentials=this.H);try{this.m&&(clearTimeout(this.m),this.m=null),this.v=!0,this.g.send(a),this.v=!1}catch(R){yu(this,R)}};function yu(a,u){a.h=!1,a.g&&(a.j=!0,a.g.abort(),a.j=!1),a.l=u,a.o=5,vu(a),Si(a)}function vu(a){a.A||(a.A=!0,ze(a,"complete"),ze(a,"error"))}n.abort=function(a){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.o=a||7,ze(this,"complete"),ze(this,"abort"),Si(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Si(this,!0)),ye.Z.N.call(this)},n.Ca=function(){this.u||(this.B||this.v||this.j?Eu(this):this.Xa())},n.Xa=function(){Eu(this)};function Eu(a){if(a.h&&typeof i<"u"){if(a.v&&Kt(a)==4)setTimeout(a.Ca.bind(a),0);else if(ze(a,"readystatechange"),Kt(a)==4){a.h=!1;try{const R=a.ca();e:switch(R){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var u=!0;break e;default:u=!1}var d;if(!(d=u)){var m;if(m=R===0){let O=String(a.D).match(lu)[1]||null;!O&&o.self&&o.self.location&&(O=o.self.location.protocol.slice(0,-1)),m=!Jg.test(O?O.toLowerCase():"")}d=m}if(d)ze(a,"complete"),ze(a,"success");else{a.o=6;try{var P=Kt(a)>2?a.g.statusText:""}catch{P=""}a.l=P+" ["+a.ca()+"]",vu(a)}}finally{Si(a)}}}}function Si(a,u){if(a.g){a.m&&(clearTimeout(a.m),a.m=null);const d=a.g;a.g=null,u||ze(a,"ready");try{d.onreadystatechange=null}catch{}}}n.isActive=function(){return!!this.g};function Kt(a){return a.g?a.g.readyState:0}n.ca=function(){try{return Kt(this)>2?this.g.status:-1}catch{return-1}},n.la=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.La=function(a){if(this.g){var u=this.g.responseText;return a&&u.indexOf(a)==0&&(u=u.substring(a.length)),Vg(u)}};function Iu(a){try{if(!a.g)return null;if("response"in a.g)return a.g.response;switch(a.F){case"":case"text":return a.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in a.g)return a.g.mozResponseArrayBuffer}return null}catch{return null}}function Zg(a){const u={};a=(a.g&&Kt(a)>=2&&a.g.getAllResponseHeaders()||"").split(`\r
`);for(let m=0;m<a.length;m++){if(y(a[m]))continue;var d=Mg(a[m]);const P=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const R=u[P]||[];u[P]=R,R.push(d)}qe(u,function(m){return m.join(", ")})}n.ya=function(){return this.o},n.Ha=function(){return typeof this.l=="string"?this.l:String(this.l)};function gs(a,u,d){return d&&d.internalChannelParams&&d.internalChannelParams[a]||u}function wu(a){this.za=0,this.i=[],this.j=new os,this.ba=this.na=this.J=this.W=this.g=this.wa=this.G=this.H=this.u=this.U=this.o=null,this.Ya=this.V=0,this.Sa=gs("failFast",!1,a),this.F=this.C=this.v=this.m=this.l=null,this.X=!0,this.xa=this.K=-1,this.Y=this.A=this.D=0,this.Qa=gs("baseRetryDelayMs",5e3,a),this.Za=gs("retryDelaySeedMs",1e4,a),this.Ta=gs("forwardChannelMaxRetries",2,a),this.va=gs("forwardChannelRequestTimeoutMs",2e4,a),this.ma=a&&a.xmlHttpFactory||void 0,this.Ua=a&&a.Rb||void 0,this.Aa=a&&a.useFetchStreams||!1,this.O=void 0,this.L=a&&a.supportsCrossDomainXhr||!1,this.M="",this.h=new su(a&&a.concurrentRequestLimit),this.Ba=new Yg,this.S=a&&a.fastHandshake||!1,this.R=a&&a.encodeInitMessageHeaders||!1,this.S&&this.R&&(this.R=!1),this.Ra=a&&a.Pb||!1,a&&a.ua&&this.j.ua(),a&&a.forceLongPolling&&(this.X=!1),this.aa=!this.S&&this.X&&a&&a.detectBufferingProxy||!1,this.ia=void 0,a&&a.longPollingTimeout&&a.longPollingTimeout>0&&(this.ia=a.longPollingTimeout),this.ta=void 0,this.T=0,this.P=!1,this.ja=this.B=null}n=wu.prototype,n.ka=8,n.I=1,n.connect=function(a,u,d,m){je(0),this.W=a,this.H=u||{},d&&m!==void 0&&(this.H.OSID=d,this.H.OAID=m),this.F=this.X,this.J=Vu(this,null,this.W),Ri(this)};function Aa(a){if(bu(a),a.I==3){var u=a.V++,d=mt(a.J);if(he(d,"SID",a.M),he(d,"RID",u),he(d,"TYPE","terminate"),_s(a,d),u=new jt(a,a.j,u),u.M=2,u.A=Ti(mt(d)),d=!1,o.navigator&&o.navigator.sendBeacon)try{d=o.navigator.sendBeacon(u.A.toString(),"")}catch{}!d&&o.Image&&(new Image().src=u.A,d=!0),d||(u.g=Nu(u.j,null),u.g.ea(u.A)),u.F=Date.now(),bi(u)}Du(a)}function Pi(a){a.g&&(Pa(a),a.g.cancel(),a.g=null)}function bu(a){Pi(a),a.v&&(o.clearTimeout(a.v),a.v=null),Ci(a),a.h.cancel(),a.m&&(typeof a.m=="number"&&o.clearTimeout(a.m),a.m=null)}function Ri(a){if(!iu(a.h)&&!a.m){a.m=!0;var u=a.Ea;M||_(),q||(M(),q=!0),E.add(u,a),a.D=0}}function e_(a,u){return ou(a.h)>=a.h.j-(a.m?1:0)?!1:a.m?(a.i=u.G.concat(a.i),!0):a.I==1||a.I==2||a.D>=(a.Sa?0:a.Ta)?!1:(a.m=is(h(a.Ea,a,u),Cu(a,a.D)),a.D++,!0)}n.Ea=function(a){if(this.m)if(this.m=null,this.I==1){if(!a){this.V=Math.floor(Math.random()*1e5),a=this.V++;const P=new jt(this,this.j,a);let R=this.o;if(this.U&&(R?(R=Qe(R),ie(R,this.U)):R=this.U),this.u!==null||this.R||(P.J=R,R=null),this.S)e:{for(var u=0,d=0;d<this.i.length;d++){t:{var m=this.i[d];if("__data__"in m.map&&(m=m.map.__data__,typeof m=="string")){m=m.length;break t}m=void 0}if(m===void 0)break;if(u+=m,u>4096){u=d;break e}if(u===4096||d===this.i.length-1){u=d+1;break e}}u=1e3}else u=1e3;u=Au(this,P,u),d=mt(this.J),he(d,"RID",a),he(d,"CVER",22),this.G&&he(d,"X-HTTP-Session-Id",this.G),_s(this,d),R&&(this.R?u="headers="+as(_u(R))+"&"+u:this.u&&Ta(d,this.u,R)),Ia(this.h,P),this.Ra&&he(d,"TYPE","init"),this.S?(he(d,"$req",u),he(d,"SID","null"),P.U=!0,_a(P,d,null)):_a(P,d,u),this.I=2}}else this.I==3&&(a?Tu(this,a):this.i.length==0||iu(this.h)||Tu(this))};function Tu(a,u){var d;u?d=u.l:d=a.V++;const m=mt(a.J);he(m,"SID",a.M),he(m,"RID",d),he(m,"AID",a.K),_s(a,m),a.u&&a.o&&Ta(m,a.u,a.o),d=new jt(a,a.j,d,a.D+1),a.u===null&&(d.J=a.o),u&&(a.i=u.G.concat(a.i)),u=Au(a,d,1e3),d.H=Math.round(a.va*.5)+Math.round(a.va*.5*Math.random()),Ia(a.h,d),_a(d,m,u)}function _s(a,u){a.H&&_e(a.H,function(d,m){he(u,m,d)}),a.l&&_e({},function(d,m){he(u,m,d)})}function Au(a,u,d){d=Math.min(a.i.length,d);const m=a.l?h(a.l.Ka,a.l,a):null;e:{var P=a.i;let J=-1;for(;;){const Ae=["count="+d];J==-1?d>0?(J=P[0].g,Ae.push("ofs="+J)):J=0:Ae.push("ofs="+J);let le=!0;for(let Ce=0;Ce<d;Ce++){var R=P[Ce].g;const gt=P[Ce].map;if(R-=J,R<0)J=Math.max(0,P[Ce].g-100),le=!1;else try{R="req"+R+"_"||"";try{var O=gt instanceof Map?gt:Object.entries(gt);for(const[Sn,Wt]of O){let Qt=Wt;c(Wt)&&(Qt=da(Wt)),Ae.push(R+Sn+"="+encodeURIComponent(Qt))}}catch(Sn){throw Ae.push(R+"type="+encodeURIComponent("_badmap")),Sn}}catch{m&&m(gt)}}if(le){O=Ae.join("&");break e}}O=void 0}return a=a.i.splice(0,d),u.G=a,O}function Su(a){if(!a.g&&!a.v){a.Y=1;var u=a.Da;M||_(),q||(M(),q=!0),E.add(u,a),a.A=0}}function Sa(a){return a.g||a.v||a.A>=3?!1:(a.Y++,a.v=is(h(a.Da,a),Cu(a,a.A)),a.A++,!0)}n.Da=function(){if(this.v=null,Pu(this),this.aa&&!(this.P||this.g==null||this.T<=0)){var a=4*this.T;this.j.info("BP detection timer enabled: "+a),this.B=is(h(this.Wa,this),a)}},n.Wa=function(){this.B&&(this.B=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.P=!0,je(10),Pi(this),Pu(this))};function Pa(a){a.B!=null&&(o.clearTimeout(a.B),a.B=null)}function Pu(a){a.g=new jt(a,a.j,"rpc",a.Y),a.u===null&&(a.g.J=a.o),a.g.P=0;var u=mt(a.na);he(u,"RID","rpc"),he(u,"SID",a.M),he(u,"AID",a.K),he(u,"CI",a.F?"0":"1"),!a.F&&a.ia&&he(u,"TO",a.ia),he(u,"TYPE","xmlhttp"),_s(a,u),a.u&&a.o&&Ta(u,a.u,a.o),a.O&&(a.g.H=a.O);var d=a.g;a=a.ba,d.M=1,d.A=Ti(mt(u)),d.u=null,d.R=!0,tu(d,a)}n.Va=function(){this.C!=null&&(this.C=null,Pi(this),Sa(this),je(19))};function Ci(a){a.C!=null&&(o.clearTimeout(a.C),a.C=null)}function Ru(a,u){var d=null;if(a.g==u){Ci(a),Pa(a),a.g=null;var m=2}else if(Ea(a.h,u))d=u.G,au(a.h,u),m=1;else return;if(a.I!=0){if(u.o)if(m==1){d=u.u?u.u.length:0,u=Date.now()-u.F;var P=a.D;m=Ii(),ze(m,new Yl(m,d)),Ri(a)}else Su(a);else if(P=u.m,P==3||P==0&&u.X>0||!(m==1&&e_(a,u)||m==2&&Sa(a)))switch(d&&d.length>0&&(u=a.h,u.i=u.i.concat(d)),P){case 1:An(a,5);break;case 4:An(a,10);break;case 3:An(a,6);break;default:An(a,2)}}}function Cu(a,u){let d=a.Qa+Math.floor(Math.random()*a.Za);return a.isActive()||(d*=2),d*u}function An(a,u){if(a.j.info("Error code "+u),u==2){var d=h(a.bb,a),m=a.Ua;const P=!m;m=new Gt(m||"//www.google.com/images/cleardot.gif"),o.location&&o.location.protocol=="http"||ls(m,"https"),Ti(m),P?Wg(m.toString(),d):Qg(m.toString(),d)}else je(2);a.I=0,a.l&&a.l.pa(u),Du(a),bu(a)}n.bb=function(a){a?(this.j.info("Successfully pinged google.com"),je(2)):(this.j.info("Failed to ping google.com"),je(1))};function Du(a){if(a.I=0,a.ja=[],a.l){const u=cu(a.h);(u.length!=0||a.i.length!=0)&&(A(a.ja,u),A(a.ja,a.i),a.h.i.length=0,w(a.i),a.i.length=0),a.l.oa()}}function Vu(a,u,d){var m=d instanceof Gt?mt(d):new Gt(d);if(m.g!="")u&&(m.g=u+"."+m.g),us(m,m.u);else{var P=o.location;m=P.protocol,u=u?u+"."+P.hostname:P.hostname,P=+P.port;const R=new Gt(null);m&&ls(R,m),u&&(R.g=u),P&&us(R,P),d&&(R.h=d),m=R}return d=a.G,u=a.wa,d&&u&&he(m,d,u),he(m,"VER",a.ka),_s(a,m),m}function Nu(a,u,d){if(u&&!a.L)throw Error("Can't create secondary domain capable XhrIo object.");return u=a.Aa&&!a.ma?new ye(new ba({ab:d})):new ye(a.ma),u.Fa(a.L),u}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function ku(){}n=ku.prototype,n.ra=function(){},n.qa=function(){},n.pa=function(){},n.oa=function(){},n.isActive=function(){return!0},n.Ka=function(){};function Di(){}Di.prototype.g=function(a,u){return new et(a,u)};function et(a,u){Oe.call(this),this.g=new wu(u),this.l=a,this.h=u&&u.messageUrlParams||null,a=u&&u.messageHeaders||null,u&&u.clientProtocolHeaderRequired&&(a?a["X-Client-Protocol"]="webchannel":a={"X-Client-Protocol":"webchannel"}),this.g.o=a,a=u&&u.initMessageHeaders||null,u&&u.messageContentType&&(a?a["X-WebChannel-Content-Type"]=u.messageContentType:a={"X-WebChannel-Content-Type":u.messageContentType}),u&&u.sa&&(a?a["X-WebChannel-Client-Profile"]=u.sa:a={"X-WebChannel-Client-Profile":u.sa}),this.g.U=a,(a=u&&u.Qb)&&!y(a)&&(this.g.u=a),this.A=u&&u.supportsCrossDomainXhr||!1,this.v=u&&u.sendRawJson||!1,(u=u&&u.httpSessionIdParam)&&!y(u)&&(this.g.G=u,a=this.h,a!==null&&u in a&&(a=this.h,u in a&&delete a[u])),this.j=new ar(this)}p(et,Oe),et.prototype.m=function(){this.g.l=this.j,this.A&&(this.g.L=!0),this.g.connect(this.l,this.h||void 0)},et.prototype.close=function(){Aa(this.g)},et.prototype.o=function(a){var u=this.g;if(typeof a=="string"){var d={};d.__data__=a,a=d}else this.v&&(d={},d.__data__=da(a),a=d);u.i.push(new Bg(u.Ya++,a)),u.I==3&&Ri(u)},et.prototype.N=function(){this.g.l=null,delete this.j,Aa(this.g),delete this.g,et.Z.N.call(this)};function xu(a){fa.call(this),a.__headers__&&(this.headers=a.__headers__,this.statusCode=a.__status__,delete a.__headers__,delete a.__status__);var u=a.__sm__;if(u){e:{for(const d in u){a=d;break e}a=void 0}(this.i=a)&&(a=this.i,u=u!==null&&a in u?u[a]:void 0),this.data=u}else this.data=a}p(xu,fa);function Ou(){pa.call(this),this.status=1}p(Ou,pa);function ar(a){this.g=a}p(ar,ku),ar.prototype.ra=function(){ze(this.g,"a")},ar.prototype.qa=function(a){ze(this.g,new xu(a))},ar.prototype.pa=function(a){ze(this.g,new Ou)},ar.prototype.oa=function(){ze(this.g,"b")},Di.prototype.createWebChannel=Di.prototype.g,et.prototype.send=et.prototype.o,et.prototype.open=et.prototype.m,et.prototype.close=et.prototype.close,ep=function(){return new Di},Zf=function(){return Ii()},Xf=wn,tc={jb:0,mb:1,nb:2,Hb:3,Mb:4,Jb:5,Kb:6,Ib:7,Gb:8,Lb:9,PROXY:10,NOPROXY:11,Eb:12,Ab:13,Bb:14,zb:15,Cb:16,Db:17,fb:18,eb:19,gb:20},wi.NO_ERROR=0,wi.TIMEOUT=8,wi.HTTP_ERROR=6,Hi=wi,Jl.COMPLETE="complete",Jf=Jl,Hl.EventType=rs,rs.OPEN="a",rs.CLOSE="b",rs.ERROR="c",rs.MESSAGE="d",Oe.prototype.listen=Oe.prototype.J,As=Hl,ye.prototype.listenOnce=ye.prototype.K,ye.prototype.getLastError=ye.prototype.Ha,ye.prototype.getLastErrorCode=ye.prototype.ya,ye.prototype.getStatus=ye.prototype.ca,ye.prototype.getResponseJson=ye.prototype.La,ye.prototype.getResponseText=ye.prototype.la,ye.prototype.send=ye.prototype.ea,ye.prototype.setWithCredentials=ye.prototype.Fa,Yf=ye}).apply(typeof ki<"u"?ki:typeof self<"u"?self:typeof window<"u"?window:{});const ph="@firebase/firestore",mh="4.9.2";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class He{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}He.UNAUTHENTICATED=new He(null),He.GOOGLE_CREDENTIALS=new He("google-credentials-uid"),He.FIRST_PARTY=new He("first-party-uid"),He.MOCK_USER=new He("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Jr="12.3.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hn=new Oc("@firebase/firestore");function mr(){return Hn.logLevel}function k(n,...e){if(Hn.logLevel<=Z.DEBUG){const t=e.map(Hc);Hn.debug(`Firestore (${Jr}): ${n}`,...t)}}function Ke(n,...e){if(Hn.logLevel<=Z.ERROR){const t=e.map(Hc);Hn.error(`Firestore (${Jr}): ${n}`,...t)}}function js(n,...e){if(Hn.logLevel<=Z.WARN){const t=e.map(Hc);Hn.warn(`Firestore (${Jr}): ${n}`,...t)}}function Hc(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return(function(t){return JSON.stringify(t)})(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n,e,t){let r="Unexpected state";typeof e=="string"?r=e:t=e,tp(n,r,t)}function tp(n,e,t){let r=`FIRESTORE (${Jr}) INTERNAL ASSERTION FAILED: ${e} (ID: ${n.toString(16)})`;if(t!==void 0)try{r+=" CONTEXT: "+JSON.stringify(t)}catch{r+=" CONTEXT: "+t}throw Ke(r),new Error(r)}function G(n,e,t,r){let s="Unexpected state";typeof t=="string"?s=t:r=t,n||tp(e,s,r)}function Y(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class x extends $t{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt{constructor(){this.promise=new Promise(((e,t)=>{this.resolve=e,this.reject=t}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JE{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class XE{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable((()=>t(He.UNAUTHENTICATED)))}shutdown(){}}class ZE{constructor(e){this.t=e,this.currentUser=He.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){G(this.o===void 0,42304);let r=this.i;const s=l=>this.i!==r?(r=this.i,t(l)):Promise.resolve();let i=new Tt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new Tt,e.enqueueRetryable((()=>s(this.currentUser)))};const o=()=>{const l=i;e.enqueueRetryable((async()=>{await l.promise,await s(this.currentUser)}))},c=l=>{k("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.o&&(this.auth.addAuthTokenListener(this.o),o())};this.t.onInit((l=>c(l))),setTimeout((()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?c(l):(k("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new Tt)}}),0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then((r=>this.i!==e?(k("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(G(typeof r.accessToken=="string",31837,{l:r}),new JE(r.accessToken,this.currentUser)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return G(e===null||typeof e=="string",2055,{h:e}),new He(e)}}class eI{constructor(e,t,r){this.P=e,this.T=t,this.I=r,this.type="FirstParty",this.user=He.FIRST_PARTY,this.A=new Map}R(){return this.I?this.I():null}get headers(){this.A.set("X-Goog-AuthUser",this.P);const e=this.R();return e&&this.A.set("Authorization",e),this.T&&this.A.set("X-Goog-Iam-Authorization-Token",this.T),this.A}}class tI{constructor(e,t,r){this.P=e,this.T=t,this.I=r}getToken(){return Promise.resolve(new eI(this.P,this.T,this.I))}start(e,t){e.enqueueRetryable((()=>t(He.FIRST_PARTY)))}shutdown(){}invalidateToken(){}}class gh{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class nI{constructor(e,t){this.V=t,this.forceRefresh=!1,this.appCheck=null,this.m=null,this.p=null,ht(e)&&e.settings.appCheckToken&&(this.p=e.settings.appCheckToken)}start(e,t){G(this.o===void 0,3512);const r=i=>{i.error!=null&&k("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.m;return this.m=i.token,k("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(i.token):Promise.resolve()};this.o=i=>{e.enqueueRetryable((()=>r(i)))};const s=i=>{k("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.o&&this.appCheck.addTokenListener(this.o)};this.V.onInit((i=>s(i))),setTimeout((()=>{if(!this.appCheck){const i=this.V.getImmediate({optional:!0});i?s(i):k("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}}),0)}getToken(){if(this.p)return Promise.resolve(new gh(this.p));const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then((t=>t?(G(typeof t.token=="string",44558,{tokenResult:t}),this.m=t.token,new gh(t.token)):null)):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rI(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=62*Math.floor(4.129032258064516);let r="";for(;r.length<20;){const s=rI(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<t&&(r+=e.charAt(s[i]%62))}return r}}function Q(n,e){return n<e?-1:n>e?1:0}function nc(n,e){const t=Math.min(n.length,e.length);for(let r=0;r<t;r++){const s=n.charAt(r),i=e.charAt(r);if(s!==i)return La(s)===La(i)?Q(s,i):La(s)?1:-1}return Q(n.length,e.length)}const sI=55296,iI=57343;function La(n){const e=n.charCodeAt(0);return e>=sI&&e<=iI}function Nr(n,e,t){return n.length===e.length&&n.every(((r,s)=>t(r,e[s])))}function np(n){return n+"\0"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _h="__name__";class _t{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(637,{offset:t,range:e.length}),r===void 0?r=e.length-t:r>e.length-t&&B(1746,{length:r,range:e.length-t}),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return _t.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof _t?e.forEach((r=>{t.push(r)})):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const i=_t.compareSegments(e.get(s),t.get(s));if(i!==0)return i}return Q(e.length,t.length)}static compareSegments(e,t){const r=_t.isNumericId(e),s=_t.isNumericId(t);return r&&!s?-1:!r&&s?1:r&&s?_t.extractNumericId(e).compare(_t.extractNumericId(t)):nc(e,t)}static isNumericId(e){return e.startsWith("__id")&&e.endsWith("__")}static extractNumericId(e){return hn.fromString(e.substring(4,e.length-2))}}class se extends _t{construct(e,t,r){return new se(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new x(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter((s=>s.length>0)))}return new se(t)}static emptyPath(){return new se([])}}const oI=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ge extends _t{construct(e,t,r){return new ge(e,t,r)}static isValidIdentifier(e){return oI.test(e)}canonicalString(){return this.toArray().map((e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ge.isValidIdentifier(e)||(e="`"+e+"`"),e))).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)===_h}static keyField(){return new ge([_h])}static fromServerFormat(e){const t=[];let r="",s=0;const i=()=>{if(r.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let o=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new x(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[s+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new x(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=l,s+=2}else c==="`"?(o=!o,s++):c!=="."||o?(r+=c,s++):(i(),s++)}if(i(),o)throw new x(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ge(t)}static emptyPath(){return new ge([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class L{constructor(e){this.path=e}static fromPath(e){return new L(se.fromString(e))}static fromName(e){return new L(se.fromString(e).popFirst(5))}static empty(){return new L(se.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&se.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return se.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new L(new se(e.slice()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rp(n,e,t){if(!t)throw new x(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function aI(n,e,t,r){if(e===!0&&r===!0)throw new x(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function yh(n){if(!L.isDocumentKey(n))throw new x(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function vh(n){if(L.isDocumentKey(n))throw new x(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function sp(n){return typeof n=="object"&&n!==null&&(Object.getPrototypeOf(n)===Object.prototype||Object.getPrototypeOf(n)===null)}function Lo(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=(function(r){return r.constructor?r.constructor.name:null})(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B(12329,{type:typeof n})}function Rt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new x(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Lo(n);throw new x(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2025 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function be(n,e){const t={typeString:n};return e&&(t.value=e),t}function ci(n,e){if(!sp(n))throw new x(C.INVALID_ARGUMENT,"JSON must be an object");let t;for(const r in e)if(e[r]){const s=e[r].typeString,i="value"in e[r]?{value:e[r].value}:void 0;if(!(r in n)){t=`JSON missing required field: '${r}'`;break}const o=n[r];if(s&&typeof o!==s){t=`JSON field '${r}' must be a ${s}.`;break}if(i!==void 0&&o!==i.value){t=`Expected '${r}' field to equal '${i.value}'`;break}}if(t)throw new x(C.INVALID_ARGUMENT,t);return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Eh=-62135596800,Ih=1e6;class oe{static now(){return oe.fromMillis(Date.now())}static fromDate(e){return oe.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor((e-1e3*t)*Ih);return new oe(t,r)}constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new x(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<Eh)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new x(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/Ih}_compareTo(e){return this.seconds===e.seconds?Q(this.nanoseconds,e.nanoseconds):Q(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{type:oe._jsonSchemaVersion,seconds:this.seconds,nanoseconds:this.nanoseconds}}static fromJSON(e){if(ci(e,oe._jsonSchema))return new oe(e.seconds,e.nanoseconds)}valueOf(){const e=this.seconds-Eh;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}oe._jsonSchemaVersion="firestore/timestamp/1.0",oe._jsonSchema={type:be("string",oe._jsonSchemaVersion),seconds:be("number"),nanoseconds:be("number")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class H{static fromTimestamp(e){return new H(e)}static min(){return new H(new oe(0,0))}static max(){return new H(new oe(253402300799,999999999))}constructor(e){this.timestamp=e}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gs=-1;class fo{constructor(e,t,r,s){this.indexId=e,this.collectionGroup=t,this.fields=r,this.indexState=s}}function rc(n){return n.fields.find((e=>e.kind===2))}function Dn(n){return n.fields.filter((e=>e.kind!==2))}fo.UNKNOWN_ID=-1;class Ki{constructor(e,t){this.fieldPath=e,this.kind=t}}class Hs{constructor(e,t){this.sequenceNumber=e,this.offset=t}static empty(){return new Hs(0,st.min())}}function cI(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=H.fromTimestamp(r===1e9?new oe(t+1,0):new oe(t,r));return new st(s,L.empty(),e)}function ip(n){return new st(n.readTime,n.key,Gs)}class st{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new st(H.min(),L.empty(),Gs)}static max(){return new st(H.max(),L.empty(),Gs)}}function Wc(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=L.comparator(n.documentKey,e.documentKey),t!==0?t:Q(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const op="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class ap{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach((e=>e()))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function er(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==op)throw n;k("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class T{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e((t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)}),(t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)}))}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(59440),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new T(((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(e,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(t,i).next(r,s)}}))}toPromise(){return new Promise(((e,t)=>{this.next(e,t)}))}wrapUserFunction(e){try{const t=e();return t instanceof T?t:T.resolve(t)}catch(t){return T.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction((()=>e(t))):T.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction((()=>e(t))):T.reject(t)}static resolve(e){return new T(((t,r)=>{t(e)}))}static reject(e){return new T(((t,r)=>{r(e)}))}static waitFor(e){return new T(((t,r)=>{let s=0,i=0,o=!1;e.forEach((c=>{++s,c.next((()=>{++i,o&&i===s&&t()}),(l=>r(l)))})),o=!0,i===s&&t()}))}static or(e){let t=T.resolve(!1);for(const r of e)t=t.next((s=>s?T.resolve(s):r()));return t}static forEach(e,t){const r=[];return e.forEach(((s,i)=>{r.push(t.call(this,s,i))})),this.waitFor(r)}static mapArray(e,t){return new T(((r,s)=>{const i=e.length,o=new Array(i);let c=0;for(let l=0;l<i;l++){const h=l;t(e[h]).next((f=>{o[h]=f,++c,c===i&&r(o)}),(f=>s(f)))}}))}static doWhile(e,t){return new T(((r,s)=>{const i=()=>{e()===!0?t().next((()=>{i()}),s):r()};i()}))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nt="SimpleDb";class Mo{static open(e,t,r,s){try{return new Mo(t,e.transaction(s,r))}catch(i){throw new Ns(t,i)}}constructor(e,t){this.action=e,this.transaction=t,this.aborted=!1,this.S=new Tt,this.transaction.oncomplete=()=>{this.S.resolve()},this.transaction.onabort=()=>{t.error?this.S.reject(new Ns(e,t.error)):this.S.resolve()},this.transaction.onerror=r=>{const s=Qc(r.target.error);this.S.reject(new Ns(e,s))}}get D(){return this.S.promise}abort(e){e&&this.S.reject(e),this.aborted||(k(nt,"Aborting transaction:",e?e.message:"Client-initiated abort"),this.aborted=!0,this.transaction.abort())}C(){const e=this.transaction;this.aborted||typeof e.commit!="function"||e.commit()}store(e){const t=this.transaction.objectStore(e);return new uI(t)}}class dn{static delete(e){return k(nt,"Removing database:",e),kn(nf().indexedDB.deleteDatabase(e)).toPromise()}static v(){if(!uf())return!1;if(dn.F())return!0;const e=Se(),t=dn.M(e),r=0<t&&t<10,s=cp(e),i=0<s&&s<4.5;return!(e.indexOf("MSIE ")>0||e.indexOf("Trident/")>0||e.indexOf("Edge/")>0||r||i)}static F(){return typeof process<"u"&&process.__PRIVATE_env?.__PRIVATE_USE_MOCK_PERSISTENCE==="YES"}static O(e,t){return e.store(t)}static M(e){const t=e.match(/i(?:phone|pad|pod) os ([\d_]+)/i),r=t?t[1].split("_").slice(0,2).join("."):"-1";return Number(r)}constructor(e,t,r){this.name=e,this.version=t,this.N=r,this.B=null,dn.M(Se())===12.2&&Ke("Firestore persistence suffers from a bug in iOS 12.2 Safari that may cause your app to stop working. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.")}async L(e){return this.db||(k(nt,"Opening database:",this.name),this.db=await new Promise(((t,r)=>{const s=indexedDB.open(this.name,this.version);s.onsuccess=i=>{const o=i.target.result;t(o)},s.onblocked=()=>{r(new Ns(e,"Cannot upgrade IndexedDB schema while another tab is open. Close all tabs that access Firestore and reload this page to proceed."))},s.onerror=i=>{const o=i.target.error;o.name==="VersionError"?r(new x(C.FAILED_PRECONDITION,"A newer version of the Firestore SDK was previously used and so the persisted data is not compatible with the version of the SDK you are now using. The SDK will operate with persistence disabled. If you need persistence, please re-upgrade to a newer version of the SDK or else clear the persisted IndexedDB data for your app to start fresh.")):o.name==="InvalidStateError"?r(new x(C.FAILED_PRECONDITION,"Unable to open an IndexedDB connection. This could be due to running in a private browsing session on a browser whose private browsing sessions do not support IndexedDB: "+o)):r(new Ns(e,o))},s.onupgradeneeded=i=>{k(nt,'Database "'+this.name+'" requires upgrade from version:',i.oldVersion);const o=i.target.result;this.N.k(o,s.transaction,i.oldVersion,this.version).next((()=>{k(nt,"Database upgrade to version "+this.version+" complete")}))}}))),this.q&&(this.db.onversionchange=t=>this.q(t)),this.db}$(e){this.q=e,this.db&&(this.db.onversionchange=t=>e(t))}async runTransaction(e,t,r,s){const i=t==="readonly";let o=0;for(;;){++o;try{this.db=await this.L(e);const c=Mo.open(this.db,e,i?"readonly":"readwrite",r),l=s(c).next((h=>(c.C(),h))).catch((h=>(c.abort(h),T.reject(h)))).toPromise();return l.catch((()=>{})),await c.D,l}catch(c){const l=c,h=l.name!=="FirebaseError"&&o<3;if(k(nt,"Transaction failed with error:",l.message,"Retrying:",h),this.close(),!h)return Promise.reject(l)}}}close(){this.db&&this.db.close(),this.db=void 0}}function cp(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}class lI{constructor(e){this.U=e,this.K=!1,this.W=null}get isDone(){return this.K}get G(){return this.W}set cursor(e){this.U=e}done(){this.K=!0}j(e){this.W=e}delete(){return kn(this.U.delete())}}class Ns extends x{constructor(e,t){super(C.UNAVAILABLE,`IndexedDB transaction '${e}' failed: ${t}`),this.name="IndexedDbTransactionError"}}function vn(n){return n.name==="IndexedDbTransactionError"}class uI{constructor(e){this.store=e}put(e,t){let r;return t!==void 0?(k(nt,"PUT",this.store.name,e,t),r=this.store.put(t,e)):(k(nt,"PUT",this.store.name,"<auto-key>",e),r=this.store.put(e)),kn(r)}add(e){return k(nt,"ADD",this.store.name,e,e),kn(this.store.add(e))}get(e){return kn(this.store.get(e)).next((t=>(t===void 0&&(t=null),k(nt,"GET",this.store.name,e,t),t)))}delete(e){return k(nt,"DELETE",this.store.name,e),kn(this.store.delete(e))}count(){return k(nt,"COUNT",this.store.name),kn(this.store.count())}J(e,t){const r=this.options(e,t),s=r.index?this.store.index(r.index):this.store;if(typeof s.getAll=="function"){const i=s.getAll(r.range);return new T(((o,c)=>{i.onerror=l=>{c(l.target.error)},i.onsuccess=l=>{o(l.target.result)}}))}{const i=this.cursor(r),o=[];return this.H(i,((c,l)=>{o.push(l)})).next((()=>o))}}Y(e,t){const r=this.store.getAll(e,t===null?void 0:t);return new T(((s,i)=>{r.onerror=o=>{i(o.target.error)},r.onsuccess=o=>{s(o.target.result)}}))}Z(e,t){k(nt,"DELETE ALL",this.store.name);const r=this.options(e,t);r.X=!1;const s=this.cursor(r);return this.H(s,((i,o,c)=>c.delete()))}ee(e,t){let r;t?r=e:(r={},t=e);const s=this.cursor(r);return this.H(s,t)}te(e){const t=this.cursor({});return new T(((r,s)=>{t.onerror=i=>{const o=Qc(i.target.error);s(o)},t.onsuccess=i=>{const o=i.target.result;o?e(o.primaryKey,o.value).next((c=>{c?o.continue():r()})):r()}}))}H(e,t){const r=[];return new T(((s,i)=>{e.onerror=o=>{i(o.target.error)},e.onsuccess=o=>{const c=o.target.result;if(!c)return void s();const l=new lI(c),h=t(c.primaryKey,c.value,l);if(h instanceof T){const f=h.catch((p=>(l.done(),T.reject(p))));r.push(f)}l.isDone?s():l.G===null?c.continue():c.continue(l.G)}})).next((()=>T.waitFor(r)))}options(e,t){let r;return e!==void 0&&(typeof e=="string"?r=e:t=e),{index:r,range:t}}cursor(e){let t="next";if(e.reverse&&(t="prev"),e.index){const r=this.store.index(e.index);return e.X?r.openKeyCursor(e.range,t):r.openCursor(e.range,t)}return this.store.openCursor(e.range,t)}}function kn(n){return new T(((e,t)=>{n.onsuccess=r=>{const s=r.target.result;e(s)},n.onerror=r=>{const s=Qc(r.target.error);t(s)}}))}let wh=!1;function Qc(n){const e=dn.M(Se());if(e>=12.2&&e<13){const t="An internal error was encountered in the Indexed Database server";if(n.message.indexOf(t)>=0){const r=new x("internal",`IOS_INDEXEDDB_BUG1: IndexedDb has thrown '${t}'. This is likely due to an unavoidable bug in iOS. See https://stackoverflow.com/q/56496296/110915 for details and a potential workaround.`);return wh||(wh=!0,setTimeout((()=>{throw r}),0)),r}}return n}const ks="IndexBackfiller";class hI{constructor(e,t){this.asyncQueue=e,this.ne=t,this.task=null}start(){this.re(15e3)}stop(){this.task&&(this.task.cancel(),this.task=null)}get started(){return this.task!==null}re(e){k(ks,`Scheduled in ${e}ms`),this.task=this.asyncQueue.enqueueAfterDelay("index_backfill",e,(async()=>{this.task=null;try{const t=await this.ne.ie();k(ks,`Documents written: ${t}`)}catch(t){vn(t)?k(ks,"Ignoring IndexedDB error during index backfill: ",t):await er(t)}await this.re(6e4)}))}}class dI{constructor(e,t){this.localStore=e,this.persistence=t}async ie(e=50){return this.persistence.runTransaction("Backfill Indexes","readwrite-primary",(t=>this.se(t,e)))}se(e,t){const r=new Set;let s=t,i=!0;return T.doWhile((()=>i===!0&&s>0),(()=>this.localStore.indexManager.getNextCollectionGroupToUpdate(e).next((o=>{if(o!==null&&!r.has(o))return k(ks,`Processing collection: ${o}`),this.oe(e,o,s).next((c=>{s-=c,r.add(o)}));i=!1})))).next((()=>t-s))}oe(e,t,r){return this.localStore.indexManager.getMinOffsetFromCollectionGroup(e,t).next((s=>this.localStore.localDocuments.getNextDocuments(e,t,s,r).next((i=>{const o=i.changes;return this.localStore.indexManager.updateIndexEntries(e,o).next((()=>this._e(s,i))).next((c=>(k(ks,`Updating offset: ${c}`),this.localStore.indexManager.updateCollectionGroup(e,t,c)))).next((()=>o.size))}))))}_e(e,t){let r=e;return t.changes.forEach(((s,i)=>{const o=ip(i);Wc(o,r)>0&&(r=o)})),new st(r.readTime,r.documentKey,Math.max(t.batchId,e.largestBatchId))}}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class at{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ae(r),this.ue=r=>t.writeSequenceNumber(r))}ae(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.ue&&this.ue(e),e}}at.ce=-1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fn=-1;function Fo(n){return n==null}function Ks(n){return n===0&&1/n==-1/0}function fI(n){return typeof n=="number"&&Number.isInteger(n)&&!Ks(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const po="";function $e(n){let e="";for(let t=0;t<n.length;t++)e.length>0&&(e=bh(e)),e=pI(n.get(t),e);return bh(e)}function pI(n,e){let t=e;const r=n.length;for(let s=0;s<r;s++){const i=n.charAt(s);switch(i){case"\0":t+="";break;case po:t+="";break;default:t+=i}}return t}function bh(n){return n+po+""}function Et(n){const e=n.length;if(G(e>=2,64408,{path:n}),e===2)return G(n.charAt(0)===po&&n.charAt(1)==="",56145,{path:n}),se.emptyPath();const t=e-2,r=[];let s="";for(let i=0;i<e;){const o=n.indexOf(po,i);switch((o<0||o>t)&&B(50515,{path:n}),n.charAt(o+1)){case"":const c=n.substring(i,o);let l;s.length===0?l=c:(s+=c,l=s,s=""),r.push(l);break;case"":s+=n.substring(i,o),s+="\0";break;case"":s+=n.substring(i,o+1);break;default:B(61167,{path:n})}i=o+2}return new se(r)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vn="remoteDocuments",li="owner",cr="owner",Ws="mutationQueues",mI="userId",ut="mutations",Th="batchId",Mn="userMutationsIndex",Ah=["userId","batchId"];/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wi(n,e){return[n,$e(e)]}function lp(n,e,t){return[n,$e(e),t]}const gI={},kr="documentMutations",mo="remoteDocumentsV14",_I=["prefixPath","collectionGroup","readTime","documentId"],Qi="documentKeyIndex",yI=["prefixPath","collectionGroup","documentId"],up="collectionGroupIndex",vI=["collectionGroup","readTime","prefixPath","documentId"],Qs="remoteDocumentGlobal",sc="remoteDocumentGlobalKey",xr="targets",hp="queryTargetsIndex",EI=["canonicalId","targetId"],Or="targetDocuments",II=["targetId","path"],Yc="documentTargetsIndex",wI=["path","targetId"],go="targetGlobalKey",Un="targetGlobal",Ys="collectionParents",bI=["collectionId","parent"],Lr="clientMetadata",TI="clientId",Uo="bundles",AI="bundleId",Bo="namedQueries",SI="name",Jc="indexConfiguration",PI="indexId",ic="collectionGroupIndex",RI="collectionGroup",xs="indexState",CI=["indexId","uid"],dp="sequenceNumberIndex",DI=["uid","sequenceNumber"],Os="indexEntries",VI=["indexId","uid","arrayValue","directionalValue","orderedDocumentKey","documentKey"],fp="documentKeyIndex",NI=["indexId","uid","orderedDocumentKey"],$o="documentOverlays",kI=["userId","collectionPath","documentId"],oc="collectionPathOverlayIndex",xI=["userId","collectionPath","largestBatchId"],pp="collectionGroupOverlayIndex",OI=["userId","collectionGroup","largestBatchId"],Xc="globals",LI="name",mp=[Ws,ut,kr,Vn,xr,li,Un,Or,Lr,Qs,Ys,Uo,Bo],MI=[...mp,$o],gp=[Ws,ut,kr,mo,xr,li,Un,Or,Lr,Qs,Ys,Uo,Bo,$o],_p=gp,Zc=[..._p,Jc,xs,Os],FI=Zc,yp=[...Zc,Xc],UI=yp;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ac extends ap{constructor(e,t){super(),this.le=e,this.currentSequenceNumber=t}}function Pe(n,e){const t=Y(n);return dn.O(t.le,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sh(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function En(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function vp(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pe{constructor(e,t){this.comparator=e,this.root=t||Ne.EMPTY}insert(e,t){return new pe(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,Ne.BLACK,null,null))}remove(e){return new pe(this.comparator,this.root.remove(e,this.comparator).copy(null,null,Ne.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal(((t,r)=>(e(t,r),!1)))}toString(){const e=[];return this.inorderTraversal(((t,r)=>(e.push(`${t}:${r}`),!1))),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new xi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new xi(this.root,e,this.comparator,!1)}getReverseIterator(){return new xi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new xi(this.root,e,this.comparator,!0)}}class xi{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!e.isEmpty();)if(i=t?r(e.key,t):1,t&&s&&(i*=-1),i<0)e=this.isReverse?e.left:e.right;else{if(i===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class Ne{constructor(e,t,r,s,i){this.key=e,this.value=t,this.color=r??Ne.RED,this.left=s??Ne.EMPTY,this.right=i??Ne.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,i){return new Ne(e??this.key,t??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const i=r(e,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(e,t,r),null):i===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return Ne.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return Ne.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Ne.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Ne.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed())throw B(43730,{key:this.key,value:this.value});if(this.right.isRed())throw B(14113,{key:this.key,value:this.value});const e=this.left.check();if(e!==this.right.check())throw B(27949);return e+(this.isRed()?0:1)}}Ne.EMPTY=null,Ne.RED=!0,Ne.BLACK=!1;Ne.EMPTY=new class{constructor(){this.size=0}get key(){throw B(57766)}get value(){throw B(16141)}get color(){throw B(16727)}get left(){throw B(29726)}get right(){throw B(36894)}copy(e,t,r,s,i){return this}insert(e,t,r){return new Ne(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ce{constructor(e){this.comparator=e,this.data=new pe(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal(((t,r)=>(e(t),!1)))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new Ph(this.data.getIterator())}getIteratorFrom(e){return new Ph(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach((r=>{t=t.add(r)})),t}isEqual(e){if(!(e instanceof ce)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const e=[];return this.forEach((t=>{e.push(t)})),e}toString(){const e=[];return this.forEach((t=>e.push(t))),"SortedSet("+e.toString()+")"}copy(e){const t=new ce(this.comparator);return t.data=e,t}}class Ph{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}function lr(n){return n.hasNext()?n.getNext():void 0}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Je{constructor(e){this.fields=e,e.sort(ge.comparator)}static empty(){return new Je([])}unionWith(e){let t=new ce(ge.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Je(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return Nr(this.fields,e.fields,((t,r)=>t.isEqual(r)))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ep extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Te{constructor(e){this.binaryString=e}static fromBase64String(e){const t=(function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Ep("Invalid base64 string: "+i):i}})(e);return new Te(t)}static fromUint8Array(e){const t=(function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i})(e);return new Te(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return(function(t){return btoa(t)})(this.binaryString)}toUint8Array(){return(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return Q(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Te.EMPTY_BYTE_STRING=new Te("");const BI=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function Ft(n){if(G(!!n,39018),typeof n=="string"){let e=0;const t=BI.exec(n);if(G(!!t,46558,{timestamp:n}),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:fe(n.seconds),nanos:fe(n.nanos)}}function fe(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Ut(n){return typeof n=="string"?Te.fromBase64String(n):Te.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ip="server_timestamp",wp="__type__",bp="__previous_value__",Tp="__local_write_time__";function el(n){return(n?.mapValue?.fields||{})[wp]?.stringValue===Ip}function qo(n){const e=n.mapValue.fields[bp];return el(e)?qo(e):e}function Js(n){const e=Ft(n.mapValue.fields[Tp].timestampValue);return new oe(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $I{constructor(e,t,r,s,i,o,c,l,h,f){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=c,this.longPollingOptions=l,this.useFetchStreams=h,this.isUsingEmulator=f}}const _o="(default)";class Kn{constructor(e,t){this.projectId=e,this.database=t||_o}static empty(){return new Kn("","")}get isDefaultDatabase(){return this.database===_o}isEqual(e){return e instanceof Kn&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tl="__type__",Ap="__max__",on={mapValue:{fields:{__type__:{stringValue:Ap}}}},nl="__vector__",Mr="value",Yi={nullValue:"NULL_VALUE"};function pn(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?el(n)?4:Sp(n)?9007199254740991:zo(n)?10:11:B(28295,{value:n})}function Ct(n,e){if(n===e)return!0;const t=pn(n);if(t!==pn(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return Js(n).isEqual(Js(e));case 3:return(function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=Ft(s.timestampValue),c=Ft(i.timestampValue);return o.seconds===c.seconds&&o.nanos===c.nanos})(n,e);case 5:return n.stringValue===e.stringValue;case 6:return(function(s,i){return Ut(s.bytesValue).isEqual(Ut(i.bytesValue))})(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return(function(s,i){return fe(s.geoPointValue.latitude)===fe(i.geoPointValue.latitude)&&fe(s.geoPointValue.longitude)===fe(i.geoPointValue.longitude)})(n,e);case 2:return(function(s,i){if("integerValue"in s&&"integerValue"in i)return fe(s.integerValue)===fe(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=fe(s.doubleValue),c=fe(i.doubleValue);return o===c?Ks(o)===Ks(c):isNaN(o)&&isNaN(c)}return!1})(n,e);case 9:return Nr(n.arrayValue.values||[],e.arrayValue.values||[],Ct);case 10:case 11:return(function(s,i){const o=s.mapValue.fields||{},c=i.mapValue.fields||{};if(Sh(o)!==Sh(c))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(c[l]===void 0||!Ct(o[l],c[l])))return!1;return!0})(n,e);default:return B(52216,{left:n})}}function Xs(n,e){return(n.values||[]).find((t=>Ct(t,e)))!==void 0}function mn(n,e){if(n===e)return 0;const t=pn(n),r=pn(e);if(t!==r)return Q(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return Q(n.booleanValue,e.booleanValue);case 2:return(function(i,o){const c=fe(i.integerValue||i.doubleValue),l=fe(o.integerValue||o.doubleValue);return c<l?-1:c>l?1:c===l?0:isNaN(c)?isNaN(l)?0:-1:1})(n,e);case 3:return Rh(n.timestampValue,e.timestampValue);case 4:return Rh(Js(n),Js(e));case 5:return nc(n.stringValue,e.stringValue);case 6:return(function(i,o){const c=Ut(i),l=Ut(o);return c.compareTo(l)})(n.bytesValue,e.bytesValue);case 7:return(function(i,o){const c=i.split("/"),l=o.split("/");for(let h=0;h<c.length&&h<l.length;h++){const f=Q(c[h],l[h]);if(f!==0)return f}return Q(c.length,l.length)})(n.referenceValue,e.referenceValue);case 8:return(function(i,o){const c=Q(fe(i.latitude),fe(o.latitude));return c!==0?c:Q(fe(i.longitude),fe(o.longitude))})(n.geoPointValue,e.geoPointValue);case 9:return Ch(n.arrayValue,e.arrayValue);case 10:return(function(i,o){const c=i.fields||{},l=o.fields||{},h=c[Mr]?.arrayValue,f=l[Mr]?.arrayValue,p=Q(h?.values?.length||0,f?.values?.length||0);return p!==0?p:Ch(h,f)})(n.mapValue,e.mapValue);case 11:return(function(i,o){if(i===on.mapValue&&o===on.mapValue)return 0;if(i===on.mapValue)return 1;if(o===on.mapValue)return-1;const c=i.fields||{},l=Object.keys(c),h=o.fields||{},f=Object.keys(h);l.sort(),f.sort();for(let p=0;p<l.length&&p<f.length;++p){const g=nc(l[p],f[p]);if(g!==0)return g;const w=mn(c[l[p]],h[f[p]]);if(w!==0)return w}return Q(l.length,f.length)})(n.mapValue,e.mapValue);default:throw B(23264,{he:t})}}function Rh(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return Q(n,e);const t=Ft(n),r=Ft(e),s=Q(t.seconds,r.seconds);return s!==0?s:Q(t.nanos,r.nanos)}function Ch(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const i=mn(t[s],r[s]);if(i)return i}return Q(t.length,r.length)}function Fr(n){return cc(n)}function cc(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?(function(t){const r=Ft(t);return`time(${r.seconds},${r.nanos})`})(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?(function(t){return Ut(t).toBase64()})(n.bytesValue):"referenceValue"in n?(function(t){return L.fromName(t).toString()})(n.referenceValue):"geoPointValue"in n?(function(t){return`geo(${t.latitude},${t.longitude})`})(n.geoPointValue):"arrayValue"in n?(function(t){let r="[",s=!0;for(const i of t.values||[])s?s=!1:r+=",",r+=cc(i);return r+"]"})(n.arrayValue):"mapValue"in n?(function(t){const r=Object.keys(t.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${cc(t.fields[o])}`;return s+"}"})(n.mapValue):B(61005,{value:n})}function Ji(n){switch(pn(n)){case 0:case 1:return 4;case 2:return 8;case 3:case 8:return 16;case 4:const e=qo(n);return e?16+Ji(e):16;case 5:return 2*n.stringValue.length;case 6:return Ut(n.bytesValue).approximateByteSize();case 7:return n.referenceValue.length;case 9:return(function(r){return(r.values||[]).reduce(((s,i)=>s+Ji(i)),0)})(n.arrayValue);case 10:case 11:return(function(r){let s=0;return En(r.fields,((i,o)=>{s+=i.length+Ji(o)})),s})(n.mapValue);default:throw B(13486,{value:n})}}function Zs(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function lc(n){return!!n&&"integerValue"in n}function ei(n){return!!n&&"arrayValue"in n}function Dh(n){return!!n&&"nullValue"in n}function Vh(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Xi(n){return!!n&&"mapValue"in n}function zo(n){return(n?.mapValue?.fields||{})[tl]?.stringValue===nl}function Ls(n){if(n.geoPointValue)return{geoPointValue:{...n.geoPointValue}};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:{...n.timestampValue}};if(n.mapValue){const e={mapValue:{fields:{}}};return En(n.mapValue.fields,((t,r)=>e.mapValue.fields[t]=Ls(r))),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Ls(n.arrayValue.values[t]);return e}return{...n}}function Sp(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue===Ap}const Pp={mapValue:{fields:{[tl]:{stringValue:nl},[Mr]:{arrayValue:{}}}}};function qI(n){return"nullValue"in n?Yi:"booleanValue"in n?{booleanValue:!1}:"integerValue"in n||"doubleValue"in n?{doubleValue:NaN}:"timestampValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"stringValue"in n?{stringValue:""}:"bytesValue"in n?{bytesValue:""}:"referenceValue"in n?Zs(Kn.empty(),L.empty()):"geoPointValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"arrayValue"in n?{arrayValue:{}}:"mapValue"in n?zo(n)?Pp:{mapValue:{}}:B(35942,{value:n})}function zI(n){return"nullValue"in n?{booleanValue:!1}:"booleanValue"in n?{doubleValue:NaN}:"integerValue"in n||"doubleValue"in n?{timestampValue:{seconds:Number.MIN_SAFE_INTEGER}}:"timestampValue"in n?{stringValue:""}:"stringValue"in n?{bytesValue:""}:"bytesValue"in n?Zs(Kn.empty(),L.empty()):"referenceValue"in n?{geoPointValue:{latitude:-90,longitude:-180}}:"geoPointValue"in n?{arrayValue:{}}:"arrayValue"in n?Pp:"mapValue"in n?zo(n)?{mapValue:{}}:on:B(61959,{value:n})}function Nh(n,e){const t=mn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?-1:!n.inclusive&&e.inclusive?1:0}function kh(n,e){const t=mn(n.value,e.value);return t!==0?t:n.inclusive&&!e.inclusive?1:!n.inclusive&&e.inclusive?-1:0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.value=e}static empty(){return new Ue({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Xi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Ls(t)}setAll(e){let t=ge.emptyPath(),r={},s=[];e.forEach(((o,c)=>{if(!t.isImmediateParentOf(c)){const l=this.getFieldsMap(t);this.applyChanges(l,r,s),r={},s=[],t=c.popLast()}o?r[c.lastSegment()]=Ls(o):s.push(c.lastSegment())}));const i=this.getFieldsMap(t);this.applyChanges(i,r,s)}delete(e){const t=this.field(e.popLast());Xi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return Ct(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Xi(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){En(t,((s,i)=>e[s]=i));for(const s of r)delete e[s]}clone(){return new Ue(Ls(this.value))}}function Rp(n){const e=[];return En(n.fields,((t,r)=>{const s=new ge([t]);if(Xi(r)){const i=Rp(r.mapValue).fields;if(i.length===0)e.push(s);else for(const o of i)e.push(s.child(o))}else e.push(s)})),new Je(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ve{constructor(e,t,r,s,i,o,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=c}static newInvalidDocument(e){return new ve(e,0,H.min(),H.min(),H.min(),Ue.empty(),0)}static newFoundDocument(e,t,r,s){return new ve(e,1,t,H.min(),r,s,0)}static newNoDocument(e,t){return new ve(e,2,t,H.min(),H.min(),Ue.empty(),0)}static newUnknownDocument(e,t){return new ve(e,3,t,H.min(),H.min(),Ue.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(H.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ue.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ue.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=H.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof ve&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new ve(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ur{constructor(e,t){this.position=e,this.inclusive=t}}function xh(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const i=e[s],o=n.position[s];if(i.field.isKeyField()?r=L.comparator(L.fromName(o.referenceValue),t.key):r=mn(o,t.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function Oh(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!Ct(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yo{constructor(e,t="asc"){this.field=e,this.dir=t}}function jI(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cp{}class ee extends Cp{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new GI(e,t,r):t==="array-contains"?new WI(e,r):t==="in"?new Op(e,r):t==="not-in"?new QI(e,r):t==="array-contains-any"?new YI(e,r):new ee(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new HI(e,r):new KI(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&t.nullValue===void 0&&this.matchesComparison(mn(t,this.value)):t!==null&&pn(this.value)===pn(t)&&this.matchesComparison(mn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B(47266,{operator:this.op})}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class ae extends Cp{constructor(e,t){super(),this.filters=e,this.op=t,this.Pe=null}static create(e,t){return new ae(e,t)}matches(e){return Br(this)?this.filters.find((t=>!t.matches(e)))===void 0:this.filters.find((t=>t.matches(e)))!==void 0}getFlattenedFilters(){return this.Pe!==null||(this.Pe=this.filters.reduce(((e,t)=>e.concat(t.getFlattenedFilters())),[])),this.Pe}getFilters(){return Object.assign([],this.filters)}}function Br(n){return n.op==="and"}function uc(n){return n.op==="or"}function rl(n){return Dp(n)&&Br(n)}function Dp(n){for(const e of n.filters)if(e instanceof ae)return!1;return!0}function hc(n){if(n instanceof ee)return n.field.canonicalString()+n.op.toString()+Fr(n.value);if(rl(n))return n.filters.map((e=>hc(e))).join(",");{const e=n.filters.map((t=>hc(t))).join(",");return`${n.op}(${e})`}}function Vp(n,e){return n instanceof ee?(function(r,s){return s instanceof ee&&r.op===s.op&&r.field.isEqual(s.field)&&Ct(r.value,s.value)})(n,e):n instanceof ae?(function(r,s){return s instanceof ae&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce(((i,o,c)=>i&&Vp(o,s.filters[c])),!0):!1})(n,e):void B(19439)}function Np(n,e){const t=n.filters.concat(e);return ae.create(t,n.op)}function kp(n){return n instanceof ee?(function(t){return`${t.field.canonicalString()} ${t.op} ${Fr(t.value)}`})(n):n instanceof ae?(function(t){return t.op.toString()+" {"+t.getFilters().map(kp).join(" ,")+"}"})(n):"Filter"}class GI extends ee{constructor(e,t,r){super(e,t,r),this.key=L.fromName(r.referenceValue)}matches(e){const t=L.comparator(e.key,this.key);return this.matchesComparison(t)}}class HI extends ee{constructor(e,t){super(e,"in",t),this.keys=xp("in",t)}matches(e){return this.keys.some((t=>t.isEqual(e.key)))}}class KI extends ee{constructor(e,t){super(e,"not-in",t),this.keys=xp("not-in",t)}matches(e){return!this.keys.some((t=>t.isEqual(e.key)))}}function xp(n,e){return(e.arrayValue?.values||[]).map((t=>L.fromName(t.referenceValue)))}class WI extends ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return ei(t)&&Xs(t.arrayValue,this.value)}}class Op extends ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&Xs(this.value.arrayValue,t)}}class QI extends ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(Xs(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&t.nullValue===void 0&&!Xs(this.value.arrayValue,t)}}class YI extends ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!ei(t)||!t.arrayValue.values)&&t.arrayValue.values.some((r=>Xs(this.value.arrayValue,r)))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class JI{constructor(e,t=null,r=[],s=[],i=null,o=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=c,this.Te=null}}function dc(n,e=null,t=[],r=[],s=null,i=null,o=null){return new JI(n,e,t,r,s,i,o)}function Wn(n){const e=Y(n);if(e.Te===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map((r=>hc(r))).join(","),t+="|ob:",t+=e.orderBy.map((r=>(function(i){return i.field.canonicalString()+i.dir})(r))).join(","),Fo(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map((r=>Fr(r))).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map((r=>Fr(r))).join(",")),e.Te=t}return e.Te}function ui(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!jI(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Vp(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!Oh(n.startAt,e.startAt)&&Oh(n.endAt,e.endAt)}function vo(n){return L.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}function Eo(n,e){return n.filters.filter((t=>t instanceof ee&&t.field.isEqual(e)))}function Lh(n,e,t){let r=Yi,s=!0;for(const i of Eo(n,e)){let o=Yi,c=!0;switch(i.op){case"<":case"<=":o=qI(i.value);break;case"==":case"in":case">=":o=i.value;break;case">":o=i.value,c=!1;break;case"!=":case"not-in":o=Yi}Nh({value:r,inclusive:s},{value:o,inclusive:c})<0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];Nh({value:r,inclusive:s},{value:o,inclusive:t.inclusive})<0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}function Mh(n,e,t){let r=on,s=!0;for(const i of Eo(n,e)){let o=on,c=!0;switch(i.op){case">=":case">":o=zI(i.value),c=!1;break;case"==":case"in":case"<=":o=i.value;break;case"<":o=i.value,c=!1;break;case"!=":case"not-in":o=on}kh({value:r,inclusive:s},{value:o,inclusive:c})>0&&(r=o,s=c)}if(t!==null){for(let i=0;i<n.orderBy.length;++i)if(n.orderBy[i].field.isEqual(e)){const o=t.position[i];kh({value:r,inclusive:s},{value:o,inclusive:t.inclusive})>0&&(r=o,s=t.inclusive);break}}return{value:r,inclusive:s}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e,t=null,r=[],s=[],i=null,o="F",c=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=c,this.endAt=l,this.Ie=null,this.Ee=null,this.de=null,this.startAt,this.endAt}}function XI(n,e,t,r,s,i,o,c){return new hi(n,e,t,r,s,i,o,c)}function jo(n){return new hi(n)}function Fh(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Lp(n){return n.collectionGroup!==null}function Ms(n){const e=Y(n);if(e.Ie===null){e.Ie=[];const t=new Set;for(const i of e.explicitOrderBy)e.Ie.push(i),t.add(i.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let c=new ce(ge.comparator);return o.filters.forEach((l=>{l.getFlattenedFilters().forEach((h=>{h.isInequality()&&(c=c.add(h.field))}))})),c})(e).forEach((i=>{t.has(i.canonicalString())||i.isKeyField()||e.Ie.push(new yo(i,r))})),t.has(ge.keyField().canonicalString())||e.Ie.push(new yo(ge.keyField(),r))}return e.Ie}function ct(n){const e=Y(n);return e.Ee||(e.Ee=ZI(e,Ms(n))),e.Ee}function ZI(n,e){if(n.limitType==="F")return dc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map((s=>{const i=s.dir==="desc"?"asc":"desc";return new yo(s.field,i)}));const t=n.endAt?new Ur(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new Ur(n.startAt.position,n.startAt.inclusive):null;return dc(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function fc(n,e){const t=n.filters.concat([e]);return new hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function pc(n,e,t){return new hi(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Go(n,e){return ui(ct(n),ct(e))&&n.limitType===e.limitType}function Mp(n){return`${Wn(ct(n))}|lt:${n.limitType}`}function gr(n){return`Query(target=${(function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map((s=>kp(s))).join(", ")}]`),Fo(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map((s=>(function(o){return`${o.field.canonicalString()} (${o.dir})`})(s))).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map((s=>Fr(s))).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map((s=>Fr(s))).join(",")),`Target(${r})`})(ct(n))}; limitType=${n.limitType})`}function di(n,e){return e.isFoundDocument()&&(function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):L.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)})(n,e)&&(function(r,s){for(const i of Ms(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0})(n,e)&&(function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0})(n,e)&&(function(r,s){return!(r.startAt&&!(function(o,c,l){const h=xh(o,c,l);return o.inclusive?h<=0:h<0})(r.startAt,Ms(r),s)||r.endAt&&!(function(o,c,l){const h=xh(o,c,l);return o.inclusive?h>=0:h>0})(r.endAt,Ms(r),s))})(n,e)}function ew(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Fp(n){return(e,t)=>{let r=!1;for(const s of Ms(n)){const i=tw(s,e,t);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function tw(n,e,t){const r=n.field.isKeyField()?L.comparator(e.key,t.key):(function(i,o,c){const l=o.data.field(i),h=c.data.field(i);return l!==null&&h!==null?mn(l,h):B(42886)})(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B(19790,{direction:n.dir})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qt{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,e))return i}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return void(s[i]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){En(this.inner,((t,r)=>{for(const[s,i]of r)e(s,i)}))}isEmpty(){return vp(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nw=new pe(L.comparator);function rt(){return nw}const Up=new pe(L.comparator);function Ss(...n){let e=Up;for(const t of n)e=e.insert(t.key,t);return e}function Bp(n){let e=Up;return n.forEach(((t,r)=>e=e.insert(t,r.overlayedDocument))),e}function It(){return Fs()}function $p(){return Fs()}function Fs(){return new qt((n=>n.toString()),((n,e)=>n.isEqual(e)))}const rw=new pe(L.comparator),sw=new ce(L.comparator);function X(...n){let e=sw;for(const t of n)e=e.add(t);return e}const iw=new ce(Q);function ow(){return iw}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function sl(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Ks(e)?"-0":e}}function qp(n){return{integerValue:""+n}}function aw(n,e){return fI(e)?qp(e):sl(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(){this._=void 0}}function cw(n,e,t){return n instanceof $r?(function(s,i){const o={fields:{[wp]:{stringValue:Ip},[Tp]:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&el(i)&&(i=qo(i)),i&&(o.fields[bp]=i),{mapValue:o}})(t,e):n instanceof qr?jp(n,e):n instanceof zr?Gp(n,e):(function(s,i){const o=zp(s,i),c=Uh(o)+Uh(s.Ae);return lc(o)&&lc(s.Ae)?qp(c):sl(s.serializer,c)})(n,e)}function lw(n,e,t){return n instanceof qr?jp(n,e):n instanceof zr?Gp(n,e):t}function zp(n,e){return n instanceof ti?(function(r){return lc(r)||(function(i){return!!i&&"doubleValue"in i})(r)})(e)?e:{integerValue:0}:null}class $r extends Ho{}class qr extends Ho{constructor(e){super(),this.elements=e}}function jp(n,e){const t=Hp(e);for(const r of n.elements)t.some((s=>Ct(s,r)))||t.push(r);return{arrayValue:{values:t}}}class zr extends Ho{constructor(e){super(),this.elements=e}}function Gp(n,e){let t=Hp(e);for(const r of n.elements)t=t.filter((s=>!Ct(s,r)));return{arrayValue:{values:t}}}class ti extends Ho{constructor(e,t){super(),this.serializer=e,this.Ae=t}}function Uh(n){return fe(n.integerValue||n.doubleValue)}function Hp(n){return ei(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kp{constructor(e,t){this.field=e,this.transform=t}}function uw(n,e){return n.field.isEqual(e.field)&&(function(r,s){return r instanceof qr&&s instanceof qr||r instanceof zr&&s instanceof zr?Nr(r.elements,s.elements,Ct):r instanceof ti&&s instanceof ti?Ct(r.Ae,s.Ae):r instanceof $r&&s instanceof $r})(n.transform,e.transform)}class hw{constructor(e,t){this.version=e,this.transformResults=t}}class Be{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new Be}static exists(e){return new Be(void 0,e)}static updateTime(e){return new Be(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Zi(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class Ko{}function Wp(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new Wo(n.key,Be.none()):new Xr(n.key,n.data,Be.none());{const t=n.data,r=Ue.empty();let s=new ce(ge.comparator);for(let i of e.fields)if(!s.has(i)){let o=t.field(i);o===null&&i.length>1&&(i=i.popLast(),o=t.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new zt(n.key,r,new Je(s.toArray()),Be.none())}}function dw(n,e,t){n instanceof Xr?(function(s,i,o){const c=s.value.clone(),l=$h(s.fieldTransforms,i,o.transformResults);c.setAll(l),i.convertToFoundDocument(o.version,c).setHasCommittedMutations()})(n,e,t):n instanceof zt?(function(s,i,o){if(!Zi(s.precondition,i))return void i.convertToUnknownDocument(o.version);const c=$h(s.fieldTransforms,i,o.transformResults),l=i.data;l.setAll(Qp(s)),l.setAll(c),i.convertToFoundDocument(o.version,l).setHasCommittedMutations()})(n,e,t):(function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()})(0,e,t)}function Us(n,e,t,r){return n instanceof Xr?(function(i,o,c,l){if(!Zi(i.precondition,o))return c;const h=i.value.clone(),f=qh(i.fieldTransforms,l,o);return h.setAll(f),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),null})(n,e,t,r):n instanceof zt?(function(i,o,c,l){if(!Zi(i.precondition,o))return c;const h=qh(i.fieldTransforms,l,o),f=o.data;return f.setAll(Qp(i)),f.setAll(h),o.convertToFoundDocument(o.version,f).setHasLocalMutations(),c===null?null:c.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map((p=>p.field)))})(n,e,t,r):(function(i,o,c){return Zi(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):c})(n,e,t)}function fw(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),i=zp(r.transform,s||null);i!=null&&(t===null&&(t=Ue.empty()),t.set(r.field,i))}return t||null}function Bh(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!(function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&Nr(r,s,((i,o)=>uw(i,o)))})(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Xr extends Ko{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class zt extends Ko{constructor(e,t,r,s,i=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function Qp(n){const e=new Map;return n.fieldMask.fields.forEach((t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}})),e}function $h(n,e,t){const r=new Map;G(n.length===t.length,32656,{Re:t.length,Ve:n.length});for(let s=0;s<t.length;s++){const i=n[s],o=i.transform,c=e.data.field(i.field);r.set(i.field,lw(o,c,t[s]))}return r}function qh(n,e,t){const r=new Map;for(const s of n){const i=s.transform,o=t.data.field(s.field);r.set(s.field,cw(i,o,e))}return r}class Wo extends Ko{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class Yp extends Ko{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class il{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(e.key)&&dw(i,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Us(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Us(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=$p();return this.mutations.forEach((s=>{const i=e.get(s.key),o=i.overlayedDocument;let c=this.applyToLocalView(o,i.mutatedFields);c=t.has(s.key)?null:c;const l=Wp(o,c);l!==null&&r.set(s.key,l),o.isValidDocument()||o.convertToNoDocument(H.min())})),r}keys(){return this.mutations.reduce(((e,t)=>e.add(t.key)),X())}isEqual(e){return this.batchId===e.batchId&&Nr(this.mutations,e.mutations,((t,r)=>Bh(t,r)))&&Nr(this.baseMutations,e.baseMutations,((t,r)=>Bh(t,r)))}}class ol{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){G(e.mutations.length===r.length,58842,{me:e.mutations.length,fe:r.length});let s=(function(){return rw})();const i=e.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new ol(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class al{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pw{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var we,te;function mw(n){switch(n){case C.OK:return B(64938);case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0;default:return B(15467,{code:n})}}function Jp(n){if(n===void 0)return Ke("GRPC error has no .code"),C.UNKNOWN;switch(n){case we.OK:return C.OK;case we.CANCELLED:return C.CANCELLED;case we.UNKNOWN:return C.UNKNOWN;case we.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case we.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case we.INTERNAL:return C.INTERNAL;case we.UNAVAILABLE:return C.UNAVAILABLE;case we.UNAUTHENTICATED:return C.UNAUTHENTICATED;case we.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case we.NOT_FOUND:return C.NOT_FOUND;case we.ALREADY_EXISTS:return C.ALREADY_EXISTS;case we.PERMISSION_DENIED:return C.PERMISSION_DENIED;case we.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case we.ABORTED:return C.ABORTED;case we.OUT_OF_RANGE:return C.OUT_OF_RANGE;case we.UNIMPLEMENTED:return C.UNIMPLEMENTED;case we.DATA_LOSS:return C.DATA_LOSS;default:return B(39323,{code:n})}}(te=we||(we={}))[te.OK=0]="OK",te[te.CANCELLED=1]="CANCELLED",te[te.UNKNOWN=2]="UNKNOWN",te[te.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",te[te.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",te[te.NOT_FOUND=5]="NOT_FOUND",te[te.ALREADY_EXISTS=6]="ALREADY_EXISTS",te[te.PERMISSION_DENIED=7]="PERMISSION_DENIED",te[te.UNAUTHENTICATED=16]="UNAUTHENTICATED",te[te.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",te[te.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",te[te.ABORTED=10]="ABORTED",te[te.OUT_OF_RANGE=11]="OUT_OF_RANGE",te[te.UNIMPLEMENTED=12]="UNIMPLEMENTED",te[te.INTERNAL=13]="INTERNAL",te[te.UNAVAILABLE=14]="UNAVAILABLE",te[te.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function gw(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _w=new hn([4294967295,4294967295],0);function zh(n){const e=gw().encode(n),t=new Qf;return t.update(e),new Uint8Array(t.digest())}function jh(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),i=e.getUint32(12,!0);return[new hn([t,r],0),new hn([s,i],0)]}class cl{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new Ps(`Invalid padding: ${t}`);if(r<0)throw new Ps(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new Ps(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new Ps(`Invalid padding when bitmap length is 0: ${t}`);this.ge=8*e.length-t,this.pe=hn.fromNumber(this.ge)}ye(e,t,r){let s=e.add(t.multiply(hn.fromNumber(r)));return s.compare(_w)===1&&(s=new hn([s.getBits(0),s.getBits(1)],0)),s.modulo(this.pe).toNumber()}we(e){return!!(this.bitmap[Math.floor(e/8)]&1<<e%8)}mightContain(e){if(this.ge===0)return!1;const t=zh(e),[r,s]=jh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);if(!this.we(o))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,i=new Uint8Array(Math.ceil(e/8)),o=new cl(i,s,t);return r.forEach((c=>o.insert(c))),o}insert(e){if(this.ge===0)return;const t=zh(e),[r,s]=jh(t);for(let i=0;i<this.hashCount;i++){const o=this.ye(r,s,i);this.Se(o)}}Se(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class Ps extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qo{constructor(e,t,r,s,i){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,fi.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Qo(H.min(),s,new pe(Q),rt(),X())}}class fi{constructor(e,t,r,s,i){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new fi(r,t,X(),X(),X())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class eo{constructor(e,t,r,s){this.be=e,this.removedTargetIds=t,this.key=r,this.De=s}}class Xp{constructor(e,t){this.targetId=e,this.Ce=t}}class Zp{constructor(e,t,r=Te.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class Gh{constructor(){this.ve=0,this.Fe=Hh(),this.Me=Te.EMPTY_BYTE_STRING,this.xe=!1,this.Oe=!0}get current(){return this.xe}get resumeToken(){return this.Me}get Ne(){return this.ve!==0}get Be(){return this.Oe}Le(e){e.approximateByteSize()>0&&(this.Oe=!0,this.Me=e)}ke(){let e=X(),t=X(),r=X();return this.Fe.forEach(((s,i)=>{switch(i){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:B(38017,{changeType:i})}})),new fi(this.Me,this.xe,e,t,r)}qe(){this.Oe=!1,this.Fe=Hh()}Qe(e,t){this.Oe=!0,this.Fe=this.Fe.insert(e,t)}$e(e){this.Oe=!0,this.Fe=this.Fe.remove(e)}Ue(){this.ve+=1}Ke(){this.ve-=1,G(this.ve>=0,3241,{ve:this.ve})}We(){this.Oe=!0,this.xe=!0}}class yw{constructor(e){this.Ge=e,this.ze=new Map,this.je=rt(),this.Je=Oi(),this.He=Oi(),this.Ye=new pe(Q)}Ze(e){for(const t of e.be)e.De&&e.De.isFoundDocument()?this.Xe(t,e.De):this.et(t,e.key,e.De);for(const t of e.removedTargetIds)this.et(t,e.key,e.De)}tt(e){this.forEachTarget(e,(t=>{const r=this.nt(t);switch(e.state){case 0:this.rt(t)&&r.Le(e.resumeToken);break;case 1:r.Ke(),r.Ne||r.qe(),r.Le(e.resumeToken);break;case 2:r.Ke(),r.Ne||this.removeTarget(t);break;case 3:this.rt(t)&&(r.We(),r.Le(e.resumeToken));break;case 4:this.rt(t)&&(this.it(t),r.Le(e.resumeToken));break;default:B(56790,{state:e.state})}}))}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ze.forEach(((r,s)=>{this.rt(s)&&t(s)}))}st(e){const t=e.targetId,r=e.Ce.count,s=this.ot(t);if(s){const i=s.target;if(vo(i))if(r===0){const o=new L(i.path);this.et(t,o,ve.newNoDocument(o,H.min()))}else G(r===1,20013,{expectedCount:r});else{const o=this._t(t);if(o!==r){const c=this.ut(e),l=c?this.ct(c,e,o):1;if(l!==0){this.it(t);const h=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ye=this.Ye.insert(t,h)}}}}}ut(e){const t=e.Ce.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=t;let o,c;try{o=Ut(r).toUint8Array()}catch(l){if(l instanceof Ep)return js("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{c=new cl(o,s,i)}catch(l){return js(l instanceof Ps?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return c.ge===0?null:c}ct(e,t,r){return t.Ce.count===r-this.Pt(e,t.targetId)?0:2}Pt(e,t){const r=this.Ge.getRemoteKeysForTarget(t);let s=0;return r.forEach((i=>{const o=this.Ge.ht(),c=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;e.mightContain(c)||(this.et(t,i,null),s++)})),s}Tt(e){const t=new Map;this.ze.forEach(((i,o)=>{const c=this.ot(o);if(c){if(i.current&&vo(c.target)){const l=new L(c.target.path);this.It(l).has(o)||this.Et(o,l)||this.et(o,l,ve.newNoDocument(l,e))}i.Be&&(t.set(o,i.ke()),i.qe())}}));let r=X();this.He.forEach(((i,o)=>{let c=!0;o.forEachWhile((l=>{const h=this.ot(l);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)})),c&&(r=r.add(i))})),this.je.forEach(((i,o)=>o.setReadTime(e)));const s=new Qo(e,t,this.Ye,this.je,r);return this.je=rt(),this.Je=Oi(),this.He=Oi(),this.Ye=new pe(Q),s}Xe(e,t){if(!this.rt(e))return;const r=this.Et(e,t.key)?2:0;this.nt(e).Qe(t.key,r),this.je=this.je.insert(t.key,t),this.Je=this.Je.insert(t.key,this.It(t.key).add(e)),this.He=this.He.insert(t.key,this.dt(t.key).add(e))}et(e,t,r){if(!this.rt(e))return;const s=this.nt(e);this.Et(e,t)?s.Qe(t,1):s.$e(t),this.He=this.He.insert(t,this.dt(t).delete(e)),this.He=this.He.insert(t,this.dt(t).add(e)),r&&(this.je=this.je.insert(t,r))}removeTarget(e){this.ze.delete(e)}_t(e){const t=this.nt(e).ke();return this.Ge.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Ue(e){this.nt(e).Ue()}nt(e){let t=this.ze.get(e);return t||(t=new Gh,this.ze.set(e,t)),t}dt(e){let t=this.He.get(e);return t||(t=new ce(Q),this.He=this.He.insert(e,t)),t}It(e){let t=this.Je.get(e);return t||(t=new ce(Q),this.Je=this.Je.insert(e,t)),t}rt(e){const t=this.ot(e)!==null;return t||k("WatchChangeAggregator","Detected inactive target",e),t}ot(e){const t=this.ze.get(e);return t&&t.Ne?null:this.Ge.At(e)}it(e){this.ze.set(e,new Gh),this.Ge.getRemoteKeysForTarget(e).forEach((t=>{this.et(e,t,null)}))}Et(e,t){return this.Ge.getRemoteKeysForTarget(e).has(t)}}function Oi(){return new pe(L.comparator)}function Hh(){return new pe(L.comparator)}const vw={asc:"ASCENDING",desc:"DESCENDING"},Ew={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Iw={and:"AND",or:"OR"};class ww{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function mc(n,e){return n.useProto3Json||Fo(e)?e:{value:e}}function jr(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function em(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function bw(n,e){return jr(n,e.toTimestamp())}function We(n){return G(!!n,49232),H.fromTimestamp((function(t){const r=Ft(t);return new oe(r.seconds,r.nanos)})(n))}function ll(n,e){return gc(n,e).canonicalString()}function gc(n,e){const t=(function(s){return new se(["projects",s.projectId,"databases",s.database])})(n).child("documents");return e===void 0?t:t.child(e)}function tm(n){const e=se.fromString(n);return G(um(e),10190,{key:e.toString()}),e}function Io(n,e){return ll(n.databaseId,e.path)}function Bn(n,e){const t=tm(e);if(t.get(1)!==n.databaseId.projectId)throw new x(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new x(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new L(sm(t))}function nm(n,e){return ll(n.databaseId,e)}function rm(n){const e=tm(n);return e.length===4?se.emptyPath():sm(e)}function _c(n){return new se(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function sm(n){return G(n.length>4&&n.get(4)==="documents",29091,{key:n.toString()}),n.popFirst(5)}function Kh(n,e,t){return{name:Io(n,e),fields:t.value.mapValue.fields}}function Tw(n,e,t){const r=Bn(n,e.name),s=We(e.updateTime),i=e.createTime?We(e.createTime):H.min(),o=new Ue({mapValue:{fields:e.fields}}),c=ve.newFoundDocument(r,s,i,o);return t&&c.setHasCommittedMutations(),t?c.setHasCommittedMutations():c}function Aw(n,e){let t;if("targetChange"in e){e.targetChange;const r=(function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:B(39313,{state:h})})(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],i=(function(h,f){return h.useProto3Json?(G(f===void 0||typeof f=="string",58123),Te.fromBase64String(f||"")):(G(f===void 0||f instanceof Buffer||f instanceof Uint8Array,16193),Te.fromUint8Array(f||new Uint8Array))})(n,e.targetChange.resumeToken),o=e.targetChange.cause,c=o&&(function(h){const f=h.code===void 0?C.UNKNOWN:Jp(h.code);return new x(f,h.message||"")})(o);t=new Zp(r,s,i,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=Bn(n,r.document.name),i=We(r.document.updateTime),o=r.document.createTime?We(r.document.createTime):H.min(),c=new Ue({mapValue:{fields:r.document.fields}}),l=ve.newFoundDocument(s,i,o,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new eo(h,f,l.key,l)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=Bn(n,r.document),i=r.readTime?We(r.readTime):H.min(),o=ve.newNoDocument(s,i),c=r.removedTargetIds||[];t=new eo([],c,o.key,o)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=Bn(n,r.document),i=r.removedTargetIds||[];t=new eo([],i,s,null)}else{if(!("filter"in e))return B(11601,{Rt:e});{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new pw(s,i),c=r.targetId;t=new Xp(c,o)}}return t}function wo(n,e){let t;if(e instanceof Xr)t={update:Kh(n,e.key,e.value)};else if(e instanceof Wo)t={delete:Io(n,e.key)};else if(e instanceof zt)t={update:Kh(n,e.key,e.data),updateMask:Vw(e.fieldMask)};else{if(!(e instanceof Yp))return B(16599,{Vt:e.type});t={verify:Io(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map((r=>(function(i,o){const c=o.transform;if(c instanceof $r)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof qr)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof zr)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof ti)return{fieldPath:o.field.canonicalString(),increment:c.Ae};throw B(20930,{transform:o.transform})})(0,r)))),e.precondition.isNone||(t.currentDocument=(function(s,i){return i.updateTime!==void 0?{updateTime:bw(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:B(27497)})(n,e.precondition)),t}function yc(n,e){const t=e.currentDocument?(function(i){return i.updateTime!==void 0?Be.updateTime(We(i.updateTime)):i.exists!==void 0?Be.exists(i.exists):Be.none()})(e.currentDocument):Be.none(),r=e.updateTransforms?e.updateTransforms.map((s=>(function(o,c){let l=null;if("setToServerValue"in c)G(c.setToServerValue==="REQUEST_TIME",16630,{proto:c}),l=new $r;else if("appendMissingElements"in c){const f=c.appendMissingElements.values||[];l=new qr(f)}else if("removeAllFromArray"in c){const f=c.removeAllFromArray.values||[];l=new zr(f)}else"increment"in c?l=new ti(o,c.increment):B(16584,{proto:c});const h=ge.fromServerFormat(c.fieldPath);return new Kp(h,l)})(n,s))):[];if(e.update){e.update.name;const s=Bn(n,e.update.name),i=new Ue({mapValue:{fields:e.update.fields}});if(e.updateMask){const o=(function(l){const h=l.fieldPaths||[];return new Je(h.map((f=>ge.fromServerFormat(f))))})(e.updateMask);return new zt(s,i,o,t,r)}return new Xr(s,i,t,r)}if(e.delete){const s=Bn(n,e.delete);return new Wo(s,t)}if(e.verify){const s=Bn(n,e.verify);return new Yp(s,t)}return B(1463,{proto:e})}function Sw(n,e){return n&&n.length>0?(G(e!==void 0,14353),n.map((t=>(function(s,i){let o=s.updateTime?We(s.updateTime):We(i);return o.isEqual(H.min())&&(o=We(i)),new hw(o,s.transformResults||[])})(t,e)))):[]}function im(n,e){return{documents:[nm(n,e.path)]}}function om(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=nm(n,s);const i=(function(h){if(h.length!==0)return lm(ae.create(h,"and"))})(e.filters);i&&(t.structuredQuery.where=i);const o=(function(h){if(h.length!==0)return h.map((f=>(function(g){return{field:_r(g.field),direction:Rw(g.dir)}})(f)))})(e.orderBy);o&&(t.structuredQuery.orderBy=o);const c=mc(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=(function(h){return{before:h.inclusive,values:h.position}})(e.startAt)),e.endAt&&(t.structuredQuery.endAt=(function(h){return{before:!h.inclusive,values:h.position}})(e.endAt)),{ft:t,parent:s}}function am(n){let e=rm(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){G(r===1,65062);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let i=[];t.where&&(i=(function(p){const g=cm(p);return g instanceof ae&&rl(g)?g.getFilters():[g]})(t.where));let o=[];t.orderBy&&(o=(function(p){return p.map((g=>(function(A){return new yo(yr(A.field),(function(D){switch(D){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}})(A.direction))})(g)))})(t.orderBy));let c=null;t.limit&&(c=(function(p){let g;return g=typeof p=="object"?p.value:p,Fo(g)?null:g})(t.limit));let l=null;t.startAt&&(l=(function(p){const g=!!p.before,w=p.values||[];return new Ur(w,g)})(t.startAt));let h=null;return t.endAt&&(h=(function(p){const g=!p.before,w=p.values||[];return new Ur(w,g)})(t.endAt)),XI(e,s,o,i,c,"F",l,h)}function Pw(n,e){const t=(function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B(28987,{purpose:s})}})(e.purpose);return t==null?null:{"goog-listen-tags":t}}function cm(n){return n.unaryFilter!==void 0?(function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=yr(t.unaryFilter.field);return ee.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=yr(t.unaryFilter.field);return ee.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=yr(t.unaryFilter.field);return ee.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=yr(t.unaryFilter.field);return ee.create(o,"!=",{nullValue:"NULL_VALUE"});case"OPERATOR_UNSPECIFIED":return B(61313);default:return B(60726)}})(n):n.fieldFilter!==void 0?(function(t){return ee.create(yr(t.fieldFilter.field),(function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";case"OPERATOR_UNSPECIFIED":return B(58110);default:return B(50506)}})(t.fieldFilter.op),t.fieldFilter.value)})(n):n.compositeFilter!==void 0?(function(t){return ae.create(t.compositeFilter.filters.map((r=>cm(r))),(function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B(1026)}})(t.compositeFilter.op))})(n):B(30097,{filter:n})}function Rw(n){return vw[n]}function Cw(n){return Ew[n]}function Dw(n){return Iw[n]}function _r(n){return{fieldPath:n.canonicalString()}}function yr(n){return ge.fromServerFormat(n.fieldPath)}function lm(n){return n instanceof ee?(function(t){if(t.op==="=="){if(Vh(t.value))return{unaryFilter:{field:_r(t.field),op:"IS_NAN"}};if(Dh(t.value))return{unaryFilter:{field:_r(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(Vh(t.value))return{unaryFilter:{field:_r(t.field),op:"IS_NOT_NAN"}};if(Dh(t.value))return{unaryFilter:{field:_r(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:_r(t.field),op:Cw(t.op),value:t.value}}})(n):n instanceof ae?(function(t){const r=t.getFilters().map((s=>lm(s)));return r.length===1?r[0]:{compositeFilter:{op:Dw(t.op),filters:r}}})(n):B(54877,{filter:n})}function Vw(n){const e=[];return n.fields.forEach((t=>e.push(t.canonicalString()))),{fieldPaths:e}}function um(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xt{constructor(e,t,r,s,i=H.min(),o=H.min(),c=Te.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=c,this.expectedCount=l}withSequenceNumber(e){return new xt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new xt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e){this.yt=e}}function Nw(n,e){let t;if(e.document)t=Tw(n.yt,e.document,!!e.hasCommittedMutations);else if(e.noDocument){const r=L.fromSegments(e.noDocument.path),s=Yn(e.noDocument.readTime);t=ve.newNoDocument(r,s),e.hasCommittedMutations&&t.setHasCommittedMutations()}else{if(!e.unknownDocument)return B(56709);{const r=L.fromSegments(e.unknownDocument.path),s=Yn(e.unknownDocument.version);t=ve.newUnknownDocument(r,s)}}return e.readTime&&t.setReadTime((function(s){const i=new oe(s[0],s[1]);return H.fromTimestamp(i)})(e.readTime)),t}function Wh(n,e){const t=e.key,r={prefixPath:t.getCollectionPath().popLast().toArray(),collectionGroup:t.collectionGroup,documentId:t.path.lastSegment(),readTime:bo(e.readTime),hasCommittedMutations:e.hasCommittedMutations};if(e.isFoundDocument())r.document=(function(i,o){return{name:Io(i,o.key),fields:o.data.value.mapValue.fields,updateTime:jr(i,o.version.toTimestamp()),createTime:jr(i,o.createTime.toTimestamp())}})(n.yt,e);else if(e.isNoDocument())r.noDocument={path:t.path.toArray(),readTime:Qn(e.version)};else{if(!e.isUnknownDocument())return B(57904,{document:e});r.unknownDocument={path:t.path.toArray(),version:Qn(e.version)}}return r}function bo(n){const e=n.toTimestamp();return[e.seconds,e.nanoseconds]}function Qn(n){const e=n.toTimestamp();return{seconds:e.seconds,nanoseconds:e.nanoseconds}}function Yn(n){const e=new oe(n.seconds,n.nanoseconds);return H.fromTimestamp(e)}function xn(n,e){const t=(e.baseMutations||[]).map((i=>yc(n.yt,i)));for(let i=0;i<e.mutations.length-1;++i){const o=e.mutations[i];if(i+1<e.mutations.length&&e.mutations[i+1].transform!==void 0){const c=e.mutations[i+1];o.updateTransforms=c.transform.fieldTransforms,e.mutations.splice(i+1,1),++i}}const r=e.mutations.map((i=>yc(n.yt,i))),s=oe.fromMillis(e.localWriteTimeMs);return new il(e.batchId,s,t,r)}function Rs(n){const e=Yn(n.readTime),t=n.lastLimboFreeSnapshotVersion!==void 0?Yn(n.lastLimboFreeSnapshotVersion):H.min();let r;return r=(function(i){return i.documents!==void 0})(n.query)?(function(i){const o=i.documents.length;return G(o===1,1966,{count:o}),ct(jo(rm(i.documents[0])))})(n.query):(function(i){return ct(am(i))})(n.query),new xt(r,n.targetId,"TargetPurposeListen",n.lastListenSequenceNumber,e,t,Te.fromBase64String(n.resumeToken))}function dm(n,e){const t=Qn(e.snapshotVersion),r=Qn(e.lastLimboFreeSnapshotVersion);let s;s=vo(e.target)?im(n.yt,e.target):om(n.yt,e.target).ft;const i=e.resumeToken.toBase64();return{targetId:e.targetId,canonicalId:Wn(e.target),readTime:t,resumeToken:i,lastListenSequenceNumber:e.sequenceNumber,lastLimboFreeSnapshotVersion:r,query:s}}function fm(n){const e=am({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?pc(e,e.limit,"L"):e}function Ma(n,e){return new al(e.largestBatchId,yc(n.yt,e.overlayMutation))}function Qh(n,e){const t=e.path.lastSegment();return[n,$e(e.path.popLast()),t]}function Yh(n,e,t,r){return{indexId:n,uid:e,sequenceNumber:t,readTime:Qn(r.readTime),documentKey:$e(r.documentKey.path),largestBatchId:r.largestBatchId}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kw{getBundleMetadata(e,t){return Jh(e).get(t).next((r=>{if(r)return(function(i){return{id:i.bundleId,createTime:Yn(i.createTime),version:i.version}})(r)}))}saveBundleMetadata(e,t){return Jh(e).put((function(s){return{bundleId:s.id,createTime:Qn(We(s.createTime)),version:s.version}})(t))}getNamedQuery(e,t){return Xh(e).get(t).next((r=>{if(r)return(function(i){return{name:i.name,query:fm(i.bundledQuery),readTime:Yn(i.readTime)}})(r)}))}saveNamedQuery(e,t){return Xh(e).put((function(s){return{name:s.name,readTime:Qn(We(s.readTime)),bundledQuery:s.bundledQuery}})(t))}}function Jh(n){return Pe(n,Uo)}function Xh(n){return Pe(n,Bo)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yo{constructor(e,t){this.serializer=e,this.userId=t}static wt(e,t){const r=t.uid||"";return new Yo(e,r)}getOverlay(e,t){return ys(e).get(Qh(this.userId,t)).next((r=>r?Ma(this.serializer,r):null))}getOverlays(e,t){const r=It();return T.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){const s=[];return r.forEach(((i,o)=>{const c=new al(t,o);s.push(this.St(e,c))})),T.waitFor(s)}removeOverlaysForBatchId(e,t,r){const s=new Set;t.forEach((o=>s.add($e(o.getCollectionPath()))));const i=[];return s.forEach((o=>{const c=IDBKeyRange.bound([this.userId,o,r],[this.userId,o,r+1],!1,!0);i.push(ys(e).Z(oc,c))})),T.waitFor(i)}getOverlaysForCollection(e,t,r){const s=It(),i=$e(t),o=IDBKeyRange.bound([this.userId,i,r],[this.userId,i,Number.POSITIVE_INFINITY],!0);return ys(e).J(oc,o).next((c=>{for(const l of c){const h=Ma(this.serializer,l);s.set(h.getKey(),h)}return s}))}getOverlaysForCollectionGroup(e,t,r,s){const i=It();let o;const c=IDBKeyRange.bound([this.userId,t,r],[this.userId,t,Number.POSITIVE_INFINITY],!0);return ys(e).ee({index:pp,range:c},((l,h,f)=>{const p=Ma(this.serializer,h);i.size()<s||p.largestBatchId===o?(i.set(p.getKey(),p),o=p.largestBatchId):f.done()})).next((()=>i))}St(e,t){return ys(e).put((function(s,i,o){const[c,l,h]=Qh(i,o.mutation.key);return{userId:i,collectionPath:l,documentId:h,collectionGroup:o.mutation.key.getCollectionGroup(),largestBatchId:o.largestBatchId,overlayMutation:wo(s.yt,o.mutation)}})(this.serializer,this.userId,t))}}function ys(n){return Pe(n,$o)}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xw{bt(e){return Pe(e,Xc)}getSessionToken(e){return this.bt(e).get("sessionToken").next((t=>{const r=t?.value;return r?Te.fromUint8Array(r):Te.EMPTY_BYTE_STRING}))}setSessionToken(e,t){return this.bt(e).put({name:"sessionToken",value:t.toUint8Array()})}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class On{constructor(){}Dt(e,t){this.Ct(e,t),t.vt()}Ct(e,t){if("nullValue"in e)this.Ft(t,5);else if("booleanValue"in e)this.Ft(t,10),t.Mt(e.booleanValue?1:0);else if("integerValue"in e)this.Ft(t,15),t.Mt(fe(e.integerValue));else if("doubleValue"in e){const r=fe(e.doubleValue);isNaN(r)?this.Ft(t,13):(this.Ft(t,15),Ks(r)?t.Mt(0):t.Mt(r))}else if("timestampValue"in e){let r=e.timestampValue;this.Ft(t,20),typeof r=="string"&&(r=Ft(r)),t.xt(`${r.seconds||""}`),t.Mt(r.nanos||0)}else if("stringValue"in e)this.Ot(e.stringValue,t),this.Nt(t);else if("bytesValue"in e)this.Ft(t,30),t.Bt(Ut(e.bytesValue)),this.Nt(t);else if("referenceValue"in e)this.Lt(e.referenceValue,t);else if("geoPointValue"in e){const r=e.geoPointValue;this.Ft(t,45),t.Mt(r.latitude||0),t.Mt(r.longitude||0)}else"mapValue"in e?Sp(e)?this.Ft(t,Number.MAX_SAFE_INTEGER):zo(e)?this.kt(e.mapValue,t):(this.qt(e.mapValue,t),this.Nt(t)):"arrayValue"in e?(this.Qt(e.arrayValue,t),this.Nt(t)):B(19022,{$t:e})}Ot(e,t){this.Ft(t,25),this.Ut(e,t)}Ut(e,t){t.xt(e)}qt(e,t){const r=e.fields||{};this.Ft(t,55);for(const s of Object.keys(r))this.Ot(s,t),this.Ct(r[s],t)}kt(e,t){const r=e.fields||{};this.Ft(t,53);const s=Mr,i=r[s].arrayValue?.values?.length||0;this.Ft(t,15),t.Mt(fe(i)),this.Ot(s,t),this.Ct(r[s],t)}Qt(e,t){const r=e.values||[];this.Ft(t,50);for(const s of r)this.Ct(s,t)}Lt(e,t){this.Ft(t,37),L.fromName(e).path.forEach((r=>{this.Ft(t,60),this.Ut(r,t)}))}Ft(e,t){e.Mt(t)}Nt(e){e.Mt(2)}}On.Kt=new On;/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law | agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES | CONDITIONS OF ANY KIND, either express | implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ur=255;function Ow(n){if(n===0)return 8;let e=0;return n>>4||(e+=4,n<<=4),n>>6||(e+=2,n<<=2),n>>7||(e+=1),e}function Zh(n){const e=64-(function(r){let s=0;for(let i=0;i<8;++i){const o=Ow(255&r[i]);if(s+=o,o!==8)break}return s})(n);return Math.ceil(e/8)}class Lw{constructor(){this.buffer=new Uint8Array(1024),this.position=0}Wt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Gt(r.value),r=t.next();this.zt()}jt(e){const t=e[Symbol.iterator]();let r=t.next();for(;!r.done;)this.Jt(r.value),r=t.next();this.Ht()}Yt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Gt(r);else if(r<2048)this.Gt(960|r>>>6),this.Gt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Gt(480|r>>>12),this.Gt(128|63&r>>>6),this.Gt(128|63&r);else{const s=t.codePointAt(0);this.Gt(240|s>>>18),this.Gt(128|63&s>>>12),this.Gt(128|63&s>>>6),this.Gt(128|63&s)}}this.zt()}Zt(e){for(const t of e){const r=t.charCodeAt(0);if(r<128)this.Jt(r);else if(r<2048)this.Jt(960|r>>>6),this.Jt(128|63&r);else if(t<"\uD800"||"\uDBFF"<t)this.Jt(480|r>>>12),this.Jt(128|63&r>>>6),this.Jt(128|63&r);else{const s=t.codePointAt(0);this.Jt(240|s>>>18),this.Jt(128|63&s>>>12),this.Jt(128|63&s>>>6),this.Jt(128|63&s)}}this.Ht()}Xt(e){const t=this.en(e),r=Zh(t);this.tn(1+r),this.buffer[this.position++]=255&r;for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=255&t[s]}nn(e){const t=this.en(e),r=Zh(t);this.tn(1+r),this.buffer[this.position++]=~(255&r);for(let s=t.length-r;s<t.length;++s)this.buffer[this.position++]=~(255&t[s])}rn(){this.sn(ur),this.sn(255)}_n(){this.an(ur),this.an(255)}reset(){this.position=0}seed(e){this.tn(e.length),this.buffer.set(e,this.position),this.position+=e.length}un(){return this.buffer.slice(0,this.position)}en(e){const t=(function(i){const o=new DataView(new ArrayBuffer(8));return o.setFloat64(0,i,!1),new Uint8Array(o.buffer)})(e),r=!!(128&t[0]);t[0]^=r?255:128;for(let s=1;s<t.length;++s)t[s]^=r?255:0;return t}Gt(e){const t=255&e;t===0?(this.sn(0),this.sn(255)):t===ur?(this.sn(ur),this.sn(0)):this.sn(t)}Jt(e){const t=255&e;t===0?(this.an(0),this.an(255)):t===ur?(this.an(ur),this.an(0)):this.an(e)}zt(){this.sn(0),this.sn(1)}Ht(){this.an(0),this.an(1)}sn(e){this.tn(1),this.buffer[this.position++]=e}an(e){this.tn(1),this.buffer[this.position++]=~e}tn(e){const t=e+this.position;if(t<=this.buffer.length)return;let r=2*this.buffer.length;r<t&&(r=t);const s=new Uint8Array(r);s.set(this.buffer),this.buffer=s}}class Mw{constructor(e){this.cn=e}Bt(e){this.cn.Wt(e)}xt(e){this.cn.Yt(e)}Mt(e){this.cn.Xt(e)}vt(){this.cn.rn()}}class Fw{constructor(e){this.cn=e}Bt(e){this.cn.jt(e)}xt(e){this.cn.Zt(e)}Mt(e){this.cn.nn(e)}vt(){this.cn._n()}}class vs{constructor(){this.cn=new Lw,this.ln=new Mw(this.cn),this.hn=new Fw(this.cn)}seed(e){this.cn.seed(e)}Pn(e){return e===0?this.ln:this.hn}un(){return this.cn.un()}reset(){this.cn.reset()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ln{constructor(e,t,r,s){this.Tn=e,this.In=t,this.En=r,this.dn=s}An(){const e=this.dn.length,t=e===0||this.dn[e-1]===255?e+1:e,r=new Uint8Array(t);return r.set(this.dn,0),t!==e?r.set([0],this.dn.length):++r[r.length-1],new Ln(this.Tn,this.In,this.En,r)}Rn(e,t,r){return{indexId:this.Tn,uid:e,arrayValue:to(this.En),directionalValue:to(this.dn),orderedDocumentKey:to(t),documentKey:r.path.toArray()}}Vn(e,t,r){const s=this.Rn(e,t,r);return[s.indexId,s.uid,s.arrayValue,s.directionalValue,s.orderedDocumentKey,s.documentKey]}}function Jt(n,e){let t=n.Tn-e.Tn;return t!==0?t:(t=ed(n.En,e.En),t!==0?t:(t=ed(n.dn,e.dn),t!==0?t:L.comparator(n.In,e.In)))}function ed(n,e){for(let t=0;t<n.length&&t<e.length;++t){const r=n[t]-e[t];if(r!==0)return r}return n.length-e.length}function to(n){return lf()?(function(t){let r="";for(let s=0;s<t.length;s++)r+=String.fromCharCode(t[s]);return r})(n):n}function td(n){return typeof n!="string"?n:(function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r})(n)}class nd{constructor(e){this.mn=new ce(((t,r)=>ge.comparator(t.field,r.field))),this.collectionId=e.collectionGroup!=null?e.collectionGroup:e.path.lastSegment(),this.fn=e.orderBy,this.gn=[];for(const t of e.filters){const r=t;r.isInequality()?this.mn=this.mn.add(r):this.gn.push(r)}}get pn(){return this.mn.size>1}yn(e){if(G(e.collectionGroup===this.collectionId,49279),this.pn)return!1;const t=rc(e);if(t!==void 0&&!this.wn(t))return!1;const r=Dn(e);let s=new Set,i=0,o=0;for(;i<r.length&&this.wn(r[i]);++i)s=s.add(r[i].fieldPath.canonicalString());if(i===r.length)return!0;if(this.mn.size>0){const c=this.mn.getIterator().getNext();if(!s.has(c.field.canonicalString())){const l=r[i];if(!this.Sn(c,l)||!this.bn(this.fn[o++],l))return!1}++i}for(;i<r.length;++i){const c=r[i];if(o>=this.fn.length||!this.bn(this.fn[o++],c))return!1}return!0}Dn(){if(this.pn)return null;let e=new ce(ge.comparator);const t=[];for(const r of this.gn)if(!r.field.isKeyField())if(r.op==="array-contains"||r.op==="array-contains-any")t.push(new Ki(r.field,2));else{if(e.has(r.field))continue;e=e.add(r.field),t.push(new Ki(r.field,0))}for(const r of this.fn)r.field.isKeyField()||e.has(r.field)||(e=e.add(r.field),t.push(new Ki(r.field,r.dir==="asc"?0:1)));return new fo(fo.UNKNOWN_ID,this.collectionId,t,Hs.empty())}wn(e){for(const t of this.gn)if(this.Sn(t,e))return!0;return!1}Sn(e,t){if(e===void 0||!e.field.isEqual(t.fieldPath))return!1;const r=e.op==="array-contains"||e.op==="array-contains-any";return t.kind===2===r}bn(e,t){return!!e.field.isEqual(t.fieldPath)&&(t.kind===0&&e.dir==="asc"||t.kind===1&&e.dir==="desc")}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function pm(n){if(G(n instanceof ee||n instanceof ae,20012),n instanceof ee){if(n instanceof Op){const t=n.value.arrayValue?.values?.map((r=>ee.create(n.field,"==",r)))||[];return ae.create(t,"or")}return n}const e=n.filters.map((t=>pm(t)));return ae.create(e,n.op)}function Uw(n){if(n.getFilters().length===0)return[];const e=Ic(pm(n));return G(mm(e),7391),vc(e)||Ec(e)?[e]:e.getFilters()}function vc(n){return n instanceof ee}function Ec(n){return n instanceof ae&&rl(n)}function mm(n){return vc(n)||Ec(n)||(function(t){if(t instanceof ae&&uc(t)){for(const r of t.getFilters())if(!vc(r)&&!Ec(r))return!1;return!0}return!1})(n)}function Ic(n){if(G(n instanceof ee||n instanceof ae,34018),n instanceof ee)return n;if(n.filters.length===1)return Ic(n.filters[0]);const e=n.filters.map((r=>Ic(r)));let t=ae.create(e,n.op);return t=To(t),mm(t)?t:(G(t instanceof ae,64498),G(Br(t),40251),G(t.filters.length>1,57927),t.filters.reduce(((r,s)=>ul(r,s))))}function ul(n,e){let t;return G(n instanceof ee||n instanceof ae,38388),G(e instanceof ee||e instanceof ae,25473),t=n instanceof ee?e instanceof ee?(function(s,i){return ae.create([s,i],"and")})(n,e):rd(n,e):e instanceof ee?rd(e,n):(function(s,i){if(G(s.filters.length>0&&i.filters.length>0,48005),Br(s)&&Br(i))return Np(s,i.getFilters());const o=uc(s)?s:i,c=uc(s)?i:s,l=o.filters.map((h=>ul(h,c)));return ae.create(l,"or")})(n,e),To(t)}function rd(n,e){if(Br(e))return Np(e,n.getFilters());{const t=e.filters.map((r=>ul(n,r)));return ae.create(t,"or")}}function To(n){if(G(n instanceof ee||n instanceof ae,11850),n instanceof ee)return n;const e=n.getFilters();if(e.length===1)return To(e[0]);if(Dp(n))return n;const t=e.map((s=>To(s))),r=[];return t.forEach((s=>{s instanceof ee?r.push(s):s instanceof ae&&(s.op===n.op?r.push(...s.filters):r.push(s))})),r.length===1?r[0]:ae.create(r,n.op)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bw{constructor(){this.Cn=new hl}addToCollectionParentIndex(e,t){return this.Cn.add(t),T.resolve()}getCollectionParents(e,t){return T.resolve(this.Cn.getEntries(t))}addFieldIndex(e,t){return T.resolve()}deleteFieldIndex(e,t){return T.resolve()}deleteAllFieldIndexes(e){return T.resolve()}createTargetIndexes(e,t){return T.resolve()}getDocumentsMatchingTarget(e,t){return T.resolve(null)}getIndexType(e,t){return T.resolve(0)}getFieldIndexes(e,t){return T.resolve([])}getNextCollectionGroupToUpdate(e){return T.resolve(null)}getMinOffset(e,t){return T.resolve(st.min())}getMinOffsetFromCollectionGroup(e,t){return T.resolve(st.min())}updateCollectionGroup(e,t,r){return T.resolve()}updateIndexEntries(e,t){return T.resolve()}}class hl{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ce(se.comparator),i=!s.has(r);return this.index[t]=s.add(r),i}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ce(se.comparator)).toArray()}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sd="IndexedDbIndexManager",Li=new Uint8Array(0);class $w{constructor(e,t){this.databaseId=t,this.vn=new hl,this.Fn=new qt((r=>Wn(r)),((r,s)=>ui(r,s))),this.uid=e.uid||""}addToCollectionParentIndex(e,t){if(!this.vn.has(t)){const r=t.lastSegment(),s=t.popLast();e.addOnCommittedListener((()=>{this.vn.add(t)}));const i={collectionId:r,parent:$e(s)};return id(e).put(i)}return T.resolve()}getCollectionParents(e,t){const r=[],s=IDBKeyRange.bound([t,""],[np(t),""],!1,!0);return id(e).J(s).next((i=>{for(const o of i){if(o.collectionId!==t)break;r.push(Et(o.parent))}return r}))}addFieldIndex(e,t){const r=Es(e),s=(function(c){return{indexId:c.indexId,collectionGroup:c.collectionGroup,fields:c.fields.map((l=>[l.fieldPath.canonicalString(),l.kind]))}})(t);delete s.indexId;const i=r.add(s);if(t.indexState){const o=dr(e);return i.next((c=>{o.put(Yh(c,this.uid,t.indexState.sequenceNumber,t.indexState.offset))}))}return i.next()}deleteFieldIndex(e,t){const r=Es(e),s=dr(e),i=hr(e);return r.delete(t.indexId).next((()=>s.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0)))).next((()=>i.delete(IDBKeyRange.bound([t.indexId],[t.indexId+1],!1,!0))))}deleteAllFieldIndexes(e){const t=Es(e),r=hr(e),s=dr(e);return t.Z().next((()=>r.Z())).next((()=>s.Z()))}createTargetIndexes(e,t){return T.forEach(this.Mn(t),(r=>this.getIndexType(e,r).next((s=>{if(s===0||s===1){const i=new nd(r).Dn();if(i!=null)return this.addFieldIndex(e,i)}}))))}getDocumentsMatchingTarget(e,t){const r=hr(e);let s=!0;const i=new Map;return T.forEach(this.Mn(t),(o=>this.xn(e,o).next((c=>{s&&(s=!!c),i.set(o,c)})))).next((()=>{if(s){let o=X();const c=[];return T.forEach(i,((l,h)=>{k(sd,`Using index ${(function(U){return`id=${U.indexId}|cg=${U.collectionGroup}|f=${U.fields.map((z=>`${z.fieldPath}:${z.kind}`)).join(",")}`})(l)} to execute ${Wn(t)}`);const f=(function(U,z){const M=rc(z);if(M===void 0)return null;for(const q of Eo(U,M.fieldPath))switch(q.op){case"array-contains-any":return q.value.arrayValue.values||[];case"array-contains":return[q.value]}return null})(h,l),p=(function(U,z){const M=new Map;for(const q of Dn(z))for(const E of Eo(U,q.fieldPath))switch(E.op){case"==":case"in":M.set(q.fieldPath.canonicalString(),E.value);break;case"not-in":case"!=":return M.set(q.fieldPath.canonicalString(),E.value),Array.from(M.values())}return null})(h,l),g=(function(U,z){const M=[];let q=!0;for(const E of Dn(z)){const _=E.kind===0?Lh(U,E.fieldPath,U.startAt):Mh(U,E.fieldPath,U.startAt);M.push(_.value),q&&(q=_.inclusive)}return new Ur(M,q)})(h,l),w=(function(U,z){const M=[];let q=!0;for(const E of Dn(z)){const _=E.kind===0?Mh(U,E.fieldPath,U.endAt):Lh(U,E.fieldPath,U.endAt);M.push(_.value),q&&(q=_.inclusive)}return new Ur(M,q)})(h,l),A=this.On(l,h,g),V=this.On(l,h,w),D=this.Nn(l,h,p),j=this.Bn(l.indexId,f,A,g.inclusive,V,w.inclusive,D);return T.forEach(j,($=>r.Y($,t.limit).next((U=>{U.forEach((z=>{const M=L.fromSegments(z.documentKey);o.has(M)||(o=o.add(M),c.push(M))}))}))))})).next((()=>c))}return T.resolve(null)}))}Mn(e){let t=this.Fn.get(e);return t||(e.filters.length===0?t=[e]:t=Uw(ae.create(e.filters,"and")).map((r=>dc(e.path,e.collectionGroup,e.orderBy,r.getFilters(),e.limit,e.startAt,e.endAt))),this.Fn.set(e,t),t)}Bn(e,t,r,s,i,o,c){const l=(t!=null?t.length:1)*Math.max(r.length,i.length),h=l/(t!=null?t.length:1),f=[];for(let p=0;p<l;++p){const g=t?this.Ln(t[p/h]):Li,w=this.kn(e,g,r[p%h],s),A=this.qn(e,g,i[p%h],o),V=c.map((D=>this.kn(e,g,D,!0)));f.push(...this.createRange(w,A,V))}return f}kn(e,t,r,s){const i=new Ln(e,L.empty(),t,r);return s?i:i.An()}qn(e,t,r,s){const i=new Ln(e,L.empty(),t,r);return s?i.An():i}xn(e,t){const r=new nd(t),s=t.collectionGroup!=null?t.collectionGroup:t.path.lastSegment();return this.getFieldIndexes(e,s).next((i=>{let o=null;for(const c of i)r.yn(c)&&(!o||c.fields.length>o.fields.length)&&(o=c);return o}))}getIndexType(e,t){let r=2;const s=this.Mn(t);return T.forEach(s,(i=>this.xn(e,i).next((o=>{o?r!==0&&o.fields.length<(function(l){let h=new ce(ge.comparator),f=!1;for(const p of l.filters)for(const g of p.getFlattenedFilters())g.field.isKeyField()||(g.op==="array-contains"||g.op==="array-contains-any"?f=!0:h=h.add(g.field));for(const p of l.orderBy)p.field.isKeyField()||(h=h.add(p.field));return h.size+(f?1:0)})(i)&&(r=1):r=0})))).next((()=>(function(o){return o.limit!==null})(t)&&s.length>1&&r===2?1:r))}Qn(e,t){const r=new vs;for(const s of Dn(e)){const i=t.data.field(s.fieldPath);if(i==null)return null;const o=r.Pn(s.kind);On.Kt.Dt(i,o)}return r.un()}Ln(e){const t=new vs;return On.Kt.Dt(e,t.Pn(0)),t.un()}$n(e,t){const r=new vs;return On.Kt.Dt(Zs(this.databaseId,t),r.Pn((function(i){const o=Dn(i);return o.length===0?0:o[o.length-1].kind})(e))),r.un()}Nn(e,t,r){if(r===null)return[];let s=[];s.push(new vs);let i=0;for(const o of Dn(e)){const c=r[i++];for(const l of s)if(this.Un(t,o.fieldPath)&&ei(c))s=this.Kn(s,o,c);else{const h=l.Pn(o.kind);On.Kt.Dt(c,h)}}return this.Wn(s)}On(e,t,r){return this.Nn(e,t,r.position)}Wn(e){const t=[];for(let r=0;r<e.length;++r)t[r]=e[r].un();return t}Kn(e,t,r){const s=[...e],i=[];for(const o of r.arrayValue.values||[])for(const c of s){const l=new vs;l.seed(c.un()),On.Kt.Dt(o,l.Pn(t.kind)),i.push(l)}return i}Un(e,t){return!!e.filters.find((r=>r instanceof ee&&r.field.isEqual(t)&&(r.op==="in"||r.op==="not-in")))}getFieldIndexes(e,t){const r=Es(e),s=dr(e);return(t?r.J(ic,IDBKeyRange.bound(t,t)):r.J()).next((i=>{const o=[];return T.forEach(i,(c=>s.get([c.indexId,this.uid]).next((l=>{o.push((function(f,p){const g=p?new Hs(p.sequenceNumber,new st(Yn(p.readTime),new L(Et(p.documentKey)),p.largestBatchId)):Hs.empty(),w=f.fields.map((([A,V])=>new Ki(ge.fromServerFormat(A),V)));return new fo(f.indexId,f.collectionGroup,w,g)})(c,l))})))).next((()=>o))}))}getNextCollectionGroupToUpdate(e){return this.getFieldIndexes(e).next((t=>t.length===0?null:(t.sort(((r,s)=>{const i=r.indexState.sequenceNumber-s.indexState.sequenceNumber;return i!==0?i:Q(r.collectionGroup,s.collectionGroup)})),t[0].collectionGroup)))}updateCollectionGroup(e,t,r){const s=Es(e),i=dr(e);return this.Gn(e).next((o=>s.J(ic,IDBKeyRange.bound(t,t)).next((c=>T.forEach(c,(l=>i.put(Yh(l.indexId,this.uid,o,r))))))))}updateIndexEntries(e,t){const r=new Map;return T.forEach(t,((s,i)=>{const o=r.get(s.collectionGroup);return(o?T.resolve(o):this.getFieldIndexes(e,s.collectionGroup)).next((c=>(r.set(s.collectionGroup,c),T.forEach(c,(l=>this.zn(e,s,l).next((h=>{const f=this.jn(i,l);return h.isEqual(f)?T.resolve():this.Jn(e,i,l,h,f)})))))))}))}Hn(e,t,r,s){return hr(e).put(s.Rn(this.uid,this.$n(r,t.key),t.key))}Yn(e,t,r,s){return hr(e).delete(s.Vn(this.uid,this.$n(r,t.key),t.key))}zn(e,t,r){const s=hr(e);let i=new ce(Jt);return s.ee({index:fp,range:IDBKeyRange.only([r.indexId,this.uid,to(this.$n(r,t))])},((o,c)=>{i=i.add(new Ln(r.indexId,t,td(c.arrayValue),td(c.directionalValue)))})).next((()=>i))}jn(e,t){let r=new ce(Jt);const s=this.Qn(t,e);if(s==null)return r;const i=rc(t);if(i!=null){const o=e.data.field(i.fieldPath);if(ei(o))for(const c of o.arrayValue.values||[])r=r.add(new Ln(t.indexId,e.key,this.Ln(c),s))}else r=r.add(new Ln(t.indexId,e.key,Li,s));return r}Jn(e,t,r,s,i){k(sd,"Updating index entries for document '%s'",t.key);const o=[];return(function(l,h,f,p,g){const w=l.getIterator(),A=h.getIterator();let V=lr(w),D=lr(A);for(;V||D;){let j=!1,$=!1;if(V&&D){const U=f(V,D);U<0?$=!0:U>0&&(j=!0)}else V!=null?$=!0:j=!0;j?(p(D),D=lr(A)):$?(g(V),V=lr(w)):(V=lr(w),D=lr(A))}})(s,i,Jt,(c=>{o.push(this.Hn(e,t,r,c))}),(c=>{o.push(this.Yn(e,t,r,c))})),T.waitFor(o)}Gn(e){let t=1;return dr(e).ee({index:dp,reverse:!0,range:IDBKeyRange.upperBound([this.uid,Number.MAX_SAFE_INTEGER])},((r,s,i)=>{i.done(),t=s.sequenceNumber+1})).next((()=>t))}createRange(e,t,r){r=r.sort(((o,c)=>Jt(o,c))).filter(((o,c,l)=>!c||Jt(o,l[c-1])!==0));const s=[];s.push(e);for(const o of r){const c=Jt(o,e),l=Jt(o,t);if(c===0)s[0]=e.An();else if(c>0&&l<0)s.push(o),s.push(o.An());else if(l>0)break}s.push(t);const i=[];for(let o=0;o<s.length;o+=2){if(this.Zn(s[o],s[o+1]))return[];const c=s[o].Vn(this.uid,Li,L.empty()),l=s[o+1].Vn(this.uid,Li,L.empty());i.push(IDBKeyRange.bound(c,l))}return i}Zn(e,t){return Jt(e,t)>0}getMinOffsetFromCollectionGroup(e,t){return this.getFieldIndexes(e,t).next(od)}getMinOffset(e,t){return T.mapArray(this.Mn(t),(r=>this.xn(e,r).next((s=>s||B(44426))))).next(od)}}function id(n){return Pe(n,Ys)}function hr(n){return Pe(n,Os)}function Es(n){return Pe(n,Jc)}function dr(n){return Pe(n,xs)}function od(n){G(n.length!==0,28825);let e=n[0].indexState.offset,t=e.largestBatchId;for(let r=1;r<n.length;r++){const s=n[r].indexState.offset;Wc(s,e)<0&&(e=s),t<s.largestBatchId&&(t=s.largestBatchId)}return new st(e.readTime,e.documentKey,t)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ad={didRun:!1,sequenceNumbersCollected:0,targetsRemoved:0,documentsRemoved:0},gm=41943040;class Me{static withCacheSize(e){return new Me(e,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT)}constructor(e,t,r){this.cacheSizeCollectionThreshold=e,this.percentileToCollect=t,this.maximumSequenceNumbersToCollect=r}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _m(n,e,t){const r=n.store(ut),s=n.store(kr),i=[],o=IDBKeyRange.only(t.batchId);let c=0;const l=r.ee({range:o},((f,p,g)=>(c++,g.delete())));i.push(l.next((()=>{G(c===1,47070,{batchId:t.batchId})})));const h=[];for(const f of t.mutations){const p=lp(e,f.key.path,t.batchId);i.push(s.delete(p)),h.push(f.key)}return T.waitFor(i).next((()=>h))}function Ao(n){if(!n)return 0;let e;if(n.document)e=n.document;else if(n.unknownDocument)e=n.unknownDocument;else{if(!n.noDocument)throw B(14731);e=n.noDocument}return JSON.stringify(e).length}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */Me.DEFAULT_COLLECTION_PERCENTILE=10,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT=1e3,Me.DEFAULT=new Me(gm,Me.DEFAULT_COLLECTION_PERCENTILE,Me.DEFAULT_MAX_SEQUENCE_NUMBERS_TO_COLLECT),Me.DISABLED=new Me(-1,0,0);class Jo{constructor(e,t,r,s){this.userId=e,this.serializer=t,this.indexManager=r,this.referenceDelegate=s,this.Xn={}}static wt(e,t,r,s){G(e.uid!=="",64387);const i=e.isAuthenticated()?e.uid:"";return new Jo(i,t,r,s)}checkEmpty(e){let t=!0;const r=IDBKeyRange.bound([this.userId,Number.NEGATIVE_INFINITY],[this.userId,Number.POSITIVE_INFINITY]);return Xt(e).ee({index:Mn,range:r},((s,i,o)=>{t=!1,o.done()})).next((()=>t))}addMutationBatch(e,t,r,s){const i=vr(e),o=Xt(e);return o.add({}).next((c=>{G(typeof c=="number",49019);const l=new il(c,t,r,s),h=(function(w,A,V){const D=V.baseMutations.map(($=>wo(w.yt,$))),j=V.mutations.map(($=>wo(w.yt,$)));return{userId:A,batchId:V.batchId,localWriteTimeMs:V.localWriteTime.toMillis(),baseMutations:D,mutations:j}})(this.serializer,this.userId,l),f=[];let p=new ce(((g,w)=>Q(g.canonicalString(),w.canonicalString())));for(const g of s){const w=lp(this.userId,g.key.path,c);p=p.add(g.key.path.popLast()),f.push(o.put(h)),f.push(i.put(w,gI))}return p.forEach((g=>{f.push(this.indexManager.addToCollectionParentIndex(e,g))})),e.addOnCommittedListener((()=>{this.Xn[c]=l.keys()})),T.waitFor(f).next((()=>l))}))}lookupMutationBatch(e,t){return Xt(e).get(t).next((r=>r?(G(r.userId===this.userId,48,"Unexpected user for mutation batch",{userId:r.userId,batchId:t}),xn(this.serializer,r)):null))}er(e,t){return this.Xn[t]?T.resolve(this.Xn[t]):this.lookupMutationBatch(e,t).next((r=>{if(r){const s=r.keys();return this.Xn[t]=s,s}return null}))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=IDBKeyRange.lowerBound([this.userId,r]);let i=null;return Xt(e).ee({index:Mn,range:s},((o,c,l)=>{c.userId===this.userId&&(G(c.batchId>=r,47524,{tr:r}),i=xn(this.serializer,c)),l.done()})).next((()=>i))}getHighestUnacknowledgedBatchId(e){const t=IDBKeyRange.upperBound([this.userId,Number.POSITIVE_INFINITY]);let r=Fn;return Xt(e).ee({index:Mn,range:t,reverse:!0},((s,i,o)=>{r=i.batchId,o.done()})).next((()=>r))}getAllMutationBatches(e){const t=IDBKeyRange.bound([this.userId,Fn],[this.userId,Number.POSITIVE_INFINITY]);return Xt(e).J(Mn,t).next((r=>r.map((s=>xn(this.serializer,s)))))}getAllMutationBatchesAffectingDocumentKey(e,t){const r=Wi(this.userId,t.path),s=IDBKeyRange.lowerBound(r),i=[];return vr(e).ee({range:s},((o,c,l)=>{const[h,f,p]=o,g=Et(f);if(h===this.userId&&t.path.isEqual(g))return Xt(e).get(p).next((w=>{if(!w)throw B(61480,{nr:o,batchId:p});G(w.userId===this.userId,10503,"Unexpected user for mutation batch",{userId:w.userId,batchId:p}),i.push(xn(this.serializer,w))}));l.done()})).next((()=>i))}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(Q);const s=[];return t.forEach((i=>{const o=Wi(this.userId,i.path),c=IDBKeyRange.lowerBound(o),l=vr(e).ee({range:c},((h,f,p)=>{const[g,w,A]=h,V=Et(w);g===this.userId&&i.path.isEqual(V)?r=r.add(A):p.done()}));s.push(l)})),T.waitFor(s).next((()=>this.rr(e,r)))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1,i=Wi(this.userId,r),o=IDBKeyRange.lowerBound(i);let c=new ce(Q);return vr(e).ee({range:o},((l,h,f)=>{const[p,g,w]=l,A=Et(g);p===this.userId&&r.isPrefixOf(A)?A.length===s&&(c=c.add(w)):f.done()})).next((()=>this.rr(e,c)))}rr(e,t){const r=[],s=[];return t.forEach((i=>{s.push(Xt(e).get(i).next((o=>{if(o===null)throw B(35274,{batchId:i});G(o.userId===this.userId,9748,"Unexpected user for mutation batch",{userId:o.userId,batchId:i}),r.push(xn(this.serializer,o))})))})),T.waitFor(s).next((()=>r))}removeMutationBatch(e,t){return _m(e.le,this.userId,t).next((r=>(e.addOnCommittedListener((()=>{this.ir(t.batchId)})),T.forEach(r,(s=>this.referenceDelegate.markPotentiallyOrphaned(e,s))))))}ir(e){delete this.Xn[e]}performConsistencyCheck(e){return this.checkEmpty(e).next((t=>{if(!t)return T.resolve();const r=IDBKeyRange.lowerBound((function(o){return[o]})(this.userId)),s=[];return vr(e).ee({range:r},((i,o,c)=>{if(i[0]===this.userId){const l=Et(i[1]);s.push(l)}else c.done()})).next((()=>{G(s.length===0,56720,{sr:s.map((i=>i.canonicalString()))})}))}))}containsKey(e,t){return ym(e,this.userId,t)}_r(e){return vm(e).get(this.userId).next((t=>t||{userId:this.userId,lastAcknowledgedBatchId:Fn,lastStreamToken:""}))}}function ym(n,e,t){const r=Wi(e,t.path),s=r[1],i=IDBKeyRange.lowerBound(r);let o=!1;return vr(n).ee({range:i,X:!0},((c,l,h)=>{const[f,p,g]=c;f===e&&p===s&&(o=!0),h.done()})).next((()=>o))}function Xt(n){return Pe(n,ut)}function vr(n){return Pe(n,kr)}function vm(n){return Pe(n,Ws)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jn{constructor(e){this.ar=e}next(){return this.ar+=2,this.ar}static ur(){return new Jn(0)}static cr(){return new Jn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qw{constructor(e,t){this.referenceDelegate=e,this.serializer=t}allocateTargetId(e){return this.lr(e).next((t=>{const r=new Jn(t.highestTargetId);return t.highestTargetId=r.next(),this.hr(e,t).next((()=>t.highestTargetId))}))}getLastRemoteSnapshotVersion(e){return this.lr(e).next((t=>H.fromTimestamp(new oe(t.lastRemoteSnapshotVersion.seconds,t.lastRemoteSnapshotVersion.nanoseconds))))}getHighestSequenceNumber(e){return this.lr(e).next((t=>t.highestListenSequenceNumber))}setTargetsMetadata(e,t,r){return this.lr(e).next((s=>(s.highestListenSequenceNumber=t,r&&(s.lastRemoteSnapshotVersion=r.toTimestamp()),t>s.highestListenSequenceNumber&&(s.highestListenSequenceNumber=t),this.hr(e,s))))}addTargetData(e,t){return this.Pr(e,t).next((()=>this.lr(e).next((r=>(r.targetCount+=1,this.Tr(t,r),this.hr(e,r))))))}updateTargetData(e,t){return this.Pr(e,t)}removeTargetData(e,t){return this.removeMatchingKeysForTargetId(e,t.targetId).next((()=>fr(e).delete(t.targetId))).next((()=>this.lr(e))).next((r=>(G(r.targetCount>0,8065),r.targetCount-=1,this.hr(e,r))))}removeTargets(e,t,r){let s=0;const i=[];return fr(e).ee(((o,c)=>{const l=Rs(c);l.sequenceNumber<=t&&r.get(l.targetId)===null&&(s++,i.push(this.removeTargetData(e,l)))})).next((()=>T.waitFor(i))).next((()=>s))}forEachTarget(e,t){return fr(e).ee(((r,s)=>{const i=Rs(s);t(i)}))}lr(e){return cd(e).get(go).next((t=>(G(t!==null,2888),t)))}hr(e,t){return cd(e).put(go,t)}Pr(e,t){return fr(e).put(dm(this.serializer,t))}Tr(e,t){let r=!1;return e.targetId>t.highestTargetId&&(t.highestTargetId=e.targetId,r=!0),e.sequenceNumber>t.highestListenSequenceNumber&&(t.highestListenSequenceNumber=e.sequenceNumber,r=!0),r}getTargetCount(e){return this.lr(e).next((t=>t.targetCount))}getTargetData(e,t){const r=Wn(t),s=IDBKeyRange.bound([r,Number.NEGATIVE_INFINITY],[r,Number.POSITIVE_INFINITY]);let i=null;return fr(e).ee({range:s,index:hp},((o,c,l)=>{const h=Rs(c);ui(t,h.target)&&(i=h,l.done())})).next((()=>i))}addMatchingKeys(e,t,r){const s=[],i=sn(e);return t.forEach((o=>{const c=$e(o.path);s.push(i.put({targetId:r,path:c})),s.push(this.referenceDelegate.addReference(e,r,o))})),T.waitFor(s)}removeMatchingKeys(e,t,r){const s=sn(e);return T.forEach(t,(i=>{const o=$e(i.path);return T.waitFor([s.delete([r,o]),this.referenceDelegate.removeReference(e,r,i)])}))}removeMatchingKeysForTargetId(e,t){const r=sn(e),s=IDBKeyRange.bound([t],[t+1],!1,!0);return r.delete(s)}getMatchingKeysForTargetId(e,t){const r=IDBKeyRange.bound([t],[t+1],!1,!0),s=sn(e);let i=X();return s.ee({range:r,X:!0},((o,c,l)=>{const h=Et(o[1]),f=new L(h);i=i.add(f)})).next((()=>i))}containsKey(e,t){const r=$e(t.path),s=IDBKeyRange.bound([r],[np(r)],!1,!0);let i=0;return sn(e).ee({index:Yc,X:!0,range:s},(([o,c],l,h)=>{o!==0&&(i++,h.done())})).next((()=>i>0))}At(e,t){return fr(e).get(t).next((r=>r?Rs(r):null))}}function fr(n){return Pe(n,xr)}function cd(n){return Pe(n,Un)}function sn(n){return Pe(n,Or)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ld="LruGarbageCollector",Em=1048576;function ud([n,e],[t,r]){const s=Q(n,t);return s===0?Q(e,r):s}class zw{constructor(e){this.Ir=e,this.buffer=new ce(ud),this.Er=0}dr(){return++this.Er}Ar(e){const t=[e,this.dr()];if(this.buffer.size<this.Ir)this.buffer=this.buffer.add(t);else{const r=this.buffer.last();ud(t,r)<0&&(this.buffer=this.buffer.delete(r).add(t))}}get maxValue(){return this.buffer.last()[0]}}class Im{constructor(e,t,r){this.garbageCollector=e,this.asyncQueue=t,this.localStore=r,this.Rr=null}start(){this.garbageCollector.params.cacheSizeCollectionThreshold!==-1&&this.Vr(6e4)}stop(){this.Rr&&(this.Rr.cancel(),this.Rr=null)}get started(){return this.Rr!==null}Vr(e){k(ld,`Garbage collection scheduled in ${e}ms`),this.Rr=this.asyncQueue.enqueueAfterDelay("lru_garbage_collection",e,(async()=>{this.Rr=null;try{await this.localStore.collectGarbage(this.garbageCollector)}catch(t){vn(t)?k(ld,"Ignoring IndexedDB error during garbage collection: ",t):await er(t)}await this.Vr(3e5)}))}}class jw{constructor(e,t){this.mr=e,this.params=t}calculateTargetCount(e,t){return this.mr.gr(e).next((r=>Math.floor(t/100*r)))}nthSequenceNumber(e,t){if(t===0)return T.resolve(at.ce);const r=new zw(t);return this.mr.forEachTarget(e,(s=>r.Ar(s.sequenceNumber))).next((()=>this.mr.pr(e,(s=>r.Ar(s))))).next((()=>r.maxValue))}removeTargets(e,t,r){return this.mr.removeTargets(e,t,r)}removeOrphanedDocuments(e,t){return this.mr.removeOrphanedDocuments(e,t)}collect(e,t){return this.params.cacheSizeCollectionThreshold===-1?(k("LruGarbageCollector","Garbage collection skipped; disabled"),T.resolve(ad)):this.getCacheSize(e).next((r=>r<this.params.cacheSizeCollectionThreshold?(k("LruGarbageCollector",`Garbage collection skipped; Cache size ${r} is lower than threshold ${this.params.cacheSizeCollectionThreshold}`),ad):this.yr(e,t)))}getCacheSize(e){return this.mr.getCacheSize(e)}yr(e,t){let r,s,i,o,c,l,h;const f=Date.now();return this.calculateTargetCount(e,this.params.percentileToCollect).next((p=>(p>this.params.maximumSequenceNumbersToCollect?(k("LruGarbageCollector",`Capping sequence numbers to collect down to the maximum of ${this.params.maximumSequenceNumbersToCollect} from ${p}`),s=this.params.maximumSequenceNumbersToCollect):s=p,o=Date.now(),this.nthSequenceNumber(e,s)))).next((p=>(r=p,c=Date.now(),this.removeTargets(e,r,t)))).next((p=>(i=p,l=Date.now(),this.removeOrphanedDocuments(e,r)))).next((p=>(h=Date.now(),mr()<=Z.DEBUG&&k("LruGarbageCollector",`LRU Garbage Collection
	Counted targets in ${o-f}ms
	Determined least recently used ${s} in `+(c-o)+`ms
	Removed ${i} targets in `+(l-c)+`ms
	Removed ${p} documents in `+(h-l)+`ms
Total Duration: ${h-f}ms`),T.resolve({didRun:!0,sequenceNumbersCollected:s,targetsRemoved:i,documentsRemoved:p}))))}}function wm(n,e){return new jw(n,e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gw{constructor(e,t){this.db=e,this.garbageCollector=wm(this,t)}gr(e){const t=this.wr(e);return this.db.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}wr(e){let t=0;return this.pr(e,(r=>{t++})).next((()=>t))}forEachTarget(e,t){return this.db.getTargetCache().forEachTarget(e,t)}pr(e,t){return this.Sr(e,((r,s)=>t(s)))}addReference(e,t,r){return Mi(e,r)}removeReference(e,t,r){return Mi(e,r)}removeTargets(e,t,r){return this.db.getTargetCache().removeTargets(e,t,r)}markPotentiallyOrphaned(e,t){return Mi(e,t)}br(e,t){return(function(s,i){let o=!1;return vm(s).te((c=>ym(s,c,i).next((l=>(l&&(o=!0),T.resolve(!l)))))).next((()=>o))})(e,t)}removeOrphanedDocuments(e,t){const r=this.db.getRemoteDocumentCache().newChangeBuffer(),s=[];let i=0;return this.Sr(e,((o,c)=>{if(c<=t){const l=this.br(e,o).next((h=>{if(!h)return i++,r.getEntry(e,o).next((()=>(r.removeEntry(o,H.min()),sn(e).delete((function(p){return[0,$e(p.path)]})(o)))))}));s.push(l)}})).next((()=>T.waitFor(s))).next((()=>r.apply(e))).next((()=>i))}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.db.getTargetCache().updateTargetData(e,r)}updateLimboDocument(e,t){return Mi(e,t)}Sr(e,t){const r=sn(e);let s,i=at.ce;return r.ee({index:Yc},(([o,c],{path:l,sequenceNumber:h})=>{o===0?(i!==at.ce&&t(new L(Et(s)),i),i=h,s=l):i=at.ce})).next((()=>{i!==at.ce&&t(new L(Et(s)),i)}))}getCacheSize(e){return this.db.getRemoteDocumentCache().getSize(e)}}function Mi(n,e){return sn(n).put((function(r,s){return{targetId:0,path:$e(r.path),sequenceNumber:s}})(e,n.currentSequenceNumber))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(){this.changes=new qt((e=>e.toString()),((e,t)=>e.isEqual(t))),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,ve.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?T.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hw{constructor(e){this.serializer=e}setIndexManager(e){this.indexManager=e}addEntry(e,t,r){return Pn(e).put(r)}removeEntry(e,t,r){return Pn(e).delete((function(i,o){const c=i.path.toArray();return[c.slice(0,c.length-2),c[c.length-2],bo(o),c[c.length-1]]})(t,r))}updateMetadata(e,t){return this.getMetadata(e).next((r=>(r.byteSize+=t,this.Dr(e,r))))}getEntry(e,t){let r=ve.newInvalidDocument(t);return Pn(e).ee({index:Qi,range:IDBKeyRange.only(Is(t))},((s,i)=>{r=this.Cr(t,i)})).next((()=>r))}vr(e,t){let r={size:0,document:ve.newInvalidDocument(t)};return Pn(e).ee({index:Qi,range:IDBKeyRange.only(Is(t))},((s,i)=>{r={document:this.Cr(t,i),size:Ao(i)}})).next((()=>r))}getEntries(e,t){let r=rt();return this.Fr(e,t,((s,i)=>{const o=this.Cr(s,i);r=r.insert(s,o)})).next((()=>r))}Mr(e,t){let r=rt(),s=new pe(L.comparator);return this.Fr(e,t,((i,o)=>{const c=this.Cr(i,o);r=r.insert(i,c),s=s.insert(i,Ao(o))})).next((()=>({documents:r,Or:s})))}Fr(e,t,r){if(t.isEmpty())return T.resolve();let s=new ce(fd);t.forEach((l=>s=s.add(l)));const i=IDBKeyRange.bound(Is(s.first()),Is(s.last())),o=s.getIterator();let c=o.getNext();return Pn(e).ee({index:Qi,range:i},((l,h,f)=>{const p=L.fromSegments([...h.prefixPath,h.collectionGroup,h.documentId]);for(;c&&fd(c,p)<0;)r(c,null),c=o.getNext();c&&c.isEqual(p)&&(r(c,h),c=o.hasNext()?o.getNext():null),c?f.j(Is(c)):f.done()})).next((()=>{for(;c;)r(c,null),c=o.hasNext()?o.getNext():null}))}getDocumentsMatchingQuery(e,t,r,s,i){const o=t.path,c=[o.popLast().toArray(),o.lastSegment(),bo(r.readTime),r.documentKey.path.isEmpty()?"":r.documentKey.path.lastSegment()],l=[o.popLast().toArray(),o.lastSegment(),[Number.MAX_SAFE_INTEGER,Number.MAX_SAFE_INTEGER],""];return Pn(e).J(IDBKeyRange.bound(c,l,!0)).next((h=>{i?.incrementDocumentReadCount(h.length);let f=rt();for(const p of h){const g=this.Cr(L.fromSegments(p.prefixPath.concat(p.collectionGroup,p.documentId)),p);g.isFoundDocument()&&(di(t,g)||s.has(g.key))&&(f=f.insert(g.key,g))}return f}))}getAllFromCollectionGroup(e,t,r,s){let i=rt();const o=dd(t,r),c=dd(t,st.max());return Pn(e).ee({index:up,range:IDBKeyRange.bound(o,c,!0)},((l,h,f)=>{const p=this.Cr(L.fromSegments(h.prefixPath.concat(h.collectionGroup,h.documentId)),h);i=i.insert(p.key,p),i.size===s&&f.done()})).next((()=>i))}newChangeBuffer(e){return new Kw(this,!!e&&e.trackRemovals)}getSize(e){return this.getMetadata(e).next((t=>t.byteSize))}getMetadata(e){return hd(e).get(sc).next((t=>(G(!!t,20021),t)))}Dr(e,t){return hd(e).put(sc,t)}Cr(e,t){if(t){const r=Nw(this.serializer,t);if(!(r.isNoDocument()&&r.version.isEqual(H.min())))return r}return ve.newInvalidDocument(e)}}function Tm(n){return new Hw(n)}class Kw extends bm{constructor(e,t){super(),this.Nr=e,this.trackRemovals=t,this.Br=new qt((r=>r.toString()),((r,s)=>r.isEqual(s)))}applyChanges(e){const t=[];let r=0,s=new ce(((i,o)=>Q(i.canonicalString(),o.canonicalString())));return this.changes.forEach(((i,o)=>{const c=this.Br.get(i);if(t.push(this.Nr.removeEntry(e,i,c.readTime)),o.isValidDocument()){const l=Wh(this.Nr.serializer,o);s=s.add(i.path.popLast());const h=Ao(l);r+=h-c.size,t.push(this.Nr.addEntry(e,i,l))}else if(r-=c.size,this.trackRemovals){const l=Wh(this.Nr.serializer,o.convertToNoDocument(H.min()));t.push(this.Nr.addEntry(e,i,l))}})),s.forEach((i=>{t.push(this.Nr.indexManager.addToCollectionParentIndex(e,i))})),t.push(this.Nr.updateMetadata(e,r)),T.waitFor(t)}getFromCache(e,t){return this.Nr.vr(e,t).next((r=>(this.Br.set(t,{size:r.size,readTime:r.document.readTime}),r.document)))}getAllFromCache(e,t){return this.Nr.Mr(e,t).next((({documents:r,Or:s})=>(s.forEach(((i,o)=>{this.Br.set(i,{size:o,readTime:r.get(i).readTime})})),r)))}}function hd(n){return Pe(n,Qs)}function Pn(n){return Pe(n,mo)}function Is(n){const e=n.path.toArray();return[e.slice(0,e.length-2),e[e.length-2],e[e.length-1]]}function dd(n,e){const t=e.documentKey.path.toArray();return[n,bo(e.readTime),t.slice(0,t.length-2),t.length>0?t[t.length-1]:""]}function fd(n,e){const t=n.path.toArray(),r=e.path.toArray();let s=0;for(let i=0;i<t.length-2&&i<r.length-2;++i)if(s=Q(t[i],r[i]),s)return s;return s=Q(t.length,r.length),s||(s=Q(t[t.length-2],r[r.length-2]),s||Q(t[t.length-1],r[r.length-1]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ww{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next((s=>(r=s,this.remoteDocumentCache.getEntry(e,t)))).next((s=>(r!==null&&Us(r.mutation,s,Je.empty(),oe.now()),s)))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.getLocalViewOfDocuments(e,r,X()).next((()=>r))))}getLocalViewOfDocuments(e,t,r=X()){const s=It();return this.populateOverlays(e,s,t).next((()=>this.computeViews(e,t,s,r).next((i=>{let o=Ss();return i.forEach(((c,l)=>{o=o.insert(c,l.overlayedDocument)})),o}))))}getOverlayedDocuments(e,t){const r=It();return this.populateOverlays(e,r,t).next((()=>this.computeViews(e,t,r,X())))}populateOverlays(e,t,r){const s=[];return r.forEach((i=>{t.has(i)||s.push(i)})),this.documentOverlayCache.getOverlays(e,s).next((i=>{i.forEach(((o,c)=>{t.set(o,c)}))}))}computeViews(e,t,r,s){let i=rt();const o=Fs(),c=(function(){return Fs()})();return t.forEach(((l,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof zt)?i=i.insert(h.key,h):f!==void 0?(o.set(h.key,f.mutation.getFieldMask()),Us(f.mutation,h,f.mutation.getFieldMask(),oe.now())):o.set(h.key,Je.empty())})),this.recalculateAndSaveOverlays(e,i).next((l=>(l.forEach(((h,f)=>o.set(h,f))),t.forEach(((h,f)=>c.set(h,new Ww(f,o.get(h)??null)))),c)))}recalculateAndSaveOverlays(e,t){const r=Fs();let s=new pe(((o,c)=>o-c)),i=X();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next((o=>{for(const c of o)c.keys().forEach((l=>{const h=t.get(l);if(h===null)return;let f=r.get(l)||Je.empty();f=c.applyToLocalView(h,f),r.set(l,f);const p=(s.get(c.batchId)||X()).add(l);s=s.insert(c.batchId,p)}))})).next((()=>{const o=[],c=s.getReverseIterator();for(;c.hasNext();){const l=c.getNext(),h=l.key,f=l.value,p=$p();f.forEach((g=>{if(!i.has(g)){const w=Wp(t.get(g),r.get(g));w!==null&&p.set(g,w),i=i.add(g)}})),o.push(this.documentOverlayCache.saveOverlays(e,h,p))}return T.waitFor(o)})).next((()=>r))}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next((r=>this.recalculateAndSaveOverlays(e,r)))}getDocumentsMatchingQuery(e,t,r,s){return(function(o){return L.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0})(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Lp(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next((i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-i.size):T.resolve(It());let c=Gs,l=i;return o.next((h=>T.forEach(h,((f,p)=>(c<p.largestBatchId&&(c=p.largestBatchId),i.get(f)?T.resolve():this.remoteDocumentCache.getEntry(e,f).next((g=>{l=l.insert(f,g)}))))).next((()=>this.populateOverlays(e,h,i))).next((()=>this.computeViews(e,l,h,X()))).next((f=>({batchId:c,changes:Bp(f)})))))}))}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new L(t)).next((r=>{let s=Ss();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s}))}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const i=t.collectionGroup;let o=Ss();return this.indexManager.getCollectionParents(e,i).next((c=>T.forEach(c,(l=>{const h=(function(p,g){return new hi(g,null,p.explicitOrderBy.slice(),p.filters.slice(),p.limit,p.limitType,p.startAt,p.endAt)})(t,l.child(i));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next((f=>{f.forEach(((p,g)=>{o=o.insert(p,g)}))}))})).next((()=>o))))}getDocumentsMatchingCollectionQuery(e,t,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next((o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,i,s)))).next((o=>{i.forEach(((l,h)=>{const f=h.getKey();o.get(f)===null&&(o=o.insert(f,ve.newInvalidDocument(f)))}));let c=Ss();return o.forEach(((l,h)=>{const f=i.get(l);f!==void 0&&Us(f.mutation,h,Je.empty(),oe.now()),di(t,h)&&(c=c.insert(l,h))})),c}))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qw{constructor(e){this.serializer=e,this.Lr=new Map,this.kr=new Map}getBundleMetadata(e,t){return T.resolve(this.Lr.get(t))}saveBundleMetadata(e,t){return this.Lr.set(t.id,(function(s){return{id:s.id,version:s.version,createTime:We(s.createTime)}})(t)),T.resolve()}getNamedQuery(e,t){return T.resolve(this.kr.get(t))}saveNamedQuery(e,t){return this.kr.set(t.name,(function(s){return{name:s.name,query:fm(s.bundledQuery),readTime:We(s.readTime)}})(t)),T.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yw{constructor(){this.overlays=new pe(L.comparator),this.qr=new Map}getOverlay(e,t){return T.resolve(this.overlays.get(t))}getOverlays(e,t){const r=It();return T.forEach(t,(s=>this.getOverlay(e,s).next((i=>{i!==null&&r.set(s,i)})))).next((()=>r))}saveOverlays(e,t,r){return r.forEach(((s,i)=>{this.St(e,t,i)})),T.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.qr.get(r);return s!==void 0&&(s.forEach((i=>this.overlays=this.overlays.remove(i))),this.qr.delete(r)),T.resolve()}getOverlaysForCollection(e,t,r){const s=It(),i=t.length+1,o=new L(t.child("")),c=this.overlays.getIteratorFrom(o);for(;c.hasNext();){const l=c.getNext().value,h=l.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===i&&l.largestBatchId>r&&s.set(l.getKey(),l)}return T.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let i=new pe(((h,f)=>h-f));const o=this.overlays.getIterator();for(;o.hasNext();){const h=o.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=i.get(h.largestBatchId);f===null&&(f=It(),i=i.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=It(),l=i.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach(((h,f)=>c.set(h,f))),!(c.size()>=s)););return T.resolve(c)}St(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.qr.get(s.largestBatchId).delete(r.key);this.qr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new al(t,r));let i=this.qr.get(t);i===void 0&&(i=X(),this.qr.set(t,i)),this.qr.set(t,i.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jw{constructor(){this.sessionToken=Te.EMPTY_BYTE_STRING}getSessionToken(e){return T.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,T.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dl{constructor(){this.Qr=new ce(De.$r),this.Ur=new ce(De.Kr)}isEmpty(){return this.Qr.isEmpty()}addReference(e,t){const r=new De(e,t);this.Qr=this.Qr.add(r),this.Ur=this.Ur.add(r)}Wr(e,t){e.forEach((r=>this.addReference(r,t)))}removeReference(e,t){this.Gr(new De(e,t))}zr(e,t){e.forEach((r=>this.removeReference(r,t)))}jr(e){const t=new L(new se([])),r=new De(t,e),s=new De(t,e+1),i=[];return this.Ur.forEachInRange([r,s],(o=>{this.Gr(o),i.push(o.key)})),i}Jr(){this.Qr.forEach((e=>this.Gr(e)))}Gr(e){this.Qr=this.Qr.delete(e),this.Ur=this.Ur.delete(e)}Hr(e){const t=new L(new se([])),r=new De(t,e),s=new De(t,e+1);let i=X();return this.Ur.forEachInRange([r,s],(o=>{i=i.add(o.key)})),i}containsKey(e){const t=new De(e,0),r=this.Qr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class De{constructor(e,t){this.key=e,this.Yr=t}static $r(e,t){return L.comparator(e.key,t.key)||Q(e.Yr,t.Yr)}static Kr(e,t){return Q(e.Yr,t.Yr)||L.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xw{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.tr=1,this.Zr=new ce(De.$r)}checkEmpty(e){return T.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const i=this.tr;this.tr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new il(i,t,r,s);this.mutationQueue.push(o);for(const c of s)this.Zr=this.Zr.add(new De(c.key,i)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return T.resolve(o)}lookupMutationBatch(e,t){return T.resolve(this.Xr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.ei(r),i=s<0?0:s;return T.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return T.resolve(this.mutationQueue.length===0?Fn:this.tr-1)}getAllMutationBatches(e){return T.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new De(t,0),s=new De(t,Number.POSITIVE_INFINITY),i=[];return this.Zr.forEachInRange([r,s],(o=>{const c=this.Xr(o.Yr);i.push(c)})),T.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ce(Q);return t.forEach((s=>{const i=new De(s,0),o=new De(s,Number.POSITIVE_INFINITY);this.Zr.forEachInRange([i,o],(c=>{r=r.add(c.Yr)}))})),T.resolve(this.ti(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let i=r;L.isDocumentKey(i)||(i=i.child(""));const o=new De(new L(i),0);let c=new ce(Q);return this.Zr.forEachWhile((l=>{const h=l.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(l.Yr)),!0)}),o),T.resolve(this.ti(c))}ti(e){const t=[];return e.forEach((r=>{const s=this.Xr(r);s!==null&&t.push(s)})),t}removeMutationBatch(e,t){G(this.ni(t.batchId,"removed")===0,55003),this.mutationQueue.shift();let r=this.Zr;return T.forEach(t.mutations,(s=>{const i=new De(s.key,t.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)})).next((()=>{this.Zr=r}))}ir(e){}containsKey(e,t){const r=new De(t,0),s=this.Zr.firstAfterOrEqual(r);return T.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,T.resolve()}ni(e,t){return this.ei(e)}ei(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Xr(e){const t=this.ei(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zw{constructor(e){this.ri=e,this.docs=(function(){return new pe(L.comparator)})(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),i=s?s.size:0,o=this.ri(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return T.resolve(r?r.document.mutableCopy():ve.newInvalidDocument(t))}getEntries(e,t){let r=rt();return t.forEach((s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():ve.newInvalidDocument(s))})),T.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let i=rt();const o=t.path,c=new L(o.child("__id-9223372036854775808__")),l=this.docs.getIteratorFrom(c);for(;l.hasNext();){const{key:h,value:{document:f}}=l.getNext();if(!o.isPrefixOf(h.path))break;h.path.length>o.length+1||Wc(ip(f),r)<=0||(s.has(f.key)||di(t,f))&&(i=i.insert(f.key,f.mutableCopy()))}return T.resolve(i)}getAllFromCollectionGroup(e,t,r,s){B(9500)}ii(e,t){return T.forEach(this.docs,(r=>t(r)))}newChangeBuffer(e){return new eb(this)}getSize(e){return T.resolve(this.size)}}class eb extends bm{constructor(e){super(),this.Nr=e}applyChanges(e){const t=[];return this.changes.forEach(((r,s)=>{s.isValidDocument()?t.push(this.Nr.addEntry(e,s)):this.Nr.removeEntry(r)})),T.waitFor(t)}getFromCache(e,t){return this.Nr.getEntry(e,t)}getAllFromCache(e,t){return this.Nr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tb{constructor(e){this.persistence=e,this.si=new qt((t=>Wn(t)),ui),this.lastRemoteSnapshotVersion=H.min(),this.highestTargetId=0,this.oi=0,this._i=new dl,this.targetCount=0,this.ai=Jn.ur()}forEachTarget(e,t){return this.si.forEach(((r,s)=>t(s))),T.resolve()}getLastRemoteSnapshotVersion(e){return T.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return T.resolve(this.oi)}allocateTargetId(e){return this.highestTargetId=this.ai.next(),T.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.oi&&(this.oi=t),T.resolve()}Pr(e){this.si.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.ai=new Jn(t),this.highestTargetId=t),e.sequenceNumber>this.oi&&(this.oi=e.sequenceNumber)}addTargetData(e,t){return this.Pr(t),this.targetCount+=1,T.resolve()}updateTargetData(e,t){return this.Pr(t),T.resolve()}removeTargetData(e,t){return this.si.delete(t.target),this._i.jr(t.targetId),this.targetCount-=1,T.resolve()}removeTargets(e,t,r){let s=0;const i=[];return this.si.forEach(((o,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.si.delete(o),i.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)})),T.waitFor(i).next((()=>s))}getTargetCount(e){return T.resolve(this.targetCount)}getTargetData(e,t){const r=this.si.get(t)||null;return T.resolve(r)}addMatchingKeys(e,t,r){return this._i.Wr(t,r),T.resolve()}removeMatchingKeys(e,t,r){this._i.zr(t,r);const s=this.persistence.referenceDelegate,i=[];return s&&t.forEach((o=>{i.push(s.markPotentiallyOrphaned(e,o))})),T.waitFor(i)}removeMatchingKeysForTargetId(e,t){return this._i.jr(t),T.resolve()}getMatchingKeysForTargetId(e,t){const r=this._i.Hr(t);return T.resolve(r)}containsKey(e,t){return T.resolve(this._i.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fl{constructor(e,t){this.ui={},this.overlays={},this.ci=new at(0),this.li=!1,this.li=!0,this.hi=new Jw,this.referenceDelegate=e(this),this.Pi=new tb(this),this.indexManager=new Bw,this.remoteDocumentCache=(function(s){return new Zw(s)})((r=>this.referenceDelegate.Ti(r))),this.serializer=new hm(t),this.Ii=new Qw(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.li=!1,Promise.resolve()}get started(){return this.li}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new Yw,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.ui[e.toKey()];return r||(r=new Xw(t,this.referenceDelegate),this.ui[e.toKey()]=r),r}getGlobalsCache(){return this.hi}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Ii}runTransaction(e,t,r){k("MemoryPersistence","Starting transaction:",e);const s=new nb(this.ci.next());return this.referenceDelegate.Ei(),r(s).next((i=>this.referenceDelegate.di(s).next((()=>i)))).toPromise().then((i=>(s.raiseOnCommittedEvent(),i)))}Ai(e,t){return T.or(Object.values(this.ui).map((r=>()=>r.containsKey(e,t))))}}class nb extends ap{constructor(e){super(),this.currentSequenceNumber=e}}class Xo{constructor(e){this.persistence=e,this.Ri=new dl,this.Vi=null}static mi(e){return new Xo(e)}get fi(){if(this.Vi)return this.Vi;throw B(60996)}addReference(e,t,r){return this.Ri.addReference(r,t),this.fi.delete(r.toString()),T.resolve()}removeReference(e,t,r){return this.Ri.removeReference(r,t),this.fi.add(r.toString()),T.resolve()}markPotentiallyOrphaned(e,t){return this.fi.add(t.toString()),T.resolve()}removeTarget(e,t){this.Ri.jr(t.targetId).forEach((s=>this.fi.add(s.toString())));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next((s=>{s.forEach((i=>this.fi.add(i.toString())))})).next((()=>r.removeTargetData(e,t)))}Ei(){this.Vi=new Set}di(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return T.forEach(this.fi,(r=>{const s=L.fromPath(r);return this.gi(e,s).next((i=>{i||t.removeEntry(s,H.min())}))})).next((()=>(this.Vi=null,t.apply(e))))}updateLimboDocument(e,t){return this.gi(e,t).next((r=>{r?this.fi.delete(t.toString()):this.fi.add(t.toString())}))}Ti(e){return 0}gi(e,t){return T.or([()=>T.resolve(this.Ri.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Ai(e,t)])}}class So{constructor(e,t){this.persistence=e,this.pi=new qt((r=>$e(r.path)),((r,s)=>r.isEqual(s))),this.garbageCollector=wm(this,t)}static mi(e,t){return new So(e,t)}Ei(){}di(e){return T.resolve()}forEachTarget(e,t){return this.persistence.getTargetCache().forEachTarget(e,t)}gr(e){const t=this.wr(e);return this.persistence.getTargetCache().getTargetCount(e).next((r=>t.next((s=>r+s))))}wr(e){let t=0;return this.pr(e,(r=>{t++})).next((()=>t))}pr(e,t){return T.forEach(this.pi,((r,s)=>this.br(e,r,s).next((i=>i?T.resolve():t(s)))))}removeTargets(e,t,r){return this.persistence.getTargetCache().removeTargets(e,t,r)}removeOrphanedDocuments(e,t){let r=0;const s=this.persistence.getRemoteDocumentCache(),i=s.newChangeBuffer();return s.ii(e,(o=>this.br(e,o,t).next((c=>{c||(r++,i.removeEntry(o,H.min()))})))).next((()=>i.apply(e))).next((()=>r))}markPotentiallyOrphaned(e,t){return this.pi.set(t,e.currentSequenceNumber),T.resolve()}removeTarget(e,t){const r=t.withSequenceNumber(e.currentSequenceNumber);return this.persistence.getTargetCache().updateTargetData(e,r)}addReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),T.resolve()}removeReference(e,t,r){return this.pi.set(r,e.currentSequenceNumber),T.resolve()}updateLimboDocument(e,t){return this.pi.set(t,e.currentSequenceNumber),T.resolve()}Ti(e){let t=e.key.toString().length;return e.isFoundDocument()&&(t+=Ji(e.data.value)),t}br(e,t,r){return T.or([()=>this.persistence.Ai(e,t),()=>this.persistence.getTargetCache().containsKey(e,t),()=>{const s=this.pi.get(t);return T.resolve(s!==void 0&&s>r)}])}getCacheSize(e){return this.persistence.getRemoteDocumentCache().getSize(e)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rb{constructor(e){this.serializer=e}k(e,t,r,s){const i=new Mo("createOrUpgrade",t);r<1&&s>=1&&((function(l){l.createObjectStore(li)})(e),(function(l){l.createObjectStore(Ws,{keyPath:mI}),l.createObjectStore(ut,{keyPath:Th,autoIncrement:!0}).createIndex(Mn,Ah,{unique:!0}),l.createObjectStore(kr)})(e),pd(e),(function(l){l.createObjectStore(Vn)})(e));let o=T.resolve();return r<3&&s>=3&&(r!==0&&((function(l){l.deleteObjectStore(Or),l.deleteObjectStore(xr),l.deleteObjectStore(Un)})(e),pd(e)),o=o.next((()=>(function(l){const h=l.store(Un),f={highestTargetId:0,highestListenSequenceNumber:0,lastRemoteSnapshotVersion:H.min().toTimestamp(),targetCount:0};return h.put(go,f)})(i)))),r<4&&s>=4&&(r!==0&&(o=o.next((()=>(function(l,h){return h.store(ut).J().next((p=>{l.deleteObjectStore(ut),l.createObjectStore(ut,{keyPath:Th,autoIncrement:!0}).createIndex(Mn,Ah,{unique:!0});const g=h.store(ut),w=p.map((A=>g.put(A)));return T.waitFor(w)}))})(e,i)))),o=o.next((()=>{(function(l){l.createObjectStore(Lr,{keyPath:TI})})(e)}))),r<5&&s>=5&&(o=o.next((()=>this.yi(i)))),r<6&&s>=6&&(o=o.next((()=>((function(l){l.createObjectStore(Qs)})(e),this.wi(i))))),r<7&&s>=7&&(o=o.next((()=>this.Si(i)))),r<8&&s>=8&&(o=o.next((()=>this.bi(e,i)))),r<9&&s>=9&&(o=o.next((()=>{(function(l){l.objectStoreNames.contains("remoteDocumentChanges")&&l.deleteObjectStore("remoteDocumentChanges")})(e)}))),r<10&&s>=10&&(o=o.next((()=>this.Di(i)))),r<11&&s>=11&&(o=o.next((()=>{(function(l){l.createObjectStore(Uo,{keyPath:AI})})(e),(function(l){l.createObjectStore(Bo,{keyPath:SI})})(e)}))),r<12&&s>=12&&(o=o.next((()=>{(function(l){const h=l.createObjectStore($o,{keyPath:kI});h.createIndex(oc,xI,{unique:!1}),h.createIndex(pp,OI,{unique:!1})})(e)}))),r<13&&s>=13&&(o=o.next((()=>(function(l){const h=l.createObjectStore(mo,{keyPath:_I});h.createIndex(Qi,yI),h.createIndex(up,vI)})(e))).next((()=>this.Ci(e,i))).next((()=>e.deleteObjectStore(Vn)))),r<14&&s>=14&&(o=o.next((()=>this.Fi(e,i)))),r<15&&s>=15&&(o=o.next((()=>(function(l){l.createObjectStore(Jc,{keyPath:PI,autoIncrement:!0}).createIndex(ic,RI,{unique:!1}),l.createObjectStore(xs,{keyPath:CI}).createIndex(dp,DI,{unique:!1}),l.createObjectStore(Os,{keyPath:VI}).createIndex(fp,NI,{unique:!1})})(e)))),r<16&&s>=16&&(o=o.next((()=>{t.objectStore(xs).clear()})).next((()=>{t.objectStore(Os).clear()}))),r<17&&s>=17&&(o=o.next((()=>{(function(l){l.createObjectStore(Xc,{keyPath:LI})})(e)}))),r<18&&s>=18&&lf()&&(o=o.next((()=>{t.objectStore(xs).clear()})).next((()=>{t.objectStore(Os).clear()}))),o}wi(e){let t=0;return e.store(Vn).ee(((r,s)=>{t+=Ao(s)})).next((()=>{const r={byteSize:t};return e.store(Qs).put(sc,r)}))}yi(e){const t=e.store(Ws),r=e.store(ut);return t.J().next((s=>T.forEach(s,(i=>{const o=IDBKeyRange.bound([i.userId,Fn],[i.userId,i.lastAcknowledgedBatchId]);return r.J(Mn,o).next((c=>T.forEach(c,(l=>{G(l.userId===i.userId,18650,"Cannot process batch from unexpected user",{batchId:l.batchId});const h=xn(this.serializer,l);return _m(e,i.userId,h).next((()=>{}))}))))}))))}Si(e){const t=e.store(Or),r=e.store(Vn);return e.store(Un).get(go).next((s=>{const i=[];return r.ee(((o,c)=>{const l=new se(o),h=(function(p){return[0,$e(p)]})(l);i.push(t.get(h).next((f=>f?T.resolve():(p=>t.put({targetId:0,path:$e(p),sequenceNumber:s.highestListenSequenceNumber}))(l))))})).next((()=>T.waitFor(i)))}))}bi(e,t){e.createObjectStore(Ys,{keyPath:bI});const r=t.store(Ys),s=new hl,i=o=>{if(s.add(o)){const c=o.lastSegment(),l=o.popLast();return r.put({collectionId:c,parent:$e(l)})}};return t.store(Vn).ee({X:!0},((o,c)=>{const l=new se(o);return i(l.popLast())})).next((()=>t.store(kr).ee({X:!0},(([o,c,l],h)=>{const f=Et(c);return i(f.popLast())}))))}Di(e){const t=e.store(xr);return t.ee(((r,s)=>{const i=Rs(s),o=dm(this.serializer,i);return t.put(o)}))}Ci(e,t){const r=t.store(Vn),s=[];return r.ee(((i,o)=>{const c=t.store(mo),l=(function(p){return p.document?new L(se.fromString(p.document.name).popFirst(5)):p.noDocument?L.fromSegments(p.noDocument.path):p.unknownDocument?L.fromSegments(p.unknownDocument.path):B(36783)})(o).path.toArray(),h={prefixPath:l.slice(0,l.length-2),collectionGroup:l[l.length-2],documentId:l[l.length-1],readTime:o.readTime||[0,0],unknownDocument:o.unknownDocument,noDocument:o.noDocument,document:o.document,hasCommittedMutations:!!o.hasCommittedMutations};s.push(c.put(h))})).next((()=>T.waitFor(s)))}Fi(e,t){const r=t.store(ut),s=Tm(this.serializer),i=new fl(Xo.mi,this.serializer.yt);return r.J().next((o=>{const c=new Map;return o.forEach((l=>{let h=c.get(l.userId)??X();xn(this.serializer,l).keys().forEach((f=>h=h.add(f))),c.set(l.userId,h)})),T.forEach(c,((l,h)=>{const f=new He(h),p=Yo.wt(this.serializer,f),g=i.getIndexManager(f),w=Jo.wt(f,this.serializer,g,i.referenceDelegate);return new Am(s,w,p,g).recalculateAndSaveOverlaysForDocumentKeys(new ac(t,at.ce),l).next()}))}))}}function pd(n){n.createObjectStore(Or,{keyPath:II}).createIndex(Yc,wI,{unique:!0}),n.createObjectStore(xr,{keyPath:"targetId"}).createIndex(hp,EI,{unique:!0}),n.createObjectStore(Un)}const Zt="IndexedDbPersistence",Fa=18e5,Ua=5e3,Ba="Failed to obtain exclusive access to the persistence layer. To allow shared access, multi-tab synchronization has to be enabled in all tabs. If you are using `experimentalForceOwningTab:true`, make sure that only one tab has persistence enabled at any given time.",sb="main";class pl{constructor(e,t,r,s,i,o,c,l,h,f,p=18){if(this.allowTabSynchronization=e,this.persistenceKey=t,this.clientId=r,this.Mi=i,this.window=o,this.document=c,this.xi=h,this.Oi=f,this.Ni=p,this.ci=null,this.li=!1,this.isPrimary=!1,this.networkEnabled=!0,this.Bi=null,this.inForeground=!1,this.Li=null,this.ki=null,this.qi=Number.NEGATIVE_INFINITY,this.Qi=g=>Promise.resolve(),!pl.v())throw new x(C.UNIMPLEMENTED,"This platform is either missing IndexedDB or is known to have an incomplete implementation. Offline persistence has been disabled.");this.referenceDelegate=new Gw(this,s),this.$i=t+sb,this.serializer=new hm(l),this.Ui=new dn(this.$i,this.Ni,new rb(this.serializer)),this.hi=new xw,this.Pi=new qw(this.referenceDelegate,this.serializer),this.remoteDocumentCache=Tm(this.serializer),this.Ii=new kw,this.window&&this.window.localStorage?this.Ki=this.window.localStorage:(this.Ki=null,f===!1&&Ke(Zt,"LocalStorage is unavailable. As a result, persistence may not work reliably. In particular enablePersistence() could fail immediately after refreshing the page."))}start(){return this.Wi().then((()=>{if(!this.isPrimary&&!this.allowTabSynchronization)throw new x(C.FAILED_PRECONDITION,Ba);return this.Gi(),this.zi(),this.ji(),this.runTransaction("getHighestListenSequenceNumber","readonly",(e=>this.Pi.getHighestSequenceNumber(e)))})).then((e=>{this.ci=new at(e,this.xi)})).then((()=>{this.li=!0})).catch((e=>(this.Ui&&this.Ui.close(),Promise.reject(e))))}Ji(e){return this.Qi=async t=>{if(this.started)return e(t)},e(this.isPrimary)}setDatabaseDeletedListener(e){this.Ui.$((async t=>{t.newVersion===null&&await e()}))}setNetworkEnabled(e){this.networkEnabled!==e&&(this.networkEnabled=e,this.Mi.enqueueAndForget((async()=>{this.started&&await this.Wi()})))}Wi(){return this.runTransaction("updateClientMetadataAndTryBecomePrimary","readwrite",(e=>Fi(e).put({clientId:this.clientId,updateTimeMs:Date.now(),networkEnabled:this.networkEnabled,inForeground:this.inForeground}).next((()=>{if(this.isPrimary)return this.Hi(e).next((t=>{t||(this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))))}))})).next((()=>this.Yi(e))).next((t=>this.isPrimary&&!t?this.Zi(e).next((()=>!1)):!!t&&this.Xi(e).next((()=>!0)))))).catch((e=>{if(vn(e))return k(Zt,"Failed to extend owner lease: ",e),this.isPrimary;if(!this.allowTabSynchronization)throw e;return k(Zt,"Releasing owner lease after error during lease refresh",e),!1})).then((e=>{this.isPrimary!==e&&this.Mi.enqueueRetryable((()=>this.Qi(e))),this.isPrimary=e}))}Hi(e){return ws(e).get(cr).next((t=>T.resolve(this.es(t))))}ts(e){return Fi(e).delete(this.clientId)}async ns(){if(this.isPrimary&&!this.rs(this.qi,Fa)){this.qi=Date.now();const e=await this.runTransaction("maybeGarbageCollectMultiClientState","readwrite-primary",(t=>{const r=Pe(t,Lr);return r.J().next((s=>{const i=this.ss(s,Fa),o=s.filter((c=>i.indexOf(c)===-1));return T.forEach(o,(c=>r.delete(c.clientId))).next((()=>o))}))})).catch((()=>[]));if(this.Ki)for(const t of e)this.Ki.removeItem(this._s(t.clientId))}}ji(){this.ki=this.Mi.enqueueAfterDelay("client_metadata_refresh",4e3,(()=>this.Wi().then((()=>this.ns())).then((()=>this.ji()))))}es(e){return!!e&&e.ownerId===this.clientId}Yi(e){return this.Oi?T.resolve(!0):ws(e).get(cr).next((t=>{if(t!==null&&this.rs(t.leaseTimestampMs,Ua)&&!this.us(t.ownerId)){if(this.es(t)&&this.networkEnabled)return!0;if(!this.es(t)){if(!t.allowTabSynchronization)throw new x(C.FAILED_PRECONDITION,Ba);return!1}}return!(!this.networkEnabled||!this.inForeground)||Fi(e).J().next((r=>this.ss(r,Ua).find((s=>{if(this.clientId!==s.clientId){const i=!this.networkEnabled&&s.networkEnabled,o=!this.inForeground&&s.inForeground,c=this.networkEnabled===s.networkEnabled;if(i||o&&c)return!0}return!1}))===void 0))})).next((t=>(this.isPrimary!==t&&k(Zt,`Client ${t?"is":"is not"} eligible for a primary lease.`),t)))}async shutdown(){this.li=!1,this.cs(),this.ki&&(this.ki.cancel(),this.ki=null),this.ls(),this.hs(),await this.Ui.runTransaction("shutdown","readwrite",[li,Lr],(e=>{const t=new ac(e,at.ce);return this.Zi(t).next((()=>this.ts(t)))})),this.Ui.close(),this.Ps()}ss(e,t){return e.filter((r=>this.rs(r.updateTimeMs,t)&&!this.us(r.clientId)))}Ts(){return this.runTransaction("getActiveClients","readonly",(e=>Fi(e).J().next((t=>this.ss(t,Fa).map((r=>r.clientId))))))}get started(){return this.li}getGlobalsCache(){return this.hi}getMutationQueue(e,t){return Jo.wt(e,this.serializer,t,this.referenceDelegate)}getTargetCache(){return this.Pi}getRemoteDocumentCache(){return this.remoteDocumentCache}getIndexManager(e){return new $w(e,this.serializer.yt.databaseId)}getDocumentOverlayCache(e){return Yo.wt(this.serializer,e)}getBundleCache(){return this.Ii}runTransaction(e,t,r){k(Zt,"Starting transaction:",e);const s=t==="readonly"?"readonly":"readwrite",i=(function(l){return l===18?UI:l===17?yp:l===16?FI:l===15?Zc:l===14?_p:l===13?gp:l===12?MI:l===11?mp:void B(60245)})(this.Ni);let o;return this.Ui.runTransaction(e,s,i,(c=>(o=new ac(c,this.ci?this.ci.next():at.ce),t==="readwrite-primary"?this.Hi(o).next((l=>!!l||this.Yi(o))).next((l=>{if(!l)throw Ke(`Failed to obtain primary lease for action '${e}'.`),this.isPrimary=!1,this.Mi.enqueueRetryable((()=>this.Qi(!1))),new x(C.FAILED_PRECONDITION,op);return r(o)})).next((l=>this.Xi(o).next((()=>l)))):this.Is(o).next((()=>r(o)))))).then((c=>(o.raiseOnCommittedEvent(),c)))}Is(e){return ws(e).get(cr).next((t=>{if(t!==null&&this.rs(t.leaseTimestampMs,Ua)&&!this.us(t.ownerId)&&!this.es(t)&&!(this.Oi||this.allowTabSynchronization&&t.allowTabSynchronization))throw new x(C.FAILED_PRECONDITION,Ba)}))}Xi(e){const t={ownerId:this.clientId,allowTabSynchronization:this.allowTabSynchronization,leaseTimestampMs:Date.now()};return ws(e).put(cr,t)}static v(){return dn.v()}Zi(e){const t=ws(e);return t.get(cr).next((r=>this.es(r)?(k(Zt,"Releasing primary lease."),t.delete(cr)):T.resolve()))}rs(e,t){const r=Date.now();return!(e<r-t)&&(!(e>r)||(Ke(`Detected an update time that is in the future: ${e} > ${r}`),!1))}Gi(){this.document!==null&&typeof this.document.addEventListener=="function"&&(this.Li=()=>{this.Mi.enqueueAndForget((()=>(this.inForeground=this.document.visibilityState==="visible",this.Wi())))},this.document.addEventListener("visibilitychange",this.Li),this.inForeground=this.document.visibilityState==="visible")}ls(){this.Li&&(this.document.removeEventListener("visibilitychange",this.Li),this.Li=null)}zi(){typeof this.window?.addEventListener=="function"&&(this.Bi=()=>{this.cs();const e=/(?:Version|Mobile)\/1[456]/;cf()&&(navigator.appVersion.match(e)||navigator.userAgent.match(e))&&this.Mi.enterRestrictedMode(!0),this.Mi.enqueueAndForget((()=>this.shutdown()))},this.window.addEventListener("pagehide",this.Bi))}hs(){this.Bi&&(this.window.removeEventListener("pagehide",this.Bi),this.Bi=null)}us(e){try{const t=this.Ki?.getItem(this._s(e))!==null;return k(Zt,`Client '${e}' ${t?"is":"is not"} zombied in LocalStorage`),t}catch(t){return Ke(Zt,"Failed to get zombied client id.",t),!1}}cs(){if(this.Ki)try{this.Ki.setItem(this._s(this.clientId),String(Date.now()))}catch(e){Ke("Failed to set zombie client id.",e)}}Ps(){if(this.Ki)try{this.Ki.removeItem(this._s(this.clientId))}catch{}}_s(e){return`firestore_zombie_${this.persistenceKey}_${e}`}}function ws(n){return Pe(n,li)}function Fi(n){return Pe(n,Lr)}function ib(n,e){let t=n.projectId;return n.isDefaultDatabase||(t+="."+n.database),"firestore/"+e+"/"+t+"/"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ml{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.Es=r,this.ds=s}static As(e,t){let r=X(),s=X();for(const i of t.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new ml(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ob{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(){this.Rs=!1,this.Vs=!1,this.fs=100,this.gs=(function(){return cf()?8:cp(Se())>0?6:4})()}initialize(e,t){this.ps=e,this.indexManager=t,this.Rs=!0}getDocumentsMatchingQuery(e,t,r,s){const i={result:null};return this.ys(e,t).next((o=>{i.result=o})).next((()=>{if(!i.result)return this.ws(e,t,s,r).next((o=>{i.result=o}))})).next((()=>{if(i.result)return;const o=new ob;return this.Ss(e,t,o).next((c=>{if(i.result=c,this.Vs)return this.bs(e,t,o,c.size)}))})).next((()=>i.result))}bs(e,t,r,s){return r.documentReadCount<this.fs?(mr()<=Z.DEBUG&&k("QueryEngine","SDK will not create cache indexes for query:",gr(t),"since it only creates cache indexes for collection contains","more than or equal to",this.fs,"documents"),T.resolve()):(mr()<=Z.DEBUG&&k("QueryEngine","Query:",gr(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.gs*s?(mr()<=Z.DEBUG&&k("QueryEngine","The SDK decides to create cache indexes for query:",gr(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,ct(t))):T.resolve())}ys(e,t){if(Fh(t))return T.resolve(null);let r=ct(t);return this.indexManager.getIndexType(e,r).next((s=>s===0?null:(t.limit!==null&&s===1&&(t=pc(t,null,"F"),r=ct(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next((i=>{const o=X(...i);return this.ps.getDocuments(e,o).next((c=>this.indexManager.getMinOffset(e,r).next((l=>{const h=this.Ds(t,c);return this.Cs(t,h,o,l.readTime)?this.ys(e,pc(t,null,"F")):this.vs(e,h,t,l)}))))})))))}ws(e,t,r,s){return Fh(t)||s.isEqual(H.min())?T.resolve(null):this.ps.getDocuments(e,r).next((i=>{const o=this.Ds(t,i);return this.Cs(t,o,r,s)?T.resolve(null):(mr()<=Z.DEBUG&&k("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),gr(t)),this.vs(e,o,t,cI(s,Gs)).next((c=>c)))}))}Ds(e,t){let r=new ce(Fp(e));return t.forEach(((s,i)=>{di(e,i)&&(r=r.add(i))})),r}Cs(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const i=e.limitType==="F"?t.last():t.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Ss(e,t,r){return mr()<=Z.DEBUG&&k("QueryEngine","Using full collection scan to execute query:",gr(t)),this.ps.getDocumentsMatchingQuery(e,t,st.min(),r)}vs(e,t,r,s){return this.ps.getDocumentsMatchingQuery(e,r,s).next((i=>(t.forEach((o=>{i=i.insert(o.key,o)})),i)))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl="LocalStore",ab=3e8;class cb{constructor(e,t,r,s){this.persistence=e,this.Fs=t,this.serializer=s,this.Ms=new pe(Q),this.xs=new qt((i=>Wn(i)),ui),this.Os=new Map,this.Ns=e.getRemoteDocumentCache(),this.Pi=e.getTargetCache(),this.Ii=e.getBundleCache(),this.Bs(r)}Bs(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Am(this.Ns,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.Ns.setIndexManager(this.indexManager),this.Fs.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",(t=>e.collect(t,this.Ms)))}}function Pm(n,e,t,r){return new cb(n,e,t,r)}async function Rm(n,e){const t=Y(n);return await t.persistence.runTransaction("Handle user change","readonly",(r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next((i=>(s=i,t.Bs(e),t.mutationQueue.getAllMutationBatches(r)))).next((i=>{const o=[],c=[];let l=X();for(const h of s){o.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}for(const h of i){c.push(h.batchId);for(const f of h.mutations)l=l.add(f.key)}return t.localDocuments.getDocuments(r,l).next((h=>({Ls:h,removedBatchIds:o,addedBatchIds:c})))}))}))}function lb(n,e){const t=Y(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",(r=>{const s=e.batch.keys(),i=t.Ns.newChangeBuffer({trackRemovals:!0});return(function(c,l,h,f){const p=h.batch,g=p.keys();let w=T.resolve();return g.forEach((A=>{w=w.next((()=>f.getEntry(l,A))).next((V=>{const D=h.docVersions.get(A);G(D!==null,48541),V.version.compareTo(D)<0&&(p.applyToRemoteDocument(V,h),V.isValidDocument()&&(V.setReadTime(h.commitVersion),f.addEntry(V)))}))})),w.next((()=>c.mutationQueue.removeMutationBatch(l,p)))})(t,r,e,i).next((()=>i.apply(r))).next((()=>t.mutationQueue.performConsistencyCheck(r))).next((()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId))).next((()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,(function(c){let l=X();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(l=l.add(c.batch.mutations[h].key));return l})(e)))).next((()=>t.localDocuments.getDocuments(r,s)))}))}function Cm(n){const e=Y(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",(t=>e.Pi.getLastRemoteSnapshotVersion(t)))}function ub(n,e){const t=Y(n),r=e.snapshotVersion;let s=t.Ms;return t.persistence.runTransaction("Apply remote event","readwrite-primary",(i=>{const o=t.Ns.newChangeBuffer({trackRemovals:!0});s=t.Ms;const c=[];e.targetChanges.forEach(((f,p)=>{const g=s.get(p);if(!g)return;c.push(t.Pi.removeMatchingKeys(i,f.removedDocuments,p).next((()=>t.Pi.addMatchingKeys(i,f.addedDocuments,p))));let w=g.withSequenceNumber(i.currentSequenceNumber);e.targetMismatches.get(p)!==null?w=w.withResumeToken(Te.EMPTY_BYTE_STRING,H.min()).withLastLimboFreeSnapshotVersion(H.min()):f.resumeToken.approximateByteSize()>0&&(w=w.withResumeToken(f.resumeToken,r)),s=s.insert(p,w),(function(V,D,j){return V.resumeToken.approximateByteSize()===0||D.snapshotVersion.toMicroseconds()-V.snapshotVersion.toMicroseconds()>=ab?!0:j.addedDocuments.size+j.modifiedDocuments.size+j.removedDocuments.size>0})(g,w,f)&&c.push(t.Pi.updateTargetData(i,w))}));let l=rt(),h=X();if(e.documentUpdates.forEach((f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(i,f))})),c.push(hb(i,o,e.documentUpdates).next((f=>{l=f.ks,h=f.qs}))),!r.isEqual(H.min())){const f=t.Pi.getLastRemoteSnapshotVersion(i).next((p=>t.Pi.setTargetsMetadata(i,i.currentSequenceNumber,r)));c.push(f)}return T.waitFor(c).next((()=>o.apply(i))).next((()=>t.localDocuments.getLocalViewOfDocuments(i,l,h))).next((()=>l))})).then((i=>(t.Ms=s,i)))}function hb(n,e,t){let r=X(),s=X();return t.forEach((i=>r=r.add(i))),e.getEntries(n,r).next((i=>{let o=rt();return t.forEach(((c,l)=>{const h=i.get(c);l.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),l.isNoDocument()&&l.version.isEqual(H.min())?(e.removeEntry(c,l.readTime),o=o.insert(c,l)):!h.isValidDocument()||l.version.compareTo(h.version)>0||l.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(l),o=o.insert(c,l)):k(gl,"Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",l.version)})),{ks:o,qs:s}}))}function db(n,e){const t=Y(n);return t.persistence.runTransaction("Get next mutation batch","readonly",(r=>(e===void 0&&(e=Fn),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e))))}function fb(n,e){const t=Y(n);return t.persistence.runTransaction("Allocate target","readwrite",(r=>{let s;return t.Pi.getTargetData(r,e).next((i=>i?(s=i,T.resolve(s)):t.Pi.allocateTargetId(r).next((o=>(s=new xt(e,o,"TargetPurposeListen",r.currentSequenceNumber),t.Pi.addTargetData(r,s).next((()=>s)))))))})).then((r=>{const s=t.Ms.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.Ms=t.Ms.insert(r.targetId,r),t.xs.set(e,r.targetId)),r}))}async function wc(n,e,t){const r=Y(n),s=r.Ms.get(e),i=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",i,(o=>r.persistence.referenceDelegate.removeTarget(o,s)))}catch(o){if(!vn(o))throw o;k(gl,`Failed to update sequence numbers for target ${e}: ${o}`)}r.Ms=r.Ms.remove(e),r.xs.delete(s.target)}function md(n,e,t){const r=Y(n);let s=H.min(),i=X();return r.persistence.runTransaction("Execute query","readwrite",(o=>(function(l,h,f){const p=Y(l),g=p.xs.get(f);return g!==void 0?T.resolve(p.Ms.get(g)):p.Pi.getTargetData(h,f)})(r,o,ct(e)).next((c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Pi.getMatchingKeysForTargetId(o,c.targetId).next((l=>{i=l}))})).next((()=>r.Fs.getDocumentsMatchingQuery(o,e,t?s:H.min(),t?i:X()))).next((c=>(pb(r,ew(e),c),{documents:c,Qs:i})))))}function pb(n,e,t){let r=n.Os.get(e)||H.min();t.forEach(((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)})),n.Os.set(e,r)}class gd{constructor(){this.activeTargetIds=ow()}zs(e){this.activeTargetIds=this.activeTargetIds.add(e)}js(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Gs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class Dm{constructor(){this.Mo=new gd,this.xo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.Mo.zs(e),this.xo[e]||"not-current"}updateQueryState(e,t,r){this.xo[e]=t}removeLocalQueryTarget(e){this.Mo.js(e)}isLocalQueryTarget(e){return this.Mo.activeTargetIds.has(e)}clearQueryState(e){delete this.xo[e]}getAllActiveQueryTargets(){return this.Mo.activeTargetIds}isActiveQueryTarget(e){return this.Mo.activeTargetIds.has(e)}start(){return this.Mo=new gd,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mb{Oo(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _d="ConnectivityMonitor";class yd{constructor(){this.No=()=>this.Bo(),this.Lo=()=>this.ko(),this.qo=[],this.Qo()}Oo(e){this.qo.push(e)}shutdown(){window.removeEventListener("online",this.No),window.removeEventListener("offline",this.Lo)}Qo(){window.addEventListener("online",this.No),window.addEventListener("offline",this.Lo)}Bo(){k(_d,"Network connectivity changed: AVAILABLE");for(const e of this.qo)e(0)}ko(){k(_d,"Network connectivity changed: UNAVAILABLE");for(const e of this.qo)e(1)}static v(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ui=null;function bc(){return Ui===null?Ui=(function(){return 268435456+Math.round(2147483648*Math.random())})():Ui++,"0x"+Ui.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $a="RestConnection",gb={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};class _b{get $o(){return!1}constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const t=e.ssl?"https":"http",r=encodeURIComponent(this.databaseId.projectId),s=encodeURIComponent(this.databaseId.database);this.Uo=t+"://"+e.host,this.Ko=`projects/${r}/databases/${s}`,this.Wo=this.databaseId.database===_o?`project_id=${r}`:`project_id=${r}&database_id=${s}`}Go(e,t,r,s,i){const o=bc(),c=this.zo(e,t.toUriEncodedString());k($a,`Sending RPC '${e}' ${o}:`,c,r);const l={"google-cloud-resource-prefix":this.Ko,"x-goog-request-params":this.Wo};this.jo(l,s,i);const{host:h}=new URL(c),f=Kr(h);return this.Jo(e,c,l,r,f).then((p=>(k($a,`Received RPC '${e}' ${o}: `,p),p)),(p=>{throw js($a,`RPC '${e}' ${o} failed with error: `,p,"url: ",c,"request:",r),p}))}Ho(e,t,r,s,i,o){return this.Go(e,t,r,s,i)}jo(e,t,r){e["X-Goog-Api-Client"]=(function(){return"gl-js/ fire/"+Jr})(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),t&&t.headers.forEach(((s,i)=>e[i]=s)),r&&r.headers.forEach(((s,i)=>e[i]=s))}zo(e,t){const r=gb[e];return`${this.Uo}/v1/${t}:${r}`}terminate(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yb{constructor(e){this.Yo=e.Yo,this.Zo=e.Zo}Xo(e){this.e_=e}t_(e){this.n_=e}r_(e){this.i_=e}onMessage(e){this.s_=e}close(){this.Zo()}send(e){this.Yo(e)}o_(){this.e_()}__(){this.n_()}a_(e){this.i_(e)}u_(e){this.s_(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Le="WebChannelConnection";class vb extends _b{constructor(e){super(e),this.c_=[],this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Jo(e,t,r,s,i){const o=bc();return new Promise(((c,l)=>{const h=new Yf;h.setWithCredentials(!0),h.listenOnce(Jf.COMPLETE,(()=>{try{switch(h.getLastErrorCode()){case Hi.NO_ERROR:const p=h.getResponseJson();k(Le,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(p)),c(p);break;case Hi.TIMEOUT:k(Le,`RPC '${e}' ${o} timed out`),l(new x(C.DEADLINE_EXCEEDED,"Request time out"));break;case Hi.HTTP_ERROR:const g=h.getStatus();if(k(Le,`RPC '${e}' ${o} failed with status:`,g,"response text:",h.getResponseText()),g>0){let w=h.getResponseJson();Array.isArray(w)&&(w=w[0]);const A=w?.error;if(A&&A.status&&A.message){const V=(function(j){const $=j.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf($)>=0?$:C.UNKNOWN})(A.status);l(new x(V,A.message))}else l(new x(C.UNKNOWN,"Server responded with status "+h.getStatus()))}else l(new x(C.UNAVAILABLE,"Connection failed."));break;default:B(9055,{l_:e,streamId:o,h_:h.getLastErrorCode(),P_:h.getLastError()})}}finally{k(Le,`RPC '${e}' ${o} completed.`)}}));const f=JSON.stringify(s);k(Le,`RPC '${e}' ${o} sending request:`,s),h.send(t,"POST",f,r,15)}))}T_(e,t,r){const s=bc(),i=[this.Uo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=ep(),c=Zf(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(l.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(l.useFetchStreams=!0),this.jo(l.initMessageHeaders,t,r),l.encodeInitMessageHeaders=!0;const f=i.join("");k(Le,`Creating RPC '${e}' stream ${s}: ${f}`,l);const p=o.createWebChannel(f,l);this.I_(p);let g=!1,w=!1;const A=new yb({Yo:D=>{w?k(Le,`Not sending because RPC '${e}' stream ${s} is closed:`,D):(g||(k(Le,`Opening RPC '${e}' stream ${s} transport.`),p.open(),g=!0),k(Le,`RPC '${e}' stream ${s} sending:`,D),p.send(D))},Zo:()=>p.close()}),V=(D,j,$)=>{D.listen(j,(U=>{try{$(U)}catch(z){setTimeout((()=>{throw z}),0)}}))};return V(p,As.EventType.OPEN,(()=>{w||(k(Le,`RPC '${e}' stream ${s} transport opened.`),A.o_())})),V(p,As.EventType.CLOSE,(()=>{w||(w=!0,k(Le,`RPC '${e}' stream ${s} transport closed`),A.a_(),this.E_(p))})),V(p,As.EventType.ERROR,(D=>{w||(w=!0,js(Le,`RPC '${e}' stream ${s} transport errored. Name:`,D.name,"Message:",D.message),A.a_(new x(C.UNAVAILABLE,"The operation could not be completed")))})),V(p,As.EventType.MESSAGE,(D=>{if(!w){const j=D.data[0];G(!!j,16349);const $=j,U=$?.error||$[0]?.error;if(U){k(Le,`RPC '${e}' stream ${s} received error:`,U);const z=U.status;let M=(function(_){const v=we[_];if(v!==void 0)return Jp(v)})(z),q=U.message;M===void 0&&(M=C.INTERNAL,q="Unknown error status: "+z+" with message "+U.message),w=!0,A.a_(new x(M,q)),p.close()}else k(Le,`RPC '${e}' stream ${s} received:`,j),A.u_(j)}})),V(c,Xf.STAT_EVENT,(D=>{D.stat===tc.PROXY?k(Le,`RPC '${e}' stream ${s} detected buffering proxy`):D.stat===tc.NOPROXY&&k(Le,`RPC '${e}' stream ${s} detected no buffering proxy`)})),setTimeout((()=>{A.__()}),0),A}terminate(){this.c_.forEach((e=>e.close())),this.c_=[]}I_(e){this.c_.push(e)}E_(e){this.c_=this.c_.filter((t=>t===e))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eb(){return typeof window<"u"?window:null}function no(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Zo(n){return new ww(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vm{constructor(e,t,r=1e3,s=1.5,i=6e4){this.Mi=e,this.timerId=t,this.d_=r,this.A_=s,this.R_=i,this.V_=0,this.m_=null,this.f_=Date.now(),this.reset()}reset(){this.V_=0}g_(){this.V_=this.R_}p_(e){this.cancel();const t=Math.floor(this.V_+this.y_()),r=Math.max(0,Date.now()-this.f_),s=Math.max(0,t-r);s>0&&k("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.V_} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.m_=this.Mi.enqueueAfterDelay(this.timerId,s,(()=>(this.f_=Date.now(),e()))),this.V_*=this.A_,this.V_<this.d_&&(this.V_=this.d_),this.V_>this.R_&&(this.V_=this.R_)}w_(){this.m_!==null&&(this.m_.skipDelay(),this.m_=null)}cancel(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}y_(){return(Math.random()-.5)*this.V_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vd="PersistentStream";class Nm{constructor(e,t,r,s,i,o,c,l){this.Mi=e,this.S_=r,this.b_=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=c,this.listener=l,this.state=0,this.D_=0,this.C_=null,this.v_=null,this.stream=null,this.F_=0,this.M_=new Vm(e,t)}x_(){return this.state===1||this.state===5||this.O_()}O_(){return this.state===2||this.state===3}start(){this.F_=0,this.state!==4?this.auth():this.N_()}async stop(){this.x_()&&await this.close(0)}B_(){this.state=0,this.M_.reset()}L_(){this.O_()&&this.C_===null&&(this.C_=this.Mi.enqueueAfterDelay(this.S_,6e4,(()=>this.k_())))}q_(e){this.Q_(),this.stream.send(e)}async k_(){if(this.O_())return this.close(0)}Q_(){this.C_&&(this.C_.cancel(),this.C_=null)}U_(){this.v_&&(this.v_.cancel(),this.v_=null)}async close(e,t){this.Q_(),this.U_(),this.M_.cancel(),this.D_++,e!==4?this.M_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(Ke(t.toString()),Ke("Using maximum backoff delay to prevent overloading the backend."),this.M_.g_()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.K_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.r_(t)}K_(){}auth(){this.state=1;const e=this.W_(this.D_),t=this.D_;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then((([r,s])=>{this.D_===t&&this.G_(r,s)}),(r=>{e((()=>{const s=new x(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.z_(s)}))}))}G_(e,t){const r=this.W_(this.D_);this.stream=this.j_(e,t),this.stream.Xo((()=>{r((()=>this.listener.Xo()))})),this.stream.t_((()=>{r((()=>(this.state=2,this.v_=this.Mi.enqueueAfterDelay(this.b_,1e4,(()=>(this.O_()&&(this.state=3),Promise.resolve()))),this.listener.t_())))})),this.stream.r_((s=>{r((()=>this.z_(s)))})),this.stream.onMessage((s=>{r((()=>++this.F_==1?this.J_(s):this.onNext(s)))}))}N_(){this.state=5,this.M_.p_((async()=>{this.state=0,this.start()}))}z_(e){return k(vd,`close with error: ${e}`),this.stream=null,this.close(4,e)}W_(e){return t=>{this.Mi.enqueueAndForget((()=>this.D_===e?t():(k(vd,"stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve())))}}}class Ib extends Nm{constructor(e,t,r,s,i,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}j_(e,t){return this.connection.T_("Listen",e,t)}J_(e){return this.onNext(e)}onNext(e){this.M_.reset();const t=Aw(this.serializer,e),r=(function(i){if(!("targetChange"in i))return H.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?H.min():o.readTime?We(o.readTime):H.min()})(e);return this.listener.H_(t,r)}Y_(e){const t={};t.database=_c(this.serializer),t.addTarget=(function(i,o){let c;const l=o.target;if(c=vo(l)?{documents:im(i,l)}:{query:om(i,l).ft},c.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){c.resumeToken=em(i,o.resumeToken);const h=mc(i,o.expectedCount);h!==null&&(c.expectedCount=h)}else if(o.snapshotVersion.compareTo(H.min())>0){c.readTime=jr(i,o.snapshotVersion.toTimestamp());const h=mc(i,o.expectedCount);h!==null&&(c.expectedCount=h)}return c})(this.serializer,e);const r=Pw(this.serializer,e);r&&(t.labels=r),this.q_(t)}Z_(e){const t={};t.database=_c(this.serializer),t.removeTarget=e,this.q_(t)}}class wb extends Nm{constructor(e,t,r,s,i,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,o),this.serializer=i}get X_(){return this.F_>0}start(){this.lastStreamToken=void 0,super.start()}K_(){this.X_&&this.ea([])}j_(e,t){return this.connection.T_("Write",e,t)}J_(e){return G(!!e.streamToken,31322),this.lastStreamToken=e.streamToken,G(!e.writeResults||e.writeResults.length===0,55816),this.listener.ta()}onNext(e){G(!!e.streamToken,12678),this.lastStreamToken=e.streamToken,this.M_.reset();const t=Sw(e.writeResults,e.commitTime),r=We(e.commitTime);return this.listener.na(r,t)}ra(){const e={};e.database=_c(this.serializer),this.q_(e)}ea(e){const t={streamToken:this.lastStreamToken,writes:e.map((r=>wo(this.serializer,r)))};this.q_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bb{}class Tb extends bb{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.ia=!1}sa(){if(this.ia)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.")}Go(e,t,r,s){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([i,o])=>this.connection.Go(e,gc(t,r),s,i,o))).catch((i=>{throw i.name==="FirebaseError"?(i.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new x(C.UNKNOWN,i.toString())}))}Ho(e,t,r,s,i){return this.sa(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then((([o,c])=>this.connection.Ho(e,gc(t,r),s,o,c,i))).catch((o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new x(C.UNKNOWN,o.toString())}))}terminate(){this.ia=!0,this.connection.terminate()}}class Ab{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.oa=0,this._a=null,this.aa=!0}ua(){this.oa===0&&(this.ca("Unknown"),this._a=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,(()=>(this._a=null,this.la("Backend didn't respond within 10 seconds."),this.ca("Offline"),Promise.resolve()))))}ha(e){this.state==="Online"?this.ca("Unknown"):(this.oa++,this.oa>=1&&(this.Pa(),this.la(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.ca("Offline")))}set(e){this.Pa(),this.oa=0,e==="Online"&&(this.aa=!1),this.ca(e)}ca(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}la(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.aa?(Ke(t),this.aa=!1):k("OnlineStateTracker",t)}Pa(){this._a!==null&&(this._a.cancel(),this._a=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Xn="RemoteStore";class Sb{constructor(e,t,r,s,i){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.Ta=[],this.Ia=new Map,this.Ea=new Set,this.da=[],this.Aa=i,this.Aa.Oo((o=>{r.enqueueAndForget((async()=>{tr(this)&&(k(Xn,"Restarting streams for network reachability change."),await(async function(l){const h=Y(l);h.Ea.add(4),await pi(h),h.Ra.set("Unknown"),h.Ea.delete(4),await ea(h)})(this))}))})),this.Ra=new Ab(r,s)}}async function ea(n){if(tr(n))for(const e of n.da)await e(!0)}async function pi(n){for(const e of n.da)await e(!1)}function km(n,e){const t=Y(n);t.Ia.has(e.targetId)||(t.Ia.set(e.targetId,e),El(t)?vl(t):Zr(t).O_()&&yl(t,e))}function _l(n,e){const t=Y(n),r=Zr(t);t.Ia.delete(e),r.O_()&&xm(t,e),t.Ia.size===0&&(r.O_()?r.L_():tr(t)&&t.Ra.set("Unknown"))}function yl(n,e){if(n.Va.Ue(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(H.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Zr(n).Y_(e)}function xm(n,e){n.Va.Ue(e),Zr(n).Z_(e)}function vl(n){n.Va=new yw({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),At:e=>n.Ia.get(e)||null,ht:()=>n.datastore.serializer.databaseId}),Zr(n).start(),n.Ra.ua()}function El(n){return tr(n)&&!Zr(n).x_()&&n.Ia.size>0}function tr(n){return Y(n).Ea.size===0}function Om(n){n.Va=void 0}async function Pb(n){n.Ra.set("Online")}async function Rb(n){n.Ia.forEach(((e,t)=>{yl(n,e)}))}async function Cb(n,e){Om(n),El(n)?(n.Ra.ha(e),vl(n)):n.Ra.set("Unknown")}async function Db(n,e,t){if(n.Ra.set("Online"),e instanceof Zp&&e.state===2&&e.cause)try{await(async function(s,i){const o=i.cause;for(const c of i.targetIds)s.Ia.has(c)&&(await s.remoteSyncer.rejectListen(c,o),s.Ia.delete(c),s.Va.removeTarget(c))})(n,e)}catch(r){k(Xn,"Failed to remove targets %s: %s ",e.targetIds.join(","),r),await Po(n,r)}else if(e instanceof eo?n.Va.Ze(e):e instanceof Xp?n.Va.st(e):n.Va.tt(e),!t.isEqual(H.min()))try{const r=await Cm(n.localStore);t.compareTo(r)>=0&&await(function(i,o){const c=i.Va.Tt(o);return c.targetChanges.forEach(((l,h)=>{if(l.resumeToken.approximateByteSize()>0){const f=i.Ia.get(h);f&&i.Ia.set(h,f.withResumeToken(l.resumeToken,o))}})),c.targetMismatches.forEach(((l,h)=>{const f=i.Ia.get(l);if(!f)return;i.Ia.set(l,f.withResumeToken(Te.EMPTY_BYTE_STRING,f.snapshotVersion)),xm(i,l);const p=new xt(f.target,l,h,f.sequenceNumber);yl(i,p)})),i.remoteSyncer.applyRemoteEvent(c)})(n,t)}catch(r){k(Xn,"Failed to raise snapshot:",r),await Po(n,r)}}async function Po(n,e,t){if(!vn(e))throw e;n.Ea.add(1),await pi(n),n.Ra.set("Offline"),t||(t=()=>Cm(n.localStore)),n.asyncQueue.enqueueRetryable((async()=>{k(Xn,"Retrying IndexedDB access"),await t(),n.Ea.delete(1),await ea(n)}))}function Lm(n,e){return e().catch((t=>Po(n,t,e)))}async function mi(n){const e=Y(n),t=gn(e);let r=e.Ta.length>0?e.Ta[e.Ta.length-1].batchId:Fn;for(;Vb(e);)try{const s=await db(e.localStore,r);if(s===null){e.Ta.length===0&&t.L_();break}r=s.batchId,Nb(e,s)}catch(s){await Po(e,s)}Mm(e)&&Fm(e)}function Vb(n){return tr(n)&&n.Ta.length<10}function Nb(n,e){n.Ta.push(e);const t=gn(n);t.O_()&&t.X_&&t.ea(e.mutations)}function Mm(n){return tr(n)&&!gn(n).x_()&&n.Ta.length>0}function Fm(n){gn(n).start()}async function kb(n){gn(n).ra()}async function xb(n){const e=gn(n);for(const t of n.Ta)e.ea(t.mutations)}async function Ob(n,e,t){const r=n.Ta.shift(),s=ol.from(r,e,t);await Lm(n,(()=>n.remoteSyncer.applySuccessfulWrite(s))),await mi(n)}async function Lb(n,e){e&&gn(n).X_&&await(async function(r,s){if((function(o){return mw(o)&&o!==C.ABORTED})(s.code)){const i=r.Ta.shift();gn(r).B_(),await Lm(r,(()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s))),await mi(r)}})(n,e),Mm(n)&&Fm(n)}async function Ed(n,e){const t=Y(n);t.asyncQueue.verifyOperationInProgress(),k(Xn,"RemoteStore received new credentials");const r=tr(t);t.Ea.add(3),await pi(t),r&&t.Ra.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.Ea.delete(3),await ea(t)}async function Mb(n,e){const t=Y(n);e?(t.Ea.delete(2),await ea(t)):e||(t.Ea.add(2),await pi(t),t.Ra.set("Unknown"))}function Zr(n){return n.ma||(n.ma=(function(t,r,s){const i=Y(t);return i.sa(),new Ib(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:Pb.bind(null,n),t_:Rb.bind(null,n),r_:Cb.bind(null,n),H_:Db.bind(null,n)}),n.da.push((async e=>{e?(n.ma.B_(),El(n)?vl(n):n.Ra.set("Unknown")):(await n.ma.stop(),Om(n))}))),n.ma}function gn(n){return n.fa||(n.fa=(function(t,r,s){const i=Y(t);return i.sa(),new wb(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)})(n.datastore,n.asyncQueue,{Xo:()=>Promise.resolve(),t_:kb.bind(null,n),r_:Lb.bind(null,n),ta:xb.bind(null,n),na:Ob.bind(null,n)}),n.da.push((async e=>{e?(n.fa.B_(),await mi(n)):(await n.fa.stop(),n.Ta.length>0&&(k(Xn,`Stopping write stream with ${n.Ta.length} pending writes`),n.Ta=[]))}))),n.fa}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Il{constructor(e,t,r,s,i){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new Tt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch((o=>{}))}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,i){const o=Date.now()+r,c=new Il(e,t,o,s,i);return c.start(r),c}start(e){this.timerHandle=setTimeout((()=>this.handleDelayElapsed()),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new x(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget((()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then((e=>this.deferred.resolve(e)))):Promise.resolve()))}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function wl(n,e){if(Ke("AsyncQueue",`${e}: ${n}`),vn(n))return new x(C.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sr{static emptySet(e){return new Sr(e.comparator)}constructor(e){this.comparator=e?(t,r)=>e(t,r)||L.comparator(t.key,r.key):(t,r)=>L.comparator(t.key,r.key),this.keyedMap=Ss(),this.sortedSet=new pe(this.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal(((t,r)=>(e(t),!1)))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof Sr)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const e=[];return this.forEach((t=>{e.push(t.toString())})),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new Sr;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Id{constructor(){this.ga=new pe(L.comparator)}track(e){const t=e.doc.key,r=this.ga.get(t);r?e.type!==0&&r.type===3?this.ga=this.ga.insert(t,e):e.type===3&&r.type!==1?this.ga=this.ga.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.ga=this.ga.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.ga=this.ga.remove(t):e.type===1&&r.type===2?this.ga=this.ga.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.ga=this.ga.insert(t,{type:2,doc:e.doc}):B(63341,{Rt:e,pa:r}):this.ga=this.ga.insert(t,e)}ya(){const e=[];return this.ga.inorderTraversal(((t,r)=>{e.push(r)})),e}}class Gr{constructor(e,t,r,s,i,o,c,l,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=c,this.excludesMetadataChanges=l,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,i){const o=[];return t.forEach((c=>{o.push({type:0,doc:c})})),new Gr(e,t,Sr.emptySet(t),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Go(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fb{constructor(){this.wa=void 0,this.Sa=[]}ba(){return this.Sa.some((e=>e.Da()))}}class Ub{constructor(){this.queries=wd(),this.onlineState="Unknown",this.Ca=new Set}terminate(){(function(t,r){const s=Y(t),i=s.queries;s.queries=wd(),i.forEach(((o,c)=>{for(const l of c.Sa)l.onError(r)}))})(this,new x(C.ABORTED,"Firestore shutting down"))}}function wd(){return new qt((n=>Mp(n)),Go)}async function Um(n,e){const t=Y(n);let r=3;const s=e.query;let i=t.queries.get(s);i?!i.ba()&&e.Da()&&(r=2):(i=new Fb,r=e.Da()?0:1);try{switch(r){case 0:i.wa=await t.onListen(s,!0);break;case 1:i.wa=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(o){const c=wl(o,`Initialization of query '${gr(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,i),i.Sa.push(e),e.va(t.onlineState),i.wa&&e.Fa(i.wa)&&bl(t)}async function Bm(n,e){const t=Y(n),r=e.query;let s=3;const i=t.queries.get(r);if(i){const o=i.Sa.indexOf(e);o>=0&&(i.Sa.splice(o,1),i.Sa.length===0?s=e.Da()?0:1:!i.ba()&&e.Da()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function Bb(n,e){const t=Y(n);let r=!1;for(const s of e){const i=s.query,o=t.queries.get(i);if(o){for(const c of o.Sa)c.Fa(s)&&(r=!0);o.wa=s}}r&&bl(t)}function $b(n,e,t){const r=Y(n),s=r.queries.get(e);if(s)for(const i of s.Sa)i.onError(t);r.queries.delete(e)}function bl(n){n.Ca.forEach((e=>{e.next()}))}var Tc,bd;(bd=Tc||(Tc={})).Ma="default",bd.Cache="cache";class $m{constructor(e,t,r){this.query=e,this.xa=t,this.Oa=!1,this.Na=null,this.onlineState="Unknown",this.options=r||{}}Fa(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new Gr(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.Oa?this.Ba(e)&&(this.xa.next(e),t=!0):this.La(e,this.onlineState)&&(this.ka(e),t=!0),this.Na=e,t}onError(e){this.xa.error(e)}va(e){this.onlineState=e;let t=!1;return this.Na&&!this.Oa&&this.La(this.Na,e)&&(this.ka(this.Na),t=!0),t}La(e,t){if(!e.fromCache||!this.Da())return!0;const r=t!=="Offline";return(!this.options.qa||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}Ba(e){if(e.docChanges.length>0)return!0;const t=this.Na&&this.Na.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}ka(e){e=Gr.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.Oa=!0,this.xa.next(e)}Da(){return this.options.source!==Tc.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qm{constructor(e){this.key=e}}class zm{constructor(e){this.key=e}}class qb{constructor(e,t){this.query=e,this.Ya=t,this.Za=null,this.hasCachedResults=!1,this.current=!1,this.Xa=X(),this.mutatedKeys=X(),this.eu=Fp(e),this.tu=new Sr(this.eu)}get nu(){return this.Ya}ru(e,t){const r=t?t.iu:new Id,s=t?t.tu:this.tu;let i=t?t.mutatedKeys:this.mutatedKeys,o=s,c=!1;const l=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal(((f,p)=>{const g=s.get(f),w=di(this.query,p)?p:null,A=!!g&&this.mutatedKeys.has(g.key),V=!!w&&(w.hasLocalMutations||this.mutatedKeys.has(w.key)&&w.hasCommittedMutations);let D=!1;g&&w?g.data.isEqual(w.data)?A!==V&&(r.track({type:3,doc:w}),D=!0):this.su(g,w)||(r.track({type:2,doc:w}),D=!0,(l&&this.eu(w,l)>0||h&&this.eu(w,h)<0)&&(c=!0)):!g&&w?(r.track({type:0,doc:w}),D=!0):g&&!w&&(r.track({type:1,doc:g}),D=!0,(l||h)&&(c=!0)),D&&(w?(o=o.add(w),i=V?i.add(f):i.delete(f)):(o=o.delete(f),i=i.delete(f)))})),this.query.limit!==null)for(;o.size>this.query.limit;){const f=this.query.limitType==="F"?o.last():o.first();o=o.delete(f.key),i=i.delete(f.key),r.track({type:1,doc:f})}return{tu:o,iu:r,Cs:c,mutatedKeys:i}}su(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const i=this.tu;this.tu=e.tu,this.mutatedKeys=e.mutatedKeys;const o=e.iu.ya();o.sort(((f,p)=>(function(w,A){const V=D=>{switch(D){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B(20277,{Rt:D})}};return V(w)-V(A)})(f.type,p.type)||this.eu(f.doc,p.doc))),this.ou(r),s=s??!1;const c=t&&!s?this._u():[],l=this.Xa.size===0&&this.current&&!s?1:0,h=l!==this.Za;return this.Za=l,o.length!==0||h?{snapshot:new Gr(this.query,e.tu,i,o,e.mutatedKeys,l===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),au:c}:{au:c}}va(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({tu:this.tu,iu:new Id,mutatedKeys:this.mutatedKeys,Cs:!1},!1)):{au:[]}}uu(e){return!this.Ya.has(e)&&!!this.tu.has(e)&&!this.tu.get(e).hasLocalMutations}ou(e){e&&(e.addedDocuments.forEach((t=>this.Ya=this.Ya.add(t))),e.modifiedDocuments.forEach((t=>{})),e.removedDocuments.forEach((t=>this.Ya=this.Ya.delete(t))),this.current=e.current)}_u(){if(!this.current)return[];const e=this.Xa;this.Xa=X(),this.tu.forEach((r=>{this.uu(r.key)&&(this.Xa=this.Xa.add(r.key))}));const t=[];return e.forEach((r=>{this.Xa.has(r)||t.push(new zm(r))})),this.Xa.forEach((r=>{e.has(r)||t.push(new qm(r))})),t}cu(e){this.Ya=e.Qs,this.Xa=X();const t=this.ru(e.documents);return this.applyChanges(t,!0)}lu(){return Gr.fromInitialDocuments(this.query,this.tu,this.mutatedKeys,this.Za===0,this.hasCachedResults)}}const Tl="SyncEngine";class zb{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class jb{constructor(e){this.key=e,this.hu=!1}}class Gb{constructor(e,t,r,s,i,o){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Pu={},this.Tu=new qt((c=>Mp(c)),Go),this.Iu=new Map,this.Eu=new Set,this.du=new pe(L.comparator),this.Au=new Map,this.Ru=new dl,this.Vu={},this.mu=new Map,this.fu=Jn.cr(),this.onlineState="Unknown",this.gu=void 0}get isPrimaryClient(){return this.gu===!0}}async function Hb(n,e,t=!0){const r=Qm(n);let s;const i=r.Tu.get(e);return i?(r.sharedClientState.addLocalQueryTarget(i.targetId),s=i.view.lu()):s=await jm(r,e,t,!0),s}async function Kb(n,e){const t=Qm(n);await jm(t,e,!0,!1)}async function jm(n,e,t,r){const s=await fb(n.localStore,ct(e)),i=s.targetId,o=n.sharedClientState.addLocalQueryTarget(i,t);let c;return r&&(c=await Wb(n,e,i,o==="current",s.resumeToken)),n.isPrimaryClient&&t&&km(n.remoteStore,s),c}async function Wb(n,e,t,r,s){n.pu=(p,g,w)=>(async function(V,D,j,$){let U=D.view.ru(j);U.Cs&&(U=await md(V.localStore,D.query,!1).then((({documents:E})=>D.view.ru(E,U))));const z=$&&$.targetChanges.get(D.targetId),M=$&&$.targetMismatches.get(D.targetId)!=null,q=D.view.applyChanges(U,V.isPrimaryClient,z,M);return Ad(V,D.targetId,q.au),q.snapshot})(n,p,g,w);const i=await md(n.localStore,e,!0),o=new qb(e,i.Qs),c=o.ru(i.documents),l=fi.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=o.applyChanges(c,n.isPrimaryClient,l);Ad(n,t,h.au);const f=new zb(e,t,o);return n.Tu.set(e,f),n.Iu.has(t)?n.Iu.get(t).push(e):n.Iu.set(t,[e]),h.snapshot}async function Qb(n,e,t){const r=Y(n),s=r.Tu.get(e),i=r.Iu.get(s.targetId);if(i.length>1)return r.Iu.set(s.targetId,i.filter((o=>!Go(o,e)))),void r.Tu.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await wc(r.localStore,s.targetId,!1).then((()=>{r.sharedClientState.clearQueryState(s.targetId),t&&_l(r.remoteStore,s.targetId),Ac(r,s.targetId)})).catch(er)):(Ac(r,s.targetId),await wc(r.localStore,s.targetId,!0))}async function Yb(n,e){const t=Y(n),r=t.Tu.get(e),s=t.Iu.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),_l(t.remoteStore,r.targetId))}async function Jb(n,e,t){const r=Ym(n);try{const s=await(function(o,c){const l=Y(o),h=oe.now(),f=c.reduce(((w,A)=>w.add(A.key)),X());let p,g;return l.persistence.runTransaction("Locally write mutations","readwrite",(w=>{let A=rt(),V=X();return l.Ns.getEntries(w,f).next((D=>{A=D,A.forEach(((j,$)=>{$.isValidDocument()||(V=V.add(j))}))})).next((()=>l.localDocuments.getOverlayedDocuments(w,A))).next((D=>{p=D;const j=[];for(const $ of c){const U=fw($,p.get($.key).overlayedDocument);U!=null&&j.push(new zt($.key,U,Rp(U.value.mapValue),Be.exists(!0)))}return l.mutationQueue.addMutationBatch(w,h,j,c)})).next((D=>{g=D;const j=D.applyToLocalDocumentSet(p,V);return l.documentOverlayCache.saveOverlays(w,D.batchId,j)}))})).then((()=>({batchId:g.batchId,changes:Bp(p)})))})(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),(function(o,c,l){let h=o.Vu[o.currentUser.toKey()];h||(h=new pe(Q)),h=h.insert(c,l),o.Vu[o.currentUser.toKey()]=h})(r,s.batchId,t),await gi(r,s.changes),await mi(r.remoteStore)}catch(s){const i=wl(s,"Failed to persist write");t.reject(i)}}async function Gm(n,e){const t=Y(n);try{const r=await ub(t.localStore,e);e.targetChanges.forEach(((s,i)=>{const o=t.Au.get(i);o&&(G(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1,22616),s.addedDocuments.size>0?o.hu=!0:s.modifiedDocuments.size>0?G(o.hu,14607):s.removedDocuments.size>0&&(G(o.hu,42227),o.hu=!1))})),await gi(t,r,e)}catch(r){await er(r)}}function Td(n,e,t){const r=Y(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Tu.forEach(((i,o)=>{const c=o.view.va(e);c.snapshot&&s.push(c.snapshot)})),(function(o,c){const l=Y(o);l.onlineState=c;let h=!1;l.queries.forEach(((f,p)=>{for(const g of p.Sa)g.va(c)&&(h=!0)})),h&&bl(l)})(r.eventManager,e),s.length&&r.Pu.H_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function Xb(n,e,t){const r=Y(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Au.get(e),i=s&&s.key;if(i){let o=new pe(L.comparator);o=o.insert(i,ve.newNoDocument(i,H.min()));const c=X().add(i),l=new Qo(H.min(),new Map,new pe(Q),o,c);await Gm(r,l),r.du=r.du.remove(i),r.Au.delete(e),Al(r)}else await wc(r.localStore,e,!1).then((()=>Ac(r,e,t))).catch(er)}async function Zb(n,e){const t=Y(n),r=e.batch.batchId;try{const s=await lb(t.localStore,e);Km(t,r,null),Hm(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await gi(t,s)}catch(s){await er(s)}}async function eT(n,e,t){const r=Y(n);try{const s=await(function(o,c){const l=Y(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",(h=>{let f;return l.mutationQueue.lookupMutationBatch(h,c).next((p=>(G(p!==null,37113),f=p.keys(),l.mutationQueue.removeMutationBatch(h,p)))).next((()=>l.mutationQueue.performConsistencyCheck(h))).next((()=>l.documentOverlayCache.removeOverlaysForBatchId(h,f,c))).next((()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f))).next((()=>l.localDocuments.getDocuments(h,f)))}))})(r.localStore,e);Km(r,e,t),Hm(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await gi(r,s)}catch(s){await er(s)}}function Hm(n,e){(n.mu.get(e)||[]).forEach((t=>{t.resolve()})),n.mu.delete(e)}function Km(n,e,t){const r=Y(n);let s=r.Vu[r.currentUser.toKey()];if(s){const i=s.get(e);i&&(t?i.reject(t):i.resolve(),s=s.remove(e)),r.Vu[r.currentUser.toKey()]=s}}function Ac(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Iu.get(e))n.Tu.delete(r),t&&n.Pu.yu(r,t);n.Iu.delete(e),n.isPrimaryClient&&n.Ru.jr(e).forEach((r=>{n.Ru.containsKey(r)||Wm(n,r)}))}function Wm(n,e){n.Eu.delete(e.path.canonicalString());const t=n.du.get(e);t!==null&&(_l(n.remoteStore,t),n.du=n.du.remove(e),n.Au.delete(t),Al(n))}function Ad(n,e,t){for(const r of t)r instanceof qm?(n.Ru.addReference(r.key,e),tT(n,r)):r instanceof zm?(k(Tl,"Document no longer in limbo: "+r.key),n.Ru.removeReference(r.key,e),n.Ru.containsKey(r.key)||Wm(n,r.key)):B(19791,{wu:r})}function tT(n,e){const t=e.key,r=t.path.canonicalString();n.du.get(t)||n.Eu.has(r)||(k(Tl,"New document in limbo: "+t),n.Eu.add(r),Al(n))}function Al(n){for(;n.Eu.size>0&&n.du.size<n.maxConcurrentLimboResolutions;){const e=n.Eu.values().next().value;n.Eu.delete(e);const t=new L(se.fromString(e)),r=n.fu.next();n.Au.set(r,new jb(t)),n.du=n.du.insert(t,r),km(n.remoteStore,new xt(ct(jo(t.path)),r,"TargetPurposeLimboResolution",at.ce))}}async function gi(n,e,t){const r=Y(n),s=[],i=[],o=[];r.Tu.isEmpty()||(r.Tu.forEach(((c,l)=>{o.push(r.pu(l,e,t).then((h=>{if((h||t)&&r.isPrimaryClient){const f=h?!h.fromCache:t?.targetChanges.get(l.targetId)?.current;r.sharedClientState.updateQueryState(l.targetId,f?"current":"not-current")}if(h){s.push(h);const f=ml.As(l.targetId,h);i.push(f)}})))})),await Promise.all(o),r.Pu.H_(s),await(async function(l,h){const f=Y(l);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",(p=>T.forEach(h,(g=>T.forEach(g.Es,(w=>f.persistence.referenceDelegate.addReference(p,g.targetId,w))).next((()=>T.forEach(g.ds,(w=>f.persistence.referenceDelegate.removeReference(p,g.targetId,w)))))))))}catch(p){if(!vn(p))throw p;k(gl,"Failed to update sequence numbers: "+p)}for(const p of h){const g=p.targetId;if(!p.fromCache){const w=f.Ms.get(g),A=w.snapshotVersion,V=w.withLastLimboFreeSnapshotVersion(A);f.Ms=f.Ms.insert(g,V)}}})(r.localStore,i))}async function nT(n,e){const t=Y(n);if(!t.currentUser.isEqual(e)){k(Tl,"User change. New user:",e.toKey());const r=await Rm(t.localStore,e);t.currentUser=e,(function(i,o){i.mu.forEach((c=>{c.forEach((l=>{l.reject(new x(C.CANCELLED,o))}))})),i.mu.clear()})(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await gi(t,r.Ls)}}function rT(n,e){const t=Y(n),r=t.Au.get(e);if(r&&r.hu)return X().add(r.key);{let s=X();const i=t.Iu.get(e);if(!i)return s;for(const o of i){const c=t.Tu.get(o);s=s.unionWith(c.view.nu)}return s}}function Qm(n){const e=Y(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Gm.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=rT.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=Xb.bind(null,e),e.Pu.H_=Bb.bind(null,e.eventManager),e.Pu.yu=$b.bind(null,e.eventManager),e}function Ym(n){const e=Y(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=Zb.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=eT.bind(null,e),e}class ni{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=Zo(e.databaseInfo.databaseId),this.sharedClientState=this.Du(e),this.persistence=this.Cu(e),await this.persistence.start(),this.localStore=this.vu(e),this.gcScheduler=this.Fu(e,this.localStore),this.indexBackfillerScheduler=this.Mu(e,this.localStore)}Fu(e,t){return null}Mu(e,t){return null}vu(e){return Pm(this.persistence,new Sm,e.initialUser,this.serializer)}Cu(e){return new fl(Xo.mi,this.serializer)}Du(e){return new Dm}async terminate(){this.gcScheduler?.stop(),this.indexBackfillerScheduler?.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ni.provider={build:()=>new ni};class sT extends ni{constructor(e){super(),this.cacheSizeBytes=e}Fu(e,t){G(this.persistence.referenceDelegate instanceof So,46915);const r=this.persistence.referenceDelegate.garbageCollector;return new Im(r,e.asyncQueue,t)}Cu(e){const t=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new fl((r=>So.mi(r,t)),this.serializer)}}class iT extends ni{constructor(e,t,r){super(),this.xu=e,this.cacheSizeBytes=t,this.forceOwnership=r,this.kind="persistent",this.synchronizeTabs=!1}async initialize(e){await super.initialize(e),await this.xu.initialize(this,e),await Ym(this.xu.syncEngine),await mi(this.xu.remoteStore),await this.persistence.Ji((()=>(this.gcScheduler&&!this.gcScheduler.started&&this.gcScheduler.start(),this.indexBackfillerScheduler&&!this.indexBackfillerScheduler.started&&this.indexBackfillerScheduler.start(),Promise.resolve())))}vu(e){return Pm(this.persistence,new Sm,e.initialUser,this.serializer)}Fu(e,t){const r=this.persistence.referenceDelegate.garbageCollector;return new Im(r,e.asyncQueue,t)}Mu(e,t){const r=new dI(t,this.persistence);return new hI(e.asyncQueue,r)}Cu(e){const t=ib(e.databaseInfo.databaseId,e.databaseInfo.persistenceKey),r=this.cacheSizeBytes!==void 0?Me.withCacheSize(this.cacheSizeBytes):Me.DEFAULT;return new pl(this.synchronizeTabs,t,e.clientId,r,e.asyncQueue,Eb(),no(),this.serializer,this.sharedClientState,!!this.forceOwnership)}Du(e){return new Dm}}class Ro{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Td(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=nT.bind(null,this.syncEngine),await Mb(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return(function(){return new Ub})()}createDatastore(e){const t=Zo(e.databaseInfo.databaseId),r=(function(i){return new vb(i)})(e.databaseInfo);return(function(i,o,c,l){return new Tb(i,o,c,l)})(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return(function(r,s,i,o,c){return new Sb(r,s,i,o,c)})(this.localStore,this.datastore,e.asyncQueue,(t=>Td(this.syncEngine,t,0)),(function(){return yd.v()?new yd:new mb})())}createSyncEngine(e,t){return(function(s,i,o,c,l,h,f){const p=new Gb(s,i,o,c,l,h);return f&&(p.gu=!0),p})(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){await(async function(t){const r=Y(t);k(Xn,"RemoteStore shutting down."),r.Ea.add(5),await pi(r),r.Aa.shutdown(),r.Ra.set("Unknown")})(this.remoteStore),this.datastore?.terminate(),this.eventManager?.terminate()}}Ro.provider={build:()=>new Ro};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Jm{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ou(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ou(this.observer.error,e):Ke("Uncaught Error in snapshot listener:",e.toString()))}Nu(){this.muted=!0}Ou(e,t){setTimeout((()=>{this.muted||e(t)}),0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const _n="FirestoreClient";class oT{constructor(e,t,r,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=He.UNAUTHENTICATED,this.clientId=Kc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=i,this.authCredentials.start(r,(async o=>{k(_n,"Received user=",o.uid),await this.authCredentialListener(o),this.user=o})),this.appCheckCredentials.start(r,(o=>(k(_n,"Received new app check token=",o),this.appCheckCredentialListener(o,this.user))))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new Tt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted((async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=wl(t,"Failed to shutdown persistence");e.reject(r)}})),e.promise}}async function qa(n,e){n.asyncQueue.verifyOperationInProgress(),k(_n,"Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener((async s=>{r.isEqual(s)||(await Rm(e.localStore,s),r=s)})),e.persistence.setDatabaseDeletedListener((()=>n.terminate())),n._offlineComponents=e}async function Sd(n,e){n.asyncQueue.verifyOperationInProgress();const t=await aT(n);k(_n,"Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener((r=>Ed(e.remoteStore,r))),n.setAppCheckTokenChangeListener(((r,s)=>Ed(e.remoteStore,s))),n._onlineComponents=e}async function aT(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){k(_n,"Using user provided OfflineComponentProvider");try{await qa(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!(function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11})(t))throw t;js("Error using user provided cache. Falling back to memory cache: "+t),await qa(n,new ni)}}else k(_n,"Using default OfflineComponentProvider"),await qa(n,new sT(void 0));return n._offlineComponents}async function Xm(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(k(_n,"Using user provided OnlineComponentProvider"),await Sd(n,n._uninitializedComponentsProvider._online)):(k(_n,"Using default OnlineComponentProvider"),await Sd(n,new Ro))),n._onlineComponents}function cT(n){return Xm(n).then((e=>e.syncEngine))}async function Zm(n){const e=await Xm(n),t=e.eventManager;return t.onListen=Hb.bind(null,e.syncEngine),t.onUnlisten=Qb.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=Kb.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=Yb.bind(null,e.syncEngine),t}function lT(n,e,t={}){const r=new Tt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,l,h){const f=new Jm({next:g=>{f.Nu(),o.enqueueAndForget((()=>Bm(i,p)));const w=g.docs.has(c);!w&&g.fromCache?h.reject(new x(C.UNAVAILABLE,"Failed to get document because the client is offline.")):w&&g.fromCache&&l&&l.source==="server"?h.reject(new x(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new $m(jo(c.path),f,{includeMetadataChanges:!0,qa:!0});return Um(i,p)})(await Zm(n),n.asyncQueue,e,t,r))),r.promise}function uT(n,e,t={}){const r=new Tt;return n.asyncQueue.enqueueAndForget((async()=>(function(i,o,c,l,h){const f=new Jm({next:g=>{f.Nu(),o.enqueueAndForget((()=>Bm(i,p))),g.fromCache&&l.source==="server"?h.reject(new x(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(g)},error:g=>h.reject(g)}),p=new $m(c,f,{includeMetadataChanges:!0,qa:!0});return Um(i,p)})(await Zm(n),n.asyncQueue,e,t,r))),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function eg(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pd=new Map;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hT="firestore.googleapis.com",Rd=!0;class Cd{constructor(e){if(e.host===void 0){if(e.ssl!==void 0)throw new x(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host=hT,this.ssl=Rd}else this.host=e.host,this.ssl=e.ssl??Rd;if(this.isUsingEmulator=e.emulatorOptions!==void 0,this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=gm;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Em)throw new x(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}aI("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=eg(e.experimentalLongPollingOptions??{}),(function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new x(C.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}})(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&(function(r,s){return r.timeoutSeconds===s.timeoutSeconds})(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Sl{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Cd({}),this._settingsFrozen=!1,this._emulatorOptions={},this._terminateTask="notTerminated"}get app(){if(!this._app)throw new x(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new x(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Cd(e),this._emulatorOptions=e.emulatorOptions||{},e.credentials!==void 0&&(this._authCredentials=(function(r){if(!r)return new XE;switch(r.type){case"firstParty":return new tI(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new x(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}})(e.credentials))}_getSettings(){return this._settings}_getEmulatorOptions(){return this._emulatorOptions}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return(function(t){const r=Pd.get(t);r&&(k("ComponentProvider","Removing Datastore"),Pd.delete(t),r.terminate())})(this),Promise.resolve()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class es{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new es(this.firestore,e,this._query)}}class Ee{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new fn(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Ee(this.firestore,e,this._key)}toJSON(){return{type:Ee._jsonSchemaVersion,referencePath:this._key.toString()}}static fromJSON(e,t,r){if(ci(t,Ee._jsonSchema))return new Ee(e,r||null,new L(se.fromString(t.referencePath)))}}Ee._jsonSchemaVersion="firestore/documentReference/1.0",Ee._jsonSchema={type:be("string",Ee._jsonSchemaVersion),referencePath:be("string")};class fn extends es{constructor(e,t,r){super(e,t,jo(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Ee(this.firestore,null,new L(e))}withConverter(e){return new fn(this.firestore,e,this._path)}}function Pl(n,e,...t){if(n=Ve(n),rp("collection","path",e),n instanceof Sl){const r=se.fromString(e,...t);return vh(r),new fn(n,null,r)}{if(!(n instanceof Ee||n instanceof fn))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(se.fromString(e,...t));return vh(r),new fn(n.firestore,null,r)}}function Ot(n,e,...t){if(n=Ve(n),arguments.length===1&&(e=Kc.newId()),rp("doc","path",e),n instanceof Sl){const r=se.fromString(e,...t);return yh(r),new Ee(n,null,new L(r))}{if(!(n instanceof Ee||n instanceof fn))throw new x(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(se.fromString(e,...t));return yh(r),new Ee(n.firestore,n instanceof fn?n.converter:null,new L(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dd="AsyncQueue";class Vd{constructor(e=Promise.resolve()){this.Xu=[],this.ec=!1,this.tc=[],this.nc=null,this.rc=!1,this.sc=!1,this.oc=[],this.M_=new Vm(this,"async_queue_retry"),this._c=()=>{const r=no();r&&k(Dd,"Visibility state changed to "+r.visibilityState),this.M_.w_()},this.ac=e;const t=no();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this._c)}get isShuttingDown(){return this.ec}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.uc(),this.cc(e)}enterRestrictedMode(e){if(!this.ec){this.ec=!0,this.sc=e||!1;const t=no();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this._c)}}enqueue(e){if(this.uc(),this.ec)return new Promise((()=>{}));const t=new Tt;return this.cc((()=>this.ec&&this.sc?Promise.resolve():(e().then(t.resolve,t.reject),t.promise))).then((()=>t.promise))}enqueueRetryable(e){this.enqueueAndForget((()=>(this.Xu.push(e),this.lc())))}async lc(){if(this.Xu.length!==0){try{await this.Xu[0](),this.Xu.shift(),this.M_.reset()}catch(e){if(!vn(e))throw e;k(Dd,"Operation failed with retryable error: "+e)}this.Xu.length>0&&this.M_.p_((()=>this.lc()))}}cc(e){const t=this.ac.then((()=>(this.rc=!0,e().catch((r=>{throw this.nc=r,this.rc=!1,Ke("INTERNAL UNHANDLED ERROR: ",Nd(r)),r})).then((r=>(this.rc=!1,r))))));return this.ac=t,t}enqueueAfterDelay(e,t,r){this.uc(),this.oc.indexOf(e)>-1&&(t=0);const s=Il.createAndSchedule(this,e,t,r,(i=>this.hc(i)));return this.tc.push(s),s}uc(){this.nc&&B(47125,{Pc:Nd(this.nc)})}verifyOperationInProgress(){}async Tc(){let e;do e=this.ac,await e;while(e!==this.ac)}Ic(e){for(const t of this.tc)if(t.timerId===e)return!0;return!1}Ec(e){return this.Tc().then((()=>{this.tc.sort(((t,r)=>t.targetTimeMs-r.targetTimeMs));for(const t of this.tc)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.Tc()}))}dc(e){this.oc.push(e)}hc(e){const t=this.tc.indexOf(e);this.tc.splice(t,1)}}function Nd(n){let e=n.message||"";return n.stack&&(e=n.stack.includes(n.message)?n.stack:n.message+`
`+n.stack),e}class nr extends Sl{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Vd,this._persistenceKey=s?.name||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Vd(e),this._firestoreClient=void 0,await e}}}function dT(n,e,t){t||(t=_o);const r=Mc(n,"firestore");if(r.isInitialized(t)){const s=r.getImmediate({identifier:t}),i=r.getOptions(t);if(zn(i,e))return s;throw new x(C.FAILED_PRECONDITION,"initializeFirestore() has already been called with different options. To avoid this error, call initializeFirestore() with the same options as when it was originally called, or call getFirestore() to return the already initialized instance.")}if(e.cacheSizeBytes!==void 0&&e.localCache!==void 0)throw new x(C.INVALID_ARGUMENT,"cache and cacheSizeBytes cannot be specified at the same time as cacheSizeBytes willbe deprecated. Instead, specify the cache size in the cache object");if(e.cacheSizeBytes!==void 0&&e.cacheSizeBytes!==-1&&e.cacheSizeBytes<Em)throw new x(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");return e.host&&Kr(e.host)&&of(e.host),r.initialize({options:e,instanceIdentifier:t})}function Rl(n){if(n._terminated)throw new x(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||fT(n),n._firestoreClient}function fT(n){const e=n._freezeSettings(),t=(function(s,i,o,c){return new $I(s,i,o,c.host,c.ssl,c.experimentalForceLongPolling,c.experimentalAutoDetectLongPolling,eg(c.experimentalLongPollingOptions),c.useFetchStreams,c.isUsingEmulator)})(n._databaseId,n._app?.options.appId||"",n._persistenceKey,e);n._componentsProvider||e.localCache?._offlineComponentProvider&&e.localCache?._onlineComponentProvider&&(n._componentsProvider={_offline:e.localCache._offlineComponentProvider,_online:e.localCache._onlineComponentProvider}),n._firestoreClient=new oT(n._authCredentials,n._appCheckCredentials,n._queue,t,n._componentsProvider&&(function(s){const i=s?._online.build();return{_offline:s?._offline.build(i),_online:i}})(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this._byteString=e}static fromBase64String(e){try{return new ot(Te.fromBase64String(e))}catch(t){throw new x(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new ot(Te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}toJSON(){return{type:ot._jsonSchemaVersion,bytes:this.toBase64()}}static fromJSON(e){if(ci(e,ot._jsonSchema))return ot.fromBase64String(e.bytes)}}ot._jsonSchemaVersion="firestore/bytes/1.0",ot._jsonSchema={type:be("string",ot._jsonSchemaVersion),bytes:be("string")};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ta{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new x(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class na{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class At{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new x(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new x(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}_compareTo(e){return Q(this._lat,e._lat)||Q(this._long,e._long)}toJSON(){return{latitude:this._lat,longitude:this._long,type:At._jsonSchemaVersion}}static fromJSON(e){if(ci(e,At._jsonSchema))return new At(e.latitude,e.longitude)}}At._jsonSchemaVersion="firestore/geoPoint/1.0",At._jsonSchema={type:be("string",At._jsonSchemaVersion),latitude:be("number"),longitude:be("number")};/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class St{constructor(e){this._values=(e||[]).map((t=>t))}toArray(){return this._values.map((e=>e))}isEqual(e){return(function(r,s){if(r.length!==s.length)return!1;for(let i=0;i<r.length;++i)if(r[i]!==s[i])return!1;return!0})(this._values,e._values)}toJSON(){return{type:St._jsonSchemaVersion,vectorValues:this._values}}static fromJSON(e){if(ci(e,St._jsonSchema)){if(Array.isArray(e.vectorValues)&&e.vectorValues.every((t=>typeof t=="number")))return new St(e.vectorValues);throw new x(C.INVALID_ARGUMENT,"Expected 'vectorValues' field to be a number array")}}}St._jsonSchemaVersion="firestore/vectorValue/1.0",St._jsonSchema={type:be("string",St._jsonSchemaVersion),vectorValues:be("object")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const pT=/^__.*__$/;class mT{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new zt(e,this.data,this.fieldMask,t,this.fieldTransforms):new Xr(e,this.data,t,this.fieldTransforms)}}class tg{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return new zt(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function ng(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B(40011,{Ac:n})}}class Cl{constructor(e,t,r,s,i,o){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Rc(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Ac(){return this.settings.Ac}Vc(e){return new Cl({...this.settings,...e},this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}mc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.gc(e),r}yc(e){const t=this.path?.child(e),r=this.Vc({path:t,fc:!1});return r.Rc(),r}wc(e){return this.Vc({path:void 0,fc:!0})}Sc(e){return Co(e,this.settings.methodName,this.settings.bc||!1,this.path,this.settings.Dc)}contains(e){return this.fieldMask.find((t=>e.isPrefixOf(t)))!==void 0||this.fieldTransforms.find((t=>e.isPrefixOf(t.field)))!==void 0}Rc(){if(this.path)for(let e=0;e<this.path.length;e++)this.gc(this.path.get(e))}gc(e){if(e.length===0)throw this.Sc("Document fields must not be empty");if(ng(this.Ac)&&pT.test(e))throw this.Sc('Document fields cannot begin and end with "__"')}}class gT{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||Zo(e)}Cc(e,t,r,s=!1){return new Cl({Ac:e,methodName:t,Dc:r,path:ge.emptyPath(),fc:!1,bc:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function ra(n){const e=n._freezeSettings(),t=Zo(n._databaseId);return new gT(n._databaseId,!!e.ignoreUndefinedProperties,t)}function rg(n,e,t,r,s,i={}){const o=n.Cc(i.merge||i.mergeFields?2:0,e,t,s);Vl("Data must be an object, but it was:",o,r);const c=sg(r,o);let l,h;if(i.merge)l=new Je(o.fieldMask),h=o.fieldTransforms;else if(i.mergeFields){const f=[];for(const p of i.mergeFields){const g=Sc(e,p,t);if(!o.contains(g))throw new x(C.INVALID_ARGUMENT,`Field '${g}' is specified in your field mask but missing from your input data.`);og(f,g)||f.push(g)}l=new Je(f),h=o.fieldTransforms.filter((p=>l.covers(p.field)))}else l=null,h=o.fieldTransforms;return new mT(new Ue(c),l,h)}class sa extends na{_toFieldTransform(e){if(e.Ac!==2)throw e.Ac===1?e.Sc(`${this._methodName}() can only appear at the top level of your update data`):e.Sc(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof sa}}class Dl extends na{_toFieldTransform(e){return new Kp(e.path,new $r)}isEqual(e){return e instanceof Dl}}function _T(n,e,t,r){const s=n.Cc(1,e,t);Vl("Data must be an object, but it was:",s,r);const i=[],o=Ue.empty();En(r,((l,h)=>{const f=Nl(e,l,t);h=Ve(h);const p=s.yc(f);if(h instanceof sa)i.push(f);else{const g=_i(h,p);g!=null&&(i.push(f),o.set(f,g))}}));const c=new Je(i);return new tg(o,c,s.fieldTransforms)}function yT(n,e,t,r,s,i){const o=n.Cc(1,e,t),c=[Sc(e,r,t)],l=[s];if(i.length%2!=0)throw new x(C.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let g=0;g<i.length;g+=2)c.push(Sc(e,i[g])),l.push(i[g+1]);const h=[],f=Ue.empty();for(let g=c.length-1;g>=0;--g)if(!og(h,c[g])){const w=c[g];let A=l[g];A=Ve(A);const V=o.yc(w);if(A instanceof sa)h.push(w);else{const D=_i(A,V);D!=null&&(h.push(w),f.set(w,D))}}const p=new Je(h);return new tg(f,p,o.fieldTransforms)}function vT(n,e,t,r=!1){return _i(t,n.Cc(r?4:3,e))}function _i(n,e){if(ig(n=Ve(n)))return Vl("Unsupported field value:",e,n),sg(n,e);if(n instanceof na)return(function(r,s){if(!ng(s.Ac))throw s.Sc(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Sc(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)})(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.fc&&e.Ac!==4)throw e.Sc("Nested arrays are not supported");return(function(r,s){const i=[];let o=0;for(const c of r){let l=_i(c,s.wc(o));l==null&&(l={nullValue:"NULL_VALUE"}),i.push(l),o++}return{arrayValue:{values:i}}})(n,e)}return(function(r,s){if((r=Ve(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return aw(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=oe.fromDate(r);return{timestampValue:jr(s.serializer,i)}}if(r instanceof oe){const i=new oe(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:jr(s.serializer,i)}}if(r instanceof At)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof ot)return{bytesValue:em(s.serializer,r._byteString)};if(r instanceof Ee){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.Sc(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:ll(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof St)return(function(o,c){return{mapValue:{fields:{[tl]:{stringValue:nl},[Mr]:{arrayValue:{values:o.toArray().map((h=>{if(typeof h!="number")throw c.Sc("VectorValues must only contain numeric values.");return sl(c.serializer,h)}))}}}}}})(r,s);throw s.Sc(`Unsupported field value: ${Lo(r)}`)})(n,e)}function sg(n,e){const t={};return vp(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):En(n,((r,s)=>{const i=_i(s,e.mc(r));i!=null&&(t[r]=i)})),{mapValue:{fields:t}}}function ig(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof oe||n instanceof At||n instanceof ot||n instanceof Ee||n instanceof na||n instanceof St)}function Vl(n,e,t){if(!ig(t)||!sp(t)){const r=Lo(t);throw r==="an object"?e.Sc(n+" a custom object"):e.Sc(n+" "+r)}}function Sc(n,e,t){if((e=Ve(e))instanceof ta)return e._internalPath;if(typeof e=="string")return Nl(n,e);throw Co("Field path arguments must be of type string or ",n,!1,void 0,t)}const ET=new RegExp("[~\\*/\\[\\]]");function Nl(n,e,t){if(e.search(ET)>=0)throw Co(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new ta(...e.split("."))._internalPath}catch{throw Co(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Co(n,e,t,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let l="";return(i||o)&&(l+=" (found",i&&(l+=` in field ${r}`),o&&(l+=` in document ${s}`),l+=")"),new x(C.INVALID_ARGUMENT,c+n+l)}function og(n,e){return n.some((t=>t.isEqual(e)))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ag{constructor(e,t,r,s,i){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new Ee(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new IT(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(kl("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class IT extends ag{data(){return super.data()}}function kl(n,e){return typeof e=="string"?Nl(n,e):e instanceof ta?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wT(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new x(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class xl{}class bT extends xl{}function kd(n,e,...t){let r=[];e instanceof xl&&r.push(e),r=r.concat(t),(function(i){const o=i.filter((l=>l instanceof Ol)).length,c=i.filter((l=>l instanceof ia)).length;if(o>1||o>0&&c>0)throw new x(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")})(r);for(const s of r)n=s._apply(n);return n}class ia extends bT{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new ia(e,t,r)}_apply(e){const t=this._parse(e);return cg(e._query,t),new es(e.firestore,e.converter,fc(e._query,t))}_parse(e){const t=ra(e.firestore);return(function(i,o,c,l,h,f,p){let g;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new x(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){Od(p,f);const A=[];for(const V of p)A.push(xd(l,i,V));g={arrayValue:{values:A}}}else g=xd(l,i,p)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||Od(p,f),g=vT(c,o,p,f==="in"||f==="not-in");return ee.create(h,f,g)})(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function TT(n,e,t){const r=e,s=kl("where",n);return ia._create(s,r,t)}class Ol extends xl{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Ol(e,t)}_parse(e){const t=this._queryConstraints.map((r=>r._parse(e))).filter((r=>r.getFilters().length>0));return t.length===1?t[0]:ae.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:((function(s,i){let o=s;const c=i.getFlattenedFilters();for(const l of c)cg(o,l),o=fc(o,l)})(e._query,t),new es(e.firestore,e.converter,fc(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function xd(n,e,t){if(typeof(t=Ve(t))=="string"){if(t==="")throw new x(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Lp(e)&&t.indexOf("/")!==-1)throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(se.fromString(t));if(!L.isDocumentKey(r))throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return Zs(n,new L(r))}if(t instanceof Ee)return Zs(n,t._key);throw new x(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Lo(t)}.`)}function Od(n,e){if(!Array.isArray(n)||n.length===0)throw new x(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function cg(n,e){const t=(function(s,i){for(const o of s)for(const c of o.getFlattenedFilters())if(i.indexOf(c.op)>=0)return c.op;return null})(n.filters,(function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}})(e.op));if(t!==null)throw t===e.op?new x(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new x(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class AT{convertValue(e,t="none"){switch(pn(e)){case 0:return null;case 1:return e.booleanValue;case 2:return fe(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(Ut(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B(62114,{value:e})}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return En(e,((s,i)=>{r[s]=this.convertValue(i,t)})),r}convertVectorValue(e){const t=e.fields?.[Mr].arrayValue?.values?.map((r=>fe(r.doubleValue)));return new St(t)}convertGeoPoint(e){return new At(fe(e.latitude),fe(e.longitude))}convertArray(e,t){return(e.values||[]).map((r=>this.convertValue(r,t)))}convertServerTimestamp(e,t){switch(t){case"previous":const r=qo(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(Js(e));default:return null}}convertTimestamp(e){const t=Ft(e);return new oe(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=se.fromString(e);G(um(r),9688,{name:e});const s=new Kn(r.get(1),r.get(3)),i=new L(r.popFirst(5));return s.isEqual(t)||Ke(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),i}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lg(n,e,t){let r;return r=n?n.toFirestore(e):e,r}class Cs{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class $n extends ag{constructor(e,t,r,s,i,o){super(e,t,r,s,o),this._firestore=e,this._firestoreImpl=e,this.metadata=i}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new ro(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(kl("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}toJSON(){if(this.metadata.hasPendingWrites)throw new x(C.FAILED_PRECONDITION,"DocumentSnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e=this._document,t={};return t.type=$n._jsonSchemaVersion,t.bundle="",t.bundleSource="DocumentSnapshot",t.bundleName=this._key.toString(),!e||!e.isValidDocument()||!e.isFoundDocument()?t:(this._userDataWriter.convertObjectMap(e.data.value.mapValue.fields,"previous"),t.bundle=(this._firestore,this.ref.path,"NOT SUPPORTED"),t)}}$n._jsonSchemaVersion="firestore/documentSnapshot/1.0",$n._jsonSchema={type:be("string",$n._jsonSchemaVersion),bundleSource:be("string","DocumentSnapshot"),bundleName:be("string"),bundle:be("string")};class ro extends $n{data(e={}){return super.data(e)}}class Pr{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Cs(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach((t=>e.push(t))),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach((r=>{e.call(t,new ro(this._firestore,this._userDataWriter,r.key,r,new Cs(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))}))}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new x(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=(function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map((c=>{const l=new ro(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Cs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}}))}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter((c=>i||c.type!==3)).map((c=>{const l=new ro(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Cs(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=o.indexOf(c.doc.key),o=o.delete(c.doc.key)),c.type!==1&&(o=o.add(c.doc),f=o.indexOf(c.doc.key)),{type:ST(c.type),doc:l,oldIndex:h,newIndex:f}}))}})(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}toJSON(){if(this.metadata.hasPendingWrites)throw new x(C.FAILED_PRECONDITION,"QuerySnapshot.toJSON() attempted to serialize a document with pending writes. Await waitForPendingWrites() before invoking toJSON().");const e={};e.type=Pr._jsonSchemaVersion,e.bundleSource="QuerySnapshot",e.bundleName=Kc.newId(),this._firestore._databaseId.database,this._firestore._databaseId.projectId;const t=[],r=[],s=[];return this.docs.forEach((i=>{i._document!==null&&(t.push(i._document),r.push(this._userDataWriter.convertObjectMap(i._document.data.value.mapValue.fields,"previous")),s.push(i.ref.path))})),e.bundle=(this._firestore,this.query._query,e.bundleName,"NOT SUPPORTED"),e}}function ST(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B(61501,{type:n})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function so(n){n=Rt(n,Ee);const e=Rt(n.firestore,nr);return lT(Rl(e),n._key).then((t=>DT(e,n,t)))}Pr._jsonSchemaVersion="firestore/querySnapshot/1.0",Pr._jsonSchema={type:be("string",Pr._jsonSchemaVersion),bundleSource:be("string","QuerySnapshot"),bundleName:be("string"),bundle:be("string")};class ug extends AT{constructor(e){super(),this.firestore=e}convertBytes(e){return new ot(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Ee(this.firestore,null,t)}}function PT(n){n=Rt(n,es);const e=Rt(n.firestore,nr),t=Rl(e),r=new ug(e);return wT(n._query),uT(t,n._query).then((s=>new Pr(e,r,n,s)))}function RT(n,e,t){n=Rt(n,Ee);const r=Rt(n.firestore,nr),s=lg(n.converter,e);return aa(r,[rg(ra(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,Be.none())])}function oa(n,e,t,...r){n=Rt(n,Ee);const s=Rt(n.firestore,nr),i=ra(s);let o;return o=typeof(e=Ve(e))=="string"||e instanceof ta?yT(i,"updateDoc",n._key,e,t,r):_T(i,"updateDoc",n._key,e),aa(s,[o.toMutation(n._key,Be.exists(!0))])}function CT(n){return aa(Rt(n.firestore,nr),[new Wo(n._key,Be.none())])}function hg(n,e){const t=Rt(n.firestore,nr),r=Ot(n),s=lg(n.converter,e);return aa(t,[rg(ra(n.firestore),"addDoc",r._key,s,n.converter!==null,{}).toMutation(r._key,Be.exists(!1))]).then((()=>r))}function aa(n,e){return(function(r,s){const i=new Tt;return r.asyncQueue.enqueueAndForget((async()=>Jb(await cT(r),s,i))),i.promise})(Rl(n),e)}function DT(n,e,t){const r=t.docs.get(e._key),s=new ug(n);return new $n(n,s,e._key,r,new Cs(t.hasPendingWrites,t.fromCache),e.converter)}class VT{constructor(e){let t;this.kind="persistent",e?.tabManager?(e.tabManager._initialize(e),t=e.tabManager):(t=dg(void 0),t._initialize(e)),this._onlineComponentProvider=t._onlineComponentProvider,this._offlineComponentProvider=t._offlineComponentProvider}toJSON(){return{kind:this.kind}}}function NT(n){return new VT(n)}class kT{constructor(e){this.forceOwnership=e,this.kind="persistentSingleTab"}toJSON(){return{kind:this.kind}}_initialize(e){this._onlineComponentProvider=Ro.provider,this._offlineComponentProvider={build:t=>new iT(t,e?.cacheSizeBytes,this.forceOwnership)}}}function dg(n){return new kT(n?.forceOwnership)}function xT(){return new Dl("serverTimestamp")}(function(e,t=!0){(function(s){Jr=s})(Wr),Dr(new jn("firestore",((r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),c=new nr(new ZE(r.getProvider("auth-internal")),new nI(o,r.getProvider("app-check-internal")),(function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new x(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Kn(h.options.projectId,f)})(o,s),o);return i={useFetchStreams:t,...i},c._setSettings(i),c}),"PUBLIC").setMultipleInstances(!0)),ln(ph,mh,e),ln(ph,mh,"esm2020")})();const OT={apiKey:"AIzaSyCIf20N58VHFHqK9_skOyhsWcsbEhYaEsU",authDomain:"buca-scdbs.firebaseapp.com",projectId:"buca-scdbs",storageBucket:"buca-scdbs.appspot.com",messagingSenderId:"1019841824217",appId:"1:1019841824217:web:383cb2b487b6b98c45c8c8",measurementId:"G-Q7WFMC336J"},fg=ff(OT),Pt=dT(fg,{localCache:NT({tabManager:dg()})}),Hr=KE(fg),Do=(n,e="N/A",t="N/A")=>{document.querySelector(".app-loader")?.remove(),document.body.innerHTML="";const r=document.createElement("div");r.className="critical-error-overlay";const s=n?.message||n||"Error desconocido";let i="Ubicación desconocida";typeof e=="string"?i=`${e.split("/").pop()} (Línea: ${t})`:typeof e=="object"&&e!==null&&e.message?i=`Contexto: ${e.message}`:typeof e=="object"&&e!==null&&(i="Contexto: Objeto de error (sin mensaje)"),r.innerHTML=`
        <i class="fas fa-bomb critical-error-icon"></i>
        <h2 class="critical-error-title">¡Ups! Algo salió muy mal</h2>
        <p class="critical-error-message">
            La aplicación ha encontrado un error crítico y no puede continuar. 
            Esto puede deberse a un problema de red o un error en el código.
        </p><div class="critical-error-details">
        <strong>Error:</strong> ${s}<br>
        <strong>Ubicación:</strong> ${i}
    </div>`,document.body.appendChild(r)},yt={CORE:"core",SGA_SCM:"sga_scm",POS:"pos",CRM:"crm"},Ll=()=>({isAuthenticated:!1,isLoading:!1,session:{isLoggedIn:!1,user:null,business:null},settings:{store:{store_name:"Mi Tienda",store_description:"Descripción de la tienda"},currencies:{principal:{symbol:"$",rate:1},base:{symbol:"Bs."}},products:{available_categories:["General","Alimentos","Bebidas","Limpieza","cat_viveres"],tax_rate:16,calculation_method:"markup"},appearance:{header:{showFullscreen:!0,showMessages:!0,showNotifications:!0,showSettings:!0,showRate:!0,showLanguage:!0}},appConfig:null,exchangeRates:null,permissions:null},products:[],clients:[],sales:[],ui:{navContext:yt.CORE,toast:{isVisible:!1,message:"",type:"info"}}}),F=Ll(),LT=Pl(Pt,"activity_log"),pg=!0;async function Ml(n){if(!n.type||!n.context){console.warn("[Logger] logActivity necesita type y context.",n);return}const e=F.session?.user?.uid||"system",t=F.session?.business?.id||"unknown_business",r=F.session?.business?.departmentId||"unknown_dept",s={...n,timestamp:xT(),environment:"production",userId:e,businessId:t,departmentId:r,userAgent:navigator.userAgent};try{pg&&await hg(LT,s)}catch(i){console.error("Error al guardar log de actividad:",i)}}class MT{constructor(){this.IS_PRODUCTION=pg}info(e,...t){console.log(`[INFO] 🔵 ${e}`,...t)}warn(e,...t){console.warn(`[WARN] 🟡 ${e}`,...t)}error(e,...t){console.error(`[ERROR] 🔴 ${e}`,...t)}trace(e,...t){this.IS_PRODUCTION||console.log(`[TRACE] ιχ ${e}`,...t)}}const N=new MT,dt={SUPER_ADMIN:"super_admin",PROPIETARIO:"Propietario",OPERADOR:"Operador",CAJERO:"Cajero"},K={VIEW_DASHBOARD:"view:dashboard",VIEW_INVENTORY_MODULE:"view:inventory_module",VIEW_PRODUCTS:"view:products",CREATE_PRODUCT:"product:create",EDIT_PRODUCT:"product:edit",DELETE_PRODUCT:"product:delete",VIEW_POS_MODULE:"view:pos_module",USE_POS:"pos:use",VIEW_CLIENTS_MODULE:"view:clients_module",VIEW_COMPANIES_MODULE:"view:companies_module",VIEW_COMPANIES:"view:companies",CREATE_COMPANY:"company:create",EDIT_COMPANY:"company:edit",DELETE_COMPANY:"company:delete",MANAGE_COMPANY_USERS:"company:manage_users",MANAGE_COMPANY_PLAN:"company:manage_plan",EDIT_SETTINGS_BUSINESS:"settings:edit_business",EDIT_SETTINGS_SYSTEM:"settings:edit_system"},FT={[dt.SUPER_ADMIN]:{permissions:[K.VIEW_DASHBOARD,K.VIEW_COMPANIES_MODULE,K.VIEW_COMPANIES,K.CREATE_COMPANY,K.EDIT_COMPANY,K.DELETE_COMPANY,K.MANAGE_COMPANY_USERS,K.MANAGE_COMPANY_PLAN,K.EDIT_SETTINGS_SYSTEM,K.EDIT_SETTINGS_BUSINESS,K.VIEW_INVENTORY_MODULE,K.VIEW_PRODUCTS,K.CREATE_PRODUCT,K.EDIT_PRODUCT,K.DELETE_PRODUCT,K.VIEW_POS_MODULE,K.USE_POS,K.VIEW_CLIENTS_MODULE]},[dt.PROPIETARIO]:{permissions:[K.VIEW_DASHBOARD,K.VIEW_INVENTORY_MODULE,K.VIEW_PRODUCTS,K.CREATE_PRODUCT,K.EDIT_PRODUCT,K.DELETE_PRODUCT,K.VIEW_POS_MODULE,K.USE_POS,K.VIEW_CLIENTS_MODULE,K.EDIT_SETTINGS_BUSINESS]},[dt.OPERADOR]:{permissions:[K.VIEW_DASHBOARD,K.VIEW_INVENTORY_MODULE,K.VIEW_PRODUCTS]},[dt.CAJERO]:{permissions:[K.VIEW_DASHBOARD,K.VIEW_POS_MODULE,K.USE_POS,K.VIEW_CLIENTS_MODULE]}};let Pc=new Set;function UT(n=[]){Pc.clear(),n.forEach(e=>{const t=FT[e];t?t.permissions.forEach(r=>Pc.add(r)):console.warn(`⚠️ Rol ${e} no encontrado en la configuración`)})}function Fe(n){return Pc.has(n)}const Rc=(n,e)=>e.some(t=>n instanceof t);let Ld,Md;function BT(){return Ld||(Ld=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function $T(){return Md||(Md=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Cc=new WeakMap,za=new WeakMap,ca=new WeakMap;function qT(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",i),n.removeEventListener("error",o)},i=()=>{t(qn(n.result)),s()},o=()=>{r(n.error),s()};n.addEventListener("success",i),n.addEventListener("error",o)});return ca.set(e,n),e}function zT(n){if(Cc.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",i),n.removeEventListener("error",o),n.removeEventListener("abort",o)},i=()=>{t(),s()},o=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",i),n.addEventListener("error",o),n.addEventListener("abort",o)});Cc.set(n,e)}let Dc={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Cc.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return qn(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function mg(n){Dc=n(Dc)}function jT(n){return $T().includes(n)?function(...e){return n.apply(Vc(this),e),qn(this.request)}:function(...e){return qn(n.apply(Vc(this),e))}}function GT(n){return typeof n=="function"?jT(n):(n instanceof IDBTransaction&&zT(n),Rc(n,BT())?new Proxy(n,Dc):n)}function qn(n){if(n instanceof IDBRequest)return qT(n);if(za.has(n))return za.get(n);const e=GT(n);return e!==n&&(za.set(n,e),ca.set(e,n)),e}const Vc=n=>ca.get(n);function HT(n,e,{blocked:t,upgrade:r,blocking:s,terminated:i}={}){const o=indexedDB.open(n,e),c=qn(o);return r&&o.addEventListener("upgradeneeded",l=>{r(qn(o.result),l.oldVersion,l.newVersion,qn(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),c.then(l=>{i&&l.addEventListener("close",()=>i()),s&&l.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const KT=["get","getKey","getAll","getAllKeys","count"],WT=["put","add","delete","clear"],ja=new Map;function Fd(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(ja.get(e))return ja.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=WT.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||KT.includes(t)))return;const i=async function(o,...c){const l=this.transaction(o,s?"readwrite":"readonly");let h=l.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&l.done]))[0]};return ja.set(e,i),i}mg(n=>({...n,get:(e,t,r)=>Fd(e,t)||n.get(e,t,r),has:(e,t)=>!!Fd(e,t)||n.has(e,t)}));const QT=["continue","continuePrimaryKey","advance"],Ud={},Nc=new WeakMap,gg=new WeakMap,YT={get(n,e){if(!QT.includes(e))return n[e];let t=Ud[e];return t||(t=Ud[e]=function(...r){Nc.set(this,gg.get(this)[e](...r))}),t}};async function*JT(...n){let e=this;if(e instanceof IDBCursor||(e=await e.openCursor(...n)),!e)return;e=e;const t=new Proxy(e,YT);for(gg.set(t,e),ca.set(t,Vc(e));e;)yield t,e=await(Nc.get(t)||e.continue()),Nc.delete(t)}function Bd(n,e){return e===Symbol.asyncIterator&&Rc(n,[IDBIndex,IDBObjectStore,IDBCursor])||e==="iterate"&&Rc(n,[IDBIndex,IDBObjectStore])}mg(n=>({...n,get(e,t,r){return Bd(e,t)?JT:n.get(e,t,r)},has(e,t){return Bd(e,t)||n.has(e,t)}}));const XT="bucaAppDB",ZT=1;let Bi=null;async function Rn(){return Bi||(Bi=await HT(XT,ZT,{upgrade(n){console.log("[indexedDb] Actualizando la base de datos..."),n.objectStoreNames.contains("products")||n.createObjectStore("products",{keyPath:"id"}),n.objectStoreNames.contains("settings")||n.createObjectStore("settings")}}),console.log("[indexedDb] Base de datos abierta exitosamente"),Bi)}const eA={init:async()=>{try{await Rn()}catch(n){console.error("[indexedDb] Error fatal al abrir la base de datos",n)}},getAllProducts:async n=>{try{return await(await Rn()).getAll("products")}catch(e){return console.error("[indexedDb] Error en getAllProducts",e),[]}},saveProduct:async(n,e)=>{try{return await(await Rn()).put("products",e)}catch(t){throw console.error("[indexedDb] Error en saveProduct",t),t}},deleteProduct:async(n,e)=>{try{return await(await Rn()).delete("products",e)}catch(t){throw console.error("[indexedDb] Error en deleteProduct",t),t}},updateProduct:async(n,e,t)=>{try{const s=(await Rn()).transaction("products","readwrite"),i=s.objectStore("products"),o=await i.get(e);if(o){const c={...o,...t};await i.put(c)}await s.done}catch(r){throw console.error("[indexedDb] Error en updateProduct",r),r}},getSettings:async n=>{try{return await(await Rn()).get("settings","app_settings")}catch(e){return console.error("[indexedDb] Error en getSettings",e),null}},saveSettings:async n=>{try{return await(await Rn()).put("settings",n.settings,"app_settings")}catch(e){throw console.error("[indexedDb] Error en saveSettings",e),e}}},_g=n=>Pl(Pt,n),Fl=n=>Ot(Pt,n),Ga=async(n,e)=>{try{let t=kd(_g(n));e&&e.length>0&&e.forEach(i=>{Array.isArray(i)&&i.length===3&&(t=kd(t,TT(i[0],i[1],i[2])))});const r=await PT(t),s=[];return r.forEach(i=>{s.push({id:i.id,...i.data()})}),s}catch(t){throw console.error(`[firebase] Error en getAll(${n})`,t),t}},$d=async(n,e)=>{try{return(await hg(_g(n),e)).id}catch(t){throw console.error(`[firebase] Error en create(${n})`,t,e),t}},qd=async(n,e,t)=>{try{const r=Fl(`${n}/${e}`);await RT(r,t)}catch(r){throw console.error(`[firebase] Error en set(${n}, ${e})`,r,t),r}},tA=async(n,e,t)=>{try{const r=Fl(`${n}/${e}`);await oa(r,t)}catch(r){throw console.error(`[firebase] Error en update(${n}, ${e})`,r,t),r}},nA=async(n,e)=>{try{const t=Fl(`${n}/${e}`);await CT(t)}catch(t){throw console.error(`[firebase] Error en remove(${n}, ${e})`,t),t}},rA={async init(){console.log("[firebase] Adaptador inicializado")},async getAllProducts(n){try{if(!n.session?.business?.id)return[];const e=n.session.business.id;return e==="admin_view"?[]:await Ga(`businesses/${e}/products`)||[]}catch(e){return console.error("[firebase] Error obteniendo productos:",e),[]}},async createProduct(n,e){try{if(!n.session?.business?.id)throw new Error("No hay ID de negocio en la sesión para crear el producto.");const t=n.session.business.id,r=await $d(`businesses/${t}/products`,e);return{...e,id:r}}catch(t){throw console.error("[firebase] Error creando producto:",t),t}},async saveSettings(n){try{if(!n.session?.business?.id)return;const e=n.session.business.id;if(e==="admin_view")return;await qd(`businesses/${e}/settings`,"app",n.settings)}catch(e){throw console.error("[firebase] Error guardando configuración:",e),e}},async getUserByUsername(n){try{const e=await Ga("users",[["username","==",n]]);return e.length>0?e[0]:null}catch(e){return console.error("[firebase] Error obteniendo usuario:",e),null}},async saveUser(n){try{if(n.id)await qd("users",n.id,n);else{const e=await $d("users",n);return{...n,id:e}}}catch(e){throw console.error("[firebase] Error guardando usuario:",e),e}},async deleteProduct(n,e){try{if(!n.session?.business?.id)throw new Error("No hay ID de negocio en la sesión para eliminar el producto.");const t=n.session.business.id;await nA(`businesses/${t}/products`,e)}catch(t){throw console.error("[firebase] Error eliminando producto:",t),t}},async updateProduct(n,e,t){try{if(!n.session?.business?.id)throw new Error("No hay ID de negocio en la sesión para actualizar el producto.");const r=n.session.business.id;await tA(`businesses/${r}/products`,e,t)}catch(r){throw console.error("[firebase] Error actualizando producto:",r),r}},async getAllBusinesses(){try{return await Ga("businesses")||[]}catch(n){return console.error("[firebase] Error obteniendo todos los negocios:",n),[]}},async getBusinessDetails(n){}},yg="buc_local_storage_db_app_v3";function pr(){return JSON.parse(localStorage.getItem(yg)||"{}")}function $i(n){localStorage.setItem(yg,JSON.stringify(n))}const sA={init:async()=>{console.log("Adaptador LocalStorage inicializado.")},getAllProducts:async n=>pr().products||[],saveProduct:async(n,e)=>{const t=pr();t.products||(t.products=[]);const r=t.products.findIndex(s=>s.product_info.id===e.product_info.id);return r>-1?t.products[r]=e:t.products.push(e),$i(t),e},deleteProduct:async(n,e)=>{const t=pr();t.products&&(t.products=t.products.filter(r=>r.product_info.id!==e),$i(t))},updateProduct:async(n,e,t)=>{const r=pr();if(!r.products)return;const s=r.products.findIndex(i=>i.id===e);s>-1&&(r.products[s]={...r.products[s],...t}),$i(r)},getSettings:async n=>pr().settings||null,saveSettings:async n=>{const e=pr();e.settings=n.settings,$i(e)}},zd={indexedDB:eA,firebase:rA,localStorage:sA};let ne;async function iA(n="firebase"){ne=zd[n],ne||(N.error(`Storage provider "${n}" is not valid. Using IndexedDB.`),ne=zd.indexedDB),await ne.init()}async function oA(){if(!ne)throw new Error("Storage service not initialized.");const n=Ll();return N.info("✅ Initial state loaded."),n}async function aA(){try{const n=Pl(Pt,"app_config"),t=["system","featureFlags","plans","definitions","templates","defaultBusinessSettings"].map(async i=>{const o=Ot(n,i),c=await so(o);return c.exists()?{[i]:c.data()}:(N.warn(`Documento de config no encontrado: 'app_config/${i}'`),{[i]:null})}),s=(await Promise.all(t)).reduce((i,o)=>({...i,...o}),{});return N.info("✅ Configuración global cargada."),s}catch(n){throw N.error("Error Crítico al cargar la configuración global:",n),new Error(`CONFIG_LOAD_FAILED: ${n.message}`)}}async function cA(n){if(!ne||!n.session.business)throw new Error("User is not associated with a business.");return N.info(`Loading data for business: ${n.session.business.id}`),{products:await ne.getAllProducts(n)||[]}}async function vg(n){if(!ne)throw new Error("Storage service not initialized.");await ne.saveSettings(n)}async function lA(n,e){if(!ne)throw new Error("Storage service not initialized.");return typeof ne.createProduct!="function"?(N.warn(`El adaptador ${ne} no implementa createProduct.`),e):await ne.createProduct(n,e)}const uA=(n,e)=>{if(!ne)throw new Error("Storage service not initialized.");return ne.deleteProduct(n,e)},hA=(n,e,t)=>{if(!ne)throw new Error("Storage service not initialized.");return ne.updateProduct(n,e,t)};async function gS(){if(!ne)throw new Error("Storage service not initialized.");return typeof ne.getAllBusinesses!="function"?(N.warn(`El adaptador ${ne} no implementa getAllBusinesses.`),[]):await ne.getAllBusinesses()}async function _S(){if(!ne)throw new Error("Storage not initialized.");return ne.getAll?await ne.getAll("global_templates"):[]}async function dA(n){if(!ne)throw new Error("Storage not initialized.");return ne.create?await ne.create("global_templates",n):null}async function fA(n,e){if(!ne)throw new Error("Storage not initialized.");ne.update&&await ne.update("global_templates",n,e)}async function pA(n){if(!ne)throw new Error("Storage not initialized.");ne.remove&&await ne.remove("global_templates",n)}let kc=null;function jd(n){kc=n}function In(){kc&&kc()}function Bs(n){F.isLoading=n}function Eg(n){if(!n){console.error("setUser fue llamado sin sessionData. Limpiando sesión."),Ul();return}F.isAuthenticated=!0,F.isLoading=!1,F.session={isLoggedIn:!0,user:{uid:n.uid,email:n.email,name:n.name,role:n.role},business:{id:n.businessId,departmentId:n.departmentId}},UT([n.role])}function Ul(){const n=Ll();F.isAuthenticated=n.isAuthenticated,F.isLoading=n.isLoading,F.session=n.session,F.products=n.products,F.clients=n.clients,F.sales=n.sales}function mA(n){F.settings={...F.settings,...n}}async function gA(n,e){N.trace("Action: addProductToState",e);const t=await lA(n,e);n.products.push(t),In()}async function _A(n,e,t){N.trace("Action: updateProductInState",e,t),await hA(n,e,t);const r=n.products.findIndex(s=>s.id===e);r!==-1&&(n.products[r]={...n.products[r],...t}),In()}async function yS(n,e){N.trace("Action: deleteProduct",e),await uA(n,e),n.products=n.products.filter(t=>t.id!==e),In()}async function yA(n){N.info("Action: addTemplateToState",n),await dA(n),In()}async function vA(n,e){N.info("Action: updateTemplateInState",n),await fA(n,e),In()}async function vS(n){N.info("Action: deleteTemplate",n),await pA(n),In()}const yi=(n,e)=>t=>t,Gd={info:{icon:"bi-info-circle-fill",title:"Información"},success:{icon:"bi-check-circle-fill",title:"Éxito"},error:{icon:"bi-exclamation-triangle-fill",title:"Error"},warning:{icon:"bi-exclamation-diamond-fill",title:"Advertencia"}};function EA({message:n,type:e="info"}){const t=Gd[e]||Gd.info,r=document.createElement("div");return r.className=`toast toast-${e}`,r.id=`toast-${Date.now()}`,r.innerHTML=`
        <div class="toast-icon">
            <i class="bi ${t.icon}"></i>
        </div>
        <div class="toast-content">
            <span class="toast-title">${t.title}</span>
            <span class="toast-message">${n}</span>
        </div>
        <button class="toast-close">&times;</button>
    `,r}let vt=null,Rr=null;const re=yi()((n,e="info",t=3e3)=>{vt&&Ha(!0),Rr&&clearTimeout(Rr),vt=EA({message:n,type:e});const r=vt.querySelector(".toast-close");r&&(r.onclick=()=>Ha()),document.body.appendChild(vt),Rr=setTimeout(()=>{Ha()},t)}),Ha=yi()((n=!1)=>{Rr&&(clearTimeout(Rr),Rr=null),vt&&(n?vt.remove():(vt.style.animation="toastSlideOut 0.4s ease-in forwards",setTimeout(()=>{vt?.remove(),n||(vt=null)},400)),n&&(vt=null))}),Ig=(n,e="unknown")=>{console.error(`[Error en ${e}]:`,n.message,n);const t=wg(n.message||n.code);re(t,"error");try{const r={type:"ERROR",context:e,message:`Error en ${e}: ${n.message}`,details:{code:n.code||"UNKNOWN",stack:n.stack||"No stack available",context:e}};Ml(r)}catch(r){console.error("Error CRÍTICO: No se pudo registrar el error en el log:",r)}};function wg(n){switch(n){case"auth/user-not-found":case"auth/wrong-password":case"auth/invalid-credential":return"Correo o contraseña incorrectos.";case"auth/invalid-email":return"El formato del correo no es válido.";case"auth/email-already-in-use":return"Este correo ya está registrado.";case"auth/network-request-failed":return"Error de red. Revisa tu conexión a internet.";case"auth/too-many-requests":return"Demasiados intentos. Intenta más tarde.";case"AUTH_USER_CONTEXT_NOT_FOUND":case"AUTH_USER_NOT_IN_DIRECTORY":case"AUTH_NO_BUSINESS_ID":case"AUTH_USER_PROFILE_NOT_FOUND":return"Error al cargar el perfil de usuario. Contacte a soporte.";case"permission-denied":case"PERMISSION_DENIED":return"No tienes permiso para realizar esta acción.";case"unavailable":return"Servicio no disponible temporalmente. Intenta de nuevo.";default:return"Ocurrió un error inesperado. Inténtalo de nuevo."}}const IA=yi()(async(n,e)=>{Bs(!0);let t=null;try{const s=(await Nv(Hr,n,e)).user;if(N.info("Forzando refresco de token para leer Custom Claims..."),await s.getIdToken(!0),N.info("Refresco de token completado."),t=await bg(s.uid,s.email),!t)throw new Error("AUTH_USER_CONTEXT_NOT_FOUND");return Eg(t),Ml({type:"AUTH_LOGIN",context:"auth.service:loginEmailPassword",message:`Inicio de sesión exitoso para ${t.name}`,userId:t.uid,businessId:t.businessId,departmentId:t.departmentId}),Bs(!1),{success:!0,user:t}}catch(r){return Bs(!1),N.error("Error en auth.service:loginEmailPassword",r),{success:!1,message:wg(r.code||r.message)||"Error desconocido"}}}),Hd=yi()(async()=>{Bs(!0);try{const n=F.user?F.user.uid:"unknown";Ml({type:"AUTH_LOGOUT",context:"auth.service:logout",message:"Usuario cerró sesión",userId:n}),await wA()}catch(n){Ig(n,"auth.service:logout"),Ul()}finally{Bs(!1)}}),wA=async()=>{try{await Lv(Hr)}catch(n){Ig(n,"auth.service:internalLogout:signOut")}finally{Ul()}},bA=yi()(async n=>{try{N.info("Forzando refresco de token (page load) para leer Custom Claims..."),await n.getIdToken(!0),N.info("Refresco de token (page load) completado.");const e=await bg(n.uid,n.email);return e?{user:{uid:e.uid,email:e.email,name:e.name,role:e.role},business:{id:e.businessId,departmentId:e.departmentId}}:null}catch(e){return N.error("Error en tracedLoadUserData después de fetchUserSessionContext:",e),null}}),TA=IA,bg=async(n,e)=>{const t=Ot(Pt,"user_directory",n),r=await so(t);if(console.log("--- DEBUG: Datos leídos de user_directory ---"),console.log("userDirSnap.exists():",r.exists()),r.exists()){const s=r.data();if(console.log("userDirData:",s),console.log("Tipo de businessId:",typeof s.businessId),console.log("Valor de businessId:",s.businessId),s.role==="super_admin"){const w=Ot(Pt,"super_admins",n),A=await so(w);let V="Super Admin";return A.exists()?V=A.data()["name "]||A.data().name||"Super Admin":console.warn(`Super Admin con UID ${n} no encontrado en super_admins.`),{uid:n,email:e,name:V,businessId:null,departmentId:null,role:dt.SUPER_ADMIN}}console.log("[DEBUG] userDirData:",s);const{businessId:i}=s;if(!i)throw new Error("AUTH_NO_BUSINESS_ID");const o=Ot(Pt,"businesses",i,"users",n),c=await so(o);if(!c.exists())throw new Error("AUTH_USER_PROFILE_NOT_FOUND");const l=c.data(),{name:h,jobTitle:f,departmentIds:p}=l;(!h||!f)&&console.warn(`Perfil de usuario ${n} en negocio ${i} incompleto. Falta name o jobTitle.`);let g=dt.OPERADOR;return f==="Propietario"?g=dt.PROPIETARIO:f==="Cajero"?g=dt.CAJERO:f==="Empleado"&&(g=dt.OPERADOR),{uid:n,email:e,name:h||e,businessId:i,departmentId:p&&p.length>0?p[0]:null,role:g}}else throw console.log("El documento NO existe en user_directory para UID:",n),new Error("AUTH_USER_NOT_IN_DIRECTORY")};let xc;function Kd(){const n=window.location.hash||"#/";xc&&xc(n)}function AA(n){xc=n,window.addEventListener("hashchange",Kd),Kd()}const tt=n=>new Promise(e=>setTimeout(e,n));function SA(n){const e=document.createElement("div");e.className="login-container";const t=n.settings.store.store_name||"B.U.C.A",r=n.settings.store.store_description||"Inicia sesión para continuar";e.innerHTML=`
        <div class="login-card">
            <div class="login-header">
                <div class="login-brand-icon"><i class="fas fa-fire"></i></div>
                <h2 id="login-store-name">${t}</h2><p>${r}</p>
            </div>
            <form id="login-form" class="login-form">
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <div class="input-wrapper">
                        <i class="fas fa-envelope input-icon"></i>
                        <input type="email" id="login-email" name="email" placeholder="tu@email.com" autocomplete="email">
                    </div>
                </div>
                <div class="form-group">
                    <label for="login-password">Contraseña</label>
                    <div class="input-wrapper">
                        <i class="fas fa-key input-icon"></i>
                        <input type="password" id="login-password" name="password" placeholder="••••••••••" autocomplete="current-password">
                    </div>
                </div>
                <button type="submit" id="btn-login-submit" class="btn-login">
                    <i class="fas fa-sign-in-alt"></i><span>Acceder</span>
                </button>
            </form>
        </div>
    `;const s=e.querySelector("#login-form"),i=e.querySelector("#btn-login-submit"),o=i.querySelector("i"),c=i.querySelector("span");async function l(h,f=null,p=null){c.classList.add("fade-out"),await tt(150),c.textContent=h,f&&(o.className=f),p&&(i.className=`btn-login ${p}`),c.classList.remove("fade-out")}return s.addEventListener("submit",async h=>{h.preventDefault(),i.disabled=!0,i.className="btn-login",await l("Accediendo...","fas fa-spinner animate-spin");const f=e.querySelector("#login-email").value,p=e.querySelector("#login-password").value,g=await TA(f,p);g.success?(await l("Acceso Válido","fas fa-check-circle","success"),await tt(1e3),await l("¡Bienvenido!","fas fa-door-open","welcome")):(await l(g.message,"fas fa-exclamation-triangle","error"),await tt(2500),i.disabled=!1,await l("Acceder","fas fa-sign-in-alt"))}),e}function PA(n,e){n.innerHTML="",n.appendChild(SA(e))}const RA={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;"},CA=/[&<>"'/]/ig;function Ir(n){return n.replace(CA,e=>RA[e])}function DA(n){const e=n.settings.appConfig,t=n.settings.appearance?.header||{showFullscreen:!0,showMessages:!0,showNotifications:!0,showSettings:!0,showRate:!0,showLanguage:!0},r=Ir(e?.system?.metadata?.appNameSimplify||"B.U.C.A"),s=n.session?.user||{name:"Usuario",email:"user@buca.app"},i=s.name?s.name.substring(0,2).toUpperCase():"US",c=n.settings.currencies.principal.rate.toFixed(2),l=Fe(K.EDIT_SETTINGS_BUSINESS)||Fe(K.EDIT_SETTINGS_SYSTEM),h=t.showRate?`
        <div class="header-widget-rate ${l?"clickable":""}" 
            ${l?'data-action="open-rate-modal" title="Actualizar Tasa"':""}>
            <div class="hw-icon"><i class="bi bi-currency-exchange"></i></div>
            <div class="hw-content">
                <span class="hw-label">TASA BCV</span>
                <div class="hw-value-group">
                    <span class="hw-currency">Bs.</span>
                    <span class="hw-amount">${c}</span>
                </div>
            </div>
        </div>
    `:"",f={code:"ES",flag:"🇻🇪"},p=t.showLanguage?`
        <div class="language-capsule" data-action="toggle-language-menu" title="Cambiar Idioma">
            <span class="lang-flag">${f.flag}</span>
            <div class="lang-separator"></div>
            <span class="lang-code">${f.code}</span>
            <i class="bi bi-chevron-down lang-arrow"></i>
            
            <div class="language-dropdown-menu" id="header-language-dropdown">
                <div class="lang-menu-header">Seleccionar Región</div>
                <button class="lang-item active">
                    <span class="lang-flag">🇻🇪</span> <span>Español (VE)</span> <i class="bi bi-check2 ms-auto"></i>
                </button>
                <button class="lang-item">
                    <span class="lang-flag">🇺🇸</span> <span>English (US)</span>
                </button>
            </div>
        </div>
    `:"",A=`
        <div class="profile-dropdown-card" id="header-profile-dropdown">
            
            <div class="dropdown-header-modern">
                <div class="d-flex align-items-center gap-3 mb-3">
                    <div class="user-avatar-large">
                        <span>${i}</span>
                        <span class="status-indicator online"></span>
                    </div>
                    <div class="user-details-modern">
                        <div class="name-row">
                            <strong>${s.name}</strong>
                            <span class="plan-badge warning">Enterprise</span>
                        </div>
                        <span class="user-email-modern">${s.email}</span>
                    </div>
                </div>
            </div>

            <div class="dropdown-scroll-content custom-scrollbar">
                <div class="menu-group">
                    <span class="group-label">Mi Cuenta</span>
                    <button class="menu-item-modern" data-action="view-profile-details">
                        <div class="icon-box"><i class="bi bi-person-badge"></i></div>
                        <div class="item-content">
                            <span>Perfil & Datos</span>
                            <small>Configura tu información personal</small>
                        </div>
                    </button>
                    <button class="menu-item-modern" data-action="wip-feature">
                        <div class="icon-box"><i class="bi bi-credit-card"></i></div>
                        <div class="item-content">
                            <span>Facturación</span>
                            <small>Historial de pagos y plan</small>
                        </div>
                    </button>
                </div>

                <div class="menu-separator"></div>

                <div class="menu-group">
                    <span class="group-label">Sistema</span>
                    <button class="menu-item-modern" data-action="toggle-theme">
                        <div class="icon-box"><i class="bi bi-moon-stars"></i></div>
                        <div class="item-content">
                            <span>Apariencia</span>
                            <small>Alternar modo claro/oscuro</small>
                        </div>
                    </button>
                    <button class="menu-item-modern" data-action="app-settings">
                        <div class="icon-box"><i class="bi bi-sliders"></i></div>
                        <div class="item-content">
                            <span>Preferencias</span>
                            <small>Ajustes generales del ERP</small>
                        </div>
                    </button>
                    <button class="menu-item-modern" data-action="wip-feature">
                        <div class="icon-box"><i class="bi bi-life-preserver"></i></div>
                        <div class="item-content">
                            <span>Centro de Ayuda</span>
                            <small>Documentación y soporte</small>
                        </div>
                    </button>
                </div>
            </div>

            <div class="dropdown-footer-modern">
                <button class="menu-item-logout" data-action="logout">
                    <i class="bi bi-box-arrow-right"></i> Cerrar Sesión
                </button>
            </div>
        </div>
    `;return`
        <header class="app-header">
            
            <div class="header-left">
                <div class="brand-logo">
                    <img src="assets/icons/logo-light.svg" alt="Logo" class="logo-img" onerror="this.style.display='none'">
                    <div class="brand-text-group">
                        <span class="brand-title">${r}</span>
                        <span class="brand-subtitle">ERP SYSTEM</span>
                    </div>
                </div>
                <button class="mobile-menu-btn ms-3" data-action="toggle-sidebar">
                    <i class="bi bi-list"></i>
                </button>
            </div>
            
            <div class="header-separator /*d-none*/ d-md-block"></div>

            <div class="header-right">
                
                <div class="header-search-wrapper">
                    <i class="bi bi-search header-search-icon"></i>
                    <input type="text" class="header-search-input" placeholder="Buscar..." id="global-search-input">
                    <div class="keyboard-shortcut"><i class="bi bi-command"></i>K</div>
                </div>

                <div class="header-item /*d-none*/ d-lg-flex ms-2">
                    ${h}
                </div>

                ${t.showRate&&t.showLanguage?'<div class="header-separator /*d-none*/ d-md-block"></div>':""}

                <div class="header-separator /*d-none*/ d-md-block"></div>

                <div class="header-item /*d-none*/ d-sm-flex">
                    ${p}
                </div>

                <div class="header-actions-group">
                    ${t.showFullscreen?`
                    <button class="header-icon-btn /*d-none*/ d-md-flex" data-action="toggle-fullscreen" title="Pantalla Completa">
                        <i class="bi bi-arrows-fullscreen"></i>
                    </button>`:""}
                    
                    ${t.showMessages?`
                    <button class="header-icon-btn" data-action="wip-feature" title="Mensajes">
                        <i class="bi bi-envelope-fill"></i>
                        <span class="notification-badge">4</span>
                    </button>`:""}
                    
                    ${t.showNotifications?`
                    <button class="header-icon-btn notification-btn" data-action="toggle-notifications" title="Notificaciones">
                        <i class="bi bi-bell-fill"></i>
                        <span class="notification-dot"></span>
                    </button>`:""}

                    ${t.showSettings?`
                    <button class="header-icon-btn" data-action="app-settings" title="Configuración">
                        <i class="bi bi-gear-fill"></i>
                    </button>`:""}
                </div>

                <div class="header-separator"></div>

                <div class="user-profile-wrapper" data-action="toggle-profile-menu">
                    <div class="user-avatar-circle">
                        <span>${i}</span>
                    </div>
                    <div class="user-profile-mini-info /*d-none*/ d-xl-flex">
                        <span class="user-name-mini">${s.name.split(" ")[0]}</span>
                        <span class="user-role-mini">${s.role||"Admin"}</span>
                    </div>
                    <i class="bi bi-chevron-down dropdown-arrow ms-2"></i>
                    
                    ${A}
                </div>

            </div>
        </header>
    `}const VA="modulepreload",NA=function(n){return"/"+n},Wd={},ts=function(e,t,r){let s=Promise.resolve();if(t&&t.length>0){let l=function(h){return Promise.all(h.map(f=>Promise.resolve(f).then(p=>({status:"fulfilled",value:p}),p=>({status:"rejected",reason:p}))))};document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),c=o?.nonce||o?.getAttribute("nonce");s=l(t.map(h=>{if(h=NA(h),h in Wd)return;Wd[h]=!0;const f=h.endsWith(".css"),p=f?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${h}"]${p}`))return;const g=document.createElement("link");if(g.rel=f?"stylesheet":VA,f||(g.as="script"),g.crossOrigin="",g.href=h,c&&g.setAttribute("nonce",c),document.head.appendChild(g),f)return new Promise((w,A)=>{g.addEventListener("load",w),g.addEventListener("error",()=>A(new Error(`Unable to preload CSS for ${h}`)))})}))}function i(o){const c=new Event("vite:preloadError",{cancelable:!0});if(c.payload=o,window.dispatchEvent(c),!c.defaultPrevented)throw o}return s.then(o=>{for(const c of o||[])c.status==="rejected"&&i(c.reason);return e().catch(i)})},kA=()=>ts(()=>import("./DashboardView-BLxPScV3.js"),[]).then(n=>n.DashboardView),xA=()=>ts(()=>import("./CompaniesView-C3haYZNP.js"),__vite__mapDeps([0,1,2,3])).then(n=>n.CompaniesView),OA=()=>ts(()=>import("./InventoryView-yPPpP4oY.js"),[]).then(n=>n.InventoryDashboardView),LA=()=>ts(()=>import("./ProductsView-BKjyW7Kz.js"),[]).then(n=>n.ProductsView),MA=()=>ts(()=>import("./PosView-BmioELWu.js"),__vite__mapDeps([4,2])).then(n=>n.PosView),FA=()=>ts(()=>import("./ClientsView-C3qwuPdZ.js"),__vite__mapDeps([5,3,6,2])).then(n=>n.ClientsView),Cr=[{path:"#/",component:kA,permission:K.VIEW_DASHBOARD,context:yt.CORE,isMainModule:!0,label:"Panel",icon:"bi-grid-1x2-fill"},{path:"#/companies",component:xA,permission:K.VIEW_COMPANIES_MODULE,context:yt.CORE,isMainModule:!0,label:"Empresas",icon:"bi-building"},{path:"#/inventory",component:OA,permission:K.VIEW_INVENTORY_MODULE,context:yt.SGA_SCM,isMainModule:!0,label:"Inventario",icon:"bi-box-seam"},{path:"#/inventory/products",component:LA,permission:K.VIEW_PRODUCTS,context:yt.SGA_SCM,isMainModule:!1,label:"Productos",icon:"bi-boxes"},{path:"#/pos",component:MA,permission:K.VIEW_POS_MODULE,context:yt.POS,isMainModule:!0,label:"Ventas y Compras",icon:"bi-printer"},{path:"#/clients",component:FA,permission:K.VIEW_CLIENTS_MODULE,context:yt.CRM,isMainModule:!0,label:"Clientes",icon:"bi-people"}];function Qd(n="#/",e,t=yt.CORE){const r=e.session?.user?.name||"Usuario",s=e.session?.user?.email||"email@dominio.com",i=Cr.filter(A=>A.isMainModule&&Fe(A.permission));let o="",c="#/",l=null,h=[],f=t!==yt.CORE;f&&(h=Cr.filter(A=>A.context===t&&Fe(A.permission)&&!A.isMainModule),l=Cr.find(A=>A.context===t&&A.isMainModule),l?(o=l.label,c=l.path):(o="Sección",c="#/",console.warn(`[MainNav] No se encontró ruta principal para el contexto: ${t}`)));const p=f?`
        <li class="breadcrumb-item">
            <a href="#/" class="nav-button back-button" data-route="#/" data-tippy-content="Volver">
                <i class="bi bi-arrow-left"></i>
                <span>Volver</span>
            </a>
        </li>
        <li class="breadcrumb-item section-title-item">
            <a href="${c}" class="nav-button section-title-link ${n===c?"active":""}" 
                data-route="${c}" data-tippy-content="${o}">
                 <i class="bi ${l?.icon||"bi-folder-fill"} me-1"></i>
                <span>${o}</span>
            </a>
        </li>
        <li class="breadcrumb-item separator">|</li>
        ${h.map(A=>`
            <li class="breadcrumb-item">
                <a href="${A.path}" class="nav-button contextual-nav-button ${n===A.path?"active":""}" 
                    data-route="${A.path}" data-tippy-content="${A.label}">
                    <i class="bi ${A.icon||"bi-record-fill"}"></i>
                    <span>${A.label}</span>
                </a>
            </li>
        `).join("")}
    `:"",w=(document.documentElement.getAttribute("data-bs-theme")||"light")==="dark"?"bi-sun-fill":"bi-moon-stars-fill";return`
        <div class="toolbar-container">
            <div class="toolbar-scroll-wrapper">
                <ul class="breadcrumb main-nav-menu ${f?"hidden":"visible"}">
                    ${i.map(A=>`
                        <li class="breadcrumb-item">
                            <a href="${A.path}" class="nav-button ${n===A.path?"active":""}" 
                                data-route="${A.path}" data-tippy-content="${A.label}">
                                <i class="bi ${A.icon}"></i>
                                <span>${A.label}</span>
                            </a>
                        </li>
                    `).join("")}
                </ul>

                <ul class="breadcrumb contextual-nav-menu ${f?"visible":"hidden"}">
                    ${p}
                </ul>
            </div>
            
            <div class="toolbar-separador"></div>
            <div class="toolbar-actions">
                 <button class="nav-button" data-action="toggle-theme" data-tippy-content="Cambiar Tema">
                    <i class="bi ${w}"></i>
                </button>
                <button id="actions-menu-button" class="nav-button" data-action="toggle-actions-menu" data-tippy-content="Más opciones">
                    <i class="bi bi-three-dots-vertical"></i>
                </button>
                <div id="actions-menu-dropdown" class="actions-menu-dropdown">
                    <div class="action-item-header"> <i class="bi bi-person-circle"></i> 
                        <div class="user-info"> 
                            <span class="user-name">${r}</span> 
                            <span class="user-email">${s}</span> 
                        </div> 
                    </div> 

                    <hr>
                    
                    ${Fe(K.EDIT_SETTINGS_BUSINESS)||Fe(K.EDIT_SETTINGS_SYSTEM)?`
                        <button class="action-item" data-action="open-config">
                            <i class="bi bi-gear-fill"></i> <span>Configuración</span>
                        </button> <hr>
                    `:""}
                    
                    <button class="action-item danger" data-action="logout"> <i class="bi bi-box-arrow-right"></i> <span>Cerrar Sesión</span> </button>
                </div>
            </div>
        </div>
    `}function UA(n){const e=new Date().getFullYear(),r=n.settings.appConfig?.system?.metadata?.appNameSimplify||n.settings.store.store_name||"Tu Tienda";return`
        <footer class="footer">
            <div class="footer-content">
                <div class="site-footer-row is-start">
                    <a href="" target="_blank">
                        Estado <div class="status-active"></div>
                    </a>
                    <div class="footer-separator"></div>
                    <a href="" rel="noopener" target="_blank">
                        Support
                    </a>
                    <div class="footer-separator"></div>
                    <a href="" rel="noopener" target="_blank">
                        Docs
                    </a>
                </div>

                <div class="footer-copyright">
                    <span>&copy;${e}</span>
                    <a href="#">${r}</a>
                    <span>. Todos los derechos reservados.</span>
                </div>
                <div class="site-footer-row is-end">
                    <a href="" rel="noopener" target="_blank">
                        About Clepces
                    </a>
                    <div class="footer-separator"></div>
                    <a href="" rel="noopener" target="_blank">
                        Terms
                    </a>
                    <div class="footer-separator"></div>
                    <a href="" rel="noopener" target="_blank">
                        Privacy
                    </a>
                </div>
            </div>
        </footer>
    `}function Tg(){const n=document.createElement("div");return n.className="app-loader",n.innerHTML=`
        <div class="loader-content">
            <div class="buca-logo-animation">
                <svg viewBox="0 0 640 640" class="logo-svg">
                    <use href="/assets/icons/logo-buca.svg#fire-path" class="logo-fire"/>
                </svg>
                <div class="logo-text">
                    <span class="char" style="--i:1;">B</span>
                    <span class="char" style="--i:2;">.</span>
                    <span class="char" style="--i:3;">U</span>
                    <span class="char" style="--i:4;">.</span>
                    <span class="char" style="--i:5;">C</span>
                    <span class="char" style="--i:6;">.</span>
                    <span class="char" style="--i:7;">A</span>
                </div>
            </div>
            <p id="loader-message" class="loader-message-text">Cargando...</p>
        </div>
    `,{element:n,updateMessage:function(e){const t=this.element.querySelector("#loader-message");t&&(t.textContent=e)},showError:function(e){this.updateMessage(e);const t=this.element.querySelector(".buca-logo-animation");t&&(t.innerHTML='<i class="fas fa-exclamation-triangle" style="font-size: 8rem; color: var(--error-color);"></i>')},hide:function(){n&&(n.style.transition="opacity 0.3s ease-out",n.style.opacity="0",setTimeout(()=>{n.remove()},300))}}}const BA="https://api.dolarvzla.com/public/exchange-rate",$A="https://api.dolarvzla.com/public/exchange-rate/list",Yd="buca_last_known_rate_usd";async function Ag(){try{const n=await fetch(BA);if(!n.ok)throw new Error(`API Error: ${n.status}`);const e=await n.json(),t=e.current||e;if(!t.usd)throw new Error("Estructura USD no encontrada");return{current:t}}catch(n){throw N.error("Error fetching current rates",n),n}}async function Sg(n=5){try{const e=await fetch($A);if(!e.ok)throw new Error(`API History Error: ${e.status}`);const t=await e.json();return(Array.isArray(t)?t:t.rates||t.items||[]).slice(0,n)}catch(e){return N.error("Error fetching history",e),[]}}async function qA(){try{const n=await Ag(),e=parseFloat(n.current.usd);if(isNaN(e))throw new Error("Tasa inválida");const t=Number(e),r=await Sg(2);let s="neutral",i=0;if(r.length>=2){const o=parseFloat(r[1].usd);t>o?s="up":t<o&&(s="down"),i=(t-o)/o*100}return F.settings.currencies.principal.rate=t,F.settings.currencies.principal.trend=s,F.settings.currencies.principal.diff=i,localStorage.setItem(Yd,t.toString()),N.info(`✅ Tasa Aplicada: ${t} (Precisión completa)`),{rate:t,isOffline:!1}}catch(n){N.warn(`Fallo API Tasas: ${n.message}`);const e=parseFloat(localStorage.getItem(Yd))||1;return F.settings.currencies.principal.rate=e,{rate:e,isOffline:!0,requiresManualUpdate:!0}}}function vi({title:n,contentElement:e,id:t="genericModal",size:r="large"}){const s=document.createElement("div");s.className="modal",s.id=t,s.style.display="flex";let i="modal-lg";r==="small"?i="modal-sm":r==="fullscreen"&&(i="modal-fullscreen",s.classList.add("modal-fullscreen-parent")),s.innerHTML=`
        <div class="modal-content ${i}">
            <div class="modal-header">
                <h3 class="modal-title">${n}</h3>
                <button class="close" data-action="close-modal" aria-label="Cerrar">&times;</button>
            </div>
            <div class="modal-body custom-scrollbar" id="modal-body-container">
                </div>
            <div class="modal-footer" id="modal-footer-container"></div>
        </div>
    `,s.querySelector("#modal-body-container").appendChild(e),s.addEventListener("click",c=>{(c.target===s||c.target.closest('[data-action="close-modal"]'))&&(s.remove(),document.querySelector(".modal")||document.body.classList.remove("modal-open"))}),document.body.classList.add("modal-open");const o=s.remove;return s.remove=function(){o.call(this),document.querySelector(".modal")||document.body.classList.remove("modal-open")},s}function zA(n,e,t,r){if(N.info("--- Iniciando de Cálculo ---"),t<=0)return null;const s=r.products.tax_rate/100,i=r.products.calculation_method;let o;if(i==="margin"){if(e>=100)return console.error("El margen no puede ser 100% o más."),null;o=n/(1-e/100)}else o=n*(1+e/100);const c=o*s,l=o+c,h=l/t;return N.info("--- Final de Cálculo ---"),{costoUnitarioDolar:n/t,subtotalMayorDolar:o,montoIVAMayorDolar:c,precioFinalMayorDolar:l,precioFinalUnitarioDolar:h}}function jA(...n){return n.every(e=>e&&e.trim()!=="")}function GA(n,e,t,r=null){return t.some(s=>s.name.toLowerCase()===n.toLowerCase()&&s.brand.toLowerCase()===e.toLowerCase()&&s.id!==r)}function Pg(n){const{modalElementRef:e,wizardStepperEl:t,wizardStepsEls:r,isEditMode:s,callbacks:i}=n,o=r.length;N.info(`[Wizard] Inicializado con ${o} pasos.`);let c=1,l=null,h=null,f=null,p=null;const g=()=>i.onStepPrev(),w=()=>i.onStepNext(),A=()=>i.onCalculate(),V=()=>i.onSubmit();function D(M){!l||!h||!f||!p||(l.style.display="none",h.style.display="none",f.style.display="none",p.style.display="none",M>1&&(l.style.display="inline-flex"),M===o?(l.innerHTML='<i class="bi bi-pencil-fill me-1"></i> Volver a Editar',p.style.display="inline-flex"):M===o-1?f.style.display="inline-flex":(h.style.display="inline-flex",h.innerHTML='Siguiente <i class="bi bi-arrow-right ms-1"></i>'),o===2&&M===1&&(h.style.display="none",f.style.display="inline-flex"),M===2&&(l.innerHTML='<i class="bi bi-arrow-left me-1"></i> Anterior'))}function j(M){if(M<1||M>o){N.warn(`[Wizard] Número de paso inválido: ${M} (Total: ${o})`);return}c=M,r.forEach(q=>{q.style.display=parseInt(q.dataset.step)===c?"block":"none"}),t.querySelectorAll(".step").forEach(q=>{const E=parseInt(q.dataset.step);q.classList.toggle("active",E===c),q.classList.toggle("completed",E<c),E>=c&&q.classList.remove("completed")}),D(c)}function $(){const M=e.querySelector("#modal-footer-container");if(!M){N.error("[ProductFormWizard] ¡Error fatal! No se encontró #modal-footer-container.");return}M.innerHTML="",l=document.createElement("button"),l.type="button",l.id="modal-btn-prev",l.className="btn-secondary me-auto",h=document.createElement("button"),h.type="button",h.id="modal-btn-next",h.className="btn-primary",f=document.createElement("button"),f.type="button",f.id="modal-btn-calculate",f.className="btn-primary",f.innerHTML='<i class="bi bi-calculator me-1"></i> Calcular y Revisar',p=document.createElement("button"),p.type="button",p.id=s?"modal-btn-update":"modal-btn-save",p.className="btn-primary",p.innerHTML=`<i class="bi ${s?"bi-arrow-repeat":"bi-save-fill"} me-1"></i> ${s?"Actualizar Producto":"Guardar Producto"}`,l.addEventListener("click",g),h.addEventListener("click",w),f.addEventListener("click",A),p.addEventListener("click",V),M.append(l,f,h,p)}function U(){try{const M=e.querySelector(".modal-header"),q=e.querySelector(".modal-header .close");M&&t&&q&&M.insertBefore(t,q)}catch(M){N.error("[ProductFormWizard] Error al mover el stepper:",M)}}function z(){l?.removeEventListener("click",g),h?.removeEventListener("click",w),f?.removeEventListener("click",A),p?.removeEventListener("click",V)}return $(),U(),j(1),{showStep:j,cleanup:z,getStep:()=>c,setSaveButtonBusy:(M=!0)=>{p&&(p.disabled=M,M?p.innerHTML='<i class="bi bi-hourglass-split me-1"></i> Guardando...':(p.innerHTML=`<i class="bi ${s?"bi-arrow-repeat":"bi-save-fill"} me-1"></i> ${s?"Actualizar Producto":"Guardar Producto"}`,e.id==="add-company-modal"&&(p.innerHTML='<i class="bi bi-check-circle-fill me-1"></i> Crear Negocio')))}}}const Bt=n=>n==null?"":typeof n=="string"?n.trim():n,HA=(n,e,t)=>{const r=Bt(n),s=Bt(e);if(typeof r=="number"&&typeof s=="number")return r!==s;const i=String(s),o=String(r);return i!==o},Nn=n=>{const e=Bt(n);return e===""?"N/A":e===0?"0":String(e)},KA=(n,e=2)=>new Intl.NumberFormat("es-VE",{minimumFractionDigits:e,maximumFractionDigits:e}).format(n),wr=(n,e="$")=>{const t=Bt(n),r=typeof t=="number"?t:parseFloat(t)||0;return`${e}${KA(r)}`},WA=n=>{const e=Bt(n);return`${e===""?"N/A":e}%`},Jd=n=>{const e=Bt(n);return`${e===""?"N/A":e} Unid.`},QA=n=>{const e=Bt(n);return e===""||e===null?"N/A":`${e} Kg`},Ye=(n,e,t,r=Nn,s)=>{const i=r===wr?r(t,s):r(t),o=r===wr?r(e,s):r(e);return HA(e,t)?`
        <div class="diff-item-premium changed">
            <div class="diff-header-premium">
                <span class="diff-label-premium">${n}</span>
                <span class="diff-badge changed-badge">
                    <i class="bi bi-exclamation-circle-fill"></i>
                    Modificado
                </span>
            </div>
            <div class="diff-value-premium">
                <div class="diff-comparison">
                    <span class="diff-old-premium">${i}</span>
                    <i class="bi bi-arrow-right diff-arrow"></i>
                    <span class="diff-new-premium">${o}</span>
                </div>
                <button class="btn-edit-inline" 
                        data-action="inline-edit" 
                        data-field-label="${n}"
                        data-current-value="${Bt(e)}"
                        title="Editar ${n}">
                    <i class="bi bi-pencil-fill"></i>
                </button>
            </div>
        </div>`:`
        <div class="diff-item-premium unchanged">
            <div class="diff-header-premium">
                <span class="diff-label-premium">${n}</span>
                <span class="diff-badge unchanged-badge">
                    <i class="bi bi-check-circle-fill"></i>
                    Sin cambios
                </span>
            </div>
            <div class="diff-value-premium">
                <span class="diff-current-value">${o}</span>
                <button class="btn-edit-inline" 
                        data-action="inline-edit" 
                        data-field-label="${n}"
                        data-current-value="${Bt(e)}"
                        title="Editar ${n}">
                    <i class="bi bi-pencil-fill"></i>
                </button>
            </div>
        </div>`},Ge=(n,e=2)=>new Intl.NumberFormat("es-VE",{minimumFractionDigits:e,maximumFractionDigits:e}).format(n);function YA(n,e,t,r,s){const{simboloPrincipal:i,simboloBase:o,tasaIVA:c,tasaCambio:l}=s,h=n.precioFinalUnitarioDolar,f=h*l,p=n.precioFinalMayorDolar,g=p*l,A=p*(1-.025);return`
        <div class="summary-price-card unit-price">
            <div class="card-header"><i class="bi bi-box me-1"></i> Precio Unitario</div>
            <div class="card-body">
                <div class="price-header-grid">
                    <div class="price-cluster">
                        <span class="price-main currency-toggle" id="summary-precio-unidad-principal" data-usd-value="${h}" data-ves-value="${f}" data-current-currency="usd" title="Clic para cambiar">${i}${Ge(h)}</span>
                        <span class="price-secondary currency-toggle" id="summary-precio-unidad-base" data-usd-value="${h}" data-ves-value="${f}" data-current-currency="ves" title="Clic para cambiar">${o}${Ge(f)}</span>
                    </div>
                    <small class="price-details">
                        Costo Unitario: <span>${i}${Ge(n.costoUnitarioDolar,4)}</span><br/>
                        Ganancia: <span>${t}</span>% | IVA: ${c}%
                    </small>
                </div>
            </div>
        </div>
        <div class="summary-price-card package-price">
            <div class="card-header"><i class="bi bi-boxes me-1"></i> Precio Paquete (<span>${r}</span> Unid.)</div>
            <div class="card-body">
                <div class="price-header-grid">
                    <div class="price-cluster">
                        <span class="price-main currency-toggle" id="summary-precio-paquete-principal" data-usd-value="${p}" data-ves-value="${g}" data-current-currency="usd" title="Clic para cambiar">${i}${Ge(p)}</span>
                        <span class="price-secondary currency-toggle" id="summary-precio-paquete-base" data-usd-value="${p}" data-ves-value="${g}" data-current-currency="ves" title="Clic para cambiar">${o}${Ge(g)}</span>
                    </div>
                    <small class="price-details">
                        Costo Paquete: <span>${i}${Ge(e)}</span><br/>
                        Ganancia: <span>${t}</span>% | IVA: ${c}%
                    </small>
                </div>
            </div>
        </div>
        <div class="summary-price-card package-price">
            <div class="card-header"><i class="bi bi-star-fill me-1"></i> Precio Paquete Oferta</div>
            <div class="card-body">
                <div class="package-controls-grid">
                    <div class="discount-suggestion-box">
                        <div class="discount-header">
                            <span><i class="bi bi-star-fill"></i> Oferta (2.5%)</span>
                            <strong id="summary-precio-paquete-oferta">${i}${Ge(A)}</strong>
                        </div>
                        <button type="button" class="btn-apply-discount" id="btn-apply-package-offer" data-offer-price="${A.toFixed(2)}" title="Aplicar precio de oferta">Aplicar</button>
                    </div>
                    <div class="manual-input-box" id="manual-package-price-box">
                        <label for="override-package-price" class="package-price-label" id="manual-package-price-label">
                            <i class="bi bi-pencil-fill me-1"></i> O establecer manual:
                        </label>
                        <div class="input-group input-group-sm override-price-group">
                            <span class="input-group-text">${i}</span>
                            <input type="number" step="0.01" class="form-control form-control-sm" id="override-package-price" placeholder="${Ge(A,2)}" title="Opcional: Establecer precio de paquete manualmente">
                        </div>
                    </div>
                </div>
                <span class="package-price-note">
                    Precio calculado: <span id="summary-paquete-precio-calculado-nota">${i}${Ge(p)}</span>.
                </span>
            </div>
        </div>
    `}function JA(n,e){const{simboloPrincipal:t}=e;return`
        <div class="summary-grid-layout">
            <div class="summary-column-left">
                 <section class="summary-section">
                    <h3><i class="bi bi-info-circle-fill me-1"></i> Información Básica</h3>
                    <div class="summary-basic-info summary-purchase-info">
                        <div class="info-item"><span>Nombre:</span> <strong id="summary-nombre">${n.nombre}</strong></div>
                        <div class="info-item"><span>Marca:</span> <strong id="summary-marca">${n.marca}</strong></div>
                        <div class="info-item"><span>Categoría:</span> <strong id="summary-categoria">${n.categoria}</strong></div>
                        <div class="info-item description-item"><span>Descripción:</span> <em id="summary-descripcion">${n.descripcion||"Ninguna"}</em></div>
                    </div>
                </section>
                <section class="summary-section">
                    <h3><i class="bi bi-receipt me-1"></i> Resumen de Compra</h3>
                    <div class="summary-purchase-info">
                        <div class="info-item purchase-item"><span>Costo Paquete:</span> <strong><span id="summary-costo-paquete">${t}${Ge(n.costo)}</span></strong></div>
                        <div class="info-item purchase-item"><span>Cantidad Paquetes:</span> <strong id="summary-cantidad-paquetes">${n.paquetes||"N/A"}</strong></div>
                        <div class="info-item purchase-item"><span>Unidades/Paquete:</span> <strong id="summary-unidades-paquete">${n.unidadesPorPaquete||"N/A"}</strong></div>
                        <div class="purchase-item"><span>Stock Inicial (Unidades):</span> <strong id="summary-stock-inicial">${n.totalUnidades}</strong></div>
                        <div class="total-cost"><span>Costo Total Compra:</span> <strong><span id="summary-costo-total">${t}${Ge(n.costo*(n.paquetes||1))}</span></strong></div>
                    </div>
                </section>
            </div>
            <div class="summary-column-right">
                <section class="summary-section prices-section">
                    <h3><i class="bi bi-tags-fill me-1"></i> Precios de Venta</h3>
                    <div class="summary-prices-grid">
                        ${YA(n.precios,n.costo,n.ganancia,n.unidadesPorPaquete||n.totalUnidades,e)}
                    </div>
                </section>
            </div>
        </div>
    `}function XA(n,e,t){const{simboloPrincipal:r}=t,s=[Ye("Nombre",n.nombre,e.nombre,Nn),Ye("Marca",n.marca,e.marca,Nn),Ye("Categoría",n.categoria,e.categoria,Nn),Ye("Descripción",n.descripcion,e.descripcion,Nn)].join(""),i=[Ye("SKU",n.sku,e.sku,Nn),Ye("Cód. Barras",n.barcode,e.barcode,Nn),Ye("Peso",n.peso,e.peso,QA)].join(""),o=n.precios.costoUnitarioDolar*n.totalUnidades,c=[Ye("Costo Paquete",n.costo,e.costo,wr,r),Ye("Ganancia",n.ganancia,e.ganancia,WA),Ye("Unid. p/ Paquete",n.unidadesPorPaquete,e.unidadesPorPaquete,Jd),Ye("Stock Total",n.totalUnidades,e.stock,Jd),Ye("Valor Inventario (Costo)",o,e.valorInventarioOriginal,wr,r)].join(""),l=n.precios.precioFinalUnitarioDolar,h=n.precios.precioFinalMayorDolar,f=[Ye("Precio Unitario",l,e.precioUnitario,wr,r),Ye("Precio Paquete",h,e.precioPaquete,wr,r)].join(""),p=[s,i,c,f].some(A=>A.includes("diff-item-premium changed")),g=[s,i,c,f].reduce((A,V)=>A+(V.match(/diff-item-premium changed/g)||[]).length,0);let w="";return p?w=`
        <div class="summary-alert-premium warning">
            <div class="alert-icon">
                <i class="bi bi-exclamation-triangle-fill"></i>
            </div>
            <div class="alert-content">
                <div class="alert-title">¡Atención! Hay cambios pendientes</div>
                <div class="alert-subtitle">${g} campo${g>1?"s modificado":" modificado"}. Revisa antes de guardar.</div>
            </div>
            <div class="alert-badge">${g}</div>
        </div>`:w=`
        <div class="summary-alert-premium info">
            <div class="alert-icon">
                <i class="bi bi-info-circle-fill"></i>
            </div>
            <div class="alert-content">
                <div class="alert-title">Sin cambios detectados</div>
                <div class="alert-subtitle">Puedes editar cualquier campo haciendo clic en el ícono <i class="bi bi-pencil-fill"></i></div>
            </div>
        </div>`,`
    <div class="summary-diff-view-premium">
        ${w}
        
        <div class="summary-grid-premium">
            
            <!-- Columna Izquierda -->
            <div class="summary-card-premium">
                <div class="card-premium-header">
                    <i class="bi bi-info-circle-fill"></i>
                    <span>Información Básica</span>
                </div>
                <div class="card-premium-body">
                    ${s}
                </div>
            </div>
            
            <div class="summary-card-premium">
                <div class="card-premium-header">
                    <i class="bi bi-calculator-fill"></i>
                    <span>Costos y Stock</span>
                </div>
                <div class="card-premium-body">
                    ${c}
                </div>
            </div>
            
            <!-- Columna Derecha -->
            <div class="summary-card-premium">
                <div class="card-premium-header">
                    <i class="bi bi-archive-fill"></i>
                    <span>Inventario y Logística</span>
                </div>
                <div class="card-premium-body">
                    ${i}
                </div>
            </div>
            
            <div class="summary-card-premium">
                <div class="card-premium-header">
                    <i class="bi bi-tags-fill"></i>
                    <span>Precios de Venta</span>
                </div>
                <div class="card-premium-body">
                    ${f}
                </div>
            </div>

        </div>
    </div>`}function ZA(n){const e=n.querySelector("#manual-package-price-box"),t=n.querySelector("#manual-package-price-label"),r=n.querySelector("#override-package-price"),s=n.querySelector("#btn-apply-package-offer");s&&s.addEventListener("click",i=>{const o=i.currentTarget,c=o.dataset.offerPrice;e.classList.contains("price-applied")?(e.classList.remove("price-applied"),t.innerHTML='<i class="bi bi-pencil-fill me-1"></i> Establecer manual:',o.textContent="Aplicar",o.classList.remove("cancel-mode"),r.value=""):(r.value=c,e.classList.add("price-applied"),t.innerHTML='<i class="bi bi-check-circle-fill me-1"></i> Precio Aplicado:',o.textContent="Cancelar",o.classList.add("cancel-mode"))}),r&&r.addEventListener("input",()=>{e.classList.remove("price-applied"),t.innerHTML='<i class="bi bi-pencil-fill me-1"></i> Establecer manual:',s.textContent="Aplicar",s.classList.remove("cancel-mode")})}function eS(n,e){n.addEventListener("click",t=>{const r=t.target.closest(".currency-toggle");if(!r)return;const s=r.closest(".summary-price-card");if(!s)return;const i=s.querySelector(".price-main.currency-toggle"),o=s.querySelector(".price-secondary.currency-toggle");if(!i||!o)return;const c=parseFloat(i.dataset.usdValue),l=parseFloat(i.dataset.vesValue);if(isNaN(c)||isNaN(l))return;const h=r===i,f=r.dataset.currentCurrency,p=h?o:i,{simboloPrincipal:g,simboloBase:w}=e;if(g==="ERR"||w==="ERR"){console.error("Símbolos de moneda no recibidos en config");return}f==="usd"?(r.textContent=`${w}${Ge(l)}`,r.dataset.currentCurrency="ves",p.textContent=`${g}${Ge(c)}`,p.dataset.currentCurrency="usd"):(r.textContent=`${g}${Ge(c)}`,r.dataset.currentCurrency="usd",p.textContent=`${w}${Ge(l)}`,p.dataset.currentCurrency="ves")})}function tS(n=null,e,t=!1){const r=document.createElement("div");r.className="product-form-wrapper";const s=n!==null,i=F.settings.products.available_categories||[],o=F.settings.currencies.principal.symbol||"$",c=F.settings.currencies.base.symbol||"Bs.",l=F.settings.products.tax_rate,h=F.settings.currencies.principal.rate;let f=null,p=null;const g=s?n?.pricing?.priceLists?.[0]||{}:{},w={nombre:s&&n?.name?.trim()||"",marca:s&&n?.brand?.trim()||"",categoria:s&&n?.categoryId?.trim()||"",descripcion:s&&n?.description?.trim()||"",sku:s&&n?.sku?.trim()||"",barcode:s&&n?.barcode?.trim()||"",costo:s&&n?.pricing?.packageCost||0,unidadesPorPaquete:s&&n?.pricing?.unitsPerPackage||0,stock:s&&n?.stock?.current||0,ganancia:s&&(g.marginPercentage||n?.pricing?.marginPercentage)||0,peso:s&&n?.dimensions?.weight||null,precioUnitario:s&&(g.unitSellPrice||n?.pricing?.unitSellPrice)||0,precioPaquete:s&&(g.packageSellPrice||n?.pricing?.packageSellPrice)||0,valorInventarioOriginal:s?(n?.pricing?.packageCost||0)/(n?.pricing?.unitsPerPackage||1)*(n?.stock?.current||0):0};r.innerHTML=`
        <div class="wizard-stepper" id="product-wizard-stepper">
            <div class="step active" data-step="1"><span>Paso 1</span>Básico</div>
            <div class="step" data-step="2"><span>Paso 2</span>Inventario</div>
            <div class="step" data-step="3"><span>Paso 3</span>Precios</div>
            <div class="step" data-step="4"><span>Paso 4</span>Resumen</div>
        </div>

        <div class="wizard-content">
            <form class="product-form" id="product-form">
                
                <div class="wizard-step" data-step="1" style="display: block;">
                     <div class="form-grid-layout">
                        <div class="form-column-left">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-info-circle-fill"></i> 
                                    <span>Información Básica</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="form-group">
                                        <label for="producto">Nombre <span class="text-danger">*</span></label>
                                        <input type="text" id="producto" required value="${w.nombre}">
                                    </div>
                                    <div class="form-group">
                                        <label for="marca">Marca <span class="text-danger">*</span></label>
                                        <input type="text" id="marca" required value="${w.marca}">
                                    </div>
                                    <div class="form-group">
                                        <label for="categoria">Categoría <span class="text-danger">*</span></label>
                                        <select id="categoria" required>
                                            <option value="">Selecciona</option>
                                           ${i.map(de=>`<option value="${de}" ${w.categoria===de?"selected":""}>${de}</option>`).join("")}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-column-right">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-pencil-square"></i> 
                                    <span>Detalles</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="form-group">
                                        <label for="descripcion">Descripción</label>
                                        <textarea id="descripcion" placeholder="Detalles del producto (opcional)" rows="8">${w.descripcion}</textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="2" style="display: none;">
                    <div class="form-grid-layout">
                         <div class="form-column-left">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-archive-fill"></i> 
                                    <span>Identificadores</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="form-group">
                                        <label for="sku">SKU</label>
                                        <input type="text" id="sku" placeholder="Código único (Opcional)" value="${w.sku}">
                                    </div>
                                    <div class="form-group">
                                        <label for="barcode">Código de Barras</label>
                                        <input type="text" id="barcode" placeholder="Ej: 759..." value="${w.barcode}">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-column-right">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-truck"></i> 
                                    <span>Logística</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="form-group">
                                        <label for="proveedor">Proveedor</label>
                                        <select disabled id="proveedor"><option value="">Selecciona (Próximamente)</option></select>
                                    </div>
                                    <div class="form-group">
                                        <label for="peso">Peso (Kg)</label>
                                        <input type="number" id="peso" step="0.01" placeholder="Opcional" value="${w.peso||""}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="3" style="display: none;">
                     <div class="form-grid-layout">
                         <div class="form-column-left">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-calculator-fill"></i> 
                                    <span>Cálculo de Precios</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="form-group">
                                        <label for="costo">Costo Paquete (${o}) <span class="text-danger">*</span></label>
                                        <input type="number" id="costo" step="0.01" required value="${w.costo}">
                                    </div>
                                    <div class="form-group">
                                        <label for="ganancia">Ganancia (%) <span class="text-danger">*</span></label>
                                        <input type="number" id="ganancia" step="0.1" required value="${w.ganancia}">
                                    </div>
                                </div>
                            </div>
                         </div>
                         <div class="form-column-right">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-box-seam"></i> 
                                    <span>Inventario Inicial</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="input-group" style="display: flex; gap: 1rem;">
                                        <div style="flex: 1;" class="form-group">
                                            <label for="paquetes">Paquetes</label>
                                            <input type="number" id="paquetes" placeholder="Opc." min="1">
                                        </div>
                                        <div style="flex: 1;" class="form-group">
                                            <label for="unidades-por-paquete">Unid./Paquete</label>
                                            <input type="number" id="unidades-por-paquete" placeholder="Opc." min="1" value="${w.unidadesPorPaquete||""}">
                                        </div>
                                    </div>
                                    <div class="form-group" style="margin-bottom: 0;"> <label for="unidades">Stock ${s?"Total":"Inicial"} (Unidades) <span class="text-danger">*</span></label>
                                        <input type="number" id="unidades" required min="1" value="${w.stock}">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="4" style="display: none;">
                    <div class="product-summary-view" id="summary-view">
                    </div>
                </div>
            </form>
        </div>
    `;const A=r.querySelector("#product-form"),V=r.querySelector("#paquetes"),D=r.querySelector("#unidades-por-paquete"),j=r.querySelector("#unidades"),$=A.querySelector("#costo"),U=A.querySelector("#ganancia"),z=A.querySelector("#producto"),M=A.querySelector("#marca"),q=A.querySelector("#categoria"),E=A.querySelector("#descripcion"),_=r.querySelector("#sku"),v=r.querySelector("#barcode"),b=r.querySelector("#peso"),I=r.querySelector("#product-wizard-stepper"),S=r.querySelectorAll(".wizard-step");function y(){const de=parseFloat($.value)||0,ue=parseFloat(U.value)||0,_e=parseInt(D.value)||0,qe=parseInt(j.value),Qe=parseInt(V.value)||0;if(de<=0||ue<0||!qe||qe<=0)return re("Completa Costo(*), Ganancia(*) y Stock(*) con valores válidos.","warning"),!1;const me=z.value.trim(),ie=M.value.trim(),ke=q.value.trim(),Dt=E.value.trim(),it=_.value.trim(),lt=v.value.trim(),xe=parseFloat(b.value)||null,Re=_e>0?_e:1;if(f=zA(de,ue,Re,F.settings),f){const sr={nombre:me,marca:ie,categoria:ke,descripcion:Dt,sku:it,barcode:lt,peso:xe,costo:de,ganancia:ue,paquetes:Qe,unidadesPorPaquete:_e,totalUnidades:qe,precios:f},Ze=r.querySelector("#summary-view"),Vt={simboloPrincipal:o,simboloBase:c,tasaIVA:l,tasaCambio:h};return s?Ze.innerHTML=XA(sr,w,Vt):(Ze.innerHTML=JA(sr,Vt),eS(Ze,Vt),ZA(Ze)),p.showStep(4),!0}else return re("Error al calcular precios.","error"),!1}async function Ie(){if(p.getStep()!==4){y()&&re("Por favor, revisa los cambios y presiona 'Actualizar Producto'","info");return}if(!f){re("Hubo un error al calcular precios. Vuelve al Paso 3.","warning"),p.showStep(3);return}const de=z.value.trim(),ue=M.value.trim(),_e=q.value.trim(),qe=E.value.trim(),Qe=parseFloat($.value)||0,me=parseFloat(U.value)||0,ie=parseInt(j.value),ke=parseInt(D.value)||null,Dt=_.value.trim(),it=v.value.trim(),lt=parseFloat(b.value)||null,xe=r.querySelector("#override-package-price"),Re=xe?parseFloat(xe.value):NaN,sr=!isNaN(Re)&&Re>0?Re:f.precioFinalMayorDolar;p.setSaveButtonBusy(!0);const Ze={name:de,brand:ue,categoryId:_e,description:qe,sku:Dt||null,barcode:it||null,isActive:n?.isActive??!0,isFeatured:n?.isFeatured??!1,dimensions:{weight:lt,weightUnit:"kg",width:n?.dimensions?.width||null,height:n?.dimensions?.height||null,depth:n?.dimensions?.depth||null,dimensionUnit:n?.dimensions?.dimensionUnit||"cm"},stock:{current:ie,minThreshold:n?.stock?.minThreshold??10,warehouseId:n?.stock?.warehouseId??"wh_principal"},pricing:{packageCost:Qe,unitsPerPackage:ke,taxRatePercentage:l,priceLists:[{id:"publico",name:"Precio Público",marginPercentage:me,unitSellPrice:f.precioFinalUnitarioDolar,packageSellPrice:sr}]},createdAt:n?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),supplier:n?.supplier||null};s&&(Ze.id=n.id);try{if(t)s?(await vA(n.id,Ze),re(`Plantilla "${de}" actualizada.`,"success")):(await yA(Ze),re(`Plantilla "${de}" creada.`,"success"));else if(s)await _A(F,Ze.id,Ze),re(`Producto "${de}" actualizado.`,"success");else{if(GA(de,ue,F.products))throw re("Ya existe producto con nombre y marca.","error"),p.showStep(1),new Error("Producto duplicado");await gA(F,Ze),re(`Producto "${de}" creado.`,"success")}e.remove()}catch(Vt){N.error("Error al guardar:",Vt),Vt.message!=="Producto duplicado"&&re("Error al guardar.","error")}finally{p.setSaveButtonBusy(!1)}}const Xe=()=>{const de=parseInt(V.value)||0,ue=parseInt(D.value)||0;de>0&&ue>0&&(j.value=de*ue)};V.addEventListener("input",Xe),D.addEventListener("input",Xe);function rr(de){const ue=de.target.closest('[data-action="inline-edit"]');if(!ue||r.querySelector(".inline-edit-input"))return;const _e=ue.dataset.fieldLabel,qe=ue.dataset.currentValue,me={Nombre:{id:"#producto",type:"text"},Marca:{id:"#marca",type:"text"},Categoría:{id:"#categoria",type:"select"},Descripción:{id:"#descripcion",type:"textarea"},SKU:{id:"#sku",type:"text"},"Cód. Barras":{id:"#barcode",type:"text"},Peso:{id:"#peso",type:"number"},"Costo Paquete":{id:"#costo",type:"number"},Ganancia:{id:"#ganancia",type:"number"},"Unid. p/ Paquete":{id:"#unidades-por-paquete",type:"number"},"Stock Total":{id:"#unidades",type:"number"}}[_e];if(!me)return;let ie;if(me.type==="textarea")ie=document.createElement("textarea"),ie.rows=3;else if(me.type==="select"&&me.id==="#categoria"){ie=document.createElement("select");const xe=i.map(Re=>`<option value="${Re}" ${qe===Re?"selected":""}>${Re}</option>`).join("");ie.innerHTML=`<option value="">Selecciona</option>${xe}`}else ie=document.createElement("input"),ie.type=me.type==="number"?"number":"text",me.type==="number"&&(ie.step=me.id==="#ganancia"?"0.1":"0.01",(me.id==="#unidades"||me.id==="#unidades-por-paquete")&&(ie.step="1"));ie.className="inline-edit-input",ie.value=qe;const ke=ue.closest(".diff-value-premium");if(!ke)return;const Dt=ke.innerHTML;ke.innerHTML="",ke.appendChild(ie),ie.focus(),ie.select&&ie.select();const it=()=>{const xe=ie.value,Re=r.querySelector(me.id);Re&&(Re.value=xe),ie.removeEventListener("blur",it),ie.removeEventListener("keydown",lt),y()},lt=xe=>{if(xe.key==="Enter"&&me.type!=="textarea")xe.preventDefault(),it();else if(xe.key==="Escape"){ie.removeEventListener("blur",it),ie.removeEventListener("keydown",lt),ke.innerHTML=Dt;const Re=ke.querySelector('[data-action="inline-edit"]');Re&&Re.addEventListener("click",rr)}};ie.addEventListener("blur",it,{once:!0}),ie.addEventListener("keydown",lt)}return setTimeout(()=>{p=Pg({modalElementRef:e,wizardStepperEl:I,wizardStepsEls:S,isEditMode:s,callbacks:{onStepNext:()=>{const _e=p.getStep();if(_e===1){const qe=z.value,Qe=M.value,me=q.value;if(!jA(qe,Qe,me)){re("Completa Nombre, Marca y Categoría (*).","warning");return}p.showStep(2)}else _e===2&&p.showStep(3)},onStepPrev:()=>{const _e=p.getStep();_e===4?p.showStep(3):_e===3?p.showStep(2):_e===2&&p.showStep(1)},onCalculate:()=>{y()},onSubmit:()=>{Ie()}}});const ue=r.querySelector(".wizard-content");ue&&ue.addEventListener("click",rr)},50),r}const nS="https://us-central1-buca-scdbs.cloudfunctions.net/createBusinessAndOwner";async function rS(n,e){N.info("Llamando a Cloud Function (manual fetch): createBusinessAndOwner...",{businessData:n,ownerData:e});try{if(!Hr.currentUser)throw new Error("No hay usuario autenticado.");const t=await Hr.currentUser.getIdToken(!0),r=await fetch(nS,{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${t}`},body:JSON.stringify({data:{businessData:n,ownerData:e}})}),s=await r.json();if(!r.ok||s.error)throw new Error(s.error?.message||"Error en la respuesta del servidor.");if(s.data&&s.data.success)return N.info("Cloud Function (manual fetch) ejecutada con éxito:",s.data),s.data;throw new Error("La respuesta del servidor no fue exitosa.")}catch(t){throw N.error("Error al llamar la Cloud Function (manual fetch):",t),new Error(t.message)}}async function sS(n,e){N.info(`[AdminService] Actualizando empresa ${n}...`,e);try{const t=Ot(Pt,"businesses",n);return await oa(t,e),{success:!0}}catch(t){throw N.error("Error actualizando empresa:",t),t}}async function ES(n){N.info(`[AdminService] Soft-deleting empresa ${n}...`);try{const e=Ot(Pt,"businesses",n);return await oa(e,{status:"deleted",isActive:!1,deletedAt:new Date().toISOString(),deletedBy:Hr.currentUser?.uid||"system"}),N.info(`[AdminService] Empresa ${n} movida a la papelera.`),{success:!0}}catch(e){throw N.error("Error al archivar la empresa (Soft Delete):",e),e}}async function IS(n){N.info(`[AdminService] Restaurando empresa ${n}...`);try{const e=Ot(Pt,"businesses",n);return await oa(e,{status:"active",isActive:!0,deletedAt:null,deletedBy:null}),{success:!0}}catch(e){throw N.error("Error al restaurar la empresa:",e),e}}function iS(n,e=null){const t=document.createElement("div");t.className="product-form-wrapper";let r=null;const s=!!e,i=[{id:"plan_basic",name:"Básico"},{id:"plan_advanced",name:"Avanzado"},{id:"plan_enterprise",name:"Empresarial"}],o={name:s?e.name:"",plan:s?e.planId:""};t.innerHTML=`
        <div class="wizard-stepper" id="company-wizard-stepper">
            <div class="step active" data-step="1"><span>Paso 1</span>Negocio</div>
            <div class="step" data-step="2" style="${s?"display:none;":""}"><span>Paso 2</span>Propietario</div>
            <div class="step" data-step="3"><span>Paso 3</span>Confirmar</div>
        </div>

        <div class="wizard-content">
            <form class="product-form" id="company-form">
                
                <div class="wizard-step" data-step="1" style="display: block;">
                    <div class="form-grid-layout" style="grid-template-columns: 1fr;">
                        <div class="form-column-left">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-building"></i> 
                                    <span>${s?"Editar Datos":"Detalles del Negocio"}</span>
                                </div>
                                <div class="card-premium-body">
                                    <div class="form-group">
                                        <label for="company-name">Nombre de la Compañía <span class="text-danger">*</span></label>
                                        <input type="text" id="company-name" required 
                                               value="${o.name}"
                                               placeholder="Ej: Abarrotes La Esquina">
                                    </div>
                                    <div class="form-group">
                                        <label for="company-plan">Plan Asignado <span class="text-danger">*</span></label>
                                        <select id="company-plan" required>
                                            <option value="">Selecciona un plan...</option>
                                            ${i.map(D=>`
                                                <option value="${D.id}" ${D.id===o.plan?"selected":""}>
                                                    ${D.name}
                                                </option>
                                            `).join("")}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="2" style="display: none;">
                    <div class="form-grid-layout" style="grid-template-columns: 1fr;">
                         <div class="form-column-left">
                            <div class="summary-card-premium">
                                <div class="card-premium-header">
                                    <i class="bi bi-person-fill-gear"></i> 
                                    <span>Usuario Propietario</span>
                                </div>
                                <div class="card-premium-body">
                                    ${s?'<p class="text-muted p-3">La gestión del propietario se realiza desde el módulo de usuarios.</p>':`
                                    <div class="form-group">
                                        <label for="owner-name">Nombre del Propietario <span class="text-danger">*</span></label>
                                        <input type="text" id="owner-name" required placeholder="Ej: Juan Pérez">
                                    </div>
                                    <div class="form-group">
                                        <label for="owner-email">Email de Acceso <span class="text-danger">*</span></label>
                                        <input type="email" id="owner-email" required placeholder="juan.perez@email.com">
                                    </div>
                                    <div class="form-group">
                                        <label for="owner-password">Contraseña Temporal <span class="text-danger">*</span></label>
                                        <input type="password" id="owner-password" required autocomplete="new-password">
                                    </div>
                                    `}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="wizard-step" data-step="3" style="display: none;">
                    <div class="product-summary-view" id="summary-view">
                        </div>
                </div>
            </form>
        </div>
    `;const c=t.querySelector("#company-name"),l=t.querySelector("#company-plan"),h=t.querySelector("#owner-name"),f=t.querySelector("#owner-email"),p=t.querySelector("#owner-password");function g(){return!c.value.trim()||!l.value?(re("Debes completar el nombre y el plan del negocio.","warning"),!1):!0}function w(){return s?!0:!h.value.trim()||!f.value.trim()?(re("Debes completar el nombre y email del propietario.","warning"),!1):p.value.length<6?(re("La contraseña debe tener al menos 6 caracteres.","warning"),!1):!0}function A(){const D=t.querySelector("#summary-view"),j={name:c.value,plan:l.options[l.selectedIndex].text};let $="";if(!s&&h){const U={name:h.value,email:f.value};$=`
                <div class="summary-card-premium mt-3">
                    <div class="card-premium-header"><i class="bi bi-person-fill-gear"></i><span>Propietario</span></div>
                    <div class="card-premium-body">
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Nombre</span></div><div class="diff-value-premium"><span class="diff-current-value">${U.name}</span></div></div>
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Email</span></div><div class="diff-value-premium"><span class="diff-current-value">${U.email}</span></div></div>
                        <div class="diff-item-premium unchanged"><div class="diff-header-premium"><span class="diff-label-premium">Contraseña</span></div><div class="diff-value-premium"><span class="diff-current-value">********</span></div></div>
                    </div>
                </div>
            `}return D.innerHTML=`
            <div class="summary-alert-premium info">
                <div class="alert-icon"><i class="bi bi-info-circle-fill"></i></div>
                <div class="alert-content">
                    <div class="alert-title">${s?"Confirmar Cambios":"Revisar Datos"}</div>
                    <div class="alert-subtitle">Verifica la información antes de ${s?"actualizar":"crear"}.</div>
                </div>
            </div>
            <div class="summary-grid-premium">
                <div class="summary-card-premium">
                    <div class="card-premium-header"><i class="bi bi-building"></i><span>Negocio</span></div>
                    <div class="card-premium-body">
                        <div class="diff-item-premium ${s?"changed":"unchanged"}"><div class="diff-header-premium"><span class="diff-label-premium">Nombre</span></div><div class="diff-value-premium"><span class="diff-current-value">${j.name}</span></div></div>
                        <div class="diff-item-premium ${s?"changed":"unchanged"}"><div class="diff-header-premium"><span class="diff-label-premium">Plan</span></div><div class="diff-value-premium"><span class="diff-current-value">${j.plan}</span></div></div>
                    </div>
                </div>
                ${$}
            </div>
        `,r.showStep(3),!0}async function V(){if(!g()){r.showStep(1);return}if(!s&&!w()){r.showStep(2);return}r.setSaveButtonBusy(!0);try{if(s)await sS(e.id,{name:c.value.trim(),planId:l.value}),re("Compañía actualizada exitosamente.","success");else{const D={name:c.value.trim(),planId:l.value},j={name:h.value.trim(),email:f.value.trim(),password:p.value};await rS(D,j),re(`Negocio "${D.name}" creado exitosamente.`,"success")}n.remove()}catch(D){N.error("Error en formulario:",D),re(D.message||"Error en la operación.","error"),r.setSaveButtonBusy(!1)}}return setTimeout(()=>{const D={onStepNext:()=>{const z=r.getStep();z===1?g()&&(s?A():r.showStep(2)):z===2&&w()&&A()},onStepPrev:()=>{const z=r.getStep();s&&z===3?r.showStep(1):z>1&&r.showStep(z-1)},onCalculate:()=>{g()&&A()},onSubmit:V},j=t.querySelector("#company-wizard-stepper");r=Pg({modalElementRef:n,wizardStepperEl:j,wizardStepsEls:t.querySelectorAll(".wizard-step"),isEditMode:s,callbacks:D});const $=n.querySelector("#modal-btn-calculate"),U=n.querySelector("#modal-btn-save");$&&($.innerHTML='<i class="bi bi-eye-fill me-1"></i> Revisar'),U&&(U.innerHTML=s?'<i class="bi bi-arrow-repeat me-1"></i> Actualizar Negocio':'<i class="bi bi-check-circle-fill me-1"></i> Crear Negocio')},50),t}function oS(n=[]){let e=[...n];const t=document.createElement("div");t.className="category-manager";function r(l){const h=document.createElement("div");h.className="category-tag",h.dataset.value=l;const f=document.createElement("span");f.textContent=l;const p=document.createElement("button");return p.type="button",p.className="delete-tag",p.innerHTML="&times;",p.dataset.action="delete-category",h.appendChild(f),h.appendChild(p),h}function s(){const l=e.map(h=>r(h).outerHTML).join("");t.innerHTML=`
            <div class="category-tag-list custom-scrollbar">
                ${l.length>0?l:'<span class="no-tags-placeholder">No hay categorías añadidas.</span>'}
            </div>
            <div class="category-input-group">
                <input type="text" id="new-category-input" class="form-control" placeholder="Escribe un nombre...">
                <button type="button" class="btn-primary" id="btn-add-category">
                    <i class="bi bi-plus-lg"></i> Añadir
                </button>
            </div>
        `}function i(){const l=t.querySelector("#new-category-input");if(!l)return;const h=Ir(l.value.trim());h&&!e.find(f=>f.toLowerCase()===h.toLowerCase())&&(e.push(h),l.value="",s(),c())}function o(l){const h=l.target.closest('[data-action="delete-category"]');if(!h)return;const p=h.closest(".category-tag").dataset.value;e=e.filter(g=>g!==p),s(),c()}function c(){const l=t.querySelector("#btn-add-category"),h=t.querySelector("#new-category-input"),f=t.querySelector(".category-tag-list");l&&l.addEventListener("click",i),h&&h.addEventListener("keydown",p=>{p.key==="Enter"&&(p.preventDefault(),i())}),f&&f.addEventListener("click",o)}return s(),c(),{element:t,getCategories:()=>e}}function aS(n){const e=document.createElement("div");e.className="settings-layout";const t=F.settings.appConfig||{},r=t.system?.metadata?.appNameSimplify||"B.U.C.A",s=t.system?.metadata?.appName||"Business Under Control Access",i=F.settings.products.tax_rate||16,o=F.settings.appearance?.header||{showFullscreen:!0,showMessages:!0,showNotifications:!0,showSettings:!0,showRate:!0,showLanguage:!0},c=Array.isArray(F.settings.products.available_categories)?F.settings.products.available_categories:["General"],l=oS(c),h=(w,A)=>`
        <div class="maintenance-state">
            <i class="bi bi-cone-striped maintenance-icon animate-pulse"></i>
            <h3>${w}</h3>
            <p class="text-muted">${A}</p>
            <button class="btn-secondary mt-4" disabled>Notificarme cuando esté listo</button>
        </div>
    `,f=(w,A,V,D)=>`
        <label class="form-switch" for="${w}">
            <div class="switch-label-group">
                <span class="switch-title">${A}</span>
                <span class="switch-desc">${V}</span>
            </div>
            <input type="checkbox" id="${w}" class="form-check-input" ${D?"checked":""}>
        </label>
        <hr style="margin: 0.5rem 0; border-color: var(--bs-border-color); opacity: 0.5;">
    `;e.innerHTML=`
        <nav class="settings-nav custom-scrollbar">
            <div class="nav-section-title">Sistema</div>
            <button class="settings-nav-item active" data-panel="panel-general">
                <i class="bi bi-sliders"></i> General
            </button>
            <button class="settings-nav-item" data-panel="panel-defaults">
                <i class="bi bi-box-seam"></i> Valores por Defecto
            </button>
            
            <div class="nav-section-title">Negocio</div>
            <button class="settings-nav-item" data-panel="panel-plans">
                <i class="bi bi-credit-card-2-front"></i> Planes y Suscripción
            </button>
            <button class="settings-nav-item" data-panel="panel-integrations">
                <i class="bi bi-plugin"></i> Integraciones 
                <span class="badge bg-warning-subtle text-warning-emphasis ms-auto">WIP</span>
            </button>
            
            <div class="nav-section-title">Personalización</div>
            <button class="settings-nav-item" data-panel="panel-appearance">
                <i class="bi bi-palette"></i> Apariencia 
                <!--<span class="badge bg-warning-subtle text-warning-emphasis ms-auto">WIP</span>-->
            </button>
        </nav>

        <div class="settings-content custom-scrollbar">

            <div id="panel-general" class="settings-panel active">
                <div class="settings-header-block">
                    <h2>Configuración General</h2>
                    <p>Define la identidad básica de la plataforma.</p>
                </div>
                <div class="config-box">
                    <div class="config-box-header">
                        <i class="bi bi-globe"></i>
                        <h3>Identidad del Sitio</h3>
                    </div>
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Nombre Corto (Header)</label>
                                <input type="text" id="setting-app-name" class="form-control" value="${Ir(r)}">
                                <small class="text-muted">Visible en la barra superior móvil.</small>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>Nombre Completo (Login)</label>
                                <input type="text" id="setting-app-name-full" class="form-control" value="${Ir(s)}">
                                <small class="text-muted">Visible en la pantalla de inicio de sesión.</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="panel-defaults" class="settings-panel" style="display: none;">

                <div class="settings-header-block">
                    <h2>Valores por Defecto</h2>
                    <p>Configura los parámetros iniciales para nuevos productos y negocios.</p>
                </div>
                <div class="config-box">
                    <div class="config-box-header">
                        <i class="bi bi-tags-fill"></i>
                        <h3>Categorías de Producto</h3>
                    </div>
                    <p class="text-muted mb-3">Estas categorías aparecerán sugeridas al crear un nuevo producto.</p>
                    <div id="category-manager-container"></div>
                </div>

                <div class="config-box">
                    <div class="config-box-header">
                        <i class="bi bi-percent"></i>
                        <h3>Impuestos (IVA)</h3>
                    </div>
                    <div class="form-group" style="max-width: 300px;">
                        <label>Tasa de IVA Global (%)</label>
                        <div class="input-group">
                            <input type="number" id="setting-default-tax" class="form-control" value="${i}">
                            <span class="input-group-text">%</span>
                        </div>
                        <small class="text-muted">Esta tasa se aplicará si el negocio no define una propia.</small>
                    </div>
                </div>

            </div>

            <div id="panel-plans" class="settings-panel" style="display: none;">
                ${h("Gestión de Planes","Estamos rediseñando el módulo de suscripciones para ofrecer facturación recurrente.")}
            </div>
            <div id="panel-integrations" class="settings-panel" style="display: none;">
                ${h("Integraciones API","Próximamente podrás conectar pasarelas de pago y servicios de envío.")}
            </div>

            <div id="panel-appearance" class="settings-panel" style="display: none;">
                <div class="settings-header-block">
                    <h2>Personalización de Interfaz</h2>
                    <p>Controla qué elementos son visibles en la barra superior (Header).</p>
                </div>

                <div class="config-box">
                    <div class="config-box-header">
                        <i class="bi bi-layout-text-window-reverse"></i>
                        <h3>Acciones de Cabecera</h3>
                    </div>
                    <div class="p-2">
                        ${f("toggle-show-fullscreen","Pantalla Completa","Botón para expandir la vista",o.showFullscreen)}
                        ${f("toggle-show-rate","Widget de Tasa BCV","Muestra la tasa de cambio actual",o.showRate)}
                        ${f("toggle-show-language","Selector de Idioma","Bandera y menú de región",o.showLanguage)}
                        ${f("toggle-show-messages","Mensajes (WIP)","Acceso directo a bandeja de entrada",o.showMessages)}
                        ${f("toggle-show-notifications","Notificaciones","Campana de alertas del sistema",o.showNotifications)}
                        ${f("toggle-show-settings","Acceso Rápido Configuración","Engranaje de ajustes directos",o.showSettings)}
                    </div>
                </div>
            </div>
            
        </div>

        <nav class="settings-quick-nav">
            <button class="quick-nav-item" data-tippy-content="Seguridad" data-tippy-placement="left"><i class="bi bi-shield-lock"></i></button>
            <button class="quick-nav-item" data-tippy-content="Base de Datos" data-tippy-placement="left"><i class="bi bi-database"></i></button>
            <button class="quick-nav-item" data-tippy-content="Logs del Sistema" data-tippy-placement="left"><i class="bi bi-terminal"></i></button>
        </nav>
    `,e.querySelector("#category-manager-container").appendChild(l.element);const p=e.querySelectorAll(".settings-nav-item"),g=e.querySelectorAll(".settings-panel");return p.forEach(w=>{w.addEventListener("click",()=>{const A=w.dataset.panel;p.forEach(V=>V.classList.remove("active")),w.classList.add("active"),g.forEach(V=>{V.style.display=V.id===A?"block":"none",V.id===A&&V.classList.add("active")})})}),{element:e,getSettingsData:()=>({appName:Ir(e.querySelector("#setting-app-name").value),appNameFull:Ir(e.querySelector("#setting-app-name-full").value),defaultTax:parseFloat(e.querySelector("#setting-default-tax").value)||0,defaultCategories:l.getCategories(),appearance:{header:{showFullscreen:e.querySelector("#toggle-show-fullscreen").checked,showRate:e.querySelector("#toggle-show-rate").checked,showLanguage:e.querySelector("#toggle-show-language").checked,showMessages:e.querySelector("#toggle-show-messages").checked,showNotifications:e.querySelector("#toggle-show-notifications").checked,showSettings:e.querySelector("#toggle-show-settings").checked}}})}}function cS(n,e,t,r={}){const i={...{icon:"bi bi-exclamation-triangle-fill text-warning",confirmText:"Sí, continuar",cancelText:"Cancelar",confirmButtonClass:"btn-primary",cancelButtonClass:"btn-secondary",confirmIcon:"bi bi-check-lg",cancelIcon:"bi bi-x-lg",modalId:"confirmation-modal"},...r},o=document.createElement("div");o.innerHTML=`
        <div style="text-align: center; padding: 1rem 0;">
            <div style="font-size: 3rem; margin-bottom: 1rem;">
                <i class="${i.icon}"></i>
            </div>
            <p style="font-size: 1.1rem; line-height: 1.5; color: var(--bs-gray-700); margin: 0;">
                ${e}
            </p>
        </div>
    `,document.documentElement.getAttribute("data-bs-theme")==="dark"&&(o.querySelector("p").style.color="var(--bs-gray-300)");const c=document.createElement("button");c.className=i.confirmButtonClass,c.innerHTML=`<i class="${i.confirmIcon} me-1"></i> ${i.confirmText}`;const l=document.createElement("button");l.className=i.cancelButtonClass,l.innerHTML=`<i class="${i.cancelIcon} me-1"></i> ${i.cancelText}`;const h=vi({title:"",contentElement:o,id:i.modalId,size:"small"});h.querySelector(".modal-header").style.borderBottom="none",h.querySelector(".modal-header").style.paddingBottom="0";const f=h.querySelector("#modal-footer-container");f&&f.append(l,c);const p=()=>h.remove();l.addEventListener("click",p),c.addEventListener("click",()=>{t(),p()}),document.body.appendChild(h)}function wS(n=null,e={}){const{isGlobal:t=!1}=e;return new Promise(r=>{const s=n!==null,i=t?"Plantilla Global":"Producto",o=s?`<i class="bi bi-pencil-fill me-2"></i> Editar ${i}`:`<i class="bi bi-plus-circle-fill me-2"></i> Nueva ${i}`,c=document.createElement("div");c.textContent="Cargando...";const l=vi({title:o,contentElement:c,id:s?"edit-product-modal":"add-product-modal",size:"large"}),h=tS(n,l,t),f=l.querySelector("#modal-body-container");f&&(f.innerHTML="",f.appendChild(h)),document.body.appendChild(l);const p=h.querySelector("input, select");p&&p.focus();const g=l.remove;l.remove=function(){g.call(this),r(!0)}})}function bS(n=null){return new Promise(e=>{const r=n!==null?'<i class="bi bi-pencil-square me-2"></i> Editar Compañía':'<i class="bi bi-building-fill-add me-2"></i> Crear Nueva Compañía',s=document.createElement("div");s.textContent="Cargando formulario...";const i=vi({title:r,contentElement:s,id:"add-company-modal",size:"large"}),o=iS(i,n),c=i.querySelector("#modal-body-container");c&&(c.innerHTML="",c.appendChild(o)),document.body.appendChild(i);const l=o.querySelector("input, select");l&&l.focus();const h=i.remove;i.remove=function(){h.call(this),e(!0)}})}function lS(){return new Promise(n=>{const e='<i class="bi bi-shield-lock-fill me-2"></i> Configuración Global',t=document.createElement("div");t.textContent="Cargando configuración...";const r=vi({title:e,contentElement:t,id:"super-admin-settings-modal",size:"fullscreen"}),s=r.querySelector(".modal-header"),i=r.querySelector(".close");if(s&&i){const w=document.createElement("div");w.className="modal-header-actions",w.innerHTML=`
                <div class="search-container">
                    <i class="bi bi-search search-icon"></i>
                    <input type="search" id="search-settings" class="form-control" placeholder="Buscar ajustes (próximamente)..." disabled>
                </div>
            `,s.insertBefore(w,i)}const o=r.querySelector("#modal-body-container");o.style.padding="0";const{element:c,getSettingsData:l}=aS();o&&(o.innerHTML="",o.appendChild(c));const h=r.querySelector("#modal-footer-container"),f=document.createElement("button");f.className="btn-primary",f.innerHTML='<i class="bi bi-save-fill me-1"></i> Guardar Cambios',f.id="btn-save-global-settings";const p=document.createElement("button");p.className="btn-secondary",p.innerHTML="Cancelar",h.append(p,f),f.addEventListener("click",async()=>{const w=f.innerHTML;f.innerHTML='<i class="bi bi-hourglass-split animate-spin me-1"></i> Guardando...',f.disabled=!0;try{const A=l();N.info("Guardando configuración global...",A),F.settings.appConfig.system||(F.settings.appConfig.system={}),F.settings.appConfig.system.metadata||(F.settings.appConfig.system.metadata={}),F.settings.appConfig.system.metadata.appNameSimplify=A.appName,F.settings.appConfig.system.metadata.appName=A.appNameFull,F.settings.products.tax_rate=A.defaultTax,F.settings.products.available_categories=A.defaultCategories,A.appearance&&(F.settings.appearance=A.appearance),await vg(F),re("Configuración guardada exitosamente.","success"),r.remove(),In()}catch(A){N.error("Error al guardar configuración:",A),re("Error al guardar: "+A.message,"error"),f.innerHTML=w,f.disabled=!1}}),p.addEventListener("click",()=>{r.remove()}),document.body.appendChild(r);const g=r.remove;r.remove=function(){g.call(this),n(!0)}})}function uS(){if(!Fe(K.EDIT_SETTINGS_BUSINESS)&&!Fe(K.EDIT_SETTINGS_SYSTEM)){N.warn("Intento de abrir modal de tasa sin permisos.");return}function n(z,M){const E=z.toString().split("."),_=E[0],v=E[1]||"00",b=v.substring(0,2),I=v.substring(2);return`
            <span class="fintech-rate">
                <span class="fintech-symbol">${M}</span>
                <span class="fintech-integer">${_}</span>
                <span class="fintech-decorator">.</span>
                <span class="fintech-fraction">${b}</span>
                ${I?`<span class="fintech-extra">${I}</span>`:""}
            </span>
        `}const e=F.settings.currencies.base.symbol||"Bs.",t=F.settings.currencies.principal.rate,r=document.createElement("div");r.style.width="100%",r.innerHTML=`
        <div id="temp-header-widget" style="display:none;">
            <div class="header-status-widget">
                <span class="status-wifi" id="wifi-status-icon" title="Comprobando...">
                    <i class="bi bi-question-circle"></i>
                </span>
                <span class="status-clock" id="live-clock">--:--:--</span>
            </div>
        </div>

        <div class="rate-modal-grid">
            <div class="rate-control-panel">
                <div class="rate-hero-card">
                    <span class="hero-badge"><i class="bi bi-lightning-charge-fill"></i> Tasa Automática</span>
                    <div class="hero-amount" id="hero-rate-display">
                        ${n(t,e)}
                        </div>
                    <div class="hero-date" id="hero-rate-date">
                        Verificando conexión...
                    </div>
                    <div id="api-loading-spinner" style="display:none; margin-top:0.5rem; color: var(--primary-color);">
                        <small><i class="bi bi-arrow-repeat animate-spin"></i> Sincronizando...</small>
                    </div>
                </div>

                <div class="manual-input-card">
                    <div class="manual-header">
                        <h5><i class="bi bi-sliders"></i> Ajuste Manual</h5>
                    </div>
                    <div class="fintech-input-group">
                        <span>${e}</span>
                        <input type="number" step="any" id="manual-rate-input" 
                            value="${t.toString()}" 
                            placeholder="0.0000">
                        </div>
                    <div style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--bs-gray-500);">
                        <i class="bi bi-info-circle-fill me-1"></i> 
                        Este valor prevalecerá para todos los cálculos.
                    </div>
                </div>
            </div>

            <div class="history-panel-card">
                <div class="history-header-panel">
                    <h5><i class="bi bi-graph-up"></i> Tendencia de Mercado</h5>
                </div>
                <ul class="history-list custom-scrollbar" id="rate-history-list">
                    <li class="history-empty-state">
                        <div class="spinner"></div>
                        <span style="margin-top: 1rem;">Cargando...</span>
                    </li>
                    </ul>
            </div>
        </div>
    `;const s=document.createElement("button");s.className="btn-primary",s.innerHTML='<i class="bi bi-check-lg me-1"></i> Aplicar Nueva Tasa';const i=document.createElement("button");i.className="btn-secondary",i.innerHTML="Cerrar";const o=document.createElement("div");o.id="modal-footer-container",o.append(i,s);const c=vi({title:'<i class="bi bi-currency-exchange me-2"></i> Gestión de Tasa',contentElement:r,id:"rate-update-modal",size:"large"}),l=c.querySelector(".modal-footer");l&&(l.innerHTML="",l.appendChild(o));const h=r.querySelector("#temp-header-widget").firstElementChild,f=c.querySelector(".modal-header"),p=c.querySelector(".close");f&&p&&f.insertBefore(h,p);const g=h.querySelector("#wifi-status-icon"),w=r.querySelector("#hero-rate-date"),A=()=>{const z=navigator.onLine;g.className=z?"status-wifi online":"status-wifi offline",g.innerHTML=z?'<i class="bi bi-wifi"></i>':'<i class="bi bi-wifi-off"></i>',g.title=z?"En línea":"Sin conexión",z?w.innerText.includes("Offline")&&(w.innerHTML='<span class="text-success">● En línea</span> • Listo para sincronizar'):w.innerHTML='<span class="text-danger">● Offline</span> • Sin conexión a API'};window.addEventListener("online",A),window.addEventListener("offline",A),A();const V=h.querySelector("#live-clock"),D=()=>{const z=new Date;V.textContent=z.toLocaleTimeString("es-VE",{hour12:!0,hour:"2-digit",minute:"2-digit",second:"2-digit"})},j=setInterval(D,1e3);D();const $=c.remove;c.remove=function(){clearInterval(j),window.removeEventListener("online",A),window.removeEventListener("offline",A),$.call(this)};const U=z=>{const M=parseFloat(z);F.settings.currencies.principal.rate=M,vg(F),localStorage.setItem("buca_last_known_rate_usd",M.toString()),N.info(`Tasa aplicada correctamente: ${M}`),In(),re(`Tasa actualizada a ${e} ${M.toString()}`,"success"),c.remove()};if(s.addEventListener("click",()=>{const z=r.querySelector("#manual-rate-input"),M=parseFloat(z.value),q=F.settings.currencies.principal.rate;if(isNaN(M)||M<=0){re("Ingresa un número válido.","warning");return}const E=Math.abs((M-q)/q);E>.1?cS("¿Cambio significativo?",`La nueva tasa varía un <strong>${(E*100).toFixed(0)}%</strong>. ¿Confirmar?`,()=>U(M),{confirmText:"Sí, aplicar",confirmButtonClass:"btn-warning"}):U(M)}),i.addEventListener("click",()=>c.remove()),document.body.appendChild(c),navigator.onLine){const z=r.querySelector("#api-loading-spinner"),M=r.querySelector("#hero-rate-display");z.style.display="block",Ag().then(q=>{z.style.display="none";const E=parseFloat(q.current.usd),_=new Date(q.current.date+"T12:00:00");if(!isNaN(E)){M.innerHTML=n(E,e);const v=_.toLocaleDateString("es-VE",{weekday:"long",day:"numeric",month:"long"});w.innerHTML=`<span class="text-success">● En línea</span> • Oficial: <strong>${v}</strong>`;const b=r.querySelector("#manual-rate-input");b&&Math.abs(parseFloat(b.value)-t)<.01&&(b.value=E.toString())}}).catch(()=>{z.style.display="none",w.innerHTML='<span class="text-warning">● API Inaccesible</span>'}),Sg(6).then(q=>{const E=r.querySelector("#rate-history-list");if(q&&q.length>0){const _=new Date;_.setHours(0,0,0,0),E.innerHTML=q.map((v,b)=>{const I=q[b+1],S=new Date(`${v.date}T12:00:00`),y=new Date(`${v.date}T00:00:00`);let Ie="",Xe="";y>_?(Ie='<span class="day-badge tomorrow">Mañana</span>',Xe="is-active-day"):y.getTime()===_.getTime()&&(Ie='<span class="day-badge today">Hoy</span>');const rr=S.toLocaleDateString("es-VE",{weekday:"long"}),de=S.toLocaleDateString("es-VE",{day:"numeric",month:"long"}),ue=parseFloat(v.usd);let _e="";if(I){const qe=parseFloat(I.usd),Qe=(ue-qe)/qe*100,me=Qe>0;_e=`
                            <span class="rate-change ${me?"positive":Qe===0?"neutral":"negative"}">
                                <i class="bi ${me?"bi-caret-up-fill":Qe===0?"bi-dash":"bi-caret-down-fill"}"></i> ${Math.abs(Qe).toFixed(2)}%
                            </span>
                        `}return`
                    <li class="history-item ${Xe}">
                        <div class="date-col">
                            <span class="day-name">${rr} ${Ie}</span>
                            <span class="full-date">${de}</span>
                        </div>
                        <div class="val-col">
                            <span class="rate-val">${n(ue,e)}</span>
                            ${_e}
                        </div>
                    </li>`}).join("")}else E.innerHTML='<li class="history-empty-state"><i class="bi bi-info-circle"></i><span>Sin historial disponible.</span></li>'})}else{const z=r.querySelector("#rate-history-list");z.innerHTML=`
            <li class="history-empty-state">
                <i class="bi bi-wifi-off"></i>
                <span>Sin conexión para cargar historial.</span>
            </li>
        `}}function hS(n=document.body,e={}){if(typeof tippy>"u"){N.warn("Tippy.js no está cargado. Los tooltips no funcionarán.");return}const t={animation:"scale-subtle",theme:"light-border",arrow:!0,delay:[400,0],duration:[200,150],placement:"top",allowHTML:!0,maxWidth:300,interactive:!1,...e};try{const r=n.querySelectorAll("[data-tippy-content]");r.length>0&&(tippy(r,t),N.trace(`✅ Tippy inicializado en ${r.length} elemento(s)`));const s=n.querySelectorAll("[title]:not([data-tippy-content])");s.length>0&&(s.forEach(i=>{const o=i.getAttribute("title");o&&o.trim()&&(i.setAttribute("data-tippy-content",o),i.removeAttribute("title"))}),tippy(s,t),N.trace(`✅ Tippy convertido de ${s.length} title(s) legacy`))}catch(r){N.error("Error al inicializar Tippy:",r)}}function TS(n=document.body){n.querySelectorAll("[data-tippy-content], [title]").forEach(t=>{t._tippy&&t._tippy.destroy()}),N.trace("✅ Instancias de Tippy destruidas")}class dS{constructor(e,t,r){this.root=e,this.mainLoader=r,this.currentViewCleanup=()=>{},this.boundHandleGlobalActions=this.handleGlobalActions.bind(this),this.isLoggingOut=!1,this.hasGlobalListener=!1,N.info("App: Instancia creada."),jd(this.render.bind(this))}async init(){N.info("App: Inicializando..."),jd(this.render.bind(this)),this.initConnectivityListeners()}initConnectivityListeners(){window.addEventListener("offline",()=>{N.warn("App: Conexión perdida. Pasando a modo offline."),re("Sin conexión a internet. Trabajando en modo local.","warning",5e3),document.body.classList.add("is-offline"),F.ui.isOffline=!0}),window.addEventListener("online",()=>{N.info("App: Conexión restablecida."),re("Conexión restablecida. Sincronizando...","success",3e3),document.body.classList.remove("is-offline");const e=window.location.hash||"#/";this.handleNavigation(e)})}initGlobalClickListener(){document.addEventListener("click",e=>{const t=document.getElementById("header-profile-dropdown"),r=e.target.closest('[data-action="toggle-profile-menu"]');t&&t.classList.contains("show")&&!r&&!t.contains(e.target)&&t.classList.remove("show");const s=document.getElementById("actions-menu-dropdown"),i=e.target.closest('[data-action="toggle-actions-menu"]');s&&s.classList.contains("show")&&!i&&!s.contains(e.target)&&s.classList.remove("show");const o=document.getElementById("header-language-dropdown"),c=e.target.closest('[data-action="toggle-language-menu"]');o&&o.classList.contains("show")&&!c&&!o.contains(e.target)&&o.classList.remove("show")})}async handleAuthStateChange(e){if(e){this.root.contains(this.mainLoader.element)?this.mainLoader.updateMessage("Verificando credenciales..."):(await tt(500),this.mainLoader.updateMessage("Verificando sesión..."),this.root.innerHTML="",this.root.appendChild(this.mainLoader.element));const t=await bA(e);if(t){Eg({uid:t.user.uid,email:t.user.email,name:t.user.name,businessId:t.business.id==="admin_view"?null:t.business.id,departmentId:t.business.departmentId,role:t.user.role}),this.mainLoader.updateMessage("Obteniendo tasas de cambio..."),await tt(500);const r=await qA();if(F.settings.currencies.principal.rate=r.rate,F.session.business.id==="admin_view")this.mainLoader.updateMessage("Bienvenido, Administrador"),F.products=[];else{this.mainLoader.updateMessage("Cargando datos del negocio...");try{const s=await cA(F);F.products=s&&s.products?s.products:[]}catch(s){N.error("Error cargando datos:",s),F.products=[]}}await tt(1500),this.bootAuthenticatedApp(t),await tt(1e3),r.isOffline&&re(`Modo Offline: Usando tasa guardada (Bs. ${r.rate})`,"warning",5e3),r.requiresManualUpdate&&re("¡No se encontró tasa! Debes actualizarla manualmente.","error",15e3)}else N.warn("No se pudo cargar sesión. Mostrando login."),await Hd()}else{if(this.mainLoader.hide(),this.isLoggingOut){const t=this.root.querySelector(".app-loader");t&&({updateMessage:s=>{const i=t.querySelector("#loader-message");i&&(i.textContent=s)}}.updateMessage("¡Hasta pronto!"),await tt(2500)),this.isLoggingOut=!1}this.showLogin()}}async bootAuthenticatedApp(e){N.info("App: arrancando aplicación autenticada."),this.mainLoader.hide(),this.renderLayout();const t=Fe(K.VIEW_DASHBOARD),r=e?.user?.role||F.session?.user?.role;N.trace(`[App] bootAuthenticatedApp: Rol del usuario es ${r}`);const s="#/";let i=s;if(!t)if(N.warn("Usuario no tiene permiso para Dashboard. Buscando ruta alternativa..."),r===dt.CAJERO&&Fe(K.VIEW_POS_MODULE))i="#/pos";else if(r===dt.OPERADOR&&Fe(K.VIEW_INVENTORY_MODULE))i="#/inventory";else{N.error("Usuario sin permisos para dashboard ni para rutas alternativas. Mostrando error."),this.root.querySelector("#view-container").innerHTML="<p>Error: No tienes permisos para ver ninguna página.</p>";return}const o=window.location.hash||"#/";o!==i&&i!==s?(N.info(`Redirigiendo a la ruta por defecto del rol: ${i}`),window.location.hash=i):(N.info(`Usuario tiene permiso para Dashboard. Ruta por defecto: ${s}`),o===i&&N.info(`Ya estamos en la ruta correcta (${o}). Renderizando layout e iniciando router.`)),await tt(50),N.trace("ιχ Llamando a initRouter después de posible redirección."),AA(this.handleNavigation.bind(this)),this.hasGlobalListener||(document.body.addEventListener("click",this.boundHandleGlobalActions,!0),this.initGlobalClickListener(),this.hasGlobalListener=!0,N.info("Listeners globales añadidos."))}async handleLogoutSequence(e="¡Hasta pronto!"){if(this.isLoggingOut)return;N.info("Iniciando secuencia de cierre de sesión..."),this.isLoggingOut=!0;const t=this.root.querySelector("#app-layout");t&&(t.classList.add("is-logging-out"),await tt(500));const r=Tg();this.root.innerHTML="",this.root.appendChild(r.element),r.updateMessage("Cerrando sesión de forma segura..."),await tt(1500);try{await Hd()}catch(s){N.error("Error durante logout:",s),this.isLoggingOut=!1,this.showLogin()}}async handleGlobalActions(e){const t=e.target.closest("a[data-route]");if(t){e.preventDefault();const l=t.dataset.route;window.location.hash!==l&&(window.location.hash=l);return}const r=e.target.closest("[data-action]");if(!r)return;const s=r.dataset.action,i=document.getElementById("header-language-dropdown");if(s==="toggle-language-menu"){e.stopPropagation(),i?.classList.toggle("show"),document.getElementById("header-profile-dropdown")?.classList.remove("show");return}if(s!=="toggle-language-menu"&&i?.classList.contains("show")&&i.classList.remove("show"),s==="wip-feature"){re("Función en desarrollo (WIP)","info");return}if(s==="toggle-fullscreen"){document.fullscreenElement?document.exitFullscreen&&document.exitFullscreen():document.documentElement.requestFullscreen().catch(l=>N.error(l));return}if(s==="add-product"){Fe(K.CREATE_PRODUCT)?(window.location.hash="#/inventory/products",re("Redirigiendo a gestión de productos...","info")):re("No tienes permisos para añadir productos.","warning");return}const o=document.getElementById("header-profile-dropdown");if(s==="toggle-profile-menu"){e.stopPropagation(),o?.classList.toggle("show");return}s!=="toggle-profile-menu"&&o?.classList.contains("show")&&o.classList.remove("show");const c=document.getElementById("actions-menu-dropdown");if(s!=="toggle-actions-menu"&&c?.classList.contains("show")&&c.classList.remove("show"),s==="logout")this.handleLogoutSequence();else if(s==="view-profile-details"||s==="app-settings")re("Esta sección está en desarrollo (WIP).","info");else if(s==="toggle-notifications")re("No hay notificaciones nuevas.","info");else switch(s){case"open-rate-modal":uS();break;case"open-config":Fe(K.EDIT_SETTINGS_BUSINESS)||Fe(K.EDIT_SETTINGS_SYSTEM)?(N.info("Abriendo modal de Configuración Global..."),lS()):N.warn("Intento de abrir config sin permisos.");break;case"toggle-theme":this.toggleTheme();break;default:s==="toggle-actions-menu"?(e.stopPropagation(),c?.classList.toggle("show")):N.warn(`Acción desconocida: ${s}`)}}renderLayout(){const e=window.location.hash||"#/",t=Qd(e,F,F.ui.navContext);this.root.innerHTML=`
            <div class="page-wrapper"  id="app-layout" >
                ${DA(F)}
                <main class="content">
                    ${t}
                    <div class="container view-container" id="view-container"></div>
                </main>
                ${UA(F)}
            </div>
        `,hS(this.root),F.session.isLoggedIn&&!this.hasGlobalListener&&document.body.addEventListener("click",this.boundHandleGlobalActions,!0)}render(){if(F.session.isLoggedIn){const e=window.location.hash||"#/";this.renderLayout(),this.handleNavigation(e)}else this.showLogin()}async handleNavigation(e){if(!document.getElementById("view-container")){N.error("Contenedor de vista no encontrado (#view-container).");return}if(typeof this.currentViewCleanup=="function"){try{this.currentViewCleanup()}catch(c){N.error("Error en cleanup de vista:",c)}this.currentViewCleanup=()=>{}}const r=Cr.find(c=>c.path===e),s=Cr.find(c=>c.path==="#/");if(!r){N.warn(`Ruta no encontrada: ${e}. Redirigiendo a Dashboard.`),window.location.hash="#/";return}if(!Fe(r.permission)){N.warn(`Acceso denigado a: ${e}. Redirigiendo a ruta por defecto.`);const c=Cr.find(l=>l.isMainModule&&Fe(l.permission))||s;window.location.hash=c.path;return}const i=r?.context||yt.CORE;F.ui.navContext!==i?(F.ui.navContext=i,this.renderLayout(),await tt(10)):document.querySelectorAll(".nav-button, .contextual-nav-button").forEach(c=>{c.classList.toggle("active",c.getAttribute("href")===e)});const o=document.getElementById("view-container");if(!o){N.error("Contenedor de vista desaparecido después de renderLayout().");return}o.classList.add("fade-out"),await tt(150);try{const c=await r.component();this.currentViewCleanup=c(o,F)}catch(c){N.error(`Error cargando componente para la vista ${e}:`,c),o.innerHTML=`<p>Error al cargar la vista ${e}.</o>`,this.currentViewCleanup=()=>{}}finally{o.classList.remove("fade-out")}}showLogin(){if(this.mainLoader.hide(),N.info("Mostrando pantalla de login..."),typeof this.currentViewCleanup=="function"){try{this.currentViewCleanup()}catch(e){N.error("Error cleanup (login):",e)}this.currentViewCleanup=()=>{}}this.hasGlobalListener&&(document.body.removeEventListener("click",this.boundHandleGlobalActions,!0),this.hasGlobalListener=!1,N.info("Listener global quitado.")),this.root.innerHTML="";try{PA(this.root,F)}catch(e){N.error("Error render Login:",e),this.root.innerHTML="Error crítico login."}}toggleTheme(){const t=(document.documentElement.getAttribute("data-bs-theme")||"light")==="dark"?"light":"dark";document.documentElement.setAttribute("data-bs-theme",t),N.info(`Tema cambiado a: ${t}`),this.updateNavigation()}updateNavigation(){const e=window.location.hash||"#/",t=Qd(e,F,F.ui.navContext),r=this.root.querySelector(".toolbar-container");r&&(r.outerHTML=t)}}async function fS(){try{const n=document.getElementById("app");if(!n)throw new Error("El elemento 'app' no se encuentra en el DOM.");const e=Tg();document.getElementById("app-loader").appendChild(e.element),await iA("firebase"),N.info("Almacenamiento inicializado.");const t=await aA();N.info("✅ Configuración global cargada.");const r=await oA();N.info("✅ Initial state loaded."),r.settings.appConfig=t,mA(r.settings),N.info("Estado inicial cargado."),Ov(Hr,async s=>{N.info(`onAuthStateChanged: user = ${s?s.uid:"null"}`);try{if(!window.bucaApp){const i=new dS(n,r,e);await i.init(),window.bucaApp=i}await window.bucaApp.handleAuthStateChange(s)}catch(i){N.error("Error en onAuthStateChanged:",i),Do(i,{message:"Error al procesar la autenticación.",critical:!0,loaderUI:e})}})}catch(n){N.error("Error fatal en main():",n),Do(n,{message:"No se pudo iniciar la aplicación.",critical:!0})}"serviceWorker"in navigator&&window.addEventListener("load",()=>{navigator.serviceWorker.register("/sw.js").then(n=>{N.info("Service Worker registrado con éxito:",n)}).catch(n=>{N.error("Error al registrar el Service Worker:",n)})})}window.onerror=(n,e,t,r,s)=>{N.error("Error global no capturado:",{message:n,source:e,lineno:t,colno:r,error:s}),Do(s||new Error(n),{message:"Error inesperado en la aplicación.",critical:!0})};window.onunhandledrejection=n=>{N.error("Promesa global rechazada no capturada:",n.reason),Do(n.reason,{message:`Error en global-promise: ${n.reason?.message}`,critical:!1})};document.addEventListener("DOMContentLoaded",fS);export{N as L,K as P,dt as R,ts as _,re as a,cS as b,Fe as c,TS as d,ES as e,_S as f,wS as g,vS as h,hS as i,yS as j,gS as l,bS as o,IS as r,F as s};
