## Context

Siehe `proposal.md` — Why. Ergänzend die technischen Randbedingungen, die aus der
Materialanalyse stammen und den Entwurf tatsächlich formen:

**Das Repository ist leer.** Es gibt keinen Stack, keine Konventionen, keine Assets. Jede
Entscheidung ist eine Erstentscheidung.

**Das Bildmaterial ist ungleich verteilt.** 12 Fotos in 1320×~1630 (Seitenverhältnis ≈ 4:5),
verteilt auf Business-Porträts (4), Hochzeit (3) und Sport-Lifestyle (5). Sechs Videos,
alle WhatsApp-komprimiert:

| Video | Auflösung | Verhältnis | Länge | Inhalt |
|---|---|---|---|---|
| `14.30.53` | 576×1168 | 0,49 (hoch) | 28,9 s | Hochzeit: Braut, Feier, Wunderkerzen |
| `14.32.37` | 464×832 | 0,56 (hoch) | 16,9 s | Gastronomie: Teller, Steak, Dessert |
| `14.32.49` | 576×1024 | 0,56 (hoch) | 17,5 s | Gastronomie: Anrichten, Servieren |
| `14.33.11` | 576×1024 | 0,56 (hoch) | 65,7 s | Immobilie — **um 90° gedreht**, Hinweis eingebrannt |
| `14.33.56` | 576×976 | 0,59 (hoch) | 13,6 s | Business-Shooting im Studio |
| `14.34.12` | 624×352 | 1,77 (quer) | 36,9 s | Hand mit Smartphone über Fotoalbum, Video läuft |

**Fotos und Videos zeigen nicht dieselben Menschen.** Die Hochzeitsfotos und das
Hochzeitsvideo stammen von verschiedenen Paaren. Das ist die zentrale technische Zwangslage
dieses Entwurfs und bestimmt Decision 3.

**Es fehlen ganze Materialklassen.** Zu Gastronomie, Immobilien und Printprodukten gibt es
ausschließlich Videos, keine Fotos.

**Marke aus der PDF ausgemessen.** Orange `#FC4704`, Near-Black `#0E1015`. Das Logo besteht
aus Pandakopf, FOTO in Schwarz, PANDA in Orange und einer Serifen-Tagline
„FOTOS. VIDEOS. ERLEBNISSE." Es liegt nur eingebettet in der PDF vor, nicht als Vektordatei.

## Goals / Non-Goals

**Goals:**

- Die Foto-zu-Video-Interaktion trägt die Seite und funktioniert auf dem ersten Versuch,
  auf Mobilgeräten genauso wie auf Desktop.
- Das komprimierte Material wird so eingesetzt, dass seine Schwäche nicht ins Auge fällt,
  und lässt sich später ohne Codeänderung durch Originale ersetzen.
- Jede Geschäftsangabe hat genau eine Quelle; die Seite kann keine Daten erfinden, weil
  keine Komponente Daten kennt.
- Deutschlandtaugliche Umsetzung: keine Drittanbieter-Requests zur Laufzeit, damit kein
  Einwilligungsbanner nötig wird.

**Non-Goals:**

- Kein CMS, keine Datenbank, keine Authentifizierung.
- Kein serverseitiges Rendering. Der SEO-Gewinn rechtfertigt den Aufwand für eine
  Landingpage mit drei URLs nicht.
- Kein Formular-Backend in diesem Change. Nur die Schnittstelle wird vorbereitet.
- Keine Mehrsprachigkeit.
- Keine Bildbearbeitung, die Material erfindet — kein KI-Upscaling, das Details hinzudichtet.

## Decisions

### 1. Stack: React 19 + TypeScript + Vite + Tailwind + Motion

Vite liefert die schnellste Feedbackschleife und einen schlanken Produktionsbuild. Tailwind
hält das Styling nah am Markup, was bei einer bildlastigen Seite mit vielen einmaligen
Kompositionen schneller ist als ein durchgeplantes Komponenten-CSS.

`shadcn/ui` wird **nicht** als Ganzes eingebunden. Gebraucht werden genau zwei Primitive
(Dialog für die Lightbox, Select für die Anfrageart); dafür wird Radix UI direkt verwendet.
Das spart eine Generator-Abhängigkeit und ein Dutzend ungenutzter Komponenten.

