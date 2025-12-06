
import React, { createContext, useContext, ReactNode } from 'react';
import { useTerminal } from '../hooks/useTerminal';
import { LogEntry, ViewState, Language } from '../types';

interface TerminalContextType {
    logs: LogEntry[];
    addLog: (message: string, level?: LogEntry['level']) => void;
    handleCommand: (cmd: string) => void;
    clearLogs: () => void;
    onNavigate: (view: ViewState) => void;
    onRunTests: () => void;
}

const TerminalContext = createContext<TerminalContextType | undefined>(undefined);

export const useTerminalContext = () => {
    const context = useContext(TerminalContext);
    if (!context) {
        throw new Error('useTerminalContext must be used within a TerminalProvider');
    }
    return context;
};

interface TerminalProviderProps {
    children: ReactNode;
    language: Language;
    onNavigate: (view: ViewState) => void;
    onRunTests: () => void;
}

export const TerminalProvider: React.FC<TerminalProviderProps> = ({
    children,
    language,
    onNavigate,
    onRunTests
}) => {
    const terminalState = useTerminal({ language, onNavigate, onRunTests });

    return (
        <TerminalContext.Provider value={{ ...terminalState, onNavigate, onRunTests }}>
            {children}
        </TerminalContext.Provider>
    );
};
