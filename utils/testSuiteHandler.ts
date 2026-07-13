import React from 'react';
import { LogEntry, Skill, TranslationDictionary } from '../types';
import { SKILLS } from '../constants';

interface TestSuiteHandlerProps {
  addLog: (message: string, level: LogEntry['level']) => void;
  spawnFloatText: (text: string, x: number, y: number, color?: string) => void;
  triggerAchievement: (title: string, xpReward: number) => void;
  t: TranslationDictionary;
  setIsTerminalOpen?: (open: boolean) => void;
  isTerminalOpen?: boolean;
}

// Skills highlighted by the automation suite, selected by id (missing ids are skipped).
const SUITE_SKILL_IDS = ['selenium', 'playwright', 'apitesting', 'aitesting', 'manualtesting'];

export const runTestSuite = async ({
  addLog,
  spawnFloatText,
  triggerAchievement,
  t,
  setIsTerminalOpen,
  isTerminalOpen,
}: TestSuiteHandlerProps) => {
  if (setIsTerminalOpen && !isTerminalOpen) {
    setIsTerminalOpen(true);
  }

  addLog('Initializing Test Suite...', 'INFO');

  await new Promise(r => setTimeout(r, 800));

  const selectedSkills = SUITE_SKILL_IDS
    .map(id => SKILLS.find(s => s.id === id))
    .filter((s): s is Skill => s !== undefined);

  for (const skill of selectedSkills) {
    addLog(`TEST: Verifying proficiency in ${skill.name}...`, 'INFO');
    await new Promise(r => setTimeout(r, 200));
    addLog(`PASS: Proficiency detected at ${skill.level}%`, 'SUCCESS');
  }

  // AI chatbot / LLM-as-a-Judge scenario pack
  addLog(t.testLLMJudgeRun, 'INFO');
  await new Promise(r => setTimeout(r, 400));
  addLog(`PASS: ${t.testLLMJudgePass}`, 'SUCCESS');

  const total = selectedSkills.length;
  addLog(`SUITE RESULT: ${total}/${total} TESTS PASSED`, 'SUCCESS');
  triggerAchievement('Automation Master', 150);
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

