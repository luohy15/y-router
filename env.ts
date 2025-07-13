export interface Env {
  OPENROUTER_BASE_URL?: string;
  OPENAI_COMPATIBLE_BASE_URL?: string; // For any OpenAI-compatible API (DeepSeek, OpenAI, etc.)
  
  // 可配置的模型映射 (JSON格式)
  OPENAI_COMPATIBLE_MODEL_MAPPINGS?: string; // 例如: {"haiku":"gpt-4o-mini","sonnet":"gpt-4o","opus":"gpt-4o"}
}
