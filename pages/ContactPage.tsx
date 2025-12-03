import React, { useState } from 'react';
import { TranslationDictionary } from '../types';
import { Wifi, Lock, User, Radio, FileCode, Send, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { handleContactSubmit as submitContact } from '../utils/contactHandler';

interface ContactPageProps {
  t: TranslationDictionary;
  onAddLog: (message: string, level: string) => void;
  onTriggerAchievement: (title: string, xpReward: number) => void;
  onSpawnToast: (title: string, subtitle: string, type: 'achievement' | 'level-up' | 'quest') => void;
}

const ContactPage: React.FC<ContactPageProps> = ({ t, onAddLog, onTriggerAchievement, onSpawnToast }) => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    submitContact(e, {
      name: contactName,
      email: contactEmail,
      message: contactMessage,
      addLog: onAddLog,
      triggerAchievement: onTriggerAchievement,
      spawnToast: onSpawnToast,
      t,
      onClearForm: () => {
        setContactName('');
        setContactEmail('');
        setContactMessage('');
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto pt-2 md:pt-4 animate-in fade-in duration-700 w-full px-2 md:px-0">
      {/* CONSOLE HEADER */}
      <div className="bg-slate-900 border border-slate-700 rounded-t-xl p-3 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-500/5 z-0"></div>
        <div className="flex items-center gap-3 relative z-10 min-w-0 flex-1 mr-2">
          <Wifi size={18} className="text-emerald-400 animate-pulse shrink-0" />
          <span className="font-mono text-sm font-bold text-emerald-400 tracking-widest uppercase truncate">{t.commsTitle}</span>
        </div>
        <div className="flex items-center gap-2 relative z-10 shrink-0">
          <div className="flex flex-col gap-0.5 items-end">
            <span className="text-[10px] text-slate-500 font-mono uppercase hidden sm:inline">{t.signalStrength}</span>
            <div className="flex gap-0.5">
              <div className="w-1 h-3 bg-emerald-500 rounded-sm"></div>
              <div className="w-1 h-3 bg-emerald-500 rounded-sm"></div>
              <div className="w-1 h-3 bg-emerald-500 rounded-sm"></div>
              <div className="w-1 h-3 bg-emerald-500/30 rounded-sm animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* MAIN CONSOLE BODY */}
      <div className="bg-[#0a0f18] border-x border-b border-slate-700 rounded-b-xl p-4 md:p-8 shadow-2xl relative overflow-hidden">
        {/* Scanline Background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0)_50%,rgba(0,255,0,0.02)_50%)] bg-[length:100%_4px] pointer-events-none z-0"></div>
        
        <div className="relative z-10 space-y-6">
          {/* Security Badge */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-slate-900/80 border border-slate-700 px-4 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-slate-400">
              <Lock size={12} className="text-emerald-500 shrink-0" />
              <span>{t.encryption}</span>
            </div>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2 group">
                <label className="text-[10px] text-blue-400 font-mono uppercase tracking-widest flex items-center gap-2">
                  <User size={12} className="shrink-0" /> {t.sourceId}
                </label>
                <input 
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-slate-900/50 border-b-2 border-slate-700 text-slate-200 font-mono p-2 focus:border-blue-500 focus:bg-slate-900 transition-all outline-none placeholder-slate-700 text-base md:text-sm" 
                  placeholder="IDENT_CODE_OR_NAME" 
                  required 
                />
              </div>
              <div className="space-y-2 group">
                <label className="text-[10px] text-blue-400 font-mono uppercase tracking-widest flex items-center gap-2">
                  <Radio size={12} className="shrink-0" /> {t.commFreq}
                </label>
                <input 
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)} 
                  className="w-full bg-slate-900/50 border-b-2 border-slate-700 text-slate-200 font-mono p-2 focus:border-blue-500 focus:bg-slate-900 transition-all outline-none placeholder-slate-700 text-base md:text-sm" 
                  placeholder="USER@DOMAIN.COM" 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-[10px] text-blue-400 font-mono uppercase tracking-widest flex items-center gap-2">
                <FileCode size={12} className="shrink-0" /> {t.dataPayload}
              </label>
              <textarea 
                value={contactMessage}
                onChange={(e) => setContactMessage(e.target.value)}
                className="w-full bg-slate-900/50 border-2 border-slate-700 rounded text-slate-200 font-mono p-4 focus:border-blue-500 focus:bg-slate-900 transition-all outline-none h-32 placeholder-slate-700 resize-none text-base md:text-sm" 
                placeholder="> INITIATE TRANSMISSION SEQUENCE..." 
                required
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full group relative overflow-hidden bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded transition-all active:scale-[0.98] touch-manipulation"
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(255,255,255,0.1)_10px,rgba(255,255,255,0.1)_20px)] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center justify-center gap-3 relative z-10">
                <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                <span className="tracking-[0.2em]">{t.initiateUpload}</span>
              </div>
            </button>
          </form>
        </div>
      </div>

      {/* FREQUENCY LINKS */}
      <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 pb-20 md:pb-0">
        {[
          { label: 'GITHUB', icon: Github, href: 'https://github.com/TuranAymis', color: 'hover:border-white hover:text-white' },
          { label: 'LINKEDIN', icon: Linkedin, href: 'https://linkedin.com/in/turan-aymis/', color: 'hover:border-blue-400 hover:text-blue-400' },
          { label: 'EMAIL', icon: Mail, href: 'mailto:turanaymis@gmail.com', color: 'hover:border-amber-400 hover:text-amber-400' },
          { label: 'CALL', icon: Phone, href: 'tel:+905069402813', color: 'hover:border-purple-400 hover:text-purple-400' }
        ].map((link, i) => (
          <a 
            key={i} 
            href={link.href} 
            target="_blank" 
            rel="noreferrer" 
            className={`flex flex-col items-center gap-2 p-4 bg-slate-900/80 border border-slate-700 rounded text-slate-500 transition-all hover:bg-slate-800 hover:-translate-y-1 group ${link.color} active:scale-95 touch-manipulation`}
          >
            <link.icon size={20} className="transition-colors" />
            <span className="text-[10px] font-mono tracking-wider">{link.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactPage;

