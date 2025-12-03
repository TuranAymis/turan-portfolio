
import React from 'react';
import { ViewState, TranslationDictionary } from '../types';
import { 
  FileText, 
  Terminal as TerminalIcon, 
  PlayCircle, 
  Bug, 
  Layout, 
  ChevronRight, 
  ChevronDown,
  FileCode,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  changeView: (view: ViewState) => void;
  t: TranslationDictionary;
  className?: string;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, changeView, t, className, onClose }) => {
  const [isOpen, setIsOpen] = React.useState(true);

  const NavItem = ({ view, label, icon: Icon, extension }: { view: ViewState, label: string, icon: any, extension: string }) => {
    const isActive = currentView === view;
    return (
      <button
        onClick={() => {
            changeView(view);
            if (onClose) onClose();
        }}
        className={`w-full flex items-center gap-1.5 px-4 py-1.5 text-xs font-mono transition-colors border-l-2 ${
          isActive 
            ? 'bg-[#1e293b] text-white border-blue-500' 
            : 'text-slate-400 border-transparent hover:bg-[#1e293b]/50 hover:text-slate-200'
        }`}
      >
        <Icon size={14} className={isActive ? 'text-blue-400' : 'text-slate-500'} />
        <span>{label}</span>
        <span className="text-slate-600 ml-auto">{extension}</span>
      </button>
    );
  };

  return (
    <div className={`bg-[#0f172a] border-r border-ide-border flex flex-col shrink-0 ${className || 'w-64 h-screen'}`}>
      
      {/* Sidebar Header */}
      <div className="h-12 flex items-center justify-between px-4 border-b border-ide-border shrink-0">
        <div className="flex items-center gap-2">
            <Layout size={18} className="text-blue-500" />
            <span className="font-bold text-sm tracking-tight text-white">QA_WORKSPACE</span>
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
            <span className="ml-1">Portfolio_Project</span>
          </button>

          {isOpen && (
            <div className="flex flex-col">
              <NavItem view={ViewState.HOME} label={t.navOverview} icon={TerminalIcon} extension="" />
              <NavItem view={ViewState.ABOUT} label={t.navAbout} icon={FileText} extension=".md" />
              <NavItem view={ViewState.SKILLS} label={t.navSkills} icon={PlayCircle} extension=".spec.ts" />
              <NavItem view={ViewState.EXPERIENCE} label={t.navHistory} icon={FileCode} extension=".log" />
              <NavItem view={ViewState.CONTACT} label={t.navContact} icon={Bug} extension=".form" />
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
      <div className="p-4 border-t border-ide-border mt-auto">
         <div className="flex items-center gap-2 text-xs text-slate-400">
             <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
             <span>{t.serverOnline}</span>
         </div>
         <div className="text-[10px] text-slate-600 mt-1 font-mono">
             v3.0.1-stable
         </div>
      </div>
    </div>
  );
};

export default Sidebar;
