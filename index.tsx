import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Migrate legacy HashRouter URLs (e.g. /#/projects) to real paths (/projects)
// before the BrowserRouter mounts, so old bookmarks/links keep working.
if (window.location.hash.startsWith('#/')) {
  const target = window.location.hash.slice(1);
  window.history.replaceState(null, '', target || '/');
}

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}