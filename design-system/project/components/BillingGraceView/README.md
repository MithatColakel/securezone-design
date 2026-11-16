# BillingGraceView

The billing-problem bottom sheet (VPN-356). Two stages: **grace** ("Your Premium Access Is at Risk") and **paused** ("Premium is paused").

Source: `SZFeaturePaywalls/UI/BillingGraceView.swift` (`BillingGraceView`, `BillingGraceLayout`); model `Logic/BillingGraceModel.swift`.

## When to use

When the App Store reports a billing problem on the subscription.

## Geometry

- Panel: 300 pt, `noTimePanelSheet` (#3A3F4C), radius 30, anchored to the top of its sheet. Padding: 24 pt sides, 8 pt bottom.
- Close: `close.png` 19 × 19 in a 44 × 44 target, 8 pt top, at the trailing edge (−8 pt horizontal padding).
- Title `f-21-fw-600`, `text`, centred, 6 pt top. The grace title starts with the ⚠️ emoji from the string table.
- Body `f-14-fw-400`, `billingGrace-body` (`text` at 0.85), centred, 10 pt top.
- Space (min 16 pt), then "Update payment": full width, min 50 pt, `blue`, radius 16, `f-16-fw-600` `text`.
- "Later": full width, min 40 pt, `f-14-fw-400`, `billingGrace-footnote` (`text` at 0.6). It closes.

## States

- Grace / paused: the title and body change.

## Arabic

- This sheet mirrors the close button: it moves to the leading edge (left).
- The title and body get a right-to-left base direction, so the Arabic full stop and the ⚠️ sit at the correct end.

## Contrast

- `text` on `noTimePanelSheet`: 10.52:1; `billingGrace-body`: 8.12:1; `billingGrace-footnote` (Later): 4.96:1. Pass.
- `text` on `blue` (Update payment): 2.56:1. **Fails** (known pair).

## The consumer provides

`BillingGraceModel`: `stage`, `updatePaymentTapped()`, `close()`.
