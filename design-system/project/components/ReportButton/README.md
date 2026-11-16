# ReportButton

The report button on Home: a white warning icon that opens the report sheet (ReportSheet).

Source: `SZFeatureHome/UI/HomeScreen.swift` (`ReportButton`, private; port of `home.component.html:39-44`).

## When to use

Only on Home, in the top row, for free and premium users.

## Geometry

- A 60 × 60 box at the trailing edge of the row (left in Arabic).
- In it, a 40 × 40 tap area at the box's top-left (not centred: NativeScript's AbsoluteLayout ignores the child's centring), opacity 0.7.
- The icon `assets/Icons/warning.png`, 20 × 20, drawn as a template in `text` (white), centred in the 40 × 40 area.

## States

- Normal. Under the dimmed ConnectionRating sheet, UIKit dims the tint, so the icon turns grey.
- Accessibility label: "Report an Issue" (`report.title`).

## Arabic

- The box moves to the left edge. The icon is not mirrored.

## Contrast

- White at 0.7 on `background`: 9.69:1 (icon, needs 3:1). Pass.
- White at 0.7 on `bar` (if the Get Premium bar is behind it): 8.73:1. Pass.

## The consumer provides

The tap action.
