import type { NextConfig } from 'next';

// Old URLs that moved; permanent (308) so search engines transfer the ranking.
const MOVED_ARTICLES: [string, string][] = [
  ['ai-burnout-paradox-why-your-most-productive-tools-are-breaking-you', 'ai-burnout-paradox-why-productivity-tools-are-breaking-workers'],
  ['ai-infrastructure-race-data-centers-chip-wars-2026', 'ai-data-center-chip-wars-infrastructure-race-2026'],
  ['the-leadership-paradox-why-successful-leaders-have-worse-days', 'the-leadership-paradox-why-the-most-successful-people-have-the-worst-days'],
  ['vibe-coding-explained', 'what-is-vibe-coding'],
  ['vibe-coding-future-2026', 'what-is-vibe-coding'],
  ['ai-skills-gap-crisis-92-percent-students-using-ai-no-training', 'microsoft-ai-education-report-2026-92-percent-adoption-zero-training'],
  ['universities-scramble-ai-literacy-students-already-ahead', 'universities-ai-governance-crisis-95-percent-using-20-percent-ready'],
  ['meta-ai-moderation-encrypted-ai-privacy-race', 'corporate-ai-replacing-human-moderators-meta-automation'],
  ['why-80-percent-of-vc-money-is-chasing-ai-and-what-smart-founders-do-differently', 'ai-funding-monopoly-where-smart-founders-raise-money-2026'],
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // A stray lockfile in the parent folder would otherwise be taken as the workspace root.
  turbopack: { root: import.meta.dirname },
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/:slug', destination: '/articles/:slug', permanent: true },
      { source: '/index.html', destination: '/', permanent: true },
      ...MOVED_ARTICLES.map(([from, to]) => ({
        source: `/articles/${from}`,
        destination: `/articles/${to}`,
        permanent: true,
      })),
    ];
  },
  async rewrites() {
    // Some crawlers were given /blog-sitemap.xml; serve the same sitemap there.
    return [{ source: '/blog-sitemap.xml', destination: '/sitemap.xml' }];
  },
};

export default nextConfig;
