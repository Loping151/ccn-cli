#!/usr/bin/env bash
# CCN uninstaller.  Usage:
#   curl -fsSL https://raw.githubusercontent.com/Loping151/ccn-cli/main/uninstall.sh | bash
# Or, if ccn still runs:  ccn uninstall
set -u

APP="$HOME/.ccn-app"
BIN="$HOME/.local/bin/ccn"
CONFIG="${CLAUDE_CONFIG_DIR:-$HOME/.ccb}"
SHARED="$HOME/.claude"   # 与官方 claude 共享的 skill/记忆 —— 绝不删

ask() { local r; read -r -p "$1" r; printf '%s' "$r"; }
is_yes() { case "$1" in y|Y|yes|YES) return 0;; "") [ "${2:-no}" = yes ] && return 0 || return 1;; *) return 1;; esac; }

echo "Uninstall CCN"
echo "  app:      $APP"
echo "  launcher: $BIN"
echo "  config:   $CONFIG"
echo

is_yes "$(ask 'Uninstall CCN? [y/N] ')" no || { echo "Aborted. Nothing was removed."; exit 0; }

DEL_CONFIG=no
if is_yes "$(ask "Also delete config & sessions at $CONFIG? [y/N] ")" no; then
  DEL_CONFIG=yes
fi

# 绝不删共享目录
if [ "$DEL_CONFIG" = yes ] && [ "$CONFIG" = "$SHARED" ]; then
  echo "Config dir is $SHARED (shared with official Claude Code) — keeping it."
  DEL_CONFIG=no
fi

if [ "$DEL_CONFIG" = yes ]; then
  if is_yes "$(ask 'Back up config/sessions to a .tar.gz first? [Y/n] ')" yes; then
    stamp=$(date +%Y%m%d-%H%M%S)
    backup="$HOME/ccn-config-backup-$stamp.tar.gz"
    if tar -czf "$backup" -C "$(dirname "$CONFIG")" "$(basename "$CONFIG")" 2>/dev/null && [ -f "$backup" ]; then
      echo "Backup saved: $backup"
    else
      # ★ 备份失败必须中止删除
      echo "Backup FAILED — aborting uninstall, nothing was deleted." >&2
      exit 1
    fi
  fi
fi

rm -rf "$APP" 2>/dev/null
rm -f "$BIN" 2>/dev/null
[ "$DEL_CONFIG" = yes ] && rm -rf "$CONFIG" 2>/dev/null

echo
echo "CCN uninstalled."
[ "$DEL_CONFIG" = no ] && echo "Config & sessions kept at $CONFIG."
