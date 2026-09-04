## Purpose

Definiert die inhaltlichen Abschnitte der Landingpage und was ein Besucher aus jedem davon
mitnehmen soll. Legt fest, welche Aussagen die Seite treffen darf und welche
Marketingversprechen aus dem PDF-Entwurf bewusst entfallen.

## ADDED Requirements

### Requirement: Hero erklärt Angebot und nächsten Schritt

Der erste sichtbare Bereich SHALL Markenpositionierung, Nutzenversprechen und die nächste
Handlung vermitteln. Er MUST eine Hauptüberschrift, einen erläuternden Untertitel, den
Primär-CTA „Jetzt anfragen", einen Sekundär-CTA zu den Arbeiten sowie eine
Foto-zu-Video-Einheit enthalten.

#### Scenario: Hero auf Desktop
- **WHEN** die Startseite auf einem Viewport ab 1024 Pixel Breite geladen wird
- **THEN** stehen Text und Medienbereich nebeneinander
- **AND** sind Überschrift, beide CTAs und das Poster ohne Scrollen sichtbar

#### Scenario: Hero auf Mobilgerät
- **WHEN** die Startseite auf einem Viewport von 390 Pixel Breite geladen wird
- **THEN** erscheinen zuerst Überschrift und Untertitel, danach die Foto-zu-Video-Einheit,
  danach die CTAs
- **AND** ist die Überschrift vollständig lesbar und nicht abgeschnitten

### Requirement: Keine unbelegten Erfolgsversprechen

Die Website MUST NOT Aussagen über Umsatzsteigerung, Kundenzuwachs oder garantierte
Ergebnisse treffen. Die Formulierungen „Mehr Umsatz", „Umsatz verdoppeln" und
gleichbedeutende Zusagen MUST NOT vorkommen.

#### Scenario: Gastronomieabschnitt
- **WHEN** der Abschnitt zur Gastronomie gerendert wird
- **THEN** benennt er Wirkung und Nutzen der Videopräsentation
- **AND** enthält er keine Zusage zu Umsatz oder Bestellzahlen

### Requirement: Keine Inhalte aus der verworfenen Konzeptphase

Die Website MUST NOT QR-Code-Grafiken, Aufforderungen zum Scannen, App-Store-Schaltflächen
oder Verweise auf eine mobile Anwendung enthalten, da kein solches Produkt bestätigt ist.

#### Scenario: Seite enthält keinen Scan-Aufruf
- **WHEN** eine beliebige Route gerendert wird
- **THEN** enthält der sichtbare Text keine Aufforderung zum Scannen eines QR-Codes
- **AND** ist keine App-Store- oder Google-Play-Schaltfläche vorhanden

### Requirement: Abschnitt „Lebendige Produkte"

Ein Abschnitt SHALL das Prinzip der lebendigen Medien anhand des vorhandenen Materials
zeigen. Er MUST mindestens eine Foto-zu-Video-Einheit enthalten und das Prinzip in einer
kurzen Erläuterung benennen, ohne den technischen Auslösemechanismus zu behaupten.

#### Scenario: Fotoalbum-Demonstration
- **WHEN** der Abschnitt „Lebendige Produkte" dargestellt wird
- **THEN** ist die Fotoalbum-Aufnahme als Foto-zu-Video-Einheit vorhanden
- **AND** erklärt eine kurze Erläuterung, dass aus Foto und Video ein Erlebnis entsteht

### Requirement: Leistungsabschnitt bildet nur belegte Kategorien ab

Der Leistungsabschnitt SHALL ausschließlich Kategorien darstellen, für die Material
vorliegt: Hochzeiten und Paare, Porträt und Lifestyle, Business- und Team-Aufnahmen,
Gastronomie, Immobilien. Weitere Kategorien MUST NOT dargestellt werden.

#### Scenario: Keine leere Kategorie
- **WHEN** der Leistungsabschnitt gerendert wird
- **THEN** besitzt jede dargestellte Kategorie mindestens ein zugeordnetes Medium
- **AND** wird keine Kategorie ohne Medium angezeigt

### Requirement: Abschnitt für Geschäftskunden

