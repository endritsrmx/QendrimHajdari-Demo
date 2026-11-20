# Dr. Qendrim Hajdari – Website

> **Demo-Deployment:** `.env.production` aktiviert Vorschau-Inhalte und `noindex`. Für den echten Livegang die Datei entfernen bzw. die Variablen im Hosting überschreiben.

Zweisprachige (SQ/EN) Premium-Website für Orthopädie, Unfallchirurgie und Sportmedizin.
Next.js 16 (App Router) · React 19.3 · TypeScript strict · Tailwind CSS 4 · next-intl 4 · GSAP 3 + ScrollTrigger · Lenis · Embla · Cal.com Embed · React Hook Form + Zod.

> **Status:** produktionsnaher Stand. Alle Seiten, Komponenten, Animationen, Buchungs- und Kontaktlogik sind implementiert und getestet.
> Fehlende Kundeninhalte sind sichtbar als `[PLATZHALTER]` markiert → siehe **CONTENT_CHECKLIST.md**.
> Vor dem Livegang: medizinische Freigabe, Rechtsprüfung, Provider-Konfiguration → siehe **DEPLOYMENT.md**.

## Schnellstart

```bash
npm install
cp .env.example .env.local      # für die Kundenvorschau: NEXT_PUBLIC_CONTENT_PREVIEW=true
npm run dev                     # http://localhost:3000  → leitet auf /sq um
```

| Befehl | Zweck |
| --- | --- |
| `npm run dev` | Entwicklungsserver |
| `npm run build && npm start` | Produktions-Build + Server |
| `npm run lint` / `npm run typecheck` | ESLint (Next + React Compiler-Regeln) / TypeScript |
| `npm test` | Vitest + React Testing Library (27 Tests) |
| `npm run test:e2e` | Playwright, Desktop + Mobile (91 Tests). Ohne Playwright-Browser: `PW_CHROME_PATH=/usr/bin/google-chrome npm run test:e2e` |

## Architektur

```
src/
  app/[locale]/…           Seiten (Server Components), lokalisierte URLs via next-intl pathnames
  app/api/contact          Kontakt-API (Zod, Rate-Limit, Honeypot, Time-Trap, Resend)
  app/sitemap.ts, robots.ts, manifest.ts, og-image.png/route.tsx, icon.svg
  proxy.ts                 next-intl Locale-Routing (Next 16: „proxy“ statt „middleware“)
  components/
    animations/            MotionProvider (GSAP-Presets, ScrollTrigger, Lenis), presets.ts
    booking/               BookingFlow (3 Schritte), CalEmbed (offizielles Cal.com React-Embed)
    brand/                 Logo, Monogramm (SVG, Stroke-Reveal)
    home/                  11 Startseiten-Sektionen
    layout/                Header, Footer, PageHero, Cursor, MobileBookingBar, SkipLink, RouteFocus
    navigation/            Fullscreen-Menü, MenuButton, LanguageSwitcher
    forms/, locations/, treatments/, testimonials/, ui/, seo/
  config/                  brand, site, locations, booking, navigation  ← zentrale Konfiguration
  content/                 doctor, treatments, articles, faq, testimonials, legal, home ← Inhalte (CMS-ready)
  i18n/                    routing (URLs), navigation, request
  lib/                     seo, schema (JSON-LD), content-Gating, contact-schema, rate-limit, mailer
messages/sq.json, en.json  UI-Texte (identische Schlüssel, per Test geprüft)
public/fonts               selbst gehostete WOFF2 (SIL OFL 1.1, Lizenzen beigelegt)
public/brand               Wortmarke + Monogramm (hell/dunkel) als SVG
tests/unit, tests/e2e
```

### Lokalisierte URLs
`/sq` · `/sq/rreth-meje` · `/sq/sherbimet` · `/sq/sherbimet/[slug]` · `/sq/klinikat` · `/sq/rezultatet` · `/sq/deshmite` · `/sq/pyetjet` · `/sq/kontakti` · `/sq/rezervo-termin` · `/sq/privatesia` · `/sq/informacione-ligjore` – und die englischen Pendants (`/en/about`, `/en/treatments/acl-injuries` …).
Behandlungs-Slugs sind pro Sprache übersetzt; der Sprachumschalter öffnet die exakte Gegenseite. `/` leitet immer auf Albanisch (Briefing: Albanisch ist Standard).

