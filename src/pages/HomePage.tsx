import { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, formatDate } from '@/utils';
import { SEO, generateBlogSchema } from '@/components/SEO';
import './HomePage.css';

const INITIAL_ARTICLES = 4;
const ARTICLES_PER_LOAD = 4;

export function HomePage() {
  const articles = getAllArticles();
  const [featuredArticle, ...restArticles] = articles;

  const [displayCount, setDisplayCount] = useState(INITIAL_ARTICLES);
  const [hoveredImage, setHoveredImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const listRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const displayedArticles = restArticles.slice(0, displayCount);
  const hasMore = displayCount < restArticles.length;

  // Intersection Observer for infinite scroll
  const loadMore = useCallback(() => {
    if (hasMore) {
      setDisplayCount((prev) => Math.min(prev + ARTICLES_PER_LOAD, restArticles.length));
    }
  }, [hasMore, restArticles.length]);

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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (listRef.current) {
      const rect = listRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };

  return (
    <div className="home-page">
      <SEO
        title="Ideas, Tutorials & Insights for Building with AI"
        description="Discover tutorials, tips, and insights about vibe coding and AI-powered web development. Learn how to build websites and web apps with Yomake - the #1 Vibe Coding Platform."
        url="/"
        structuredData={generateBlogSchema()}
      />
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
        </div>
        <div className="container hero-content">
          <div className="hero-badge-wrapper">
            <span className="hero-badge">
              <span className="hero-badge-dot" />
              Yomake Blog
            </span>
          </div>
          <h1 className="hero-title">
            Ideas, tutorials & insights
            <br />
            <span className="hero-title-accent">for building with AI</span>
          </h1>
          <p className="hero-subtitle">
            Explore the future of web development with vibe coding
          </p>
        </div>
      </section>

      {featuredArticle && (
        <section className="featured">
          <div className="container">
            <Link to={`/articles/${featuredArticle.slug}`} className="featured-article">
              {featuredArticle.frontmatter.image && (
                <div className="featured-image">
                  <img
                    src={featuredArticle.frontmatter.image}
                    alt={featuredArticle.frontmatter.title}
                  />
                </div>
              )}
              <div className="featured-content">
                <span className="featured-label">Featured</span>
                <h2 className="featured-title">{featuredArticle.frontmatter.title}</h2>
                <p className="featured-description">{featuredArticle.frontmatter.description}</p>
                <div className="featured-meta">
                  <time dateTime={featuredArticle.frontmatter.date}>
                    {formatDate(featuredArticle.frontmatter.date)}
                  </time>
                  <span className="featured-divider">/</span>
                  <span>{featuredArticle.frontmatter.author}</span>
                </div>
              </div>
              <span className="featured-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </div>
        </section>
      )}

      <section className="recent">
        <div className="container">
          <div className="recent-header">
            <h2 className="recent-title">Recent</h2>
            <Link to="/articles" className="recent-link">
              View all
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </Link>
          </div>

          <div
            className="articles-list"
            ref={listRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setHoveredImage(null)}
          >
            {displayedArticles.map((article, index) => (
              <Link
                key={article.slug}
                to={`/articles/${article.slug}`}
                className="article-row"
                onMouseEnter={() => setHoveredImage(article.frontmatter.image || null)}
              >
                <span className="article-number">{String(index + 1).padStart(2, '0')}</span>
                <div className="article-info">
                  <h3 className="article-title">{article.frontmatter.title}</h3>
                  <p className="article-excerpt">{article.frontmatter.description}</p>
                </div>
                <time className="article-date" dateTime={article.frontmatter.date}>
                  {formatDate(article.frontmatter.date)}
                </time>
              </Link>
            ))}

            {hoveredImage && (
              <div
                className="hover-image"
                style={{
                  left: mousePos.x,
                  top: mousePos.y
                }}
              >
                <img src={hoveredImage} alt="" />
              </div>
            )}
          </div>

          {hasMore && (
            <div className="load-more-trigger" ref={loadMoreRef}>
              <div className="loading-indicator">
                <svg className="spinner" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                  <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
                </svg>
                <span>Loading more...</span>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <div className="cta-content">
            <p className="cta-label">Start building</p>
            <h2 className="cta-title">Ready to create with AI?</h2>
            <a
              href="https://yomake.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-button"
            >
              Try Yomake
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
