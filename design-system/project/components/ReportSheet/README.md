# ReportSheet

The "Report an Issue" sheet with its rows (ReportRow). The user picks the problem they have.

Source: `SZFeatureSettings/UI/SheetViews.swift` (`ReportSheet`, `ReportLayout`, `ReportRow`; port of `report.component.html` + `.scss` and `report-item`).

## When to use

Open it from ReportButton on Home. It is a full-height bottom sheet.

## Geometry

- Fill `background`. Handle 50 × 5, `dark`, radius 3, 12 pt from the top.
- Title "Report an Issue": `Righteous-22`, centred, padding 10 / 20 / 20 / 20. (The code draws it twice on top of itself; kept.)
- Text: `f-14-fw-300`, centred, 90 % wide, 20 pt below.
- When connected: "You are connected", `f-15-fw-600`, `connectConnectedText`, centred, 12 pt above and below (VPN-454).
- Rows in a scroll view: 90 % wide, 52.5 pt (52.667 pt), 10 pt apart, 40 pt bottom padding. Each row: `bar`, radius 18, title `f-15-fw-400` wrapping, 15 pt side spacers.
- Last row "Everything works fine": `buttonYellow`, 2 pt `reportRow-lastBorder` border, title 15 pt w600 `reportRow-lastTitle`.
- Rows: Unable to connect to VPN · No time left · Connected but no internet · Premium features not working · Connection is slow · Ad reward not received · Can't watch ads · Everything works fine.

## States

- Tap: the row dims for 100 + 100 ms, then the report starts.
- Processing: black at 50 % and a white spinner over the sheet.
- No close button. The sheet closes by swipe or by the model.

## Arabic

- The root is left to right. Row titles use natural alignment, so they are right-aligned. Centred texts do not change.
- Righteous has no Arabic letters. The Arabic title falls back to the system font (iOS does the same).

## Contrast

- `text` on `background` and on `bar`: 19.67:1 and 16.78:1. Pass.
- `connectConnectedText` on `background`: 12.22:1. Pass.
- `reportRow-lastTitle` on `buttonYellow`: 10.64:1. Pass.
- Handle `dark` on `background`: 3.03:1. Pass for a mark (3:1). It carries no text.

## The consumer provides

A `ReportSheetViewModel` (`select(_:)`, `isProcessing`, `isTunnelConnected`).
