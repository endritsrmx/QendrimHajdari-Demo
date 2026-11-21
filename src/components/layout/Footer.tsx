import { getLocale, getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import { footerNav, legalNav } from '@/config/navigation';
import { locations } from '@/config/locations';
import { brand } from '@/config/brand';
import { Logo } from '@/components/brand/Logo';
import { LanguageSwitcher } from '@/components/navigation/LanguageSwitcher';
import { InstagramIcon } from '@/components/ui/InstagramIcon';

export async function Footer() {
  const t = await getTranslations('footer');
  const tn = await getTranslations('nav');
  const tc = await getTranslations('common');
  const locale = (await getLocale()) as 'sq' | 'en';
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="on-dark relative bg-slate pb-24 text-ivory lg:pb-0">
      <div className="container-x pt-20 lg:pt-28">
        <div className="grid-12 gap-y-14">
          <div className="col-span-4 lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-8 max-w-sm text-[0.9375rem] leading-relaxed text-sand">{t('description')}</p>
            <a
              href={brand.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-11 items-center gap-3 text-[0.875rem] text-ivory"
            >
              <InstagramIcon className="size-5" />
              <span className="link-underline">@dr.qendrimhajdari</span>
              <span className="sr-only">{tc('opensInNewTab')}</span>
            </a>
          </div>

          <nav aria-label={tn('footerNav')} className="col-span-2 lg:col-span-2 lg:col-start-6">
            <h2 className="text-label mb-6 font-sans text-bronze">{t('navigation')}</h2>
            <ul className="space-y-1 text-[0.9375rem]">
              {footerNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="link-underline inline-flex min-h-9 items-center text-ivory/90 hover:text-ivory">
                    {tn(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 lg:col-span-3">
            <h2 className="text-label mb-6 font-sans text-bronze">{t('locations')}</h2>
            <ul className="space-y-7 text-[0.9375rem] leading-relaxed">
              {locations.map((l) => (
                <li key={l.id}>
                  <p className="text-ivory">{l.name}</p>
                  <p className="text-sand">
                    {l.address ?? tc('addressPending')}
                  </p>
                  <p className="text-sand">
                    {l.city[locale]}, {l.country[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 lg:col-span-2">
            <h2 className="text-label mb-6 font-sans text-bronze">{t('contact')}</h2>
            <ul className="space-y-3 text-[0.9375rem]">
              <li>
                {brand.phone ? (
                  <a href={`tel:${brand.phone.replace(/\s/g, '')}`} className="link-underline">{brand.phone}</a>
                ) : (
                  <span className="text-sand">{tc('toBeConfirmed')}</span>
                )}
              </li>
              <li>
                {brand.email ? (
                  <a href={`mailto:${brand.email}`} className="link-underline break-all">{brand.email}</a>
                ) : (
                  <Link href="/contact" className="link-underline">{t('writeUs')}</Link>
                )}
              </li>
              <li className="pt-2">
                <Link href="/contact" className="group inline-flex min-h-11 items-center gap-3 text-ivory">
                  <span className="link-underline">{tn('contact')}</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-16 max-w-3xl border-l border-bronze pl-5 text-[0.8125rem] leading-relaxed text-sand">
          {tc('medicalDisclaimer')} {tc('emergencyNotice')}
        </p>

        <div className="mt-14 flex flex-col gap-6 border-t border-slate-soft py-8 text-[0.8125rem] text-sand lg:flex-row lg:items-center lg:justify-between">
          <p>
            © {year} {brand.displayName}. {t('rights')}
          </p>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-2">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="link-underline inline-flex min-h-11 items-center">
                  {tn(item.key)}
                </Link>
              </li>
            ))}
            <li>
              <LanguageSwitcher tone="light" />
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
