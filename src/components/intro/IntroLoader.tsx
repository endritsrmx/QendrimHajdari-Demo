'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { setScrollLocked } from '@/components/animations/MotionProvider';

gsap.registerPlugin(CustomEase);

/**
 * Intro / preloader for the home page (first entry only).
 *
 * Sequence (seconds, see CONFIG):
 *  0.0–0.3  calm ivory stage with fine grain
 *  0.3–3.0  knee (sagittal view) draws itself: bones → ACL (bronze, glow pulse) → menisci → cartilage,
 *           each with a hairline leader + label (drawing runs at CONFIG.drawSpeed)
 *  parallel hairline + counter 000–100, coupled to real loading (fonts + hero image), min/max bounded
 *  +0.8     hold at 100 % so the finished drawing can be read
 *  T        line shoots out to both edges, knee scales up and dissolves, the stage splits along the line
 *           and the existing hero reveals itself (MotionProvider waits for `qh:intro-reveal`), header last.
 *
 * Activation happens before paint via the inline script in app/[locale]/layout.tsx, which sets
 * `html.intro-pending` (+ `intro-short` / `intro-reduced`) only on the home route. Without JS the overlay
 * never shows. Repeat visits in the same session get a 0.6 s version; reduced motion gets a short fade.
 */
export const INTRO_SESSION_KEY = 'qh-intro-seen';

const CONFIG = {
  drawSpeed: 0.7, // 1 = original tempo, lower = slower
  minLoad: 3.2, // counter reaches 100 no earlier than this (s)
  maxLoad: 5.0, // …and no later than ≈ this (s)
  holdAtFull: 0.8, // pause at 100 % before the stage opens (s)
  shortVersion: 0.6,
};

export interface IntroLabels {
  acl: string;
  aclShort: string;
  meniscus: string;
  cartilage: string;
}