*Alternative verworfen:* Next.js. Bringt SSR, Bildoptimierung und Routing mit — aber auch
einen Node-Server oder eine plattformgebundene Auslieferung. Drei statische URLs
rechtfertigen das nicht.

*Alternative verworfen:* Astro. Wäre für den statischen Anteil ideal, aber die
Foto-zu-Video-Einheit, die Lightbox und das Formular sind der eigentliche Wert der Seite —
der Interaktionsanteil überwiegt.

### 2. Schriften selbst hosten statt Google Fonts einbinden

Ein Einbinden von `fonts.googleapis.com` überträgt die IP-Adresse jedes Besuchers an einen
Drittanbieter. Für eine Website mit deutschem Impressum ist das ein vermeidbares Risiko, das
sonst ein Einwilligungsbanner nach sich zieht. Selbst gehostete Schriften halten die Seite
frei von Drittanbieter-Requests — deshalb entfällt der Cookie-Banner ersatzlos. Beide
Familien kommen über `@fontsource-variable` als lokale Dateien.

**Schriftwahl, revidiert.** Ursprünglich standen hier Manrope und Inter. Beim Umsetzen mit
dem Brand-Register fiel auf, dass Inter auf dessen Reflex-Reject-Liste steht: die
meistgenutzte Schrift generierter Interfaces, die eine Seite austauschbar macht. Nach
Rücksprache mit dem Auftraggeber:

- **Bricolage Grotesque** (variabel, Optical-Size-Achse) trägt Überschriften, Fließtext,
  Navigation und Buttons. Ein Grotesk mit gewollten Unregelmäßigkeiten, warm und leicht
  handgemacht — passend zu einem Studio, das aus einer Person besteht, nicht aus einer
  Marketingabteilung. Die Optical-Size-Achse macht eine zweite Sans überflüssig.
- **Faustina** kursiv hat genau eine Aufgabe: das Wort „lebendig" in seinen Beugungen sowie
  das Zitat im Über-uns-Abschnitt. Das greift die Serifen-Tagline des Logos auf und macht
  aus dem zentralen Markenwort ein sichtbares Zeichen.

Details in `DESIGN.md` im Projektwurzelverzeichnis.

### 3. Das Poster stammt aus dem Video, nicht aus der Fotostrecke

Dies ist die wichtigste Entscheidung des Entwurfs.

Die Aufgabe verlangt: Besucher sieht ein Foto, tippt, das Foto wird zum Video. Diese
Illusion trägt nur, wenn Poster und erstes Videobild **dieselbe Szene** zeigen. Da
Hochzeitsfotos und Hochzeitsvideo verschiedene Paare zeigen, würde ein Wechsel vom Foto zum
Video die Person austauschen — der Besucher liest das nicht als „das Foto wird lebendig",
sondern als „da lief ein Werbespot los".

Deshalb wird das Poster jeder Foto-zu-Video-Einheit als Standbild aus dem eigenen Video
gewonnen. Der Übergang ist dann bildidentisch und wirkt tatsächlich wie ein Foto, das zu
atmen beginnt.

Damit die Seite trotzdem echte fotografische Qualität zeigt, steht im Hero neben der
interaktiven Einheit ein zweites, überlappendes Bild aus der hochauflösenden Fotostrecke.
Die Fotos tragen außerdem Leistungen, Portfolio und Business-Abschnitt.

*Alternative verworfen:* Hochauflösendes Hochzeitsfoto als Poster, Hochzeitsvideo dahinter.
Sieht im Standbild besser aus, zerstört aber genau den Moment, um den es geht.

### 4. Feste Box, `object-cover`, pro Medium gepflegter Bildausschnitt

Die Videos sind extrem hochformatig (bis 0,49), die Fotos liegen bei 0,80. Eine Box, die
sich beim Wechsel an das Video anpasst, würde das Layout aufreißen; eine Box im
Videoverhältnis wäre auf Desktop eine übermannshohe Säule.

Jede Foto-zu-Video-Einheit bekommt daher ein **festes Seitenverhältnis aus den Daten**, in
das Poster und Video mit `object-fit: cover` und einem pro Medium hinterlegten
`objectPosition` gelegt werden. Die Box ändert ihre Maße beim Wechsel nie — das erfüllt die
Layout-Anforderung und macht den Übergang erst weich.

