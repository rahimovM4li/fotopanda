## Purpose

Das gemeinsame Seitengerüst der Foto-Panda-Website: Navigation, Footer, Routing und die
zentrale Quelle aller Geschäftsdaten. Stellt sicher, dass Markenname, Domain und
Kontaktdaten auf jeder Seite identisch und niemals erfunden sind.

## ADDED Requirements

### Requirement: Einheitliche Markenschreibweise

Die Website SHALL den Markennamen in allen sichtbaren Texten, Meta-Angaben und
Dateibezeichnern als „Foto Panda" ausgeben. Die Schreibweisen „FotoPanda",
„Fotopanda Studio", „Royal Media" und „Royal Media App" MUST NOT vorkommen.

#### Scenario: Markenname im gerenderten Dokument
- **WHEN** eine beliebige Route der Website gerendert wird
- **THEN** enthält der sichtbare Text die Zeichenkette „Foto Panda"
- **AND** enthält weder „FotoPanda" noch „Royal Media" in irgendeiner Schreibweise

### Requirement: Zentrale Konfiguration der Geschäftsdaten

Alle Geschäftsdaten SHALL aus genau einer Konfigurationsquelle stammen, die mindestens
`brandName`, `domain`, `phone`, `email`, `city`, `instagram`, `tiktok`, `youtube` und
`tagline` bereitstellt. Kein Geschäftsdatum MUST direkt in einer Komponente stehen.

Die bestätigten Werte sind: Marke „Foto Panda", Tagline „Fotos. Videos. Erlebnisse.",
Domain `https://fotopandastudio.de`, E-Mail `info@fotopandastudio.de`,
Telefon `+49 176 41799016`, Ort „Osnabrück, Deutschland",
Instagram und TikTok `fotopanda.de`, YouTube „Foto Panda".

#### Scenario: Kontaktdaten erscheinen konsistent
- **WHEN** Telefonnummer oder E-Mail-Adresse an mehreren Stellen der Seite erscheinen
- **THEN** stammen alle Vorkommen aus derselben Konfigurationsquelle
- **AND** sind sie über `tel:` bzw. `mailto:` verlinkt

#### Scenario: Nicht gesetzte Werte werden nicht dargestellt
- **WHEN** ein Konfigurationsfeld leer oder nicht gesetzt ist
- **THEN** wird das zugehörige UI-Element nicht gerendert
- **AND** erscheint kein Platzhalter und kein erfundener Ersatzwert

### Requirement: Sticky-Navigation auf Desktop

Der Header SHALL auf Desktop dauerhaft am oberen Rand sichtbar bleiben und die Einträge
Start, Leistungen, Lebendige Produkte, So funktioniert's, Portfolio, Über uns und Kontakt
sowie den Primär-CTA „Jetzt anfragen" enthalten. Eine permanente linke Sidebar MUST NOT
existieren.

#### Scenario: Header verdichtet sich beim Scrollen
- **WHEN** der Nutzer mehr als 40 Pixel nach unten scrollt
- **THEN** verringert der Header seine Höhe und erhält einen abgesetzten Hintergrund
- **AND** bleibt der CTA „Jetzt anfragen" sichtbar und bedienbar

#### Scenario: Aktiver Abschnitt wird markiert
- **WHEN** ein Seitenabschnitt den sichtbaren Bereich dominiert
- **THEN** wird der zugehörige Navigationseintrag als aktiv gekennzeichnet

#### Scenario: Ankersprung berücksichtigt die Headerhöhe
- **WHEN** der Nutzer einen Navigationseintrag auswählt
- **THEN** wird der Zielabschnitt so positioniert, dass seine Überschrift nicht vom
  Sticky-Header verdeckt wird

### Requirement: Mobile Navigation als Drawer

Auf Viewports unter 1024 Pixel Breite SHALL die Navigation über eine Menüschaltfläche
erreichbar sein und als Drawer oder Vollbildmenü öffnen.

