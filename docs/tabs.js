!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.jekyllTabs=e():t.jekyllTabs=e()}(self,(()=>{return t={918:t=>{t.exports={getChildPosition:t=>{const e=t.parentNode;for(let o=0;o<e.children.length;o++)if(e.children[o]===t)return o},findElementsWithTextContent:(t,e)=>{const o=document.querySelectorAll(t),n=[];for(let t=0;t<o.length;t++){const a=o[t];a.textContent.trim()===e.trim()&&n.push(a)}return n},createElementFromHTML:t=>{const e=document.createElement("template");return e.innerHTML=t.trim(),e.content.firstChild},setClass:(t,e,o)=>{t.className=e,setTimeout((()=>{t.className=t.className.replace(e,"")}),o)}}},613:(t,e,o)=>{const{activateTabFromUrl:n,updateUrlWithActiveTab:a,handleTabClicked:r,addCopyToClipboardButtons:l,syncTabsWithSameLabels:s}=o(925);t.exports={init:(t={})=>{const e=Object.assign({syncTabsWithSameLabels:!1,activateTabFromUrl:!1,addCopyToClipboardButtons:!1,copyToClipboardButtonHTML:"<button>Copy</button>"},t);window.addEventListener("load",(()=>{const t=document.querySelectorAll("ul.tab > li > a");Array.prototype.forEach.call(t,(t=>{t.addEventListener("click",(o=>{o.preventDefault(),r(t),e.activateTabFromUrl&&a(t),e.syncTabsWithSameLabels&&s(t)}),!1)})),e.addCopyToClipboardButtons&&l(e.copyToClipboardButtonHTML),e.activateTabFromUrl&&n()}))}}},925:(t,e,o)=>{const{getChildPosition:n,createElementFromHTML:a,findElementsWithTextContent:r,setClass:l}=o(918),s=t=>{const e=t.querySelectorAll("ul > li");Array.prototype.forEach.call(e,(function(t){t.classList.remove("active")}))},c=t=>{const e=t.parentNode,o=e.parentNode,a=n(e);if(e.className.includes("active"))return;const r=o.getAttribute("data-tab");if(!r)return;const l=document.getElementById(r);s(o),s(l),l.querySelectorAll("ul.tab-content > li")[a].classList.add("active"),e.classList.add("active")},i=t=>{if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t);else{const e=document.createElement("textarea");e.value=t,e.style.position="absolute",e.style.left="-999999px",document.body.prepend(e),e.select();try{document.execCommand("copy")}catch(t){console.error(t)}finally{e.remove()}}l(document.getElementById("snackbar"),"show",3e3)};t.exports={removeActiveClasses:s,handleTabClicked:c,copyToClipboard:i,addCopyToClipboardButtons:t=>{const e=document.querySelectorAll("ul.tab-content > li pre");for(let o=0;o<e.length;o++){const n=e[o],r=n.parentNode,l=a(t);r.style.position="relative",l.style.position="absolute",l.style.top="0px",l.style.right="0px",r.appendChild(l),l.addEventListener("click",(function(){i(n.innerText)}))}},activateTabFromUrl:()=>{const t=window.location.hash?.substring(1);if(!t)return;const e=document.getElementById(t);if(!e)return;const o=new URLSearchParams(window.location.search).get("active_tab");if(!o)return;const n=e.querySelector("li#"+o+" > a");n&&c(n)},updateUrlWithActiveTab:t=>{const e=t.parentNode,o=e.parentNode,n=new URLSearchParams(window.location.search);n.set("active_tab",e.id);const a=window.location.pathname+"?"+n.toString()+"#"+o.id;history.replaceState(null,"",a)},syncTabsWithSameLabels:t=>{const e=r("a",t.textContent);for(let o=0;o<e.length;o++)e[o]!==t&&c(e[o])}}}},e={},function o(n){var a=e[n];if(void 0!==a)return a.exports;var r=e[n]={exports:{}};return t[n](r,r.exports,o),r.exports}(613);var t,e}));