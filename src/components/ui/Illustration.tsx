import type { IllustrationId } from '@/content/types';
import { cn } from '@/lib/cn';
import { Annotation } from './Annotation';

/**
 * Original schematic line illustrations (not anatomically exact – declared as illustrations).
 * Replace with approved medical illustrations when available.
 */
const S = { stroke: 'var(--color-slate)', strokeWidth: 1.25, fill: 'none', vectorEffect: 'non-scaling-stroke' as const };
const B = { stroke: 'var(--color-bronze)', strokeWidth: 1.75, fill: 'none', strokeLinecap: 'round' as const, vectorEffect: 'non-scaling-stroke' as const };
const G = { stroke: 'var(--color-grey)', strokeWidth: 0.75, fill: 'none', strokeDasharray: '3 5', vectorEffect: 'non-scaling-stroke' as const, opacity: 0.6 };

function Art({ id }: { id: IllustrationId }) {
  switch (id) {
    case 'acl':
      return (
        <>
          <circle cx="200" cy="318" r="62" {...G} />
          <path d="M165 40v190c0 30-25 35-25 60s30 30 60 20c30 10 60 5 60-20s-25-30-25-60V40" {...S} />
          <path d="M140 342c0-12 20-16 60-14 40-2 60 2 60 14 0 18-20 28-28 43l-4 85M172 470l-4-85c-8-15-28-25-28-43" {...S} />
          <path d="M268 362l-3 108M278 362l-3 108" {...S} strokeWidth={0.9} />
          <path d="M148 333q22-9 42-3M210 330q22-6 42 3" {...S} />
          <path d="M188 302l24 34" {...G} strokeDasharray="2 3" opacity={0.9} />
          <path d="M216 298l-32 38" {...B} />
          <circle cx="216" cy="298" r="2.5" fill="var(--color-bronze)" />
          <circle cx="184" cy="336" r="2.5" fill="var(--color-bronze)" />
        </>
      );
    case 'meniscus':
      return (
        <>
          <path d="M80 250c0-80 70-110 120-90 50-20 120 10 120 90 0 70-60 95-120 85-60 10-120-15-120-85Z" {...S} />
          <path d="M190 190c-50-15-85 20-82 60 2 40 37 65 82 55" {...B} />
          <path d="M185 210c-35-5-55 18-53 42 2 26 23 40 53 35" {...B} strokeWidth={1.1} />
          <path d="M210 195c45-15 82 15 80 55-2 40-35 60-78 50" {...B} />
          <path d="M215 215c30-7 53 13 51 35-2 22-21 35-50 32" {...B} strokeWidth={1.1} />
          <path d="M196 238l4-8 4 8M196 262l4 8 4-8" {...S} strokeWidth={0.9} />
          <path d="M60 250h18M322 250h18M200 140v-18M200 352v18" {...G} />
        </>
      );
    case 'joint-replacement':
      return (
        <>
          <circle cx="200" cy="300" r="120" {...G} />
          <path d="M170 40v160l-5 10M230 40v160l5 10" {...S} />
          <path d="M150 210c0 70 40 80 50 70 10 10 50 0 50-70h-15v20c0 30-20 35-35 28-15 7-35 2-35-28v-20Z" {...B} />
          <path d="M155 300h90v12h-90Z" {...S} />
          <path d="M150 316h100v8H150ZM192 324l2 56h12l2-56" {...B} />
          <path d="M165 330l7 140M235 330l-7 140" {...S} />
        </>
      );
    case 'sports':
      return (
        <>
          <path d="M150 110c120 20 150 130 120 220" {...G} />
          <path d="M120 150l60 120 -40 130" {...G} strokeDasharray="1 6" />
          <path d="M175 118l50 132M187 112l52 135" {...S} />
          <path d="M226 270l-46 122M240 268l-48 126" {...S} />
          <circle cx="180" cy="114" r="12" {...S} />
          <circle cx="233" cy="262" r="15" {...S} />
          <circle cx="186" cy="398" r="9" {...S} />
          <path d="M190 405l52 14" {...S} />
          <path d="M268 230a70 70 0 0 1-8 110" {...B} />
          <path d="M254 337l6 4 6-6" {...B} />
          <path d="M292 210a100 100 0 0 1-10 150" {...B} strokeWidth={1} opacity={0.6} />
        </>
      );
    case 'trauma':
      return (
        <>
          <path d="M180 70c-20-10-25-35-5-45 15-6 30 2 25 12 5-10 20-18 35-12 20 10 15 35-5 45M180 70v175M220 70v175" {...S} />
          <path d="M180 255v175M220 255v175M180 430c-20 10-25 35-5 45 15 6 30-2 25-12 5 10 20 18 35 12 20-10 15-35-5-45" {...S} />
          <path d="M180 245l12 14 8-17 10 19 10-13" {...S} />
          <path d="M180 255l12-4 8 10 10-8 10 6" {...S} opacity={0.5} />
          <rect x="223" y="165" width="14" height="180" rx="7" {...B} />
          {[190, 222, 288, 320].map((y) => (
            <g key={y}>
              <circle cx="230" cy={y} r="3.5" {...B} strokeWidth={1.2} />
              <path d={`M226 ${y}h-40`} {...G} strokeDasharray="2 3" />
            </g>
          ))}
        </>
      );
    case 'knee-consultation':
    default:
      return (
        <>
          <circle cx="215" cy="280" r="78" {...B} strokeWidth={1} strokeDasharray="4 6" />
          <path d="M215 194v-16M215 382v-16M129 280h-16M317 280h-16" {...B} strokeWidth={1} />
          <path d="M160 40l18 200c2 35 52 45 67 15L215 40" {...S} />
          <path d="M175 300c0-10 25-12 75-8 8 8 0 20-10 26l-8 152M188 470l-3-152c-7-6-10-12-10-18" {...S} />
          <ellipse cx="262" cy="240" rx="11" ry="24" transform="rotate(-12 262 240)" {...S} />
          <path d="M182 296q30-8 62-2" {...S} strokeWidth={0.9} />
        </>
      );
  }
}

export function Illustration({
  id,
  label,
  caption,
  className,
  tone = 'sand',
}: {
  id: IllustrationId;
  /** accessible description */
  label: string;
  /** visible marker, e.g. "Schematic illustration" */
  caption: string;
  className?: string;
  tone?: 'sand' | 'white' | 'ivory';
}) {
  const bg = { sand: 'bg-sand', white: 'bg-white', ivory: 'bg-hover' }[tone];
  return (
    <figure className={cn('relative h-full w-full overflow-hidden', bg, className)}>
      <svg
        viewBox="0 0 400 500"
        role="img"
        aria-label={`${caption}: ${label}`}
        className="h-full w-full"
        preserveAspectRatio="xMidYMid meet"
        data-reveal-zoom
      >
        <Art id={id} />
      </svg>
      <figcaption className="absolute bottom-4 left-4">
        <Annotation>{caption}</Annotation>
      </figcaption>
    </figure>
  );
}
