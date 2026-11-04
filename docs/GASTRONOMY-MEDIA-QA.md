# Gastronomy media update — 2026-11-04

## Assets and mapping

All eight supplied originals in `public/new assets/` remain unchanged.
Optimized derivatives are in `public/assets/`; originals are excluded from the production build.

- IMG_3603.MP4 → gastro-grill (11 s, portrait H.264/AAC).
- IMG_3604.MP4 → gastro-finish (18 s, portrait H.264/AAC).
- IMG_3605.MOV → gastro-table (25 s, portrait H.264/AAC).
- photo_2026-11-04 20.37.18.jpeg → shashlik poster for gastro-table, including hero.
- 20.37.23 → dessert menu; 20.37.25 → Hae-won menu; 20.37.27 → Gänsefeder special menu; 20.37.29 → Table Eight menu.

Recreate derivatives with `node scripts/prepare-gastronomy-assets.mjs` (optional FFMPEG_PATH override).
The menus are presented as design examples; supplied artwork, names and printed prices are unchanged.
The original kitchen film remains available below the new three-film collection.

## Interaction

The menu tour opens a physical cover and turns two double-sided leaves to show all four supplied pages.
Native scrolling and chapter buttons drive progress. Full-size JPEG links remain available after the tour.
Reduced motion and short landscape viewports show all four pages as a static grid.
All films use the existing accessible player: click to play, pause controls, single active playback,
viewport exit pause, mobile fullscreen dialog and Escape/focus return. No autoplay or new dependencies.

## Verified

- Production build, ESLint, content/media check and i18n check pass (624 translation entries).
- 201 photo variants and six registered films resolve to generated files.
- Browser checks at 320×568, 390×844, 768×1024 and 1440×900 in DE and RU: no horizontal overflow; tour CTA fits.
- Visually inspected closed, open, mid-turn, second spread and final spread at 390 and 1440 px.
- All three new videos played and paused successfully; only one video active at a time.
- No video requests before a play click.
- Mobile hero opened the fullscreen player; playback and Escape dismissal passed.
- Reduced-motion variant showed all four loaded images without sticky scroll animation.
- No browser runtime errors during the interaction test.

Screenshots: `output/playwright/gastro-*` (local ignored verification artifacts).
The live website is not deployed by this change; publish the new code and all generated assets together.
