# PremiumHeader

The premium user's header on Home: the brand title and a small "Premium" pill.

Source: `SZFeatureHome/UI/HomeScreen.swift` (`PremiumHeader`, private; port of `home.component.html:21-27`).

## When to use

Only on Home, in the top row, when the user is premium. Free users see GetPremiumBar in this place.

## Geometry

- Vertical stack. Title "Securezone VPN" (`mainPage.title`), `Righteous-22`, centred, at its natural height.
- 10 pt below: a pill 120 × 25, `gray`, radius `radius` (18, so fully round), centred.
- Pill columns `*, 2*`: the diamond (`assets/Icons/diamondicon.png`, aspect-fit, 5 pt margin) and "Premium" (`f-14-fw-500`, `yellow`, left-aligned).

## States

- One state. No tap.

## Arabic

- No change. The title is the brand name in every language. "Premium" is hard-coded English in the template, and the code keeps it.

## Contrast

- `text` on `background`, 22 pt: 19.67:1. Pass.
- `yellow` on `gray`, 14 pt w500: 10.56:1. Pass.

## The consumer provides

Nothing. The view has no inputs.
