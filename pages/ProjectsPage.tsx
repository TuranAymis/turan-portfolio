import React from 'react';
import { useGame } from '../context/GameContext';
import { useLocaleContext } from '../context/LocaleContext';
import { FolderGit2, Github, ExternalLink, Star, Tag } from 'lucide-react';
import { getProjects } from '../constants';

import SEO from '../components/SEO';

const ProjectsPage: React.FC = () => {
  const { t, language } = useLocaleContext();
  const { spawnFloatText } = useGame();

  if (!t) return null;

  const projects = getProjects(language);

  // Structured Data for Projects
  const projectsSchema = projects.map((proj) => ({
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": proj.name,
    "description": proj.description,
    "keywords": proj.tags.join(', '),
    "codeRepository": proj.links.find((l) => l.type === 'github')?.url,
  }));

  return (
    <div className="max-w-5xl mx-auto px-2 md:px-0">
      <SEO
        title={t.projectsSeoTitle}
        description={t.projectsSeoDesc}
        structuredData={projectsSchema}
      />

      <div className="flex items-center justify-between mb-8 border-b border-ide-border pb-4">
        <div className="flex items-center gap-2">
          <FolderGit2 className="text-blue-500" />
          <h2 className="text-xl font-bold">{t.projectsTitle}</h2>
        </div>
        <span className="text-xs font-mono bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded border border-emerald-500/20 animate-pulse">
          {projects.length} REPOS
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className={`group flex flex-col bg-[#0f172a] border rounded-lg overflow-hidden transition-all duration-300 shadow-md hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] animate-in fade-in slide-in-from-bottom-4 ${
              proj.featured
                ? 'lg:col-span-2 border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.12)]'
                : 'border-slate-700 hover:border-blue-500'
            }`}
          >
            {/* Card Header (IDE tab feel) */}
            <div className="bg-slate-800 px-4 py-2 flex items-center justify-between border-b border-slate-700">
              <span className="font-mono text-xs font-bold text-slate-300 flex items-center gap-2 truncate">
                <FolderGit2 size={12} className="text-blue-400 shrink-0" />
                {proj.id}.json
              </span>
              {proj.featured && (
                <span className="flex items-center gap-1 text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5 rounded uppercase tracking-wider shrink-0">
                  <Star size={10} className="fill-current" /> {t.featuredLabel}
                </span>
              )}
            </div>

            {/* Card Body */}
            <div className="p-5 flex flex-col flex-1">
              <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors mb-2">
                {proj.name}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4 flex-1">
                {proj.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-5">
                {proj.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-800 border border-slate-700 rounded text-xs font-mono text-slate-400 hover:text-white hover:border-blue-500 transition-colors cursor-default flex items-center gap-1"
                    onMouseEnter={(e) => spawnFloatText(tag, e.clientX, e.clientY, 'text-xs text-slate-400')}
                  >
                    <Tag size={10} /> {tag}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex flex-wrap gap-3 mt-auto">
                {proj.links.map((link, i) => {
                  const isLive = link.type === 'live';
                  return (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) =>
                        spawnFloatText(
                          isLive ? 'Opening Report...' : 'Cloning...',
                          e.clientX,
                          e.clientY,
                          isLive ? 'text-emerald-300' : 'text-blue-300'
                        )
                      }
                      className={`inline-flex items-center gap-2 px-4 py-2 rounded text-sm font-semibold transition-all border active:scale-95 ${
                        isLive
                          ? 'bg-emerald-600/10 text-emerald-400 border-emerald-500/50 hover:bg-emerald-600/20 hover:border-emerald-400'
                          : 'bg-blue-600/10 text-blue-400 border-blue-500/50 hover:bg-blue-600/20 hover:border-blue-400'
                      }`}
                    >
                      {isLive ? <ExternalLink size={16} /> : <Github size={16} />}
                      {isLive ? t.liveReport : t.viewCode}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsPage;
