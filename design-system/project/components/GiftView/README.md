# GiftView

The welcome-gift page: "Enjoy Your 24-Hour Free Access".

Source: `SZFeaturePaywalls/UI/SmallPaywallViews.swift` (`GiftView`); model `GiftModel`.

## When to use

Once, as the welcome gift for a new user.

## Geometry (rows `10*, 6*, 4*`)

- `assets/Illustrations/gift.png`, 90 % wide, aspect-fit, 30 pt top.
- Title `f-28-fw-600`, 90 % wide, wraps, 30 pt top.
- Subtitle `f-13-fw-300`, `cGray`, 70 % wide, wraps, 5 pt line spacing, 30 pt top.
- Button "Start now": kind blue, 70 % × 60 pt, radius 18, at the top of its row, 8 pt below the top.
- No close button and no spinner. The page is on `background`.

## States

One state. The button continues.

## Arabic

All texts are centred. The Arabic subtitle starts with a space in the string table (the code keeps it).

## Contrast

- `text` on `blue` (button): 2.56:1. **Fails** (known pair).
- `cGray` on `background` (13 pt w300): 9.81:1. Pass.

## The consumer provides

`GiftModel` with `continueTapped()`.
