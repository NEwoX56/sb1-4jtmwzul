import { useState, useCallback } from 'react';
import { useStore } from '../../store/useStore';
import { AIServiceFactory } from '../../services/AIServiceFactory';
import toast from 'react-hot-toast';

export function useGenerateResponse() {
  const {
    selectedPlatform,
    message,
    preferences,
    setGeneratedResponse,
    apiKeys,
    selectedProvider,
    setIsGenerating,
    isGenerating
  } = useStore();

  const [isLoading, setIsLoading] = useState(false);

  const isDisabled = !selectedPlatform || 
                    !message.trim() || 
                    isLoading || 
                    !apiKeys[selectedProvider];

  const handleGenerate = useCallback(async () => {
    if (isDisabled) return;

    setIsLoading(true);
    setIsGenerating(true);
    setGeneratedResponse(null);

    try {
      const aiService = AIServiceFactory.createService(
        selectedProvider, 
        apiKeys[selectedProvider]!
      );

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await aiService.generateResponse(
        selectedPlatform!,
        message,
        preferences.tone,
        preferences.responseLength
      );

      clearTimeout(timeoutId);
      setGeneratedResponse(response);
      toast.success('Response generated successfully!');
    } catch (error) {
      const message = error instanceof Error 
        ? error.message 
        : 'Failed to generate response';
      
      toast.error(message);
      setGeneratedResponse(null);
    } finally {
      setIsLoading(false);
      setIsGenerating(false);
    }
  }, [
    selectedPlatform,
    message,
    preferences,
    apiKeys,
    selectedProvider,
    isDisabled
  ]);

  return {
    handleGenerate,
    isDisabled,
    isLoading
  };
}