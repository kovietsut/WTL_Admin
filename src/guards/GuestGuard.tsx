// ----------------------------------------------------------------------

import useAuth from '@/store/useAuth';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated()) {
    return <Navigate to="/app" />;
  }

  return <>{children}</>;
}