export function IntroLoader({ labels }: { labels: IntroLabels }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const html = document.documentElement;
    const root = rootRef.current;
    if (!root || !html.classList.contains('intro-pending')) {
      setGone(true);
      return;
    }

    const q = <T extends Element = HTMLElement>(s: string) => root.querySelector<T>(s)!;
    const header = document.getElementById('site-header');
    const mode = html.classList.contains('intro-reduced') ? 'reduced' : html.classList.contains('intro-short') ? 'short' : 'full';
    const tweens: (gsap.core.Animation | (() => void))[] = [];
    let revealed = false;

    setScrollLocked(true);
    CustomEase.create('qh-curtain', 'M0,0 C0.62,0 0.16,1 1,1');

    /** Lets MotionProvider start the hero reveals exactly when the stage opens. */
    const reveal = () => {
      if (revealed) return;
      revealed = true;
      window.dispatchEvent(new Event('qh:intro-reveal'));
    };

    const finish = () => {
      reveal();
      try {
        sessionStorage.setItem(INTRO_SESSION_KEY, '1');
      } catch {
        /* storage unavailable – intro simply plays again next time */
      }
      html.classList.remove('intro-pending', 'intro-short', 'intro-reduced');
      if (header) gsap.set(header, { clearProps: 'opacity,transform' });
      // Don't fight the user: if they already opened the menu or focused something, leave it alone.
      const menuOpen = !!document.querySelector('[aria-controls="site-menu"][aria-expanded="true"]');
      if (!menuOpen) setScrollLocked(false);
      const active = document.activeElement;
      if (!active || active === document.body) document.getElementById('main-content')?.focus({ preventScroll: true });
      setGone(true);
    };

    const showHeader = (at: gsap.core.Timeline, pos: number) => {
      if (!header) return;
      at.fromTo(header, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, pos);
    };

    /* ---------- Reduced motion: no drawing, a short fade ---------- */
    if (mode === 'reduced') {
      reveal();
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(root, { opacity: 0, duration: 0.4, ease: 'power3.out', delay: 0.1 });
      if (header) tl.fromTo(header, { opacity: 0 }, { opacity: 1, duration: 0.4, ease: 'power3.out' }, 0.1);
      tweens.push(tl);
      return () => tweens.forEach((t) => (typeof t === 'function' ? t() : t.kill()));
    }

    const line = q('[data-intro-line]');
    const fullScale = () => (window.innerWidth + 40) / line.offsetWidth;

    /* ---------- Short version (repeat visit in this session) ---------- */
    if (mode === 'short') {
      gsap.set(line, { scaleX: fullScale(), transformOrigin: '50% 50%' });
      const d = CONFIG.shortVersion;
      const tl = gsap.timeline({ onComplete: finish });
      tl.add(reveal, 0)
        .to(q('[data-intro-top]'), { yPercent: -100, duration: d, ease: 'qh-curtain' }, 0)
        .to(q('[data-intro-bottom]'), { yPercent: 100, duration: d, ease: 'qh-curtain' }, 0)
        .to(line, { opacity: 0, duration: 0.3, ease: 'power3.out' }, d - 0.25);
      showHeader(tl, d - 0.2);
      tweens.push(tl);
      return () => tweens.forEach((t) => (typeof t === 'function' ? t() : t.kill()));
    }

    /* ---------- Full intro ---------- */
    root.querySelectorAll<SVGPathElement>('[data-draw]').forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len} ${len}`;
      p.style.strokeDashoffset = String(len);
    });

    // PHASE 2 – drawing (times in original tempo; timeScale slows it down)
    const draw = gsap.timeline({ delay: 0.3 });
    draw.timeScale(CONFIG.drawSpeed);
    draw
      .to(root.querySelectorAll('[data-group="bone"]'), { strokeDashoffset: 0, duration: 0.9, ease: 'expo.inOut' }, 0)
      .to(root.querySelectorAll('[data-group="bone2"]'), { strokeDashoffset: 0, duration: 0.9, ease: 'expo.inOut', stagger: 0.06 }, 0.12)
      .to(q('#qh-acl'), { strokeDashoffset: 0, duration: 0.5, ease: 'power3.out' }, 0.85)
      .to(q('#qh-acl-glow'), { opacity: 0.7, duration: 0.2, ease: 'power3.out' }, 1.3)
      .to(q('#qh-acl-glow'), { opacity: 0, duration: 0.35, ease: 'power3.out' }, 1.5)
      .to(q('#qh-lead-acl'), { strokeDashoffset: 0, duration: 0.35, ease: 'power3.out' }, 1.0)
      .fromTo(q('[data-label="acl"]'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 1.15)
      .to(root.querySelectorAll('[data-group="men"]'), { strokeDashoffset: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05 }, 1.2)
      .to(root.querySelectorAll('[data-group="men"]'), { fillOpacity: 1, duration: 0.4, ease: 'power3.out' }, 1.45)
      .to(q('#qh-lead-men'), { strokeDashoffset: 0, duration: 0.35, ease: 'power3.out' }, 1.32)
      .fromTo(q('[data-label="men"]'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 1.45)
      .to(root.querySelectorAll('[data-group="cart"]'), { strokeDashoffset: 0, duration: 0.45, ease: 'power3.out', stagger: 0.05 }, 1.25)
      .to(q('#qh-lead-cart'), { strokeDashoffset: 0, duration: 0.3, ease: 'power3.out' }, 1.35)
      .fromTo(q('[data-label="cart"]'), { opacity: 0, y: 6 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out' }, 1.5);
    tweens.push(draw);

    // PHASE 4 – transition into the hero
    const transition = () => {
      const tl = gsap.timeline({ onComplete: finish });
      tl.to(root.querySelectorAll('[data-intro-count], [data-label], [data-leader]'), { opacity: 0, y: -6, duration: 0.3, ease: 'power3.out' }, 0)
        .set(line, { transformOrigin: '50% 50%' }, 0)
        .to(line, { scaleX: fullScale(), duration: 0.7, ease: 'expo.inOut' }, 0)
        .to(q('[data-intro-knee]'), { scale: 1.15, filter: window.innerWidth < 640 ? 'none' : 'blur(6px)', opacity: 0, duration: 0.9, ease: 'expo.inOut' }, 0.1)
        .add(reveal, 0.3)
        .to(q('[data-intro-top]'), { yPercent: -100, duration: 0.9, ease: 'qh-curtain' }, 0.3)
        .to(q('[data-intro-bottom]'), { yPercent: 100, duration: 0.9, ease: 'qh-curtain' }, 0.3)
        .to(line, { opacity: 0, duration: 0.4, ease: 'power3.out' }, 0.9);
      showHeader(tl, 1.15);
      tweens.push(tl);
    };

    // PHASE 3 – loader coupled to real loading, monotonic, ends exactly at 100
    const count = q('[data-intro-count]');
    let loaded = false;
    const heroImg = document.querySelector<HTMLImageElement>('[data-intro-hero] img');
    Promise.all([
      document.fonts?.ready.catch(() => undefined) ?? Promise.resolve(),
      heroImg?.decode ? heroImg.decode().catch(() => undefined) : Promise.resolve(),
    ]).then(() => {
      loaded = true;
    });
    const safety = window.setTimeout(() => (loaded = true), (CONFIG.maxLoad - 0.6) * 1000);
    tweens.push(() => window.clearTimeout(safety));

    const start = performance.now();
    let last = start;
    let p = 0;
    let shown = -1;
    const easeOut = (x: number) => 1 - Math.pow(1 - x, 1.5);
    const tick = () => {
      const now = performance.now();
      const t = (now - start) / 1000;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const gate = easeOut(Math.min(1, t / CONFIG.minLoad));
      const real = loaded ? 1 : 0.88 * (1 - Math.exp(-t / 1.2));
      const goal = Math.min(gate, real);
      const smoothed = p + (goal - p) * (1 - Math.exp(-dt * 8));
      p = Math.max(p, Math.min(goal, Math.max(smoothed, p + 0.3 * dt)));
      if (goal >= 1 && 1 - p < 0.002) p = 1;
      line.style.transform = `scaleX(${p})`;
      const s = p === 1 ? 100 : Math.min(99, Math.floor(p * 100));
      if (s !== shown) {
        count.textContent = String(s).padStart(3, '0');
        shown = s;
      }
      if (p === 1) {
        gsap.ticker.remove(tick);
        window.clearTimeout(safety);
        tweens.push(gsap.delayedCall(CONFIG.holdAtFull, transition));
      }
    };
    gsap.ticker.add(tick);
    tweens.push(() => gsap.ticker.remove(tick));

    return () => tweens.forEach((t) => (typeof t === 'function' ? t() : t.kill()));
  }, []);

  if (gone) return null;

  return (
    <div ref={rootRef} className="qh-intro" aria-hidden="true">
      <div className="qh-intro__panel qh-intro__panel--top" data-intro-top />
      <div className="qh-intro__panel qh-intro__panel--bottom" data-intro-bottom />

      <div className="qh-intro__stage">
        {/* Knee, sagittal view, anterior = right. Stylised; proportions follow real anatomy. */}
        <div className="qh-intro__knee" data-intro-knee>
          <svg viewBox="90 0 250 520" focusable="false">
            <defs>
              <filter id="qh-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" />
              </filter>
            </defs>
            {/* femur: shaft, trochlea, round condyle with posterior bulge */}
            <path className="k-bone" data-draw data-group="bone" d="M162 0 L164 236 C164 262 146 280 140 306 C132 342 150 384 192 398 C232 410 264 392 270 356 C274 332 264 312 256 296 C246 276 240 258 240 236 L240 0" />
            {/* tibia with slight posterior slope and tuberosity */}
            <path className="k-bone" data-draw data-group="bone2" d="M132 422 C168 410 226 410 270 416 C282 418 286 428 282 440 C276 456 266 466 266 482 C266 494 260 506 258 520 M132 422 C128 442 142 458 158 468 L162 520" />
            {/* fibula, posterolateral */}
            <path className="k-bone" data-draw data-group="bone2" d="M144 474 C130 476 128 492 138 498 L142 520 M156 476 C152 490 154 504 154 520" />
            {/* patella + patellar tendon */}
            <path className="k-bone" data-draw data-group="bone2" d="M272 250 C294 258 302 300 290 330 C282 344 268 334 264 304 C261 280 262 262 272 250 Z" />
            <path className="k-bone k-bone--soft" data-draw data-group="bone2" d="M286 336 C284 380 278 430 270 470" />
            {/* ACL: posterior femur (notch) → anterior tibial plateau */}
            <path className="k-glow" id="qh-acl-glow" d="M178 362 C192 380 210 398 230 413" />
            <path className="k-acl" id="qh-acl" data-draw d="M178 362 C192 380 210 398 230 413" />
            {/* menisci – wedge-shaped horns in the sagittal plane */}
            <path className="k-men" data-draw data-group="men" d="M136 420 L176 413 C160 409 148 404 140 397 Z" />
            <path className="k-men" data-draw data-group="men" d="M270 415 L232 412 C246 408 258 400 264 390 Z" />
            {/* articular cartilage */}
            <path className="k-cart" data-draw data-group="cart" d="M145 340 C142 372 162 392 194 392 C226 396 256 384 262 360" />
            <path className="k-cart" data-draw data-group="cart" d="M178 416 C200 413 222 413 246 415" />
            <path className="k-cart" data-draw data-group="cart" d="M268 262 C264 284 265 308 272 324" />
            {/* leaders */}
            <path className="k-leader" data-leader data-draw id="qh-lead-acl" d="M204 388 L268 308 L330 308" />
            <path className="k-leader k-leader--minor" data-leader data-draw id="qh-lead-men" d="M252 406 L300 458 L330 458" />
            <path className="k-leader k-leader--minor" data-leader data-draw id="qh-lead-cart" d="M150 368 L116 320 L96 320" />
          </svg>
        </div>
        <span className="qh-intro__label qh-intro__label--acl" data-label="acl">
          <span className="qh-intro__long">{labels.acl}</span>
          <span className="qh-intro__short">{labels.aclShort}</span>
        </span>
        <span className="qh-intro__label qh-intro__label--men qh-intro__label--minor" data-label="men">
          {labels.meniscus}
        </span>
        <span className="qh-intro__label qh-intro__label--cart qh-intro__label--minor" data-label="cart">
          {labels.cartilage}
        </span>
      </div>

      <div className="qh-intro__line" data-intro-line />
      <div className="qh-intro__count" data-intro-count>
        000
      </div>
    </div>
  );
}
