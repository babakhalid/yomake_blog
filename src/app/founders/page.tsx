import Link from 'next/link';
import { JsonLd } from '@/components';
import { founderResources } from '@/data/founderResources';
import { breadcrumbSchema, pageMetadata } from '@/utils/seo';
import { BUILDER_URL, SITE_URL } from '@/utils/site';
import '@/styles/FdeRoadmap.css';
import '@/styles/FounderResource.css';

const TITLE = 'Science of founders: 12 free worksheets';
const DESCRIPTION =
  'Twelve free worksheets, checklists and plans for founders, each built on one study: test an idea, sell before you build, check your odds, plan a launch date, decide when to quit your job.';

export const metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: '/founders' });

// Index of the free resources promised in the "Science of founders" videos.
export default function FoundersPage() {
  return (
    <div className="fde-page">
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: 'Home', url: '/' },
            { name: 'Science of founders', url: '/founders' },
          ]),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: TITLE,
            description: DESCRIPTION,
            url: `${SITE_URL}/founders`,
            hasPart: founderResources.map((resource) => ({ '@type': 'WebPage', name: resource.title, url: `${SITE_URL}/founders/${resource.slug}` })),
          },
        ]}
      />
      <div className="container">
        <header>
          <span className="eyebrow">Free resources · Science of founders</span>
          <h1 className="fde-title">Twelve studies. Twelve tools you can use today.</h1>
          <p className="fde-lede">
            Each episode of Science of founders covers one study about how companies get started. <strong>Each page here turns that study into a worksheet you can
            finish in 15 to 30 minutes.</strong> No account needed. Type on the page or print it.
          </p>
        </header>

        <ul className="fr-index">
          {founderResources.map((resource) => (
            <li key={resource.slug}>
              <Link href={`/founders/${resource.slug}`}>
                <span className="fde-days">EPISODE {String(resource.episode).padStart(2, '0')} · {resource.type.toUpperCase()}</span>
                <h2>{resource.name}</h2>
                <p>{resource.study.big}</p>
              </Link>
            </li>
          ))}
        </ul>

        <section className="fde-cta" aria-label="Build it with Youmake">
          <span className="eyebrow">Build it with Youmake</span>
          <h2>Describe it. Ship it.</h2>
          <p>Every tool on this page ends the same way: put something real in front of a real person. Describe your idea in a sentence and Youmake builds a live version you can share.</p>
          <a className="fde-cta-btn" href={BUILDER_URL}>Build your first project</a>
          <span className="fde-cta-url">youmake.dev</span>
        </section>

        <p className="fde-small">Each page links to the study it is based on. These pages are learning guides, not legal or financial advice.</p>
      </div>
    </div>
  );
}
