import React from 'react';
import { useStore } from '../../store/useStore';
import { AIProvider } from '../../types/api';
import { APIKeyInput } from './APIKeyInput';

export function APIKeySettings() {
  const { apiKeys, updateAPIKey, selectedProvider, setSelectedProvider } = useStore();

  const providers: { id: AIProvider; label: string }[] = [
    { id: 'openai', label: 'OpenAI' },
    { id: 'perplexity', label: 'Perplexity AI' },
    { id: 'mixtral', label: 'Mixtral AI' },
  ];

  return (
    <section className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        AI Provider Settings
      </h3>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Select Provider
          </label>
          <div className="flex flex-wrap gap-4">
            {providers.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => setSelectedProvider(id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedProvider === id
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {providers.map(({ id, label }) => (
          <div key={id} className={selectedProvider === id ? 'block' : 'hidden'}>
            <APIKeyInput
              label={`${label} API Key`}
              value={apiKeys[id] || ''}
              onChange={(value) => updateAPIKey(id, value)}
              placeholder={`Enter your ${label} API key`}
            />
          </div>
        ))}
      </div>
    </section>
  );
}