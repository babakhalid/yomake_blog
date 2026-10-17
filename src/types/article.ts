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
