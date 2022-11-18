import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../config/roles';
import { useAddNewUserMutation } from './usersApiSlice';
import { INewUser } from './usersTypes';

export const NewUserForm = () => {
  const [addNewUser, { isLoading, isError, isSuccess }] =
    useAddNewUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUser>();

  const navigate = useNavigate();

  const onSaveUserClicked: SubmitHandler<INewUser> = async (data) => {
    await addNewUser(data);

    if (isSuccess) {
      navigate('/dash/users');
    }
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  return (
    <>
      {isError && <p className='errmsg'>Не удалось создать пользователя</p>}

      <form className='form' onSubmit={handleSubmit(onSaveUserClicked)}>
        <div className='form__title-row'>
          <h2>Создание нового пользователя</h2>
          <div className='form__action-buttons'>
            <button
              type='submit'
              className='icon-button'
              title='Save'
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
          </div>
        </div>
        <label className='form__label' htmlFor='username'>
          Имя пользователя:
        </label>
        <input
          {...register('username', {
            required: {
              value: true,
              message: 'Это обязательное поле',
            },
            pattern: {
              value: /^[A-Za-z0-9]+$/i,
              message: 'Имя должно состоять из букв и чисел',
            },
            minLength: {
              value: 3,
              message: 'Имя должно быть больше 3 символа',
            },
            maxLength: {
              value: 20,
              message: 'Имя должно быть меньше 20 символов',
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
            minLength: {
              value: 6,
              message: 'Пароль должен быть больше 6 символов',
            },
            maxLength: {
              value: 12,
              message: 'Пароль должен быть меньше 12 символов',
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

        <label className='form__label' htmlFor='roles'>
          Роли:
        </label>
        <select
          {...register('roles', {
            required: {
              value: true,
              message: 'Укажите как минимум 1 роль',
            },
          })}
          className={cn('form__select', {
            'form__input--incomplete': errors.roles,
          })}
          id='roles'
          multiple
          size={3}
          defaultValue={['Employee']}
        >
          {options}
        </select>
        {errors.roles?.message && (
          <p className='errmsg'>{errors.roles.message}</p>
        )}
      </form>
    </>
  );
};