### Redaktioneller Workflow
Jeder medizinische Inhalt hat `status: draft | needs_medical_review | approved | published`.
- `NEXT_PUBLIC_CONTENT_PREVIEW=true` → alles sichtbar, nicht freigegebene Inhalte mit Badge „Medizinische Prüfung erforderlich“, Seiten auf `noindex`.
- Produktion (`false`) → nur `approved`/`published`; sonst ehrlicher Hinweis statt Text.
Alle medizinischen Texte stehen aktuell auf `needs_medical_review`. **Für den Livegang den Status in `src/content/*.ts` nach ärztlicher Freigabe auf `approved` setzen.**

Für ein späteres Headless CMS: Die Typen in `src/content/types.ts` sind das Schema; Inhalte werden nur über Funktionen in `content/` gelesen und können 1:1 durch API-Abfragen ersetzt werden.

### Motion-System
Presets in `components/animations/presets.ts`, angewendet über Data-Attribute:
`data-reveal="lines|text|fade|image|divider|stagger"`, `data-parallax="30"`, `data-scrub-line="x|y"`.
- Inhalte sind **ohne JavaScript sichtbar**: Vorab-Zustände greifen nur mit `html.motion` (inline gesetzt, nicht bei `prefers-reduced-motion`). CSS-Fallback blendet nach 2,5 s ein, falls JS ausfällt.
- Reveals nutzen nur `opacity`/`transform`/`clip-path`; Inhalte bleiben im Accessibility-Baum.
- Lenis + Parallax nur bei feinem Zeiger und ≥ 1024 px; mobil natives Scrollen.
- Seitenübergänge: React `<ViewTransition>` + View Transitions API (Exit 0,35 s, Enter 0,5 s, leichter Blur gegen Doppelbild beim Crossfade); ohne Browser-Support normale Navigation.
- UI-Interaktionen nach Design-Engineering-Prinzipien: kräftige Custom-Easing-Kurven (`--ease-out: cubic-bezier(.23,1,.32,1)`), `scale(.97)` beim Drücken, Exits schneller als Enters, keine `transition: all`, Hover nur auf Hover-fähigen Geräten (Tailwind 4).

### Referenz medwest.plus
Die Referenz wurde **nicht** im Detail analysiert. Umgesetzt wurde ausschliesslich anhand der Briefing-Beschreibung (Editorial-Layout, Masken-Reveals, Fullscreen-Menü, Carousel, Parallax). Keine fremden Assets, Texte oder Codes übernommen.

## Tests (Stand Übergabe)
- `npm run typecheck` ✓ · `npm run lint` ✓ · `npm run build` ✓ (41 statische Seiten)
- Vitest: 27/27 ✓ – Zod-Schema, Rate-Limit, Content-Gating, Slug-Übersetzung, Message-Key-Parität SQ/EN, keine erfundenen Testimonials/Arztfakten, BookingFlow mit gemocktem Provider (Consent, Loading, Error/Retry, Erfolg nur bei echtem Provider-Event), ContactForm (Validierung, ehrlicher „nicht gesendet“-Zustand, Erfolg), MenuButton (ARIA)
- Playwright: 91/91 ✓ (1 bewusst übersprungen) auf Desktop 1440 px und Pixel 7 – alle Seiten SQ/EN (Status, `lang`, genau ein H1, kein horizontaler Overflow), alle 12 Behandlungsseiten, Root-Redirect, 404 & unbekannte Sprachcodes, Canonical/hreflang/JSON-LD, Sprachwechsel mit Slug-Übersetzung, Menü (Tastatur, Fokusfalle, ESC, Fokus-Rückgabe), Standort-Vorauswahl, Buchung ohne Provider, Kontaktformular, Reduced Motion, Skip-Link, serverseitige Validierung
- Manuell per Screenshot geprüft: 375 / 390 / 768 / 1440 px

Lighthouse-Werte wurden in dieser Umgebung nicht gemessen; Ziele siehe DEPLOYMENT.md.
