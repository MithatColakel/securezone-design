# PageRows

A pushed page made of a PageTitleBar and NSRowButton rows. The Account page and the Others page use it.

Source: `SZFeatureSettings/UI/ProfileScreens.swift` (`PageRows`, `PageRow`, `AccountScreen`, `OthersScreen`); rows `NSBarRows.swift` (`NSBarRow`, `NSBarTrailing`).

## When to use

For a list page with only rows. Account: User ID, Membership, Billing Period, Redeem Code. Others: Language, Rate Us, Privacy Policy, Terms of Use, Support.

## Geometry

- PageTitleBar (45 pt), then rows: 90 % wide, 52.5 pt (52.667 pt after rounding), 10 pt apart, starting 10 pt below the bar.
- The trailing column holds an arrow (`rightarrow.png`, 20 × 20), a value (`f-14-fw-500`) or nothing.
- Others: "Version: x.y.z.build" (`OthersModel.versionLabel`), `f-14-fw-400`, centred, 20 pt above the bottom of the safe area.

## States

- Account: the User ID row shows the first 8 characters of the ID. A tap copies it and shows a ToastOverlay ("Your ID is copied to the clipboard").
- Account: while Apple holds a failed charge, a row to the payment page shows under Membership (`DIALOGS.BILLING_PROBLEM.BUTTON`).
- Membership value: Free, Gift or Premium. Billing period value: None, Weekly, Monthly or Yearly.
- The sample ID `3F9A2C1E` and the version are examples.

## Arabic

- Rows use columns `2*, 5*, *`: values and arrows in the left column, arrows mirrored. Titles and values are right-aligned.
- "Version:" is hard-coded English in every language.

## Contrast

- `text` on `bar`, 15 pt and 14 pt: 16.78:1. Pass.
- `text` on `background`, 14 pt: 19.67:1. Pass.

## The consumer provides

`AccountModel` or `OthersModel` (values and actions).
