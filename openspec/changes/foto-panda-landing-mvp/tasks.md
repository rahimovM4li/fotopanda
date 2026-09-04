## 1. Projektgerüst

- [x] 1.1 Vite-Projekt mit React 19 und TypeScript im Repository-Root anlegen, ohne die vorhandenen Ordner `.claude/` und `openspec/` zu berühren
- [x] 1.2 `.gitignore` für `node_modules`, `dist`, lokale Umgebungsdateien und Betriebssystemreste anlegen
- [x] 1.3 Tailwind CSS einrichten und in `src/index.css` einbinden
- [x] 1.4 Laufzeitabhängigkeiten installieren: `react-router-dom`, `motion`, `lucide-react`, `@radix-ui/react-dialog`, `@radix-ui/react-select`
- [x] 1.5 Entwicklungsabhängigkeiten installieren: `sharp`, `ffmpeg-static`, `ffprobe-static`, ESLint mit TypeScript-Regeln
- [x] 1.6 Schriften lokal einbinden: `@fontsource-variable/bricolage-grotesque` und `@fontsource-variable/faustina`; sicherstellen, dass keine Anfrage an `fonts.googleapis.com` erfolgt
- [x] 1.7 `npm run dev`, `npm run build` und `npm run lint` als Skripte einrichten und einmal fehlerfrei ausführen

## 2. Design-System

