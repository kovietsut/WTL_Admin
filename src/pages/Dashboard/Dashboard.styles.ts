import { TStyle } from '@/interfaces/common';
import { useTheme } from '@mui/material';

const useStyle = (): TStyle => {
  const theme = useTheme();
  return {
    header: {
      color: theme.palette.primary.main,
    },
    card: {
      padding: 3,
    },
    wrap: {
      gap: 3,
    },
  };
};

export default useStyle;
