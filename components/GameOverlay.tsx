
import React from 'react';
import { FloatingText, ToastNotification, TranslationDictionary } from '../types';
import { Trophy, Star, Target, X } from 'lucide-react';

interface GameOverlayProps {
  floatingTexts: FloatingText[];
  toasts: ToastNotification[];
  onToastClick?: (id: number) => void;
  t: TranslationDictionary;
}

const GameOverlay: React.FC<GameOverlayProps> = ({ floatingTexts, toasts, onToastClick, t }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
      
      {/* Floating Combat Text (FCT) */}
      {floatingTexts.map((ft) => (
        <div
          key={ft.id}
          className={`absolute font-bold text-lg animate-float-up game-text-shadow ${ft.color}`}
          style={{ 
            left: ft.x, 
            top: ft.y,
            textShadow: '0 2px 4px rgba(0,0,0,0.8)'
          }}
        >
          {ft.text}
        </div>
      ))}

      {/* Minimal Toasts (Top Center) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col gap-2 items-center w-auto">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            onClick={() => onToastClick && onToastClick(toast.id)}
            className="animate-slide-down bg-slate-900/90 border border-slate-700 rounded-full py-2 pl-3 pr-4 shadow-lg flex items-center gap-3 backdrop-blur-md pointer-events-auto cursor-pointer hover:bg-slate-800 transition-all group min-w-[280px]"
          >
            {/* Minimal Icon Bubble */}
            <div className={`p-1.5 rounded-full ${
                toast.type === 'achievement' ? 'bg-yellow-500/20 text-yellow-400' :
                toast.type === 'level-up' ? 'bg-emerald-500/20 text-emerald-400' :
                'bg-blue-500/20 text-blue-400'
            }`}>
               {toast.type === 'achievement' && <Trophy size={14} />}
               {toast.type === 'level-up' && <Star size={14} />}
               {toast.type === 'quest' && <Target size={14} />}
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider ${
                    toast.type === 'achievement' ? 'text-yellow-400' :
                    toast.type === 'level-up' ? 'text-emerald-400' :
                    'text-blue-400'
                }`}>
                    {toast.type === 'achievement' ? t.achUnlocked : toast.type === 'level-up' ? t.levelUp : t.questComp}
                </span>
              </div>
              <span className="text-xs font-medium text-slate-200 truncate max-w-[200px]">{toast.title}</span>
            </div>

            {/* Dismiss Hint Icon */}
            <X size={12} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default GameOverlay;
