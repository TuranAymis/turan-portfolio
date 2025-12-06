import React, { useState, useRef } from 'react';
import { GameProvider } from '../context/GameContext';
import { TerminalProvider } from '../context/TerminalContext';
import { BugProvider } from '../context/BugContext';
import { HelmetProvider } from 'react-helmet-async';
import AppContext from '../context/AppContext';
import { Language, ViewState } from '../types';
import { TRANSLATIONS } from '../constants';

interface GameProviderWrapperProps {
    children: React.ReactNode;
}

const GameProviderWrapper: React.FC<GameProviderWrapperProps> = ({ children }) => {
    // Global State
    const [language, setLanguage] = useState<Language>('en');
    const [isFeedbackOpen, setFeedbackOpen] = useState(false);
    const t = TRANSLATIONS[language];

    // References for Cross-Component Communication (Terminal <-> Layout)
    const navigateRef = useRef<(view: ViewState) => void>((v) => console.log("Nav not ready"));
    const runTestsRef = useRef<() => void>(() => console.log("Tests not ready"));

    // Registration Functions
    const registerNavigate = (fn: (view: ViewState) => void) => {
        navigateRef.current = fn;
    };

    const registerRunTests = (fn: () => void) => {
        runTestsRef.current = fn;
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
            <AppContext.Provider value={{
                language,
                setLanguage,
                t,
                registerNavigate,
                registerRunTests,
                isFeedbackOpen,
                setFeedbackOpen
            }}>
                <GameProvider>
                    <TerminalProvider
                        language={language}
                        onNavigate={handleNavigate}
                        onRunTests={handleRunTests}
                    >
                        <BugProvider>
                            {children}
                        </BugProvider>
                    </TerminalProvider>
                </GameProvider>
            </AppContext.Provider>
        </HelmetProvider>
    );
};

export default GameProviderWrapper;
