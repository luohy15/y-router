export type Provider = 'openrouter' | 'openai-compatible';

export interface ModelMapping {
  [key: string]: string;
}

export const PROVIDER_CONFIGS = {
  openrouter: {
    defaultBaseUrl: 'https://openrouter.ai/api/v1',
    modelMappings: {
      haiku: 'anthropic/claude-3.5-haiku',
      sonnet: 'anthropic/claude-3.5-sonnet',
      opus: 'anthropic/claude-3-opus',
    } as ModelMapping,
  },
  'openai-compatible': {
    defaultBaseUrl: 'https://api.openai.com/v1',
    modelMappings: {
      // 默认映射到DeepSeek模型（因为这是最常用的OpenAI兼容API）
      haiku: 'deepseek-chat',
      sonnet: 'deepseek-chat', 
      opus: 'deepseek-reasoner', // 更复杂的任务使用reasoner模型
    } as ModelMapping,
    // 支持的模型列表
    commonModels: ['gpt-4o', 'gpt-4o-mini', 'gpt-3.5-turbo', 'deepseek-chat', 'deepseek-reasoner'],
  },
} as const;