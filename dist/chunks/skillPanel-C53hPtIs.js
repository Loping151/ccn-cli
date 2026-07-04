import{n as e,o as t}from"./chunk-DR8-3Aex.js";import{Rn as n,b as r,f as i,t as a,x as o,xt as s}from"./src-D27W8oyB.js";import{t as c}from"./jsx-runtime-D-D469L8.js";import{li as l,ui as u}from"./paths-CEBN0NNM.js";import{OS as d,jS as f}from"./loadAgentsDir-F091gZuA.js";import{r as p,t as m}from"./featureCheck-j7P30mry.js";function h(){let e=p();return l()===`zh`?`# Skill Learning (自动学习)

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
- 状态: ${e?`已启用`:`未启用`}
`:`# Skill Learning

Skill Learning is a closed-loop learning system that observes your usage patterns to
automatically extract instincts, and once a threshold is reached generates reusable
skill files, agents and commands.

## Workflow
1. **Observe** — record tool calls, user corrections and error-resolution patterns each turn
2. **Analyze** — analyze observations with a heuristic or LLM backend to extract instinct candidates
3. **Evolve** — cluster high-confidence instincts into skill/agent/command candidates
4. **Lifecycle** — dedupe, version-compare, archive or replace generated skills

## Subcommands
- /skill-learning status       — show observation & instinct counts for the current project
- /skill-learning ingest       — import observations from the transcript
- /skill-learning evolve       — generate skill candidates (--generate writes to disk)
- /skill-learning export       — export instincts as JSON
- /skill-learning import       — import instincts JSON
- /skill-learning prune        — clean up expired pending instincts
- /skill-learning promote      — promote an instinct/gap to global scope
- /skill-learning projects     — list all known project scopes

## Enable
- SKILL_LEARNING_ENABLED=1 or FEATURE_SKILL_LEARNING=1
- Status: ${e?`enabled`:`disabled`}
`}async function g(){let{readObservations:e,loadInstincts:t,resolveProjectContext:n}=await import(`./skillLearning-_3EYgPHG.js`),r=n(process.cwd()),[i,a]=await Promise.all([e({project:r}),t({project:r})]);return[`Skill Learning status for ${r.projectName} (${r.projectId})`,`Observations: ${i.length}`,`Instincts: ${a.length}`,``,`Skill Learning: ${p()?`enabled`:`disabled`}`].join(`
`)}async function _(){let e=[];p()?e.push(`Skill Learning: already enabled`):(process.env.SKILL_LEARNING_ENABLED=`1`,e.push(`Skill Learning: enabled (SKILL_LEARNING_ENABLED=1)`));try{let{initSkillLearning:t}=await import(`./runtimeObserver-CVlEmSfj.js`);t(),e.push(`Runtime observer: initialized`)}catch{e.push(`Runtime observer: init skipped (not available)`)}return e.join(`
`)}async function v(){let e=[];return p()?(process.env.SKILL_LEARNING_ENABLED=`0`,process.env.CLAUDE_SKILL_LEARNING_DISABLE=`1`,e.push(`Skill Learning: disabled (SKILL_LEARNING_ENABLED=0)`)):e.push(`Skill Learning: already disabled`),e.join(`
`)}function y({onDone:e}){f(`skill-panel`);let[t,n]=(0,x.useState)(0),a=(0,x.useMemo)(()=>[{label:`Status`,description:`Show skill learning status for current project`,run:g},{label:`Start`,description:`Enable skill learning for this session`,run:_},{label:`Stop`,description:`Disable skill learning for this session`,run:v},{label:`About`,description:`Detailed description of skill learning features`,run:()=>Promise.resolve(h())}],[]),c=()=>{let n=a[t];n&&n.run().then(t=>{e(t,{display:`system`})})};return s((e,t)=>{if(t.upArrow){n(e=>Math.max(0,e-1));return}if(t.downArrow){n(e=>Math.min(a.length-1,e+1));return}t.return&&c()}),(0,S.jsx)(i,{title:`Skill Learning`,subtitle:`${a.length} actions`,onCancel:()=>e(`Skill panel dismissed`,{display:`system`}),color:`background`,hideInputGuide:!0,children:(0,S.jsxs)(o,{flexDirection:`column`,children:[a.map((e,n)=>(0,S.jsxs)(o,{flexDirection:`row`,children:[(0,S.jsx)(r,{children:`${n===t?`›`:` `} ${e.label}`.padEnd(C)}),(0,S.jsx)(r,{dimColor:!0,children:e.description})]},e.label)),(0,S.jsx)(o,{marginTop:1,children:(0,S.jsx)(r,{dimColor:!0,children:`↑/↓ select · Enter run · Esc close`})})]})})}async function b(e,t,n){let r=n?.trim()??``;if(r===`start`)return e(await _(),{display:`system`}),null;if(r===`stop`)return e(await v(),{display:`system`}),null;if(r===`about`)return e(h(),{display:`system`}),null;if(r===`status`)return e(await g(),{display:`system`}),null;if(r){let{call:t}=await import(`./skill-learning-BVHnqa6l.js`),n=await t(r,{});return n&&typeof n==`object`&&`value`in n&&e(n.value,{display:`system`}),null}return(0,S.jsx)(y,{onDone:e})}var x,S,C;e((()=>{x=t(n(),1),a(),d(),m(),u(),S=c(),C=28}))();export{b as call};