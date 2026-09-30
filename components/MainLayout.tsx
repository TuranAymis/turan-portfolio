import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import Terminal from './Terminal';
import GamificationBar from './Gamification';
import GameOverlay from './GameOverlay';
import CommandPalette from './CommandPalette';
import MatrixIntro from './MatrixIntro';
import { useQuestSystem } from '../hooks/useQuestSystem';
// import { useBugs } from '../hooks/useBugs'; // Replaced by BugContext
import { useGame } from '../context/GameContext';
import { useTerminalContext } from '../context/TerminalContext';
import { useBugContext } from '../context/BugContext';
import BugLayer from './BugLayer';
import PerformanceMonitor from './PerformanceMonitor';
import FeedbackModal from './FeedbackModal';
import { useAppContext } from '../context/AppContext';
import { useLocaleContext } from '../context/LocaleContext';
import { ViewState, type Language } from '../types';
import { getQuests } from '../constants';
import { handleRunTestSuite } from '../utils/testSuiteHandler';
import {
    Globe,
    Terminal as TermIcon,
    Code,
    AlertCircle,
    Menu,
    Trophy,
    Bug,
    FolderGit2,
    X,
    Command
} from 'lucide-react';

// --- ICONS ---
const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);

const VIEW_PATH_MAP: Record<string, ViewState> = {
    '/': ViewState.HOME,
    '/overview': ViewState.HOME,
    '/about': ViewState.ABOUT,
    '/skills': ViewState.SKILLS,
    '/experience': ViewState.EXPERIENCE,
    '/projects': ViewState.PROJECTS,
    '/contact': ViewState.CONTACT
};

