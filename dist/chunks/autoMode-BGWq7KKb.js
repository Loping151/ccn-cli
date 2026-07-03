import{$a as e,Dr as t,Mr as n,Pr as r,Vr as i,mo as a}from"./paths-C4T5ixO7.js";import{E as o,O as s,U as c,z as l}from"./debug-B_528_ux.js";import{$_ as u,Q_ as d,X_ as f,Z_ as p,ev as m}from"./loadAgentsDir-CzPBSDm_.js";import{n as h,t as g}from"./poorMode-BszRdQ1L.js";c(),r(),d(),a(),g(),u(),o();function _(e){process.stdout.write(s(e,null,2)+`
`)}function v(){_(p())}function y(){let t=e(),n=p();_({allow:t?.allow?.length?t.allow:n.allow,soft_deny:t?.soft_deny?.length?t.soft_deny:n.soft_deny,environment:t?.environment?.length?t.environment:n.environment})}var b=`You are an expert reviewer of auto mode classifier rules for Claude Code.

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

Be concise and constructive. Only comment on rules that could be improved. If all rules look good, say so.`;async function x(r){let a=e();if(!((a?.allow?.length??0)>0||(a?.soft_deny?.length??0)>0||(a?.environment?.length??0)>0)){process.stdout.write(`No custom auto mode rules found.

Add rules to your settings file under autoMode.{allow, soft_deny, environment}.
Run \`claude auto-mode defaults\` to see the default rules for reference.
`);return}let o=r.model?i(r.model):h()?n():t(),s=p(),c=f(),u=S(`allow`,a?.allow??[],s.allow)+S(`soft_deny`,a?.soft_deny??[],s.soft_deny)+S(`environment`,a?.environment??[],s.environment);process.stdout.write(`Analyzing your auto mode rules…

`);let d;try{d=await m({querySource:`auto_mode_critique`,model:o,system:b,skipSystemPromptPrefix:!0,max_tokens:4096,messages:[{role:`user`,content:`Here is the full classifier system prompt that the auto mode classifier receives:

<classifier_system_prompt>
`+c+`
</classifier_system_prompt>

Here are the user's custom rules that REPLACE the corresponding default sections:

`+u+`
Please critique these custom rules.`}]})}catch(e){process.stderr.write(`Failed to analyze rules: `+l(e)+`
`),process.exitCode=1;return}let g=d.content.find(e=>e.type===`text`);g?.type===`text`?process.stdout.write(g.text+`
`):process.stdout.write(`No critique was generated. Please try again.
`)}function S(e,t,n){if(t.length===0)return``;let r=t.map(e=>`- `+e).join(`
`),i=n.map(e=>`- `+e).join(`
`);return`## `+e+` (custom rules replacing defaults)
Custom:
`+r+`

Defaults being replaced:
`+i+`

`}export{y as autoModeConfigHandler,x as autoModeCritiqueHandler,v as autoModeDefaultsHandler};