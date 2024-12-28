import React from 'react';
import { Loader2, Wand2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { useGeneration } from '../hooks/useGeneration';
import { cn } from '../utils/cn';

export function GenerateButton() {
  const { selectedPlatform, message, apiKeys, selectedProvider } = useStore();
  const { generate, isDisabled, isGenerating } = useGeneration();

  return (
    <button
      onClick={generate}
      disabled={isDisabled}
      className={cn(
        'w-full md:w-auto px-8 py-3 rounded-lg font-medium',
        'flex items-center justify-center space-x-2',
        'transition-all duration-200',
        isDisabled
          ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
      )}
    >
      {isGenerating ? (
        <>
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Generating...</span>
        </>
      ) : (
        <>
          <Wand2 className="w-5 h-5" />
          <span>Generate Response</span>
        </>
      )}
    </button>
  );
}