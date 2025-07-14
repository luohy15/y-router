# Claude-Code-Router

A Cloudflare Worker that acts as a **proxy service**, translating between Anthropic's Claude API and OpenAI-compatible APIs, enabling you to use Claude Code with OpenRouter, OpenAI, DeepSeek, and other OpenAI-style providers through a single proxy endpoint.

## Quick Usage

**Step 1:** Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```

**Step 2:** Get OpenRouter API key from [openrouter.ai](https://openrouter.ai)

**Step 3:** Configure environment variables in your shell config (`~/.bashrc` or `~/.zshrc`):

```bash
# For quick testing, you can use our shared instance. For daily use, deploy your own instance for better reliability.
export ANTHROPIC_BASE_URL="https://cc.xiaohui.cool"
export ANTHROPIC_API_KEY="your-openrouter-api-key"
```

**Step 4:** Reload your shell and run Claude Code:
```bash
source ~/.bashrc
claude
```

That's it! Claude Code will now use OpenRouter's models through Claude-Code-Router.

## GitHub Actions Usage

To use Claude Code in GitHub Actions workflows, add the environment variable to your workflow:

```yaml
env:
  ANTHROPIC_BASE_URL: ${{ secrets.ANTHROPIC_BASE_URL }}
```

Set `ANTHROPIC_BASE_URL` to `https://cc.xiaohui.cool` in your repository secrets.

Example workflows:
- [Interactive Claude Code](.github/workflows/claude.yml) - Responds to @claude mentions
- [Automated Code Review](.github/workflows/claude-code-review.yml) - Automatic PR reviews

## What it does

Claude-Code-Router acts as a **transparent proxy service** that:
- Accepts requests in Anthropic's API format (`/v1/messages`)
- Converts them to OpenAI's chat completions format
- Forwards to the configured backend (OpenRouter, OpenAI, DeepSeek, or any OpenAI-compatible API)
- Translates the response back to Anthropic's format
- Supports both streaming and non-streaming responses

**Key benefit:** Users only need to configure their Claude Code to point to the proxy - they don't need to know which backend provider is being used.

## Perfect for Claude Code + Multiple Providers

