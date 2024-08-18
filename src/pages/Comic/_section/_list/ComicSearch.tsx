import Iconify from '@/components/atoms/Iconify';
import { Autocomplete, Box, Button, Card, Stack, TextField } from '@mui/material';
import { genres, platformOptions } from '../../Comic.state';

export const ComicSearch = () => {
  return (
    <Card>
      <Stack alignItems="center" direction="row" flexWrap="wrap" gap={3} sx={{ p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            defaultValue=""
            fullWidth
            label="Search"
            name="query"
            placeholder="Title or description"
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Autocomplete
            sx={{ minWidth: '100px' }}
            multiple
            getOptionLabel={(option) => option.label}
            options={genres}
            renderInput={(params) => <TextField {...params} label="Genre" name="genre" />}
          />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            defaultValue="web"
            fullWidth
            label="Status"
            name="status"
            select
            SelectProps={{ native: true }}
          >
            {platformOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <TextField
            defaultValue="web"
            fullWidth
            label="Public"
            name="public"
            select
            SelectProps={{ native: true }}
          >
            {platformOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Box>
        <Button
          size="large"
          startIcon={<Iconify icon="material-symbols:search" />}
          variant="contained"
        >
          Search
        </Button>
      </Stack>
    </Card>
  );
};
