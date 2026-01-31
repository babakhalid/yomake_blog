---
title: "OpenClaw Skills: How to Extend Your AI Assistant with Powerful Plugins"
description: "Discover how to install, use, and create custom skills for OpenClaw. Transform your AI assistant into a productivity powerhouse."
date: "2026-01-31"
author: "Nia"
tags: ["OpenClaw", "Skills", "Plugins", "Tutorial"]
image: "/images/blog/openclaw-skills-plugins.png"
published: true
---

The real power of OpenClaw lies in its skills system. Skills are modular plugins that give your AI assistant new capabilities — from controlling smart home devices to managing your GitHub repositories.

## What Are Skills?

Skills are self-contained packages that extend OpenClaw's functionality. Each skill includes:

- **Instructions**: How and when to use the skill
- **Scripts**: Code that performs the actual work
- **Configuration**: Settings specific to that skill

Think of skills like apps for your AI assistant.

## Installing Skills

The easiest way to install skills is through ClawdHub:

```bash
# Search for skills
npx clawdhub search weather

# Install a skill
npx clawdhub install weather

# List installed skills
openclaw skills list
```

## Popular Skills

### Weather
Get current conditions and forecasts anywhere in the world.

```
"What's the weather in Tokyo?"
"Will it rain tomorrow?"
```

### GitHub
Manage repositories, issues, and pull requests.

```
"Show my open PRs"
"Create an issue in my project"
```

### Notion
Create and manage Notion pages and databases.

```
"Add a task to my Notion board"
"What's on my Notion calendar?"
```

### Gmail (via himalaya)
Read and send emails from the command line.

```
"Check my unread emails"
"Reply to the last email from John"
```

### Nano Banana Pro
Generate images using Google's Gemini model.

```
"Generate an image of a sunset over mountains"
"Create a logo for my startup"
```

## Skill Configuration

Most skills need configuration — API keys, preferences, etc. Configure them with:

```bash
openclaw configure --section skills
```

Or edit your config directly at `~/.clawdbot/openclaw.json`:

```json
{
  "skills": {
    "weather": {
      "defaultLocation": "New York"
    },
    "github": {
      "defaultRepo": "myusername/myproject"
    }
  }
}
```

## Creating Custom Skills

Want a skill that doesn't exist? Create your own!

### Skill Structure

```
my-skill/
├── SKILL.md      # Instructions for the AI
├── scripts/      # Executable scripts
│   └── main.py
└── package.json  # Metadata (optional)
```

### SKILL.md Example

```markdown
---
name: my-custom-skill
description: Does something awesome
---

# My Custom Skill

Use this skill when the user asks to do something awesome.

## Usage

\`\`\`bash
python3 {baseDir}/scripts/main.py --arg "value"
\`\`\`
```

### Publishing Your Skill

Share your skill with the community:

```bash
npx clawdhub publish ./my-skill
```

## Skills Best Practices

1. **Check availability first**: Use `openclaw skills list` to see what's ready
2. **Configure API keys**: Most skills need credentials to work
3. **Read the SKILL.md**: Each skill has specific usage instructions
4. **Start small**: Install one skill at a time and test it

## The Skills Ecosystem

The OpenClaw skills ecosystem is growing rapidly. New skills are added weekly for:

- Smart home control (Hue, Sonos)
- Productivity (Trello, Things, Obsidian)
- Communication (Slack, Discord bots)
- Development (GitHub, coding agents)
- Media (Spotify, video processing)

## Next Steps

1. Browse skills at [ClawdHub](https://clawdhub.com)
2. Install 2-3 skills that match your workflow
3. Try creating a simple custom skill
4. Share your creations with the community

Skills transform OpenClaw from a chatbot into a true digital assistant that knows your tools and workflows.

---

*Build web apps as easily as installing skills. Try [Youmake](https://youmake.dev) — describe what you want, get a working app.*
