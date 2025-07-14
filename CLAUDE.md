# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with the Claude-Code-Router repository.

## Development Commands

```bash
npm run dev    # Start development server with Wrangler
npm run deploy # Deploy to Cloudflare Workers
```

## Project Architecture

This is a Cloudflare Worker that acts as a **transparent proxy service** between Anthropic's Claude API format and OpenAI-compatible APIs. The Claude-Code-Router enables Claude Code users to access multiple model providers (OpenRouter, OpenAI, DeepSeek, Kimi, SiliconFlow, and other OpenAI-style APIs) without changing their client configuration.

**Key Concept:** Users only interact with the proxy endpoint - the backend provider selection is configured at deployment time by the service administrator.

### Core Components

- **index.ts**: Main Worker entry point handling routing and orchestration
- **formatRequest.ts**: Converts Anthropic API format to OpenAI chat completions format
- **formatResponse.ts**: Converts OpenAI responses back to Anthropic format  
- **streamResponse.ts**: Handles streaming response translation with proper SSE formatting
- **env.ts**: TypeScript environment interface for Cloudflare Workers
- **types.ts**: Centralized type definitions and provider configurations

### API Translation Flow

1. Receives Anthropic-format requests at `/v1/messages`
2. Uses `selectProvider()` function to determine target provider based on environment configuration priority
3. `formatAnthropicToOpenAI()` converts message structure with provider-specific model mapping from `PROVIDER_CONFIGS`
4. Forwards to configured endpoint (OpenRouter or any OpenAI-compatible API)
5. For streaming: `streamOpenAIToAnthropic()` translates SSE events in real-time
6. For non-streaming: `formatOpenAIToAnthropic()` converts the complete response

### Key Translation Logic

- **Provider selection**: `selectProvider()` function prioritizes OpenAI-compatible over OpenRouter when both are configured
- **Model mapping**: Configuration-driven approach in `types.ts:PROVIDER_CONFIGS` with model validation for OpenAI-compatible APIs
- **Tool call validation**: Ensures proper tool_calls/tool message pairing with `validateOpenAIToolCalls()`
- **Message structure**: Handles complex content arrays, system messages, and role differences
- **Streaming events**: Converts OpenAI delta format to Anthropic's content block events

### Environment Configuration

- `OPENROUTER_BASE_URL`: OpenRouter API base URL (defaults to `https://openrouter.ai/api/v1`)
- `OPENAI_COMPATIBLE_BASE_URL`: Any OpenAI-compatible API base URL (when set, routes to this endpoint instead of OpenRouter)
- Custom domain configured: `cc.xiaohui.cool`
- Observability enabled for logging

The worker includes static HTML pages for the homepage (`indexHtml.ts`), terms (`termsHtml.ts`), and privacy policy (`privacyHtml.ts`).