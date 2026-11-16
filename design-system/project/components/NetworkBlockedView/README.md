# NetworkBlockedView

The full screen "Your network blocks VPN". It shows when every connection way failed on this network.

Source: `SZFeatureHome/NetworkBlocked/NetworkBlockedView.swift`; model `NetworkBlockedModel.swift`; shown by `App/Sources/Composition/UI/NetworkBlockedPresenter.swift`.

## When to use

Only after the connect walk tried every protocol and the network blocked all of them.

## Geometry

- Vertical stack, padding 28 horizontal and 16 bottom, flexible spacers (min 24) above the icon and above the buttons. Fill `background`.
- Icon: SF Symbol `wifi.exclamationmark`, 64 pt regular, `blue`, in a 128 pt `bar` circle.
- Title: 24 pt w700, `text`, centred, 32 pt below the icon. Strings key `ALERTS.NETWORK_BLOCKED_TITLE`.
- Message: 16 pt, `cGray`, line spacing 4, centred, 16 pt below.
- Tips: 15 pt, `text`, line spacing 4, centred, padding 16, fill `board`, radius `radius` (18), 24 pt below.
- Retry: NSButton kind blue, radius 18, height 55, full width.
- Close: NSButton custom, no fill, title `cGray`, radius 18, height 50, 8 pt below Retry.

## States

- **Retry ready:** kind blue, "Retry".
- **Retry held:** kind disabled, "Retry in m:ss" (`NetworkBlockedModel.countdown`), updated every second. Taps do nothing.

## Arabic

- The stack sets right-to-left from `nsIsRTL`. All text is centred, so the order does not change. The countdown digits stay left to right.

## Asset note

- The icon is an SF Symbol. SF Symbols cannot be copied as files. The preview uses `assets/Icons/wifi.png` (green) as the closest shape match; its colour is not the real one. **Flag:** the real icon is `wifi.exclamationmark`, blue.

## Contrast

- `text` on `background`, 24 pt w700: 19.67:1. Pass.
- `cGray` on `background`, 16 pt: 9.81:1. Pass.
- `text` on `board`, 15 pt: 17.86:1. Pass.
- `blue` icon on `bar`: 6.56:1. Pass.
- Retry: `text` on `blue`, 2.56:1. **Fails** (known pair). Retry held: `black` on `buttonDisabled`, 2.38:1. **Fails** (known pair).
- Close: `cGray` on `background`, 16 pt w600: 9.81:1. Pass.

## The consumer provides

`NetworkBlockedModel` (`retryWaitSeconds()`, `retryTapped()`, `closeTapped()`).
