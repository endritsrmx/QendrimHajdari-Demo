import { cn } from '@/lib/cn';

export function Divider({ className, animated = true }: { className?: string; animated?: boolean }) {
  return <div aria-hidden data-reveal={animated ? 'divider' : undefined} className={cn('h-px w-full bg-line', className)} />;
}
