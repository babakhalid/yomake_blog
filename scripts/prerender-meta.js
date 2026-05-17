/**
 * Post-build script: Generates per-route index.html files with correct
 * meta tags (canonical, og:url, title, description, structured data)
 * AND injects hidden semantic HTML body content for crawler indexing.
 * 
 * This fixes the critical SEO bug where every page served the same
 * homepage meta tags because the SPA only updates them client-side,
 * and ensures crawlers that don't execute JavaScript still get the
 * full article text content.
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

/**
 * Convert markdown body to simple semantic HTML for crawler consumption.
 * Not a full markdown parser — handles headings, paragraphs, bold, italic,
 * links, lists, blockquotes, and code blocks. Good enough for SEO content.
 */
function markdownToHtml(md) {
  let html = md;

  // Remove images (already handled by og:image and structured data)
  html = html.replace(/!\[([^\]]*)\]\([^)]+\)/g, '');

  // Code blocks → <pre><code>
  html = html.replace(/```[\w]*\n([\s\S]*?)```/g, (_, code) =>
    `<pre><code>${escapeHtml(code.trim())}</code></pre>`
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

  // Headings
  html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

  // Bold + Italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

  // Unordered lists
  html = html.replace(/^[-*]\s+(.+)$/gm, '<li>$1</li>');
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');

  // Horizontal rules
  html = html.replace(/^---+$/gm, '<hr />');

  // Paragraphs: wrap remaining non-empty, non-tag lines
  const lines = html.split('\n');
  const result = [];
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      result.push('');
    } else if (/^<(h[1-6]|ul|ol|li|pre|blockquote|hr|div|p|table|thead|tbody|tr|th|td)/.test(trimmed)) {
      result.push(trimmed);
    } else {
      result.push(`<p>${trimmed}</p>`);
    }
  }

  // Clean up empty paragraphs and excessive whitespace
  return result
    .join('\n')
    .replace(/<p><\/p>/g, '')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Extract the markdown body (everything after frontmatter)
 */
function extractBody(content) {
  const match = content.match(/^---\s*\n[\s\S]*?\n---\s*\n([\s\S]*)/);
  return match ? match[1].trim() : content;
}

/**
 * Inject a hidden <div id="seo-content"> inside <body> alongside <div id="root">.
 * Visually hidden via inline style but fully readable by crawlers.
 * React hydrates into #root; #seo-content is invisible to users.
 */
function injectSeoContent(html, seoHtml) {
  if (!seoHtml) return html;
  const seoBlock = `\n    <div id="seo-content" style="position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0" aria-hidden="true">${seoHtml}\n    </div>`;
  return html.replace(
    '<div id="root"></div>',
    `<div id="root"></div>${seoBlock}`
  );
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

// ── Collect all articles (for listing page SEO content) ──────────────

function getAllArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  const articles = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);
    if (!frontmatter || frontmatter.published === false) continue;
    articles.push({
      slug: file.replace('.md', ''),
      content,
      frontmatter,
    });
  }

  // Sort by date descending
  articles.sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));
  return articles;
}

// ── Generate article pages ───────────────────────────────────────────

function generateArticlePages(articles) {
  let count = 0;

  for (const { slug, content, frontmatter } of articles) {
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

    let html = replaceMeta(templateHtml, {
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

    // Inject full article body as hidden semantic HTML for crawlers
    const bodyMd = extractBody(content);
    const bodyHtml = markdownToHtml(bodyMd);
    const articleSeoHtml = `
      <article>
        <h1>${escapeHtml(frontmatter.title)}</h1>
        <p><time datetime="${frontmatter.date}">${frontmatter.date}</time> · ${escapeHtml(frontmatter.author || 'Youmake Team')}</p>
        ${bodyHtml}
      </article>`;
    html = injectSeoContent(html, articleSeoHtml);

    // Write to dist/articles/<slug>/index.html
    const outDir = path.join(distDir, 'articles', slug);
    fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(path.join(outDir, 'index.html'), html);
    count++;
  }

  return count;
}

// ── Generate articles listing page ───────────────────────────────────

function generateArticlesPage(articles) {
  let html = replaceMeta(templateHtml, {
    title: 'All Articles',
    description: 'Explore our latest tutorials, insights, and updates about building websites and web apps with AI. Learn vibe coding with Youmake.',
    url: '/articles',
    type: 'website',
  });

  // Build listing SEO content: a linked list of all article titles + descriptions
  const listItems = articles.map(({ slug, frontmatter }) =>
    `<li><a href="/articles/${slug}">${escapeHtml(frontmatter.title)}</a> — ${escapeHtml(frontmatter.description || '')}</li>`
  ).join('\n        ');

  const listingSeoHtml = `
      <nav>
        <h1>All Articles — ${SITE_NAME}</h1>
        <p>Explore our latest tutorials, insights, and updates about building websites and web apps with AI.</p>
        <ul>
        ${listItems}
        </ul>
      </nav>`;
  html = injectSeoContent(html, listingSeoHtml);

  const outDir = path.join(distDir, 'articles');
  fs.mkdirSync(outDir, { recursive: true });
  const outPath = path.join(outDir, 'index.html');
  fs.writeFileSync(outPath, html);
}

// ── Generate homepage with SEO content ───────────────────────────────

function generateHomepage(articles) {
  // The dist/index.html is the homepage — enhance it with SEO content
  let html = templateHtml; // Already has correct homepage meta tags

  // Build homepage SEO content: intro + recent articles list
  const recentArticles = articles.slice(0, 20);
  const listItems = recentArticles.map(({ slug, frontmatter }) =>
    `<li><a href="/articles/${slug}">${escapeHtml(frontmatter.title)}</a> — ${escapeHtml(frontmatter.description || '')}</li>`
  ).join('\n        ');

  const homeSeoHtml = `
      <main>
        <h1>${SITE_NAME} — Ideas, Tutorials &amp; Insights for Building with AI</h1>
        <p>Discover tutorials, tips, and insights about vibe coding and AI-powered web development. Learn how to build websites and web apps with Youmake — the #1 Vibe Coding Platform.</p>
        <h2>Latest Articles</h2>
        <ul>
        ${listItems}
        </ul>
        <p><a href="/articles">View all ${articles.length} articles →</a></p>
      </main>`;
  html = injectSeoContent(html, homeSeoHtml);

  fs.writeFileSync(path.join(distDir, 'index.html'), html);
}

// ── Copy sitemap.xml → blog-sitemap.xml ──────────────────────────────

function copyBlogSitemap() {
  const src = path.join(distDir, 'sitemap.xml');
  const dest = path.join(distDir, 'blog-sitemap.xml');
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    return true;
  }
  return false;
}

// ── Main ─────────────────────────────────────────────────────────────

console.log('🔧 Pre-rendering meta tags + SEO body content...');

// Verify dist exists
if (!fs.existsSync(path.join(distDir, 'index.html'))) {
  console.error('❌ dist/index.html not found. Run `vite build` first.');
  process.exit(1);
}

// Collect all articles once (shared across generators)
const allArticles = getAllArticles();
console.log(`  📄 Found ${allArticles.length} published articles`);

generateHomepage(allArticles);
console.log('  ✅ Homepage enhanced with SEO content');

generateArticlesPage(allArticles);
console.log('  ✅ /articles page generated with article listing');

const articleCount = generateArticlePages(allArticles);
console.log(`  ✅ ${articleCount} article pages generated with full body content`);

if (copyBlogSitemap()) {
  console.log('  ✅ blog-sitemap.xml created (copy of sitemap.xml)');
}

console.log('🎉 Pre-rendering complete! Each route has meta tags + crawlable body content.');
