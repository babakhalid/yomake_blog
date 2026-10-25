import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArticleCard, JsonLd } from '@/components';
import { getArticlesByTopic, toSummary } from '@/utils/articles';
import { SITE_URL, getTopic, topics } from '@/utils/site';
import { breadcrumbSchema, pageMetadata } from '@/utils/seo';
import '@/styles/ArticlesPage.css';

type Props = { params: Promise<{ topic: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return topics.map((topic) => ({ topic: topic.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const topic = getTopic((await params).topic);
  if (!topic) return {};
  return pageMetadata({ title: topic.name, description: topic.description, path: `/topics/${topic.slug}` });
}

// Topic hubs give every article a crawlable path from the home page: home →
// topic → article, with every article in the topic listed (no "load more").
export default async function TopicPage({ params }: Props) {
  const topic = getTopic((await params).topic);
  if (!topic) notFound();
  const articles = getArticlesByTopic(topic.slug);
  const url = `/topics/${topic.slug}`;

  return (
    <div className="articles-page">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: topic.name,
            description: topic.description,
            url: `${SITE_URL}${url}`,
            hasPart: articles.map((article) => ({ '@type': 'BlogPosting', headline: article.frontmatter.title, url: `${SITE_URL}/articles/${article.slug}` })),
          },
          breadcrumbSchema([{ name: 'Home', url: '/' }, { name: topic.name, url }]),
        ]}
      />
      <div className="container">
        <header className="articles-header">
          <span className="eyebrow">Topic · {articles.length} articles</span>
          <h1 className="articles-title">{topic.name}</h1>
          <p className="articles-description">{topic.description}</p>
          <nav className="tags-filter" aria-label="Topics">
            {topics.map((item) => (
              <Link key={item.slug} href={`/topics/${item.slug}`} className={`tag-btn ${item.slug === topic.slug ? 'active' : ''}`}>
                {item.name}
              </Link>
            ))}
          </nav>
        </header>
        <div className="articles-grid">
          {articles.map((article, index) => <ArticleCard key={article.slug} article={toSummary(article)} index={index} />)}
        </div>
      </div>
    </div>
  );
}
