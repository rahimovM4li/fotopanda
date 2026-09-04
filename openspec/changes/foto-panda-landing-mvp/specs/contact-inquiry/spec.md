## Purpose

Der Weg vom Interesse zur Anfrage. Beschreibt das Anfrageformular und stellt sicher, dass
ohne angebundenes Backend kein Versanderfolg vorgetäuscht wird und Anfragen nicht
verlorengehen.

## ADDED Requirements

### Requirement: Felder des Anfrageformulars

Das Formular SHALL die Felder Name, Kontaktmöglichkeit (E-Mail oder Telefon), Art der
Anfrage, Nachricht sowie eine Zustimmung zur Datenschutzerklärung enthalten. Name,
Kontaktmöglichkeit, Art der Anfrage und Zustimmung MUST Pflichtangaben sein.

#### Scenario: Formular wird dargestellt
- **WHEN** der Kontaktabschnitt gerendert wird
- **THEN** sind alle genannten Felder vorhanden und mit sichtbarer Beschriftung versehen
- **AND** sind Pflichtfelder als solche gekennzeichnet

### Requirement: Auswahl der Anfrageart

Die Auswahl der Anfrageart SHALL ausschließlich Leistungen anbieten, die Foto Panda
tatsächlich erbringt: Hochzeit, Paar- und Familienshooting, Porträt und Lifestyle,
Business- und Team-Aufnahmen, Gastronomie, Immobilien, Lebendige Medien, Sonstiges.

#### Scenario: Keine unbelegte Leistung in der Auswahl
- **WHEN** die Auswahl der Anfrageart geöffnet wird
- **THEN** enthält sie nur die genannten Einträge

### Requirement: Prüfung der Eingaben vor dem Absenden

Das Formular SHALL die Eingaben vor dem Absenden prüfen und fehlerhafte Felder einzeln
kennzeichnen. Fehlermeldungen MUST dem betroffenen Feld zugeordnet und für Hilfsmittel
lesbar sein.

#### Scenario: Absenden ohne Pflichtangaben
- **WHEN** der Nutzer ohne ausgefüllte Pflichtfelder absendet
- **THEN** wird der Versand nicht ausgelöst
- **AND** ist jedes fehlende Pflichtfeld mit einer Meldung gekennzeichnet
- **AND** erhält das erste fehlerhafte Feld den Tastaturfokus

#### Scenario: Ungültige Kontaktangabe
- **WHEN** die eingegebene Kontaktmöglichkeit weder eine gültige E-Mail-Adresse noch eine
  plausible Telefonnummer ist
- **THEN** wird das Feld als fehlerhaft gekennzeichnet
- **AND** benennt die Meldung, welches Format erwartet wird

#### Scenario: Fehlende Zustimmung
- **WHEN** der Nutzer die Datenschutz-Zustimmung nicht erteilt hat
- **THEN** wird der Versand nicht ausgelöst

### Requirement: Kein vorgetäuschter Versand

Solange kein Empfangsdienst angebunden ist, MUST NOT eine Erfolgsmeldung über einen
erfolgten Versand ausgegeben werden. Das Formular SHALL dem Nutzer stattdessen einen
funktionierenden Weg zur Kontaktaufnahme anbieten.

#### Scenario: Absenden ohne angebundenen Dienst
- **WHEN** der Nutzer ein gültig ausgefülltes Formular absendet und kein Empfangsdienst
  konfiguriert ist
- **THEN** erscheint keine Meldung, die einen erfolgreichen Versand behauptet
- **AND** werden die konfigurierte Telefonnummer und E-Mail-Adresse als direkter Weg
  angeboten
- **AND** bleiben die eingegebenen Daten im Formular erhalten

### Requirement: Vorbereitete Anbindung eines Empfangsdienstes

Die Übergabe der Formulardaten SHALL hinter einer klar abgegrenzten Schnittstelle liegen,
sodass ein späterer Empfangsdienst ohne Änderung an der Darstellung angebunden werden kann.

#### Scenario: Dienst wird später angebunden
- **WHEN** ein Empfangsdienst konfiguriert wird
- **THEN** genügt der Austausch der Übergabefunktion
- **AND** meldet das Formular danach Erfolg und Fehler des tatsächlichen Versands

### Requirement: Erreichbarkeit des Kontaktabschnitts

Jeder Primär-CTA „Jetzt anfragen" SHALL den Nutzer zum Kontaktabschnitt führen. Der
Zielabschnitt MUST vollständig sichtbar positioniert werden und darf nicht vom
Sticky-Header überdeckt werden.

#### Scenario: CTA aus dem Seitenende
- **WHEN** der Nutzer den abschließenden CTA auslöst
- **THEN** wird der Kontaktabschnitt angesteuert
- **AND** ist seine Überschrift vollständig sichtbar
