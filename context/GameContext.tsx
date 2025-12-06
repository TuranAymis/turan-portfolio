import React, { createContext, useContext, ReactNode } from 'react';
import { useGameState } from '../hooks/useGameState';
import { Achievement, FloatingText, ToastNotification } from '../types';

interface GameContextType {
    xp: number;
    level: number;
    coverage: number;
    setCoverage: (coverage: number) => void;
    unlockedAchievements: Achievement[];
    setUnlockedAchievements: React.Dispatch<React.SetStateAction<Achievement[]>>;
    floatingTexts: FloatingText[];
    toasts: ToastNotification[];
    spawnFloatText: (text: string, x: number, y: number, color?: string) => void;
    spawnToast: (title: string, subtitle: string, type: ToastNotification['type']) => void;
    dismissToast: (id: number) => void;
    gainXp: (amount: number, x?: number, y?: number, onLevelUp?: (newLevel: number) => void) => void;
    triggerAchievement: (title: string, xpReward: number, onLog?: (message: string, level: string) => void) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const useGame = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};

interface GameProviderProps {
    children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
    const gameState = useGameState();

    return (
        <GameContext.Provider value={gameState}>
            {children}
        </GameContext.Provider>
    );
};
