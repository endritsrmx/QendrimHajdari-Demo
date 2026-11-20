import type { LegalSection } from '@/content/legal';
import type { Locale } from '@/i18n/routing';

export function LegalBody({ sections, locale, draftNote }: { sections: LegalSection[]; locale: Locale; draftNote: string }) {
  return (
    <section className="bg-ivory pb-[var(--section-y)]">
      <div className="container-x grid-12">
        <div className="col-span-4 lg:col-span-8 lg:col-start-3">
          <p className="border border-dashed border-bronze-deep/50 bg-white/60 p-5 text-[0.875rem] text-bronze-deep">{draftNote}</p>
          {sections.map((s, i) => (
            <div key={i} className="border-b border-line py-10">
              <h2 className="text-h3">{s.title[locale]}</h2>
              <div className="mt-4 space-y-4 text-grey">
                {s.body[locale].map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
