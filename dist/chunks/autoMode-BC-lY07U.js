import{Dr as e,Ir as t,Sr as n,Ya as r,kr as i,uo as a}from"./paths-BCLOFUyJ.js";import{E as o,O as s,U as c,z as l}from"./debug-DMnLghM9.js";import{av as u,iv as d,nv as f,rv as p,tv as m}from"./loadAgentsDir-C1gahWcl.js";import{n as h,t as g}from"./poorMode-BG3rwYCI.js";c(),i(),p(),a(),g(),d(),o();function _(e){process.stdout.write(s(e,null,2)+`
`)}function v(){_(f())}function y(){let e=r(),t=f();_({allow:e?.allow?.length?e.allow:t.allow,soft_deny:e?.soft_deny?.length?e.soft_deny:t.soft_deny,environment:e?.environment?.length?e.environment:t.environment})}var b=`You are an expert reviewer of auto mode classifier rules for Claude Code.

Claude Code has an "auto mode" that uses an AI classifier to decide whether tool calls should be auto-approved or require user confirmation. Users can write custom rules in three categories:

- **allow**: Actions the classifier should auto-approve
- **soft_deny**: Actions the classifier should block (require user confirmation)
- **environment**: Context about the user's setup that helps the classifier make decisions

Your job is to critique the user's custom rules for clarity, completeness, and potential issues. The classifier is an LLM that reads these rules as part of its system prompt.

For each rule, evaluate:
1. **Clarity**: Is the rule unambiguous? Could the classifier misinterpret it?
2. **Completeness**: Are there gaps or edge cases the rule doesn't cover?
3. **Conflicts**: Do any of the rules conflict with each other?
4. **Actionability**: Is the rule specific enough for the classifier to act on?

Be concise and constructive. Only comment on rules that could be improved. If all rules look good, say so.`;async function x(i){let a=r();if(!((a?.allow?.length??0)>0||(a?.soft_deny?.length??0)>0||(a?.environment?.length??0)>0)){process.stdout.write(`No custom auto mode rules found.

Add rules to your settings file under autoMode.{allow, soft_deny, environment}.
Run \`claude auto-mode defaults\` to see the default rules for reference.
`);return}let o=i.model?t(i.model):h()?e():n(),s=f(),c=m(),d=S(`allow`,a?.allow??[],s.allow)+S(`soft_deny`,a?.soft_deny??[],s.soft_deny)+S(`environment`,a?.environment??[],s.environment);process.stdout.write(`Analyzing your auto mode rules…

`);let p;try{p=await u({querySource:`auto_mode_critique`,model:o,system:b,skipSystemPromptPrefix:!0,max_tokens:4096,messages:[{role:`user`,content:`Here is the full classifier system prompt that the auto mode classifier receives:

<classifier_system_prompt>
`+c+`
</classifier_system_prompt>

Here are the user's custom rules that REPLACE the corresponding default sections:

`+d+`
Please critique these custom rules.`}]})}catch(e){process.stderr.write(`Failed to analyze rules: `+l(e)+`
`),process.exitCode=1;return}let g=p.content.find(e=>e.type===`text`);g?.type===`text`?process.stdout.write(g.text+`
`):process.stdout.write(`No critique was generated. Please try again.
`)}function S(e,t,n){if(t.length===0)return``;let r=t.map(e=>`- `+e).join(`
`),i=n.map(e=>`- `+e).join(`
`);return`## `+e+` (custom rules replacing defaults)
Custom:
`+r+`

Defaults being replaced:
`+i+`

`}export{y as autoModeConfigHandler,x as autoModeCritiqueHandler,v as autoModeDefaultsHandler};