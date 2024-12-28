export const PERPLEXITY_MODELS = {
  DEFAULT: 'pplx-7b-chat',
  MODELS: {
    SMALL: 'pplx-7b-chat',
    MEDIUM: 'pplx-70b-chat',
    LARGE: 'pplx-7b-online',
  }
} as const;

export const PERPLEXITY_API_CONFIG = {
  BASE_URL: 'https://api.perplexity.ai/chat/completions',
  DEFAULT_TEMPERATURE: 0.7,
  TIMEOUT: 30000,
} as const;