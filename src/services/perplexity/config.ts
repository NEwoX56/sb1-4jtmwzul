export const PERPLEXITY_CONFIG = {
  API: {
    BASE_URL: 'https://api.perplexity.ai/chat/completions',
    HEADERS: {
      'Content-Type': 'application/json'
    }
  },
  GENERATION: {
    TEMPERATURE: 0.7,
    TOP_P: 0.9,
    FREQUENCY_PENALTY: 0.5,
    PRESENCE_PENALTY: 0.5
  },
  REQUEST: {
    TIMEOUT: 30000,
    RETRY_ATTEMPTS: 2,
    RETRY_DELAY: 1000
  }
} as const;