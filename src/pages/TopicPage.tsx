import { Link, Navigate, useParams } from 'react-router-dom';
import { ArticleCard } from '@/components';
import { SEO, generateBreadcrumbSchema } from '@/components/SEO';
import { getArticlesByTopic, getTopic, topics } from '@/utils';
import './ArticlesPage.css';

// Topic hubs give every article a crawlable path from the home page: home →
// topic → article, with every article in the topic listed (no "load more").
export function TopicPage() {
  const { topic: topicSlug } = useParams<{ topic: string }>();
  const topic = getTopic(topicSlug);
  if (!topic) return <Navigate to="/articles" replace />;
  const articles = getArticlesByTopic(topic.slug);
  const url = `/topics/${topic.slug}`;

  return (
    <div className="articles-page">
      <SEO
        title={topic.name}
        description={topic.description}
        url={url}
        structuredData={[
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: topic.name,
            description: topic.description,
            url: `https://blog.youmake.dev${url}`,
            hasPart: articles.map((article) => ({ '@type': 'BlogPosting', headline: article.frontmatter.title, url: `https://blog.youmake.dev/articles/${article.slug}` })),
          },
          generateBreadcrumbSchema([{ name: 'Home', url: '/' }, { name: topic.name, url }]),
        ]}
      />
      <div className="container">
        <header className="articles-header">
          <span className="eyebrow">Topic · {articles.length} articles</span>
          <h1 className="articles-title">{topic.name}</h1>
          <p className="articles-description">{topic.description}</p>
          <nav className="tags-filter" aria-label="Topics">
            {topics.map((item) => (
              <Link key={item.slug} to={`/topics/${item.slug}`} className={`tag-btn ${item.slug === topic.slug ? 'active' : ''}`}>
                {item.name}
              </Link>
            ))}
          </nav>
        </header>
        <div className="articles-grid">
          {articles.map((article) => <ArticleCard key={article.slug} article={article} />)}
        </div>
      </div>
    </div>
  );
}