This proxy allows you to use [Claude Code](https://claude.ai/code) with various model providers by:
1. Deploying Claude-Code-Router with your preferred backend (OpenRouter, OpenAI, DeepSeek, etc.)
2. Pointing Claude Code to your Claude-Code-Router deployment
3. Using your backend provider's API key
4. Accessing models through Claude Code's interface transparently

## Setup

1. **Clone and deploy:**
   ```bash
   git clone <repo>
   cd claude-code-router
   npm install -g wrangler
   wrangler deploy
   ```

2. **Set environment variables:**
   ```bash
   # Optional: defaults to https://openrouter.ai/api/v1
   wrangler secret put OPENROUTER_BASE_URL
   ```

3. **Configure Claude Code:**
   - Set API endpoint to your deployed Worker URL
   - Use your OpenRouter API key
   - Enjoy access to Claude models via OpenRouter!

## Environment Variables

- `OPENROUTER_BASE_URL` (optional): Base URL for OpenRouter API. Defaults to `https://openrouter.ai/api/v1`
- `OPENAI_COMPATIBLE_BASE_URL` (optional): Base URL for any OpenAI-compatible API. When set, routes requests to this endpoint instead of OpenRouter. Defaults to `https://api.deepseek.com` when using OpenAI-compatible mode. Examples:
  - DeepSeek: `https://api.deepseek.com` (default)
  - OpenAI: `https://api.openai.com/v1` 
  - Other providers: Set to their OpenAI-compatible endpoint

**Provider Priority:** If both environment variables are configured, OpenAI-compatible takes priority over OpenRouter.

## Using with OpenAI-Compatible APIs

Claude-Code-Router supports any OpenAI-compatible API as an alternative backend to OpenRouter. This is configured at **deployment time** by the service administrator.

### For Service Administrators (Deployment Configuration)

To deploy Claude-Code-Router with an OpenAI-compatible backend:

1. **Get API key** from your chosen provider (DeepSeek, OpenAI, etc.)

2. **Deploy with OpenAI-compatible configuration:**
   ```bash
   # Configure the proxy to use an OpenAI-compatible API as backend
   # Examples:
   
   # For DeepSeek (default models already configured):
   wrangler secret put OPENAI_COMPATIBLE_BASE_URL  # DeepSeek: https://api.deepseek.com
   
   # For OpenAI (need custom model mappings):
   wrangler secret put OPENAI_COMPATIBLE_BASE_URL  # OpenAI: https://api.openai.com/v1
   wrangler secret put OPENAI_COMPATIBLE_MODEL_MAPPINGS  # {"haiku":"gpt-4o-mini","sonnet":"gpt-4o","opus":"gpt-4o"}
   
   # For other providers:
   wrangler secret put OPENAI_COMPATIBLE_BASE_URL  # Other: https://your-provider.com/v1
   wrangler secret put OPENAI_COMPATIBLE_MODEL_MAPPINGS  # Custom mappings as needed
   
   wrangler deploy
   ```

### For End Users (Claude Code Configuration)

Users interact with the proxy service the same way regardless of backend:

```bash
# Point Claude Code to your deployed proxy
export ANTHROPIC_BASE_URL="https://your-deployed-domain.com"  # or https://cc.xiaohui.cool
export ANTHROPIC_API_KEY="your-backend-api-key"  # OpenRouter, DeepSeek, OpenAI, or other provider key
```

### Common OpenAI-Compatible Providers

**DeepSeek Example (Default Configuration):**
- **Available Models**: `deepseek-chat`, `deepseek-reasoner`
- **Base URL**: `https://api.deepseek.com` (default when using OpenAI-compatible mode)
- **Claude model mapping**: haiku/sonnet → `deepseek-chat`, opus → `deepseek-reasoner`
- **Configuration**: Only need to set `OPENAI_COMPATIBLE_BASE_URL`

**OpenAI Example:**
- **Available Models**: `gpt-4o`, `gpt-4o-mini`, `gpt-3.5-turbo`
- **Base URL**: `https://api.openai.com/v1`
- **Claude model mapping**: haiku/sonnet/opus → `gpt-4o-mini`/`gpt-4o`/`gpt-4o`

**Note:** Users don't need to know which backend the proxy is configured to use. The proxy handles all translation transparently.

## API Usage

Send requests to `/v1/messages` using Anthropic's format:

```bash
curl -X POST https://cc.xiaohui.cool/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-openrouter-key" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [{"role": "user", "content": "Hello, Claude"}],
    "max_tokens": 100
  }'
```

## Development

```bash
npm run dev    # Start development server
npm run deploy # Deploy to Cloudflare Workers
```

## Thanks

Special thanks to these projects that inspired Claude-Code-Router:
- [claude-code-router](https://github.com/musistudio/claude-code-router)
- [claude-code-proxy](https://github.com/kiyo-e/claude-code-proxy)

## Disclaimer

**Important Legal Notice:**

- **Third-party Tool**: Claude-Code-Router is an independent, unofficial tool and is not affiliated with, endorsed by, or supported by Anthropic PBC, OpenAI, or OpenRouter
- **Service Terms**: Users are responsible for ensuring compliance with the Terms of Service of all involved parties (Anthropic, OpenRouter, and any other API providers)
- **API Key Responsibility**: Users must use their own valid API keys and are solely responsible for any usage, costs, or violations associated with those keys
- **No Warranty**: This software is provided "as is" without any warranties. The authors are not responsible for any damages, service interruptions, or legal issues arising from its use
- **Data Privacy**: While Claude-Code-Router does not intentionally store user data, users should review the privacy policies of all connected services
- **Compliance**: Users are responsible for ensuring their use complies with applicable laws and regulations in their jurisdiction
- **Commercial Use**: Any commercial use should be carefully evaluated against relevant terms of service and licensing requirements

**Use at your own risk and discretion.**

## License

MIT