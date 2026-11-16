# WatchButton

The "Get your FREE gift" bar on Home. It opens a rewarded video for free time.

Source: `SZFeatureHome/UI/BarViews.swift` (`WatchButtonView`, port of `watch-button`).

## When to use

Only on Home, in row 6 of the Home grid, for free users.

## Geometry

- 90 % wide, 65 pt high, fill `bar`, radius `radius` (18).
- Columns `*, 3*`.
- Icon: `videoicon.png`, 60 device pixels (20 pt at 3×), centred.
- Text: `f-14-fw-400`, one line that shrinks to fit, 5 pt right margin, natural alignment. The middle word (FREE) is weight 800 in `yellow`.

## States

Normal; pressed (scale 0.98, `pressedOpacity` 0.5, 200 ms linear).

## Arabic

Columns swap to `3*, *`: icon on the right, text right-aligned. The Arabic string has no third part.

## Contrast

- `text` on `bar`: 16.78:1. `yellow` on `bar`: 10.72:1. Pass.

## The consumer provides

`WatchButtonModel` (tap action).
