import Link from 'next/link';
import { JsonLd } from '@/components';
import { templates } from '@/data/templates';
import { SITE_URL } from '@/utils/site';
import { breadcrumbSchema, pageMetadata } from '@/utils/seo';
import '@/styles/TemplatePage.css';

const DESCRIPTION =
  'Website templates you build with AI: pick your business type, copy a ready-made prompt, and Youmake builds the full site on your own domain.';

export const metadata = pageMetadata({ title: 'Website Templates Built With AI', description: DESCRIPTION, path: '/templates' });

export default function TemplatesPage() {
  return (
    <div className="template-page">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Templates', url: '/templates' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Website Templates Built With AI',
            description: DESCRIPTION,
            url: `${SITE_URL}/templates`,
            hasPart: templates.map((template) => ({ '@type': 'WebPage', name: template.title, url: `${SITE_URL}/templates/${template.slug}` })),
          },
        ]}
      />
      <div className="container">
        <header className="template-hero">
          <span className="eyebrow">Website templates</span>
          <h1>Website templates you build with AI</h1>
          <p className="template-intro">{DESCRIPTION} Each one lists the pages and features that business type needs, with tips and a prompt you can paste.</p>
        </header>
        <ul className="template-index">
          {templates.map((template) => (
            <li key={template.slug}>
              <Link href={`/templates/${template.slug}`}>
                <span className="eyebrow">{template.name}</span>
                <h2>{template.title}</h2>
                <p>{template.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
