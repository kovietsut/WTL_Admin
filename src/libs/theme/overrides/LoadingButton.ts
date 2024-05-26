import { Theme } from '@mui/material/styles';

declare module '@mui/lab/LoadingButton' {
  interface LoadingButtonPropsVariantOverrides {
    shape: 'pill' | 'rectangle';
  }
}

export default function LoadingButton(theme: Theme) {
  return {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          '&.MuiButton-text': {
            '& .MuiLoadingButton-startIconPendingStart': {
              marginLeft: 0,
            },
            '& .MuiLoadingButton-endIconPendingEnd': {
              marginRight: 0,
            },
          },
        },
      },
    },
  };
}
