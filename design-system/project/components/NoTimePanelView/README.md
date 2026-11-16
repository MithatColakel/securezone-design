# NoTimePanelView

The "Free time is over" bottom sheet. It includes **PanelButton**, the two-button row that the reward panel uses too.

Source: `SZFeaturePaywalls/UI/PanelViews.swift` (`NoTimePanelView`, `PanelButton`, `PanelCloseIcon`, `PanelCloseTarget`); sizes in `Logic/Layouts.swift` (`NoTimePanelLayout`, `PanelButtonGeometry`).

## When to use

When a free user's free time ends.

## Geometry

- Panel: 300 pt high, `noTimePanelSheet` (#3A3F4C), radius 30, anchored to the TOP of its sheet. The sheet adds the bottom safe area below the panel (34 pt on a Face ID phone). A tap there closes, as the old transparent row did.
- Rows `2*, 3*, 2*, 3*, 5*` (40, 60, 40, 60, 100 pt).
- Close: `close.png`, 19 pt wide, 40 pt frame (50 pt clamped to the row), 5 pt down, 20 pt from the right. A 75 × 40 pt tap target at the top right.
- `earthicon.png`, 60 pt high (80 pt clamped to its 60 pt row), aspect-fit.
- Title `f-21-fw-600`, centred, at the bottom of its row (25 pt label).
- Message `f-13-fw-400`, one line, centred.
- **PanelButton** row: an 85 % grid, two columns. Each button is one column wide, pushed 5 pt outwards (its 10 pt inner margin), 50 pt high, radius 16; content centred: a 25 × 25 icon with 5 pt each side, then `f-14-fw-600` `text`. The outer 5 pt is drawn but takes no taps.
  - Left: `blue` with `tick_icon_yellow.png`, "Start free trial" (or "Get Premium").
  - Right: `noTimePanelWatchButton` (#4E515E) with `video.png`, "Watch Ad".

## States

- Free trial / no trial: the message and the left button text change.

## Arabic

The panels never mirror: the close icon stays at the right, and the buttons keep their sides. Texts are centred and right to left.

## Contrast

- `text` on `noTimePanelSheet`: 10.52:1. Pass.
- `text` on `noTimePanelWatchButton`: 7.89:1. Pass.
- `text` on `blue` (left button): 2.56:1. **Fails** (known pair).

## The consumer provides

`NoTimePanelModel`: `freeTrial`, `close()`, `getPremium()`, `watchAd()`.
