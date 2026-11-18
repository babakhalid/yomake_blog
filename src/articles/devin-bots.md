---
title: "Devin Bots Explained: Templates, Pricing and What to Do Now"
description: "Devin Bots launched November 17, 2026. See what these always-on agent teams do, which plans include them, and what to build first if you have no codebase."
date: "2026-11-18"
author: "Khalid BABA"
tags: ["Devin Bots", "AI Agents", "Coding Agents", "Youmake"]
topic: "ai-agents-tools"
keywords: ["devin bots", "devin bots pricing", "what are devin bots", "always-on coding agents"]
image: "/images/blog/devin-bots.jpg"
published: true
---

Cognition launched Devin Bots on November 17, 2026. Each Bot is an always-on agent that leads a team of Devin coding agents and keeps them working until their pull requests are ready to merge. The product assumes you already have a codebase, tests and someone who reviews code. If you have none of those yet, a team of agents has nothing to work on, and the better first move is to build the product. [Youmake](https://www.youmake.dev/) takes you from a description to a published app, with code you can sync to GitHub for whoever works on it next.

## What are Devin Bots?

Cognition's product page says a Devin Bot leads a team of agents that build, test and improve your software around the clock. You give the Bot a goal. It breaks the goal into pieces, starts parallel sessions (each agent on its own cloud machine) and keeps every session going until its pull request is ready. The Bot brings you only the decisions that need a person.

A few details from the product page and from Fortune's launch report:

- You talk to a Bot in Slack or a group chat, and it remembers context across weeks.
- Bots run recurring work on a schedule or a trigger: checking CI health every night, watching Slack for customer issues, watching Linear for blockers.
- Agents hand work to each other. A QA agent finds a bug, passes it to a developer agent, then tests the fix.
- Admins choose which repositories and tools each Bot can reach. Teams decide which changes need human review and can auto-approve low-risk edits.
- A Bot uses stronger models for planning and cheaper ones for routine code, and each Bot can have its own budget.

Fortune describes projects that run for days or weeks, and places the launch next to OpenAI's Dots and Anthropic's Duet, two always-on agents announced in the past few months. Cognition told Fortune that usage across dozens of early-access customers grew tenfold in two weeks. That number is the company's own.

## The six Devin Bots templates

The product page lists six starting points:

| Template | What it does |
|---|---|
| Software Factory | Finds bugs, polish and refactoring work in one product area and opens one small pull request per item |
| Product Engineer | Builds features and fixes bugs from a ticket through to a tested pull request |
| QA Engineer | Tests each pull request in a real browser, posts a video and reports pass or fail |
| Android Engineer | Builds Android features in Kotlin and ships builds to internal testing |
| Latency Optimizer | Finds slow endpoints and queries, then opens a weekly pull request with before and after timings |
| Chief of Staff | Monitors channels, posts updates and delegates work |

Read the table again and look at what every row takes for granted: a repository, a ticket queue, a test suite, and a person who merges pull requests.

## Devin Bots pricing: which plans include them

Cognition has not published a separate price for Bots. On the Devin pricing page, checked on November 18, 2026:

| Plan | Price | Devin Bots |
|---|---|---|
| Free | $0 | Not listed |
| Pro | $20 a month | Not listed |
| Max | $200 a month | Included |
| Teams | $80 a month plus $40 a month per full developer seat | Included |
| Enterprise | Custom | Contact sales |

The page does not publish quota numbers, so I cannot tell you how much Bot work a plan covers before extra usage starts. Cognition's CEO Scott Wu told Fortune that developers will want to keep costs down as they use products that do far more work than before. If you try Bots, watch the cost from the first day.

## What this changes for people who build with AI

Three vendors now sell an always-on coding agent. For engineering teams, the daily job moves further from writing code toward writing goals, setting limits and approving results. If the difference between steering every step and delegating a goal is new to you, [vibe coding vs agentic coding](/articles/vibe-coding-vs-agentic-coding) explains it.

For everyone else, the detail that counts is what a Bot works on. A Bot maintains and extends software that already exists. It is aimed at a team with a backlog. A founder who only has an idea gets little from it. I think plenty of solo builders will read "a team of agents working around the clock" and assume it replaces the step where you build the thing. It doesn't. Someone still has to decide what the product is, look at it, and say whether it is right.

So the choice comes down to what you have today. If you have a codebase, tests and a backlog of small tasks, a Bot may be worth a trial. If you have an idea, a client brief or a rough prototype, build the first version, then decide if you ever need agents maintaining it.

## What to do now if you already have a codebase

1. Pick one narrow, recurring job. QA on every pull request or a nightly CI check is easier to judge than "improve the product."
2. Check your tests first. Fortune reports that Bot code goes through the same tests as human code, so thin tests mean thin checks.
3. Give the Bot the smallest access that lets it do the job: one repository, the tools that job needs.
4. Start with human review on every change and a fixed budget. Relax the review rule for low-risk edits only after you have read a few weeks of its pull requests.
5. After two weeks, compare what merged against what you spent.

If you write instructions for agents often, the [Agent Skills open standard](/articles/agent-skills-open-standard) is a good way to keep them reusable. And once agent-written code is live, set up [monitoring for the app in production](/articles/monitor-vibe-coded-app-production).

No codebase yet? [Start a 3-day Youmake trial for $1 →](https://www.youmake.dev/) and build one.

## How to build the product first with Youmake

Youmake is an [AI app builder](/articles/best-ai-app-builders) for the stage before any of this: you describe a website, web app, mobile app or slide deck and watch it take shape in a live preview.

1. Open the composer and choose what you are building. For a small-business site, the [AI website builder](https://www.youmake.dev/ai-website-builder) page is a good starting point.
2. Paste a specific prompt. For example:

   > Build a web app for a small catering company to manage event inquiries. Public page: menu packages with prices and an inquiry form (date, guest count, budget, notes). Private dashboard: a list of inquiries with status (new, quoted, booked, declined) and a notes field. Clean white and blue design, mobile first.

3. Refine it in the agent chat. Ask for changes in plain words ("add a filter by status", "send an email when a new inquiry arrives") and check each one in the preview. Every request shows its credit cost.
4. Connect what the app needs. Youmake integrates with Supabase for data and Stripe for payments.
5. Run the security scan, then publish to your own domain.
6. Sync the project to GitHub or export it with [Youmake's code ownership features](https://www.youmake.dev/features/code-ownership). From that point the app is an ordinary repository that a developer can open in an editor, or that a team can later hand to repo-based coding agents.

![The Youmake workspace with live preview and agent chat](/images/blog/youmake-workspace-live-preview-agent-chat.webp)

Step 6 is why this is not an either/or choice. You build the first version in an afternoon, and the agent question waits until there is a product with users and a backlog. If you have never built anything, [how to build an app without coding](/articles/how-to-build-app-without-coding) walks through the basics, and our [Cursor alternative for non-developers](/articles/cursor-alternative) guide covers the same decision for code editors.

## Honest limits

- Youmake has no free plan. You start with a 3-day trial for $1 (card required), then Starter at $20 a month with 40 credits.
- Youmake is not an always-on agent team. It will not watch your Slack or open pull requests overnight. You steer it in chat and review the result in the preview.
- Devin Bots launched on November 17, one day before this was written. The growth figure comes from Cognition, quotas are unpublished, and there are no independent reviews yet. Check the official pricing page before you buy.

## FAQ

**What is a Devin Bot?**
A persistent agent from Cognition that manages a team of Devin coding agents. It splits a goal into tasks, runs them in parallel on cloud machines and asks you only for the decisions it cannot make alone.

**Are Devin Bots included in Devin's Free tier?**
No. On November 18, 2026, the Devin pricing page listed Bots on Max ($200 a month) and Teams ($80 a month plus $40 per full developer seat), not on Free or Pro.

**Do I need Devin Bots to build an app?**
No. Bots work on software that already exists. To get a first version, describe it in Youmake, refine it in chat and publish it. You can add engineers or agents later because the code is yours to export.

More guides on agents and developer tools are in the [AI agents and tools hub](/topics/ai-agents-tools).

[Start a 3-day Youmake trial for $1 →](https://www.youmake.dev/)

## Sources

- https://devin.ai/bots
- https://devin.ai/pricing
- https://fortune.com/2026/11/17/exclusive-cognition-bets-on-devin-bots-coding-agents-in-challenge-to-anthropics-duet-and-openais-dots/
- https://www.youmake.dev/

*Facts checked on November 18, 2026.*
---

## Read Next

- [Businesses in ChatGPT: How to Claim Your Business Profile](/articles/businesses-in-chatgpt)
- [Claude Fable 5.2 API Pricing: 20% Cheaper, Still 2x Opus 5.5](/articles/claude-fable-5-2-api-pricing)
- [Free Vibe Coding Tools: What Each Free Tier Really Gives You](/articles/free-vibe-coding-tools)
