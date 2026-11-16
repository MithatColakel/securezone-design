# ClientNoticeBand

The server notice band. It shows a notice from the server in the app's words, an Update button and a close button. It is not the red no-internet banner.

Source: `SZFeatureHome/UI/ClientNoticeBandView.swift` (`ClientNoticeBandView`); text from `SZFeatureHome/Notice/ClientNoticeBand.swift` (`ClientNoticeBandModel.text`).

## When to use

Only when the server sends a notice: "update recommended", "protocol retiring" or "protocol retired". It is a row of its own above the tab content (`clientNoticeBand(_:)`), so it covers nothing. With no notice, it is not there.

## Geometry

- `HStack`, spacing 10, centred: text, Update button, close button.
- Card: `bar`, radius `bootNoticeButtonRadius` (12, circular). Padding 10 vertical, 12 horizontal. Outer padding 10 horizontal, 4 vertical. Around it: `background`.
- Text: system 13 pt, `text`, wraps, fills the width.
- Update: NSButton custom, fill `blue`, title `bootNoticeButtonTitle` 13 pt w600 (`f-13-fw-600`), radius 12, height 32, fixed size.
- Close: Font Awesome regular times-circle (U+F057), 18 pt, `bootNoticeBody`, in a 28 × 28 tap area.

## States

- Visible (one notice) or absent. Update opens the App Store. Close dismisses the notice.

## Arabic

- The band sets its own layout direction from `nsIsRTL`: text on the right, then Update, then close on the left.
- The text is right-aligned.

## Contrast

- `text` on `bar`, 13 pt: 16.78:1. Pass.
- `bootNoticeButtonTitle` on `blue`, 13 pt w600: 7.40:1. Pass.
- `bootNoticeBody` icon on `bar`: 6.64:1. Pass.

## The consumer provides

`ClientNoticeBandModel` (the visible notice, `openStore()`, `dismiss()`).
