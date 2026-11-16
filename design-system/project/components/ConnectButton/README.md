# ConnectButton

The large round button in the middle of Home. It connects and disconnects the VPN and shows the connection state.

Source: `SZFeatureHome/UI/ConnectButtonView.swift`; state logic in `SZFeatureHome/ConnectButton/` (`OutCircleController`, `LockAndTextControllers`, `ConnectButtonAppearance`).

## When to use

Only on Home, once. Do not reuse its ring for other progress.

## Geometry

The button is `min(row, 200)` pt high and full width. All layers are centred:

1. Heart ring: 140 pt, 3 pt stroke, `connectConnectedRing`. Shown when connected. It pulses every 2 s (ease-in-out; fades out while it grows to 1.3, then to 1.6).
2. Base ring: 140 pt, 4 pt, `connect-progressRing`.
3. Inner ring: 65 pt, 4 pt, `connectAccent`. A 15 % gap sits at the top, under the lock line.
4. Progress ring: 140 pt, 4 pt. The progress arc is in the bar colour, the rest in the fill colour. It is mirrored (`scale(-1, 1)`) in every language.
5. Lock line: 5 × 30 pt capsule, `connectAccent`, 22.5 pt above the centre.
6. Timer: `HH : MM : SS` in `f-19-fw-800` (`text`), over STOP in `f-17-fw-800` (`turkuaz`), in a 100 pt column.
7. Message: CONNECTING / CONNECTED in `f-13-fw-800`, `text` while connecting, `connectConnectedText` when connected.
8. Hint card: 70 % wide, `connect-innerBox` fill, radius 22, padding 7 / 10 pt, text `f-11-fw-600`, centred. It hangs up to 24 pt below the button.

While the ring is in its default colour (disconnected, connecting, disconnecting), the `connectAccent` parts use the `connect` gradient: `connectGradientTop` from 20 % to `connectGradientBottom` (VPN-358). Connected has no gradient.

## States

| State | Progress ring | Lock line and inner ring | Text |
|---|---|---|---|
| Disconnected | full, gradient | shown | none |
| Connecting | 80 % gradient, 20 % `connectRingLight`; spins −360° per second | hidden (250 ms fade) | CONNECTING (`text`) |
| Connected | full `connectConnectedRing`; heart ring pulses | hidden | timer and STOP |
| Disconnecting | as connecting | hidden | none |

`VPNStatus` also has `invalid` and `reasserting`; they keep the current drawing.

The tap area is the right half of the button box (x from 100 pt, half the width wide). This is a kept quirk of the NativeScript build.

## Arabic

Nothing mirrors by language. The timer digits stay left to right. CONNECTING, CONNECTED and STOP use the Arabic strings.

## Contrast

- `turkuaz` on `background` (STOP): 12.22:1. Pass.
- `connectConnectedText` on `background`: 12.22:1. Pass.
- `connectAccent` ring on `background`: 6.41:1; `connectConnectedRing`: 12.85:1. Pass (3:1).

The preview is a static drawing of the three main states. The timer value is an example.

## The consumer provides

`ConnectButtonModel` (status, timer, messages). The view takes its whole box from the Home grid.
