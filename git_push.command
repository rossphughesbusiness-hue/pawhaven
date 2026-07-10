#!/bin/bash
# PawHaven — git commit + push helper
# Double-click this file in Finder to run (macOS Terminal opens automatically)
# This exists because Claude's sandbox cannot delete .git/index.lock on the FUSE mount

cd "$(dirname "$0")"
rm -f .git/index.lock .git/HEAD.lock

git add -A

echo ""
echo "Changes staged:"
git status --short
echo ""

read -p "Enter commit message (or press Enter for default): " MSG
if [ -z "$MSG" ]; then
  MSG="chore: update pawhaven"
fi

git commit -m "$MSG"
git push

echo ""
echo "=== DONE — Vercel will auto-deploy in ~2 minutes ==="
read -p "Press Enter to close..."
