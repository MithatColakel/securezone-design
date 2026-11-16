# NSRowButton

The settings row: a 52.5 pt dark bar with a title and an arrow, a value or a switch at the trailing side.

Source: `SZDesign/Controls/NSRowButton.swift` (`NSRowButton`, `NSSwitchRow`); port of `custom-button` and `.selectable-bar`.

## When to use

- Settings, Profile, Account and Others pages: one row per destination or setting.
- Arrow row: opens a page. Value row: shows a value (Membership: Free). Switch row (`NSSwitchRow`): one on / off setting.

## Geometry

- Bar: `selectableBarHeight` (52.5 pt) high, `rowWidthFraction` (90 %) of the parent, centred, fill `bar`, radius `radius` (18).
- Top margin 10 pt on every row. A switch row that opens a group uses 20 pt.
- Columns `*, 5*, 2*`. The title is in the middle column. The arrow (`rightarrow.png`, `rowArrowSize` 20 × 20) or the value is centred in the last column.
- Title: `f-15-fw-500`, one line, natural alignment. Switch rows use `f-15-fw-400`. Value: `f-14-fw-500`.

## States

- Normal.
- Pressed (arrow and value rows): the whole bar scales to 0.98 and goes to `pressedOpacity` (0.5), 200 ms linear (`NSPressFeedbackStyle`).
- Switch rows are not pressable; only the switch reacts. See `NSSwitch`.

## Arabic

- The layout stays left to right. The view swaps the columns to `2*, 5*, *`: the arrow, value or switch moves to the first (left) column.
- The title is right-aligned in its column.
- The arrow is mirrored (`.nsMirrored`, `scaleX(-1)`), so it points left.
- The switch stays right-aligned inside its cell, 10 pt in (`switchTrailingMargin`).

## Contrast

`text` on `bar`: 16.78:1. Pass.

## The consumer provides

Title key, `arrow` (default true), optional `value`, optional `isRTL` override, and the action. `NSSwitchRow`: title key, `isOn`, `topMargin`, `autoFit` and `onChange`.
