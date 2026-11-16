# PromotionDealView

The four deal pages (Promotional 1, 2, 3 and Introductory 1) in one view, with two layouts. It includes **CountdownBar**.

Source: `SZFeaturePaywalls/UI/PromotionDealView.swift` (`PromotionDealView`, `CountdownBar`, `DealTexts`); model `Logic/PromotionDealModel.swift`.

## When to use

Time-limited offers. Promotional 1 and Introductory 1 have no countdown (compact layout). Promotional 2 and 3 have a countdown.

## Geometry: compact (rows `4*, 9*, 2*, 4*, 3*, 2*`)

- Title `f-28-fw-600`, one line, 10 pt top.
- Illustration (`promotionaldeal1.png`; Introductory 1 uses it too), 70 % wide, aspect-fit, 10 pt top.
- Intro price `f-24-fw-600` `yellow`, 5 pt top.
- Body box: 80 % wide, `bar`, radius 20 (`radiusB`), 5 pt top; text `f-14-fw-400` centred, 10 pt margin, at the top of the box.
- CTA: kind blue (`blue`, `text` title, `f-16-fw-600`), 70 % × 62.5 pt, radius 20, never taller than its row.
- Subline: an unclassed 17 pt label (`f-17-fw-400`, UILabel default in a modal page).
- Legal: `f-10-fw-300` `darkLight`, 70 % wide, in its own scroll view (5 pt top, 1 pt bottom).
- The 60 pt DealCloseStrip lies over the top.

## Geometry: countdown (rows `4*, 12*, 2*, 4*, 4*, 3*, 2*, *, 2*`)

- Title `f-24-fw-600`, 70 % wide, wraps; the lines that do not fit are hidden, with no ellipsis. On a 390 pt phone the English Promotional 2 title needs 3 lines and shows 2 ("…For a Limited" — "Time Only" is lost). The preview draws 2 lines.
- Illustration (`promotionaldeal2.png` / `promotionaldeal3.png`), 70 %.
- Intro price `f-24-fw-600` `yellow`; body `f-16-fw-400`, 80 %, no box.
- **CountdownBar:** full width, 4 pt. A 1 pt `promotionDeal-countdownTrack` line 1.5 pt down; the `blue` fill (radius 1) grows with the elapsed share. It jumps once a second (no animation).
- Timer: 50 % wide, 20 pt top, columns `35*, 10*, 10*, 35*, 10*`: minutes `f-40-fw-800` right-aligned, "m" `f-14-fw-400` top, ":" `f-40-fw-800`, seconds `f-40-fw-800` centred, "s" top. "m", ":" and "s" are hard-coded in the template (not localized).
- CTA (as compact), subline (17 pt), "Miss the chance" `f-14-fw-600` `cBlue` (closes), legal.

## States

- Loading: spinner below the content (Promotional 1, 3, Introductory 1) or above everything (Promotional 2).
- Countdown running: the bar and the digits update each second.

## Arabic

- The close icon moves to the right column.
- Texts are centred, so the order does not change.
- The Arabic Promotional 1 price line "احصل على Premium الآن مقابل $0.99" is one line at 24 pt and is wider than a 390 pt phone. The preview cuts it with an ellipsis, so the price is lost. **Not checked on device** (SF Arabic widths differ from the preview font).
- The timer grid does **not** mirror: minutes stay left, seconds right, and "m" / "s" stay in English. **Not checked on device.**

## Contrast

- `text` on `blue` (CTA): 2.56:1. **Fails** (known pair).
- `darkLight` on `background` (legal 10 pt): 3.86:1. **Fails** (known pair).
- `yellow` on `background` (24 pt w600): 12.57:1; `cBlue` on `background`: 7.59:1; `text` on `bar`: 16.78:1. Pass.
- CountdownBar fill `blue` on `background`: 7.69:1. Pass. The track `promotionDeal-countdownTrack` on `background`: 2.37:1. Below 3:1, but the fill carries the meaning.

## The consumer provides

`PromotionDealModel`: the deal, the prices, `elapsedPercent`, minutes and seconds text, loading, and the actions.
