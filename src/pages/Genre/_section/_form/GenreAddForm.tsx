import { FormProvider, RHFTextField } from '@/components/atoms/form';
import { TRequestGenreCreate } from '@/interfaces/genre';
import { useGenreCreate } from '@/services/genre';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, FormControl, Stack, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useGenreStore, validationCreateGenreSchema } from '../../Genre.state';
import { queryClient } from '@/utils/reactQuery';
import { Endpoint } from '@/libs/helpers/endpoint';
import toast from 'react-hot-toast';

const GenreAddForm = memo(() => {
  const { genre, setDrawerMode } = useGenreStore();

  const defaultValues = useMemo<TRequestGenreCreate>(
    () => ({
      name: genre?.name,
    }),
    [genre]
  );

  const { isPending, mutateAsync: create, error } = useGenreCreate();

  const methods = useForm<TRequestGenreCreate>({
    resolver: zodResolver(validationCreateGenreSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: TRequestGenreCreate) => {
    try {
      const result = await create(data);
      if (result.status === 200) {
        toast.success('Create Success');
      }
      queryClient.invalidateQueries({ queryKey: [Endpoint.genre.search] });
      setDrawerMode && setDrawerMode('detail');
    } catch (error) {
      console.log(error);
    }
  };

  const handleReset = () => {
    setDrawerMode && setDrawerMode('detail');
  };

  if (error)
    return <Typography color="textSecondary">Something went wrong with update data</Typography>;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <Stack spacing={3}>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={500}>
              Genre name:
            </Typography>
            <RHFTextField placeholder="Genre name" name="name" />
          </FormControl>
        </Stack>
        <Stack alignItems="center" direction="row" flexWrap="wrap" spacing={2}>
          <LoadingButton
            color="primary"
            type="submit"
            size="small"
            variant="contained"
            loading={isPending}
          >
            Save changes
          </LoadingButton>
          <Button color="inherit" type="reset" size="small" onClick={handleReset}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
});

export default GenreAddForm;
