# PremiumTrialBar

The blue "Start Subscription" bar at the top of the server list, with a diamond and a sheen.

Source: `SZFeatureServers/UI/ServerRowView.swift` (`PremiumTrialBar`, `PremiumBarLayers`; port of `server-menu.component.html:19-32`).

## When to use

Only in the server list for free users, 15 pt below the Auto row.

## Geometry

- 90 % wide, `premiumTrialBarHeight` (90 pt) high, fill `blue`, radius `radiusB` (20), clipped.
- Columns `*, 3*`.
- Diamond: `diamondforserver.png`, 150 × 150 pt clamped to its column, aspect-fit, centred.
- Sheen: `mask_group.png`, aspect-fill, over both columns.
- Text box: 45 pt, two rows. "Start Subscription" in `f-18-fw-600`, the subtitle in `f-16-fw-300` (shrinks to fit). Both in `text`, natural alignment.
- The subtitle names the free trial and its length only when the PremiumWeek purchase would start one.

## Arabic

- Columns swap to `3*, *`: diamond on the right. Text is right-aligned.
- Kept quirk: the sheen spans from the last column, so in Arabic it covers only the diamond's quarter.

## Contrast

`text` on `blue`: 2.56:1. **Fails** 4.5:1 (the title is 18 pt semibold, not large text). Kept as in the code; see the README contrast table.

## The consumer provides

`isRTL`, the free-trial length (or none) and the tap action.
