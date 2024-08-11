import Iconify from '@/components/atoms/Iconify';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { ElementRef, useRef } from 'react';
import UserDrawer from './_section/UserDrawer';
import { UserListTable } from './_section/UserListTable';
import { UserSearch } from './_section/UserSearch';
import { useUserStore } from './User.state';
import { ListContainer } from './User.styles';

const UserPage = () => {
  const rootRef = useRef(null);
  const tableRef = useRef<ElementRef<typeof UserListTable>>(null);
  const drawerRef = useRef<ElementRef<typeof UserDrawer>>(null);
  const { openDrawer, setOpenDrawer, setDrawerMode } = useUserStore();

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    tableRef.current?.setSearchText(event.target.value);
  };

  const handleAddUser = () => {
    setDrawerMode && setDrawerMode('add');
    setOpenDrawer && setOpenDrawer(true);
  };

  return (
    <Box
      sx={{
        mt: 10,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={4}>
            <Stack direction="row" justifyContent="space-between" spacing={4}>
              <Stack spacing={1}>
                <Typography variant="h4">Users</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={<Iconify icon="ic:baseline-plus" width={24} height={24} />}
                  variant="contained"
                  onClick={handleAddUser}
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Box
              ref={rootRef}
              sx={{
                display: 'flex',
                flex: '1 1 auto',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              <ListContainer open={openDrawer}>
                <Card>
                  <UserSearch onChangeKeyword={handleChangeKeyword} />
                  <UserListTable ref={tableRef} />
                </Card>
              </ListContainer>
              <UserDrawer ref={drawerRef} container={rootRef.current} />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default UserPage;
