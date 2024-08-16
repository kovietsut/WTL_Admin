import { FormProvider, RHFTextField } from '@/components/atoms/form';
import { TRequestUserCreate } from '@/interfaces/user';
import { useUserUpdate } from '@/services/user';
import { zodResolver } from '@hookform/resolvers/zod';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, FormControl, MenuItem, Stack, Typography } from '@mui/material';
import { memo, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { genders, roles, useUserStore, validationCreateUserSchema } from '../../User.state';
import { queryClient } from '@/utils/reactQuery';
import { Endpoint } from '@/libs/helpers/endpoint';
import toast from 'react-hot-toast';
import RHFSelect from '@/components/atoms/form/RHFSelect';

const UserEditForm = memo(() => {
  const { userId, user, setDrawerMode } = useUserStore();

  const defaultValues = useMemo<TRequestUserCreate>(
    () => ({
      email: user?.email,
      address: user?.address,
      fullName: user?.fullName,
      gender: user?.gender,
      phoneNumber: user?.phoneNumber,
      roleId: user?.roleId,
    }),
    [user]
  );

  const { isPending, mutateAsync: update, error } = useUserUpdate(userId);

  const methods = useForm<TRequestUserCreate>({
    resolver: zodResolver(validationCreateUserSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = async (data: TRequestUserCreate) => {
    try {
      const result = await update(data);
      if (result.status === 200) {
        toast.success('Edit Success');
      }
      queryClient.invalidateQueries({ queryKey: [Endpoint.user.search] });
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
              Email
            </Typography>
            <RHFTextField placeholder="Email" name="email" />
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
          <Button color="inherit" type="reset" size="small" onClick={handleReset}>
            Cancel
          </Button>
        </Stack>
      </Stack>
    </FormProvider>
  );
});

export default UserEditForm;
