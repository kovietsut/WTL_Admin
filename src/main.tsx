import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import NotistackProvider from './components/atoms/NotistackProvider';
import { MotionLazyContainer } from './components/atoms/animate';
import './index.css';
import ThemeProvider from './libs/theme';
import './locales/i18n';
import { SettingsProvider } from './store/SettingsContext';

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement!);

const scaffold = (Component: React.FC): void => {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <SettingsProvider>
          <MotionLazyContainer>
            <ThemeProvider>
              <NotistackProvider>
                <Component />
              </NotistackProvider>
            </ThemeProvider>
          </MotionLazyContainer>
        </SettingsProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

scaffold(App);
