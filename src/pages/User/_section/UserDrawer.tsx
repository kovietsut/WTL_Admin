import Iconify from '@/components/atoms/Iconify';
import { Box, Drawer, IconButton, Stack, Typography } from '@mui/material';
import { forwardRef, useImperativeHandle } from 'react';
import { useUserStore } from '../User.state';
import { renderForm } from './UserDrawerForm';

type Props = {
  container: HTMLDivElement | null;
};

type Ref = {
  openDrawer?: boolean;
  setOpenDrawer?: (open: boolean) => void;
};

const UserDrawer = forwardRef<Ref, Props>(({ container }, ref) => {
  const { openDrawer, setOpenDrawer, drawerMode } = useUserStore();

  useImperativeHandle(ref, () => ({
    openDrawer: openDrawer,
    setOpenDrawer: (open: boolean) => setOpenDrawer && setOpenDrawer(open),
  }));

  return (
    <Drawer
      anchor="right"
      open={openDrawer}
      PaperProps={{
        sx: {
          position: 'relative',
          width: 500,
        },
      }}
      SlideProps={{ container }}
      variant="persistent"
    >
      <div>
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          sx={{
            px: 3,
            py: 2,
          }}
        >
          <Typography color="inherit" variant="h6">
            {drawerMode === 'add'
              ? 'Add User'
              : drawerMode === 'edit'
              ? 'Edit User'
              : 'User Details'}
          </Typography>
          <IconButton color="inherit" onClick={() => setOpenDrawer && setOpenDrawer(false)}>
            <Iconify icon="material-symbols-light:close" />
          </IconButton>
        </Stack>
        <Box
          sx={{
            px: 3,
            py: 4,
          }}
        >
          {renderForm(drawerMode)}
        </Box>
      </div>
    </Drawer>
  );
});

export default UserDrawer;
