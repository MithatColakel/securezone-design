# NSButton

The app's solid button: one line of 16 pt semibold text, centred on a coloured fill.

Source: `native/Packages/SZDesign/Sources/SZDesign/Controls/NSButton.swift` (port of the NativeScript `.button`).

## When to use

- Use it for the main action of a sheet, panel or page: "Start now", "More", "Send", "Try again".
- Use one kind per action. Do not put two blue buttons side by side.

## Kinds (`NSButtonKind`)

| Kind | Fill | Title | Use in the app |
|---|---|---|---|
| `blue` | `blue` | `text` | Gift popup, offers, boot notice (custom title colour) |
| `yellow` | `buttonYellow` | `black` | Premium box "More", no-connection "Try again" |
| `gray` | `buttonGray` | `buttonTitleDefault` | Secondary actions |
| `disabled` | `buttonDisabled` | `black` | Support form Send while the form is not valid |
| `custom(background:title:)` | any or none | any | Boot notice Retry (`blue` / `bootNoticeButtonTitle`), network-blocked Close (no fill / `cGray`), onboarding proceed (no fill / `proceed`) |

## Geometry

- Height: `buttonDefaultHeight` (40 pt) unless the call site sets one. The app uses 52.5, 55, 60 and 62.5 pt.
- Radius: `buttonDefaultRadius` (0, square) unless the call site passes `radius`, `radiusB` or `radiusL`.
- Minimum width `buttonMinWidth` (64 pt). Width comes from the parent; `.button` is `buttonWidthFraction` (85 %).
- Title: `f-16-fw-600`, one line, cut in the middle when too long. Horizontal padding `buttonHorizontalPadding` (5 pt).

## States

- Normal.
- Pressed: only the title dims, to opacity 0.2; it fades back over 250 ms ease-out (`NSSystemButtonStyle`). The fill does not change.
- Disabled (`enabled: false`): the whole button at `disabledOpacity` (0.5) and no taps. The `disabled` kind is a colour, not this state.

## Arabic

The title is centred, so it reads the same. Nothing mirrors.

## Contrast

- `black` on `buttonYellow`: 13.42:1. Pass.
- `buttonTitleDefault` on `buttonGray`: 4.68:1. Pass.
- `text` on `blue`: 2.56:1. **Fails** 4.5:1 (16 pt semibold is not large text). Kept as in the code; see the README contrast table.
- `black` on `buttonDisabled`: 2.38:1. **Fails**. Kept as in the code.

## The consumer provides

Title (a localization key or verbatim text), kind, radius, height, enabled flag and the action.
