import { Container } from '@mui/material';
import useStyle from './Login.styles';
import LoginForm from './_section/LoginForm';

const LoginPage = (): JSX.Element => {
  const sx = useStyle();
  return (
    <Container sx={sx.container}>
      <LoginForm />
    </Container>
  );
};

export default LoginPage;
