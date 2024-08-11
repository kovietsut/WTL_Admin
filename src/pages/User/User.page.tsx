import Iconify from '@/components/atoms/Iconify';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { ElementRef, useRef, useState } from 'react';
import { UserListTable } from './_section/UserListTable';
import { UserSearch } from './_section/UserSearch';

const UserPage = () => {
  const tableRef = useRef<ElementRef<typeof UserListTable>>(null);
  const [openPopover, setOpenPopover] = useState<null | HTMLElement>(null);

  const handleOpenAction = (event: React.MouseEvent<HTMLElement>) => {
    setOpenPopover(event.currentTarget);
  };

  const handleCloseAction = () => {
    setOpenPopover(null);
  };

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    tableRef.current?.setSearchText(event.target.value);
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
              <UserSearch onChangeKeyword={handleChangeKeyword} />
              <UserListTable
                ref={tableRef}
                openPopover={openPopover}
                onOpenAction={handleOpenAction}
                onCloseAction={handleCloseAction}
              />
            </Card>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default UserPage;
