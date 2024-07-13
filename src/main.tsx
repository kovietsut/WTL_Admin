import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './index.css';
import './locales/i18n';

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement!);

const scaffold = (Component: React.FC): void => {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <Component />
      </HelmetProvider>
    </React.StrictMode>
  );
};

scaffold(App);
