# ToastOverlay

A short message at the bottom of the screen. The app shows it when the user copies the user ID.

Source: `SZFeatureSettings/UI/CommonViews.swift` (`ToastOverlay`; the Toast-Swift look with the colours of `account.component.ts`).

## When to use

For a short confirmation that needs no action. The only use in the app: "Your ID is copied to the clipboard" (`COPY_ID`) on the Account page.

## Geometry

- `black` fill, radius 10 (circular), padding 10.
- Text: system 16 pt, `text` (white), leading alignment.
- At most 80 % of the screen width, centred, 10 pt above the bottom safe area.

## States

- Fades in and out in 0.2 s (linear). It stays 4 s. It takes no taps.

## Arabic

- Leading alignment, so the text is right-aligned.

## Contrast

- `text` on `black`, 16 pt: 21.00:1. Pass.

## The consumer provides

`ToastCenter` (the current toast).
