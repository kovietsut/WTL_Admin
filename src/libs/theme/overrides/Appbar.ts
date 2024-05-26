import { Theme } from '@mui/material/styles';

export default function Appbar(theme: Theme) {
  return {
    MuiAppbar: {
      styleOverrides: {
        colorDefault: theme.palette.background.default,
        root: {
          position: 'relative',
          borderRadius: Number(theme.shape.borderRadius) * 2,
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
  };
}
