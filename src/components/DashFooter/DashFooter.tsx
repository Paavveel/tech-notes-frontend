import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const DashFooter = () => {
  const { username, status } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const onGoHomeClicked = () => navigate('/dash');

  return (
    <footer className='dash-footer'>
      {pathname !== '/dash' && (
        <button
          className='dash-footer__button icon-button'
          title='Home'
          onClick={onGoHomeClicked}
        >
          <FontAwesomeIcon icon={faHouse} />
        </button>
      )}
      <p>Текущий пользователь: {username}</p>
      <p>Статус: {status}</p>
    </footer>
  );
};
