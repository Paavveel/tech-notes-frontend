import { Link } from 'react-router-dom';

export const Public = () => {
  return (
    <section className='public'>
      <header>
        <h1>
          Добро пожаловать <span className='nowrap'>Pavel T. Repairs!</span>
        </h1>
      </header>
      <main className='public__main'>
        <p>
          Repairs provides a trained staff ready to meet your tech repair needs.
        </p>
        <address className='public__addr'>
          Pavel T. Repairs
          <a href='tel:+15555555555'>(555) 555-5555</a>
        </address>
        <br />
        <p>Owner: Pavel Tomilin</p>
      </main>
      <footer>
        <Link to='/login'>Войти</Link>
      </footer>
    </section>
  );
};
