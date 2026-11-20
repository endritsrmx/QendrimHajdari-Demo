import { site } from '@/config/site';
import type { ContentStatus } from '@/content/types';

const PUBLIC_STATUSES: ContentStatus[] = ['approved', 'published'];

export const isPublicStatus = (status: ContentStatus) => PUBLIC_STATUSES.includes(status);

/**
 * Whether a piece of content may be rendered.
 * Production: only approved / published. Preview mode: everything (badged in the UI).
 */
export function isRenderable(status: ContentStatus, preview: boolean = site.contentPreview): boolean {
  return preview || isPublicStatus(status);
}

export function filterRenderable<T extends { status: ContentStatus }>(
  items: T[],
  preview: boolean = site.contentPreview,
): T[] {
  return items.filter((i) => isRenderable(i.status, preview));
}
