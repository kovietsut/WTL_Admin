import Iconify from '@/components/atoms/Iconify';
import { FormProvider, RHFTextField } from '@/components/atoms/form';
import { LoginFormProps } from '@/interfaces/login';
import { PATH } from '@/libs/helpers/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { validationSchema } from '../Login.state';
import { useLogin } from '@/services/login';
import useAuth from '@/store/useAuth';

const LoginForm = () => {
  const { setCredential } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = useMemo<LoginFormProps>(
    () => ({
      email: 'nguyentienphat9x@gmail.com',
      password: '12345678',
    }),
    []
  );
  const { isPending, mutateAsync: signIn, error } = useLogin();

  const methods = useForm<LoginFormProps>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isValid },
  } = methods;

  const onSubmit = async (data: LoginFormProps) => {
    const response = await signIn(data);
    setCredential(response.data);
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box mb={20} px={2}>
        <Stack spacing={3}>
          {!!error && <Alert severity="error">{error.message}</Alert>}

          <Typography variant="h2" fontWeight={600}>
            Login
          </Typography>

          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={500}>
              Email
            </Typography>
            <RHFTextField name="email" placeholder="Email" />
          </Stack>

          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={500}>
              Password
            </Typography>
            <RHFTextField
              name="password"
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      size="small"
                    >
                      <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="end" sx={{ my: 2 }}>
          <Link variant="subtitle2" href={PATH.auth.login}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="medium"
          type="submit"
          variant="contained"
          loading={isPending}
          disabled={!isValid}
        >
          Login
        </LoadingButton>
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
