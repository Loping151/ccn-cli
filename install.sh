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
trap 'rm -rf "$tmp" "$APP.new"' EXIT
dl "https://github.com/$REPO/archive/refs/heads/$BRANCH.tar.gz" -o "$tmp/src.tgz" \
  || die "Download failed (network?)"
tar -xzf "$tmp/src.tgz" -C "$tmp" || die "Extract failed"
src="$tmp/ccn-cli-$BRANCH/dist"
[ -f "$src/cli-node.js" ] || die "dist/cli-node.js not found in download"
ver="$(tr -d '[:space:]' < "$tmp/ccn-cli-$BRANCH/VERSION" 2>/dev/null || true)"

rm -rf "$APP.new"; mkdir -p "$APP.new"
cp -R "$src/." "$APP.new/"
# type:module（node<20 需要）+ 真实版本号（供 ccn update 版本检测读取）
printf '{"type":"module","version":"%s"}\n' "${ver:-0.0.0}" > "$APP.new/package.json"
# 原子替换：先挪走旧的再落新的，失败可回滚
rm -rf "$APP.old"
[ -d "$APP" ] && mv "$APP" "$APP.old"
mv "$APP.new" "$APP" || { [ -d "$APP.old" ] && mv "$APP.old" "$APP"; die "Install swap failed"; }
rm -rf "$APP.old" "$tmp"
trap - EXIT

# ---- 3. Launcher ------------------------------------------------------------
mkdir -p "$BIN"
cat > "$BIN/ccn" <<L
#!/usr/bin/env bash
NODE="$NODE"; [ -x "\$NODE" ] || NODE=node
exec "\$NODE" "$APP/cli-node.js" "\$@"
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
say "CCN installed  ->  $BIN/ccn"
cat <<EOF

Get started:
  export ANTHROPIC_BASE_URL="https://your-endpoint/anthropic"
  export ANTHROPIC_AUTH_TOKEN="your-key"
  ccn                      # or run 'ccn' and configure with /endpoint

If 'ccn' is not found, open a new shell or run:
  export PATH="\$HOME/.local/bin:\$PATH"
EOF
