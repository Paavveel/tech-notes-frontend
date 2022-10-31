import { Link } from 'react-router-dom';

export const Public = () => {
  return (
    <section className='public'>
      <header>
        <h1>
          Добро пожаловать в <span className='nowrap'>Tech Notes</span>
        </h1>
      </header>
      <main className='public__main'>
        <br />
        <br />
        <h2>Приложение для tech заметок.</h2>
        <br />
        <p>Авторизуйся, что чтобы попробовать!</p>
        <br />
        <p>
          By: <a href='https://github.com/Paavveel'>Pavel Tomilin</a>
        </p>
      </main>
      <footer>
        <Link to='/login'>Войти</Link>
      </footer>
    </section>
  );
};
