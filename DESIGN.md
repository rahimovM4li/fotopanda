# Design

## Visual Theme

**Dunkler   Saal, helle Lesestrecken.** Die Seite hat zwei Tonlagen und wechselt
zwischen ihnen im Takt: Ink für Bühnen, auf denen Fotografie und Bewegtbild wirken
sollen, Ivory für Abschnitte, in denen gelesen wird. Ein durchgehend heller
Hintergrund lässt eine bildlastige Seite flach werden; ein durchgehend dunkler
ermüdet über zehn Abschnitte. Der Wechsel ist das Gliederungsmittel.

Tiefe entsteht räumlich, nicht durch Schatten: Medien stehen leicht aus der Achse,
kleinere Karten liegen auf eigenen Z-Ebenen davor und dahinter, und auf Geräten mit
Maus neigt sich der ganze Stapel dem Zeiger entgegen. Hinter den Bühnen liegt jeweils
ein warmes Streulicht in Markenfarbe.

Die Marke bringt genau eine Farbe mit. Sie erscheint am Primär-Button, an einem Wort
je Überschrift, im Wiedergabesymbol, an der Wischkante der Scroll-Erzählung und
einmal großflächig im Abschluss der Gastronomieseite. Alle übrige Farbe kommt aus den
Fotos.

**Aesthetic lane:** Kinosaal und Werkstatt. Kein Redaktionslayout, keine
Display-Kursive als Dekoration, keine Mono-Labels.

## Color Palette

Alle Werte in OKLCH, sRGB-Hex als Referenz. Grundlage sind die vom Auftraggeber
vorgegebenen Markenfarben. Sämtliche Kontrastwerte sind gerechnet.

### Marke

| Token | OKLCH | Hex | Einsatz |
|---|---|---|---|
| `--color-brand` | `oklch(0.668 0.224 37)` | `#FF4D00` | Flächen, Akzentwörter, Symbole auf Ink |
| `--color-brand-soft` | `oklch(0.726 0.178 43)` | `#FF7A3D` | Fokusring auf Ink, Symbole auf Overlays (7,59:1) |
| `--color-brand-hover` | `oklch(0.630 0.225 38)` | `#F13E00` | Hover des Primär-Buttons, Ink darauf 5,08:1 |
| `--color-brand-deep` | `oklch(0.540 0.205 38)` | `#C92800` | Kleine Schrift und Symbole auf Ivory (5,09:1) |

### Ink (dunkle Tonlage)

| Token | Hex | Einsatz |
|---|---|---|
| `--color-ink` | `#0B0B0D` | Seitengrund |
| `--color-ink-2` | `#13100F` | abgesetzte Bänder, Formularflächen |
| `--color-ink-3` | `#1F1B19` | Bildplatzhalter |
| `--color-ink-line` | `#2F2A28` | Trennlinien |
| `--color-ink-line-2` | `#453E3B` | Ränder von Schaltflächen |

| Text auf Ink | Hex | Kontrast |
|---|---|---|
| `--color-on-ink` | `#F8F4F1` | 18,01:1 |
| `--color-on-ink-soft` | `#CCC6C2` | 11,63:1 |
| `--color-on-ink-muted` | `#A8A29C` | 7,77:1 |
| `--color-on-ink-faint` | `#88827D` | 5,17:1 (auf `ink-3` noch 4,51:1) |

### Ivory (helle Tonlage)

| Token | Hex | Einsatz |
|---|---|---|
| `--color-ivory` | `#F7F4EF` | Seitengrund |
| `--color-ivory-2` | `#EFECE9` | abgesetzte Flächen |
| `--color-ivory-3` | `#E5E0DC` | Bildplatzhalter |
| `--color-ivory-line` | `#D8D3CE` | Trennlinien |
| `--color-ivory-line-2` | `#BFB9B3` | Ränder von Schaltflächen |

| Text auf Ivory | Hex | Kontrast |
|---|---|---|
| `--color-on-ivory` | `#0B0B0D` | 17,92:1 |
| `--color-on-ivory-soft` | `#3E3B38` | 10,11:1 |
| `--color-on-ivory-muted` | `#5C5955` | 6,36:1 |
| `--color-on-ivory-faint` | `#676460` | 5,36:1 (auf `ivory-3` noch 4,50:1) |

