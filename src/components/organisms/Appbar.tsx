import { APP_NAME } from '@/config';
import { APPBAR, SIDENAV } from '@/libs/helpers/constants';
import { PATH } from '@/libs/helpers/routes';
import {
  AppBar,
  Box,
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
import { useAuth } from '@/store/useAuth';

type TOption = {
  id: string;
  value: string;
  link?: string;
};

const SETTING_OPTIONS: TOption[] = [{ id: '1', value: 'Profile' }];

type Props = {
  variant: 'detail' | 'dense';
};

const Appbar: React.FC<Props> = ({ variant }) => {
  // const isDesktop = useResponsive('up', 'lg');
  const { credential, signOut } = useAuth();
  const theme = useTheme();
  const isLight = theme.palette.mode === 'dark';

  const [anchorElSetting, setAnchorElSetting] = useState<HTMLElement | null>(null);

  const navigate = useNavigate();

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
  const openSetting: boolean = Boolean(anchorElSetting);

  const onSignOut = (): void => {
    signOut();
    navigate(PATH.auth.login);
  };

  return (
    <AppBar
      sx={{
        height: APPBAR.height,
        width: {
          lg: `calc(100% - ${SIDENAV.width}px)`,
        },
      }}
      elevation={0}
    >
      <Toolbar>
        {/* Breadcumb here */}
        <Link href={PATH.home} variant="h6" underline="none" color="common.black">
          {APP_NAME}
        </Link>
        {isDetail && (
          <>
            <Stack direction="row-reverse" flexGrow={1}>
              <Stack direction="row" spacing={1}>
                <IconButton onClick={onSettingClick} size="small">
                  <Iconify icon="radix-icons:avatar" width={24} height={24} />
                </IconButton>
              </Stack>
            </Stack>
            <MenuPopover open={openSetting} anchorEl={anchorElSetting} onClose={handleSettingClose}>
              <Box sx={{ my: 1.5, px: 2.5, display: 'flex', gap: 1, alignItems: 'center' }}>
                <Iconify
                  icon="iconamoon:profile"
                  width={15}
                  height={15}
                  sx={{ color: isLight ? theme.palette.grey[600] : theme.palette.grey[400] }}
                />
                <Typography variant="subtitle2" color="text.secondary">
                  {credential?.email || 'Admin'}
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
  );
};

export default Appbar;
