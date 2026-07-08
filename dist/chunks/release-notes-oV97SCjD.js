import{n as e}from"./chunk-DR8-3Aex.js";import{a as t,c as n,i as r,o as i,t as a}from"./releaseNotes-Byko1U0U.js";function o(e){return e.map(([e,t])=>`${`Version ${e}:`}\n${t.map(e=>`· ${e}`).join(`
`)}`).join(`

`)}async function s(){let e=[];try{let n=new Promise((e,t)=>{setTimeout(e=>e(Error(`Timeout`)),500,t)});await Promise.race([r(),n]),e=t(await i())}catch{}if(e.length>0)return{type:`text`,value:o(e)};let n=t(await i());return n.length>0?{type:`text`,value:o(n)}:{type:`text`,value:`See the full changelog at: ${a}`}}e((()=>{n()}))();export{s as call};