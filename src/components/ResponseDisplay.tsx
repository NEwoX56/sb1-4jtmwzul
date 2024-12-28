import React from 'react';
import { Copy, RefreshCw } from 'lucide-react';
import { useStore } from '../store/useStore';
import toast from 'react-hot-toast';

export function ResponseDisplay() {
  const { generatedResponse } = useStore();

  const copyToClipboard = async () => {
    if (generatedResponse) {
      await navigator.clipboard.writeText(generatedResponse);
      toast.success('Response copied to clipboard!');
    }
  };

  if (!generatedResponse) return null;

  return (
    <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generated Response</h3>
        <div className="flex gap-2">
          <button
            onClick={copyToClipboard}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Copy to clipboard"
          >
            <Copy className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
            title="Regenerate response"
          >
            <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div className="prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{generatedResponse}</p>
      </div>
    </div>
  );
}