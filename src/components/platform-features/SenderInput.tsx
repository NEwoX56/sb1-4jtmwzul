import React from 'react';
import { useStore } from '../../store/useStore';
import { AtSign } from 'lucide-react';

export function SenderInput() {
  const { emailSender, setEmailSender } = useStore();

  return (
    <div className="mb-4">
      <label 
        htmlFor="sender" 
        className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
      >
        Expéditeur du message
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <AtSign className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          id="sender"
          className="w-full pl-10 p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Nom de l'expéditeur"
          value={emailSender}
          onChange={(e) => setEmailSender(e.target.value)}
          required
        />
      </div>
    </div>
  );
}