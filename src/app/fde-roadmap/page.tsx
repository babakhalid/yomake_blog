import Image from 'next/image';
import { pageMetadata } from '@/utils/seo';
import '@/styles/FdeRoadmap.css';

const COVER = '/images/blog/fde-roadmap.jpg';
const COVER_SIZE = { width: 1600, height: 1067 };
const COVER_ALT = 'An engineer walking across a bridge of light from a desk to a customer\'s office building';

export const metadata = pageMetadata({
  title: 'How to become a forward deployed engineer: free roadmap',
  description:
    'What to learn to become a forward deployed engineer, in what order, where to learn it, which certifications are worth taking, and a 90-day plan.',
  path: '/fde-roadmap',
  image: COVER,
  imageSize: COVER_SIZE,
  imageAlt: COVER_ALT,
});

type Stage = { n: string; title: string; sub: string; learn: string[]; where: React.ReactNode[]; proof: string };

const ext = (href: string, label: string) => (
  <a href={href} target="_blank" rel="noopener noreferrer">{label}</a>
);

const STAGES: Stage[] = [
  {
    n: '01',
    title: 'Build a whole product alone',
    sub: 'On site there is no frontend team and no data team. There is you.',
    learn: ['Python and SQL, well enough to work without looking things up', 'Calling and building APIs', 'One cloud: deploy, logs, permissions', 'Git and a basic test habit'],
    where: [
      <>{ext('https://cs50.harvard.edu/python/', "CS50's Introduction to Programming with Python")} (free)</>,
      <>{ext('https://aws.amazon.com/training/', 'AWS Skill Builder')} or {ext('https://cloud.google.com/learn/training', 'Google Cloud training')} (free tiers)</>,
      'Your own project, deployed, with a public URL',
    ],
    proof: 'one small app you built and deployed alone, with a database, an API and a login, that a stranger can open and use.',
  },
  {
    n: '02',
    title: 'Make AI work on messy data',
    sub: "The demo runs on clean examples. The customer's data is never clean.",
    learn: ['Prompting and tool use with a current model', 'Retrieval over real documents', 'Evaluation: a test set of real questions with known answers, run on every change', 'Cleaning and joining data you did not design'],
    where: [
      <>{ext('https://www.anthropic.com/learn', "Anthropic's courses")} and {ext('https://academy.openai.com/', 'OpenAI Academy')} (free)</>,
      <>{ext('https://learn.palantir.com', 'Palantir Learn')}, AI Engineer and Data Engineer tracks (courses are free)</>,
      'A public dataset that is ugly on purpose: scanned PDFs, exports, logs',
    ],
    proof: 'an assistant over messy documents, with a written test set and a number: "answers 41 of 50 real questions correctly, up from 23".',
  },
  {
    n: '03',
    title: 'Explain it in plain words',
    sub: 'Half the job is a conversation with someone who does not write code.',
    learn: ['Discovery: asking how the work is done today, and watching it being done', 'Writing a one-page plan a manager can approve', "Giving a demo that shows the customer's own case", 'Saying "no" and "not yet" with a reason'],
    where: [
      'Volunteer to fix a real process for a small business, a clinic, a school or a non-profit',
      ext('https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers', 'The Pragmatic Engineer on forward deployed engineers'),
      'Record your demos and watch them back',
    ],
    proof: 'a one-page write-up of a real problem: who had it, what it cost them, what you built, what changed.',
  },
  {
    n: '04',
    title: 'Own the result, not the ticket',
    sub: 'You are measured on whether the customer uses it, not on whether you shipped it.',
    learn: ['Picking the one problem worth solving out of ten that were asked for', 'Measuring use after launch', 'Staying until it works: fixing what breaks in the second week'],
    where: ['The same real project from stage three, taken to daily use', 'Job descriptions from Palantir, OpenAI and Anthropic: read what they ask for and map your proof to it'],
    proof: 'a number from real use. "Three people use it every day. It replaced a two-hour weekly report."',
  },
];

