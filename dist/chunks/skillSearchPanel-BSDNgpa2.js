import{n as e,o as t}from"./chunk-DR8-3Aex.js";import{Hr as n,Vr as r}from"./paths-CjAPXmxs.js";import{Rn as i,b as a,f as o,t as s,x as c,xt as l}from"./src-Kfqxxbsd.js";import{t as u}from"./jsx-runtime-BLYyAvvR.js";import{OS as d,hg as f,jS as p,mg as m}from"./loadAgentsDir-weYU9_ci.js";function h(){let e=f();return r()===`zh`?`# Skill Search (自动技能匹配)

Skill Search 控制对话中的自动技能匹配功能。

启用后，CCN 会在每轮对话中自动搜索并加载与当前任务最相关的 skill 文件，
无需手动指定。搜索基于 TF-IDF 向量余弦相似度，支持英文词干化和 CJK bi-gram 分词。

## 工作原理
1. 对话开始时，自动索引 .claude/skills/ 和 ~/.claude/skills/ 下的 Markdown 文件
2. 每轮对话根据上下文自动匹配最相关的 skill
3. 匹配到的 skill 内容会作为上下文注入，指导 CCN 的行为

## 控制方式
- /skill-search start  — 启用自动匹配
- /skill-search stop   — 禁用自动匹配
- /skill-search status — 查看当前状态

当前状态: ${e?`已启用`:`未启用`}
`:`# Skill Search

Skill Search controls automatic skill matching during a conversation.

When enabled, CCN automatically searches and loads the skill files most relevant to
the current task each turn — no manual selection needed. Matching uses TF-IDF vector
cosine similarity, with English stemming and CJK bi-gram tokenization.

## How it works
1. At conversation start, index the Markdown files under .claude/skills/ and ~/.claude/skills/
2. Each turn, match the most relevant skill based on context
3. Matched skill content is injected as context to guide CCN's behavior

## Controls
- /skill-search start  — enable auto-matching
- /skill-search stop   — disable auto-matching
- /skill-search status — show current state

Current state: ${e?`enabled`:`disabled`}
`}function g(){return[`Skill Search`,`Status: ${f()?`enabled`:`disabled`}`,``,`When enabled, relevant skills are automatically matched and`,`injected into conversation context each turn.`].join(`
`)}async function _(){if(f()&&process.env.SKILL_SEARCH_ENABLED!==`0`)return`Skill Search: already enabled`;process.env.SKILL_SEARCH_ENABLED=`1`;let e=[`Skill Search: enabled (SKILL_SEARCH_ENABLED=1)`];try{let{clearSkillIndexCache:t}=await import(`./localSearch-BlLdeg_N.js`);t(),e.push(`Skill index cache: cleared (will rebuild on next search)`)}catch{e.push(`Skill index cache: clear skipped`)}return e.join(`
`)}async function v(){return f()?(process.env.SKILL_SEARCH_ENABLED=`0`,`Skill Search: disabled (SKILL_SEARCH_ENABLED=0)`):`Skill Search: already disabled`}function y({onDone:e}){p(`skill-search-panel`);let[t,n]=(0,x.useState)(0),r=(0,x.useMemo)(()=>[{label:`Status`,description:`Show whether automatic skill matching is active`,run:()=>Promise.resolve(g())},{label:`Start`,description:`Enable automatic skill matching for this session`,run:_},{label:`Stop`,description:`Disable automatic skill matching for this session`,run:v},{label:`About`,description:`How automatic skill matching works`,run:()=>Promise.resolve(h())}],[]),i=()=>{let n=r[t];n&&n.run().then(t=>{e(t,{display:`system`})})};return l((e,t)=>{if(t.upArrow){n(e=>Math.max(0,e-1));return}if(t.downArrow){n(e=>Math.min(r.length-1,e+1));return}t.return&&i()}),(0,S.jsx)(o,{title:`Skill Search`,subtitle:`${r.length} actions`,onCancel:()=>e(`Skill search panel dismissed`,{display:`system`}),color:`background`,hideInputGuide:!0,children:(0,S.jsxs)(c,{flexDirection:`column`,children:[r.map((e,n)=>(0,S.jsxs)(c,{flexDirection:`row`,children:[(0,S.jsx)(a,{children:`${n===t?`›`:` `} ${e.label}`.padEnd(C)}),(0,S.jsx)(a,{dimColor:!0,children:e.description})]},e.label)),(0,S.jsx)(c,{marginTop:1,children:(0,S.jsx)(a,{dimColor:!0,children:`↑/↓ select · Enter run · Esc close`})})]})})}async function b(e,t,n){let r=n?.trim()??``;return r===`start`?(e(await _(),{display:`system`}),null):r===`stop`?(e(await v(),{display:`system`}),null):r===`about`?(e(h(),{display:`system`}),null):r===`status`?(e(g(),{display:`system`}),null):(0,S.jsx)(y,{onDone:e})}var x,S,C;e((()=>{x=t(i(),1),s(),d(),m(),n(),S=u(),C=28}))();export{b as call};