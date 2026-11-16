---
title: "Claude Fable 5.2 API Pricing: 20% Cheaper, Still 2x Opus 5.5"
description: "Claude Fable 5.2 API pricing is $8 in and $40 out per million tokens. See the monthly math, when the cheaper Opus 5.5 is enough, and how to build around it."
date: "2026-11-16"
author: "Khalid BABA"
tags: ["Claude", "AI API", "AI Pricing", "AI Agents"]
topic: "ai-agents-tools"
keywords: ["claude fable 5.2 api pricing", "claude fable 5.2 pricing", "claude fable 5.2 api", "claude fable 5.2 for apps"]
image: "/images/blog/claude-fable-5-2-api-pricing.jpg"
published: true
---

Anthropic released Claude Fable 5.2 on November 9, 2026. Claude Fable 5.2 API pricing is $8 per million input tokens and $40 per million output tokens, 20% below Fable 5.1. It is also exactly twice the price of Claude Opus 5.5, the model Anthropic itself tells most developers to start with.

So the decision for a builder is which requests deserve the expensive model, and how to keep that a setting you can change. The product around the model (sign-in, screens, saved results, a usage page) is the part you can describe and build in [Youmake](https://www.youmake.dev/), then point at whichever Claude model your numbers support.

## What Anthropic announced

These facts come from Anthropic's [launch post](https://www.anthropic.com/claude-fable-and-mythos-5-2), its [models overview](https://platform.claude.com/docs/en/about-claude/models/overview) and its [pricing page](https://platform.claude.com/docs/en/about-claude/pricing), all fetched on November 16, 2026.

- Fable 5.2 launched on November 9, 2026 with the API model ID `claude-fable-5-2`.
- It has a 1M token context window and a 128K token output limit.
- Anthropic says output is up to 30% faster than Fable 5.1, with improvements in coding, reasoning and vision.
- It is available on the Claude Platform and through Amazon Web Services, Google Cloud and Microsoft Azure.
- Fable 5.2 has classifiers that block high-risk cybersecurity work and most research biology tasks. Anthropic says a blocked query gets its answer from an older Opus model instead.

On Anthropic's own benchmarks, Fable 5.2 scores 69.9% on FrontierSWE v2 against 56.3% for Fable 5.1, and 73.4% against 44.8% on Chartography, a vision test. Those are vendor numbers. Independent coverage such as [Computing for Geeks](https://computingforgeeks.com/claude-fable-5-2-released-features-benchmarks/) confirms the date and price, but your own tasks are the test that counts.

## Claude Fable 5.2 API pricing, line by line

Prices are in US dollars per million tokens, from Anthropic's pricing page on November 16, 2026.

| Line | Input | Output |
|---|---|---|
| Fable 5.2, standard | $8 | $40 |
| Fable 5.2, Batch API | $4 | $20 |
| Fable 5.2, fast mode | $16 | $80 |
| Fable 5.1, standard (previous) | $10 | $50 |

Prompt caching has its own rates. A 5-minute cache write costs $10 per million tokens, a 1-hour write costs $16, and a cache read costs $0.20, which is 2.5% of the base input price. Fast mode generates tokens up to 2.5 times faster at double the standard rate.

On the same page, Claude Opus 5.5 costs $4 and $20, Claude Sonnet 5.5 costs $2 and $10, and Claude Haiku 5.5 starts at $0.10 and $0.50.

## What a Fable 5.2 feature costs per month

Take assumed traffic of 1,000 requests a day, each with 2,000 input tokens and 500 output tokens. That is 2 million input tokens and 0.5 million output tokens a day.

| Model | Cost per day | Cost over 30 days |
|---|---|---|
| Fable 5.2 | 2 x $8 + 0.5 x $40 = $36 | $1,080 |
| Fable 5.1 | 2 x $10 + 0.5 x $50 = $45 | $1,350 |
| Opus 5.5 | 2 x $4 + 0.5 x $20 = $18 | $540 |
| Sonnet 5.5 | 2 x $2 + 0.5 x $10 = $9 | $270 |

If you already run Fable 5.1, changing the model ID saves $270 a month on this traffic. If you run Opus 5.5 today, moving everything to Fable 5.2 adds $540 a month. Replace the assumptions with your own logs before you decide.

One caution on output. The docs list thinking as adaptive and always on for Fable 5.2, with a default effort of `high` on the API. Read the output token count from each API response instead of guessing it from the length of the answer.

## When Fable 5.2 is worth it over Opus 5.5

Anthropic's own guidance is to start with Opus 5.5 for most workloads and move up to Fable 5.2 "when your evals on Claude Opus 5.5 at higher effort still fall short." For a builder, that sorts requests into two groups.

Fable 5.2 fits a small number of hard requests where a wrong answer is expensive: a long contract review, a multi-step agent that plans and calls tools for many minutes, a chart or scanned document that cheaper models misread.

Everything a user waits on a hundred times a day belongs on a cheaper model: chat replies, short summaries, tagging and routing. Sonnet 5.5 handles those at a quarter of Fable's price.

One data point runs in Fable's favor. At High effort, Anthropic says Fable 5.2 "scored about level with Opus 5.5 at Max effort, for roughly half the cost per task." Per-token price and per-task cost are different things, so measure the cost of a finished task on both models.

## What to do now

1. **Log tokens per request.** Store input, output and cached tokens for every call, with the model name. Without that table, any budget is a guess.
2. **Run 20 real tasks on Opus 5.5 first.** Raise the effort level before you raise the model. Keep the failures.
3. **Rerun only the failures on Fable 5.2.** If it fixes them, route that task type to Fable and leave the rest alone.
4. **Make the model a setting.** Put the model ID and the API key in environment variables. Anthropic's model IDs are pinned snapshots, so an upgrade is always a deliberate change on your side.
5. **Cache the long, repeated part of the prompt.** A system prompt or reference document that repeats on every call costs $0.20 per million tokens on a cache read instead of $8.
6. **Send work that can wait to the Batch API.** Nightly reports and bulk document processing cost half there.
7. **Cap daily spend in your own code.** When the cap is hit, downgrade the model or stop, and tell the user why.

You can build an app that does all seven without writing the plumbing yourself. [Start a 3-day Youmake trial for $1](https://www.youmake.dev/) (card required) and use the prompt in the next section.

## How to build a Claude Fable 5.2 app with Youmake

The model answers the hard question. Your users still need a place to ask it, see past answers and pay for it. Youmake is an [AI app builder](/articles/best-ai-app-builders) that makes web apps, mobile apps and slide decks from a description, with a live preview and an agent chat for changes. You can publish to your own domain, or [export the code and sync it to GitHub](https://www.youmake.dev/features/code-ownership) so a developer can take over later.

![The Youmake workspace with live preview and agent chat](/images/blog/youmake-workspace-live-preview-agent-chat.webp)

Paste this into Youmake for an app with model routing and cost control built in:

> Build a web app where a user uploads a contract and gets a risk review with flagged clauses, plain-English explanations and suggested edits. Include sign-up, a history page and a detail view for each review. Store users and reviews in Supabase. Put the AI call in a server-side function that reads the API key and two model names from environment variables: a default model and a premium model. Add a "Deep review" button that uses the premium model. Record the model, input tokens and output tokens for every request in a usage table, show each user their usage this month, and block new requests when a daily limit that I can edit is reached.

Then:

1. Paste the prompt into the composer and check the first preview.
2. Ask the agent chat to connect Supabase for sign-in and storage, and Stripe if you want to charge for deep reviews.
3. Add your Claude API key as an environment variable. Set the default model to `claude-opus-5-5` and the premium model to `claude-fable-5-2`.
4. Run 20 real documents through both buttons and compare the usage table with your own token math.
5. Run the security scan, then connect your domain.

If this is your first build, read [how to build an app without coding](/articles/how-to-build-app-without-coding) first. Agencies building this for clients can add a [client portal](https://www.youmake.dev/use-cases/client-portal) so each client sees their own reviews and usage.

## Related reading

The same budgeting method works on other vendors. Our guide to [Gemini 4 Argon API pricing](/articles/gemini-4-argon-api-pricing) covers Google's price step on December 1. For long agent tasks, see [vibe coding vs agentic coding](/articles/vibe-coding-vs-agentic-coding) and the [Agent Skills open standard](/articles/agent-skills-open-standard). More coverage sits in the [AI Agents & Tools hub](/topics/ai-agents-tools).

## Honest limits

- The benchmark figures are Anthropic's. I have not run my own comparison of Fable 5.2 and Opus 5.5.
- The monthly costs use assumed volumes. Yours depend on prompt length, thinking, caching and effort level.
- Youmake builds the app around the model. The AI call depends on your API key and the generated server function, so read that code and test it before you invite users.
- If your product does security testing or biology research, expect blocked requests on Fable 5.2 to be answered by an older model.
- Prices change. Check Anthropic's pricing page on the day you ship.

## FAQ

### How much does the Claude Fable 5.2 API cost?

$8 per million input tokens and $40 per million output tokens at the standard rate. The Batch API is $4 and $20, and fast mode is $16 and $80.

### Is Claude Fable 5.2 cheaper than Fable 5.1?

Yes. Fable 5.1 costs $10 and $50 per million tokens, so 5.2 is 20% cheaper on input and output. Cache reads dropped from $0.25 to $0.20 per million tokens.

### Should I use Claude Fable 5.2 or Opus 5.5 in my app?

Start with Opus 5.5, which costs half as much per token. Move a task to Fable 5.2 when Opus at a higher effort level still fails it on your own test set.

## Sources

- [Introducing Claude Fable 5.2 and Claude Mythos 5.2, Anthropic](https://www.anthropic.com/claude-fable-and-mythos-5-2)
- [Pricing, Claude Platform docs](https://platform.claude.com/docs/en/about-claude/pricing)
- [Models overview, Claude Platform docs](https://platform.claude.com/docs/en/about-claude/models/overview)
- [Claude Fable 5.2: Benchmarks, Pricing and Real Tests, Computing for Geeks](https://computingforgeeks.com/claude-fable-5-2-released-features-benchmarks/)

*Facts checked on November 16, 2026.*
---

## Read Next

- [Gemini 4 Argon API Pricing: What to Build Before Dec 1](/articles/gemini-4-argon-api-pricing)
- [Reflection Beam for Apps: Use the Open Model Now](/articles/reflection-beam-for-app-builders)
- [Agent Skills Open Standard: What Builders Should Do Now](/articles/agent-skills-open-standard)
