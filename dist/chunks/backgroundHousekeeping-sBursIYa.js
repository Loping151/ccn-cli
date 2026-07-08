import{a as e,o as t}from"./chunk-DR8-3Aex.js";import{c as n,n as r}from"./envUtils-3UiS5v1Q.js";import{Aa as i,Js as a,Ma as o,S as s,Ss as c,Ws as l,Xs as u,bs as d,dr as ee,ja as f,pr as p}from"./paths-CjAPXmxs.js";import{H as m,St as h,X as g,sn as _}from"./state-CH3cCJC5.js";import{E as te,J as ne,U as v,_ as re,h as y,l as b,p as x}from"./debug-DMnLghM9.js";import{t as ie}from"./analytics-Oq2xIXA0.js";import{n as ae,t as oe}from"./cwd-BdGW8lQx.js";import{o as S,s as C,v as w,y as se}from"./log-Byk9APYD.js";import{AD as ce,Ak as T,Ax as le,EO as ue,Er as de,FD as fe,JC as E,KC as D,Lr as O,OD as k,Ot as A,Px as j,SO as M,Uo as N,Vo as P,Wo as F,_t as I,aw as L,fu as R,is as z,jx as B,kD as V,kx as pe,mC as me,pC as he,pu as ge,rt as _e,sw as ve,tt as H,xO as ye}from"./loadAgentsDir-weYU9_ci.js";import{Qn as be,Zn as xe}from"./prompt-DCHFK54u.js";import{X as Se}from"./rcDebugLog-DbZbUV-c.js";import{n as Ce,r as we}from"./magicDocs-CtIdUNcB.js";import{n as Te,t as Ee}from"./pluginAutoupdate-BizurrbZ.js";import{n as De,r as Oe}from"./registerProtocol-C8yaS6l8.js";import{homedir as ke}from"os";import{join as U}from"path";import"crypto";import*as W from"fs/promises";import{Worker as Ae}from"node:worker_threads";n(),_(),ae(),te(),re(),b(),se(),a(),c(),p(),s(),be(),ue(),k(),ge(),O(),we(),H(),S(),v(),z(),T(),H(),M(),v(),S(),z(),T();async function je(e,t){if(!e)return;let{join:n}=await import(`path`),r=await import(`fs/promises`),i=n(oe(),`.claude`,`skills`,e,`SKILL.md`),a;try{a=await r.readFile(i,`utf-8`)}catch{C(Error(`Failed to read skill file for improvement: ${i}`));return}let o=t.map(e=>`- ${e.section}: ${e.change}`).join(`
`),s=ee(),c=fe()?V({sessionId:h(),model:s,provider:d(),name:`skill-improvement-apply`}):null,l=await _e({messages:[P({content:`You are editing a skill definition file. Apply the following improvements to the skill.

<current_skill_file>
${a}
</current_skill_file>

<improvements>
${o}
</improvements>

Rules:
- Integrate the improvements naturally into the existing structure
- Preserve frontmatter (--- block) exactly as-is
- Preserve the overall format and style
- Do not remove existing content unless an improvement explicitly replaces it
- Output the complete updated file inside <updated_file> tags`})],systemPrompt:Se([`You edit skill definition files to incorporate user preferences. Output only the updated file content.`]),thinkingConfig:{type:`disabled`},tools:[],signal:ye().signal,options:{getToolPermissionContext:async()=>xe(),model:s,toolChoice:void 0,isNonInteractiveSession:!1,hasAppendSystemPrompt:!1,temperatureOverride:0,agents:[],querySource:`skill_improvement_apply`,mcpTools:[],langfuseTrace:c}});ce(c);let u=N(F(Array.isArray(l.message.content)?l.message.content:[]).trim(),`updated_file`);if(!u){C(Error(`Skill improvement apply: no updated_file tag in response`));return}try{await r.writeFile(i,u,`utf-8`)}catch(e){C(ne(e))}}var Me=500,Ne=5e3,Pe=15e3,G=!1,Fe=`
const { workerData, parentPort } = require('node:worker_threads')
const fs = require('node:fs')
const path = require('node:path')
const { sab, reportDir, pid, checkMs, stallMs } = workerData
const beat = new BigInt64Array(sab)
let stalledSince = 0
let reportFile = null
let lastCheck = Date.now()
setInterval(() => {
  const now = Date.now()
  // 自身也滞后 = 整机冻结（系统休眠/挂起），不是主循环卡死——跳过本轮，
  // 否则每次合盖睡眠都会误报一份 hang report。
  const selfLag = now - lastCheck - checkMs
  lastCheck = now
  if (selfLag > stallMs / 2) return
  const last = Number(Atomics.load(beat, 0))
  const lag = now - last
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
`;function Ie(e){if(!G&&process.env.CCN_HANG_WATCHDOG!==`0`){G=!0;try{let t=new SharedArrayBuffer(8),n=new BigInt64Array(t);Atomics.store(n,0,BigInt(Date.now())),setInterval(()=>{Atomics.store(n,0,BigInt(Date.now()))},Me).unref?.();let r=new Ae(Fe,{eval:!0,workerData:{sab:t,reportDir:e,pid:process.pid,checkMs:Ne,stallMs:Pe}});r.unref(),r.on(`error`,e=>{x(`[hangWatchdog] worker error: ${e.message}`)})}catch(e){x(`[hangWatchdog] init failed: ${e instanceof Error?e.message:String(e)}`)}}}ie(),b(),E(),i(),S(),B(),me(),le(),ve(),A();var Le=30;function K(){let e=((l()||{}).cleanupPeriodDays??Le)*24*60*60*1e3;return new Date(Date.now()-e)}function Re(e,t){return{messages:e.messages+t.messages,errors:e.errors+t.errors}}function ze(e){let t=e.split(`.`)[0].replace(/T(\d{2})-(\d{2})-(\d{2})-(\d{3})Z/,`T$1:$2:$3.$4Z`);return new Date(t)}async function q(e,t,n){let r={messages:0,errors:0};try{let i=await y().readdir(e);for(let a of i)try{ze(a.name)<t&&(await y().unlink(U(e,a.name)),n?r.messages++:r.errors++)}catch(e){C(e)}}catch(e){e instanceof Error&&`code`in e&&e.code!==`ENOENT`&&C(e)}return r}async function Be(){let e=y(),t=K(),n=w.errors(),r=w.baseLogs(),i=await q(n,t,!1);try{let n;try{n=await e.readdir(r)}catch{return i}let a=n.filter(e=>e.isDirectory()&&e.name.startsWith(`mcp-logs-`)).map(e=>U(r,e.name));for(let n of a)i=Re(i,await q(n,t,!0)),await Y(n,e)}catch(e){e instanceof Error&&`code`in e&&e.code!==`ENOENT`&&C(e)}return i}async function J(e,t,n){return(await n.stat(e)).mtime<t?(await n.unlink(e),!0):!1}async function Y(e,t){try{await t.rmdir(e)}catch{}}async function Ve(){let e=K(),t={messages:0,errors:0},n=de(),r=y(),i;try{i=await r.readdir(n)}catch{return t}for(let a of i){if(!a.isDirectory())continue;let i=U(n,a.name),o;try{o=await r.readdir(i)}catch{t.errors++;continue}for(let n of o)if(n.isFile()){if(!n.name.endsWith(`.jsonl`)&&!n.name.endsWith(`.cast`))continue;try{await J(U(i,n.name),e,r)&&t.messages++}catch{t.errors++}}else if(n.isDirectory()){let a=U(i,n.name),o=U(a,L),s;try{s=await r.readdir(o)}catch{await Y(a,r);continue}for(let n of s)if(n.isFile())try{await J(U(o,n.name),e,r)&&t.messages++}catch{t.errors++}else if(n.isDirectory()){let i=U(o,n.name),a;try{a=await r.readdir(i)}catch{continue}for(let n of a)if(n.isFile())try{await J(U(i,n.name),e,r)&&t.messages++}catch{t.errors++}await Y(i,r)}await Y(o,r),await Y(a,r)}await Y(i,r)}return t}async function He(e,t,n=!0){let r=K(),i={messages:0,errors:0},a=y(),o;try{o=await a.readdir(e)}catch{return i}for(let n of o)if(!(!n.isFile()||!n.name.endsWith(t)))try{await J(U(e,n.name),r,a)&&i.messages++}catch{i.errors++}return n&&await Y(e,a),i}function Ue(){return He(U(r(),`plans`),`.md`)}async function We(){let e=K(),t={messages:0,errors:0},n=y();try{let i=U(r(),`file-history`),a;try{a=await n.readdir(i)}catch{return t}let o=a.filter(e=>e.isDirectory()).map(e=>U(i,e.name));await Promise.all(o.map(async r=>{try{(await n.stat(r)).mtime<e&&(await n.rm(r,{recursive:!0,force:!0}),t.messages++)}catch{t.errors++}})),await Y(i,n)}catch(e){C(e)}return t}async function X(){let e=K(),t={messages:0,errors:0},n=y();try{let i=U(r(),`session-env`),a;try{a=await n.readdir(i)}catch{return t}let o=a.filter(e=>e.isDirectory()).map(e=>U(i,e.name));for(let r of o)try{(await n.stat(r)).mtime<e&&(await n.rm(r,{recursive:!0,force:!0}),t.messages++)}catch{t.errors++}await Y(i,n)}catch(e){C(e)}return t}async function Ge(){let e=K(),t={messages:0,errors:0},n=y(),i=U(r(),`debug`),a;try{a=await n.readdir(i)}catch{return t}for(let r of a)if(!(!r.isFile()||!r.name.endsWith(`.txt`)||r.name===`latest`))try{await J(U(i,r.name),e,n)&&t.messages++}catch{t.errors++}return t}var Z=1440*60*1e3;async function Q(){let e=U(r(),`.npm-cache-cleanup`);try{let t=await W.stat(e);if(Date.now()-t.mtimeMs<Z){x(`npm cache cleanup: skipping, ran recently`);return}}catch{}try{await f(e,{retries:0,realpath:!1})}catch{x(`npm cache cleanup: skipping, lock held`);return}x(`npm cache cleanup: starting`);let n=U(ke(),`.npm`,`_cacache`),i=Date.now();try{let r=await import(`./lib-BQtIT_8x.js`).then(e=>t(e.default,1)),a=i-Z,o=r.ls.stream(n),s=[];for await(let e of o)e.key.includes(`@anthropic-ai/claude-`)&&s.push({key:e.key,time:e.time});let c=new Map;for(let e of s){let t=e.key.lastIndexOf(`@`),n=t>0?e.key.slice(0,t):e.key,r=c.get(n)??[];r.push(e),c.set(n,r)}let l=[];for(let[,e]of c){e.sort((e,t)=>t.time-e.time);for(let t=0;t<e.length;t++){let n=e[t];(n.time<a||t>=5)&&l.push(n.key)}}await Promise.all(l.map(e=>r.rm.entry(n,e))),await W.writeFile(e,new Date().toISOString());let u=Date.now()-i;l.length>0?x(`npm cache cleanup: Removed ${l.length} old @anthropic-ai entries in ${u}ms`):x(`npm cache cleanup: completed in ${u}ms`),l.length}catch(e){C(e),Date.now()-i}finally{await o(e,{realpath:!1}).catch(()=>{})}}async function Ke(){let e=U(r(),`.version-cleanup`);try{let t=await W.stat(e);if(Date.now()-t.mtimeMs<Z){x(`version cleanup: skipping, ran recently`);return}}catch{}try{await f(e,{retries:0,realpath:!1})}catch{x(`version cleanup: skipping, lock held`);return}x(`version cleanup: starting (throttled)`);try{await j(),await W.writeFile(e,new Date().toISOString())}catch(e){C(e)}finally{await o(e,{realpath:!1}).catch(()=>{})}}async function qe(){let{errors:e}=pe();if(e.length>0&&u(`cleanupPeriodDays`)){x(`Skipping cleanup: settings have validation errors but cleanupPeriodDays was explicitly set. Fix settings errors to enable cleanup.`);return}await Be(),await Ve(),await Ue(),await We(),await X(),await Ge(),await D(),await he(K()),await I(K()),process.env.USER_TYPE===`ant`&&await Q()}_(),n(),B(),Te();var Je=(De(),e(Oe)),Ye=1440*60*1e3,$=600*1e3;function Xe(){m()&&Ie(r()),Ce(),import(`./extractMemories-Ce4nCcoY.js`).then(({initExtractMemories:e})=>{e()}).catch(()=>{}),R(),Ee(),m()&&Je.ensureDeepLinkProtocolRegistered();let e=!0;async function t(){if(m()&&g()>Date.now()-1e3*60){setTimeout(t,$).unref();return}if(e&&(e=!1,await qe()),m()&&g()>Date.now()-1e3*60){setTimeout(t,$).unref();return}await j()}setTimeout(t,$).unref(),process.env.USER_TYPE===`ant`&&setInterval(()=>{Q(),Ke()},Ye).unref()}export{je as n,Xe as t};