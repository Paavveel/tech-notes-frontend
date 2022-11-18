import {
  faFileCirclePlus,
  faFilePen,
  faRightFromBracket,
  faUserGear,
  faUserPlus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import cn from 'classnames';
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSendLogoutMutation } from '../../features/auth/authApiSlice';
import { useAuth } from '../../hooks/useAuth';

const DASH_REGEX = /^\/dash(\/)?$/;
const NOTES_REGEX = /^\/dash\/notes(\/)?$/;
const USERS_REGEX = /^\/dash\/users(\/)?$/;

export const DashHeader = () => {
  const { isManager, isAdmin } = useAuth();

  const navigate = useNavigate();
  const { pathname } = useLocation();

  const [sendLogout, { isLoading, isSuccess, isError }] =
    useSendLogoutMutation();

  const onNewNoteClicked = () => navigate('/dash/notes/new');
  const onNewUserClicked = () => navigate('/dash/users/new');
  const onNotesClicked = () => navigate('/dash/notes');
  const onUsersClicked = () => navigate('/dash/users');

  let newNoteButton = null;
  if (NOTES_REGEX.test(pathname)) {
    newNoteButton = (
      <button
        className='icon-button'
        title='New Note'
        onClick={onNewNoteClicked}
      >
        <FontAwesomeIcon icon={faFileCirclePlus} />
      </button>
    );
  }

  let newUserButton = null;
  if (isManager || isAdmin) {
    if (USERS_REGEX.test(pathname)) {
      newUserButton = (
        <button
          className='icon-button'
          title='New User'
          onClick={onNewUserClicked}
        >
          <FontAwesomeIcon icon={faUserPlus} />
        </button>
      );
    }
  }
  let userButton = null;
  if (isManager || isAdmin) {
    if (!USERS_REGEX.test(pathname) && pathname.includes('/dash')) {
      userButton = (
        <button className='icon-button' title='Users' onClick={onUsersClicked}>
          <FontAwesomeIcon icon={faUserGear} />
        </button>
      );
    }
  }

  let notesButton = null;
  if (!NOTES_REGEX.test(pathname) && pathname.includes('/dash')) {
    notesButton = (
      <button className='icon-button' title='Notes' onClick={onNotesClicked}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
    );
  }

  const logoutButton = (
    <button className='icon-button' title='Logout' onClick={sendLogout}>
      <FontAwesomeIcon icon={faRightFromBracket} />
    </button>
  );

  useEffect(() => {
    if (isSuccess) navigate('/');
  }, [isSuccess, navigate]);

  let buttonContent;
  if (isLoading) {
    buttonContent = <p>Logging Out...</p>;
  } else if (isError) {
    <p>Не удалось выйти</p>;
  } else {
    buttonContent = (
      <>
        {newNoteButton}
        {newUserButton}
        {notesButton}
        {userButton}
        {logoutButton}
      </>
    );
  }
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
        <nav className='dash-header__nav'>{buttonContent}</nav>
      </div>
    </header>
  );
};
