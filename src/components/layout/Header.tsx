'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { mainNav } from '@/config/navigation';
import { Logo } from '@/components/brand/Logo';
import { MenuButton } from '@/components/navigation/MenuButton';
import { MenuOverlay } from '@/components/navigation/MenuOverlay';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { setScrollLocked } from '@/components/animations/MotionProvider';
import { buttonClass } from '@/components/ui/Button';
import { Arrow } from '@/components/ui/Arrow';
import { cn } from '@/lib/cn';

export function Header() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    buttonRef.current?.focus();
  }, []);

  // background scroll lock + make page content inert while the menu is open
  useEffect(() => {
    setScrollLocked(open);
    const outside = [document.getElementById('main-content'), document.getElementById('site-footer')];
    outside.forEach((el) => el && (el.inert = open));
    return () => {
      if (open) setScrollLocked(false);
    };
  }, [open]);

  // close on route change (derived during render – no effect needed)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  const compact = scrolled && !open;

  return (
    <header id="site-header" className="fixed inset-x-0 top-0 z-50" style={{ viewTransitionName: 'site-header' }}>
      <div
        className={cn(
          'relative z-50 transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-[var(--ease-out)]',
          compact ? 'bg-ivory/92 shadow-[0_1px_0_var(--color-line)] backdrop-blur-md' : 'bg-transparent',
        )}
      >
        <div
          className={cn(
            'container-x flex items-center justify-between gap-6 transition-[height] duration-300 ease-[var(--ease-out)]',
            compact ? 'h-16 lg:h-[4.5rem]' : 'h-20 lg:h-24',
          )}
        >
          <Link href="/" aria-label={t('homeLink')} className="shrink-0" onClick={() => setOpen(false)}>
            <Logo animated showTagline={!compact} />
          </Link>

          <nav aria-label={t('mainNav')} className={cn('hidden lg:block', open && 'invisible')}>
            <ul className="flex items-center gap-8 xl:gap-10">
              {mainNav.map((item) => {
                const active = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'link-underline py-2 text-[0.8125rem] font-medium tracking-[0.06em] transition-colors',
                        active ? 'text-slate [background-size:100%_1px]' : 'text-grey hover:text-slate',
                      )}
                    >
                      {t(item.key)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 sm:gap-5">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              href="/book-appointment"
              className={cn(buttonClass('primary'), 'hidden min-h-11 px-5 py-2.5 lg:inline-flex', open && 'invisible')}
            >
              {t('book')}
              <Arrow />
            </Link>
            <MenuButton
              ref={buttonRef}
              open={open}
              onClick={() => (open ? close() : setOpen(true))}
              label={open ? t('closeMenu') : t('openMenu')}
              text={open ? t('close') : t('menu')}
              controls="site-menu"
            />
          </div>
        </div>
      </div>
      <MenuOverlay id="site-menu" trapId="site-header" open={open} onClose={close} />
    </header>
  );
}
