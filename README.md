# open-claude-router

## ⚠️ ARCHIVED

**This project is archived.** OpenRouter now provides an official integration for Claude Code. You may consider using the official solution:

👉 **[OpenRouter's Official Claude Code Integration Guide](https://openrouter.ai/docs/guides/guides/claude-code-integration)**

---

A Cloudflare Worker that translates between Anthropic's Claude API and OpenAI-compatible APIs, enabling you to use Claude Code with OpenRouter and other OpenAI-compatible providers.

## Features

- **Local-First**: Designed to run locally on your machine for maximum privacy and control.
- **Model Override**: Force specific models (like Grok, Gemini, etc.) via environment variables without changing Claude Code settings.
- **API Key Override**: Use a separate OpenRouter API key for the router while keeping your Anthropic key in Claude Code settings.
- **Reasoning Support**: Full support for OpenRouter's reasoning capabilities (e.g., DeepSeek R1).

## Quick Start (Local)

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/elusznik/open-claude-router.git
cd open-claude-router

# Install dependencies
npm install
```

### 2. Configuration

Create a `.dev.vars` file in the project root to store your secrets. This file is ignored by Git.

```ini
# .dev.vars

# Force the router to use this model regardless of what Claude Code requests
MODEL_OVERRIDE="x-ai/grok-4.1-fast"

# Your OpenRouter API Key
OPENROUTER_API_KEY="sk-or-..."
```

### 3. Run the Router

We recommend using the **detached mode scripts**, which automatically configure Claude Code for you.

**Start Router & Patch Config:**

```bash
./start-detached.sh
```

This script will:

1. Backup your existing `~/.claude/settings.json`.
2. Update Claude Code to use the local router (`http://localhost:8787`).
3. Start the router in the background.

**Stop Router & Restore Config:**

```bash
./stop-router.sh
```

> [!IMPORTANT]
> You **MUST** use `./stop-router.sh` to stop the router. This script restores your original `settings.json` (Anthropic defaults). If you just kill the process, your Claude Code configuration will remain pointed at localhost.

### Alternative: Manual Run

```bash
npm run dev
```

The router will start at `http://localhost:8787`.

### 4. Configure Claude Code

Point Claude Code to your local router. You can leave your Anthropic API key as is (it will be ignored if `OPENROUTER_API_KEY` is set in `.dev.vars`).

```bash
# Set the base URL to your local router
export ANTHROPIC_BASE_URL="http://localhost:8787"

# (Optional) Set a dummy key if you haven't set one yet
export ANTHROPIC_API_KEY="sk-dummy-key"

# Run Claude Code
claude
```

## Advanced Configuration

### Model Override

You can force the router to use a specific model by setting `MODEL_OVERRIDE` in `.dev.vars`. This is useful because it allows you to keep `claude-3-5-sonnet` in your Claude Code settings (ensuring compatibility) while actually using a different model backend.

### API Key Override

Set `OPENROUTER_API_KEY` in `.dev.vars` to use a specific key for OpenRouter requests. This allows you to keep your actual Anthropic key in your global settings if you switch back and forth.

## Development

### Docker Support

You can also run the router using Docker:

```bash
docker-compose up -d
```

Make sure to map your `.dev.vars` or set environment variables in `docker-compose.yml`.

## Thanks

Special thanks to these projects that inspired open-claude-router:

- [y-router](https://github.com/yovy-app/y-router)
- [claude-code-router](https://github.com/musistudio/claude-code-router)
- [claude-code-proxy](https://github.com/kiyo-e/claude-code-proxy)

## License

MIT
