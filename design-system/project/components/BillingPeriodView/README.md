# BillingPeriodView

The Account page "Billing Period": three plan rows. A tap on a row buys that plan.

Source: `SZFeaturePaywalls/UI/SmallPaywallViews.swift` (`BillingPeriodScreen`, `BillingPeriodView`); model `BillingPeriodModel`.

## When to use

From Profile › Account › Billing Period.

## Geometry

- PaywallScaffold `PageTitleBar` "Billing Period" (45 pt, back arrow).
- Description `f-14-fw-400`, centred, 60 pt high.
- Trial warning (only in a free trial): `f-14-fw-500`, `cBlue`, wraps, 90 % wide.
- Three rows: 90 % (`rowWidthFraction`) wide, `selectableBarHeight` (52.5 pt, rounded up to a whole device pixel: 158 px at @3x), `bar`, radius 18, 10 pt apart. Text `f-15-fw-500`, centred: "Weekly $4.99 / week" and so on.
- A row with a second line: the current plan ("Current plan") or the free trial line, `f-11-fw-500`, `cBlue`.
- Renewal terms: `f-12-fw-300`, `text`, wraps, natural alignment, 90 %, 20 pt top.
- Links line: "Terms of Use and Privacy Policy", `f-12-fw-500`, " and " in `dark`, 90 %, 10 pt top.

## States

- Plain rows; the current plan row; a free-trial row; the trial warning; loading (NSPageSpinner over the page).

## Arabic

- The back arrow moves to the right column and is mirrored.
- Rows and lines are centred. The renewal terms align right.

## Contrast

- `text` on `bar`: 16.78:1; `cBlue` on `bar` (11 pt w500): 6.48:1; `cBlue` on `background`: 7.59:1. Pass.
- `dark` on `background` (" and "): 3.03:1. **Fails** (known pair).

## The consumer provides

A factory for `BillingPeriodModel` (prices, current period, free trial per period, loading, `select`, `goBack`, links).
