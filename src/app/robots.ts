import type { MetadataRoute } from 'next';
import { site } from '@/config/site';

export default function robots(): MetadataRoute.Robots {
  const isProduction = site.demo
    ? false
    : process.env.VERCEL_ENV ? process.env.VERCEL_ENV === 'production' : process.env.ALLOW_INDEXING === 'true';
  return {
    rules: isProduction ? [{ userAgent: '*', allow: '/', disallow: ['/api/'] }] : [{ userAgent: '*', disallow: '/' }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
