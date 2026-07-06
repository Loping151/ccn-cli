#!/usr/bin/env bash
# CCN one-line installer.  Usage:
#   curl -fsSL https://raw.githubusercontent.com/Loping151/ccn-cli/main/install.sh | bash
set -euo pipefail
: "${HOME:?HOME is unset — refusing to run}"   # 空 HOME 会让 rm -rf "$APP" 塌成 /.ccn-app

REPO="Loping151/ccn-cli"
BRANCH="main"
APP="$HOME/.ccn-app"
BIN="$HOME/.local/bin"
NODE_VER="v20.18.1"
PATH_MARKER="# added by ccn installer"

say() { printf '\033[36m==>\033[0m %s\n' "$*"; }
die() { printf '\033[31m!! %s\033[0m\n' "$*" >&2; exit 1; }
dl()  { curl -fSL --retry 3 --retry-delay 2 "$@"; }   # 带重试的下载

# ---- 1. Node.js >= 20 -------------------------------------------------------
nodemaj() { "$1" -p 'process.versions.node.split(".")[0]' 2>/dev/null || echo 0; }
NODE=""
if command -v node >/dev/null 2>&1 && [ "$(nodemaj node)" -ge 20 ] 2>/dev/null; then
  NODE="$(command -v node)"
fi
if [ -x "$HOME/.local/node/bin/node" ] && [ "$(nodemaj "$HOME/.local/node/bin/node")" -ge 20 ] 2>/dev/null; then
  NODE="$HOME/.local/node/bin/node"
fi
if [ -z "$NODE" ]; then
  say "Installing Node.js $NODE_VER (static) into ~/.local/node"
  case "$(uname -s)" in Darwin) plat=darwin;; *) plat=linux;; esac
  case "$(uname -m)" in x86_64|amd64) na=x64;; arm64|aarch64) na=arm64;; *) na=x64;; esac
  mkdir -p "$HOME/.local"
  nodetgz="$(mktemp)"   # 用 .tar.gz（gzip 万能，免 xz 依赖）
  dl "https://nodejs.org/dist/$NODE_VER/node-$NODE_VER-$plat-$na.tar.gz" -o "$nodetgz" \
    || die "Node download failed (network?)"
  tar -C "$HOME/.local" -xzf "$nodetgz" || die "Node extract failed"
  rm -f "$nodetgz"
  ln -sfn "$HOME/.local/node-$NODE_VER-$plat-$na" "$HOME/.local/node"
  NODE="$HOME/.local/node/bin/node"
fi
[ "$(nodemaj "$NODE")" -ge 20 ] 2>/dev/null || die "node >= 20 required"
say "Using node $("$NODE" -v)"

# ---- 2. Download dist（暂存 → 原子替换，失败不动旧安装） --------------------
say "Downloading CCN"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT
dl "https://github.com/$REPO/archive/refs/heads/$BRANCH.tar.gz" -o "$tmp/src.tgz" \
  || die "Download failed (network?)"
tar -xzf "$tmp/src.tgz" -C "$tmp" || die "Extract failed"
src="$tmp/ccn-cli-$BRANCH/dist"
[ -f "$src/cli-node.js" ] || die "dist/cli-node.js not found in download"
ver="$(tr -d '[:space:]' < "$tmp/ccn-cli-$BRANCH/VERSION" 2>/dev/null || true)"

# ---- 防降级 ----------------------------------------------------------------
# 已装版本 > 待装版本时，默认保持不动（CCN_FORCE=1 可强制）。
# 场景：机队用 rollout 直接推了比公开仓更新的 dist，用户又跑 `ccn update`——
# 若此时 update 取不到最新版本号(网络/代理)会盲目重装公开仓的旧 dist，造成降级。
# 这里在真正翻转 current 前拦一道，任何入口(curl|bash 或 ccn update)都受保护。
cur_ver=""
if [ -f "$APP/current/package.json" ]; then
  cur_ver="$("$NODE" -p "require('$APP/current/package.json').version" 2>/dev/null || true)"
