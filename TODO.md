# TODO / Roadmap

Tracks work that is **stubbed, partially implemented, or planned** in CCN.

Note the distinction: official / claude.ai features that are *complete but
default-off* are **not** listed as TODO — they work and are restored via env
vars documented in [docs/environment.md](docs/environment.md). This file is
only genuinely unfinished work. The "Intentionally disabled" section at the
bottom exists so the two are not confused.

## Not yet implemented

### Self-hosted Remote Control backend — *largest item*

The client-side framework is already in the tree
(`packages/remote-control-server`, `packages/acp-link`, and the ACP transport
that decouples the agent from any relay). What's missing / planned:

- [ ] Stand the server up as a standalone public deployment (public domain +
      per-machine runner keys; `RCS_BASE_URL` / `RCS_API_KEYS` already exist).
- [ ] **deviceid enrollment** — server issues an opaque device id on first
      connect; CCN persists it in the config dir (`0600`); reconnect verifies
      *key + deviceid*; reject a deviceid presented with a different key
      (anti-hijack). deviceid is fixed per machine.
- [ ] **Machine fingerprint** upload (hostname / os / arch) — display-only
      identification, never an auth input.
- [ ] **Bidirectional real-time sync** of `/config` settings and permission
      mode between the CLI and the web console (rides the ACP
      `updateConfigOption` / permission-mode seam).
- [ ] **File / image URL relay** — agent-listed files and images exposed as
      server URLs; user-uploaded temporary files/images the agent can pull
      (TTL blob store). This is the biggest single new piece — no
      upload/relay endpoints exist yet.
- [ ] **Multi-device web console** — log in, attach multiple deviceids,
      manage sessions per machine (data model — `tokenToUser`,
      `sessionOwners`, `machineName` — already present in `store.ts`).
- [ ] **Web auth model** — decide between "owner login + deviceid-as-selector"
      and a "CLI pairing handshake" (recommended over using a raw deviceid as
      the sole web-login secret). See the design evaluation before building.

### `reset-limits` command — `src/commands/reset-limits/index.ts`

Auto-generated stub (`isEnabled: () => false`, hidden). It resets official
usage limits and is only meaningful against a backend that tracks them; there
is no third-party equivalent, so it is intentionally left stubbed rather than
wired to anything.

### Computer Use entitlement — `src/utils/computerUse/gates.ts`

`hasRequiredSubscription()` is a no-op stub (`return true`) — CCN has no
self-hosted subscription/entitlement check. Because that gate can't be relied
on, Computer Use is instead **default-off** and enabled only via
`CCN_ENABLE_COMPUTER_USE=1`. A real per-user entitlement check is not
implemented (and is unnecessary for self-hosted use).

## Intentionally disabled (NOT missing work)

These official / claude.ai features are complete but default-off in CCN.
Restore each via its env var (see [docs/environment.md](docs/environment.md)):

| Feature | Restore with |
|---|---|
| Official CCR remote control (phones home to api.anthropic.com) | `CCN_ENABLE_OFFICIAL_CCR=1` |
| Built-in `mcp-chrome` server | `CCN_ENABLE_BUILTIN_MCP=1` |
| claude.ai MCP connectors | `ENABLE_CLAUDEAI_MCP_SERVERS=1` |
| Auto-updater | `ENABLE_AUTOUPDATER=1` |
| Folder-trust dialog | `CCN_ENABLE_TRUST_DIALOG=1` |
| Project-defined command trust (hooks / apiKeyHelper / MCP headers) | `CCN_TRUST_PROJECT_COMMANDS=1` |
| Background memory consolidation (autoDream) | `autoDreamEnabled: true` (settings) |
