import{n as e,o as t}from"./chunk-DR8-3Aex.js";import{Rn as n,b as r,f as i,t as a,x as o,xt as s}from"./src-B5EwquZD.js";import{t as c}from"./jsx-runtime-D-D469L8.js";import{SS as l,TS as u,dg as d,fg as f}from"./loadAgentsDir-CqugsQzh.js";function p(){return[`Skill Search (自动技能匹配)`,`Status: ${f()?`enabled`:`disabled`}`,``,`When enabled, relevant skills are automatically matched and`,`injected into conversation context each turn.`].join(`
`)}async function m(){if(f()&&process.env.SKILL_SEARCH_ENABLED!==`0`)return`Skill Search: already enabled`;process.env.SKILL_SEARCH_ENABLED=`1`;let e=[`Skill Search: enabled (SKILL_SEARCH_ENABLED=1)`];try{let{clearSkillIndexCache:t}=await import(`./localSearch-2fjVRrf-.js`);t(),e.push(`Skill index cache: cleared (will rebuild on next search)`)}catch{e.push(`Skill index cache: clear skipped`)}return e.join(`
`)}async function h(){return f()?(process.env.SKILL_SEARCH_ENABLED=`0`,`Skill Search: disabled (SKILL_SEARCH_ENABLED=0)`):`Skill Search: already disabled`}function g({onDone:e}){u(`skill-search-panel`);let[t,n]=(0,v.useState)(0),a=(0,v.useMemo)(()=>[{label:`Status`,description:`Show whether automatic skill matching is active`,run:()=>Promise.resolve(p())},{label:`Start`,description:`Enable automatic skill matching for this session`,run:m},{label:`Stop`,description:`Disable automatic skill matching for this session`,run:h},{label:`About`,description:`How automatic skill matching works`,run:()=>Promise.resolve(x)}],[]),c=()=>{let n=a[t];n&&n.run().then(t=>{e(t,{display:`system`})})};return s((e,t)=>{if(t.upArrow){n(e=>Math.max(0,e-1));return}if(t.downArrow){n(e=>Math.min(a.length-1,e+1));return}t.return&&c()}),(0,y.jsx)(i,{title:`Skill Search`,subtitle:`${a.length} actions`,onCancel:()=>e(`Skill search panel dismissed`,{display:`system`}),color:`background`,hideInputGuide:!0,children:(0,y.jsxs)(o,{flexDirection:`column`,children:[a.map((e,n)=>(0,y.jsxs)(o,{flexDirection:`row`,children:[(0,y.jsx)(r,{children:`${n===t?`›`:` `} ${e.label}`.padEnd(b)}),(0,y.jsx)(r,{dimColor:!0,children:e.description})]},e.label)),(0,y.jsx)(o,{marginTop:1,children:(0,y.jsx)(r,{dimColor:!0,children:`↑/↓ select · Enter run · Esc close`})})]})})}async function _(e,t,n){let r=n?.trim()??``;return r===`start`?(e(await m(),{display:`system`}),null):r===`stop`?(e(await h(),{display:`system`}),null):r===`about`?(e(x,{display:`system`}),null):r===`status`?(e(p(),{display:`system`}),null):(0,y.jsx)(g,{onDone:e})}var v,y,b,x;e((()=>{v=t(n(),1),a(),l(),d(),y=c(),b=28,x=`# Skill Search (自动技能匹配)

Skill Search 控制对话中的自动技能匹配功能。

启用后，Claude Code 会在每轮对话中自动搜索并加载与当前任务最相关的 skill 文件，
无需手动指定。搜索基于 TF-IDF 向量余弦相似度，支持英文词干化和 CJK bi-gram 分词。

## 工作原理
1. 对话开始时，自动索引 .claude/skills/ 和 ~/.claude/skills/ 下的 Markdown 文件
2. 每轮对话根据上下文自动匹配最相关的 skill
3. 匹配到的 skill 内容会作为上下文注入，指导 Claude Code 的行为

## 控制方式
- /skill-search start  — 启用自动匹配
- /skill-search stop   — 禁用自动匹配
- /skill-search status — 查看当前状态

当前状态: ${f()?`已启用`:`未启用`}
`}))();export{_ as call};