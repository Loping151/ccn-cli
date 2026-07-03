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

say() { printf '\033[36m==>\033[0m %s\n' "$*"; }

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
  curl -fsSL "https://nodejs.org/dist/$NODE_VER/node-$NODE_VER-$plat-$na.tar.xz" -o /tmp/ccn-node.tar.xz
  tar -C "$HOME/.local" -xf /tmp/ccn-node.tar.xz
  ln -sfn "$HOME/.local/node-$NODE_VER-$plat-$na" "$HOME/.local/node"
  rm -f /tmp/ccn-node.tar.xz
  NODE="$HOME/.local/node/bin/node"
fi
say "Using node $("$NODE" -v)"

# ---- 2. Download dist -------------------------------------------------------
say "Downloading CCN"
tmp="$(mktemp -d)"
curl -fsSL "https://github.com/$REPO/archive/refs/heads/$BRANCH.tar.gz" | tar -xz -C "$tmp"
src="$tmp/ccn-cli-$BRANCH/dist"
[ -d "$src" ] || { echo "!! dist not found in download"; exit 1; }
ver="$(cat "$tmp/ccn-cli-$BRANCH/VERSION" 2>/dev/null | tr -d '[:space:]')"
rm -rf "$APP"; mkdir -p "$APP"
cp -R "$src/." "$APP/"
# 写 type:module（node<20 需要）+ 真实版本号（供 ccn update 版本检测读取）
printf '{"type":"module","version":"%s"}\n' "${ver:-0.0.0}" > "$APP/package.json"
rm -rf "$tmp"

# ---- 3. Launcher ------------------------------------------------------------
mkdir -p "$BIN"
cat > "$BIN/ccn" <<L
#!/usr/bin/env bash
NODE="$NODE"; [ -x "\$NODE" ] || NODE=node
exec "\$NODE" "$APP/cli-node.js" "\$@"
L
chmod +x "$BIN/ccn"

# ---- 4. PATH ----------------------------------------------------------------
case ":$PATH:" in
  *":$BIN:"*) ;;
  *)
    for rc in "$HOME/.bashrc" "$HOME/.zshrc"; do
      [ -f "$rc" ] || continue
      grep -q '\.local/bin' "$rc" 2>/dev/null || printf '\nexport PATH="$HOME/.local/bin:$PATH"\n' >> "$rc"
    done
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
