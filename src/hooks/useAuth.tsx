import jwtDecode from 'jwt-decode';
import { useAppSelector } from '../app/hooks';
import { selectCurrentToken } from '../features/auth';

export interface ITokenDecode {
  UserInfo: {
    username: string;
    roles: string[];
  };
}

export const useAuth = () => {
  const token = useAppSelector(selectCurrentToken);
  let isManager = false;
  let isAdmin = false;
  let status = 'Employee';

  if (token) {
    const decoded = jwtDecode<ITokenDecode>(token);
    const { username, roles } = decoded.UserInfo;

    isManager = roles.includes('Manager');
    isAdmin = roles.includes('Admin');

    if (isManager) status = 'Manager';
    if (isAdmin) status = 'Admin';

    return { username, roles, status, isManager, isAdmin };
  }

  return { username: '', roles: [], isManager, isAdmin, status };
};
