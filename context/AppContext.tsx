import React, { createContext, useContext, ReactNode } from 'react';
import { Language, TranslationDictionary, ViewState, Quest } from '../types';
import { TRANSLATIONS } from '../constants';

interface AppContextType {
    registerNavigate: (fn: (view: ViewState) => void) => void;
    registerRunTests: (fn: () => void) => void;
    registerUpdateQuest: (fn: (questId: string, amount?: number) => void) => void;
    triggerUpdateQuest: (questId: string, amount?: number) => void;
    isFeedbackOpen: boolean;
    setFeedbackOpen: (isOpen: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider'); // or GameProviderWrapper
    }
    return context;
};

export default AppContext;
