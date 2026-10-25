import type { Metadata } from 'next';
import type { ArticleMeta } from '@/types';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, TWITTER_HANDLE, absoluteUrl, author } from './site';

const LOGO = `${SITE_URL}/youmake_logo.svg`;
export const OG_SIZE = { width: 1200, height: 630 };
export const DEFAULT_OG_IMAGE = '/og/default.png';
export const RSS_ALTERNATE = { 'application/rss+xml': [{ url: '/feed.xml', title: SITE_NAME }] };

const publisher = {
  '@type': 'Organization',
  name: 'Youmake',
  url: 'https://www.youmake.dev/',
  logo: { '@type': 'ImageObject', url: LOGO },
};

/** Social card for an article (src/app/og/[image]): its cover resized to 1200×630, or a title card. */
export function ogImageFor(article: ArticleMeta): string {
  return `/og/${article.slug}.${article.frontmatter.image ? 'jpg' : 'png'}`;
}

interface PageMetadataInput {
  /** Page title; the root layout's template adds " | Youmake Blog". */
  title?: string;
  description?: string;
  /** Site-relative path, used for the canonical URL and og:url. */
  path: string;
  image?: string;
  /** Defaults to the 1200×630 social card size. */
  imageSize?: { width: number; height: number };
  imageAlt?: string;
  type?: 'website' | 'article' | 'profile';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
}

// One place for canonical, Open Graph and Twitter tags, so every route gets the
// same complete set (they used to be patched into HTML by a post-build script).
export function pageMetadata({
  title,
  description = SITE_DESCRIPTION,
  path,
  image = DEFAULT_OG_IMAGE,
  imageSize = OG_SIZE,
  imageAlt,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
}: PageMetadataInput): Metadata {
  const socialTitle = title ? `${title} | ${SITE_NAME}` : `${SITE_NAME} - Ideas, Tutorials & Insights for Building with AI`;
  const images = [{ url: image, ...imageSize, alt: imageAlt ?? title ?? SITE_NAME }];

  return {
    // Leave title unset (not undefined) on the home page so the layout's default applies.
    ...(title && { title }),
    description,
    keywords: tags,
    authors: authors?.map((name) => (name === author.name ? { name, url: `${SITE_URL}/about` } : { name })),
    // Pages replace the layout's `alternates` wholesale, so the RSS link is repeated here.
    alternates: { canonical: path, types: RSS_ALTERNATE },
    openGraph: {
      type,
      url: path,
      title: socialTitle,
      description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: authors?.map((name) => (name === author.name ? `${SITE_URL}/about` : name)),
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: TWITTER_HANDLE,
      creator: TWITTER_HANDLE,
      title: socialTitle,
      description,
      images,
    },
  };
}

// Person schema for an author; the site author gets a profile URL and sameAs links.
export function personSchema(name: string = author.name) {
  if (name !== author.name) return { '@type': 'Person', name };
  return {
    '@type': 'Person',
    '@id': `${SITE_URL}/about#person`,
    name: author.name,
    url: `${SITE_URL}/about`,
    image: author.image,
    jobTitle: author.jobTitle,
    description: author.bio,
    sameAs: author.sameAs,
    worksFor: { '@type': 'Organization', name: 'Youmake', url: 'https://www.youmake.dev/' },
  };
}

export function articleSchema(
  article: ArticleMeta,
  { url, image, modified, topicName, wordCount }: { url: string; image: string; modified: string; topicName: string; wordCount: number },
) {
  const { frontmatter } = article;
  const fullUrl = absoluteUrl(url);
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: frontmatter.title,
    description: frontmatter.description,
    image: absoluteUrl(image),
    url: fullUrl,
    datePublished: frontmatter.date,
    dateModified: modified,
    author: personSchema(frontmatter.author),
    publisher,
    mainEntityOfPage: { '@type': 'WebPage', '@id': fullUrl },
    articleSection: topicName,
    keywords: frontmatter.tags?.join(', '),
    wordCount,
    inLanguage: 'en-US',
    isPartOf: { '@type': 'Blog', '@id': `${SITE_URL}/#blog`, name: SITE_NAME },
  };
}

export function blogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${SITE_URL}/#blog`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    inLanguage: 'en-US',
    publisher,
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-US',
    publisher,
  };
}

/**
 * For ranked-list articles ("## 1. Youmake: best for ..."), an ItemList of the
 * entries, each pointing at its section. Returns undefined for other articles.
 */
export function rankedListSchema(headings: { id: string; text: string }[], url: string) {
  const entries = headings
    .map((heading) => ({ ...heading, match: heading.text.match(/^(\d+)\.\s+([^:]+):/) }))
    .filter((heading) => heading.match);
  if (entries.length < 3) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    numberOfItems: entries.length,
    itemListElement: entries.map((entry) => ({
      '@type': 'ListItem',
      position: Number(entry.match![1]),
      name: entry.match![2].trim(),
      url: `${absoluteUrl(url)}#${entry.id}`,
    })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}
