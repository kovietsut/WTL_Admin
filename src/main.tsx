import React from 'react';
import { createRoot } from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import ThemeProvider from './libs/theme';
import './index.css';
import './locales/i18n';
import ThemeSettings from './libs/theme/settings/index';
import { MotionLazyContainer } from './libs/theme/settings/animate';
import { queryClient } from './utils/reactQuery';
import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

const rootElement = document.getElementById('root') as HTMLElement;

const root = createRoot(rootElement!);

const scaffold = (Component: React.FC): void => {
  root.render(
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <MotionLazyContainer>
          <ThemeProvider>
            <ThemeSettings>
              <Component />
              <Toaster />
            </ThemeSettings>
          </ThemeProvider>
        </MotionLazyContainer>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

scaffold(App);
