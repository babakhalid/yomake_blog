import type { ReactNode } from 'react';

// The twelve free resources promised in the "Science of founders" videos
// ("comment a word and I'll send you the free X"). One page each at /founders/[slug].
// Every figure in a `study` block was checked against the linked source.

export type Field = { label: string; hint?: string; rows?: number };

export type Block =
  /** Fill-in prompts: a label, an optional hint and a box to write in. */
  | { kind: 'fields'; title: string; intro?: ReactNode; fields: Field[] }
  /** Numbered cards with two lists and a footer line (the roadmap "stage" card). */
  | {
      kind: 'stages';
      title: string;
      intro?: ReactNode;
      cols: [string, string];
      footLabel: string;
      stages: { title: string; sub: string; a: ReactNode[]; b: ReactNode[]; foot: ReactNode }[];
    }
  | { kind: 'steps'; title: string; intro?: ReactNode; steps: { title: string; body: ReactNode }[] }
  | { kind: 'checklist'; title: string; intro?: ReactNode; items: string[] }
  /** `rows` are filled in; `blank` adds empty rows to write in, optionally labelled in the first cell. */
  | { kind: 'table'; title: string; intro?: ReactNode; head: string[]; rows?: ReactNode[][]; blank?: number; blankLabels?: string[]; note?: ReactNode }
  | { kind: 'cards'; title: string; intro?: ReactNode; cards: { tag: string; title: string; body: string }[] }
  | { kind: 'example'; title: string; intro?: string; rows: [string, string][] }
  | { kind: 'note'; big: string; body: ReactNode };

export type FounderResource = {
  slug: string;
  /** The word the viewer commented on the video. */
  keyword: string;
  episode: number;
  /** Used in the eyebrow: "Free worksheet". */
  type: 'worksheet' | 'checklist' | 'plan' | 'kit' | 'planner' | 'survey' | 'guide';
  /** The asset name used in the video. */
  name: string;
  title: string;
  /** Meta description and index-card text. */
  description: string;
  minutes: number;
  lede: ReactNode;
  study: { label: string; big: string; body: ReactNode; links: { href: string; label: string }[] };
  tool: Block[];
  today: string;
  /** One sentence that ties this page to building with Youmake. */
  cta: string;
  source: string;
  updated: string;
};

const UPDATED = '2026-11-23';

