import Iconify from '@/components/atoms/Iconify';
import PropertyList from '@/components/atoms/PropertyList';
import PropertyListItem from '@/components/molecules/ProperlyListItem';
import useResponsive from '@/libs/hooks/useResponsive';
import { useFetchGenreById } from '@/services/genre';
import {  Button, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useGenreStore } from '../../Genre.state';

const GenreDetailForm = memo(() => {
  const lgUp = useResponsive('up', 'lg');
  const align = lgUp ? 'horizontal' : 'vertical';
  const { genreId, setDrawerMode, setGenre } = useGenreStore();
  const { data, error } = useFetchGenreById(genreId);
  const genre = data?.data;

  const handleOpenEditForm = () => {
    genre && setGenre && setGenre(genre);
    setDrawerMode && setDrawerMode('edit');
  };

  if (error) return <Typography color="textSecondary">Something went wrong</Typography>;

  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Stack alignItems="center" direction="row" justifyContent="space-between" spacing={3}>
          <Typography variant="h6">Details</Typography>
          <Button
            color="inherit"
            onClick={handleOpenEditForm}
            size="small"
            startIcon={
              <Iconify sx={{ mr: 1 }} icon="material-symbols:edit" width={24} height={24} />
            }
          >
            Edit
          </Button>
        </Stack>
        <PropertyList>
          <PropertyListItem
            align={align}
            disableGutters
            divider
            label="ID"
            value={genre?.id ? genre?.id.toString() : '-'}
          />
          <PropertyListItem align={align} disableGutters divider label="Genre">
            <Typography color="text.secondary" variant="body2">
              {genre?.name ?? '-'}
            </Typography>
          </PropertyListItem>
        </PropertyList>
      </Stack>
    </Stack>
  );
});

export default memo(GenreDetailForm);
  