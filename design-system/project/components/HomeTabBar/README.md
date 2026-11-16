# HomeTabBar

The bottom tab bar of the app: Home, Profile and Settings, icons only.

Source: `SZFeatureHome/UI/HomeTabBarController.swift` (a UIKit `UITabBarController`, configured as the NativeScript material bottom navigation left it).

## When to use

It is the app's root navigation. There is one tab bar.

## Geometry and colours

- The bar is drawn by UIKit, so its look is the system's and changes with the OS.
- Below iOS 26 (classic bar): opaque `tabBar`; icons 24 pt wide, at most 23 pt tall, 6 pt lower than the system default; selected tint `tabSelected`, unselected tint `tabUnselected`. No titles (a blank title, 10 pt system font).
- iOS 26 and later: UIKit draws its own floating bar. The three items sit near the centre, every icon is in the system label colour (242, 242, 245), and a near-black pill marks the selected item. The app's tints do not apply there.
- Icons: `homeicon.png`, `profileicon.png`, `settingsicon.png`, template-rendered (tinted).

## Arabic

UIKit mirrors the item order with the app language: Settings, Profile, Home from left to right.

## Contrast

- `tabSelected` on `tabBar`: 19.67:1. Pass.
- `tabUnselected` on `tabBar` (icon): 4.87:1. Pass (3:1).

The preview shows the classic bar only. For iOS 26+, use a device screenshot.

## The consumer provides

The three tab controllers and the tap handler (`HomeModel.tabTapped`).
