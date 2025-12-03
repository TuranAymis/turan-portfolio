import React from 'react';
import { LogEntry } from '../types';
import { SKILLS } from '../constants';

interface TestSuiteHandlerProps {
  addLog: (message: string, level: LogEntry['level']) => void;
  spawnFloatText: (text: string, x: number, y: number, color?: string) => void;
  triggerAchievement: (title: string, xpReward: number) => void;
  updateQuest: (questId: string, amount?: number) => void;
  setIsTerminalOpen?: (open: boolean) => void;
  isTerminalOpen?: boolean;
}

export const runTestSuite = async ({
  addLog,
  spawnFloatText,
  triggerAchievement,
  updateQuest,
  setIsTerminalOpen,
  isTerminalOpen,
}: TestSuiteHandlerProps) => {
  if (setIsTerminalOpen && !isTerminalOpen) {
    setIsTerminalOpen(true);
  }
  
  addLog('Initializing Test Suite...', 'INFO');
  
  await new Promise(r => setTimeout(r, 800));
  
  for (const skill of SKILLS.slice(0, 5)) {
    addLog(`TEST: Verifying proficiency in ${skill.name}...`, 'INFO');
    await new Promise(r => setTimeout(r, 200));
    addLog(`PASS: Proficiency detected at ${skill.level}%`, 'SUCCESS');
  }
  
  addLog('SUITE RESULT: 5/5 TESTS PASSED', 'SUCCESS');
  triggerAchievement('Automation Master', 150);
  updateQuest('q1', 1);
};

export const handleRunTestSuite = (
  e: React.MouseEvent | undefined,
  handler: TestSuiteHandlerProps
) => {
  if (e) {
    handler.spawnFloatText('Running...', e.clientX, e.clientY, 'text-blue-400');
  }
  runTestSuite(handler);
};