// Landing page for the "comment FDE" call to action on the forward deployed engineer video.
export default function FdeRoadmapPage() {
  return (
    <div className="fde-page">
      <div className="container">
        <header>
          <span className="eyebrow">Free roadmap</span>
          <h1 className="fde-title">How to become a forward deployed engineer</h1>
          <p className="fde-lede">
            A forward deployed engineer goes inside a customer&apos;s company and builds until the product works for real.{' '}
            <strong>The pay is for one skill: knowing which problem is worth solving.</strong> This is the order to learn it in, and how to prove you can do it.
          </p>
          <Image className="fde-cover" src={COVER} alt={COVER_ALT} {...COVER_SIZE} sizes="(max-width: 760px) 100vw, 712px" priority />
        </header>

        <section className="fde-section" aria-label="The four stages">
          <span className="eyebrow">What to learn, in order</span>
          {STAGES.map((stage) => (
            <article className="fde-stage" key={stage.n}>
              <div className="fde-stage-head">
                <span className="fde-num">{stage.n}</span>
                <div>
                  <h2>{stage.title}</h2>
                  <p className="fde-stage-sub">{stage.sub}</p>
                </div>
              </div>
              <div className="fde-cols">
                <div>
                  <h3>Learn</h3>
                  <ul>{stage.learn.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div>
                  <h3>Where</h3>
                  <ul>{stage.where.map((item, i) => <li key={i}>{item}</li>)}</ul>
                </div>
              </div>
              <p className="fde-proof"><b>Proof:</b> {stage.proof}</p>
            </article>
          ))}
        </section>

        <section className="fde-section" aria-label="Certifications">
          <div className="fde-note">
            <span className="eyebrow">How to get certified</span>
            <p className="fde-big">There is no official forward deployed engineer certificate, and no employer asks for one.</p>
            <p>
              What gets you hired is proof that you deployed something real. Certificates still help in two ways: they give your learning a deadline, and they get a CV past a
              first filter. These are the ones tied to skills the job uses.
            </p>
          </div>
          <div className="fde-scroll">
            <table className="fde-table">
              <thead>
                <tr><th>Certificate</th><th>What it shows</th><th>When to take it</th></tr>
              </thead>
              <tbody>
                <tr>
                  <td>{ext('https://learn.palantir.com', 'Palantir Foundry Associate')}<div className="fde-small">Data Engineer, Application Developer or AI Engineer</div></td>
                  <td>You can build on the platform the role was invented around. The closest thing to an FDE credential from the company that created the job.</td>
                  <td>After stage two</td>
                </tr>
                <tr>
                  <td>{ext('https://aws.amazon.com/certification/', 'AWS Solutions Architect, Associate')}<div className="fde-small">or the Google Cloud or Azure equivalent</div></td>
                  <td>You can deploy and run a system in a customer&apos;s cloud.</td>
                  <td>After stage one</td>
                </tr>
                <tr>
                  <td>{ext('https://www.databricks.com/learn/certification', 'Databricks Generative AI Engineer, Associate')}</td>
                  <td>You can build retrieval and evaluation on a data platform many customers already run.</td>
                  <td>After stage two</td>
                </tr>
                <tr>
                  <td>{ext('https://aws.amazon.com/certification/', 'AWS Certified AI Practitioner')}</td>
                  <td>A lighter first certificate if you are new to AI on the cloud.</td>
                  <td>During stage two</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="fde-small">
            Exam names and prices change. Check each provider&apos;s page before you book. Several training companies also sell a &quot;Certified Forward Deployed Engineer&quot; badge;
            none is accredited or requested in job postings, so weigh the price against a project you could build in the same time.
          </p>
        </section>

        <section className="fde-section" aria-label="Ninety day plan">
          <span className="eyebrow">A 90-day plan, at about ten hours a week</span>
          <div className="fde-plan">
            <div><span className="fde-days">DAYS 1–30</span><h3>Ship one app alone</h3><p>Python, SQL, one cloud. Deployed, with a public URL. Start the cloud associate certificate.</p></div>
            <div><span className="fde-days">DAYS 31–60</span><h3>Add AI on ugly data</h3><p>Retrieval plus a 50-question test set. Report the score before and after. Take the Palantir or Databricks associate exam.</p></div>
            <div><span className="fde-days">DAYS 61–90</span><h3>Do it for a real person</h3><p>Find one small organisation. Watch how they work, fix one problem, stay until they use it daily. Write the one-page story.</p></div>
          </div>
        </section>

        <section className="fde-cta" aria-label="Start with Youmake">
          <span className="eyebrow">Start stage one today</span>
          <h2>Describe it. Ship it.</h2>
          <p>Every stage on this page needs a real project with a public link. Youmake turns a sentence into a live product. Describe your idea, and ship your first one today.</p>
          <a className="fde-cta-btn" href="https://www.youmake.dev/">Build your first project</a>
          <span className="fde-cta-url">youmake.dev</span>
        </section>

        <p className="fde-small">
          Sources: The Pragmatic Engineer and DataCamp on the role; Palantir Learn, AWS and Databricks on certifications; public reviews of 2026 job postings on what employers ask
          for. This page is a learning guide, not career or financial advice.
        </p>
      </div>
    </div>
  );
}
