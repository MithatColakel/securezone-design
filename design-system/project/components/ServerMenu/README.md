# ServerMenu

The server picker. It is the content of the right drawer.

Source: `SZFeatureServers/UI/ServerMenuView.swift` (`ServerMenuView`, port of `server-menu.component.html` + `.scss`); model `ServerMenuModel.swift`, `ServerMenuViewState.swift`.

## When to use

Open it from ServerSelectButton on Home. The drawer slides it in from the right edge, full width, in Arabic too.

## Geometry

- Fill `background`, also under the status bar and the home indicator.
- Title row: `pageTitleBarHeight` (45 pt), columns `*, 5*, *`. "Server Location" (`SERVER_SELECTION.TITLE`, `f-16-fw-500`, centred) in the middle column. The close image (`assets/Icons/close.png`, `closeButtonSize` 19 × 19) is centred in the first column (the last in Arabic). A tap on the whole row closes the drawer.
- List: vertical scroll, no indicators, 17.5 pt top inset.
  - The Auto row ("Auto Location", `SERVERS.CATEGORIES.AUTO`): a ServerRow, 50 pt, no flag.
  - PremiumTrialBar for free users, 15 pt below.
  - Per category: 10 pt gap, then the category title (`f-16-fw-300`, 60 pt high, 30 pt side margins, natural alignment), then its rows. Each row is a 50 pt ServerRow centred in a 60 pt slot.
- Categories in the strings: "Quick Access", "All Locations". The rows in the preview are examples.

## States

- Free user: the premium bar shows. Premium user: no premium bar.
- Selected row: the tick (see ServerRow).
- The list scrolls to the top every time the drawer closes.

## Arabic

- The close image moves to the right column. Rows use the ServerRow Arabic columns. Category titles are right-aligned.
- **The Auto row is never shown in Arabic.** It keeps its 50 pt and takes no taps. The code copies this on purpose from 4.8.x (comment in `ServerMenuView.rows`). The preview shows the empty 50 pt.

## Contrast

- `text` on `background` (title, category titles): 19.67:1. Pass.
- Rows and the premium bar: see ServerRow and PremiumTrialBar. The bar title `text` on `blue` fails at 2.56:1 (known pair).

## The consumer provides

`ServerMenuModel` (view state, row taps, premium bar tap, title tap, scroll reports).
