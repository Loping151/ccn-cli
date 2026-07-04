import{n as e}from"./chunk-DR8-3Aex.js";import{c as t,d as n}from"./envUtils-3UiS5v1Q.js";import{Oc as r,Rc as i}from"./paths-DJg_jbfO.js";import{l as a,s as o}from"./commitAttribution-CFP3WDRA.js";function s(){return process.env.USER_TYPE===`ant`?n(process.env.CLAUDE_CODE_UNDERCOVER)?!0:o()!==`internal`:!1}function c(){return process.env.USER_TYPE===`ant`?`## UNDERCOVER MODE — CRITICAL

You are operating UNDERCOVER in a PUBLIC/OPEN-SOURCE repository. Your commit
messages, PR titles, and PR bodies MUST NOT contain ANY Anthropic-internal
information. Do not blow your cover.

NEVER include in commit messages or PR descriptions:
- Internal model codenames (animal names like Capybara, Tengu, etc.)
- Unreleased model version numbers (e.g., sonnet-4-8)
- Internal repo or project names (e.g., claude-cli-internal, anthropics/…)
- Internal tooling, Slack channels, or short links (e.g., go/cc, #claude-code-…)
- The phrase "Claude Code" or any mention that you are an AI
- Any hint of what model or version you are
- Co-Authored-By lines or any other attribution

Write commit messages as a human developer would — describe only what the code
change does.

GOOD:
- "Fix race condition in file watcher initialization"
- "Add support for custom key bindings"
- "Refactor parser for better error messages"

BAD (never write these):
- "Fix bug found while testing with Claude Capybara"
- "1-shotted by claude-opus-4-6"
- "1-shotted by claude-opus-4-7"
- "Generated with Claude Code"
- "Co-Authored-By: Claude Opus 4.6 <…>"
- "Co-Authored-By: Claude Opus 4.7 <…>"
`:``}function l(){return process.env.USER_TYPE===`ant`?!(n(process.env.CLAUDE_CODE_UNDERCOVER)||!s()||r().hasSeenUndercoverAutoNotice):!1}var u=e((()=>{a(),i(),t()}));export{l as i,u as n,s as r,c as t};