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
  const latestArticleDate = articles[0]?.date || today;

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">

  <!-- Homepage -->
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${latestArticleDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>

  <!-- Articles Index -->
  <url>
    <loc>${SITE_URL}/articles</loc>
    <lastmod>${latestArticleDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>

  <!-- Individual Articles -->
`;

  for (const article of articles) {
    xml += `  <url>
    <loc>${SITE_URL}/articles/${article.slug}</loc>
    <lastmod>${article.date}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>`;

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
