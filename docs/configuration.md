# Configuration

**English** · [中文](configuration_zh.md)

## Files & locations

| Path | Purpose |
|---|---|
| `~/.ccn/` | Config + sessions (projects, todos, auto-memory). Override with `CLAUDE_CONFIG_DIR`. |
| `~/.ccn/.ccn.json` | Global config (theme, endpoints, toggles below). Edited by the TUI; hand-editing works too. |
| `~/.claude/` | Skills & user memory, shared with the official CLI by default. Set `CCN_INDEPENDENT_DATA=1` to keep them under `~/.ccn` instead. |
| `.mcp.json` (project) | Project-scoped MCP servers. |

## Adding an endpoint

Preferred: run `/endpoint` inside CCN → `＋ Add endpoint`, fill the form
(Tab switches fields, Enter saves on the last field). Selecting an endpoint
applies it to the running session immediately (base URL, key, and model).

Example — GLM official coding plan:

```
Tag       glm                # optional alias shown in the UI
Base URL  https://open.bigmodel.cn/api/anthropic
Key       <API key from the bigmodel.cn console>
Model     glm-5.2[1m]
```

Equivalent config file entry (`~/.ccn/.ccn.json`):

```json
{
  "customEndpoints": [
    {
      "id": "any-unique-id",
      "tag": "glm",
      "baseURL": "https://open.bigmodel.cn/api/anthropic",
      "authToken": "sk-...",
      "model": "glm-5.2[1m]"
    }
  ],
  "selectedEndpointId": "any-unique-id"
}
```

Environment variables always win over the selected endpoint profile at startup:
`ANTHROPIC_BASE_URL`, `ANTHROPIC_AUTH_TOKEN`, `ANTHROPIC_MODEL`.

## Model name spec: the `[]` context suffix

Append `[<size>]` to any model name to declare its context window. It is a
**client-side annotation** — CCN strips it before sending requests, and uses it
to size the context meter, auto-compact threshold, and `/context` display.

- Units: `k` (thousand), `m` (million), `b` (billion) — case-insensitive.
- Examples: `glm-5.2[1m]`, `deepseek-v4[128k]`, `kimi-k2[200K]`, `foo[1B]`, `bar[1.5m]`.
- The `/model` list derives its "(1M context)" style notes from this suffix only —
  no suffix, no context note.
- `CCN_CONTEXT_WINDOW=<tokens>` overrides everything when you need an exact number.

## Role mapping (Sonnet/Opus/Haiku slots)

Vendors' models can be mapped onto the three model roles:

```bash
export ANTHROPIC_DEFAULT_SONNET_MODEL="glm-5.2[1m]"     # everyday
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm-5.2[1m]"       # hardest tasks
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm-5-turbo"      # background/cheap
# Optional display strings:
export ANTHROPIC_DEFAULT_SONNET_MODEL_NAME="GLM 5.2"
export ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION="Primary model"
```

`/model` lists exactly what you configured (role mappings, the current
`ANTHROPIC_MODEL`, and endpoint profiles) — nothing is invented.

## /config items

Every item below is editable in `/config` (←/→ or Tab cycles values; the
selected item shows this description in-panel when the terminal is wide).

| Item | Meaning | Default |
|---|---|---|
| Auto-compact | Auto-summarize old history as context nears the limit | true |
| Cache warning | Warn when a prompt-cache break makes requests costlier | true |
| Claude in Chrome | Allow browser integration by default | false |
| Copy full response | `/copy` grabs the whole response, not just code blocks | false |
| Copy on select | Mouse selection copies to clipboard (fullscreen) | true |
| Default permission mode | Mode new sessions start in (default/acceptEdits/plan/dontAsk…) | default |
| Default view | Main pane default: transcript / chat / default | default |
| Diff tool | Where `/diff` opens: terminal or VS Code | auto |
| Editor mode | Input keybindings: normal or vim | normal |
| Fast mode | Faster output on supported official models (extra billing) | false |
| File checkpointing | Snapshot edited files each turn for `/rewind` | true |
| Fullscreen mode | Alt-screen rendering + virtual scroll + mouse; immediate | false |
| Input-needed notification | Notify when input is needed | false |
| Response language | Language the model replies in (free text) | English |
| Model | Default model for new sessions | unset |
| Local notifications | Delivery channel (iTerm2/kitty/bell/disabled…) | auto |
| Output style | Response style preset | default |
| Interface language | UI language: auto / en / zh | auto |
| Reduced motion | Disable animations (mascot intro/loops, spinners) | false |
| Prompt suggestion | Suggest a next prompt after each turn (small API call) | false |
| PR status footer | Show current branch PR status in the footer | true |
| Remote Control at startup | Start the Remote Control bridge on launch | off |
| Respect gitignore | File pickers skip gitignored files | true |
| Compact response stats | Condense the per-response stats line | false |
| External includes dialog | Ask before loading CLAUDE.md outside the project | true |
| Show response stats | Per-response stats line (time/tokens/cache) | true |
| Status in terminal tab | Mirror status into the terminal tab title | true |
| Show turn duration | Print turn duration after each response | false |
| Speculation | Prefetch likely next actions (extra API usage) | false |
| Spinner tips | Rotate usage tips in the working spinner | true |
| Task-complete notification | Notify when a long task finishes unfocused | true |
| Teammate default model | Model used by spawned teammates/subagents | inherit |
| Teammate mode | How teammates run: in-process or tmux panes | auto |
| Terminal progress bar | Emit OSC 9;4 progress to the terminal | true |
| Theme | Palette + mascot + diff colors (three-axis studio) | default |
| Thinking | Allow extended thinking this session | on |
| Auto mode during plan | Temporary auto permission mode while executing a plan | false |
| Verbose | Full command outputs and expanded tool results | false |
| Welcome box | Bordered welcome panel at startup (`welcomeBox: false` for minimal) | true |

Related config-file-only keys: `assistantName` (identity used for the assistant in prompts; defaults to the configured model name with the `[]` suffix stripped, e.g. `glm-5.2[1m]` → `glm-5.2`), `customEndpoints` / `selectedEndpointId`
(see above), `customHeaders` (object of extra request headers; same-name
headers are replaced), `mascot` (`starflower`/`clawd`/`heart`/`sparkle`/`rocket`),
`diffColors` (`red-blue`/`red-green`), `autoDreamEnabled` (background memory
consolidation, default off).
