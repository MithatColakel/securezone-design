# NSSlideBar

The onboarding page indicator: one thin capsule per page, white for the current page.

Source: `SZDesign/Controls/NSSlideBar.swift` (port of `onboarding/slidebar`); the pager uses `SZFeatureOnboarding/UI/OnboardingSlideBar.swift`.

## When to use

Under the onboarding pager only (4 pages).

## Geometry

- Width: `total × 10 %` of the parent, centred. One equal column per page.
- Each dot: a capsule 2 pt high and 22 % of its column wide.
- Colours: `slideDotActive` for the current page, `slideDotPassive` for the others.

## Arabic

The layout stays left to right. The active dot is counted from the right, so page 1 lights the right-most dot.

## Contrast

`slideDotPassive` on `background`: 3.97:1. Pass (3:1 for a mark that carries meaning). `slideDotActive` on `background`: 19.67:1.

## The consumer provides

The current page (`number`, 0-based; values below 1 mean page 0), `total` and an optional `isRTL` override.
