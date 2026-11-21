# Freigabe-Checkliste – fehlende Kundeninhalte

Alle Punkte erscheinen auf der Website als sichtbare `[PLATZHALTER]`. Nichts davon wurde erfunden.

## 1. Identität & Recht (Pflicht vor Livegang)
- [ ] Exakte Schreibweise „Qëndrim“ / „Qëndrim“ → `src/config/brand.ts`, `src/content/doctor.ts`, `messages/*.json`
- [ ] Offizielle Berufsbezeichnung / Titel `[OFFICIAL_TITLE_VERIFIED]`
- [ ] `[PROFESSIONAL_LICENSE]`, zuständige Kammer/Behörde
- [ ] `[PRACTICE_LEGAL_ENTITY]`, Adresse, Verantwortlicher für Datenschutz → `src/content/legal.ts`
- [ ] Datenschutzerklärung & rechtliche Hinweise durch Jurist prüfen (Kosovo-Datenschutzgesetz, Gesundheits-/Werberecht; DSGVO soweit anwendbar)
- [ ] Vorhandenes Kundenlogo? (hat Vorrang vor der vorläufigen Wortmarke in `public/brand/`)

## 2. Arzt
- [x] Porträts eingebaut (`public/images/doctor/`, Zuordnung in `src/content/media.ts`): Hero = OP-Porträt, About = weisser Kittel, Teaser = Workshop Knieprothese
- [ ] **Nutzungsrechte** aller gelieferten Fotos bestätigen (Fotograf/Instagram)
- [ ] **Einwilligung der abgebildeten Personen** einholen: Kollegen auf Team-/OP-Fotos, Royal-Medical-Foto; OP-Fotos ohne erkennbare Patientendaten prüfen
- [ ] Bestätigen, dass die Porträts Dr. Hajdari zeigen; optional höher aufgelöste Originale (≥ 2000 px) liefern
- [ ] `[DOCTOR_BIO_APPROVED]` – Biografie SQ + EN → `doctor.bio.text`, Status `approved`
- [ ] Werdegang: Jahre, Universitäten, Stationen (`doctor.career`)
- [ ] `[MEDICAL_QUALIFICATIONS_VERIFIED]`, Weiterbildungen, `[MEMBERSHIPS_VERIFIED]`, `[YEARS_OF_EXPERIENCE_VERIFIED]` (optional)
- [ ] `[LANGUAGES_SPOKEN_VERIFIED]` (FAQ)

## 3. Standorte (je Standort, `src/config/locations.ts` bzw. ENV)
- [ ] Schriftliche Bestätigung der Tätigkeit an Royal Medical und Ortopedia Dora → danach `verified: true` (aktiviert MedicalClinic-Schema)
- [ ] `[ROYAL_MEDICAL_ADDRESS]`, `[DORA_ADDRESS]`
- [ ] `[PHONE_NUMBER]` je Standort + zentral, `[BUSINESS_EMAIL]`
- [ ] `[WORKING_HOURS_BY_LOCATION]` (Tage + Zeiten)
- [ ] Barrierefreiheit (optional)
- [x] Royal Medical: Teamfoto eingebaut
- [x] Ordinanca/Ortopedia Dora: Eingangsfoto eingebaut
- [ ] Offiziellen Praxisnamen klären: Website „Ortopedia Dora“, Schild „Ortopedia Dora“
- [ ] Exakte Google-Maps-Links

## 4. Medizinische Inhalte (Status → `approved`)
- [ ] 6 Behandlungsseiten (`src/content/treatments.ts`) – Texte, Listen, FAQ
- [ ] `[SURGICAL_PROCEDURE_DETAILS_APPROVED]` – welche Eingriffe werden tatsächlich angeboten?
- [ ] Philosophie-Grundsätze (`src/content/home.ts`)
- [ ] 3 Artikel-Teaser (`src/content/articles.ts`)
- [ ] Allgemeine FAQ (`src/content/faq.ts`)
- [ ] Albanische Texte durch Muttersprachler/Fachperson gegenlesen
- [ ] Optional: freigegebene anatomische Illustrationen statt der schematischen Line-Art

## 5. Buchung & Kontakt
- [ ] `[BOOKING_PROVIDER_ACCOUNT]` – Cal.com-Account, je Standort ein Event-Typ (siehe DEPLOYMENT.md)
- [ ] Auftragsverarbeitungsvertrag mit Cal.com, Hinweise zum Drittlandtransfer
- [ ] E-Mail-Provider (Resend) + verifizierte Absenderdomain, Empfängeradresse
- [ ] Aufbewahrungs-/Löschfristen festlegen (Kontaktanfragen, Buchungen)

## 6. Nur mit Freigabe
- [ ] `[PATIENT_TESTIMONIAL_APPROVED]` – nur echte Stimmen mit dokumentierter Einwilligung (`consentReference`), dann `NEXT_PUBLIC_TESTIMONIALS_PUBLISHED=true`
- [ ] Results-Seite – nur nach medizinischer, rechtlicher und datenschutzrechtlicher Freigabe, dann `NEXT_PUBLIC_RESULTS_PUBLISHED=true`
- [ ] Optionales Footer-Loop-Video – nur lizenzfrei, komprimiert, mit Poster (aktuell nicht eingebaut)