- [x] 2.1 Farb-Tokens als CSS-Custom-Properties definieren: `--color-brand` (#FC4704) und `--color-ink` (#0E1015) aus dem Logo gemessen, dazu die dunkle Flaechenrampe und vier Textstufen
- [x] 2.2 Tokens als Farben, Schriftfamilien, Radien und Kurven registrieren (Tailwind v4: `@theme` in `src/index.css` ist die Konfiguration, keine separate `tailwind.config.ts`)
- [x] 2.3 Typografie-Skala mit `clamp()` für die Überschriftenebenen anlegen; Bricolage Grotesque für Überschriften und Fließtext, Faustina kursiv nur für das Markenwort
- [x] 2.4 Basis-Komponenten `Button` (primär, sekundär, dezent), `SectionHeading` und `Container` bauen; Mindesthöhe interaktiver Flächen 44 Pixel
- [x] 2.5 Fokus-Sichtbarkeit global definieren, sodass jedes fokussierbare Element einen erkennbaren Fokusring erhält
- [x] 2.6 Globale Regel für `prefers-reduced-motion: reduce` ergänzen, die dekorative Bewegung abschaltet

## 3. Asset-Aufbereitung

- [x] 3.1 `scripts/prepare-assets.mjs` mit konfigurierbarem Quellordner anlegen (Vorgabe: `C:\Users\rahimm\Downloads`)
- [x] 3.2 Die 12 Fotos in AVIF und WebP in den Breiten 640, 960 und 1320 sowie als JPEG-Fallback nach `public/assets/photos/` schreiben, benannt nach Kategorie statt nach WhatsApp-Zeitstempel
- [x] 3.3 Das Immobilienvideo `14.33.11.mp4` um 90 Grad in die aufrechte Ausrichtung drehen und den Vorspann mit dem eingebrannten Drehhinweis abschneiden
- [x] 3.4 Alle sechs Videos als MP4/H.264 mit `-movflags +faststart` nach `public/assets/videos/` schreiben, ohne die Quellbreite hochzuskalieren
- [x] 3.5 Für jedes Video einen Poster-Frame zu einer im Skript festgelegten Zeitmarke extrahieren, moderat hochskalieren, leicht nachschärfen und als AVIF und WebP nach `public/assets/posters/` schreiben
- [x] 3.6 Jeden Poster-Frame visuell prüfen: Hauptmotiv erkennbar, weder schwarz noch unscharf; Zeitmarken andernfalls korrigieren und neu erzeugen
- [x] 3.7 Logo aus Seite 4 der PDF bei 400 dpi zuschneiden und als Übergangs-Asset ablegen; Pandakopf freistellen und als Favicon in mehreren Größen erzeugen
- [x] 3.8 Aufbereitete Ergebnisse einchecken und im Skript dokumentieren, wie die Originalvideos später ersetzt werden

## 4. Konfiguration und Datenmodell

- [x] 4.1 `src/config/siteConfig.ts` mit den bestätigten Werten anlegen: Marke „Foto Panda", Tagline „Fotos. Videos. Erlebnisse.", `https://fotopandastudio.de`, `info@fotopandastudio.de`, `+49 176 41799016`, Osnabrück, Instagram und TikTok `fotopanda.de`, YouTube „Foto Panda"
- [x] 4.2 TypeScript-Typen für Medien, Foto-Video-Paare, Leistungen, Portfolioeinträge, Prozessschritte und Navigationseinträge definieren
- [x] 4.3 `src/data/media.ts` mit den Foto-Video-Paaren anlegen: je Eintrag Poster, Video, Kategorie, Titel, Alternativtext, Seitenverhältnis und `objectPosition`
- [x] 4.4 `src/data/` für Navigation, Leistungen, lebendige Produkte, Prozessschritte, Vorteile und Portfolio befüllen; jede Angabe existiert genau einmal
- [x] 4.5 Prüfung ergänzen, die Datensätze ohne Alternativtext von der Auslieferung ausschließt

## 5. Seitengerüst

- [x] 5.1 Routing für `/`, `/impressum` und `/datenschutz` einrichten
- [x] 5.2 `Header` mit Logo, Wortmarke, Desktop-Navigation und Primär-CTA „Jetzt anfragen" bauen; keine linke Sidebar
- [x] 5.3 Verdichten des Headers ab 40 Pixel Scrollweite mit abgesetztem Hintergrund umsetzen
- [x] 5.4 Aktiven Navigationszustand über die Sichtbarkeit der Abschnitte ableiten und markieren
- [x] 5.5 Ankersprünge um die Headerhöhe versetzen, sodass Abschnittsüberschriften nicht verdeckt werden
- [x] 5.6 Mobiles Menü als Drawer mit Scroll-Sperre, Schließen per Auswahl, Schaltfläche und Escape sowie 44 Pixel hohen Einträgen bauen
- [x] 5.7 `Footer` mit Marke, Tagline, Navigation, Kontakt- und Social-Angaben, Impressum, Datenschutz und zur Laufzeit ermitteltem Copyright-Jahr bauen

## 6. Foto-zu-Video-Einheit

- [x] 6.1 Kontext anlegen, der die ID der aktiven Einheit hält und beim Start einer neuen Einheit die vorherige pausiert
- [x] 6.2 `LivingMedia` mit dem Zustandsmodell `poster → loading → playing ⇄ paused → ended` und dem Fehlerpfad `error → poster` implementieren
- [x] 6.3 Poster-Zustand mit Wiedergabesymbol, erklärendem Hinweistext und zugänglichem Namen umsetzen; Auslösung per Klick, Tippen, Enter und Leertaste
- [x] 6.4 Video mit `preload="none"`, `playsInline` und eigener Steuerung einbinden; kein Autoplay beim Seitenaufruf
- [x] 6.5 Übergang vom Poster zum Video als Überblendung mit leichter Skalierung umsetzen; feste Box, `object-cover`, `objectPosition` aus den Daten
- [x] 6.6 Ladeanzeige zwischen Aktivierung und erstem Videobild einblenden, Poster dabei sichtbar lassen
- [x] 6.7 Fehlerfall behandeln: zurück zum Poster, kurzer Hinweis, erneute Auslösung möglich, keine leere Fläche
- [x] 6.8 Pausieren, Fortsetzen und Endzustand mit erneuter Wiedergabe umsetzen
- [x] 6.9 Tonsteuerung mit erkennbarem Zustand ergänzen; Ton startet nie ohne Nutzerinteraktion
- [x] 6.10 CTA „Jetzt anfragen" ab 1,5 Sekunden Wiedergabe innerhalb der Einheit einblenden, im Endzustand erreichbar halten, Timer bei Pause anhalten und bei Fehler verwerfen
- [x] 6.11 Videodaten unterhalb des ersten Bildschirms erst beim Eintritt in den Sichtbereich oder bei Aktivierung anfordern

## 7. Hero

- [x] 7.1 Hero-Layout bauen: Desktop nebeneinander mit dominierendem Medienbereich, Mobil Überschrift, dann Medium, dann CTAs
- [x] 7.2 Überschrift, Untertitel und ein orange hervorgehobenes Schlüsselwort setzen; Größen über `clamp()`, keine Abschneidung bei 360 Pixel Breite
- [x] 7.3 Primär-CTA „Jetzt anfragen" und Sekundär-CTA zu den Arbeiten einsetzen
- [x] 7.4 Foto-zu-Video-Einheit mit dem Hochzeitsvideo einsetzen; nach der Drehung liegt es als 1168x576 im Verhältnis 16:9 vor. Bildausschnitt am realen Rendering prüfen und `objectPosition` justieren
- [x] 7.5 Zweites, überlappendes Bild aus der hochauflösenden Fotostrecke als Beleg fotografischer Qualität einsetzen
- [x] 7.6 Drei knappe Leistungsmerkmale ohne Zahlenversprechen ergänzen
- [x] 7.7 Poster des Hero-Mediums als LCP-Bild vorladen und ohne Lazy Loading ausliefern

## 8. Inhaltsabschnitte

- [x] 8.1 Abschnitt „Lebendige Produkte" mit der Fotoalbum-Aufnahme als Foto-zu-Video-Einheit im Verhältnis 16:9 und kurzer Erläuterung ohne Behauptung des Auslösemechanismus
- [x] 8.2 Leistungsabschnitt als redaktionelle Komposition mit den belegten Kategorien Hochzeit und Paare, Porträt und Lifestyle, Business und Team, Gastronomie, Immobilien; keine Kategorie ohne Medium
- [x] 8.3 Gastronomieabschnitt mit den beiden Food-Videos; Nutzen benennen, keine Aussage zu Umsatz oder Bestellzahlen
- [x] 8.4 Geschäftskundenabschnitt mit Gastronomie, Immobilien sowie Unternehmens- und Team-Darstellung; mindestens ein Anwendungsfall als Foto-zu-Video-Einheit
- [x] 8.5 Abschnitt „So funktioniert's" mit den vier Schritten Fotografieren, Video erstellen, Verbinden, Erleben; horizontal auf Desktop, vertikal unter 768 Pixel; kein Scan-Schritt
- [x] 8.6 Abschnitt „Warum Foto Panda" mit vier bis sechs Gründen ohne Kundenzahlen, Bewertungen oder Auszeichnungen
- [x] 8.7 Abschnitt „Über uns" ohne erfundene Person; Aussage über Text und Arbeitsbeispiele tragen
- [x] 8.8 Abschließender Handlungsaufruf auf dunkler Fläche mit warmem Schimmer und Primär-CTA
- [x] 8.9 Alle Abschnitte auf verbotene Inhalte prüfen: keine QR-Grafik, kein Scan-Aufruf, keine App-Store-Schaltfläche, kein Royal-Media-Bezug, kein Umsatzversprechen

## 9. Portfolio

- [x] 9.1 Portfolio-Raster asymmetrisch auf Desktop, ein- oder zweispaltig auf Mobilgeräten; kein horizontaler Überlauf
- [x] 9.2 Videoarbeiten mit Wiedergabesymbol und textlicher Kennzeichnung versehen, auch ohne Farbwahrnehmung erkennbar
- [x] 9.3 Lightbox auf Basis des Radix-Dialogs bauen: Fotos großformatig ohne Hochskalierung über die Originalauflösung, Videos mit Bedienelementen und ohne Autostart
- [x] 9.4 Schließen per Schaltfläche, Escape und Auswahl außerhalb des Inhalts; Scroll-Sperre ohne Layoutsprung; Fokusrückgabe auf den auslösenden Eintrag
- [x] 9.5 Fokus innerhalb der Lightbox halten und den Hintergrund für Hilfsmittel als inaktiv kennzeichnen
- [x] 9.6 Blättern per Pfeiltasten und per Wischgeste; laufendes Video beim Wechsel anhalten

## 10. Kontakt und Anfrage

- [x] 10.1 Kontaktabschnitt mit den konfigurierten Angaben aufbauen; Telefon als `tel:`, E-Mail als `mailto:` verlinken
- [x] 10.2 Formular mit Name, Kontaktmöglichkeit, Anfrageart, Nachricht und Datenschutz-Zustimmung bauen; Pflichtfelder gekennzeichnet, Beschriftungen sichtbar
- [x] 10.3 Auswahl der Anfrageart auf die tatsächlich erbrachten Leistungen begrenzen: Hochzeit, Paar und Familie, Porträt und Lifestyle, Business und Team, Gastronomie, Immobilien, Lebendige Medien, Sonstiges
- [x] 10.4 Validierung umsetzen: feldbezogene Meldungen für Hilfsmittel lesbar, Fokus auf das erste fehlerhafte Feld, Prüfung von E-Mail und Telefonnummer, Versand ohne Zustimmung blockiert
- [x] 10.5 `submitInquiry()` mit definierter Signatur und Ergebnis `no-transport` anlegen; ohne Endpunkt keine Erfolgsmeldung, Eingaben bleiben erhalten, Telefon und E-Mail werden als Weg angeboten
- [x] 10.6 Alle Primär-CTAs auf den Kontaktabschnitt führen; Zielüberschrift vollständig sichtbar

## 11. Rechtsseiten

- [x] 11.1 `/impressum` mit vollständiger Abschnittsstruktur anlegen; fehlende Angaben im UI sichtbar als ausstehend kennzeichnen, keine erfundenen Firmen-, Personen- oder Anschriftsdaten
- [x] 11.2 `/datenschutz` mit Abschnittsstruktur anlegen; die tatsächlichen Gegebenheiten festhalten: keine Drittanbieter-Requests, selbst gehostete Schriften, kein Tracking
- [x] 11.3 Fehlende rechtliche Angaben zusätzlich als Liste im Repository dokumentieren, damit sie vor der Freigabe beschafft werden
- [x] 11.4 Bestätigen, dass kein Einwilligungsbanner eingebaut wird, weil keine einwilligungspflichtige Verarbeitung stattfindet

## 12. SEO

- [x] 12.1 Statische Metadaten der Startseite in `index.html` setzen: Titel „Foto Panda | Professionelle Fotografie & lebendige Erinnerungen", Description, canonical auf `https://fotopandastudio.de/`, `lang="de"`
- [x] 12.2 OpenGraph- und Twitter-Metadaten mit einem realen Kunden-Asset als Vorschaubild setzen
- [x] 12.3 `useSeo`-Hook für Titel und Description der beiden Rechtsseiten umsetzen
- [x] 12.4 `public/robots.txt` und `public/sitemap.xml` mit den drei URLs anlegen
- [x] 12.5 Favicon und Web-App-Manifest aus dem Pandakopf einbinden
- [x] 12.6 Strukturierte Daten für ein lokales Fotounternehmen ausschließlich aus `siteConfig` erzeugen; kein Feld mit erfundener Anschrift oder Bewertung

## 13. Barrierefreiheit

- [x] 13.1 Überschriftenhierarchie prüfen: genau eine Überschrift erster Ordnung je Route, keine übersprungene Ebene
- [x] 13.2 Alle Icon-Schaltflächen mit zugänglichem Namen versehen
- [x] 13.3 Vollständige Tastaturbedienung prüfen: Navigation, mobiles Menü, Foto-zu-Video-Einheit, Lightbox, Formular
- [x] 13.4 Farbkontraste prüfen; Orange nicht für Fließtext verwenden
- [x] 13.5 Verhalten bei reduzierter Bewegung prüfen: keine Einblend-, Parallax- oder Pulsanimation, alle Inhalte sofort sichtbar

## 14. Performance

- [x] 14.1 Alle Bilder außer dem Hero-Poster mit Lazy Loading ausliefern; `srcset` und `sizes` passend zur Darstellungsbreite setzen
- [x] 14.2 Feste Seitenverhältnisse für alle Medienflächen setzen, sodass kein Layoutsprung entsteht
- [x] 14.3 Prüfen, dass beim ersten Laden keine Videodatei übertragen wird
- [x] 14.4 Produktionsbundle auf ungenutzte Abhängigkeiten und tote Importe prüfen und bereinigen

## 15. Visuelle Prüfung

- [x] 15.1 Anwendung starten und Screenshots bei 390×844, 768×1024 und 1440×1000 erstellen
- [x] 15.2 Hero, Foto-zu-Video-Einheit im Poster- und im Wiedergabezustand, Navigation, Leistungen, Portfolio, Formular und Footer visuell prüfen
- [x] 15.3 Auf 360, 375, 390 und 430 Pixel Breite prüfen: kein horizontaler Überlauf, keine abgeschnittene Überschrift, keine zu kleinen Schaltflächen
- [x] 15.4 Bildausschnitte prüfen: keine angeschnittenen Gesichter oder Hände; `objectPosition` bei Bedarf korrigieren
- [x] 15.5 Gefundene Mängel beheben und die Screenshots erneut erstellen

## 16. Funktionale Prüfung

- [x] 16.1 Navigation, Ankersprünge, aktiven Zustand und mobiles Menü prüfen
- [x] 16.2 Foto-zu-Video-Einheit prüfen: kein Autoplay, Wiedergabe, Ladeanzeige, Pause, Ende, Fehlerfall, CTA-Einblendung
- [x] 16.3 Prüfen, dass beim Start einer zweiten Einheit die erste pausiert
- [x] 16.4 Lightbox prüfen: Öffnen, Schließen per Escape und Auswahl außerhalb, Fokusrückgabe, Blättern, Scroll-Sperre
- [x] 16.5 Formular prüfen: Validierung, Fehlermeldungen, Verhalten ohne Empfangsdienst, Erhalt der Eingaben
- [x] 16.6 Footer-Verweise und die Routen `/impressum` und `/datenschutz` prüfen
- [x] 16.7 Browser-Konsole auf Fehler und Warnungen prüfen und diese beheben

## 17. Abnahme

- [x] 17.1 `tsc --noEmit` ohne Fehler
- [x] 17.2 `npm run lint` ohne Fehler
- [x] 17.3 `npm run build` erfolgreich; Ergebnis aus `dist/` mit einer Vorschau prüfen
- [x] 17.4 Volltextsuche über Quellcode und Build: keine Treffer für „Royal Media", „FotoPanda", „fotopanda.de" als Domain, „QR", „App Store", „Google Play", „Mehr Umsatz"
- [x] 17.5 Prüfen, dass jede Geschäftsangabe aus `siteConfig` stammt und keine erfundenen Kontaktdaten, Preise, Bewertungen oder Referenzen vorkommen
- [x] 17.6 `openspec validate foto-panda-landing-mvp --strict` ausführen und offene Punkte für die Freigabe zusammenfassen
