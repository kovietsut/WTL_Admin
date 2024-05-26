import './locales/i18n';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { HelmetProvider } from 'react-helmet-async';
import { queryClient } from './utils/reactQuery';
import NotistackProvider from './components/atoms/NotistackProvider';
import ThemeProvider from './libs/theme';
import { SettingsProvider } from './store/SettingsContext';
import { MotionLazyContainer } from './components/atoms/animate';

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement!);

const scaffold = (Component: React.FC): void => {
  root.render(
    <React.StrictMode>
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <SettingsProvider>
            <MotionLazyContainer>
              <ThemeProvider>
                <NotistackProvider>
                  <Component />
                </NotistackProvider>
              </ThemeProvider>
            </MotionLazyContainer>
          </SettingsProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </HelmetProvider>
    </React.StrictMode>
  );
};

scaffold(App);
