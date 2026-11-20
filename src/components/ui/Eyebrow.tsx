import { cn } from '@/lib/cn';

export function Eyebrow({ children, className, tone = 'dark' }: { children: React.ReactNode; className?: string; tone?: 'dark' | 'light' }) {
  return (
    <p className={cn('text-label flex items-center gap-4', tone === 'dark' ? 'text-grey' : 'text-sand', className)}>
      <span aria-hidden className="h-px w-8 bg-bronze" />
      <span>{children}</span>
    </p>
  );
}
