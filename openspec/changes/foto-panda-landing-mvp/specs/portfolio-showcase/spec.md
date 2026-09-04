## Purpose

Die Arbeitsproben sind bei einem Fotostudio das stärkste Verkaufsargument. Diese Capability
beschreibt, wie die Arbeiten präsentiert und in einer Großansicht erkundet werden können,
ohne dass Tastatur- oder Touch-Nutzer benachteiligt werden.

## ADDED Requirements

### Requirement: Übersicht der Arbeiten

Ein Portfolioabschnitt SHALL die vorhandenen Foto- und Videoarbeiten in einem Raster
darstellen. Jeder Eintrag MUST seine Kategorie erkennen lassen.

#### Scenario: Darstellung auf Desktop
- **WHEN** der Portfolioabschnitt auf einem Viewport ab 1024 Pixel Breite gerendert wird
- **THEN** sind alle konfigurierten Arbeiten sichtbar
- **AND** entsteht kein horizontaler Überlauf der Seite

#### Scenario: Darstellung auf Mobilgerät
- **WHEN** der Portfolioabschnitt auf einem Viewport von 390 Pixel Breite gerendert wird
- **THEN** sind die Arbeiten ein- oder zweispaltig angeordnet
- **AND** ist jede Arbeit ohne Zeigergerät auslösbar

### Requirement: Kennzeichnung von Videoarbeiten

Einträge, hinter denen ein Video liegt, SHALL visuell als Videoarbeit gekennzeichnet sein.
Die Kennzeichnung MUST auch ohne Farbwahrnehmung erkennbar sein.

#### Scenario: Videoeintrag im Raster
- **WHEN** ein Eintrag mit hinterlegtem Video dargestellt wird
- **THEN** trägt er ein Wiedergabesymbol und eine textliche Kennzeichnung
- **AND** benennt sein zugänglicher Name, dass es sich um ein Video handelt

### Requirement: Großansicht für einzelne Arbeiten

Bei Auswahl eines Eintrags SHALL sich eine Großansicht über dem Seiteninhalt öffnen. Fotos
MUST großformatig dargestellt, Videos MUST abspielbar sein.

#### Scenario: Foto in der Großansicht
- **WHEN** der Nutzer einen Fotoeintrag auswählt
- **THEN** öffnet sich die Großansicht mit dem vollständigen Bild
- **AND** wird das Bild nicht über seine Originalauflösung hinaus vergrößert

#### Scenario: Video in der Großansicht
- **WHEN** der Nutzer einen Videoeintrag auswählt
- **THEN** öffnet sich die Großansicht mit dem Video und Bedienelementen
- **AND** startet die Wiedergabe erst durch eine Bedienung des Nutzers

### Requirement: Bedienung und Schließen der Großansicht

Die Großansicht SHALL per Schließen-Schaltfläche, per Escape-Taste und per Auswahl der
Fläche außerhalb des Inhalts geschlossen werden können. Solange sie geöffnet ist, MUST das
Scrollen des dahinterliegenden Seiteninhalts unterbunden sein.

#### Scenario: Schließen per Tastatur
- **WHEN** die Großansicht geöffnet ist und der Nutzer Escape drückt
- **THEN** schließt sich die Großansicht
- **AND** kehrt der Tastaturfokus auf den zuvor ausgewählten Eintrag zurück

#### Scenario: Hintergrund bleibt stehen
- **WHEN** die Großansicht geöffnet ist
- **THEN** verschiebt sich der dahinterliegende Seiteninhalt nicht
- **AND** springt die Seite beim Schließen nicht an eine andere Position

### Requirement: Fokus bleibt in der Großansicht

Solange die Großansicht geöffnet ist, MUST der Tastaturfokus innerhalb der Großansicht
verbleiben. Der dahinterliegende Seiteninhalt MUST für Hilfsmittel als nicht aktiv
gekennzeichnet sein.

#### Scenario: Durchtabben
- **WHEN** der Nutzer bei geöffneter Großansicht wiederholt die Tabulatortaste betätigt
- **THEN** durchläuft der Fokus ausschließlich die Bedienelemente der Großansicht

### Requirement: Blättern zwischen Arbeiten

Sind mehrere Arbeiten vorhanden, SHALL die Großansicht das Wechseln zur vorherigen und
nächsten Arbeit erlauben. Auf Geräten mit Touch-Bedienung MUST das Wechseln zusätzlich per
Wischgeste möglich sein.

#### Scenario: Wechsel per Pfeiltasten
- **WHEN** die Großansicht geöffnet ist und der Nutzer die rechte Pfeiltaste drückt
- **THEN** wird die nächste Arbeit dargestellt
- **AND** wird ein laufendes Video der vorherigen Arbeit angehalten
