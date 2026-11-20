import { getTranslations } from 'next-intl/server';
import { ButtonLink } from '@/components/ui/Button';
import { Monogram } from '@/components/brand/Logo';

export default async function NotFound() {
  const t = await getTranslations('notFound');
  return (
    <section className="relative flex min-h-[80svh] items-center overflow-hidden bg-ivory pt-32 pb-20">
      <Monogram className="pointer-events-none absolute -right-20 top-1/2 size-[30rem] -translate-y-1/2 opacity-[0.06]" />
      <div className="container-x relative">
        <p className="text-label text-grey">{t('eyebrow')}</p>
        <h1 className="text-h1 mt-6 max-w-[16ch]">{t('title')}</h1>
        <p className="text-lead mt-6 text-grey">{t('text')}</p>
        <div className="mt-10">
          <ButtonLink href="/">{t('home')}</ButtonLink>
        </div>
      </div>
    </section>
  );
}
