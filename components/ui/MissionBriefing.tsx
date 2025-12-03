import React from 'react';
import { TranslationDictionary, ViewState } from '../../types';
import { Target, Shield, Play, Code, Cpu } from 'lucide-react';

interface MissionBriefingProps {
  t: TranslationDictionary;
  onRunTests: (e?: React.MouseEvent) => void;
  onNavigateToSkills: () => void;
}

const MissionBriefing: React.FC<MissionBriefingProps> = ({ t, onRunTests, onNavigateToSkills }) => {
  return (
    <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-3 sm:p-4 md:p-8 relative overflow-hidden group shadow-2xl">
      {/* Background Scanline */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-0 pointer-events-none bg-[length:100%_4px,3px_100%]"></div>
      <div className="absolute top-0 right-0 p-4 opacity-20">
        <Cpu size={120} className="text-blue-500 animate-pulse-slow" />
      </div>
      
      <div className="relative z-10 flex flex-col-reverse md:flex-row items-start gap-8">
        <div className="flex-1 w-full">
          <h3 className="text-blue-400 font-mono text-sm mb-2 flex items-center gap-2">
            <Target size={16} /> {t.missionBrief}
          </h3>
          
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter uppercase glitch-effect break-words">
            TURAN AYMIS
          </h1>
          
          <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded text-blue-400 font-mono text-sm mb-6">
            <Shield size={14} /> {t.role}
          </div>
          
          <div className="text-slate-300 text-base md:text-lg leading-relaxed mb-8 border-l-2 border-slate-600 pl-4">
            <span className="text-slate-500 font-mono text-xs block mb-1">{t.currentObj}</span>
            {t.summary}
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button 
              onClick={onRunTests}
              className="relative overflow-hidden bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 px-8 rounded clip-path-polygon transition-all hover:translate-x-1 group/btn w-full sm:w-auto"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300"></div>
              <div className="flex items-center justify-center gap-3 relative z-10">
                <Play size={20} className="fill-current" />
                <span className="tracking-widest">{t.missionStart}</span>
              </div>
            </button>

            <button 
              onClick={onNavigateToSkills}
              className="bg-slate-800 border border-slate-600 hover:border-blue-500 text-slate-300 hover:text-white font-bold py-4 px-8 rounded transition-all hover:translate-x-1 flex items-center justify-center gap-3 w-full sm:w-auto"
            >
              <Code size={20} />
              <span className="tracking-widest">{t.viewSpecs}</span>
            </button>
          </div>
        </div>

        {/* PROFILE IMAGE */}
        <div className="relative shrink-0 group/img w-32 h-32 md:w-48 md:h-48 mt-4 mx-auto md:mx-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg blur opacity-25 group-hover/img:opacity-50 transition duration-1000"></div>
          <img 
            src="https://github.com/TuranAymis.png" 
            alt="Turan Aymis Profile"
            className="relative w-full h-full rounded-lg object-cover border-2 border-slate-700 shadow-2xl grayscale hover:grayscale-0 transition-all duration-500"
          />
          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-blue-500"></div>
          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-blue-500"></div>
        </div>
      </div>
    </div>
  );
};

export default MissionBriefing;

