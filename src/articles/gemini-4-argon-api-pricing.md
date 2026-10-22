---
title: "Gemini 4 Argon API Pricing: What to Build Before Dec 1"
description: "Gemini 4 Argon costs $2 in and $10 out per million tokens until Nov 30, then doubles. Here is how to budget, pick a tier and build the app around it."
date: "2026-10-22"
author: "Khalid BABA"
tags: ["Gemini", "AI API", "AI Pricing", "AI Agents"]
topic: "ai-agents-tools"
keywords: ["gemini 4 argon api pricing", "gemini 4 argon for apps", "gemini api cost", "gemini 4 argon"]
published: true
---

Google made Gemini 4 Argon generally available on October 13, 2026. Its API price is $2 per million input tokens and $10 per million output tokens through November 30, and it doubles on December 1. If you are building an AI feature this quarter, that date matters more than any benchmark.

You do not need a backend team to act on it. The app around the model (sign-in, screens, saved results, a usage meter) is the part you can describe and build in [Youmake](https://www.youmake.dev/), then point at Argon with a few settings. This guide covers what changed, what it costs, and the steps to take now.

## What Google announced

These facts come from Google's [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog) and [pricing page](https://ai.google.dev/gemini-api/docs/pricing), both fetched on October 22, 2026.

- On October 13, 2026, `gemini-4-argon` became generally available. Google describes it as built for complex coding, agentic, math and science tasks.
- Argon is not available on the free tier of the Gemini API. You need a paid account.
- Context caching is implicit only. Explicit caching is not supported for this model.
- The Standard tier includes Google Search grounding and Google Maps grounding, with 5,000 free requests per month shared across Gemini 3 and newer models. After that, each costs $14 per 1,000 requests.
- Separately, on October 8 Google deprecated Gemini 3.7 Flash and Gemini 3.5 Flash. Requests to them are routed to newer Flash models automatically, and the Deep Research agent `deep-research-pro-preview-12-2025` shuts down on October 23.

[Let's Data Science](https://letsdatascience.com/news/gemini-4-argon-undercuts-claude-on-price-73027210) reports the same availability date and the same price step on December 1. Benchmark claims so far are Google's own, and I have not tested Argon myself.

## The price table, before and after December 1

Prices are per million tokens in US dollars. The first figure applies through November 30, the second from December 1.

| Tier | Input | Output (including thinking) |
|---|---|---|
| Standard | $2.00 / $4.00 | $10.00 / $20.00 |
| Batch and Flex | $1.00 / $2.00 | $5.00 / $10.00 |
| Priority | $3.60 / $7.20 | $18.00 / $36.00 |

Output includes the model's thinking tokens, so a reasoning-heavy answer costs more than its visible length suggests.

## What this changes for people who build with AI

The surprise is what hurts, not the price. A prototype that costs $9 a day in November can cost $18 a day in December with no change to your code.

Here is the arithmetic with assumed numbers: 1,000 requests a day, each with 2,000 input tokens and 500 output tokens. That is 2 million input and 0.5 million output tokens daily. On Standard through November 30, that is 2 x $2 + 0.5 x $10 = $9 a day, about $270 over 30 days. From December 1 the same traffic is 2 x $4 + 0.5 x $20 = $18 a day, about $540. Your real numbers will differ, so replace the assumptions with your own logs.

Three decisions follow from that.

1. **Price the feature at the December rate.** If your plan only works at $2 and $10, it does not work.
2. **Move slow work to Batch or Flex.** Summaries, reports and nightly jobs rarely need an instant answer, and those tiers cost half the Standard price.
3. **Keep a cheaper model in reserve.** Argon is for hard tasks. Routine ones can go to a Flash model.

## What to do now

1. **Log tokens per request.** Record input and output tokens for every call. You cannot budget without them.
2. **Set a daily spend cap in your own code.** Stop or downgrade the model when the cap is hit, before the invoice tells you.
3. **Route by difficulty.** Send short, simple requests to a Flash model and keep Argon for long, multi-step work.
4. **Make the model name a setting.** Put the model ID and API key in environment variables so a switch takes a minute. Model lines get renamed and retired often, as the October 8 deprecations show.
5. **Call the API from a server function.** The key must never reach the browser.
6. **Test 20 real tasks.** Compare Argon with the model you use now on your own data before you commit.

## How to do this with Youmake

Argon does the thinking, but your users still need a product around it. [Youmake](https://www.youmake.dev/) builds web apps, mobile apps and slide decks from a description, with a live preview and an agent chat for changes. You can publish to your own domain or [export the code and sync it to GitHub](https://www.youmake.dev/features/code-ownership).

![The Youmake workspace with live preview and agent chat](/images/blog/youmake-workspace-live-preview-agent-chat.webp)

Here is a prompt to paste into Youmake for an app that is built around cost control:

> Build a web app where a user pastes a long document and gets a structured summary with key points and action items. Include sign-up, a history page and a detail view for each summary. Store users and summaries in Supabase. Put the AI call in a server-side function that reads the model name and API key from environment variables. Record input tokens and output tokens for every request in a usage table, show each user their usage this month, and block new requests when a daily limit that I can edit is reached.

Then:

1. Paste the prompt into the composer and review the first preview.
2. Ask the agent chat to connect Supabase for authentication and storage, and Stripe if you want to charge per use.
3. Add your Gemini API key and model name as environment variables, then run 20 real documents through it.
4. Check the usage table against your own token math, run the security scan and connect your domain.

If you want to try this without a long commitment, you can [start a 3-day Youmake trial for $1](https://www.youmake.dev/) (card required). It is enough time to get a first version running against a real model. If this is your first build, read [how to build an app without coding](/articles/how-to-build-app-without-coding) and [what is vibe coding](/articles/what-is-vibe-coding).

Agencies building this for clients can pair it with a [client portal](https://www.youmake.dev/use-cases/client-portal), so each client sees their own usage and bill.

## Related reading

Argon is not the only new model builders are weighing. Our guide to [Reflection Beam for apps](/articles/reflection-beam-for-app-builders) covers an open-weight option you can host yourself, and [Muse Spark Open](/articles/muse-spark-open-for-app-builders) covers Meta's very different license terms. Before you let any model run commands, see why [agent sandboxes](/articles/agent-sdk-sandboxed-cloud-environments) matter. More articles on this theme live in the [AI Agents & Tools hub](/topics/ai-agents-tools).

## Honest limits

- Benchmark claims are vendor-reported, and independent comparisons show the leading model changing by task.
- Youmake builds the app around the model. Whether the AI call works depends on your endpoint and server function, so read the generated code and test it before inviting users.
- The token example uses assumed volumes. Your costs depend on prompt length, thinking tokens and caching.
- Argon has no free tier, and explicit context caching is not available for it.
- Prices and limits change. Check Google's pricing page on the day you ship.

## FAQ

### How much does the Gemini 4 Argon API cost?

On the Standard tier it is $2 per million input tokens and $10 per million output tokens through November 30, 2026. From December 1 it is $4 and $20.

### Is Gemini 4 Argon free to use in the API?

No. Google's pricing page says it is not available on the free tier, so you need a paid Gemini API account.

### How can I lower my Argon bill?

Use the Batch or Flex tier for work that can wait, which costs half the Standard price. Route simple requests to a cheaper model and cap spend per day in your own code.

## Sources

- [Gemini API changelog](https://ai.google.dev/gemini-api/docs/changelog)
- [Gemini API pricing](https://ai.google.dev/gemini-api/docs/pricing)
- [Gemini 4 Argon launches with an introductory API discount, Let's Data Science](https://letsdatascience.com/news/gemini-4-argon-undercuts-claude-on-price-73027210)

*Facts checked on October 22, 2026.*
---

## Read Next

- [Reflection Beam for Apps: Use the Open Model Now](/articles/reflection-beam-for-app-builders)
- [AI Agents Are Killing Apps — And That's a Good Thing](/articles/ai-agents-are-killing-apps-and-thats-a-good-thing)
- [ChatGPT Just Hit 1 Billion Users. The Age of AI Agents Is What Comes Next.](/articles/chatgpt-one-billion-users-ai-agents-era-what-happens-next)
