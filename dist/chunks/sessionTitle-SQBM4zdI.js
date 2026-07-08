import{n as e}from"./chunk-DR8-3Aex.js";import{Ln as t,wn as n}from"./schemas-BF66sqUz.js";import{t as r}from"./v4-CsrzCakw.js";import{U as i,sn as a}from"./state-CH3cCJC5.js";import{l as o,p as s}from"./debug-DMnLghM9.js";import{t as c}from"./analytics-Oq2xIXA0.js";import{s as l,u}from"./types-Wph8s9vh.js";import{n as d,t as f}from"./lazySchema-D5kshEFG.js";import{Ak as p,Wo as m,is as h,nt as g,tt as _}from"./loadAgentsDir-weYU9_ci.js";import{X as v}from"./rcDebugLog-DbZbUV-c.js";function y(e){let t=[];for(let n of e){if(n.type!==`user`&&n.type!==`assistant`||`isMeta`in n&&n.isMeta||`origin`in n&&n.origin&&n.origin.kind!==`human`)continue;let e=n.message.content;if(typeof e==`string`)t.push(e);else if(Array.isArray(e))for(let n of e)`type`in n&&n.type===`text`&&`text`in n&&t.push(n.text)}let n=t.join(`
`);return n.length>x?n.slice(-x):n}async function b(e,t){let n=e.trim();if(!n)return null;try{let e=m((await g({systemPrompt:v([S]),userPrompt:n,outputFormat:{type:`json_schema`,schema:{type:`object`,properties:{title:{type:`string`}},required:[`title`],additionalProperties:!1}},signal:t,options:{querySource:`generate_session_title`,agents:[],isNonInteractiveSession:i(),hasAppendSystemPrompt:!1,mcpTools:[]}})).message.content),r=C().safeParse(u(e));return r.success&&r.data.title.trim()||null}catch(e){return s(`generateSessionTitle failed: ${e}`,{level:`error`}),null}}var x,S,C,w=e((()=>{r(),a(),c(),_(),o(),l(),f(),h(),p(),x=1e3,S=`Generate a concise, sentence-case title (3-7 words) that captures the main topic or goal of this coding session. The title should be clear enough that the user recognizes the session in a list. Use sentence case: capitalize only the first word and proper nouns.

Return JSON with a single "title" field.

Good examples:
{"title": "Fix login button on mobile"}
{"title": "Add OAuth authentication"}
{"title": "Debug failing CI tests"}
{"title": "Refactor API client error handling"}

Bad (too vague): {"title": "Code changes"}
Bad (too long): {"title": "Investigate and fix the issue where the login button does not respond on mobile devices"}
Bad (wrong case): {"title": "Fix Login Button On Mobile"}`,C=d(()=>n({title:t()}))}));export{b as n,w as r,y as t};