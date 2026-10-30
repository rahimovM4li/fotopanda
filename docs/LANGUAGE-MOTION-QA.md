# German / Russian and motion upgrade

Verified locally on 29 October 2026 against the Vite production preview.

## Delivered

- German remains the first-visit default, including when the browser language is Russian.
- DE / RU switch in the header and mobile dialog, with native buttons, pressed state, native-language labels and visible keyboard focus.
- Choice persists under `foto-panda.language.v1`. Explicit `?lang=de` and `?lang=ru` links override the saved choice. Internal navigation retains Russian in the URL. Blocked storage does not prevent switching.
- 518 Russian catalogue entries covering approved page content, forms, validation and outcomes, email drafts, menu and video controls, image alternatives, legal notices and SEO text. Business names, contact details, media and integration IDs remain intact.
- React context updates content in place: switching does not reset form values, gallery filters or open disclosures. German strings remain the source copy. New translations belong in `src/i18n/ru.json`; `npm run check:i18n` checks literal UI/data coverage and interpolation variables.
- Local Manrope Cyrillic for Russian headings and body; existing Bricolage German display typography retained. No external fonts or translation requests.
- Locale-aware titles, descriptions, Open Graph, Twitter, structured-data text, canonical URLs and alternate-language links. Sitemap lists both languages for the eight indexable routes. The incomplete legal routes retain `noindex`.
- Photo → movement → memory scroll sequence using existing copy and customer media. Desktop gets a held photographic print that grows into a film surface as its frame recedes. Mobile and reduced motion get a complete, static narrative. No automatic playback, audio or scroll hijacking.
- Refined photographic hero, one-time image entrance, responsive header, language-switch transition, page arrivals and link feedback. No new runtime dependency.
- Gallery focus returns to the original opening thumbnail after browsing and closing.
- Correct hero image preload. Cacheable React and motion bundles are split; no production chunk-size warning.

## Verification

Commands passed:

- `npm run lint`
- `npm run build` (includes TypeScript checking)
- `npm run check` — 177 photo variants, 3 films, valid media references, 4 process steps, 7 FAQs and 10 form topics
- `npm run check:i18n` — 518 entries, static coverage and interpolation consistency
- `git diff --check`

Chromium production-preview checks:

- 40 cases: all 10 routes × German/Russian × 1440px/390px. No horizontal document overflow, broken loaded images, untranslated German UI nodes/labels, or JavaScript errors. Locale-specific titles and canonical URLs checked.
- 12 axe-core scans: home, contact, portfolio and gastronomy at 320px, 768px and 1440px in Russian. Zero WCAG A/AA violations after entrance animations settle. This is automated coverage, not a certification or a substitute for manual assistive-technology testing.
- 19 interaction checks: required/invalid contact validation, first-error focus, form state and existing-error translation, Russian email draft, truthful unsent confirmation, navigation/reload persistence, portfolio filtering, arrow-key browsing, Escape, original-thumbnail focus restoration, keyboard FAQ, mobile menu translation and Escape, reduced-motion layout, explicit muted video play and pause.
- 5 edge checks: German first-visit default with Russian browser locale; no MP4 download before playback; saved Russian on direct entry without a query; blocked localStorage; live reduced-motion preference changes.
- Screenshots reviewed at desktop, tablet and phone sizes, including Cyrillic headings, contact and photography pages, and the print sequence. Tablet hero columns were adjusted after review.
- Impeccable's mechanical detector reported no findings on the new switch, story and stylesheet. Taste's browser inspection found no broken imagery, console errors, or horizontal overflow. Its style-only objections to the retained identity (orange/ivory, existing labels, dividers, and approved multi-line headings) were reviewed rather than applied mechanically.

Local browser reports and screenshots are in `output/playwright/` (ignored generated artifacts). Final examples: `home-ru-1440.png`, `home-ru-390.png`, `home-ru-tablet-final.png`, `story-ru-desktop-final.png`.

## Existing operational limits

- `siteConfig.inquiryEndpoint` is still null. The contact form validates and prepares an email; the visitor sends it in their email client. No message was sent during testing.
- Legal business/address/hosting details are still missing in the original configuration. Their visible notices and noindex remain in both languages; nothing was invented.
- As with the existing client-rendered site, localized SEO metadata is applied by JavaScript. Crawlers or social-preview services that do not execute JavaScript receive the German HTML shell. Server rendering or host-specific locale prerendering would be needed for language-specific previews in those clients.
- Layout tests emulate mobile viewports in Chromium. Physical iPhone/Android hardware and Safari/Firefox were not tested.

## Skill sources

Installed for Codex at user scope and reviewed before applying:

