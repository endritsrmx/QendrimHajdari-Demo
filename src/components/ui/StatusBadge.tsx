import { getTranslations } from 'next-intl/server';
import type { ContentStatus } from '@/content/types';
import { isPublicStatus } from '@/lib/content';
import { cn } from '@/lib/cn';

/** Visible editorial status badge – only rendered for non-approved content (preview mode). */
export async function StatusBadge({ status, className }: { status: ContentStatus; className?: string }) {
  if (isPublicStatus(status)) return null;
  const t = await getTranslations('common');
  const label = status === 'draft' ? t('statusDraft') : t('statusReview');
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 border border-dashed border-bronze-deep/60 bg-white/70 px-2.5 py-1 text-[0.6875rem] font-medium uppercase tracking-[0.12em] text-bronze-deep',
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-bronze-deep" />
      {label}
    </span>
  );
}
