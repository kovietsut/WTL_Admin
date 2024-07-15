import getColorPresets, { colorPresets } from '@/utils/getColorPresets';
import {
  TSettingsStore,
  ThemeColorPresets,
  ThemeContrast,
  ThemeDirection,
  ThemeLayout,
  ThemeMode,
} from './type';
import { defaultSettings } from '@/config';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { logger } from '@/utils/store.log';

const settingsStore = create<TSettingsStore>()(
  persist(
    logger<TSettingsStore>((set, get) => ({
      ...defaultSettings,

      setColor: () => getColorPresets(get().themeColorPresets),
      colorOption: (colorPresets as any).map((color: { name: string; main: string }) => ({
        name: color.name,
        value: color?.main,
      })),
      onToggleMode: () => {
        set((state) => ({
          themeMode: state.themeMode === 'light' ? 'dark' : 'light',
        }));
      },
      onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => {
        set({
          themeMode: (event.target as HTMLInputElement).value as ThemeMode,
        });
      },
      onToggleDirection: () => {
        set((state) => ({
          themeDirection: state.themeDirection === 'rtl' ? 'ltr' : 'rtl',
        }));
      },
      onChangeDirection: (event: React.ChangeEvent<HTMLInputElement>) => {
        set({
          themeDirection: (event.target as HTMLInputElement).value as ThemeDirection,
        });
      },
      onChangeDirectionByLang: (lang: string) => {
        set({
          themeDirection: lang === 'ar' ? 'rtl' : 'ltr',
        });
      },
      onToggleLayout: () => {
        set((state) => ({
          themeLayout: state.themeLayout === 'vertical' ? 'horizontal' : 'vertical',
        }));
      },
      onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => {
        set((_) => ({
          themeLayout: (event.target as HTMLInputElement).value as ThemeLayout,
        }));
      },
      onToggleContrast: () => {
        set((state) => ({
          themeContrast: state.themeContrast === 'default' ? 'bold' : 'default',
        }));
      },
      onChangeContrast: (event: React.ChangeEvent<HTMLInputElement>) => {
        set((_) => ({
          themeContrast: (event.target as HTMLInputElement).value as ThemeContrast,
        }));
      },
      onChangeColor: (event: React.ChangeEvent<HTMLInputElement>) => {
        set((_) => ({
          themeColorPresets: (event.target as HTMLInputElement).value as ThemeColorPresets,
        }));
      },
      onToggleStretch: () => {
        set((state) => ({
          themeStretch: !state.themeStretch,
        }));
      },
      onResetSetting: () => {
        set((_) => defaultSettings);
      },
    })),

    {
      name: 'settings',
      storage: createJSONStorage(() => localStorage),
      partialize: (state: TSettingsStore) => ({
        themeMode: state.themeMode,
        themeLayout: state.themeLayout,
        themeStretch: state.themeStretch,
        themeContrast: state.themeContrast,
        themeDirection: state.themeDirection,
        themeColorPresets: state.themeColorPresets,
      }),
    }
  )
);

export default settingsStore;
export const useSettings = settingsStore;
