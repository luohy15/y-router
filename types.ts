export type Provider = 'openrouter' | 'deepseek';

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
  deepseek: {
    defaultBaseUrl: 'https://api.deepseek.com',
    modelMappings: {
      haiku: 'deepseek-chat',
      sonnet: 'deepseek-chat', 
      opus: 'deepseek-chat',
    } as ModelMapping,
    validModels: ['deepseek-chat', 'deepseek-reasoner'],
  },
} as const;