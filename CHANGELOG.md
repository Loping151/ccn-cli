# Changelog

## 1.5.2

- Themes: dark/light retuned to One Dark / One Light; new default warm gold-and-green theme; three-way split (mascot / terminal palette / diff colors) switchable in `/config`; onboarding now asks for interface language first.
- Reliability: guard against event-loop stalls (a watchdog writes a hang report if the UI blocks); line-width cache is now LRU so long sessions don't re-measure the whole transcript.
- Privacy: telemetry / feedback / bootstrap / official-registry calls now stay off unless the endpoint is first-party Anthropic — nothing (incl. API keys) leaks to api.anthropic.com on third-party endpoints.
- Cost line hidden on third-party endpoints (the USD table only applies to first-party).
- Safety: `ccn uninstall` and the install/uninstall scripts now refuse to remove `$HOME` / root / unsafe config paths; installer/updater hardened (retries, atomic swap, version pinned for `ccn update`).
- Brand: remaining "Claude Code" strings and file names updated to CCN.

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
