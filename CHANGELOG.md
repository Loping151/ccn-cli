# Changelog

## 1.5.1

- Endpoints: `/endpoint` to add/edit/switch API endpoints (url, key, model, tag alias, description); the description shows in `/model`.
- Interface language: `/lang en|zh|auto`; footer, command descriptions and prompts follow it.
- Vendor quota in the footer via `/quota` (GLM / DeepSeek / MiniMax).
- Per-response stats line: duration, time-to-first-token, thinking time, token usage and cost (`/config` to toggle / compact).
- Fullscreen mode toggles live with `/tui fullscreen|default` (alt-screen + mouse + virtualized scroll).
- Context-window handling for third-party models; override with `CCN_CONTEXT_WINDOW`.
- `ccn update` / `ccn uninstall`.
- Config & sessions live in `~/.ccn`; skills and user memory are shared with `~/.claude` by default (`CCN_INDEPENDENT_DATA=1` to isolate).
- Custom request headers replace matching defaults (`ANTHROPIC_CUSTOM_HEADERS` or `/config`).
- Built-in web search / fetch / artifacts are off by default — configure your own search via MCP.
