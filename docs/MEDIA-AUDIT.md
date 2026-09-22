# Media-Audit · September 2026

Die Kundenmedien wurden vor der Integration als Kontaktbögen und an mehreren Videopositionen visuell geprüft. Die Quelldateien bleiben unverändert. `scripts/audit-media.mjs` erzeugt die Prüfbilder unter `.media-audit/`; diese sind keine Website-Inhalte.

## Neue Auswahl

| Website-ID | Kundenquelle | Verwendung und Grenze |
| --- | --- | --- |
| bridal-editorial | IMG_2181.JPG | Helles Brautporträt; Hero, 1080 × 1350 px |
| bridal-full-length | IMG_2184.JPG | Kleid und Schleppe; ergänzende Komposition, 1080 × 1350 px |
| bridal-closeup | IMG_2179.JPG | Nahporträt; Galerie, 1080 × 1350 px |
| bridal-palace | IMG_2584.PNG | Ganzkörperaufnahme an goldener Tür, 1320 × 1622 px |
| bridal-palace-portrait | IMG_2588.PNG | Porträt vor dunklem Hintergrund, 1320 × 1616 px |
| digital-card | Gelieferte Visitenkarten-/Smartphone-Montage | Reales Kundenmotiv mit Foto-Panda-Marke; maximal 589 px breit |
| school-album | IMG_2580.MP4, Sekunde 18, Ausschnitt 840 × 600 bei x=300/y=55 | Fotobuch-Gestaltungsbeispiel mit drei Kinderporträts; kein Nachweis einer AR-Funktion |
| wedding | IMG_2582.MP4 | Neuer Brautporträtfilm, 720 × 1280 px, 19 s |
| gastronomy-kitchen | IMG_2533.MP4 | Neue Restaurantküchen-Sequenz, 720 × 1280 px, ca. 26 s |

`scripts/prepare-new-assets.mjs` erzeugt responsive AVIF-, WebP- und JPEG-Fotos sowie H.264/AAC-MP4 mit Faststart. Die Quellauflösung wird nicht hochskaliert. Vorschaubilder und korrekte deutsche Alternativtexte sind zentral registriert.

## Aus der sichtbaren Auswahl entfernt

- Alter Immobilienrundgang: unscharfe Außenaufnahmen, gekippte Perspektiven, unattraktive Decken-/Treppenbilder; kein Ersatzfilm nötig.
- Alter Hochzeitsfilm: weiche, dunkle, niedrig aufgelöste Aufnahmen; durch neuen Brautfilm ersetzt.
- Alter Business-Film: weiche Aufnahmen und überlagerte Übergänge; statische Business-Porträts sind stärker.
- Alte Gastronomie-Filme: nur 464 bzw. 576 px breit; einer endet mit einer fremden Restaurantmarke. Die neue Küchen-Sequenz wird bevorzugt.
- Alter Album-Demofilm: nur 624 × 352 px; wird nicht mehr gezeigt.
- IMG_2185.MP4: Geburtstagsfilm mit Glitzereffekten; passt nicht zur ruhigen Gestaltung.
- IMG_2580.MP4 als vollständiger Film: enthält auf den Produktseiten russische Platzhaltertexte. Nur der geprüfte, sprachlich neutrale Kinderporträt-Ausschnitt wird als Foto verwendet.
- IMG_2589.PNG: vorgefertigte englische Braut-Collage; Einzelporträts sind gestalterisch flexibler und passen zur deutschsprachigen Website.

Die übrigen neuen Brautfotos sind brauchbar, aber in Motiv und Haltung redundant. Bestehende hochwertige Business-, Paar- und Sportplatzporträts bleiben als inhaltlich passende Ergänzungen verfügbar.

## Referenzen und sachliche Grenzen

- IMG_2601.PNG nennt „Royal Media öffnen“ und zeigt eine gekrönte R-Marke. Die Beschreibung behauptet ausdrücklich einen QR-Menü-Zugang ohne App-Installation. Browser-Menü und herunterladbare AR-App müssen in den Texten unterschieden werden.
- Die Smartphone-/Visitenkarten-Montage nennt „KADIR FOTO PANDA“ und „Professionelle Fotografie und Videografie“, zeigt aber keine lesbare Telefonnummer, E-Mail oder Adresse.
- Die gelieferten Preisgrafiken nennen 59 €, 69 € und 500 € für verschiedene Fotobücher. Sie wurden nicht als neue Preisangebote veröffentlicht; der Änderungsauftrag verlangt keine Preisübernahme.
- Die Bildreferenzen liefern keine Store-URLs. Diese wurden separat durch den Content-Workstream verifiziert.
- Browser-/Systemleisten wurden nicht nachgebaut. Die sichtbare Smartphone-Hardware im Visitenkartenmotiv ist Teil des gelieferten Produktfotos.
- Logo und Favicons werden durch den separaten Brand-Workstream aus `logo-new.jpg` aufbereitet.

## Prüfung

Die neuen Bild- und Posterdateien wurden nach der Optimierung erneut visuell geprüft. Das Fotobuchmotiv wurde zusätzlich auf russische Beschriftungen kontrolliert und deshalb auf die einzelne Porträtseite beschnitten. Beide verwendeten Filme wurden vollständig durch FFmpeg decodiert, ohne Fehler. Alle 63 ausgewählten Foto- und Postervarianten (AVIF/WebP/JPEG) sind vorhanden. Die Medienregistrierung enthält nur die zwei ausgewählten Filme; verworfene Filme sind nicht mehr referenzierbar.
