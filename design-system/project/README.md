Securezone VPN is a VPN app for iPhone and iPad. Most users are in the MENA region, so every screen ships in English and Arabic. The app is dark, calm and direct: a deep navy page, dark rounded bars, one bright blue for actions, yellow for premium, turquoise for "connected".

## Themes and platforms

- **Dark is the only theme.** The app forces dark mode (`.preferredColorScheme(.dark)`). There is no light palette. Do not add a light theme without board approval; it would be new design work. Every contrast check below is for the dark theme.
- **iPhone and iPad.** iPad runs the iPhone layouts in portrait, full screen. The only iPad difference in code is the save bubble offset on the Get Premium sheet. The page shows each platform in its own area (see Screens).
- **Mac: not on `master` yet.** The Mac app (menu bar panel and window) is not on `master`. Its approved design (VPN-589) is in **Screens · Mac** as "Approved, not built — VPN-589" cards.
- **Units are iOS points.** Write `px` in CSS for `pt` in the app. Font sizes are fixed; the app does not follow Dynamic Type.

## Content fundamentals

- Speak to the user as "you". The app is "we": "We tried every way to connect. This Wi-Fi or mobile network blocks VPN connections."
- Buttons and titles are Title Case: "Start Subscription", "Get Premium", "Server Location", "Restore Defaults".
- Connect states are UPPER CASE and short: CONNECTING, CONNECTED, STOP.
- Give the user the next step: "Switch between Wi-Fi and mobile data, or try another Wi-Fi network. Then tap Retry."
- Offers may use one exclamation mark ("Best Deal Only for You!"). Service and error text uses none.
- No emoji in the UI. Two strings start with one (`⚠️` billing grace title, `🎁` offer notification); do not add more.
- Every string has an Arabic version. Some Arabic strings are longer or shorter than English; some English parts are empty in Arabic (the Watch button has no third part). Check both.
- Kept exception: the no-internet banner says "Error" / "Connection is failed" in English in every language.

## Colour

Use the `tokens.json` names. They are the code's own names (`Palette`, `SwitchPalette`) in code order. Literal colours from single views are named `<view>-<role>`.

