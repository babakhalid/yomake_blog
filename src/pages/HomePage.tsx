import { lazy, Suspense, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllArticles, getArticleBySlug, getArticleTopic, getArticlesByTopic, topics, formatDate } from '@/utils';
import { SEO, generateBlogSchema } from '@/components/SEO';
import { AuthorCard } from '@/components';
import type { ArticleMeta } from '@/types';
import './HomePage.css';

// WebGL sky from the main app; split out so article pages never load it.
const HeroSky = lazy(() => import('@/components/HeroSky'));

const START_HERE = ['best-ai-website-builders-2026', 'lovable-alternatives', 'best-vibe-coding-tools', 'what-is-vibe-coding'];
const PAGE_SIZE = 8;

function Meta({ article }: { article: ArticleMeta }) {
  return (
    <span className="meta">
      <span>{getArticleTopic(article).name}</span>
      <span aria-hidden="true">·</span>
      <time dateTime={article.frontmatter.date}>{formatDate(article.frontmatter.date)}</time>
      {article.minutes && <><span aria-hidden="true">·</span><span>{article.minutes} min read</span></>}
    </span>
  );
}

export function HomePage() {
  const articles = getAllArticles();
  const startHere = START_HERE.map(getArticleBySlug).filter((a): a is ArticleMeta => Boolean(a));
  // The buyer guides have their own "Start here" block, so the news-style feature skips them.
  const stream = articles.filter((article) => !START_HERE.includes(article.slug));
  const [lead, ...rest] = stream;
  const side = rest.slice(0, 3);
  const latest = rest.slice(3);
  const [shown, setShown] = useState(PAGE_SIZE);

  return (
    <div className="home-page">
      <SEO
        title="Ideas, Tutorials & Insights for Building with AI"
        description="Practical guides and analysis on vibe coding, AI app builders, AI agents and building products with AI, by Khalid BABA, founder of Youmake."
        url="/"
        structuredData={generateBlogSchema()}
      />

      <section className="home-hero">
        <Suspense fallback={<div className="hero-sky" aria-hidden="true"><div className="hero-sky-fallback" /></div>}>
          <HeroSky />
        </Suspense>
        <div className="home-hero-veil" aria-hidden="true" />
        <div className="container home-hero-inner">
          <span className="eyebrow">The Youmake blog</span>
          <h1 className="home-hero-title">Build with AI.<br />Read what actually works.</h1>
          <p className="home-hero-sub">
            Honest guides on vibe coding, AI app builders and agents, written for people who ship products, not demos.
          </p>
          <nav className="home-hero-topics" aria-label="Topics">
            {topics.map((topic) => (
              <Link key={topic.slug} to={`/topics/${topic.slug}`} className="chip">{topic.name}</Link>
            ))}
          </nav>
        </div>
      </section>

      {lead && (
        <section className="container home-featured" aria-label="Latest">
          <Link to={`/articles/${lead.slug}`} className="lead-story">
            {lead.frontmatter.image && (
              <div className="lead-media"><img src={lead.frontmatter.image} alt="" /></div>
            )}
            <div className="lead-body">
              <Meta article={lead} />
              <h2 className="lead-title">{lead.frontmatter.title}</h2>
              <p className="lead-desc">{lead.frontmatter.description}</p>
            </div>
          </Link>
          <div className="side-stories">
            <span className="eyebrow">Also new</span>
            {side.map((article) => (
              <Link key={article.slug} to={`/articles/${article.slug}`} className="side-story">
                <Meta article={article} />
                <h3>{article.frontmatter.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}

      {startHere.length > 0 && (
        <section className="container home-section">
          <div className="section-head">
            <span className="eyebrow">Start here</span>
            <h2>Choosing an AI builder</h2>
          </div>
          <div className="start-grid">
            {startHere.map((article, i) => (
              <Link key={article.slug} to={`/articles/${article.slug}`} className="start-item">
                <span className="start-index">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3>{article.frontmatter.title}</h3>
                  <p>{article.frontmatter.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="container home-section">
        <div className="section-head">
          <span className="eyebrow">Topics</span>
          <h2>Browse by what you’re building</h2>
        </div>
        <div className="topic-index">
          {topics.map((topic) => (
            <Link key={topic.slug} to={`/topics/${topic.slug}`} className="topic-row">
              <div>
                <h3>{topic.name}</h3>
                <p>{topic.description}</p>
              </div>
              <span className="topic-count">{getArticlesByTopic(topic.slug).length}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="container home-section">
        <div className="section-head section-head-row">
          <div>
            <span className="eyebrow">Latest</span>
            <h2>All articles</h2>
          </div>
          <Link to="/articles" className="btn">View all</Link>
        </div>
        <ol className="latest-list">
          {latest.slice(0, shown).map((article) => (
            <li key={article.slug}>
              <Link to={`/articles/${article.slug}`} className="latest-row">
                <Meta article={article} />
                <h3>{article.frontmatter.title}</h3>
                <p>{article.frontmatter.description}</p>
              </Link>
            </li>
          ))}
        </ol>
        {shown < latest.length && (
          <button type="button" className="btn latest-more" onClick={() => setShown((n) => n + PAGE_SIZE)}>
            Show more articles
          </button>
        )}
      </section>

      <section className="container home-section">
        <AuthorCard heading="Who writes this" />
      </section>

      <section className="container home-section">
        <div className="ink-cta">
          <div className="ink-cta-glow" aria-hidden="true" />
          <span className="eyebrow ink-eyebrow">Youmake</span>
          <h2>Describe it. Ship it.</h2>
          <p>Turn a sentence into a website, web app, mobile app or slide deck, then publish it on your own domain.</p>
          <a href="https://www.youmake.dev/" className="btn ink-btn">Start building</a>
        </div>
      </section>
    </div>
  );
}