const MainLayout: React.FC = () => {
    const { registerNavigate, registerRunTests, registerUpdateQuest } = useAppContext();
    const { language, setLanguage, t } = useLocaleContext();
    const location = useLocation();
    const navigate = useNavigate();

    // Determine current view from path
    const currentPath = location.pathname;
    const currentView = VIEW_PATH_MAP[currentPath] || ViewState.HOME;

    // --- STATE ---
    const [visitedViews, setVisitedViews] = useState<Set<ViewState>>(new Set());
    const [showIntro, setShowIntro] = useState(true);
    const [showCmdPalette, setShowCmdPalette] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isStatsOpen, setIsStatsOpen] = useState(false);
    const [isTerminalOpen, setIsTerminalOpen] = useState(true);

    // Logic from Contexts
    const { addLog } = useTerminalContext();
    const gameState = useGame();
    // const bugs = useBugs(); // OLD HOOK REPLACED
    const { setCurrentView: setBugView } = useBugContext();


    // Sync View with BugContext
    useEffect(() => {
        setBugView(currentView);
    }, [currentView, setBugView]);

    // Initialize Quest System
    const questSystem = useQuestSystem({
        initialQuests: getQuests(language),
        onQuestComplete: () => { },
        onGainXp: (amount) => {
            gameState.gainXp(amount, undefined, undefined, (newLevel) => {
                gameState.spawnToast(`${t.levelUp} ${newLevel}`, '', 'level-up');
                addLog(`LEVEL UP! You are now Level ${newLevel}`, 'SUCCESS');
            });
        },
        onSpawnToast: gameState.spawnToast,
        onLog: addLog,
        t,
    });

    // Re-initialize quests when language changes
    useEffect(() => {
        const localizedQuests = getQuests(language);
        questSystem.reinitializeQuests(localizedQuests);
    }, [language, t]);

    // Track Visited Views & Navigation Effects
    useEffect(() => {
        addLog(`Navigating to ./${currentView}`, 'INFO');

        if (!visitedViews.has(currentView)) {
            const newVisited = new Set(visitedViews);
            newVisited.add(currentView);
            setVisitedViews(newVisited);

            const newCoverage = (newVisited.size / 6) * 100;
            gameState.setCoverage(newCoverage);
            gameState.gainXp(50);
            questSystem.updateQuest('q1', 1); // Cypress Scout: Visit pages

            if (newVisited.size === 6) {
                gameState.triggerAchievement("Full Coverage", 500, addLog);
            }
        }
    }, [currentView]);

    // Sync 'Grand Master' Quest with Achievements
    const unlockedCount = gameState.unlockedAchievements.length;
    useEffect(() => {
        if (questSystem.activeQuest?.id === 'q4') {
            // Check if current progress matches unlocked achievements
            const discrepancy = unlockedCount - questSystem.activeQuest.current;
            if (discrepancy > 0) {
                questSystem.updateQuest('q4', discrepancy);
            }
        }
    }, [unlockedCount, questSystem.activeQuest, questSystem.updateQuest]);

    // Polyglot Tester Quest: Track language changes
    const languageChangedRef = useRef(false);
    useEffect(() => {
        // Complete quest on first language change (from default 'en')
        if (!languageChangedRef.current && language !== 'en') {
            languageChangedRef.current = true;
            questSystem.updateQuest('q4', 1); // Polyglot Tester quest
        }
    }, [language, questSystem.updateQuest]);

    // Handle Programmatic Navigation (from Terminal)
    const handleProgrammaticNavigate = (view: ViewState) => {
        // Map view to path
        let path = '/';
        switch (view) {
            case ViewState.HOME: path = '/'; break;
            case ViewState.ABOUT: path = '/about'; break;
            case ViewState.SKILLS: path = '/skills'; break;
            case ViewState.EXPERIENCE: path = '/experience'; break;
            case ViewState.PROJECTS: path = '/projects'; break;
            case ViewState.CONTACT: path = '/contact'; break;
        }
        navigate(path);
    };

    // Main Test Handler
    const handleRunTests = (e?: React.MouseEvent) => {
        handleRunTestSuite(e, {
            addLog: addLog,
            spawnFloatText: gameState.spawnFloatText,
            triggerAchievement: (title, xpReward) => gameState.triggerAchievement(title, xpReward, addLog),
            t,
            setIsTerminalOpen,
            isTerminalOpen,
        });
    };

    // Register Handlers for TerminalProvider
    useEffect(() => {
        registerNavigate(handleProgrammaticNavigate);
        registerRunTests(() => handleRunTests());
        registerUpdateQuest(questSystem.updateQuest);
    }, [navigate, questSystem.updateQuest]);


    // Intro Timer
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowIntro(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    // Command Palette Keyboard Shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setShowCmdPalette(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    if (showIntro) {
        return <MatrixIntro />;
    }

    return (
        <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden selection:bg-blue-500/30 cursor-default">

            {/* Intro Animation */}
            {showIntro && <MatrixIntro />}

            {/* BUG HUNT OVERLAY FRAME (Global) */}
            <BugLayer />

            {/* GAME VISUAL LAYER */}
            <GameOverlay
                onToastClick={(id) => gameState.toasts.find(toast => toast.id === id)?.type === 'quest' ? setIsStatsOpen(true) : null}
            />
            <FeedbackModal />

            {/* PERFORMANCE MONITORING (Headless) */}
            <PerformanceMonitor />

            {/* Mobile Header Bar */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0f172a] border-b border-ide-border z-30 flex items-center justify-between px-4">
                <div className="flex items-center gap-3">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-400 hover:text-white">
                        <Menu size={24} />
                    </button>
                    <span className="font-bold text-sm tracking-tight text-white">{t.workspaceTitle}</span>
                </div>

                <div className="flex items-center gap-3">
                    {/* Language switcher (the desktop one lives in the desktop-only top bar) */}
                    <div className="flex items-center gap-1">
                        <Globe size={14} className="text-slate-500" />
                        <select
                            aria-label="Language"
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as Language)}
                            className="bg-slate-800 text-slate-300 text-xs border border-slate-700 rounded px-1.5 py-0.5 outline-none focus:border-blue-500"
                        >
                            <option value="en">EN</option>
                            <option value="tr">TR</option>
                        </select>
                    </div>
                    <button
                        onClick={() => setShowCmdPalette(true)}
                        title={t.openCmdPalette}
                        aria-label={t.openCmdPalette}
                        className="text-slate-400 hover:text-white"
                    >
                        <Command size={20} />
                    </button>
                    <button onClick={() => setIsStatsOpen(true)} className="text-yellow-500 hover:text-yellow-400 relative">
                        <Trophy size={20} />
                        {questSystem.activeQuest && !questSystem.activeQuest.isCompleted && (
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>
                    <Sidebar
                        className="w-[80%] max-w-[300px] h-full relative z-10 shadow-2xl animate-in slide-in-from-left duration-200"
                        onClose={() => setIsMobileMenuOpen(false)}
                    />
                </div>
            )}

            {/* Mobile Stats Overlay */}
            {isStatsOpen && (
                <div className="fixed inset-0 z-50 md:hidden flex justify-end">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsStatsOpen(false)}></div>
                    <GamificationBar
                        activeQuest={questSystem.activeQuest}
                        className="w-[85%] max-w-[320px] h-full relative z-10 animate-in slide-in-from-right duration-200 bg-slate-900 border-l border-ide-border"
                        onClose={() => setIsStatsOpen(false)}
                    />
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-full relative pt-14 md:pt-0">

                {/* Desktop Top Bar (Hidden on Mobile) */}
                <div className="hidden md:flex h-9 bg-[#0f172a] border-b border-ide-border items-end justify-between px-2 gap-1 shrink-0 select-none">
                    <div className="flex items-end gap-1 overflow-x-auto">
                        <div className="px-4 py-1.5 bg-[#1e293b] text-blue-400 text-xs font-mono border-t-2 border-blue-500 rounded-t flex items-center gap-2 pr-8 relative">
                            <div className="flex items-center gap-2">
                                {currentView === ViewState.HOME && <TermIcon size={12} />}
                                {currentView === ViewState.ABOUT && <FileTextIcon />}
                                {currentView === ViewState.SKILLS && <Code size={12} />}
                                {currentView === ViewState.EXPERIENCE && <TermIcon size={12} />}
                                {currentView === ViewState.PROJECTS && <FolderGit2 size={12} />}
                                {currentView === ViewState.CONTACT && <AlertCircle size={12} />}
                                {t[`nav${currentView === 'overview' ? 'Overview' : currentView === 'about.md' ? 'About' : currentView === 'skills.spec.ts' ? 'Skills' : currentView === 'history.log' ? 'History' : currentView === 'projects.json' ? 'Projects' : 'Contact'}`]}
                            </div>
                            <span className="absolute right-2 top-2 hover:bg-slate-700 rounded p-0.5 cursor-pointer text-slate-500">
                                <XCircleIcon />
                            </span>
                        </div>
                    </div>

                    {/* Right Controls */}
                    <div className="flex items-center gap-2 mb-1 mr-2">
                        {/* Command Palette Trigger */}
                        <button
                            onClick={() => setShowCmdPalette(true)}
                            title={t.openCmdPalette}
                            aria-label={t.openCmdPalette}
                            className="flex items-center gap-1.5 text-slate-400 hover:text-white hover:bg-[#1e293b] rounded px-2 py-1 transition-colors"
                        >
                            <Command size={14} />
                            <span className="hidden lg:flex items-center gap-1">
                                <kbd className="text-[10px] font-mono border border-ide-border rounded px-1 py-0.5 bg-slate-800 text-slate-400">Ctrl</kbd>
                                <kbd className="text-[10px] font-mono border border-ide-border rounded px-1 py-0.5 bg-slate-800 text-slate-400">K</kbd>
                            </span>
                        </button>

                        {/* Language Switcher */}
                        <div className="flex items-center gap-1">
                            <Globe size={14} className="text-slate-500 mr-1" />
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value as any)}
                            className="bg-slate-800 text-slate-300 text-xs border border-slate-700 rounded px-2 py-0.5 outline-none focus:border-blue-500"
                        >
                            <option value="en">English</option>
                            <option value="tr">Türkçe</option>
                        </select>
                        </div>
                    </div>
                </div>

                {/* Breadcrumbs */}
                <div className="h-8 bg-[#1e293b] border-b border-ide-border flex items-center px-4 text-xs text-slate-500 font-mono shrink-0 select-none hidden md:flex" dir="ltr">
                    portfolio &gt; src &gt; pages &gt; <span className="text-slate-300 ml-1">{currentView}</span>
                </div>

                {/* Viewport */}
                <div className={`flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth relative transition-all duration-300 ${isTerminalOpen ? 'pb-48 md:pb-80' : 'pb-20 md:pb-24'}`} id="main-scroll">
                    <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
                        <Outlet />
                    </div>
                </div>

                {/* Interactive Terminal */}
                <Terminal
                    isOpen={isTerminalOpen}
                    toggleOpen={() => setIsTerminalOpen(!isTerminalOpen)}
                />
            </div>

            {/* Desktop Gamification Sidebar (HUD) */}
            <div className="hidden lg:block w-72 shrink-0">
                {/* Gamification Bar */}
                <GamificationBar
                    activeQuest={questSystem.activeQuest}
                    className="h-full border-r border-[#1e293b]"
                />
            </div>

            {/* Command Palette Overlay */}
            <CommandPalette
                isOpen={showCmdPalette}
                onClose={() => setShowCmdPalette(false)}
            />
        </div>
    );
};

export default MainLayout;
