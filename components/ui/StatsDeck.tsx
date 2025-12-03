import React from 'react';
import { TranslationDictionary } from '../../types';
import { Activity, Terminal as TermIcon, Users } from 'lucide-react';

interface StatsDeckProps {
  t: TranslationDictionary;
}

const StatsDeck: React.FC<StatsDeckProps> = ({ t }) => {
  return (
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
  );
};

export default StatsDeck;

