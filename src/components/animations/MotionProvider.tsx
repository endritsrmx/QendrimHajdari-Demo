'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motionPresets as P, prefersReducedMotion } from './presets';

gsap.registerPlugin(ScrollTrigger);

/** Lock / release page scroll (fullscreen menu, intro). Native scrolling only – no scroll-jacking. */
export function setScrollLocked(locked: boolean) {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}

const num = (v: string | undefined, fallback: number) => {
  const n = v !== undefined ? parseFloat(v) : NaN;
  return Number.isFinite(n) ? n : fallback;
};

/** Curves from the design tokens in globals.css (--ease-out / --ease-in-out). */
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
const EASE_IN_OUT = 'cubic-bezier(0.77, 0, 0.175, 1)';

/**
 * Above-the-fold reveals play while the page is still loading and hydrating.
 * They run on WAAPI (transform / opacity on the compositor) instead of GSAP's rAF loop,
 * so they stay smooth while the main thread is busy.
 */
function revealWithWaapi(el: HTMLElement, type: string | undefined, delay: number): boolean {
  const opts = (duration: number, d = 0, easing = EASE_OUT): KeyframeAnimationOptions => ({
    duration: duration * 1000,
    delay: (delay + d) * 1000,
    easing,
    fill: 'both',
  });
  switch (type) {
    case 'lines':
      el.querySelectorAll<HTMLElement>('.reveal-mask > span').forEach((line, i) =>
        line.animate([{ transform: 'translateY(110%)' }, { transform: 'none' }], opts(P.revealLines.duration, i * P.revealLines.stagger)),
      );
      return true;
    case 'image': {
      el.animate([{ clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }], opts(P.revealImage.duration, 0, EASE_IN_OUT));
      el.querySelector<HTMLElement>('[data-reveal-zoom]')?.animate(
        [{ transform: `scale(${P.revealImage.zoomFrom})` }, { transform: 'none' }],
        opts(P.revealImage.duration + 0.3),
      );
      return true;
    }
    case 'divider':
      el.style.transformOrigin = 'left center';
      el.animate([{ transform: 'scaleX(0)' }, { transform: 'none' }], opts(P.divider.duration));
      return true;
    case 'text':
      el.animate([{ opacity: 0, transform: `translateY(${P.revealText.y}px)` }, { opacity: 1, transform: 'none' }], opts(P.revealText.duration));
      return true;
    case 'fade':
      el.animate([{ opacity: 0, transform: `translateY(${P.fadeUp.y}px)` }, { opacity: 1, transform: 'none' }], opts(P.fadeUp.duration));
      return true;
    default:
      return false; // stagger groups keep GSAP
  }
}

function initReveals(root: ParentNode) {
  const els = Array.from(root.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'));

  els.forEach((el) => {
    const type = el.dataset.reveal;
    const delay = num(el.dataset.revealDelay, 0);
    let tween: () => gsap.core.Animation;
    // Remove the CSS pre-hide state *before* GSAP reads computed styles (same frame → no flash),
    // otherwise GSAP would cache the CSS transform as a pixel offset.
    el.setAttribute('data-revealed', '');

    const inViewAtLoad = el.getBoundingClientRect().top < window.innerHeight;
    // One orchestrated entrance for the first screen only. Further down, content is simply there –
    // no fade-and-slide on every section. Image masks are the single exception (editorial moment).
    if (!inViewAtLoad && type !== 'image') return;
    if (inViewAtLoad && typeof el.animate === 'function' && revealWithWaapi(el, type, delay)) return;

    switch (type) {
      case 'lines': {
        const lines = el.querySelectorAll<HTMLElement>('.reveal-mask > span');
        gsap.set(lines, { y: 0, yPercent: P.revealLines.yPercent });
        tween = () =>
          gsap.to(lines, {
            yPercent: 0,
            duration: P.revealLines.duration,
            ease: P.revealLines.ease,
            stagger: P.revealLines.stagger,
            delay,
          });
        break;
      }
      case 'image': {
        const zoom = el.querySelector<HTMLElement>('[data-reveal-zoom]');
        gsap.set(el, { clipPath: 'inset(100% 0% 0% 0%)' });
        if (zoom) gsap.set(zoom, { scale: P.revealImage.zoomFrom });
        tween = () => {
          const tl = gsap.timeline({ delay });
          tl.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: P.revealImage.duration, ease: P.revealImage.ease });
          if (zoom) tl.to(zoom, { scale: 1, duration: P.revealImage.duration + 0.3, ease: 'power2.out' }, 0);
          return tl;
        };
        break;
      }
      case 'divider': {
        gsap.set(el, { scaleX: 0, transformOrigin: 'left center' });
        tween = () => gsap.to(el, { scaleX: 1, duration: P.divider.duration, ease: P.divider.ease, delay });
        break;
      }
      case 'stagger': {
        const items = el.querySelectorAll<HTMLElement>('[data-reveal-item]');
        const x = num(el.dataset.revealX, 0);
        gsap.set(items, { opacity: 0, y: x ? 0 : P.stagger.y, x });
        tween = () =>
          gsap.to(items, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: num(el.dataset.revealDuration, P.stagger.duration),
            ease: el.dataset.revealEase || P.stagger.ease,
            stagger: num(el.dataset.revealStagger, P.stagger.stagger),
            delay,
          });
        break;
      }
      case 'text': {
        gsap.set(el, { opacity: 0, y: P.revealText.y });
        tween = () =>
          gsap.to(el, { opacity: 1, y: 0, duration: P.revealText.duration, ease: P.revealText.ease, delay });
        break;
      }
      default: {
        gsap.set(el, { opacity: 0, y: P.fadeUp.y });
        tween = () =>
          gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: num(el.dataset.revealDuration, P.fadeUp.duration),
            ease: P.fadeUp.ease,
            delay,
          });
      }
    }

    ScrollTrigger.create({
      trigger: el,
      start: el.dataset.revealStart || 'top 88%',
      once: true,
      onEnter: () => tween(),
    });
  });
}

function initScrubLines(root: ParentNode) {
  root.querySelectorAll<HTMLElement>('[data-scrub-line]').forEach((el) => {
    const axis = el.dataset.scrubLine === 'y' ? 'scaleY' : 'scaleX';
    gsap.fromTo(
      el,
      { [axis]: 0 },
      {
        [axis]: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: el.closest('[data-scrub-trigger]') ?? el,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 0.6,
        },
      },
    );
  });
}

/**
 * First-screen entrance, image mask reveals on scroll and the scroll-linked journey line.
 * Re-runs on every route change and cleans up all ScrollTriggers.
 */
export function MotionProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) {
      document.documentElement.classList.remove('motion');
      return;
    }
    document.documentElement.classList.add('motion');
    let ctx: gsap.Context | null = null;
    const run = () => {
      ctx = gsap.context(() => {
        initReveals(document);
        initScrubLines(document);
      });
    };
    // While the home intro plays, hero reveals wait until the stage opens.
    const waiting = document.documentElement.classList.contains('intro-pending');
    if (waiting) window.addEventListener('qh:intro-reveal', run, { once: true });
    else run();
    // layout may shift after fonts/images load
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh).catch(() => {});
    window.addEventListener('load', refresh);
    return () => {
      window.removeEventListener('load', refresh);
      window.removeEventListener('qh:intro-reveal', run);
      ctx?.revert();
      document.querySelectorAll('[data-revealed]').forEach((el) => el.removeAttribute('data-revealed'));
    };
  }, [pathname]);

  return null;
}
