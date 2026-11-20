'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/** After client-side navigation, move focus to the main landmark (skips the initial load and hash links). */
export function RouteFocus() {
  const pathname = usePathname();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    if (window.location.hash) return;
    document.getElementById('main-content')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
