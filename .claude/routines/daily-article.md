# Daily article routine (runs twice a day)

Run by a scheduled Claude Code cloud routine at 08:07 and 16:07 (cron `7 8,16 * * *` UTC) with this repo checked out. **Each run publishes exactly ONE article** to https://blog.youmake.dev, so the blog gets two a day. Every article is based on current AI news or a trend, is written for people who build products and businesses with AI, and promotes Youmake (https://www.youmake.dev/). Pushing to `main` deploys to production via Vercel.

Never publish unverified news. If no story passes the gates in step 1, publish an evergreen article from step 1b instead, so every run publishes.

## 0. Load the house rules

Read and follow these skills in this repo before writing:
- `.claude/skills/youmake-blog-writer/SKILL.md`: facts, Youmake-first positioning (section 1b), keyword targets, on-page SEO, two-way internal linking. **Mandatory.**
- `.claude/skills/copywriting/SKILL.md`: structure, headline, intro.
- `.claude/skills/ai-copywriter/SKILL.md`: title options and the final humanizer pass.

## 1. Pick a story (AI news and trends)

1. `git pull origin main` first. The other run may have published today.
2. Use WebSearch for the most important AI news and trends of the last 48 hours (widen to 7 days if nothing qualifies). Any area of AI is allowed: new models and features (OpenAI, Anthropic, Google, Meta, Mistral, xAI and others), AI products and tools, AI agents, vibe coding and app builders, AI in business and work, AI regulation and policy, AI adoption data and research.
3. Rank candidates by: how many people are searching or talking about it, and how directly it affects someone building a website, app, product or business. Skip celebrity gossip, stock-price chatter and stories with no practical consequence for builders.
4. **Required angle (Google indexes these, not generic news):** the article must answer "what does this change for people who build with AI, and what should they do now?" A generic summary of the news is not allowed. Examples:
   - A new model launch → what it is better at, what it costs, and how to use it in a product, then how Youmake lets you build that product.
   - A regulation or policy story → what a small business or app builder must do, then how to ship a compliant site or app with Youmake.
   - An adoption or jobs study → what it means for freelancers and founders, and a concrete project they can build with Youmake this week.
   - A competitor's news (Lovable, Bolt, Replit, v0, Cursor) → the hook only; show how to get the result with Youmake. Never recommend the competitor.
