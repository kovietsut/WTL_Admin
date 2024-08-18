import { pxToRem } from '@/utils/getFontValue';
import { Theme } from '@mui/material/styles';

export default function Input(theme: Theme) {
  return {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: pxToRem(14),
        },
      },
    },
    MuiInputBase: {
      defaultProps: {
        size: 'medium',
      },
      styleOverrides: {
        root: {
          fontSize: pxToRem(14),
          color: theme.palette.text.primary,
          backgroundColor:
            theme.palette.mode === 'dark'
              ? theme.palette.grey[800]
              : theme.palette.background.paper,
          '&.Mui-disabled': {
            '& svg': { color: theme.palette.text.disabled },
          },
        },
        input: {
          '&::placeholder': {
            opacity: 1,
            color: theme.palette.text.disabled,
            fontSize: pxToRem(14),
          },
        },
      },
    },
    MuiInput: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.grey[500_12],
          '&:hover': {
            backgroundColor: theme.palette.grey[500_16],
          },
          '&.Mui-focused': {
            backgroundColor: theme.palette.action.focus,
          },
          '&.Mui-disabled': {
            backgroundColor: theme.palette.action.disabledBackground,
          },
        },
        underline: {
          '&:before': {
            borderBottomColor: theme.palette.grey[500_56],
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[500_32],
          },
          '&.Mui-disabled': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.action.disabledBackground,
            },
          },
        },
      },
    },
  };
}
