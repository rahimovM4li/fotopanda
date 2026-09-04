## Purpose

Regelt, welches Bildmaterial die Website zeigen darf und in welcher Form es vorliegt.
Verhindert Stockfotos und Platzhalter im fertigen Interface und macht die spätere Ablösung
der komprimierten Videos durch hochauflösende Originale ohne Codeänderung möglich.

## ADDED Requirements

### Requirement: Ausschließlich echtes Kundenmaterial

Alle im Interface sichtbaren Fotos und Videos MUST aus dem vom Auftraggeber bereitgestellten
Material stammen. Stockfotografie, generierte Bilder und generische Platzhaltergrafiken
MUST NOT im ausgelieferten Interface erscheinen.

#### Scenario: Sektion ohne passendes Material
- **WHEN** für einen inhaltlichen Bereich kein geeignetes Kundenmaterial vorliegt
- **THEN** wird dieser Bereich nicht mit Ersatzmaterial gefüllt
- **AND** entfällt der Bereich oder wird ohne Bildfläche gestaltet

### Requirement: Datengetriebene Foto-Video-Paare

Die Zuordnung von Poster-Foto, Videodatei, Kategorie, Titel, Alternativtext und
Seitenverhältnis SHALL in einer Datenstruktur außerhalb der Darstellungskomponenten
gepflegt werden. Dieselbe Zuordnung MUST NOT an mehreren Stellen wiederholt werden.

#### Scenario: Medium wird ausgetauscht
- **WHEN** eine Videodatei durch eine höher aufgelöste Fassung ersetzt wird
- **THEN** genügt die Anpassung des Eintrags in der Datenstruktur
- **AND** ist keine Änderung an einer Darstellungskomponente erforderlich

### Requirement: Belegte Zuordnung des Materials

Die Zuordnung des vorliegenden Materials SHALL der tatsächlich erkannten Bildaussage
entsprechen. Verbindlich gilt:

- Business-Porträts: `14.33.56.jpeg`, `14.33.57.jpeg` (Studioaufnahme vor grauem Grund)
  sowie `14.33.57 (1).jpeg`, `14.33.57 (2).jpeg` (Bürosituation)
- Hochzeit und Paare: `14.33.57 (3).jpeg`, `14.33.57 (4).jpeg`, `14.33.57 (5).jpeg`
- Porträt und Sport-Lifestyle: `14.33.57 (6).jpeg`, `14.33.57 (7).jpeg`,
  `14.33.57 (8).jpeg`, `14.33.57 (9).jpeg`, `14.33.57 (10).jpeg`
- Hochzeitsvideo: `14.30.53.mp4`
- Gastronomievideos: `14.32.37.mp4`, `14.32.49.mp4`
- Immobilienvideo: `14.33.11.mp4`
- Business-Shooting: `14.33.56.mp4`
- Lebendiges Fotoalbum: `14.34.12.mp4`

#### Scenario: Kategorie und Motiv passen zusammen
- **WHEN** ein Medium einer Sektion zugeordnet wird
- **THEN** entspricht das dargestellte Motiv der Aussage dieser Sektion

### Requirement: Poster für Videos ohne zugehöriges Foto

Für Gastronomie, Immobilien, Business-Shooting und lebendiges Fotoalbum liegen keine Fotos
vor. Deren Poster SHALL als Standbild aus dem jeweiligen Video gewonnen werden. Als
Posterzeitpunkt MUST ein Bild gewählt werden, das das Hauptmotiv zeigt und weder schwarz
noch unscharf ist.

#### Scenario: Poster stammt aus dem Video
- **WHEN** für ein Video kein passendes Foto existiert
- **THEN** wird ein Standbild aus demselben Video als Poster verwendet
- **AND** zeigt dieses Standbild das Hauptmotiv erkennbar

### Requirement: Korrektur des Immobilienvideos

Das Immobilienvideo `14.33.11.mp4` enthält um 90 Grad gedrehten Bildinhalt sowie einen
eingebrannten Hinweis zum Drehen des Geräts. Vor der Verwendung MUST der Bildinhalt in die
aufrechte Ausrichtung gebracht und der Abschnitt mit dem eingebrannten Hinweis entfernt
werden.

#### Scenario: Aufbereitetes Immobilienvideo
- **WHEN** das aufbereitete Immobilienvideo abgespielt wird
- **THEN** ist der Bildinhalt aufrecht und im Querformat dargestellt
- **AND** ist kein Hinweis zum Drehen des Geräts sichtbar

### Requirement: Web-taugliche Auslieferungsformate

Fotos SHALL in einem modernen Format mit verlustbehafteter Kompression sowie in mehreren
Breiten ausgeliefert werden, sodass Endgeräte die passende Größe wählen können. Videos
SHALL als MP4 mit H.264 und vorangestellten Metadaten für sofortigen Wiedergabestart
ausgeliefert werden.

#### Scenario: Bildgrößen passen zum Anzeigebereich
- **WHEN** ein Foto auf einem Mobilgerät dargestellt wird
- **THEN** wird eine Variante geladen, deren Breite zur Darstellungsbreite passt
- **AND** wird nicht die größte verfügbare Variante übertragen

### Requirement: Bildausschnitt schützt das Hauptmotiv

Bei zugeschnittener Darstellung MUST der Bildausschnitt so gewählt sein, dass Gesichter,
Hände und Hauptmotive nicht angeschnitten werden. Je Medium SHALL eine Ausrichtung des
Bildausschnitts hinterlegt werden können.

#### Scenario: Porträt in querformatiger Kachel
- **WHEN** ein Hochformatfoto in einem querformatigen Bereich dargestellt wird
- **THEN** bleibt das Gesicht der abgebildeten Person vollständig sichtbar

### Requirement: Alternativtexte für alle Medien

Jedes Foto und jedes Poster SHALL einen beschreibenden deutschen Alternativtext besitzen,
der das Motiv benennt. Ein leerer Alternativtext MUST NOT vergeben werden, außer das Bild
ist rein dekorativ und wird zusätzlich vor Hilfsmitteln verborgen.

#### Scenario: Portfoliobild ohne Alternativtext
- **WHEN** ein Medium ohne beschreibenden Alternativtext in die Datenstruktur aufgenommen wird
- **THEN** gilt der Datensatz als unvollständig und wird nicht ausgeliefert
