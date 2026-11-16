# PaywallScaffold

The chrome that every full-page paywall shares: the `background` page, the page spinner, and three header parts (PaywallHeader, DealCloseStrip, PageTitleBar).

Source: `SZFeaturePaywalls/UI/PaywallScaffold.swift` (`PaywallScaffold`, `CloseIcon`, `DealCloseStrip`, `PaywallHeader`, `PageTitleBar`, `SpanText`).

## When to use

- `PaywallHeader`: Get Premium and Get Premium Week.
- `DealCloseStrip`: the deal pages (Promotional 1, 2, 3, Introductory 1).
- `PageTitleBar`: the Billing Period page. It is the same view as the Settings PageTitleBar card (a private copy in this package).

## Geometry

- Page: `background`, edge to edge. Dynamic Type is fixed at `.large`.
- `CloseIcon`: `assets/Icons/close.png`, `closeButtonSize` (19 × 19), aspect-fit.
- `PaywallHeader`: 90 % wide, 45 pt high, columns `2*, 5*, 2*`. Close icon in column 0 (start-aligned); title in column 1, `f-18-fw-600` (Get Premium) or `f-18-fw-500` (Week), centred, auto-fit to one line; Restore in column 2, `f-12-fw-600`, `cBlue`, right-aligned, 2 pt top padding. The close target is the icon width only; the Restore target is its whole column.
- `DealCloseStrip`: full width, 60 pt, columns `*, 5*, *`, close icon centred in column 0. The whole strip is the tap target. It lies over the deal title (the code keeps this).
- `PageTitleBar`: 45 pt, columns `*, 5*, *`; title `f-16-fw-500` centred; `backarrow.png` 19 × 19 in column 0. The whole bar is the tap target.

## States

- **Loading, spinner `.above`:** NSPageSpinner over everything. Taps are blocked, the close control too. Used by Get Premium, Week, Servers full, Promotional 2.
- **Loading, spinner `.below`:** NSPageSpinner behind the content. The content stays bright and tappable. Used by Promotional 1, Promotional 3, Introductory 1.

## Arabic

- PaywallHeader: close moves to column 2 (end-aligned); Restore moves to column 0 and aligns left.
- DealCloseStrip: the close icon moves to column 2.
- PageTitleBar: the back arrow moves to column 2 and is mirrored.
- The Arabic Restore label "استعادة المشتريات" is wider than its column on a 390 pt phone. The label is one line, so the preview cuts it with an ellipsis. **Not checked on device.**

## Contrast

- `text` on `background` (titles): 19.67:1. Pass.
- `cBlue` on `background` (Restore, 12 pt w600): 7.59:1. Pass.

## The consumer provides

`loading`, `spinnerLayer`, and the page content. The header parts take a title, the Restore text and the close / restore / back actions.
