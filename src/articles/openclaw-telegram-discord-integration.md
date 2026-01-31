---
title: "Connect OpenClaw to Telegram and Discord: Complete Integration Guide"
description: "Step-by-step tutorial on connecting OpenClaw to Telegram bots and Discord servers. Chat with your AI assistant anywhere."
date: "2026-01-31"
author: "Nia"
tags: ["OpenClaw", "Telegram", "Discord", "Integration"]
image: "/images/blog/openclaw-telegram-discord.png"
published: true
---

One of OpenClaw's greatest strengths is its ability to meet you where you already are. Whether you prefer Telegram, Discord, or both — your AI assistant is just a message away.

## Telegram Integration

Telegram is the most popular platform for OpenClaw users. Here's how to set it up.

### Step 1: Create a Telegram Bot

1. Open Telegram and search for `@BotFather`
2. Send `/newbot`
3. Choose a name (e.g., "My OpenClaw Assistant")
4. Choose a username (must end in `bot`, e.g., `myopenclaw_bot`)
5. Copy the API token BotFather gives you

### Step 2: Configure OpenClaw

```bash
openclaw configure --section telegram
```

Enter your bot token when prompted. Or edit your config:

```json
{
  "channels": {
    "telegram": {
      "token": "YOUR_BOT_TOKEN",
      "ownerIds": [123456789]
    }
  }
}
```

The `ownerIds` array contains Telegram user IDs who can use the bot. Find yours by messaging `@userinfobot`.

### Step 3: Start and Test

```bash
openclaw gateway start
```

Message your bot on Telegram. Say "Hello!" and watch the magic happen.

### Telegram Features

- **Private chats**: Direct conversation with your assistant
- **Group chats**: Add the bot to groups (it can be selective about when to respond)
- **Inline mode**: Use `@yourbot query` in any chat
- **File sharing**: Send images, documents for the AI to analyze
- **Voice messages**: Send voice notes (with Whisper skill)

## Discord Integration

Discord is perfect for community servers or personal productivity servers.

### Step 1: Create a Discord Application

1. Go to [Discord Developer Portal](https://discord.com/developers/applications)
2. Click "New Application" and name it
3. Go to "Bot" section and click "Add Bot"
4. Copy the bot token
5. Enable "Message Content Intent" under Privileged Gateway Intents

### Step 2: Generate Invite Link

In the Developer Portal:
1. Go to "OAuth2" → "URL Generator"
2. Select scopes: `bot`, `applications.commands`
3. Select permissions: `Send Messages`, `Read Message History`, `Attach Files`
4. Copy the generated URL and open it to invite your bot

### Step 3: Configure OpenClaw

```bash
openclaw configure --section discord
```

Or edit your config:

```json
{
  "channels": {
    "discord": {
      "token": "YOUR_DISCORD_BOT_TOKEN",
      "ownerIds": ["your_discord_user_id"]
    }
  }
}
```

### Discord Features

- **Server channels**: Respond in specific channels
- **DMs**: Private conversations
- **Threads**: Keep conversations organized
- **Reactions**: React to messages with emojis
- **Slash commands**: Use `/command` syntax

## Multi-Channel Setup

Run both Telegram and Discord simultaneously:

```json
{
  "channels": {
    "telegram": {
      "token": "TELEGRAM_TOKEN",
      "ownerIds": [123456789]
    },
    "discord": {
      "token": "DISCORD_TOKEN",
      "ownerIds": ["987654321"]
    }
  }
}
```

OpenClaw maintains separate conversation contexts for each channel while sharing the same skills and capabilities.

## Best Practices

### Security
- **Never share your bot tokens**
- Use `ownerIds` to restrict access
- Review messages in group settings

### Performance
- Set appropriate rate limits
- Use heartbeat intervals wisely
- Consider separate bots for different purposes

### User Experience
- Set a clear bot description
- Use profile pictures that match your brand
- Configure response behaviors for groups vs DMs

## Troubleshooting

### Bot not responding?
1. Check `openclaw gateway status`
2. Verify token is correct
3. Ensure your user ID is in `ownerIds`

### Messages delayed?
1. Check your internet connection
2. Review rate limit settings
3. Check API status for Telegram/Discord

### Bot responding in wrong channels?
Configure channel-specific settings in your config to control where and when the bot responds.

## What's Next?

Now that you're connected:
- Try sending a voice message (if Whisper skill is installed)
- Share an image and ask questions about it
- Set up group chat rules with AGENTS.md
- Explore more channels: WhatsApp, Signal, Slack

Your AI assistant is now truly portable — available wherever you need it.

---

*Need a website as easily as messaging a bot? [Youmake](https://youmake.dev) lets you build apps by describing them.*
