import{n as e}from"./chunk-DR8-3Aex.js";import{Ln as t,wn as n}from"./schemas-BGAvj1T4.js";import{t as r}from"./v4-f1i_CNUT.js";import{U as i,cn as a}from"./state-sIHsFpDu.js";import{l as o,p as s}from"./debug-B_528_ux.js";import{n as c,r as l}from"./analytics-DqMQntaB.js";import{s as u,u as d}from"./types-MFvjaICn.js";import{n as f,t as p}from"./lazySchema-B0QShMaQ.js";import{Ek as m,Ko as h,nt as g,os as _,tt as v}from"./loadAgentsDir-Bmfyrm8o.js";import{X as y}from"./rcDebugLog-embAn4z2.js";function b(e){let t=[];for(let n of e){if(n.type!==`user`&&n.type!==`assistant`||`isMeta`in n&&n.isMeta||`origin`in n&&n.origin&&n.origin.kind!==`human`)continue;let e=n.message.content;if(typeof e==`string`)t.push(e);else if(Array.isArray(e))for(let n of e)`type`in n&&n.type===`text`&&`text`in n&&t.push(n.text)}let n=t.join(`
`);return n.length>S?n.slice(-S):n}async function x(e,t){let n=e.trim();if(!n)return null;try{let e=h((await g({systemPrompt:y([C]),userPrompt:n,outputFormat:{type:`json_schema`,schema:{type:`object`,properties:{title:{type:`string`}},required:[`title`],additionalProperties:!1}},signal:t,options:{querySource:`generate_session_title`,agents:[],isNonInteractiveSession:i(),hasAppendSystemPrompt:!1,mcpTools:[]}})).message.content),r=w().safeParse(d(e)),a=r.success&&r.data.title.trim()||null;return l(`tengu_session_title_generated`,{success:a!==null}),a}catch(e){return s(`generateSessionTitle failed: ${e}`,{level:`error`}),l(`tengu_session_title_generated`,{success:!1}),null}}var S,C,w,T=e((()=>{r(),a(),c(),v(),o(),u(),p(),_(),m(),S=1e3,C=`Generate a concise, sentence-case title (3-7 words) that captures the main topic or goal of this coding session. The title should be clear enough that the user recognizes the session in a list. Use sentence case: capitalize only the first word and proper nouns.

Return JSON with a single "title" field.

Good examples:
{"title": "Fix login button on mobile"}
{"title": "Add OAuth authentication"}
{"title": "Debug failing CI tests"}
{"title": "Refactor API client error handling"}

Bad (too vague): {"title": "Code changes"}
Bad (too long): {"title": "Investigate and fix the issue where the login button does not respond on mobile devices"}
Bad (wrong case): {"title": "Fix Login Button On Mobile"}`,w=f(()=>n({title:t()}))}));export{x as n,T as r,b as t};