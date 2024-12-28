import React from 'react';
import { useStore } from '../store/useStore';
import { platforms } from '../config/platforms';
import { 
  GmailFeatures,
  LinkedInFeatures,
  TwitterFeatures,
  InstagramFeatures,
  YoutubeFeatures
} from './platform-features';

export function MessageInput() {
  const { message, setMessage, selectedPlatform, intention, setIntention } = useStore();
  const platform = platforms.find(p => p.id === selectedPlatform);

  const renderPlatformFeatures = () => {
    if (!selectedPlatform) return null;

    switch (selectedPlatform) {
      case 'gmail':
        return <GmailFeatures />;
      case 'linkedin':
        return <LinkedInFeatures />;
      case 'twitter':
        return <TwitterFeatures />;
      case 'instagram':
        return <InstagramFeatures />;
      case 'youtube':
        return <YoutubeFeatures />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="intention"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Intention de réponse
          </label>
        </div>
        <input
          id="intention"
          type="text"
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white mb-4"
          placeholder="Ex: Répondre poliment à une réclamation..."
          value={intention}
          onChange={(e) => setIntention(e.target.value)}
        />

        <div className="flex justify-between items-center mb-2">
          <label
            htmlFor="message"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            Contenu du message
          </label>
          {platform?.maxLength && (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {message.length} / {platform.maxLength}
            </span>
          )}
        </div>
        <textarea
          id="message"
          rows={6}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-600 dark:text-white"
          placeholder="Collez votre message ici..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={platform?.maxLength}
        />
      </div>

      {renderPlatformFeatures()}
    </div>
  );
}