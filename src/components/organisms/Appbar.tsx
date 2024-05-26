import { APP_NAME } from '@/config';
import { APPBAR } from '@/libs/helpers/constants';
import { PATH } from '@/libs/helpers/routes';
import { SETTING_OPTIONS, TOption, VERSION_OPTIONS } from '@/libs/lookup/options';
import { useAuth } from '@/store/module/auth/useAuth';
import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Link,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Iconify from '../atoms/Iconify';
import MenuPopover from '../atoms/MenuPopover';
import { useVersion } from '@/store/module/version/useVersion';

type Props = {
  variant: 'detail' | 'dense';
};

const Appbar: React.FC<Props> = ({ variant }) => {
  // const isDesktop = useResponsive('up', 'lg');
  const { credential, signOut } = useAuth();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const [anchorElVersion, setAnchorElVersion] = useState<HTMLElement | null>(null);
  const [anchorElSetting, setAnchorElSetting] = useState<HTMLElement | null>(null);

  const { version, setVersion } = useVersion();
  const navigate = useNavigate();

  const onVersionClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElVersion(event.currentTarget);
  };

  const handleVersionClose = (): void => {
    setAnchorElVersion(null);
  };

  const handleVersionSelect = (value: TOption): void => {
    handleVersionClose();
    setVersion(value.id);
  };

  const handleSettingClose = (): void => {
    setAnchorElSetting(null);
  };

  const handleSettingSelect = (value: TOption): void => {
    handleSettingClose();
    if (value.link) {
      navigate(value.link);
    }
  };

  const onSettingClick = (event: React.MouseEvent<HTMLElement>): void => {
    setAnchorElSetting(event.currentTarget);
  };

  const isDetail = variant === 'detail';
  const openVersion: boolean = Boolean(anchorElVersion);
  const openSetting: boolean = Boolean(anchorElSetting);

  const onSignOut = (): void => {
    signOut();
    navigate(PATH.auth.login);
  };

  return (
    <>
      <AppBar sx={{ height: APPBAR.height }} color="default" elevation={0}>
        <Toolbar>
          <Link href={PATH.home} variant="h6" underline="none" color="common.black">
            {APP_NAME}
          </Link>
          {isDetail && (
            <>
              <Stack direction="row-reverse" flexGrow={1}>
                <Stack direction="row" spacing={1}>
                  <Button
                    variant="text"
                    size="small"
                    sx={{ borderRadius: 50 }}
                    onClick={onVersionClick}
                  >
                    {VERSION_OPTIONS.find((option) => option.id === version)?.value ?? 'unknown'}
                    <Iconify
                      icon="material-symbols:arrow-drop-down-rounded"
                      width={20}
                      height={20}
                    />
                  </Button>
                  <IconButton onClick={onSettingClick} size="small">
                    <Iconify icon="iconamoon:menu-burger-horizontal" width={20} height={20} />
                  </IconButton>
                </Stack>
              </Stack>

              <MenuPopover
                open={openVersion}
                anchorEl={anchorElVersion}
                onClose={handleVersionClose}
              >
                <Box sx={{ my: 1.5, px: 2.5 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Version
                  </Typography>
                </Box>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Stack sx={{ p: 1 }}>
                  {VERSION_OPTIONS.map((option) => (
                    <MenuItem
                      key={option.value}
                      onClick={() => handleVersionSelect(option)}
                      sx={{ borderRadius: 2 }}
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </Stack>
              </MenuPopover>
              <MenuPopover
                open={openSetting}
                anchorEl={anchorElSetting}
                onClose={handleSettingClose}
              >
                <Box sx={{ my: 1.5, px: 2.5, display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Iconify
                    icon="iconamoon:profile"
                    width={15}
                    height={15}
                    sx={{ color: isLight ? theme.palette.grey[600] : theme.palette.grey[400] }}
                  />
                  <Typography variant="subtitle2" color="text.secondary">
                    {credential?.username || 'Admin'}
                  </Typography>
                </Box>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Stack sx={{ p: 1 }}>
                  {SETTING_OPTIONS.map((option: TOption) => (
                    <MenuItem
                      key={option.value}
                      onClick={() => handleSettingSelect(option)}
                      sx={{ borderRadius: 2 }}
                    >
                      {option.value}
                    </MenuItem>
                  ))}
                </Stack>
                <Divider sx={{ borderStyle: 'dashed' }} />
                <Box p={1}>
                  <MenuItem onClick={onSignOut} sx={{ borderRadius: 2 }}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Logout
                    </Typography>
                  </MenuItem>
                </Box>
              </MenuPopover>
            </>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Appbar;
