import { Components, Theme } from '@mui/material/styles';

export default function Table(
  theme: Theme
): Pick<Components, 'MuiTableRow' | 'MuiTableCell' | 'MuiTablePagination'> {
  return {
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: theme.palette.action.selected,
            '&:hover': {
              backgroundColor: theme.palette.action.hover,
            },
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          // borderBottom: 'none',
        },
        head: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.neutral,
          padding: theme.spacing(1.5, 3),
          '&:first-of-type': {
            paddingLeft: theme.spacing(3),
            borderTopLeftRadius: theme.shape.borderRadius,
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(3),
            borderTopRightRadius: theme.shape.borderRadius,
          },
        },
        stickyHeader: {
          backgroundColor: theme.palette.background.paper,
          backgroundImage: `linear-gradient(to bottom, ${theme.palette.background.neutral} 0%, ${theme.palette.background.neutral} 100%)`,
        },
        body: {
          '&:first-of-type': {
            paddingLeft: theme.spacing(3),
          },
          '&:last-of-type': {
            paddingRight: theme.spacing(3),
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          borderTop: `solid 1px ${theme.palette.divider}`,
          borderBottom: 0,
        },
        toolbar: {
          height: 64,
        },
        select: {
          '&:focus': {
            borderRadius: theme.shape.borderRadius,
          },
        },
        selectIcon: {
          width: 20,
          height: 20,
          marginTop: -4,
        },
      },
    },
  };
}
