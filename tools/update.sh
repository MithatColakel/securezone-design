#!/usr/bin/env bash
# Refresh this review copy from a commit on the design-system branch of SecurezoneVPN.
#   tools/update.sh <SecurezoneVPN checkout> <commit>
# Copies only the published folders: design-canvas/project (screen canvas), design-paywalls/project and
# design-paywalls/assets (paywall canvas), design-system/project (Design System page).
# Stops if a copied file names the other app or a person, holds a secret or personal data, or loads from an Apple host.
set -euo pipefail
SRC="$1"; COMMIT="$2"
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
PATHS=()
for p in design-canvas/project design-paywalls/project design-paywalls/assets design-system/project; do
  if [ -n "$(git -C "$SRC" ls-tree -d --name-only "$COMMIT" -- "$p")" ]; then PATHS+=("$p"); fi
done
for p in design-canvas/project design-paywalls/project design-system/project; do
  case " ${PATHS[*]} " in *" $p "*) ;; *) echo "STOP: $p is missing at $COMMIT" >&2; exit 1 ;; esac
done
rm -rf "$ROOT/design-canvas" "$ROOT/design-paywalls" "$ROOT/design-system" "$ROOT/shots"
git -C "$SRC" archive "$COMMIT" "${PATHS[@]}" | tar -x -C "$ROOT"
# Public page (board, 2026-11-15): no other app, no person, no secret, no personal data, no Apple host.
python3 "$ROOT/tools/check_public.py" "$ROOT"
# Claude Design supplies support.js on claude.ai; a normal browser needs no script.
for d in design-canvas/project design-paywalls/project; do
  printf '/* Placeholder: Claude Design provides support.js on claude.ai. The frames need no script in a normal browser. */\n' > "$ROOT/$d/support.js"
done
# Keep the review copy out of search engines.
find "$ROOT/design-canvas" "$ROOT/design-paywalls" "$ROOT/design-system" -name '*.html' -exec sed -i '0,/<meta charset="utf-8">/s//<meta charset="utf-8">\n<meta name="robots" content="noindex,nofollow">/' {} +
python3 "$ROOT/tools/build_data.py" "$(git -C "$SRC" rev-parse --short "$COMMIT")"
PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-/opt/ms-playwright}" node "$ROOT/tools/shoot.cjs"
echo "Done. Check the page locally (python3 -m http.server), then commit and push to main."
