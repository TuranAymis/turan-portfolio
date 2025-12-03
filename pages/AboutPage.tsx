import React from 'react';
import { TranslationDictionary } from '../types';
import { CheckCircle, Brain, Scroll, Users, Zap, Dna, Package } from 'lucide-react';

interface AboutPageProps {
  t: TranslationDictionary;
  level: number;
  xp: number;
  onSpawnFloatText: (text: string, x: number, y: number, color?: string) => void;
}

const FileTextIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <polyline points="14 2 14 8 20 8"/>
  </svg>
);

const AboutPage: React.FC<AboutPageProps> = ({ t, level, xp, onSpawnFloatText }) => {
  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700 px-2 md:px-0">
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
                onClick={(e) => onSpawnFloatText('+10 INT', e.clientX, e.clientY, 'text-blue-400')}
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
                onClick={(e) => onSpawnFloatText('+15 WIS', e.clientX, e.clientY, 'text-purple-400')}
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
};

export default AboutPage;

