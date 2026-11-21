import type { ComponentProps, ReactNode } from 'react';
import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
import { Link } from '@/i18n/navigation';

type Href = ComponentProps<typeof Link>['href'];

export async function PageHero({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  eyebrow,
  title,
  lead,
  crumbs,
  children,
  aside,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  crumbs: { label: string; href?: Href }[];
  children?: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section aria-labelledby="page-title" className="bg-ivory pt-32 pb-16 lg:pt-44 lg:pb-24">
      <div className="container-x">
        <div data-reveal="fade" data-reveal-start="top 100%">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="grid-12 mt-14 gap-y-10 lg:mt-20">
          <div className="col-span-4 lg:col-span-8">
            <h1 id="page-title" className="text-h1" data-reveal="lines" data-reveal-delay="0.1" data-reveal-start="top 100%">
              <span className="reveal-mask">
                <span>{title}</span>
              </span>
            </h1>
            {lead && (
              <p className="text-lead mt-8 max-w-2xl text-grey" data-reveal="fade" data-reveal-delay="0.35" data-reveal-start="top 100%">
                {lead}
              </p>
            )}
            {children}
          </div>
          {aside && <div className="col-span-4 self-end lg:col-span-4">{aside}</div>}
        </div>
        <div className="mt-16 h-px w-full bg-line lg:mt-24" data-reveal="divider" data-reveal-start="top 100%" />
      </div>
    </section>
  );
}
