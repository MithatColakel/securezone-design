# ServerRow

One location in the server list: flag, name, signal icon and a round tick.

Source: `SZFeatureServers/UI/ServerRowView.swift` (port of `server-item`); tick in `ServerTickView.swift`.

## When to use

In the server list (`ServerMenuView`), one row per location or category (Gaming, Streaming).

## Geometry

- 90 % of the list width, `serverRowHeight` (50 pt) high, fill `bar`, radius `radius` (18), 10 pt side padding.
- Columns `50, *, 50, 50`: flag, name, signal, tick.
- Flag 30 × 30 pt, centred. Name `f-14-fw-600`, shrinks to fit, 10 pt LEFT margin in both directions, natural alignment.
- Signal: `wifi.png` 20 × 20 (`wifilow.png` for the backend's Auto entry).
- Tick: a 20 pt circle on `background`. On: `tickback.png` and `tick.png` at scale 1. Off: both at scale 0.

## States and motion

- Selected / not selected. The tick grows in 100 ms: the disc on cubic-bezier(.09, .65, .57, 1.38), the check ease-in-out. The first state is not animated.
- Each row fades in over 150 ms (linear). A hidden row takes no taps.
- There is no lock glyph for premium rows.

## Arabic

Columns are mirrored to `50, 50, *, 50`: tick, signal, name, flag. The name is right-aligned. The 10 pt name margin stays on the left.

## Contrast

`text` on `bar`: 16.78:1. Pass.

## The consumer provides

`ServerMenuRow` (flag code, title key, selected, low-signal flag), `ServerRowPresentation` (shown) and the tap action.
