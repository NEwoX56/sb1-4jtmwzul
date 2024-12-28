import { AIService } from './base/AIService';
import { Platform } from '../types';
import { UserSettings } from '../types';
import { LearningFile } from '../types/files';

export class MixtralService extends AIService {
  private baseUrl = 'https://api.mistral.ai/v1/chat/completions';

  async generateResponse(
    platform: Platform,
    message: string,
    tone: string,
    length: string,
    intention: string,
    settings?: UserSettings,
    includeSignature?: boolean,
    emailSender?: string,
    learningFiles?: LearningFile[]
  ): Promise<string> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: 'mistral-large-latest',
          messages: [
            {
              role: 'system',
              content: this.getSystemPrompt(platform, tone, length, learningFiles)
            },
            {
              role: 'user',
              content: message
            }
          ],
          max_tokens: this.getMaxTokens(length),
          temperature: 0.7
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `Erreur HTTP! statut: ${response.status}`);
      }

      const data = await response.json();
      let content = data.choices?.[0]?.message?.content;

      if (!content) {
        throw new Error('Format de réponse invalide de l\'API Mixtral');
      }

      // Ajouter la signature si demandée
      if (includeSignature && settings?.personal) {
        const { firstName, lastName, email } = settings.personal;
        if (firstName || lastName) {
          content += '\n\nCordialement,';
          content += `\n${firstName} ${lastName}`;
          if (email) {
            content += `\n${email}`;
          }
        }
      }

      return content;
    } catch (error) {
      if (error instanceof Error) {
        console.error('Erreur API Mixtral:', error);
        throw error;
      }
      throw new Error('Une erreur inattendue s\'est produite');
    }
  }
}