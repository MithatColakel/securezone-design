# ServerSelectButton

The server bar at the bottom of Home. It shows the current location and opens the server list.

Source: `SZFeatureServers/UI/ServerSelectButton.swift` (port of `server-select-button`).

## When to use

Only on Home, in its row of the Home grid, centred vertically.

## Geometry

- 90 % of the row, `serverSelectHeight` (65 pt) high, fill `bar`, radius `radius` (18).
- Columns `9*, 20*, 6*`.
- Flag: 30 × 30 pt (`flagSize`), centred in its column with a 10 pt LEFT margin. The margin does not mirror, so the flag sits 5 pt right of centre in both directions.
- Auto location (a selection flagged Auto, or any selection of a free user): "Auto Location" in `f-12-fw-500` over the country in `f-13-fw-700`, from 12 pt below the top.
- One country: the name in `f-16-fw-600`, centred vertically.
- Chevron: `arrow.png`, 20 × 20 pt, centred.

## States

Normal; pressed (scale 0.98, `pressedOpacity` 0.5, 200 ms linear).

## Arabic

Columns swap to `6*, 20*, 9*`: chevron left, flag right. Text is right-aligned. The chevron is not mirrored (it points up and down).

## Contrast

`text` on `bar`: 16.78:1. Pass.

## The consumer provides

`ServerSelectButtonModel`: the flag code, the country title key, the auto flag and the tap action. Flags come from `assets/Flags/`.
