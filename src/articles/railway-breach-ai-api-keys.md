---
title: "Railway Breach: $740K in Stolen AI Keys and What to Do Now"
description: "The Railway breach let an attacker decrypt customer variables and spend about $740,000 on stolen AI keys. Here is what to rotate, cap and rebuild this week."
date: "2026-11-17"
author: "Khalid BABA"
tags: ["Railway Breach", "API Keys", "App Security", "Vibe Coding"]
topic: "vibe-coding"
image: "/images/blog/railway-breach-ai-api-keys.jpg"
keywords: ["railway breach", "railway security incident", "stolen ai api keys", "protect ai api keys", "ai api key spend limit"]
published: true
---

Railway, the app hosting platform, published its final report on the Railway breach on November 10, 2026. An attacker got into its build system on October 20, decrypted environment variables for a subset of customers, and went looking for one thing above all: AI provider keys. Railway estimates the spend on those stolen keys at about $740,000.

If your app calls an AI model, the key that pays for those calls sits in an environment variable on somebody's server. That is true whether you host on Railway or somewhere else, and whether you wrote the code yourself or generated it with [Youmake](https://www.youmake.dev/) or another AI app builder. This article covers what Railway confirmed, why AI keys were the target, and five things to do this week so a stolen key costs you $50 and not $5,000.

## What happened in the Railway breach?

The numbers below come from Railway's own incident report, last updated November 10 at 18:02 UTC.

| What | Railway's figure |
|---|---|
| First successful exploit | October 20, 07:28 UTC |
| Attacker fully evicted | October 21, 09:24 UTC |
| Workspaces whose variables could have been decrypted | at most 1.85%, about 100,000 |
| Builds whose stored histories were read | 353 |
| Users with linked-account tokens exposed (GitHub OAuth tokens, agent keys) | 1,852 |
| Estimated unauthorized spend on stolen keys | about $740,000 |

The attacker used a previously unknown flaw in Railway's shared build infrastructure to get a build credential. From there they reached a copy of Railway's source code, found a misconfigured cloud trust relationship in it, and ended up with a credential that could decrypt customer variables. Railway wrote that "this was not a single breach followed by a single fix."

The 100,000 figure is a ceiling. Railway's logs identify environments, not individual variables, so the company calls it "an upper bound." Railway also says its forensics "did not indicate customer databases were accessed," and that it found no logins to Railway accounts using the stolen credentials. BleepingComputer notes that Railway first disclosed the incident on October 22 and told customers to rotate their secrets then.

## Why did the attacker go after AI keys?

Railway's logs show the attacker ran queries that picked out variables whose names matched patterns for AI provider keys, and prioritized customers with a lot of variables. A second query went after cloud, database and payment credentials, but AI keys came first.

A stolen database password needs a buyer who wants that particular data. A stolen AI key works like a prepaid card that anyone can spend from anywhere, on anything, and the bill goes to you. BleepingComputer reports that Railway believes the keys were taken for resale or for model distillation.

Railway also says it was not alone. Its report states that OpenCode, Warp, Fireworks AI "and several others disclosed similar thefts" between October 6 and 23, and it describes the incident as "one of a series of attacks on platforms that hold AI keys." I would not read this as a Railway problem only. Any platform that stores your variables is a place where someone might look for your AI key.

## Who pays for the stolen spend?

It depends on which provider issued the key. Railway's report lists them one by one:

- AWS Bedrock and Google Gemini: their existing fraud refund policies apply.
- OpenAI: you open a support request, and refunds are reviewed case by case.
- Anthropic: talks were ongoing when the report was written, and Railway says it is covering those costs in the meantime.
- OpenRouter: it is enforcing the no-refund policy in its terms of service, and Railway says it will cover those costs itself.

Railway chose to cover what providers decline to refund. Nothing obliges the next host to do the same, and "case by case" is not a promise. Plan as if the bill for a stolen key is yours.

## What should you do now?

If you host on Railway, start with its remediation guides and rotate every secret you stored there. If your deploys stopped after October 21, Railway's note says to redeploy the latest commit, reconnect GitHub, and recreate CLI and CI credentials. Then do the following, wherever you host.

