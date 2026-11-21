import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Dr. Qëndrim Hajdari – Orthopaedic & Trauma Surgery',
    short_name: 'Dr. Hajdari',
    start_url: '/sq',
    display: 'browser',
    background_color: '#F7F4EE',
    theme_color: '#263633',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
