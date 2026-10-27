#!/bin/zsh
# Daily indexing job for blog.youmake.dev, started by the launchd agent
# dev.youmake.blog-indexing (installed by scripts/indexing/install.sh).
# Logs go to ~/.youmake-indexing/logs/. The agent removes itself once every
# sitemap URL is indexed or has been requested 3 times.

set -u
REPO="${0:A:h:h:h}"
STATE_DIR="$HOME/.youmake-indexing"
LOG="$STATE_DIR/logs/$(date +%Y-%m-%d).log"
LABEL="dev.youmake.blog-indexing"
export PATH="$HOME/.npm-global/bin:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:$PATH"

mkdir -p "$STATE_DIR/logs"
exec >>"$LOG" 2>&1
echo "=== $(date) ==="
cd "$REPO" || exit 1

# Run at most once per day, even if launchd fires again after a wake.
STAMP="$STATE_DIR/last-run"
if [[ -f "$STAMP" && "$(cat "$STAMP")" == "$(date +%Y-%m-%d)" ]]; then
  echo "already ran today"
  exit 0
fi

node scripts/indexing/indexing.mjs sync || exit 1
node scripts/indexing/indexing.mjs indexnow

# The Google steps need Chrome open with the Claude extension.
open -g -a "Google Chrome"
sleep 10

claude -p "$(cat scripts/indexing/daily-prompt.md)" \
  --chrome \
  --model sonnet \
  --allowedTools \
    "mcp__plugin_openseo_openseo__inspect_urls" \
    "mcp__claude-in-chrome__*" \
    "Bash(node scripts/indexing/indexing.mjs:*)"

date +%Y-%m-%d >"$STAMP"

if node scripts/indexing/indexing.mjs status; then
  echo "Finished: every page is indexed or has had 3 requests. Removing the daily job."
  osascript -e 'display notification "Indexing job finished. See ~/.youmake-indexing/state.json for pages Google still declines." with title "Youmake indexing"'
  launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null
  rm -f "$HOME/Library/LaunchAgents/$LABEL.plist"
fi
