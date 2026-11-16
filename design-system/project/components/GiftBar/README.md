# GiftBar

The free-time bar on Home: a small ring, a yellow clock and a caption.

Source: `SZFeatureHome/UI/BarViews.swift` (`GiftBarView`, port of `gift-bar`).

## When to use

Only on Home, in row 3 of the Home grid, for free users.

## Geometry

- Width 85 % of the screen (79 % in Arabic). Height: the Home grid row (4 of 57 stars; 50 pt in this preview).
- Columns `*, *, 2*`: ring, clock, caption.
- Ring: 25 pt, 3 pt stroke, butt caps. The used share is `giftBar-ringTrack` from 12 o'clock; the rest is `giftBar-ringAlternative` (#FEC800, not the palette's #FFC700).
- Clock: at most 118 pt wide, centred; columns `11*, 3*, 11*, 3*, 11*`; `f-13-fw-800` in `yellow`.
- Caption: `f-13-fw-300`, 10 pt side margins, shrinks to fit, natural alignment. "of free time left" or "no free time left".

## Arabic

- Columns swap to `2*, *, *`: caption left, ring right. The bar is 79 % wide.
- Clock columns change to `5*, 2*, 5*, 2*, 5*`. The digits stay left to right.
- Caption is right-aligned.

## Contrast

- `yellow` on `background`: 12.57:1. Pass.
- `text` on `background`: 19.67:1. Pass.

## The consumer provides

`GiftBarModel`: hours, minutes, seconds and the remaining percentage.
