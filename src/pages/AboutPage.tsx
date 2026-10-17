import { Link } from 'react-router-dom';
import { SEO, generatePersonSchema } from '@/components/SEO';
import { author, getAllArticles, topics } from '@/utils';
import './ArticlesPage.css';

// Author page: the byline on every article links here, and the Person schema
// (with LinkedIn and X in sameAs) points search engines at a real, verifiable author.
export function AboutPage() {
  const recent = getAllArticles().slice(0, 10);

  return (
    <div className="articles-page">
      <SEO
        title={`${author.name}, ${author.jobTitle}`}
        description={author.bio}
        url="/about"
        structuredData={{
          '@context': 'https://schema.org',
          '@type': 'ProfilePage',
          url: 'https://blog.youmake.dev/about',
          mainEntity: generatePersonSchema(author.name),
        }}
      />
      <div className="container">
        <header className="articles-header">
          <h1 className="articles-title">{author.name}</h1>
          <p className="articles-description">{author.bio}</p>
          <p className="articles-description">
            Find me on <a href={author.sameAs[0]} rel="me noopener" target="_blank">LinkedIn</a> and{' '}
            <a href={author.sameAs[1]} rel="me noopener" target="_blank">X</a>, or try{' '}
            <a href="https://www.youmake.dev/">Youmake</a>.
          </p>
        </header>
        <section className="articles-header">
          <h2>Topics I write about</h2>
          <ul>
            {topics.map((topic) => (
              <li key={topic.slug}><Link to={`/topics/${topic.slug}`}>{topic.name}</Link></li>
            ))}
          </ul>
          <h2>Recent articles</h2>
          <ul>
            {recent.map((article) => (
              <li key={article.slug}><Link to={`/articles/${article.slug}`}>{article.frontmatter.title}</Link></li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
