import React from 'react';
import { useStore } from '../../store/useStore';

export function SignaturePreview() {
  const { settings, preferences } = useStore();
  const { firstName, lastName, email } = settings.personal;

  if (!preferences.includeSignature) return null;

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Aperçu de la signature
      </h4>
      <div className="text-sm text-gray-600 dark:text-gray-400">
        <p>Cordialement,</p>
        <p className="mt-2">{firstName} {lastName}</p>
        {email && <p className="text-gray-500">{email}</p>}
      </div>
    </div>
  );
}