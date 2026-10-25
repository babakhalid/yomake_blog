import type { Metadata } from 'next';
import type { ComponentProps } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeSlug from 'rehype-slug';
import { AuthorAvatar, AuthorCard, JsonLd } from '@/components';
import { TableOfContents } from '@/components/TableOfContents';
import {
  getAllArticles,
  getArticleBySlug,
  getArticleTopic,
  getArticlesByTopic,
  extractHeadings,
  getImageSize,
  lastModified,
  loadArticleContent,
} from '@/utils/articles';
import { formatDate } from '@/utils/site';
import { articleSchema, breadcrumbSchema, ogImageFor, pageMetadata, rankedListSchema } from '@/utils/seo';
import '@/styles/ArticlePage.css';

type Props = { params: Promise<{ slug: string }> };

// Unknown slugs get a real 404 instead of a redirect to /articles.
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticleBySlug((await params).slug);
  if (!article) return {};
  const { frontmatter } = article;
  return pageMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    path: `/articles/${article.slug}`,
    image: ogImageFor(article),
    imageAlt: frontmatter.title,
    type: 'article',
    publishedTime: frontmatter.date,
    modifiedTime: lastModified(article),
    authors: [frontmatter.author],
    tags: frontmatter.tags,
  });
}

// Site-relative links stay client-side navigations; everything else is a plain link.
function MarkdownLink({ href = '', children, node, ...props }: ComponentProps<'a'> & { node?: unknown }) {
  if (href.startsWith('/') && !href.startsWith('//')) {
    return <Link href={href} {...props}>{children}</Link>;
  }
  if (href.startsWith('#')) return <a href={href} {...props}>{children}</a>;
  return <a href={href} target="_blank" rel="noopener" {...props}>{children}</a>;
}

function MarkdownImage({ node, alt = '', ...props }: ComponentProps<'img'> & { node?: unknown }) {
  // eslint-disable-next-line @next/next/no-img-element -- in-body images have no known size
  return <img alt={alt} loading="lazy" decoding="async" {...props} />;
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const { frontmatter } = article;
  const articleUrl = `/articles/${slug}`;
  const topic = getArticleTopic(article);
  const moreInTopic = getArticlesByTopic(topic.slug).filter((item) => item.slug !== slug).slice(0, 5);
  const [content, coverSize] = await Promise.all([
    loadArticleContent(slug),
    frontmatter.image ? getImageSize(frontmatter.image) : undefined,
  ]);
  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const headings = extractHeadings(content);
  const rankedList = rankedListSchema(headings, articleUrl);

  return (
    <div className="article-page">
      <div className="reading-progress" aria-hidden="true" />
      <JsonLd
        data={[
          articleSchema(article, {
            url: articleUrl,
            image: frontmatter.image ?? ogImageFor(article),
            modified: lastModified(article),
            topicName: topic.name,
            wordCount,
          }),
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: topic.name, url: `/topics/${topic.slug}` },
            { name: frontmatter.title, url: articleUrl },
          ]),
          ...(rankedList ? [rankedList] : []),
        ]}
      />
      <div className="container article-layout">
        <article className="article">
          <header className="article-header">
            <Link href={`/topics/${topic.slug}`} className="eyebrow article-topic">{topic.name}</Link>

            <h1 className="article-title">{frontmatter.title}</h1>

            <p className="article-description">{frontmatter.description}</p>

            <div className="article-byline">
              <Link href="/about" className="article-byline-author" rel="author">
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
              <Image
                src={frontmatter.image}
                alt={frontmatter.title}
                width={coverSize?.width ?? 1600}
                height={coverSize?.height ?? 900}
                sizes="(max-width: 768px) 100vw, 784px"
                priority
                unoptimized={frontmatter.image.endsWith('.svg')}
              />
            </div>
          )}

          <div className="article-content markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw, rehypeSlug]}
              components={{ a: MarkdownLink, img: MarkdownImage }}
            >
              {content}
            </ReactMarkdown>
          </div>

          <div className="article-author-end">
            <AuthorCard />
          </div>

          {moreInTopic.length > 0 && (
            <nav className="article-more" aria-label={`More in ${topic.name}`}>
              <h2>More in <Link href={`/topics/${topic.slug}`}>{topic.name}</Link></h2>
              <ul>
                {moreInTopic.map((item) => (
                  <li key={item.slug}><Link href={`/articles/${item.slug}`}>{item.frontmatter.title}</Link></li>
                ))}
              </ul>
            </nav>
          )}
        </article>

        {headings.length >= 3 && (
          <aside className="article-toc">
            <TableOfContents headings={headings} />
          </aside>
        )}
      </div>
    </div>
  );
}
