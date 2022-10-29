import { faHouse } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';

export const DashFooter = () => {
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
      <p>Текущий пользователь:</p>
      <p>Статус:</p>
    </footer>
  );
};
