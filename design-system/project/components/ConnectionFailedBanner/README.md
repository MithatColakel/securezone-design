# ConnectionFailedBanner

The red banner at the top of Home when the device has no internet.

Source: `SZFeatureHome/UI/BarViews.swift` (`ConnectionFailedBannerView`); model `SZFeatureHome/Banner/ConnectionFailedModel.swift`.

## When to use

Only for the no-internet state on Home. Tap re-checks the network; a drag up dismisses it.

## Geometry

- A 90 pt strip, 1 pt below the top. The red bar is inset 10 pt left, right and bottom: 80 pt high.
- Fill `connectionFailed-background`, radius 15 (circular corners).
- Content is laid out in the top 70 pt: a 65 pt column with the Font Awesome times-circle (`fas-35`, U+F057, `text`), then the title (`f-20-fw-700`) at the bottom of the upper half over the message (`f-14-fw-400`) at the top of the lower half.

## Arabic

- Since [VPN-689](/VPN/issues/VPN-689) (`master@5c650e22`) the strings are localized: `CONNECTION_FAILED.TITLE` / `.MESSAGE` ("Error" / "Connection is failed"; Arabic "خطأ" / "فشل الاتصال").
- The banner sets its own layout direction from `nsIsRTL`: in Arabic and Hebrew the icon column is on the right and the text is right-aligned next to it.
- Not checked against a screenshot yet: gallery id `shell.nointernet.ar`.

## Contrast

- "Error", `text` on `connectionFailed-background`, 20 pt bold: 3.93:1. Pass for large text (3:1).
- "Connection is failed", 14 pt: 3.93:1. **Fails** 4.5:1. Kept as in the code; see the README contrast table.

## The consumer provides

`ConnectionFailedModel` (tap, drag and the slide animation).
