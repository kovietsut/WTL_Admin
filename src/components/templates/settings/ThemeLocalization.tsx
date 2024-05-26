import { ReactNode } from 'react';
import { ThemeProvider, createTheme, useTheme } from '@mui/material/styles';
import useLocales from '@/libs/hooks/useLocales';

type Props = {
  children: ReactNode;
};

export default function ThemeLocalization({ children }: Props) {
  const defaultTheme = useTheme();

  const { currentLang } = useLocales();

  const theme = createTheme(defaultTheme, currentLang.systemValue);
  // const theme = createTheme(defaultTheme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
