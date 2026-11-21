'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { Link, usePathname } from '@/i18n/navigation';
import { menuNav } from '@/config/navigation';
import { locations } from '@/config/locations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { prefersReducedMotion } from '@/components/animations/presets';
import { cn } from '@/lib/cn';

gsap.registerPlugin(CustomEase);
// --ease-drawer token (iOS-like sheet) for the entrance, a soft in-out for the lift on close
CustomEase.create('qh-drawer', '0.32, 0.72, 0, 1');
CustomEase.create('qh-curtain-up', 'M0,0 C0.5,0 0.2,1 1,1');

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])';

export function MenuOverlay({
  id,
  open,
  onClose,
  trapId,
}: {
  id: string;
  open: boolean;
  onClose: () => void;
  /** element containing the overlay AND the toggle button – focus is trapped inside */
  trapId: string;
}) {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  // Open / close animation
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (firstRender.current) {
      firstRender.current = false;
      if (!open) return;
    }
    const items = root.querySelectorAll('[data-menu-item]');
    const reduced = prefersReducedMotion();
    gsap.killTweensOf([root, items]);
    if (open) {
      // Interrupted close? Continue from the on-screen value instead of restarting (no jump).
      const fromHidden = root.hidden;
      root.hidden = false;
      if (reduced) {
        gsap.set(root, { clipPath: 'inset(0% 0% 0% 0%)' });
        gsap.set(items, { y: 0 });
        gsap.fromTo(root, { opacity: 0 }, { opacity: 1, duration: 0.2, ease: 'power2.out' });
      } else {
        if (fromHidden) {
          gsap.set(root, { clipPath: 'inset(0% 0% 100% 0%)' });
          gsap.set(items, { y: 28, opacity: 0 });
        }
        // curtain drops with the drawer curve; links follow while it settles
        gsap.to(root, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: fromHidden ? 0.75 : 0.4,
          ease: 'qh-drawer',
        });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: fromHidden ? 0.045 : 0,
          delay: fromHidden ? 0.22 : 0,
        });
      }
      // focus first link
      requestAnimationFrame(() => root.querySelector<HTMLElement>('[data-menu-item] a')?.focus());
    } else {
      if (reduced) {
        gsap.to(root, { opacity: 0, duration: 0.15, ease: 'power2.out', onComplete: () => {
          root.hidden = true;
          gsap.set(root, { opacity: 1 });
        } });
      } else {
        // links fade first (fast), then the curtain lifts – exit shorter than entrance
        gsap.to(items, { y: -12, opacity: 0, duration: 0.2, ease: 'power2.out', stagger: { each: 0.02, from: 'end' } });
        gsap.to(root, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.55,
          delay: 0.12,
          ease: 'qh-curtain-up',
          onComplete: () => {
            root.hidden = true;
          },
        });
      }
    }
  }, [open]);

  // ESC + focus trap
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const container = document.getElementById(trapId);
      if (!container) return;
      const nodes = Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((n) => n.offsetParent !== null);
      if (nodes.length === 0) return;
      const first = nodes[0]!;
      const last = nodes[nodes.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose, trapId]);

  return (
    <div
      ref={rootRef}
      id={id}
      hidden
      className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-ivory"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      <div role="dialog" aria-label={t('menu')} className="flex min-h-full flex-col">
        <div className="container-x grid flex-1 grid-cols-1 content-center gap-8 pt-24 pb-8 lg:grid-cols-12 lg:gap-12 lg:pt-28 lg:pb-12">
          <nav aria-label={t('mainNav')} className="lg:col-span-8">
            <ol className="flex flex-col">
              {menuNav.map((item) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} data-menu-item className="border-b border-line first:border-t">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className="group flex items-baseline py-[max(0.5rem,1.1vh)]"
                    >
                      <span
                        className={cn(
                          'font-serif text-[clamp(1.75rem,min(6vh,4.4vw),4.25rem)] leading-[1.08] transition-colors duration-200 ease-[ease] group-hover:text-bronze-deep',
                          active ? 'text-bronze-deep' : 'text-slate',
                        )}
                      >
                        {t(item.key)}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>
          <div className="flex flex-col justify-end gap-6 lg:col-span-3 lg:col-start-10 lg:gap-10" data-menu-item>
            <div>
              <p className="text-label mb-3 text-grey">{t('language')}</p>
              <LanguageSwitcher />
            </div>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              {locations.map((l) => (
                <div key={l.id} className="border-t border-line pt-3 text-[0.875rem] leading-relaxed lg:pt-4">
                  <p className="font-medium text-slate">{l.name}</p>
                  <p className="text-grey">
                    {l.city[locale]}, {l.country[locale]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