Konkret nach der Materialaufbereitung: Hero 4:3 auf schmalen, 16:9 auf breiten Viewports
(das Hochzeitsvideo liegt gedreht als 1168×576 vor, also 2,03:1; der 16:9-Kasten schneidet
seitlich rund 12 % weg, das Paar steht mittig), lebendiges Fotoalbum 16:9 (mit 624×352
nahezu native Auflösung und dadurch das schärfste Medium der Seite), Gastronomie und
Business 4:5, Immobilie nach der Drehung 16:9.

Ergänzung aus der Umsetzung: Auch das Hochzeitsvideo lag um 90 Grad gedreht vor, nicht nur
das Immobilienvideo. Erst die Drehung macht es mit 1168 Pixeln Breite zum höchstaufgelösten
Video des Materials und damit überhaupt zum Hero-Kandidaten.

### 5. Asset-Aufbereitung als einmaliges Skript, Ergebnisse eingecheckt

`scripts/prepare-assets.mjs` liest aus einem konfigurierbaren Quellordner, erzeugt
`public/assets/` und wird nicht Teil des Builds. Es leistet:

- Fotos in AVIF und WebP in mehreren Breiten (640/960/1320) plus JPEG-Fallback
- Videos als MP4/H.264 mit `-movflags +faststart`; die Quellbreite wird nicht hochskaliert
- Poster-Frames zu pro Video festgelegten Zeitmarken, anschließend AVIF/WebP
- Drehung und Beschnitt des Immobilienvideos (`transpose` plus Vorspann abschneiden)
- Zuschnitt des Logos aus der PDF-Seite bei 400 dpi als Übergangslösung

Werkzeuge: `sharp` für Bilder, `ffmpeg-static` für Video — beide als `devDependencies`.

*Alternative verworfen:* Aufbereitung im Build (`vite-imagetools`). Für Bilder elegant, für
Videos untauglich; ffmpeg im Build würde jede CI-Umgebung belasten. Ein einmaliges Skript
mit eingecheckten Ergebnissen macht den Build reproduzierbar und den Austausch der
Originale zu einem einzigen Kommando.

### 6. Routing: React Router mit statischem Meta-Fallback

`react-router-dom` für `/`, `/impressum`, `/datenschutz`. Die Startseite erhält ihre
Metadaten statisch in `index.html`, sodass sie ohne JavaScript-Ausführung korrekt sind. Die
beiden Rechtsseiten setzen Titel und Description über einen kleinen `useSeo`-Hook.

Das ist bewusst asymmetrisch: Nur die Startseite wird verlinkt und gesucht; für Impressum
und Datenschutz zählt Erreichbarkeit unter einer festen URL, nicht Ranking.

**Auslieferungsbedingung:** Der Host muss unbekannte Pfade auf `index.html` umschreiben.
Ohne diese Regel liefert ein direkter Aufruf von `/impressum` einen 404.

*Alternative verworfen:* Vite-Mehrseitenbuild mit echten HTML-Dateien pro Route. Ergäbe
perfekte statische Metadaten, verlagert die Abhängigkeit aber auf saubere URL-Behandlung
des Hosts und verdoppelt den Einstiegscode.

### 7. Nur eine Wiedergabe gleichzeitig, über einen gemeinsamen Kontext

Ein React-Kontext hält die ID der aktiven Einheit. Jede Einheit pausiert, sobald eine andere
aktiv wird. Das erfüllt die Spec-Anforderung und verhindert nebenbei, dass mehrere
Videostreams gleichzeitig Bandbreite ziehen.

Videos tragen `preload="none"`, `playsInline` und keine nativen Controls; die Steuerung ist
eigen gebaut, damit sie zur Gestaltung passt und auf Mobilgeräten kein Systemvollbild
erzwingt.

### 8. Zustandsmodell der Foto-zu-Video-Einheit

Ein expliziter Zustand statt verstreuter Boolean-Flags:

```
poster -> loading -> playing <-> paused -> ended
             |
             +-----> error -> poster
```

Der CTA erscheint über einen Timer ab 1,5 s Wiedergabe und bleibt bis `ended` bestehen. Der
Timer wird beim Pausieren angehalten und bei `error` verworfen.

### 9. Farbsystem: heller Grund, Orange als Signal

