# SettingsScreen

The Settings tab.

Source: `SZFeatureSettings/UI/SettingsScreen.swift` (`SettingsScreen`, `SettingsLayout`; port of `settings.component.html`).

## When to use

It is the second tab of HomeTabBar.

## Geometry (top to bottom, all 90 % wide, centred)

- "Settings": `f-32-fw-600`, 20 pt above and below.
- "Protocol Preferences": `f-14-fw-300`, 15 pt above.
- Smart Protocol: NSSwitchRow (`f-15-fw-400` title, switch), 20 pt above.
- Protocols: NSRowButton with arrow (`f-15-fw-500`), 10 pt above.
- "System Settings": `f-14-fw-300`, 20 pt above.
- Kill Switch: NSSwitchRow, 20 pt above.
- Auto Server Location: NSSwitchRow, 10 pt above. Its title shrinks to fit.
- Test builds only: a "Transport Lab (test)" row in English. It is not product UI and is not drawn.
- Rows: `bar`, radius 18, height `selectableBarHeight` (52.5 pt; 52.667 pt after device-pixel rounding).

## States

- Each switch is on or off (see NSSwitch).

## Arabic

- Titles are right-aligned. Rows use columns `2*, 5*, *`: the switch or the mirrored arrow sits in the left column.

## Contrast

- `text` on `background` (titles): 19.67:1. Pass.
- `text` on `bar` (rows): 16.78:1. Pass.
- Switch off track on `bar`: 1.25:1. **Fails** 3:1 (known pair).

## The consumer provides

`SettingsModel` (switch values and setters, `openProtocols()`).
