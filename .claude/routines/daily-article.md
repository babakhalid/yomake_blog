# Daily article routine

Run by a scheduled Claude Code cloud routine (daily, 08:07 Africa/Casablanca) with this repo checked out. Publish ONE article per day to https://blog.youmake.dev. Pushing to `main` deploys to production via Vercel. Quality beats volume: if no story passes the gates below, publish nothing and say why.

## 0. Load the house rules

Read and follow these skills in this repo before writing:
- `.claude/skills/youmake-blog-writer/SKILL.md`: facts, keyword targets, on-page SEO, internal linking. **Mandatory.**
- `.claude/skills/copywriting/SKILL.md`: structure, headline, intro.
- `.claude/skills/ai-copywriter/SKILL.md`: title options and the final humanizer pass.

## 1. Pick a trending story (last 48 hours)

- Use WebSearch for news, launches and releases from the last 48 hours in these topics only: vibe coding and AI app/website builders (Lovable, Bolt, Replit, v0, Cursor, Base44 and similar), AI agents and AI dev tools (Claude, OpenAI, Gemini, coding agents, MCP), founders and small teams building with AI.
- Skip: AI-industry finance, chips, layoffs, education policy, celebrity and AI-ethics hot takes. Google declined to index those here.
- Map the story to a keyword from the youmake-blog-writer skill: an open target if one fits, otherwise a long-tail variant. Never target a keyword another article already owns.
- Duplicate check: run `node scripts/generate-index.mjs`, then read `src/generated/articles-index.json`. Reject any story already covered (same event or same angle), and any product with 2+ articles in the last 30 days.
- Verify the facts from at least 2 sources, at least one primary (vendor blog, docs, changelog, official announcement). Note exact dates.

## 2. Write it (English, US readers)

- 1,200 to 1,800 words of original analysis for builders: what changed, who it matters for, what to do about it, concrete examples, honest limits. No hype, no invented quotes, numbers or test results. Any price or limit must come from an official page fetched today.
- Follow the skill's on-page SEO checklist and internal-linking rules (5+ internal links: one Youmake product page where it fits, the topic hub, owner articles of keywords you mention, 2-3 related articles).
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

1. `npm ci`, then `npm run build`. It must succeed. If it fails, fix only your article (and the one optional cornerstone link edit from the skill) and retry. Never edit app code.
2. The build rewrites other articles' "Read Next" sections and the sitemap; do not commit those. Stage only your new article (plus the optional one-sentence cornerstone edit): `git add src/articles/<your-file>.md`.
3. `git pull --rebase origin main`, commit `Add article: <title>`, push to `main`.
4. Notify search engines: `node scripts/ping-search-engines.js https://blog.youmake.dev/articles/<slug>`.

## 4. Report

Finish with: the article URL, the story and its sources, the primary keyword chosen, why it passed the duplicate check, the internal links added, and the word count. If you published nothing, list the candidates you rejected and why.
