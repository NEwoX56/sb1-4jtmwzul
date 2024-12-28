import React, { useCallback, useState } from 'react';
import { Upload, X, FileText } from 'lucide-react';
import { useStore } from '../../store/useStore';

const ACCEPTED_FILE_TYPES = '.pdf,.doc,.docx,.txt,.rtf';

const TONE_OPTIONS = [
  { value: 'professional', label: 'Professionnel' },
  { value: 'casual', label: 'Décontracté' },
  { value: 'friendly', label: 'Amical' }
] as const;

export function LearningFilesSettings() {
  const { learningFiles, addLearningFile, removeLearningFile } = useStore();
  const [selectedTone, setSelectedTone] = useState<typeof TONE_OPTIONS[number]['value']>('professional');

  const handleToneSelect = (e: React.MouseEvent, tone: typeof TONE_OPTIONS[number]['value']) => {
    e.preventDefault(); // Empêche la fermeture de la modale
    setSelectedTone(tone);
  };

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of files) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        addLearningFile({
          name: file.name,
          type: file.type,
          content,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          tone: selectedTone
        });
      };
      reader.readAsText(file);
    }
  }, [addLearningFile, selectedTone]);

  const filesByTone = learningFiles.reduce((acc, file) => {
    if (!acc[file.tone]) {
      acc[file.tone] = [];
    }
    acc[file.tone].push(file);
    return acc;
  }, {} as Record<string, typeof learningFiles>);

  return (
    <section className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
        Fichiers d'apprentissage
      </h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Sélectionnez le style d'écriture
          </label>
          <div className="flex space-x-4">
            {TONE_OPTIONS.map(({ value, label }) => (
              <button
                key={value}
                onClick={(e) => handleToneSelect(e, value)}
                type="button" // Empêche la soumission du formulaire
                className={`px-4 py-2 rounded-lg transition-all ${
                  selectedTone === value
                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300'
                    : 'bg-white text-gray-700 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Ajoutez vos emails précédents pour que l'IA apprenne votre style d'écriture.
            Formats acceptés : PDF, DOC, DOCX, TXT, RTF
          </p>

          <label className="flex flex-col items-center px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <Upload className="w-8 h-8 text-gray-400" />
            <span className="mt-2 text-sm text-gray-500">
              Cliquez pour ajouter des fichiers ({TONE_OPTIONS.find(t => t.value === selectedTone)?.label})
            </span>
            <input
              type="file"
              className="hidden"
              multiple
              accept={ACCEPTED_FILE_TYPES}
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {Object.entries(filesByTone).map(([tone, files]) => (
        <div key={tone} className="space-y-2">
          <h4 className="font-medium text-gray-700 dark:text-gray-300">
            {TONE_OPTIONS.find(t => t.value === tone)?.label} ({files.length} fichiers)
          </h4>
          <div className="space-y-2">
            {files.map((file) => (
              <div
                key={file.name + file.uploadedAt}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(file.uploadedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    removeLearningFile(file.name);
                  }}
                  type="button"
                  className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}