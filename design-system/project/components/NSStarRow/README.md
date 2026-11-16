# NSStarRow

A 25 pt rating row of the protocol cards: a label in one half, five Font Awesome stars in the other.

Source: `SZDesign/Controls/NSStarRow.swift` (port of `star-show`).

## When to use

Only on the protocol cards (Settings › Protocols): connection speed, encryption, security, stability.

## Geometry

- Row height 25 pt, columns `*, *`.
- Label: the default label, `f-12-fw-400` in `text`, 2 pt top and bottom padding (`labelVerticalPadding`).
- Stars: five equal columns, each star right-aligned in its column. Glyph U+F005: `fas-10` (Font Awesome Solid) when filled, `far-10` (Regular) when empty. Colour `star`.

## States and motion

The stars appear 200 ms after the row. They start 10 pt low and transparent, then rise and fade in over 410 ms (linear), after a delay of `delayUnits × 100 ms`.

## Arabic

- Only the two halves swap: the label goes to the right half (right-aligned), the stars to the left half.
- Kept quirk from the code: the filled stars stay on the LEFT in Arabic too (the star order is not mirrored).

## Contrast

- `text` on `bar`: 16.78:1. Pass.
- `star` on `bar` (icon): 11.04:1. Pass.

## The consumer provides

The label key (`labelKey`), the number of filled stars (`filled`), `delayUnits` and an optional `isRTL` override.
