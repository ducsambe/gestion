import React from 'react';
import { Globe } from 'lucide-react';
import { Language } from '../types';

interface LanguageSwitcherProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ language, onLanguageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-5 h-5 text-white" />
      <div className="flex rounded-lg overflow-hidden border border-white border-opacity-30">
        <button
          onClick={() => onLanguageChange('fr')}
          className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
            language === 'fr' 
              ? 'bg-white text-blue-900' 
              : 'text-white hover:bg-white hover:bg-opacity-10'
          }`}
        >
          FR
        </button>
        <button
          onClick={() => onLanguageChange('en')}
          className={`px-3 py-1 text-sm font-medium transition-all duration-200 ${
            language === 'en' 
              ? 'bg-white text-blue-900' 
              : 'text-white hover:bg-white hover:bg-opacity-10'
          }`}
        >
          EN
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;