import React from 'react';
import { ViewState, TranslationDictionary } from '../types';
import { Search, Play, Terminal as TermIcon, Code } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onRunTests: () => void;
  onNavigate: (view: ViewState) => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onRunTests, onNavigate }) => {
  if (!isOpen) return null;

  const commands = [
    { label: 'Run Automation Suite', action: () => { onRunTests(); onClose(); }, icon: Play },
    { label: 'Go to Overview', action: () => { onNavigate(ViewState.HOME); onClose(); }, icon: TermIcon },
    { label: 'View Skills', action: () => { onNavigate(ViewState.SKILLS); onClose(); }, icon: Code },
  ];

  return (
    <div 
      className="fixed inset-0 bg-black/50 z-[60] flex items-start justify-center pt-20 md:pt-32 backdrop-blur-sm" 
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 w-[90%] md:w-[500px] rounded-lg border border-slate-700 shadow-2xl p-2 animate-in fade-in slide-in-from-top-4" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-3 py-2 border-b border-slate-700 mb-2 text-slate-400">
          <Search size={16} />
          <input 
            autoFocus 
            placeholder="Type a command or search..." 
            className="bg-transparent border-none outline-none flex-1 text-slate-200 min-w-0"
          />
          <span className="text-xs border border-slate-700 px-1.5 rounded bg-slate-800">ESC</span>
        </div>
        <div className="space-y-1">
          {commands.map((item, i) => (
            <button 
              key={i} 
              onClick={item.action} 
              className="w-full text-left px-3 py-2 flex items-center gap-3 hover:bg-blue-600/20 hover:text-blue-400 rounded text-sm text-slate-300 transition-colors group"
            >
              <item.icon size={14} className="group-hover:text-blue-400" />
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;

