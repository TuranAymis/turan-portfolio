import React, { createContext, useContext, useState, useEffect } from 'react';
import { Bug, ViewState } from '../types';
import { useGame } from './GameContext';
import { useTerminalContext } from './TerminalContext';

interface BugContextType {
    bugs: Bug[];
    catchBug: (id: string) => void;
    activeBugs: Bug[]; // Bugs for the current view
    setCurrentView: (view: ViewState) => void;
}

const BugContext = createContext<BugContextType | undefined>(undefined);

import { useAppContext } from './AppContext';

export const useBugContext = () => {
    const context = useContext(BugContext);
    if (!context) {
        throw new Error('useBugContext must be used within a BugProvider');
    }
    return context;
};

// --- PREDEFINED BUGS ---
const INITIAL_BUGS: Bug[] = [
    {
        id: 'bug-1-home-hero',
        type: 'visual',
        difficulty: 'easy',
        title: 'Misaligned Header',
        description: 'The header margin was off by 2px due to a CSS specificity war.',
        location: ViewState.HOME,
        isCaught: false,
        xpReward: 150,
        top: '15%',
        left: '85%',
        style: { transform: 'rotate(2deg)' },
        glitchEffect: 'animate-pulse text-red-500'
    },
    {
        id: 'bug-2-about-img',
        type: 'visual',
        difficulty: 'medium',
        title: 'Corrupted Asset',
        description: 'The avatar image had a corrupted byte sequence.',
        location: ViewState.ABOUT,
        isCaught: false,
        xpReward: 300,
        top: '25%',
        left: '20%',
        style: { filter: 'hue-rotate(90deg)' }
    },
    {
        id: 'bug-3-skills-overflow',
        type: 'functional',
        difficulty: 'hard',
        title: 'Stack Overflow',
        description: 'Recursive loop detected in skill rendering logic.',
        location: ViewState.SKILLS,
        isCaught: false,
        xpReward: 500,
        top: '60%',
        left: '50%',
        glitchEffect: 'animate-bounce'
    },
    {
        id: 'bug-4-global-term',
        type: 'console',
        difficulty: 'medium',
        title: 'Memory Leak',
        description: 'Terminal buffer was not getting garbage collected.',
        location: 'global',
        isCaught: false,
        xpReward: 250,
        top: '95%',
        left: '95%'
    }
];

export const BugProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [bugs, setBugs] = useState<Bug[]>(INITIAL_BUGS);
    const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);

    // Hooks from other contexts
    const { gainXp, spawnToast, triggerAchievement } = useGame();
    const { addLog } = useTerminalContext();
    const { triggerUpdateQuest } = useAppContext();

    const catchBug = (id: string) => {
        const bug = bugs.find(b => b.id === id);
        if (!bug || bug.isCaught) return;

        // Update State
        setBugs(prev => prev.map(b => b.id === id ? { ...b, isCaught: true } : b));

        // Rewards
        gainXp(bug.xpReward);
        triggerUpdateQuest('q2', 1);
        spawnToast(`BUG CAUGHT: ${bug.title}`, `+${bug.xpReward} XP`, 'achievement');
        addLog(`[FIX] Applied patch for ${bug.title}: ${bug.description}`, 'SUCCESS');

        // Check for specific achievements
        const caughtCount = bugs.filter(b => b.isCaught).length + 1; // +1 because state update is async
        if (caughtCount === 1) {
            triggerAchievement('First Squash', 100, addLog);
        } else if (caughtCount === bugs.length) {
            triggerAchievement('Exterminator', 1000, addLog);
        }
    };

    // Filter relevant bugs
    const activeBugs = bugs.filter(b =>
        !b.isCaught && (b.location === 'global' || b.location === currentView)
    );

    return (
        <BugContext.Provider value={{ bugs, catchBug, activeBugs, setCurrentView }}>
            {children}
        </BugContext.Provider>
    );
};
