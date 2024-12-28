import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Save, Edit2 } from 'lucide-react';

export function SignatureEditor() {
  const { settings, updateSettings } = useStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedSignature, setEditedSignature] = useState({
    firstName: settings.personal.firstName,
    lastName: settings.personal.lastName,
    email: settings.personal.email,
    title: settings.personal.title || '',
    company: settings.personal.company || '',
    phone: settings.personal.phone || ''
  });

  const handleSave = () => {
    updateSettings({
      personal: {
        ...settings.personal,
        ...editedSignature
      }
    });
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <div className="mt-4 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Aperçu de la signature
          </h4>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Edit2 className="w-4 h-4" />
          </button>
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <p>Cordialement,</p>
          <p className="mt-2">{settings.personal.firstName} {settings.personal.lastName}</p>
          {settings.personal.title && <p>{settings.personal.title}</p>}
          {settings.personal.company && <p>{settings.personal.company}</p>}
          {settings.personal.email && <p>{settings.personal.email}</p>}
          {settings.personal.phone && <p>{settings.personal.phone}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-4 p-4 border border-gray-200 rounded-lg dark:border-gray-700">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Modifier la signature
        </h4>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Save className="w-4 h-4" />
          <span>Enregistrer</span>
        </button>
      </div>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            value={editedSignature.firstName}
            onChange={(e) => setEditedSignature({...editedSignature, firstName: e.target.value})}
            placeholder="Prénom"
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
          <input
            type="text"
            value={editedSignature.lastName}
            onChange={(e) => setEditedSignature({...editedSignature, lastName: e.target.value})}
            placeholder="Nom"
            className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <input
          type="text"
          value={editedSignature.title}
          onChange={(e) => setEditedSignature({...editedSignature, title: e.target.value})}
          placeholder="Titre / Fonction"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="text"
          value={editedSignature.company}
          onChange={(e) => setEditedSignature({...editedSignature, company: e.target.value})}
          placeholder="Entreprise"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="email"
          value={editedSignature.email}
          onChange={(e) => setEditedSignature({...editedSignature, email: e.target.value})}
          placeholder="Email"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
        <input
          type="tel"
          value={editedSignature.phone}
          onChange={(e) => setEditedSignature({...editedSignature, phone: e.target.value})}
          placeholder="Téléphone"
          className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />
      </div>
    </div>
  );
}