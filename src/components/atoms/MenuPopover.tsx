import { Popover, PopoverProps, SxProps } from '@mui/material';

interface Props extends PopoverProps {
  sx?: SxProps;
}

export default function MenuPopover({ sx, children, ...rest }: Props): JSX.Element {
  return (
    <Popover
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      {...rest}
    >
      {children}
    </Popover>
  );
}
