import type { Metadata } from 'next';
import { JsonLd } from '@/components';
import { breadcrumbSchema, pageMetadata } from '@/utils/seo';
import { BUILDER_URL } from '@/utils/site';
import '@/styles/FdeRoadmap.css';
import '@/styles/FounderResource.css';

// Landing page for the "comment SECRETS" call to action of the AI today reel, episode 1.
const PATH = '/ai-news/apple-vs-openai';

export const metadata: Metadata = pageMetadata({
  title: 'Apple vs OpenAI: the case file (free)',
  description: 'Who accused who, when, and why the fight is really about the next device after the iPhone. Every claim with its source.',
  path: PATH,
});

const TIMELINE: [string, string][] = [
  ['2024', 'Partners. ChatGPT is built into Apple products.'],
  ['Since then', 'OpenAI buys io, the hardware company of Jony Ive, the designer of the iPhone, and starts building its own AI device.'],
  ['10 July 2026', 'Apple sues OpenAI and two former Apple employees, accusing them of taking its trade secrets for OpenAI’s hardware. OpenAI denies it.'],
  ['October 2026', 'OpenAI says an engineer who spent about six months there and then went back to Apple sent more than 100 confidential device files to personal accounts. Apple says its search found no OpenAI confidential information.'],
  ['27 November 2026', 'OpenAI countersues in federal court in San Jose: trade secret theft, interference with its contracts, and unfair competition.'],
  ['19 July 2027', 'Trial date. Judge Edward Davila has not ruled on any of OpenAI’s claims.'],
];

const SIDES = [
  {
    side: 'Apple says',
    points: [
      'OpenAI employees deliberately took and used Apple’s confidential information about unreleased products.',
      'The countersuit is “a transparent attempt to distract from the substance of Apple’s lawsuit.”',
      'OpenAI “has already been ordered to stop using Apple’s confidential information.” (Apple’s description of the court order. OpenAI pledged not to use what Apple claims are its secrets until trial.)',
    ],
  },
  {
    side: 'OpenAI says',
    points: [
      'Apple rehired the engineer, who leaked dozens of OpenAI documents about a prototype to senior Apple staff, “at Apple’s request”.',
      'Apple pressured shared suppliers to name their OpenAI projects and staff. One moved OpenAI’s production to a night shift; another dropped planned work “because of threats from Apple”. No supplier is named.',
      'Apple encourages staff to mix work and personal files in their own iCloud, then uses that to accuse those who leave. About 400 employees have left Apple for OpenAI.',
    ],
  },
];

const SOURCES = [
  { label: 'Euronews: OpenAI and Apple accuse each other of trade secret theft (28 Nov 2026)', href: 'https://www.euronews.com/2026/11/28/openai-and-apple-accuse-each-other-of-committing-trade-secret-theft-openai-countersues' },
  { label: 'Reuters via Al Jazeera: OpenAI countersues Apple over trade secrets (27 Nov 2026)', href: 'https://www.aljazeera.com/economy/2026/11/27/openai-countersues-apple-over-trade-secrets-as-ai-race-heats-up' },
  { label: '24/7 Wall St.: OpenAI countersues Apple, accusing it of “coercing and threatening” suppliers (28 Nov 2026)', href: 'https://247wallst.com/investing/2026/11/28/openai-countersues-apple-accusing-it-of-coercing-and-threatening-suppliers/' },
];

export default function AppleVsOpenAiPage() {
  return (
    <div className="fde-page">
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'Apple vs OpenAI: the case file', url: PATH }])} />
      <div className="container">
        <header>
          <span className="eyebrow">Free case file · AI today, episode 1</span>
          <h1 className="fde-title">Apple vs OpenAI: who accused who, and why</h1>
          <p className="fde-lede">Two partners now accuse each other of stealing secrets. Underneath the lawsuits is one question: who builds the device that comes after the iPhone.</p>
          <p className="fde-small">Updated 28 November 2026. Allegations are claims made in court filings and statements; no court has ruled on them.</p>
        </header>

        <section className="fde-section" aria-label="The short version">
          <div className="fde-note">
            <span className="eyebrow">The short version</span>
            <p className="fde-big">Apple sued first, in July. OpenAI hit back on 27 November.</p>
            <p>Apple says former employees took its secrets to OpenAI. OpenAI says Apple did the same thing in reverse through a rehired engineer, and used its weight with factories to slow OpenAI’s first device.</p>
          </div>
        </section>

        <section className="fde-section" aria-label="Timeline">
          <h2 className="fr-h2"><span className="fde-num">01</span>Timeline</h2>
          <div className="fr-card">
            <ol className="fr-steps">
              {TIMELINE.map(([when, what]) => (
                <li key={when}>
                  <div><b>{when}</b><span>{what}</span></div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="fde-section" aria-label="Both sides">
          <h2 className="fr-h2"><span className="fde-num">02</span>Both sides, in their words</h2>
          <article className="fde-stage">
            <div className="fde-cols">
              {SIDES.map((s) => (
                <div key={s.side}>
                  <h4>{s.side}</h4>
                  <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="fde-section" aria-label="What is at stake">
          <h2 className="fr-h2"><span className="fde-num">03</span>What is really at stake</h2>
          <div className="fde-note">
            <p className="fde-big">Not the money. The factories.</p>
            <p>Neither side has named a figure for damages, and any sum would be small next to Apple’s results. The bigger question is whether a new AI device maker can get its products built by the same contract manufacturers Apple relies on. OpenAI says its devices could “outcompete Apple on what Apple views as its own turf”. It has not shipped a device yet.</p>
          </div>
        </section>

        <section className="fr-today" aria-label="Your turn">
          <span className="eyebrow">Your turn</span>
          <p>Would you swap your iPhone for an OpenAI device? Say why in the comments under the reel.</p>
        </section>

        <section className="fde-section" aria-label="Sources">
          <h2 className="fr-h2"><span className="fde-num">04</span>Sources</h2>
          <ul className="fr-links">
            {SOURCES.map((s) => (
              <li key={s.href}><a href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a></li>
            ))}
          </ul>
        </section>

        <section className="fde-cta" aria-label="Build it with Youmake">
          <span className="eyebrow">Build it with Youmake</span>
          <h2>Describe it. Ship it.</h2>
          <p>Have an idea for an AI product of your own? Describe it in a sentence and Youmake builds a working first version.</p>
          <a className="fde-cta-btn" href={BUILDER_URL}>Build your first project</a>
          <span className="fde-cta-url">youmake.dev</span>
        </section>
      </div>
    </div>
  );
}
