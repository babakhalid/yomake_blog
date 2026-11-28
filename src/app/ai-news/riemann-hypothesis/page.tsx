import type { Metadata } from 'next';
import { JsonLd } from '@/components';
import { breadcrumbSchema, pageMetadata } from '@/utils/seo';
import { BUILDER_URL } from '@/utils/site';
import '@/styles/FdeRoadmap.css';
import '@/styles/FounderResource.css';

// Landing page for the "comment PRIME" call to action of the AI today reel, episode 2.
const PATH = '/ai-news/riemann-hypothesis';

export const metadata: Metadata = pageMetadata({
  title: 'The Riemann hypothesis, explained simply (free)',
  description: 'What the 167-year-old problem says, how a mathematician and Claude proved it, why no human can read the proof, and what critics say. With sources.',
  path: PATH,
});

const STEPS: [string, string][] = [
  ['Primes', 'Prime numbers are the whole numbers you cannot split: 2, 3, 5, 7, 11, 13… Every other number is built by multiplying them. On the number line they look scattered at random.'],
  ['Riemann’s formula', 'In 1859 Bernhard Riemann found a formula, now called the zeta function, whose special points (its “zeros”) control exactly where the primes fall.'],
  ['The guess', 'He guessed that all the important zeros sit on one straight line. If he was right, the primes are not chaos: they follow a hidden order, spread as evenly as anything random can be.'],
  ['The evidence', 'Computers have checked more than 12 trillion of those zeros. Every one was on the line. But checking examples is not a proof, and for 167 years nobody could prove it for all of them.'],
];

const TIMELINE: [string, string][] = [
  ['1859', 'Bernhard Riemann states the hypothesis.'],
  ['1900', 'David Hilbert puts it on his list of the great problems for the 20th century.'],
  ['2000', 'The Clay Mathematics Institute makes it one of seven Millennium Prize Problems, with US$1 million for a solution.'],
  ['20 Nov 2026', 'Levent Alpöge, a mathematician at Anthropic, posts a proof he built with Claude over about six weeks, released as Lean code. The same day, Stanford’s Ravi Vakil posts an incomplete, all-human proof by Alessandro Masullo.'],
  ['21 Nov 2026', 'The Lean Focused Research Organization and the Mathlib Initiative say they have “full confidence” the proof is correct. MIT’s Andrew Sutherland recompiles it independently.'],
  ['Next', 'Mathematicians work to turn the code into an argument people can follow. No prize has been awarded: the Clay rules ask for publication and time for the community to accept a result.'],
];

const SIDES = [
  {
    side: 'Why most experts accept it',
    points: [
      'Lean is software that checks every logical step of a proof. The proof compiled with only the standard axioms, and independent mathematicians rechecked it.',
      '“Honestly the chance that anything is fishy here is approximately zero.” (Andrew Sutherland, MIT)',
      '“As a mathematical landmark, it really doesn’t get bigger than this.” (Ken Ono)',
    ],
  },
  {
    side: 'What critics say',
    points: [
      'It is more than 17 million lines of code; an English version ran past 250,000 pages. No human has read it all, so no one fully understands why it is true.',
      'The Association for Human Mathematics says no human can claim responsibility for the proof.',
      'Number theorist Andrew Granville calls the four-page announcement “garbled” and questions its timing, a day after Anthropic’s stock market debut.',
    ],
  },
];

const SOURCES = [
  { label: 'Scientific American: independent mathematicians attest the proof is almost certainly true', href: 'https://www.scientificamerican.com/article/the-ai-riemann-hypothesis-proof-is-almost-certainly-true-independent-mathematicians-attest/' },
  { label: 'Nature: mathematicians react to AI and human-written proofs of the Riemann hypothesis', href: 'https://www.nature.com/articles/d41586-026-03812-7' },
  { label: 'Science News: math’s holy grail appears solved with AI’s help', href: 'https://www.sciencenews.org/article/riemann-hypothesis-solved-math-ai' },
  { label: 'The Guardian: two groups verify the claim', href: 'https://www.theguardian.com/technology/2026/nov/21/anthropic-riemann-hypothesis-solved-claude-ai' },
  { label: 'phys.org: the Riemann hypothesis, AI and a proof no human can read', href: 'https://phys.org/news/2026-11-sacred-mathematics-riemann-hypothesis-ai.html' },
  { label: 'Lean community statement (21 Nov 2026)', href: 'https://leanprover-community.github.io/blog/posts/riemann-hypothesis/' },
  { label: 'Levent Alpöge’s note', href: 'https://alpo.ge/remark.pdf' },
];

export default function RiemannExplainerPage() {
  return (
    <div className="fde-page">
      <JsonLd data={breadcrumbSchema([{ name: 'Home', url: '/' }, { name: 'The Riemann hypothesis, explained simply', url: PATH }])} />
      <div className="container">
        <header>
          <span className="eyebrow">Free explainer · AI today, episode 2</span>
          <h1 className="fde-title">The Riemann hypothesis, explained simply</h1>
          <p className="fde-lede">The most famous problem in mathematics has a proof, built by a mathematician working with an AI. Here is what it says, in four steps, and why the proof is unlike any before it.</p>
          <p className="fde-small">Updated 28 November 2026. Disclosure: this page was drafted with Claude, the AI named in the story.</p>
        </header>

        <section className="fde-section" aria-label="The idea in four steps">
          <h2 className="fr-h2"><span className="fde-num">01</span>The idea in four steps</h2>
          <div className="fr-card">
            <ol className="fr-steps">
              {STEPS.map(([title, body]) => (
                <li key={title}><div><b>{title}</b><span>{body}</span></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="fde-section" aria-label="Why it matters">
          <div className="fde-note">
            <span className="eyebrow">Why it matters</span>
            <p className="fde-big">Hundreds of results start with “if the Riemann hypothesis is true”.</p>
            <p>So much of mathematics rests on primes that a proof settles a long list of other statements at once. It does not, by itself, break encryption: the codes that protect your bank card rely on how hard it is to factor large numbers, which this result does not change.</p>
          </div>
        </section>

        <section className="fde-section" aria-label="Timeline">
          <h2 className="fr-h2"><span className="fde-num">02</span>Timeline</h2>
          <div className="fr-card">
            <ol className="fr-steps">
              {TIMELINE.map(([when, what]) => (
                <li key={when}><div><b>{when}</b><span>{what}</span></div></li>
              ))}
            </ol>
          </div>
        </section>

        <section className="fde-section" aria-label="Both sides">
          <h2 className="fr-h2"><span className="fde-num">03</span>A proof no human can read: both sides</h2>
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

        <section className="fr-today" aria-label="Your turn">
          <span className="eyebrow">Your turn</span>
          <p>Does a proof count if no human can read it? Say what you think in the comments under the reel.</p>
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
          <p>AI now helps prove theorems. It can also build your first product: describe it in a sentence and Youmake makes a working first version.</p>
          <a className="fde-cta-btn" href={BUILDER_URL}>Build your first project</a>
          <span className="fde-cta-url">youmake.dev</span>
        </section>
      </div>
    </div>
  );
}
