import { cn } from '@/lib/cn';

/** Visible editorial placeholder for unverified facts. */
export function PendingBlock({ token, note, className }: { token: string; note: string; className?: string }) {
  return (
    <div className={cn('border border-dashed border-bronze-deep/50 bg-white/60 px-5 py-4', className)}>
      <code className="text-[0.8125rem] text-bronze-deep">{token}</code>
      <p className="mt-1 text-[0.875rem] text-grey">{note}</p>
    </div>
  );
}
