import React, { useState } from 'react';
import { TranslationDictionary, Language } from '../types';
import { Terminal as TermIcon, ChevronDown, ChevronUp, FolderOpen, Zap } from 'lucide-react';
import { getExperience } from '../constants';

interface ExperiencePageProps {
  t: TranslationDictionary;
  language: Language;
  onSpawnFloatText: (text: string, x: number, y: number, color?: string) => void;
  onAddLog: (message: string, level: string) => void;
}

const ExperiencePage: React.FC<ExperiencePageProps> = ({ t, language, onSpawnFloatText, onAddLog }) => {
  const [expandedJobIds, setExpandedJobIds] = useState<Set<string>>(new Set());

  const toggleJobDetails = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const next = new Set(expandedJobIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
      onSpawnFloatText('Opening Log...', e.clientX, e.clientY, 'text-blue-300');
      onAddLog(`Expanding details for job: ${id}`, 'COMMAND');
    }
    setExpandedJobIds(next);
  };

  return (
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
                  <div className="text-right mt-2 md:mt-0">
                    <div className="text-sm font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded inline-block">{job.period}</div>
                    <div className="text-xs text-slate-500 mt-1">{job.location}</div>
                  </div>
                </div>
                
                <ul className="space-y-2 mb-6">
                  {job.description.map((item, i) => (
                    <li key={i} className="flex gap-2 text-slate-300 text-sm">
                      <span className="text-blue-500 mt-1 shrink-0">➜</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.techStack.map(tech => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-400 hover:text-white hover:border-blue-500 transition-colors cursor-default"
                      onMouseEnter={(e) => onSpawnFloatText(tech, e.clientX, e.clientY, 'text-xs text-slate-400')}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* EXPANSION BUTTON */}
                <button 
                  onClick={(e) => toggleJobDetails(job.id, e)}
                  className={`flex items-center justify-center gap-2 text-sm font-bold px-4 py-2 rounded transition-colors w-full border border-dashed ${isExpanded ? 'bg-slate-800 text-blue-400 border-blue-500/50' : 'bg-slate-900 text-slate-400 border-slate-700 hover:text-white hover:bg-slate-800'}`}
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
          );
        })}
      </div>
    </div>
  );
};

export default ExperiencePage;

