import { AIProvider } from '../types/api';
import { OpenAIService } from './OpenAIService';
import { PerplexityService } from './perplexity/PerplexityService';
import { MixtralService } from './MixtralService';
import { AIService } from './base/AIService';

export class AIServiceFactory {
  static createService(provider: AIProvider, apiKey: string): AIService {
    switch (provider) {
      case 'openai':
        return new OpenAIService(apiKey);
      case 'perplexity':
        return new PerplexityService(apiKey);
      case 'mixtral':
        return new MixtralService(apiKey);
      default:
        throw new Error(`Unsupported AI provider: ${provider}`);
    }
  }
}