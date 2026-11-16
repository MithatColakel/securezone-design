# SupportScreen

The Support page: a contact form with name, surname, e-mail and message, then a thank-you view. It includes the support inputs (SupportTextField, SupportTextView).

Source: `SZFeatureSettings/UI/SupportScreen.swift` (`SupportScreen`; port of `support.component.html` + `.scss`); inputs `SupportInputs.swift` (`SupportInputStyle`, `SupportTextField`, `SupportTextView`).

## When to use

Open it from Others › Support.

## Geometry

- PageTitleBar "Support" with `assets/Icons/close.png` (not the back arrow), fill `background`. It is shifted 10 pt to the right (`mr-10 ml-10` on a 100 % child; the code keeps it).
- Form column, 90 % wide: a hidden "Support" label (16 pt, 20 pt top, under the title bar), three field bars (52.5 pt; 20, 10, 10 pt above), "Your Message" (`f-16-fw-400`, 30 pt above), the message bar (180 pt, 20 pt above), Send (70 % wide, 60 pt, radius 18, 30 pt above).
- Bars: `bar`, radius 18, clipped.
- Field: at (16, 5) in its bar, 90 % of the bar wide, 40 pt high. Text 14 pt w500, `supportInput-textColor`; placeholder `supportInput-placeholderColor`. Padding 8 top, 4 + 1 bottom.
- Message box: at (16, 10), 160 pt high, 5 pt line-fragment padding.
- Error labels: `f-10-fw-400`, `red`, at (15, 0) in the bar. "*Required" (e-mail, message) or "*Enter valid email".
- Thank-you view: `assets/Illustrations/support_thanks.png` 200 × 200, then two `f-14-fw-400` lines (30 pt above), centred. It fades in over 0.5 s from 5 pt below.

## States

- **Looks disabled** (form not valid): Send is `blue` with a `black` title. It is still tappable; a tap shows the error labels.
- **Ready:** Send is `blue` with a `text` (white) title.
- **Errors:** red labels in the bars.
- **Sent:** the thank-you view.
- The keyboard covers the form. The form slides up while the message box has focus.

## Arabic

- Fields and the message box type right to left and align right. The close icon moves to the right column.
- The error labels are placed with a leading padding in a left-to-right root, so the preview draws them at the left. **Not checked on device.**

## Contrast

- `supportInput-textColor` on `bar`, 14 pt w500: 12.00:1. Pass.
- `supportInput-placeholderColor` on `bar`: 4.78:1. Pass.
- `red` on `bar`, 10 pt: 4.20:1. **Fails** 4.5:1. Proposed fix: #FF4D4D gives 5.13:1.
- Send, looks disabled: `black` on `blue`: 8.21:1. Pass.
- Send, ready: `text` on `blue`: 2.56:1. **Fails** (known pair).
- `text` on `background` (labels, thank-you lines): 19.67:1. Pass.

## The consumer provides

A `SupportFormViewModel` (field texts, error flags, `sendButtonLooksDisabled`, `send()`, `close()`).
