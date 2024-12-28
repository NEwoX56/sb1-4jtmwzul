export type AIProvider = 'openai' | 'perplexity' | 'mixtral';

export interface APIKeys {
  openai?: string;
  perplexity?: string;
  mixtral?: string;
}