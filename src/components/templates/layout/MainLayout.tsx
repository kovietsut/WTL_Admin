import Scrollbar from '@/components/atoms/ScrollBar';
import Appbar from '@/components/organisms/Appbar';
import Sidebar from '@/components/organisms/sidebar/Sidebar';
import { SIDENAV } from '@/libs/helpers/constants';
import { Container } from '@mui/material';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': {
          height: '100%',
        },
        '& .simplebar-scrollbar:before': {
          background: 'var(--nav-scrollbar-color)',
        },
      }}
    >
      <Appbar variant="detail" />
      <Sidebar />
      <Container
        sx={{
          width: {
            lg: `calc(100% - ${SIDENAV.width}px)`,
          },
          ml: '279px',
          mt: '64px',
        }}
        maxWidth={false}
      >
        <Outlet />
      </Container>
    </Scrollbar>
  );
};

export default MainLayout;
