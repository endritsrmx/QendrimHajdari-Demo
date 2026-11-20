import { cn } from '@/lib/cn';

export function Section({
  children,
  className,
  tone = 'ivory',
  id,
  labelledBy,
}: {
  children: React.ReactNode;
  className?: string;
  tone?: 'ivory' | 'sand' | 'white' | 'slate';
  id?: string;
  labelledBy?: string;
}) {
  const bg = { ivory: 'bg-ivory', sand: 'bg-sand', white: 'bg-white', slate: 'bg-slate text-ivory on-dark' }[tone];
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('section-y relative', bg, className)}>
      {children}
    </section>
  );
}
