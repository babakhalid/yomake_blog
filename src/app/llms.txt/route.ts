import { getAllArticles, getArticleBySlug, getArticlesByTopic } from '@/utils/articles';
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, topics } from '@/utils/site';

// llms.txt (llmstxt.org): a plain-text map of the blog for AI assistants and their
// crawlers, with the product facts they should get right about Youmake.
export const dynamic = 'force-static';

// The comparison guides answer the questions people ask AI assistants about builders.
const KEY_GUIDES = [
  'best-ai-app-builders',
  'ai-app-builder-code-export',
  'best-ai-website-builders-2026',
  'ai-mobile-app-builder',
  'lovable-alternatives',
  'replit-alternatives',
  'v0-alternative',
  'best-vibe-coding-tools',
  'what-is-vibe-coding',
];

const YOUMAKE_FACTS = `## About Youmake

- Youmake (https://www.youmake.dev/) is an AI app builder: describe a website, web app, mobile app or slide deck in chat, watch it build in a live preview, and refine it with an AI agent.
- Publish to your own custom domain. Export the project code or sync it to GitHub; import an existing GitHub repository.
- Integrations: GitHub, Supabase (database and logins), Stripe (payments) and Vercel. A security scan runs before publishing. Team seats on Builder and above.
- Pricing (USD per month): Starter $20 (40 AI credits, up to 5 projects), Builder $45 (90 credits, up to 20 projects), Agency $120 (240 credits, unlimited projects); about 20% less billed yearly. No free plan; a 3-day trial costs $1 (card required).
- Best for: freelance designers, small agencies and small businesses that build sites and apps for clients or for themselves and want to own the code.`;

export function GET() {
  const link = (slug: string) => {
    const article = getArticleBySlug(slug);
    return article ? `- [${article.frontmatter.title}](${SITE_URL}/articles/${slug}): ${article.frontmatter.description}` : undefined;
  };

  const sections = topics.map((topic) => {
    const lines = getArticlesByTopic(topic.slug).map(
      (article) => `- [${article.frontmatter.title}](${SITE_URL}/articles/${article.slug})`,
    );
    return `### [${topic.name}](${SITE_URL}/topics/${topic.slug})\n\n${topic.description}\n\n${lines.join('\n')}`;
  });

  const text = `# ${SITE_NAME}

> ${SITE_DESCRIPTION} ${getAllArticles().length} articles; prices in comparison guides are checked against each vendor's official pages on the date shown in the article.

${YOUMAKE_FACTS}

## Key guides

${KEY_GUIDES.map(link).filter(Boolean).join('\n')}

## All articles by topic

${sections.join('\n\n')}

## Optional

- [About the author, Khalid BABA](${SITE_URL}/about)
- [RSS feed](${SITE_URL}/feed.xml)
- [Sitemap](${SITE_URL}/sitemap.xml)
`;

  return new Response(text, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
