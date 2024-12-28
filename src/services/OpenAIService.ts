import OpenAI from 'openai';
import { AIService } from './base/AIService';
import { Platform } from '../types';

export class OpenAIService extends AIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    super(apiKey);
    this.client = new OpenAI({
      apiKey: this.apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async generateResponse(
    platform: Platform,
    message: string,
    tone: string,
    length: string
  ): Promise<string> {
    if (!message.trim()) {
      throw new Error('Message is required');
    }

    try {
      const completion = await this.client.chat.completions.create({
        model: 'gpt-3.5-turbo',
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
        temperature: 0.7,
        max_tokens: this.getMaxTokens(length),
        presence_penalty: 0.6,
        frequency_penalty: 0.5,
      });

      const content = completion.choices[0]?.message?.content;
      if (!content) {
        throw new Error('No response generated from OpenAI');
      }

      return content;
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        switch (error.status) {
          case 401:
            throw new Error('Invalid OpenAI API key. Please check your settings.');
          case 429:
            throw new Error('OpenAI rate limit exceeded. Please try again later.');
          case 500:
            throw new Error('OpenAI service is currently unavailable.');
          default:
            throw new Error(`OpenAI API error: ${error.message}`);
        }
      }
      throw error;
    }
  }
}