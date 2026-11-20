'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Arrow } from '@/components/ui/Arrow';
import { cn } from '@/lib/cn';

/** Sticky booking CTA on mobile/tablet – appears after the hero, hidden on booking/contact pages and near the footer. */
export function MobileBookingBar() {
  const t = useTranslations('common');
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const hiddenRoute = pathname === '/book-appointment' || pathname === '/contact';

  useEffect(() => {
    const footer = document.getElementById('site-footer');
    let footerVisible = false;
    const io = footer
      ? new IntersectionObserver(([entry]) => {
          footerVisible = !!entry?.isIntersecting;
          update();
        })
      : null;
    function update() {
      setVisible(window.scrollY > window.innerHeight * 0.6 && !footerVisible);
    }
    if (footer && io) io.observe(footer);
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', update);
      io?.disconnect();
    };
  }, [pathname]);

  if (hiddenRoute) return null;

  return (
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-30 border-t border-line bg-ivory/95 px-4 py-3 backdrop-blur-md transition-transform duration-400 ease-[var(--ease-drawer)] lg:hidden',
        visible ? 'translate-y-0' : 'translate-y-full',
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      <Link
        href="/book-appointment"
        className="group flex min-h-12 w-full items-center justify-center gap-4 bg-slate text-[0.8125rem] font-medium uppercase tracking-[0.14em] text-white"
      >
        {t('bookConsultation')}
        <Arrow />
      </Link>
    </div>
  );
}
