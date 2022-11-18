import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();
  const date = new Date();
  const today = new Intl.DateTimeFormat('ru', {
    dateStyle: 'full',
    timeStyle: 'short',
  }).format(date);

  return (
    <section className='welcome'>
      <p>{today}</p>

      <h1>Добро пожаловать {username}!</h1>

      <p>
        <Link to='/dash/notes'>Смотреть заметки</Link>
      </p>
      <p>
        <Link to='/dash/notes/new'>Добавить новую заметку</Link>
      </p>

      {(isAdmin || isManager) && (
        <p>
          <Link to='/dash/users'>Настройки пользователя</Link>
        </p>
      )}
      {(isAdmin || isManager) && (
        <p>
          <Link to='/dash/users/new'>Добавить нового пользователя</Link>
        </p>
      )}
    </section>
  );
};
