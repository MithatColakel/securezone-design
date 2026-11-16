# VideoGiftPanel

The 580 pt reward sheet: watch rewarded ads, see the progress and claim free time. It uses **PanelButton** (see NoTimePanelView).

Source: `SZFeaturePaywalls/UI/PanelViews.swift` (`VideoGiftPanel`, `PanelButton`); sizes `Logic/Layouts.swift` (`VideoGiftPanelLayout`); model `Logic/VideoGiftPanelModel.swift`.

## When to use

From the home Watch button and the Gift bar.

## Geometry

- Panel: 580 pt, `bar` (#171D2E), radius 15, anchored to the TOP of its sheet (as NoTimePanel).
- Rows `3*, 2*, 5*, 3*, 13*, 5*, 6*` (about 47, 31, 78, 47, 204, 78, 94 pt).
- Close: `close.png` 19 pt wide in a 47 pt frame, 2.5 pt down, 20 pt from the right; a 75 × 47 pt tap target.
- Title `f-20-fw-700`, 75 % wide, one line. Subtitle `f-13-fw-400`, 70 %, wraps.
- Progress message `f-12-fw-400`, `green`, 5 pt top: "Watch 2 more videos to unlock the next reward" or "Congratulations!".
- Two Lottie views, not hit-testable: `ProgressBarNogradient.json` (132 pt, 50 pt bottom padding) and `Lottie_Gift_Revision.json` (140 pt, 25 pt top padding), drawn over it. The preview shows a labelled box; the files are in `assets/Lottie/`.
- Board: 89 % wide, `board`, radius 16, 12 pt vertical padding, 5 pt bottom margin. Two columns, two rows: "Remaining time" `f-14-fw-400` and the time `f-14-fw-800` (20 pt from the left); "Reward" `f-14-fw-400` (with `3xicon.png` 20 × 20 when tripled) and "30 min" `f-14-fw-800`, right-aligned, 20 pt from the right.
- PanelButtons (94 pt row, buttons 50 pt): left `blue` + `video.png` "Watch Ad"; right "Claim Reward" with `tickicon.png` on `buttonGray`, or with `tickicondark.png` and a `black` label on `buttonYellow` when complete.

## States

- **In progress:** Claim on `buttonGray`, white label.
- **Rewarded ad loading:** the Watch Ad content becomes a white NSActivityIndicator.
- **Complete:** Claim fades to `buttonYellow` over 1 s ease-in-out (live) and its label pulses.
- **Tripled reward:** `3xicon.png` before "Reward".

## Arabic

- The panel does not mirror: close stays right, buttons keep their sides, the board columns keep their sides.
- The board labels have natural alignment, so in Arabic they align right inside their column, and the left column keeps its 20 pt left padding. **Not checked on device.**

## Contrast

- `text` on `bar`: 16.78:1; `green` on `bar` (12 pt): 10.96:1; `text` on `board`: 17.86:1. Pass.
- `text` on `buttonGray`: 12.42:1; `black` on `buttonYellow`: 13.42:1. Pass.
- `text` on `blue` (Watch Ad): 2.56:1. **Fails** (known pair).

## The consumer provides

`VideoGiftPanelModel` and a `remainingTick` closure (the 1 s remaining-time tick).
