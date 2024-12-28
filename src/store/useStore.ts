import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Platform, ToneType, ResponseLength } from '../types';
import type { APIKeys, AIProvider } from '../types/api';
import type { LearningFile } from '../types/files';

interface UserPreferences {
  tone: ToneType;
  responseLength: ResponseLength;
  includeSignature: boolean;
  darkMode: boolean;
}

interface UserSettings {
  personal: {
    firstName: string;
    lastName: string;
    email: string;
    title?: string;
    company?: string;
    phone?: string;
  };
}

interface Store {
  // Platform
  selectedPlatform: Platform | null;
  setSelectedPlatform: (platform: Platform) => void;
  
  // Message
  message: string;
  setMessage: (message: string) => void;
  intention: string;
  setIntention: (intention: string) => void;
  emailSender: string;
  setEmailSender: (sender: string) => void;
  
  // Response
  generatedResponse: string | null;
  setGeneratedResponse: (response: string | null) => void;
  isGenerating: boolean;
  setIsGenerating: (isGenerating: boolean) => void;
  
  // Preferences & Settings
  preferences: UserPreferences;
  updatePreferences: (preferences: Partial<UserPreferences>) => void;
  settings: UserSettings;
  updateSettings: (settings: Partial<UserSettings>) => void;
  
  // API
  apiKeys: APIKeys;
  updateAPIKey: (provider: AIProvider, key: string) => void;
  selectedProvider: AIProvider;
  setSelectedProvider: (provider: AIProvider) => void;
  
  // UI State
  isSettingsOpen: boolean;
  setIsSettingsOpen: (isOpen: boolean) => void;
  
  // Attachments
  attachments: string[];
  setAttachments: (attachments: string[]) => void;

  // Learning Files
  learningFiles: LearningFile[];
  addLearningFile: (file: LearningFile) => void;
  removeLearningFile: (fileName: string) => void;
}

const defaultPreferences: UserPreferences = {
  tone: 'professional',
  responseLength: 'medium',
  includeSignature: true,
  darkMode: false
};

const defaultSettings: UserSettings = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    title: '',
    company: '',
    phone: ''
  }
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      // Platform
      selectedPlatform: null,
      setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
      
      // Message
      message: '',
      setMessage: (message) => set({ message }),
      intention: '',
      setIntention: (intention) => set({ intention }),
      emailSender: '',
      setEmailSender: (sender) => set({ emailSender: sender }),
      
      // Response
      generatedResponse: null,
      setGeneratedResponse: (response) => set({ generatedResponse: response }),
      isGenerating: false,
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      
      // Preferences & Settings
      preferences: defaultPreferences,
      updatePreferences: (newPreferences) => 
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        })),
      settings: defaultSettings,
      updateSettings: (newSettings) =>
        set((state) => ({
          settings: {
            ...state.settings,
            ...newSettings,
            personal: {
              ...state.settings.personal,
              ...(newSettings.personal || {})
            }
          }
        })),
      
      // API
      apiKeys: {},
      updateAPIKey: (provider, key) =>
        set((state) => ({
          apiKeys: { ...state.apiKeys, [provider]: key }
        })),
      selectedProvider: 'mixtral',
      setSelectedProvider: (provider) => set({ selectedProvider: provider }),
      
      // UI State
      isSettingsOpen: false,
      setIsSettingsOpen: (isOpen) => set({ isSettingsOpen: isOpen }),
      
      // Attachments
      attachments: [],
      setAttachments: (attachments) => set({ attachments }),

      // Learning Files
      learningFiles: [],
      addLearningFile: (file) =>
        set((state) => ({
          learningFiles: [...state.learningFiles, file]
        })),
      removeLearningFile: (fileName) =>
        set((state) => ({
          learningFiles: state.learningFiles.filter(f => f.name !== fileName)
        }))
    }),
    {
      name: 'owenreply-storage'
    }
  )
);