import Appbar from '@/components/organisms/Appbar';
import { APPBAR } from '@/libs/helpers/constants';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <>
      <Appbar variant="detail" />
      <Box height={APPBAR.height} />
      <Outlet />
    </>
  );
};

export default MainLayout;
