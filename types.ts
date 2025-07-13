export type Provider = 'openrouter' | 'openai-compatible';

export interface ModelMapping {
  [key: string]: string;
}

export const PROVIDER_CONFIGS = {
  openrouter: {
    defaultBaseUrl: 'https://openrouter.ai/api/v1',
    modelMappings: {
      haiku: 'anthropic/claude-3.5-haiku',
      sonnet: 'anthropic/claude-sonnet-4',
      opus: 'anthropic/claude-opus-4',
    } as ModelMapping,
  },
  'openai-compatible': {
    defaultBaseUrl: 'https://api.openai.com/v1', // Default to OpenAI, but typically overridden
    modelMappings: {
      haiku: 'gpt-4o-mini',
      sonnet: 'gpt-4o', 
      opus: 'gpt-4o',
    } as ModelMapping,
    // Common models for OpenAI-compatible providers (can include DeepSeek, OpenAI, etc.)
    commonModels: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo', 'deepseek-chat', 'deepseek-reasoner'],
  },
} as const;