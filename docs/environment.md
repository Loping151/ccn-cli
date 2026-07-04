# Environment variables

**English** · [中文](environment_zh.md)

## Endpoint & model

| Variable | Meaning | Default |
|---|---|---|
| `ANTHROPIC_BASE_URL` | Anthropic-compatible endpoint base URL | unset (official API) |
| `ANTHROPIC_AUTH_TOKEN` | API key/token (or `ANTHROPIC_API_KEY`) | unset |
| `ANTHROPIC_MODEL` | Model name; supports the `[]` context suffix (`glm-5.2[1m]`) | unset |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Model mapped to the Sonnet role | unset |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Model mapped to the Opus role | unset |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Model for background/cheap tasks | unset |
| `ANTHROPIC_DEFAULT_*_MODEL_NAME` / `_DESCRIPTION` | Display name/description in `/model` | model name |
| `ANTHROPIC_CUSTOM_HEADERS` | Extra request headers (`Name: value`, newline-separated); replaces same-name headers | unset |
| `ANTHROPIC_MAX_OUTPUT_TOKENS` | Cap output tokens per response | model default |
| `API_TIMEOUT_MS` | Request timeout in ms | `600000` |

## Context & behavior

| Variable | Meaning | Default |
|---|---|---|
| `CCN_CONTEXT_WINDOW` | Exact context window (tokens); overrides `[]` suffix and detection | unset |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | Disable 1M handling (`[1m]` ignored) | off |
| `CLAUDE_CODE_EFFORT_LEVEL` | Force effort: low/medium/high/xhigh | unset (auto) |
| `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT` | Treat every model as effort-capable | off (already default-on for unknown models) |
| `MAX_THINKING_TOKENS` | Thinking token budget | model default |

## Directories & data

| Variable | Meaning | Default |
|---|---|---|
| `CLAUDE_CONFIG_DIR` | Config+session directory | `~/.ccn` |
| `CCN_INDEPENDENT_DATA` | `1` = keep skills/memory under the config dir instead of sharing `~/.claude` | off (shared) |

## Feature switches

| Variable | Meaning | Default |
|---|---|---|
| `CLAUDE_CODE_NO_FLICKER` | `1`/`0` force fullscreen on/off (normal switch is config `fullscreen`) | unset |
| `CLAUDE_CODE_DISABLE_MOUSE` | Fullscreen without mouse capture | off |
| `CCN_UA_VERSION` | Override the User-Agent version | build version |
| `CCN_HANG_WATCHDOG` | `0` disables the event-loop hang watchdog | on |
| `CCN_ENABLE_WEIXIN` | `1` registers the bundled WeChat plugin | off |
| `CCN_ENABLE_BUILTIN_MCP` | `1` adds the built-in `mcp-chrome` server to the config (shown in `/mcp` as disabled-until-enabled). Off by default — otherwise CCN handshakes `127.0.0.1:12306` every startup. | off |
| `CCN_ENABLE_COMPUTER_USE` | `1` enables Computer Use (desktop mouse/keyboard/screenshot control). **Off by default** — its tools bypass the normal permission prompt and the built-in subscription gate is a no-op, so it stays off unless you explicitly opt in. | off |
| `CCN_ENABLE_TRUST_DIALOG` | `1` restores the folder-trust dialog | off (all folders trusted) |
| `CCN_TRUST_PROJECT_COMMANDS` | `1` allows a project's `.claude/settings.json` hooks / apiKeyHelper / awsAuthRefresh / MCP headersHelper (arbitrary shell commands) to run. **Off by default** — a cloned repo cannot auto-execute commands. Turn on only for directories you own/trust. | off |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | `1` restores claude.ai connectors | off |
| `CCN_ENABLE_OFFICIAL_CCR` | `1` re-enables the **official** claude.ai Remote Control bridge (phones home to api.anthropic.com, needs a claude.ai subscription). Off by default — CCN never contacts the official backend for remote control. A self-hosted backend via `CLAUDE_BRIDGE_BASE_URL` is unaffected and works without this. | off |
| `ENABLE_AUTOUPDATER` | `1` re-enables the auto-updater (use `ccn update` instead) | off |
| `DISABLE_AUTOUPDATER` | `1` belt-and-suspenders auto-update off | (wrappers set `1`) |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `1` disables auto-memory entirely | off |
| `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` | Standard proxy vars | unset |

Settings-file keys (in `~/.ccn` settings.json): `autoDreamEnabled` (background
memory consolidation — default **false**), `prefersReducedMotion` (default false),
`availableModels` (allowlist — default unrestricted). Config-file keys like
`assistantName`, `welcomeBox`, `mascot` are documented in
[configuration.md](configuration.md).
