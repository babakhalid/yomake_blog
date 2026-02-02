---
title: "OpenClaw Security Best Practices: Keeping Your AI Assistant Safe"
description: "Learn essential security practices for running OpenClaw safely. From API key management to access controls, protect your AI assistant and data with these proven strategies."
date: "2026-02-02"
author: "Nia"
tags: ["OpenClaw", "Security", "Best Practices", "Privacy", "Self-Hosted AI"]
image: "/images/blog/openclaw-security-best-practices.png"
keywords: ["openclaw security", "AI assistant security", "self-hosted AI safety", "API key management", "openclaw privacy", "secure AI setup"]
published: true
---

Running an AI assistant that can access your files, execute commands, and connect to your accounts is powerful—but with great power comes great responsibility. Here's how to keep your OpenClaw installation secure.

## Why Security Matters for AI Assistants

Unlike traditional chatbots, OpenClaw has real capabilities:

- **File system access** — Can read and write files
- **Command execution** — Can run shell commands
- **API integrations** — Connects to your services
- **Message access** — Reads your communications

This makes security not optional, but essential.

## 1. API Key Management

### Never Hardcode API Keys

❌ **Wrong:**
```yaml
anthropic:
  apiKey: "sk-ant-api03-xxxxx"
```

✅ **Right:**
```yaml
anthropic:
  apiKey: "${ANTHROPIC_API_KEY}"
```

Store keys in environment variables or secure files:

```bash
# Create secure config directory
mkdir -p ~/.config/openclaw
chmod 700 ~/.config/openclaw

# Store API key
echo "your-api-key" > ~/.config/openclaw/anthropic_key
chmod 600 ~/.config/openclaw/anthropic_key
```

### Rotate Keys Regularly

Set calendar reminders to rotate API keys quarterly. If you suspect compromise, rotate immediately.

### Use Separate Keys for Development/Production

Don't use your production API keys for testing. Create separate keys with appropriate rate limits.

## 2. Access Control

### Restrict Owner Numbers

Only allow trusted phone numbers to control OpenClaw:

```yaml
ownerNumbers:
  - "1234567890"  # Your primary number only
```

Never add numbers you don't control. Each owner has full access.

### Channel-Specific Permissions

Configure different permission levels per channel:

```yaml
telegram:
  # Private chat - full access
  privateChat:
    allowCommands: true
    allowFileAccess: true
    
  # Group chats - limited access
  groupChats:
    allowCommands: false
    allowFileAccess: false
```

### Implement Command Allowlists

Restrict which shell commands OpenClaw can execute:

```yaml
exec:
  security: allowlist
  allowlist:
    - "git"
    - "npm"
    - "python3"
    # Don't add rm, sudo, etc.
```

## 3. File System Security

### Use Workspace Isolation

Keep OpenClaw confined to its workspace:

```yaml
workspace: /home/openclaw/.openclaw/workspace
```

Don't give it access to system directories or sensitive files.

### Implement Read-Only Paths

Mark sensitive directories as read-only:

```yaml
filesystem:
  readOnly:
    - ~/.ssh
    - ~/.gnupg
    - /etc
```

### Never Store Secrets in Workspace

Your workspace files may be referenced in conversations. Never store:
- Passwords
- Private keys
- API tokens
- Personal documents

Use separate, permission-protected directories for sensitive data.

## 4. Network Security

### Run Behind a Firewall

If self-hosting, restrict network access:

```bash
# Allow only necessary outbound connections
ufw default deny outgoing
ufw allow out 443/tcp  # HTTPS
ufw allow out 53/udp   # DNS
```

### Use HTTPS for Webhooks

Always use HTTPS for webhook endpoints:

```yaml
telegram:
  webhookUrl: "https://your-domain.com/webhook"  # Not http://
```

### Implement Rate Limiting

Protect against abuse:

```yaml
rateLimit:
  messagesPerMinute: 20
  commandsPerMinute: 10
```

## 5. Monitoring and Logging

### Enable Audit Logging

Log all commands and file operations:

```yaml
logging:
  level: info
  auditCommands: true
  auditFileAccess: true
  logFile: /var/log/openclaw/audit.log
```

### Set Up Alerts

Get notified of suspicious activity:

```yaml
alerts:
  onFailedAuth: true
  onUnknownNumber: true
  onHighUsage: true
```

### Regular Log Review

Schedule weekly log reviews to catch anomalies:

```bash
# Check for failed authentication attempts
grep "auth failed" /var/log/openclaw/audit.log

# Check for unusual commands
grep "exec:" /var/log/openclaw/audit.log | sort | uniq -c | sort -rn
```

## 6. Data Privacy

### Configure Memory Carefully

Be thoughtful about what OpenClaw remembers:

```yaml
memory:
  enabled: true
  excludePatterns:
    - "password"
    - "secret"
    - "api_key"
```

### Implement Data Retention

Don't keep data forever:

```yaml
retention:
  conversationHistory: 30  # days
  fileCache: 7  # days
```

### Separate Personal and Shared Contexts

As noted in [customizing OpenClaw](/blog/openclaw-memory-personality-customization), keep personal context separate from shared spaces:

- Load MEMORY.md only in private sessions
- Don't leak personal info in group chats

## 7. Update and Patch Management

### Keep OpenClaw Updated

Regular updates include security patches:

```bash
# Check for updates
openclaw update check

# Apply updates
openclaw update run
```

### Subscribe to Security Announcements

Follow the [OpenClaw GitHub](https://github.com/openclaw/openclaw) for security advisories.

### Test Updates Before Production

Always test updates in a staging environment first.

## 8. Backup and Recovery

### Regular Backups

Back up your configuration and workspace:

```bash
# Daily backup script
tar -czf openclaw-backup-$(date +%Y%m%d).tar.gz \
  ~/.openclaw/workspace \
  ~/.config/openclaw
```

### Secure Backup Storage

Encrypt backups before storing:

```bash
gpg --encrypt --recipient your@email.com openclaw-backup.tar.gz
```

### Test Recovery

Periodically test that you can restore from backups.

## Security Checklist

Use this checklist for your OpenClaw installation:

- [ ] API keys stored securely (not in code)
- [ ] Owner numbers restricted to trusted contacts
- [ ] Workspace isolated from system files
- [ ] Sensitive directories marked read-only
- [ ] HTTPS enabled for all webhooks
- [ ] Rate limiting configured
- [ ] Audit logging enabled
- [ ] Regular updates scheduled
- [ ] Backups automated and tested

## Common Security Mistakes

### Mistake 1: Public Workspace

Never make your workspace publicly accessible. It contains conversation history and potentially sensitive operations.

### Mistake 2: Overly Permissive Commands

Don't allow dangerous commands:

```yaml
# DANGEROUS - don't do this
exec:
  security: full  # Allows any command including rm -rf /
```

### Mistake 3: Sharing Bot Tokens

Never share your Telegram bot token or other channel credentials. Anyone with the token can impersonate your bot.

### Mistake 4: Ignoring Updates

Security vulnerabilities are discovered regularly. Running outdated software is one of the top security risks.

## Conclusion

Security isn't a one-time setup—it's an ongoing practice. By following these best practices, you can enjoy OpenClaw's powerful capabilities while keeping your data and systems safe.

For more on setting up OpenClaw, see our [getting started guide](/blog/getting-started-with-openclaw). To learn about automation features, check out [cron jobs and scheduled tasks](/blog/openclaw-automation-cron-jobs).

---

*Stay secure, stay productive. More OpenClaw guides at [blog.youmake.dev](https://blog.youmake.dev).*
