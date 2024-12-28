import OpenAI from 'openai';
import { Platform } from '../types';

export class OpenAIService {
  private client: OpenAI;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('OpenAI API key is required');
    }
    
    this.client = new OpenAI({
      apiKey,
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
            throw new Error('Invalid API key. Please check your OpenAI API key in settings.');
          case 429:
            throw new Error('Rate limit exceeded. Please try again later.');
          case 500:
            throw new Error('OpenAI service is currently unavailable. Please try again later.');
          default:
            throw new Error(`OpenAI API error: ${error.message}`);
        }
      }
      
      // Re-throw if it's our own error
      if (error instanceof Error) {
        throw error;
      }
      
      throw new Error('An unexpected error occurred. Please try again.');
    }
  }

  private getSystemPrompt(platform: Platform, tone: string, length: string): string {
    const basePrompt = `You are an AI assistant specialized in generating ${platform} responses.
Your task is to create a ${tone} response that is ${length} in length.`;

    const platformSpecifics = {
      gmail: `Format the response as a professional email.
Consider email etiquette and appropriate greetings/closings.
Be clear, concise, and maintain a professional tone.`,
      linkedin: `Focus on professional networking language.
Maintain a business-appropriate tone.
Include relevant industry terminology if applicable.`,
      twitter: `Keep the response within 280 characters.
Use appropriate hashtags and mentions.
Make it engaging and shareable.`,
      instagram: `Include relevant emojis naturally.
Keep the tone conversational and engaging.
Consider using hashtags if appropriate.`,
      youtube: `Focus on engagement and community interaction.
Reference video content when relevant.
Keep the tone appropriate for the platform.`,
    };

    return `${basePrompt}\n${platformSpecifics[platform]}`;
  }

  private getMaxTokens(length: string): number {
    const tokens = {
      short: 150,
      medium: 300,
      long: 600,
    };
    return tokens[length as keyof typeof tokens] || 300;
  }
}