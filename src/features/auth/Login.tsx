import cn from 'classnames';
import { RefObject, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { setCredentials } from '.';
import { isFetchBaseQueryError } from '../../app/api/helpers';
import { useAppDispatch } from '../../app/hooks';
import { usePersist } from '../../hooks/usePersist';
import { useLoginMutation } from './authApiSlice';
import { ICredential } from './authTypes';

export const Login = () => {
  const errRef = useRef() as RefObject<HTMLParagraphElement> | null;
  const [errMsg, setErrMsg] = useState('');
  const [persist, setPersist] = usePersist();
  const [login, { isLoading, isError }] = useLoginMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICredential>();

  const onLogin: SubmitHandler<ICredential> = async (data) => {
    try {
      const { accessToken } = await login(data).unwrap();
      dispatch(setCredentials({ accessToken }));
      navigate('/dash');
    } catch (err) {
      if (isFetchBaseQueryError(err)) {
        if (!err.status) {
          setErrMsg('No Server Response');
        } else if (err.status === 400) {
          setErrMsg('Missing Username or Password');
        } else if (err.status === 401) {
          setErrMsg('Unauthorized');
        } else {
          setErrMsg((err.data as { message: string }).message);
        }
      }

      if (errRef?.current) {
        errRef.current.focus();
      }
    }
  };

  const handleToggle = () => setPersist((prev) => !prev);

  if (isLoading) return <p>Loading...</p>;

  return (
    <section className='public'>
      <header>
        <h1>Вход для сотрудников</h1>
      </header>
      <main className='login'>
        {isError && (
          <p ref={errRef} className='errmsg' aria-live='assertive'>
            {errMsg}
          </p>
        )}

        <form className='form' onSubmit={handleSubmit(onLogin)}>
          <label className='form__label' htmlFor='username'>
            Имя пользователя:
          </label>
          <input
            {...register('username', {
              required: {
                value: true,
                message: 'Это обязательное поле',
              },
            })}
            className={cn('form__input', {
              'form__input--incomplete': errors.username,
            })}
            id='username'
            type='text'
            autoComplete='off'
          />
          {errors.username?.message && (
            <p className='errmsg'>{errors.username.message}</p>
          )}
          <label className='form__label' htmlFor='password'>
            Пароль:
          </label>
          <input
            {...register('password', {
              required: {
                value: true,
                message: 'Это обязательное поле',
              },
            })}
            className={cn('form__input', {
              'form__input--incomplete': errors.password,
            })}
            id='password'
            type='password'
          />
          {errors.password?.message && (
            <p className='errmsg'>{errors.password.message}</p>
          )}
          <button className='form__submit-button'>Войти</button>

          <label htmlFor='persist' className='form__persist'>
            <input
              type='checkbox'
              className='form__checkbox'
              id='persist'
              onChange={handleToggle}
              checked={persist}
            />
            Доверять этому устройству
          </label>
        </form>
      </main>
      <footer>
        <Link to='/'>На главную</Link>
      </footer>
    </section>
  );
};
