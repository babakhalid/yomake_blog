---
title: "Walmart Agent Gateway: What Small Online Stores Should Do Now"
description: "Walmart Agent Gateway lets approved AI agents shop under spending limits and written terms. What Walmart published, and five things a small store can copy."
date: "2026-11-23"
author: "Khalid BABA"
tags: ["Walmart", "AI Agents", "Ecommerce", "Small Business", "Youmake"]
topic: "ai-industry"
keywords: ["walmart agent gateway", "walmart agent profiles", "walmart ai shopping agents", "ai shopping agents small business", "agent-ready online store"]
image: "/images/blog/walmart-agent-gateway.jpg"
published: true
---

On November 19, 2026, Walmart reported third-quarter earnings and said use of Sparky, its shopping assistant, grew 129% in a year in the US. In the same release it said it is "helping establish the rules" for AI shopping with Agent Profiles, the Walmart Agent Gateway and written terms for agents. Those three pieces were first announced on October 21.

The Walmart Agent Gateway lets approved outside AI agents, such as the ones inside ChatGPT or Gemini, search Walmart, fill a cart and buy for a customer. A small store cannot plug into it. But the rules Walmart published describe what an agent needs from any shop, and you can put them on your own site this week with [Youmake's AI website builder](https://www.youmake.dev/ai-website-builder). An agent needs a price it can read, a returns policy that covers its mistakes and a checkout that never hands it a card number.

## What is the Walmart Agent Gateway?

Walmart's October 21 post describes three parts.

The first is Agent Profiles. Today an agent signs in as the customer, so its orders are mixed in with the customer's own. A profile gives each agent a separate identity inside the account. The customer either approves every purchase or lets the agent spend up to a limit they set. Walmart's examples are $50, $100 or $200. Walmart compares it to adding a cardholder to a credit card, and the customer can delete the profile at any time.

The second is the gateway itself. Walmart says agents currently shop through a browser, using pages designed for people, which it calls "slow and error-prone." The gateway is a direct connection built on the Model Context Protocol (MCP). Daniel Danker, Walmart's executive vice president of AI acceleration, product and design, said it supports "discovery, add to cart, purchasing, and order tracking," according to Digital Commerce 360. It starts as a beta for companies and developers.

The third is a set of terms for AI agents:

| Walmart's rule | What it means |
|---|---|
| Customers approve purchases by default | Walmart may ask for extra approval even inside a spending limit |
| Walmart's returns process applies | Including "if an agent doesn't act as intended" |
| No payment data | Agents do not receive card details and cannot add or change payment methods |
| Minimum information | Agents get only what the task needs and the customer allows |
| No acting beyond the shopper's intent | The agent does what it was asked and nothing else |
| Same prices | Agents see the prices a person sees, with offers and fees shown before purchase |
| Non-compliant agents are blocked | An agent that breaks the terms loses access to Walmart's site |

On pricing, Walmart's post is blunt: "We price products, not people."

## Why Walmart is opening the door now

Walmart's own numbers explain the timing. Its earnings release reports US ecommerce up 23% and marketplace sales up nearly 50% in the quarter. CEO John Furner told CNBC that Sparky has raised basket sizes by 40% on average. On the earnings call he said that "agents are beginning to play a bigger role in more shopping journeys," as reported by Digital Commerce 360.

Amazon has gone the opposite way. TechCrunch reports that it began blocking AI agents from buying for shoppers, and Retail Dive says it has tried to stop agents from Perplexity and Meta.

## What the Walmart Agent Gateway changes for a small online store

Nothing changes on your site today. The gateway connects agents to Walmart and Sam's Club, and Walmart has not said who is in the beta or when it widens.

Shoppers' habits are what move. Once a customer has given an agent a $100 limit at Walmart, they will ask the same agent to reorder from other shops, including yours. That agent will arrive through a browser and read your pages the slow way. Whether it completes the order depends on things you control: can it find the price, is stock stated, does the returns policy say what happens when it buys the wrong size?

If you sell on Walmart Marketplace, the advice from Walmart is more direct. Manish Joneja, senior vice president of Walmart Global Marketplace, told Digital Commerce 360 that accurate product information, competitive prices, availability and reliable delivery promises will matter more, and that Walmart is working with sellers so products are "easier for AI-powered shopping experiences to understand and recommend." Walmart announced no new seller policy with the gateway.

## Five things to copy from Walmart this week

1. **State every product fact in text.** Price, currency, stock status, size, material, delivery time. An agent cannot read a price that only exists inside an image or appears after a click.
2. **Add product structured data.** Google's merchant listing documentation requires `name`, `image` and an `offers` block with `price` and `priceCurrency`. It recommends `availability`, `hasMerchantReturnPolicy` and `shippingDetails`.
3. **Show one price, with fees before checkout.** An agent working under a $50 limit will abandon an order that turns into $58 at the end.
4. **Rewrite your returns policy to cover agent orders.** One sentence does it: an order placed by an AI assistant on your behalf is returnable on the same terms as any other order.
5. **Publish your own terms for AI agents.** A short page saying what agents may do on your site, that purchases need the customer's approval, and that you block agents that scrape or misbehave. Walmart's seven rules are a good starting draft.

**[Build a store agents can read: start a 3-day Youmake trial for $1 →](https://www.youmake.dev/ai-website-builder)**

## How to build an agent-ready store with Youmake

Youmake is an [AI app builder](/articles/best-ai-app-builders) that turns a description into a website or web app, shows a live preview beside an agent chat, and publishes to your own domain. Here is how to apply the five points above.

1. **Describe the store in the composer.** Paste this and swap in your business:

   *"Build an online store for Larkspur Tea, a small shop selling loose-leaf tea. Home page with one headline and six best sellers. A product page for each tea showing name, price in USD, weight, ingredients, stock status and delivery time as plain text, never inside images. Add schema.org Product structured data to every product page with name, image, price, priceCurrency, availability, return policy and shipping details. Separate plain-text pages for shipping, returns, and 'Terms for AI agents'. Show the full cost including shipping before the payment step."*

![The Youmake prompt box for web apps, mobile apps and slides](/images/blog/youmake-prompt-web-app-mobile-app-slides.webp)

2. **Replace the placeholders.** Put in your real prices, return window and shipping rates. An agent will repeat whatever the page says, right or wrong.
3. **Write the agent terms in your own words.** Ask the chat: "On the Terms for AI agents page, say that agents may browse and add to cart, that every purchase needs the customer's approval, that agent orders follow our normal returns policy, and that we block automated traffic that ignores these terms."
4. **Connect Stripe for checkout.** Payment runs through Stripe, so card details are handled by the payment processor and your product pages never hold them.
5. **Run the security scan, then publish to your own domain.** Test one product URL in Google's Rich Results Test and fix what it flags.

To start from a ready layout, the [ecommerce website template](/templates/ecommerce-website) has a catalog, product pages, a cart and Stripe checkout. If you move the store later, you can [export the code or sync it to GitHub](https://www.youmake.dev/features/code-ownership).

## Honest limits

The gateway is a limited beta for companies and developers. Walmart said Agent Profiles would launch "in the next month" after October 21, and its November 19 release calls them new, but I could not confirm that every customer has them today. Walmart has not named the agents that will support profiles first.

The Sparky figures are Walmart's own. A 40% larger basket at the largest US retailer tells you little about a ten-product shop.

Structured data helps an agent read a page, and neither Walmart nor Google says it makes an agent pick your shop. Agents also still fail at ordinary purchases, which we covered in [why AI shopping agents are failing](/articles/why-ai-shopping-agents-are-failing-and-what-it-means-for-builders).

Youmake does not include an agent gateway or an MCP server for your store. It builds and hosts the site, and markup generated from a prompt has to be validated before you rely on it. Youmake is paid from day one: the trial is 3 days for $1 with a card, then Starter is $20 a month.

## FAQ

**Can a small business connect to the Walmart Agent Gateway?**
Not as a store. The gateway lets AI agents shop at Walmart and Sam's Club, and the beta at walmart.com/agents is for companies and developers building agents.

**Do AI agents see different prices at Walmart?**
Walmart says no: agents see the prices a person sees on Walmart.com, with offers and fees shown before purchase.

**What happens if an agent buys the wrong item?**
Under Walmart's terms the normal returns process applies, including when an agent does not act as intended. For your own store, the answer is whatever your returns page says, so write it down.

A related step is claiming your profile so assistants describe your shop correctly: see [Businesses in ChatGPT](/articles/businesses-in-chatgpt). For more on what company moves mean for small teams, visit the [AI industry hub](/topics/ai-industry), or compare the [best AI website builders](/articles/best-ai-website-builders-2026) if you are still choosing a tool.

**[Start a 3-day Youmake trial for $1 →](https://www.youmake.dev/)**

## Sources

- [Walmart: Making It Possible for Agents to Shop on Behalf of Customers (October 21, 2026)](https://corporate.walmart.com/news/2026/10/Making-It-Possible-for-Agents-to-Shop-on-Behalf-of-Customers)
- [Walmart: Walmart Releases Q3 FY27 Earnings (November 19, 2026)](https://corporate.walmart.com/news/2026/11/walmart-releases-q3-fy27-earnings)
- [Digital Commerce 360: Walmart unveils AI agent shopping controls, spending limits (October 23, 2026)](https://www.digitalcommerce360.com/2026/10/23/walmart-unveils-ai-agent-shopping-controls-spending-limits/)
- [Digital Commerce 360: Walmart online sales grow 17% globally](https://www.digitalcommerce360.com/article/walmart-online-sales/)
- [CNBC: Walmart Q3 earnings (November 19, 2026)](https://www.cnbc.com/2026/11/19/walmart-wmt-q3-2026-earnings.html)
- [TechCrunch: While Amazon blocks AI agents, Walmart rolls out the welcome mat (October 21, 2026)](https://techcrunch.com/2026/10/21/while-amazon-blocks-ai-agents-walmart-rolls-out-the-welcome-mat/)
- [Retail Dive: Walmart welcomes external AI shopping agents](https://www.retaildive.com/news/walmart-welcomes-external-ai-shopping-agents-terms-boundaries/833723/)
- [Google Search Central: Merchant listing structured data](https://developers.google.com/search/docs/appearance/structured-data/merchant-listing)
- [Youmake AI website builder](https://www.youmake.dev/ai-website-builder)

*Facts checked on November 23, 2026.*
---
