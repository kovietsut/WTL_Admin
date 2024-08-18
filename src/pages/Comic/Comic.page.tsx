import { Box, Button, Container, Divider, Typography } from '@mui/material';
import ComicList from './_section/_list/ComicList';
import { ComicSearch } from './_section/_list/ComicSearch';
import { PATH } from '@/libs/helpers/routes';

const ComicPage = () => {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth="xl">
        <ComicSearch />
        <Box
          sx={{
            mt: 3,
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <Box>
            <Typography variant="h4">Recent Comics</Typography>
            <Typography color="text.secondary" sx={{ mt: 2 }} variant="body1">
              Discover the latest news, tips and manga research insights from Web Truyen Lo.
            </Typography>
            <Typography color="text.secondary" variant="body1">
              You can create a series in just few minutes! But, let's give you some tips before you
              start.
            </Typography>
          </Box>
          <Box>
            <Button variant="contained" color="primary" href={PATH.comics.new}>
              Add New
            </Button>
          </Box>
        </Box>
        <Divider sx={{ my: 4 }} />
        <ComicList />
      </Container>
    </Box>
  );
};

export default ComicPage;
