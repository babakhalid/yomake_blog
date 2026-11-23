import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { JsonLd } from '@/components';
import { PrintButton } from '@/components/PrintButton';
import { founderResources, getFounderResource, type Block } from '@/data/founderResources';
import { breadcrumbSchema, pageMetadata } from '@/utils/seo';
import { BUILDER_URL } from '@/utils/site';
import '@/styles/FdeRoadmap.css';
import '@/styles/FounderResource.css';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return founderResources.map((resource) => ({ slug: resource.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resource = getFounderResource((await params).slug);
  if (!resource) return {};
  return pageMetadata({ title: `${resource.title} (free ${resource.type})`, description: resource.description, path: `/founders/${resource.slug}` });
}

const two = (n: number) => String(n).padStart(2, '0');

/** One part of the tool. `id` keeps form ids unique across blocks on the page. */
function ToolBlock({ block, id }: { block: Block; id: string }) {
  switch (block.kind) {
    case 'fields':
      return (
        <div className="fr-card">
          {block.fields.map((field, i) => (
            <div className="fr-field" key={field.label}>
              <label htmlFor={`${id}-${i}`}>{field.label}</label>
              {field.hint && <span className="fde-small" id={`${id}-${i}-hint`}>{field.hint}</span>}
              <textarea id={`${id}-${i}`} rows={field.rows ?? 2} aria-describedby={field.hint ? `${id}-${i}-hint` : undefined} />
            </div>
          ))}
        </div>
      );
    case 'stages':
      return (
        <>
          {block.stages.map((stage, i) => (
            <article className="fde-stage" key={stage.title}>
              <div className="fde-stage-head">
                <span className="fde-num">{two(i + 1)}</span>
                <div>
                  <h3 className="fr-h2">{stage.title}</h3>
                  <p className="fde-stage-sub">{stage.sub}</p>
                </div>
              </div>
              <div className="fde-cols">
                <div>
                  <h4>{block.cols[0]}</h4>
                  <ul>{stage.a.map((item, j) => <li key={j}>{item}</li>)}</ul>
                </div>
                <div>
                  <h4>{block.cols[1]}</h4>
                  <ul>{stage.b.map((item, j) => <li key={j}>{item}</li>)}</ul>
                </div>
              </div>
              <p className="fde-proof"><b>{block.footLabel}:</b> {stage.foot}</p>
            </article>
          ))}
        </>
      );
    case 'steps':
      return (
        <div className="fr-card">
          <ol className="fr-steps">
            {block.steps.map((step) => (
              <li key={step.title}>
                <div>
                  <b>{step.title}</b>
                  <span>{step.body}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'checklist':
      return (
        <div className="fr-card">
          <ul className="fr-checks">
            {block.items.map((item) => (
              <li key={item}>
                <label>
                  <input type="checkbox" />
                  <span>{item}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'table':
      return (
        <>
          <div className="fde-scroll">
            <table className="fde-table">
              <thead>
                <tr>{block.head.map((cell) => <th key={cell} scope="col">{cell}</th>)}</tr>
              </thead>
              <tbody>
                {block.rows?.map((row, i) => (
                  <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>
                ))}
                {Array.from({ length: block.blank ?? 0 }, (_, i) => (
                  <tr key={`blank-${i}`}>
                    {block.head.map((cell, j) => {
                      const label = j === 0 ? block.blankLabels?.[i] : undefined;
                      return <td key={cell}>{label ?? <input type="text" aria-label={`${cell}, row ${i + 1}`} />}</td>;
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {block.note && <p className="fde-small">{block.note}</p>}
        </>
      );
    case 'cards':
      return (
        <div className="fde-plan">
          {block.cards.map((card) => (
            <div key={card.tag}>
              <span className="fde-days">{card.tag}</span>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      );
    case 'example':
      return (
        <div className="fde-note fr-example">
          <span className="eyebrow">{block.title}</span>
          {block.intro && <p className="fde-big">{block.intro}</p>}
          <dl>
            {block.rows.map(([term, text]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{text}</dd>
              </div>
            ))}
          </dl>
        </div>
      );
    case 'note':
      return (
        <div className="fde-note">
          <p className="fde-big">{block.big}</p>
          <p>{block.body}</p>
        </div>
      );
  }
}

// Landing page for one "comment a word and I'll send you the free X" call to action.
export default async function FounderResourcePage({ params }: Props) {
  const resource = getFounderResource((await params).slug);
  if (!resource) notFound();
  const url = `/founders/${resource.slug}`;
  // Titled blocks are numbered; examples and notes sit between them without a number.
  const isNumbered = (block: Block) => block.kind !== 'example' && block.kind !== 'note';
  const stepOf = (index: number) => resource.tool.slice(0, index + 1).filter(isNumbered).length;

  return (
    <div className="fde-page">
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Science of founders', url: '/founders' },
          { name: resource.name, url },
        ])}
      />
      <div className="container">
        <header>
          <span className="eyebrow">Free {resource.type} · Science of founders, episode {resource.episode}</span>
          <h1 className="fde-title">{resource.title}</h1>
          <p className="fde-lede">{resource.lede}</p>
          <div className="fr-meta">
            <span className="fde-small">About {resource.minutes} minutes. No account needed. Type on the page or print it.</span>
            <PrintButton className="fr-print">Print or save as PDF</PrintButton>
          </div>
        </header>

        <section className="fde-section" aria-label={resource.study.label}>
          <div className="fde-note">
            <span className="eyebrow">{resource.study.label}</span>
            <p className="fde-big">{resource.study.big}</p>
            <p>{resource.study.body}</p>
            <ul className="fr-links">
              {resource.study.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {resource.tool.map((block, i) => {
          const numbered = isNumbered(block);
          return (
            <section className="fde-section" key={i} aria-label={block.kind === 'note' ? block.big : block.title}>
              {numbered && (
                <h2 className="fr-h2">
                  <span className="fde-num">{two(stepOf(i))}</span>
                  {block.title}
                </h2>
              )}
              {numbered && block.intro && <p className="fr-intro">{block.intro}</p>}
              <ToolBlock block={block} id={`b${i}`} />
            </section>
          );
        })}

        <section className="fr-today" aria-label="Do this today">
          <span className="eyebrow">Do this today · under 10 minutes</span>
          <p>{resource.today}</p>
        </section>

        <section className="fde-cta" aria-label="Build it with Youmake">
          <span className="eyebrow">Build it with Youmake</span>
          <h2>Describe it. Ship it.</h2>
          <p>{resource.cta}</p>
          <a className="fde-cta-btn" href={BUILDER_URL}>Build your first project</a>
          <span className="fde-cta-url">youmake.dev</span>
        </section>

        <p className="fde-small">{resource.source}</p>
        <p className="fde-small fr-back"><Link href="/founders">All twelve Science of founders resources</Link></p>
      </div>
    </div>
  );
}
