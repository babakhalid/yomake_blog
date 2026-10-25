import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/utils/site';

// /_next/ must stay crawlable: it serves the CSS, scripts and optimized images
// Google needs to render the pages. (The old robots.txt blocked "/_".)
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
