import{n as e,o as t}from"./chunk-DR8-3Aex.js";import{Rn as n,b as r,f as i,t as a,x as o,xt as s}from"./src-B5EwquZD.js";import{t as c}from"./jsx-runtime-D-D469L8.js";import{SS as l,TS as u}from"./loadAgentsDir-wYwvuOQL.js";import{r as d,t as f}from"./featureCheck-DKigAPal.js";async function p(){let{readObservations:e,loadInstincts:t,resolveProjectContext:n}=await import(`./skillLearning-srJ8LiNU.js`),r=n(process.cwd()),[i,a]=await Promise.all([e({project:r}),t({project:r})]);return[`Skill Learning status for ${r.projectName} (${r.projectId})`,`Observations: ${i.length}`,`Instincts: ${a.length}`,``,`Skill Learning: ${d()?`enabled`:`disabled`}`].join(`
`)}async function m(){let e=[];d()?e.push(`Skill Learning: already enabled`):(process.env.SKILL_LEARNING_ENABLED=`1`,e.push(`Skill Learning: enabled (SKILL_LEARNING_ENABLED=1)`));try{let{initSkillLearning:t}=await import(`./runtimeObserver-C8rfUWnL.js`);t(),e.push(`Runtime observer: initialized`)}catch{e.push(`Runtime observer: init skipped (not available)`)}return e.join(`
`)}async function h(){let e=[];return d()?(process.env.SKILL_LEARNING_ENABLED=`0`,process.env.CLAUDE_SKILL_LEARNING_DISABLE=`1`,e.push(`Skill Learning: disabled (SKILL_LEARNING_ENABLED=0)`)):e.push(`Skill Learning: already disabled`),e.join(`
`)}function g({onDone:e}){u(`skill-panel`);let[t,n]=(0,v.useState)(0),a=(0,v.useMemo)(()=>[{label:`Status`,description:`Show skill learning status for current project`,run:p},{label:`Start`,description:`Enable skill learning for this session`,run:m},{label:`Stop`,description:`Disable skill learning for this session`,run:h},{label:`About`,description:`Detailed description of skill learning features`,run:()=>Promise.resolve(x)}],[]),c=()=>{let n=a[t];n&&n.run().then(t=>{e(t,{display:`system`})})};return s((e,t)=>{if(t.upArrow){n(e=>Math.max(0,e-1));return}if(t.downArrow){n(e=>Math.min(a.length-1,e+1));return}t.return&&c()}),(0,y.jsx)(i,{title:`Skill Learning`,subtitle:`${a.length} actions`,onCancel:()=>e(`Skill panel dismissed`,{display:`system`}),color:`background`,hideInputGuide:!0,children:(0,y.jsxs)(o,{flexDirection:`column`,children:[a.map((e,n)=>(0,y.jsxs)(o,{flexDirection:`row`,children:[(0,y.jsx)(r,{children:`${n===t?`›`:` `} ${e.label}`.padEnd(b)}),(0,y.jsx)(r,{dimColor:!0,children:e.description})]},e.label)),(0,y.jsx)(o,{marginTop:1,children:(0,y.jsx)(r,{dimColor:!0,children:`↑/↓ select · Enter run · Esc close`})})]})})}async function _(e,t,n){let r=n?.trim()??``;if(r===`start`)return e(await m(),{display:`system`}),null;if(r===`stop`)return e(await h(),{display:`system`}),null;if(r===`about`)return e(x,{display:`system`}),null;if(r===`status`)return e(await p(),{display:`system`}),null;if(r){let{call:t}=await import(`./skill-learning-B3nauDRO.js`),n=await t(r,{});return n&&typeof n==`object`&&`value`in n&&e(n.value,{display:`system`}),null}return(0,y.jsx)(g,{onDone:e})}var v,y,b,x;e((()=>{v=t(n(),1),a(),l(),f(),y=c(),b=28,x=`# Skill Learning (自动学习)

Skill Learning 是一个闭环学习系统，通过观察用户的操作模式自动提取直觉(instinct)，
并在达到阈值后生成可复用的 skill 文件、agent 和 command。

## 工作流程
1. **Observe** — 记录每轮对话中的工具调用、用户纠正、错误解决模式
2. **Analyze** — 使用启发式或 LLM 后端分析观察数据，提取 instinct candidate
3. **Evolve** — 将高置信度 instinct 聚类，生成 skill/agent/command 候选
4. **Lifecycle** — 对生成的 skill 进行去重、版本比较、归档或替换

## 子命令
- /skill-learning status       — 查看当前项目的观察和直觉数量
- /skill-learning ingest       — 从 transcript 导入观察数据
- /skill-learning evolve       — 生成 skill 候选 (--generate 写入磁盘)
- /skill-learning export       — 导出 instinct 为 JSON
- /skill-learning import       — 导入 instinct JSON
- /skill-learning prune        — 清理过期的 pending instinct
- /skill-learning promote      — 将 instinct/gap 提升为全局范围
- /skill-learning projects     — 列出所有已知的项目范围

## 启用方式
- SKILL_LEARNING_ENABLED=1 或 FEATURE_SKILL_LEARNING=1
- 状态: ${d()?`已启用`:`未启用`}
`}))();export{_ as call};