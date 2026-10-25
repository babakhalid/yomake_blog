import Image from 'next/image';
import Link from 'next/link';
import { AUTHOR_PHOTO, JsonLd } from '@/components';
import { getAllArticles, getArticleTopic, getArticlesByTopic } from '@/utils/articles';
import { SITE_URL, author, formatDate, topics } from '@/utils/site';
import { pageMetadata, personSchema } from '@/utils/seo';
import '@/styles/AboutPage.css';

export const metadata = pageMetadata({
  title: `${author.name}, ${author.jobTitle}`,
  description: author.bio,
  path: '/about',
  type: 'profile',
  image: '/images/authors/khalid-baba.jpg',
  imageSize: { width: 622, height: 800 },
  imageAlt: `Portrait of ${author.name}`,
});

// Author page: every byline links here, and the Person schema (with LinkedIn and X
// in sameAs) points search engines at a real, verifiable author.
export default function AboutPage() {
  const articles = getAllArticles();
  const recent = articles.slice(0, 8);

  return (
    <div className="about-page">
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: `${SITE_URL}/about`,
          mainEntity: personSchema(author.name),
        }}
      />

      <div className="container">
        <section className="about-hero">
          <div className="about-portrait">
            <div className="about-portrait-glow" aria-hidden="true" />
            <Image src={AUTHOR_PHOTO} alt={`Portrait of ${author.name}`} width={640} height={824} sizes="(max-width: 768px) 100vw, 400px" priority />
          </div>

          <div className="about-intro">
            <span className="eyebrow">About the author</span>
            <h1 className="about-name">{author.name}</h1>
            <p className="about-role">{author.jobTitle}</p>
            <p className="about-bio">{author.bio}</p>
            <p className="about-bio">
              Everything on this blog is written for people who build: freelancers, small teams and founders deciding which AI tools to trust with real projects.
            </p>
            <div className="about-actions">
              <a href={author.sameAs[0]} target="_blank" rel="me noopener noreferrer" className="btn btn-primary">LinkedIn</a>
              <a href={author.sameAs[1]} target="_blank" rel="me noopener noreferrer" className="btn">X (Twitter)</a>
              <a href="https://www.youmake.dev/" className="btn">Try Youmake</a>
            </div>
            <dl className="about-facts">
              <div><dt>Articles</dt><dd>{articles.length}</dd></div>
              <div><dt>Topics</dt><dd>{topics.length}</dd></div>
              <div><dt>Building</dt><dd><a href="https://www.youmake.dev/">Youmake</a></dd></div>
            </dl>
          </div>
        </section>

        <section className="about-section">
          <span className="eyebrow">What I write about</span>
          <div className="about-topics">
            {topics.map((topic) => (
              <Link key={topic.slug} href={`/topics/${topic.slug}`} className="about-topic">
                <h2>{topic.name}</h2>
                <p>{topic.description}</p>
                <span>{getArticlesByTopic(topic.slug).length} articles</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="about-section">
          <span className="eyebrow">Recent articles</span>
          <ol className="about-recent">
            {recent.map((article) => (
              <li key={article.slug}>
                <Link href={`/articles/${article.slug}`}>
                  <span className="meta">
                    <span>{getArticleTopic(article).name}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={article.frontmatter.date}>{formatDate(article.frontmatter.date)}</time>
                  </span>
                  <h3>{article.frontmatter.title}</h3>
                </Link>
              </li>
            ))}
          </ol>
          <Link href="/articles" className="btn about-all">All {articles.length} articles</Link>
        </section>
      </div>
    </div>
  );
}
