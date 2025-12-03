import React from 'react';
import { TranslationDictionary } from '../types';
import { Code, Activity } from 'lucide-react';
import { SKILLS } from '../constants';

interface SkillsPageProps {
  t: TranslationDictionary;
  onSkillClick: (e: React.MouseEvent, skillName: string) => void;
}

const SkillsPage: React.FC<SkillsPageProps> = ({ t, onSkillClick }) => {
  return (
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
            onClick={(e) => onSkillClick(e, skill.name)}
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
};

export default SkillsPage;

