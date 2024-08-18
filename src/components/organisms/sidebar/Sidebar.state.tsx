import Iconify from '@/components/atoms/Iconify';
import { PATH } from '@/libs/helpers/routes';
import { createContext, useContext, useMemo } from 'react';

const initialSettings = {
  colorPreset: 'indigo',
  contrast: 'normal',
  direction: 'ltr',
  layout: 'vertical',
  navColor: 'evident',
  paletteMode: 'light',
  responsiveFontSizes: true,
  stretch: false,
};

const initialState = {
  ...initialSettings,
  isInitialized: false,
  openDrawer: false,
};

const SettingsContext = createContext({
  ...initialState,
  handleDrawerClose: () => {},
  handleDrawerOpen: () => {},
  handleReset: () => {},
  handleUpdate: () => {},
  isCustom: false,
});

export const useSettings = () => useContext(SettingsContext);

export const useSections = () => {
  //   const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        title: '', // Added title
        path: '', // Added path
        items: [
          {
            title: 'Dashboard',
            path: PATH.home,
            icon: <Iconify width={24} height={24} icon="material-symbols:home" color="#404958" />,
          },
          {
            title: 'Comics',
            path: PATH.comics.list,
            icon: <Iconify width={24} height={24} icon="ri:book-fill" color="#404958" />,
          },
          {
            title: 'Users',
            path: PATH.user,
            icon: <Iconify width={24} height={24} icon="ph:user-fill" color="#404958" />,
          },
          {
            title: 'Genres',
            path: PATH.genres,
            icon: (
              <Iconify
                width={24}
                height={24}
                icon="material-symbols:type-specimen"
                color="#404958"
              />
            ),
          },
          {
            title: 'Comments',
            path: PATH.comments,
            icon: (
              <Iconify width={24} height={24} icon="material-symbols:comment" color="#404958" />
            ),
          },
          {
            title: 'Settings',
            path: PATH.settings,
            icon: (
              <Iconify width={24} height={24} icon="material-symbols:settings" color="#404958" />
            ),
          },
        ],
      },
    ];
  }, []);
};