Der Grundton folgt der Vorlage: warmes Off-White als Basis, Near-Black für den Kontrast,
Markenorange als Akzent.

Zwischenzeitlich stand hier ein dunkler Grund, hergeleitet aus einer Szenenbeschreibung
(Entscheidung abends am Handy, Fotos als einzige Lichtquellen). Der Auftraggeber hat das
verworfen und die helle Fassung der Vorlage bestätigt. Die Umsetzung folgt dieser
Entscheidung.

Die helle Rampe trägt eine Spur Chroma Richtung Markenhue (40), nicht Richtung „warm" als
Selbstzweck. Das hält das Weiß mit dem Orange verwandt, ohne cremig zu wirken.

Orange ist reserviert für Primär-CTA, ein hervorgehobenes Wort je Überschrift, das
Wiedergabesymbol und genau eine großflächige Anwendung im Abschluss der Seite. Alle übrige
Farbe kommt aus den Fotos.

**Gemessene Kontraste, mit zwei Konsequenzen:**

- Weiß auf `#FC4704` erreicht nur 3,48:1 und fällt für Fließtextgrößen durch.
- `#0E1015` auf `#FC4704` erreicht 5,47:1 und besteht. **Der Primär-Button trägt deshalb
  dunkle Schrift auf Orange, nicht weiße.** Das ist die übliche Kombination genau
  andersherum, aber die einzige, die die Schwelle hält.
- `#FC4704` auf dem hellen Grund erreicht 3,36:1: genug für große Wörter ab 24 px und für
  Symbole, zu wenig für Fließtext.
- Auf `--surface-2` (Formularfelder, Bildplatzhalter) fällt dasselbe Orange auf 2,85:1 und
  verfehlt damit auch die Schwelle für Symbole. **Symbole und kleine Schrift tragen deshalb
  ein zweites, dunkleres Orange** `#C82700` (5,38:1). Der Fokusring nutzt denselben Wert.

Vollständige Rampe mit allen Messwerten in `DESIGN.md` im Projektwurzelverzeichnis.

### 10. Formular ohne Backend meldet keinen Erfolg

`submitInquiry()` ist eine eigene Funktion mit definierter Signatur. Ist kein Endpunkt
konfiguriert, gibt sie ein Ergebnis vom Typ `no-transport` zurück; das Formular zeigt dann
Telefonnummer und E-Mail-Adresse als tatsächlich funktionierenden Weg und behält die
Eingaben. Damit ist die Anbindung später ein Einzeiler.

## Nachtrag: zweiter Art-Direction-Durchgang

Nach Abnahme des MVP wurde die Seite in einem zweiten Durchgang neu art-direktet.
Die Entscheidungen 1, 3, 5, 7, 8 und 10 dieses Dokuments gelten unverändert weiter;
die folgenden sind überholt:

- **Decision 2 (Schriften):** Faustina ist entfallen. Bricolage Grotesque trägt
  Überschriften und UI, Manrope den Fließtext. Eine Serifen-Kursive als Akzent gibt
  es nicht mehr; Hervorhebung passiert über Größe, Farbe und Motion.
- **Decision 6 (Routing):** Aus der One-Page-Landingpage sind zehn echte Routen
  geworden (`/fotografie`, `/lebendige-medien`, `/gastronomie`, `/unternehmen`,
  `/arbeiten`, `/ueber-uns`, `/kontakt` plus Startseite und die beiden
  Rechtsseiten). Die Navigation verweist auf Pfade, nicht mehr auf Sprungmarken.
  Die Unterseiten werden per `React.lazy` nachgeladen.
- **Decision 9 (Farbsystem):** Statt einer Tonlage gibt es zwei, die sich abwechseln:
  Ink `#0B0B0D` für Bühnen, Ivory `#F7F4EF` für Lesestrecken. Markenorange ist
  `#FF4D00`. Die vollständige Rampe mit allen Kontrastwerten steht in `DESIGN.md`.

**Eine Verhaltensänderung gegenüber den Specs:** Die Scroll-Erzählung auf der
Startseite spielt ihr Video stumm ab, sobald der Besucher die zweite Station
erreicht, statt auf einen Klick zu warten. Sie liegt bewusst unterhalb des ersten
Bildschirms; der erste Eindruck bleibt ein Standbild, und ohne Scrollen passiert
nichts. Alle übrigen Foto-zu-Video-Einheiten bleiben tippgesteuert. Der Ton ist
stumm und über eine sichtbare Schaltfläche zuschaltbar.

