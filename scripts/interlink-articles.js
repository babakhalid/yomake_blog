/**
 * Automatic Article Interlinking Script
 * 
 * Scans all published articles and adds contextual internal links:
 * 1. Finds related articles based on shared tags and keyword overlap
 * 2. Injects a "Related Articles" section at the bottom of articles that don't have one
 * 3. Can optionally inject inline contextual links (future enhancement)
 * 
 * Run: node scripts/interlink-articles.js [--dry-run] [--target slug]
 * 
 * --dry-run    Show what would change without writing files
 * --target     Only process a specific article (by slug)
 * --max N      Max related articles to link (default: 3)
 * --all        Process all articles (default: only articles without related section)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const articlesDir = path.join(__dirname, '../src/articles');
const SITE_URL = 'https://blog.youmake.dev';

// ── CLI Args ──────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const PROCESS_ALL = args.includes('--all');
const MAX_RELATED = parseInt(args[args.indexOf('--max') + 1]) || 3;
const TARGET_SLUG = args.includes('--target') ? args[args.indexOf('--target') + 1] : null;

// ── Helpers ──────────────────────────────────────────────────────────

function parseFrontmatter(content) {
  const match = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
  if (!match) return null;

  const data = {};
  const [, frontmatterStr, body] = match;

  for (const line of frontmatterStr.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      try { value = JSON.parse(value.replace(/'/g, '"')); } catch { /* keep string */ }
    } else if (value === 'true') value = true;
    else if (value === 'false') value = false;
    else if ((value.startsWith('"') && value.endsWith('"')) ||
             (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, body };
}

function extractKeywords(article) {
  const words = new Set();
  
  // From explicit keywords field
  if (Array.isArray(article.data.keywords)) {
    article.data.keywords.forEach(k => {
      k.toLowerCase().split(/\s+/).forEach(w => {
        if (w.length > 3) words.add(w);
      });
    });
  }
  
  // From tags
  if (Array.isArray(article.data.tags)) {
    article.data.tags.forEach(t => words.add(t.toLowerCase()));
  }
  
  // From title
  if (article.data.title) {
    article.data.title.toLowerCase().split(/[\s\-—:,]+/).forEach(w => {
      if (w.length > 4) words.add(w);
    });
  }

  return words;
}

function calculateRelevance(articleA, articleB) {
  let score = 0;

  // Tag overlap (strongest signal)
  const tagsA = new Set((articleA.data.tags || []).map(t => t.toLowerCase()));
  const tagsB = new Set((articleB.data.tags || []).map(t => t.toLowerCase()));
  const sharedTags = [...tagsA].filter(t => tagsB.has(t));
  score += sharedTags.length * 3;

  // Keyword overlap
  const keywordsA = extractKeywords(articleA);
  const keywordsB = extractKeywords(articleB);
  const sharedKeywords = [...keywordsA].filter(k => keywordsB.has(k));
  score += sharedKeywords.length * 1;

  // Recency bonus (prefer linking to recent articles)
  const dateB = new Date(articleB.data.date);
  const now = new Date();
  const daysSincePublished = (now - dateB) / (1000 * 60 * 60 * 24);
  if (daysSincePublished < 7) score += 2;
  else if (daysSincePublished < 30) score += 1;

  return score;
}

function hasRelatedSection(body) {
  return /##\s*(Related|Further Reading|You Might Also Like|Read Next)/i.test(body);
}

function generateRelatedSection(relatedArticles) {
  const lines = [
    '',
    '---',
    '',
    '## Read Next',
    '',
  ];

  for (const article of relatedArticles) {
    lines.push(`- [${article.data.title}](/articles/${article.slug})`);
  }

  lines.push('');
  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────

function main() {
  // Load all articles
  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  const articles = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const parsed = parseFrontmatter(content);
    if (!parsed || parsed.data.published === false) continue;

    articles.push({
      slug: file.replace('.md', ''),
      file,
      ...parsed,
      rawContent: content,
    });
  }

  console.log(`📚 Loaded ${articles.length} published articles`);

  // Determine which articles to process
  let toProcess = articles;
  if (TARGET_SLUG) {
    toProcess = articles.filter(a => a.slug === TARGET_SLUG);
    if (toProcess.length === 0) {
      console.error(`❌ Article not found: ${TARGET_SLUG}`);
      process.exit(1);
    }
  } else if (!PROCESS_ALL) {
    toProcess = articles.filter(a => !hasRelatedSection(a.body));
  }

  console.log(`🔗 Processing ${toProcess.length} articles (${PROCESS_ALL ? 'all' : 'missing related section'})`);

  let modified = 0;

  for (const article of toProcess) {
    // Find related articles
    const scored = articles
      .filter(a => a.slug !== article.slug)
      .map(a => ({ ...a, relevanceScore: calculateRelevance(article, a) }))
      .filter(a => a.relevanceScore > 2) // Minimum relevance threshold
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, MAX_RELATED);

    if (scored.length === 0) {
      console.log(`  ⚠️  ${article.slug} — no sufficiently related articles found`);
      continue;
    }

    // Build the related section
    const relatedSection = generateRelatedSection(scored);

    // Remove existing related section if --all mode (to regenerate)
    let newBody = article.body;
    if (PROCESS_ALL && hasRelatedSection(newBody)) {
      // Remove from the related heading to the end
      newBody = newBody.replace(/\n---\s*\n##\s*(Related|Further Reading|You Might Also Like|Read Next)[\s\S]*$/, '');
    }

    // Append related section
    newBody = newBody.trimEnd() + relatedSection;

    // Reconstruct the full file
    const frontmatterMatch = article.rawContent.match(/^(---\s*\n[\s\S]*?\n---\s*\n)/);
    const newContent = frontmatterMatch[1] + newBody;

    if (DRY_RUN) {
      console.log(`  ✓ ${article.slug} → would link to:`);
      scored.forEach(s => console.log(`      - ${s.slug} (score: ${s.relevanceScore})`));
    } else {
      fs.writeFileSync(path.join(articlesDir, article.file), newContent);
      console.log(`  ✓ ${article.slug} → linked to ${scored.length} articles`);
      modified++;
    }
  }

  console.log(`\n${DRY_RUN ? '🏃 Dry run complete' : `✅ Modified ${modified} articles`}`);
}

main();
