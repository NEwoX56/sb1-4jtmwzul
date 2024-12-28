import { AIService } from './base/AIService';
import { Platform } from '../types';
import { PerplexityError } from '../types/errors';

export class PerplexityService extends AIService {
  private baseUrl = 'https://api.perplexity.ai/chat/completions';

  async generateResponse(
    platform: Platform,
    message: string,
    tone: string,
    length: string
  ): Promise<string> {
    if (!message.trim()) {
      throw new PerplexityError('Message is required');
    }

    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mixtral-8x7b-instruct',
          messages: [
            {
              role: 'system',
              content: this.getSystemPrompt(platform, tone, length),
            },
            {
              role: 'user',
              content: message,
            },
          ],
          max_tokens: this.getMaxTokens(length),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error?.message || 'Unknown error';
        throw new PerplexityError(
          `API request failed: ${errorMessage}`,
          response.status
        );
      }

      const content = data.choices?.[0]?.message?.content;
      
      if (!content) {
        throw new PerplexityError('No response content received from API');
      }

      return content;
    } catch (error) {
      if (error instanceof PerplexityError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw new PerplexityError(
          `Failed to generate response: ${error.message}`
        );
      }
      
      throw new PerplexityError('An unexpected error occurred');
    }
  }
}