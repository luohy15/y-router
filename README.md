# y-router

A Cloudflare Worker that translates between Anthropic's Claude API and OpenAI-compatible APIs, enabling you to use Claude Code with OpenRouter and other OpenAI-compatible providers.

## Quick Usage

### One-line Install (Recommended)
```bash
bash -c "$(curl -fsSL https://cc.yovy.app/install.sh)"
```

This script will automatically:
- Install Node.js (if needed)
- Install Claude Code
- Configure your environment with OpenRouter or Moonshot
- Set up all necessary environment variables

### Manual Setup

**Step 1:** Install Claude Code
```bash
npm install -g @anthropic-ai/claude-code
```

**Step 2:** Get OpenRouter API key from [openrouter.ai](https://openrouter.ai)

**Step 3:** Configure environment variables in your shell config (`~/.bashrc` or `~/.zshrc`):

```bash
# For quick testing, you can use our shared instance. For daily use, deploy your own instance for better reliability.
export ANTHROPIC_BASE_URL="https://cc.yovy.app"
export ANTHROPIC_API_KEY="your-openrouter-api-key"
```

**Optional:** Configure specific models (browse models at [openrouter.ai/models](https://openrouter.ai/models)):
```bash
export ANTHROPIC_MODEL="moonshotai/kimi-k2"
export ANTHROPIC_SMALL_FAST_MODEL="google/gemini-2.5-flash"
```

**Step 4:** Reload your shell and run Claude Code:
```bash
source ~/.bashrc
claude
```

That's it! Claude Code will now use OpenRouter's models through y-router.

### Multiple Configurations

To maintain multiple Claude Code configurations for different providers or models, use shell aliases:

```bash
# Example aliases for different configurations
alias c1='ANTHROPIC_BASE_URL="https://cc.yovy.app" ANTHROPIC_API_KEY="your-openrouter-key" ANTHROPIC_MODEL="moonshotai/kimi-k2" ANTHROPIC_SMALL_FAST_MODEL="google/gemini-2.5-flash" claude'
alias c2='ANTHROPIC_BASE_URL="https://api.moonshot.ai/anthropic/" ANTHROPIC_API_KEY="your-moonshot-key" ANTHROPIC_MODEL="kimi-k2-0711-preview" ANTHROPIC_SMALL_FAST_MODEL="moonshot-v1-8k" claude'
```

Add these aliases to your shell config file (`~/.bashrc` or `~/.zshrc`), then use `c1` or `c2` to switch between configurations.

## GitHub Actions Usage

To use Claude Code in GitHub Actions workflows, add the environment variable to your workflow:

```yaml
env:
  ANTHROPIC_BASE_URL: ${{ secrets.ANTHROPIC_BASE_URL }}
```

Set `ANTHROPIC_BASE_URL` to `https://cc.yovy.app` in your repository secrets.

Example workflows:
- [Interactive Claude Code](.github/workflows/claude.yml) - Responds to @claude mentions
- [Automated Code Review](.github/workflows/claude-code-review.yml) - Automatic PR reviews

## What it does

y-router acts as a translation layer that:
- Accepts requests in Anthropic's API format (`/v1/messages`)
- Converts them to OpenAI's chat completions format
- Forwards to OpenRouter (or any OpenAI-compatible API)
- Translates the response back to Anthropic's format
- Supports both streaming and non-streaming responses

## Perfect for Claude Code + OpenRouter

This allows you to use [Claude Code](https://claude.ai/code) with OpenRouter's vast selection of models by:
1. Pointing Claude Code to your y-router deployment
2. Using your OpenRouter API key
3. Accessing Claude models available on OpenRouter through Claude Code's interface

## Setup

### Option 1: Docker Deployment (Recommended for Local)

1. **Clone and start with Docker:**
   ```bash
   git clone <repo>
   cd y-router
   docker-compose up -d
   ```

2. **Configure Claude Code:**
   - Set API endpoint to `http://localhost:8787`
   - Use your OpenRouter API key
   - Enjoy access to Claude models via OpenRouter!

### Option 2: Cloudflare Workers Deployment

1. **Clone and deploy:**
   ```bash
   git clone <repo>
   cd y-router
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

- `OPENROUTER_BASE_URL` (optional): Base URL for the target API. Defaults to `https://openrouter.ai/api/v1`

## API Usage

Send requests to `/v1/messages` using Anthropic's format:

```bash
curl -X POST https://cc.yovy.app/v1/messages \
  -H "Content-Type: application/json" \
  -H "x-api-key: your-openrouter-key" \
  -d '{
    "model": "claude-sonnet-4-20250514",
    "messages": [{"role": "user", "content": "Hello, Claude"}],
    "max_tokens": 100
  }'
```

## Development

### Local Development (Wrangler)

```bash
npm run dev    # Start development server
npm run deploy # Deploy to Cloudflare Workers
```

### Docker Deployment

For easier deployment and development, you can use Docker:

#### Quick Start with Docker Compose

```bash
# Clone the repository
git clone <repo>
cd y-router

# Start with Docker Compose
docker-compose up -d

# The service will be available at http://localhost:8787
```

#### Manual Docker Build

```bash
# Build the Docker image
docker build -t y-router .

# Run the container
docker run -d -p 8787:8787 \
  -e OPENROUTER_BASE_URL=https://openrouter.ai/api/v1 \
  y-router
```

#### Environment Configuration

Create a `.env` file or set environment variables:

```bash
# Optional: Base URL for the target API (defaults to https://openrouter.ai/api/v1)
OPENROUTER_BASE_URL=https://openrouter.ai/api/v1
```

#### Docker Compose Commands

```bash
docker-compose up -d        # Start services in background
docker-compose down         # Stop and remove containers
docker-compose logs         # View logs
docker-compose ps           # Check service status
docker-compose restart      # Restart services
```

#### Health Check

The Docker setup includes a health check that verifies the service is responding:

```bash
# Check if the service is healthy
curl http://localhost:8787/

# Check Docker health status
docker-compose ps
```

## Thanks

Special thanks to these projects that inspired y-router:
- [claude-code-router](https://github.com/musistudio/claude-code-router)
- [claude-code-proxy](https://github.com/kiyo-e/claude-code-proxy)

## Disclaimer

**Important Legal Notice:**

- **Third-party Tool**: y-router is an independent, unofficial tool and is not affiliated with, endorsed by, or supported by Anthropic PBC, OpenAI, or OpenRouter
- **Service Terms**: Users are responsible for ensuring compliance with the Terms of Service of all involved parties (Anthropic, OpenRouter, and any other API providers)
- **API Key Responsibility**: Users must use their own valid API keys and are solely responsible for any usage, costs, or violations associated with those keys
- **No Warranty**: This software is provided "as is" without any warranties. The authors are not responsible for any damages, service interruptions, or legal issues arising from its use
- **Data Privacy**: While y-router does not intentionally store user data, users should review the privacy policies of all connected services
- **Compliance**: Users are responsible for ensuring their use complies with applicable laws and regulations in their jurisdiction
- **Commercial Use**: Any commercial use should be carefully evaluated against relevant terms of service and licensing requirements

**Use at your own risk and discretion.**

## License

MIT