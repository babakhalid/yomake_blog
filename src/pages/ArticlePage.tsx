import { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { getArticleBySlug, getArticleTopic, getArticlesByTopic, loadArticleContent, formatDate } from '@/utils';
import { prerenderedBodyFor } from '@/utils/prerendered';
import { SEO, generateArticleSchema, generateBreadcrumbSchema } from '@/components/SEO';
import { AuthorAvatar, AuthorCard } from '@/components';
import './ArticlePage.css';

export function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : undefined;
  const articleUrl = `/articles/${slug}`;
  const [loaded, setLoaded] = useState<{ slug: string; content: string }>();

  useEffect(() => {
    if (!slug) return;
    let cancelled = false;
    loadArticleContent(slug).then((content) => {
      if (!cancelled) setLoaded({ slug, content });
    });
    return () => { cancelled = true; };
  }, [slug]);

  if (!article) {
    return <Navigate to="/articles" replace />;
  }

  const { frontmatter } = article;
  const topic = getArticleTopic(article);
  const moreInTopic = getArticlesByTopic(topic.slug).filter((item) => item.slug !== slug).slice(0, 5);
  const content = loaded && loaded.slug === slug ? loaded.content : undefined;
  // Until the markdown chunk arrives, show the body the prerenderer already put in the page.
  const fallbackHtml = content === undefined ? prerenderedBodyFor(articleUrl) : undefined;

  // Generate structured data for the article
  const articleSchema = generateArticleSchema({
    title: frontmatter.title,
    description: frontmatter.description,
    image: frontmatter.image,
    url: articleUrl,
    publishedTime: frontmatter.date,
    modifiedTime: frontmatter.updated,
    author: frontmatter.author,
    tags: frontmatter.tags,
  });

  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: topic.name, url: `/topics/${topic.slug}` },
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
        modifiedTime={frontmatter.updated}
        author={frontmatter.author}
        tags={frontmatter.tags}
        structuredData={[articleSchema, breadcrumbSchema]}
      />
      <div className="container">
        <article className="article">
          <header className="article-header">
            <Link to={`/topics/${topic.slug}`} className="eyebrow article-topic">{topic.name}</Link>

            <h1 className="article-title">{frontmatter.title}</h1>

            <p className="article-description">{frontmatter.description}</p>

            <div className="article-byline">
              <Link to="/about" className="article-byline-author">
                <AuthorAvatar size={40} />
                <span>
                  <span className="article-byline-name">{frontmatter.author}</span>
                  <span className="article-byline-role">Founder of Youmake</span>
                </span>
              </Link>
              <div className="article-byline-meta">
                <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
                {frontmatter.updated && frontmatter.updated !== frontmatter.date && (
                  <span>Updated <time dateTime={frontmatter.updated}>{formatDate(frontmatter.updated)}</time></span>
                )}
                {article.minutes && <span>{article.minutes} min read</span>}
              </div>
            </div>
          </header>

          {frontmatter.image && (
            <div className="article-hero-image">
              <img src={frontmatter.image} alt={frontmatter.title} />
            </div>
          )}

          {content !== undefined ? (
            <div className="article-content markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="article-content markdown-content" dangerouslySetInnerHTML={{ __html: fallbackHtml ?? '' }} />
          )}

          <div className="article-author-end">
            <AuthorCard />
          </div>

          {moreInTopic.length > 0 && (
            <nav className="article-more" aria-label={`More in ${topic.name}`}>
              <h2>More in <Link to={`/topics/${topic.slug}`}>{topic.name}</Link></h2>
              <ul>
                {moreInTopic.map((item) => (
                  <li key={item.slug}><Link to={`/articles/${item.slug}`}>{item.frontmatter.title}</Link></li>
                ))}
              </ul>
            </nav>
          )}
        </article>
      </div>
    </div>
  );
}
