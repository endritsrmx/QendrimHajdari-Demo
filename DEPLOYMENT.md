# Deployment

## Vercel (empfohlen)
1. Repository importieren → Framework „Next.js“ wird erkannt. Node ≥ 20.9.
2. Environment Variables aus `.env.example` setzen (Production + Preview getrennt):
   - Production: `NEXT_PUBLIC_SITE_URL=https://<domain>`, `NEXT_PUBLIC_CONTENT_PREVIEW=false`, `ENABLE_HSTS=true`
   - Preview (Kundenabnahme): `NEXT_PUBLIC_CONTENT_PREVIEW=true`
   - `robots.txt` erlaubt Indexierung nur bei `VERCEL_ENV=production` (anderswo `ALLOW_INDEXING=true`).
3. Deploy. Alle Seiten werden statisch generiert und über das CDN ausgeliefert; nur `/api/contact` läuft serverseitig.

## Domain
- Domain in Vercel → Settings → Domains hinzufügen, DNS beim Registrar: `A @ 76.76.21.21` und `CNAME www cname.vercel-dns.com` (Werte im Vercel-Dashboard prüfen).
- HTTPS-Zertifikat stellt Vercel automatisch aus; HTTP/2 und HTTP/3 sind aktiv.
- Erst wenn HTTPS stabil läuft: `ENABLE_HSTS=true` (setzt `max-age=2 Jahre; includeSubDomains; preload`).
- Andere Hosts: `npm run build && npm start` hinter einem Reverse Proxy mit TLS. `/_next/static` und `/fonts` sind immutable cachebar.

## Online-Buchung (Cal.com)
1. Cal.com-Account der Praxis anlegen (oder Team). **Termine vergibt ausschliesslich die Praxis.**
2. Je Standort einen Event-Typ „Orthopaedic Consultation“ anlegen, z. B. `consultation-prishtina` und `consultation-gjilan`.
   - Zeitzone **Europe/Belgrade** (Kosovo: MEZ/MESZ inkl. Sommerzeit)
   - Verfügbarkeiten je Standort als eigener Zeitplan; Kalender verbinden (Google/Outlook) → Doppelbuchungen werden vom Provider verhindert
   - Buchungsfragen minimal halten: Name, E-Mail, ggf. Telefon. **Keine Diagnose-/Gesundheitsfelder.**
   - Optional: Bestätigungspflicht („Requires confirmation“), Mindestvorlauf, Pufferzeiten, Limits gegen Missbrauch
   - Location des Event-Typs = Praxisadresse
3. ENV setzen:
   ```
   NEXT_PUBLIC_CALCOM_LINK_ROYAL_MEDICAL=<username>/consultation-prishtina
   NEXT_PUBLIC_CALCOM_LINK_DORA=<username>/consultation-gjilan
   ```
   Self-hosted Cal.com: zusätzlich `NEXT_PUBLIC_CALCOM_ORIGIN`, `NEXT_PUBLIC_CALCOM_EMBED_ORIGIN`, `NEXT_PUBLIC_CALCOM_EMBED_JS_URL` (die CSP übernimmt diese Origins automatisch).
4. Ablauf auf der Website: Standort → Terminart → Datenschutzhinweis (Embed lädt **erst nach Klick**) → echte Slots, Kontaktdaten, Bestätigung und Kalender-/E-Mail-Benachrichtigung durch Cal.com. Die Erfolgsmeldung der Website erscheint nur nach dem echten `bookingSuccessfulV2`-Event.
5. Ohne Link zeigt die Website ehrlich „Online-Buchung noch nicht verbunden“ und verweist auf das Kontaktformular.
6. Sprache: Der Embed erhält `locale`; Cal.com unterstützt Albanisch derzeit ggf. nicht vollständig – dann erscheint die Provider-Oberfläche auf Englisch.
7. Weitere Terminarten: Eintrag in `src/config/booking.ts` (`appointmentTypes`) + Übersetzungen ergänzen.
8. Echte End-to-End-Buchungstests nur mit einem separaten Test-Event-Typ durchführen.

## Kontaktformular
```
CONTACT_EMAIL_PROVIDER=resend
RESEND_API_KEY=…
CONTACT_TO_EMAIL=praxis@domain
CONTACT_FROM_EMAIL="Website <website@domain>"   # Domain bei Resend verifizieren (SPF/DKIM)
```
Ohne Konfiguration antwortet die API mit 503 und das Formular sagt klar, dass **nichts** gesendet wurde.
Schutz: Zod-Validierung client- & serverseitig, Honeypot, Time-Trap (≥ 3 s), Same-Origin-Check, Body-Limit, Rate-Limit 5/10 min/IP.
**Hinweis:** Das Rate-Limit ist In-Memory pro Instanz. Für Serverless mit mehreren Instanzen `src/lib/rate-limit.ts` auf einen geteilten Store (z. B. Upstash Redis) umstellen.

## Sicherheit
Header in `next.config.ts`: CSP (nur `self` + Cal.com), `X-Frame-Options: DENY`, `frame-ancestors 'none'`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`, COOP, optional HSTS.
`script-src` enthält `'unsafe-inline'`, weil statisch generierte Next.js-Seiten Inline-Bootstrap-Skripte benötigen. Eine Nonce-basierte CSP ist möglich (Next-Doku „Content Security Policy“), macht aber alle Seiten dynamisch.
Keine Secrets im Client: Nur `NEXT_PUBLIC_*` gelangt in den Browser; Mail-Keys sind serverseitig (`server-only`).
Kein Tracking, keine Analytics-Cookies → kein Consent-Banner nötig. Wird später Monitoring/Analytics ergänzt, vorher rechtlich prüfen und ggf. Consent einbauen.

## Vor dem Livegang
- [ ] CONTENT_CHECKLIST.md abgearbeitet, medizinische Inhalte auf `approved`
- [ ] Rechtsprüfung Datenschutz/Impressum/Werberecht
- [ ] `npm run lint && npm run typecheck && npm test && npm run build && npm run test:e2e`
- [ ] Lighthouse (mobil) auf der Produktionsdomain: Ziele Performance ≥ 90, A11y ≥ 95, Best Practices ≥ 95, SEO ≥ 95; CWV: LCP ≤ 2,5 s, INP ≤ 200 ms, CLS ≤ 0,1. Echte Fotos über `next/image` (AVIF/WebP, `priority` für das Hero-Porträt) einbinden.
- [ ] Sitemap in der Google Search Console einreichen (`/sitemap.xml`)
