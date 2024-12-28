import React from 'react';
import { SenderInput } from './SenderInput';
import { AttachmentInput } from './AttachmentInput';
import { SignatureEditor } from './SignatureEditor';

export function GmailFeatures() {
  return (
    <div className="space-y-4">
      <SenderInput />
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Sujet
        </label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="RE: Votre sujet d'email"
        />
      </div>

      <AttachmentInput />
      <SignatureEditor />
    </div>
  );
}