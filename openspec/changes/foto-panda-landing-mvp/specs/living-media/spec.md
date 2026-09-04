## Purpose

Das Kernerlebnis der Website: Ein Besucher sieht ein Foto, tippt darauf, und das Foto wird
zum Video. Diese Capability definiert das Zustandsmodell und das beobachtbare Verhalten
dieser Interaktion, damit das Versprechen „lebendige Medien" auf der Seite selbst erfahrbar
wird statt nur beschrieben zu sein.

## ADDED Requirements

### Requirement: Kein Autoplay beim Seitenaufruf

Beim initialen Laden einer Route MUST NOT ein Video automatisch starten. Jede
Foto-zu-Video-Einheit SHALL zunächst ausschließlich ihr Poster-Foto darstellen.

#### Scenario: Zustand direkt nach dem Laden
- **WHEN** die Startseite geladen wurde und der Nutzer nichts betätigt hat
- **THEN** zeigt jede Foto-zu-Video-Einheit ihr Poster-Foto
- **AND** wird kein Video abgespielt und keine Tonausgabe erzeugt

#### Scenario: Videodaten werden vorab nicht geladen
- **WHEN** eine Foto-zu-Video-Einheit im Poster-Zustand ist
- **THEN** lädt der Browser die Videodatei nicht vollständig herunter
- **AND** wird höchstens die Metadatenmenge des Videos angefordert

### Requirement: Erkennbare Aufforderung zur Interaktion

Jede Foto-zu-Video-Einheit SHALL im Poster-Zustand eine sichtbare Bedienfläche mit
Wiedergabesymbol und einem erklärenden Hinweistext anzeigen, der ankündigt, dass das Foto
zum Video wird.

#### Scenario: Hinweis ist vorhanden und bedienbar
- **WHEN** eine Foto-zu-Video-Einheit im Poster-Zustand dargestellt wird
- **THEN** ist eine Bedienfläche mit Wiedergabesymbol sichtbar
- **AND** trägt sie einen zugänglichen Namen, der Titel und Absicht der Aktion benennt
- **AND** ist sie per Tastatur fokussierbar und mit Enter oder Leertaste auslösbar

### Requirement: Übergang vom Foto zum Video

Bei Aktivierung SHALL die Einheit vom Poster zum Video wechseln. Der Wechsel MUST als
weicher Übergang erfolgen und MUST NOT die Höhe oder Breite des umgebenden Bereichs
verändern.

#### Scenario: Aktivierung durch Klick oder Tippen
- **WHEN** der Nutzer die Bedienfläche oder das Poster betätigt
- **THEN** beginnt die Wiedergabe des zugeordneten Videos
- **AND** wird das Poster überblendet statt hart ersetzt
- **AND** bleiben die Abmessungen des Medienbereichs unverändert

#### Scenario: Wiedergabe bleibt im Seitenlayout
- **WHEN** die Wiedergabe auf einem Mobilgerät startet
- **THEN** läuft das Video innerhalb der Seite
- **AND** wird kein automatischer Vollbildmodus des Browsers erzwungen

### Requirement: Rückmeldung während des Ladens

Zwischen Aktivierung und erstem darstellbaren Videobild SHALL die Einheit eine sichtbare
Ladeanzeige zeigen. Das Poster MUST währenddessen sichtbar bleiben.

#### Scenario: Verzögerter Start
- **WHEN** das Video nach der Aktivierung noch nicht abspielbereit ist
- **THEN** wird eine Ladeanzeige eingeblendet
- **AND** bleibt das Poster als Hintergrund sichtbar
- **AND** verschwindet die Ladeanzeige, sobald die Wiedergabe beginnt

### Requirement: Verhalten im Fehlerfall

Kann das Video nicht geladen oder nicht abgespielt werden, SHALL die Einheit in den
Poster-Zustand zurückkehren und einen verständlichen Hinweis mit Wiederholmöglichkeit
anzeigen. Ein leerer oder schwarzer Bereich MUST NOT zurückbleiben.

#### Scenario: Video nicht ladbar
- **WHEN** das Laden oder Abspielen des Videos fehlschlägt
- **THEN** wird wieder das Poster angezeigt
- **AND** erscheint ein kurzer Hinweis, dass das Video derzeit nicht abspielbar ist
- **AND** kann der Nutzer die Wiedergabe erneut auslösen

### Requirement: Pausieren und Zurücksetzen

Während der Wiedergabe SHALL der Nutzer pausieren und fortsetzen können. Nach Ende des
Videos SHALL die Einheit in einen Endzustand wechseln, aus dem heraus die Wiedergabe
erneut gestartet werden kann.

#### Scenario: Pausieren
- **WHEN** der Nutzer während der Wiedergabe die Pausefunktion auslöst
- **THEN** hält das Video an der aktuellen Stelle an
- **AND** ist eine Bedienfläche zum Fortsetzen sichtbar

#### Scenario: Video zu Ende
- **WHEN** das Video sein Ende erreicht
- **THEN** wechselt die Einheit in den Endzustand
- **AND** ist erneutes Abspielen mit einer Bedienung möglich

### Requirement: Ton nur nach bewusster Aktivierung

Ton MUST NOT ohne vorherige Nutzerinteraktion wiedergegeben werden. Verfügt ein Video über
eine Tonspur, SHALL eine Bedienfläche zum Stummschalten und Aufheben der Stummschaltung
vorhanden sein.

#### Scenario: Tonsteuerung vorhanden
- **WHEN** ein Video mit Tonspur wiedergegeben wird
- **THEN** ist eine Bedienfläche für den Ton vorhanden und beschriftet
- **AND** ist der aktuelle Tonzustand für den Nutzer erkennbar

### Requirement: Handlungsaufforderung nach dem Erlebnis

Nach dem Start der Wiedergabe SHALL innerhalb der Medieneinheit der Primär-CTA
„Jetzt anfragen" eingeblendet werden. Die Einblendung MUST verzögert erfolgen, damit sie
den Beginn des Videos nicht überdeckt, und MUST NOT den Videoinhalt dauerhaft verdecken.

#### Scenario: CTA erscheint während der Wiedergabe
- **WHEN** das Video mindestens 1,5 Sekunden gelaufen ist
- **THEN** wird der CTA „Jetzt anfragen" innerhalb der Medieneinheit sichtbar
- **AND** führt seine Auslösung zum Kontaktabschnitt

#### Scenario: CTA im Endzustand
- **WHEN** das Video zu Ende gelaufen ist
- **THEN** bleibt der CTA „Jetzt anfragen" erreichbar

### Requirement: Nur eine aktive Wiedergabe

Es MUST zu jedem Zeitpunkt höchstens eine Foto-zu-Video-Einheit gleichzeitig abspielen.
Startet der Nutzer eine weitere Einheit, SHALL die zuvor laufende pausiert werden.

#### Scenario: Zweite Einheit wird gestartet
- **WHEN** eine Einheit abspielt und der Nutzer eine andere Einheit aktiviert
- **THEN** pausiert die zuvor laufende Einheit
- **AND** spielt ausschließlich die neu aktivierte Einheit

### Requirement: Videos außerhalb des Sichtbereichs

Foto-zu-Video-Einheiten unterhalb des ersten Bildschirms SHALL ihre Videodaten erst
anfordern, wenn sie in den Sichtbereich gelangen oder aktiviert werden.

#### Scenario: Seite mit mehreren Einheiten
- **WHEN** die Startseite mit mehreren Foto-zu-Video-Einheiten geladen wird
- **THEN** werden beim ersten Laden keine Videodateien der unteren Einheiten übertragen
