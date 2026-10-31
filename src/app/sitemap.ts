import type { MetadataRoute } from 'next';
import { getArticleTopic, getIndexableArticles, lastModified } from '@/utils/articles';
import { templates } from '@/data/templates';
import { SITE_URL, absoluteUrl, topics } from '@/utils/site';

// Built from the same article index as the pages, so it can never list a URL that doesn't exist.
// noindex articles stay out: a sitemap should only list pages we want indexed.
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getIndexableArticles();
  const newest = (list: typeof articles) => list.map(lastModified).sort().pop();
  const latest = newest(articles);

  return [
    { url: `${SITE_URL}/`, lastModified: latest },
    { url: `${SITE_URL}/articles`, lastModified: latest },
    { url: `${SITE_URL}/about`, lastModified: latest },
    { url: `${SITE_URL}/templates`, lastModified: templates.map((template) => template.updated).sort().pop() },
    ...templates.map((template) => ({ url: `${SITE_URL}/templates/${template.slug}`, lastModified: template.updated })),
    ...topics.map((topic) => ({
      url: `${SITE_URL}/topics/${topic.slug}`,
      lastModified: newest(articles.filter((article) => getArticleTopic(article).slug === topic.slug)) ?? latest,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: lastModified(article),
      ...(article.frontmatter.image && { images: [absoluteUrl(article.frontmatter.image)] }),
    })),
  ];
}
