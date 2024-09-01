import Iconify from '@/components/atoms/Iconify';
import { Autocomplete, Box, Button, Card, Grid, TextField } from '@mui/material';
import { genres, platformOptions } from '../../Comic.state';

export const ComicSearch = () => {
  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              defaultValue=""
              fullWidth
              label="Search"
              name="query"
              placeholder="Title or description"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              sx={{ minWidth: '100px' }}
              multiple
              getOptionLabel={(option) => option.label}
              options={genres}
              renderInput={(params) => <TextField {...params} label="Genre" name="genre" />}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              defaultValue="adult"
              fullWidth
              label="Adult"
              name="Adult"
              select
              SelectProps={{ native: true }}
            >
              {platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              defaultValue="language"
              fullWidth
              label="Language"
              name="Language"
              select
              SelectProps={{ native: true }}
            >
              {platformOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            <Button
              size="large"
              startIcon={<Iconify icon="material-symbols:search" />}
              variant="contained"
              fullWidth
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};
