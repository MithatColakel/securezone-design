# MacAppIcon

**Proposal — VPN-1226. Not in the app yet.** The Mac app icon, made from the iPhone icon `assets/Logos/iTunesArtwork@2x.png` (1024 px). The mark is not redrawn: the artwork is scaled to 824 px and clipped to the macOS icon shape. After the board approves, SecurezoneiOS adds these files to the Mac target. Until then this group is not listed on the Design System page; the screen canvas shows it in the "Proposal — VPN-1226" block on the Mac page.

- Canvas 1024 × 1024 px. Shape: 824 × 824 px continuous-corner square (superellipse, exponent 5), 100 px from each edge. Transparent outside the shape.
- Drop shadow: black 30 %, y 10 px, blur 10 px.
- Background: vertical gradient #6E92EF (top) → #2641A8 (bottom), measured from the artwork.
- The iPhone and iPad icon does not change.

| File | Use |
|---|---|
| MacAppIcon-1024.png | Master, 1024 px. The same file as icon_512x512@2x.png. |
| icon_16x16.png, icon_16x16@2x.png | Mac asset catalog AppIcon, 16 pt (Finder list, menus). |
| icon_32x32.png, icon_32x32@2x.png | Mac asset catalog AppIcon, 32 pt (Finder list, Spotlight). |
| icon_128x128.png, icon_128x128@2x.png | Mac asset catalog AppIcon, 128 pt (Dock, Finder icon view, alerts). icon_128x128.png is also the new `PermissionPromptAppIcon.png` of the help page's prompt drawing, drawn at 60 pt (shape 48 pt). |
| icon_256x256.png, icon_256x256@2x.png | Mac asset catalog AppIcon, 256 pt (Finder icon view, large). |
| icon_512x512.png, icon_512x512@2x.png | Mac asset catalog AppIcon, 512 pt (Finder preview, App Store). |
| Contents.json | The `AppIcon.appiconset` index for these 10 files (idiom mac). |
| MacAppIcon-Layer1-Background-1024.png | Icon Composer layer 1 (background), full bleed. For the Dark, Clear and Tinted looks of macOS 26 and 27. |
| MacAppIcon-Layer2-Shield-1024.png | Icon Composer layer 2: the white shield with its blue glow, on transparent. |
| MacAppIcon-Layer3-Check-1024.png | Icon Composer layer 3: the check mark, on transparent. |
| MacAppIcon-Look-Default-512.png … -Look-TintedDark-512.png | Pictures of the 6 looks for the canvas (Default, Dark, Clear light, Clear dark, Tinted light, Tinted dark). Dark, Clear and Tinted are approximate: macOS makes them from the layers. Not for the app. |

The layers are cut from the artwork pixels, because the repository has no vector mark. Layered over each other they give the artwork again (mean error 0.2 of 255).
