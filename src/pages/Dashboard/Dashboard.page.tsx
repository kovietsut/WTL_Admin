import { Container } from '@mui/material';
import ComponentPage from '../Component';

const DashboardPage = (): JSX.Element => {
  return (
    <>
      <Container sx={{ p: 3 }} maxWidth="xl">
        <h1>Dashboard</h1>
      </Container>
      <ComponentPage />
    </>
  );
};

export default DashboardPage;
