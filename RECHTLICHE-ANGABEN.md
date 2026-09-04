# Offene Angaben vor dem Livegang

Diese Liste sammelt alles, was noch beim Auftraggeber liegt. Die Website ist ohne diese
Angaben vollständig lauffähig, aber **nicht freigabefähig**: Eine deutsche Geschäftsseite
ohne vollständiges Impressum ist abmahnfähig.

Alle Werte werden an genau einer Stelle eingetragen: `src/config/siteConfig.ts`.
Sobald `legalName`, `street` und `postalCode` gesetzt sind, verschwinden die Warnhinweise
auf `/impressum` und `/datenschutz` von selbst.

## Blockierend für den Livegang

| Feld in `siteConfig.legal` | Bedeutung | Status |
|---|---|---|
| `legalName` | Vollständige Firmierung, wie sie im Gewerbe- oder Handelsregister steht | offen |
| `representative` | Vertretungsberechtigte Person (Vor- und Nachname) | offen |
| `street` | Straße und Hausnummer der ladungsfähigen Anschrift | offen |
| `postalCode` | Postleitzahl | offen |
| `vatId` | USt-IdNr. nach § 27a UStG, falls vorhanden. Kleinunternehmer nach § 19 UStG tragen hier nichts ein, sollten das aber bestätigen | offen |

Ergänzend in der Datenschutzerklärung (`src/pages/Datenschutz.tsx`):

- **Hosting-Anbieter und Speicherdauer der Server-Logfiles.** Steht erst fest, wenn das
  Hosting gewählt ist.

## Nicht blockierend, aber empfohlen

| Punkt | Warum | Status |
|---|---|---|
| Logo als Vektordatei (SVG oder EPS) | Die Bildmarke ist nach der vom Kunden gezeigten Vorlage in `src/components/brand/PandaMark.tsx` als SVG nachgezeichnet, weil die Originaldatei nicht vorliegt. Sobald sie da ist, wird nur diese eine Komponente ersetzt; Kopfzeile, Fußzeile, Menü, Buchdeckel und Favicon hängen alle daran. Der Schriftzug bleibt gesetzt, solange keine Vektorfassung der Typografie vorliegt | offen, Nachzeichnung im Einsatz |
| YouTube-Kanal-URL | Die PDF nennt nur den Kanalnamen „Foto Panda". Ein Kanalname ist keine Adresse, deshalb wird der Eintrag derzeit nicht ausgegeben. URL in `siteConfig.social` eintragen und der Link erscheint | offen |
| Originalvideos ohne WhatsApp-Kompression | Alle sechs Videos liegen nur mit maximal 576 Pixel Breite vor. Ablauf zum Austausch steht im Kopf von `scripts/prepare-assets.mjs` | offen |
| Foto des Fotografen oder Teams | Der Über-uns-Abschnitt kommt bewusst ohne Personenbild aus, weil keines vorliegt | offen |
| Empfänger für Formularanfragen | Ohne Empfänger meldet das Formular keinen Versand, sondern bietet Telefon und E-Mail an. Adresse in `siteConfig.inquiryEndpoint` eintragen, dann funktioniert der Versand ohne weitere Änderung | offen |

## Bestätigte Angaben

Diese Werte sind eingetragen und geprüft:

- Marke: Foto Panda
- Tagline: Fotos. Videos. Erlebnisse.
- Domain: `https://fotopandastudio.de`
- E-Mail: `info@fotopandastudio.de`
- Telefon: `+49 176 41799016`
- Ort: Osnabrück, Deutschland
- Instagram: `fotopanda.de`
- TikTok: `fotopanda.de`

## Kein Cookie-Banner

Bewusste Entscheidung, keine Auslassung. Die Seite lädt zur Laufzeit nichts von fremden
Servern: Schriften sind lokal gebündelt, Bilder und Videos liegen auf demselben Host, es
gibt keine Analyse, kein Tracking, keine Cookies und keinen Zugriff auf den lokalen
Speicher. Damit besteht nichts, wofür eine Einwilligung nach § 25 TDDG einzuholen wäre.

Diese Grundlage ändert sich, sobald ein Analysewerkzeug, eine eingebettete Karte, ein
Videoportal oder ein Social-Media-Widget hinzukommt. Dann ist die Datenschutzerklärung
anzupassen und ein Einwilligungsbanner nötig.