- Page: `background` on every page and under the tab bar (`tabBar` is the same value).
- Surfaces: `bar` for rows, server rows and the Home bars (radius `radius`). `gray` for small pills (IP / ping, premium pill). `noTimePanelSheet` for the time and billing bottom sheets.
- Text: `text` for almost all text. `cGray` for secondary text. `yellow` for premium words and the free-time clock. `cBlue` for text links (Restore, No thanks). `turkuaz` and `connectConnectedText` only for "connected" states. `red` only for form errors.
- Actions: `blue` with `text` is the main button (`NSButton` kind blue). `buttonYellow` with `black` is the premium button. `buttonGray` with `buttonTitleDefault` is the secondary button.
- Connect button: `connectAccent` with the `connect` gradient (`connectGradientTop` 20 % → `connectGradientBottom`) while not connected; `connectConnectedRing` when connected; `connect-progressRing` under it; `connectRingLight` for the spinning arc.
- Do not use `dark` (#5E5E5E) or `darkLight` (#6E6E6E) for new text on `background`: both fail 4.5:1 (see the table).

## Type

- The system font (SF Pro) for all text: family `system`. It is not shipped as a file (Apple licence).
- Righteous 22 (`Righteous-22`) only for the Home title "Securezone VPN" and the Report sheet title.
- Font Awesome 5 Free, as glyphs: U+F005 star (`fas-10` filled, `far-10` empty) on protocol cards; U+F057 times-circle (`fas-35`) on the no-internet banner, (`far-18`) as the notice band close.
- The code has no named type scale. Each view sets a size and a weight; the styles are named after the code's classes, `f-<size>-fw-<weight>`. Use the existing style of the same kind of element:
  - Row titles `f-15-fw-500` (switch rows `f-15-fw-400`), row values `f-14-fw-500`.
  - Server names `f-14-fw-600`; home server bar `f-16-fw-600` (one line) or `f-12-fw-500` over `f-13-fw-700` (auto).
  - Buttons `f-16-fw-600`.
  - Page title bar `f-16-fw-500`, centred (`NSBarRows.swift`, `PaywallScaffold.swift`); panel and sheet titles `f-20-fw-700` or `f-21-fw-600`.
  - Captions and legal text `f-12-fw-300` to `f-12-fw-400`; never below 10 pt.
- Labels have 2 pt top and bottom padding (`labelVerticalPadding`). The code sets no line height.

## Space, size and shape

- Rows are `rowWidthFraction` (90 %) of the screen, centred, 10 pt apart (20 pt before a new group).
- Heights: settings row `selectableBarHeight` (52.5), server row `serverRowHeight` (50), home server bar `serverSelectHeight` (65), Start Subscription bar `premiumTrialBarHeight` (90), page title bar `pageTitleBarHeight` (45), default button `buttonDefaultHeight` (40).
- Radius: `radius` (18) for rows and bars; `radiusB` (20) for the Start Subscription bar and offer cards; `radiusM` (10) for pills; `radiusL` (5) for small buttons; `topBarBottom` (12) for the bottom corners of top banners; `roundedTop` (15) for sheet tops. A button with no radius class is square (`buttonDefaultRadius` 0).
- There is no spacing scale: views use plain point values (1–50, then 55, 60, 65, 70, 75). Use the value the nearest existing screen uses.

## Depth and motion

- The app is flat. Shadows are few: `switchThumb`, `agreementHeader` / `agreementFooter` on the agreement screen, `ratingCTA` under the rating button, and two yellow glows (`diamondGlow`, `ratingStarGlow`).
- Scrims: `spinnerScrim` (page spinner), `drawerBackdrop` (bottom sheets), `report-scrim` (report sheet).
- Press feedback for bars and rows: scale 0.98 and opacity 0.5 (`pressedOpacity`), 200 ms linear. Solid buttons only dim their title to 0.2. Disabled: `disabledOpacity` (0.5).
- Switch: 250 ms ease-in-out. Connect heart pulse: 2 s ease-in-out, forever, while connected.

## Iconography

- Icons are PNG files in `assets/Icons/` (copied from the app). They are not tinted, except the three tab bar icons (template images: `tabSelected` / `tabUnselected`).
- Sizes are set by the view: 20 × 20 for row arrows, ticks and signal icons; 19 × 19 for close buttons (`closeButtonSize`); 30 × 30 for flags (`flagSize`).
- Flags are round PNGs in `assets/Flags/` (ISO codes, plus GAMING and STREAMING).
- There is no SVG logo. The mark exists only as the app icon PNGs in `assets/Logos/`. Never redraw it.
- Lottie animations are in `assets/Lottie/` (listed, not rendered here).

## Arabic (right to left)

- The app pins the layout to left-to-right and mirrors each screen by hand. In Arabic a view swaps its columns: a row `*, 5*, 2*` becomes `2*, 5*, *`.
- Text is natural-aligned: right-aligned in Arabic.
- Back arrows and row arrows mirror (`scaleX(-1)`). Up / down chevrons, the Connect ring and the clock digits do not.
- The tab bar order mirrors (Home on the right), because UIKit does it.
- Kept quirks (do not "fix" them in a design without a task): protocol stars keep the filled stars on the left; the flag and server-name margins stay on the left; the information bar does not mirror.
- Not mirrored at all: the connection-rating sheet (stars and pill stay left to right), the rate-us drawer (NO stays on the left) and the report sheet layout (only its row titles align right).
- The server list never shows the Auto row in Arabic: it keeps its 50 pt and takes no taps (kept from 4.8.x).
- Righteous has no Arabic letters. Arabic text in a Righteous style falls back to the system font.
- Numbers in the clock and the timer stay Western digits, left to right. Some Arabic strings use Arabic-Indic digits (for example "١٠٠").

## Components

Each component card says where it is in the code, its geometry, states, Arabic behaviour and contrast. The previews are static HTML drawings made from the Swift geometry; the app's SwiftUI cannot run in a browser. The cards use the real tokens, strings, icons and flags.

A label with no size set is 12 pt (`Metrics.defaultFontSize`).

Built (46): Controls — NSButton, NSRowButton, NSSwitch, NSStarRow, NSSlideBar, NSPageSpinner. Home — ConnectButton, ServerSelectButton, InformationBar, GiftBar, GetPremiumBar, WatchButton, ConnectionFailedBanner, HomeTabBar, ClientNoticeBand, PremiumHeader, ReportButton, NetworkBlockedView. Servers — ServerRow, PremiumTrialBar, ServerMenu. Settings — PageTitleBar, SettingsScreen, ProfileScreen, PageRows, ProtocolCard, SupportScreen, ToastOverlay. Sheets — ConnectionRatingSheet, ReportSheet, RateUsView. Paywalls — PaywallScaffold, GetPremiumView (with Week), PromotionDealView (with CountdownBar), ServersFullView, GiftView, BillingPeriodView, NoTimePanelView (with PanelButton), VideoGiftPanel, BillingGraceView. Onboarding — SplashView (with SplashProgressBar, SplashBackdropView), OnboardingView (with OnboardingPurchasePanel, OnboardingSlideBar), AgreementView, BootNoticeView, TickMark. App — UpdateRequiredView.

Documented in the cards, not as cards of their own: PopupSheetRoot, DrawerHost and PopupBottomLayer (the sheet containers, `SZPopups`), NSPressable (press feedback), and NSLabel / FAIcon / AppImage (text, glyph and image primitives).

Lottie animations (the splash logo, the reward progress bar and gift box) cannot play in a static preview. The cards show a labelled box and name the file in `assets/Lottie/`.

Later, after merge to `master` (VPN-589): the Mac menu bar panel and the iPad Settings split layout.

## Screens

Every screen of the app is on the app's screen canvas (Claude Design).

## Contrast (dark theme)

WCAG 2: 4.5:1 for text; 3:1 for text 24 pt and larger or bold 19 pt and larger, and for icons and marks that carry meaning. Alpha colours are measured after blending on their ground. Failing pairs are kept exactly as the app has them; each has a proposed fix for a later, approved task.

| Text / mark | Ground | Size | Ratio | Needs | Result | Where |
|---|---|---|---|---|---|---|
| `text` #ffffff | `background` #080b13 | 15 pt w400 | 19.67:1 | 4.5:1 | Pass | Body text, titles on every page (default label) |
| `text` #ffffff | `bar` #171d2e | 15 pt w500 | 16.78:1 | 4.5:1 | Pass | Settings / profile rows, server rows, home server bar |
| `text` #ffffff | `gray` #1b1f26 | 14 pt w400 | 16.53:1 | 4.5:1 | Pass | Information bar pills (IP, PING) |
| `text` #ffffff | `blue` #839ff2 | 16 pt w600 | 2.56:1 | 4.5:1 | **Fail** | NSButton kind blue title (Network-blocked Retry, paywalls); Support Send when the form is ready; Start Subscription bar (18 pt w600) |
| `text` #ffffff | `noTimePanelSheet` #3a3f4c | 14 pt w400 | 10.52:1 | 4.5:1 | Pass | NoTimePanel, billing grace / paused sheets |
| `text` #ffffff | `connectionFailed-background` #ff1205 | 14 pt w400 | 3.93:1 | 4.5:1 | **Fail** | No-internet banner message ("Error" is 20 pt bold) |
| `text` #ffffff | `rateUs-yesButton` #5990fe | 16 pt w600 | 3.07:1 | 4.5:1 | **Fail** | Rate-us Yes button |
| `text` #ffffff | `rateUs-noButton` #212a41 | 16 pt w600 | 14.26:1 | 4.5:1 | Pass | Rate-us No button |
| `text` #ffffff | `protocolCard-selectedBackground` #182644 | 16 pt w600 | 15.00:1 | 4.5:1 | Pass | Selected protocol card |
| `text` #ffffff | `ratingCTABottom` #6d86e8 | 16 pt w600 | 3.37:1 | 4.5:1 | **Fail** | Connection-rating CTA title (gradient bottom, the lighter end is worse) |
| `text` #ffffff | `ratingCTATop` #93abff | 16 pt w600 | 2.21:1 | 4.5:1 | **Fail** | Connection-rating CTA title (gradient top) |
| `black` #000000 | `buttonYellow` #ffc700 | 16 pt w600 | 13.42:1 | 4.5:1 | Pass | NSButton kind yellow title |
| `black` #000000 | `buttonDisabled` #3c4970 | 16 pt w600 | 2.38:1 | 4.5:1 | **Fail** | NSButton kind disabled title: Network-blocked "Retry in m:ss" countdown |
| `black` #000000 | `blue` #839ff2 | 16 pt w600 | 8.21:1 | 4.5:1 | Pass | Support Send while the form looks disabled (blue fill, black title) |
| `buttonTitleDefault` #56a3f2 | `buttonGray` #2f3442 | 16 pt w600 | 4.68:1 | 4.5:1 | Pass | NSButton kind gray title |
| `buttonTitleDefault` #56a3f2 | `background` #080b13 | 14 pt w400 | 7.42:1 | 4.5:1 | Pass | System alert tint (button titles) |
| `yellow` #ffc700 | `bar` #171d2e | 14 pt w600 | 10.72:1 | 4.5:1 | Pass | Get Premium bar title; plan price on plan cards |
| `yellow` #ffc700 | `background` #080b13 | 13 pt w800 | 12.57:1 | 4.5:1 | Pass | Gift bar clock; Get your FREE gift span |
| `yellow` #ffc700 | `gray` #1b1f26 | 14 pt w500 | 10.56:1 | 4.5:1 | Pass | Home premium pill "Premium" |
| `cBlue` #7f9fef | `background` #080b13 | 12 pt w600 | 7.59:1 | 4.5:1 | Pass | Restore link (12 pt w600), protocol badge (11 pt), No thanks (16 pt w600) |
| `red` #ff0000 | `bar` #171d2e | 10 pt w400 | 4.20:1 | 4.5:1 | **Fail** | Support form "*Required" / "*Enter valid email" (10 pt, inside the field bars) |
| `turkuaz` #5edfda | `background` #080b13 | 17 pt w800 | 12.22:1 | 4.5:1 | Pass | Connect button STOP |
| `connectConnectedText` #5edfda | `background` #080b13 | 13 pt w800 | 12.22:1 | 4.5:1 | Pass | Connect button CONNECTED label |
| `dark` #5e5e5e | `background` #080b13 | 12 pt w500 | 3.03:1 | 4.5:1 | **Fail** | " and " between legal links (onboarding, paywalls, agreement 11 pt) |
| `darkLight` #6e6e6e | `background` #080b13 | 12 pt w300 | 3.86:1 | 4.5:1 | **Fail** | Paywall CTA sublines (12 pt), deal legal text (10 pt w300), About Subscription and Restore purchase (12 pt w300). The Get Premium terms paragraph is white, not `darkLight` (see GetPremiumView) |
| `cGray` #b3b7c3 | `background` #080b13 | 14 pt w400 | 9.81:1 | 4.5:1 | Pass | Onboarding price line and messages, network-blocked body (16 pt) |
| `green` #7ae2da | `noTimePanelSheet` #3a3f4c | 12 pt w400 | 6.88:1 | 4.5:1 | Pass | NoTimePanel green caption |
| `green` #7ae2da | `bar` #171d2e | 12 pt w400 | 10.96:1 | 4.5:1 | Pass | VideoGiftPanel green caption (bar sheet) |
| `proceed` #2fa6f8 | `background` #080b13 | 16 pt w400 | 7.43:1 | 4.5:1 | Pass | Onboarding proceed button title |
| `bootNoticeBody` #9aa3b8 | `bar` #171d2e | 14 pt w400 | 6.64:1 | 4.5:1 | Pass | Boot notice body |
| `bootNoticeButtonTitle` #0b1020 | `blue` #839ff2 | 15 pt w600 | 7.40:1 | 4.5:1 | Pass | Boot notice Retry title |
| `supportInput-textColor` #d7d8f4 | `bar` #171d2e | 14 pt w500 | 12.00:1 | 4.5:1 | Pass | Support form field text (inside the field bars) |
| `supportInput-placeholderColor` #86898f | `bar` #171d2e | 14 pt w500 | 4.78:1 | 4.5:1 | Pass | Support form placeholder (inside the field bars) |
| `rating-tapHint` #5f677d | `ratingSheetStops-0` #161d33 | 12 pt w400 | 2.96:1 | 4.5:1 | **Fail** | Rating sheet tap hint (on the top of the sheet gradient) |
| `rating-tapHint` #5f677d | `ratingSheetStops-1` #0b1020 | 12 pt w400 | 3.36:1 | 4.5:1 | **Fail** | Rating sheet tap hint (on the middle of the gradient) |
| `rating-reasonsTitle` #8b93a7 | `ratingSheetStops-1` #0b1020 | 13 pt w400 | 6.16:1 | 4.5:1 | Pass | Rating sheet reasons title |
| `rating-subtitle` #aeb7cd | `ratingSheetStops-1` #0b1020 | 12 pt w400 | 9.43:1 | 4.5:1 | Pass | Rating sheet subtitle |
| `reasonChip-text` #cfd6e6 | `reasonChip-background` #141a2b | 13 pt w400 | 11.89:1 | 4.5:1 | Pass | Reason chip, not selected |
| `reasonChip-textSelected` #e2e9ff | `reasonChip-backgroundSelected` #26356a | 13 pt w400 | 9.63:1 | 4.5:1 | Pass | Reason chip, selected |
| `reportRow-lastTitle` #1a1e29 | `buttonYellow` #ffc700 | 15 pt w600 | 10.64:1 | 4.5:1 | Pass | Report sheet last (yellow) row title |
| `billingGrace-body` rgba(255, 255, 255, 0.85) | `noTimePanelSheet` #3a3f4c | 14 pt w400 | 8.14:1 | 4.5:1 | Pass | Billing grace body (white at 0.85) |
| `billingGrace-footnote` rgba(255, 255, 255, 0.6) | `noTimePanelSheet` #3a3f4c | 12 pt w400 | 4.97:1 | 4.5:1 | Pass | Billing grace footnote (white at 0.6) |
| `tabSelected` #ffffff | `tabBar` #080b13 | icon / mark | 19.67:1 | 3.0:1 | Pass | Selected tab icon |
| `tabUnselected` #807e7e | `tabBar` #080b13 | icon / mark | 4.87:1 | 3.0:1 | Pass | Unselected tab icon (classic bar below iOS 26) |
| `slideDotPassive` #707070 | `background` #080b13 | icon / mark | 3.97:1 | 3.0:1 | Pass | Onboarding passive page dot |
| `star` #94dfd9 | `bar` #171d2e | icon / mark | 11.04:1 | 3.0:1 | Pass | Protocol rating stars on a protocol card |
| `switch-trackOnWhite` #81cafa | `bar` #171d2e | icon / mark | 9.40:1 | 3.0:1 | Pass | Switch track on, in a settings row |
| `switch-trackOff` rgba(74, 74, 74, 0.4) | `bar` #171d2e | icon / mark | 1.25:1 | 3.0:1 | **Fail** | Switch track off, in a settings row |
| `connectConnectedRing` #7ae2da | `background` #080b13 | icon / mark | 12.85:1 | 3.0:1 | Pass | Connect ring, connected |
| `connectAccent` #6f8fee | `background` #080b13 | icon / mark | 6.41:1 | 3.0:1 | Pass | Connect ring, not connected |
| `rating-starEmpty` #2e3853 | `ratingSheetStops-1` #0b1020 | icon / mark | 1.63:1 | 3.0:1 | **Fail** | Rating star, empty |
| `text` #ffffff | `board` #131724 | 15 pt w400 | 17.86:1 | 4.5:1 | Pass | Network-blocked tips box |
| `text` #ffffff | `darkBlue` #1b1c4c | 14 pt w400 | 15.94:1 | 4.5:1 | Pass | Profile premium box lines (plain fill; the image over it is not measured) |
| `yellow` #ffc700 | `darkBlue` #1b1c4c | 18 pt w600 | 10.19:1 | 4.5:1 | Pass | Profile premium box title |
| `text` #ffffff | `black` #000000 | 16 pt w400 | 21.00:1 | 4.5:1 | Pass | Toast |
| `star` #94dfd9 | `protocolCard-selectedBackground` #182644 | icon / mark | 9.87:1 | 3.0:1 | Pass | Protocol stars on the selected card |
| `protocolCard-discouragedRing` #e5484d | `background` #080b13 | icon / mark | 5.03:1 | 3.0:1 | Pass | Protocol card border, discouraged in this country |
| `cBlue` #7f9fef at opacity 0.45 | `background` #080b13 | 11 pt w400 | 2.39:1 | 4.5:1 | **Fail** | Protocol card "Coming soon" badge (the whole unavailable card is at 0.45) |
| `text` #ffffff at opacity 0.45 | `background` #080b13 | 16 pt w500 | 4.51:1 | 4.5:1 | Pass | Unavailable protocol card name and labels (small margin) |
| `blue` #839ff2 | `bar` #171d2e | icon / mark | 6.56:1 | 3.0:1 | Pass | Network-blocked icon in its circle |
| `bootNoticeBody` #9aa3b8 | `bar` #171d2e | icon / mark | 6.64:1 | 3.0:1 | Pass | Server notice band close icon |
| white at opacity 0.7 | `background` #080b13 | icon / mark | 9.69:1 | 3.0:1 | Pass | Home report button icon (8.73:1 on `bar`) |
| `rating-subtitle` #aeb7cd | `rating-pill` over `ratingSheetStops-0` | 12 pt w400 | 7.01:1 | 4.5:1 | Pass | Rating sheet server · duration pill |
| `rating-successTick` #4caf7d | `ratingSheetStops-0` #161d33 | 48 pt | 6.15:1 | 3.0:1 | Pass | Rating sheet thanks tick |
| `text` #ffffff | `noTimePanelSheet` #3a3f4c | 13 pt w400 | 10.52:1 | 4.5:1 | Pass | No-time panel message and title; billing-grace title |
| `billingGrace-body` (white at 0.85) | `noTimePanelSheet` #3a3f4c | 14 pt w400 | 8.12:1 | 4.5:1 | Pass | Billing-grace body |
| `billingGrace-footnote` (white at 0.6) | `noTimePanelSheet` #3a3f4c | 14 pt w400 | 4.96:1 | 4.5:1 | Pass | Billing-grace "Later" |
| `text` #ffffff | `noTimePanelWatchButton` #4e515e | 14 pt w600 | 7.89:1 | 4.5:1 | Pass | No-time panel "Watch Ad" |
| `black` #000000 | `buttonYellow` #ffc700 | 16 pt w600 | 13.42:1 | 4.5:1 | Pass | Get Premium CTA; Claim Reward when complete (14 pt) |
| `text` #ffffff | `buttonGray` #2f3442 | 14 pt w600 | 12.42:1 | 4.5:1 | Pass | Claim Reward, not complete |
| `green` #7ae2da | `bar` #171d2e | 12 pt w400 | 10.96:1 | 4.5:1 | Pass | Reward panel progress message |
| `cBlue` #7f9fef | `background` #080b13 | 12 pt w600 | 7.59:1 | 4.5:1 | Pass | Restore, "Miss the chance", "No, thanks", billing trial warning |
| `cBlue` #7f9fef | `bar` #171d2e | 11 pt w500 | 6.48:1 | 4.5:1 | Pass | Billing period "Current plan" / trial line |
| `yellow` #ffc700 | `bar` #171d2e | 14 pt w400 | 10.72:1 | 4.5:1 | Pass | Get Premium plan prices |
| `yellow` #ffc700 | `background` #080b13 | 24 pt w600 | 12.57:1 | 3.0:1 | Pass | Deal intro price |
| `text` #ffffff | `gray` #1b1f26 | 13 pt w700 | 16.53:1 | 4.5:1 | Pass | Get Premium save bubble |
| `text` #ffffff | `background` #080b13 | 11 pt w300 | 19.67:1 | 4.5:1 | Pass | Get Premium terms paragraph (the spans are white) |
| `proceed` #2fa6f8 | `background` #080b13 | 16 pt w400 | 7.43:1 | 4.5:1 | Pass | Onboarding "Proceed with Basic" |
| `bootNoticeBody` #9aa3b8 | `bar` #171d2e | 14 pt w400 | 6.64:1 | 4.5:1 | Pass | Boot notice and Update required body |
| `bootNoticeButtonTitle` #0b1020 | `blue` #839ff2 | 15 pt w600 | 7.40:1 | 4.5:1 | Pass | Boot notice "Try again", Update required "Update" |
| `blue` #839ff2 | `background` #080b13 | icon / mark | 7.69:1 | 3.0:1 | Pass | Deal countdown bar fill |
| `promotionDeal-countdownTrack` #4c4e54 | `background` #080b13 | icon / mark | 2.37:1 | 3.0:1 | Advisory | Deal countdown track line (the fill carries the meaning and passes) |
| `gray` #1b1f26 | `background` #080b13 | icon / mark | 1.19:1 | 3.0:1 | **Fail** | TickMark empty circle: agreement consent box, unticked |
| `background` #080b13 | `bar` #171d2e | icon / mark | 1.20:1 | 3.0:1 | **Fail** | Server list tick, empty circle (ServerTickView) |
| `agreement-errorDot` #4f5e70 | `background` #080b13 | icon / mark | 2.97:1 | 3.0:1 | **Fail** | Agreement error dot (pulses over the unticked box) |
| `splashBar-fill` #7bc5f5 | `splashBar-track` #4e66ba | icon / mark | 2.83:1 | 3.0:1 | Advisory | Splash progress bar (decorative, hidden from VoiceOver) |

### Pairs that fail (kept as in the app)

- `text` on `blue` — 2.56:1 (NSButton kind blue title; Start Subscription bar (18 pt w600)). Proposed fix: Use `bootNoticeButtonTitle` (#0B1020) as the title on `blue`: 7.40:1. The boot notice already does this.
- `text` on `connectionFailed-background` — 3.93:1 (No-internet banner message ("Error" is 20 pt bold)). Proposed fix: Darken the fill to #E00F04 (4.95:1 with white), or set the message bold 19 pt or larger (3:1 is then enough).
- `text` on `rateUs-yesButton` — 3.07:1 (Rate-us Yes button). Proposed fix: Darken the Yes fill to #3A6AD6 (4.99:1 with white).
- `text` on `ratingCTABottom` — 3.37:1 (Connection-rating CTA title (gradient bottom, the lighter end is worse)). Proposed fix: Use `bootNoticeButtonTitle` (#0B1020) as the CTA title: 8.57:1 at the top, 5.61:1 at the bottom.
- `text` on `ratingCTATop` — 2.21:1 (Connection-rating CTA title (gradient top)). Proposed fix: Same fix as the row above.
- `black` on `buttonDisabled` — 2.38:1 (NSButton kind disabled title: the Network-blocked "Retry in m:ss" countdown). Proposed fix: Use `text` as the title on `buttonDisabled`: 8.83:1. (Correction from run 2: the Support Send button is `blue` with a black title, 8.21:1, and passes.)
- `dark` on `background` — 3.03:1 (" and " between legal links (onboarding, paywalls, agreement 11 pt)). Proposed fix: Use #808080 (4.98:1) or `cGray` (9.81:1) for " and ".
- `darkLight` on `background` — 3.86:1 (Paywall CTA sublines, deal legal text (10 pt w300), About Subscription, Restore purchase). Proposed fix: Raise to #808080 (4.98:1).
- `rating-tapHint` on `ratingSheetStops-0` — 2.96:1 (Rating sheet tap hint (on the top of the sheet gradient)). Proposed fix: Use `rating-reasonsTitle` (#8B93A7) for the hint: 5.43:1 on the lightest stop.
- `rating-tapHint` on `ratingSheetStops-1` — 3.36:1 (Rating sheet tap hint (on the middle of the gradient)). Proposed fix: Same fix as the row above.
- `switch-trackOff` on `bar` — 1.25:1 (Switch track off, in a settings row). Proposed fix: Raise the off-track opacity, or give the track a 1 pt border of 3:1 or more.
- `rating-starEmpty` on `ratingSheetStops-1` — 1.63:1 (Rating star, empty). Proposed fix: Lighten the empty star to #5A6688 (3.33:1).
- `red` on `bar` — 4.20:1 (Support form "*Required" / "*Enter valid email", 10 pt, inside the field bars). Proposed fix: #FF4D4D gives 5.13:1.
- `cBlue` at opacity 0.45 on `background` — 2.39:1 (Protocol card "Coming soon" badge). Proposed fix: draw the badge outside the card's 0.45 opacity, at full `cBlue` (7.59:1).
- `gray` on `background` — 1.19:1 (TickMark empty circle: the unticked agreement box). Proposed fix: a 1 pt ring of 3:1 or more around the empty circle, for example #6A7080 (3.97:1).
- `background` on `bar` — 1.20:1 (server list tick, empty circle). Proposed fix: the same ring as the row above (#6A7080 gives 3.39:1 on `bar`).
- `agreement-errorDot` on `background` — 2.97:1 (agreement error dot). Proposed fix: #58677C (3.42:1).

Advisory (below 3:1, but not the only carrier of the meaning): the deal countdown track (2.37:1; the fill passes at 7.69:1) and the decorative splash progress bar (2.83:1; a fill of #A8DBF9 gives 3.60:1).
