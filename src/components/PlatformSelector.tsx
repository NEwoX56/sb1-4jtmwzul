import React from 'react';
import { useStore } from '../store/useStore';
import { platforms } from '../config/platforms';
import { cn } from '../utils/cn';

export function PlatformSelector() {
  const { selectedPlatform, setSelectedPlatform } = useStore();

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {platforms.map(({ id, label, icon: Icon, features }) => {
        const isSelected = selectedPlatform === id;
        
        return (
          <button
            key={id}
            onClick={() => setSelectedPlatform(id)}
            className={cn(
              'flex flex-col items-center p-4 rounded-lg transition-all space-y-2',
              'hover:shadow-md hover:scale-105 transform duration-200',
              isSelected
                ? 'bg-primary text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            )}
          >
            <Icon className={cn(
              'w-8 h-8',
              isSelected ? 'text-white' : 'text-primary dark:text-gray-300'
            )} />
            <span className={cn(
              'font-medium',
              isSelected ? 'text-white' : 'text-gray-900 dark:text-gray-300'
            )}>
              {label}
            </span>
            <div className="text-xs text-center space-y-1">
              {features.slice(0, 2).map((feature) => (
                <div
                  key={feature}
                  className={cn(
                    'px-2 py-0.5 rounded-full',
                    isSelected
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  )}
                >
                  {feature}
                </div>
              ))}
            </div>
          </button>
        );
      })}
    </div>
  );
}