Ein eigener Abschnitt SHALL Foto Panda für Unternehmen positionieren und die belegten
Anwendungsfälle Gastronomie, Immobilien sowie Unternehmens- und Team-Darstellung zeigen.

#### Scenario: Geschäftskundenabschnitt
- **WHEN** der Abschnitt für Geschäftskunden gerendert wird
- **THEN** sind die drei belegten Anwendungsfälle mit jeweils eigenem Medium dargestellt
- **AND** ist mindestens einer davon als Foto-zu-Video-Einheit erlebbar

### Requirement: Vierstufiger Ablauf ohne Scan-Schritt

Ein Abschnitt SHALL den Ablauf in vier nummerierten Schritten darstellen: Fotografieren,
Video erstellen, Verbinden, Erleben. Ein Schritt zum Scannen eines QR-Codes MUST NOT
enthalten sein.

#### Scenario: Ablaufdarstellung auf Desktop
- **WHEN** der Abschnitt auf einem Viewport ab 1024 Pixel Breite gerendert wird
- **THEN** stehen die vier Schritte nebeneinander in aufsteigender Nummerierung
- **AND** lautet der vierte Schritt „Erleben"

#### Scenario: Ablaufdarstellung auf Mobilgerät
- **WHEN** der Abschnitt auf einem Viewport unter 768 Pixel Breite gerendert wird
- **THEN** stehen die vier Schritte untereinander in derselben Reihenfolge

### Requirement: Abschnitt „Warum Foto Panda"

Ein Abschnitt SHALL vier bis sechs Gründe für Foto Panda benennen. Jeder Grund MUST aus
einer kurzen Überschrift und einem erläuternden Satz bestehen und MUST ohne Zahlen,
Auszeichnungen oder Referenzen auskommen, die nicht belegt sind.

#### Scenario: Gründe sind belegfrei formuliert
- **WHEN** der Abschnitt gerendert wird
- **THEN** enthält kein Grund eine Kundenzahl, Bewertung oder Auszeichnung

### Requirement: Abschnitt „Über uns" ohne erfundene Personen

Ein kurzer Abschnitt SHALL Haltung und Arbeitsweise von Foto Panda beschreiben. Solange
kein Foto des Fotografen oder Teams vorliegt, MUST NOT eine Person als Team dargestellt
werden.

#### Scenario: Kein Teamfoto vorhanden
- **WHEN** der Abschnitt „Über uns" gerendert wird und kein Teamfoto konfiguriert ist
- **THEN** wird kein Personenbild als Team ausgegeben
- **AND** trägt der Abschnitt seine Aussage über Text und Arbeitsbeispiele

### Requirement: Abschließender Handlungsaufruf

Am Seitenende SHALL ein visuell abgesetzter Abschnitt mit dunklem Hintergrund, einer
Abschlussüberschrift und dem Primär-CTA „Jetzt anfragen" stehen.

#### Scenario: Abschluss-CTA führt zum Kontakt
- **WHEN** der Nutzer den abschließenden CTA auslöst
- **THEN** gelangt er zum Kontaktabschnitt
- **AND** ist das erste Formularfeld erreichbar

### Requirement: Einheitliches CTA-System

Der Primär-CTA SHALL durchgängig „Jetzt anfragen" lauten und MUST im Header, im Hero, in
der Foto-zu-Video-Einheit nach der Aktivierung, im mittleren Seitenbereich sowie im
Abschluss vorkommen. Andere Beschriftungen für den Primär-CTA MUST NOT verwendet werden.

#### Scenario: Beschriftung ist konsistent
- **WHEN** die Startseite gerendert wird
- **THEN** tragen alle Primär-CTAs identisch die Beschriftung „Jetzt anfragen"

### Requirement: Überschriftenhierarchie und Sprache

Jede Route SHALL genau eine Überschrift erster Ordnung besitzen, und Abschnittsüberschriften
MUST der Hierarchie ohne Auslassung folgen. Alle sichtbaren Texte der Hauptseite SHALL auf
Deutsch verfasst sein.

#### Scenario: Struktur der Startseite
- **WHEN** die Startseite gerendert wird
- **THEN** existiert genau eine Überschrift erster Ordnung
- **AND** beginnt jeder Hauptabschnitt mit einer Überschrift zweiter Ordnung
