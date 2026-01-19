import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { ArticleCard } from '@/components';
import { getAllArticles, getAllTags } from '@/utils';
import { SEO, generateBreadcrumbSchema } from '@/components/SEO';
import './ArticlesPage.css';

const ARTICLES_PER_PAGE = 9;

export function ArticlesPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [tagSearch, setTagSearch] = useState('');
  const [displayCount, setDisplayCount] = useState(ARTICLES_PER_PAGE);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const allArticles = getAllArticles();
  const allTags = getAllTags();

  // Filter tags based on search
  const filteredTags = useMemo(() => {
    if (!tagSearch.trim()) return allTags;
    return allTags.filter((tag) =>
      tag.toLowerCase().includes(tagSearch.toLowerCase())
    );
  }, [allTags, tagSearch]);

  const filteredArticles = selectedTag
    ? allArticles.filter((article) =>
        article.frontmatter.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      )
    : allArticles;

  // Reset display count when filter changes
  useEffect(() => {
    setDisplayCount(ARTICLES_PER_PAGE);
  }, [selectedTag]);

  const displayedArticles = filteredArticles.slice(0, displayCount);
  const hasMore = displayCount < filteredArticles.length;

  // Intersection Observer for infinite scroll
  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => Math.min(prev + ARTICLES_PER_PAGE, filteredArticles.length));
    }
  }, [hasMore, filteredArticles.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadMore]);

  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
  ]);

  // Generate CollectionPage structured data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Articles - Yomake Blog',
    description: 'Explore our latest tutorials, insights, and updates about building with AI and vibe coding.',
    url: 'https://blog.yomake.ai/articles',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allArticles.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://blog.yomake.ai/articles/${article.slug}`,
        name: article.frontmatter.title,
      })),
    },
  };

  return (
    <div className="articles-page">
      <SEO
        title="All Articles"
        description="Explore our latest tutorials, insights, and updates about building websites and web apps with AI. Learn vibe coding with Yomake."
        url="/articles"
        structuredData={[breadcrumbSchema, collectionSchema]}
      />
      <div className="container">
        <header className="articles-header">
          <h1 className="articles-title">All Articles</h1>
          <p className="articles-description">
            Explore our latest tutorials, insights, and updates about building with AI.
          </p>
        </header>

        {allTags.length > 0 && (
          <div className="tags-filter-container">
            <div className="tags-search">
              <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search tags..."
                value={tagSearch}
                onChange={(e) => setTagSearch(e.target.value)}
                className="tags-search-input"
              />
              {tagSearch && (
                <button
                  className="search-clear"
                  onClick={() => setTagSearch('')}
                  aria-label="Clear search"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18"/>
                    <path d="m6 6 12 12"/>
                  </svg>
                </button>
              )}
            </div>
            <div className="tags-filter">
              <button
                className={`tag-btn ${!selectedTag ? 'active' : ''}`}
                onClick={() => setSelectedTag(null)}
              >
                All
              </button>
              {filteredTags.map((tag) => (
                <button
                  key={tag}
                  className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                  onClick={() => setSelectedTag(tag)}
                >
                  {tag}
                </button>
              ))}
              {filteredTags.length === 0 && tagSearch && (
                <span className="no-tags-found">No tags found</span>
              )}
            </div>
          </div>
        )}

        {filteredArticles.length > 0 ? (
          <>
            <div className="articles-grid">
              {displayedArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} />
              ))}
            </div>
            {hasMore && (
              <div className="load-more-trigger" ref={loadMoreRef}>
                <div className="loading-spinner">
                  <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                    <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                  </svg>
                  <span>Loading more articles...</span>
                </div>
              </div>
            )}
            {!hasMore && filteredArticles.length > ARTICLES_PER_PAGE && (
              <div className="all-loaded">
                <span>All {filteredArticles.length} articles loaded</span>
              </div>
            )}
          </>
        ) : (
          <div className="no-articles">
            <p>No articles found{selectedTag ? ` for "${selectedTag}"` : ''}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
