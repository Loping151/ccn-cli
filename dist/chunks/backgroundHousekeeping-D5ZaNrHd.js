import{a as e,o as t}from"./chunk-DR8-3Aex.js";import{c as n,n as r}from"./envUtils-3UiS5v1Q.js";import{Ct as i,H as a,X as o,cn as s}from"./state-sIHsFpDu.js";import{Mr as c,Pr as l,S as u,Ua as d,Va as f,go as p,mo as ee,uo as te}from"./paths-C4T5ixO7.js";import{E as ne,J as re,U as m,_ as ie,h,l as g,p as _}from"./debug-B_528_ux.js";import{n as ae,r as v}from"./analytics-DqMQntaB.js";import{n as y,t as oe}from"./cwd--iizewsn.js";import{o as b,s as x,v as S,y as C}from"./log-B_tvJl37.js";import{E as w,O as T,T as se}from"./teammate-VGqAZkIB.js";import{$C as ce,BC as le,Bo as ue,Cx as de,Er as fe,HC as pe,Lr as E,Ot as D,Ox as O,Ro as k,TD as A,Tx as j,Vo as M,_t as N,bD as P,bk as F,cC as I,dO as L,fO as R,gO as z,lu as B,rt as me,sC as he,ts as V,tt as H,tw as ge,uu as _e,wx as ve,xD as ye,yD as be}from"./loadAgentsDir-CzPBSDm_.js";import{Qn as xe,Zn as Se}from"./prompt-DXK9GQ_B.js";import{X as Ce}from"./rcDebugLog-D8jiINbT.js";import{n as we,r as Te}from"./magicDocs-tIVFFVya.js";import{n as Ee,t as De}from"./pluginAutoupdate-B0SjBU-H.js";import{n as Oe,r as ke}from"./registerProtocol-Dc8yrCH9.js";import{homedir as Ae}from"os";import{join as U}from"path";import"crypto";import*as W from"fs/promises";import{Worker as je}from"node:worker_threads";n(),s(),y(),ne(),ie(),g(),C(),ee(),d(),l(),u(),xe(),z(),be(),_e(),E(),Te(),H(),b(),m(),V(),F(),H(),R(),m(),b(),V(),F();async function Me(e,t){if(!e)return;let{join:n}=await import(`path`),r=await import(`fs/promises`),a=n(oe(),`.claude`,`skills`,e,`SKILL.md`),o;try{o=await r.readFile(a,`utf-8`)}catch{x(Error(`Failed to read skill file for improvement: ${a}`));return}let s=t.map(e=>`- ${e.section}: ${e.change}`).join(`
`),l=c(),u=A()?P({sessionId:i(),model:l,provider:f(),name:`skill-improvement-apply`}):null,d=await me({messages:[k({content:`You are editing a skill definition file. Apply the following improvements to the skill.

<current_skill_file>
${o}
</current_skill_file>

<improvements>
${s}
</improvements>

Rules:
- Integrate the improvements naturally into the existing structure
- Preserve frontmatter (--- block) exactly as-is
- Preserve the overall format and style
- Do not remove existing content unless an improvement explicitly replaces it
- Output the complete updated file inside <updated_file> tags`})],systemPrompt:Ce([`You edit skill definition files to incorporate user preferences. Output only the updated file content.`]),thinkingConfig:{type:`disabled`},tools:[],signal:L().signal,options:{getToolPermissionContext:async()=>Se(),model:l,toolChoice:void 0,isNonInteractiveSession:!1,hasAppendSystemPrompt:!1,temperatureOverride:0,agents:[],querySource:`skill_improvement_apply`,mcpTools:[],langfuseTrace:u}});ye(u);let p=ue(M(Array.isArray(d.message.content)?d.message.content:[]).trim(),`updated_file`);if(!p){x(Error(`Skill improvement apply: no updated_file tag in response`));return}try{await r.writeFile(a,p,`utf-8`)}catch(e){x(re(e))}}var Ne=500,Pe=5e3,Fe=15e3,G=!1,Ie=`
const { workerData, parentPort } = require('node:worker_threads')
const fs = require('node:fs')
const path = require('node:path')
const { sab, reportDir, pid, checkMs, stallMs } = workerData
const beat = new BigInt64Array(sab)
let stalledSince = 0
let reportFile = null
setInterval(() => {
  const last = Number(beat[0])
  const lag = Date.now() - last
  if (lag > stallMs) {
    if (stalledSince === 0) {
      stalledSince = last
      try {
        fs.mkdirSync(reportDir, { recursive: true })
        reportFile = path.join(reportDir, 'hang-report-' + new Date(last).toISOString().replace(/[:.]/g, '-') + '.txt')
        fs.writeFileSync(reportFile, [
          'CCN hang report',
          'pid: ' + pid,
          'event loop last beat: ' + new Date(last).toISOString(),
          'detected at: ' + new Date().toISOString(),
          'lag: ' + Math.round(lag / 1000) + 's (threshold ' + Math.round(stallMs / 1000) + 's)',
          '',
          '主事件循环被同步阻塞（Ctrl-C/输入/渲染此时全部停摆）。',
          '取当前 JS 栈：另开终端执行  kill -USR1 ' + pid,
          '然后  node inspect -p ' + pid + '  （或 chrome://inspect）attach 后 pause 查看。',
          '',
        ].join('\\n'))
      } catch {}
    } else if (reportFile) {
      try { fs.appendFileSync(reportFile, 'still stalled: lag ' + Math.round(lag / 1000) + 's at ' + new Date().toISOString() + '\\n') } catch {}
    }
  } else if (stalledSince !== 0) {
    if (reportFile) {
      try { fs.appendFileSync(reportFile, 'recovered after ' + Math.round((Date.now() - stalledSince) / 1000) + 's at ' + new Date().toISOString() + '\\n') } catch {}
    }
    stalledSince = 0
    reportFile = null
  }
}, checkMs)
`;function Le(e){if(!G&&process.env.CCN_HANG_WATCHDOG!==`0`){G=!0;try{let t=new SharedArrayBuffer(8),n=new BigInt64Array(t);n[0]=BigInt(Date.now()),setInterval(()=>{n[0]=BigInt(Date.now())},Ne).unref?.();let r=new je(Ie,{eval:!0,workerData:{sab:t,reportDir:e,pid:process.pid,checkMs:Pe,stallMs:Fe}});r.unref(),r.on(`error`,e=>{_(`[hangWatchdog] worker error: ${e.message}`)})}catch(e){_(`[hangWatchdog] init failed: ${e instanceof Error?e.message:String(e)}`)}}}ae(),g(),pe(),se(),b(),j(),I(),ve(),ge(),D();var Re=30;function K(){let e=((te()||{}).cleanupPeriodDays??Re)*24*60*60*1e3;return new Date(Date.now()-e)}function ze(e,t){return{messages:e.messages+t.messages,errors:e.errors+t.errors}}function Be(e){let t=e.split(`.`)[0].replace(/T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/,`T$1:$2:$3.$4Z`);return new Date(t)}async function q(e,t,n){let r={messages:0,errors:0};try{let i=await h().readdir(e);for(let a of i)try{Be(a.name)<t&&(await h().unlink(U(e,a.name)),n?r.messages++:r.errors++)}catch(e){x(e)}}catch(e){e instanceof Error&&`code`in e&&e.code!==`ENOENT`&&x(e)}return r}async function Ve(){let e=h(),t=K(),n=S.errors(),r=S.baseLogs(),i=await q(n,t,!1);try{let n;try{n=await e.readdir(r)}catch{return i}let a=n.filter(e=>e.isDirectory()&&e.name.startsWith(`mcp-logs-`)).map(e=>U(r,e.name));for(let n of a)i=ze(i,await q(n,t,!0)),await Y(n,e)}catch(e){e instanceof Error&&`code`in e&&e.code!==`ENOENT`&&x(e)}return i}async function J(e,t,n){return(await n.stat(e)).mtime<t?(await n.unlink(e),!0):!1}async function Y(e,t){try{await t.rmdir(e)}catch{}}async function He(){let e=K(),t={messages:0,errors:0},n=fe(),r=h(),i;try{i=await r.readdir(n)}catch{return t}for(let a of i){if(!a.isDirectory())continue;let i=U(n,a.name),o;try{o=await r.readdir(i)}catch{t.errors++;continue}for(let n of o)if(n.isFile()){if(!n.name.endsWith(`.jsonl`)&&!n.name.endsWith(`.cast`))continue;try{await J(U(i,n.name),e,r)&&t.messages++}catch{t.errors++}}else if(n.isDirectory()){let a=U(i,n.name),o=U(a,ce),s;try{s=await r.readdir(o)}catch{await Y(a,r);continue}for(let n of s)if(n.isFile())try{await J(U(o,n.name),e,r)&&t.messages++}catch{t.errors++}else if(n.isDirectory()){let i=U(o,n.name),a;try{a=await r.readdir(i)}catch{continue}for(let n of a)if(n.isFile())try{await J(U(i,n.name),e,r)&&t.messages++}catch{t.errors++}await Y(i,r)}await Y(o,r),await Y(a,r)}await Y(i,r)}return t}async function Ue(e,t,n=!0){let r=K(),i={messages:0,errors:0},a=h(),o;try{o=await a.readdir(e)}catch{return i}for(let n of o)if(!(!n.isFile()||!n.name.endsWith(t)))try{await J(U(e,n.name),r,a)&&i.messages++}catch{i.errors++}return n&&await Y(e,a),i}function X(){return Ue(U(r(),`plans`),`.md`)}async function We(){let e=K(),t={messages:0,errors:0},n=h();try{let i=U(r(),`file-history`),a;try{a=await n.readdir(i)}catch{return t}let o=a.filter(e=>e.isDirectory()).map(e=>U(i,e.name));await Promise.all(o.map(async r=>{try{(await n.stat(r)).mtime<e&&(await n.rm(r,{recursive:!0,force:!0}),t.messages++)}catch{t.errors++}})),await Y(i,n)}catch(e){x(e)}return t}async function Ge(){let e=K(),t={messages:0,errors:0},n=h();try{let i=U(r(),`session-env`),a;try{a=await n.readdir(i)}catch{return t}let o=a.filter(e=>e.isDirectory()).map(e=>U(i,e.name));for(let r of o)try{(await n.stat(r)).mtime<e&&(await n.rm(r,{recursive:!0,force:!0}),t.messages++)}catch{t.errors++}await Y(i,n)}catch(e){x(e)}return t}async function Ke(){let e=K(),t={messages:0,errors:0},n=h(),i=U(r(),`debug`),a;try{a=await n.readdir(i)}catch{return t}for(let r of a)if(!(!r.isFile()||!r.name.endsWith(`.txt`)||r.name===`latest`))try{await J(U(i,r.name),e,n)&&t.messages++}catch{t.errors++}return t}var Z=1440*60*1e3;async function Q(){let e=U(r(),`.npm-cache-cleanup`);try{let t=await W.stat(e);if(Date.now()-t.mtimeMs<Z){_(`npm cache cleanup: skipping, ran recently`);return}}catch{}try{await w(e,{retries:0,realpath:!1})}catch{_(`npm cache cleanup: skipping, lock held`);return}_(`npm cache cleanup: starting`);let n=U(Ae(),`.npm`,`_cacache`),i=Date.now();try{let r=await import(`./lib-inCisXen.js`).then(e=>t(e.default,1)),a=i-Z,o=r.ls.stream(n),s=[];for await(let e of o)e.key.includes(`@anthropic-ai/claude-`)&&s.push({key:e.key,time:e.time});let c=new Map;for(let e of s){let t=e.key.lastIndexOf(`@`),n=t>0?e.key.slice(0,t):e.key,r=c.get(n)??[];r.push(e),c.set(n,r)}let l=[];for(let[,e]of c){e.sort((e,t)=>t.time-e.time);for(let t=0;t<e.length;t++){let n=e[t];(n.time<a||t>=5)&&l.push(n.key)}}await Promise.all(l.map(e=>r.rm.entry(n,e))),await W.writeFile(e,new Date().toISOString());let u=Date.now()-i;l.length>0?_(`npm cache cleanup: Removed ${l.length} old @anthropic-ai entries in ${u}ms`):_(`npm cache cleanup: completed in ${u}ms`),v(`tengu_npm_cache_cleanup`,{success:!0,durationMs:u,entriesRemoved:l.length})}catch(e){x(e),v(`tengu_npm_cache_cleanup`,{success:!1,durationMs:Date.now()-i})}finally{await T(e,{realpath:!1}).catch(()=>{})}}async function qe(){let e=U(r(),`.version-cleanup`);try{let t=await W.stat(e);if(Date.now()-t.mtimeMs<Z){_(`version cleanup: skipping, ran recently`);return}}catch{}try{await w(e,{retries:0,realpath:!1})}catch{_(`version cleanup: skipping, lock held`);return}_(`version cleanup: starting (throttled)`);try{await O(),await W.writeFile(e,new Date().toISOString())}catch(e){x(e)}finally{await T(e,{realpath:!1}).catch(()=>{})}}async function Je(){let{errors:e}=de();if(e.length>0&&p(`cleanupPeriodDays`)){_(`Skipping cleanup: settings have validation errors but cleanupPeriodDays was explicitly set. Fix settings errors to enable cleanup.`);return}await Ve(),await He(),await X(),await We(),await Ge(),await Ke(),await le(),await he(K());let t=await N(K());t>0&&v(`tengu_worktree_cleanup`,{removed:t}),process.env.USER_TYPE===`ant`&&await Q()}s(),n(),j(),Ee();var Ye=(Oe(),e(ke)),Xe=1440*60*1e3,$=600*1e3;function Ze(){a()&&Le(r()),we(),import(`./extractMemories-2h3pUYYo.js`).then(({initExtractMemories:e})=>{e()}).catch(()=>{}),B(),De(),a()&&Ye.ensureDeepLinkProtocolRegistered();let e=!0;async function t(){if(a()&&o()>Date.now()-1e3*60){setTimeout(t,$).unref();return}if(e&&(e=!1,await Je()),a()&&o()>Date.now()-1e3*60){setTimeout(t,$).unref();return}await O()}setTimeout(t,$).unref(),process.env.USER_TYPE===`ant`&&setInterval(()=>{Q(),qe()},Xe).unref()}export{Me as n,Ze as t};