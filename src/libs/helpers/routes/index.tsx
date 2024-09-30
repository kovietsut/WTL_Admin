import AuthLayout from '@/components/templates/layout/AuthLayout';
import MainLayout from '@/components/templates/layout/MainLayout';
import AuthGuard from '@/guards/AuthGuard';
import GuestGuard from '@/guards/GuestGuard';
import Comic from '@/pages/Comic';
import ComicNewForm from '@/pages/Comic/_section/_form/_add/ComicNewForm';
import ComicDetailForm from '@/pages/Comic/_section/_form/_detail/ComicDetailForm';
import Error401Page from '@/pages/Error/Error401.page';
import Error403Page from '@/pages/Error/Error403.page';
import Error404Page from '@/pages/Error/Error404.page';
import Error500Page from '@/pages/Error/Error500.page';
import Login from '@/pages/Login';
import { lazy } from 'react';
import { BrowserRouter, MemoryRouter, Navigate, useRoutes } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import { Loadable } from './Loadable';
import { PATH } from './path';
export * from './path';

// ----------------------------------------------------------------------------------

const Dashboard = Loadable(lazy(() => import('@/pages/Dashboard')));
const User = Loadable(lazy(() => import('@/pages/User')));
const Profile = Loadable(lazy(() => import('@/pages/Profile')));
const Genre = Loadable(lazy(() => import('@/pages/Genre')));

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
        { path: PATH.user, Component: User },
        { path: PATH.profile, Component: Profile },
        { path: PATH.genres, Component: Genre },
        {
          path: 'comics',
          children: [
            { element: <Navigate to={PATH.comics.root} replace />, index: true },
            { path: 'list', Component: Comic },
            { path: 'new', Component: ComicNewForm },
            { path: 'detail/:id', Component: ComicDetailForm },
          ],
        },
        {
          path: 'chapters',
          children: [
            { element: <Navigate to={PATH.chapters.root} replace />, index: true },
            // { path: 'list', Component: Comic },
            // { path: 'new', Component: ChapterAddForm },
            // { path: 'detail/:id', Component: ComickDetailForm },
          ],
        },
      ],
    },
    { path: '401', Component: Error401Page },
    { path: '403', Component: Error403Page },
    { path: '404', Component: Error404Page },
    { path: '500', Component: Error500Page },
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
