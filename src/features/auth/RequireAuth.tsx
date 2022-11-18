import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const RequireAuth = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const location = useLocation();
  const { roles } = useAuth();

  return roles.some((role) => allowedRoles.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location }} replace />
  );
};
