import React from 'react';
import { useStore } from '../../store/useStore';

export function EmailSenderInput() {
  const { emailSender, setEmailSender } = useStore();

  return (
    <div className="mb-4">
      <label 
        htmlFor="sender" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Expéditeur du message
      </label>
      <input
        type="text"
        id="sender"
        className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        placeholder="Nom de l'expéditeur"
        value={emailSender}
        onChange={(e) => setEmailSender(e.target.value)}
      />
    </div>
  );
}