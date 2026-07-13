import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useLocaleContext } from '../context/LocaleContext';
import {
  FileText,
  Terminal as TerminalIcon,
  PlayCircle,
  Bug,
  Layout,
  ChevronRight,
  ChevronDown,
  FileCode,
  FolderGit2,
  X,
  MessageSquare,
  AlertTriangle,
  Download
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onClose }) => {
  const { setFeedbackOpen, triggerUpdateQuest } = useAppContext();
  const { t } = useLocaleContext();

  if (!t) {
    return null; // or a loading spinner
  }

  const [isOpen, setIsOpen] = React.useState(true);

  const NavItem = ({ to, label, icon: Icon, extension }: { to: string, label: string, icon: any, extension: string }) => {
    return (
      <NavLink
        to={to}
        onClick={onClose}
        className={({ isActive }) => `w-full flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono transition-colors border-l-2 ${isActive
          ? 'bg-[#1e293b] text-white border-blue-500'
          : 'text-slate-400 border-transparent hover:bg-[#1e293b]/50 hover:text-slate-200'
          }`}
      >
        {({ isActive }) => (
          <>
            <Icon size={14} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
            <span>{label}</span>
            <span className="text-slate-600 ml-auto">{extension}</span>
          </>
        )}
      </NavLink>
    );
  };

  return (
    <div className={`bg-[#0f172a] border-r border-ide-border flex flex-col shrink-0 ${className || 'w-64 h-screen'}`}>

      {/* Sidebar Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-ide-border shrink-0">
        <div className="flex items-center gap-2">
          <Layout size={18} className="text-blue-500" />
          <span className="font-bold text-sm tracking-tight text-white">{t.workspaceTitle}</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="md:hidden text-slate-400 hover:text-white">
            <X size={18} />
          </button>
        )}
      </div>

      {/* Explorer */}
      <div className="flex-1 overflow-y-auto py-2 custom-scrollbar">

        {/* Project Section */}
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center px-2 py-1 text-xs font-bold text-slate-300 hover:text-white uppercase tracking-wider mb-1"
          >
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
            <span className="ml-1">{t.portfolioProject}</span>
          </button>

          {isOpen && (
            <div className="flex flex-col">
              <NavItem to="/" label={t.navOverview} icon={TerminalIcon} extension="" />
              <NavItem to="/about" label={t.navAbout} icon={FileText} extension=".md" />
              <NavItem to="/skills" label={t.navSkills} icon={PlayCircle} extension=".spec.ts" />
              <NavItem to="/experience" label={t.navHistory} icon={FileCode} extension=".log" />
              <NavItem to="/projects" label={t.navProjects} icon={FolderGit2} extension=".json" />
              <NavItem to="/contact" label={t.navContact} icon={Bug} extension=".form" />
            </div>
          )}
        </div>

        {/* Simulated "External Libraries" */}
        <div className="mt-6">
          <div className="w-full flex items-center px-2 py-1 text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
            <ChevronRight size={14} />
            <span className="ml-1">{t.extDeps}</span>
          </div>
        </div>

      </div>

      {/* Status Bar Indicator */}
      <div className="p-4 border-t border-ide-border mt-auto space-y-3">
        {/* Download CV Button */}
        <a
          href="/resume.pdf"
          download
          onClick={(e) => {
            triggerUpdateQuest('q5', 1);
          }}
          className="w-full flex items-center gap-2 px-3 py-2 bg-blue-900/20 hover:bg-blue-900/40 text-blue-400 rounded text-xs transition-all border border-blue-500/50 hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] group"
        >
          <Download size={12} className="group-hover:animate-bounce" />
          <span className="font-mono font-semibold">{t.downloadCV}</span>
        </a>

        {/* Feedback Trigger */}
        <button
          onClick={() => setFeedbackOpen(true)}
          className="w-full flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition-colors border border-slate-700"
        >
          <AlertTriangle size={12} className="text-yellow-500" />
          <span className="font-mono">{t.reportIssue}</span>
        </button>

        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
          <span>{t.serverOnline}</span>
        </div>
        <div className="text-[10px] text-slate-600 mt-1 font-mono">
          v3.1.0-stable
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
