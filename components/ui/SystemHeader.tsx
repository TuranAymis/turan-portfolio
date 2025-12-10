import React from 'react';
import { TranslationDictionary } from '../../types';
import { Activity } from 'lucide-react';

import { useLocaleContext } from '../../context/LocaleContext';

interface SystemHeaderProps {
  // t: TranslationDictionary; // Removing prop
}

const SystemHeader: React.FC<SystemHeaderProps> = () => {
  const { t } = useLocaleContext();
  return (
    <div className="flex items-center justify-between mb-6 text-xs font-mono text-emerald-500 border-b border-emerald-500/30 pb-2 uppercase tracking-widest">
      <span className="flex items-center gap-2">
        <Activity size={14} className="animate-pulse" /> {t.sysStatus}: ONLINE
      </span>
      <span>ID: TURAN_AYMIS_QA</span>
    </div>
  );
};

export default SystemHeader;

