import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';
import type { ComponentProps } from 'react';

type Href = ComponentProps<typeof Link>['href'];

export async function Breadcrumbs({ items }: { items: { label: string; href?: Href }[] }) {
  const t = await getTranslations('nav');
  return (
    <nav aria-label={t('breadcrumb')} className="text-[0.8125rem] text-grey">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <li>
          <Link href="/" className="link-underline">
            {t('home')}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-3">
            <span aria-hidden className="h-px w-4 bg-bronze" />
            {item.href ? (
              <Link href={item.href} className="link-underline">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="text-slate">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
