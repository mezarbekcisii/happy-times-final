import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../locales/translations';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Check localStorage first, then browser language, default to Turkish
    const savedLang = localStorage.getItem('happytime-language');
    if (savedLang && translations[savedLang]) {
      return savedLang;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (translations[browserLang]) {
      return browserLang;
    }
    
    return 'tr'; // Default to Turkish
  });

  const changeLanguage = (langCode) => {
    if (translations[langCode]) {
      setCurrentLanguage(langCode);
      localStorage.setItem('happytime-language', langCode);
      
      // Update document direction for RTL languages
      document.dir = translations[langCode].direction;
      document.documentElement.lang = langCode;
    }
  };

  const t = (key) => {
    const keys = key.split('.');
    let translation = translations[currentLanguage];
    
    for (const k of keys) {
      if (translation && typeof translation === 'object') {
        translation = translation[k];
      } else {
        // Fallback to English if translation not found
        let fallback = translations.en;
        for (const fk of keys) {
          if (fallback && typeof fallback === 'object') {
            fallback = fallback[fk];
          } else {
            return key; // Return key if no translation found
          }
        }
        return fallback || key;
      }
    }
    
    return translation || key;
  };

  const getAvailableLanguages = () => {
    return Object.entries(translations).map(([code, lang]) => ({
      code,
      name: lang.name,
      flag: lang.flag,
      direction: lang.direction
    }));
  };

  const getCurrentLanguageInfo = () => {
    return {
      code: currentLanguage,
      name: translations[currentLanguage].name,
      flag: translations[currentLanguage].flag,
      direction: translations[currentLanguage].direction
    };
  };

  useEffect(() => {
    // Set document direction and language on load
    document.dir = translations[currentLanguage].direction;
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  const value = {
    currentLanguage,
    changeLanguage,
    t,
    getAvailableLanguages,
    getCurrentLanguageInfo,
    isRTL: translations[currentLanguage].direction === 'rtl'
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Language Selector Component
export const LanguageSelector = ({ className = '' }) => {
  const { currentLanguage, changeLanguage, getAvailableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const availableLanguages = getAvailableLanguages();

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all duration-200"
      >
        <span className="text-lg">{translations[currentLanguage].flag}</span>
        <span className="text-sm font-medium">{translations[currentLanguage].name}</span>
        <svg 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-64 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-white/20 z-50 max-h-80 overflow-y-auto">
          <div className="p-2">
            <div className="text-xs font-semibold text-gray-600 px-3 py-2 uppercase tracking-wide">
              Select Language / Dil Seçin
            </div>
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  changeLanguage(lang.code);
                  setIsOpen(false);
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-all duration-200 ${
                  currentLanguage === lang.code
                    ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-md'
                    : 'hover:bg-gray-100 text-gray-700'
                }`}
              >
                <span className="text-lg">{lang.flag}</span>
                <span className="text-sm font-medium">{lang.name}</span>
                {currentLanguage === lang.code && (
                  <span className="ml-auto text-xs">✓</span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default LanguageContext;

