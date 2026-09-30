import React from 'react';
import { ViewState } from '../types';
import { useTerminalContext } from '../context/TerminalContext';
import { useAppContext } from '../context/AppContext';
import { useLocaleContext } from '../context/LocaleContext';
import SystemHeader from '../components/ui/SystemHeader';
import MissionBriefing from '../components/ui/MissionBriefing';
import StatsDeck from '../components/ui/StatsDeck';

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
      "https://www.linkedin.com/in/turan-aymis/"
    ],
    "knowsAbout": ["Software Testing", "Test Automation", "Selenium", "Appium", "React"]
  };

  return (
    <div className="max-w-5xl mx-auto pt-2 md:pt-4 lg:pt-10 animate-in fade-in duration-700 w-full px-2 md:px-0">
      <SEO
        title="Turan Aymis - Senior Software QA Engineer | Portfolio"
        description="Senior Software QA Engineer with 7+ years in banking, e-commerce, web, mobile and API testing. Test automation with Playwright, Selenium and Appium; AI-assisted testing with LLM-as-a-Judge."
        structuredData={personSchema}
      />
      <SystemHeader />
      <MissionBriefing
        onRunTests={onRunTests}
        onNavigateToSkills={() => onNavigate(ViewState.SKILLS)}
        onNavigateToProjects={() => onNavigate(ViewState.PROJECTS)}
      />
      <StatsDeck />
    </div>
  );
};

export default HomePage;
