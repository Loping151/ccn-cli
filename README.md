# CCN

A terminal AI coding CLI for Anthropic-compatible endpoints.

## Install

**macOS / Linux**
```bash
curl -fsSL https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.sh | bash
```

**Windows (PowerShell)**
```powershell
irm https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.ps1 | iex
```

Installs a self-contained build to `~/.ccn-app` (`%USERPROFILE%\.ccn-app` on Windows)
and a `ccn` launcher on your `PATH`, installing a local Node.js 20 if none is present.
Re-run to update. Open a new shell afterwards so `PATH` picks up `ccn`.

## Usage

```bash
export ANTHROPIC_BASE_URL="https://your-endpoint/anthropic"
export ANTHROPIC_AUTH_TOKEN="your-key"

ccn                    # start interactive session
ccn --resume           # resume a previous session
ccn -p "hello"         # headless / print mode
ccn --version
```

Or start `ccn` and configure the endpoint in-app with `/endpoint`.

## Commands

| Command | Description |
|---|---|
| `/help` | Show all commands |
| `/endpoint` | Add / edit / switch API endpoints (url, key, model, tag) |
| `/model` | Select the model |
| `/provider` | Switch API provider |
| `/config` | Settings panel |
| `/lang` | Interface language: `en` / `zh` / `auto` |
| `/quota` | Vendor coding-plan quota / balance |
| `/usage` (`/cost`, `/stats`) | Session cost & activity |
| `/context` | Context usage breakdown |
| `/compact` | Summarize & shrink the conversation |
| `/clear` | Clear the conversation |
| `/mcp` | Manage MCP servers |
| `/memory` | Edit memory (CLAUDE.md) files |
| `/resume` | Resume a previous conversation |
| `/init` | Generate/update project `CLAUDE.md` |
| `/tui default\|fullscreen` | Switch inline / fullscreen rendering (live) |
| `/vim` | Toggle Vim editing mode |
| `/theme` | Change theme |
| `/diff` | View uncommitted changes |
| `/permissions` | Tool permission rules |
| `/agents` | Manage sub-agents |
| `/export` | Export the conversation |
| `/rewind` | Restore code/conversation to an earlier point |

## Environment variables

### Endpoint

| Variable | Description |
|---|---|
| `ANTHROPIC_BASE_URL` | API endpoint (Anthropic Messages compatible) |
| `ANTHROPIC_AUTH_TOKEN` | Bearer token / API key |
| `ANTHROPIC_MODEL` | Main model name |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Model used for the "sonnet" tier |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Model used for the "opus" tier |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Model used for the small/fast tier |
| `ANTHROPIC_CUSTOM_HEADERS` | Extra request headers, one `Name: Value` per line |
| `API_TIMEOUT_MS` | Request timeout in ms (default 600000) |

### CCN options

| Variable | Description |
|---|---|
| `CLAUDE_CONFIG_DIR` | Config & session directory (default `~/.ccb`) |
| `CCN_INDEPENDENT_DATA=1` | Keep skills/memory in the config dir instead of sharing `~/.claude` |
| `CCN_CONTEXT_WINDOW=<tokens>` | Override the context-window limit (footer % + auto-compact) |
| `CCN_UA_VERSION=<version>` | Override the User-Agent version |
| `CLAUDE_CODE_NO_FLICKER=1` / `0` | Force fullscreen on / off |
| `CLAUDE_CODE_DISABLE_MOUSE=1` | Fullscreen without mouse capture |
| `CCN_ENABLE_TRUST_DIALOG=1` | Show the "trust this folder" prompt |
| `ENABLE_CLAUDEAI_MCP_SERVERS=1` | Enable claude.ai connectors |
