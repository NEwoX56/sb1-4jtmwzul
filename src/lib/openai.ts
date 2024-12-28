import OpenAI from 'openai';
import { z } from 'zod';
import type { Platform } from '../types';

const ResponseSchema = z.object({
  choices: z.array(
    z.object({
      message: z.object({
        content: z.string(),
      }),
    })
  ),
});

export class OpenAIClient {
  private client: OpenAI;
  private static instance: OpenAIClient;

  private constructor(apiKey: string) {
    this.client = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  public static getInstance(apiKey: string): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient(apiKey);
    }
    return OpenAIClient.instance;
  }

  private getPrompt(platform: Platform, tone: string, length: string): string {
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
    return {
      short: 150,
      medium: 300,
      long: 600,
    }[length] || 300;
  }

  public async generateResponse(
    platform: Platform,
    message: string,
    tone: string,
    length: string
  ): Promise<string> {
    try {
      const completion = await this.client.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: this.getPrompt(platform, tone, length),
          },
          {
            role: "user",
            content: message,
          },
        ],
        temperature: 0.7,
        max_tokens: this.getMaxTokens(length),
        presence_penalty: 0.6,
        frequency_penalty: 0.5,
      });

      const parsed = ResponseSchema.parse(completion);
      const content = parsed.choices[0]?.message?.content;

      if (!content) {
        throw new Error("No response generated");
      }

      return content;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error("Invalid response format from OpenAI");
      }
      if (error instanceof OpenAI.APIError) {
        if (error.status === 401) {
          throw new Error("Invalid API key. Please check your OpenAI API key in settings.");
        }
        throw new Error(`OpenAI API error: ${error.message}`);
      }
      throw new Error("Failed to generate response. Please try again.");
    }
  }
}