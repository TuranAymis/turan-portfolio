import React, { useState, useEffect, useRef } from 'react';
import { HashRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import GamificationBar from './components/Gamification';
import GameOverlay from './components/GameOverlay';
import MatrixIntro from './components/MatrixIntro';
import CommandPalette from './components/CommandPalette';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import SkillsPage from './pages/SkillsPage';
import ExperiencePage from './pages/ExperiencePage';
import ContactPage from './pages/ContactPage';
import { useGameState } from './hooks/useGameState';
import { useQuestSystem } from './hooks/useQuestSystem';
import { useTerminal } from './hooks/useTerminal';
import { useBugs } from './hooks/useBugs';
import { ViewState, Language } from './types';
import { TRANSLATIONS, getQuests } from './constants';
import { handleRunTestSuite } from './utils/testSuiteHandler';
import { 
  Globe, 
  Terminal as TermIcon, 
  Code, 
  AlertCircle, 
  Menu, 
  Trophy, 
  Bug 
} from 'lucide-react';

const App: React.FC = () => {
  // --- STATE ---
  const [showIntro, setShowIntro] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [visitedViews, setVisitedViews] = useState<Set<ViewState>>(new Set());

  // Translation Helper
  const t = TRANSLATIONS[language];

  // Custom Hooks
  const gameState = useGameState();
  const bugs = useBugs();

  // Create a ref to store handlers that will be set after hooks initialize
  const handlersRef = useRef<{
    addLog?: (message: string, level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' | 'COMMAND') => void;
    updateQuest?: (questId: string, amount?: number) => void;
  }>({});

  const terminal = useTerminal({
    language,
    onNavigate: (view) => {
      if (view === currentView) return;
      setCurrentView(view);
      handlersRef.current.addLog?.(`Navigating to ./${view}`, 'INFO');
      
      if (!visitedViews.has(view)) {
        const newVisited = new Set(visitedViews);
        newVisited.add(view);
        setVisitedViews(newVisited);
        
        const newCoverage = (newVisited.size / 5) * 100;
        gameState.setCoverage(newCoverage);
        gameState.gainXp(50);
        handlersRef.current.updateQuest?.('q3', 1);
        
        if (newVisited.size === 5) {
          gameState.triggerAchievement("Full Coverage", 500, handlersRef.current.addLog);
        }
      }
    },
    onRunTests: () => {
      handleRunTestSuite(undefined, {
        addLog: terminal.addLog,
        spawnFloatText: gameState.spawnFloatText,
        triggerAchievement: (title, xpReward) => gameState.triggerAchievement(title, xpReward, terminal.addLog),
        updateQuest: handlersRef.current.updateQuest || (() => {}),
        setIsTerminalOpen,
        isTerminalOpen,
      });
    },
  });
  
  const questSystem = useQuestSystem({
    initialQuests: getQuests(t),
    onQuestComplete: () => {},
    onGainXp: (amount) => {
      gameState.gainXp(amount, undefined, undefined, (newLevel) => {
        gameState.spawnToast(`${t.levelUp} ${newLevel}`, '', 'level-up');
        terminal.addLog(`LEVEL UP! You are now Level ${newLevel}`, 'SUCCESS');
      });
    },
    onSpawnToast: gameState.spawnToast,
    onLog: terminal.addLog,
    t,
  });

  // Update handlers ref
  useEffect(() => {
    handlersRef.current.addLog = terminal.addLog;
    handlersRef.current.updateQuest = questSystem.updateQuest;
  }, [terminal.addLog, questSystem.updateQuest]);

  // Re-initialize quests when language changes
  useEffect(() => {
    const localizedQuests = getQuests(t);
    questSystem.reinitializeQuests(localizedQuests);
  }, [language, t]);

  // --- HELPERS ---

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

  // --- HANDLERS ---

  const handleViewChange = (view: ViewState) => {
    if (view === currentView) return;
    
    setCurrentView(view);
    terminal.addLog(`Navigating to ./${view}`, 'INFO');
    
    if (!visitedViews.has(view)) {
      const newVisited = new Set(visitedViews);
      newVisited.add(view);
      setVisitedViews(newVisited);
      
      const newCoverage = (newVisited.size / 5) * 100;
      gameState.setCoverage(newCoverage);
      gameState.gainXp(50);
      questSystem.updateQuest('q3', 1);
      
      if (newVisited.size === 5) {
        gameState.triggerAchievement("Full Coverage", 500, terminal.addLog);
      }
    }
  };

  const handleRunTests = (e?: React.MouseEvent) => {
    handleRunTestSuite(e, {
      addLog: terminal.addLog,
      spawnFloatText: gameState.spawnFloatText,
      triggerAchievement: (title, xpReward) => gameState.triggerAchievement(title, xpReward, terminal.addLog),
      updateQuest: questSystem.updateQuest,
      setIsTerminalOpen,
      isTerminalOpen,
    });
  };

  const handleSkillClick = (e: React.MouseEvent, skillName: string) => {
    gameState.spawnFloatText(`Running ${skillName}...`, e.clientX, e.clientY, 'text-emerald-300');
    gameState.gainXp(10, e.clientX, e.clientY - 20);
  };

  const handleCatchBug = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    bugs.catchBug(id);
    terminal.addLog('BUG SQUASHED! Fixed UI glitch.', 'SUCCESS');
    gameState.spawnFloatText('BUG SQUASHED!', e.clientX, e.clientY, 'text-red-500');
    gameState.spawnFloatText('+100 XP', e.clientX, e.clientY - 30, 'text-yellow-400');
    
    gameState.gainXp(100);
    questSystem.updateQuest('q2', 1);
    
    const uncaughtBugs = bugs.getUncaughtBugs();
    if (uncaughtBugs.length === 0) {
      gameState.triggerAchievement('Bug Hunter', 200, terminal.addLog);
    }
  };

  // Icon helpers
  const FileTextIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
    </svg>
  );

  const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10"/>
      <line x1="15" y1="9" x2="9" y2="15"/>
      <line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
  );

  if (showIntro) {
    return <MatrixIntro />;
  }

  return (
    <HashRouter>
      <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden selection:bg-blue-500/30 cursor-default" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* GAME VISUAL LAYER */}
        <GameOverlay 
          floatingTexts={gameState.floatingTexts} 
          toasts={gameState.toasts} 
          onToastClick={gameState.dismissToast} 
          t={t} 
        />
        
        {/* Mobile Header Bar */}
        <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-[#0f172a] border-b border-ide-border z-30 flex items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-400 hover:text-white">
              <Menu size={24} />
            </button>
            <span className="font-bold text-sm tracking-tight text-white">QA_WORKSPACE</span>
          </div>
          
          <div className="flex items-center gap-3">
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
              currentView={currentView} 
              changeView={handleViewChange} 
              t={t} 
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
              level={gameState.level} 
              xp={gameState.xp} 
              nextLevelXp={gameState.level * 1000} 
              coverage={gameState.coverage} 
              achievements={gameState.unlockedAchievements.length} 
              activeQuest={questSystem.activeQuest}
              t={t}
              className="w-[85%] max-w-[320px] h-full relative z-10 animate-in slide-in-from-right duration-200 bg-slate-900 border-l border-ide-border"
              onClose={() => setIsStatsOpen(false)}
            />
          </div>
        )}

        {/* Desktop Sidebar */}
        <div className="hidden md:block">
          <Sidebar currentView={currentView} changeView={handleViewChange} t={t} />
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
                  {currentView === ViewState.CONTACT && <AlertCircle size={12} />}
                  {t[`nav${currentView === 'overview' ? 'Overview' : currentView === 'about.md' ? 'About' : currentView === 'skills.spec.ts' ? 'Skills' : currentView === 'history.log' ? 'History' : 'Contact'}`]}
                </div>
                <span className="absolute right-2 top-2 hover:bg-slate-700 rounded p-0.5 cursor-pointer text-slate-500">
                  <XCircleIcon />
                </span>
              </div>
            </div>

            {/* Language Switcher */}
            <div className="flex items-center gap-1 mb-1 mr-2">
              <Globe size={14} className="text-slate-500 mr-1" />
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-slate-800 text-slate-300 text-xs border border-slate-700 rounded px-2 py-0.5 outline-none focus:border-blue-500"
              >
                <option value="en">English</option>
                <option value="tr">Türkçe</option>
                <option value="es">Español</option>
                <option value="zh">中文</option>
                <option value="hi">हिन्दी</option>
                <option value="ar">العربية</option>
              </select>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="h-8 bg-[#1e293b] border-b border-ide-border flex items-center px-4 text-xs text-slate-500 font-mono shrink-0 select-none hidden md:flex" dir="ltr">
            portfolio &gt; src &gt; pages &gt; <span className="text-slate-300 ml-1">{currentView}</span>
          </div>

          {/* Viewport */}
          <div className={`flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 scroll-smooth relative transition-all duration-300 ${isTerminalOpen ? 'pb-80' : 'pb-24'}`} id="main-scroll">
            <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
              {currentView === ViewState.HOME && (
                <HomePage 
                  t={t}
                  onRunTests={handleRunTests}
                  onNavigate={handleViewChange}
                />
              )}
              {currentView === ViewState.ABOUT && (
                <AboutPage 
                  t={t} 
                  level={gameState.level} 
                  xp={gameState.xp}
                  onSpawnFloatText={gameState.spawnFloatText}
                />
              )}
              {currentView === ViewState.SKILLS && (
                <SkillsPage 
                  t={t}
                  onSkillClick={handleSkillClick}
                />
              )}
              {currentView === ViewState.EXPERIENCE && (
                <ExperiencePage 
                  t={t}
                  language={language}
                  onSpawnFloatText={gameState.spawnFloatText}
                  onAddLog={terminal.addLog}
                />
              )}
              {currentView === ViewState.CONTACT && (
                <ContactPage 
                  t={t}
                  onAddLog={terminal.addLog}
                  onTriggerAchievement={(title, xpReward) => gameState.triggerAchievement(title, xpReward, terminal.addLog)}
                  onSpawnToast={gameState.spawnToast}
                />
              )}
            </div>

            {/* Bug Hunt Overlay */}
            {bugs.bugs.map(bug => !bug.isCaught && (
              <button 
                key={bug.id}
                onClick={(e) => handleCatchBug(e, bug.id)}
                className="absolute hover:text-red-400 text-slate-600 transition-all hover:scale-125 animate-pulse z-0"
                style={{ top: bug.top, left: bug.left }}
                title="Click to squash!"
              >
                <Bug size={14} />
              </button>
            ))}
          </div>

          {/* Interactive Terminal */}
          <Terminal 
            logs={terminal.logs} 
            isOpen={isTerminalOpen} 
            toggleOpen={() => setIsTerminalOpen(!isTerminalOpen)} 
            onCommand={terminal.handleCommand}
            t={t}
          />
        </div>

        {/* Desktop Gamification Sidebar (HUD) */}
        <div className="hidden lg:block w-72 shrink-0">
          <GamificationBar 
            level={gameState.level} 
            xp={gameState.xp} 
            nextLevelXp={gameState.level * 1000} 
            coverage={gameState.coverage} 
            achievements={gameState.unlockedAchievements.length} 
            activeQuest={questSystem.activeQuest}
            t={t}
            className="h-full border-l border-ide-border"
          />
        </div>
        
        {/* Command Palette Overlay */}
        <CommandPalette 
          isOpen={showCmdPalette}
          onClose={() => setShowCmdPalette(false)}
          onRunTests={handleRunTests}
          onNavigate={handleViewChange}
        />
      </div>
    </HashRouter>
  );
};

export default App;
