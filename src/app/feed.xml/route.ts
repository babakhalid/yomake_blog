import { getAllArticles, getArticleTopic } from '@/utils/articles';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from '@/utils/site';

// RSS for feed readers and aggregators; linked from every page's <head>.
export const dynamic = 'force-static';

const FEED_SIZE = 50;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function GET() {
  const articles = getAllArticles().slice(0, FEED_SIZE);
  const items = articles.map((article) => {
    const { frontmatter } = article;
    const url = `${SITE_URL}/articles/${article.slug}`;
    return `    <item>
      <title>${escapeXml(frontmatter.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(frontmatter.description)}</description>
      <pubDate>${new Date(frontmatter.date).toUTCString()}</pubDate>
      <dc:creator>${escapeXml(frontmatter.author)}</dc:creator>
      <category>${escapeXml(getArticleTopic(article).name)}</category>${
        frontmatter.image ? `\n      <media:content url="${escapeXml(absoluteUrl(frontmatter.image))}" medium="image" />` : ''
      }
    </item>`;
  });

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:media="http://search.yahoo.com/mrss/">
  <channel>
    <title>${SITE_NAME}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(articles[0]?.frontmatter.date ?? Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items.join('\n')}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
}
