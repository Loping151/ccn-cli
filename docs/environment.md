# Environment variables · 环境变量

## Endpoint & model · 端点与模型

| Variable | Meaning · 含义 |
|---|---|
| `ANTHROPIC_BASE_URL` | Anthropic-compatible endpoint base URL · 兼容端点地址 |
| `ANTHROPIC_AUTH_TOKEN` | API key/token (or `ANTHROPIC_API_KEY`) · 密钥 |
| `ANTHROPIC_MODEL` | Model name, supports `[]` context suffix (`glm-5.2[1m]`) · 模型名,支持 `[]` 后缀 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Model mapped to the Sonnet role · Sonnet 槽位模型 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Model mapped to the Opus role · Opus 槽位模型 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | Model for background/cheap tasks · Haiku 槽位模型 |
| `ANTHROPIC_DEFAULT_*_MODEL_NAME` / `_DESCRIPTION` | Display name/description in `/model` · 显示名/描述 |
| `ANTHROPIC_CUSTOM_HEADERS` | Extra request headers (`Name: value`, newline-separated); replaces same-name headers · 自定义请求头(替换同名) |
| `ANTHROPIC_MAX_OUTPUT_TOKENS` | Cap output tokens per response · 输出上限 |

## Context & behavior · 上下文与行为

| Variable | Meaning · 含义 |
|---|---|
| `CCN_CONTEXT_WINDOW` | Exact context window in tokens; overrides `[]` suffix and detection · 精确上下文窗口,一票覆盖 |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | Disable 1M context handling (`[1m]` ignored) · 禁 1M |
| `CLAUDE_CODE_EFFORT_LEVEL` | Force effort: low/medium/high/xhigh · 固定思考强度 |
| `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT` | Treat every model as effort-capable · 强制启用 effort |
| `MAX_THINKING_TOKENS` | Thinking token budget · 思考 token 预算 |
| `API_TIMEOUT_MS` | Request timeout (default 600000) · 请求超时 |

## Directories & data · 目录与数据

| Variable | Meaning · 含义 |
|---|---|
| `CLAUDE_CONFIG_DIR` | Config+session dir (default `~/.ccn`) · 配置/会话目录 |
| `CCN_INDEPENDENT_DATA=1` | Keep skills/memory under the config dir instead of sharing `~/.claude` · 技能/记忆独立 |

## Feature switches · 功能开关

| Variable | Meaning · 含义 |
|---|---|
| `CLAUDE_CODE_NO_FLICKER=1/0` | Force fullscreen on/off (config `fullscreen` is the normal switch) · 强制全屏开/关 |
| `CCN_HANG_WATCHDOG=0` | Disable the event-loop hang watchdog · 关卡死看门狗 |
| `CCN_ENABLE_WEIXIN=1` | Register the bundled WeChat plugin · 启用微信内置插件 |
| `CCN_ENABLE_BUILTIN_MCP=1` | List built-in MCP servers (computer-use, chrome) · 启用内置 MCP |
| `CCN_ENABLE_TRUST_DIALOG=1` | Restore the folder-trust dialog · 恢复信任弹窗 |
| `ENABLE_CLAUDEAI_MCP_SERVERS=1` | Restore claude.ai connectors · 恢复官方连接器 |
| `ENABLE_AUTOUPDATER=1` | Re-enable the auto-updater (off by default; use `ccn update`) · 恢复自动更新 |
| `DISABLE_AUTOUPDATER=1` | Belt-and-suspenders auto-update off · 双保险关更新 |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1` | Disable auto-memory entirely · 关自动记忆 |
| `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` | Standard proxy vars · 代理 |

Settings-file switches (in `~/.ccn` settings.json): `autoDreamEnabled`
(background memory consolidation, default **off**), `prefersReducedMotion`,
`availableModels` (allowlist). See [configuration.md](configuration.md).
