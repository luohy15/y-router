import { Env } from './env';
import { formatAnthropicToOpenAI } from './formatRequest';
import { streamOpenAIToAnthropic } from './streamResponse';
import { formatOpenAIToAnthropic } from './formatResponse';
import { indexHtml } from './indexHtml';
import { termsHtml } from './termsHtml';
import { privacyHtml } from './privacyHtml';
import { Provider, PROVIDER_CONFIGS } from './types';

function selectProvider(env: Env, apiKey?: string): { provider: Provider; baseUrl: string } {
  // 检查各个具体的provider配置
  
  // DeepSeek
  if (env.DEEPSEEK_BASE_URL) {
    return {
      provider: 'deepseek',
      baseUrl: env.DEEPSEEK_BASE_URL
    };
  }
  
  // OpenAI
  if (env.OPENAI_BASE_URL) {
    return {
      provider: 'openai',
      baseUrl: env.OPENAI_BASE_URL
    };
  }
  
  // Kimi (Moonshot)
  if (env.KIMI_BASE_URL) {
    return {
      provider: 'kimi',
      baseUrl: env.KIMI_BASE_URL
    };
  }
  
  // SiliconFlow
  if (env.SILICONFLOW_BASE_URL) {
    return {
      provider: 'siliconflow',
      baseUrl: env.SILICONFLOW_BASE_URL
    };
  }
  
  // 为了向后兼容，继续支持通用的OPENAI_COMPATIBLE_BASE_URL
  // 根据URL自动检测provider类型
  if (env.OPENAI_COMPATIBLE_BASE_URL) {
    const baseUrl = env.OPENAI_COMPATIBLE_BASE_URL;
    
    if (baseUrl.includes('deepseek.com')) {
      return { provider: 'deepseek', baseUrl };
    } else if (baseUrl.includes('openai.com')) {
      return { provider: 'openai', baseUrl };
    } else if (baseUrl.includes('moonshot.cn')) {
      return { provider: 'kimi', baseUrl };
    } else if (baseUrl.includes('siliconflow.cn')) {
      return { provider: 'siliconflow', baseUrl };
    }
    
    // 如果无法识别，默认使用deepseek配置
    return { provider: 'deepseek', baseUrl };
  }
  
  // AnyRouter通过共享实例提供服务，使用默认URL
  if (env.ANYROUTER_BASE_URL) {
    return {
      provider: 'anyrouter',
      baseUrl: env.ANYROUTER_BASE_URL
    };
  }
  
  // 检测AnyRouter API Key模式 (如果API key以特定格式开头)
  if (apiKey && (apiKey.startsWith('ar-') || apiKey.includes('anyrouter'))) {
    return {
      provider: 'anyrouter',
      baseUrl: PROVIDER_CONFIGS.anyrouter.defaultBaseUrl
    };
  }
  
  // Default to OpenRouter
  return {
    provider: 'openrouter',
    baseUrl: env.OPENROUTER_BASE_URL || PROVIDER_CONFIGS.openrouter.defaultBaseUrl
  };
}

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
    
    if (url.pathname === '/v1/messages' && request.method === 'POST') {
      const anthropicRequest = await request.json();
      const bearerToken = request.headers.get("x-api-key");

      // Select provider and base URL based on environment configuration and API key
      const { provider, baseUrl } = selectProvider(env, bearerToken || undefined);

      const openaiRequest = formatAnthropicToOpenAI(anthropicRequest, provider, env);
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
    
    return new Response('Not Found', { status: 404 });
  }
}