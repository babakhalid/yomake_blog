import type { ArticleMeta, Topic } from '@/types';
import articlesIndex from '@/generated/articles-index.json';
import site from '@/data/site.json';

// Listings use the small generated index (scripts/generate-index.mjs); article
// bodies are separate chunks loaded on demand, so a page no longer ships all
// markdown in its bundle.
const articles = articlesIndex as ArticleMeta[];
const loaders = import.meta.glob<string>('/src/articles/*.md', { query: '?raw', import: 'default' });

export const author = site.author;
export const topics: Topic[] = site.topics;
const DEFAULT_TOPIC = 'ai-industry';

export function getAllArticles(): ArticleMeta[] {
  return articles;
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getTopic(slug: string | undefined): Topic | undefined {
  return topics.find((topic) => topic.slug === slug);
}

export function getArticleTopic(article: ArticleMeta): Topic {
  return getTopic(article.frontmatter.topic) ?? getTopic(DEFAULT_TOPIC)!;
}

export function getArticlesByTopic(topicSlug: string): ArticleMeta[] {
  return articles.filter((article) => getArticleTopic(article).slug === topicSlug);
}

export async function loadArticleContent(slug: string): Promise<string> {
  const load = loaders[`/src/articles/${slug}.md`];
  if (!load) return '';
  const raw = await load();
  // Drop frontmatter, then a leading "# title": the page already renders the title as the H1.
  return raw.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '').replace(/^\s*#\s+[^\n]*\n/, '').trim();
}

export function getArticlesByTag(tag: string): ArticleMeta[] {
  return articles.filter((article) =>
    article.frontmatter.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
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
