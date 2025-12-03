import { useState, useEffect, useCallback } from 'react';
import { Quest, TranslationDictionary } from '../types';
import { getQuests } from '../constants';

interface UseQuestSystemProps {
  initialQuests: Quest[];
  onQuestComplete: (quest: Quest) => void;
  onGainXp: (amount: number) => void;
  onSpawnToast: (title: string, subtitle: string, type: 'quest' | 'achievement' | 'level-up') => void;
  onLog: (message: string, level: string) => void;
  t: TranslationDictionary;
}

export const useQuestSystem = ({
  initialQuests,
  onQuestComplete,
  onGainXp,
  onSpawnToast,
  onLog,
  t,
}: UseQuestSystemProps) => {
  const [quests, setQuests] = useState<Quest[]>(initialQuests);
  const [activeQuest, setActiveQuest] = useState<Quest | null>(initialQuests[0] || null);

  // Sync Active Quest UI
  useEffect(() => {
    const active = quests.find(q => !q.isCompleted);
    setActiveQuest(active || null);
  }, [quests]);

  const updateQuest = useCallback((questId: string, amount: number = 1) => {
    setQuests(prev => {
      return prev.map(q => {
        if (q.id === questId && !q.isCompleted) {
          const newCurrent = Math.min(q.current + amount, q.target);
          const isFinished = newCurrent >= q.target;
          
          if (isFinished) {
            setTimeout(() => {
              onGainXp(q.rewardXp);
              onSpawnToast(q.title, `${t.questComp}! +${q.rewardXp} XP`, 'quest');
              onLog(`QUEST COMPLETE: ${q.title}`, 'SUCCESS');
              onQuestComplete(q);
              
              // Set next quest
              const nextQ = prev.find(nq => nq.id !== q.id && !nq.isCompleted);
              if (nextQ) {
                setActiveQuest(nextQ);
              } else {
                setActiveQuest(null);
              }
            }, 500);
          }
          
          return { ...q, current: newCurrent, isCompleted: isFinished };
        }
        return q;
      });
    });
  }, [onGainXp, onSpawnToast, onLog, onQuestComplete, t.questComp]);

  const reinitializeQuests = useCallback((newQuests: Quest[]) => {
    setQuests(prev => newQuests.map((nq, i) => ({
      ...nq,
      current: prev[i]?.current || 0,
      isCompleted: prev[i]?.isCompleted || false
    })));
  }, []);

  return {
    quests,
    activeQuest,
    updateQuest,
    reinitializeQuests,
  };
};