### Wie die Tonlage umschaltet

`<Section tone="ink|ivory">` setzt `data-tone` auf die Sektion. Ein Regelsatz in
`index.css` schreibt darunter dieselben Variablennamen um (`--color-tone-text`,
`--color-tone-line`, …), die alle Komponenten benutzen. Dadurch stimmt
`text-tone-text-muted` in beiden Tonlagen, ohne dass eine Komponente wissen muss,
worauf sie steht.

Wichtig ist, dass die Umschaltung auf denselben Namen passiert. Eine Indirektion
(`--color-tone-text: var(--tone-text)`) funktioniert nicht: Ein `var()` innerhalb
einer Custom Property wird schon dort aufgelöst, wo die Property steht, nicht dort,
wo sie benutzt wird.

### Kontrastregeln für Orange

- **`#FF4D00` auf Ink: 5,91:1.** Trägt dort auch kleine Schrift und Symbole.
- **`#FF4D00` auf Ivory: 3,03:1.** Reicht nur für große Wörter ab 24 px. Kleine
  Schrift und Symbole nutzen auf Ivory `--color-brand-deep` (5,09:1).
- **Ink auf `#FF4D00`: 5,91:1.** Der Primär-Button trägt deshalb dunkle Schrift.
- **Weiß auf `#FF4D00`: 3,33:1.** Fällt durch und wird nirgends verwendet.
- Auf der orangen Fläche der Gastronomieseite ist Fließtext `ink/85` (4,7:1);
  `ink/80` läge darunter.

## Typography

Zwei Familien, beide variabel und lokal gebündelt. Kein Request an einen
Drittanbieter, damit die Seite ohne Einwilligungsbanner auskommt.

- **Bricolage Grotesque** trägt alle Überschriften, Navigation, Buttons, Zahlen und
  Beschriftungen. Ein Grotesk mit gewollten Unregelmäßigkeiten: warm und leicht
  handgemacht, ohne die Härte zu verlieren, die große Überschriften brauchen.
- **Manrope** trägt Fließtext und Formulare. Ruhiger und offener als Bricolage,
  dadurch bleiben längere Absätze leicht lesbar, ohne dass die Seite die Stimme
  wechselt.

Eine Serifen-Kursive für Akzentwörter gab es in einer früheren Fassung; sie ist
entfallen. Hervorhebung passiert jetzt über Größe, Farbe, Zeilenumbruch und Motion.

### Skala

| Stufe | clamp() | Einsatz |
|---|---|---|
| `--text-mega` | `clamp(3rem, 1.1rem + 7.4vw, 7rem)` | Abschluss im Fuß |
| `--text-display` | `clamp(2.375rem, 1.35rem + 3.4vw, 4.25rem)` | Seitenköpfe |
| `--text-h2` | `clamp(2.125rem, 1.35rem + 3.2vw, 3.75rem)` | Abschnitte |
| `--text-h3` | `clamp(1.25rem, 1.05rem + 0.9vw, 1.75rem)` | Karten, Schritte |
| `--text-lead` | `clamp(1.0625rem, 1rem + 0.42vw, 1.3125rem)` | Lead-Absätze |

Display-Obergrenze 4,25rem. Ursprünglich standen dort 5rem; am realen Rendering
zerfiel damit „Der Moment wird" in der Textspalte des Hero. Laufweite der
Display-Stufe `-0.042em`, `text-wrap: balance` auf Überschriften, `pretty` auf
Fließtext.

Überschriften werden zeilenweise gesetzt (`MaskReveal` bekommt ein Array), damit der
Umbruch eine Entscheidung ist und kein Zufall der Spaltenbreite.

## Layout

- Inhaltsbreiten: `text` 70ch, `default` 82rem, `wide` 92rem.
- Vertikaler Rhythmus über `clamp()`, bewusst ungleich.
- Kein durchgehendes Kartenraster. Leistungen und Portfolio sind asymmetrisch
  komponiert; kein Feld hat dieselbe Größe wie sein Nachbar.
