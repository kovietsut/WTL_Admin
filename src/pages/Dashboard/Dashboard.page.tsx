import { PATH } from '@/libs/helpers/routes';
import { Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ComponentPage from '../Component';

const DashboardPage = (): JSX.Element => {
  const navigate = useNavigate();
  return (
    <>
      <Container sx={{ p: 3 }} maxWidth="xl">
        <h1>Dashboard</h1>
        <button onClick={() => navigate(PATH.armorType.root)}>Armor Type</button>
      </Container>
      <ComponentPage />
    </>
  );
};

export default DashboardPage;
