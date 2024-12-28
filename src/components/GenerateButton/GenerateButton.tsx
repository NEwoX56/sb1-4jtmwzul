import React from 'react';
import { Wand2 } from 'lucide-react';
import { LoadingSpinner } from './LoadingSpinner';
import { useGenerateResponse } from './useGenerateResponse';

export function GenerateButton() {
  const { handleGenerate, isDisabled, isLoading } = useGenerateResponse();

  return (
    <button
      onClick={handleGenerate}
      disabled={isDisabled}
      className={`
        relative px-6 py-3 rounded-lg font-medium
        flex items-center justify-center gap-2
        transition-all duration-200
        ${isDisabled 
          ? 'bg-gray-200 text-gray-500 cursor-not-allowed dark:bg-gray-700 dark:text-gray-400' 
          : 'bg-blue-600 text-white hover:bg-blue-700 active:scale-95'
        }
      `}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
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