- **Kein `row-span` über zwei Zeilen.** Unter der Beschriftung eines solchen Feldes
  entsteht ein totes Rechteck, weil der Text die zweite Zeile nicht füllt. Der
  Versatz kommt stattdessen aus unterschiedlichen Bildformaten in derselben Zeile.
- Auf schmalen Viewports werden Übersichten zu Wischstrecken (`.snap-rail`), bei
  denen das nächste Feld angeschnitten stehen bleibt.
- Jede `Section` hat `overflow-hidden`. Die dekorativen Lichtflächen ragen absichtlich
  über die Kanten hinaus; ohne Klipp verbreitern sie das Dokument, und die Seite hinge
  daran, dass `body { overflow-x: hidden }` das kaschiert.
- Z-Index als benannte Skala: sticky 30, mobiler CTA 40, Drawer 50, Overlay 60,
  Modal 70.

## Components

- **LivingMedia** ist die Leitkomponente. Sie reagiert per Container-Query auf ihre
  eigene Breite, nicht auf den Viewport: dieselbe Einheit steht mal über die halbe
  Seite, mal als 160-Pixel-Kachel.
- **TiltStage / TiltLayer** bilden die räumlichen Stapel. Nur mit echtem Zeigegerät.
- **MaskReveal** zieht Überschriften zeilenweise hinter einer Maske auf.
- **Reveal** blendet beim Scrollen ein, **ohne** über Sichtbarkeit zu entscheiden.
- **Magnetic** lässt den Primär-Button der Maus ein Stück folgen.
- **Section** trägt die Tonlage, **Eyebrow** die Kennzeichnung des Seitenkopfs.

Keine verschachtelten Karten, keine seitlichen Akzentstreifen, kein Glasmorphismus
als Dekoration.

## Motion

Bibliothek `motion`, Kurven exponentiell ausklingend, kein Bounce.

- **Seitenkopf:** ein orchestrierter Auftritt, Überschrift zeilenweise, danach Lead,
  CTAs und Merkmale gestaffelt.
- **Foto zu Video (LivingMedia):** Poster zieht in die Unschärfe und leicht auf, das
  Video kommt gegenläufig heraus, eine Lichtkante läuft einmal quer durch, danach
  erscheint der CTA.
- **Scroll-Erzählung:** das Video wischt über das Poster, beide bleiben scharf. Eine
  Kreuzblende mit beidseitiger Unschärfe ergibt in der Mitte des Übergangs Matsch aus
  zwei Bildern; die Wischkante nicht.
- **Portfolio:** gestaffelter Auftritt innerhalb einer Liste.
- **Hover auf Desktop:** Bildzoom 1,05, Text schiebt sich leicht nach, Pfeilknopf
  füllt sich orange.
- **Seitenwechsel:** kurze Blende über Deckkraft, 280 ms.

**Grundregel für jede Einblendung:** Der Ausgangszustand ist sichtbar. Die Animation
kommt additiv dazu, sobald das Element in den Sichtbereich kommt. Ein `opacity: 0` als
Startwert liefert bei jedem Renderer ohne Viewport eine leere Sektion aus. Genau das
ist in einer früheren Fassung mit dem Abschnitt „So funktioniert's" passiert.

`prefers-reduced-motion: reduce` schaltet alles ab; kein Inhalt hängt daran.

## Imagery

Ausschließlich Material des Kunden. Fotos in AVIF und WebP in drei Breiten mit
JPEG-Fallback, Videos als MP4 mit vorangestellten Metadaten.

Poster stammen als Standbild aus dem jeweils eigenen Video, damit Poster und erstes
Videobild dieselbe Szene zeigen. Kein Video lädt beim Seitenaufruf Daten; auch die
Scroll-Erzählung stellt ihr Vorladen erst scharf, wenn der Fortschritt über null
steigt.

Dasselbe Video erscheint nicht zweimal auf derselben Seite. Das wirkt wie ein Fehler,
nicht wie ein Beleg.

## Redesign September 2026 – aktuelle Ergänzungen

