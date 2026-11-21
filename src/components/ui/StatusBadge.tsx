import { getTranslations } from 'next-intl/server';
import type { ContentStatus } from '@/content/types';
import { isPublicStatus } from '@/lib/content';
import { cn } from '@/lib/cn';

/** Quiet editorial status note – only rendered for non-approved content (preview mode). */
export async function StatusBadge({ status, className }: { status: ContentStatus; className?: string }) {
  if (isPublicStatus(status)) return null;
  const t = await getTranslations('common');
  const label = status === 'draft' ? t('statusDraft') : t('statusReview');
  return (
    <span className={cn('inline-flex items-center gap-2 text-[0.8125rem] text-bronze-deep', className)}>
      <span aria-hidden className="size-1.5 rounded-full bg-bronze" />
      {label}
    </span>
  );
}
