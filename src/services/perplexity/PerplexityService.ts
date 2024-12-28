import { AIService } from '../base/AIService';
import { Platform } from '../../types';
import { PerplexityError } from '../../types/errors';
import { PERPLEXITY_MODELS } from './models';
import { PERPLEXITY_CONFIG } from './config';
import type { Message, GenerationOptions } from './types';

export class PerplexityService extends AIService {
  private async makeRequest(messages: Message[], options: GenerationOptions) {
    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      PERPLEXITY_CONFIG.REQUEST.TIMEOUT
    );

    try {
      const response = await fetch(PERPLEXITY_CONFIG.API.BASE_URL, {
        method: 'POST',
        headers: {
          ...PERPLEXITY_CONFIG.API.HEADERS,
          'Authorization': `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          model: PERPLEXITY_MODELS.DEFAULT,
          messages,
          ...options,
        }),
        signal: controller.signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new PerplexityError(
          data.error?.message || 'Unknown error',
          response.status
        );
      }

      return data;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async generateResponse(
    platform: Platform,
    message: string,
    tone: string,
    length: string
  ): Promise<string> {
    if (!message.trim()) {
      throw new PerplexityError('Message is required');
    }

    const messages = [
      {
        role: 'system',
        content: this.getSystemPrompt(platform, tone, length),
      },
      {
        role: 'user',
        content: message,
      },
    ];

    const options = {
      max_tokens: PERPLEXITY_MODELS.RESPONSE_LENGTH[length] || PERPLEXITY_MODELS.RESPONSE_LENGTH.medium,
      temperature: PERPLEXITY_CONFIG.GENERATION.TEMPERATURE,
      top_p: PERPLEXITY_CONFIG.GENERATION.TOP_P,
      frequency_penalty: PERPLEXITY_CONFIG.GENERATION.FREQUENCY_PENALTY,
      presence_penalty: PERPLEXITY_CONFIG.GENERATION.PRESENCE_PENALTY,
    };

    try {
      const data = await this.makeRequest(messages, options);
      const content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new PerplexityError('No response content received');
      }

      return content;
    } catch (error) {
      if (error instanceof PerplexityError) {
        throw error;
      }
      
      if (error instanceof Error) {
        throw new PerplexityError(`Generation failed: ${error.message}`);
      }
      
      throw new PerplexityError('An unexpected error occurred');
    }
  }
}