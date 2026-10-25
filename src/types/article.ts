export interface ArticleFrontmatter {
  title: string;
  description: string;
  date: string;
  /** Last substantive update (YYYY-MM-DD); drives dateModified and sitemap lastmod. */
  updated?: string;
  author: string;
  tags: string[];
  /** Topic hub slug from src/data/site.json. */
  topic?: string;
  image?: string;
  published?: boolean;
}

export interface ArticleMeta {
  slug: string;
  frontmatter: ArticleFrontmatter;
  /** Estimated reading time, from scripts/generate-index.mjs. */
  minutes?: number;
}

export interface Article extends ArticleMeta {
  content: string;
}

export interface Topic {
  slug: string;
  name: string;
  description: string;
}

/** Serializable listing data passed from server pages to client components. */
export interface ArticleSummary {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  minutes?: number;
  /** Topic hub slug (already resolved to a valid hub). */
  topic: string;
}
