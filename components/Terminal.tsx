import React, { useEffect, useRef, useState } from 'react';
import { LogEntry, TranslationDictionary } from '../types';
import { Terminal as TerminalIcon, XCircle, MinusCircle, Maximize2 } from 'lucide-react';

interface TerminalProps {
  logs: LogEntry[];
  isOpen: boolean;
  toggleOpen: () => void;
  onCommand: (cmd: string) => void;
  t: TranslationDictionary;
}

const Terminal: React.FC<TerminalProps> = ({ logs, isOpen, toggleOpen, onCommand, t }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    onCommand(input);
    setInput('');
  };

  const handleContainerClick = () => {
    // Focus input when clicking anywhere in the terminal
    inputRef.current?.focus();
  };

  if (!isOpen) {
    return (
      <button 
        onClick={toggleOpen}
        className="fixed bottom-0 right-0 lg:right-72 left-0 md:left-64 bg-ide-border text-ide-text text-xs px-4 py-1 flex items-center gap-2 hover:bg-slate-600 transition-colors z-50 border-t border-ide-bg shadow-lg"
      >
        <TerminalIcon size={12} />
        <span>Output Terminal</span>
        <span className="ml-auto flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            {t.termReady}
        </span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-0 right-0 lg:right-72 left-0 md:left-64 h-64 bg-[#0a0f18] border-t border-ide-border flex flex-col z-40 shadow-[0_-4px_20px_rgba(0,0,0,0.5)]">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-ide-sidebar border-b border-ide-border shrink-0">
        <div className="flex items-center gap-2">
            <TerminalIcon size={12} className="text-ide-muted" />
            <span className="text-xs font-mono text-ide-muted uppercase">{t.termHeader}</span>
        </div>
        <div className="flex items-center gap-3">
            <button onClick={toggleOpen} className="text-ide-muted hover:text-white"><MinusCircle size={14} /></button>
            <button className="text-ide-muted hover:text-white"><Maximize2 size={14} /></button>
            <button onClick={toggleOpen} className="text-ide-muted hover:text-red-400"><XCircle size={14} /></button>
        </div>
      </div>

      {/* Terminal Content */}
      <div 
        ref={scrollRef}
        onClick={handleContainerClick}
        className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-1 cursor-text"
      >
        {logs.map((log, index) => (
          <div key={index} className="flex gap-2 break-words">
            <span className="text-slate-500 shrink-0">[{log.timestamp}]</span>
            {log.level === 'COMMAND' ? (
                <span className="text-purple-400 font-bold shrink-0">$</span>
            ) : (
                <span className={`font-bold shrink-0 w-16 ${
                    log.level === 'INFO' ? 'text-blue-400' :
                    log.level === 'SUCCESS' ? 'text-emerald-400' :
                    log.level === 'WARN' ? 'text-amber-400' : 'text-red-400'
                }`}>
                    {log.level}
                </span>
            )}
            <span className={log.level === 'COMMAND' ? 'text-slate-100' : 'text-slate-300'}>
                {log.message}
            </span>
          </div>
        ))}
        
        {/* Input Area */}
        <form 
            onSubmit={handleSubmit} 
            className="flex gap-2 items-center mt-3 p-2 rounded border border-ide-sidebar bg-[#05080c] text-slate-100 shadow-inner"
        >
            <span className="text-emerald-500 font-bold">➜</span>
            <span className="text-blue-400 font-bold">~</span>
            <input 
                ref={inputRef}
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-slate-100 placeholder-slate-600"
                autoFocus
                placeholder={t.termPlaceholder}
                spellCheck={false}
                autoComplete="off"
            />
        </form>
      </div>
    </div>
  );
};

export default Terminal;