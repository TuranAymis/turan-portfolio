import { useState, useCallback } from 'react';

interface Bug {
  id: string;
  top: string;
  left: string;
  isCaught: boolean;
}

const INITIAL_BUGS: Bug[] = [
  { id: 'bug-nav', top: '12%', left: '85%', isCaught: false },
  { id: 'bug-term', top: '92%', left: '25%', isCaught: false },
  { id: 'bug-hero', top: '35%', left: '10%', isCaught: false },
];

export const useBugs = () => {
  const [bugs, setBugs] = useState<Bug[]>(INITIAL_BUGS);

  const catchBug = useCallback((id: string) => {
    setBugs(prev => prev.map(b => b.id === id ? { ...b, isCaught: true } : b));
  }, []);

  const getUncaughtBugs = useCallback(() => {
    return bugs.filter(b => !b.isCaught);
  }, [bugs]);

  return {
    bugs,
    catchBug,
    getUncaughtBugs,
  };
};

