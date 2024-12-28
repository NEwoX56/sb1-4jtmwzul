import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Header } from './components/Header';
import { PlatformSelector } from './components/PlatformSelector';
import { MessageInput } from './components/MessageInput';
import { ResponseOptions } from './components/ResponseOptions';
import { ResponseDisplay } from './components/ResponseDisplay';
import { SettingsModal } from './components/SettingsModal';
import { GenerateButton } from './components/GenerateButton';
import { useStore } from './store/useStore';

function App() {
  const { preferences } = useStore();

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors ${
        preferences.darkMode ? 'dark' : ''
      }`}
    >
      <Toaster position="top-right" />
      <Header />
      <SettingsModal />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Generate Your Response
            </h2>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              Select your platform and customize your response settings
            </p>
          </div>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Select Platform
            </h3>
            <PlatformSelector />
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Your Message
            </h3>
            <MessageInput />
          </section>

          <section>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Response Options
            </h3>
            <ResponseOptions />
          </section>

          <section className="flex justify-center">
            <GenerateButton />
          </section>

          <section>
            <ResponseDisplay />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;