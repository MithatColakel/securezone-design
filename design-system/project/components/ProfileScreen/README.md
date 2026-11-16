# ProfileScreen

The Profile tab, with the premium box (PremiumBox) and the Account and Others rows.

Source: `SZFeatureSettings/UI/ProfileScreens.swift` (`ProfileScreen`, `PremiumBox`; port of `profile.component.html`).

## When to use

It is the third tab of HomeTabBar.

## Geometry

- PremiumBox: 90 % wide, 350 pt high, 20 pt from the top. Radius `radiusB` (20). Fill `darkBlue` under `assets/Icons/rectangle_3.png` (aspect-fill, clipped). Rows `3*, 2*, 6*, 6*`.
  - Title "Get Premium": `f-18-fw-600`, `yellow`, centred, with a 15 pt top margin. In code it is centred in row 2 with that margin; the preview approximates it.
  - Four lines, 80 % wide, 10 pt top margin, rows `*, *, *, *`. Each line has columns `*, 4*`: `assets/Icons/thickyellow.png` 20 × 20 centred, then the text `f-14-fw-400`. Line B shrinks to fit (English template only).
  - "More": the yellow button, 60 % wide, 55 pt, radius 18, `f-16-fw-600` black on `buttonYellow`, 8 pt margins.
- Account and Others: NSRowButton with arrow, 10 pt below the box, 10 pt apart.

## States

- The box shows for free users, and for premium users with an active gift. Otherwise only the two rows show, 10 pt from the top.

## Arabic

- Line columns become `4*, *`: text first (right-aligned), tick last.
- Rows use the Arabic NSRowButton columns, with the arrow mirrored.
- The Arabic line B does not shrink to fit (the RTL template uses a plain label; the code keeps it).

## Contrast

- `yellow` on `darkBlue` (title), 18 pt w600: 10.19:1. Pass.
- `text` on `darkBlue` (lines), 14 pt: 15.94:1. Pass.
- The image `rectangle_3.png` lies over `darkBlue`. The ratios are for the plain fill; the image is not measured.
- `black` on `buttonYellow`: 13.42:1. Pass.

## The consumer provides

`ProfileModel` (`isPremiumBoxVisible`, `getPremium()`, `openAccount()`, `openOthers()`).
