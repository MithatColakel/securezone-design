# NSSwitch

The app's own on / off switch: a 51 × 31 pt track with a 27 pt white thumb.

Source: `SZDesign/Controls/NSSwitch.swift` (port of `custom-switch`). `SZFeatureSettings/UI/NSUISwitch.swift` is the UIKit twin with the same geometry.

## When to use

Inside `NSSwitchRow` on the Settings and Language pages. Not as a stand-alone control.

## Geometry

- Track 51 × 31 pt, radius `switchTrack` (15.5). Thumb 27 × 27 pt at (2, 2); it moves 20 pt. Thumb shadow `switchThumb`.
- The switch sits at the right edge of its cell, `switchTrailingMargin` (10 pt) in.

## States

| State | Track | Thumb |
|---|---|---|
| On | `switch-trackOnWhite` (every shipped switch passes `color="white"`) | `switch-thumb`, right |
| Off | `switch-trackOff` | `switch-thumb`, left |
| Disabled | `switch-trackDisabled`; whole control at opacity 0.5 | `switch-thumbDisabled` |
| Pressed | scale 0.95, 100 ms linear, on touch-down | — |

Motion: thumb and track 250 ms ease-in-out. Taps are ignored while disabled and for 200 ms after a tap. The first appearance is not animated.

`SwitchPalette.trackOn` also names blue, green, red, orange, purple, cyan and teal. No shipped switch uses them, so they are not tokens.

## Arabic

The switch does not mirror. It stays right-aligned in its cell. The row moves the cell (see `NSRowButton`).

## Contrast

- `switch-trackOnWhite` on `bar`: 9.40:1. Pass (3:1 for controls).
- `switch-trackOff` on `bar`: 1.25:1. Low. The white thumb (16.78:1 on `bar`) still shows the control, but the off track is almost not visible. Kept as in the code; see the README contrast table.

## The consumer provides

`isOn`, `color` (the code always passes "white"), `disabled`, an accessibility label (the row title) and `onChange`.
