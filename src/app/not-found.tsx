import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllArticles } from '@/utils/articles';
import '@/styles/ArticlesPage.css';

// Served with a real 404 status for unknown URLs. robots overrides the layout's
// "index, follow" so it agrees with the noindex Next adds to 404s.
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const recent = getAllArticles().slice(0, 8);

  return (
    <div className="articles-page">
      <div className="container">
        <header className="articles-header">
          <span className="eyebrow">404</span>
          <h1 className="articles-title">Page not found</h1>
          <p className="articles-description">
            This article may have moved. Browse <Link href="/articles">all articles</Link> or start with one of these:
          </p>
        </header>
        <ul className="not-found-list">
          {recent.map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`}>{article.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
