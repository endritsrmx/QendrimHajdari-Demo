import type { AppPathname } from '@/i18n/routing';

/** Static (non-dynamic) internal pathnames */
export type StaticPathname = Exclude<AppPathname, '/treatments/[slug]'>;

export interface NavItem {
  href: StaticPathname;
  key: string; // message key in nav.*
}

/** Desktop main navigation */
export const mainNav: NavItem[] = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/treatments', key: 'treatments' },
  { href: '/locations', key: 'locations' },
  { href: '/contact', key: 'contact' },
];

/** Fullscreen menu (results is excluded until published) */
export const menuNav: NavItem[] = [
  { href: '/', key: 'home' },
  { href: '/about', key: 'about' },
  { href: '/treatments', key: 'treatments' },
  { href: '/locations', key: 'locations' },
  { href: '/faq', key: 'faq' },
  { href: '/contact', key: 'contact' },
  { href: '/book-appointment', key: 'book' },
];

export const footerNav: NavItem[] = [
  { href: '/about', key: 'about' },
  { href: '/treatments', key: 'treatments' },
  { href: '/locations', key: 'locations' },
  { href: '/faq', key: 'faq' },
  { href: '/contact', key: 'contact' },
  { href: '/book-appointment', key: 'book' },
];

export const legalNav: NavItem[] = [
  { href: '/privacy', key: 'privacy' },
  { href: '/legal', key: 'legal' },
];
