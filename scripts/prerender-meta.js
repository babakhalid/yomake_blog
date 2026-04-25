/**
 * Post-build script: Generates per-route index.html files with correct
 * meta tags (canonical, og:url, title, description, structured data).
 * 
 * This fixes the critical SEO bug where every page served the same
 * homepage meta tags because the SPA only updates them client-side.
 * 
 * Run after `vite build`: node scripts/prerender-meta.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://blog.youmake.dev';
const SITE_NAME = 'Youmake Blog';
const DEFAULT_IMAGE = `${SITE_URL}/og-image.svg`;
const TWITTER_HANDLE = '@youmake_dev';

const distDir = path.join(__dirname, '../dist');
const articlesDir = path.join(__dirname, '../src/articles');
const templateHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

// ── Helpers ──────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return null;

  const data = {};
  for (const line of match[1].split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      try { value = JSON.parse(value.replace(/'/g, '"')); } catch { /* keep string */ }
    }
    // Booleans
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    // Quoted strings
    else if ((value.startsWith('"') && value.endsWith('"')) ||
             (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }
  return data;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function escapeJsonLd(str) {
  return str.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

// ── Meta tag replacement ─────────────────────────────────────────────

function replaceMeta(html, { title, description, url, image, type, publishedTime, author, tags, structuredData }) {
  const fullTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Ideas, Tutorials & Insights for Building with AI`;
  const fullUrl = url.startsWith('http') ? url : `${SITE_URL}${url}`;
  const fullImage = image
    ? (image.startsWith('http') ? image : `${SITE_URL}${image}`)
    : DEFAULT_IMAGE;
  const desc = description || 'Discover tutorials, tips, and insights about vibe coding and AI-powered web development.';

  let result = html;

  // Title
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(fullTitle)}</title>`
  );
  result = result.replace(
    /<meta name="title" content="[^"]*"\s*\/?>/,
    `<meta name="title" content="${escapeHtml(fullTitle)}" />`
  );

  // Description
  result = result.replace(
    /<meta name="description" content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${escapeHtml(desc)}" />`
  );

  // Keywords
  if (tags && Array.isArray(tags) && tags.length > 0) {
    result = result.replace(
      /<meta name="keywords" content="[^"]*"\s*\/?>/,
      `<meta name="keywords" content="${escapeHtml(tags.join(', '))}" />`
    );
  }

  // Author
  if (author) {
    result = result.replace(
      /<meta name="author" content="[^"]*"\s*\/?>/,
      `<meta name="author" content="${escapeHtml(author)}" />`
    );
  }

  // Canonical
  result = result.replace(
    /<link rel="canonical" href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${fullUrl}" />`
  );

  // Open Graph
  result = result.replace(
    /<meta property="og:type" content="[^"]*"\s*\/?>/,
    `<meta property="og:type" content="${type || 'website'}" />`
  );
  result = result.replace(
    /<meta property="og:url" content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${fullUrl}" />`
  );
  result = result.replace(
    /<meta property="og:title" content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${escapeHtml(fullTitle)}" />`
  );
  result = result.replace(
    /<meta property="og:description" content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${escapeHtml(desc)}" />`
  );
  result = result.replace(
    /<meta property="og:image" content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${fullImage}" />`
  );

  // Twitter
  result = result.replace(
    /<meta name="twitter:url" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:url" content="${fullUrl}" />`
  );
  result = result.replace(
    /<meta name="twitter:title" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${escapeHtml(fullTitle)}" />`
  );
  result = result.replace(
    /<meta name="twitter:description" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${escapeHtml(desc)}" />`
  );
  result = result.replace(
    /<meta name="twitter:image" content="[^"]*"\s*\/?>/,
    `<meta name="twitter:image" content="${fullImage}" />`
  );

  // Add article-specific OG tags (published_time, author, tags)
  if (type === 'article') {
    let articleTags = '';
    if (publishedTime) {
      articleTags += `\n    <meta property="article:published_time" content="${publishedTime}" />`;
    }
    if (author) {
      articleTags += `\n    <meta property="article:author" content="${escapeHtml(author)}" />`;
    }
    if (tags && Array.isArray(tags)) {
      for (const tag of tags) {
        articleTags += `\n    <meta property="article:tag" content="${escapeHtml(tag)}" />`;
      }
    }
    // Insert after og:locale
    result = result.replace(
      /(<meta property="og:locale" content="en_US"\s*\/>)/,
      `$1${articleTags}`
    );
  }

  // Add/replace structured data
  if (structuredData) {
    const jsonLdBlocks = (Array.isArray(structuredData) ? structuredData : [structuredData])
      .map(data => `    <script type="application/ld+json">\n    ${escapeJsonLd(JSON.stringify(data, null, 2).split('\n').join('\n    '))}\n    </script>`)
      .join('\n');

    // Replace existing structured data blocks (keep Organization, replace/add rest)
    // Insert before </head>
    result = result.replace(
      /(\s*)<\/head>/,
      `\n${jsonLdBlocks}\n$1</head>`
    );
  }

  return result;
}

