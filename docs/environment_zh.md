# 环境变量

[English](environment.md) · **中文**

## 端点与模型

| 变量 | 含义 | 默认 |
|---|---|---|
| `ANTHROPIC_BASE_URL` | 兼容端点地址 | 未设(官方 API) |
| `ANTHROPIC_AUTH_TOKEN` | 密钥(或 `ANTHROPIC_API_KEY`) | 未设 |
| `ANTHROPIC_MODEL` | 模型名,支持 `[]` 上下文后缀(`glm-5.2[1m]`) | 未设 |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | Sonnet 槽位模型 | 未设 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | Opus 槽位模型 | 未设 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | 后台/廉价任务模型 | 未设 |
| `ANTHROPIC_DEFAULT_*_MODEL_NAME` / `_DESCRIPTION` | `/model` 里的显示名/描述 | 模型名 |
| `ANTHROPIC_CUSTOM_HEADERS` | 自定义请求头(`Name: value` 每行一条),同名替换 | 未设 |
| `ANTHROPIC_MAX_OUTPUT_TOKENS` | 单响应输出上限 | 模型默认 |
| `API_TIMEOUT_MS` | 请求超时(毫秒) | `600000` |

## 上下文与行为

| 变量 | 含义 | 默认 |
|---|---|---|
| `CCN_CONTEXT_WINDOW` | 精确上下文窗口(token),覆盖 `[]` 后缀与探测 | 未设 |
| `CLAUDE_CODE_DISABLE_1M_CONTEXT` | 禁用 1M 处理(`[1m]` 失效) | 关 |
| `CLAUDE_CODE_EFFORT_LEVEL` | 固定思考强度 low/medium/high/xhigh | 未设(自动) |
| `CLAUDE_CODE_ALWAYS_ENABLE_EFFORT` | 强制所有模型支持 effort | 关(未知模型已默认支持) |
| `MAX_THINKING_TOKENS` | 思考 token 预算 | 模型默认 |

## 目录与数据

| 变量 | 含义 | 默认 |
|---|---|---|
| `CLAUDE_CONFIG_DIR` | 配置+会话目录 | `~/.ccn` |
| `CCN_INDEPENDENT_DATA` | `1` = 技能/记忆放配置目录,不与 `~/.claude` 共享 | 关(共享) |

## 功能开关

| 变量 | 含义 | 默认 |
|---|---|---|
| `CLAUDE_CODE_NO_FLICKER` | `1`/`0` 强制全屏开/关(常规开关是 config 的 fullscreen) | 未设 |
| `CLAUDE_CODE_DISABLE_MOUSE` | 全屏但不捕获鼠标 | 关 |
| `CCN_UA_VERSION` | 覆盖 User-Agent 版本号 | 构建版本 |
| `CCN_HANG_WATCHDOG` | `0` 关闭事件循环卡死看门狗 | 开 |
| `CCN_ENABLE_WEIXIN` | `1` 注册内置微信插件 | 关 |
| `CCN_ENABLE_BUILTIN_MCP` | `1` 把内置 `mcp-chrome` 加进配置(在 `/mcp` 里显示为待启用)。默认关——否则 CCN 每次启动都会去握手 `127.0.0.1:12306`。 | 关 |
| `CCN_ENABLE_COMPUTER_USE` | `1` 启用计算机控制(桌面鼠标/键盘/截屏)。**默认关**——它的工具会绕过权限提示,且内置订阅门是空实现,所以不显式开启就一直关。 | 关 |
| `CCN_ENABLE_TRUST_DIALOG` | `1` 恢复文件夹信任弹窗 | 关(默认信任) |
| `CCN_TRUST_PROJECT_COMMANDS` | `1` 允许项目 `.claude/settings.json` 里的 hook / apiKeyHelper / awsAuthRefresh / MCP headersHelper(会跑任意 shell 命令)执行。**默认关**——clone 来的仓库不会自动执行命令。仅对自己信任的目录开启。 | 关 |
| `ENABLE_CLAUDEAI_MCP_SERVERS` | `1` 恢复 claude.ai 连接器 | 关 |
| `CCN_ENABLE_OFFICIAL_CCR` | `1` 恢复**官方** claude.ai 远程控制桥接(会连 api.anthropic.com,需 claude.ai 订阅)。默认关——CCN 远程控制绝不连官方后端。自托管后端(`CLAUDE_BRIDGE_BASE_URL`)不受影响,无需此开关即可用。 | 关 |
| `ENABLE_AUTOUPDATER` | `1` 恢复自动更新(建议用 `ccn update`) | 关 |
| `DISABLE_AUTOUPDATER` | `1` 双保险关自动更新 | (包装脚本设 `1`) |
| `CLAUDE_CODE_DISABLE_AUTO_MEMORY` | `1` 完全关闭自动记忆 | 关 |
| `HTTP_PROXY` / `HTTPS_PROXY` / `NO_PROXY` | 标准代理变量 | 未设 |

settings.json 键(`~/.ccn` 下):`autoDreamEnabled`(后台记忆整理,默认 **false**)、
`prefersReducedMotion`(默认 false)、`availableModels`(白名单,默认不限制)。
`assistantName`、`welcomeBox`、`mascot` 等配置文件键见
[configuration_zh.md](configuration_zh.md)。
