'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import gsap from 'gsap';
import { Link, usePathname } from '@/i18n/navigation';
import { menuNav } from '@/config/navigation';
import { locations } from '@/config/locations';
import { LanguageSwitcher } from './LanguageSwitcher';
import { prefersReducedMotion, motionPresets } from '@/components/animations/presets';
import { cn } from '@/lib/cn';

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
          gsap.set(items, { y: 48, opacity: 0 });
        }
        gsap.to(root, {
          clipPath: 'inset(0% 0% 0% 0%)',
          duration: fromHidden ? motionPresets.menu.overlay : 0.3,
          ease: fromHidden ? 'expo.inOut' : 'power3.out',
        });
        gsap.to(items, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: motionPresets.menu.ease,
          stagger: fromHidden ? motionPresets.menu.stagger : 0,
          delay: fromHidden ? 0.2 : 0,
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
        gsap.to(root, {
          clipPath: 'inset(0% 0% 100% 0%)',
          duration: 0.3,
          ease: 'power3.out',
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
      className="fixed inset-0 z-40 overflow-y-auto bg-ivory"
      style={{ clipPath: 'inset(0% 0% 100% 0%)' }}
    >
      <div role="dialog" aria-label={t('menu')} className="flex min-h-full flex-col">
        <div className="container-x grid flex-1 grid-cols-1 gap-12 pt-28 pb-10 lg:grid-cols-12 lg:pt-36">
          <nav aria-label={t('mainNav')} className="lg:col-span-8">
            <ol className="flex flex-col">
              {menuNav.map((item, i) => {
                const active = pathname === item.href;
                return (
                  <li key={item.href} data-menu-item className="border-b border-line first:border-t">
                    <Link
                      href={item.href}
                      onClick={onClose}
                      aria-current={active ? 'page' : undefined}
                      className="group flex items-baseline gap-5 py-3 sm:gap-8 sm:py-4"
                    >
                      <span className="w-8 text-[0.75rem] font-medium tracking-[0.14em] text-grey tabular-nums">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={cn(
                          'font-serif text-[clamp(2.25rem,1.4rem+3.6vw,4.5rem)] leading-[1.05] transition-[transform,color] duration-200 ease-[ease] group-hover:translate-x-3',
                          active ? 'text-slate italic' : 'text-slate',
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
          <div className="flex flex-col justify-end gap-10 lg:col-span-3 lg:col-start-10" data-menu-item>
            <div>
              <p className="text-label mb-3 text-grey">{t('language')}</p>
              <LanguageSwitcher />
            </div>
            <div className="grid grid-cols-2 gap-6 lg:grid-cols-1">
              {locations.map((l) => (
                <div key={l.id} className="border-t border-line pt-4 text-[0.875rem] leading-relaxed">
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
