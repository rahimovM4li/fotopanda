## Why

Foto Panda hat aktuell keine Website. Es existiert ein 5-seitiger PDF-Entwurf
(`FOTO_PANDA_Portfolio_5_Seiten_FINAL.pdf`) sowie echtes Kundenmaterial (12 Fotos, 6 Videos),
aber nichts davon ist online erlebbar. Das Alleinstellungsmerkmal des Unternehmens — aus einem
Foto wird ein Video, aus einem Moment ein Erlebnis — lässt sich in Text nicht erklären,
sondern nur zeigen. Genau das kann eine Website leisten und ein PDF nicht.

Deshalb entsteht eine One-Page-Landingpage unter `fotopandastudio.de`, deren zentraler Moment
eine Interaktion ist: Der Besucher sieht ein Foto, tippt darauf, und das Foto wird zum Video.

## What Changes

**Neues Projekt.** Das Repository enthält bisher nur die OpenSpec-Struktur — es gibt keinen
bestehenden Code, kein Framework, keine Assets im Projekt. Alles wird neu aufgebaut.

- Neues Frontend-Projekt: React + TypeScript + Vite + Tailwind CSS + Motion + Lucide Icons
- One-Page-Landingpage (Deutsch) mit den Sektionen Hero, Lebendige Produkte, Leistungen,
  Gastronomie, Business, So funktioniert's, Portfolio, Warum Foto Panda, Über uns,
  Final CTA, Kontakt
- Zwei zusätzliche Routen: `/impressum` und `/datenschutz` (Struktur, ohne erfundene Inhalte)
- Kernkomponente `LivingMedia`: Poster-Foto → Klick → weicher Übergang zum Video →
  Einblendung des CTA „Jetzt anfragen". Kein Autoplay beim Seitenaufruf.
- Asset-Pipeline: Kundenmaterial wird ins Projekt übernommen, aufbereitet (Web-Formate,
  Poster-Frames, Rotationsfix) und datengetrieben Sektionen zugeordnet
- Anfrageformular mit Frontend-Validierung; ohne Backend wird kein Sendeerfolg vorgetäuscht
- Zentrale `siteConfig` für alle Geschäftsdaten
- SEO-Basis (Meta, OpenGraph, canonical, robots.txt, sitemap.xml, Favicon) und
  Accessibility-Grundlagen (Semantik, Fokus, Tastatur, Kontrast, Reduced Motion)

**Bewusste Abweichungen vom PDF-Entwurf** (vom Auftraggeber bestätigt):

- **BREAKING gegenüber PDF:** Der QR-Code-Mechanismus entfällt vollständig. Die PDF baut
  ihren gesamten „So funktioniert's"-Ablauf auf QR-Code + Royal Media App auf. Beides wird
  nicht übernommen. Schritt 4 heißt „Erleben", nicht „Scannen".
- **BREAKING gegenüber PDF:** Kein Royal-Media-Branding, keine App-Store-Buttons, keine
  QR-Code-Grafiken — es gibt keine reale App und keine bestätigte Partnerschaft.
- **BREAKING gegenüber PDF:** Umsatzversprechen („Mehr Umsatz", „Euren Umsatz verdoppeln")
  entfallen. Ersetzt durch belegbare Nutzenaussagen.
- **BREAKING gegenüber PDF:** Keine permanente linke Sidebar. Stattdessen eine klassische
  Sticky-Topnavigation mit mobilem Drawer.
- Domain und E-Mail werden auf `fotopandastudio.de` bzw. `info@fotopandastudio.de` umgestellt
  (PDF nennt noch `fotopanda.de`).
- Copyright-Jahr wird dynamisch statt fest „2024".

## Capabilities

### New Capabilities

- `site-shell`: Seitengerüst — Sticky-Header mit Desktop-Navigation und mobilem Drawer,
  Footer, Routing inkl. `/impressum` und `/datenschutz`, zentrale `siteConfig` als einzige
  Quelle für Geschäftsdaten, SEO-Metadaten und Reduced-Motion-Grundregel.
- `living-media`: Das Kernfeature. Zustandsmodell und Verhalten der Foto-zu-Video-Interaktion
  inklusive Ladeverhalten, Fehlerfall, CTA-Einblendung, Pause und Rückkehr zum Poster.
- `landing-sections`: Inhalt und Verhalten der Landingpage-Sektionen — Hero, Lebendige
  Produkte, Leistungen, Gastronomie, Business, So funktioniert's (4 Schritte ohne QR),
  Warum Foto Panda, Über uns, Final CTA — sowie das durchgängige CTA-System.
- `portfolio-showcase`: Portfolio-Grid mit Foto- und Video-Arbeiten, Kennzeichnung von
  Videobeiträgen, Lightbox mit Tastatur- und Touch-Bedienung, Fokusmanagement und
  Scroll-Sperre.
- `contact-inquiry`: Anfrageformular — Felder, Anfragearten, Validierung, Datenschutz-
  Zustimmung, ehrliches Verhalten ohne Backend, vorbereitete Schnittstelle für später.
- `media-assets`: Asset-Struktur im Projekt, Aufbereitungsregeln (Web-Formate, Poster-Frames,
  Rotationskorrektur), datengetriebene Foto-Video-Paare und die Regel, dass ausschließlich
  echtes Kundenmaterial verwendet wird.

### Modified Capabilities

Keine. Das Projekt hat bisher keine Specs.

## Impact

**Neu entstehend:**

- Komplettes Frontend-Projekt im Repository-Root (`package.json`, `vite.config.ts`,
  `tsconfig.json`, `tailwind.config.ts`, `index.html`, `src/`, `public/`)
- `src/config/siteConfig.ts` mit den bestätigten Geschäftsdaten
- `src/data/` für Navigation, Leistungen, Produkte, Portfolio, Schritte, Vorteile
- `public/assets/` mit dem aufbereiteten Kundenmaterial
- `scripts/` für die einmalige Asset-Aufbereitung

**Externe Quellen (außerhalb des Repos, werden importiert):**

- `C:\Users\rahimm\Downloads\FOTO_PANDA_Portfolio_5_Seiten_FINAL.pdf` (Designreferenz)
- 12 Fotos `WhatsApp Image 2026-08-18 at 14.33.5*.jpeg` (Business, Hochzeit, Sport-Lifestyle)
- 6 Videos `WhatsApp Video 2026-08-18 at 14.3*.mp4` (Hochzeit, 2× Food, Immobilien,
  Business-Shooting, Fotoalbum-Demo)

**Bekannte Einschränkungen, die in die Umsetzung einfließen:**

- Alle Videos sind WhatsApp-komprimiert (max. 576px Breite). Originale werden nachgereicht;
  die Asset-Pipeline muss den Austausch ohne Codeänderung erlauben.
- Das Immobilien-Video enthält um 90 Grad gedrehten Inhalt mit eingebranntem
  „PLEASE ROTATE"-Hinweis und muss korrigiert werden.
- Es existieren keine Fotos zu Gastronomie, Immobilien und Printprodukten — nur Videos.
  Poster für diese Bereiche werden aus den Videos selbst gewonnen, nicht aus Stockmaterial.
- Für Impressum und Datenschutz fehlen die rechtlichen Daten (vollständiger Firmenname,
  Anschrift, Vertretungsberechtigter, USt-IdNr.). Die Seiten werden strukturell angelegt
  und mit sichtbaren TODOs markiert, aber nicht mit erfundenen Inhalten gefüllt.
- Es existiert kein Formular-Backend. Das Formular validiert, meldet aber keinen Versand.
