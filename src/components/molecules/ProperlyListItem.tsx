import { Box, ListItem, ListItemBaseProps, ListItemText, Typography } from '@mui/material';
import { ReactNode } from 'react';

type Props = {
  align?: 'horizontal' | 'vertical';
  children?: ReactNode;
  disableGutters?: boolean;
  label: string;
  value?: string;
} & ListItemBaseProps;

const PropertyListItem = ({
  align = 'vertical',
  children,
  disableGutters,
  label,
  value,
  ...rest
}: Props) => {
  return (
    <ListItem
      sx={{
        px: disableGutters ? 0 : 3,
        py: 1.5,
      }}
      {...rest}
    >
      <ListItemText
        disableTypography
        primary={
          <Typography sx={{ minWidth: align === 'vertical' ? 'inherit' : 180 }} variant="subtitle2">
            {label}
          </Typography>
        }
        secondary={
          <Box
            sx={{
              flex: 1,
              mt: align === 'vertical' ? 0.5 : 0,
            }}
          >
            {children || (
              <Typography color="text.secondary" variant="body2">
                {value}
              </Typography>
            )}
          </Box>
        }
        sx={{
          display: 'flex',
          flexDirection: align === 'vertical' ? 'column' : 'row',
          my: 0,
        }}
      />
    </ListItem>
  );
};

export default PropertyListItem;
