# GetPremiumView

The two subscription paywalls: **Get Premium** (three plans) and **Get Premium Week** (one weekly plan). Both use PaywallScaffold and PaywallHeader.

Source: `SZFeaturePaywalls/UI/GetPremiumViews.swift` (`GetPremiumView`, `SaveBubbleStrip`, `GetPremiumWeekView`); the button is `NSKitButton.swift`. Models: `Logic/GetPremiumModel.swift`, `Logic/GetPremiumWeekModel.swift`.

## When to use

Get Premium: from the home Get Premium bar, the profile premium box and other upsell points. Week: the weekly offer. It is presented as a sheet; on iPad the sheet is narrower than the screen (see below).

## Geometry: Get Premium (scrolls)

- PaywallHeader "Get Premium" (`f-18-fw-600`), 5 pt top padding.
- Illustration `assets/Illustrations/getpremium.png`, `75 × (screen height / 812)` % of the width (about 78 % on an 844 pt phone), aspect-fill, never wider than the page.
- Four feature rows in an 80 % × 100 pt grid, 5 pt below: columns `*, 4*`, `thickyellow.png` 15 × 15 centred, text `f-14-fw-400` (row 2 auto-fits).
- Save strip: 50 pt, 10 pt top. The bubble is 27 % wide, `gray`, radius 18, 35 pt high, text `f-13-fw-700` auto-fit; a 10 × 10 `gray` square turned 45° is the tip, 30 pt down. The model gives the x offset; a change slides in 300 ms ease-out.
- Plan cards: 90 % wide, 130 pt, three equal columns; each card `bar`, radius 18, 5 pt side margin; rows: `f-36-fw-600` number (10 pt top), `f-14-fw-400` unit, `f-14-fw-400` `yellow` price. Selected: 2 pt `yellow` border inside the card, side margin 1 pt.
- CTA "Start Subscription": NSKitButton kind yellow (`buttonYellow`, `black` title, `f-16-fw-600`), 70 % × 60 pt, radius 18, 30 pt top, 8 pt bottom. It pulses (`make-big` keyframes).
- Subline: `f-12-fw-400`, `darkLight`, centred. Free trial: "%1$@ free trial then %2$@"; no trial: "%1$@, auto-renews, cancel anytime". Empty until the App Store gives the price.
- Terms: 80 %, 30 pt top, `f-11-fw-300`, wrapping, centred. The spans are **white** (`text`), not `darkLight`: the global `Span { color: white }` rule wins. "Terms of Use" and "Privacy Policy" are underlined links.

## Geometry: Get Premium Week (fixed rows `45, *, 120, 220`)

- PaywallHeader "Get Premium" (`f-18-fw-500`).
- `assets/Illustrations/onboarding4.png`, 70 % wide, aspect-fit, 20 pt top.
- Features: 80 % × 120 pt, 20 pt down its row (not 40: see the code comment), ticks 20 × 20.
- CTA block (220 pt): yellow CTA 70 % × 60 pt, 50 pt top; subline `darkLight` `f-12-fw-400`; links line "Terms of Use and Privacy Policy" `f-12-fw-500` with " and " in `dark`, 80 %, 20 pt top; "About Subscription" `f-12-fw-300` `darkLight`, 70 %, 5 pt top, tappable.

## States

- Plan selected: 0, 1 or 2 (the save bubble slides to it).
- Free trial or not: the subline and the terms lead-in change.
- Price not loaded: no subline.
- Loading (purchase or restore): spinner above everything.

## iPad

The sheet is narrower than the screen. The save-bubble offset is scaled to the sheet width (a deviation from the old build, which used the screen width). On iPhone the two are the same.

## Arabic

- Header: close and Restore swap sides (see PaywallScaffold).
- Feature rows: columns `4*, *`, tick on the right, text right-aligned.
- Plan cards and the save strip do **not** mirror (pixel grid, left to right).
- Arabic numerals: the week and month cards show "١"; the year card shows "12" (as in the string table).

## Contrast

- `black` on `buttonYellow`: 13.42:1. Pass.
- `text` on `bar` (plan cards): 16.78:1; `yellow` on `bar` (price): 10.72:1; `text` on `gray` (save bubble): 16.53:1. Pass.
- `text` on `background` (terms, 11 pt): 19.67:1. Pass.
- `darkLight` on `background` (subline, About Subscription): 3.86:1. **Fails** (known pair).
- `dark` on `background` (" and "): 3.03:1. **Fails** (known pair).

## The consumer provides

`GetPremiumModel` (plans and prices, selected plan, save text and selector motion, free trial, loading, actions) and the screen width; `GetPremiumWeekModel` for Week.