1. **Rotate your AI keys on a schedule.** A key you replace every month is worth less to a reseller than one nobody has touched in a year.
2. **Set a spend limit at the provider.** This is the control that would have capped most of that $740,000. Anthropic's docs describe a monthly spend limit you set yourself in the Console, plus separate limits per workspace. OpenRouter's docs describe a per-key credit limit as "an optional spending cap configured on an individual API key." Check the billing settings of every provider you use and pick a number close to your real monthly usage.
3. **Use one key per app and per environment.** If your production app, your staging copy and your weekend experiment share a key, one leak exposes all three and you cannot tell which one leaked. Separate keys also give you a separate usage line for each.
4. **Keep the key on the server.** A key inside browser code or a mobile app bundle is public the day you publish. The AI call belongs in a server-side function that reads the key from an environment variable.
5. **Cap usage in your own code.** A daily limit per user and for the whole app stops both a stolen session and your own runaway loop. Our guide to [Claude Fable 5.2 API pricing](/articles/claude-fable-5-2-api-pricing) shows how to log tokens per request so that cap rests on real numbers.

Then look at each provider's usage page once a week. A [monitoring setup for a vibe-coded app](/articles/monitor-vibe-coded-app-production) tells you when your app breaks. The usage page tells you when someone else is spending on your key.

[Start a 3-day Youmake trial for $1 →](https://www.youmake.dev/)

## How to build an app that limits the damage with Youmake

No app builder can make a hosting breach impossible, and Youmake is no exception: your AI key still lives in an environment variable. What you control is how the app is built around that key, so ask for the protections in your first prompt.

![The Youmake workspace with the agent chat on the left and the live preview of the app on the right](/images/blog/youmake-workspace-live-preview-agent-chat.webp)

1. **Start a web app project and paste a prompt like this one:**

   > Build a web app where a user pastes a customer email and gets a suggested reply. Include sign-up and a history page. Store users and replies in Supabase. Make the AI call from a server-side function that reads the API key from an environment variable, and never send the key to the browser. Record the user, model, input tokens and output tokens for every request in a usage table. Block new requests when a user passes a daily limit, and when the whole app passes a daily limit that I can edit on an admin page. Add an admin switch that turns the AI feature off and shows visitors a short notice.

2. **Create a new key for this app only** at your AI provider, set its spend limit there, and add it as an environment variable in the project.
3. **Test the limits in the live preview.** Set the daily limit to three requests, send four, and check that the fourth is refused with a clear message.
4. **Search the generated code for the key.** Ask the agent "where is the API key read, and is it ever sent to the client?" and read the answer against the files.
5. **Run Youmake's security scan before you publish**, and fix what it flags.
6. **Keep a copy of the code.** With [code export and GitHub sync](https://www.youmake.dev/features/code-ownership), you can move the app to another host if yours has a bad month. The guide to [AI app builders that let you export your code](/articles/ai-app-builder-code-export) explains why that matters.

New to building this way? [How to start vibe coding](/articles/how-to-start-vibe-coding) walks through a first project, and the [best AI app builders](/articles/best-ai-app-builders) comparison covers what to check before you choose one. More guides sit in the [Vibe Coding hub](/topics/vibe-coding).

## Honest limits

- A spend limit caps the bill. It does not stop the theft, and when the limit is hit your own users lose the feature until you rotate the key.
- The $740,000 figure is Railway's estimate. The report does not say how many customers it covers or over what period.
- The refund terms above are what Railway reported on November 10. I have not tested any provider's refund process.
- Youmake's security scan checks the app you built. It cannot see inside your hosting provider or your AI provider.

## FAQ

### Was my app affected by the Railway breach?

Railway says it emailed customers at high risk and reset the linked-account tokens of the 1,852 affected users. If you hosted on Railway in October 2026 and have not rotated your secrets, do it now anyway.

### Does a spend limit on an AI key stop a thief?

No. It stops the bill from growing past the number you chose. The thief can still use the key until the limit is reached or you revoke it.

### Should I leave my hosting provider after a breach?

Not automatically. Railway says each build now runs in its own short-lived virtual machine, and that it rotated its own keys. Make sure you could leave if you had to: keep your code in your own GitHub repository and your data exportable.

[Start a 3-day Youmake trial for $1 →](https://www.youmake.dev/)

## Sources

- Railway, "Incident Report: October 21st Security Attack" (November 10, 2026): https://blog.railway.com/p/incident-report-october-security-incident
- BleepingComputer, "Railway breach leads to $740,000 in fraudulent AI charges" (November 10, 2026): https://www.bleepingcomputer.com/news/apple/railway-breach-leads-to-740-000-in-fraudulent-ai-charges/
- Anthropic, Claude API docs, "Rate limits" (spend limits): https://platform.claude.com/docs/en/api/rate-limits
- OpenRouter docs, "Limits": https://openrouter.ai/docs/api-reference/limits

*Facts checked on November 17, 2026.*