5. **Duplicate check:** run `node scripts/generate-index.mjs`, then read `src/generated/articles-index.json` (an array of `{ slug, frontmatter: { title, description, date, tags, topic, keywords, ... }, minutes }`; dates are in `frontmatter.date`). Search titles, descriptions and keywords for the product, company and event names. Reject a story already covered (same event or same angle), including by today's other run. Avoid a third article on the same company within 7 days.
6. **Verify** the facts from at least 2 independent sources, at least one primary (the company's blog, docs, changelog, official announcement, the study itself, or the official government text). Note exact dates.
7. If web pages cannot be fetched at all (DNS errors, 403 from the proxy), skip news, go to step 1b, and say "network blocked: enable network access for this routine's environment" in the report.

## 1b. Fallback: evergreen article (when no story qualifies)

- Pick the first keyword from the "Open targets" table in the youmake-blog-writer skill that no article in the index targets yet (check `frontmatter.keywords` and titles). Prefer buyer intent, then learner intent.
- Write a practical guide that answers that search intent and shows how to do it with Youmake (a step-by-step build with sample prompts, a decision guide, or "Youmake as the alternative"). Only cite external facts you can fetch and verify today.

## 2. Write it (English, US readers)

- 1,000 to 1,600 words. Structure: the news in two or three sentences, then why it matters for builders, then what to do now (concrete steps), then **How to do this with Youmake**, then honest limits, then a short FAQ (3 questions) when there are clear questions.
- No hype, no invented quotes, numbers, prices or test results. Any price or limit must come from an official page fetched today.
- Follow skill section 1b: Youmake in the first 150 words, the "How to do this with Youmake" H2 with concrete steps or a sample prompt (and a real screenshot from `public/images/blog/` when relevant), a mid-article CTA and a closing CTA ("Start a 3-day Youmake trial for $1"). No competitor recommendations; no competitor links outside Sources.
- SEO: pick ONE primary keyword the article can rank for, usually the news phrase people search plus a builder intent (e.g. "gemini 3 api for apps", "eu ai act small business"), or an open target from the skill. Follow the skill's on-page checklist.
- Internal links: 6+ outbound (2+ to www.youmake.dev pages, the topic hub, owner articles of keywords you mention, 2-3 related articles), and add one natural linking sentence to the new article in 2 existing related articles (set `updated: "<today>"` on each).
- End with `## Sources` (the URLs you used), then `*Facts checked on <Month D, YYYY>.*`. No "Read Next" section. Do not start the body with a `# title`.
- File `src/articles/<keyword-slug>.md`:

```
---
title: "<under 65 chars, primary keyword near the start>"
description: "<140-160 chars>"
date: "<today YYYY-MM-DD>"
author: "Khalid BABA"
tags: ["Tag1", "Tag2", "Tag3"]
topic: "<vibe-coding | ai-agents-tools | founders | ai-industry | future-of-work | ai-education>"
keywords: ["primary keyword", "variant", "variant"]
published: true
---
```

- `topic`: the best fit among the six hubs (`ai-industry` for model/company/policy news, `ai-agents-tools` for tools and agents, `future-of-work` for jobs and skills, `founders` for startups, `vibe-coding` for builders and app makers, `ai-education` for schools).
- **Cover image (every article):** write a one-sentence scene that visualizes the article's idea (concrete objects and setting, e.g. "a glowing translucent cube on a desk beside a laptop running an app, linked by a thin light line to a cloud server"). No text, logos, real people or brand marks in the scene. Then run `node scripts/generate-cover.mjs <slug> "<scene>"`. It generates the image with GPT Image 2 on Replicate (Flux Schnell as fallback), applies the Youmake Sky art direction, and saves `public/images/blog/<slug>.jpg`. Set `image: "/images/blog/<slug>.jpg"` in the frontmatter. If the script fails (no Replicate access), publish without `image` and say so in the report. Never download or reuse images from the web: they are usually copyrighted.
- Run the ai-copywriter humanizer pass on the full draft before saving.

## 2b. Self-check (mandatory, before building)

1. Humanizer pass as its own step: re-read the whole draft against `.claude/skills/ai-copywriter/SKILL.md` and rewrite every flagged sentence. In the report, list 3 concrete changes it made.
2. Run these checks and fix anything that fails:
   - `title` is 65 characters or fewer and `description` is 140 to 160 characters (count them with a one-line `node -e` script).
   - No em dashes in the body, no emojis, no "free plan" / "try free" / "#1" claims about Youmake.
   - Every `/articles/<slug>` link points to an existing file in `src/articles`, and every `/topics/<slug>` is one of the six hubs.
   - The cover exists at `public/images/blog/<slug>.jpg` and is under 400 KB, and the frontmatter `image` points to it (unless generation failed).
   - At least 2 links to www.youmake.dev, a "How to ... with Youmake" H2, two CTAs, and Youmake in the first 150 words.

## 3. Build and publish

1. `npm ci`, then `npm run build`. It must succeed. If it fails, fix only your article (or your inbound-link sentences) and retry. Never edit app code.
2. Note the 2 files you edited for inbound links BEFORE building. The build rewrites every article's "Read Next" section and the sitemap; discard those with `git checkout -- src/articles public/sitemap.xml`, then re-apply only your two inbound-link sentences (and their `updated` dates). Stage exactly these files: `git add src/articles/<new-file>.md src/articles/<inbound-1>.md src/articles/<inbound-2>.md public/images/blog/<slug>.jpg` (the image only if it was generated).
3. `git pull --rebase origin main`, commit `Add article: <title>`, push to `main`.
4. Notify search engines: `node scripts/ping-search-engines.js https://blog.youmake.dev/articles/<slug>`.

## 4. Report

Finish with: the article URL, trending story or evergreen fallback, the story and its sources, the primary keyword, the builder angle, how the article positions Youmake ("How to" section and CTAs), why it passed the duplicate check, the outbound internal links, the 2 articles that now link to it, and the word count. List the news candidates you rejected and why.
