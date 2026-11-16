# OnboardingView

The first-run onboarding: a 4-page pager over a fixed purchase block. It includes **OnboardingPurchasePanel**, **OnboardingSlideBar** (the page dots) and the "Proceed with Basic" button.

Source: `SZFeatureOnboarding/UI/OnboardingView.swift` (`OnboardingView`, `OnboardingPurchasePanel`, `OnboardingPages`), `UI/OnboardingPager.swift`, `UI/OnboardingSlideBar.swift`, `Logic/OnboardingSlideBarGeometry.swift`; model `Logic/OnboardingModel.swift`.

## When to use

At the first launch, after AgreementView.

## Geometry (safe area, rows `5*, 3*`)

- **Page** (rows `16*, 5*, 6*`, laid out in device pixels): illustration `onboarding1.png` … `onboarding4.png`, 75 % wide, aspect-fit; title 30 pt (`f-30-fw-400` size; weight w600, page 2 w700), 90 % wide, wraps, centred; message `f-15-fw-400` `cGray`, 90 %, wraps, at the top of its row. Page 4 repeats page 3's message (template quirk, kept).
- **Bottom** (rows `3*, 3*, 6*, 4*`):
  - Row 0: the page dots — a bar 40 % of the width (10 % per page), centred; each dot 22 % of the bar (35.4 pt on a 402 pt phone), 2 pt high, radius 1, centred in its column; `slideDotActive` / `slideDotPassive`. "Proceed with Basic" lies over it: a transparent button, `proceed` (#2FA6F8) 16 pt regular, 40 pt high, 8 / 16 pt margins. On the swipe to the last page it fades in (opacity = ratio³) while the dots fade out (1 − 5 × ratio); it takes taps only when its opacity is 0.01 or more.
  - Rows 1–3: **OnboardingPurchasePanel** (rows `3*, 6*, 4*`): headline `f-14-fw-600` (bottom of its half) over the price line `f-14-fw-400` `cGray` (top of its half); "Continue" kind blue, 70 % × 52.5 pt, radius 18, centred; "Terms of Use and Privacy Policy" `f-12-fw-500` with " and " in `dark`; "About Subscription and Restore purchase" 12 pt w300 `darkLight`, " and " w500 `dark`. Each link line is one line, 80 % wide.
- NSPageSpinner over everything while loading.

## States

- Page 1–4; free trial or not ("Try it free for 3 days." / "Unlock all Premium features."); price not loaded (no price line); Proceed with Basic hidden or shown; loading.
- The composition root can pass another purchase block in place of OnboardingPurchasePanel.

## Arabic

- The pager pages are reversed and the pager starts at the right.
- The dots do not mirror their layout; the active dot is counted from the right.
- Texts are centred and right to left.

## Contrast

- `text` on `background`: 19.67:1; `cGray` on `background`: 9.81:1; `proceed` on `background` (16 pt): 7.43:1. Pass.
- `slideDotPassive` on `background`: 3.97:1. Pass (3:1).
- `text` on `blue` (Continue): 2.56:1. **Fails** (known pair).
- `darkLight` on `background` (About Subscription, Restore purchase): 3.86:1. **Fails** (known pair). `dark` on `background` (" and "): 3.03:1. **Fails** (known pair).

## The consumer provides

`OnboardingModel` (pages, opacities, `freeTrial`, `price`, `loading`, purchase / restore / link actions, lifecycle), and optionally a custom purchase block.