Die Kundenanweisung vom September ersetzt frühere Vorgaben zu Tilt-Stapeln und langen Scroll-Bühnen. Die Startseite nutzt jetzt eine ruhige Foto-Komposition, eine kompakte Leistungsübersicht, kuratierte Arbeiten, App-Präsentation, vier Ablauf-Schritte und FAQ. Kein automatischer Videostart; Motion bleibt dezent und Inhalte bleiben während Einblendungen lesbar.

Das neue Kundenlogo wird direkt aus der gelieferten Datei aufbereitet. Die Bildauswahl und Ausschlüsse stehen in docs/MEDIA-AUDIT.md. Aktuelle Browser- und Build-Prüfungen sowie Betriebsgrenzen stehen in docs/QA.md.

## German / Russian and motion refinement — October 2026

The approved content, customer photographs, films, and orange/ink/ivory identity remain the basis. The focal idea is a photographic print becoming a moving memory: the added photo → movement → memory sequence uses existing copy and media. The desktop print settles through perspective as the visitor scrolls, with a smaller album appearing alongside it. Playback is always explicit. The phone layout is a static print followed by the complete three-step narrative; reduced motion removes the spatial effects and the long sticky sequence.

Type: retain Bricolage Grotesque for German display text and Manrope for body text. Russian display and body use the locally hosted Manrope Cyrillic subset with gentler tracking and more leading. No external font requests. The same content fits both scripts; headings wrap naturally rather than using fixed heights.

Controls: a compact DE / RU segmented switch stays visible in the header and is also available in the mobile menu. A 260ms interruptible CSS transition communicates its state. Page arrivals take 280ms; arrows and controls respond in 180–220ms. The hero image settles once over 800ms. Motion never delays input. Photo frames and restrained perspective supply depth without WebGL, smooth-scroll libraries, or additional runtime dependencies.

Skills installed and consulted: Impeccable (`pbakaus/impeccable`), Taste (`leonxlnx/taste-skill`), and `apple-design` / `emil-design-eng` from `emilkowalski/skills`. Taste's uneven photographic composition informed the print sequence. Its generic recommendations to delete labels, remove brand colors, or shorten approved copy were not adopted because this is an enhancement of the approved site. The original imagery, not generated or stock material, carries the design.


## Authored scroll direction — October 29, 2026

The user's explicit follow-up replaces the earlier restraint-only direction with authored scroll tours. Preserve the existing photographic identity, copy and media. Home has a continuous hero-image handoff and a print-to-film expansion; gastronomy pulls an actual dish crop back into the approved menu and onward into a playable phone; living media opens and turns a spatial photobook; the selected portfolio becomes a horizontal exhibition. Reusing approved films in these product demonstrations is deliberate, with no automatic playback and only one active film at a time.

Use the existing Motion runtime and native sticky positioning. Each main tour holds for 2.6 screens; the gallery holds for two. Direct chapter controls and skip links keep the scenes navigable. Layouts below 1000px wide or 650px high, and reduced-motion preferences, use the complete static composition and ordinary text flow; the gallery remains directly swipeable. Primary links have bounded magnetic feedback, filters have a shared spring indicator, and lightbox arrival keeps the opening thumbnail's spatial origin. No new runtime dependencies or remote media are introduced.

The photographic material is the focal move; the phone and book are geometric containers for real supplied images. Review scene frames and readable rest states rather than counting effects. Verification and remaining platform limits are recorded in docs/LANGUAGE-MOTION-QA.md.


## Liquid navigation materials — explicit user follow-up

The DE/RU switch and mobile navigation now share a liquid-glass material: dark translucent shell, silver moving lens, fine reflected edge and bounded depth. This explicit direction overrides generic anti-glass style heuristics for these controls. Language travel uses the existing Motion spring (430 stiffness, 30 damping); its reflection is finite. The inset menu enters over 420ms with an upper-right shape reveal, links stagger by 28ms, and the close icon morphs from burger strokes. Closing takes 180ms. Keep body/navigation text on the sufficiently opaque dark surface, never over unrestricted page imagery. Reduced motion and reduced transparency have deliberate fallbacks. Implementation lives in `src/liquid.css`, `LanguageSwitch.tsx` and `Header.tsx`.
