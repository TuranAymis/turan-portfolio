import { useState, useCallback, useEffect } from 'react';
import { LogEntry, ViewState } from '../types';
import { getInitialLogs } from '../constants';
import { Language } from '../types';

interface UseTerminalProps {
  language: Language;
  onNavigate: (view: ViewState) => void;
  onRunTests: () => void;
}

export const useTerminal = ({ language, onNavigate, onRunTests }: UseTerminalProps) => {
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
        addLog('Available commands:', 'INFO');
        addLog('  run-tests   - Execute automation suite', 'INFO');
        addLog('  goto <page> - Navigate (home, about, skills, exp, contact)', 'INFO');
        addLog('  clear       - Clear terminal', 'INFO');
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
      case 'goto contact':
        onNavigate(ViewState.CONTACT);
        break;
      default:
        addLog(`Command not found: ${cmd}.`, 'ERROR');
    }
  }, [addLog, onNavigate, onRunTests]);

  // Initial Load Logs
  useEffect(() => {
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

