# TickMark

The round check mark (port of `ns-tick`). The agreement consent row uses it. The server list and the protocol cards use the same drawing (`ServerTickView`, ProtocolCard).

Source: `SZFeatureOnboarding/UI/TickMark.swift` (`TickMark`); the server copy is `SZFeatureServers/UI/ServerTickView.swift`.

## When to use

For a single on / off choice drawn as a round check (agreement consent; server and protocol selection).

## Geometry

- 20 × 20 pt circle, clipped. Fill: `gray` (default; agreement) or the colour the caller gives (`background` in the server rows).
- On: `assets/Icons/tickback.png` (the disc) and `assets/Icons/tick.png` (the check) at scale 1. Off: both at scale 0, so only the empty circle shows.

## States

- **Off / on.** The first state is not animated. Each later change animates over 100 ms: showing, the disc on cubic-bezier(.09, .65, .57, 1.38) (a small overshoot) and the check ease-in-out; hiding, both ease-in-out.
- **Error (agreement only):** while unticked after a Confirm tap, an `agreement-errorDot` circle pulses over the mark (opacity 0 → 1 → 0 over 2 s, CSS `ease`, forever).
- Hidden from VoiceOver; the row carries the selected trait.

## Arabic

No change to the mark. The agreement row moves it to the right.

## Contrast

- The empty circle carries the "off" state:
  - `gray` on `background` (agreement): 1.19:1. **Fails** 3:1.
  - `background` on `bar` (server list): 1.20:1. **Fails** 3:1.
- `agreement-errorDot` on `background`: 2.97:1. **Fails** 3:1 (just under).
- The "on" disc is an image (`tickback.png`); not measured.
- Proposed fixes under Proposals: a 1 pt ring of 3:1 or more around the empty circle (for example #6A7080: 3.97:1 on `background`, 3.39:1 on `bar`); error dot #58677C (3.42:1).

## The consumer provides

`turnedOn` and, optionally, `backgroundColor`.
