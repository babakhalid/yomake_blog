'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { ArticleSummary } from '@/types';
import { formatDate, topicFor } from '@/utils/site';

const PAGE_SIZE = 8;

// The home page's "All articles" list. Every title is still in the server HTML via
// the topic hubs; this only reveals more rows on demand.
export function LatestList({ articles }: { articles: ArticleSummary[] }) {
  const [shown, setShown] = useState(PAGE_SIZE);

  return (
    <>
      <ol className="latest-list">
        {articles.slice(0, shown).map((article) => (
          <li key={article.slug}>
            <Link href={`/articles/${article.slug}`} className="latest-row">
              <span className="meta">
                <span>{topicFor(article.topic).name}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={article.date}>{formatDate(article.date)}</time>
                {article.minutes && <><span aria-hidden="true">·</span><span>{article.minutes} min read</span></>}
              </span>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
            </Link>
          </li>
        ))}
      </ol>
      {shown < articles.length && (
        <button type="button" className="btn latest-more" onClick={() => setShown((n) => n + PAGE_SIZE)}>
          Show more articles
        </button>
      )}
    </>
  );
}
