# RateUsView

The rate-us drawer: an illustration, "Did You Like The Service We Provide?" and NO / YES buttons.

Source: `SZFeatureSettings/UI/RateUsView.swift` (`RateUsView`, `RateUsCardView`; port of `rate-us.component.html` + `.scss`).

## When to use

When the app asks the user to rate it (Others › Rate Us, or the rate-us prompt). YES goes on to the App Store review; NO closes it.

## Geometry

- 560 pt high, full width. Background `assets/Illustrations/ratebackground.png`, cover, centred.
- A 480 pt grid, rows `16*, 3*, 5*`:
  - `assets/Illustrations/rateapp.png`, 65 % wide, aspect-fit, 5 pt down.
  - Title: `f-14-fw-600`, `text`, centred, line spacing 10, 40 % wide, wraps.
  - Buttons: a 70 % grid, columns `*, *`. Each button 120 × 50, radius 25, title `f-16-fw-600` `text`, padding 0 5. NO: `rateUs-noButton`. YES: `rateUs-yesButton`.
- The card scales up from 0 to 1 in 0.82 s, CSS `ease`.

## Arabic

- Not mirrored: NO stays on the left in every language (no `isRTL` branch). The title is centred.

## Contrast

- NO: `text` on `rateUs-noButton`: 14.26:1. Pass.
- YES: `text` on `rateUs-yesButton`: 3.07:1. **Fails** (known pair).
- Title: `text` on the background image. The image is not a token; not measured.

## The consumer provides

`RateUsModel` (`yes()`, `no()`).
