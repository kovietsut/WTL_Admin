import Iconify from '@/components/atoms/Iconify';
import { Box, Button, Card, Container, Stack, Typography } from '@mui/material';
import { ElementRef, useRef } from 'react';
import GenreDrawer from './_section/_form/GenreDrawer';
import { GenreListTable } from './_section/_list/GenreListTable';
import { GenreSearch } from './_section/_list/GenreSearch';
import { useGenreStore } from './Genre.state';
import { ListContainer } from './Genre.style';

const GenrePage = () => {
  const rootRef = useRef(null);
  const tableRef = useRef<ElementRef<typeof GenreListTable>>(null);
  const drawerRef = useRef<ElementRef<typeof GenreDrawer>>(null);
  const { openDrawer, setOpenDrawer, setDrawerMode } = useGenreStore();

  const handleChangeKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    tableRef.current?.setSearchText(event.target.value);
  };

  const handleAddGenre = () => {
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
                <Typography variant="h4">Genres</Typography>
              </Stack>
              <Stack alignItems="center" direction="row" spacing={3}>
                <Button
                  startIcon={<Iconify icon="ic:baseline-plus" width={24} height={24} />}
                  variant="contained"
                  onClick={handleAddGenre}
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
                  <GenreSearch onChangeKeyword={handleChangeKeyword} />
                  <GenreListTable ref={tableRef} />
                </Card>
              </ListContainer>
              <GenreDrawer ref={drawerRef} container={rootRef.current} />
            </Box>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
};

export default GenrePage;
