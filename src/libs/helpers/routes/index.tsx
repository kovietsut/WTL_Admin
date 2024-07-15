import AuthLayout from '@/components/templates/layout/AuthLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import AuthGuard from '@/guards/AuthGuard';
import GuestGuard from '@/guards/GuestGuard';
import { lazy } from 'react';
import { BrowserRouter, MemoryRouter, Navigate, useRoutes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { Loadable } from './Loadable';
import { PATH } from './path';
export * from './path';

// ----------------------------------------------------------------------------------

const Login = Loadable(lazy(() => import('@/pages/Auth')));
const Dashboard = Loadable(lazy(() => import('@/pages/Dashboard')));
const ComponentPage = Loadable(lazy(() => import('@/pages/Component')));

// ----------------------------------------------------------------------------------

function Routes() {
  return useRoutes([
    { element: <Navigate to={PATH.home} replace />, index: true },
    {
      path: 'auth',
      element: (
        <GuestGuard>
          <AuthLayout />
        </GuestGuard>
      ),
      children: [{ path: 'login', Component: Login }],
    },
    {
      path: 'app',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH.home} replace />, index: true },
        { path: PATH.home, Component: Dashboard },
        // {
        //   path: 'amt',
        //   children: [
        //     { element: <Navigate to={PATH.armorType.list} replace />, index: true },
        //     { path: 'list', Component: ArmorTypeList },
        //     { path: ':id', Component: Dashboard },
        //   ],
        // },
      ],
    },
    { path: '404', Component: ComponentPage },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// ----------------------------------------------------------------------------------

export function HiddenRouter(props: { children?: React.ReactNode }) {
  const { children } = props;
  if (typeof window === 'undefined') {
    return <StaticRouter location="/">{children}</StaticRouter>;
  }

  return <MemoryRouter>{children}</MemoryRouter>;
}

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  );
};

export default Router;
