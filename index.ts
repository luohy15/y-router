import { Env } from './env';
import { formatAnthropicToOpenAI } from './formatRequest';
import { streamOpenAIToAnthropic } from './streamResponse';
import { formatOpenAIToAnthropic } from './formatResponse';
import { indexHtml } from './indexHtml';
import { termsHtml } from './termsHtml';
import { privacyHtml } from './privacyHtml';
import { installSh } from './installSh';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    
    if (url.pathname === '/' && request.method === 'GET') {
      return new Response(indexHtml, {
        headers: { "Content-Type": "text/html" }
      });
    }
    
    if (url.pathname === '/terms' && request.method === 'GET') {
      return new Response(termsHtml, {
        headers: { "Content-Type": "text/html" }
      });
    }
    
    if (url.pathname === '/privacy' && request.method === 'GET') {
      return new Response(privacyHtml, {
        headers: { "Content-Type": "text/html" }
      });
    }
    
    if (url.pathname === '/install.sh' && request.method === 'GET') {
      return new Response(installSh, {
        headers: { "Content-Type": "text/plain; charset=utf-8" }
      });
    }


    
    if (url.pathname === '/v1/messages' && request.method === 'POST') {
      const anthropicRequest = await request.json();
      const openaiRequest = formatAnthropicToOpenAI(anthropicRequest, env.MODEL_OVERRIDE);
      const bearerToken = env.OPENROUTER_API_KEY || request.headers.get("X-Api-Key") || 
        request.headers.get("Authorization")?.replace("Bearer ", "");

      const baseUrl = env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1';
      const openaiResponse = await fetch(`${baseUrl}/chat/completions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`,
        },
        body: JSON.stringify(openaiRequest),
      });

      if (!openaiResponse.ok) {
        return new Response(await openaiResponse.text(), { status: openaiResponse.status });
      }

      if (openaiRequest.stream) {
        const anthropicStream = streamOpenAIToAnthropic(openaiResponse.body as ReadableStream, openaiRequest.model);
        return new Response(anthropicStream, {
          headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
          },
        });
      } else {
        const openaiData = await openaiResponse.json();
        const anthropicResponse = formatOpenAIToAnthropic(openaiData, openaiRequest.model);
        return new Response(JSON.stringify(anthropicResponse), {
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    
    if (url.pathname === '/v1/messages/count_tokens' && request.method === 'POST') {
      const body = await request.json();
      // Simple estimation: ~4 chars per token. 
      // This is not perfect but better than 404 and sufficient for context management.
      // We count system prompt + messages content.
      let charCount = 0;
      
      if (body.system) {
        if (typeof body.system === 'string') charCount += body.system.length;
        else if (Array.isArray(body.system)) {
            charCount += body.system.reduce((acc: number, part: any) => acc + (part.text?.length || 0), 0);
        }
      }
      
      if (body.messages) {
        for (const msg of body.messages) {
          if (typeof msg.content === 'string') charCount += msg.content.length;
          else if (Array.isArray(msg.content)) {
            charCount += msg.content.reduce((acc: number, part: any) => acc + (part.text?.length || 0), 0);
          }
        }
      }
      
      const input_tokens = Math.ceil(charCount / 4);
      
      return new Response(JSON.stringify({ input_tokens }), {
        headers: { "Content-Type": "application/json" }
      });
    }

    return new Response('Not Found', { status: 404 });
  }
}