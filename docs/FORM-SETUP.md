# Kontaktformular — Web3Forms

Implementiert am 29.10.2026. Die Verbindung ist vorbereitet, aber noch nicht aktiviert:
Ein bestätigter Web3Forms-Formularschlüssel des Kunden fehlt. Es wurde keine echte
Testnachricht verschickt und kein Eingang im Kundenpostfach bestätigt.

## Freischaltung durch den Kunden

1. https://app.web3forms.com öffnen und mit `Qadriddin_Odinaev_01@web.de` anmelden.
2. Die E-Mail-Verifizierung im eigenen Postfach abschließen und ein Formular für Foto Panda erstellen.
3. Als Benachrichtigungsempfänger `Qadriddin_Odinaev_01@web.de` prüfen.
4. Nur den **Access Key des Formulars** an den Entwickler weitergeben, kein Passwort oder Login-Link.
5. Im Dashboard die Aufbewahrungsdauer prüfen und möglichst kurz einstellen. Die Datenschutzerklärung entsprechend der tatsächlichen Konfiguration aktualisieren.

Der Schlüssel bestimmt den Empfänger; eine Adresse im Frontend allein kann diese
Zuordnung nicht herstellen. Der Form Access Key ist für den Browser bestimmt.

## Konfiguration

`.env.example` nach `.env.local` kopieren und setzen:

```dotenv
VITE_WEB3FORMS_ACCESS_KEY=FORMULARSCHLUESSEL_DES_KUNDEN
```

Auch in der Build-Umgebung des Hosters setzen. Danach Entwicklungsserver neu starten
bzw. `npm run build` ausführen und den neuen Build veröffentlichen.
Ohne Schlüssel bleibt der Versand ehrlich als E-Mail-Entwurf gekennzeichnet;
der mailto-Ausweg adressiert die Kundenadresse. Die öffentlichen Geschäftskontaktdaten
bleiben unverändert.

## Verhalten und Prüfung

- HTTPS-POST erst nach Absenden, keine externen Skripte.
- Name, Kontakt, Thema, optionale Nachricht, Zustimmung und Sprache werden übertragen.
- E-Mail als Reply-to über `email`; bei Telefonnummer kein erfundener E-Mail-Absender.
- Verstecktes Honeypot-Feld, Anbieter-Spamfilter; kein CAPTCHA eingerichtet.
- Während des Versands sind Eingaben gesperrt; identische erneute Sendung nach Erfolg
  erst nach Änderung möglich. Kein automatischer Retry bei unklarem Versandstatus.
- Erfolg nur bei erfolgreichem HTTP-Status **und** `success === true`.
- Fehler, Limit und Zeitüberschreitung auf DE/RU; Eingaben bleiben bestehen.
- `node tests/inquiry.test.mjs`: isolierte Transporttests ohne echte E-Mail.
- `npm run build`, `npm run lint`, `npm run check`, `npm run check:i18n`.

Nach Aktivierung je eine klar gekennzeichnete DE/RU-Testanfrage absenden. Der Kunde
muss den Eingang (ggf. Spamordner) sowie die Antwortfunktion bestätigen. Eine
API-Erfolgsmeldung allein bestätigt nicht die Zustellung im Posteingang.

## Quellen

- https://docs.web3forms.com/getting-started/api-reference
- https://web3forms.com/privacy
- https://web3forms.com/pricing

## Verifiziert am 29.10.2026

Build, ESLint, Inhaltsprüfung und Übersetzungsprüfung erfolgreich (527 Übersetzungen).
Browserprüfung mit abgefangenen API-Anfragen: Deutsch/Russisch bei 390 und 1440 px,
Validierung und Fokus, gesperrte Eingaben während Versand, Erfolg, Fehler, Rate-Limit,
Netzwerkausfall, Eingabeerhalt und keine horizontale Überbreite. 16 simulierte
API-Anfragen, keine echten Nachrichten. Axe: keine Befunde innerhalb des Formulars.
Ein zusätzlicher Ganzseitenscan meldete bestehende Abweichungen zwischen sichtbarem
Text und zugänglichem Namen bei Sprachschalter und Markenlink außerhalb des Formulars.
Die Vorschau ohne Schlüssel zeigt weiterhin „E-Mail vorbereiten“.
