!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.TwitterLikeImage=e():t.TwitterLikeImage=e()}(this,(function(){return(()=>{"use strict";var t={627:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.style=void 0,e.style={".twitter-like-image":{width:"100%",borderRadius:"20px",position:"relative",overflow:"hidden"},".twitter-like-image.is-transitionend .backdrop-content":{transition:"0.4s cubic-bezier(0.33, 0.98, 0.77, 0.98)"},".twitter-like-image::before":{content:"''",display:"block",width:"100%",paddingTop:"50%"},".content":{display:"grid",gridTemplateColumns:"1fr 1fr",gridTemplateRows:"1fr 1fr",position:"absolute",width:"100%",height:"100%",left:"0",top:"0",gridGap:"4px",listStyle:"none",margin:"0",padding:"0"},".item":{width:"100%",height:"100%",overflow:"hidden"},".item:nth-last-child(1)":{gridColumn:"1/3",gridRow:"1/3"},".item:nth-last-child(2)":{gridColumn:"1",gridRow:"1/3"},".item:nth-last-child(2) + .item":{gridColumn:"2",gridRow:"1/3"},".item:nth-last-child(3)":{gridColumn:"1",gridRow:"1"},".item:nth-last-child(3) + .item":{gridColumn:"1",gridRow:"2"},".item:nth-last-child(3) + .item + .item":{gridColumn:"2",gridRow:"1/3"},".item:nth-last-child(4)":{gridColumn:"1/2",gridRow:"1/2"},".item:nth-last-child(4) + .item":{gridColumn:"2/3",gridRow:"1/2"},".item:nth-last-child(4) + .item + .item":{gridColumn:"1/2",gridRow:"2/3"},".item:nth-last-child(4) + .item + .item + .item":{gridColumn:"2/3",gridRow:"2/3"},".item img":{width:"100%",height:"100%",display:"block",objectFit:"cover"},".backdrop":{width:"100%",height:"100%",overflow:"hidden",background:"rgba(0, 0, 0, 0.7)",transition:"opacity 0.2s, visibility 0.2s",position:"fixed",top:"0",left:"0",zIndex:100},".backdrop.is-hide":{opacity:"0",visibility:"hidden"},".backdrop-content":{display:"flex",alignItems:"center",height:"100%",width:"100%",listStyle:"none",margin:"0",padding:"0"},".backdrop-item":{display:"flex",height:"100%",minWidth:"100%",alignItems:"center",justifyContent:"center",overflow:"hidden"},".backdrop-item img":{width:"100%",height:"100%",objectFit:"contain"},".backdrop-caption":{minHeight:"80px",width:"100%",background:"rgba(0, 0, 0, 0.5)",position:"absolute",bottom:"0",left:"0",padding:"10px 15px",color:"white",boxSizing:"border-box",margin:"0"},".backdrop-next,.backdrop-prev":{display:"flex",alignItems:"center",height:"100%",paddingLeft:"10px",paddingRight:"10px",position:"absolute",top:"0",border:"0",background:"transparent",overflow:"hidden"},".backdrop-next.is-hide,.backdrop-prev.is-hide":{display:"block"},".backdrop-next:focus,.backdrop-prev:focus":{outline:"none"},".backdrop-next:focus::before,.backdrop-prev:focus::before":{border:"2px solid rgba(255, 255, 255, 0.4)"},".backdrop-next:hover::before,.backdrop-prev:hover::before":{background:"rgba(255, 255, 255, 0.1)"},".backdrop-next::before,.backdrop-prev::before":{content:"''",display:"block",width:"38px",height:"38px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.1)",transition:"0.3s",border:"2px solid transparent"},".backdrop-next::after,.backdrop-prev::after":{content:"''",display:"block",width:"8px",height:"8px",position:"absolute",top:"calc(50% - 5px)"},".backdrop-prev":{left:"0"},".backdrop-prev::after":{borderLeft:"2px solid rgba(255, 255, 255, 0.6)",borderTop:"2px solid rgba(255, 255, 255, 0.6)",transform:"rotate(-45deg)",right:"calc(50% - 6px)"},".backdrop-next":{right:"0"},".backdrop-next::after":{borderTop:"2px solid rgba(255, 255, 255, 0.6)",borderRight:"2px solid rgba(255, 255, 255, 0.6)",transform:"rotate(45deg)",left:"calc(50% - 6px)"},".backdrop-close":{display:"block",width:"38px",height:"38px",borderRadius:"50%",background:"rgba(0, 0, 0, 0.1)",position:"absolute",overflow:"hidden",top:"20px",left:"10px",transition:"0.3s",border:"2px solid transparent"},".backdrop-close:hover":{background:"rgba(255, 255, 255, 0.1)"},".backdrop-close:focus":{outline:"none",border:"2px solid rgba(255, 255, 255, 0.4)"},".backdrop-close::before,.backdrop-close::after":{content:"''",display:"block",width:"16px",height:"2px",background:"rgba(255, 255, 255, 0.6)",position:"absolute",top:"calc(50% - 1px)",left:"calc(50% - 8px)"},".backdrop-close::before":{transform:"rotate(45deg)"},".backdrop-close::after":{transform:"rotate(-45deg)"}}},605:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.createElement=e.lowerCamelCaseToKebabCase=e.styleStringToStyleElement=e.styleObjectToStyleString=void 0,e.styleObjectToStyleString=t=>{let o="";for(const[r,i]of Object.entries(t)){o+=`${r} {`;for(const[t,r]of Object.entries(i))o+=`${e.lowerCamelCaseToKebabCase(t)}: ${r};`;o+="}"}return o},e.styleStringToStyleElement=t=>{const e=document.createElement("style");return e.insertAdjacentText("beforeend",t),e},e.lowerCamelCaseToKebabCase=t=>t.replace(/(?!=[A-Z]|^.)([A-Z])/g,(t=>`-${t.charAt(0).toLowerCase()}`)),e.createElement=(t,e,o)=>{const r=document.createElement(t);for(const[t,o]of Object.entries(e))r.setAttribute(t,o);return o&&o.length>0&&o.forEach((t=>{r.append(t)})),r}}},e={};function o(r){var i=e[r];if(void 0!==i)return i.exports;var n=e[r]={exports:{}};return t[r](n,n.exports,o),n.exports}var r={};return(()=>{const t=o(627),e=o(605);class r extends HTMLElement{constructor(){super(),this.init=!1,this.content=null,this.backdrop=null,this.backdropContent=null,this.backdropCaption=null,this.backdropPrev=null,this.backdropNext=null,this.backdropClose=null,this.items=null,this.srcArr=[],this.altArr=[],this.activeItemIdx=-1,this.attachShadow({mode:"open"}),this.appendTemplateToShadowDom()}connectedCallback(){this.init||(this.init=!0,this.setElementsToThis(),this.appendItemElements(),this.setEventOfBackdropElements(),this.closeBackDrop())}appendTemplateToShadowDom(){var o;const r=document.createElement("template");r.innerHTML='\n            <div class="twitter-like-image">\n            <ul class="content"></ul>\n            <div class="backdrop">\n            <ul class="backdrop-content"></ul>\n            <p class="backdrop-caption"></p>\n            <button class="backdrop-prev" aria-label="previous"></button>\n            <button class="backdrop-next" aria-label="next"></button>\n            <button class="backdrop-close" aria-label="close"></button>\n            </div>\n            </div>\n        ';const i=r.content.cloneNode(!0),n=e.styleStringToStyleElement(e.styleObjectToStyleString(t.style));null===(o=this.shadowRoot)||void 0===o||o.append(i,n)}setElementsToThis(){var t,e,o,r,i,n,a;const s=this.getHostAttrArr("src"),d=this.getHostAttrArr("alt"),l=null===(t=this.shadowRoot)||void 0===t?void 0:t.querySelector(".content"),c=null===(e=this.shadowRoot)||void 0===e?void 0:e.querySelector(".backdrop"),p=null===(o=this.shadowRoot)||void 0===o?void 0:o.querySelector(".backdrop-content"),h=null===(r=this.shadowRoot)||void 0===r?void 0:r.querySelector(".backdrop-caption"),b=null===(i=this.shadowRoot)||void 0===i?void 0:i.querySelector(".backdrop-prev"),g=null===(n=this.shadowRoot)||void 0===n?void 0:n.querySelector(".backdrop-next"),m=null===(a=this.shadowRoot)||void 0===a?void 0:a.querySelector(".backdrop-close");if(!(c&&l&&p&&h&&b&&g&&m))throw new Error("structure elements do not exist.");this.altArr=d,this.srcArr=s,this.content=l,this.backdrop=c,this.backdropContent=p,this.backdropCaption=h,this.backdropPrev=b,this.backdropNext=g,this.backdropClose=m}appendItemElements(){const{content:t,backdropContent:o,srcArr:r,altArr:i}=this;if(!t||!o)throw new Error("Either content or backdrop-content does not exist.");r.forEach(((r,n)=>{var a,s;const d=e.createElement("img",{src:r,alt:null!==(a=i[n])&&void 0!==a?a:""}),l=e.createElement("li",{class:"item"},[d]);l.addEventListener("click",this.openBackDrop.bind(this,n)),t.append(l);const c=e.createElement("img",{src:r,alt:null!==(s=i[n])&&void 0!==s?s:""}),p=e.createElement("li",{class:"backdrop-item"},[c]);o.append(p)}))}setEventOfBackdropElements(){const{backdrop:t,backdropPrev:e,backdropNext:o,backdropClose:r,activeItemIdx:i}=this;if(!(t&&e&&o&&r))throw new Error("");e.addEventListener("click",this.switchTargetImage.bind(this,i+1)),o.addEventListener("click",this.switchTargetImage.bind(this,i-1)),r.addEventListener("click",this.closeBackDrop.bind(this))}getHostAttrArr(t){var e,o;const r=null===(o=null===(e=this.shadowRoot)||void 0===e?void 0:e.host.getAttribute(t))||void 0===o?void 0:o.replace(/\s/g,"").split(",");if(!r||r.length<1||r.length>4)throw new Error(`Something is wrong of ${t} attribute.`);return r}openBackDrop(t){const{backdrop:e}=this;if(!e)throw new Error("");this.activeItemIdx=t,e.classList.remove("is-hide"),this.setCaption(this.altArr[t])}switchTargetImage(){}closeBackDrop(){const{backdrop:t}=this;if(!t)throw new Error("");t.classList.add("is-hide"),this.activeItemIdx=-1}setCaption(t){const{backdropCaption:e}=this;if(!e)throw new Error("");e.innerText=t}}customElements.define("tl-img",r)})(),r.default})()}));