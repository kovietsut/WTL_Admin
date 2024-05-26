import { Popover, PopoverProps, SxProps } from '@mui/material';

interface Props extends PopoverProps {
  sx?: SxProps;
}

export default function MenuPopover({ sx, children, ...rest }: Props): JSX.Element {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      PaperProps={{
        sx: {
          p: 1,
          width: 200,
          overflow: 'inherit',
          ...sx,
        },
      }}
      {...rest}
    >
      {children}
    </Popover>
  );
}
