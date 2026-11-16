# PageTitleBar

The title bar of every pushed page: Account, Others, Protocols, Support, Billing Period and the paywall pages.

Source: `SZFeatureSettings/UI/NSBarRows.swift` (`PageTitleBar`); a twin in `SZFeaturePaywalls/UI/PaywallScaffold.swift` (`PageTitleBar`) with the same geometry.

## When to use

At the top of a page that the Settings or Profile tab pushes. The system navigation bar is hidden on these pages (`SettingsPages.page(for:)`).

## Geometry

- Height `pageTitleBarHeight` (45 pt), full width. Columns `*, 5*, *`.
- Title: `f-16-fw-500`, centred, in the middle column.
- Icon: `assets/Icons/backarrow.png`, `closeButtonSize` (19 × 19), aspect-fit, centred in the first column.
- The whole bar is the back button.

## Arabic

- The icon moves to the last column and is mirrored (`.nsMirrored`).

## Contrast

- `text` on `background`, 16 pt w500: 19.67:1. Pass.

## The consumer provides

The title and the back action.
