
import React, { useState, useEffect } from 'react';
import { Trophy, Zap, Shield, Target, Lightbulb, Terminal, CheckCircle2, X, Star } from 'lucide-react';
import { Quest, TranslationDictionary } from '../types';

interface GamificationProps {
  level: number;
  xp: number;
  nextLevelXp: number;
  coverage: number;
  achievements: number;
  activeQuest: Quest | null;
  t: TranslationDictionary;
  className?: string; // Allow custom classes for mobile/desktop styling
  onClose?: () => void; // For mobile close button
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

const GamificationBar: React.FC<GamificationProps> = ({ level, xp, nextLevelXp, coverage, achievements, activeQuest, t, className = "", onClose }) => {
  const xpPercentage = (xp / nextLevelXp) * 100;
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHintIndex((prev) => (prev + 1) % HINTS.length);
    }, 8000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`flex flex-col gap-4 p-4 bg-ide-sidebar border-l border-ide-border h-full overflow-y-auto custom-scrollbar shadow-[-10px_0_20px_rgba(0,0,0,0.2)] relative z-20 ${className}`}>
      
      {/* Mobile Header */}
      {onClose && (
        <div className="flex items-center justify-between mb-2 md:hidden border-b border-ide-border pb-2">
            <h3 className="text-white font-bold uppercase tracking-wider text-sm flex items-center gap-2">
                <Trophy size={16} className="text-yellow-400" />
                Player Stats
            </h3>
            <button onClick={onClose} className="p-1 hover:bg-slate-700 rounded text-slate-400">
                <X size={20} />
            </button>
        </div>
      )}

      {/* Level Card */}
      <div className="bg-slate-900 border border-slate-700 rounded-lg p-4 relative overflow-hidden group">
         <div className="flex justify-between items-start mb-2 relative z-10">
             <div>
                 <h4 className="text-xs text-slate-400 font-mono uppercase">{t.level}</h4>
                 <div className="text-3xl font-black text-white">{level}</div>
             </div>
             <Trophy size={24} className="text-yellow-500 animate-pulse-slow" />
         </div>
         
         {/* XP Bar */}
         <div className="relative z-10">
             <div className="flex justify-between text-[10px] text-slate-500 font-mono mb-1">
                 <span>EXP</span>
                 <span>{xp} / {nextLevelXp}</span>
             </div>
             <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                 <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-emerald-400 transition-all duration-500 ease-out"
                    style={{ width: `${xpPercentage}%` }}
                 ></div>
             </div>
         </div>
      </div>

      {/* Active Quest */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-900/20 border border-blue-500/30 rounded-lg p-4 relative overflow-hidden">
          <div className="flex items-center gap-2 mb-3 text-blue-400 border-b border-blue-500/20 pb-2">
              <Target size={16} />
              <h4 className="text-xs font-bold uppercase tracking-wider">{t.activeQuest}</h4>
          </div>
          
          {activeQuest ? (
              <div className="space-y-2">
                  <div className="font-bold text-white text-sm">{activeQuest.title}</div>
                  <div className="text-xs text-slate-400">{activeQuest.description}</div>
                  <div className="flex justify-between items-center text-[10px] font-mono mt-2">
                      <span className="text-slate-500">{activeQuest.current} / {activeQuest.target}</span>
                      <span className="text-emerald-400">+{activeQuest.rewardXp} XP</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-300"
                        style={{ width: `${(activeQuest.current / activeQuest.target) * 100}%` }}
                      ></div>
                  </div>
              </div>
          ) : (
              <div className="text-center py-4 text-emerald-400 flex flex-col items-center gap-2">
                  <CheckCircle2 size={24} />
                  <span className="text-xs font-bold">{t.allComplete}</span>
              </div>
          )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-900 border border-slate-700 rounded p-3 flex flex-col items-center justify-center gap-1">
              <Shield size={18} className="text-emerald-500" />
              <div className="text-xl font-bold text-white">{Math.round(coverage)}%</div>
              <div className="text-[10px] text-slate-500 uppercase">{t.coverage}</div>
          </div>
          <div className="bg-slate-900 border border-slate-700 rounded p-3 flex flex-col items-center justify-center gap-1">
              <Zap size={18} className="text-yellow-500" />
              <div className="text-xl font-bold text-white">{achievements}</div>
              <div className="text-[10px] text-slate-500 uppercase">{t.badges}</div>
          </div>
      </div>

      {/* Available Commands */}
      <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-3">
         <div className="flex items-center gap-2 mb-2 text-slate-400 text-xs border-b border-slate-700 pb-1">
             <Terminal size={12} />
             <span className="font-bold uppercase">{t.sysCmds}</span>
         </div>
         <div className="space-y-1.5">
             {COMMANDS.map((cmd, i) => (
                 <div key={i} className="flex justify-between items-center text-[10px] font-mono group cursor-help">
                     <span className="text-blue-400 group-hover:text-blue-300 transition-colors">
                        <span className="text-slate-600 mr-1">$</span>
                        {cmd.cmd}
                     </span>
                     <span className="text-slate-600">{cmd.desc}</span>
                 </div>
             ))}
         </div>
      </div>

      {/* Hints & Tips (Cycling) */}
      <div className="mt-auto bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 rounded-lg p-3 relative">
          <div className="flex items-center gap-2 mb-2 text-indigo-300 text-xs font-bold uppercase tracking-wider">
              <Lightbulb size={12} />
              {t.hintSys}
          </div>
          <div className="text-xs text-indigo-100 min-h-[40px] flex items-center">
              {HINTS[hintIndex]}
          </div>
          <div className="flex justify-center gap-1 mt-2">
              {HINTS.map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-1 h-1 rounded-full transition-all ${i === hintIndex ? 'bg-indigo-400 w-3' : 'bg-slate-700'}`}
                  ></div>
              ))}
          </div>
      </div>

    </div>
  );
};

export default GamificationBar;
