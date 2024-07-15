import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ThemeProvider from './libs/theme';
import './index.css';
import './locales/i18n';
import ThemeSettings from './libs/theme/settings/index';
import { MotionLazyContainer } from './libs/theme/settings/animate';

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement!);

const scaffold = (Component: React.FC): void => {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <Component />
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </HelmetProvider>
    </React.StrictMode>
  );
};

scaffold(App);
