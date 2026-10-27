# Topical authority plan: AI app builder cluster

Status: draft for review. Nothing below has been published or edited. Built on Oct 27, 2026 from `src/articles`, `src/generated/articles-index.json`, the keyword table in `.claude/skills/youmake-blog-writer/SKILL.md` (researched Oct 2026) and `src/data/site.json`.

## 1. Buyer, problem, product page

- **Buyer:** a founder, freelancer or small agency who wants a working website, web app or mobile app without hiring a developer, and who is comparing AI builders (Lovable, Bolt, v0, Replit).
- **Problem:** pick a builder that ships a real product and won't trap them: publish on their own domain, keep the code, add payments and a database later.
- **Questions before buying:** Which AI app builder should I use? Can I get the code out? Can it make a mobile app? What does it cost per change? What happens if I leave?
- **Product page this cluster supports:** https://www.youmake.dev/ (primary), with https://www.youmake.dev/features/code-ownership as the destination for the lock-in / export questions.

## 2. Page plan

Pillar = `/articles/best-ai-app-builders` (owns "ai app builder", 12,100/mo, KD 26-36). Every row below should link to it, and it should link to every row.

| # | Reader question | Page type | Working title | Address | Status | Evidence needed | Owner |
|---|---|---|---|---|---|---|---|
| P | Which AI app builder should I use? | Pillar comparison | Best AI app builders | /articles/best-ai-app-builders | Existing | Same-day competitor pricing check | Khalid |
| 1 | Can I get the code out of an AI builder? | Answer / guide | AI app builder code export | /articles/ai-app-builder-code-export | Existing | Links to research page (row 12) once live | Khalid |
| 2 | Can AI build a mobile app? | Guide | AI mobile app builder | /articles/ai-mobile-app-builder | Existing | Real screenshot of a mobile build | Khalid |
| 3 | Which AI tool builds a full web app (auth, DB, payments)? | Guide | **PROPOSED** AI web app builder: what it needs to ship a real app | /articles/ai-web-app-builder | Proposed (210/mo, KD 41) | A web app built in Youmake with Supabase + Stripe, with screenshots | Khalid |
| 4 | What should I use instead of Lovable? | Alternatives | Lovable alternatives | /articles/lovable-alternatives | Existing | - | Khalid |
| 5 | What should I use instead of v0? | Alternatives | v0 alternative | /articles/v0-alternative | Existing | - | Khalid |
| 6 | What should I use instead of Replit? | Alternatives | Replit alternatives | /articles/replit-alternatives | Existing | - | Khalid |
| 7 | Youmake or Bolt / Lovable? | Head-to-head | Youmake vs Bolt, Youmake vs Lovable | /articles/youmake-vs-bolt, /articles/youmake-vs-lovable | Existing | - | Khalid |
| 8 | Lovable or Bolt? | Head-to-head | **PROPOSED** Lovable vs Bolt: which to pick (and when neither fits) | /articles/lovable-vs-bolt | Proposed (170/mo, KD 3) | Official pricing pages checked same day; same prompt run in both | Khalid |
| 9 | Which vibe coding tool is best (incl. free ones)? | Comparison | Best vibe coding tools | /articles/best-vibe-coding-tools | Existing; **update** with a "free vibe coding tools" H2 (320/mo) instead of a new page | Which tools have free tiers, checked same day | Khalid |
| 10 | Best / free AI website builder? | Comparison | Best AI website builders 2026, Free AI website builder | existing slugs | Existing | - | Khalid |
| 11 | How do I build an app without coding / start vibe coding? | Tutorial | How to build an app without coding; How to start vibe coding; Idea to production | existing slugs | Existing; fold "vibe coding tutorial" (260/mo) into `idea-to-production-5-minutes`, which already lists it as a keyword | - | Khalid |
| 12 | What happens to my app if I stop paying for an AI builder? | Original research | **PROPOSED** What you keep when you cancel an AI app builder (5 builders tested) | /articles/cancel-ai-app-builder-what-you-keep | Proposed; see section 5 | See section 5 | Khalid + tester (missing) |
| 13 | Vibe coding vs agentic coding? | Explainer | **PROPOSED** Vibe coding vs agentic coding | /articles/vibe-coding-vs-agentic-coding | Proposed (210/mo, KD 13), lower priority | - | Khalid |

