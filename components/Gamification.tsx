import React, { useState, useEffect } from 'react';
import { Trophy, Zap, Shield, Target, Lightbulb, Terminal, CheckCircle2 } from 'lucide-react';
import { Quest, TranslationDictionary } from '../types';

interface GamificationProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  coverage: number;
  achievements: number;
  activeQuest: Quest | null;
  t: TranslationDictionary;
}

const COMMANDS = [
  { cmd: 'run-tests', desc: 'Execute suite' },
  { cmd: 'goto <page>', desc: 'Navigate' },
  { cmd: 'whoami', desc: 'Profile info' },
  { cmd: 'help', desc: 'List cmds' },
];

const HINTS = [
  "Use the terminal to 'run-tests' for massive XP.",
  "There are bugs hidden in the UI. Click to squash!",
  "Navigate using sidebar or terminal commands.",
  "Achieve 100% coverage by visiting all sections.",
  "Pro Tip: Hover over skills to see confidence levels."
];

const GamificationBar: React.FC<GamificationProps> = ({ level, xp, nextLevelXp, coverage, achievements, activeQuest, t }) => {
  const xpPercentage = (xp / nextLevelXp) * 100;
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % HINTS.length);
    }, 8000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="hidden lg:flex flex-col gap-4 p-4 bg-ide-sidebar border-l border-ide-border w-72 h-full shrink-0 overflow-y-auto custom-scrollbar shadow-[-10px_0_20px_rgba(0,0,0,0.2)] relative z-20">
      
      {/* HUD HEADER: Profile / Level */}
      <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-lg shrink-0 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
            <Trophy size={64} />
        </div>
        
        <div className="flex justify-between items-center mb-3 relative z-10">
            <div>
                <h3 className="text-xs text-slate-400 font-bold uppercase tracking-wider">{t.level}</h3>
                <span className="text-2xl font-black text-white font-mono">{level}</span>
            </div>
            <div className="bg-yellow-500/20 p-2 rounded-lg border border-yellow-500/50">
                <Trophy className="text-yellow-400" size={20} />
            </div>
        </div>
        
        <div className="relative z-10">
            <div className="flex justify-between text-[10px] text-slate-400 font-mono mb-1">
                <span>EXP</span>
                <span>{Math.floor(xp)} / {nextLevelXp}</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden border border-slate-700">
                <div 
                    className="bg-gradient-to-r from-blue-600 to-blue-400 h-full transition-all duration-500 relative" 
                    style={{ width: `${xpPercentage}%` }}
                >
                    <div className="absolute inset-0 bg-white/20 w-full animate-[shimmer_2s_infinite]"></div>
                </div>
            </div>
        </div>
      </div>

      {/* ACTIVE QUEST CARD */}
      <div className="bg-slate-900 rounded-xl border-2 border-indigo-500/50 p-4 shadow-[0_0_15px_rgba(99,102,241,0.15)] shrink-0 animate-in fade-in slide-in-from-right-4 duration-700">
        <div className="flex items-center gap-2 mb-3 border-b border-slate-700/50 pb-2">
            <Target className="text-indigo-400" size={16} />
            <h4 className="text-xs font-bold text-indigo-300 uppercase tracking-widest">{t.activeQuest}</h4>
        </div>
        
        {activeQuest ? (
            <div>
                <h5 className="font-bold text-white text-sm mb-1">{activeQuest.title}</h5>
                <p className="text-xs text-slate-400 mb-3">{activeQuest.description}</p>
                
                <div className="flex items-center gap-2 text-xs font-mono mb-2">
                    <span className="text-slate-300">{activeQuest.current} / {activeQuest.target}</span>
                    <span className="ml-auto text-emerald-400 font-bold">+{activeQuest.rewardXp} XP</span>
                </div>
                
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div 
                        className="bg-indigo-500 h-full transition-all duration-500"
                        style={{ width: `${(activeQuest.current / activeQuest.target) * 100}%` }}
                    ></div>
                </div>
            </div>
        ) : (
            <div className="flex flex-col items-center py-4 text-slate-500">
                <CheckCircle2 size={32} className="mb-2 opacity-50" />
                <span className="text-xs">{t.allComplete}</span>
            </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2 shrink-0">
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex flex-col items-center justify-center gap-1">
            <Shield size={16} className="text-emerald-400" />
            <span className="text-lg font-bold text-white font-mono">{Math.round(coverage)}%</span>
            <span className="text-[10px] text-slate-500 text-center uppercase">{t.coverage}</span>
        </div>
        <div className="bg-slate-900 p-3 rounded-lg border border-slate-700 flex flex-col items-center justify-center gap-1">
            <Zap size={16} className="text-amber-400" />
            <span className="text-lg font-bold text-white font-mono">{achievements}</span>
            <span className="text-[10px] text-slate-500 text-center uppercase">{t.badges}</span>
        </div>
      </div>

      {/* Available Commands */}
      <div className="bg-[#1e1e1e] p-3 rounded border border-ide-border shrink-0 mt-2 opacity-80 hover:opacity-100 transition-opacity">
        <h4 className="flex items-center gap-2 text-xs font-bold text-ide-muted mb-3 uppercase tracking-wider">
            <Terminal size={12} /> {t.sysCmds}
        </h4>
        <div className="space-y-2 font-mono text-[10px]">
            {COMMANDS.map((c, i) => (
                <div key={i} className="flex justify-between items-center text-slate-400 hover:text-slate-200 transition-colors cursor-help group">
                    <span className="text-blue-400 bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20 group-hover:border-blue-400/50">{c.cmd}</span>
                    <span className="text-ide-muted">{c.desc}</span>
                </div>
            ))}
        </div>
      </div>

      {/* Tips & Hints */}
      <div className="mt-auto bg-gradient-to-br from-indigo-900/40 to-slate-900/40 p-4 rounded-lg border border-indigo-500/30 shrink-0 relative overflow-hidden group hover:border-indigo-400/50 transition-colors shadow-lg">
        <div className="absolute -right-6 -top-6 bg-indigo-500/20 w-20 h-20 rounded-full blur-xl group-hover:bg-indigo-500/30 transition-all duration-700"></div>
        
        <div className="flex items-center gap-2 mb-3 text-indigo-300 relative z-10">
          <Lightbulb size={16} className="text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]" />
          <span className="text-xs font-bold uppercase tracking-wider">{t.hintSys}</span>
        </div>
        
        <p className="text-xs text-slate-200 min-h-[3rem] leading-relaxed relative z-10 font-medium tracking-wide">
          {HINTS[hintIndex]}
        </p>
        
        <div className="flex gap-1.5 mt-3 relative z-10">
            {HINTS.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setHintIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${i === hintIndex ? 'w-6 bg-indigo-400 shadow-[0_0_5px_rgba(96,165,250,0.5)]' : 'w-2 bg-slate-600 hover:bg-slate-500'}`}
                />
            ))}
        </div>
      </div>

    </div>
  );
};

export default GamificationBar;