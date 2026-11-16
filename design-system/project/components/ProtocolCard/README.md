# ProtocolCard

One protocol on the Protocols page: a selection ring, the name and four star rows. The card also documents the Protocols page around it.

Source: `SZFeatureSettings/UI/ProtocolsScreen.swift` (`ProtocolsScreen`, `ProtocolCardView`, `ProtocolStarRow`; port of `protocol.component.html` + `star-show`); data `Models/ProtocolsModel.swift` (`ProtocolsModel.cards`).

## When to use

Only on the Protocols page. The order is fixed: AmneziaWG, OpenVPN, WireGuard, Hysteria2.

## Geometry

- Page: PageTitleBar "Protocols", then a scroll view: the description (12 pt, centred, 90 % wide, 70 pt high), the four cards, and "Restore Defaults" (`f-16-fw-600`, `cBlue`, centred, 20 pt above, 30 pt below). NSPageSpinner covers the page for 1500 ms after a choice.
- Card: full width, 150 pt. Content 90 % × 90 % (135 pt), rows `2*, *, *, *, *`.
- Row 0, columns `*, 5*, *`: the ring (20 pt, 2 pt `protocolCard-ring` border on `background`, 15 pt side margins) with the tick (`tickback.png` + `tick.png`) in the first column; the name `f-16-fw-500` in the middle; the lock (Font Awesome solid U+F023, 10 pt, `text`, right-aligned) in the last column for premium protocols when the user is free.
- Rows 1–4: the star rows "Connection Speed", "Encryption", "Security", "Stability". Columns `*, *`: label (12 pt, `text`), then five Font Awesome stars (U+F005, 10 pt, `star`, solid when filled, regular when empty), each right-aligned in its fifth.
- Stars: AmneziaWG 4 5 5 4, OpenVPN 3 4 4 5, WireGuard 5 5 2 3, Hysteria2 5 5 4 3.

## States

- **Selected:** fill `protocolCard-selectedBackground`; the tick scales in (100 ms, overshoot curve).
- **Locked:** the lock icon. The card stays tappable.
- **Discouraged** (the country policy says it is blocked): a 1 pt `protocolCard-discouragedRing` border, radius 12.
- **Unavailable** (Hysteria2 with no engine): opacity 0.45 and the badge "Coming soon" (`f-11-fw-400`, `cBlue`, right-aligned at the bottom of row 0).
- The star rows fade in and rise 10 pt over 410 ms, staggered by card.

## Arabic

- The ring moves to the last column; the lock to the first. Labels are right-aligned and move to the right half; stars move to the left half.
- **Kept quirk:** the filled stars stay on the left in Arabic (the star order is not mirrored). The code keeps this from 4.8.x.

## Contrast

- `text` on `background` and on `protocolCard-selectedBackground`: 19.67:1 and 15.00:1. Pass.
- `star` on `background`: see below. `cBlue` on `background` (badge, Restore Defaults): 7.59:1. Pass.
- Unavailable card at opacity 0.45: see the README table.

## The consumer provides

`ProtocolsModel` (selection, locked / discouraged / unavailable checks, `select(_:)`, `restoreDefaults()`).
