import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export const DashHeader = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError }] =
    useSendLogoutMutation();

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  if (isLoading) return <p>Logging Out...</p>;
  if (isError) return <p>Не удалось выйти</p>;
  return (
    <header className='dash-header'>
      <div
        className={cn('dash-header__container', {
          'dash-header__container--small':
            !DASH_REGEX.test(pathname) &&
            !NOTES_REGEX.test(pathname) &&
            !USERS_REGEX.test(pathname),
        })}
      >
        <Link to='/dash'>
          <h1 className='dash-header__title'>Tech Notes</h1>
        </Link>
        <nav className='dash-header__nav'>
          <button className='icon-button' title='Logout' onClick={sendLogout}>
            <FontAwesomeIcon icon={faRightFromBracket} />
          </button>
        </nav>
      </div>
    </header>
  );
};
