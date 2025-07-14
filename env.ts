export interface Env {
  OPENROUTER_BASE_URL?: string;
  ANYROUTER_BASE_URL?: string; // For AnyRouter proxy service
  
  // 具体provider的base URL配置
  DEEPSEEK_BASE_URL?: string;
  OPENAI_BASE_URL?: string;
  KIMI_BASE_URL?: string; // Moonshot AI
  SILICONFLOW_BASE_URL?: string;
  
  // 向后兼容 - 通用OpenAI兼容配置 (自动检测provider类型)
  OPENAI_COMPATIBLE_BASE_URL?: string; // For any OpenAI-compatible API (DeepSeek, OpenAI, etc.)
  
  // 可配置的模型映射 (JSON格式) - 已弃用，改用provider-specific configs
  OPENAI_COMPATIBLE_MODEL_MAPPINGS?: string; // 例如: {"haiku":"gpt-4o-mini","sonnet":"gpt-4o","opus":"gpt-4o"}
}