Wird der Change archiviert, gehören diese Punkte als eigener Change erfasst, damit
die Specs den tatsächlichen Stand beschreiben.

## Risks / Trade-offs

**[Videoqualität] Maximal 576 px Quellbreite** → Medienboxen bleiben auf Desktop unter etwa
580 px Darstellungsbreite; das lebendige Fotoalbum läuft mit 624×352 nahezu nativ und wird
deshalb als Beweisstück prominent gesetzt. Poster werden als Standbilder moderat
hochskaliert und leicht nachgeschärft, was bei Einzelbildern verlustärmer ist als bei
Bewegtbild. Die Originale ersetzen die Dateien später ohne Codeänderung.

**[Bildbeschnitt] 36 % Höhenverlust beim Hochzeitsvideo in der 4:5-Box** → Der
Poster-Zeitpunkt und `objectPosition` werden am realen Rendering geprüft, nicht geschätzt.
Fällt der Beschnitt zu teuer aus, wird die Hero-Box auf 3:4 gestellt; das ist eine Zahl in
den Daten.

**[Marke] Kein Vektorlogo** → Der 400-dpi-Zuschnitt aus der PDF trägt bis Desktop-Retina,
versagt aber bei größeren Darstellungen und hat keinen transparenten Hintergrund von
verlässlicher Qualität. Das Logo wird über eine einzige Komponente eingebunden, sodass der
Austausch gegen eine SVG-Datei einen Ort betrifft. Als Favicon dient der freigestellte
Pandakopf.

**[SEO] Client-seitiges Rendering** → Für die Startseite abgefedert durch statische
Metadaten in `index.html`. Suchmaschinen führen JavaScript aus, aber verzögert. Sollte
organische Sichtbarkeit später wichtiger werden, ist ein Prerender-Schritt nachrüstbar,
ohne den Anwendungscode zu berühren.

**[Recht] Impressum und Datenschutz ohne Inhalte** → Eine deutsche Geschäftsseite ohne
vollständiges Impressum ist abmahnfähig. Die Seiten werden strukturell angelegt und im UI
sichtbar als unvollständig gekennzeichnet; vor dem Livegang müssen die Daten vorliegen.
Das ist ein Freigabekriterium, kein Implementierungsdetail.

**[Inhalt] Lebendige Produkte ohne benannten Mechanismus** → Weil der QR-Weg entfällt, zeigt
der Abschnitt das Ergebnis, ohne den Auslöser zu behaupten. Die Formulierungen bleiben bei
„Foto und Video werden zu einem Erlebnis". Sobald der reale Auslieferungsweg feststeht, wird
der Abschnitt um einen konkreten Schritt ergänzt.

**[Umfang] Elf Abschnitte in einem Change** → Die Aufgabenliste ist nach Abschnitten
geschnitten, sodass nach jeder Phase ein lauffähiger Zwischenstand existiert.

## Migration Plan

Kein Bestandssystem, keine Migration. Für den Livegang gilt:

1. Statischer Build (`dist/`) auf einen Host mit SPA-Rewrite auf `index.html`.
2. Vor der Freigabe: rechtliche Daten für Impressum und Datenschutz einsetzen.
3. Nach Erhalt der Originalvideos: Quellordner austauschen, `prepare-assets` erneut
   ausführen, Ergebnisse einchecken. Kein Anwendungscode betroffen.
4. Rückfallebene: Der vorherige `dist/`-Stand bleibt deploybar; es gibt keinen Zustand, der
   migriert werden müsste.

## Open Questions

Die folgenden Punkte lassen sich beantworten, ohne Specs, Ansatz oder Aufgabenschnitt zu
ändern:

- **Hosting.** Bestimmt allein die Rewrite-Regel aus Decision 6, nicht den Code.
- **Formular-Empfänger.** Ob Mailversand, Formulardienst oder eigene Route entschieden wird,
  betrifft ausschließlich die Implementierung von `submitInquiry()`.
- **Vektorlogo und Teamfoto.** Beide sind reine Asset-Nachlieferungen; die Komponenten
  behandeln ihr Fehlen bereits.
