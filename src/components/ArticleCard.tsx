import type { CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { ArticleSummary } from '@/types';
import { formatDate, topicFor } from '@/utils/site';
import './ArticleCard.css';

interface ArticleCardProps {
  article: ArticleSummary;
  /** Position in the grid; staggers the entrance (resets every batch of 12). */
  index?: number;
}

export function ArticleCard({ article, index = 0 }: ArticleCardProps) {
  const { slug, title, description, date, image, minutes } = article;

  return (
    <article className="article-card" style={{ '--i': index % 12 } as CSSProperties}>
      <Link href={`/articles/${slug}`} className="article-card-link">
        <div className="article-card-image">
          {image ? (
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 580px"
              unoptimized={image.endsWith('.svg')}
            />
          ) : (
            <span className="article-card-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="article-card-content">
          <span className="meta">
            <span>{topicFor(article.topic).name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={date}>{formatDate(date)}</time>
          </span>
          <h2 className="article-card-title">{title}</h2>
          <p className="article-card-description">{description}</p>
          {minutes && <span className="article-card-read">{minutes} min read</span>}
        </div>
      </Link>
    </article>
  );
}
