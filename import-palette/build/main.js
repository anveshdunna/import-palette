var l=Object.defineProperty,B=Object.defineProperties,H=Object.getOwnPropertyDescriptor,U=Object.getOwnPropertyDescriptors,T=Object.getOwnPropertyNames,x=Object.getOwnPropertySymbols;var N=Object.prototype.hasOwnProperty,R=Object.prototype.propertyIsEnumerable;var y=(e,o,r)=>o in e?l(e,o,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[o]=r,b=(e,o)=>{for(var r in o||(o={}))N.call(o,r)&&y(e,r,o[r]);if(x)for(var r of x(o))R.call(o,r)&&y(e,r,o[r]);return e},A=(e,o)=>B(e,U(o));var m=(e,o)=>()=>(e&&(o=e(e=0)),o);var F=(e,o)=>{for(var r in o)l(e,r,{get:o[r],enumerable:!0})},D=(e,o,r,t)=>{if(o&&typeof o=="object"||typeof o=="function")for(let n of T(o))!N.call(e,n)&&n!==r&&l(e,n,{get:()=>o[n],enumerable:!(t=H(o,n))||t.enumerable});return e};var O=e=>D(l({},"__esModule",{value:!0}),e);function p(e,o={}){if(typeof e!="string"||G.test(e)||!k.test(e))throw new TypeError("Expected a valid hex string");e=e.replace(/^#/,"");let r=1;e.length===8&&(r=Number.parseInt(e.slice(6,8),16)/255,e=e.slice(0,6)),e.length===4&&(r=Number.parseInt(e.slice(3,4).repeat(2),16)/255,e=e.slice(0,3)),e.length===3&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]);let t=Number.parseInt(e,16),n=t>>16,s=t>>8&255,a=t&255,c=typeof o.alpha=="number"?o.alpha:r;if(o.format==="array")return[n,s,a,c];if(o.format==="css"){let S=c===1?"":` / ${Number((c*100).toFixed(2))}%`;return`rgb(${n} ${s} ${a}${S})`}return{red:n,green:s,blue:a,alpha:c}}var i,L,P,G,k,C=m(()=>{i="a-f\\d",L=`#?[${i}]{3}[${i}]?`,P=`#?[${i}]{6}([${i}]{2})?`,G=new RegExp(`[^#${i}]`,"gi"),k=new RegExp(`^${L}$|^${P}$`,"i")});function d(e){if(e.length!==3&&e.length!==6)return null;try{let{red:o,green:r,blue:t}=p(e);return{b:t/255,g:r/255,r:o/255}}catch(o){return null}}var I=m(()=>{C()});function u(e,o){let r=`${w}`;return w+=1,f[r]={handler:o,name:e},function(){delete f[r]}}function h(e,o){let r=!1;for(let t in f)f[t].name===e&&(f[t].handler.apply(null,o),r=!0);if(r===!1)throw new Error(`No event handler with name \`${e}\``)}var f,w,v=m(()=>{f={},w=0;typeof window=="undefined"?figma.ui.onmessage=function(e){if(!Array.isArray(e))return;let[o,...r]=e;typeof o=="string"&&h(o,r)}:window.onmessage=function(e){if(typeof e.data.pluginMessage=="undefined")return;let o=e.data.pluginMessage;if(!Array.isArray(o))return;let[r,...t]=e.data.pluginMessage;typeof r=="string"&&h(r,t)}});function g(e,o){if(typeof __html__=="undefined")throw new Error("No UI defined");let r=`<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command=="undefined"?"":figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof o=="undefined"?{}:o)};${__html__}</script>`;figma.showUI(r,A(b({},e),{themeColors:typeof e.themeColors=="undefined"?!0:e.themeColors}))}var $=m(()=>{});var E=m(()=>{I();v();$()});var _={};F(_,{default:()=>V});function V(){g({width:280,height:160}),u("create-color-styles",e=>{let{name:o,colors:r}=e;try{r.forEach((t,n)=>{let s=figma.createPaintStyle();s.name=`${o}/${n+1}`;let a=d(t);if(!a)throw new Error(`Invalid color: ${t}`);s.paints=[{type:"SOLID",color:a}]})}catch(t){console.error("Error creating color styles:",t),figma.notify("Failed to create color styles.")}})}var M=m(()=>{"use strict";E()});var W={"src/main.ts--default":(M(),O(_)).default},j="src/main.ts--default";W[j]();