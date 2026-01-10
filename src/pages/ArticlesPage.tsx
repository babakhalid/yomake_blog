import { useState } from 'react';
import { ArticleCard } from '@/components';
import { getAllArticles, getAllTags } from '@/utils';
import { SEO, generateBreadcrumbSchema } from '@/components/SEO';
import './ArticlesPage.css';

export function ArticlesPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const allArticles = getAllArticles();
  const allTags = getAllTags();

  const filteredArticles = selectedTag
    ? allArticles.filter((article) =>
        article.frontmatter.tags.map((t) => t.toLowerCase()).includes(selectedTag.toLowerCase())
      )
    : allArticles;

  // Generate breadcrumb structured data
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Articles', url: '/articles' },
  ]);

  // Generate CollectionPage structured data
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'All Articles - Yomake Blog',
    description: 'Explore our latest tutorials, insights, and updates about building with AI and vibe coding.',
    url: 'https://blog.yomake.ai/articles',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: allArticles.slice(0, 10).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `https://blog.yomake.ai/articles/${article.slug}`,
        name: article.frontmatter.title,
      })),
    },
  };

  return (
    <div className="articles-page">
      <SEO
        title="All Articles"
        description="Explore our latest tutorials, insights, and updates about building websites and web apps with AI. Learn vibe coding with Yomake."
        url="/articles"
        structuredData={[breadcrumbSchema, collectionSchema]}
      />
      <div className="container">
        <header className="articles-header">
          <h1 className="articles-title">All Articles</h1>
          <p className="articles-description">
            Explore our latest tutorials, insights, and updates about building with AI.
          </p>
        </header>

        {allTags.length > 0 && (
          <div className="tags-filter">
            <button
              className={`tag-btn ${!selectedTag ? 'active' : ''}`}
              onClick={() => setSelectedTag(null)}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                className={`tag-btn ${selectedTag === tag ? 'active' : ''}`}
                onClick={() => setSelectedTag(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        )}

        {filteredArticles.length > 0 ? (
          <div className="articles-grid">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        ) : (
          <div className="no-articles">
            <p>No articles found{selectedTag ? ` for "${selectedTag}"` : ''}.</p>
          </div>
        )}
      </div>
    </div>
  );
}
