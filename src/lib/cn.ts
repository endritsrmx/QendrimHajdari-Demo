import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge } from 'tailwind-merge';

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['display', 'h1', 'h2', 'h3', 'lead', 'label'] }],
    },
  },
});

/** Joins class names and resolves conflicting Tailwind utilities (last one wins). */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
