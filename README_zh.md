# CCN

[English](README.md) · **中文**

面向 Anthropic 兼容端点（GLM / Kimi / DeepSeek / MiniMax 等）的终端 AI 编程 CLI。

## 安装

**macOS / Linux**
```bash
curl -fsSL https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.sh | bash
```

**Windows (PowerShell)**
```powershell
irm https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.ps1 | iex
```

安装一份自包含构建到 `~/.ccn-app`（Windows 为 `%USERPROFILE%\.ccn-app`），并在 `PATH` 放一个
`ccn` 启动器；本机没有 Node.js 20 时会自动装一份。重跑即升级。装完请新开一个终端让 `PATH` 生效。

## 快速开始

设置端点、密钥、**以及模型名**——模型名是必填的（CCN 不会自动探测）。

```bash
# 示例：GLM（智谱）
export ANTHROPIC_BASE_URL="https://api.z.ai/api/anthropic"
export ANTHROPIC_AUTH_TOKEN="你的密钥"
export ANTHROPIC_MODEL="glm-4.6"
ccn
```

任何 Anthropic 兼容端点都可以，改这三个值即可：

| 供应商 | `ANTHROPIC_BASE_URL` | `ANTHROPIC_MODEL` 示例 |
|---|---|---|
| GLM（智谱） | `https://api.z.ai/api/anthropic` | `glm-4.6` |
| DeepSeek | `https://api.deepseek.com/anthropic` | `deepseek-chat` |
| MiniMax | `https://api.minimaxi.com/anthropic` | *（你套餐的模型）* |
| Kimi / 其他 | *（供应商的 Anthropic 端点）* | *（供应商的模型名）* |

> 不想用环境变量？直接运行 `ccn`，用 `/endpoint` 在工具内新增/切换端点
> （保存 url / key / model / 别名，切换即时生效）。

## 指令

| 指令 | 说明 |
|---|---|
| `/help` | 显示全部指令 |
| `/endpoint` | 新增 / 编辑 / 切换 API 端点（url、key、model、别名） |
| `/model` | 选择模型 |
| `/provider` | 切换供应商 |
| `/config` | 设置面板 |
| `/lang` | 界面语言：`en` / `zh` / `auto` |
| `/quota` | 厂商 coding plan 额度 / 余额 |
| `/usage`（`/cost`、`/stats`） | 会话花费与活动统计 |
| `/context` | 上下文占用明细 |
| `/compact` | 压缩对话上下文 |
| `/clear` | 清空对话 |
| `/mcp` | 管理 MCP 服务器 |
| `/memory` | 编辑记忆（CLAUDE.md）文件 |
| `/resume` | 恢复之前的会话 |
| `/init` | 生成/更新项目 `CLAUDE.md` |
| `/tui default\|fullscreen` | 切换 内联 / 全屏 渲染（实时） |
| `/vim` | 切换 Vim 编辑模式 |
| `/theme` | 更换主题 |
| `/diff` | 查看未提交改动 |
| `/permissions` | 工具权限规则 |
| `/agents` | 管理子代理 |
| `/export` | 导出对话 |
| `/rewind` | 回退代码/对话到之前的检查点 |

## 环境变量

### 端点

| 变量 | 说明 |
|---|---|
| `ANTHROPIC_BASE_URL` | API 端点（Anthropic Messages 兼容） |
| `ANTHROPIC_AUTH_TOKEN` | Bearer token / API key |
| `ANTHROPIC_MODEL` | 主模型名（**必填**） |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | “sonnet”档使用的模型 |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | “opus”档使用的模型 |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | 小/快档使用的模型 |
| `ANTHROPIC_CUSTOM_HEADERS` | 追加请求头，每行一个 `Name: Value` |
| `API_TIMEOUT_MS` | 请求超时（毫秒，默认 600000） |

### CCN 选项

| 变量 | 说明 |
|---|---|
| `CLAUDE_CONFIG_DIR` | 配置与会话目录（默认 `~/.ccb`） |
| `CCN_INDEPENDENT_DATA=1` | skill/记忆放在配置目录，不与 `~/.claude` 共享 |
| `CCN_CONTEXT_WINDOW=<tokens>` | 覆盖上下文窗口上限（footer 百分比 + auto-compact） |
| `CCN_UA_VERSION=<version>` | 覆盖 User-Agent 版本 |
| `CLAUDE_CODE_NO_FLICKER=1` / `0` | 强制开 / 关全屏 |
| `CLAUDE_CODE_DISABLE_MOUSE=1` | 全屏但不捕获鼠标 |
| `CCN_ENABLE_TRUST_DIALOG=1` | 显示“信任此文件夹”提示 |
| `ENABLE_CLAUDEAI_MCP_SERVERS=1` | 启用 claude.ai connectors |
