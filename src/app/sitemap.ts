import type { MetadataRoute } from 'next';
import { getAllArticles, getArticlesByTopic, lastModified } from '@/utils/articles';
import { SITE_URL, absoluteUrl, topics } from '@/utils/site';

// Built from the same article index as the pages, so it can never list a URL that doesn't exist.
export default function sitemap(): MetadataRoute.Sitemap {
  const articles = getAllArticles();
  const newest = (list: typeof articles) => list.map(lastModified).sort().pop();
  const latest = newest(articles);

  return [
    { url: `${SITE_URL}/`, lastModified: latest },
    { url: `${SITE_URL}/articles`, lastModified: latest },
    { url: `${SITE_URL}/about`, lastModified: latest },
    ...topics.map((topic) => ({
      url: `${SITE_URL}/topics/${topic.slug}`,
      lastModified: newest(getArticlesByTopic(topic.slug)) ?? latest,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/articles/${article.slug}`,
      lastModified: lastModified(article),
      ...(article.frontmatter.image && { images: [absoluteUrl(article.frontmatter.image)] }),
    })),
  ];
}
