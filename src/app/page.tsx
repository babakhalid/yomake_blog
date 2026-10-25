import Image from 'next/image';
import Link from 'next/link';
import { AuthorCard, JsonLd } from '@/components';
import { HeroSkyLoader } from '@/components/HeroSkyLoader';
import { LatestList } from '@/components/LatestList';
import { getAllArticles, getArticleBySlug, getArticleTopic, getArticlesByTopic, toSummary } from '@/utils/articles';
import { formatDate, topics } from '@/utils/site';
import { blogSchema, pageMetadata, websiteSchema } from '@/utils/seo';
import type { ArticleMeta } from '@/types';
import '@/styles/HomePage.css';

const START_HERE = ['best-ai-app-builders', 'best-ai-website-builders-2026', 'lovable-alternatives', 'best-vibe-coding-tools', 'what-is-vibe-coding'];

export const metadata = pageMetadata({ path: '/' });

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

export default function HomePage() {
  const articles = getAllArticles();
  const startHere = START_HERE.map(getArticleBySlug).filter((a): a is ArticleMeta => Boolean(a));
  // The buyer guides have their own "Start here" block, so the news-style feature skips them.
  const stream = articles.filter((article) => !START_HERE.includes(article.slug));
  const [lead, ...rest] = stream;
  const side = rest.slice(0, 3);
  const latest = rest.slice(3);

  return (
    <div className="home-page">
      <JsonLd data={[websiteSchema(), blogSchema()]} />

      <section className="home-hero">
        <HeroSkyLoader />
        <div className="home-hero-veil" aria-hidden="true" />
        <div className="container home-hero-inner">
          <div className="home-hero-copy">
            <span className="eyebrow">The Youmake blog</span>
            <h1 className="home-hero-title">Build with AI.<br />Read what actually works.</h1>
            <p className="home-hero-sub">
              Honest guides on vibe coding, AI app builders and agents, written for people who ship products, not demos.
            </p>
            <nav className="home-hero-topics" aria-label="Topics">
              {topics.map((topic) => (
                <Link key={topic.slug} href={`/topics/${topic.slug}`} className="chip">{topic.name}</Link>
              ))}
            </nav>
          </div>

          {startHere.length > 0 && (
            <nav className="hero-start" aria-labelledby="hero-start-title">
              <span className="eyebrow">Start here</span>
              <h2 id="hero-start-title" className="hero-start-title">Choosing an AI builder</h2>
              <ol className="hero-start-list">
                {startHere.map((article, i) => (
                  <li key={article.slug}>
                    <Link href={`/articles/${article.slug}`} className="hero-start-item">
                      <span className="start-index">{String(i + 1).padStart(2, '0')}</span>
                      <span className="hero-start-text">{article.frontmatter.title}</span>
                      <span className="hero-start-arrow" aria-hidden="true">&rarr;</span>
                    </Link>
                  </li>
                ))}
              </ol>
            </nav>
          )}
        </div>
      </section>

      {lead && (
        <section className="container home-featured" aria-label="Latest">
          <Link href={`/articles/${lead.slug}`} className="lead-story">
            {lead.frontmatter.image && (
              <div className="lead-media">
                <Image
                  src={lead.frontmatter.image}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 900px) 100vw, 760px"
                  unoptimized={lead.frontmatter.image.endsWith('.svg')}
                />
              </div>
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
              <Link key={article.slug} href={`/articles/${article.slug}`} className="side-story">
                <Meta article={article} />
                <h3>{article.frontmatter.title}</h3>
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
            <Link key={topic.slug} href={`/topics/${topic.slug}`} className="topic-row">
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
          <Link href="/articles" className="btn">View all</Link>
        </div>
        <LatestList articles={latest.map(toSummary)} />
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
