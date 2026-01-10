import { Link } from 'react-router-dom';
import type { Article } from '@/types';
import { formatDate } from '@/utils';
import './ArticleCard.css';

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { slug, frontmatter } = article;

  return (
    <article className="article-card">
      <Link to={`/articles/${slug}`} className="article-card-link">
        {frontmatter.image && (
          <div className="article-card-image">
            <img src={frontmatter.image} alt={frontmatter.title} />
          </div>
        )}

        <div className="article-card-content">
          <div className="article-card-meta">
            <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
            <span className="article-card-author">by {frontmatter.author}</span>
          </div>

          <h2 className="article-card-title">{frontmatter.title}</h2>

          <p className="article-card-description">{frontmatter.description}</p>

          <div className="article-card-tags">
            {frontmatter.tags.map((tag) => (
              <span key={tag} className="article-card-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </article>
  );
}
