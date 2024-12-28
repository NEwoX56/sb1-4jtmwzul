import React from 'react';
import { useStore } from '../../store/useStore';
import { Paperclip, X } from 'lucide-react';

export function AttachmentInput() {
  const { attachments, setAttachments } = useStore();

  const handleAddAttachment = () => {
    const newAttachment = prompt('Nom de la pièce jointe:');
    if (newAttachment?.trim()) {
      setAttachments([...attachments, newAttachment.trim()]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-2">
      <button
        onClick={handleAddAttachment}
        className="flex items-center space-x-2 px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
      >
        <Paperclip className="w-4 h-4" />
        <span>Mentionner les pièces jointes</span>
      </button>

      {attachments.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {attachments.map((attachment, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full"
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">
                {attachment}
              </span>
              <button
                onClick={() => removeAttachment(index)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}