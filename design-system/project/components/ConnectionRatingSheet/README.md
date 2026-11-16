# ConnectionRatingSheet

The rating sheet after a VPN session: "How was your connection?", five stars, reasons for a low rating and a Send button.

Source: `SZFeatureSettings/UI/SheetViews.swift` (`ConnectionRatingSheet`; port of `connection-rating.component.html` + `.scss`, "Aurora"); model `Models/ConnectionRatingModel.swift`; chip layout `CommonViews.swift` (`ChipWrapLayout`).

## When to use

After a session ends, when the app asks for a rating. It is a bottom sheet (SZPopups) and dims the screen behind it.

## Geometry

- Sheet height from the model: 316 (no rating), 328 (4–5 stars), at least 452 (1–3 stars, grows to fit), 260 (sent).
- Fill: gradient `ratingSheetStops-0` → `ratingSheetStops-1` (46 %) → `ratingSheetStops-2`, top to bottom.
- Handle: 44 × 5, `rating-grabber`, radius 3, 12 pt above and below.
- Content, 24 pt side padding, 16 pt bottom, centred:
  - Title: 21 pt w700, `text`, 8 pt top.
  - Pill (server · duration, for example "Germany · 12m 47s"): 12 pt `rating-subtitle` on `rating-pill`, radius 20, padding 5 / 12, a 6 pt `rating-successFill` dot 7 pt before the text, 10 pt top.
  - Stars: five 38 pt "★" / "☆", `rating-starFilled` or `rating-starEmpty`, glow `ratingStarGlow` on filled stars, 7 pt side padding, 20 pt above, 8 pt below.
  - No rating: tap hint, `f-12-fw-400`, `rating-tapHint`, 10 pt top.
  - 1–3 stars: "What went wrong?" (13 pt, `rating-reasonsTitle`, 18 / 12) and six chips: 13 pt, padding 8 / 14, radius 22, 1 pt border, 4 pt margin, wrapped and centred.
- Footer (rating chosen, not sent): Send, 54 pt, radius 16, gradient `ratingCTATop` → `ratingCTABottom`, shadow `ratingCTA`, title 15 pt w600 `text`. Padding 22 / 40 / 30 / 40.
- Sent: "✓" 48 pt `rating-successTick`, then the thanks line (16 pt, 12 pt top), 40 pt vertical margins. The sheet closes 1.2 s later.

## States

- No rating · low rating (1–3) with reasons (multi-select) · high rating (4–5) · sent.
- Chip: normal (`reasonChip-text` on `reasonChip-background`, `reasonChip-border`) or selected (`reasonChip-textSelected` on `reasonChip-backgroundSelected`, `reasonChip-borderSelected`).

## Arabic

- Not mirrored (the template has no `isRTL` branch). Stars and the pill stay left to right. Text is centred, so lines read right to left.

## Contrast

- `text` on `ratingSheetStops-0`, 21 pt bold: 16.70:1. Pass.
- `rating-subtitle` on the pill (white 6 % over stop 0): 7.01:1. Pass.
- `rating-reasonsTitle` on stop 0: 5.43:1. Pass.
- `rating-successTick` on the sheet: 6.15:1 or more. Pass.
- `rating-tapHint`: 2.96–3.36:1. **Fails** (known pair).
- `rating-starEmpty`: 1.63:1. **Fails** 3:1 (known pair).
- Send title on the CTA gradient: 2.21–3.37:1. **Fails** (known pair).
- Chips: 11.89:1 and 9.63:1. Pass.

## The consumer provides

`ConnectionRatingModel` (rating, reasons, subtitle, sheet height, `submit()`).
