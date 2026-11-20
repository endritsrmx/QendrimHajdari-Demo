import { cn } from '@/lib/cn';

export const inputClass = (invalid?: boolean) =>
  cn(
    'w-full border-0 border-b bg-transparent px-0 py-3 text-[1rem] text-slate placeholder:text-grey/70',
    'transition-[border-color,box-shadow] duration-200 ease-[var(--ease-out)]',
    'focus:border-slate focus:shadow-[0_1px_0_var(--color-slate)] focus:outline-none focus-visible:outline-none',
    invalid ? 'border-alert' : 'border-line hover:border-grey',
  );

export function Field({
  id,
  label,
  hint,
  error,
  required,
  requiredLabel,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  requiredLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <label htmlFor={id} className="text-label flex items-center gap-2 text-grey">
        {label}
        {required && (
          <span aria-hidden className="text-bronze-deep">
            *
          </span>
        )}
        {required && requiredLabel && <span className="sr-only">({requiredLabel})</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[0.8125rem] text-grey">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-center gap-2 text-[0.8125rem] text-alert">
          <span aria-hidden className="size-1.5 rounded-full bg-alert" />
          {error}
        </p>
      )}
    </div>
  );
}
