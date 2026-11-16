# AgreementView

The privacy disclosure: the first screen of a first launch (Apple guideline 5.4: shown before anything is collected).

Source: `SZFeatureOnboarding/UI/AgreementView.swift` (`AgreementView`, `AgreementLayout`); the check is TickMark. Model: SZConsent `AgreementModel` through `AgreementScreenModel`.

## When to use

Once, at the first launch, before the onboarding.

## Geometry (rows `*, 180`)

- Page `background`.
- Title panel: `background`, bottom corners radius 20, shadow `agreementHeader` (0 6 18 rgba(0,0,0,0.55), drawn the NativeScript way). Title `f-16-fw-800`, 90 % wide, wraps, 20 pt top and bottom. It is drawn over the text, so its shadow falls on the text.
- Disclosure: a scroll view, 90 % wide, text `f-13-fw-400`, wraps, 36 pt top and 44 pt bottom padding. Scrims 36 pt high at the top and bottom (pageScrim: `background` 0 %, `background` at 0.86 42 %, transparent 100 %). They take no taps.
- Consent panel: 180 pt, `background`, top corners radius 20, shadow `agreementFooter` (0 −6 18 rgba(0,0,0,0.55)).
  - Checkbox row: 50 pt, columns `*, 5*`: TickMark centred; label "Agree with Data Usage Policy" `f-14-fw-400`, auto-fit to one line. The whole row toggles.
  - "Confirm Agreement": kind blue, 90 % × 50 pt, radius 18, `f-14-fw-600` `text`, 8 pt top and bottom.
  - Links: "Terms of Use and Privacy Policy", 11 pt w500, " and " in `dark`, 80 %, 5 pt top.

## States

- Ticked (the default), unticked, unticked with error (the error dot pulses after a Confirm with the box unticked).

## Arabic

- Columns become `5*, *`: the box is on the right. The label becomes a wrapping 13 pt label (`f-13-fw-400`). These are the template's two branches; nothing else mirrors.
- The disclosure text is right to left and aligns right.

## Contrast

- `text` on `background`: 19.67:1. Pass.
- `text` on `blue` (Confirm): 2.56:1. **Fails** (known pair).
- `dark` on `background` (" and ", 11 pt): 3.03:1. **Fails** (known pair).
- Unticked box `gray` on `background`: 1.19:1. **Fails** 3:1 (new; see TickMark).
- Error dot `agreement-errorDot` on `background`: 2.97:1. **Fails** 3:1 (new; see TickMark).

## The consumer provides

An `AgreementScreenModel`: `isChecked`, `showsError`, `toggle()`, `confirm()`, link actions and lifecycle hooks.
