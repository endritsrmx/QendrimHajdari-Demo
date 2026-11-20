'use client';

import { useId, useState } from 'react';
import { cn } from '@/lib/cn';

export interface AccordionItem {
  id: string;
  title: string;
  content: React.ReactNode;
  badge?: React.ReactNode;
}

/** Accessible accordion (button + region, aria-expanded) with smooth grid-rows animation. */
export function Accordion({ items, className }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const baseId = useId();
  return (
    <div className={cn('border-t border-line', className)}>
      {items.map((item) => {
        const isOpen = open === item.id;
        const btnId = `${baseId}-${item.id}-btn`;
        const panelId = `${baseId}-${item.id}-panel`;
        return (
          <div key={item.id} className="border-b border-line">
            <h3 className="font-sans text-base">
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : item.id)}
                className="group flex min-h-16 w-full items-center justify-between gap-6 py-5 text-left text-[1.0625rem] font-medium tracking-normal text-slate transition-colors hover:text-grey"
              >
                <span className="flex flex-col gap-2">
                  {item.badge}
                  {item.title}
                </span>
                <span aria-hidden className="relative size-4 shrink-0">
                  <span className="absolute top-1/2 left-0 h-px w-4 bg-slate" />
                  <span
                    className={cn(
                      'absolute top-0 left-1/2 h-4 w-px bg-slate transition-transform duration-200 ease-[var(--ease-out)]',
                      isOpen && 'scale-y-0',
                    )}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              className={cn(
                'grid transition-[grid-template-rows,opacity] duration-200 ease-[var(--ease-out)]',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
              )}
              inert={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="max-w-3xl pb-7 text-grey">{item.content}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
