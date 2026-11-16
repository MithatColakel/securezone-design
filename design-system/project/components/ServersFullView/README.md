# ServersFullView

The "Servers are full!" page. It offers Premium (or a free trial) when the free servers are full.

Source: `SZFeaturePaywalls/UI/SmallPaywallViews.swift` (`ServersFullView`); model `Logic/SmallPaywallModels.swift` (`ServersFullModel`).

## When to use

When a free user connects and the free servers are full.

## Geometry (rows `2*, 10*, 4*, 3*, 2*`)

- Title `f-28-fw-600`, one line, 30 pt top.
- `assets/Illustrations/serversfull.png`, 70 % wide, aspect-fit, 30 pt top.
- Subtitle `f-22-fw-600`, 70 % wide, wraps, 30 pt top.
- CTA: kind blue (`blue`, `text` title, `f-16-fw-600`), 70 % × 52.5 pt, radius 18, at the bottom of its row, 8 pt above the bottom.
- "No, thanks. I'm ok with Ads": `f-16-fw-600`, `cBlue`, centred. It closes the page.
- No close button. The spinner covers everything.

## States

- **Free trial / no trial:** the subtitle and the CTA text change ("Start free trial" / "Get Premium").
- **Before the delay:** no "No, thanks" (`showButton` is false). After the delay it shows.
- **Loading:** spinner above everything.

## Arabic

All texts are centred, so nothing moves. Text is right to left.

## Contrast

- `text` on `blue` (CTA): 2.56:1. **Fails** (known pair).
- `cBlue` on `background`: 7.59:1; `text` on `background`: 19.67:1. Pass.

## The consumer provides

`ServersFullModel`: `freeTrial`, `price`, `showButton`, `loading`, `purchase()`, `close()`.
