import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArticleCard } from '@/components';
import { getAllArticles, getArticleTopic, topics } from '@/utils';
import { SEO, generateBreadcrumbSchema } from '@/components/SEO';
import './ArticlesPage.css';

const ARTICLES_PER_PAGE = 12;

// Filter by the 6 topic hubs plus a text search over titles and descriptions.
// (The old filter listed every frontmatter tag, several hundred chips.)
export function ArticlesPage() {
  const allArticles = getAllArticles();
  const [topic, setTopic] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [displayCount, setDisplayCount] = useState(ARTICLES_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const needle = query.trim().toLowerCase();
  const filteredArticles = allArticles.filter((article) => {
    if (topic && getArticleTopic(article).slug !== topic) return false;
    if (!needle) return true;
    const { title, description } = article.frontmatter;
    return `${title} ${description}`.toLowerCase().includes(needle);
  });
  const displayedArticles = filteredArticles.slice(0, displayCount);
  const hasMore = displayCount < filteredArticles.length;
  const countFor = (slug: string) => allArticles.filter((article) => getArticleTopic(article).slug === slug).length;

  const chooseTopic = (slug: string | null) => {
    setTopic(slug);
    setDisplayCount(ARTICLES_PER_PAGE);
  };

  useEffect(() => {
    const node = loadMoreRef.current;
    if (!node || !hasMore) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) setDisplayCount((count) => count + ARTICLES_PER_PAGE);
      },
      { rootMargin: '200px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
  ]);

  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Articles - Youmake Blog',
    description: 'Tutorials, guides and analysis about building websites, apps and agents with AI.',
    url: 'https://blog.youmake.dev/articles',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allArticles.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://blog.youmake.dev/articles/${article.slug}`,
        name: article.frontmatter.title,
      })),
    },
  };

  const activeTopic = topics.find((item) => item.slug === topic);

  return (
    <div className="articles-page">
      <SEO
        title="All Articles"
        description="Tutorials, guides and analysis about building websites, web apps and AI agents. Learn vibe coding and ship real products with Youmake."
        url="/articles"
        structuredData={[breadcrumbSchema, collectionSchema]}
      />
      <div className="container">
        <header className="articles-header">
          <span className="eyebrow">The Youmake blog</span>
          <h1 className="articles-title">All articles</h1>
          <p className="articles-description">
            Guides, comparisons and analysis for people building with AI. Filter by topic or search a title.
          </p>
        </header>

        <div className="articles-toolbar">
          <div className="topic-filter" role="group" aria-label="Filter by topic">
            <button type="button" className={`tag-btn ${!topic ? 'active' : ''}`} aria-pressed={!topic} onClick={() => chooseTopic(null)}>
              All <span className="tag-count">{allArticles.length}</span>
            </button>
            {topics.map((item) => (
              <button
                key={item.slug}
                type="button"
                className={`tag-btn ${topic === item.slug ? 'active' : ''}`}
                aria-pressed={topic === item.slug}
                onClick={() => chooseTopic(item.slug)}
              >
                {item.name} <span className="tag-count">{countFor(item.slug)}</span>
              </button>
            ))}
          </div>

          <div className="tags-search">
            <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search articles"
              aria-label="Search articles"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setDisplayCount(ARTICLES_PER_PAGE); }}
              className="tags-search-input"
            />
            {query && (
              <button type="button" className="search-clear" onClick={() => setQuery('')} aria-label="Clear search">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <p className="results-line">
          {filteredArticles.length} {filteredArticles.length === 1 ? 'article' : 'articles'}
          {activeTopic && <> in <Link to={`/topics/${activeTopic.slug}`}>{activeTopic.name}</Link></>}
          {needle && <> matching “{query.trim()}”</>}
        </p>

        {filteredArticles.length > 0 ? (
          <>
            <div className="articles-grid">
              {displayedArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            {hasMore && <div className="load-more-trigger" ref={loadMoreRef} aria-hidden="true" />}
          </>
        ) : (
          <div className="no-articles">
            <p>No articles match that search.</p>
            <button type="button" className="btn" onClick={() => { setQuery(''); chooseTopic(null); }}>Clear filters</button>
          </div>
        )}
      </div>
    </div>
  );
}
