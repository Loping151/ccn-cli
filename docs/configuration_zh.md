# 配置

[English](configuration.md) · **中文**

## 文件与位置

| 路径 | 用途 |
|---|---|
| `~/.ccn/` | 配置 + 会话（projects、todos、自动记忆）。可用 `CLAUDE_CONFIG_DIR` 覆盖。 |
| `~/.ccn/.ccn.json` | 全局配置（主题、端点、下表开关）。TUI 会写它，手改也行。 |
| `~/.claude/` | 技能与用户记忆，默认与官方 CLI 共享。设 `CCN_INDEPENDENT_DATA=1` 则改放 `~/.ccn` 完全独立。 |
| 项目下 `.mcp.json` | 项目级 MCP 服务器。 |

## 添加端点

推荐在 CCN 里跑 `/endpoint` → `＋ 新增端点`,按表单填(Tab 换字段,最后一项 Enter 保存)。
选中端点即对当前会话生效(base URL、密钥、模型一起切)。

示例——GLM 官方 coding plan:

```
Tag       glm                # 可选别名,界面显示用
Base URL  https://open.bigmodel.cn/api/anthropic
Key       <bigmodel.cn 控制台创建的 API Key>
Model     glm-5.2[1m]
```

等价的配置文件写法(`~/.ccn/.ccn.json`):

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

启动时环境变量优先于选中的端点档案:`ANTHROPIC_BASE_URL`、`ANTHROPIC_AUTH_TOKEN`、`ANTHROPIC_MODEL`。

## 模型名规范:`[]` 上下文后缀

在任意模型名后追加 `[<大小>]` 声明其上下文窗口。这是**纯客户端标注**——发请求前会剥掉,
本地用于上下文用量分母、auto-compact 阈值和 `/context` 展示。

- 单位:`k`(千)、`m`(百万)、`b`(十亿),大小写不限。
- 例:`glm-5.2[1m]`、`deepseek-v4[128k]`、`kimi-k2[200K]`、`foo[1B]`、`bar[1.5m]`。
- `/model` 列表里的"(1M context)"类标注只由此后缀生成——没写后缀就不标。
- 需要精确值时用 `CCN_CONTEXT_WINDOW=<token数>` 一票覆盖。

## 角色映射(Sonnet/Opus/Haiku 槽位)

把厂商模型映射到三个角色:

```bash
export ANTHROPIC_DEFAULT_SONNET_MODEL="glm-5.2[1m]"     # 日常
export ANTHROPIC_DEFAULT_OPUS_MODEL="glm-5.2[1m]"       # 难题
export ANTHROPIC_DEFAULT_HAIKU_MODEL="glm-5-turbo"      # 后台/廉价
# 可选显示名:
export ANTHROPIC_DEFAULT_SONNET_MODEL_NAME="GLM 5.2"
export ANTHROPIC_DEFAULT_SONNET_MODEL_DESCRIPTION="主力模型"
```

`/model` 只列你实际配置的(角色映射、当前 `ANTHROPIC_MODEL`、端点档案),不会凭空造。

## /config 配置项

以下每项都能在 `/config` 里改(←/→ 或 Tab 循环取值;终端够宽时选中项会显示说明)。

| 项 | 含义 | 默认 |
|---|---|---|
| Auto-compact | 上下文接近上限时自动总结压缩旧历史 | 开 |
| Cache warning | 缓存断裂(变贵)时提示 | 开 |
| Claude in Chrome | 默认允许浏览器集成 | 关 |
| Copy full response | /copy 复制整条回复而非仅代码块 | 关 |
| Copy on select | 全屏下选中即复制 | 开 |
| Default permission mode | 新会话初始权限模式 | default |
| Default view | 主界面默认视图 transcript/chat/default | default |
| Diff tool | /diff 在终端还是 VS Code 打开 | auto |
| Editor mode | 输入键位 normal/vim | normal |
| Fast mode | 官方受支持模型的加速输出(另计费) | 关 |
| File checkpointing | 每轮存文件快照供 /rewind | 开 |
| Fullscreen mode | 全屏渲染(alt-screen+虚拟滚动+鼠标),即时生效 | 关 |
| Input-needed notification | 需要输入时通知 | 关 |
| Response language | 模型回复语言(自由文本) | 英文 |
| Model | 新会话默认模型 | 未设 |
| Local notifications | 通知投递方式 | auto |
| Output style | 回复风格预设 | default |
| Interface language | 界面语言 auto/en/zh | auto |
| Reduced motion | 关闭动画 | 关 |
| Prompt suggestion | 每轮后建议下一步(有小额开销) | 关 |
| PR status footer | footer 显示 PR 状态 | 开 |
| Remote Control at startup | 启动即开远控桥接 | 关 |
| Respect gitignore | 文件选择器跳过 gitignore | 开 |
| Compact response stats | 统计行紧凑格式 | 关 |
| External includes dialog | 加载项目外 CLAUDE.md 前询问 | 开 |
| Show response stats | 每条回复下的统计行 | 开 |
| Status in terminal tab | 状态同步到终端标签标题 | 开 |
| Show turn duration | 每轮结束打印用时 | 关 |
| Speculation | 投机预取(增加用量) | 关 |
| Spinner tips | 加载动画轮播贴士 | 开 |
| Task-complete notification | 长任务完成且未聚焦时通知 | 开 |
| Teammate default model | 子代理用的模型 | 继承 |
| Teammate mode | 队友运行方式 in-process/tmux | auto |
| Terminal progress bar | 向终端发 OSC 9;4 进度 | 开 |
| Theme | 配色+吉祥物+diff 三段工作室 | default |
| Thinking | 允许扩展思考 | 开 |
| Auto mode during plan | 执行计划期间临时 auto 权限 | 关 |
| Verbose | 完整命令输出与展开工具结果 | 关 |
| Welcome box | 启动带边框欢迎面板(`welcomeBox:false` 极简) | 开 |

仅配置文件可改的相关键:`assistantName`(提示词中的助手身份名,即 "You are X" 那句;默认=当前模型名剥 `[]` 后缀,如 `glm-5.2[1m]`→`glm-5.2`)、`productName`(提示词与工具描述中的产品名——`/help` 说明、环境信息段、Config/Read 工具描述;默认 `CCN`,白标部署可改)、`customEndpoints`/`selectedEndpointId`(见上)、
`customHeaders`(额外请求头对象,同名头替换)、`mascot`
(`starflower`/`clawd`/`heart`/`sparkle`/`rocket`)、`diffColors`
(`red-blue`/`red-green`)、`autoDreamEnabled`(后台记忆整理,默认关)。
