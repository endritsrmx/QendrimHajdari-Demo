import type { ReactNode } from 'react';
import './globals.css';

/** Root layout is a pass-through – <html> is rendered by app/[locale]/layout.tsx. */
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
