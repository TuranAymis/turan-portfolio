import { useState, useCallback, useEffect, useRef } from 'react';
import { LogEntry, ViewState } from '../types';
import { getInitialLogs } from '../constants';
import { Language } from '../types';
import { useLocaleContext } from '../context/LocaleContext';

interface UseTerminalProps {
  language: Language;
  onNavigate: (view: ViewState) => void;
  onRunTests: () => void;
  updateQuest?: (questId: string, amount?: number) => void;
}

export const useTerminal = ({ onNavigate, onRunTests, updateQuest }: UseTerminalProps) => {
  // Use the active locale from context (the `language` prop is legacy / hard-coded).
  const { t, language } = useLocaleContext();
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string, level: LogEntry['level'] = 'INFO') => {
    const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
    setLogs(prev => [...prev, { timestamp, level, message }]);
  }, []);

  const handleCommand = useCallback((cmdInput: string) => {
    const cmd = cmdInput.trim().toLowerCase();
    addLog(cmdInput, 'COMMAND');

    switch (cmd) {
      case 'help':
        addLog(t.termHelpIntro, 'INFO');
        addLog(`  run-tests (test) - ${t.termHelpRunTests}`, 'INFO');
        addLog(`  goto <page>      - ${t.termHelpGoto}`, 'INFO');
        addLog(`  whoami           - ${t.termHelpWhoami}`, 'INFO');
        addLog(`  clear            - ${t.termHelpClear}`, 'INFO');
        break;
      case 'clear':
        setLogs([]);
        break;
      case 'run-tests':
      case 'test':
        onRunTests();
        break;
      case 'whoami':
        addLog('User: Guest (Recruiter/Visitor)', 'INFO');
        addLog('Role: Evaluating Turan Aymis', 'INFO');
        break;
      case 'goto home':
        onNavigate(ViewState.HOME);
        break;
      case 'goto about':
        onNavigate(ViewState.ABOUT);
        break;
      case 'goto skills':
        onNavigate(ViewState.SKILLS);
        break;
      case 'goto exp':
        onNavigate(ViewState.EXPERIENCE);
        break;
      case 'goto projects':
        onNavigate(ViewState.PROJECTS);
        break;
      case 'goto contact':
        onNavigate(ViewState.CONTACT);
        break;
      case 'system_force_exception':
        // setIsCrashed(true); // DISABLED FOR PRODUCTION
        addLog('Error simulation disabled in production.', 'WARN');
        break;
      default:
        addLog(`Command not found: ${cmd}.`, 'ERROR');
        return; // Don't trigger quest for invalid commands
    }

    // Console Cowboy Quest: Trigger on any valid command
    if (updateQuest) {
      updateQuest('q3', 1);
    }
  }, [addLog, onNavigate, onRunTests, updateQuest, t]);

  // Initial Load Logs (boot sequence runs once to avoid duplicates on language switch)
  const bootedRef = useRef(false);
  useEffect(() => {
    if (bootedRef.current) return;
    bootedRef.current = true;
    getInitialLogs(language).forEach((log, index) => {
      setTimeout(() => {
        addLog(log, 'INFO');
      }, index * 600);
    });
  }, [language, addLog]);

  return {
    logs,
    addLog,
    handleCommand,
    clearLogs: () => setLogs([]),
  };
};

