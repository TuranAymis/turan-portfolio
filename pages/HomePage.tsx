import React from 'react';
import { ViewState } from '../types';
import { useTerminalContext } from '../context/TerminalContext';
import { useAppContext } from '../context/AppContext';
import { useLocaleContext } from '../context/LocaleContext';
import SystemHeader from '../components/ui/SystemHeader';
import MissionBriefing from '../components/ui/MissionBriefing';
import StatsDeck from '../components/ui/StatsDeck';

import Link from '../components/SEO'; // Importing as SEO to avoid conflicts if any
import SEO from '../components/SEO';

const HomePage: React.FC = () => {
  const { onRunTests, onNavigate } = useTerminalContext();
  const { t } = useLocaleContext();

  if (!t) return null;

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Turan Aymis",
    "jobTitle": "Software QA Engineer",
    "url": "https://turanaymis.com",
    "sameAs": [
      "https://github.com/TuranAymis",
      "https://linkedin.com/in/turanaymis"
    ],
    "knowsAbout": ["Software Testing", "Test Automation", "Selenium", "Appium", "React"]
  };

  return (
    <div className="max-w-5xl mx-auto pt-2 md:pt-4 lg:pt-10 animate-in fade-in duration-700 w-full px-2 md:px-0">
      <SEO
        title="Turan Aymis - Software QA Engineer | Portfolio"
        description="Software QA Engineer specializing in manual and automated testing for web and mobile applications. Expert in Selenium, Appium, and functional testing."
        structuredData={personSchema}
      />
      <SystemHeader />
      <MissionBriefing
        onRunTests={onRunTests}
        onNavigateToSkills={() => onNavigate(ViewState.SKILLS)}
      />
      <StatsDeck />
    </div>
  );
};

export default HomePage;

