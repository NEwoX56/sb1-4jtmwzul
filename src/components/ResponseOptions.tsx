import React from 'react';
import { useStore } from '../store/useStore';
import type { ToneType, ResponseLength } from '../types';

export function ResponseOptions() {
  const { preferences, updatePreferences } = useStore();

  const toneOptions: { value: ToneType; label: string }[] = [
    { value: 'professional', label: 'Professionnel' },
    { value: 'casual', label: 'Décontracté' },
    { value: 'friendly', label: 'Amical' },
  ];

  const lengthOptions: { value: ResponseLength; label: string }[] = [
    { value: 'short', label: 'Court' },
    { value: 'medium', label: 'Moyen' },
    { value: 'long', label: 'Long' },
  ];

  const handleToneChange = (tone: ToneType) => {
    updatePreferences({ tone });
  };

  const handleLengthChange = (responseLength: ResponseLength) => {
    updatePreferences({ responseLength });
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updatePreferences({ includeSignature: e.target.checked });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Ton
        </label>
        <div className="flex space-x-4">
          {toneOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleToneChange(value)}
              className={`px-4 py-2 rounded-lg transition-all ${
                preferences.tone === value
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Longueur de la réponse
        </label>
        <div className="flex space-x-4">
          {lengthOptions.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => handleLengthChange(value)}
              className={`px-4 py-2 rounded-lg transition-all ${
                preferences.responseLength === value
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                  : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="signature"
          checked={preferences.includeSignature}
          onChange={handleSignatureChange}
          className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
        <label
          htmlFor="signature"
          className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Inclure la signature
        </label>
      </div>
    </div>
  );
}