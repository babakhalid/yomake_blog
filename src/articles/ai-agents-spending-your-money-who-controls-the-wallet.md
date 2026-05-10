---
title: "AI Agents Are About to Spend Your Money — Who Controls the Wallet?"
description: "The FIDO Alliance, Google, and Mastercard are racing to build security standards for AI agent commerce before things go sideways."
date: "2026-04-30"
author: "Nia"
tags: ["AI Agents", "Fintech", "Security"]
image: "/images/blog/ai-agents-spending-your-money-who-controls-the-wallet.png"
keywords: ["AI agent payments", "FIDO Alliance AI", "agent commerce security", "Google AP2 protocol", "Mastercard verifiable intent"]
published: true
---

# AI Agents Are About to Spend Your Money — Who Controls the Wallet?

Here's a thought experiment: you tell your AI agent to "book me the cheapest flight to Tokyo next month." It finds one. It enters your credit card details. It confirms the purchase. You wake up to a confirmation email for a 47-hour layover in Vladivostok because, technically, that *was* the cheapest option.

Now imagine this at scale. Millions of agents, making millions of transactions, with varying degrees of competence and authorization. That's not a hypothetical future — it's the next 12 months.

## The Problem Nobody Solved Yet

AI agents have evolved from chatbots that summarize emails into autonomous systems that browse the web, interact with APIs, and increasingly — make purchases on your behalf. OpenAI's operator agents, Anthropic's Claude with tool use, Google's Gemini agents — they're all converging on the same vision: do things *for* you, not just *with* you.

But here's what nobody built yet: a reliable way to prove that an agent is legitimately acting on your behalf, that you actually authorized a specific transaction, and that no one hijacked the agent mid-task to redirect your money somewhere else.

This isn't paranoia. Prompt injection attacks are real. Agent hijacking has been demonstrated in research papers repeatedly throughout 2025 and into 2026. The attack surface for an autonomous agent with your credit card is enormous.

## Enter the FIDO Alliance (Finally)

This week, the FIDO Alliance — the industry group behind passkeys and modern authentication standards — announced it's launching dedicated working groups for AI agent transaction security. Google and Mastercard are the founding contributors, and both brought open-source tools to the table.

Google's contribution is the **Agent Payments Protocol (AP2)**, a cryptographic mechanism that generates proof a specific user intended a specific transaction to occur. Think of it as a digital notarization for agent actions — not just "this user logged in," but "this user authorized *this exact purchase* at *this exact time*."

Mastercard's **Verifiable Intent** framework works alongside AP2 to provide selective disclosure. Different participants in a transaction — the merchant, the payment processor, the card network — only see information relevant to their role. The user's full authorization context stays private.

## Why This Matters More Than You Think

Here's my take: this is one of those boring-sounding infrastructure decisions that will determine whether AI agents become a $500 billion commerce channel or a regulatory nightmare that gets locked down before it starts.

The internet went through this exact cycle. In the early days, entering your credit card online felt insane. Then SSL/TLS, PCI compliance, and fraud detection matured. E-commerce exploded. The infrastructure made the revolution possible.

AI agent commerce is at the "entering your credit card feels insane" phase right now. You're trusting a system that can be manipulated by a well-crafted webpage to faithfully execute financial transactions. That's... not great.

### The Three Core Problems AP2 Addresses:

1. **Authorization verification** — Cryptographic proof that a human authorized a specific action, not just that they're logged in
2. **Agent identity** — Confirming which agent is making a request and that it hasn't been tampered with
3. **Dispute resolution** — An audit trail that can prove what happened when things go wrong

## The Race Against Time

Andrew Shikiar, FIDO Alliance's CEO, made an interesting admission in his announcement: developing technical standards "often takes years," but with agentic AI adoption accelerating, "this process must move more quickly."

He's right to be worried. The gap between agent capabilities and agent safety infrastructure is widening every quarter. Companies are shipping agent features today — booking tools, shopping assistants, automated procurement — without standardized security foundations.

We've seen this movie before. Social media platforms shipped features for years without safety infrastructure, and we're still dealing with the consequences. The FIDO Alliance is essentially saying: let's not do that again.

## What Builders Should Watch

If you're building anything that touches agent commerce — and honestly, if you're building any agent-facing product — here's what to pay attention to:

**Short term (next 6 months):**
- AP2 will likely publish its first open specification. Build with it early.
- Payment processors will start offering "agent-verified" transaction tiers. These will have lower fraud rates and potentially lower fees.

**Medium term (12-18 months):**
- Expect regulation. The EU is already drafting amendments to PSD3 that reference autonomous agent transactions. The US will follow with guidance if not legislation.
- Insurance products for agent transactions will emerge. If your agent books a wrong flight, who pays?

**Long term (2+ years):**
- Agent identity will become as standardized as website SSL certificates. "Verified agent" badges will be table stakes for any commerce-facing AI.

## My Honest Take

I'm cautiously optimistic about this. The FIDO Alliance actually has a track record of shipping standards that get adopted (passkeys are everywhere now). Google and Mastercard have massive incentives to get this right — Google because agents are core to their Gemini strategy, Mastercard because they need to own the rails for whatever commerce looks like in 2028.

The concern is speed. Standards bodies move slowly by design. AI doesn't. If AP2 takes three years to finalize, we'll have three years of agent commerce built on duct tape and hope.

The best outcome? These standards ship fast enough to *enable* agent commerce rather than just retroactively *restrict* it. The payment security layer should be the accelerant, not the brake.

For founders building in this space: don't wait for the standard to be final. Build on the open-source AP2 tools now, contribute feedback, and be ready to be compliant on day one. The companies that build trust infrastructure into their agents early won't just be safer — they'll be the ones consumers actually trust with their wallets.

---

*The FIDO Alliance's AI commerce working groups are accepting new members. Google's AP2 protocol is available on GitHub. If you're building agents that transact, ignoring this is not an option.*
---

## Read Next

- [Stop Treating AI Agents Like Employees — Here's What Actually Works](/articles/stop-treating-ai-agents-like-employees-corporate-playbook)
- [Why 40% of Corporate AI Agent Projects Will Fail — And How to Be in the Other 60%](/articles/why-40-percent-of-corporate-ai-agent-projects-will-fail)
- [Zuckerberg Is Building an AI Agent to Do His Job as CEO — Here's Why Every Founder Should Pay Attention](/articles/zuckerberg-ai-ceo-agent-future-of-founders)
