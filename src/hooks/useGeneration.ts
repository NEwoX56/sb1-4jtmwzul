import { useState, useCallback } from 'react';
import { useStore } from '../store/useStore';
import { AIServiceFactory } from '../services/AIServiceFactory';
import toast from 'react-hot-toast';

export function useGeneration() {
  const {
    selectedPlatform,
    message,
    intention,
    emailSender,
    preferences,
    settings,
    setGeneratedResponse,
    apiKeys,
    selectedProvider,
    setIsGenerating,
    isGenerating,
    learningFiles
  } = useStore();

  const isDisabled = !selectedPlatform || 
                    !message.trim() || 
                    !intention.trim() ||
                    !emailSender.trim() ||
                    isGenerating || 
                    !apiKeys[selectedProvider];

  const handleGenerate = useCallback(async () => {
    if (isDisabled) {
      toast.error('Veuillez remplir tous les champs requis');
      return;
    }

    setIsGenerating(true);
    setGeneratedResponse(null);

    try {
      const apiKey = apiKeys[selectedProvider];
      if (!apiKey) {
        throw new Error(`Veuillez ajouter votre clé API ${selectedProvider} dans les paramètres`);
      }

      const aiService = AIServiceFactory.createService(selectedProvider, apiKey);

      const response = await aiService.generateResponse(
        selectedPlatform,
        message,
        preferences.tone,
        preferences.responseLength,
        intention,
        settings,
        preferences.includeSignature,
        emailSender,
        learningFiles
      );

      setGeneratedResponse(response);
      toast.success('Réponse générée avec succès !');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erreur lors de la génération';
      toast.error(errorMessage);
      setGeneratedResponse(null);
    } finally {
      setIsGenerating(false);
    }
  }, [
    selectedPlatform,
    message,
    intention,
    emailSender,
    preferences,
    settings,
    apiKeys,
    selectedProvider,
    isDisabled,
    learningFiles
  ]);

  return {
    generate: handleGenerate,
    isDisabled,
    isGenerating
  };
}