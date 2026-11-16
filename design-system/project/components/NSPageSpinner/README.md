# NSPageSpinner

A full-screen scrim with the white system activity indicator. It blocks taps while a page loads.

Source: `SZDesign/Controls/NSSpinner.swift` (`NSPageSpinner`, `NSActivityIndicator`; port of `loading-spinner`). Home uses it as `MainPageSpinnerView`.

## When to use

While the app waits for a purchase, a restore or the server list. Not for short waits inside a control (the Connect button has its own progress ring).

## Geometry

- Scrim: `spinnerScrim` over the whole screen, safe areas included. It takes every tap.
- Indicator: the iOS system `ProgressView` (circular, medium), tinted `text`. Its box is `activityIndicatorSize` (30 pt).

The preview draws the indicator as eight spokes. That is a static stand-in for the system control, not an app asset.

## Arabic

Nothing to mirror.

## The consumer provides

Nothing. Show it or remove it. `ignoresSafeArea` (default true) decides if the scrim covers the safe areas.
