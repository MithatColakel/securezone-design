# InformationBar

Two grey pills on Home that show the current IP address and the ping.

Source: `SZFeatureHome/UI/BarViews.swift` (`InformationBarView`, port of `information-bar`).

## When to use

Only on Home, in row 2 of the Home grid.

## Geometry

- 35 pt high, full width.
- Left pill from 5 % to 47.5 % of the bar width; right pill from 52.5 % to 95 %.
- Pill: fill `gray`, radius `radiusM` (10). Text `f-14-fw-400`, `text`, centred.
- Text: `IP: <address>` and `PING: <n> ms` (not localized).

## Arabic

Not mirrored. The template has no RTL branch, so IP stays on the left.

## Contrast

`text` on `gray`: 16.53:1. Pass.

## The consumer provides

`InformationBarModel`: the IP and ping texts. The pills fade and move with the stage animation.
