export function formatOpenAIToAnthropic(completion: any, model: string): any {
  const messageId = "msg_" + Date.now();

  let content: any = [];
  
  // Handle reasoning content from OpenRouter
  if (completion.choices[0].message.reasoning) {
    content.push({
      type: "thinking",
      thinking: completion.choices[0].message.reasoning,
      signature: "openrouter-reasoning" // Placeholder signature
    });
  }

  if (completion.choices[0].message.content) {
    content.push({ text: completion.choices[0].message.content, type: "text" });
  } else if (completion.choices[0].message.tool_calls) {
    const toolCalls = completion.choices[0].message.tool_calls.map((item: any) => {
      return {
        type: 'tool_use',
        id: item.id,
        name: item.function?.name,
        input: item.function?.arguments ? JSON.parse(item.function.arguments) : {},
      };
    });
    content.push(...toolCalls);
  }

  const result = {
    id: messageId,
    type: "message",
    role: "assistant",
    content: content,
    stop_reason: completion.choices[0].finish_reason === 'tool_calls' ? "tool_use" : "end_turn",
    stop_sequence: null,
    model,
    usage: completion.usage ? {
      input_tokens: completion.usage.prompt_tokens || 0,
      output_tokens: completion.usage.completion_tokens || 0
    } : { input_tokens: 0, output_tokens: 0 },
  };
  return result;
}