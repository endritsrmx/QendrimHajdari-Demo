import { getTranslations } from 'next-intl/server';
import { cn } from '@/lib/cn';

export async function MedicalNotice({ className, emergency = true }: { className?: string; emergency?: boolean }) {
  const t = await getTranslations('common');
  return (
    <aside className={cn('border-l border-bronze pl-5 text-[0.875rem] leading-relaxed text-grey', className)}>
      <p>{t('medicalDisclaimer')}</p>
      {emergency && <p className="mt-2">{t('emergencyNotice')}</p>}
    </aside>
  );
}
