import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../src/articles');

// Parse frontmatter to check published status
function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
  if (!match) return {};

  const data = {};
  for (const line of match[1].split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();
    if (value === 'true') value = true;
    if (value === 'false') value = false;
    data[key] = value;
  }
  return data;
}

export function getPrerenderRoutes() {
  const routes = ['/', '/articles'];

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const frontmatter = parseFrontmatter(content);
    if (frontmatter.published !== false) {
      const slug = file.replace('.md', '');
      routes.push(`/articles/${slug}`);
    }
  }

  return routes;
}

// If run directly, print routes
if (process.argv[1] === __filename) {
  const routes = getPrerenderRoutes();
  console.log(`Found ${routes.length} routes to prerender:`);
  routes.forEach(r => console.log(`  ${r}`));
}
