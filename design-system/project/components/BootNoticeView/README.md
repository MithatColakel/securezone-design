# BootNoticeView

The "can't reach the server" notice. It sits at the bottom of the splash while the boot retries, so the logo keeps running above it.

Source: `SZFeatureOnboarding/UI/LaunchOverlayStack.swift` (`LaunchOverlayStack`, `BootNoticeView`); texts `Logic/LaunchModels.swift` (`BootNoticeContent`).

## When to use

During the boot, when the first server call has not answered yet. It is removed when the boot is done.

## Geometry

- Card at the bottom: `bar`, radius `bootNoticeRadius` (16), margin `bootNoticeMargin` (24), padding `bootNoticePadding` (20).
- Title `f-17-fw-600` `text`, centred, wraps.
- Body `f-14-fw-400` `bootNoticeBody`, centred, wraps, 6 pt top.
- "Try again": `blue` with `bootNoticeButtonTitle` title, `f-15-fw-600`, radius `bootNoticeButtonRadius` (12), 40 pt high (`bootNoticeButtonHeight`; the old CSS said 44, the theme made it 40), 16 pt top, 16 pt side and 8 pt bottom margins.

## States

- **Unreachable:** "Can't reach the server" / "We're still trying…".
- **Offline:** "No internet connection" / "Check your connection…".
- Retry cuts the current wait short. It never starts a second retry chain.

## Arabic

Texts are centred and right to left. Nothing moves.

## Splash bar

The notice lies above the splash. On a 390 × 844 phone the splash bar's top is at 75 % of the safe area (about 572 pt) and the card's top is at about 559 pt (English), so the card covers the bar. The Arabic offline body is one line, so that card is lower and the bar shows just above it. **Not checked on device.**

## Contrast

- `text` on `bar`: 16.78:1; `bootNoticeBody` on `bar`: 6.64:1; `bootNoticeButtonTitle` on `blue`: 7.40:1. Pass.

## The consumer provides

`offline` and `onRetry`. `LaunchOverlayStack` decides when it shows (`bootNoticeVisible && !isLoadingDone`).

## Related

The end-of-boot "no internet" alert is a system alert with hard-coded English text (`EndOfBootAlert`); it has no card.
