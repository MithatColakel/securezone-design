# SplashView

The launch splash: the splash gradient, the Lottie logo animation and a thin progress bar. It is an overlay above the first route. It includes **SplashProgressBar** and **SplashBackdropView**.

Source: `SZFeatureOnboarding/UI/SplashView.swift` (`SplashView`, `SplashBackdropView`, `SplashProgressBar`); geometry `Logic/SplashLayout.swift`; motion `Logic/SplashBarTrack.swift`.

## When to use

At every launch, until the boot is done. SplashBackdropView is the bare gradient of the `/loading` route, so the hand-over from the launch screen is invisible.

## Geometry

- Background: `splashTop` flat for the top 20 %, then to `splashBottom` at 100 % (to bottom), edge to edge.
- Progress bar: 50 % of the width, 5 pt high, a capsule. Its top is at 75 % of the safe-area height. Track `splashBar-track` (#4E66BA); fill `splashBar-fill` (#7BC5F5), the full track width, moved left by (1 − value / 100) of the track and clipped.
- Lottie: `assets/Lottie/JSON.json`, a 200 × 600 pt frame, centred, drawn over the bar, speed 1.5, plays once. A static preview cannot play it; the card shows a labelled box.
- Assets for the launch screen: `assets/Launch/`.

## States

- Progress 0–100 %. Each move runs from where the fill is drawn, with its own duration and curve.
- Interactive (it swallows taps) or not; fading out linearly over `fadeDurationMs`.
- Hidden from VoiceOver (decorative).

## Arabic

No change. The bar fills from the left in every language (the old build never mirrored it).

## Contrast

No text. `splashBar-fill` on `splashBar-track`: 2.83:1, below 3:1. The bar is decorative (hidden from VoiceOver), so this is advisory. Proposed fix under Proposals: a lighter fill, #A8DBF9 (3.60:1).

## The consumer provides

A `SplashScreenModel`: `barMove`, `overlayOpacity`, `fadeDurationMs`, `isInteractive`, `isLottiePlaying`, `lottieDidComplete`.
