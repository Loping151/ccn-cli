# Slash commands · 斜杠指令

Type `/` inside CCN to see the live list; this is the reference.

| Command | Description | 说明 |
|---|---|---|
| `/endpoint` | Manage API endpoints (URL/key/model/tag), switch live | 端点管理,选中即生效 |
| `/model` | Pick the session model (lists only what you configured) | 选模型(只列你配置的) |
| `/quota` | Vendor coding-plan quota/balance (GLM/DeepSeek/MiniMax) | 厂商额度/余额查询 |
| `/usage` (`/cost`, `/stats`) | Session + all-time usage stats | 本会话与历史用量统计 |
| `/effort` | Reasoning effort: low / medium / high / xhigh | 思考强度 low→xhigh |
| `/lang` | Interface language: en / zh / auto | 界面语言 |
| `/theme` | Palette + mascot + diff colors studio | 主题三段(配色/吉祥物/diff) |
| `/config` (`/settings`) | Settings panel (each item documented in-panel) | 配置面板(带每项说明) |
| `/tui` | `fullscreen` / `default` render mode | 全屏/标准渲染切换 |
| `/clear` | Wipe conversation history, free context | 清空对话释放上下文 |
| `/compact` | Summarize old history to free context | 压缩历史腾上下文 |
| `/context` | Visualize context usage as a grid | 上下文占用可视化 |
| `/resume` | Resume a previous conversation | 恢复历史会话 |
| `/rewind` | Roll code/conversation back to a checkpoint | 回退到检查点 |
| `/diff` | Uncommitted changes + per-turn diffs | 未提交改动与逐轮 diff |
| `/init` | Generate/update CLAUDE.md for the project | 生成项目 CLAUDE.md |
| `/memory` | Edit persistent memory files | 编辑记忆文件 |
| `/mcp` | Manage MCP servers | 管理 MCP |
| `/permissions` | Tool allow/deny rules | 工具权限规则 |
| `/mode` | Switch permission mode | 切权限模式 |
| `/plan` | Plan mode / show current plan | 计划模式 |
| `/agents` | Manage subagent definitions | 子代理配置 |
| `/tasks` | List/manage background tasks | 后台任务 |
| `/workflows` | Live workflow monitor panel | workflow 监控面板 |
| `/status` | Session/account/endpoint status | 会话与端点状态 |
| `/statusline` | Configure the bottom status line | 底部状态栏配置 |
| `/hooks` | Tool-event hook configuration | hook 配置 |
| `/skills` | List available skills | 技能列表 |
| `/skill-search` | Auto skill matching控制 | 自动技能匹配 |
| `/export` | Export conversation to file/clipboard | 导出对话 |
| `/copy` | Copy last response | 复制上一条回复 |
| `/files` | Files currently in context | 上下文中的文件 |
| `/add-dir` | Add a working directory | 添加工作目录 |
| `/vim` | Toggle vim input mode | vim 输入模式 |
| `/keybindings` | Open keybindings config | 快捷键配置 |
| `/help` | Help & available commands | 帮助 |
| `/doctor` | Diagnose installation/settings | 安装诊断 |
| `/version` | Show version | 版本 |
| `/exit` | Quit | 退出 |
| `/poor` | Budget mode (skip extra API calls) | 穷鬼模式 |
| `/recap` / `/summary` | One-line recap / full summary | 会话回顾/摘要 |
| `/rename` / `/tag` | Rename / tag the conversation | 重命名/打标签 |
| `/review` / `/security-review` / `/pr-comments` | PR review helpers (need `gh`) | PR 审查相关 |
| `/commit` / `/commit-push-pr` | Git commit / commit+push+PR | 提交/提交并开 PR |
| `/web-tools` | Web search/fetch backends | 联网搜索后端 |
| `/ide` | IDE integration status | IDE 集成 |
| `/hooks`, `/env`, `/release-notes`, `/privacy-settings` | Introspection & misc | 其它 |

Keyboard: `ctrl+o` expands collapsed content (thinking etc.) into the full
transcript view; `ctrl+e` toggles show-all there; `ctrl+t` todo list;
`ctrl+l` redraw; `↑` history (suggestions resume after submit).