export const founderResources: FounderResource[] = [
  {
    slug: 'playbook',
    keyword: 'PLAYBOOK',
    episode: 1,
    type: 'worksheet',
    name: "The founder's playbook",
    title: "The founder's playbook: start with what you have",
    description:
      'A free worksheet based on Saras Sarasvathy\'s study of 27 expert founders: list who you are, what you know and who you know, set a loss you can afford, and script your first customer call.',
    minutes: 25,
    lede: (
      <>
        When Saras Sarasvathy asked 27 expert founders to think aloud while starting a company on paper,{' '}
        <strong>most skipped the market forecast and started from who they were, what they knew and who they knew.</strong> This worksheet takes you through the
        same three questions, sets a loss you can afford, and gives you a script for your first customer call.
      </>
    ),
    study: {
      label: 'The study',
      big: 'Expert founders start with their means, not with a forecast.',
      body: (
        <>
          Saras Sarasvathy, now a professor at the University of Virginia&apos;s Darden School, recruited 27 founders who had taken companies public, with market
          values from $250 million to $6.5 billion. Each one worked through a 17-page problem set of ten startup decisions while thinking aloud. She published the
          theory in 2001 and named the pattern effectuation: begin with what you control, risk only what you can afford to lose, and let early partners and
          customers shape the goal.
        </>
      ),
      links: [
        { href: 'https://effectuation.org/effectuation-background-research', label: 'Effectuation.org: background of the research' },
        { href: 'https://www.jstor.org/stable/259121', label: 'Sarasvathy (2001), Academy of Management Review' },
      ],
    },
    tool: [
      {
        kind: 'fields',
        title: 'Your means',
        intro: 'Answer fast. Facts only, no plans yet. Ten minutes for all three.',
        fields: [
          { label: 'Who I am', hint: 'What you care about, what you are stubborn about, what you would do without being paid. Three to five lines.', rows: 4 },
          { label: 'What I know', hint: 'Jobs, studies, hobbies, and problems you understand better than most people. Include things that feel obvious to you.', rows: 4 },
          { label: 'Who I know', hint: 'Ten names. People who would answer your message today: colleagues, clients, suppliers, classmates, family.', rows: 6 },
        ],
      },
      {
        kind: 'fields',
        title: 'What you could start this week',
        intro: 'Use only the three lists above. No funding, no hires, no new skills.',
        fields: [
          { label: 'Option 1', hint: 'Who it helps, what you would do for them, which name on your list you would start with.', rows: 2 },
          { label: 'Option 2', rows: 2 },
          { label: 'Option 3', rows: 2 },
        ],
      },
      {
        kind: 'fields',
        title: 'Your affordable loss',
        intro: 'Expert founders in the study did not ask "how much could I make?". They asked "how much can I lose and still be fine?". Decide it before you start.',
        fields: [
          { label: 'Money I can lose without changing how I live', hint: 'One number.', rows: 1 },
          { label: 'Time I can give', hint: 'Hours per week, for how many weeks.', rows: 1 },
          { label: 'What I will not risk', hint: 'Your job, a savings floor, a relationship, your name with a specific client.', rows: 2 },
          { label: 'My stop point', hint: 'Complete: "If I have spent ___ and ___ weeks and nobody has paid or committed, I stop or change the idea."', rows: 2 },
        ],
      },
      {
        kind: 'steps',
        title: 'Your first customer call',
        intro: 'Fifteen minutes with one person who has the problem. You are learning, not selling.',
        steps: [
          {
            title: 'Who to call',
            body: 'From your "who I know" list, pick the person most likely to have had the problem in the last month. Not the kindest friend. If nobody fits, ask one name on the list for an introduction.',
          },
          {
            title: 'Opening line',
            body: '"Hi [name]. I am looking into [problem] for [type of person]. I am not selling anything. Could I ask you five questions? It takes 15 minutes."',
          },
          { title: 'Question 1', body: '"Tell me about the last time you dealt with [problem]."' },
          { title: 'Question 2', body: '"What did you do about it?"' },
          { title: 'Question 3', body: '"What did that cost you, in time or money?"' },
          { title: 'Question 4', body: '"What have you already tried or paid for to fix it?"' },
          { title: 'Question 5', body: '"If I took this off your hands, what would that be worth to you? And who else should I talk to?"' },
          {
            title: 'What to listen for',
            body: 'Things they already did: money spent, hours lost, a workaround they built, a tool they pay for. A date and a number are evidence. "Sounds great" and "I would use that" are not.',
          },
          {
            title: 'Before you hang up',
            body: 'Ask for one small commitment: an introduction, a second call to see a first version, or a paid trial. A yes here is worth more than any compliment.',
          },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A night-shift nurse with nine years on the same ward.',
        rows: [
          ['Who I am', 'Organised, patient with paperwork, annoyed by wasted time at shift change.'],
          ['What I know', 'How handovers go wrong. Which rota tools nurses avoid and why. How ward budgets get approved.'],
          ['Who I know', 'Three ward managers, two agency recruiters, forty nurses in a group chat.'],
          ['Could start this week', 'A one-page handover template, tested on my own ward. A paid Saturday course for new nurses. A rota-swap group for my hospital.'],
          ['Affordable loss', '300 dollars and six hours a week for eight weeks. I keep my job.'],
          ['First call', 'The manager of the ward next door, who complained about handovers last month.'],
          ['What I heard', 'She spends two hours a week fixing handover mistakes and already pays for a notes app nobody uses. She asked to see the template on Monday.'],
        ],
      },
    ],
    today: 'Write the ten names under "Who I know". Send the opening line to one of them before you close this page.',
    cta: 'When a first customer says "show me", you need something to show. Describe it in a sentence and Youmake builds a live first version you can send them.',
    source:
      'Source: Saras D. Sarasvathy, "Causation and Effectuation: Toward a Theoretical Shift from Economic Inevitability to Entrepreneurial Contingency", Academy of Management Review 26(2), 2001; study details from the Society for Effectual Action (effectuation.org). The call script is our own tool, not part of the study.',
    updated: UPDATED,
  },
  {
    slug: 'idea-lab',
    keyword: 'LAB',
    episode: 2,
    type: 'worksheet',
    name: 'The idea test sheet',
    title: 'The idea test sheet: test your idea like a scientist',
    description:
      'A free one-page hypothesis sheet for founders: write the idea as a statement that can be wrong, find the riskiest assumption, pick the cheapest test and set the kill threshold before you look at the result.',
    minutes: 20,
    lede: (
      <>
        In a randomized trial with 116 Italian startups,{' '}
        <strong>founders trained to treat their idea as a hypothesis and test it were more likely to pivot and earned more revenue</strong> than founders who followed
        their intuition. This sheet makes you write the test and the pass mark before you see any result.
      </>
    ),
    study: {
      label: 'The study',
      big: 'Founders who tested like scientists changed course more often and earned more.',
      body: (
        <>
          Arnaldo Camuffo, Alessandro Cordova, Alfonso Gambardella and Chiara Spina of Bocconi University gave 116 early-stage startups the same ten training
          sessions. Half were also taught to write clear hypotheses and test them rigorously, the way a scientist would. The team tracked every startup for about a
          year. The trained founders performed better and were more likely to pivot to a different idea. They did not quit more often than the control group. The
          paper appeared in Management Science (online 2019, in print 2020).
        </>
      ),
      links: [
        { href: 'https://doi.org/10.1287/mnsc.2018.3249', label: 'Camuffo et al., Management Science' },
        { href: 'https://www.unibocconi.it/en/news/entrepreneurs-who-think-scientists-get-better-results', label: 'Bocconi University summary' },
      ],
    },
    tool: [
      {
        kind: 'fields',
        title: 'Write the idea as a statement that can be wrong',
        intro: 'Use this frame: "[Specific customer] will [specific action] for [specific product] at [price] because [reason]." If no result could prove it false, make it narrower.',
        fields: [
          { label: 'The customer', hint: 'One narrow group. "Dentists with one practice in Lyon", not "small businesses".', rows: 1 },
          { label: 'The problem they have today', hint: 'What it costs them, in time or money.', rows: 2 },
          { label: 'My statement', hint: 'One sentence, with a number in it.', rows: 2 },
        ],
      },
      {
        kind: 'fields',
        title: 'Find the riskiest assumption',
        intro: 'Your statement hides several assumptions: the customer exists, has the problem, wants your fix, will pay your price, and you can reach them. One of them is both critical and unproven.',
        fields: [
          { label: 'Everything that must be true', hint: 'List five or more.', rows: 5 },
          { label: 'The riskiest one', hint: 'If it is false the idea dies, and you have the least evidence for it.', rows: 2 },
        ],
      },
      {
        kind: 'fields',
        title: 'Pick the cheapest test',
        intro: 'A good first test gives an answer in seven days for almost no money. Ten interviews, a page with a price and a button, a pre-order, or doing the service by hand for three people.',
        fields: [
          { label: 'The test', rows: 2 },
          { label: 'Cost', hint: 'Money and days.', rows: 1 },
          { label: 'The one number I will measure', hint: 'Paid orders, booked calls, replies saying yes.', rows: 1 },
        ],
      },
      {
        kind: 'table',
        title: 'Know what counts as evidence',
        head: ['Strength', 'What it looks like', 'What it tells you'],
        rows: [
          ['Weak', 'Compliments, likes, "I would buy that"', 'They are polite. Nothing more.'],
          ['Medium', 'An email address given after seeing the price, a 30-minute call, an introduction', 'They are interested enough to spend time.'],
          ['Strong', 'Money paid, a signed order, a second purchase', 'The assumption held for this person.'],
        ],
      },
      {
        kind: 'fields',
        title: 'Set the kill threshold now',
        intro: 'Decide the pass mark before the test runs. After the result comes in, any number will look encouraging.',
        fields: [
          { label: 'My threshold', hint: 'Complete: "If fewer than ___ out of ___ people do ___ by [date], the assumption is false."', rows: 2 },
          { label: 'Who I told', hint: 'Send the threshold to one person. It is harder to move a number someone else has seen.', rows: 1 },
        ],
      },
      {
        kind: 'fields',
        title: 'Decide',
        fields: [
          { label: 'The result', hint: 'The number, next to the threshold.', rows: 1 },
          { label: 'My decision', hint: 'Keep (the assumption held: test the next one). Change (say exactly what changes). Stop.', rows: 2 },
          { label: 'The next riskiest assumption', rows: 1 },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A meal service for new parents.',
        rows: [
          ['Statement', 'Parents with a baby under six months in my city will pay 60 dollars a week for five frozen dinners delivered on Sunday.'],
          ['Riskiest assumption', 'They will pay 60 dollars a week. I already know they like the idea.'],
          ['Cheapest test', 'Post the offer with a payment link in two local parent groups. Seven days. Cost: zero.'],
          ['Threshold', 'Fewer than 5 paid orders by Sunday means the assumption is false.'],
          ['Result', '2 paid orders. 11 messages asking for single meals.'],
          ['Decision', 'Change. New statement: single dinners at 14 dollars, no subscription. Same test next week, threshold 10 orders.'],
        ],
      },
    ],
    today: 'Write your idea as one sentence that can be wrong, add the threshold, and send both to a friend.',
    cta: 'Most cheap tests need a page with an offer, a price and a button. Describe the offer in a sentence and Youmake builds the page so you can run the test this week.',
    source:
      'Source: Arnaldo Camuffo, Alessandro Cordova, Alfonso Gambardella and Chiara Spina, "A Scientific Approach to Entrepreneurial Decision Making: Evidence from a Randomized Control Trial", Management Science 66(2), 2020. The evidence table and thresholds are rules of thumb, not findings of the study.',
    updated: UPDATED,
  },
  {
    slug: 'experience-inventory',
    keyword: 'LOADED',
    episode: 3,
    type: 'worksheet',
    name: 'The experience inventory',
    title: 'The experience inventory: turn your years of work into an edge',
    description:
      'A free worksheet based on the MIT and US Census Bureau study of 2.7 million founders: list the industries, problems, people, skills and runway you already have, then score your ideas against them.',
    minutes: 30,
    lede: (
      <>
        Across 2.7 million US founders, the average age at founding was 41.9,{' '}
        <strong>and for the fastest-growing 1 in 1,000 startups it was 45.</strong> This inventory turns your years of work into a list of advantages and points you to
        the idea where your edge is largest.
      </>
    ),
    study: {
      label: 'The study',
      big: 'The most successful founders are middle-aged, and they know their industry.',
      body: (
        <>
          Pierre Azoulay (MIT), Benjamin Jones (Northwestern), J. Daniel Kim (MIT) and Javier Miranda (US Census Bureau) linked tax and Census records for 2.7
          million people who founded a company with at least one employee between 2007 and 2014. A 50-year-old founder was 1.8 times more likely to reach
          top-tier growth than a 30-year-old. Founders with prior experience in the same industry did much better than those without. Published in American Economic
          Review: Insights in 2020.
        </>
      ),
      links: [
        { href: 'https://www.nber.org/papers/w24489', label: 'Azoulay, Jones, Kim and Miranda: Age and High-Growth Entrepreneurship (NBER)' },
      ],
    },
    tool: [
      {
        kind: 'fields',
        title: 'Take the inventory',
        intro: 'Five lists. Write more than feels useful: the things you find obvious are often the ones outsiders cannot see.',
        fields: [
          {
            label: 'Industries I know from inside',
            hint: 'Anywhere you worked two years or more. For each: who pays whom, what buyers fear, how long a sale takes.',
            rows: 4,
          },
          {
            label: 'Problems I have seen again and again',
            hint: 'What wasted time or money at every employer. What people fix with spreadsheets and email. What everyone complains about each quarter.',
            rows: 5,
          },
          {
            label: 'People who would take my call',
            hint: 'Fifteen names with their role: buyers, experts, former colleagues, suppliers. Mark the ones who control a budget.',
            rows: 6,
          },
          { label: 'Skills people already pay me for', hint: 'What you are hired for, and what colleagues ask your help with.', rows: 3 },
          {
            label: 'Savings and runway',
            hint: 'Months of living costs you have saved. Other household income. Fixed obligations. Hours per week you can give while employed.',
            rows: 3,
          },
        ],
      },
      {
        kind: 'table',
        title: 'Score your ideas against the inventory',
        intro: 'List every idea you are considering. Score each column from 0 (nothing) to 3 (strong). Be strict: a 3 needs a fact from your inventory.',
        head: ['Idea', 'I know the industry', 'I saw the problem myself', 'I can reach 5 buyers this week', 'I can deliver version one', 'My runway covers it', 'Total / 15'],
        rows: [['Example: delay alerts for small freight forwarders', '3', '3', '3', '1', '2', '12']],
        blank: 4,
      },
      {
        kind: 'steps',
        title: 'Pick the idea with the most unfair edge',
        steps: [
          { title: 'Take the highest total', body: 'That is where your years count the most. A newcomer would need a long time to match it.' },
          { title: 'Break ties with buyers', body: 'If two ideas are close, choose the one where you can reach more buyers this week.' },
          { title: 'Treat a zero as a warning', body: 'A 0 for buyers means you have no way to learn quickly. Fix that before you pick the idea, or drop it.' },
          { title: 'Be honest about low totals', body: 'Under 8 out of 15 means the idea sits outside your experience. You can still do it, but you start where a 25-year-old starts.' },
          { title: 'Close the weakest column', body: 'For the winning idea, write one action that raises its lowest score: a partner, a course, three more months of savings.' },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A 47-year-old operations manager with 18 years in freight.',
        rows: [
          ['Industries', 'Road freight and customs brokerage. Buyers are owners of firms with 5 to 50 staff. They fear late penalties.'],
          ['Repeated problem', 'Every employer tracked shipment delays in a shared spreadsheet and phoned customers by hand.'],
          ['People', '22 names. 9 own or run a forwarding firm.'],
          ['Skills', 'Negotiating carrier rates. Training dispatchers. Reading customs documents.'],
          ['Runway', '8 months saved. Partner has a salary. 8 hours a week available.'],
          ['Scores', 'Delay alerts for forwarders: 12. A fitness app he also liked: 4.'],
          ['Decision', 'Delay alerts. Weakest column is delivery, so he asks a former colleague in IT to build the first version with him.'],
        ],
      },
    ],
    today: 'Write five names of people who would take your call. Message one of them: "What is the most annoying part of your work right now?"',
    cta: 'Your edge is knowing the problem. You do not need to know how to code as well. Describe the tool your industry is missing and Youmake builds a working first version.',
    source:
      'Source: Pierre Azoulay, Benjamin F. Jones, J. Daniel Kim and Javier Miranda, "Age and High-Growth Entrepreneurship", American Economic Review: Insights 2(1), 2020 (NBER Working Paper 24489). The scoring grid is our own tool, not part of the study.',
    updated: UPDATED,
  },
  {
    slug: 'sell-first',
    keyword: 'SHOES',
    episode: 4,
    type: 'kit',
    name: 'The sell-first test kit',
    title: 'The sell-first test kit: five ways to sell before you build',
    description:
      'A free kit of five ways to sell an idea before building it, as Zappos did in 1999: photo page, pre-order, manual service, waiting list with deposit and a single offer to 20 people, with proof and honesty rules.',
    minutes: 25,
    lede: (
      <>
        In 1999 Nick Swinmurn tested Zappos by{' '}
        <strong>posting photos of shoes from local stores and buying each pair at full price when an order came in</strong>; ten years later Amazon bought the
        company for about $1.2 billion. This kit gives you five ways to sell your idea before you build it, with what counts as proof and the rules that keep it
        honest.
      </>
    ),
    study: {
      label: 'The story',
      big: 'Zappos had customers before it had a single shoe in stock.',
      body: (
        <>
          Swinmurn could not find investors who believed people would buy shoes online. So he made a deal with a shoe store: he photographed its shoes, put them on
          a website, and bought a pair from the store at full price each time someone ordered. He lost money on every sale and learned what he needed: people
          would pay. Amazon announced the acquisition of Zappos in July 2009. When the deal closed that November, the Amazon shares paid were worth about $1.2
          billion.
        </>
      ),
      links: [
        { href: 'https://fortune.com/2012/09/05/nick-swinmurn-zappos-silent-founder', label: 'Fortune: Nick Swinmurn on how Zappos started' },
        { href: 'https://techcrunch.com/2009/11/02/amazon-closes-zappos-deal-ends-up-paying-1-2-billion/', label: 'TechCrunch: the Amazon deal at closing' },
      ],
    },
    tool: [
      {
        kind: 'stages',
        title: 'Five ways to sell before you build',
        intro: 'Pick one. Each can run in a week. Each ends with people who paid or people who did not.',
        cols: ['Steps', 'What counts as proof'],
        footLabel: 'Honesty rule',
        stages: [
          {
            title: 'The photo page',
            sub: 'Show the product and a buy button before you hold any stock.',
            a: [
              'Make one page: a photo or mock-up, one sentence on what it does, the real price, a Buy button.',
              'If you can fulfil an order by hand, as Zappos did, connect a real checkout.',
              'If you cannot, the button leads to: "Not available yet. Leave your email and you will be first."',
              'Send 100 to 200 real prospects to the page. Count.',
            ],
            b: ['Orders, or clicks on Buy at the stated price', 'Emails left after seeing the price', 'Not proof: visits, likes, time on page'],
            foot: 'Never take payment for something you cannot deliver. If it is not ready, say so on the very next screen.',
          },
          {
            title: 'The pre-order',
            sub: 'Take payment now for delivery on a stated date.',
            a: [
              'Write exactly what the buyer gets and the delivery date.',
              'Set a price, with or without an early discount, and a payment link.',
              'Cap the number, for example 20, so you can serve every buyer.',
              'Deliver on the date, or refund.',
            ],
            b: ['Money paid', 'How fast the cap fills', 'Not proof: "tell me when it is ready"'],
            foot: 'Put the date and the refund terms in writing before payment. If you miss the date, refund in full without being asked. Do not spend pre-order money you may have to return.',
          },
          {
            title: 'The manual service',
            sub: 'Deliver the result by hand before you automate anything.',
            a: [
              'Offer the result, not the software, to three to five customers.',
              'Charge for it from the first one.',
              'Do the work yourself with ordinary tools.',
              'Write down every step you repeat. That list is the specification of your product.',
            ],
            b: ['A customer pays a second time', 'A customer refers another', 'Not proof: a free pilot they never used'],
            foot: 'Do not claim it is automated. "We do this for you" is true, and customers usually like it.',
          },
          {
            title: 'The waiting list with a deposit',
            sub: 'A small refundable deposit separates intent from curiosity.',
            a: [
              'Make a page with the offer and the expected launch month.',
              'Ask for a small fixed deposit to hold a place.',
              'Say what the deposit buys: a place in line and the launch price.',
              'Send an update every month until launch.',
            ],
            b: ['Deposits paid', 'Deposits still in place after 30 days', 'Not proof: an email-only list'],
            foot: 'The deposit is refundable at any time, for any reason, and the page says so. If you cancel the project, refund everyone the same day.',
          },
          {
            title: 'One offer to 20 people',
            sub: 'The fastest test: a message, a price, a yes or a no.',
            a: [
              'List 20 people who have the problem.',
              'Write one message: the problem, the result, the price, the start date, "reply yes to book".',
              'Send it to each person separately. No group message.',
              'Follow up once after three days. Then stop.',
            ],
            b: ['A yes with payment or a booked start date', '3 or more out of 20 is a strong start', '0 or 1 out of 20: change the offer or the audience'],
            foot: 'Offer only what you can deliver, by hand if needed, to everyone who says yes.',
          },
        ],
      },
      {
        kind: 'checklist',
        title: 'Honesty rules for every test',
        intro: 'A sell-first test is fair when the customer always ends up with the product or their money.',
        items: [
          'I always deliver or refund. There is no third outcome.',
          'I state the real price and the real delivery date.',
          'I say when something is not built yet, a pre-order or done by hand.',
          'I use my own photos, or photos I have the right to use.',
          'I answer every buyer within one working day.',
          'I checked the rules on pre-orders, deposits and distance selling where my customers live.',
        ],
      },
      {
        kind: 'fields',
        title: 'Plan your test',
        fields: [
          { label: 'The method I picked', rows: 1 },
          { label: 'My offer in one sentence, with the price', rows: 2 },
          { label: 'Who will see it, and how many', rows: 1 },
          { label: 'My threshold', hint: 'Complete: "If fewer than ___ people pay by [date], I change the offer."', rows: 2 },
          { label: 'How I deliver or refund', rows: 2 },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A bookkeeper who wants to build software that prepares quarterly tax files for freelancers.',
        rows: [
          ['Method', 'The manual service, sold with one offer to 20 people.'],
          ['Offer', '"I prepare your quarterly tax file from your bank export in 48 hours. 90 dollars. Starts on the 1st. Reply yes to book."'],
          ['Audience', '20 freelancers from her client list and a local designers group.'],
          ['Threshold', 'Fewer than 3 paid by Friday: change the offer.'],
          ['Result', '5 paid. She did the work by hand in a spreadsheet. 4 booked the next quarter.'],
          ['What she learned', 'The step she repeated most was sorting bank lines into categories. That is the first thing to build.'],
        ],
      },
    ],
    today: 'Write your one-sentence offer with a price and send it to one person who has the problem.',
    cta: 'A sell-first test needs a page that looks real: a photo, a promise, a price, a button. Describe your offer and Youmake builds that page, so you can send people to it today.',
    source:
      'Sources: Fortune, "Nick Swinmurn: Zappos\' silent founder" (2012) for the 1999 store photos; Eric Ries, The Lean Startup (2011), which made the story a standard example; TechCrunch (2 November 2009) for the value at closing. Rules on pre-orders and deposits differ by country. This page is not legal advice.',
    updated: UPDATED,
  },
  {
    slug: 'first-test',
    keyword: 'SPLIT',
    episode: 5,
    type: 'checklist',
    name: 'The first-test checklist',
    title: 'The first-test checklist: run your first A/B test',
    description:
      'A free checklist for a first A/B test with small traffic: one change, one metric, a written prediction, how long to run it, how to read it, common mistakes, and what to do when traffic is too low.',
    minutes: 20,
    lede: (
      <>
        In 2012 a Bing engineer tested an ad-headline idea that had sat for six months as a low priority;{' '}
        <strong>it raised revenue 12%, worth more than $100 million a year in the United States alone.</strong> This checklist takes you through a first A/B test,
        including what to do when your traffic is small.
      </>
    ),
    study: {
      label: 'The evidence',
      big: 'Nobody, including experts, can tell in advance which ideas work.',
      body: (
        <>
          Ron Kohavi, who led experimentation at Microsoft, and Stefan Thomke of Harvard Business School told the Bing story in Harvard Business Review in 2017.
          Managers had rated the headline change low priority. One engineer tested it anyway, and it became one of the best revenue ideas in Bing&apos;s history.
          They also report that across Microsoft about one third of tested ideas help, one third do nothing, and one third hurt. A test is the only way to know
          which third you are in.
        </>
      ),
      links: [
        { href: 'https://hbr.org/2017/09/the-surprising-power-of-online-experiments', label: 'Kohavi and Thomke, Harvard Business Review (2017)' },
      ],
    },
    tool: [
      {
        kind: 'checklist',
        title: 'Before you start',
        items: [
          'I picked the one page or screen with the most visitors.',
          'I picked one action that matters there: a purchase, a sign-up, a booked call.',
          'I am changing one thing only: the headline, the price display, the button text or the first screen.',
          'My metric is one number: people who did the action divided by people who saw the page.',
          'I wrote my prediction before starting (below).',
          'I fixed the sample size and the end date before starting (below).',
        ],
      },
      {
        kind: 'fields',
        title: 'Write the prediction first',
        intro: 'A written prediction is how you find out how often your instinct is right.',
        fields: [
          { label: 'Version A (today)', rows: 1 },
          { label: 'Version B (the change)', rows: 1 },
          { label: 'My prediction', hint: 'Complete: "B will move [metric] from ___% to ___% because ___."', rows: 2 },
          { label: 'Visitors I need per version, and my end date', rows: 1 },
        ],
      },
      {
        kind: 'table',
        title: 'How many visitors you need',
        intro: 'Small differences need a lot of traffic. Find the row closest to your case. Numbers are per version.',
        head: ['Rate today', 'Rate you hope for', 'Visitors per version (about)'],
        rows: [
          ['2%', '3%', '3,900'],
          ['5%', '7.5%', '1,500'],
          ['5%', '10%', '450'],
          ['10%', '12%', '3,900'],
          ['10%', '15%', '700'],
          ['20%', '30%', '300'],
        ],
        note: 'Computed with a standard rule of thumb for 80% power at 5% significance: 16 × p × (1 − p) ÷ (difference squared), where p is the average of the two rates. Use an online sample-size calculator for exact figures.',
      },
      {
        kind: 'steps',
        title: 'Run it',
        steps: [
          { title: 'Split at random', body: 'Each visitor gets A or B by chance, half and half, during the same days. Showing A this week and B next week is a different, weaker test.' },
          { title: 'Run full weeks', body: 'At least one, better two. Weekdays and weekends behave differently.' },
          { title: 'Do not stop early', body: 'Results swing a lot in the first days. Stop when you reach the sample size you fixed, not when B looks good.' },
          { title: 'Change nothing else', body: 'No new prices, campaigns or designs on that page until the test ends.' },
        ],
      },
      {
        kind: 'steps',
        title: 'Read it',
        steps: [
          { title: 'Compare the two rates', body: 'Action count divided by visitor count, for A and for B.' },
          { title: 'Check it is not chance', body: 'Put the four numbers in a free A/B significance calculator. Look for 95% confidence or more.' },
          { title: 'Accept a flat result', body: 'If the difference is not clear, the result is "no detectable difference". Keep the simpler version and test something bigger.' },
          { title: 'Compare with your prediction', body: 'Write the result next to it. Keep a list. After ten tests you will know how far to trust your instinct.' },
        ],
      },
      {
        kind: 'checklist',
        title: 'Common mistakes',
        intro: 'Tick each one you avoided.',
        items: [
          'I did not check daily and stop at the first good-looking day.',
          'I did not change several things at once.',
          'I did not test a tiny change, like a button colour, on small traffic.',
          'I measured the action that earns money, not clicks.',
          'I did not run the test during an unusual week: a launch, a sale, a holiday.',
          'I wrote down the result, including when it was flat or negative.',
        ],
      },
      {
        kind: 'table',
        title: 'When your traffic is too low',
        intro: 'Under about 1,000 visitors a month, a classic split test will rarely give a clear answer. Use one of these.',
        head: ['Alternative', 'How', 'What you get'],
        rows: [
          ['Watch five people', 'Ask five target customers to use each version while you watch in silence.', 'Where they get stuck. Not a rate, but often the reason.'],
          ['Test a bigger change', 'A new offer, a new price or a whole new page, instead of a detail.', 'Big differences show up with far fewer visitors.'],
          ['Test where you have volume', 'Email subject lines, ad headlines, the first line of a cold message.', 'Hundreds of views in days.'],
          ['Before and after', 'Run A for two weeks, then B for two weeks.', 'A hint only. Seasons, news and campaigns can cause the change.'],
          ['Ask for the sale', 'Send offer A to 20 people and offer B to 20 others.', 'Paid replies. See the sell-first test kit.'],
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A booking page for a language tutor, 900 visitors a month.',
        rows: [
          ['One thing', 'The headline. A: "Learn Spanish online". B: "Hold a 10-minute conversation in Spanish in 30 days".'],
          ['Metric', 'Trial lessons booked divided by visitors. Today: 5%.'],
          ['Prediction', '"B will move bookings from 5% to 10% because it promises a result with a date."'],
          ['Sample and date', '450 visitors per version. About four weeks.'],
          ['Result', 'A: 23 of 455 (5.1%). B: 41 of 449 (9.1%). The calculator gives 98% confidence.'],
          ['Decision', 'Keep B. Prediction was right in direction and close in size. Next test: the price display.'],
        ],
      },
    ],
    today: 'Pick one page and write the prediction sentence for one change. Do not build anything yet.',
    cta: 'A test needs a second version to show. Describe the change in a sentence and Youmake builds version B, so the test starts today and not next month.',
    source:
      'Source: Ron Kohavi and Stefan Thomke, "The Surprising Power of Online Experiments", Harvard Business Review, September–October 2017. The sample-size table and the low-traffic alternatives are standard practice, not figures from the article.',
    updated: UPDATED,
  },
  {
    slug: 'version-ten',
    keyword: 'TOWER',
    episode: 6,
    type: 'plan',
    name: 'The seven-day prototype plan',
    title: 'The seven-day prototype plan: one small version a day',
    description:
      'A free seven-day plan based on the Marshmallow Challenge: build one small version a day, show each one to a real person, and log what you tested, what broke and what you change.',
    minutes: 15,
    lede: (
      <>
        In Tom Wujec&apos;s Marshmallow Challenge, kindergartners build taller towers than recent business school graduates,{' '}
        <strong>because they put the marshmallow on top early and rebuild again and again</strong> instead of planning one perfect tower. This plan has you build
        seven small versions in seven days and show each one to a real person.
      </>
    ),
    study: {
      label: 'The observation',
      big: 'The teams that test early build higher than the teams that plan longest.',
      body: (
        <>
          The challenge was created by designer Peter Skillman: teams get 18 minutes, 20 sticks of spaghetti, a yard of tape, a yard of string and one marshmallow
          that must sit on top. Tom Wujec ran it in many workshops and presented the results at TED in 2010. The average tower was about 20 inches. Business school
          students reached about half of that. Kindergartners were among the best, behind architects and engineers. Business students plan one tower and add the
          marshmallow at the end, when there is no time to fix a collapse. These are workshop observations, not a controlled experiment.
        </>
      ),
      links: [{ href: 'https://www.ted.com/talks/tom_wujec_build_a_tower_build_a_team', label: 'Tom Wujec: Build a tower, build a team (TED, 2010)' }],
    },
    tool: [
      {
        kind: 'checklist',
        title: 'Four rules for the week',
        items: [
          'Each version takes two hours or less to make.',
          'Each version answers one question, written before I build it.',
          'Each version is shown the same day to one real person who is not me.',
          'I watch and stay quiet. If I have to explain it, that is a finding.',
        ],
      },
      {
        kind: 'cards',
        title: 'One version per day',
        intro: 'Adapt the material to your product. Keep the order: cheap and rough first, working last.',
        cards: [
          { tag: 'DAY 1', title: 'Paper', body: 'Draw the main screen or the offer on one sheet. Question: can they say what it is in ten seconds?' },
          { tag: 'DAY 2', title: 'One sentence and a price', body: 'Write the promise and the price. Question: do they want it, and what do they compare it with?' },
          { tag: 'DAY 3', title: 'A walk-through', body: 'Three screens or three steps of the main task, as drawings or slides. Question: can they finish without help?' },
          { tag: 'DAY 4', title: 'Works once, by hand', body: 'Deliver the result to one person yourself, with no product. Question: is the result worth having?' },
          { tag: 'DAY 5', title: 'Works for the core task', body: 'The smallest thing that runs. One task, nothing else. Question: where do they get stuck?' },
          { tag: 'DAY 6', title: 'Fix the biggest break', body: 'Take the worst problem in your log. Fix only that. Question: is it gone?' },
          { tag: 'DAY 7', title: 'Ask for a commitment', body: 'Show it to someone new. Ask them to pay, sign up or use it again tomorrow. Question: do they commit?' },
        ],
      },
      {
        kind: 'table',
        title: 'Your log',
        intro: 'Fill one row a day, right after the person leaves. Two filled rows show the level of detail.',
        head: ['Version', 'What I tested', 'Who saw it', 'What broke', 'What I change'],
        rows: [
          ['Example, day 1', 'Does a paper sketch of a rota-swap app make sense in ten seconds?', 'A nurse on my ward', 'She thought it was a chat app. The word "swap" was not on the first screen.', 'Put "Swap a shift" as the title and the only button.'],
          ['Example, day 4', 'Is a swap arranged by hand worth having?', 'Two nurses who needed Friday off', 'It worked, but the manager had to approve by phone. That took a day.', 'Add the manager approval step. It is the slow part.'],
        ],
        blank: 7,
        blankLabels: ['1', '2', '3', '4', '5', '6', '7'],
      },
      {
        kind: 'fields',
        title: 'After day seven',
        fields: [
          { label: 'The break I saw more than once', rows: 2 },
          { label: 'What people wanted that I had not planned', rows: 2 },
          { label: 'Did anyone commit on day 7? To what?', rows: 1 },
          { label: 'My question for version eight', rows: 1 },
        ],
      },
    ],
    today: 'Draw version one on a sheet of paper and show it to one person. Ask only: "What is this?" Write down their first sentence.',
    cta: 'Days five to seven need something that runs. Describe the core task in a sentence and Youmake builds a working version, then change it each day by describing what broke.',
    source:
      'Source: Tom Wujec, "Build a tower, build a team", TED2010. The Marshmallow Challenge was created by Peter Skillman. The seven-day plan and log are our own tool.',
    updated: UPDATED,
  },
  {
    slug: 'odds-check',
    keyword: 'ODDS',
    episode: 7,
    type: 'worksheet',
    name: 'The odds check',
    title: 'The odds check: your real chances, from the outside',
    description:
      'A free base-rate worksheet for founders: write your gut odds, find the real survival rate of businesses like yours, list what would have to be true, adjust the number and decide what to check first.',
    minutes: 25,
    lede: (
      <>
        When 2,994 new business owners rated their own chances,{' '}
        <strong>81% gave themselves at least 7 in 10 and 33% said 10 in 10, yet only 39% gave businesses like theirs odds that good.</strong> This worksheet makes
        you start from the real survival rate of businesses like yours and adjust from there.
      </>
    ),
    study: {
      label: 'The study',
      big: 'Founders rate their own odds far above the odds of businesses like theirs.',
      body: (
        <>
          Arnold Cooper, Carolyn Woo and William Dunkelberg of Purdue University surveyed 2,994 people who had become business owners in 1984 and 1985. Asked for
          their own odds of success, the average answer was 8.1 out of 10. Asked for the odds of any business like theirs, the average was 5.9. The optimism had
          little to do with how prepared they were. Published in the Journal of Business Venturing in 1988.
        </>
      ),
      links: [{ href: 'https://doi.org/10.1016/0883-9026(88)90020-1', label: 'Cooper, Woo and Dunkelberg (1988), Journal of Business Venturing' }],
    },
    tool: [
      {
        kind: 'fields',
        title: 'The inside view',
        intro: 'Your gut number, written down before you look anything up.',
        fields: [
          { label: 'My odds of still being in business in five years', hint: 'A number out of 10.', rows: 1 },
          { label: 'My three reasons', rows: 3 },
        ],
      },
      {
        kind: 'fields',
        title: 'The outside view',
        intro: 'Now forget your plan. Look at everyone who tried something similar.',
        fields: [
          {
            label: 'My reference class',
            hint: 'Businesses like mine: same sector, same country, same model, same stage. "Independent cafes in my city." "Subscription software built by one person."',
            rows: 2,
          },
          { label: 'Its five-year survival rate, and where I found it', hint: 'Use the table below, your national statistics office, or an industry association.', rows: 2 },
          { label: 'Three founders in this class I can ask', hint: 'Ask each: "Of the businesses that started when you did, how many are still open?"', rows: 2 },
        ],
      },
      {
        kind: 'table',
        title: 'A starting base rate',
        intro: 'US private-sector establishments opened in the year to March 2013, all sectors. Your sector will differ: look it up.',
        head: ['Years after opening', 'Still open'],
        rows: [
          ['1 year', '79.6%'],
          ['5 years', '50.6%'],
          ['10 years', '34.7%'],
        ],
        note: (
          <>
            Source: US Bureau of Labor Statistics, Business Employment Dynamics,{' '}
            <a href="https://www.bls.gov/bdm/us_age_naics_00_table7.txt" target="_blank" rel="noopener noreferrer">
              Table 7, survival of private sector establishments by opening year
            </a>
            . Sector tables are on the same site.
          </>
        ),
      },
      {
        kind: 'fields',
        title: 'What would have to be true',
        intro: 'To beat the base rate, specific things must hold. For each one, write the evidence you have today. Evidence is something a stranger would accept.',
        fields: [
          { label: 'Condition 1, and my evidence', hint: 'For example: "Ten customers will pay 50 a month. Evidence: three have paid."', rows: 2 },
          { label: 'Condition 2, and my evidence', rows: 2 },
          { label: 'Condition 3, and my evidence', rows: 2 },
          { label: 'Condition 4, and my evidence', rows: 2 },
          { label: 'Condition 5, and my evidence', rows: 2 },
        ],
      },
      {
        kind: 'steps',
        title: 'Adjust the number',
        steps: [
          { title: 'Start at the base rate', body: 'Not at your gut number. If half of businesses like yours last five years, you start at 5 in 10.' },
          { title: 'Move up only for hard evidence', body: 'Paying customers, a signed contract, years inside the industry, costs already covered. One step of 1 in 10 at most for each.' },
          { title: 'Move down for each condition with no evidence', body: 'A condition you only believe is a risk, not an advantage.' },
          { title: 'Write the adjusted number next to the gut number', body: 'The gap between them is the size of your optimism. Most founders have one.' },
        ],
      },
      {
        kind: 'fields',
        title: 'Decide what to check first',
        fields: [
          { label: 'My adjusted odds', hint: 'A number out of 10.', rows: 1 },
          { label: 'The condition with the weakest evidence', rows: 1 },
          { label: 'How I test it in the next two weeks', rows: 2 },
          { label: 'What I do differently at these odds', hint: 'Start smaller, keep the job longer, spend less before the first sale, or go ahead.', rows: 2 },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A pastry chef planning her own cafe.',
        rows: [
          ['Inside view', '9 in 10. "My pastry is better than anything nearby, I have 12 years of experience, and the street is busy."'],
          ['Reference class', 'Independent cafes in her city. Two owners she asked said about half of the cafes that opened with them had closed within five years.'],
          ['Would have to be true', '150 customers a day at 7 dollars. Rent under 12% of sales. A second baker by month three.'],
          ['Evidence', 'She counted 90 customers a day at the nearest cafe. Rent is quoted. No baker identified.'],
          ['Adjusted odds', 'Start at 5. Plus 1 for twelve years in the trade. Minus 1 for the customer count. 5 in 10.'],
          ['Check first', 'Demand. She sells at a weekend market stall for four weeks before signing the lease.'],
        ],
      },
    ],
    today: 'Write your gut number. Then look up the five-year survival rate for your sector and write it next to it.',
    cta: 'The fastest way to replace a belief with evidence is to put a real offer in front of real people. Describe yours and Youmake builds it, so you can check your weakest condition this week.',
    source:
      'Sources: Arnold C. Cooper, Carolyn Y. Woo and William C. Dunkelberg, "Entrepreneurs\' Perceived Chances for Success", Journal of Business Venturing 3(2), 1988; US Bureau of Labor Statistics, Business Employment Dynamics. The adjustment steps are a rule of thumb. This page is not financial advice.',
    updated: UPDATED,
  },
  {
    slug: 'kill-or-keep',
    keyword: 'SUNK',
    episode: 8,
    type: 'checklist',
    name: 'The keep-or-kill checklist',
    title: 'The keep-or-kill checklist: decide without the sunk cost',
    description:
      'A free checklist to decide whether to keep or stop a project: list what you spent and set it aside, answer the "if I started today" question, compare future cost and value, set a kill date and stop cleanly.',
    minutes: 20,
    lede: (
      <>
        In a 1985 experiment at Ohio University&apos;s theater,{' '}
        <strong>people who paid full price for season tickets went to more plays than people who were given a discount at random</strong>: the money was gone either
        way, yet it still drove what they did. This checklist helps you judge a project only on what it will cost and return from today.
      </>
    ),
    study: {
      label: 'The study',
      big: 'The more people paid, the more they kept going, even though the money was already spent.',
      body: (
        <>
          Hal Arkes and Catherine Blumer of Ohio University arranged for the first 60 people buying season tickets to be charged at random: the full $15, a $2
          discount, or a $7 discount. In the first half of the season, full-price buyers used 4.11 tickets on average, against 3.32 and 3.29 for the two discount
          groups. By the second half the difference had faded. Published in Organizational Behavior and Human Decision Processes in 1985.
        </>
      ),
      links: [{ href: 'https://doi.org/10.1016/0749-5978(85)90049-4', label: 'Arkes and Blumer (1985), The Psychology of Sunk Cost' }],
    },
    tool: [
      {
        kind: 'fields',
        title: 'List what you spent',
        intro: 'Write it all down so it stops sitting in the back of your mind.',
        fields: [
          { label: 'Money', rows: 1 },
          { label: 'Months', rows: 1 },
          { label: 'Favours, promises and pride', hint: 'Who you told, who helped, what you said in public.', rows: 2 },
        ],
      },
      {
        kind: 'note',
        big: 'Now draw a line under that list.',
        body: 'None of it comes back, whichever way you decide. From here the only questions are about the future.',
      },
      {
        kind: 'fields',
        title: 'The "if I started today" question',
        fields: [
          {
            label: 'Would I start this today?',
            hint: 'Knowing everything I know now, if someone handed me this project in its current state for free, would I take it on? Yes or no, and why.',
            rows: 3,
          },
          { label: 'What would I tell a friend in my position?', rows: 2 },
        ],
      },
      {
        kind: 'fields',
        title: 'Future cost against future value',
        intro: 'Only what is still to come.',
        fields: [
          { label: 'The next real milestone', hint: 'Something a stranger could verify: 10 paying customers, a signed pilot, break-even.', rows: 1 },
          { label: 'What it costs to get there', hint: 'Money and months from today.', rows: 1 },
          { label: 'What else I could do with that money and time', hint: 'Your best alternative. Be specific.', rows: 2 },
          { label: 'What the project is worth if it works, and my honest odds', rows: 2 },
        ],
      },
      {
        kind: 'checklist',
        title: 'Signs the sunk cost is deciding for you',
        intro: 'Tick each one that is true. Three or more: take the kill date below seriously.',
        items: [
          'My main reason to continue is how much I already put in.',
          'I have moved the deadline twice or more.',
          'I keep saying "one more feature and it will work".',
          'I avoid looking at the numbers.',
          'I would not start this project today.',
          'I am continuing mostly because I told people I would.',
        ],
      },
      {
        kind: 'fields',
        title: 'Set a kill date and criteria',
        intro: 'If you keep going, keep going with an exit written down.',
        fields: [
          { label: 'My kill rule', hint: 'Complete: "By [date] I need [number] [measurable result]. If not, I stop."', rows: 2 },
          { label: 'Who holds me to it', hint: 'One name. Send them the rule today.', rows: 1 },
        ],
      },
      {
        kind: 'steps',
        title: 'How to stop cleanly',
        steps: [
          { title: 'Tell customers first', body: 'Give an end date. Deliver what you owe or refund it.' },
          { title: 'Hand over their data', body: 'Offer an export before you switch anything off.' },
          { title: 'Find a home for the assets', body: 'Sell, give away or publish the code, the domain, the audience list (with consent), the content.' },
          { title: 'Close the costs', body: 'Cancel subscriptions, servers and accounts. Check for annual renewals.' },
          { title: 'Thank the people who helped', body: 'A short honest message: what you tried, what happened, what you are doing next.' },
          { title: 'Write one page', body: 'What you learned, what you would repeat, what you would not. This is what you keep from the project.' },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A developer, 14 months into a scheduling app for dog groomers.',
        rows: [
          ['Spent', '11,000 dollars, 14 months of evenings, and a launch announced to 300 followers.'],
          ['Start today?', '"No. I now know groomers book by phone and like it. But the three who pay me use it mostly for reminders."'],
          ['Future cost', 'Six more months and 3,000 dollars to reach 30 paying salons.'],
          ['Alternative', 'A reminders-only tool. One month to build. The three paying customers already want it.'],
          ['Kill rule', '"By 1 March I need 10 salons paying for reminders. If not, I stop." Sent to a friend.'],
          ['Decision', 'Kill the scheduling app. Keep the three customers and move them to reminders.'],
        ],
      },
    ],
    today: 'Answer one question in writing, in five minutes: "Knowing what I know now, would I start this project today?"',
    cta: 'Stopping is easier when the next thing is cheap to start. Describe the smaller idea you found along the way and Youmake builds a first version in a day, not in months.',
    source:
      'Source: Hal R. Arkes and Catherine Blumer, "The Psychology of Sunk Cost", Organizational Behavior and Human Decision Processes 35(1), 1985, experiment 2. The checklist is our own tool, not part of the study.',
    updated: UPDATED,
  },
  {
    slug: 'launch-buffer',
    keyword: 'BUFFER',
    episode: 9,
    type: 'planner',
    name: 'The launch date planner',
    title: 'The launch date planner: a date you can keep',
    description:
      'A free planner for a launch date you can keep: break the launch into pieces, compare with how long your past projects took, run a premortem, add a buffer from your own track record and publish the date.',
    minutes: 25,
    lede: (
      <>
        Psychology students predicted they would finish their thesis in 33.9 days and took 55.5;{' '}
        <strong>fewer than a third finished by their own predicted date, and fewer than half finished even by their worst-case date.</strong> This planner replaces
        your gut date with one based on how long your past projects really took.
      </>
    ),
    study: {
      label: 'The study',
      big: 'People plan from the best case, even when they know their own history.',
      body: (
        <>
          Roger Buehler, Dale Griffin and Michael Ross asked 37 honours students to predict when they would hand in their thesis. Average prediction: 33.9 days.
          Average actual time: 55.5 days. Only 29.7% finished by their predicted date. Asked for a worst case, &quot;if everything went as poorly as it possibly
          could&quot;, they said 48.6 days, and only 48.7% finished by then. In later studies the same team found that people focus on the plan in front of them
          and ignore how long similar tasks took before. Published in the Journal of Personality and Social Psychology in 1994.
        </>
      ),
      links: [{ href: 'https://doi.org/10.1037/0022-3514.67.3.366', label: 'Buehler, Griffin and Ross (1994), Exploring the "Planning Fallacy"' }],
    },
    tool: [
      {
        kind: 'table',
        title: 'Break the launch into pieces',
        intro: 'List every piece and your best guess in working days. Small pieces are easier to estimate than one big launch.',
        head: ['Piece', 'Best guess (days)', 'Waits on someone else?'],
        rows: [['Example: payment and receipts', '2', 'Yes: payment provider approval']],
        blank: 8,
      },
      {
        kind: 'checklist',
        title: 'Pieces people forget',
        intro: 'Tick the ones that apply and add them to the table.',
        items: [
          'Payments, receipts, refunds',
          'Terms, privacy page, cookie notice',
          'Sign-up, password reset and the emails they send',
          'Testing on a real phone',
          'App store or platform review',
          'The first-use experience for a new customer',
          'A support address and someone to answer it',
          'Analytics, so you can see what happens after launch',
          'The launch post, the screenshots, the demo video',
          'Fixing what the first five testers find',
        ],
      },
      {
        kind: 'table',
        title: 'Check your own track record',
        intro: 'Three past projects of any kind. Divide what it took by what you planned.',
        head: ['Past project', 'Planned', 'Actual', 'Actual ÷ planned'],
        rows: [['Example: company website', '3 weeks', '5 weeks', '1.7']],
        blank: 3,
        note: 'No history? Start with 1.6. That is the ratio in the thesis study: 55.5 days taken for 33.9 days predicted.',
      },
      {
        kind: 'fields',
        title: 'Run a premortem',
        intro: 'Imagine the launch date has passed and you did not ship. Write the story of why.',
        fields: [
          { label: 'Reason 1, and what I do now to prevent it', rows: 2 },
          { label: 'Reason 2, and what I do now to prevent it', rows: 2 },
          { label: 'Reason 3, and what I do now to prevent it', rows: 2 },
        ],
      },
      {
        kind: 'steps',
        title: 'Calculate the date',
        steps: [
          { title: 'Add up the pieces', body: 'Total working days, including the forgotten pieces you ticked.' },
          { title: 'Multiply by your ratio', body: 'Your average of actual ÷ planned. This is your buffer, taken from your own history.' },
          { title: 'Add the waits', body: 'Reviews, approvals and other people have their own calendar. Add those days on top.' },
          { title: 'Convert to the calendar', body: 'Divide by the working days you really have each week. Count holidays and your day job.' },
        ],
      },
      {
        kind: 'fields',
        title: 'Publish the new date',
        fields: [
          { label: 'Sum of pieces × my ratio + waits', hint: 'In working days.', rows: 1 },
          { label: 'My launch date', rows: 1 },
          { label: 'Who I tell today', hint: 'A customer, a partner, or a public post.', rows: 1 },
          { label: 'What I cut if I fall behind', hint: 'List features to drop, in order. Cut scope before you move the date.', rows: 3 },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A solo founder launching a booking tool, working three days a week on it.',
        rows: [
          ['Gut date', '"Four weeks."'],
          ['Pieces', '11 pieces, 20 working days. The checklist added receipts, password reset and phone testing: 24 days.'],
          ['Track record', 'Last three projects: 1.7, 1.5 and 2.0. Average 1.7.'],
          ['Premortem', '"Payment approval took two weeks." She applies today, not at the end.'],
          ['Calculation', '24 × 1.7 = 41 working days, plus 5 days of waits = 46. At three days a week: 15 weeks.'],
          ['Published', 'She tells her five pilot customers: launch on the 15th, fifteen weeks from now. First cut if late: the calendar sync.'],
        ],
      },
    ],
    today: 'Write the planned and actual duration of your last three projects. Calculate your ratio.',
    cta: 'The shortest piece of a launch should be the build. Describe your product and Youmake builds a working version, so your date depends on customers, not on code.',
    source:
      'Source: Roger Buehler, Dale Griffin and Michael Ross, "Exploring the \'Planning Fallacy\': Why People Underestimate Their Task Completion Times", Journal of Personality and Social Psychology 67(3), 1994, study 1. The premortem is a technique described by psychologist Gary Klein. The planner is our own tool.',
    updated: UPDATED,
  },
  {
    slug: 'safe-leap',
    keyword: 'LEAP',
    episode: 10,
    type: 'checklist',
    name: 'The safe leap checklist',
    title: 'The safe leap checklist: seven signs it is safe to quit',
    description:
      'A free checklist to decide when to leave your job for your startup: seven signs scored from 0 to 2, and a plan for building on evenings without burning out or breaching your employment contract.',
    minutes: 20,
    lede: (
      <>
        Joseph Raffiee and Jie Feng followed thousands of Americans who started a business and found that{' '}
        <strong>those who kept their job at first were 33% less likely to fail than those who quit to go full time.</strong> This checklist scores whether it is
        safe to leave yet, and gives you a plan for building in the evenings until it is.
      </>
    ),
    study: {
      label: 'The study',
      big: 'Founders who kept their job at first failed less often.',
      body: (
        <>
          Raffiee and Feng, then at the University of Wisconsin–Madison, used a national survey that tracked the same people for 14 years. They compared people who
          started a business while still employed with people who left their job to start. The first group had a 33% lower risk of failure. The authors&apos;
          explanation: keeping the job lets you learn whether the business works before you bet your income on it. Published in the Academy of Management Journal
          in 2014.
        </>
      ),
      links: [
        { href: 'https://doi.org/10.5465/amj.2012.0522', label: 'Raffiee and Feng (2014), Should I Quit My Day Job?' },
        { href: 'https://www.entrepreneur.com/article/237755', label: 'Entrepreneur: summary of the study' },
      ],
    },
    tool: [
      {
        kind: 'note',
        big: 'This is not legal or financial advice.',
        body: 'Employment law, contracts and personal finances differ for everyone and every country. Use this page to prepare your questions, then talk to an employment lawyer and an accountant before you resign.',
      },
      {
        kind: 'table',
        title: 'Seven signs, scored 0 to 2',
        intro: 'Circle one score per row. Use facts from the last three months, not hopes.',
        head: ['Sign', '0', '1', '2'],
        rows: [
          ['Paying customers', 'None', 'One or two, or only friends', 'Three or more strangers have paid'],
          ['Months of runway', 'Under 3 months of living costs saved', '3 to 6 months', 'More than 6 months'],
          ['Repeatable demand', 'Every customer came from my own network', 'One channel has worked once', 'One channel brings customers every month'],
          ['Income replaced', 'Under 25% of my minimum living costs', '25% to 50%', 'Over 50%, three months in a row'],
          ['The job is the bottleneck', 'I have spare evening hours', 'I sometimes turn down paid work', 'I turn down paid work every week'],
          ['Clean contract', 'I have not read my contract', 'I read it and some clauses are unclear', 'No conflict, or written permission'],
          ['A way back', 'No plan if it fails', 'I could find work within six months', 'I could find work within three months, and my household agrees with the plan'],
        ],
        note: 'The thresholds are common rules of thumb, not findings of the study. Adjust the runway figure to your dependants and your costs.',
      },
      {
        kind: 'fields',
        title: 'Your score',
        fields: [
          { label: 'My total out of 14', rows: 1 },
          { label: 'My lowest row, and what would raise it by one point', rows: 2 },
        ],
      },
      {
        kind: 'table',
        title: 'Read your score',
        head: ['Score', 'What it suggests'],
        rows: [
          ['12 to 14, no zero', 'The signs are there. Set a leaving date and prepare the handover.'],
          ['8 to 11', 'Keep the job. Work on your lowest row for the next three months, then score again.'],
          ['Under 8', 'Too early. The business has not yet shown it can carry you.'],
          ['Any zero on runway or contract', 'Do not resign yet, whatever the total.'],
        ],
      },
      {
        kind: 'steps',
        title: 'A plan for building on evenings',
        steps: [
          { title: 'Fix your hours', body: 'Pick a weekly number you can hold for six months, for example four evenings of 90 minutes and one weekend morning. Put them in your calendar.' },
          { title: 'Keep one day fully off', body: 'No job, no startup. Tired founders make poor decisions and bad employees.' },
          { title: 'One outcome a week', body: 'Each Sunday write the single result for the week. Do customer-facing work first: calls, offers, delivery. Building comes after.' },
          { title: 'Keep the two worlds apart', body: 'Never use your employer\'s time, laptop, accounts, code, customer lists or confidential information. Use your own devices and your own accounts.' },
          { title: 'Read four clauses', body: 'In your contract, find: ownership of inventions, outside activities, non-compete and non-solicitation. If any is unclear, ask a lawyer before you ask your employer.' },
          { title: 'Get permission in writing', body: 'If your contract requires approval for side work, request it by email and keep the reply.' },
          { title: 'Set a health tripwire', body: 'If you sleep under six hours for two weeks, or you start missing goals at work, cut your startup hours by half for a month.' },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A marketing manager running a newsletter-design service on the side for eight months.',
        rows: [
          ['Customers', '2. Five strangers pay a monthly fee.'],
          ['Runway', '1. Four months of living costs saved.'],
          ['Demand', '1. Referrals plus one LinkedIn post that brought two clients.'],
          ['Income', '1. Side income covers 40% of her minimum costs.'],
          ['Bottleneck', '2. She turned down three clients last month.'],
          ['Contract', '1. The outside-activities clause is vague.'],
          ['Way back', '2. Her field is hiring and her partner agrees.'],
          ['Total and decision', '10 out of 14. She keeps the job, books one hour with an employment lawyer, and saves for three more months. She scores again in March.'],
        ],
      },
    ],
    today: 'Find your employment contract and read the clauses on inventions and outside activities. Ten minutes. Mark anything unclear.',
    cta: 'Evenings are short. Describe your product in a sentence and Youmake builds a working version, so your limited hours go to customers and not to setup.',
    source:
      'Source: Joseph Raffiee and Jie Feng, "Should I Quit My Day Job? A Hybrid Path to Entrepreneurship", Academy of Management Journal 57(4), 2014. The scoring grid and the evening plan are our own tool. This page is general information, not legal or financial advice.',
    updated: UPDATED,
  },
  {
    slug: 'team-safety',
    keyword: 'SAFETY',
    episode: 11,
    type: 'survey',
    name: 'The team safety check',
    title: 'The team safety check: measure psychological safety in ten minutes',
    description:
      'A free anonymous team survey built on Amy Edmondson\'s seven-statement psychological safety scale: how to run it, how to score it, and five leader habits that raise the score.',
    minutes: 20,
    lede: (
      <>
        Amy Edmondson found that teams learn and perform better when people feel safe to speak up, and{' '}
        <strong>Google&apos;s study of 180 of its own teams ranked psychological safety first among the five things that made a team effective.</strong> This page
        gives you her seven-statement survey, how to score it, and five leader habits that raise the score.
      </>
    ),
    study: {
      label: 'The research',
      big: 'On safe teams, people report problems early. On unsafe teams, they hide them.',
      body: (
        <>
          In the 1990s Amy Edmondson, now at Harvard Business School, studied hospital teams and found that the units with better leadership reported more
          medication errors, not fewer: people there were willing to talk about them. In 1999 she published a seven-statement scale of team psychological safety,
          tested on 51 work teams in a manufacturing company. Google later ran Project Aristotle on 180 of its teams, 115 in engineering and 65 in sales, and
          listed psychological safety first, in order of importance, among five dynamics of effective teams.
        </>
      ),
      links: [
        { href: 'https://www.jstor.org/stable/2666999', label: 'Edmondson (1999), Administrative Science Quarterly' },
        { href: 'https://rework.withgoogle.com/intl/en/guides/understand-team-effectiveness', label: 'Google re:Work: Understand team effectiveness' },
      ],
    },
    tool: [
      {
        kind: 'table',
        title: 'The seven statements',
        intro: 'Each person rates every statement from 1 (very inaccurate) to 7 (very accurate), thinking of this team as it is today.',
        head: ['#', 'Statement', 'Scoring'],
        rows: [
          ['1', 'If you make a mistake on this team, it is often held against you.', 'Reversed'],
          ['2', 'Members of this team are able to bring up problems and tough issues.', 'As given'],
          ['3', 'People on this team sometimes reject others for being different.', 'Reversed'],
          ['4', 'It is safe to take a risk on this team.', 'As given'],
          ['5', 'It is difficult to ask other members of this team for help.', 'Reversed'],
          ['6', 'No one on this team would deliberately act in a way that undermines my efforts.', 'As given'],
          ['7', 'Working with members of this team, my unique skills and talents are valued and utilized.', 'As given'],
        ],
        note: 'Statements and 7-point scale from Amy C. Edmondson, "Psychological Safety and Learning Behavior in Work Teams", Administrative Science Quarterly 44(2), 1999, pp. 350–383.',
      },
      {
        kind: 'steps',
        title: 'Run it anonymously',
        steps: [
          { title: 'Use any form tool', body: 'Seven questions, each a 1 to 7 scale. Do not collect names or email addresses.' },
          { title: 'Only with four or more people', body: 'With fewer, answers can be traced. For a team of two or three, use the statements as a conversation.' },
          { title: 'Say why, in one sentence', body: '"I want to know how safe it feels to speak up here, so I can fix what I am doing wrong."' },
          { title: 'Do not try to work out who answered what', body: 'One attempt is enough to make the next survey useless.' },
          { title: 'Share the results within a week', body: 'All seven averages, to the whole team, including the bad ones.' },
        ],
      },
      {
        kind: 'steps',
        title: 'Score it',
        steps: [
          { title: 'Reverse statements 1, 3 and 5', body: 'New score = 8 minus the answer. A 2 becomes a 6. After this step, higher always means safer.' },
          { title: 'Average each statement', body: 'Across all respondents. Seven numbers between 1 and 7.' },
          { title: 'Average the seven', body: 'This is your team score.' },
          { title: 'Note the lowest single answer per statement', body: 'An average of 5.5 can hide one person at 2. That person matters.' },
        ],
      },
      {
        kind: 'table',
        title: 'Your results',
        intro: 'After reversing 1, 3 and 5.',
        head: ['Statement', 'Team average', 'Lowest answer', 'One action'],
        blank: 7,
        blankLabels: ['1', '2', '3', '4', '5', '6', '7'],
      },
      {
        kind: 'note',
        big: 'There is no official pass mark.',
        body: 'Edmondson\'s paper does not define a "good" score. Compare your team with itself: run the survey again in three months and look at the direction. As a working rule, start with your lowest statement, and treat any statement averaging under 4 as urgent: more people disagree than agree.',
      },
      {
        kind: 'stages',
        title: 'Five leader habits that raise the score',
        intro: 'They follow Edmondson\'s advice to leaders: frame the work as learning, admit your own fallibility, and ask a lot of questions.',
        cols: ['Do this', 'Say this'],
        footLabel: 'Moves statement',
        stages: [
          {
            title: 'Go first with your own mistakes',
            sub: 'People copy what the leader does, not what the leader allows.',
            a: ['Open the weekly meeting with one thing you got wrong.', 'Say what you changed because of it.'],
            b: ['"I misjudged the deadline. Here is what I missed."', '"I may be wrong about this. Tell me where."'],
            foot: '1 and 4.',
          },
          {
            title: 'Ask, then wait',
            sub: 'A question followed by silence is an invitation. A question followed by your own answer is not.',
            a: ['Ask the quietest person first.', 'Give your own opinion last.', 'Count to seven before you fill a silence.'],
            b: ['"What am I missing?"', '"What would make this fail?"'],
            foot: '2 and 7.',
          },
          {
            title: 'Thank the messenger',
            sub: 'Your first reaction to bad news decides whether you hear the next one.',
            a: ['Say thank you before anything else.', 'Ask what they need. Do not ask who is at fault.'],
            b: ['"Thank you for telling me now."', '"What do you need from me?"'],
            foot: '1 and 2.',
          },
          {
            title: 'Make problems routine',
            sub: 'A fixed slot removes the courage needed to raise an issue.',
            a: ['Ten minutes a week: what went wrong, what nearly went wrong.', 'Review failures by looking at the process, not the person.'],
            b: ['"What made this mistake easy to make?"', '"Who needs help this week?"'],
            foot: '4 and 5.',
          },
          {
            title: 'Close the loop',
            sub: 'People stop speaking up when nothing happens afterwards.',
            a: ['Within a week, tell the person what you did with what they raised.', 'If you did nothing, say why.'],
            b: ['"You raised this on Monday. Here is what changed."', '"I decided not to act on it. This is my reason."'],
            foot: '2 and 6.',
          },
        ],
      },
      {
        kind: 'example',
        title: 'Worked example',
        intro: 'A six-person product team.',
        rows: [
          ['Statement 1 answers', '5, 6, 3, 5, 6, 5. Reversed: 3, 2, 5, 3, 2, 3. Average 3.0.'],
          ['Other averages', 'Statement 2: 4.8. Statement 3: 6.2. Statement 4: 3.7. Statement 5: 5.5. Statement 6: 6.0. Statement 7: 5.3.'],
          ['Team score', '4.9 out of 7.'],
          ['Reading', 'People trust each other (3 and 6 are high). Mistakes are punished (1 is 3.0) and so risk feels unsafe (4 is 3.7).'],
          ['Action', 'The founder opens each Monday meeting with her own mistake of the week, and starts a ten-minute "what nearly went wrong" slot.'],
          ['Three months later', 'She runs the same seven statements and compares statement 1 and statement 4.'],
        ],
      },
    ],
    today: 'In your next meeting, name one mistake you made this week and what you changed. Then ask: "What am I missing?" and wait.',
    cta: 'Teams feel safer to try things when trying is cheap. With Youmake, anyone on the team can describe an idea and see a working version the same day.',
    source:
      'Sources: Amy C. Edmondson, "Psychological Safety and Learning Behavior in Work Teams", Administrative Science Quarterly 44(2), 1999; Amy C. Edmondson, "Learning from Mistakes Is Easier Said Than Done", Journal of Applied Behavioral Science 32(1), 1996; Google re:Work, "Understand team effectiveness". The reading rule and the five habits are our own summary.',
    updated: UPDATED,
  },
  {
    slug: 'luck-habits',
    keyword: 'LUCKY',
    episode: 12,
    type: 'guide',
    name: 'The luck habits guide',
    title: 'The luck habits guide: four habits of lucky founders',
    description:
      'A free guide that turns Richard Wiseman\'s four principles of luck into weekly habits for founders, with a four-week tracker: notice chance opportunities, listen to hunches, expect good fortune, turn bad luck to good.',
    minutes: 15,
    lede: (
      <>
        Richard Wiseman studied 400 people who called themselves lucky or unlucky and found the difference was behaviour: asked to count the photographs in a
        newspaper,{' '}
        <strong>the unlucky ones were too busy counting to see a large message reading &quot;Stop counting. There are 43 photographs in this newspaper.&quot;</strong>{' '}
        This guide turns his four principles into weekly habits with a tracker.
      </>
    ),
    study: {
      label: 'The research',
      big: 'Lucky people are not luckier. They notice more, ask more and recover faster.',
      body: (
        <>
          Wiseman, a psychologist at the University of Hertfordshire, recruited 400 volunteers who saw themselves as exceptionally lucky or unlucky. In the newspaper
          test the message sat on the second page. Unlucky people took about two minutes to count the photographs; lucky people saw the message and answered in
          seconds. He summed up the work in four principles in his book The Luck Factor (2003). When he taught the principles to volunteers for a month, 80% said
          they felt happier and luckier. That last result is self-reported.
        </>
      ),
      links: [
        { href: 'https://skepticalinquirer.org/2003/05/the-luck-factor/', label: 'Richard Wiseman, "The Luck Factor", Skeptical Inquirer (2003)' },
        { href: 'https://www.wilsonquarterly.com/quarterly/_/how-get-lucky/', label: 'Wilson Quarterly summary' },
      ],
    },
    tool: [
      {
        kind: 'stages',
        title: 'Four principles, as weekly habits',
        intro: 'One small action per principle, per week. Fifteen minutes to plan on Sunday.',
        cols: ['Weekly habit', 'It counts when'],
        footLabel: 'Why it works',
        stages: [
          {
            title: 'Notice chance opportunities',
            sub: 'Lucky people meet more people and look up more often.',
            a: [
              'Talk to one new person in or near your market.',
              'Change one routine: a different event, desk, route or forum.',
              'End every conversation with "Who else should I talk to?"',
            ],
            b: ['You have a new name and one thing you learned from them.', 'You were somewhere you were not last week.'],
            foot: 'A first customer, a co-founder or an investor usually arrives through someone you did not know a month ago.',
          },
          {
            title: 'Listen to your hunches',
            sub: 'Lucky people treat a gut feeling as information, then check it.',
            a: [
              'When you have a strong feeling about a person or a deal, write it down with the date before you decide.',
              'Take five quiet minutes before any decision you cannot undo.',
              'Once a month, reread the log: when was the hunch right?',
            ],
            b: ['One hunch is written down this week, with what you did about it.'],
            foot: 'A log shows you where your instinct is reliable and where it is not. Without one, you only remember the times you were right.',
          },
          {
            title: 'Expect good fortune',
            sub: 'Lucky people ask, because they expect a yes often enough.',
            a: [
              'Make one bold ask a week: an introduction, a pilot, a price, a press mention.',
              'Follow up once on every ask that got no reply.',
              'After a no, write the next step the same day.',
            ],
            b: ['The ask was sent to a real person.', 'A no still counts. An ask you did not send does not.'],
            foot: 'Fifty asks a year with a small chance each produce several results. Zero asks produce none.',
          },
          {
            title: 'Turn bad luck into good',
            sub: 'Lucky people have setbacks too. They spend less time on them.',
            a: [
              'For each setback, write three lines: how it could have been worse, what it opened, one thing you do differently.',
              'Then stop replaying it.',
            ],
            b: ['The three lines are written within 48 hours of the setback.'],
            foot: 'A lost customer who tells you why is a free interview. You only get it if you ask.',
          },
        ],
      },
      {
        kind: 'table',
        title: 'Your four-week tracker',
        intro: 'Write a name or a few words in each cell, not a tick. The first row is an example.',
        head: ['Week', 'New person', 'Routine changed', 'Hunch logged', 'Bold ask', 'Setback reframed'],
        rows: [
          [
            'Example',
            'Owner of a print shop, met at a trade fair',
            'Worked from a co-working space on Thursday',
            '"This reseller will not pay on time." Asked for 50% upfront.',
            'Asked a customer for an introduction to her head office',
            'Lost a pilot. Learned their IT team blocks new tools. Now I ask about IT on the first call.',
          ],
        ],
        blank: 4,
        blankLabels: ['1', '2', '3', '4'],
      },
      {
        kind: 'fields',
        title: 'Review after four weeks',
        fields: [
          { label: 'The best thing that came from a new person', rows: 2 },
          { label: 'Hunches logged, and how many were right', rows: 1 },
          { label: 'Asks sent, and how many got a yes', rows: 1 },
          { label: 'The habit I keep, and the one I change', rows: 2 },
        ],
      },
    ],
    today: 'Message one person you have not spoken to in a year. Two lines: what you are working on, and one question for them.',
    cta: 'Chances go to founders who have something to show when the moment comes. Describe your idea and Youmake builds a live version you can open in any conversation.',
    source:
      'Source: Richard Wiseman, The Luck Factor (2003), and his article of the same name in Skeptical Inquirer 27(3), May/June 2003. The weekly habits and tracker are our own adaptation of his four principles.',
    updated: UPDATED,
  },
];

export const getFounderResource = (slug: string) => founderResources.find((resource) => resource.slug === slug);
