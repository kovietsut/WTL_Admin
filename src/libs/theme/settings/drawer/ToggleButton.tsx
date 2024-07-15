import IconButtonAnimate from '@/components/atoms/IconButtonAnimate';
import Iconify from '@/components/atoms/Iconify';
import { Tooltip } from '@mui/material';
import { alpha } from '@mui/material/styles';

type Props = {
  open: boolean;
  onToggle: VoidFunction;
};

export default function ToggleButton({ open, onToggle }: Props) {
  return (
    <Tooltip title="Settings" placement="left">
      <IconButtonAnimate
        color="inherit"
        onClick={onToggle}
        sx={{
          p: 1.25,
          transition: (theme) => theme.transitions.create('all'),
          '&:hover': {
            color: 'primary.main',
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity),
          },
        }}
      >
        <Iconify icon="eva:options-2-fill" width={20} height={20} />
      </IconButtonAnimate>
    </Tooltip>
  );
}
