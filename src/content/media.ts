import type { Localized } from './types';

export interface Photo {
  src: string;
  width: number;
  height: number;
  alt: Localized;
  /** CSS object-position for crops */
  position?: string;
}

/**
 * Client-supplied photography (public/images/doctor). Usage rights and, for operating-room images,
 * consent of all persons shown must be confirmed by the client before publication.
 */
export const media = {
  portraitOperatingRoom: {
    src: '/images/doctor/portrait-operating-room.jpg',
    width: 1440,
    height: 1920,
    alt: {
      sq: 'Dr. Qendrim Hajdari në sallën e operacionit',
      en: 'Dr. Qendrim Hajdari in the operating room',
    },
    position: '50% 30%',
  },
  portraitWhiteCoat: {
    src: '/images/doctor/portrait-white-coat.jpg',
    width: 960,
    height: 1280,
    alt: {
      sq: 'Dr. Qendrim Hajdari me mantel të bardhë mjekësor',
      en: 'Dr. Qendrim Hajdari in a white medical coat',
    },
    position: '50% 35%',
  },
  workshopKnee: {
    src: '/images/doctor/workshop-knee-arthroplasty.jpg',
    width: 1020,
    height: 1113,
    alt: {
      sq: 'Dr. Qendrim Hajdari gjatë një trajnimi praktik për protezën e gjurit',
      en: 'Dr. Qendrim Hajdari during a hands-on knee arthroplasty training',
    },
    position: '50% 30%',
  },
  surgeryInProgress: {
    src: '/images/doctor/surgery-in-progress.jpg',
    width: 1440,
    height: 1800,
    alt: {
      sq: 'Ekip kirurgjikal gjatë një operacioni',
      en: 'Surgical team during an operation',
    },
    position: '45% 50%',
  },
  royalMedicalTeam: {
    src: '/images/doctor/royal-medical-team.jpg',
    width: 1440,
    height: 1802,
    alt: {
      sq: 'Mjekë të Royal Medical në Prishtinë',
      en: 'Doctors at Royal Medical in Prishtina',
    },
    position: '50% 22%',
  },
  orTeamKneeReplacement: {
    src: '/images/doctor/or-team-knee-replacement.jpg',
    width: 1280,
    height: 1698,
    alt: {
      sq: 'Ekip kirurgjikal në sallën e operacionit, me radiografinë e një proteze gjuri në monitor',
      en: 'Surgical team in the operating room, with an X-ray of a knee replacement on the monitor',
    },
    position: '50% 40%',
  },
  orTeamScrubs: {
    src: '/images/doctor/or-team-scrubs.jpg',
    width: 960,
    height: 1280,
    alt: {
      sq: 'Tre kirurgë me rroba operacioni para sallës së operacionit',
      en: 'Three surgeons in scrubs outside the operating theatre',
    },
    position: '50% 35%',
  },
  orScrubsPortrait: {
    src: '/images/doctor/or-scrubs-portrait.jpg',
    width: 852,
    height: 1136,
    alt: {
      sq: 'Kirurg me rroba operacioni në hyrje të sallës së operacionit',
      en: 'Surgeon in scrubs at the entrance to the operating theatre',
    },
    position: '50% 30%',
  },
} satisfies Record<string, Photo>;
