import type { ComponentProps, ReactNode } from 'react';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/cn';
import { Arrow } from './Arrow';

type Variant = 'primary' | 'secondary' | 'light' | 'text';

const base =
  'pressable group inline-flex min-h-12 items-center justify-center gap-3 text-[0.9375rem] font-medium disabled:cursor-not-allowed disabled:opacity-50';

const variants: Record<Variant, string> = {
  primary:
    'bg-slate px-7 py-3.5 text-white shadow-[inset_0_0_0_1px_var(--color-slate)] hover:bg-slate-soft hover:shadow-[inset_0_0_0_1px_var(--color-bronze)]',
  secondary:
    'px-7 py-3.5 text-slate shadow-[inset_0_0_0_1px_var(--color-slate)] hover:bg-slate hover:text-white',
  light:
    'bg-ivory px-7 py-3.5 text-slate hover:bg-sand hover:shadow-[inset_0_0_0_1px_var(--color-bronze)]',
  text: 'min-h-11 gap-2 px-0 text-slate',
};

export const buttonClass = (variant: Variant = 'primary', className?: string) =>
  cn(base, variants[variant], className);

type LinkProps = ComponentProps<typeof Link>;

export function ButtonLink({
  variant = 'primary',
  arrow,
  className,
  children,
  ...props
}: LinkProps & { variant?: Variant; arrow?: boolean; children: ReactNode }) {
  return (
    <Link {...props} className={buttonClass(variant, className)}>
      <span className={variant === 'text' ? 'link-underline pb-0.5' : undefined}>{children}</span>
      {(arrow ?? variant === 'primary') && <Arrow />}
    </Link>
  );
}

export function ExternalButton({
  variant = 'secondary',
  className,
  children,
  newTabLabel,
  ...props
}: ComponentProps<'a'> & { variant?: Variant; newTabLabel?: string }) {
  return (
    <a {...props} target="_blank" rel="noopener noreferrer" className={buttonClass(variant, className)}>
      <span className={variant === 'text' ? 'link-underline pb-0.5' : undefined}>
        {children}
        {newTabLabel && <span className="sr-only"> {newTabLabel}</span>}
      </span>
      <Arrow direction="up-right" className="w-4" />
    </a>
  );
}
