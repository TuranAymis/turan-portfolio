import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Language, TranslationDictionary } from '../types';
import { TRANSLATIONS } from '../constants';

interface LocaleContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: TranslationDictionary;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export const useLocaleContext = () => {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocaleContext must be used within a LocaleProvider');
    }
    return context;
};

interface LocaleProviderProps {
    children: ReactNode;
}

export const LocaleProvider: React.FC<LocaleProviderProps> = ({ children }) => {
    const [language, setLanguage] = useState<Language>('en');
    const t = TRANSLATIONS[language];

    return (
        <LocaleContext.Provider value={{ language, setLanguage, t }}>
            {children}
        </LocaleContext.Provider>
    );
};
