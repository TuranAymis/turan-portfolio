import { LogEntry, ToastNotification } from '../types';
import { TranslationDictionary } from '../types';

interface ContactHandlerProps {
  name: string;
  email: string;
  message: string;
  addLog: (message: string, level: LogEntry['level']) => void;
  triggerAchievement: (title: string, xpReward: number) => void;
  spawnToast: (title: string, subtitle: string, type: ToastNotification['type']) => void;
  t: TranslationDictionary;
  onClearForm: () => void;
}

export const handleContactSubmit = (e: React.FormEvent, props: ContactHandlerProps) => {
  e.preventDefault();
  
  const { name, email, message, addLog, triggerAchievement, spawnToast, t, onClearForm } = props;
  
  // 1. Gamification Effects
  addLog('Uplink established. Data transmitted.', 'SUCCESS');
  triggerAchievement('Social Butterfly', 100);
  spawnToast('Uplink Successful', t.sentSuccess, 'achievement');
  
  // 2. Prepare Mailto Link
  const subject = `[QA Portfolio] Transmission from ${name}`;
  const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
  const mailtoLink = `mailto:turanaymis@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // 3. Open Email Client
  window.location.href = mailtoLink;

  // 4. Clear Form
  onClearForm();
};

