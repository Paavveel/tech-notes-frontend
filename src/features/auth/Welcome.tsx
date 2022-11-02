import { Link } from 'react-router-dom';

export const Welcome = () => {
  const date = new Date();
  const today = new Intl.DateTimeFormat('ru', {
    dateStyle: 'full',
    timeStyle: 'long',
  }).format(date);

  return (
    <section className='welcome'>
      <p>{today}</p>

      <h1>Добро пожаловать!</h1>

      <p>
        <Link to='/dash/notes'>Смотреть заметки</Link>
      </p>
      <p>
        <Link to='/dash/notes/new'>Добавить новую заметку</Link>
      </p>

      <p>
        <Link to='/dash/users'>Настройки пользователя</Link>
      </p>
      <p>
        <Link to='/dash/users/new'>Добавить нового пользователя</Link>
      </p>
    </section>
  );
};
