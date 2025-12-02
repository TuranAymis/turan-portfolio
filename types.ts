
import React from 'react';

export type SkillCategory = 'automation' | 'languages' | 'api' | 'devops' | 'tracking';

// New Language Type
export type Language = 'en' | 'tr' | 'es' | 'zh' | 'hi' | 'ar';

export interface TranslationDictionary {
  role: string;
  summary: string;
  runTests: string;
  viewSpecs: string;
  experience: string;
  frameworks: string;
  methodology: string;
  expLabel: string;
  testingLabel: string;
  agileLabel: string;
  aboutMe: string;
  education: string;
  bachelor: string;
  bachelorDesc: string;
  cs50: string;
  cs50Desc: string;
  skillsTitle: string;
  suiteStability: string; // Replaced confidence
  lastRun: string; // New
  deploymentLog: string;
  viewProject: string;
  hideDetails: string;
  keyAccomplishments: string;
  impact: string;
  contactReq: string;
  reporter: string;
  email: string;
  message: string;
  submit: string;
  sentSuccess: string;
  // Sidebar
  navOverview: string;
  navAbout: string;
  navSkills: string;
  navHistory: string;
  navContact: string;
  extDeps: string;
  serverOnline: string;
  // Terminal
  termReady: string;
  termHeader: string;
  termPlaceholder: string;
  // Gamification
  level: string;
  activeQuest: string;
  allComplete: string;
  coverage: string;
  badges: string;
  sysCmds: string;
  hintSys: string;
  // Game Overlay
  achUnlocked: string;
  levelUp: string;
  questComp: string;
  clickDismiss: string;
  // RPG Stats
  charSheet: string;
  stats: string;
  lore: string;
  inventory: string;
  equipped: string;
  attributes: {
    int: string;
    wis: string;
    cha: string;
    dex: string;
  };
  // Game Dashboard
  missionStart: string;
  missionBrief: string;
  sysStatus: string;
  playerReady: string;
  currentObj: string;
  // Contact Game (Transmission)
  commsTitle: string;
  signalStrength: string;
  encryption: string;
  transmitting: string;
  sourceId: string;
  commFreq: string;
  dataPayload: string;
  initiateUpload: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-100
  category: SkillCategory;
  icon: string;
  isMastered: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  xpValue: number;
}

export interface ProjectDetail {
  title: string;
  desc: string;
  impact: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  techStack: string[];
  projects?: ProjectDetail[];
}

export interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'SUCCESS' | 'COMMAND';
  message: string;
}

export enum ViewState {
  HOME = 'overview',
  ABOUT = 'about.md',
  SKILLS = 'skills.spec.ts',
  EXPERIENCE = 'history.log',
  CONTACT = 'report_bug.form'
}

// --- GAME TYPES ---

export interface Quest {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  rewardXp: number;
  isCompleted: boolean;
}

export interface FloatingText {
  id: number;
  x: number;
  y: number;
  text: string;
  color: string; // tailwind class ref
}

export interface ToastNotification {
  id: number;
  title: string;
  subtitle: string;
  type: 'achievement' | 'level-up' | 'quest';
}
