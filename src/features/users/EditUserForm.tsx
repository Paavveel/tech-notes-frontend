import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../config/roles';
import { useDeleteUserMutation, useUpdateUserMutation } from './usersApiSlice';
import { IUser, IUserUpdate } from './usersTypes';

export const EditUserForm = ({ id, active, roles, username }: IUser) => {
  const [
    updateUser,
    { isLoading: isUpdating, isSuccess: isUpdSuccess, isError: isUpdError },
  ] = useUpdateUserMutation();

  const [
    deleteUser,
    { isLoading: isDeleting, isSuccess: isDelSuccess, isError: isDelError },
  ] = useDeleteUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserUpdate>({
    defaultValues: {
      username,
    },
  });

  const navigate = useNavigate();

  const onSaveUserClicked: SubmitHandler<IUserUpdate> = async ({
    username,
    password,
    roles,
    active,
  }) => {
    if (password) {
      await updateUser({ id: id, username, password, roles, active });
    } else {
      await updateUser({ id: id, username, roles, active });
    }
  };

  const onDeleteUserClicked = async () => {
    await deleteUser(id);
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  useEffect(() => {
    if (isUpdSuccess || isDelSuccess) {
      navigate('/dash/users', { replace: true });
    }
  }, [isUpdSuccess, isDelSuccess, navigate]);

  return (
    <>
      {isUpdError && <p className='errmsg'>Не удалось обновить пользователя</p>}
      {isDelError && <p className='errmsg'>Не удалось удалить пользователя</p>}

      <form className='form' onSubmit={handleSubmit(onSaveUserClicked)}>
        <div className='form__title-row'>
          <h2>Редактирование пользователя {username}</h2>
          <div className='form__action-buttons'>
            <button
              type='submit'
              className='icon-button'
              title='Save'
              disabled={isUpdating}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              type='button'
              className='icon-button'
              title='Delete'
              disabled={isDeleting}
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
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
          <p className='errmsg'>{errors.password?.message}</p>
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
          multiple={true}
          size={3}
          defaultValue={roles}
        >
          {options}
        </select>
        {errors.roles?.message && (
          <p className='errmsg'>{errors.roles.message}</p>
        )}

        <label
          className='form__label form__checkbox-container'
          htmlFor='user-active'
        >
          ACTIVE:
          <input
            {...register('active')}
            className='form__checkbox'
            id='user-active'
            type='checkbox'
            defaultChecked={active}
          />
        </label>
      </form>
    </>
  );
};
