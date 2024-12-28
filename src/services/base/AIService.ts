import { Platform } from '../../types';
import { LearningFile } from '../../types/files';

export abstract class AIService {
  protected apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('API key is required');
    }
    this.apiKey = apiKey;
  }

  abstract generateResponse(
    platform: Platform,
    message: string,
    tone: string,
    length: string,
    learningFiles?: LearningFile[]
  ): Promise<string>;

  protected getMaxTokens(length: string): number {
    const tokens = {
      short: 150,
      medium: 300,
      long: 600,
    };
    return tokens[length as keyof typeof tokens] || 300;
  }

  protected getSystemPrompt(
    platform: Platform, 
    tone: string, 
    length: string,
    learningFiles?: LearningFile[]
  ): string {
    let basePrompt = `Tu es un assistant spécialisé dans la génération de réponses ${platform}.
Ta tâche est de créer une réponse ${tone} qui est ${length} en longueur.`;

    // Filtrer les fichiers par ton
    const relevantFiles = learningFiles?.filter(file => file.tone === tone);

    // Ajouter les exemples d'apprentissage si disponibles
    if (relevantFiles && relevantFiles.length > 0) {
      basePrompt += `\n\nVoici des exemples de mon style d'écriture ${tone} :\n\n`;
      relevantFiles.forEach(file => {
        basePrompt += `Exemple de mon style ${tone} :\n${file.content}\n---\n`;
      });
      basePrompt += `\nGénère une réponse qui imite mon style d'écriture ${tone} tout en restant appropriée pour la situation actuelle.`;
    }

    const platformSpecifics = {
      gmail: `Format : email professionnel.
Respecte les formules de politesse.
Sois clair, concis et maintiens un ton professionnel.`,
      linkedin: `Utilise un langage professionnel.
Maintiens un ton business approprié.
Inclus la terminologie professionnelle pertinente.`,
      twitter: `Limite la réponse à 280 caractères.
Utilise des hashtags appropriés.
Rends le message engageant.`,
      instagram: `Inclus des émojis naturellement.
Garde un ton conversationnel et engageant.
Utilise des hashtags si approprié.`,
      youtube: `Concentre-toi sur l'engagement communautaire.
Fait référence au contenu vidéo si pertinent.
Garde un ton adapté à la plateforme.`,
    };

    return `${basePrompt}\n${platformSpecifics[platform]}`;
  }
}