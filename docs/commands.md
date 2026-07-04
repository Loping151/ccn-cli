# Slash commands

**English** · [中文](commands_zh.md)

Type `/` inside CCN for the live, searchable list. Below are the commands
available on third-party endpoints (official-subscription-only commands are
hidden automatically). Verified against the current build.

## Endpoint & model

| Command | Description |
|---|---|
| `/endpoint` | Manage API endpoints (URL/key/model/tag): add, edit (`e`), delete (`d`), switch live — applies to the running session |
| `/model` | Pick the session model — lists only what you configured (role mappings, `ANTHROPIC_MODEL`, endpoint profiles) |
| `/provider` | Switch API provider (anthropic-compatible / openai / gemini / grok / bedrock / vertex / foundry) |
| `/quota` | Vendor coding-plan quota/balance (GLM / DeepSeek / MiniMax, auto-detected from base URL) |
| `/usage` (`/cost`, `/stats`) | This-session + all-time usage stats |
| `/effort` | Reasoning effort: `low` / `medium` / `high` / `xhigh` / `auto` |

## Session & context

| Command | Description |
|---|---|
| `/clear` | Wipe conversation history, free context |
| `/compact [notes]` | Summarize old history to free context |
| `/context` | Visualize context usage as a colored grid |
| `/resume` | Resume a previous conversation |
| `/rewind` | Roll code/conversation back to a checkpoint |
| `/branch` | Branch the conversation at this point |
| `/fork` | Fork the session into a sub-agent |
| `/rename` / `/tag` | Rename / tag the current session |
| `/recap` / `/summary` | One-line recap / full session summary |
| `/export` | Export the conversation to file/clipboard |
| `/copy [N]` | Copy the last (or Nth-latest) response |
| `/files` | Files currently in context |
| `/add-dir` | Add a working directory |
| `/memory` | Edit persistent memory files |
| `/goal` | Set/view a persistent goal driving auto-continuation |
| `/btw` | Quick side question without interrupting the main thread |

## Interface

| Command | Description |
|---|---|
| `/config` (`/settings`) | Settings panel — every item shows meaning + default in-panel |
| `/theme` | Palette + mascot + diff-colors studio (three axes) |
| `/lang` | Interface language: `en` / `zh` / `auto` |
| `/tui` | Render mode: `fullscreen` / `default` / `status` (immediate) |
| `/vim` | Toggle Vim input mode |
| `/color` | Prompt bar color for this session |
| `/keybindings` | Open the keybindings config file |
| `/statusline` | Configure the status line |
| `/onboarding` | Re-run first-run setup |

## Permissions & modes

| Command | Description |
|---|---|
| `/permissions` | Tool allow/deny rules |
| `/mode` | Interaction mode (default, gentle, sharp, workhorse, token-saver…) |
| `/plan` | Plan mode / view current plan |
| `/proactive` | Toggle proactive (autonomous) mode |
| `/poor` | Budget mode: skip memory-extraction/suggestions to save tokens |
| `/privacy-settings` | View/update privacy settings |
| `/security-review` | Security review of pending changes |

## Git & GitHub (need `git`/`gh`)

| Command | Description |
|---|---|
| `/diff` | Uncommitted changes + per-turn diffs |
| `/commit` / `/commit-push-pr` | Git commit / commit+push+PR |
| `/review` / `/pr-comments` | Review a PR / fetch PR comments |
| `/issue` | Create a GitHub issue |
| `/autofix-pr` | Auto-fix CI failures on a PR |
| `/share` | Upload session log to a Gist |

## Background & multi-session

| Command | Description |
|---|---|
| `/tasks` | List/manage background tasks |
| `/workflows` | Live workflow monitor panel |
| `/monitor` | Background shell monitor (Shift+Down to view) |
| `/daemon` | Manage background sessions/daemon |
| `/attach` / `/detach` / `/send` / `/history` / `/peers` | Sub-CLI piping between terminals |
| `/remote-control` / `/remote-control-server` | Remote-control bridge / self-hosted server |
| `/coordinator` | Multi-worker coordinator mode |

## Plugins, skills, MCP

| Command | Description |
|---|---|
| `/mcp` | Manage MCP servers |
| `/plugin` / `/reload-plugins` | Manage plugins / apply pending plugin changes |
| `/skills` | List available skills |
| `/skill-search` | Auto skill matching control |
| `/skill-learning` | Skill learning (observe/analyze/evolve) |
| `/agents` | Manage subagent definitions |
| `/init` | Generate/update project CLAUDE.md (+ optional skills/hooks) |
| `/init-verifiers` | Create verifier skills for automated change verification |
| `/hooks` | Tool-event hook configuration |
| `/local-memory` / `/local-vault` | Local notes store / encrypted local secrets |

## Diagnostics & misc

| Command | Description |
|---|---|
| `/status` | Session/endpoint/model status |
| `/doctor` | Diagnose installation & settings |
| `/env` | Environment, runtime, feature flags |
| `/insights` | Usage-insights report from your sessions |
| `/help` | Help & command list |
| `/version` | Show version |
| `/release-notes` | Release notes |
| `/exit` | Quit |
| `/voice` | Voice input (`/voice doubao` for Doubao ASR) |
| `/web-tools` | Web search/fetch backends |
| `/ide` | IDE integration status |
| `/buddy` | Hatch a coding companion pet |

## Keyboard

`ctrl+o` expand collapsed content (thinking etc.) into the transcript view ·
`ctrl+e` show-all in transcript · `ctrl+t` todo list · `ctrl+r` search history ·
`ctrl+l` redraw · `↑` history (suggestions resume after submit) ·
`Shift+Tab` cycle permission mode.
