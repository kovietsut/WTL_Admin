import { FormProvider, RHFTextField } from '@/components/atoms/form';
import RHFSelect from '@/components/atoms/form/RHFSelect';
import { TRequestUserCreate } from '@/interfaces/user';
import { Endpoint } from '@/libs/helpers/endpoint';
import { useUserCreate } from '@/services/user';
import { queryClient } from '@/utils/reactQuery';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, FormControl, MenuItem, Stack, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { genders, roles, useUserStore, validationCreateUserSchema } from '../../User.state';

const UserAddForm = memo(() => {
  const { setOpenDrawer } = useUserStore();

  const defaultValues = useMemo<TRequestUserCreate>(
    () => ({
      email: '',
      password: '',
      address: '',
      fullName: '',
      gender: '',
      phoneNumber: '',
      roleId: 1,
    }),
    []
  );

  const { isPending, mutateAsync: create, error } = useUserCreate();

  const methods = useForm<TRequestUserCreate>({
    resolver: zodResolver(validationCreateUserSchema),
    defaultValues,
  });

  const { handleSubmit, reset } = methods;

  const onSubmit = async (data: TRequestUserCreate) => {
    try {
      const result = await create(data);
      if (result.status === 200) {
        toast.success('Create Success');
      }
      queryClient.invalidateQueries({ queryKey: [Endpoint.user.search] });
      setOpenDrawer && setOpenDrawer(false);
    } catch (error) {
      console.log(error);
    }
  };

  if (error) return <Typography color="textSecondary">Something went wrong</Typography>;

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={6}>
        <Stack spacing={3}>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={500}>
              Email
            </Typography>
            <RHFTextField placeholder="Email" name="email" />
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={500}>
              Password
            </Typography>
            <RHFTextField placeholder="Password" name="password" type="password" />
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={500}>
              Address
            </Typography>
            <RHFTextField placeholder="Address" name="address" />
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={500}>
              Full Name
            </Typography>
            <RHFTextField placeholder="Full Name" name="fullName" />
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={500}>
              Phone Number
            </Typography>
            <RHFTextField placeholder="Phone Number" name="phoneNumber" />
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={500}>
              Role
            </Typography>
            <RHFSelect placeholder="Role" name="roleId">
              {roles.map((role) => (
                <MenuItem key={role.value} value={role.value}>
                  {role.label}
                </MenuItem>
              ))}
            </RHFSelect>
          </FormControl>
          <FormControl>
            <Typography variant="subtitle2" fontWeight={500}>
              Gender
            </Typography>
            <RHFSelect placeholder="Gender" name="gender">
              {genders.map((gender) => (
                <MenuItem key={gender.value} value={gender.value}>
                  {gender.label}
                </MenuItem>
              ))}
            </RHFSelect>
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
          <Button color="inherit" type="reset" size="small" onClick={() => reset()}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
});

export default UserAddForm;
