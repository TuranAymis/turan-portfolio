import { useState, useCallback } from 'react';
import { Achievement, FloatingText, ToastNotification } from '../types';

export const useGameState = () => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [coverage, setCoverage] = useState(0);
  const [unlockedAchievements, setUnlockedAchievements] = useState<Achievement[]>([]);
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const spawnFloatText = useCallback((text: string, x: number, y: number, color = 'text-white') => {
    const id = Date.now() + Math.random();
    setFloatingTexts(prev => [...prev, { id, x, y, text, color }]);
    setTimeout(() => {
      setFloatingTexts(prev => prev.filter(ft => ft.id !== id));
    }, 1000);
  }, []);

  const spawnToast = useCallback((title: string, subtitle: string, type: ToastNotification['type']) => {
    const id = Date.now() + Math.random();
    setToasts(prev => [...prev, { id, title, subtitle, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  const dismissToast = useCallback((id: number) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const gainXp = useCallback((amount: number, x?: number, y?: number, onLevelUp?: (newLevel: number) => void) => {
    setXp(prev => {
      const newXp = prev + amount;
      const threshold = level * 1000;
      if (newXp >= threshold) {
        const newLevel = level + 1;
        setLevel(newLevel);
        if (onLevelUp) {
          onLevelUp(newLevel);
        }
      }
      return newXp;
    });
    
    if (x && y) {
      spawnFloatText(`+${amount} XP`, x, y, 'text-emerald-400');
    }
  }, [level, spawnFloatText]);

  const triggerAchievement = useCallback((title: string, xpReward: number, onLog?: (message: string, level: string) => void) => {
    setUnlockedAchievements(prev => {
      if (prev.some(a => a.title === title)) return prev;
      
      if (onLog) {
        onLog(`ACHIEVEMENT UNLOCKED: ${title}`, 'SUCCESS');
      }
      
      return [...prev, { 
        id: Date.now().toString(), 
        title, 
        description: '', 
        icon: null, 
        unlocked: true, 
        xpValue: xpReward 
      }];
    });
    
    gainXp(xpReward);
  }, [gainXp]);

  return {
    xp,
    level,
    coverage,
    setCoverage,
    unlockedAchievements,
    setUnlockedAchievements,
    floatingTexts,
    toasts,
    spawnFloatText,
    spawnToast,
    dismissToast,
    gainXp,
    triggerAchievement,
  };
};

