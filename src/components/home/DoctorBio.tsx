import { getLocale, getTranslations } from 'next-intl/server';
import { doctor } from '@/content/doctor';
import { isRenderable } from '@/lib/content';

/** Renders the approved biography – or a clearly marked placeholder until it is approved. */
export async function DoctorBio() {
  const locale = (await getLocale()) as 'sq' | 'en';
  const t = await getTranslations('about');
  if (doctor.bio.text && isRenderable(doctor.bio.status)) {
    return (
      <div className="space-y-5 text-grey">
        {doctor.bio.text[locale].map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>
    );
  }
  return (
    <div className="border border-dashed border-bronze-deep/50 bg-white/60 p-6">
      <code className="text-[0.8125rem] text-bronze-deep">{doctor.bio.placeholder}</code>
      <p className="mt-2 text-[0.875rem] text-grey">{t('placeholderNote')}</p>
    </div>
  );
}
