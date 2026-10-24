import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://blog.youmake.dev';
const articlesDir = path.join(__dirname, '../src/articles');
const outputPath = path.join(__dirname, '../public/sitemap.xml');

// Parse frontmatter from markdown file
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes
    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    // Parse arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      value = value.slice(1, -1).split(',').map(item => {
        item = item.trim();
        if ((item.startsWith('"') && item.endsWith('"')) ||
            (item.startsWith("'") && item.endsWith("'"))) {
          return item.slice(1, -1);
        }
        return item;
      });
    }

    // Parse booleans
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    frontmatter[key] = value;
  }

  return frontmatter;
}

// Get all articles
function getArticles() {
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  const articles = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);

    if (frontmatter && frontmatter.published !== false) {
      articles.push({
        slug: file.replace('.md', ''),
        ...frontmatter
      });
    }
  }

  // Sort by date descending
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// Generate sitemap XML
function generateSitemap() {
  const articles = getArticles();
  const today = new Date().toISOString().split('T')[0];
  // Every article page changed materially on 2026-10-17 (visible prerendered body, author,
  // topic hubs, redesign). Floor lastmod at that date so Google recrawls pages it last saw
  // before the fix; later edits still win via the `updated` frontmatter field.
  const TEMPLATE_UPDATED = '2026-10-17';
  const lastmodOf = (article) => [article.updated || article.date, TEMPLATE_UPDATED].sort().pop();
  const latestArticleDate = articles.map(lastmodOf).sort().pop() || today;
  const site = JSON.parse(fs.readFileSync(path.join(articlesDir, '../data/site.json'), 'utf-8'));
  const topicOf = (article) => site.topics.some(t => t.slug === article.topic) ? article.topic : 'ai-industry';

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${latestArticleDate}</lastmod>

  </url>

  <!-- Articles Index -->
  <url>
    <loc>${SITE_URL}/articles</loc>
    <lastmod>${latestArticleDate}</lastmod>

  </url>

  <!-- Author -->
  <url>
    <loc>${SITE_URL}/about</loc>
    <lastmod>${latestArticleDate}</lastmod>
  </url>

  <!-- Topic hubs -->
${site.topics.map(topic => `  <url>
    <loc>${SITE_URL}/topics/${topic.slug}</loc>
    <lastmod>${articles.filter(a => topicOf(a) === topic.slug).map(lastmodOf).sort().pop() || latestArticleDate}</lastmod>
  </url>
`).join('')}
  <!-- Individual Articles -->
`;

  for (const article of articles) {
    xml += `  <url>
    <loc>${SITE_URL}/articles/${article.slug}</loc>
    <lastmod>${lastmodOf(article)}</lastmod>`;

    if (article.image) {
      const imageUrl = article.image.startsWith('http')
        ? article.image
        : `${SITE_URL}${article.image}`;
      xml += `
    <image:image>
      <image:loc>${imageUrl}</image:loc>
      <image:title>${escapeXml(article.title)}</image:title>
    </image:image>`;
    }

    xml += `
  </url>

`;
  }

  xml += `</urlset>`;

  return xml;
}

function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Main
const sitemap = generateSitemap();
fs.writeFileSync(outputPath, sitemap);
console.log('Sitemap generated successfully at', outputPath);
