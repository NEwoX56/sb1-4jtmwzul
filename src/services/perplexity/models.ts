export const PERPLEXITY_MODELS = {
  DEFAULT: 'pplx-7b-chat',
  CHAT: {
    SMALL: 'pplx-7b-chat',
    MEDIUM: 'pplx-70b-chat',
    LARGE: 'pplx-7b-online',
  },
  RESPONSE_LENGTH: {
    short: 150,
    medium: 300,
    long: 600,
  }
} as const;