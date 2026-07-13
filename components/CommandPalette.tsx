import React, { useState, useEffect, useRef } from 'react';
import { ViewState } from '../types';
import { useTerminalContext } from '../context/TerminalContext';
import { useLocaleContext } from '../context/LocaleContext';
import { Search, Play, Terminal as TermIcon, Code, FolderGit2 } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const { onRunTests, onNavigate } = useTerminalContext();
  const { t } = useLocaleContext();

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const commands = [
    { label: 'Run Automation Suite', action: () => { onRunTests(); onClose(); }, icon: Play },
    { label: 'Go to Overview', action: () => { onNavigate(ViewState.HOME); onClose(); }, icon: TermIcon },
    { label: 'View Skills', action: () => { onNavigate(ViewState.SKILLS); onClose(); }, icon: Code },
    { label: 'View Projects', action: () => { onNavigate(ViewState.PROJECTS); onClose(); }, icon: FolderGit2 },
  ];

  const filteredCommands = commands.filter(cmd =>
    cmd.label.toLowerCase().includes(query.trim().toLowerCase())
  );

  // Reset selection to top whenever the palette opens or the filter changes.
  useEffect(() => {
    setSelectedIndex(0);
  }, [isOpen, query]);

  // Reset the search query on close so it opens fresh next time.
  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  // Keep the active item scrolled into view for long lists.
  useEffect(() => {
    itemRefs.current[selectedIndex]?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!isOpen) return null;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (filteredCommands.length ? (prev + 1) % filteredCommands.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (filteredCommands.length ? (prev - 1 + filteredCommands.length) % filteredCommands.length : 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      filteredCommands[selectedIndex]?.action();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
    }
  };

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
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={t.cmdPalettePlaceholder}
            className="bg-transparent border-none outline-none flex-1 text-slate-200 min-w-0"
          />
          <span className="text-xs border border-slate-700 px-1.5 rounded bg-slate-800">ESC</span>
        </div>
        <div className="space-y-1">
          {filteredCommands.map((item, i) => {
            const isActive = i === selectedIndex;
            return (
              <button
                key={item.label}
                ref={el => { itemRefs.current[i] = el; }}
                onClick={item.action}
                onMouseMove={() => setSelectedIndex(i)}
                className={`w-full text-left px-3 py-2 flex items-center gap-3 rounded text-sm transition-colors group ${
                  isActive ? 'bg-blue-600/20 text-blue-400' : 'text-slate-300'
                }`}
              >
                <item.icon size={14} className={isActive ? 'text-blue-400' : 'group-hover:text-blue-400'} />
                {item.label}
              </button>
            );
          })}
        </div>
        <div className="mt-2 px-3 py-2 border-t border-slate-700 text-[10px] font-mono text-ide-muted">
          {t.cmdPaletteHelp}
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
