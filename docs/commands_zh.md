# 斜杠指令

[English](commands.md) · **中文**

在 CCN 里输入 `/` 可看实时可搜索列表。下表为第三方端点下可见的指令
(官方订阅专属指令会自动隐藏),已对照当前构建核对。

## 端点与模型

| 指令 | 说明 |
|---|---|
| `/endpoint` | 端点管理(URL/密钥/模型/别名):新增、`e` 编辑、`d` 删除、选中即对当前会话生效 |
| `/model` | 选会话模型——只列你配置过的(角色映射、`ANTHROPIC_MODEL`、端点档案) |
| `/provider` | 切换 API 供应商(anthropic 兼容 / openai / gemini / grok / bedrock / vertex / foundry) |
| `/quota` | 厂商 coding plan 额度/余额(GLM / DeepSeek / MiniMax,按 base URL 自动识别) |
| `/usage`(`/cost`、`/stats`) | 本会话 + 历史用量统计 |
| `/effort` | 思考强度:`low` / `medium` / `high` / `xhigh` / `auto` |

## 会话与上下文

| 指令 | 说明 |
|---|---|
| `/clear` | 清空对话历史,释放上下文 |
| `/compact [说明]` | 总结压缩旧历史腾出上下文 |
| `/context` | 彩色网格可视化上下文占用 |
| `/resume` | 恢复历史会话 |
| `/rewind` | 代码/对话回退到检查点 |
| `/branch` | 在当前位置创建对话分支 |
| `/fork` | 把会话 fork 成子代理 |
| `/rename` / `/tag` | 重命名 / 打标签 |
| `/recap` / `/summary` | 一行回顾 / 完整摘要 |
| `/export` | 导出对话到文件/剪贴板 |
| `/copy [N]` | 复制最近(或倒数第 N 条)回复 |
| `/files` | 上下文中的文件 |
| `/add-dir` | 添加工作目录 |
| `/memory` | 编辑持久记忆文件 |
| `/goal` | 设置/查看驱动自动续跑的目标 |
| `/btw` | 不打断主线问个小问题 |

## 界面

| 指令 | 说明 |
|---|---|
| `/config`(`/settings`) | 配置面板——每项就地显示含义与默认值 |
| `/theme` | 配色 + 吉祥物 + diff 三段主题工作室 |
| `/lang` | 界面语言:`en` / `zh` / `auto` |
| `/tui` | 渲染模式:`fullscreen` / `default` / `status`(即时生效) |
| `/vim` | Vim 输入模式开关 |
| `/color` | 本会话输入条颜色 |
| `/keybindings` | 打开快捷键配置 |
| `/statusline` | 配置状态栏 |
| `/onboarding` | 重跑首次设置 |

## 权限与模式

| 指令 | 说明 |
|---|---|
| `/permissions` | 工具允许/拒绝规则 |
| `/mode` | 交互模式(default、gentle、sharp、workhorse、token-saver…) |
| `/plan` | 计划模式 / 查看当前计划 |
| `/proactive` | 主动(自主)模式开关 |
| `/poor` | 穷鬼模式:跳过记忆提取/建议省 token |
| `/privacy-settings` | 隐私设置 |
| `/security-review` | 待提交改动的安全审查 |

## Git 与 GitHub(需 `git`/`gh`)

| 指令 | 说明 |
|---|---|
| `/diff` | 未提交改动 + 逐轮 diff |
| `/commit` / `/commit-push-pr` | 提交 / 提交+推送+开 PR |
| `/review` / `/pr-comments` | 审查 PR / 拉取 PR 评论 |
| `/issue` | 创建 GitHub issue |
| `/autofix-pr` | 自动修 PR 的 CI 失败 |
| `/share` | 上传会话日志到 Gist |

## 后台与多会话

| 指令 | 说明 |
|---|---|
| `/tasks` | 后台任务管理 |
| `/workflows` | workflow 实时监控面板 |
| `/monitor` | 后台 shell 监视(Shift+Down 查看) |
| `/daemon` | 后台会话/守护进程管理 |
| `/attach` / `/detach` / `/send` / `/history` / `/peers` | 终端间子 CLI 管道 |
| `/remote-control` / `/remote-control-server` | 远控桥接 / 自托管远控服务器 |
| `/coordinator` | 多 worker 协调模式 |

## 插件、技能、MCP

| 指令 | 说明 |
|---|---|
| `/mcp` | MCP 服务器管理 |
| `/plugin` / `/reload-plugins` | 插件管理 / 应用待生效插件改动 |
| `/skills` | 技能列表 |
| `/skill-search` | 自动技能匹配控制 |
| `/skill-learning` | 技能学习(观察/分析/演化) |
| `/agents` | 子代理定义管理 |
| `/init` | 生成/更新项目 CLAUDE.md(可选技能/hook) |
| `/init-verifiers` | 创建自动验证改动的 verifier 技能 |
| `/hooks` | 工具事件 hook 配置 |
| `/local-memory` / `/local-vault` | 本地笔记库 / 本地加密密钥库 |

## 诊断与其它

| 指令 | 说明 |
|---|---|
| `/status` | 会话/端点/模型状态 |
| `/doctor` | 安装与设置诊断 |
| `/env` | 环境、运行时、功能开关 |
| `/insights` | 会话使用洞察报告 |
| `/help` | 帮助与指令列表 |
| `/version` | 版本号 |
| `/release-notes` | 发布说明 |
| `/exit` | 退出 |
| `/voice` | 语音输入(`/voice doubao` 用豆包 ASR) |
| `/web-tools` | 联网搜索/抓取后端 |
| `/ide` | IDE 集成状态 |
| `/buddy` | 孵一只编码伙伴宠物 |

## 键盘

`ctrl+o` 展开折叠内容(thinking 等)进转录视图 · `ctrl+e` 转录内全部展开 ·
`ctrl+t` 待办列表 · `ctrl+r` 搜索历史 · `ctrl+l` 重绘 ·
`↑` 历史(提交后候选词恢复) · `Shift+Tab` 循环权限模式。
