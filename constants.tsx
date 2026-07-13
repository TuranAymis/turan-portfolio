
import { Skill, ExperienceItem, Language, TranslationDictionary, Quest, Project } from './types';
import { CONTENT, SKILLS as STATIC_SKILLS } from './data/content';

// --- TRANSLATIONS ---

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  en: CONTENT.en.translations,
  tr: CONTENT.tr.translations,
};

// --- GETTERS FOR DYNAMIC DATA ---

export const getSkills = () => STATIC_SKILLS;
export const SKILLS = STATIC_SKILLS;

export const getExperience = (lang: Language): ExperienceItem[] => {
  return CONTENT[lang]?.experience || CONTENT['en'].experience;
};

export const getProjects = (lang: Language): Project[] => {
  return CONTENT[lang]?.projects || CONTENT['en'].projects;
};

export const getQuests = (lang: Language): Quest[] => {
  return CONTENT[lang]?.quests || CONTENT['en'].quests;
};

export const getInitialLogs = (lang: Language): string[] => {
  return CONTENT[lang]?.logs || CONTENT['en'].logs;
};