fi
if [ -n "$cur_ver" ] && [ -n "$ver" ] && [ "$cur_ver" != "$ver" ] \
   && [ "${CCN_FORCE:-}" != 1 ] \
   && [ "$(printf '%s\n%s\n' "$cur_ver" "$ver" | sort -V | tail -1)" = "$cur_ver" ]; then
  say "Installed version ($cur_ver) is newer than the download ($ver) — keeping current."
  say "Run with CCN_FORCE=1 to reinstall the older version anyway."
  exit 0
fi

# 版本目录布局：每次安装进独立的 versions/<ver>-<时间戳>/，再原子翻转 current 指针。
# 运行中的旧会话钉在自己的版本目录里，懒加载的哈希 chunk 不受更新影响——
# 整目录替换会让长会话在退出/懒加载时报模块丢失甚至卡死。
VDIR="$APP/versions/${ver:-0.0.0}-$(date +%s)"
mkdir -p "$VDIR"
cp -R "$src/." "$VDIR/"
# type:module（node<20 需要）+ 真实版本号（供 ccn update 版本检测读取）
printf '{"type":"module","version":"%s"}\n' "${ver:-0.0.0}" > "$VDIR/package.json"
ln -sfn "$VDIR" "$APP/current"
# 清理旧平铺布局的顶层文件（一次性迁移；不动 versions/）
find "$APP" -maxdepth 1 -type f -delete 2>/dev/null || true
rm -rf "$APP/chunks" "$APP/vendor" 2>/dev/null || true
# 保留最近 4 个版本（在跑的旧会话还要用自己的版本目录）
ls -1dt "$APP/versions"/*/ 2>/dev/null | tail -n +5 | xargs -r rm -rf
rm -rf "$tmp"
trap - EXIT

# ---- 3. Launcher ------------------------------------------------------------
mkdir -p "$BIN"
cat > "$BIN/ccn" <<L
#!/usr/bin/env bash
NODE="$NODE"; [ -x "\$NODE" ] || NODE=node
# 解析 current 指针到真实版本目录：本进程钉死其中，更新只翻指针不打扰运行中的会话
DIR="\$(readlink -f "$APP/current" 2>/dev/null)"
{ [ -n "\$DIR" ] && [ -f "\$DIR/cli-node.js" ]; } || DIR="$APP"
exec "\$NODE" "\$DIR/cli-node.js" "\$@"
L
chmod +x "$BIN/ccn"

# ---- 4. PATH（多 rc 覆盖 + 唯一标记幂等；不存在的 rc 也创建） --------------
add_path_line() {
  local rc="$1"
  grep -qF "$PATH_MARKER" "$rc" 2>/dev/null && return 0
  printf '\n%s\nexport PATH="$HOME/.local/bin:$PATH"\n' "$PATH_MARKER" >> "$rc"
}
case ":$PATH:" in
  *":$BIN:"*) : ;;   # 当前会话已在 PATH
  *)
    wrote=no
    # 覆盖交互式(.bashrc/.zshrc)与登录式(.profile)——不存在也创建，确保各类 shell 都能生效
    for rc in "$HOME/.bashrc" "$HOME/.zshrc" "$HOME/.profile"; do
      touch "$rc" 2>/dev/null || continue
      add_path_line "$rc" && wrote=yes
    done
    [ "$wrote" = yes ] || say "Could not persist PATH automatically — add ~/.local/bin to PATH manually."
    ;;
esac

echo
say "CCN ${ver:+v$ver }installed  ->  $BIN/ccn"
cat <<EOF

Get started:
  export ANTHROPIC_BASE_URL="https://your-endpoint/anthropic"
  export ANTHROPIC_AUTH_TOKEN="your-key"
  export ANTHROPIC_MODEL="your-model"        # e.g. glm-5.2, deepseek-chat, MiniMax-M3
  ccn
  # Or just run 'ccn' and use /endpoint to set base URL + key + model in one place.

If 'ccn' is not found, open a new shell or run:
  export PATH="\$HOME/.local/bin:\$PATH"
EOF
