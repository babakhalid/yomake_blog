import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getArticleBySlug, formatDate } from '@/utils';
import { SEO, generateArticleSchema, generateBreadcrumbSchema } from '@/components/SEO';
import './ArticlePage.css';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const { frontmatter, content } = article;
  const articleUrl = `/articles/${slug}`;

  // Generate structured data for the article
  const articleSchema = generateArticleSchema({
    title: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
    url: articleUrl,
    publishedTime: frontmatter.date,
    author: frontmatter.author,
    tags: frontmatter.tags,
  });

  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
    { name: frontmatter.title, url: articleUrl },
  ]);

  return (
    <div className="article-page">
      <SEO
        title={frontmatter.title}
        description={frontmatter.description}
        image={frontmatter.image}
        url={articleUrl}
        type="article"
        publishedTime={frontmatter.date}
        author={frontmatter.author}
        tags={frontmatter.tags}
        structuredData={[articleSchema, breadcrumbSchema]}
      />
      <div className="container">
        <article className="article">
          <header className="article-header">
            <Link to="/articles" className="back-link">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to Articles
            </Link>

            <div className="article-meta">
              <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
              <span className="article-author">by {frontmatter.author}</span>
            </div>

            <h1 className="article-title">{frontmatter.title}</h1>

            <p className="article-description">{frontmatter.description}</p>

            <div className="article-tags">
              {frontmatter.tags.map((tag) => (
                <span key={tag} className="article-tag">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          {frontmatter.image && (
            <div className="article-hero-image">
              <img src={frontmatter.image} alt={frontmatter.title} />
            </div>
          )}

          <div className="article-content markdown-content">
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
              {content}
            </ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
}
