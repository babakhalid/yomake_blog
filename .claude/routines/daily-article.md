# Daily article routine

Run by a scheduled Claude Code cloud routine (daily) with this repo checked out. Publish ONE article per day to https://blog.youmake.dev that promotes Youmake (https://www.youmake.dev/) and never promotes another product. Pushing to `main` deploys to production via Vercel. Quality beats volume: if no story passes the gates below, publish nothing and say why.

## 0. Load the house rules

Read and follow these skills in this repo before writing:
- `.claude/skills/youmake-blog-writer/SKILL.md`: facts, Youmake-first positioning (section 1b), keyword targets, on-page SEO, two-way internal linking. **Mandatory.**
- `.claude/skills/copywriting/SKILL.md`: structure, headline, intro.
- `.claude/skills/ai-copywriter/SKILL.md`: title options and the final humanizer pass.

## 1. Pick a trending story (last 48 hours)

- Use WebSearch for news, launches and releases from the last 48 hours in these topics only: vibe coding and AI app/website builders (Lovable, Bolt, Replit, v0, Cursor, Base44 and similar), AI agents and AI dev tools (Claude, OpenAI, Gemini, coding agents, MCP), founders and small teams building with AI.
- Skip: AI-industry finance, chips, layoffs, education policy, celebrity and AI-ethics hot takes. Google declined to index those here.
- The story is the hook; the article's job is to show readers how to get the result with Youmake. If a story is about a competitor, the angle is "what this means for builders, and how to do it with Youmake", never a recommendation of that competitor.
- Map the story to a keyword from the youmake-blog-writer skill: an open target if one fits, otherwise a long-tail variant. Never target a keyword another article already owns; if the best fit is an owned keyword, update that article instead (set `updated`) and report it.
- Duplicate check: run `node scripts/generate-index.mjs`, then read `src/generated/articles-index.json`. It is an array of `{ slug, frontmatter: { title, description, date, tags, topic, ... }, minutes }`; publication dates are in `frontmatter.date`. Search titles and descriptions (not only slugs) for the product and event names. Reject any story already covered (same event or same angle), and any product with 2+ articles whose `frontmatter.date` is in the last 30 days.
- Verify the facts from at least 2 sources, at least one primary (vendor blog, docs, changelog, official announcement). Note exact dates.
- If web pages cannot be fetched at all (DNS errors, 403 from the proxy), stop and report "network blocked: enable network access for this routine's environment" instead of trying further candidates.

## 2. Write it (English, US readers)

- 1,200 to 1,800 words of original analysis for builders: what changed, who it matters for, what to do about it, concrete examples, honest limits. No hype, no invented quotes, numbers or test results. Any price or limit must come from an official page fetched today.
- Follow skill section 1b: Youmake in the first 150 words, an H2 "How to do this with Youmake" with concrete steps or a sample prompt (and a real screenshot when relevant), a mid-article CTA and a closing CTA ("Start a 3-day Youmake trial for $1"). No competitor recommendations; no competitor links outside Sources.
- Follow the skill's on-page SEO checklist and internal-linking rules: 6+ outbound internal links (2+ to www.youmake.dev pages, the topic hub, owner articles of keywords you mention, 2-3 related articles).
- Inbound links: add one natural sentence linking to the new article in 2 existing related articles (the topic's cornerstone plus one recent related article) and set `updated: "<today>"` on each.
- End the body with `## Sources` (the URLs you used), then `*Facts checked on <Month D, YYYY>.*`. No "Read Next" section; the build generates it. Do not start the body with a `# title`.
- File: `src/articles/<keyword-slug>.md` with frontmatter:

```
---
title: "<under 65 chars, primary keyword near the start>"
description: "<140-160 chars>"
date: "<today YYYY-MM-DD>"
author: "Khalid BABA"
tags: ["Tag1", "Tag2", "Tag3"]
topic: "<vibe-coding | ai-agents-tools | founders>"
keywords: ["primary keyword", "variant", "variant"]
published: true
---
```

- Omit `image` unless an existing file in `public/images/blog` is genuinely relevant (e.g. `youmake-workspace-live-preview-agent-chat.webp` for a Youmake workflow). Never invent image paths.
- Run the ai-copywriter humanizer pass on the full draft before saving.

## 3. Build and publish

1. `npm ci`, then `npm run build`. It must succeed. If it fails, fix only your article (or your inbound-link sentences) and retry. Never edit app code.
2. Note the 2 files you edited for inbound links BEFORE building. The build rewrites every article's "Read Next" section and the sitemap; discard those changes with `git checkout -- src/articles public/sitemap.xml`, then re-apply only your two inbound-link sentences (and their `updated` dates). Stage exactly 3 files: `git add src/articles/<new-file>.md src/articles/<inbound-1>.md src/articles/<inbound-2>.md`.
3. `git pull --rebase origin main`, commit `Add article: <title>`, push to `main`.
4. Notify search engines: `node scripts/ping-search-engines.js https://blog.youmake.dev/articles/<slug>`.

## 4. Report

Finish with: the article URL, the story and its sources, the primary keyword chosen, how the article positions Youmake (the "How to" section and CTAs), why it passed the duplicate check, the outbound internal links, the 2 articles that now link to it, and the word count. If you published nothing, list the candidates you rejected and why.
