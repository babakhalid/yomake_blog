import { JsonLd } from '@/components';
import { ArticlesBrowser } from '@/components/ArticlesBrowser';
import { getAllArticles, toSummary } from '@/utils/articles';
import { SITE_URL } from '@/utils/site';
import { breadcrumbSchema, pageMetadata } from '@/utils/seo';
import '@/styles/ArticlesPage.css';

const DESCRIPTION =
  'Tutorials, guides and analysis about building websites, web apps and AI agents. Learn vibe coding and ship real products with Youmake.';

export const metadata = pageMetadata({ title: 'All Articles', description: DESCRIPTION, path: '/articles' });

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Articles', url: '/articles' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'All Articles - Youmake Blog',
            description: DESCRIPTION,
            url: `${SITE_URL}/articles`,
            mainEntity: {
              '@type': 'ItemList',
              itemListElement: articles.slice(0, 10).map((article, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                url: `${SITE_URL}/articles/${article.slug}`,
                name: article.frontmatter.title,
              })),
            },
          },
        ]}
      />
      <ArticlesBrowser articles={articles.map(toSummary)} />
    </>
  );
}
