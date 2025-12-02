
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { HashRouter } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Terminal from './components/Terminal';
import GamificationBar from './components/Gamification';
import GameOverlay from './components/GameOverlay';
import MatrixIntro from './components/MatrixIntro';
import { ViewState, LogEntry, Achievement, Quest, FloatingText, ToastNotification, Language, ProjectDetail } from './types';
import { getInitialLogs, SKILLS, getExperience, getQuests, TRANSLATIONS } from './constants';
import { 
  Play, 
  CheckCircle, 
  AlertCircle, 
  Github, 
  Linkedin, 
  Mail, 
  Phone,
  Code,
  Globe,
  Terminal as TermIcon,
  Search,
  Bug,
  Zap,
  MousePointer2,
  ChevronDown,
  ChevronUp,
  FolderOpen,
  Activity,
  FileCode,
  User,
  Brain,
  Scroll,
  Users,
  Dna,
  Package,
  Shield,
  Target,
  Cpu,
  Wifi,
  Lock,
  Send,
  Radio
} from 'lucide-react';

const App: React.FC = () => {
  // --- STATE ---
  const [showIntro, setShowIntro] = useState(true);
  const [language, setLanguage] = useState<Language>('en');
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [isTerminalOpen, setIsTerminalOpen] = useState(true);
  const [showCmdPalette, setShowCmdPalette] = useState(false);
  
  // Contact Form State
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  
  // Translation Helper
  const t = TRANSLATIONS[language];
  
  // Game State
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [coverage, setCoverage] = useState(0);
  const [visitedViews, setVisitedViews] = useState<Set<ViewState>>(new Set());
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [quests, setQuests] = useState<Quest[]>(getQuests(t));
  const [activeQuest, setActiveQuest] = useState<Quest | null>(quests[0]);
  const [expandedJobIds, setExpandedJobIds] = useState<Set<string>>(new Set());
  
  // Visual Effects State
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);
  
  // Bug Hunt State
  const [bugs, setBugs] = useState([
    { id: 'bug-nav', top: '12%', left: '85%', isCaught: false },
    { id: 'bug-term', top: '92%', left: '25%', isCaught: false },
    { id: 'bug-hero', top: '35%', left: '10%', isCaught: false },
  ]);

  // --- HELPERS ---

  // Intro Timer
  useEffect(() => {
    const timer = setTimeout(() => {
        setShowIntro(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Re-initialize quests when language changes (keeping progress)
  useEffect(() => {
    const localizedQuests = getQuests(t);
    setQuests(prev => localizedQuests.map((nq, i) => ({
        ...nq,
        current: prev[i]?.current || 0,
        isCompleted: prev[i]?.isCompleted || false
    })));
  }, [language]);

  const addLog = useCallback((message: string, level: LogEntry['level'] = 'INFO') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { timestamp, level, message }]);
  }, []);

  // Spawn Floating Text (Damage numbers)
  const spawnFloatText = (text: string, x: number, y: number, color = 'text-white') => {
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(ft => ft.id !== id));
    }, 1000);
  };

  // Spawn Toast
  const spawnToast = (title: string, subtitle: string, type: ToastNotification['type']) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, subtitle, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Update Quest Progress
  const updateQuest = (questId: string, amount: number = 1) => {
    setQuests(prev => {
        return prev.map(q => {
            if (q.id === questId && !q.isCompleted) {
                const newCurrent = Math.min(q.current + amount, q.target);
                const isFinished = newCurrent >= q.target;
                
                if (isFinished) {
                    // Quest Completion Logic
                    setTimeout(() => {
                        gainXp(q.rewardXp);
                        spawnToast(q.title, `${t.questComp}! +${q.rewardXp} XP`, 'quest');
                        addLog(`QUEST COMPLETE: ${q.title}`, 'SUCCESS');
                        
                        // Set next quest
                        const nextQ = prev.find(nq => nq.id !== q.id && !nq.isCompleted);
                        if (nextQ) setActiveQuest(nextQ);
                        else setActiveQuest(null);
                    }, 500);
                }
                
                return { ...q, current: newCurrent, isCompleted: isFinished };
            }
            return q;
        });
    });
  };

  // Sync Active Quest UI
  useEffect(() => {
    const active = quests.find(q => !q.isCompleted);
    setActiveQuest(active || null);
  }, [quests]);

  const gainXp = (amount: number, x?: number, y?: number) => {
    setXp(prev => {
      const newXp = prev + amount;
      const threshold = level * 1000; // Increased scaling for "Game Feel"
      if (newXp >= threshold) {
        setLevel(l => l + 1);
        spawnToast(`${t.levelUp} ${level + 1}`, '', 'level-up');
        addLog(`LEVEL UP! You are now Level ${level + 1}`, 'SUCCESS');
      }
      return newXp;
    });
    
    if (x && y) {
        spawnFloatText(`+${amount} XP`, x, y, 'text-emerald-400');
    }
  };

  const triggerAchievement = (title: string, xpReward: number) => {
    if (unlockedAchievements.some(a => a.title === title)) return;

    addLog(`ACHIEVEMENT UNLOCKED: ${title}`, 'SUCCESS');
    spawnToast(title, t.achUnlocked, 'achievement');
    
    setUnlockedAchievements(prev => [...prev, { id: Date.now().toString(), title, description: '', icon: null, unlocked: true, xpValue: xpReward }]);
    gainXp(xpReward);
  };

  // --- GAMEPLAY LOGIC ---

  const runTestSuite = async (e?: React.MouseEvent) => {
    if (e) spawnFloatText('Running...', e.clientX, e.clientY, 'text-blue-400');
    if (!isTerminalOpen) setIsTerminalOpen(true);
    addLog('Initializing Test Suite...', 'INFO');
    
    await new Promise(r => setTimeout(r, 800));
    
    for (const skill of SKILLS.slice(0, 5)) {
        addLog(`TEST: Verifying proficiency in ${skill.name}...`, 'INFO');
        await new Promise(r => setTimeout(r, 200));
        addLog(`PASS: Proficiency detected at ${skill.level}%`, 'SUCCESS');
    }
    
    addLog('SUITE RESULT: 5/5 TESTS PASSED', 'SUCCESS');
    triggerAchievement('Automation Master', 150);
    updateQuest('q1', 1);
  };

  const handleViewChange = (view: ViewState) => {
    if (view === currentView) return;
    
    setCurrentView(view);
    addLog(`Navigating to ./${view}`, 'INFO');
    
    if (!visitedViews.has(view)) {
      const newVisited = new Set(visitedViews);
      newVisited.add(view);
      setVisitedViews(newVisited);
      
      const newCoverage = (newVisited.size / 5) * 100;
      setCoverage(newCoverage);
      gainXp(50);
      updateQuest('q3', 1);
      
      if (newVisited.size === 5) {
        triggerAchievement("Full Coverage", 500);
      }
    }
  };

  const toggleJobDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(expandedJobIds);
    if (next.has(id)) {
        next.delete(id);
    } else {
        next.add(id);
        spawnFloatText('Opening Log...', e.clientX, e.clientY, 'text-blue-300');
        addLog(`Expanding details for job: ${id}`, 'COMMAND');
    }
    setExpandedJobIds(next);
  };

  const handleCommand = (cmdInput: string) => {
    const cmd = cmdInput.trim().toLowerCase();
    addLog(cmdInput, 'COMMAND');

    switch (cmd) {
        case 'help':
            addLog('Available commands:', 'INFO');
            addLog('  run-tests   - Execute automation suite', 'INFO');
            addLog('  goto <page> - Navigate (home, about, skills, exp, contact)', 'INFO');
            addLog('  clear       - Clear terminal', 'INFO');
            break;
        case 'clear':
            setLogs([]);
            break;
        case 'run-tests':
        case 'test':
            runTestSuite();
            break;
        case 'whoami':
            addLog('User: Guest (Recruiter/Visitor)', 'INFO');
            addLog('Role: Evaluating Turan Aymis', 'INFO');
            break;
        case 'goto home': handleViewChange(ViewState.HOME); break;
        case 'goto about': handleViewChange(ViewState.ABOUT); break;
        case 'goto skills': handleViewChange(ViewState.SKILLS); break;
        case 'goto exp': handleViewChange(ViewState.EXPERIENCE); break;
        case 'goto contact': handleViewChange(ViewState.CONTACT); break;
        default:
            addLog(`Command not found: ${cmd}.`, 'ERROR');
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault(); 
    
    // 1. Gamification Effects
    addLog('Uplink established. Data transmitted.', 'SUCCESS'); 
    triggerAchievement('Social Butterfly', 100); 
    spawnToast('Uplink Successful', t.sentSuccess, 'achievement'); 
    
    // 2. Prepare Mailto Link
    const subject = `[QA Portfolio] Transmission from ${contactName}`;
    const body = `Name: ${contactName}\nEmail: ${contactEmail}\n\nMessage:\n${contactMessage}`;
    const mailtoLink = `mailto:turanaymis@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    // 3. Open Email Client
    window.location.href = mailtoLink;

    // 4. Clear Form
    setContactName('');
    setContactEmail('');
    setContactMessage('');
  };

  const catchBug = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setBugs(prev => prev.map(b => b.id === id ? { ...b, isCaught: true } : b));
    addLog('BUG SQUASHED! Fixed UI glitch.', 'SUCCESS');
    spawnFloatText('BUG SQUASHED!', e.clientX, e.clientY, 'text-red-500');
    spawnFloatText('+100 XP', e.clientX, e.clientY - 30, 'text-yellow-400');
    
    gainXp(100);
    updateQuest('q2', 1);
    
    if (bugs.filter(b => !b.isCaught).length === 1) { // This was the last one
        triggerAchievement('Bug Hunter', 200);
    }
  };

  // --- EFFECTS ---

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

  // Initial Load Logs
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    getInitialLogs(language).forEach((log, index) => {
      setTimeout(() => {
        addLog(log, 'INFO');
      }, index * 600);
    });
    // Don't auto-navigate if just switching language
    // handleViewChange(ViewState.HOME);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (showIntro) {
    return <MatrixIntro />;
  }

  // --- RENDERERS ---

  const renderHome = () => (
    <div className="max-w-5xl mx-auto pt-10 animate-in fade-in duration-700">
      
      {/* SYSTEM HEADER */}
      <div className="flex items-center justify-between mb-6 text-xs font-mono text-emerald-500 border-b border-emerald-500/30 pb-2 uppercase tracking-widest">
        <span className="flex items-center gap-2"><Activity size={14} className="animate-pulse" /> {t.sysStatus}: ONLINE</span>
        <span>ID: TURAN_AYMIS_QA</span>
      </div>

      {/* MISSION BRIEFING CARD */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-8 relative overflow-hidden group shadow-2xl">
        {/* Background Scanline */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
        <div className="absolute top-0 right-0 p-4 opacity-20"><Cpu size={120} className="text-blue-500 animate-pulse-slow" /></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
            <div className="flex-1">
                <h3 className="text-blue-400 font-mono text-sm mb-2 flex items-center gap-2">
                    <Target size={16} /> {t.missionBrief}
                </h3>
                
                <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter uppercase glitch-effect">
                    TURAN AYMIS
                </h1>
                
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded text-blue-400 font-mono text-sm mb-6">
                    <Shield size={14} /> {t.role}
                </div>
                
                <div className="text-slate-300 text-lg leading-relaxed mb-8 border-l-2 border-slate-600 pl-4">
                    <span className="text-slate-500 font-mono text-xs block mb-1">{t.currentObj}</span>
                    {t.summary}
                </div>

                {/* ACTION BUTTONS */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button 
                    onClick={(e) => runTestSuite(e)}
                    className="relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded clip-path-polygon transition-all hover:translate-x-1 group/btn"
                    >
                        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
                        <div className="flex items-center gap-3 relative z-10">
                            <Play size={20} className="fill-current" />
                            <span className="tracking-widest">{t.missionStart}</span>
                        </div>
                    </button>

                    <button 
                    onClick={() => handleViewChange(ViewState.SKILLS)}
                    className="bg-slate-800 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white font-bold py-4 px-8 rounded transition-all hover:translate-x-1 flex items-center gap-3"
                    >
                        <Code size={20} />
                        <span className="tracking-widest">{t.viewSpecs}</span>
                    </button>
                </div>
            </div>

            {/* PROFILE IMAGE */}
            <div className="hidden md:block relative shrink-0 group/img w-48 h-48 mt-4">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover/img:opacity-50 transition duration-1000"></div>
                <img 
                    src="https://github.com/TuranAymis.png" 
                    alt="Turan Aymis Profile"
                    className="relative w-full h-full rounded-lg object-cover border-2 border-slate-700 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
                />
                {/* Tech Deco */}
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
            </div>
        </div>
      </div>

      {/* STATS DECK */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
         {/* Experience Card */}
         <div className="bg-slate-900 border-l-4 border-l-purple-500 border-y border-r border-slate-700 p-4 rounded-r hover:bg-slate-800 transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase">{t.experience}</span>
                <Activity size={16} className="text-purple-500" />
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors">{t.expLabel}</div>
            <div className="w-full bg-slate-800 h-1 mt-3 rounded-full overflow-hidden">
                <div className="bg-purple-500 h-full w-[85%]"></div>
            </div>
         </div>

         {/* Frameworks Card */}
         <div className="bg-slate-900 border-l-4 border-l-blue-500 border-y border-r border-slate-700 p-4 rounded-r hover:bg-slate-800 transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase">{t.frameworks}</span>
                <TermIcon size={16} className="text-blue-500" />
            </div>
            <div className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors truncate">Selenium / Appium</div>
            <div className="flex gap-1 mt-3">
                {[1,2,3,4,5].map(i => <div key={i} className="h-1 flex-1 bg-blue-500/50 rounded-full"></div>)}
            </div>
         </div>

         {/* Methodology Card */}
         <div className="bg-slate-900 border-l-4 border-l-amber-500 border-y border-r border-slate-700 p-4 rounded-r hover:bg-slate-800 transition-colors group">
            <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-mono text-slate-500 uppercase">{t.methodology}</span>
                <Users size={16} className="text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">{t.agileLabel}</div>
            <div className="text-xs text-slate-500 mt-2 font-mono">SYNCED: 100%</div>
         </div>
      </div>

    </div>
  );

  const renderAbout = () => (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700">
      <div className="flex items-center gap-2 mb-6 text-slate-500 font-mono text-sm border-b border-ide-border pb-2">
         <FileTextIcon /> <span>{t.charSheet}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* LEFT COLUMN: Character Profile & Stats */}
        <div className="lg:col-span-4 space-y-6">
            
            {/* CHARACTER CARD */}
            <div className="bg-slate-900 border-2 border-slate-700 rounded-xl overflow-hidden shadow-2xl relative">
                <div className="bg-slate-800 p-4 border-b border-slate-700 flex flex-col items-center">
                    <div className="w-24 h-24 bg-slate-700 rounded-full mb-3 flex items-center justify-center border-4 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] overflow-hidden">
                        <img src="https://github.com/TuranAymis.png" alt="Character Avatar" className="w-full h-full object-cover" />
                    </div>
                    <h2 className="text-xl font-bold text-white">Turan Aymis</h2>
                    <span className="text-xs text-emerald-400 font-mono bg-emerald-900/30 px-2 py-0.5 rounded border border-emerald-500/30 mt-1">
                        Lvl.{level} QA Engineer
                    </span>
                </div>
                <div className="p-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1 font-mono">
                        <span>XP Progress</span>
                        <span>{Math.floor((xp % 1000) / 10)}%</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-700">
                        <div className="bg-blue-500 h-full transition-all duration-300" style={{ width: `${(xp % 1000) / 10}%` }}></div>
                    </div>
                </div>
            </div>

            {/* ATTRIBUTES BLOCK */}
            <div className="bg-slate-900 border border-slate-700 rounded-xl p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center gap-2 mb-4 border-b border-slate-700 pb-2">
                    <Dna size={18} className="text-purple-400" />
                    <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider">{t.stats}</h3>
                </div>
                
                <div className="space-y-4">
                    {[
                        { label: t.attributes.int, val: 18, color: 'bg-blue-500', icon: Brain },
                        { label: t.attributes.wis, val: 16, color: 'bg-indigo-500', icon: Scroll },
                        { label: t.attributes.cha, val: 14, color: 'bg-amber-500', icon: Users },
                        { label: t.attributes.dex, val: 17, color: 'bg-emerald-500', icon: Zap }
                    ].map((stat, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-xs text-slate-400 mb-1">
                                <span className="flex items-center gap-1.5"><stat.icon size={12} /> {stat.label}</span>
                                <span className="text-white font-mono">{stat.val}</span>
                            </div>
                            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                                <div className={`${stat.color} h-full`} style={{ width: `${(stat.val / 20) * 100}%` }}></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        {/* RIGHT COLUMN: Lore & Inventory */}
        <div className="lg:col-span-8 space-y-6">
            
            {/* LORE / BIO */}
            <div className="bg-slate-900/50 border border-slate-700 rounded-xl p-6 relative">
                 <div className="flex items-center gap-2 mb-4 text-slate-400">
                    <Scroll size={18} />
                    <h3 className="text-sm font-bold uppercase tracking-wider">{t.lore}</h3>
                 </div>
                 <div className="font-serif text-slate-300 leading-7 text-lg italic border-l-2 border-slate-700 pl-4">
                    "{t.summary}"
                 </div>
            </div>

            {/* INVENTORY / EDUCATION */}
            <div>
                <div className="flex items-center gap-2 mb-4 text-slate-400 px-2">
                    <Package size={18} />
                    <h3 className="text-sm font-bold uppercase tracking-wider">{t.inventory} ({t.equipped})</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                        className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex gap-4 items-center hover:border-blue-500 transition-colors cursor-help group relative overflow-hidden"
                        onClick={(e) => spawnFloatText('+10 INT', e.clientX, e.clientY, 'text-blue-400')}
                    >
                        <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center border border-slate-600 group-hover:border-blue-500">
                             <CheckCircle className="text-emerald-500" size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-blue-400">{t.bachelor}</h4>
                            <p className="text-xs text-slate-500">{t.bachelorDesc}</p>
                            <span className="text-[10px] text-emerald-500 uppercase font-mono mt-1 block">Rarity: Rare</span>
                        </div>
                    </div>

                    <div 
                        className="bg-slate-900 border border-slate-700 rounded-lg p-4 flex gap-4 items-center hover:border-purple-500 transition-colors cursor-help group relative overflow-hidden"
                        onClick={(e) => spawnFloatText('+15 WIS', e.clientX, e.clientY, 'text-purple-400')}
                    >
                        <div className="w-12 h-12 bg-slate-800 rounded flex items-center justify-center border border-slate-600 group-hover:border-purple-500">
                             <CheckCircle className="text-emerald-500" size={24} />
                        </div>
                        <div>
                            <h4 className="text-sm font-bold text-white group-hover:text-purple-400">{t.cs50}</h4>
                            <p className="text-xs text-slate-500">{t.cs50Desc}</p>
                            <span className="text-[10px] text-purple-500 uppercase font-mono mt-1 block">Rarity: Legendary</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>

      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8 border-b border-ide-border pb-4">
            <div className="flex items-center gap-2">
                <Code className="text-blue-500" />
                <h2 className="text-xl font-bold">{t.skillsTitle}</h2>
            </div>
            <span className="text-xs font-mono bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20 animate-pulse">
                PASSING: {SKILLS.length}/{SKILLS.length}
            </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {SKILLS.map((skill) => (
                <div 
                    key={skill.id} 
                    className="group bg-[#0f172a] border border-slate-700 rounded-lg overflow-hidden hover:border-blue-500 transition-all duration-300 cursor-pointer relative shadow-md hover:scale-[1.02] hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                    onClick={(e) => {
                        spawnFloatText(`Running ${skill.name}...`, e.clientX, e.clientY, 'text-emerald-300');
                        gainXp(10, e.clientX, e.clientY - 20);
                    }}
                >
                    {/* Test Card Header */}
                    <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
                        <span className="font-mono text-xs font-bold text-slate-300 flex items-center gap-2">
                            <Activity size={12} className="text-blue-400" /> 
                            {skill.id}.spec.ts
                        </span>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                            <div className="w-2.5 h-2.5 rounded-full bg-slate-600"></div>
                        </div>
                    </div>

                    {/* Test Content (Mock Console) */}
                    <div className="p-4 font-mono text-xs bg-[#0a0f18] h-32 flex flex-col justify-between relative">
                        <div className="space-y-1 text-slate-400">
                           <div><span className="text-emerald-500">➜</span> exec <span className="text-yellow-400">{skill.name}</span>_suite</div>
                           <div><span className="text-blue-500">INFO:</span> Initializing environment...</div>
                           <div><span className="text-blue-500">INFO:</span> Loading mocks...</div>
                           <div><span className="text-emerald-500">SUCCESS:</span> Dependencies loaded.</div>
                           <div className="text-emerald-400 mt-2 font-bold opacity-80 group-hover:opacity-100 transition-opacity">
                                ✓ {t.lastRun}
                           </div>
                        </div>

                        {/* Stamp */}
                        {skill.isMastered && (
                            <div className="absolute right-2 bottom-2 rotate-[-15deg] opacity-20 group-hover:opacity-50 transition-opacity border-2 border-emerald-500 text-emerald-500 px-2 py-0.5 rounded font-black text-lg uppercase tracking-widest pointer-events-none">
                                CERTIFIED
                            </div>
                        )}
                    </div>

                    {/* Footer / Metrics */}
                    <div className="bg-slate-900 border-t border-slate-800 px-4 py-2 flex items-center justify-between">
                         <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${skill.level > 85 ? 'bg-emerald-500' : 'bg-yellow-500'} animate-pulse`}></div>
                             <span className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">{t.suiteStability}</span>
                         </div>
                         <span className={`font-mono font-bold ${skill.level > 85 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                             {skill.level}%
                         </span>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  const renderExperience = () => (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-2 mb-8 text-slate-500 font-mono text-sm border-b border-ide-border pb-2">
         <TermIcon size={16} /> <span>{t.deploymentLog}</span>
      </div>

      <div className="space-y-8 relative pl-6 border-l-2 border-slate-700 ml-2">
        {getExperience(language).map((job) => {
            const isExpanded = expandedJobIds.has(job.id);
            return (
            <div key={job.id} className="relative animate-in slide-in-from-bottom-4 duration-500 group">
                <div className="absolute -left-[33px] top-0 w-5 h-5 rounded-full bg-slate-900 border-4 border-blue-500 group-hover:scale-125 transition-transform group-hover:border-emerald-400"></div>
                
                <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 hover:border-slate-500 transition-all hover:shadow-lg">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-4">
                        <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{job.role}</h3>
                            <h4 className="text-lg text-slate-300">{job.company}</h4>
                        </div>
                        <div className="text-right">
                            <div className="text-sm font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded inline-block">{job.period}</div>
                            <div className="text-xs text-slate-500 mt-1">{job.location}</div>
                        </div>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                        {job.description.map((item, i) => (
                            <li key={i} className="flex gap-2 text-slate-300 text-sm">
                                <span className="text-blue-500 mt-1">➜</span>
                                {item}
                            </li>
                        ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {job.techStack.map(tech => (
                            <span 
                                key={tech} 
                                className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-400 hover:text-white hover:border-blue-500 transition-colors cursor-default"
                                onMouseEnter={(e) => spawnFloatText(tech, e.clientX, e.clientY, 'text-xs text-slate-400')}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    {/* EXPANSION BUTTON */}
                    <button 
                        onClick={(e) => toggleJobDetails(job.id, e)}
                        className={`flex items-center gap-2 text-sm font-bold px-4 py-2 rounded transition-colors w-full border border-dashed ${isExpanded ? 'bg-slate-800 text-blue-400 border-blue-500/50' : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-800'}`}
                    >
                        {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        {isExpanded ? t.hideDetails : t.viewProject}
                    </button>

                    {/* EXPANDED CONTENT */}
                    {isExpanded && job.projects && (
                        <div className="mt-4 pl-4 border-l-2 border-blue-500/30 space-y-4 animate-in slide-down duration-300 overflow-hidden">
                            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 uppercase tracking-wider mb-2">
                                <FolderOpen size={14} /> {t.keyAccomplishments}
                            </div>
                            
                            {job.projects.map((proj, idx) => (
                                <div key={idx} className="bg-[#0b1120] p-4 rounded border border-slate-800 relative group/proj">
                                    <h5 className="font-bold text-blue-400 text-sm mb-1">{proj.title}</h5>
                                    <p className="text-xs text-slate-400 mb-2">{proj.desc}</p>
                                    <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono bg-emerald-500/5 px-2 py-1 rounded w-fit">
                                        <Zap size={12} />
                                        {t.impact} {proj.impact}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        )})}
      </div>
    </div>
  );

  const renderContact = () => (
    <div className="max-w-3xl mx-auto pt-4 animate-in fade-in duration-700">
         
         {/* CONSOLE HEADER */}
         <div className="bg-slate-900 border border-slate-700 rounded-t-xl p-3 flex items-center justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-500/5 z-0"></div>
            <div className="flex items-center gap-3 relative z-10">
                <Wifi size={18} className="text-emerald-400 animate-pulse" />
                <span className="font-mono text-sm font-bold text-emerald-400 tracking-widest uppercase">{t.commsTitle}</span>
            </div>
            <div className="flex items-center gap-2 relative z-10">
                <div className="flex flex-col gap-0.5 items-end">
                    <span className="text-[10px] text-slate-500 font-mono uppercase">{t.signalStrength}</span>
                    <div className="flex gap-0.5">
                        <div className="w-1 h-3 bg-emerald-500 rounded-sm"></div>
                        <div className="w-1 h-3 bg-emerald-500 rounded-sm"></div>
                        <div className="w-1 h-3 bg-emerald-500 rounded-sm"></div>
                        <div className="w-1 h-3 bg-emerald-500/30 rounded-sm animate-pulse"></div>
                    </div>
                </div>
            </div>
         </div>
         
         {/* MAIN CONSOLE BODY */}
         <div className="bg-[#0a0f18] border-x border-b border-slate-700 rounded-b-xl p-8 shadow-2xl relative overflow-hidden">
            {/* Scanline Background */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>
            
            <div className="relative z-10 space-y-6">
                
                {/* Security Badge */}
                <div className="flex items-center justify-center mb-6">
                    <div className="bg-slate-900/80 border border-slate-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-slate-400">
                        <Lock size={12} className="text-emerald-500" />
                        <span>{t.encryption}</span>
                    </div>
                </div>

                <form className="space-y-6" onSubmit={handleContactSubmit}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2 group">
                            <label className="text-[10px] text-blue-400 font-mono uppercase tracking-widest flex items-center gap-2">
                                <User size={12} /> {t.sourceId}
                            </label>
                            <input 
                                type="text"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                className="w-full bg-slate-900/50 border-b-2 border-slate-700 text-slate-200 font-mono p-2 focus:border-blue-500 focus:bg-slate-900 transition-all outline-none placeholder-slate-700" 
                                placeholder="IDENT_CODE_OR_NAME" 
                                required 
                            />
                        </div>
                        <div className="space-y-2 group">
                            <label className="text-[10px] text-blue-400 font-mono uppercase tracking-widest flex items-center gap-2">
                                <Radio size={12} /> {t.commFreq}
                            </label>
                            <input 
                                type="email"
                                value={contactEmail}
                                onChange={(e) => setContactEmail(e.target.value)} 
                                className="w-full bg-slate-900/50 border-b-2 border-slate-700 text-slate-200 font-mono p-2 focus:border-blue-500 focus:bg-slate-900 transition-all outline-none placeholder-slate-700" 
                                placeholder="USER@DOMAIN.COM" 
                                required 
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-[10px] text-blue-400 font-mono uppercase tracking-widest flex items-center gap-2">
                            <FileCode size={12} /> {t.dataPayload}
                        </label>
                        <textarea 
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            className="w-full bg-slate-900/50 border-2 border-slate-700 rounded text-slate-200 font-mono p-4 focus:border-blue-500 focus:bg-slate-900 transition-all outline-none h-32 placeholder-slate-700 resize-none" 
                            placeholder="> INITIATE TRANSMISSION SEQUENCE..." 
                            required
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded transition-all active:scale-[0.98]"
                    >
                        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="flex items-center justify-center gap-3 relative z-10">
                            <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            <span className="tracking-[0.2em]">{t.initiateUpload}</span>
                        </div>
                    </button>
                </form>

            </div>
         </div>

         {/* FREQUENCY LINKS */}
         <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
                { label: 'GITHUB_UPLINK', icon: Github, href: 'https://github.com/TuranAymis', color: 'hover:border-white hover:text-white' },
                { label: 'LINKEDIN_FEED', icon: Linkedin, href: 'https://linkedin.com/in/turan-aymis/', color: 'hover:border-blue-400 hover:text-blue-400' },
                { label: 'DIRECT_EMAIL', icon: Mail, href: 'mailto:turanaymis@gmail.com', color: 'hover:border-amber-400 hover:text-amber-400' },
                { label: 'VOICE_CHANNEL', icon: Phone, href: 'tel:+905069402813', color: 'hover:border-purple-400 hover:text-purple-400' }
             ].map((link, i) => (
                 <a 
                    key={i} 
                    href={link.href} 
                    target="_blank" 
                    rel="noreferrer" 
                    className={`flex flex-col items-center gap-2 p-4 bg-slate-900/80 border border-slate-700 rounded text-slate-500 transition-all hover:bg-slate-800 hover:-translate-y-1 group ${link.color}`}
                 >
                    <link.icon size={20} className="transition-colors" />
                    <span className="text-[10px] font-mono tracking-wider">{link.label}</span>
                 </a>
             ))}
         </div>
    </div>
  );

  // Icon helper
  const FileTextIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
  );

  // Command Palette Component
  const CommandPalette = () => (
    <div className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-32 backdrop-blur-sm" onClick={() => setShowCmdPalette(false)}>
        <div className="bg-slate-900 w-[500px] rounded-lg border border-slate-700 shadow-2xl p-2 animate-in fade-in slide-in-from-top-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-700 mb-2 text-slate-400">
                <Search size={16} />
                <input 
                    autoFocus 
                    placeholder="Type a command or search..." 
                    className="bg-transparent border-none outline-none flex-1 text-slate-200"
                />
                <span className="text-xs border border-slate-700 px-1.5 rounded bg-slate-800">ESC</span>
            </div>
            <div className="space-y-1">
                {[
                    { label: 'Run Automation Suite', action: () => { runTestSuite(); setShowCmdPalette(false); }, icon: Play },
                    { label: 'Go to Overview', action: () => { handleViewChange(ViewState.HOME); setShowCmdPalette(false); }, icon: TermIcon },
                    { label: 'View Skills', action: () => { handleViewChange(ViewState.SKILLS); setShowCmdPalette(false); }, icon: Code },
                ].map((item, i) => (
                    <button key={i} onClick={item.action} className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-blue-600/20 hover:text-blue-400 rounded text-sm text-slate-300 transition-colors group">
                        <item.icon size={14} className="group-hover:text-blue-400" />
                        {item.label}
                    </button>
                ))}
            </div>
        </div>
    </div>
  );

  return (
    <HashRouter>
      <div className="flex h-screen w-full bg-[#0f172a] text-slate-200 font-sans overflow-hidden selection:bg-blue-500/30 cursor-default" dir={language === 'ar' ? 'rtl' : 'ltr'}>
        
        {/* GAME VISUAL LAYER */}
        <GameOverlay floatingTexts={floatingTexts} toasts={toasts} onToastClick={dismissToast} t={t} />
        
        {/* Navigation Sidebar */}
        <div className="hidden md:block">
            <Sidebar currentView={currentView} changeView={handleViewChange} t={t} />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col h-full relative">
          
          {/* Top Bar with Tabs and Lang Switcher */}
          <div className="h-9 bg-[#0f172a] border-b border-ide-border flex items-end justify-between px-2 gap-1 shrink-0 select-none">
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
          <div className="h-8 bg-[#1e293b] border-b border-ide-border flex items-center px-4 text-xs text-slate-500 font-mono shrink-0 select-none" dir="ltr">
            portfolio &gt; src &gt; pages &gt; <span className="text-slate-300 ml-1">{currentView}</span>
          </div>

          {/* Viewport */}
          <div className={`flex-1 overflow-y-auto p-8 scroll-smooth relative transition-all duration-300 ${isTerminalOpen ? 'pb-80' : 'pb-24'}`} id="main-scroll">
             <div className="animate-in fade-in duration-500 slide-in-from-bottom-2">
                {currentView === ViewState.HOME && renderHome()}
                {currentView === ViewState.ABOUT && renderAbout()}
                {currentView === ViewState.SKILLS && renderSkills()}
                {currentView === ViewState.EXPERIENCE && renderExperience()}
                {currentView === ViewState.CONTACT && renderContact()}
             </div>

             {/* Bug Hunt Overlay */}
             {bugs.map(bug => !bug.isCaught && (
                <button 
                    key={bug.id}
                    onClick={(e) => catchBug(e, bug.id)}
                    className="absolute hover:text-red-400 text-slate-600 transition-all hover:scale-125 animate-pulse"
                    style={{ top: bug.top, left: bug.left }}
                    title="Click to squash!"
                >
                    <Bug size={14} />
                </button>
             ))}
          </div>

          {/* Interactive Terminal */}
          <Terminal 
            logs={logs} 
            isOpen={isTerminalOpen} 
            toggleOpen={() => setIsTerminalOpen(!isTerminalOpen)} 
            onCommand={handleCommand}
            t={t}
          />
        </div>

        {/* Gamification Sidebar (HUD) */}
        <GamificationBar 
            level={level} 
            xp={xp} 
            nextLevelXp={level * 1000} 
            coverage={coverage} 
            achievements={unlockedAchievements.length} 
            activeQuest={activeQuest}
            t={t}
        />
        
        {/* Command Palette Overlay */}
        {showCmdPalette && <CommandPalette />}
        
        {/* Mobile Nav Button */}
        <div className="md:hidden fixed top-4 right-4 z-50">
            <button 
                className="bg-blue-600 p-2 rounded-full shadow-lg text-white"
                onClick={() => {
                    const views = Object.values(ViewState);
                    const idx = views.indexOf(currentView);
                    const next = views[(idx + 1) % views.length];
                    handleViewChange(next);
                }}
            >
                <Globe size={24} />
            </button>
        </div>
      </div>
    </HashRouter>
  );
};

// Simple Icon
const XCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
);

export default App;
