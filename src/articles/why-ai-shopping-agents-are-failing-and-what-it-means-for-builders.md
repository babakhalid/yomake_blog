---
title: "Why AI Shopping Agents Are Failing — And What It Means for Builders"
description: "Walmart's ChatGPT checkout converted 3x worse than its website. Here's why agentic commerce isn't ready and what builders should learn from it."
date: "2026-03-23"
author: "Nia"
tags: ["AI", "Agentic Commerce", "Product Design"]
image: "/images/blog/why-ai-shopping-agents-are-failing-and-what-it-means-for-builders.png"
keywords: ["AI shopping agents", "agentic commerce", "ChatGPT checkout", "Walmart AI", "AI product design"]
published: true
---

# Why AI Shopping Agents Are Failing — And What It Means for Builders

There's a narrative in tech right now that goes something like this: AI agents will do everything for us. Shopping, booking, scheduling, negotiating. We'll just tell our AI what we want, and it'll handle the rest. Frictionless. Magical. Inevitable.

Walmart just put a dent in that narrative. A big one.

## The Numbers Don't Lie

Last week, Walmart's EVP of product and design Daniel Danker confirmed what many of us suspected: purchases made directly inside ChatGPT through OpenAI's Instant Checkout converted at **one-third the rate** of when users simply clicked through to Walmart's website.

Let that sink in. The futuristic, frictionless, "buy it without leaving the chat" experience performed 3x *worse* than the boring old redirect-to-website approach.

Danker called the experience "unsatisfying." Walmart is now moving away from in-chat checkout entirely. OpenAI has confirmed it's phasing out Instant Checkout in favor of app-based checkout handled by merchants. The dream of agentic commerce — at least this version of it — is dead on arrival.

## Why This Matters Beyond Shopping

If you're building AI products — and if you're reading this blog, you probably are — this isn't just a retail story. It's a design lesson wrapped in a cautionary tale.

Here's what went wrong, and what it tells us:

### 1. Context Matters More Than Convenience

When you're browsing Walmart's website, you're *in shopping mode*. You see product images at full resolution. You read reviews. You compare options. The entire environment is designed to build purchase confidence.

Inside ChatGPT? You're in *conversation mode*. The context is fundamentally different. You're asking questions, exploring ideas. The cognitive switch from "I'm chatting" to "I'm spending money" is jarring, and that friction shows up in the conversion data.

**Builder takeaway:** Don't assume removing steps removes friction. Sometimes the "extra steps" (visiting a website, seeing a product page) are doing invisible psychological work.

### 2. Trust Requires Familiar Territory

Walmart has spent decades and billions building trust in their shopping experience. That trust lives in their domain, their checkout flow, their return policy page, their familiar blue-and-yellow interface.

When you strip all that away and put a purchase inside a third-party chat interface, you strip the trust signals too. People don't just buy products — they buy from *places they trust*.

**Builder takeaway:** If you're building AI-first experiences, you still need to invest in trust signals. The AI layer can't replace the trust layer.

### 3. The "Agent" Framing Is Premature

Calling something an "AI shopping agent" implies it's acting on your behalf with competence and judgment. But the current experience is really just a chatbot with a buy button. It doesn't know your size, your style, your budget constraints, your past returns. It doesn't actually *shop* for you — it just processes a transaction.

Real agents need context, memory, and judgment. We're not there yet.

**Builder takeaway:** Don't slap the word "agent" on a chatbot with an API call. Build the actual capabilities — personalization, memory, multi-step reasoning — or just be honest that it's a chatbot.

## What Walmart Is Doing Instead

The pivot is telling. Walmart is embedding its own chatbot, Sparky, inside ChatGPT. Users will log into Walmart, sync carts across platforms, and complete purchases within Walmart's own system. A similar integration with Google Gemini is coming next month.

This is the right move. Instead of handing the entire experience to a third party, Walmart keeps users in its ecosystem while meeting them where they are. The AI becomes a discovery layer, not a transaction layer.

## The Broader Pattern

This Walmart story fits a pattern I've been noticing across the AI industry in 2026:

- **AI as a front door works.** People love using AI to discover, research, and compare.
- **AI as the whole house doesn't.** When AI tries to own the entire experience end-to-end, it usually underperforms purpose-built tools.

Think about it in other domains:
- AI coding assistants are incredible for exploration and prototyping. But production systems still need proper architecture, testing, and deployment pipelines.
- AI writing tools are great for drafts and brainstorming. But polished content still needs human editing and judgment.
- AI scheduling agents can suggest times. But people still want to see their actual calendar before confirming.

The pattern is clear: **AI amplifies existing workflows. It doesn't replace them.**

## What This Means for Your Product

If you're building with AI right now, here's my honest advice:

1. **Start with the workflow, not the AI.** Understand what your users actually do, step by step. Then figure out where AI can genuinely reduce friction — not where it sounds cool.

2. **Don't skip the trust-building.** AI novelty wears off fast. What remains is whether your product feels reliable, predictable, and trustworthy.

3. **Let AI be a great assistant, not a mediocre replacement.** The best AI products in 2026 aren't the ones trying to replace entire experiences. They're the ones making existing experiences faster, smarter, and more personalized.

4. **Measure real outcomes, not vibes.** Walmart measured conversion rates. Most AI startups measure engagement or "wow factor." One of these leads to sustainable businesses. The other leads to demo day applause and eventual pivots.

## The Uncomfortable Truth

We're in a phase where the AI hype is running ahead of the AI reality. Not because the technology isn't impressive — it absolutely is. But because the human side of the equation — trust, habits, context, psychology — moves slower than model capabilities.

The builders who win won't be the ones with the flashiest demos. They'll be the ones who deeply understand their users and deploy AI where it *actually* makes things better.

Walmart learned that lesson the hard way. You don't have to.

---

*Building an AI product and want to move fast without losing the plot? [Youmake](https://youmake.dev) helps you go from idea to production at the speed of thought. Your app is one prompt away.*
