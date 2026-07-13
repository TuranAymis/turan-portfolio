import React, { useState, useRef } from 'react';
import { GameProvider } from '../context/GameContext';
import { TerminalProvider } from '../context/TerminalContext';
import { BugProvider } from '../context/BugContext';
import { HelmetProvider } from 'react-helmet-async';
import AppContext from '../context/AppContext';
import { Language, ViewState } from '../types';
import { TRANSLATIONS } from '../constants';
import { LocaleProvider } from '../context/LocaleContext';

interface GameProviderWrapperProps {
    children: React.ReactNode;
}

const GameProviderWrapper: React.FC<GameProviderWrapperProps> = ({ children }) => {
    // Global State
    // const [language, setLanguage] = useState<Language>('en'); // Moved to LocaleContext
    const [isFeedbackOpen, setFeedbackOpen] = useState(false);
    // const t = TRANSLATIONS[language]; // Moved to LocaleContext

    // References for Cross-Component Communication (Terminal <-> Layout)
    const navigateRef = useRef<(view: ViewState) => void>(() => {});
    const runTestsRef = useRef<() => void>(() => {});
    const updateQuestRef = useRef<(questId: string, amount?: number) => void>(() => {});

    // Registration Functions
    const registerNavigate = (fn: (view: ViewState) => void) => {
        navigateRef.current = fn;
    };

    const registerRunTests = (fn: () => void) => {
        runTestsRef.current = fn;
    };

    const registerUpdateQuest = (fn: (questId: string, amount?: number) => void) => {
        updateQuestRef.current = fn;
    };

    const triggerUpdateQuest = (questId: string, amount?: number) => {
        updateQuestRef.current(questId, amount);
    };

    // Callback Wrappers (consumed by TerminalProvider)
    const handleNavigate = (view: ViewState) => {
        navigateRef.current(view);
    };

    const handleRunTests = () => {
        runTestsRef.current();
    };



    return (
        <HelmetProvider>
            <LocaleProvider>
                <AppContext.Provider value={{
                    registerNavigate,
                    registerRunTests,
                    registerUpdateQuest,
                    triggerUpdateQuest,
                    isFeedbackOpen,
                    setFeedbackOpen
                }}>
                    <GameProvider>
                        <TerminalProvider
                            language={'en'} // Handled by Terminal internal or update TerminalProvider
                            onNavigate={handleNavigate}
                            onRunTests={handleRunTests}
                            updateQuest={triggerUpdateQuest}
                        >
                            <BugProvider>
                                {children}
                            </BugProvider>
                        </TerminalProvider>
                    </GameProvider>
                </AppContext.Provider>
            </LocaleProvider>
        </HelmetProvider>
    );
};

export default GameProviderWrapper;
