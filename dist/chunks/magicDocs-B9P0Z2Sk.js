import{n as e}from"./chunk-DR8-3Aex.js";import{c as t,n}from"./envUtils-BX9wwXdf.js";import{Dr as r,Pr as i,dc as a,uc as o}from"./paths-CSCjbl3W.js";import{K as s,U as c,_ as l,h as u}from"./debug-A-rhqP-J.js";import{$o as d,Lj as f,Ro as p,U_ as m,W_ as h,_O as g,al as _,gO as v,il as y,jj as b,ol as x,ts as S}from"./loadAgentsDir-BK8PGvKX.js";import{Hn as C,zn as w}from"./prompt-CNHX8T0W.js";import{i as T,o as E}from"./fileStateCache-BrEalCpX.js";import{join as D}from"path";function O(){return`IMPORTANT: This message and these instructions are NOT part of the actual user conversation. Do NOT include any references to "documentation updates", "magic docs", or these update instructions in the document content.

Based on the user conversation above (EXCLUDING this documentation update instruction message), update the Magic Doc file to incorporate any NEW learnings, insights, or information that would be valuable to preserve.

The file {{docPath}} has already been read for you. Here are its current contents:
<current_doc_content>
{{docContents}}
</current_doc_content>

Document title: {{docTitle}}
{{customInstructions}}

Your ONLY task is to use the Edit tool to update the documentation file if there is substantial new information to add, then stop. You can make multiple edits (update multiple sections as needed) - make all Edit tool calls in parallel in a single message. If there's nothing substantial to add, simply respond with a brief explanation and do not call any tools.

CRITICAL RULES FOR EDITING:
- Preserve the Magic Doc header exactly as-is: # MAGIC DOC: {{docTitle}}
- If there's an italicized line immediately after the header, preserve it exactly as-is
- Keep the document CURRENT with the latest state of the codebase - this is NOT a changelog or history
- Update information IN-PLACE to reflect the current state - do NOT append historical notes or track changes over time
- Remove or replace outdated information rather than adding "Previously..." or "Updated to..." notes
- Clean up or DELETE sections that are no longer relevant or don't align with the document's purpose
- Fix obvious errors: typos, grammar mistakes, broken formatting, incorrect information, or confusing statements
- Keep the document well organized: use clear headings, logical section order, consistent formatting, and proper nesting

DOCUMENTATION PHILOSOPHY - READ CAREFULLY:
- BE TERSE. High signal only. No filler words or unnecessary elaboration.
- Documentation is for OVERVIEWS, ARCHITECTURE, and ENTRY POINTS - not detailed code walkthroughs
- Do NOT duplicate information that's already obvious from reading the source code
- Do NOT document every function, parameter, or line number reference
- Focus on: WHY things exist, HOW components connect, WHERE to start reading, WHAT patterns are used
- Skip: detailed implementation steps, exhaustive API docs, play-by-play narratives

What TO document:
- High-level architecture and system design
- Non-obvious patterns, conventions, or gotchas
- Key entry points and where to start reading code
- Important design decisions and their rationale
- Critical dependencies or integration points
- References to related files, docs, or code (like a wiki) - help readers navigate to relevant context

What NOT to document:
- Anything obvious from reading the code itself
- Exhaustive lists of files, functions, or parameters
- Step-by-step implementation details
- Low-level code mechanics
- Information already in CLAUDE.md or other project docs

Use the Edit tool with file_path: {{docPath}}

REMEMBER: Only update if there is substantial new information. The Magic Doc header (# MAGIC DOC: {{docTitle}}) must remain unchanged.`}async function k(){let e=u(),t=D(n(),`magic-docs`,`prompt.md`);try{return await e.readFile(t,{encoding:`utf-8`})}catch{return O()}}function A(e,t){return e.replace(/\{\{(\w+)\}\}/g,(e,n)=>Object.hasOwn(t,n)?t[n]:e)}async function j(e,t,n,i){let a=await k(),o=i?`

DOCUMENT-SPECIFIC UPDATE INSTRUCTIONS:
The document author has provided specific instructions for how this file should be updated. Pay extra attention to these instructions and follow them carefully:

"${i}"

These instructions take priority over the general rules below. Make sure your updates align with these specific guidelines.`:``,s=r();return A(a,{docContents:e,docPath:t,docTitle:n,customInstructions:o,CLAUDE_EFFORT:b(s,void 0),CLAUDE_MODEL:s,CLAUDE_CWD:process.cwd()})}var M=e((()=>{t(),l(),f(),i()}));function N(){V.clear()}function P(e){let t=e.match(z);if(!t||!t[1])return null;let n=t[1].trim(),r=t.index+t[0].length,i=e.slice(r).match(/^\s*\n(?:\s*\n)?(.+?)(?:\n|$)/);if(i&&i[1]){let e=i[1].match(B);if(e&&e[1])return{title:n,instructions:e[1].trim()}}return{title:n}}function F(e){V.has(e)||V.set(e,{path:e})}function I(){return{agentType:`magic-docs`,whenToUse:`Update Magic Docs`,tools:[w],model:`sonnet`,source:`built-in`,baseDir:`built-in`,getSystemPrompt:()=>``}}async function L(e,t){let{messages:n,systemPrompt:r,userContext:i,systemContext:a,toolUseContext:o}=t,c=T(o.readFileState);c.delete(e.path);let l={...o,readFileState:c},u=``;try{let t=(await y.call({file_path:e.path},l)).data;t.type===`text`&&(u=t.file.content)}catch(t){if(s(t)||t instanceof Error&&t.message.startsWith(`File does not exist`)){V.delete(e.path);return}throw t}let d=P(u);if(!d){V.delete(e.path);return}let f=await j(u,e.path,d.title,d.instructions),m=async(t,n)=>{if(t.name===`Edit`&&typeof n==`object`&&n&&`file_path`in n){let t=n.file_path;if(typeof t==`string`&&t===e.path)return{behavior:`allow`,updatedInput:n}}return{behavior:`deny`,message:`only ${w} is allowed for ${e.path}`,decisionReason:{type:`other`,reason:`only ${w} is allowed`}}};for await(let e of h({agentDefinition:I(),promptMessages:[p({content:f})],toolUseContext:l,canUseTool:m,isAsync:!0,forkContextMessages:n,querySource:`magic_docs`,override:{systemPrompt:r,userContext:i,systemContext:a},availableTools:l.options.tools}));}async function R(){process.env.USER_TYPE===`ant`&&(x((e,t)=>{P(t)&&F(e)}),g(H))}var z,B,V,H,U=e((()=>{m(),C(),_(),c(),E(),v(),S(),o(),M(),z=/^#\s*MAGIC\s+DOC:\s*(.+)$/im,B=/^[_*](.+?)[_*]\s*$/m,V=new Map,H=a(async function(e){let{messages:t,querySource:n}=e;if(n===`repl_main_thread`&&!d(t)&&V.size!==0)for(let t of Array.from(V.values()))await L(t,e)})}));export{R as n,U as r,N as t};