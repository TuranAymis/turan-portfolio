import React from 'react';
import { TranslationDictionary, ViewState } from '../types';
import SystemHeader from '../components/ui/SystemHeader';
import MissionBriefing from '../components/ui/MissionBriefing';
import StatsDeck from '../components/ui/StatsDeck';

interface HomePageProps {
  t: TranslationDictionary;
  onRunTests: (e?: React.MouseEvent) => void;
  onNavigate: (view: ViewState) => void;
}

const HomePage: React.FC<HomePageProps> = ({ t, onRunTests, onNavigate }) => {
  return (
    <div className="max-w-5xl mx-auto pt-4 md:pt-10 animate-in fade-in duration-700 w-full">
      <SystemHeader t={t} />
      <MissionBriefing 
        t={t} 
        onRunTests={onRunTests}
        onNavigateToSkills={() => onNavigate(ViewState.SKILLS)}
      />
      <StatsDeck t={t} />
    </div>
  );
};

export default HomePage;

