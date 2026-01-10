import type { Article, ArticleFrontmatter } from '@/types';

// Simple frontmatter parser (browser-compatible)
function parseFrontmatter(rawContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: rawContent };
  }

  const [, frontmatterStr, content] = match;
  const data: Record<string, unknown> = {};

  // Parse YAML-like frontmatter
  const lines = frontmatterStr.split('\n');
  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Handle arrays like ["tag1", "tag2"]
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      try {
        value = JSON.parse(value.replace(/'/g, '"'));
      } catch {
        // Keep as string if parsing fails
      }
    }
    // Handle booleans
    else if (value === 'true') {
      value = true;
    } else if (value === 'false') {
      value = false;
    }
    // Handle quoted strings
    else if (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content: content.trim() };
}

// Import all markdown files from articles directory
const articleModules = import.meta.glob('/src/articles/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
});

export function getAllArticles(): Article[] {
  const articles: Article[] = [];

  for (const path in articleModules) {
    const rawContent = articleModules[path] as string;
    const slug = path.replace('/src/articles/', '').replace('.md', '');

    const { data, content } = parseFrontmatter(rawContent);
    const frontmatter = data as unknown as ArticleFrontmatter;

    // Only include published articles (or those without published field)
    if (frontmatter.published !== false) {
      articles.push({
        slug,
        frontmatter,
        content,
      });
    }
  }

  // Sort by date (newest first)
  return articles.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles();
  return articles.find((article) => article.slug === slug);
}

export function getArticlesByTag(tag: string): Article[] {
  const articles = getAllArticles();
  return articles.filter((article) =>
    article.frontmatter.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const articles = getAllArticles();
  const tagsSet = new Set<string>();

  articles.forEach((article) => {
    article.frontmatter.tags.forEach((tag) => {
      tagsSet.add(tag);
    });
  });

  return Array.from(tagsSet).sort();
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
