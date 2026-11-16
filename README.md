# Securezone VPN · design review

A static review copy of the Securezone VPN design, with a Figma-like viewer.

- **Page:** https://mithatcolakel.github.io/securezone-design/
- **Source:** branch `design-system` of the SecurezoneVPN repository: the screen canvas (`design-canvas/project/`), the paywall canvas (`design-paywalls/project/`, images in `design-paywalls/assets/`) and the Design System page (`design-system/project/`). The commit is shown at the top of the page.
- **Content:** this app only. Prices in the frames are samples; the App Store sets the real price in each country.

## Review

- **Screens** and **Paywalls**, each with an **iPhone**, **iPad** and **Mac** page: every frame at its place on the canvas. Scroll or drag to move, Ctrl/⌘ + scroll or pinch to zoom, double-click a frame to open it at full size.
- **Design system:** tokens, components and states, each with its notes, plus the guide.
- **Fonts:** the canvas images are rendered on Linux without SF Pro, so their type is a fallback font. Open a frame to see it in your browser's fonts.
- **Comments:** press `C` and click a spot on a frame. Comments stay in your browser. *Comments › Copy all* gives a text with the frame names and spots to paste into the task.
- **Links:** `#f=<frame>` selects a frame, `#open=<frame>` opens it, `#p=<page>` opens a page, `#ds=<card>` opens a Design System card.
  - A frame id is `<canvas>/<file name without .dc.html>`: `screens/…` for the screen canvas, `paywalls/…` for the paywall canvas. Example: `#open=paywalls/Main`.
  - Page ids: `screens-iphone`, `screens-ipad`, `screens-mac`, `paywalls-iphone`, `paywalls-ipad`, `paywalls-mac`.

## Update to a new commit

```sh
tools/update.sh <SecurezoneVPN checkout> <commit>   # copies the published folders, checks them, renders the images
python3 -m http.server                             # check the page locally
git add -A && git commit -m "Update to <commit>" && git push
```

GitHub Pages publishes the `main` branch in one to two minutes. Then check the live page.

**Public page.** The board decided that this page is public (2026-11-15). It shows this app only. `tools/check_public.py` (run by `tools/update.sh`) stops the update if any file of the site names another app or a person, holds a secret, a key, a token, the Apple team id, an e-mail address or a real IP address, or loads from an Apple host. It keeps the names only as hashes, so it names nobody itself. Fix the source on `design-system`, then run the update again. The renderer loads only local files and lists any other request.

## Files

- `index.html`, `viewer/`: the viewer (no build step, no dependencies). `viewer/fonts/`: the Inter UI font (SIL Open Font License).
- `viewer/data.json`: pages, frames, sections and notes from both `canvas.json` files, cards from the `@dsCard` markers.
- `shots/`: JPEG renders of each frame (0.15×, 0.5×, 1×) and each card.
- `tools/`: `update.sh`, `check_public.py`, `build_data.py`, `shoot.cjs` (Playwright).
