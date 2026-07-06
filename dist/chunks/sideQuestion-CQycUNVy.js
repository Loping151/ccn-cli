import{n as e}from"./chunk-DR8-3Aex.js";import{Vo as t,Wo as n,eu as r,is as i,nu as a}from"./loadAgentsDir-DEoZ3iSP.js";import{B as o,P as s}from"./rcDebugLog-1FBHqKhW.js";function c(e){let t=[],n=e.matchAll(d);for(let e of n)e.index!==void 0&&t.push({word:e[0],start:e.index,end:e.index+e[0].length});return t}async function l({question:e,cacheSafeParams:n}){let r=await a({promptMessages:[t({content:`<system-reminder>This is a side question from the user. You must answer this question directly in a single response.

IMPORTANT CONTEXT:
- You are a separate, lightweight agent spawned to answer this one question
- The main agent is NOT interrupted - it continues working independently in the background
- You share the conversation context but are a completely separate instance
- Do NOT reference being interrupted or what you were "previously doing" - that framing is incorrect

CRITICAL CONSTRAINTS:
- You have NO tools available - you cannot read files, run commands, search, or take any actions
- This is a one-off response - there will be no follow-up turns
- You can ONLY provide information based on what you already know from the conversation context
- NEVER say things like "Let me try...", "I'll now...", "Let me check...", or promise to take any action
- If you don't know the answer, say so - do not offer to look it up or investigate

Simply answer the question with the information you have.</system-reminder>

${e}`})],cacheSafeParams:n,canUseTool:async()=>({behavior:`deny`,message:`Side questions cannot use tools`,decisionReason:{type:`other`,reason:`side_question`}}),querySource:`side_question`,forkLabel:`side_question`,maxTurns:1,skipCacheWrite:!0});return{response:u(r.messages),usage:r.totalUsage}}function u(e){let t=e.flatMap(e=>e.type===`assistant`?e.message.content:[]);if(t.length>0){let e=n(t,`

`).trim();if(e)return e;let r=t.find(e=>e.type===`tool_use`);if(r)return`(The model tried to call ${`name`in r?r.name:`a tool`} instead of answering directly. Try rephrasing or ask in the main conversation.)`}let r=e.find(e=>e.type===`system`&&`subtype`in e&&e.subtype===`api_error`);return r?`(API error: ${o(r.error)})`:null}var d,f=e((()=>{s(),r(),i(),d=/^\/btw\b/gi}));export{f as n,l as r,c as t};