# UpdateRequiredView

The blocking "Update required" screen. A build below the minimum version opens on it; its one button opens the App Store.

Source: `App/Sources/Composition/UI/UpdateRequiredView.swift` (`UpdateRequiredView`, `UpdateGate`).

## When to use

Only when the update check says this build is below the minimum. The check never blocks the launch, and it fails open (no answer means no screen). It is a screen, not an alert, so a later popup cannot dismiss it.

## Geometry

- Full screen `background`.
- Card centred vertically: `bar`, radius `bootNoticeRadius` (16), padding `bootNoticePadding` (20), margin `bootNoticeMargin` (24). It reuses the boot notice values.
- Title `f-20-fw-700` `text`, centred, wraps.
- Message `f-14-fw-400` `bootNoticeBody`, centred, wraps, 10 pt top.
- "Update": `blue` with `bootNoticeButtonTitle` title, `f-15-fw-600`, radius 12, 40 pt, 20 pt top, the full card width.

## States

One state.

## Arabic

Texts are centred and right to left. Nothing moves.

## Contrast

- `text` on `bar`: 16.78:1; `bootNoticeBody` on `bar`: 6.64:1; `bootNoticeButtonTitle` on `blue`: 7.40:1. Pass.

## The consumer provides

`openAppStore`.
