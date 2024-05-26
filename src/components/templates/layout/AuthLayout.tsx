import Appbar from '@/components/organisms/Appbar';
import { Outlet } from 'react-router-dom';

const AuthLayout: React.FC = () => {
  return (
    <>
      <Appbar variant="dense" />
      <Outlet />
    </>
  );
};

export default AuthLayout;
