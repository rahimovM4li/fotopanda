# Foto Panda – Redesign-Abnahme

Stand: 21. September 2026. Bestehende React-/Vite-Website weiterentwickelt; kein Neubau.

## Umsetzung

- Originales neues Kundenlogo in Header, mobilem Menü, Footer, Ladezustand und Favicons.
- Neue Bildkomposition, sieben neue Foto-Motive, zwei ausgewählte neue Filme; keine alten Rundgangs-, Business-, Gastronomie- oder Albumfilme im Produktionspaket.
- Deutsche Inhalte: vier vorgegebene Ablauf-Schritte, sieben FAQ, Kontakttext und zehn Auswahlkategorien plus „Bitte wählen“.
- Royal_Media ausschließlich im App-Kontext; reale App-Store- und Google-Play-URLs zentral in `siteConfig`.
- Kurze, ruhige Einblendungen; keine Scroll-Autoplay-Bühnen. Video startet explizit und stumm, pausiert außerhalb des Sichtbereichs. CSS und Motion-Komponenten berücksichtigen Reduced Motion.
- Responsive Bilder mit AVIF/WebP/JPEG, lokal eingebundene Schriften, Videos mit `preload="none"`. Kunden-Rohmaterial und verworfene Medien werden nicht veröffentlicht.

## Erfolgreiche Prüfungen

- `npm run build`: TypeScript und Produktions-Build erfolgreich.
- `npm run lint`: keine ESLint-Fehler.
- `npm run check`: 171 Fotovarianten, zwei Filme, alle Medienreferenzen und Inhaltsverträge geprüft.
- Beide MP4s vollständig durch FFmpeg decodiert, ohne Fehler.
- Produktions-Build im Chromium-basierten Codex-Browser: Startseite, Fotografie, lebendige Medien, Gastronomie, Unternehmen, Arbeiten, Über uns und Kontakt jeweils bei 375, 390, 430, 768, 1440 und 1920 px geprüft. Keine horizontalen Dokumentüberläufe oder defekten geladenen Bilder. Keine Konsolenwarnungen/-fehler im frischen Produktions-Tab.
- Visuelle Sichtprüfung: Desktop-/Tablet-/Mobil-Hero, neue Unterseiten, Menü, Kontaktformular, FAQ, App-Buttons und Foto-/Video-Großansicht.
- Menü öffnen, Navigation zur Kontaktseite, Schließen und Fokusverwaltung geprüft.
- FAQ per Klick und Enter geöffnet/geschlossen; geschlossene Antworten bleiben verborgen.
- Leeres Formular: deutsche Fehler, Fokus auf erstes fehlerhaftes Feld. Gültige Testdaten: E-Mail-Vorbereitung mit korrekter Kodierung von Kategorie und Nachricht. Es wurde keine E-Mail gesendet.
- Galerie: neue Fotos in maximal verfügbarer Auflösung; Video-Großansicht mit stabiler Höhe; Start, Pause, Weiterblättern, Escape und Fokusrückgabe. Gastronomiefilter liefert genau einen passenden Film.
- App Store und Google Play zeigen die entsprechenden Royal-Media-Listings. Kein Download und keine Installation ausgeführt.
- Impressum und Datenschutz laden mit genau einer Hauptüberschrift und deutschen Inhalten.

Behobene QA-Funde: fest verdrahtete 1320-px-Dateien in der Lightbox, kollabierende Video-Höhe, fehlerhafte Foto-Fallbackgröße, Sprungmarken nach Routenwechsel und kurzzeitig unsichtbare Einstiegstexte.

## Betriebsgrenzen

`siteConfig.inquiryEndpoint` ist weiterhin `null`: Das Formular bereitet eine E-Mail vor, der Besucher sendet sie in seinem E-Mail-Programm. Ein echter Empfangsdienst wurde nicht erfunden oder eingerichtet.

Die bereits zuvor fehlenden Firmen-/Adress- und Hostingangaben für Impressum/Datenschutz müssen vom Betreiber ergänzt werden. Die Rechtstexte wurden nicht als vollständig freigegeben. Es erfolgte keine Veröffentlichung.

Die Responsive-Prüfung verwendet Browser-Viewportgrößen, keine physischen iOS-/Android-Geräte. Reduced Motion wurde im Code geprüft; ein separater OS-Präferenztest wurde nicht durchgeführt.
