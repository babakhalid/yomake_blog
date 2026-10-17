---
name: youmake-blog-writer
description: House rules for writing and publishing an article on blog.youmake.dev - keyword targeting, internal linking, on-page SEO, Youmake facts, and the copywriting pass. Use for every new or updated blog article in this repo.
---

# Youmake blog writer

Every article must earn its place in Google: one clear search intent, a target keyword we can win, original analysis for people who build products with AI, and strong internal links. Generic AI-news commentary does not get indexed here (Search Console showed ~150 such posts "Crawled - currently not indexed"); do not write it.

Use the two copywriting skills in this repo on every article:
- `.claude/skills/copywriting/SKILL.md` for structure, headline, intro and CTA.
- `.claude/skills/ai-copywriter/SKILL.md` for the title options and, at the end, the humanizer pass over the full draft (remove AI tells: inflated words, rule-of-three padding, "it's not X, it's Y", em-dash overuse, vague attributions, filler).

## 1. Facts you must never contradict

- Youmake (https://www.youmake.dev/) is an AI app builder: websites, web apps, mobile apps and slide decks from a description; live preview + agent chat; publish to your own domain; export code or sync to GitHub; import a GitHub repo; integrations with GitHub, Supabase, Stripe, Vercel; security scan before publishing; team seats on Builder and up.
- Pricing: NO free plan. 3-day trial for $1 (card required). Starter $20/mo (40 credits, $16/mo yearly), Builder $45 (90 credits), Agency $120.
- Never write "try free", "free plan", "no credit card" or "#1" about Youmake. No emojis. No invented quotes, numbers, prices or test results. Competitor prices only from their official page, fetched the same day, with a "checked on <date>" line.
- Author is always `Khalid BABA` (founder of Youmake).

## 2. Keyword targets (US, monthly searches, difficulty 0-100, researched Oct 2026)

Pick ONE primary keyword per article and 2-4 close variants. Prefer low difficulty and buyer intent. Check src/generated/articles-index.json first: do not target a primary keyword an existing article already owns (cannibalization).

Already owned (link to these, don't compete):
| Keyword | Vol | KD | Owner article |
|---|---|---|---|
| lovable alternative(s) | 590 | 0 | /articles/lovable-alternatives |
| replit alternative | 880 | 0 | /articles/replit-alternatives |
| best vibe coding tools / platform / app | 1600 / 590 / 480 | 6-11 | /articles/best-vibe-coding-tools |
| best ai website builder(s) 2026 | 4400 | 28-32 | /articles/best-ai-website-builders-2026 |
| free ai website builder | 4400 | 41 | /articles/free-ai-website-builder |
| how to build an app without coding | 110 | 3 | /articles/how-to-build-app-without-coding |
| what is vibe coding | 60500 | 38 | /articles/what-is-vibe-coding |
| youmake vs lovable / bolt | - | - | /articles/youmake-vs-lovable, /articles/youmake-vs-bolt |

Open targets (write these when a trending story fits):
| Keyword | Vol | KD | Intent |
|---|---|---|---|
| v0 alternative | 140 | 0 | buyer |
| bolt.new alternative / bolt alternative | 110 / 70 | 0 | buyer |
| lovable vs bolt | 170 | 3 | buyer |
| lovable agency | 90 | 6 | buyer (agencies) |
| how to start vibe coding / learn vibe coding | 210 / 210 | 17 / 9 | learner |
| vibe coding tutorial | 260 | 22 | learner |
| vibe coding ideas / vibe coding projects | 170 / 170 | 10 / 12 | learner |
| vibe coding vs agentic coding | 210 | 13 | learner |
| free vibe coding tools | 320 | 26 | buyer |
| ai mobile app builder | 320 | 35 | buyer |
| ai web app builder | 210 | 41 | buyer |
| client portal builder / white label ai website builder | 30 / 30 | 0-8 | buyer (agencies) |
| cursor alternative | 1000 | 8 | developer (only if a real angle for builders) |
Long shots (support only, never the primary): ai app builder 12100 (KD31), ai website builder 40500 (KD44).

For a trending story, choose the angle that maps it to an open target, e.g. a new v0 release -> "v0 alternative" comparison update; a Lovable price change -> "lovable vs bolt" or an update to the Lovable alternatives article.

## 3. On-page SEO checklist

- `title`: primary keyword near the start, specific benefit, under 65 characters, no clickbait words. Use ai-copywriter to draft 5 options and pick the most specific.
- `description`: 140-160 characters, contains the keyword naturally, says what the reader gets.
- Slug: short, keyword-based, lowercase-hyphen (e.g. `v0-alternatives`). Never reuse or rename an existing slug.
- First 100 words: state the answer/thesis and use the primary keyword once.
- Structure: H2s that match real sub-questions (People Also Ask style); tables for comparisons; a short FAQ (3-4 questions) when the topic has clear questions. Never start the body with a `# title` (the page renders the H1).
- `topic` frontmatter: one of `vibe-coding`, `ai-agents-tools`, `founders` (new articles stay in these three).
- `keywords` frontmatter: primary first, then variants.
- Freshness: when you substantially update an existing article instead of writing a new one, set `updated: "YYYY-MM-DD"` and keep `date`.
- Sources section at the end with the URLs you used.
- Do not add a "Read Next" section (the build generates it).

## 4. Internal linking (required)

Every article includes at least 5 internal links, written into sentences with descriptive anchor text (never "click here"):
1. **One Youmake product page** where it genuinely fits:
   - https://www.youmake.dev/ai-website-builder (small-business websites)
   - https://www.youmake.dev/use-cases/client-portal (agencies, client work)
   - https://www.youmake.dev/features/code-ownership (export, GitHub, hand-off)
   - https://www.youmake.dev/ (general)
2. **Its topic hub**: /topics/vibe-coding, /topics/ai-agents-tools or /topics/founders.
3. **The owner article of any keyword you mention** from the "Already owned" table (e.g. mention Lovable -> link /articles/lovable-alternatives).
4. **2-3 related articles** from src/generated/articles-index.json (same topic, recent first).
Also: if your new article is the best page for an open keyword, add one sentence linking to it from the most relevant existing cornerstone article (one edit, no rewrites) and set that article's `updated` date.

## 5. Final checks before publishing

- Humanizer pass done (ai-copywriter).
- Facts in section 1 respected; every number has a source.
- Primary keyword in title, description, first paragraph and one H2.
- 5+ internal links present and all resolve (articles exist in src/articles, topic slugs valid).
- `npm run build` passes.
