export interface Message {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface GenerationOptions {
  max_tokens: number;
  temperature: number;
  top_p: number;
  frequency_penalty: number;
  presence_penalty: number;
}

export interface PerplexityResponse {
  id: string;
  model: string;
  created: number;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
  }>;
}

export interface PerplexityError {
  error: {
    message: string;
    type: string;
    code: string;
  };
}