Grouping decisions (to avoid cannibalization):
- "free vibe coding tools" goes in row 9, not a new page. Youmake has no free plan, so a standalone "free" page would have to rank other tools first, which breaks the house rules.
- "vibe coding tutorial" goes in row 11 (`idea-to-production-5-minutes`). It would overlap `how-to-start-vibe-coding` as its own page.
- "bolt alternative" stays with `youmake-vs-bolt` (already in its keywords).

## 3. Internal-link plan

Gaps found by scanning `/articles/` links in each page on Oct 27. These pages don't link to the pillar today: `ai-mobile-app-builder`, `v0-alternative`, `lovable-alternatives`, `replit-alternatives`, `youmake-vs-bolt`, `youmake-vs-lovable`, `free-ai-website-builder`, `client-portal-builder`, `how-to-start-vibe-coding`, `monitor-vibe-coded-app-production`, `what-is-vibe-coding`.

| Source | Destination | Exact linked words | Reader reason |
|---|---|---|---|
| ai-mobile-app-builder | best-ai-app-builders | AI app builders that also do web | Reader wants web + mobile; pillar compares the field |
| v0-alternative | best-ai-app-builders | compare every AI app builder | Reader rejected v0 and wants the wider shortlist |
| lovable-alternatives | best-ai-app-builders | full AI app builder comparison | Same: broader shortlist |
| replit-alternatives | best-ai-app-builders | best AI app builders for non-developers | Replit leavers are often non-developers |
| youmake-vs-bolt | best-ai-app-builders | how the other AI app builders compare | Two-way comparison reader wants the rest of the field |
| youmake-vs-lovable | best-ai-app-builders | the rest of the AI app builders | Same |
| free-ai-website-builder | best-ai-app-builders | AI app builder | Reader needs more than a site (logins, data) |
| what-is-vibe-coding | best-ai-app-builders | AI app builders | Reader learned the concept and now needs a tool |
| how-to-start-vibe-coding | best-ai-app-builders | pick an AI app builder | First step of starting is choosing a tool |
| monitor-vibe-coded-app-production | best-ai-app-builders | which AI app builder you used | Advice depends on the builder |
| client-portal-builder | best-ai-app-builders | AI app builder for client work | Agency reader comparing tools |
| youmake-vs-lovable | ai-app-builder-code-export | export the code from an AI app builder | Code ownership is a deciding difference |
| youmake-vs-bolt | ai-app-builder-code-export | AI app builder code export | Same |
| v0-alternative | ai-app-builder-code-export | which builders let you keep the code | v0 leavers worry about lock-in |
| replit-alternatives | ai-app-builder-code-export | export your code | Same |
| lovable-alternatives | ai-mobile-app-builder | build a mobile app with AI | Reader switching tools may also need a mobile app |
| v0-alternative | ai-mobile-app-builder | AI mobile app builder | Same |
| best-ai-app-builders | ai-web-app-builder (row 3, after publish) | AI web app builder | Pillar section on full apps |
| ai-web-app-builder | ai-app-builder-code-export | export the code | Next question after building |
| best-ai-app-builders, lovable-alternatives | lovable-vs-bolt (row 8, after publish) | Lovable vs Bolt | Readers deciding between the two |
| ai-app-builder-code-export, lovable-alternatives, v0-alternative | cancel-ai-app-builder-what-you-keep (row 12, after publish) | what you keep when you cancel | Cites the finding |
| idea-to-production-5-minutes | best-ai-app-builders | AI app builder | Tutorial reader may want to compare tools |

