import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { UserSearch } from './_section/UserSearch';
import { UserListTable } from './_section/UserListTable';
import Iconify from '@/components/atoms/Iconify';
import { useUsersIds, useUserSearch, lists } from './User.state';
import { useSelection } from '@/libs/hooks/useSelection';
import { useState } from 'react';

const UserPage = () => {
  const usersSearch = useUserSearch();
  const usersIds = useUsersIds(lists);
  const usersSelection = useSelection(usersIds);

  const [openPopover, setOpenPopover] = useState<null | HTMLElement>(null);

  const handleOpenAction = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleCloseAction = () => {
    setOpenPopover(null);
  };

  return (
    <Box sx={{ mt: 10 }}>
      <Box
        component="main"
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
                >
                  Add
                </Button>
              </Stack>
            </Stack>
            <Card>
              <UserSearch />
              <UserListTable
                openPopover={openPopover}
                onOpenAction={handleOpenAction}
                onCloseAction={handleCloseAction}
                count={lists.length}
                lists={lists}
                onDeselectAll={usersSelection.handleDeselectAll}
                onDeselectOne={usersSelection.handleDeselectOne}
                onPageChange={usersSearch.handlePageChange}
                onRowsPerPageChange={usersSearch.handleRowsPerPageChange}
                onSelectAll={usersSelection.handleSelectAll}
                onSelectOne={usersSelection.handleSelectOne}
                page={usersSearch.state.page}
                rowsPerPage={usersSearch.state.rowsPerPage}
                selected={usersSelection.selected}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default UserPage;
