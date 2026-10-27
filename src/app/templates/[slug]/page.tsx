import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components';
import { CopyPrompt } from '@/components/CopyPrompt';
import { getTemplate, templates } from '@/data/templates';
import { BUILDER_URL, SITE_URL } from '@/utils/site';
import { breadcrumbSchema, pageMetadata } from '@/utils/seo';
import '@/styles/TemplatePage.css';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return templates.map((template) => ({ slug: template.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const template = getTemplate((await params).slug);
  if (!template) return {};
  return pageMetadata({
    title: template.title,
    description: template.description,
    path: `/templates/${template.slug}`,
    tags: template.keywords,
  });
}

export default async function TemplatePage({ params }: Props) {
  const template = getTemplate((await params).slug);
  if (!template) notFound();
  const url = `/templates/${template.slug}`;
  const related = template.related.map(getTemplate).filter((item) => item !== undefined);

  return (
    <div className="template-page">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Templates', url: '/templates' },
            { name: `${template.name} website`, url },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: template.faq.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: { '@type': 'Answer', text: a },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: template.title,
            description: template.description,
            url: `${SITE_URL}${url}`,
            dateModified: template.updated,
            inLanguage: 'en-US',
          },
        ]}
      />
      <div className="container template-layout">
        <header className="template-hero">
          <Link href="/templates" className="eyebrow">Website templates</Link>
          <h1>{template.title}</h1>
          <p className="template-intro">{template.intro}</p>
          <div className="template-actions">
            <a href={BUILDER_URL} className="btn btn-primary">Build this with AI</a>
            <a href="#prompt" className="btn">Get the prompt</a>
          </div>
        </header>

        {template.example && (
          <section className="template-section template-example">
            <span className="eyebrow">Built with Youmake</span>
            <a href={template.example.url} className="template-example-link" target="_blank" rel="noopener">
              {template.example.image && (
                // eslint-disable-next-line @next/next/no-img-element -- example screenshots vary in size
                <img src={template.example.image} alt={`${template.example.name}, a ${template.name.toLowerCase()} website built with Youmake`} loading="lazy" />
              )}
              <span>{template.example.name}: see the live site</span>
            </a>
          </section>
        )}

        <section className="template-section">
          <h2>What a {template.name.toLowerCase()} website needs</h2>
          <ol className="template-sections">
            {template.sections.map((section) => (
              <li key={section.name}>
                <h3>{section.name}</h3>
                <p>{section.purpose}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="template-section">
          <h2>Must-have features</h2>
          <ul className="template-features">
            {template.features.map((feature) => <li key={feature}>{feature}</li>)}
          </ul>
        </section>

        <section className="template-section" id="prompt">
          <h2>The prompt: paste it into Youmake</h2>
          <p>Change the names, places and details to yours, then paste it into the Youmake composer.</p>
          <CopyPrompt prompt={template.prompt} />
        </section>

        <section className="template-section">
          <h2>How to build your {template.name.toLowerCase()} website with Youmake</h2>
          <ol className="template-steps">
            <li>Start a 3-day trial for $1 at <a href={BUILDER_URL}>youmake.dev</a> and choose <strong>Web App</strong>.</li>
            <li>Paste the prompt above, edited with your details, and watch the site build in the live preview.</li>
            <li>Refine it in chat, one change at a time: swap photos, adjust colors, add a page.</li>
            <li>Connect Supabase for forms and data, and Stripe if you take payments.</li>
            <li>Publish to your own domain. You can export the code or sync it to GitHub at any time.</li>
          </ol>
        </section>

        <section className="template-section">
          <h2>Tips for a better {template.name.toLowerCase()} website</h2>
          <div className="template-tips">
            {template.tips.map((tip) => (
              <div key={tip.title}>
                <h3>{tip.title}</h3>
                <p>{tip.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="template-section">
          <h2>FAQ</h2>
          <dl className="template-faq">
            {template.faq.map(({ q, a }) => (
              <div key={q}>
                <dt>{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="template-section template-cta">
          <h2>Build your {template.name.toLowerCase()} website today</h2>
          <p>Describe it, refine it in chat and publish it on your own domain. Youmake has no free plan; the 3-day trial costs $1.</p>
          <a href={BUILDER_URL} className="btn btn-primary">Build this with AI</a>
        </section>

        <nav className="template-section template-related" aria-label="Related templates">
          <h2>More website templates</h2>
          <ul>
            {related.map((item) => (
              <li key={item.slug}><Link href={`/templates/${item.slug}`}>{item.title}</Link></li>
            ))}
            <li><Link href="/templates">All website templates</Link></li>
          </ul>
          <p>
            Comparing tools first? Read our guides to the <Link href="/articles/best-ai-website-builders-2026">best AI website builders</Link> and
            the <Link href="/articles/best-ai-app-builders">best AI app builders</Link>.
          </p>
        </nav>
      </div>
    </div>
  );
}
