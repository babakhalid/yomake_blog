import { Helmet } from 'react-helmet-async';
import site from '@/data/site.json';

const SITE_URL = 'https://blog.youmake.dev';
const SITE_NAME = 'Youmake Blog';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;
const TWITTER_HANDLE = '@BabaKhaliid';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  tags?: string[];
  noIndex?: boolean;
  structuredData?: object | object[];
}

export function SEO({
  title,
  description = 'Discover tutorials, tips, and insights about vibe coding and AI-powered web development. Learn how to build websites and web apps with Youmake.',
  image = DEFAULT_IMAGE,
  url = SITE_URL,
  type = 'website',
  publishedTime,
  modifiedTime,
  author = 'Youmake Team',
  tags = [],
  noIndex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Ideas, Tutorials & Insights for Building with AI`;

  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const fullImage = image.startsWith('http') ? image : `${SITE_URL}${image}`;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      {author && <meta name="author" content={author} />}
      {tags.length > 0 && <meta name="keywords" content={tags.join(', ')} />}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="en_US" />

      {/* Article specific OG tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}
      {type === 'article' &&
        tags.map((tag) => (
          <meta property="article:tag" content={tag} key={tag} />
        ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:site" content={TWITTER_HANDLE} />
      <meta name="twitter:creator" content={TWITTER_HANDLE} />

      {/* Structured Data */}
      {structuredData && Array.isArray(structuredData) ? (
        structuredData.map((data, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(data)}
          </script>
        ))
      ) : structuredData ? (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      ) : null}
    </Helmet>
  );
}

// Helper function to generate BlogPosting structured data
export function generateArticleSchema({
  title,
  description,
  image,
  url,
  publishedTime,
  modifiedTime,
  author,
  tags,
}: {
  title: string;
  description: string;
  image?: string;
  url: string;
  publishedTime: string;
  modifiedTime?: string;
  author: string;
  tags?: string[];
}) {
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const fullImage = image?.startsWith('http') ? image : image ? `${SITE_URL}${image}` : DEFAULT_IMAGE;

  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description: description,
    image: fullImage,
    url: fullUrl,
    datePublished: publishedTime,
    dateModified: modifiedTime || publishedTime,
    author: generatePersonSchema(author),
    publisher: {
      '@type': 'Organization',
      name: 'Youmake',
      url: 'https://www.youmake.dev/',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/youmake_logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': fullUrl,
    },
    keywords: tags?.join(', '),
  };
}

// Person schema for an author; the site author gets a profile URL and sameAs links.
export function generatePersonSchema(name: string = site.author.name) {
  if (name !== site.author.name) return { '@type': 'Person', name };
  return {
    '@type': 'Person',
    name: site.author.name,
    url: `${SITE_URL}/about`,
    jobTitle: site.author.jobTitle,
    description: site.author.bio,
    sameAs: site.author.sameAs,
    worksFor: { '@type': 'Organization', name: 'Youmake', url: 'https://www.youmake.dev/' },
  };
}

// Helper function to generate Blog structured data
export function generateBlogSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: SITE_NAME,
    description: 'Discover tutorials, tips, and insights about vibe coding and AI-powered web development.',
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: 'Youmake',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/youmake_logo.svg`,
      },
    },
  };
}

// Helper function to generate BreadcrumbList structured data
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
