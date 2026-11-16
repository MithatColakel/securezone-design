# GetPremiumBar

The banner at the top of Home for free users: a glowing diamond and two lines that open the Get Premium page.

Source: `SZFeatureHome/UI/BarViews.swift` (`GetPremiumBarView`, port of `get-premium-bar`); glow in `SZFeatureHome/Bars/BarModels.swift:228`.

## When to use

Only in row 0 of Home, for free users. Premium users see the Premium header instead.

## Geometry

- 100 pt high, full width. Fill `bar`, bottom corners `topBarBottom` (12). The fill runs up under the status bar.
- Columns `*, 4*`.
- Diamond: `diamondicon.png`, 70 device pixels (23.3 pt at 3×), centred, with the `diamondGlow` shadow (`buttonYellow` at 0.7, radius 10).
- Title: `f-14-fw-600` in `yellow`, at the bottom of the upper half. Subtitle: `f-14-fw-400` in `text`, at the top of the lower half; it wraps.
- The whole bar is one button.

## Arabic

Columns swap to `4*, *`: diamond on the right. Lines are right-aligned.

## Contrast

- `yellow` on `bar`: 10.72:1. Pass.
- `text` on `bar`: 16.78:1. Pass.

## The consumer provides

`GetPremiumBarModel` (tap action, glow animation).