Rules: place each link next to the paragraph where that answer becomes useful (one sentence, no rewrites). Set `updated` on edited pages. After deploy, open every link and confirm it lands on the promised section.

## 4. Author (E-E-A-T)

Already in place: the byline links to `/about` with `rel="author"`. The about page has Person schema with LinkedIn and X in `sameAs`, and `authors` is set in article metadata. All pages use `Khalid BABA`.

Missing (inputs needed from you):
- Concrete experience on `/about`: what you built before Youmake, how long you've worked on AI builders, and a link to a demo or real build.
- A visible "How we tested" line on comparison pages (rows P, 4-8): date, prompts used, plan used. Only possible if those tests were actually run.
- `knowsAbout` / `worksFor` (Youmake) in the Person schema. Small code change, not done yet.

## 5. Unanswered question: proposed research (no findings yet)

**Question:** "If I cancel my AI app builder, what do I keep: the code, the live site, the domain, the database?" Buyers worry about lock-in (this is why `ai-app-builder-code-export` exists), but comparison pages usually only ask "can you export?". They rarely cover what happens after the subscription ends.

To confirm it's unanswered (inputs missing, not done yet):
1. Read the top 10 organic Google results for "ai app builder code export", "lovable cancel subscription what happens", "bolt.new export project". Record each one's answer and evidence.
2. YouTube transcripts and comments, plus Reddit/forum threads, on leaving Lovable, Bolt, v0 and Replit. Save URLs.
3. Sales/support questions from Youmake trial users about export or cancellation.

Method (to fix before collecting):
- Products: Youmake, Lovable, Bolt.new, v0, Replit.
- For each, on the cheapest paid plan: build the same small app (auth + one table + custom domain). Then cancel and record, at day 0 and day 7: site still live (Y/N), custom domain still served (Y/N), code downloadable (Y/N, format), GitHub repo still syncs (Y/N), database data reachable (Y/N).
- Sources: official docs/ToS (URL + date) for each claim, plus the observed test result with screenshots and dates. Mark docs-only claims separately from tested ones.
- Disclose that the author founded Youmake, and report Youmake's results by the same rules.

Publish as row 12 with the method and raw table. Link it from rows 1, 4 and 5.

Cost/risk: needs paid accounts on 5 tools (~1 month each) and a tester. If Youmake does worse on any check, publish that too.

## 6. Next related topic for the same buyer

**Agencies delivering client sites and apps with AI.** After choosing a builder, the freelancer or agency needs to hand work to clients: white-label, client portals, billing clients, transferring ownership.

- Product page: https://www.youmake.dev/use-cases/client-portal
- Pillar (proposed): "AI app builder for agencies" (keywords "lovable agency" 90/mo KD 6, "white label ai website builder" 30/mo). Confirm volume before writing.
- Reuse: `client-portal-builder` (existing), `ai-app-builder-code-export` (hand-off), `10-portfolio-websites`.
- Proposed detail pages: hand off an AI-built site to a client (domain + code transfer), pricing client work built with AI credits.
- Measure: trial starts from these pages (needs UTM or GA4 key event on youmake.dev links; see open question).

## Suggested order

1. Internal-link fixes in section 3 (existing pages only). Cheap and fast.
2. Update `best-vibe-coding-tools` (free H2) and `idea-to-production-5-minutes` (tutorial).
3. Write row 3 (AI web app builder), then row 8 (Lovable vs Bolt).
4. Author page additions (section 4).
5. Research study (row 12), if approved.
6. Agency cluster (section 6).

## Missing inputs

- Google top-10 / YouTube / forum data. Run it via OpenSEO (uses credits) or supply your own?
- Real buyer questions from sales/support/trial users.
- Author experience details and demos for `/about`.
- Who runs the cancellation study, and budget for 5 paid accounts.
- Is conversion tracked on blog to youmake.dev clicks (UTMs / GA4 key event)?
