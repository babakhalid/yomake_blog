import type { Topic } from '@/types';
import site from '@/data/site.json';

// Client-safe site data: no article index here, so client components can import it
// without shipping every article's frontmatter to the browser.
export const SITE_URL = 'https://blog.youmake.dev';
export const SITE_NAME = 'Youmake Blog';
export const SITE_DESCRIPTION =
  'Practical guides and analysis on vibe coding, AI app builders, AI agents and building products with AI, by Khalid BABA, founder of Youmake.';
export const TWITTER_HANDLE = '@BabaKhaliid';

export const author = site.author;
export const topics: Topic[] = site.topics;
const DEFAULT_TOPIC = 'ai-industry';

export function getTopic(slug: string | undefined): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

/** The article's topic hub; untagged articles fall back to AI Industry. */
export function topicFor(slug: string | undefined): Topic {
  return getTopic(slug) ?? getTopic(DEFAULT_TOPIC)!;
}

export function absoluteUrl(path: string): string {
  return path.startsWith('http') ? path : `${SITE_URL}${path}`;
}

export function formatDate(dateString: string): string {
  // Frontmatter dates are calendar days; format in UTC so they never shift a day
  // between the server render and a browser west of UTC.
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

/**
 * Where "Build this with AI" buttons go. The builder doesn't accept a prefilled
 * prompt yet; once it does, make this a function of the template's prompt.
 */
export const BUILDER_URL = 'https://www.youmake.dev/';
