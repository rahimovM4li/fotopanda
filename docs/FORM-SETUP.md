# Kontaktformular — Web3Forms

Aktueller Stand (01.11.2026): Der öffentliche Formularschlüssel ist auf Wunsch des
Auftraggebers direkt in `src/config/siteConfig.ts` hinterlegt. Für den Formularversand
ist keine Vercel-Umgebungsvariable mehr erforderlich. Der Eingang im Kundenpostfach
ist weiterhin durch einen Live-Test nach dem Deployment zu bestätigen.

## Freischaltung durch den Kunden

1. https://app.web3forms.com öffnen und mit `Qadriddin_Odinaev_01@web.de` anmelden.
2. Die E-Mail-Verifizierung im eigenen Postfach abschließen und ein Formular für Foto Panda erstellen.
3. Als Benachrichtigungsempfänger `Qadriddin_Odinaev_01@web.de` prüfen.
4. Nur den **Access Key des Formulars** an den Entwickler weitergeben, kein Passwort oder Login-Link.
5. Im Dashboard die Aufbewahrungsdauer prüfen und möglichst kurz einstellen. Die Datenschutzerklärung entsprechend der tatsächlichen Konfiguration aktualisieren.

Der Schlüssel bestimmt den Empfänger; eine Adresse im Frontend allein kann diese
Zuordnung nicht herstellen. Der Form Access Key ist für den Browser bestimmt.

## Konfiguration

Der Formularschlüssel steht unter `inquiryAccessKey` in `src/config/siteConfig.ts`.
Änderungen dort mit `npm run build` neu bauen und veröffentlichen. Vorhandene Werte
von `VITE_WEB3FORMS_ACCESS_KEY` werden nicht mehr gelesen und beeinflussen den Build
nicht. Die bisherigen Prüfprotokolle unten dokumentieren den früheren Stand mit
Umgebungsvariable; diese Einrichtungsschritte sind überholt.

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

## Aktivierungsprüfung am 30.10.2026

Produktionsbuild und isolierte Transporttests erfolgreich. Ein echter Browser-Test
über http://127.0.0.1:4173 wurde versucht. Web3Forms/Cloudflare lehnt bereits den
CORS-Preflight mit HTTP 403 ab; die Antwort nennt die Beschränkung auf clientseitige
API-Nutzung bzw. kostenpflichtige Server-IP-Freigabe. Dadurch wurde der eigentliche
Formular-POST vom Browser nicht ausgeführt. Keine Zustellung bestätigt. Die UI zeigt
den Verbindungsfehler korrekt und erhält die Eingaben. Keine automatische Wiederholung.

Nach Veröffentlichung aus einem normalen Besucherbrowser prüfen. Falls dieselbe
Ablehnung auftritt, Web3Forms-Support mit dem Fehler kontaktieren. Der Schlüssel muss
bei einem externen Build weiterhin als VITE_WEB3FORMS_ACCESS_KEY gesetzt werden;
`.env.local` ist absichtlich nicht versioniert.

## Live-Prüfung am 01.11.2026

https://www.fotopandastudio.de/ ist auf Vercel erreichbar (HTTP 200).
Direktaufruf von /kontakt ergibt HTTP 404; Navigation innerhalb der React-App funktioniert.
`vercel.json` mit dem von Vercel dokumentierten SPA-Rewrite auf /index.html ergänzt.
Die Datei muss im Projektstamm mit deployed werden.

Das veröffentlichte Kontaktformular zeigt „E-Mail vorbereiten“: Der Build enthält
keinen Formularschlüssel. In Vercel unter Project → Settings → Environment Variables
`VITE_WEB3FORMS_ACCESS_KEY` mit dem vorhandenen Formularschlüssel für Production setzen,
anschließend einen neuen Build/Deployment auslösen. Eine lokale .env.local wird durch
Git nicht übertragen. Erst danach echten Versand prüfen; bei dieser Prüfung wurde
keine Nachricht versendet.
