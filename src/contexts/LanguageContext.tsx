import { getTranslations, translateText } from '@/services/translationService';
import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

type Language = 'en' | 'hi' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translate: (text: string) => Promise<string>;
  isLoading: boolean;
}

const defaultTranslations = {
  en: {
    home: 'Home',
    forecasting: 'Forecasting',
    login: 'Login / Register',
    logout: 'Logout',
    notifications: 'Notifications',
    profile: 'Profile',
    // Add more translations as needed
  },
  hi: {
    home: 'होम',
    forecasting: 'पूर्वानुमान',
    login: 'लॉगिन / रजिस्टर',
    logout: 'लॉग आउट',
    notifications: 'सूचनाएं',
    profile: 'प्रोफ़ाइल',
    // Add more translations as needed
  },
  bn: {
    home: 'হোম',
    forecasting: 'পূর্বাভাস',
    login: 'লগইন / রেজিস্টার',
    logout: 'লগ আউট',
    notifications: 'বিজ্ঞপ্তি',
    profile: 'প্রোফাইল',
    // Add more translations as needed
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');
  const [translations, setTranslations] = useState(defaultTranslations);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadTranslations = async () => {
      setIsLoading(true);
      try {
        const fetchedTranslations = await getTranslations(language);
        setTranslations(prev => ({
          ...prev,
          [language]: {
            ...prev[language],
            ...fetchedTranslations
          }
        }));
      } catch (error) {
        console.error('Error loading translations:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, [language]);

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  const translate = async (text: string) => {
    if (language === 'en') return text;
    return await translateText(text, 'en', language);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, translate, isLoading }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 