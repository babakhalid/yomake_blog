#!/bin/zsh
# Installs the daily indexing job as a launchd agent: every day at 09:30 (or at
# the next wake if the laptop was asleep), run scripts/indexing/run-daily.sh.
#   zsh scripts/indexing/install.sh            install or update
#   zsh scripts/indexing/install.sh uninstall  remove
set -eu
REPO="${0:A:h:h:h}"
LABEL="dev.youmake.blog-indexing"
PLIST="$HOME/Library/LaunchAgents/$LABEL.plist"

launchctl bootout "gui/$(id -u)/$LABEL" 2>/dev/null || true
if [[ "${1:-}" == "uninstall" ]]; then
  rm -f "$PLIST"
  echo "Removed $LABEL"
  exit 0
fi

chmod +x "$REPO/scripts/indexing/run-daily.sh"
cat >"$PLIST" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>Label</key><string>$LABEL</string>
  <key>ProgramArguments</key>
  <array><string>/bin/zsh</string><string>$REPO/scripts/indexing/run-daily.sh</string></array>
  <key>StartCalendarInterval</key>
  <dict><key>Hour</key><integer>9</integer><key>Minute</key><integer>30</integer></dict>
  <key>StandardOutPath</key><string>$HOME/.youmake-indexing/launchd.log</string>
  <key>StandardErrorPath</key><string>$HOME/.youmake-indexing/launchd.log</string>
</dict>
</plist>
EOF
mkdir -p "$HOME/.youmake-indexing"
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "Installed $LABEL: runs daily at 09:30. Logs: ~/.youmake-indexing/logs/"
