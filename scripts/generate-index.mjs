/**
 * Writes src/generated/articles-index.json: every published article's slug and
 * frontmatter, newest first. The app imports this small index for listings and
 * loads each article body on demand, instead of bundling all markdown into
 * every page (the bundle was 2.7 MB).
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const articlesDir = path.join(root, 'src/articles');
const outFile = path.join(root, 'src/generated/articles-index.json');

function parseFrontmatter(raw) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return null;
  const data = {};
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      try { value = JSON.parse(value.replace(/'/g, '"')); } catch { /* keep string */ }
    } else if (value === 'true' || value === 'false') {
      value = value === 'true';
    } else if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }
    data[key] = value;
  }
  return data;
}

const articles = fs.readdirSync(articlesDir)
  .filter(file => file.endsWith('.md'))
  .map(file => ({ slug: file.slice(0, -3), frontmatter: parseFrontmatter(fs.readFileSync(path.join(articlesDir, file), 'utf8')) }))
  .filter(({ frontmatter }) => frontmatter && frontmatter.published !== false)
  .sort((a, b) => new Date(b.frontmatter.date) - new Date(a.frontmatter.date));

fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, JSON.stringify(articles) + '\n');
console.log(`Indexed ${articles.length} articles → src/generated/articles-index.json`);
