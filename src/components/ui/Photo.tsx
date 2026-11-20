import Image from 'next/image';
import type { Photo as PhotoData } from '@/content/media';
import type { Locale } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** Responsive photo filling its (sized) parent – AVIF/WebP via next/image. */
export function Photo({
  photo,
  locale,
  sizes,
  priority = false,
  className,
}: {
  photo: PhotoData;
  locale: Locale;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <Image
      src={photo.src}
      alt={photo.alt[locale]}
      fill
      sizes={sizes}
      priority={priority}
      quality={80}
      className={cn('object-cover', className)}
      style={{ objectPosition: photo.position ?? '50% 50%' }}
    />
  );
}
