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
    <p className="text-lead text-grey">{t('bioPending')}</p>
  );
}
