import{n as e}from"./chunk-DR8-3Aex.js";import{c as t,n}from"./envUtils-3UiS5v1Q.js";import{Jn as r,Pc as i,Yn as a,ir as o,pr as s,qn as c}from"./paths-CjAPXmxs.js";import{D as l,E as u,J as d,O as f,U as p}from"./debug-DMnLghM9.js";import{o as m,s as h}from"./log-Byk9APYD.js";import{r as g,t as _}from"./execFileNoThrow-CHq-jiDl.js";import{o as v,r as y}from"./stringUtils-CrgsiPrp.js";import{Ak as b,Er as x,IA as S,Kr as C,LA as w,Lr as ee,Or as te,Wo as T,is as ne,it as E,kr as re,tt as ie}from"./loadAgentsDir-weYU9_ci.js";import{n as D,r as ae}from"./xml-jpvshTdP.js";import{X as O}from"./rcDebugLog-DbZbUV-c.js";import{tmpdir as oe}from"os";import{extname as se,join as k}from"path";import{constants as ce}from"fs";import{copyFile as le,mkdir as A,mkdtemp as ue,readFile as j,readdir as M,rm as de,unlink as fe,writeFile as N}from"fs/promises";import{execFileSync as pe}from"child_process";function P(){return o()}function me(){return o()}function F(){return k(n(),`usage-data`)}function I(){return k(F(),`facets`)}function L(){return k(F(),`session-meta`)}function he(e){return J[se(e).toLowerCase()]||null}function ge(e){let t={},n={},r=0,i=0,a=0,o=0,s=0,c=[],l=0,u={},d=!1,f=0,p=0,m=new Set,h=[],g=[],_=!1,v=!1,b=!1,x=null;for(let S of e.messages){let e=S.timestamp;if(S.type===`assistant`&&S.message){e&&(x=e);let s=S.message.usage;s&&(a+=s.input_tokens||0,o+=s.output_tokens||0);let c=S.message.content;if(Array.isArray(c)){for(let e of c)if(e.type===`tool_use`&&`name`in e){let a=e.name;t[a]=(t[a]||0)+1,(a===`Agent`||a===`Task`)&&(d=!0),a.startsWith(`mcp__`)&&(_=!0),a===`WebSearch`&&(v=!0),a===`WebFetch`&&(b=!0);let o=e.input;if(o){let e=o.file_path||``;if(e){let t=he(e);t&&(n[t]=(n[t]||0)+1),(a===`Edit`||a===`Write`)&&m.add(e)}if(a===`Edit`){let e=o.old_string||``,t=o.new_string||``;for(let n of w(e,t))n.added&&(f+=n.count||0),n.removed&&(p+=n.count||0)}if(a===`Write`){let e=o.content||``;e&&(f+=y(e,`
`)+1)}let t=o.command||``;t.includes(`git commit`)&&r++,t.includes(`git push`)&&i++}}}}if(S.type===`user`&&S.message){let t=S.message.content,n=!1;if(typeof t==`string`&&t.trim())n=!0;else if(Array.isArray(t)){for(let e of t)if(e.type===`text`&&`text`in e){n=!0;break}}if(n){if(e)try{let t=new Date(e).getHours();h.push(t),g.push(e)}catch{}if(x&&e){let t=new Date(x).getTime(),n=(new Date(e).getTime()-t)/1e3;n>2&&n<3600&&c.push(n)}}if(Array.isArray(t)){for(let e of t)if(e.type===`tool_result`&&`content`in e&&e.is_error){l++;let t=e.content,n=`Other`;if(typeof t==`string`){let e=t.toLowerCase();e.includes(`exit code`)?n=`Command Failed`:e.includes(`rejected`)||e.includes(`doesn't want`)?n=`User Rejected`:e.includes(`string to replace not found`)||e.includes(`no changes`)?n=`Edit Failed`:e.includes(`modified since read`)?n=`File Changed`:e.includes(`exceeds maximum`)||e.includes(`too large`)?n=`File Too Large`:(e.includes(`file not found`)||e.includes(`does not exist`))&&(n=`File Not Found`)}u[n]=(u[n]||0)+1}}if(typeof t==`string`)t.includes(`[Request interrupted by user`)&&s++;else if(Array.isArray(t)){for(let e of t)if(e.type===`text`&&`text`in e&&e.text.includes(`[Request interrupted by user`)){s++;break}}}}return{toolCounts:t,languages:n,gitCommits:r,gitPushes:i,inputTokens:a,outputTokens:o,userInterruptions:s,userResponseTimes:c,toolErrors:l,toolErrorCategories:u,usesTaskAgent:d,usesMcp:_,usesWebSearch:v,usesWebFetch:b,linesAdded:f,linesRemoved:p,filesModified:m,messageHours:h,userMessageTimestamps:g}}function _e(e){return!Number.isNaN(e.created.getTime())&&!Number.isNaN(e.modified.getTime())}function R(e){let t=ge(e),n=re(e)||`unknown`,r=e.created.toISOString(),i=Math.round((e.modified.getTime()-e.created.getTime())/1e3/60),a=0,o=0;for(let t of e.messages)if(t.type===`assistant`&&o++,t.type===`user`&&t.message){let e=t.message.content,n=!1;if(typeof e==`string`&&e.trim())n=!0;else if(Array.isArray(e)){for(let t of e)if(t.type===`text`&&`text`in t){n=!0;break}}n&&a++}return{session_id:n,project_path:e.projectPath||``,start_time:r,duration_minutes:i,user_message_count:a,assistant_message_count:o,tool_counts:t.toolCounts,languages:t.languages,git_commits:t.gitCommits,git_pushes:t.gitPushes,input_tokens:t.inputTokens,output_tokens:t.outputTokens,first_prompt:e.firstPrompt||``,summary:e.summary,user_interruptions:t.userInterruptions,user_response_times:t.userResponseTimes,tool_errors:t.toolErrors,tool_error_categories:t.toolErrorCategories,uses_task_agent:t.usesTaskAgent,uses_mcp:t.usesMcp,uses_web_search:t.usesWebSearch,uses_web_fetch:t.usesWebFetch,lines_added:t.linesAdded,lines_removed:t.linesRemoved,files_modified:t.filesModified.size,message_hours:t.messageHours,user_message_timestamps:t.userMessageTimestamps}}function ve(e){let t=[],n=R(e);t.push(`Session: ${n.session_id.slice(0,8)}`),t.push(`Date: ${n.start_time}`),t.push(`Project: ${n.project_path}`),t.push(`Duration: ${n.duration_minutes} min`),t.push(``);for(let n of e.messages)if(n.type===`user`&&n.message){let e=n.message.content;if(typeof e==`string`)t.push(`[User]: ${e.slice(0,500)}`);else if(Array.isArray(e))for(let n of e)n.type===`text`&&`text`in n&&t.push(`[User]: ${n.text.slice(0,500)}`)}else if(n.type===`assistant`&&n.message){let e=n.message.content;if(Array.isArray(e))for(let n of e)n.type===`text`&&`text`in n?t.push(`[Assistant]: ${n.text.slice(0,300)}`):n.type===`tool_use`&&`name`in n&&t.push(`[Tool: ${n.name}]`)}return t.join(`
`)}async function ye(e){try{return T((await E({systemPrompt:O([]),userPrompt:Z+e,signal:new AbortController().signal,options:{model:P(),querySource:`insights`,agents:[],isNonInteractiveSession:!0,hasAppendSystemPrompt:!1,mcpTools:[],maxOutputTokensOverride:500}})).message.content)||e.slice(0,2e3)}catch{return e.slice(0,2e3)}}async function be(e){let t=ve(e);if(t.length<=3e4)return t;let n=25e3,r=[];for(let e=0;e<t.length;e+=n)r.push(t.slice(e,e+n));let i=await Promise.all(r.map(ye)),a=R(e);return[`Session: ${a.session_id.slice(0,8)}`,`Date: ${a.start_time}`,`Project: ${a.project_path}`,`Duration: ${a.duration_minutes} min`,`[Long session - ${r.length} parts summarized]`,``].join(`
`)+i.join(`

---

`)}async function xe(e){let t=k(I(),`${e}.json`);try{let e=l(await j(t,{encoding:`utf-8`}));if(!U(e)){try{await fe(t)}catch{}return null}return e}catch{return null}}async function Se(e){try{await A(I(),{recursive:!0})}catch{}await N(k(I(),`${e.session_id}.json`),f(e,null,2),{encoding:`utf-8`,mode:384})}async function Ce(e){let t=k(L(),`${e}.json`);try{return l(await j(t,{encoding:`utf-8`}))}catch{return null}}async function we(e){try{await A(L(),{recursive:!0})}catch{}await N(k(L(),`${e.session_id}.json`),f(e,null,2),{encoding:`utf-8`,mode:384})}async function Te(e,t){try{let n=`${X}${await be(e)}

RESPOND WITH ONLY A VALID JSON OBJECT matching this schema:
{
  "underlying_goal": "What the user fundamentally wanted to achieve",
  "goal_categories": {"category_name": count, ...},
  "outcome": "fully_achieved|mostly_achieved|partially_achieved|not_achieved|unclear_from_transcript",
  "user_satisfaction_counts": {"level": count, ...},
  "claude_helpfulness": "unhelpful|slightly_helpful|moderately_helpful|very_helpful|essential",
  "session_type": "single_task|multi_task|iterative_refinement|exploration|quick_question",
  "friction_counts": {"friction_type": count, ...},
  "friction_detail": "One sentence describing friction or empty",
  "primary_success": "none|fast_accurate_search|correct_code_edits|good_explanations|proactive_help|multi_file_changes|good_debugging",
  "brief_summary": "One sentence: what user wanted and whether they got it"
}`,r=T((await E({systemPrompt:O([]),userPrompt:n,signal:new AbortController().signal,options:{model:P(),querySource:`insights`,agents:[],isNonInteractiveSession:!0,hasAppendSystemPrompt:!1,mcpTools:[],maxOutputTokensOverride:4096}})).message.content).match(/\{[\s\S]*\}/);if(!r)return null;let i=l(r[0]);return U(i)?{...i,session_id:t}:null}catch(e){return h(Error(`Facet extraction failed: ${d(e).message}`)),null}}function Ee(e){let t=[];for(let n of e)for(let e of n.user_message_timestamps)try{let r=new Date(e).getTime();t.push({ts:r,sessionId:n.session_id})}catch{}t.sort((e,t)=>e.ts-t.ts);let n=new Set,r=new Set,i=0,a=new Map;for(let e=0;e<t.length;e++){let o=t[e];for(;i<e&&o.ts-t[i].ts>18e5;){let e=t[i];a.get(e.sessionId)===i&&a.delete(e.sessionId),i++}let s=a.get(o.sessionId);if(s!==void 0)for(let i=s+1;i<e;i++){let e=t[i];if(e.sessionId!==o.sessionId){let i=[o.sessionId,e.sessionId].sort().join(`:`);n.add(i),r.add(`${t[s].ts}:${o.sessionId}`),r.add(`${e.ts}:${e.sessionId}`),r.add(`${o.ts}:${o.sessionId}`);break}}a.set(o.sessionId,e)}let o=new Set;for(let e of n){let[t,n]=e.split(`:`);t&&o.add(t),n&&o.add(n)}return{overlap_events:n.size,sessions_involved:o.size,user_messages_during:r.size}}function De(e,t){let n={total_sessions:e.length,sessions_with_facets:t.size,date_range:{start:``,end:``},total_messages:0,total_duration_hours:0,total_input_tokens:0,total_output_tokens:0,tool_counts:{},languages:{},git_commits:0,git_pushes:0,projects:{},goal_categories:{},outcomes:{},satisfaction:{},helpfulness:{},session_types:{},friction:{},success:{},session_summaries:[],total_interruptions:0,total_tool_errors:0,tool_error_categories:{},user_response_times:[],median_response_time:0,avg_response_time:0,sessions_using_task_agent:0,sessions_using_mcp:0,sessions_using_web_search:0,sessions_using_web_fetch:0,total_lines_added:0,total_lines_removed:0,total_files_modified:0,days_active:0,messages_per_day:0,message_hours:[],multi_clauding:{overlap_events:0,sessions_involved:0,user_messages_during:0}},r=[],i=[],a=[];for(let o of e){r.push(o.start_time),n.total_messages+=o.user_message_count,n.total_duration_hours+=o.duration_minutes/60,n.total_input_tokens+=o.input_tokens,n.total_output_tokens+=o.output_tokens,n.git_commits+=o.git_commits,n.git_pushes+=o.git_pushes,n.total_interruptions+=o.user_interruptions,n.total_tool_errors+=o.tool_errors;for(let[e,t]of Object.entries(o.tool_error_categories))n.tool_error_categories[e]=(n.tool_error_categories[e]||0)+t;i.push(...o.user_response_times),o.uses_task_agent&&n.sessions_using_task_agent++,o.uses_mcp&&n.sessions_using_mcp++,o.uses_web_search&&n.sessions_using_web_search++,o.uses_web_fetch&&n.sessions_using_web_fetch++,n.total_lines_added+=o.lines_added,n.total_lines_removed+=o.lines_removed,n.total_files_modified+=o.files_modified,a.push(...o.message_hours);for(let[e,t]of Object.entries(o.tool_counts))n.tool_counts[e]=(n.tool_counts[e]||0)+t;for(let[e,t]of Object.entries(o.languages))n.languages[e]=(n.languages[e]||0)+t;o.project_path&&(n.projects[o.project_path]=(n.projects[o.project_path]||0)+1);let e=t.get(o.session_id);if(e){for(let[t,r]of H(e.goal_categories))r>0&&(n.goal_categories[t]=(n.goal_categories[t]||0)+r);n.outcomes[e.outcome]=(n.outcomes[e.outcome]||0)+1;for(let[t,r]of H(e.user_satisfaction_counts))r>0&&(n.satisfaction[t]=(n.satisfaction[t]||0)+r);n.helpfulness[e.claude_helpfulness]=(n.helpfulness[e.claude_helpfulness]||0)+1,n.session_types[e.session_type]=(n.session_types[e.session_type]||0)+1;for(let[t,r]of H(e.friction_counts))r>0&&(n.friction[t]=(n.friction[t]||0)+r);e.primary_success!==`none`&&(n.success[e.primary_success]=(n.success[e.primary_success]||0)+1)}n.session_summaries.length<50&&n.session_summaries.push({id:o.session_id.slice(0,8),date:o.start_time.split(`T`)[0]||``,summary:o.summary||o.first_prompt.slice(0,100),goal:e?.underlying_goal})}if(r.sort(),n.date_range.start=r[0]?.split(`T`)[0]||``,n.date_range.end=r[r.length-1]?.split(`T`)[0]||``,n.user_response_times=i,i.length>0){let e=[...i].sort((e,t)=>e-t);n.median_response_time=e[Math.floor(e.length/2)]||0,n.avg_response_time=i.reduce((e,t)=>e+t,0)/i.length}return n.days_active=new Set(r.map(e=>e.split(`T`)[0])).size,n.messages_per_day=n.days_active>0?Math.round(n.total_messages/n.days_active*10)/10:0,n.message_hours=a,n.multi_clauding=Ee(e),n}async function z(e,t){try{let n=T((await E({systemPrompt:O([]),userPrompt:e.prompt+`

DATA:
`+t,signal:new AbortController().signal,options:{model:me(),querySource:`insights`,agents:[],isNonInteractiveSession:!0,hasAppendSystemPrompt:!1,mcpTools:[],maxOutputTokensOverride:e.maxTokens}})).message.content);if(n){let t=n.match(/\{[\s\S]*\}/);if(t)try{return{name:e.name,result:l(t[0])}}catch{return{name:e.name,result:null}}}return{name:e.name,result:null}}catch(t){return h(Error(`${e.name} failed: ${d(t).message}`)),{name:e.name,result:null}}}async function Oe(e,t){let n=Array.from(t.values()).slice(0,50).map(e=>`- ${e.brief_summary} (${e.outcome}, ${e.claude_helpfulness})`).join(`
`),r=Array.from(t.values()).filter(e=>e.friction_detail).slice(0,20).map(e=>`- ${e.friction_detail}`).join(`
`),i=Array.from(t.values()).flatMap(e=>e.user_instructions_to_claude||[]).slice(0,15).map(e=>`- ${e}`).join(`
`),a=f({sessions:e.total_sessions,analyzed:e.sessions_with_facets,date_range:e.date_range,messages:e.total_messages,hours:Math.round(e.total_duration_hours),commits:e.git_commits,top_tools:Object.entries(e.tool_counts).sort((e,t)=>t[1]-e[1]).slice(0,8),top_goals:Object.entries(e.goal_categories).sort((e,t)=>t[1]-e[1]).slice(0,8),outcomes:e.outcomes,satisfaction:e.satisfaction,friction:e.friction,success:e.success,languages:e.languages},null,2)+`

SESSION SUMMARIES:
`+n+`

FRICTION DETAILS:
`+r+`

USER INSTRUCTIONS TO CLAUDE:
`+(i||`None captured`),o=await Promise.all(Q.map(e=>z(e,a))),s={};for(let{name:e,result:t}of o)t&&(s[e]=t);let l=s.project_areas?.areas?.map(e=>`- ${e.name}: ${e.description}`).join(`
`)||``,u=s.what_works?.impressive_workflows?.map(e=>`- ${e.title}: ${e.description}`).join(`
`)||``,d=s.friction_analysis?.categories?.map(e=>`- ${e.category}: ${e.description}`).join(`
`)||``,p=s.suggestions?.features_to_try?.map(e=>`- ${e.feature}: ${e.one_liner}`).join(`
`)||``,m=s.suggestions?.usage_patterns?.map(e=>`- ${e.title}: ${e.suggestion}`).join(`
`)||``,h=s.on_the_horizon?.opportunities?.map(e=>`- ${e.title}: ${e.whats_possible}`).join(`
`)||``,g=await z({name:`at_a_glance`,prompt:`You're writing an "At a Glance" summary for a Claude Code usage insights report for Claude Code users. The goal is to help them understand their usage and improve how they can use ${c()} better, especially as models improve.

Use this 4-part structure:

1. **What's working** - What is the user's unique style of interacting with ${c()} and what are some impactful things they've done? You can include one or two details, but keep it high level since things might not be fresh in the user's memory. Don't be fluffy or overly complimentary. Also, don't focus on the tool calls they use.

2. **What's hindering you** - Split into (a) ${c()}'s fault (misunderstandings, wrong approaches, bugs) and (b) user-side friction (not providing enough context, environment issues -- ideally more general than just one project). Be honest but constructive.

3. **Quick wins to try** - Specific Claude Code features they could try from the examples below, or a workflow technique if you think it's really compelling. (Avoid stuff like "Ask ${c()} to confirm before taking actions" or "Type out more context up front" which are less compelling.)

4. **Ambitious workflows for better models** - As we move to much more capable models over the next 3-6 months, what should they prepare for? What workflows that seem impossible now will become possible? Draw from the appropriate section below.

Keep each section to 2-3 not-too-long sentences. Don't overwhelm the user. Don't mention specific numerical stats or underlined_categories from the session data below. Use a coaching tone.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "whats_working": "(refer to instructions above)",
  "whats_hindering": "(refer to instructions above)",
  "quick_wins": "(refer to instructions above)",
  "ambitious_workflows": "(refer to instructions above)"
}

SESSION DATA:
${a}

## Project Areas (what user works on)
${l}

## Big Wins (impressive accomplishments)
${u}

## Friction Categories (where things go wrong)
${d}

## Features to Try
${p}

## Usage Patterns to Adopt
${m}

## On the Horizon (ambitious workflows for better models)
${h}`,maxTokens:8192},``);return g.result&&(s.at_a_glance=g.result),s}function B(e){return D(e).replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`)}function V(e,t,n=6,r){let i;if(i=r?r.filter(t=>t in e&&(e[t]??0)>0).map(t=>[t,e[t]??0]):Object.entries(e).sort((e,t)=>t[1]-e[1]).slice(0,n),i.length===0)return`<p class="empty">No data</p>`;let a=Math.max(...i.map(e=>e[1]));return i.map(([e,n])=>{let r=n/a*100;return`<div class="bar-row">
        <div class="bar-label">${D(Y[e]||e.replace(/_/g,` `).replace(/\b\w/g,e=>e.toUpperCase()))}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${r}%;background:${t}"></div></div>
        <div class="bar-value">${n}</div>
      </div>`}).join(`
`)}function ke(e){if(e.length===0)return`<p class="empty">No response time data</p>`;let t={"2-10s":0,"10-30s":0,"30s-1m":0,"1-2m":0,"2-5m":0,"5-15m":0,">15m":0};for(let n of e)n<10?t[`2-10s`]=(t[`2-10s`]??0)+1:n<30?t[`10-30s`]=(t[`10-30s`]??0)+1:n<60?t[`30s-1m`]=(t[`30s-1m`]??0)+1:n<120?t[`1-2m`]=(t[`1-2m`]??0)+1:n<300?t[`2-5m`]=(t[`2-5m`]??0)+1:n<900?t[`5-15m`]=(t[`5-15m`]??0)+1:t[`>15m`]=(t[`>15m`]??0)+1;let n=Math.max(...Object.values(t));return n===0?`<p class="empty">No response time data</p>`:Object.entries(t).map(([e,t])=>`<div class="bar-row">
        <div class="bar-label">${e}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${t/n*100}%;background:#6366f1"></div></div>
        <div class="bar-value">${t}</div>
      </div>`).join(`
`)}function Ae(e){if(e.length===0)return`<p class="empty">No time data</p>`;let t=[{label:`Morning (6-12)`,range:[6,7,8,9,10,11]},{label:`Afternoon (12-18)`,range:[12,13,14,15,16,17]},{label:`Evening (18-24)`,range:[18,19,20,21,22,23]},{label:`Night (0-6)`,range:[0,1,2,3,4,5]}],n={};for(let t of e)n[t]=(n[t]||0)+1;let r=t.map(e=>({label:e.label,count:e.range.reduce((e,t)=>e+(n[t]||0),0)})),i=Math.max(...r.map(e=>e.count))||1;return`<div id="hour-histogram">${r.map(e=>`
      <div class="bar-row">
        <div class="bar-label">${e.label}</div>
        <div class="bar-track"><div class="bar-fill" style="width:${e.count/i*100}%;background:#8b5cf6"></div></div>
        <div class="bar-value">${e.count}</div>
      </div>`).join(`
`)}</div>`}function je(e){let t={};for(let n of e)t[n]=(t[n]||0)+1;return f(t)}function Me(e,t){let n=e=>e?e.split(`

`).map(e=>{let t=D(e);return t=t.replace(/\*\*(.+?)\*\*/g,`<strong>$1</strong>`),t=t.replace(/^- /gm,`• `),t=t.replace(/\n/g,`<br>`),`<p>${t}</p>`}).join(`
`):``,i=t.at_a_glance,a=i?`
    <div class="at-a-glance">
      <div class="glance-title">At a Glance</div>
      <div class="glance-sections">
        ${i.whats_working?`<div class="glance-section"><strong>What's working:</strong> ${B(i.whats_working)} <a href="#section-wins" class="see-more">Impressive Things You Did →</a></div>`:``}
        ${i.whats_hindering?`<div class="glance-section"><strong>What's hindering you:</strong> ${B(i.whats_hindering)} <a href="#section-friction" class="see-more">Where Things Go Wrong →</a></div>`:``}
        ${i.quick_wins?`<div class="glance-section"><strong>Quick wins to try:</strong> ${B(i.quick_wins)} <a href="#section-features" class="see-more">Features to Try →</a></div>`:``}
        ${i.ambitious_workflows?`<div class="glance-section"><strong>Ambitious workflows:</strong> ${B(i.ambitious_workflows)} <a href="#section-horizon" class="see-more">On the Horizon →</a></div>`:``}
      </div>
    </div>
    `:``,o=t.project_areas?.areas||[],s=o.length>0?`
    <h2 id="section-work">What You Work On</h2>
    <div class="project-areas">
      ${o.map(e=>`
        <div class="project-area">
          <div class="area-header">
            <span class="area-name">${D(e.name)}</span>
            <span class="area-count">~${e.session_count} sessions</span>
          </div>
          <div class="area-desc">${D(e.description)}</div>
        </div>
      `).join(``)}
    </div>
    `:``,l=t.interaction_style,u=l?.narrative?`
    <h2 id="section-usage">How You Use ${r()}</h2>
    <div class="narrative">
      ${n(l.narrative)}
      ${l.key_pattern?`<div class="key-insight"><strong>Key pattern:</strong> ${D(l.key_pattern)}</div>`:``}
    </div>
    `:``,d=t.what_works,f=d?.impressive_workflows&&d.impressive_workflows.length>0?`
    <h2 id="section-wins">Impressive Things You Did</h2>
    ${d.intro?`<p class="section-intro">${D(d.intro)}</p>`:``}
    <div class="big-wins">
      ${d.impressive_workflows.map(e=>`
        <div class="big-win">
          <div class="big-win-title">${D(e.title||``)}</div>
          <div class="big-win-desc">${D(e.description||``)}</div>
        </div>
      `).join(``)}
    </div>
    `:``,p=t.friction_analysis,m=p?.categories&&p.categories.length>0?`
    <h2 id="section-friction">Where Things Go Wrong</h2>
    ${p.intro?`<p class="section-intro">${D(p.intro)}</p>`:``}
    <div class="friction-categories">
      ${p.categories.map(e=>`
        <div class="friction-category">
          <div class="friction-title">${D(e.category||``)}</div>
          <div class="friction-desc">${D(e.description||``)}</div>
          ${e.examples?`<ul class="friction-examples">${e.examples.map(e=>`<li>${D(e)}</li>`).join(``)}</ul>`:``}
        </div>
      `).join(``)}
    </div>
    `:``,h=t.suggestions,g=h?`
    ${h.claude_md_additions&&h.claude_md_additions.length>0?`
    <h2 id="section-features">Existing CC Features to Try</h2>
    <div class="claude-md-section">
      <h3>Suggested CLAUDE.md Additions</h3>
      <p style="font-size: 12px; color: #64748b; margin-bottom: 12px;">Just copy this into ${r()} to add it to your CLAUDE.md.</p>
      <div class="claude-md-actions">
        <button class="copy-all-btn" onclick="copyAllCheckedClaudeMd()">Copy All Checked</button>
      </div>
      ${h.claude_md_additions.map((e,t)=>`
        <div class="claude-md-item">
          <input type="checkbox" id="cmd-${t}" class="cmd-checkbox" checked data-text="${D(e.prompt_scaffold||e.where||`Add to CLAUDE.md`)}\\n\\n${D(e.addition)}">
          <label for="cmd-${t}">
            <code class="cmd-code">${D(e.addition)}</code>
            <button class="copy-btn" onclick="copyCmdItem(${t})">Copy</button>
          </label>
          <div class="cmd-why">${D(e.why)}</div>
        </div>
      `).join(``)}
    </div>
    `:``}
    ${h.features_to_try&&h.features_to_try.length>0?`
    <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Just copy this into ${r()} and it'll set it up for you.</p>
    <div class="features-section">
      ${h.features_to_try.map(e=>`
        <div class="feature-card">
          <div class="feature-title">${D(e.feature||``)}</div>
          <div class="feature-oneliner">${D(e.one_liner||``)}</div>
          <div class="feature-why"><strong>Why for you:</strong> ${D(e.why_for_you||``)}</div>
          ${e.example_code?`
          <div class="feature-examples">
            <div class="feature-example">
              <div class="example-code-row">
                <code class="example-code">${D(e.example_code)}</code>
                <button class="copy-btn" onclick="copyText(this)">Copy</button>
              </div>
            </div>
          </div>
          `:``}
        </div>
      `).join(``)}
    </div>
    `:``}
    ${h.usage_patterns&&h.usage_patterns.length>0?`
    <h2 id="section-patterns">New Ways to Use ${r()}</h2>
    <p style="font-size: 13px; color: #64748b; margin-bottom: 12px;">Just copy this into ${r()} and it'll walk you through it.</p>
    <div class="patterns-section">
      ${h.usage_patterns.map(e=>`
        <div class="pattern-card">
          <div class="pattern-title">${D(e.title||``)}</div>
          <div class="pattern-summary">${D(e.suggestion||``)}</div>
          ${e.detail?`<div class="pattern-detail">${D(e.detail)}</div>`:``}
          ${e.copyable_prompt?`
          <div class="copyable-prompt-section">
            <div class="prompt-label">Paste into ${r()}:</div>
            <div class="copyable-prompt-row">
              <code class="copyable-prompt">${D(e.copyable_prompt)}</code>
              <button class="copy-btn" onclick="copyText(this)">Copy</button>
            </div>
          </div>
          `:``}
        </div>
      `).join(``)}
    </div>
    `:``}
    `:``,_=t.on_the_horizon,v=_?.opportunities&&_.opportunities.length>0?`
    <h2 id="section-horizon">On the Horizon</h2>
    ${_.intro?`<p class="section-intro">${D(_.intro)}</p>`:``}
    <div class="horizon-section">
      ${_.opportunities.map(e=>`
        <div class="horizon-card">
          <div class="horizon-title">${D(e.title||``)}</div>
          <div class="horizon-possible">${D(e.whats_possible||``)}</div>
          ${e.how_to_try?`<div class="horizon-tip"><strong>Getting started:</strong> ${D(e.how_to_try)}</div>`:``}
          ${e.copyable_prompt?`<div class="pattern-prompt"><div class="prompt-label">Paste into ${r()}:</div><code>${D(e.copyable_prompt)}</code><button class="copy-btn" onclick="copyText(this)">Copy</button></div>`:``}
        </div>
      `).join(``)}
    </div>
    `:``,y=process.env.USER_TYPE===`ant`&&t.cc_team_improvements?.improvements||[],b=process.env.USER_TYPE===`ant`&&t.model_behavior_improvements?.improvements||[],x=y.length>0||b.length>0?`
    <h2 id="section-feedback" class="feedback-header">Closing the Loop: Feedback for Other Teams</h2>
    <p class="feedback-intro">Suggestions for the CC product and model teams based on your usage patterns. Click to expand.</p>
    ${y.length>0?`
    <div class="collapsible-section">
      <div class="collapsible-header" onclick="toggleCollapsible(this)">
        <span class="collapsible-arrow">▶</span>
        <h3>Product Improvements for CC Team</h3>
      </div>
      <div class="collapsible-content">
        <div class="suggestions-section">
          ${y.map(e=>`
            <div class="feedback-card team-card">
              <div class="feedback-title">${D(e.title||``)}</div>
              <div class="feedback-detail">${D(e.detail||``)}</div>
              ${e.evidence?`<div class="feedback-evidence"><em>Evidence:</em> ${D(e.evidence)}</div>`:``}
            </div>
          `).join(``)}
        </div>
      </div>
    </div>
    `:``}
    ${b.length>0?`
    <div class="collapsible-section">
      <div class="collapsible-header" onclick="toggleCollapsible(this)">
        <span class="collapsible-arrow">▶</span>
        <h3>Model Behavior Improvements</h3>
      </div>
      <div class="collapsible-content">
        <div class="suggestions-section">
          ${b.map(e=>`
            <div class="feedback-card model-card">
              <div class="feedback-title">${D(e.title||``)}</div>
              <div class="feedback-detail">${D(e.detail||``)}</div>
              ${e.evidence?`<div class="feedback-evidence"><em>Evidence:</em> ${D(e.evidence)}</div>`:``}
            </div>
          `).join(``)}
        </div>
      </div>
    </div>
    `:``}
    `:``,S=t.fun_ending,C=S?.headline?`
    <div class="fun-ending">
      <div class="fun-headline">"${D(S.headline)}"</div>
      ${S.detail?`<div class="fun-detail">${D(S.detail)}</div>`:``}
    </div>
    `:``,w=`
    function toggleCollapsible(header) {
      header.classList.toggle('open');
      const content = header.nextElementSibling;
      content.classList.toggle('open');
    }
    function copyText(btn) {
      const code = btn.previousElementSibling;
      navigator.clipboard.writeText(code.textContent).then(() => {
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 2000);
      });
    }
    function copyCmdItem(idx) {
      const checkbox = document.getElementById('cmd-' + idx);
      if (checkbox) {
        const text = checkbox.dataset.text;
        navigator.clipboard.writeText(text).then(() => {
          const btn = checkbox.nextElementSibling.querySelector('.copy-btn');
          if (btn) { btn.textContent = 'Copied!'; setTimeout(() => { btn.textContent = 'Copy'; }, 2000); }
        });
      }
    }
    function copyAllCheckedClaudeMd() {
      const checkboxes = document.querySelectorAll('.cmd-checkbox:checked');
      const texts = [];
      checkboxes.forEach(cb => {
        if (cb.dataset.text) { texts.push(cb.dataset.text); }
      });
      const combined = texts.join('\\n');
      const btn = document.querySelector('.copy-all-btn');
      if (btn) {
        navigator.clipboard.writeText(combined).then(() => {
          btn.textContent = 'Copied ' + texts.length + ' items!';
          btn.classList.add('copied');
          setTimeout(() => { btn.textContent = 'Copy All Checked'; btn.classList.remove('copied'); }, 2000);
        });
      }
    }
    // Timezone selector for time of day chart (data is from our own analytics, not user input)
    const rawHourCounts = ${je(e.message_hours)};
    function updateHourHistogram(offsetFromPT) {
      const periods = [
        { label: "Morning (6-12)", range: [6,7,8,9,10,11] },
        { label: "Afternoon (12-18)", range: [12,13,14,15,16,17] },
        { label: "Evening (18-24)", range: [18,19,20,21,22,23] },
        { label: "Night (0-6)", range: [0,1,2,3,4,5] }
      ];
      const adjustedCounts = {};
      for (const [hour, count] of Object.entries(rawHourCounts)) {
        const newHour = (parseInt(hour) + offsetFromPT + 24) % 24;
        adjustedCounts[newHour] = (adjustedCounts[newHour] || 0) + count;
      }
      const periodCounts = periods.map(p => ({
        label: p.label,
        count: p.range.reduce((sum, h) => sum + (adjustedCounts[h] || 0), 0)
      }));
      const maxCount = Math.max(...periodCounts.map(p => p.count)) || 1;
      const container = document.getElementById('hour-histogram');
      container.textContent = '';
      periodCounts.forEach(p => {
        const row = document.createElement('div');
        row.className = 'bar-row';
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = p.label;
        const track = document.createElement('div');
        track.className = 'bar-track';
        const fill = document.createElement('div');
        fill.className = 'bar-fill';
        fill.style.width = (p.count / maxCount) * 100 + '%';
        fill.style.background = '#8b5cf6';
        track.appendChild(fill);
        const value = document.createElement('div');
        value.className = 'bar-value';
        value.textContent = p.count;
        row.appendChild(label);
        row.appendChild(track);
        row.appendChild(value);
        container.appendChild(row);
      });
    }
    document.getElementById('timezone-select').addEventListener('change', function() {
      const customInput = document.getElementById('custom-offset');
      if (this.value === 'custom') {
        customInput.style.display = 'inline-block';
        customInput.focus();
      } else {
        customInput.style.display = 'none';
        updateHourHistogram(parseInt(this.value));
      }
    });
    document.getElementById('custom-offset').addEventListener('change', function() {
      const offset = parseInt(this.value) + 8;
      updateHourHistogram(offset);
    });
  `;return`<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${r()} Insights</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif; background: #f8fafc; color: #334155; line-height: 1.65; padding: 48px 24px; }
    .container { max-width: 800px; margin: 0 auto; }
    h1 { font-size: 32px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
    h2 { font-size: 20px; font-weight: 600; color: #0f172a; margin-top: 48px; margin-bottom: 16px; }
    .subtitle { color: #64748b; font-size: 15px; margin-bottom: 32px; }
    .nav-toc { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0 32px 0; padding: 16px; background: white; border-radius: 8px; border: 1px solid #e2e8f0; }
    .nav-toc a { font-size: 12px; color: #64748b; text-decoration: none; padding: 6px 12px; border-radius: 6px; background: #f1f5f9; transition: all 0.15s; }
    .nav-toc a:hover { background: #e2e8f0; color: #334155; }
    .stats-row { display: flex; gap: 24px; margin-bottom: 40px; padding: 20px 0; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0; flex-wrap: wrap; }
    .stat { text-align: center; }
    .stat-value { font-size: 24px; font-weight: 700; color: #0f172a; }
    .stat-label { font-size: 11px; color: #64748b; text-transform: uppercase; }
    .at-a-glance { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #f59e0b; border-radius: 12px; padding: 20px 24px; margin-bottom: 32px; }
    .glance-title { font-size: 16px; font-weight: 700; color: #92400e; margin-bottom: 16px; }
    .glance-sections { display: flex; flex-direction: column; gap: 12px; }
    .glance-section { font-size: 14px; color: #78350f; line-height: 1.6; }
    .glance-section strong { color: #92400e; }
    .see-more { color: #b45309; text-decoration: none; font-size: 13px; white-space: nowrap; }
    .see-more:hover { text-decoration: underline; }
    .project-areas { display: flex; flex-direction: column; gap: 12px; margin-bottom: 32px; }
    .project-area { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .area-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
    .area-name { font-weight: 600; font-size: 15px; color: #0f172a; }
    .area-count { font-size: 12px; color: #64748b; background: #f1f5f9; padding: 2px 8px; border-radius: 4px; }
    .area-desc { font-size: 14px; color: #475569; line-height: 1.5; }
    .narrative { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 24px; }
    .narrative p { margin-bottom: 12px; font-size: 14px; color: #475569; line-height: 1.7; }
    .key-insight { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 12px 16px; margin-top: 12px; font-size: 14px; color: #166534; }
    .section-intro { font-size: 14px; color: #64748b; margin-bottom: 16px; }
    .big-wins { display: flex; flex-direction: column; gap: 12px; margin-bottom: 24px; }
    .big-win { background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; }
    .big-win-title { font-weight: 600; font-size: 15px; color: #166534; margin-bottom: 8px; }
    .big-win-desc { font-size: 14px; color: #15803d; line-height: 1.5; }
    .friction-categories { display: flex; flex-direction: column; gap: 16px; margin-bottom: 24px; }
    .friction-category { background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 16px; }
    .friction-title { font-weight: 600; font-size: 15px; color: #991b1b; margin-bottom: 6px; }
    .friction-desc { font-size: 13px; color: #7f1d1d; margin-bottom: 10px; }
    .friction-examples { margin: 0 0 0 20px; font-size: 13px; color: #334155; }
    .friction-examples li { margin-bottom: 4px; }
    .claude-md-section { background: #eff6ff; border: 1px solid #bfdbfe; border-radius: 8px; padding: 16px; margin-bottom: 20px; }
    .claude-md-section h3 { font-size: 14px; font-weight: 600; color: #1e40af; margin: 0 0 12px 0; }
    .claude-md-actions { margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #dbeafe; }
    .copy-all-btn { background: #2563eb; color: white; border: none; border-radius: 4px; padding: 6px 12px; font-size: 12px; cursor: pointer; font-weight: 500; transition: all 0.2s; }
    .copy-all-btn:hover { background: #1d4ed8; }
    .copy-all-btn.copied { background: #16a34a; }
    .claude-md-item { display: flex; flex-wrap: wrap; align-items: flex-start; gap: 8px; padding: 10px 0; border-bottom: 1px solid #dbeafe; }
    .claude-md-item:last-child { border-bottom: none; }
    .cmd-checkbox { margin-top: 2px; }
    .cmd-code { background: white; padding: 8px 12px; border-radius: 4px; font-size: 12px; color: #1e40af; border: 1px solid #bfdbfe; font-family: monospace; display: block; white-space: pre-wrap; word-break: break-word; flex: 1; }
    .cmd-why { font-size: 12px; color: #64748b; width: 100%; padding-left: 24px; margin-top: 4px; }
    .features-section, .patterns-section { display: flex; flex-direction: column; gap: 12px; margin: 16px 0; }
    .feature-card { background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 16px; }
    .pattern-card { background: #f0f9ff; border: 1px solid #7dd3fc; border-radius: 8px; padding: 16px; }
    .feature-title, .pattern-title { font-weight: 600; font-size: 15px; color: #0f172a; margin-bottom: 6px; }
    .feature-oneliner { font-size: 14px; color: #475569; margin-bottom: 8px; }
    .pattern-summary { font-size: 14px; color: #475569; margin-bottom: 8px; }
    .feature-why, .pattern-detail { font-size: 13px; color: #334155; line-height: 1.5; }
    .feature-examples { margin-top: 12px; }
    .feature-example { padding: 8px 0; border-top: 1px solid #d1fae5; }
    .feature-example:first-child { border-top: none; }
    .example-desc { font-size: 13px; color: #334155; margin-bottom: 6px; }
    .example-code-row { display: flex; align-items: flex-start; gap: 8px; }
    .example-code { flex: 1; background: #f1f5f9; padding: 8px 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; overflow-x: auto; white-space: pre-wrap; }
    .copyable-prompt-section { margin-top: 12px; padding-top: 12px; border-top: 1px solid #e2e8f0; }
    .copyable-prompt-row { display: flex; align-items: flex-start; gap: 8px; }
    .copyable-prompt { flex: 1; background: #f8fafc; padding: 10px 12px; border-radius: 4px; font-family: monospace; font-size: 12px; color: #334155; border: 1px solid #e2e8f0; white-space: pre-wrap; line-height: 1.5; }
    .feature-code { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px solid #e2e8f0; display: flex; align-items: flex-start; gap: 8px; }
    .feature-code code { flex: 1; font-family: monospace; font-size: 12px; color: #334155; white-space: pre-wrap; }
    .pattern-prompt { background: #f8fafc; padding: 12px; border-radius: 6px; margin-top: 12px; border: 1px solid #e2e8f0; }
    .pattern-prompt code { font-family: monospace; font-size: 12px; color: #334155; display: block; white-space: pre-wrap; margin-bottom: 8px; }
    .prompt-label { font-size: 11px; font-weight: 600; text-transform: uppercase; color: #64748b; margin-bottom: 6px; }
    .copy-btn { background: #e2e8f0; border: none; border-radius: 4px; padding: 4px 8px; font-size: 11px; cursor: pointer; color: #475569; flex-shrink: 0; }
    .copy-btn:hover { background: #cbd5e1; }
    .charts-row { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin: 24px 0; }
    .chart-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; }
    .chart-title { font-size: 12px; font-weight: 600; color: #64748b; text-transform: uppercase; margin-bottom: 12px; }
    .bar-row { display: flex; align-items: center; margin-bottom: 6px; }
    .bar-label { width: 100px; font-size: 11px; color: #475569; flex-shrink: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .bar-track { flex: 1; height: 6px; background: #f1f5f9; border-radius: 3px; margin: 0 8px; }
    .bar-fill { height: 100%; border-radius: 3px; }
    .bar-value { width: 28px; font-size: 11px; font-weight: 500; color: #64748b; text-align: right; }
    .empty { color: #94a3b8; font-size: 13px; }
    .horizon-section { display: flex; flex-direction: column; gap: 16px; }
    .horizon-card { background: linear-gradient(135deg, #faf5ff 0%, #f5f3ff 100%); border: 1px solid #c4b5fd; border-radius: 8px; padding: 16px; }
    .horizon-title { font-weight: 600; font-size: 15px; color: #5b21b6; margin-bottom: 8px; }
    .horizon-possible { font-size: 14px; color: #334155; margin-bottom: 10px; line-height: 1.5; }
    .horizon-tip { font-size: 13px; color: #6b21a8; background: rgba(255,255,255,0.6); padding: 8px 12px; border-radius: 4px; }
    .feedback-header { margin-top: 48px; color: #64748b; font-size: 16px; }
    .feedback-intro { font-size: 13px; color: #94a3b8; margin-bottom: 16px; }
    .feedback-section { margin-top: 16px; }
    .feedback-section h3 { font-size: 14px; font-weight: 600; color: #475569; margin-bottom: 12px; }
    .feedback-card { background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 16px; margin-bottom: 12px; }
    .feedback-card.team-card { background: #eff6ff; border-color: #bfdbfe; }
    .feedback-card.model-card { background: #faf5ff; border-color: #e9d5ff; }
    .feedback-title { font-weight: 600; font-size: 14px; color: #0f172a; margin-bottom: 6px; }
    .feedback-detail { font-size: 13px; color: #475569; line-height: 1.5; }
    .feedback-evidence { font-size: 12px; color: #64748b; margin-top: 8px; }
    .fun-ending { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border: 1px solid #fbbf24; border-radius: 12px; padding: 24px; margin-top: 40px; text-align: center; }
    .fun-headline { font-size: 18px; font-weight: 600; color: #78350f; margin-bottom: 8px; }
    .fun-detail { font-size: 14px; color: #92400e; }
    .collapsible-section { margin-top: 16px; }
    .collapsible-header { display: flex; align-items: center; gap: 8px; cursor: pointer; padding: 12px 0; border-bottom: 1px solid #e2e8f0; }
    .collapsible-header h3 { margin: 0; font-size: 14px; font-weight: 600; color: #475569; }
    .collapsible-arrow { font-size: 12px; color: #94a3b8; transition: transform 0.2s; }
    .collapsible-content { display: none; padding-top: 16px; }
    .collapsible-content.open { display: block; }
    .collapsible-header.open .collapsible-arrow { transform: rotate(90deg); }
    @media (max-width: 640px) { .charts-row { grid-template-columns: 1fr; } .stats-row { justify-content: center; } }
  </style>
</head>
<body>
  <div class="container">
    <h1>${r()} Insights</h1>
    <p class="subtitle">${e.total_messages.toLocaleString()} messages across ${e.total_sessions} sessions${e.total_sessions_scanned&&e.total_sessions_scanned>e.total_sessions?` (${e.total_sessions_scanned.toLocaleString()} total)`:``} | ${e.date_range.start} to ${e.date_range.end}</p>

    ${a}

    <nav class="nav-toc">
      <a href="#section-work">What You Work On</a>
      <a href="#section-usage">How You Use CC</a>
      <a href="#section-wins">Impressive Things</a>
      <a href="#section-friction">Where Things Go Wrong</a>
      <a href="#section-features">Features to Try</a>
      <a href="#section-patterns">New Usage Patterns</a>
      <a href="#section-horizon">On the Horizon</a>
      <a href="#section-feedback">Team Feedback</a>
    </nav>

    <div class="stats-row">
      <div class="stat"><div class="stat-value">${e.total_messages.toLocaleString()}</div><div class="stat-label">Messages</div></div>
      <div class="stat"><div class="stat-value">+${e.total_lines_added.toLocaleString()}/-${e.total_lines_removed.toLocaleString()}</div><div class="stat-label">Lines</div></div>
      <div class="stat"><div class="stat-value">${e.total_files_modified}</div><div class="stat-label">Files</div></div>
      <div class="stat"><div class="stat-value">${e.days_active}</div><div class="stat-label">Days</div></div>
      <div class="stat"><div class="stat-value">${e.messages_per_day}</div><div class="stat-label">Msgs/Day</div></div>
    </div>

    ${s}

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">What You Wanted</div>
        ${V(e.goal_categories,`#2563eb`)}
      </div>
      <div class="chart-card">
        <div class="chart-title">Top Tools Used</div>
        ${V(e.tool_counts,`#0891b2`)}
      </div>
    </div>

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Languages</div>
        ${V(e.languages,`#10b981`)}
      </div>
      <div class="chart-card">
        <div class="chart-title">Session Types</div>
        ${V(e.session_types||{},`#8b5cf6`)}
      </div>
    </div>

    ${u}

    <!-- Response Time Distribution -->
    <div class="chart-card" style="margin: 24px 0;">
      <div class="chart-title">User Response Time Distribution</div>
      ${ke(e.user_response_times)}
      <div style="font-size: 12px; color: #64748b; margin-top: 8px;">
        Median: ${e.median_response_time.toFixed(1)}s &bull; Average: ${e.avg_response_time.toFixed(1)}s
      </div>
    </div>

    <!-- Multi-clauding Section (matching Python reference) -->
    <div class="chart-card" style="margin: 24px 0;">
      <div class="chart-title">Multi-Clauding (Parallel Sessions)</div>
      ${e.multi_clauding.overlap_events===0?`
        <p style="font-size: 14px; color: #64748b; padding: 8px 0;">
          No parallel session usage detected. You typically work with one ${r()} session at a time.
        </p>
      `:`
        <div style="display: flex; gap: 24px; margin: 12px 0;">
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #7c3aed;">${e.multi_clauding.overlap_events}</div>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Overlap Events</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #7c3aed;">${e.multi_clauding.sessions_involved}</div>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Sessions Involved</div>
          </div>
          <div style="text-align: center;">
            <div style="font-size: 24px; font-weight: 700; color: #7c3aed;">${e.total_messages>0?Math.round(100*e.multi_clauding.user_messages_during/e.total_messages):0}%</div>
            <div style="font-size: 11px; color: #64748b; text-transform: uppercase;">Of Messages</div>
          </div>
        </div>
        <p style="font-size: 13px; color: #475569; margin-top: 12px;">
          You run multiple ${r()} sessions simultaneously. Multi-clauding is detected when sessions
          overlap in time, suggesting parallel workflows.
        </p>
      `}
    </div>

    <!-- Time of Day & Tool Errors -->
    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title" style="display: flex; align-items: center; gap: 12px;">
          User Messages by Time of Day
          <select id="timezone-select" style="font-size: 12px; padding: 4px 8px; border-radius: 4px; border: 1px solid #e2e8f0;">
            <option value="0">PT (UTC-8)</option>
            <option value="3">ET (UTC-5)</option>
            <option value="8">London (UTC)</option>
            <option value="9">CET (UTC+1)</option>
            <option value="17">Tokyo (UTC+9)</option>
            <option value="custom">Custom offset...</option>
          </select>
          <input type="number" id="custom-offset" placeholder="UTC offset" style="display: none; width: 80px; font-size: 12px; padding: 4px; border-radius: 4px; border: 1px solid #e2e8f0;">
        </div>
        ${Ae(e.message_hours)}
      </div>
      <div class="chart-card">
        <div class="chart-title">Tool Errors Encountered</div>
        ${Object.keys(e.tool_error_categories).length>0?V(e.tool_error_categories,`#dc2626`):`<p class="empty">No tool errors</p>`}
      </div>
    </div>

    ${f}

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">What Helped Most (${c()}'s Capabilities)</div>
        ${V(e.success,`#16a34a`)}
      </div>
      <div class="chart-card">
        <div class="chart-title">Outcomes</div>
        ${V(e.outcomes,`#8b5cf6`,6,Le)}
      </div>
    </div>

    ${m}

    <div class="charts-row">
      <div class="chart-card">
        <div class="chart-title">Primary Friction Types</div>
        ${V(e.friction,`#dc2626`)}
      </div>
      <div class="chart-card">
        <div class="chart-title">Inferred Satisfaction (model-estimated)</div>
        ${V(e.satisfaction,`#eab308`,6,Ie)}
      </div>
    </div>

    ${g}

    ${v}

    ${C}

    ${x}
  </div>
  <script>${w}<\/script>
</body>
</html>`}async function Ne(){let e=x(),t;try{t=await M(e,{withFileTypes:!0})}catch{return[]}let n=t.filter(e=>e.isDirectory()).map(t=>k(e,t.name)),r=[];for(let e=0;e<n.length;e++){let t=await te(n[e]);for(let[e,n]of t)r.push({sessionId:e,path:n.path,mtime:n.mtime,size:n.size});e%10==9&&await new Promise(e=>setImmediate(e))}return r.sort((e,t)=>t.mtime-e.mtime),r}async function Pe(e){let t;if(process.env.USER_TYPE===`ant`&&e?.collectRemote){let{hosts:e,totalCopied:r}=await q(k(n(),`projects`));t={hosts:e,totalCopied:r}}let r=await Ne(),i=r.length,a=[],o=[];for(let e=0;e<r.length;e+=50){let t=r.slice(e,e+50),n=await Promise.all(t.map(async e=>({sessionInfo:e,cached:await Ce(e.sessionId)})));for(let{sessionInfo:e,cached:t}of n)t?a.push(t):o.length<200&&o.push(e)}let s=new Map,c=e=>{for(let t of e.messages.slice(0,5))if(t.type===`user`&&t.message){let e=t.message.content;if(typeof e==`string`&&(e.includes(`RESPOND WITH ONLY A VALID JSON OBJECT`)||e.includes(`record_facets`)))return!0}return!1};for(let e=0;e<o.length;e+=10){let t=o.slice(e,e+10),n=await Promise.all(t.map(async e=>{try{return await C(e.path)}catch{return[]}})),r=[];for(let e of n)for(let t of e){if(c(t)||!_e(t))continue;let e=R(t);a.push(e),r.push(e),s.set(e.session_id,t)}await Promise.all(r.map(e=>we(e)))}let l=new Map;for(let e of a){let t=l.get(e.session_id);(!t||e.user_message_count>t.user_message_count||e.user_message_count===t.user_message_count&&e.duration_minutes>t.duration_minutes)&&l.set(e.session_id,e)}let u=new Set(l.keys());a=[...l.values()];for(let e of s.keys())u.has(e)||s.delete(e);a.sort((e,t)=>t.start_time.localeCompare(e.start_time));let d=a.filter(e=>!(e.user_message_count<2||e.duration_minutes<1)),f=new Map,p=[],m=await Promise.all(d.map(async e=>({sessionId:e.session_id,cached:await xe(e.session_id)})));for(let{sessionId:e,cached:t}of m)if(t)f.set(e,t);else{let t=s.get(e);t&&p.length<50&&p.push({log:t,sessionId:e})}for(let e=0;e<p.length;e+=50){let t=p.slice(e,e+50),n=await Promise.all(t.map(async({log:e,sessionId:t})=>({sessionId:t,newFacets:await Te(e,t)}))),r=[];for(let{sessionId:e,newFacets:t}of n)t&&(f.set(e,t),r.push(t));await Promise.all(r.map(e=>Se(e)))}let h=e=>{let t=f.get(e);if(!t)return!1;let n=t.goal_categories,r=Fe(n).filter(e=>(n[e]??0)>0);return r.length===1&&r[0]===`warmup_minimal`},g=d.filter(e=>!h(e.session_id)),_=new Map;for(let[e,t]of f)h(e)||_.set(e,t);let v=De(g,_);v.total_sessions_scanned=i;let y=await Oe(v,f),b=Me(v,y);try{await A(F(),{recursive:!0})}catch{}let x=k(F(),`report.html`);return await N(x,b,{encoding:`utf-8`,mode:384}),{insights:y,htmlPath:x,data:v,remoteStats:t,facets:_}}function H(e){return e?Object.entries(e):[]}function Fe(e){return e?Object.keys(e):[]}function U(e){if(!e||typeof e!=`object`)return!1;let t=e;return typeof t.underlying_goal==`string`&&typeof t.outcome==`string`&&typeof t.brief_summary==`string`&&t.goal_categories!==null&&typeof t.goal_categories==`object`&&t.user_satisfaction_counts!==null&&typeof t.user_satisfaction_counts==`object`&&t.friction_counts!==null&&typeof t.friction_counts==`object`}var W,G,K,q,J,Y,X,Z,Q,Ie,Le,$;e((()=>{S(),ie(),i(),t(),p(),g(),m(),ne(),s(),ee(),u(),v(),b(),ae(),a(),W=process.env.USER_TYPE===`ant`?async()=>{let{stdout:e,code:t}=await _(`coder`,[`list`,`-o`,`json`],{timeout:3e4});if(t!==0)return[];try{return l(e).filter(e=>e.latest_build?.status===`running`).map(e=>e.name)}catch{return[]}}:async()=>[],G=process.env.USER_TYPE===`ant`?async e=>{let{stdout:t,code:n}=await _(`ssh`,[`${e}.coder`,`find /root/.claude/projects -name "*.jsonl" 2>/dev/null | wc -l`],{timeout:3e4});return n===0&&parseInt(t.trim(),10)||0}:async()=>0,K=process.env.USER_TYPE===`ant`?async(e,t)=>{let n={copied:0,skipped:0},r=await ue(k(oe(),`claude-hs-`));try{if((await _(`scp`,[`-rq`,`${e}.coder:/root/.claude/projects/`,r],{timeout:3e5})).code!==0)return n;let i=k(r,`projects`),a;try{a=await M(i,{withFileTypes:!0})}catch{return n}await Promise.all(a.map(async r=>{let a=r.name,o=k(i,a);if(!r.isDirectory())return;let s=k(t,`${a}__${e}`);try{await A(s,{recursive:!0})}catch{}let c;try{c=await M(o,{withFileTypes:!0})}catch{return}await Promise.all(c.map(async e=>{let t=e.name;if(!t.endsWith(`.jsonl`))return;let r=k(o,t),i=k(s,t);try{await le(r,i,ce.COPYFILE_EXCL),n.copied++}catch{n.skipped++}}))}))}finally{try{await de(r,{recursive:!0,force:!0})}catch{}}return n}:async()=>({copied:0,skipped:0}),q=process.env.USER_TYPE===`ant`?async e=>{let t=await W(),n=[],r=0,i=0,a=await Promise.all(t.map(async t=>{let n=await G(t);if(n>0){let{copied:r,skipped:i}=await K(t,e);return{name:t,sessionCount:n,copied:r,skipped:i}}return{name:t,sessionCount:n,copied:0,skipped:0}}));for(let e of a)n.push({name:e.name,sessionCount:e.sessionCount}),r+=e.copied,i+=e.skipped;return{hosts:n,totalCopied:r,totalSkipped:i}}:async()=>({hosts:[],totalCopied:0,totalSkipped:0}),J={".ts":`TypeScript`,".tsx":`TypeScript`,".js":`JavaScript`,".jsx":`JavaScript`,".py":`Python`,".rb":`Ruby`,".go":`Go`,".rs":`Rust`,".java":`Java`,".md":`Markdown`,".json":`JSON`,".yaml":`YAML`,".yml":`YAML`,".sh":`Shell`,".css":`CSS`,".html":`HTML`},Y={debug_investigate:`Debug/Investigate`,implement_feature:`Implement Feature`,fix_bug:`Fix Bug`,write_script_tool:`Write Script/Tool`,refactor_code:`Refactor Code`,configure_system:`Configure System`,create_pr_commit:`Create PR/Commit`,analyze_data:`Analyze Data`,understand_codebase:`Understand Codebase`,write_tests:`Write Tests`,write_docs:`Write Docs`,deploy_infra:`Deploy/Infra`,warmup_minimal:`Cache Warmup`,fast_accurate_search:`Fast/Accurate Search`,correct_code_edits:`Correct Code Edits`,good_explanations:`Good Explanations`,proactive_help:`Proactive Help`,multi_file_changes:`Multi-file Changes`,handled_complexity:`Multi-file Changes`,good_debugging:`Good Debugging`,misunderstood_request:`Misunderstood Request`,wrong_approach:`Wrong Approach`,buggy_code:`Buggy Code`,user_rejected_action:`User Rejected Action`,claude_got_blocked:`CCN Got Blocked`,user_stopped_early:`User Stopped Early`,wrong_file_or_location:`Wrong File/Location`,excessive_changes:`Excessive Changes`,slow_or_verbose:`Slow/Verbose`,tool_failed:`Tool Failed`,user_unclear:`User Unclear`,external_issue:`External Issue`,frustrated:`Frustrated`,dissatisfied:`Dissatisfied`,likely_satisfied:`Likely Satisfied`,satisfied:`Satisfied`,happy:`Happy`,unsure:`Unsure`,neutral:`Neutral`,delighted:`Delighted`,single_task:`Single Task`,multi_task:`Multi Task`,iterative_refinement:`Iterative Refinement`,exploration:`Exploration`,quick_question:`Quick Question`,fully_achieved:`Fully Achieved`,mostly_achieved:`Mostly Achieved`,partially_achieved:`Partially Achieved`,not_achieved:`Not Achieved`,unclear_from_transcript:`Unclear`,unhelpful:`Unhelpful`,slightly_helpful:`Slightly Helpful`,moderately_helpful:`Moderately Helpful`,very_helpful:`Very Helpful`,essential:`Essential`},X=`Analyze this Claude Code session and extract structured facets.

CRITICAL GUIDELINES:

1. **goal_categories**: Count ONLY what the USER explicitly asked for.
   - DO NOT count ${c()}'s autonomous codebase exploration
   - DO NOT count work ${c()} decided to do on its own
   - ONLY count when user says "can you...", "please...", "I need...", "let's..."

2. **user_satisfaction_counts**: Base ONLY on explicit user signals.
   - "Yay!", "great!", "perfect!" → happy
   - "thanks", "looks good", "that works" → satisfied
   - "ok, now let's..." (continuing without complaint) → likely_satisfied
   - "that's not right", "try again" → dissatisfied
   - "this is broken", "I give up" → frustrated

3. **friction_counts**: Be specific about what went wrong.
   - misunderstood_request: ${c()} interpreted incorrectly
   - wrong_approach: Right goal, wrong solution method
   - buggy_code: Code didn't work correctly
   - user_rejected_action: User said no/stop to a tool call
   - excessive_changes: Over-engineered or changed too much

4. If very short or just warmup, use warmup_minimal for goal_category

SESSION:
`,Z=`Summarize this portion of a Claude Code session transcript. Focus on:
1. What the user asked for
2. What ${c()} did (tools used, files modified)
3. Any friction or issues
4. The outcome

Keep it concise - 3-5 sentences. Preserve specific details like file names, error messages, and user feedback.

TRANSCRIPT CHUNK:
`,Q=[{name:`project_areas`,prompt:`Analyze this Claude Code usage data and identify project areas.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "areas": [
    {"name": "Area name", "session_count": N, "description": "2-3 sentences about what was worked on and how Claude Code was used."}
  ]
}

Include 4-5 areas. Skip internal CC operations.`,maxTokens:8192},{name:`interaction_style`,prompt:`Analyze this Claude Code usage data and describe the user's interaction style.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "narrative": "2-3 paragraphs analyzing HOW the user interacts with Claude Code. Use second person 'you'. Describe patterns: iterate quickly vs detailed upfront specs? Interrupt often or let ${c()} run? Include specific examples. Use **bold** for key insights.",
  "key_pattern": "One sentence summary of most distinctive interaction style"
}`,maxTokens:8192},{name:`what_works`,prompt:`Analyze this Claude Code usage data and identify what's working well for this user. Use second person ("you").

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "intro": "1 sentence of context",
  "impressive_workflows": [
    {"title": "Short title (3-6 words)", "description": "2-3 sentences describing the impressive workflow or approach. Use 'you' not 'the user'."}
  ]
}

Include 3 impressive workflows.`,maxTokens:8192},{name:`friction_analysis`,prompt:`Analyze this Claude Code usage data and identify friction points for this user. Use second person ("you").

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "intro": "1 sentence summarizing friction patterns",
  "categories": [
    {"category": "Concrete category name", "description": "1-2 sentences explaining this category and what could be done differently. Use 'you' not 'the user'.", "examples": ["Specific example with consequence", "Another example"]}
  ]
}

Include 3 friction categories with 2 examples each.`,maxTokens:8192},{name:`suggestions`,prompt:`Analyze this Claude Code usage data and suggest improvements.

## CC FEATURES REFERENCE (pick from these for features_to_try):
1. **MCP Servers**: Connect ${c()} to external tools, databases, and APIs via Model Context Protocol.
   - How to use: Run \`ccn mcp add <server-name> -- <command>\`
   - Good for: database queries, Slack integration, GitHub issue lookup, connecting to internal APIs

2. **Custom Skills**: Reusable prompts you define as markdown files that run with a single /command.
   - How to use: Create \`.claude/skills/commit/SKILL.md\` with instructions. Then type \`/commit\` to run it.
   - Good for: repetitive workflows - /commit, /review, /test, /deploy, /pr, or complex multi-step workflows

3. **Hooks**: Shell commands that auto-run at specific lifecycle events.
   - How to use: Add to \`.claude/settings.json\` under "hooks" key.
   - Good for: auto-formatting code, running type checks, enforcing conventions

4. **Headless Mode**: Run ${c()} non-interactively from scripts and CI/CD.
   - How to use: \`ccn -p "fix lint errors" --allowedTools "Edit,Read,Bash"\`
   - Good for: CI/CD integration, batch code fixes, automated reviews

5. **Task Agents**: ${c()} spawns focused sub-agents for complex exploration or parallel work.
   - How to use: ${c()} auto-invokes when helpful, or ask "use an agent to explore X"
   - Good for: codebase exploration, understanding complex systems

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "claude_md_additions": [
    {"addition": "A specific line or block to add to CLAUDE.md based on workflow patterns. E.g., 'Always run tests after modifying auth-related files'", "why": "1 sentence explaining why this would help based on actual sessions", "prompt_scaffold": "Instructions for where to add this in CLAUDE.md. E.g., 'Add under ## Testing section'"}
  ],
  "features_to_try": [
    {"feature": "Feature name from CC FEATURES REFERENCE above", "one_liner": "What it does", "why_for_you": "Why this would help YOU based on your sessions", "example_code": "Actual command or config to copy"}
  ],
  "usage_patterns": [
    {"title": "Short title", "suggestion": "1-2 sentence summary", "detail": "3-4 sentences explaining how this applies to YOUR work", "copyable_prompt": "A specific prompt to copy and try"}
  ]
}

IMPORTANT for claude_md_additions: PRIORITIZE instructions that appear MULTIPLE TIMES in the user data. If user told ${c()} the same thing in 2+ sessions (e.g., 'always run tests', 'use TypeScript'), that's a PRIME candidate - they shouldn't have to repeat themselves.

IMPORTANT for features_to_try: Pick 2-3 from the CC FEATURES REFERENCE above. Include 2-3 items for each category.`,maxTokens:8192},{name:`on_the_horizon`,prompt:`Analyze this Claude Code usage data and identify future opportunities.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "intro": "1 sentence about evolving AI-assisted development",
  "opportunities": [
    {"title": "Short title (4-8 words)", "whats_possible": "2-3 ambitious sentences about autonomous workflows", "how_to_try": "1-2 sentences mentioning relevant tooling", "copyable_prompt": "Detailed prompt to try"}
  ]
}

Include 3 opportunities. Think BIG - autonomous workflows, parallel agents, iterating against tests.`,maxTokens:8192},...process.env.USER_TYPE===`ant`?[{name:`cc_team_improvements`,prompt:`Analyze this Claude Code usage data and suggest product improvements for the CC team.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "improvements": [
    {"title": "Product/tooling improvement", "detail": "3-4 sentences describing the improvement", "evidence": "3-4 sentences with specific session examples"}
  ]
}

Include 2-3 improvements based on friction patterns observed.`,maxTokens:8192},{name:`model_behavior_improvements`,prompt:`Analyze this Claude Code usage data and suggest model behavior improvements.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "improvements": [
    {"title": "Model behavior change", "detail": "3-4 sentences describing what the model should do differently", "evidence": "3-4 sentences with specific examples"}
  ]
}

Include 2-3 improvements based on friction patterns observed.`,maxTokens:8192}]:[],{name:`fun_ending`,prompt:`Analyze this Claude Code usage data and find a memorable moment.

RESPOND WITH ONLY A VALID JSON OBJECT:
{
  "headline": "A memorable QUALITATIVE moment from the transcripts - not a statistic. Something human, funny, or surprising.",
  "detail": "Brief context about when/where this happened"
}

Find something genuinely interesting or amusing from the session summaries.`,maxTokens:8192}],Ie=[`frustrated`,`dissatisfied`,`likely_satisfied`,`satisfied`,`happy`,`unsure`],Le=[`not_achieved`,`partially_achieved`,`mostly_achieved`,`fully_achieved`,`unclear_from_transcript`],$={type:`prompt`,name:`insights`,description:`Generate a report analyzing your CCN sessions`,contentLength:0,progressMessage:`analyzing your sessions`,source:`builtin`,async getPromptForCommand(e){let t=!1,n=[],i=!1;process.env.USER_TYPE===`ant`&&(t=e?.includes(`--homespaces`)??!1,n=await W(),i=n.length>0,t&&i&&console.error(`Collecting sessions from ${n.length} homespace(s): ${n.join(`, `)}...`));let{insights:a,htmlPath:o,data:s,remoteStats:c}=await Pe({collectRemote:t}),l=`file://${o}`,u=``;if(process.env.USER_TYPE===`ant`){let e=new Date().toISOString().replace(/[-:]/g,``).replace(`T`,`_`).slice(0,15),t=`${process.env.SAFEUSER||process.env.USER||`unknown`}_insights_${e}.html`,n=`s3://anthropic-serve/atamkin/cc-user-reports/${t}`,r=`https://s3-frontend.infra.ant.dev/anthropic-serve/atamkin/cc-user-reports/${t}`;l=r;try{pe(`ff`,[`cp`,o,n],{timeout:6e4,stdio:`pipe`})}catch{l=`file://${o}`,u=`\nAutomatic upload failed. Are you on the boron namespace? Try \`use-bo\` and ensure you've run \`sso\`.
To share, run: ff cp ${o} ${n}
Then access at: ${r}`}}let d=[s.total_sessions_scanned&&s.total_sessions_scanned>s.total_sessions?`${s.total_sessions_scanned.toLocaleString()} sessions total · ${s.total_sessions} analyzed`:`${s.total_sessions} sessions`,`${s.total_messages.toLocaleString()} messages`,`${Math.round(s.total_duration_hours)}h`,`${s.git_commits} commits`].join(` · `),p=``;if(process.env.USER_TYPE===`ant`)if(c&&c.totalCopied>0){let e=c.hosts.filter(e=>e.sessionCount>0).map(e=>e.name).join(`, `);p=`\n_Collected ${c.totalCopied} new sessions from: ${e}_\n`}else !t&&i&&(p=`\n_Tip: Run \`/insights --homespaces\` to include sessions from your ${n.length} running homespace(s)_\n`);let m=a.at_a_glance,h=m?`## At a Glance

${m.whats_working?`**What's working:** ${m.whats_working} See _Impressive Things You Did_.`:``}

${m.whats_hindering?`**What's hindering you:** ${m.whats_hindering} See _Where Things Go Wrong_.`:``}

${m.quick_wins?`**Quick wins to try:** ${m.quick_wins} See _Features to Try_.`:``}

${m.ambitious_workflows?`**Ambitious workflows:** ${m.ambitious_workflows} See _On the Horizon_.`:``}`:`_No insights generated_`,g=`${`# ${r()} Insights

${d}
${s.date_range.start} to ${s.date_range.end}
${p}
`}${h}

Your full shareable insights report is ready: ${l}${u}`;return[{type:`text`,text:`The user just ran /insights to generate a usage report analyzing their Claude Code sessions.

Here is the full insights data:
${f(a,null,2)}

Report URL: ${l}
HTML file: ${o}
Facets directory: ${I()}

Here is what the user sees:
${g}

Now output the following message exactly:

<message>
Your shareable insights report is ready:
${l}${u}

Want to dig into any section or try one of the suggestions?
</message>`}]}}}))();export{$ as default};