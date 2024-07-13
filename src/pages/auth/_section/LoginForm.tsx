import Iconify from '@/components/atoms/Iconify';
import { FormProvider, RHFCheckbox, RHFTextField } from '@/components/atoms/form';
import { PATH } from '@/libs/helpers/routes';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';
import { Alert, Box, IconButton, InputAdornment, Link, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../../store/useAuth';
import { validationSchema } from '../Login.state';
import { LoginFormProps } from '@/interfaces/login';

const LoginForm = () => {
  const { signIn, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const defaultValues = useMemo<LoginFormProps>(
    () => ({
      username: 'phatnt',
      password: '12345678',
    }),
    []
  );

  const methods = useForm<LoginFormProps>({
    resolver: zodResolver(validationSchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const onSubmit = (data: LoginFormProps) => signIn(data.username, data.password);

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Box mb={20}>
        <Stack spacing={3}>
          {!!error && <Alert severity="error">{error}</Alert>}

          <Typography variant="h2" fontWeight={600}>
            Login Web Admin WTL
          </Typography>

          <Stack spacing={1}>
            <Typography variant="subtitle2" fontWeight={500}>
              Username
            </Typography>
            <RHFTextField name="username" placeholder="Username" />
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

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          <RHFCheckbox name="remember" label="Remember me" />
          <Link variant="subtitle2" href={PATH.auth.login}>
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton
          fullWidth
          size="medium"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          disabled={!isValid}
        >
          Login
        </LoadingButton>
      </Box>
    </FormProvider>
  );
};

export default LoginForm;
