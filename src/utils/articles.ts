import fs from 'node:fs/promises';
import path from 'node:path';
import GithubSlugger from 'github-slugger';
import sharp from 'sharp';
import type { ArticleMeta, ArticleSummary, Topic } from '@/types';
import articlesIndex from '@/generated/articles-index.json';
import { topicFor } from './site';

// Server-only: reads the generated index (scripts/generate-index.mjs) and the
// markdown files on disk. Every page is statically generated at build time.
const articles = articlesIndex as ArticleMeta[];
const ARTICLES_DIR = path.join(process.cwd(), 'src/articles');
const PUBLIC_DIR = path.join(process.cwd(), 'public');

/** Date every article page last changed materially (visible body, author, hubs). Floors dateModified and sitemap lastmod. */
export const TEMPLATE_UPDATED = '2026-10-17';

export function getAllArticles(): ArticleMeta[] {
  return articles;
}

export function getArticleBySlug(slug: string): ArticleMeta | undefined {
  return articles.find((article) => article.slug === slug);
}

export function getArticleTopic(article: ArticleMeta): Topic {
  return topicFor(article.frontmatter.topic);
}

export function getArticlesByTopic(topicSlug: string): ArticleMeta[] {
  return articles.filter((article) => getArticleTopic(article).slug === topicSlug);
}

/** Last substantive change, floored at the template change so recrawls pick up the new pages. */
export function lastModified(article: ArticleMeta): string {
  const { date, updated } = article.frontmatter;
  return [updated || date, TEMPLATE_UPDATED].sort().pop()!;
}

/** The small, serializable shape client components get (cards, filters, lists). */
export function toSummary(article: ArticleMeta): ArticleSummary {
  const { slug, frontmatter, minutes } = article;
  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    date: frontmatter.date,
    image: frontmatter.image,
    minutes,
    topic: getArticleTopic(article).slug,
  };
}

export async function loadArticleContent(slug: string): Promise<string> {
  const raw = await fs.readFile(path.join(ARTICLES_DIR, `${slug}.md`), 'utf8');
  // Drop frontmatter, then a leading "# title": the page already renders the title as the H1.
  return raw.replace(/^---\s*\n[\s\S]*?\n---\s*\n/, '').replace(/^\s*#\s+[^\n]*\n/, '').trim();
}

export interface Heading {
  id: string;
  text: string;
}

/**
 * The article's H2s for the table of contents. Ids come from the same slugger
 * rehype-slug uses, fed every heading in order, so duplicates get matching
 * "-1" suffixes and the links land on the rendered headings.
 */
export function extractHeadings(markdown: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inFence = false;
  for (const line of markdown.split('\n')) {
    if (/^\s*(```|~~~)/.test(line)) inFence = !inFence;
    const match = !inFence && line.match(/^(#{1,6})\s+(.+?)\s*#*\s*$/);
    if (!match) continue;
    // Plain text as rendered: link text kept, emphasis and code markers dropped.
    const text = match[2].replace(/!?\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*`]/g, '').trim();
    const id = slugger.slug(text);
    if (match[1].length === 2) headings.push({ id, text });
  }
  return headings;
}

/** Intrinsic size of an image under public/, so the cover reserves its space (no layout shift). */
export async function getImageSize(src: string): Promise<{ width: number; height: number } | undefined> {
  if (!src.startsWith('/')) return undefined;
  try {
    const { width, height } = await sharp(path.join(PUBLIC_DIR, src)).metadata();
    return width && height ? { width, height } : undefined;
  } catch {
    return undefined;
  }
}

export function readPublicFile(src: string): Promise<Buffer> {
  return fs.readFile(path.join(PUBLIC_DIR, src));
}