#### Scenario: Menü öffnen und schließen
- **WHEN** der Nutzer die Menüschaltfläche betätigt
- **THEN** öffnet sich das Menü mit allen Navigationseinträgen und dem CTA „Jetzt anfragen"
- **AND** wird das Scrollen des Seitenhintergrunds unterbunden
- **AND** schließt das Menü bei Auswahl eines Eintrags, bei Betätigung der Schließen-
  Schaltfläche und bei Druck auf Escape

#### Scenario: Touch-Ziele sind ausreichend groß
- **WHEN** das mobile Menü geöffnet ist
- **THEN** ist jeder interaktive Eintrag mindestens 44 Pixel hoch

### Requirement: Footer mit rechtlichen Verweisen

Der Footer SHALL Markenname, Tagline, Navigationsverweise, die konfigurierten Kontakt- und
Social-Angaben sowie Verweise auf Impressum und Datenschutz enthalten. Die Jahresangabe im
Copyright MUST zur Laufzeit aus dem aktuellen Datum ermittelt werden.

#### Scenario: Copyright-Jahr ist dynamisch
- **WHEN** der Footer gerendert wird
- **THEN** entspricht die angezeigte Jahreszahl dem aktuellen Kalenderjahr
- **AND** ist keine fest kodierte Jahreszahl im Ausgabetext enthalten

### Requirement: Routen für Impressum und Datenschutz

Die Website SHALL die Routen `/impressum` und `/datenschutz` bereitstellen. Solange die
rechtlichen Angaben des Auftraggebers nicht vorliegen, MUST diese Seiten die fehlenden
Angaben ausdrücklich als noch zu ergänzen kennzeichnen und MUST NOT erfundene Firmen-,
Personen- oder Anschriftsdaten enthalten.

#### Scenario: Impressum ohne vorliegende Daten
- **WHEN** die Route `/impressum` aufgerufen wird und keine rechtlichen Daten konfiguriert sind
- **THEN** wird die Seitenstruktur mit den erforderlichen Abschnitten angezeigt
- **AND** ist erkennbar ausgewiesen, welche Angaben noch fehlen
- **AND** enthält die Seite keine erfundene Anschrift, Registernummer oder USt-IdNr.

### Requirement: SEO-Grundausstattung

Jede Route SHALL einen eindeutigen Titel, eine Meta-Description, eine canonical-URL auf
Basis von `https://fotopandastudio.de` sowie OpenGraph- und Twitter-Metadaten ausliefern.
Das Projekt MUST `robots.txt` und `sitemap.xml` bereitstellen.

#### Scenario: Startseiten-Metadaten
- **WHEN** die Startseite ausgeliefert wird
- **THEN** lautet der Titel „Foto Panda | Professionelle Fotografie & lebendige Erinnerungen"
- **AND** verweist die canonical-URL auf `https://fotopandastudio.de/`
- **AND** referenziert das OpenGraph-Bild ein reales Asset des Auftraggebers

#### Scenario: Strukturierte Daten nur mit belegten Angaben
- **WHEN** strukturierte Daten für ein lokales Unternehmen ausgegeben werden
- **THEN** enthalten sie ausschließlich bestätigte Werte aus der zentralen Konfiguration
- **AND** wird kein Feld mit einer erfundenen Anschrift oder Bewertung befüllt

### Requirement: Respektieren reduzierter Bewegung

Wenn das Betriebssystem reduzierte Bewegung anfordert, SHALL die Website alle dekorativen
Bewegungsabläufe abschalten oder auf einen einfachen Sichtbarkeitswechsel reduzieren.
Inhalte MUST auch dann vollständig erreichbar bleiben.

#### Scenario: Reduzierte Bewegung aktiv
- **WHEN** `prefers-reduced-motion: reduce` gesetzt ist
- **THEN** laufen keine Einblend-, Parallax- oder Pulsanimationen
- **AND** sind alle Inhalte und Bedienelemente ohne Wartezeit sichtbar und nutzbar
