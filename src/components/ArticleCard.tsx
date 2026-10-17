import { Link } from 'react-router-dom';
import type { ArticleMeta } from '@/types';
import { formatDate, getArticleTopic } from '@/utils';
import './ArticleCard.css';

interface ArticleCardProps {
  article: ArticleMeta;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { slug, frontmatter } = article;

  return (
    <article className="article-card">
      <Link to={`/articles/${slug}`} className="article-card-link">
        <div className="article-card-image">
          {frontmatter.image ? (
            <img src={frontmatter.image} alt="" loading="lazy" />
          ) : (
            <span className="article-card-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="article-card-content">
          <span className="meta">
            <span>{getArticleTopic(article).name}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          </span>
          <h2 className="article-card-title">{frontmatter.title}</h2>
          <p className="article-card-description">{frontmatter.description}</p>
          {article.minutes && <span className="article-card-read">{article.minutes} min read</span>}
        </div>
      </Link>
    </article>
  );
}
