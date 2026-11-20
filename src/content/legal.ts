import type { Localized } from './types';

/**
 * DRAFT legal templates – must be reviewed by a lawyer (Kosovo Law on Personal Data Protection;
 * GDPR where applicable; rules on health services and professional advertising) before launch.
 */
export interface LegalSection {
  title: Localized;
  body: Localized<string[]>;
}

export const privacySections: LegalSection[] = [
  {
    title: { sq: 'Përgjegjësi për përpunimin', en: 'Data controller' },
    body: {
      sq: ['[CONTROLLER_NAME_AND_ADDRESS] · [BUSINESS_EMAIL] · [PHONE_NUMBER]'],
      en: ['[CONTROLLER_NAME_AND_ADDRESS] · [BUSINESS_EMAIL] · [PHONE_NUMBER]'],
    },
  },
  {
    title: { sq: 'Vizita në faqe', en: 'Visiting this website' },
    body: {
      sq: [
        'Gjatë vizitës, serveri i hostimit përpunon të dhëna teknike (p.sh. adresa IP, koha e qasjes, shfletuesi) për të ofruar faqen në mënyrë të sigurt. [HOSTING_PROVIDER] · [RETENTION_PERIOD_LOGS]',
        'Kjo faqe nuk përdor cookies analitike apo marketingu dhe nuk ngarkon shërbime gjurmimi.',
      ],
      en: [
        'When you visit, the hosting server processes technical data (e.g. IP address, time of access, browser) to deliver the website securely. [HOSTING_PROVIDER] · [RETENTION_PERIOD_LOGS]',
        'This website does not use analytics or marketing cookies and does not load tracking services.',
      ],
    },
  },
  {
    title: { sq: 'Formulari i kontaktit', en: 'Contact form' },
    body: {
      sq: [
        'Të dhënat që na dërgoni (emri, emaili, telefoni opsional, klinika e preferuar, mesazhi) përdoren vetëm për t’iu përgjigjur kërkesës suaj. Ju lutemi mos dërgoni informacione të detajuara shëndetësore.',
        'Dërgimi bëhet përmes ofruesit të emailit [EMAIL_PROVIDER]. Afati i ruajtjes: [RETENTION_PERIOD_CONTACT].',
      ],
      en: [
        'The data you send (name, email, optional phone, preferred location, message) is used solely to answer your enquiry. Please do not send detailed health information.',
        'Delivery uses the email provider [EMAIL_PROVIDER]. Retention period: [RETENTION_PERIOD_CONTACT].',
      ],
    },
  },
  {
    title: { sq: 'Rezervimi online (Cal.com)', en: 'Online booking (Cal.com)' },
    body: {
      sq: [
        'Kalendari i rezervimeve ngarkohet vetëm pasi ta konfirmoni në mënyrë aktive. Atëherë të dhënat e rezervimit i transmetohen Cal.com, Inc. si përpunues. [DPA_CALCOM_REFERENCE] · [DATA_TRANSFER_BASIS]',
      ],
      en: [
        'The booking calendar is only loaded after you actively confirm it. Booking data is then transmitted to Cal.com, Inc. as processor. [DPA_CALCOM_REFERENCE] · [DATA_TRANSFER_BASIS]',
      ],
    },
  },
  {
    title: { sq: 'Hartat dhe lidhjet e jashtme', en: 'Maps and external links' },
    body: {
      sq: ['Lidhjet për udhëzime hapin një shërbim të jashtëm hartash vetëm pasi të klikoni. Instagram hapet në një skedë të re.'],
      en: ['Directions links open an external map service only when you click them. Instagram opens in a new tab.'],
    },
  },
  {
    title: { sq: 'Të drejtat tuaja', en: 'Your rights' },
    body: {
      sq: ['Keni të drejtë për qasje, korrigjim, fshirje, kufizim të përpunimit dhe ankesë pranë autoritetit mbikëqyrës. [SUPERVISORY_AUTHORITY]'],
      en: ['You have the right to access, rectification, erasure, restriction of processing and to lodge a complaint with the supervisory authority. [SUPERVISORY_AUTHORITY]'],
    },
  },
];

export const legalSections: LegalSection[] = [
  {
    title: { sq: 'Ofruesi', en: 'Provider' },
    body: {
      sq: ['Dr. Qendrim Hajdari [OFFICIAL_TITLE_VERIFIED] · [PRACTICE_LEGAL_ENTITY] · [ADDRESS] · [BUSINESS_EMAIL]'],
      en: ['Dr. Qendrim Hajdari [OFFICIAL_TITLE_VERIFIED] · [PRACTICE_LEGAL_ENTITY] · [ADDRESS] · [BUSINESS_EMAIL]'],
    },
  },
  {
    title: { sq: 'Licenca profesionale', en: 'Professional licence' },
    body: {
      sq: ['[PROFESSIONAL_LICENSE] · [CHAMBER_OR_REGULATORY_BODY]'],
      en: ['[PROFESSIONAL_LICENSE] · [CHAMBER_OR_REGULATORY_BODY]'],
    },
  },
  {
    title: { sq: 'Shënim mjekësor', en: 'Medical disclaimer' },
    body: {
      sq: [
        'Informacionet në këtë faqe janë të përgjithshme dhe nuk zëvendësojnë një ekzaminim apo këshillim individual mjekësor. Rezultatet e trajtimeve ndryshojnë nga personi te personi; nuk jepen garanci.',
        'Kjo faqe nuk është menduar për urgjenca mjekësore. Në rast urgjence kontaktoni shërbimet lokale të urgjencës.',
      ],
      en: [
        'The information on this website is general and does not replace an individual medical examination or consultation. Treatment outcomes vary between individuals; no guarantees are given.',
        'This website is not intended for medical emergencies. In an emergency, contact your local emergency services.',
      ],
    },
  },
  {
    title: { sq: 'Të drejtat e autorit', en: 'Copyright' },
    body: {
      sq: ['Tekstet, ilustrimet dhe dizajni i kësaj faqeje janë të mbrojtura. Fontet: Cormorant Garamond dhe Manrope (SIL Open Font License 1.1).'],
      en: ['Texts, illustrations and design of this website are protected. Fonts: Cormorant Garamond and Manrope (SIL Open Font License 1.1).'],
    },
  },
];
