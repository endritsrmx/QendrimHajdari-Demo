import { cn } from '@/lib/cn';

/** Small context line above a heading – used only where it adds information the heading doesn't. */
export function Eyebrow({ children, className, tone = 'dark' }: { children: React.ReactNode; className?: string; tone?: 'dark' | 'light' }) {
  return <p className={cn('text-[0.9375rem]', tone === 'dark' ? 'text-grey' : 'text-sand', className)}>{children}</p>;
}