- [Impeccable](https://github.com/pbakaus/impeccable)
- [Taste](https://github.com/leonxlnx/taste-skill)
- [Apple Design and Emil Design Engineering](https://github.com/emilkowalski/skills)

The existing frontend-design, UI/UX Pro Max, React performance and Playwright skills also informed implementation and verification. Existing PRODUCT.md uses an older Impeccable context schema; it was not rewritten as a side effect. An optional Impeccable `init` refresh can migrate that context separately.


## Authored scroll tours — subsequent October iteration

The user approved all six proposed motion directions. Implemented without new runtime packages:

- Home: framed print expands, its mat and caption recede, and the same wedding film remains available on explicit play. A compositor-driven image handoff carries the original hero photograph into the next section, crossfading into the matching film poster. The real elements are restored at the held scene boundary and when reduced motion is enabled.
- Gastronomy: four native-scroll chapters (kitchen, dish, print, phone). The dish is a crop of the approved menu, which pulls back into the full original menu. The final smartphone contains the existing kitchen film, with functional playback controls. No fictitious restaurant interface, prices or media were added.
- Living media: perspective book, front/back cover, turning page, then the playable photograph lifts above the spread. Original photographic assets are retained.
- Portfolio: six original selected works form a horizontal desktop exhibition on both home and portfolio routes. The complete filtered portfolio stays available. Phone/tablet and reduced-motion editions use a native horizontal scroller with snap points, arrow controls and keyboard access.
- Controls: spring-driven shared filter indicator, bounded magnetic primary links, press feedback, and thumbnail-origin lightbox arrival. Focus restores to the original thumbnail after browsing.
- Hidden film stages are inert, and playback pauses when rewinding out of their chapter. Only one film can play at a time through the existing media context.
- Tour holds use native scrolling, last 2.6 viewport heights beyond the stage, and provide direct chapter navigation and a skip link. Desktop animation requires at least 1000px width and 650px height. Smaller/shorter layouts and reduced motion show all chapters in normal flow. Live media-query changes release the hold. The mobile contact bar yields while a desktop-format scene is pinned.

### Latest verification

- Build, TypeScript, lint (zero warnings), catalogue coverage (518 entries), asset/content checks and whitespace checks passed.
- Repeated all 40 language/layout route cases: no document overflow, broken loaded images, untranslated German UI strings, or browser exceptions.
- 102 tour assertions passed: both languages, five held positions per scene, changing chapters/transforms, direct chapter navigation, explicit film playback, rewind/pause, gallery travel, lightbox keyboard/focus, image handoff, static editions at 320/390/768/1440px, and live reduced-motion changes.
- 16 new scene-focused axe-core scans at 320×844, 768×900, 1024×650 and 1440×900: zero WCAG A/AA violations; no detected clipping of tested scene text/actions and no document overflow.
- Repeated 19 existing form/navigation/menu/FAQ/lightbox/media regression checks, all passed. No email was sent.
- 10 final polish checks passed: laptop stages unobstructed, native mobile gallery scroll, keyboard access to the last image, complete phone framing, full-width mobile CTA, no MP4 fetch before explicit play, one filter indicator and bounded magnetic feedback.
- Taste scene capture ran on home, gastronomy and living-media production pages, with desktop/phone/reduced-motion contact sheets reviewed. All scenes initialized correctly. Headless sampling reported 16.7ms median frame intervals and zero intervals over 34ms in these runs; this is local evidence, not a device-independent performance guarantee.
- Taste's broader style inspector still flags retained existing eyebrows, process numbering, hairlines, small supporting labels and a three-line approved Russian heading. Its phone-shadow finding is intentional elevation of the floating phone; its tablet covered-text finding occurs where the persistent header/CTA crosses normal scrolling text, rather than overlapping tour artwork. The inspector is not reported as a clean pass. No content was deleted to satisfy stylistic heuristics.

Latest artifacts: `output/playwright/fp-tour-verify.json`, `fp-tour-axe.json`, `fp-browser-audit.json`, `final-polish.json`, `interaction-regression.json`, `final-*-laptop.png`, and the `scenes-home`, `scenes-gastro`, `scenes-book` contact sheets. Artifacts are ignored local files. Physical-device and Safari/Firefox checks remain outside the performed verification.


## Liquid controls — October 29 follow-up

The user's explicit liquid-style request adds a silver glass language lens with interruptible spring travel and a one-shot reflection, matching glass burger/close controls, and an inset dark glass mobile menu. The panel opens from its upper-right origin with a bounded shape reveal; navigation links arrive in a short stagger. The active route uses a quiet filled surface and warm accent. Language selection sits on its own row to preserve room for the logo and close control at 320px.

No dependency was added. Existing Radix modal semantics, focus trapping, Escape, focus restoration, background scroll locking and route-close behavior remain. Reduced motion removes panel travel, stagger, icon morph and language-lens travel; reduced transparency/high contrast use opaque materials. No animation loops run while idle.

Production verification: build/TypeScript, lint, translation coverage and whitespace checks passed. Eight header/menu axe-core checks (DE/RU × 320, 390, 768, 1440px) found no WCAG A/AA violations, horizontal overflow or browser errors. Thirteen interaction checks passed: menu translation, lens position, rapid switch reversal, focus containment, route navigation and active state, Escape/focus restoration, reduced-motion panel/stagger/lens, short-phone contact access, reload persistence and desktop-resize dismissal. Screenshots reviewed include 320px/390px Russian menus, 768px German menu, desktop header and 320×568 short-phone scrolled menu. Generated evidence is in `output/playwright/liquid-*.png` and `liquid-accessibility.json` / `liquid-interactions.json`. Browser coverage remains Chromium, not physical-device or Safari testing.
