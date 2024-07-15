import Iconify from '@/components/atoms/Iconify';
import Scrollbar from '@/components/atoms/ScrollBar';
import { SIDENAV } from '@/libs/helpers/constants';
import { useGlobalStore } from '@/store/global';
import cssStyles from '@/utils/cssStyles';
import { Backdrop, Divider, IconButton, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { AnimatePresence, m } from 'framer-motion';
import { useEffect } from 'react';
import { useSettings } from '../../settings';
import { varFade } from '../animate';
import SettingColorPresets from './SettingColorPresets';
import SettingContrast from './SettingContrast';
import SettingDirection from './SettingDirection';
import SettingFullscreen from './SettingFullscreen';
import SettingMode from './SettingMode';
import SettingStretch from './SettingStretch';

const RootStyle = styled(m.div)(({ theme }) => ({
  ...cssStyles(theme).bgBlur({ color: theme.palette.background.paper, opacity: 0.92 }),
  top: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  position: 'fixed',
  overflow: 'hidden',
  width: SIDENAV.width,
  flexDirection: 'column',
  margin: theme.spacing(2),
  paddingBottom: theme.spacing(3),
  zIndex: theme.zIndex.drawer + 3,
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  boxShadow: `-24px 12px 32px -4px ${alpha(
    theme.palette.mode === 'light' ? theme.palette.grey[500] : theme.palette.common.black,
    0.16
  )}`,
}));

export default function SettingsDrawer() {
  const { themeDirection, onResetSetting } = useSettings();
  const { openThemeSetting: open, setOpenThemeSetting: setOpen } = useGlobalStore();

  const varSidebar =
    themeDirection !== 'rtl'
      ? varFade({
          distance: SIDENAV.width,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inRight
      : varFade({
          distance: SIDENAV.width,
          durationIn: 0.32,
          durationOut: 0.32,
        }).inLeft;

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  if (!open) {
    return <></>;
  }

  return (
    <>
      <Backdrop
        open={open}
        onClick={handleClose}
        sx={{ background: 'transparent', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      />

      <AnimatePresence>
        <>
          <RootStyle {...varSidebar}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={{ py: 2, pr: 1, pl: 2.5 }}
            >
              <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                Settings
              </Typography>

              <IconButton onClick={onResetSetting}>
                <Iconify icon={'ic:round-refresh'} width={20} height={20} />
              </IconButton>

              <IconButton onClick={handleClose}>
                <Iconify icon={'eva:close-fill'} width={20} height={20} />
              </IconButton>
            </Stack>

            <Divider sx={{ borderStyle: 'dashed' }} />

            <Scrollbar sx={{ flexGrow: 1 }}>
              <Stack spacing={3} sx={{ p: 3 }}>
                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Mode</Typography>
                  <SettingMode />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Contrast</Typography>
                  <SettingContrast />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Direction</Typography>
                  <SettingDirection />
                </Stack>

                {/* <Stack spacing={1.5}>
                    <Typography variant="subtitle2">Layout</Typography>
                    <SettingLayout />
                  </Stack> */}

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Presets</Typography>
                  <SettingColorPresets />
                </Stack>

                <Stack spacing={1.5}>
                  <Typography variant="subtitle2">Stretch</Typography>
                  <SettingStretch />
                </Stack>

                <SettingFullscreen />
              </Stack>
            </Scrollbar>
          </RootStyle>
        </>
      </AnimatePresence>
    </>
  );
}