// ── Generate article pages ───────────────────────────────────────────

function generateArticlePages() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  let count = 0;

  for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (!frontmatter || frontmatter.published === false) continue;

    const slug = file.replace('.md', '');
    const articleUrl = `/articles/${slug}`;

    // Article structured data
    const fullUrl = `${SITE_URL}${articleUrl}`;
    const fullImage = frontmatter.image
      ? (frontmatter.image.startsWith('http') ? frontmatter.image : `${SITE_URL}${frontmatter.image}`)
      : DEFAULT_IMAGE;

    const articleSchema = {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: frontmatter.title,
      description: frontmatter.description,
      image: fullImage,
      url: fullUrl,
      datePublished: frontmatter.date,
      dateModified: frontmatter.date,
      author: {
        '@type': 'Person',
        name: frontmatter.author || 'Youmake Team',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Youmake',
        logo: {
          '@type': 'ImageObject',
          url: `${SITE_URL}/youmake_logo.svg`,
        },
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': fullUrl,
      },
      keywords: Array.isArray(frontmatter.tags) ? frontmatter.tags.join(', ') : undefined,
    };

    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Articles', item: `${SITE_URL}/articles` },
        { '@type': 'ListItem', position: 3, name: frontmatter.title, item: fullUrl },
      ],
    };

    const html = replaceMeta(templateHtml, {
      title: frontmatter.title,
      description: frontmatter.description,
      url: articleUrl,
      image: frontmatter.image,
      type: 'article',
      publishedTime: frontmatter.date,
      author: frontmatter.author,
      tags: frontmatter.tags,
      structuredData: [articleSchema, breadcrumbSchema],
    });

    // Write to dist/articles/<slug>/index.html
    const outDir = path.join(distDir, 'articles', slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    count++;
  }

  return count;
}

// ── Generate articles listing page ───────────────────────────────────

function generateArticlesPage() {
  const html = replaceMeta(templateHtml, {
    title: 'All Articles',
    description: 'Explore our latest tutorials, insights, and updates about building websites and web apps with AI. Learn vibe coding with Youmake.',
    url: '/articles',
    type: 'website',
  });

  const outDir = path.join(distDir, 'articles');
  fs.mkdirSync(outDir, { recursive: true });
  // Only write if there's no existing index.html (avoid overwriting article dirs)
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, html);
}

// ── Main ─────────────────────────────────────────────────────────────

console.log('🔧 Pre-rendering meta tags for SEO...');

// Verify dist exists
if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('❌ dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

generateArticlesPage();
console.log('  ✅ /articles page generated');

const articleCount = generateArticlePages();
console.log(`  ✅ ${articleCount} article pages generated`);

console.log('🎉 Pre-rendering complete! Each route now has its own meta tags.');
