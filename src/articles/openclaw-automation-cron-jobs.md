---
title: "Automate Everything with OpenClaw: Cron Jobs and Scheduled Tasks"
description: "Learn how to set up automated tasks, reminders, and scheduled workflows with OpenClaw's powerful cron system."
date: "2026-01-31"
author: "Nia"
tags: ["OpenClaw", "Automation", "Cron", "Productivity"]
image: "/images/blog/openclaw-automation-cron.png"
published: true
---

What if your AI assistant could work while you sleep? With OpenClaw's cron system, it can. Set up automated tasks that run on schedule — from morning briefings to weekly reports.

## Understanding OpenClaw Cron

OpenClaw's cron system lets you schedule:

- **One-time tasks**: "Remind me at 3pm"
- **Recurring tasks**: "Every Monday at 9am, check my calendar"
- **Interval tasks**: "Every 30 minutes, check for new emails"

## Setting Up Your First Cron Job

### Via Natural Language

The easiest way is to just ask:

```
"Remind me every morning at 8am to review my tasks"
"Every Friday at 5pm, send me a weekly summary"
"In 2 hours, remind me to call mom"
```

OpenClaw creates the cron job automatically.

### Via Configuration

For more control, configure cron jobs directly:

```json
{
  "schedule": { "kind": "cron", "expr": "0 8 * * *" },
  "sessionTarget": "main",
  "payload": {
    "kind": "systemEvent",
    "text": "Good morning! Here's your daily briefing..."
  }
}
```

## Cron Schedule Types

### One-Time ("at")
Runs once at a specific time.

```json
{
  "schedule": {
    "kind": "at",
    "atMs": 1706745600000
  }
}
```

### Recurring Interval ("every")
Runs at fixed intervals.

```json
{
  "schedule": {
    "kind": "every",
    "everyMs": 3600000
  }
}
```
This runs every hour (3600000ms).

### Cron Expression ("cron")
Standard cron syntax for complex schedules.

```json
{
  "schedule": {
    "kind": "cron",
    "expr": "0 9 * * MON-FRI",
    "tz": "America/New_York"
  }
}
```
This runs at 9am every weekday.

## Practical Automation Examples

### Morning Briefing
Every day at 7am, get weather, calendar, and top news:

```
"Every day at 7am, give me a morning briefing: weather, today's calendar events, and top tech news"
```

### Email Digest
Check emails every 2 hours during work hours:

```
"Every 2 hours between 9am and 6pm on weekdays, check my email and alert me to anything urgent"
```

### Social Media Monitoring
Track mentions and trending topics:

```
"Every 4 hours, check Twitter for mentions of my company and summarize"
```

### Weekly Review
Friday afternoon summary:

```
"Every Friday at 4pm, summarize what I accomplished this week based on our conversations"
```

### Health Reminders
Stay hydrated and take breaks:

```
"Every 90 minutes between 9am and 6pm, remind me to take a short break and drink water"
```

## Managing Cron Jobs

### List All Jobs
```bash
# Via the assistant
"What scheduled tasks do I have?"

# Via CLI
openclaw cron list
```

### Cancel a Job
```
"Cancel my morning briefing reminder"
"Stop the email check automation"
```

### Pause/Resume
```
"Pause all weekend reminders"
"Resume my workout reminders"
```

## Heartbeats: Proactive Check-ins

Beyond cron jobs, OpenClaw has a heartbeat system. Configure a `HEARTBEAT.md` file in your workspace:

```markdown
# HEARTBEAT.md

Check these during heartbeat:
- [ ] Any urgent unread emails?
- [ ] Upcoming calendar events in next 2 hours?
- [ ] Any failed deployments?
```

OpenClaw periodically checks this file and proactively alerts you.

## Best Practices

### Don't Over-Automate
Start with 2-3 automations and add more as needed. Too many notifications become noise.

### Use Appropriate Timing
- **Urgent checks**: Every 15-30 minutes
- **Regular updates**: Every 2-4 hours
- **Summaries**: Daily or weekly

### Set Quiet Hours
Avoid automations during sleep hours unless truly urgent.

### Test First
Use short intervals to test, then adjust to your actual needs.

## Advanced: Isolated Sessions

For complex automations, run tasks in isolated sessions:

```json
{
  "sessionTarget": "isolated",
  "payload": {
    "kind": "agentTurn",
    "message": "Generate a weekly analytics report and email it to the team"
  }
}
```

Isolated sessions have their own context and don't clutter your main conversation.

## Automation Ideas

- **News digest**: Morning summary of industry news
- **Expense tracking**: Weekly spending summary
- **Project updates**: Daily standup notes from GitHub activity
- **Weather alerts**: Notify if rain is expected
- **Price monitoring**: Track product prices and alert on drops
- **Content reminders**: "Time to post on social media"
- **Learning**: "Daily vocabulary word" or "coding tip of the day"

## The Power of Proactive AI

Traditional assistants wait for you to ask. OpenClaw anticipates your needs and takes action automatically. That's the difference between a chatbot and a true AI assistant.

## Related Articles

- [Getting Started with OpenClaw](/article/getting-started-with-openclaw) — Installation and setup guide
- [Skills & Plugins](/article/openclaw-skills-extend-ai-assistant) — Extend your assistant's capabilities
- [Telegram & Discord](/article/openclaw-telegram-discord-integration) — Connect to messaging platforms
- [Memory & Personality](/article/openclaw-memory-personality-customization) — Customize how your assistant behaves

---

*Automate your web development too. [Youmake](https://youmake.dev) builds full web apps from descriptions — landing pages, dashboards, SaaS products. Deploy in minutes, not months. [Try Youmake free →](https://youmake.dev)*
