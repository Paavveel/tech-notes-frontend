import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../config/roles';
import { useDeleteUserMutation, useUpdateUserMutation } from './usersApiSlice';
import { IUser, IUserUpdate } from './usersTypes';

export const EditUserForm = ({ id, active, roles, username }: IUser) => {
  const [isUserActive, setIsUserActive] = useState(active);
  const [
    updateUser,
    { isLoading, isSuccess, isError: isUpdError, error: upderror },
  ] = useUpdateUserMutation();

  const [
    deleteUser,
    { isSuccess: isDelSuccess, isError: isDelError, error: delerror },
  ] = useDeleteUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserUpdate>();

  const navigate = useNavigate();

  const onSaveUserClicked: SubmitHandler<IUserUpdate> = async (data) => {
    console.log(data);
    // navigate('/dash/users')
    //  await addNewUser({ username, password, roles });
  };

  const onDeleteUserClicked = async () => {
    // await deleteUser({ id });
  };
  const onActiveChanged = () => setIsUserActive((prev) => !prev);

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = delerror || upderror ? 'errmsg' : 'offscreen';
  const validUserClass = errors.username ? 'form__input--incomplete' : '';
  const validPwdClass = errors.password ? 'form__input--incomplete' : '';
  const validRolesClass = errors.roles ? 'form__input--incomplete' : '';

  return (
    <>
      {upderror && <p className={errClass}>Не удалось обновить пользователя</p>}
      {delerror && <p className={errClass}>Не удалось удалить пользователя</p>}

      <form className='form' onSubmit={handleSubmit(onSaveUserClicked)}>
        <div className='form__title-row'>
          <h2>Edit User</h2>
          <div className='form__action-buttons'>
            <button
              type='submit'
              className='icon-button'
              title='Save'
              disabled={isLoading}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            <button
              type='button'
              className='icon-button'
              title='Delete'
              onClick={onDeleteUserClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className='form__label' htmlFor='username'>
          Username: <span className='nowrap'>[3-20 letters]</span>
        </label>
        <input
          {...register('username', {
            required: true,
            pattern: /^[A-z]$/,
            minLength: 3,
            maxLength: 20,
          })}
          className={`form__input ${validUserClass}`}
          id='username'
          type='text'
          autoComplete='off'
        />

        <label className='form__label' htmlFor='password'>
          Password: <span className='nowrap'>[4-12 chars incl. !@#$%]</span>
        </label>
        <input
          {...register('password', {
            required: true,
            pattern: /^[A-z0-9!@#$%]$/,
            minLength: 4,
            maxLength: 12,
          })}
          className={`form__input ${validPwdClass}`}
          id='password'
          type='password'
        />

        <label className='form__label' htmlFor='roles'>
          ASSIGNED ROLES:
        </label>
        <select
          {...register('roles')}
          className={`form__select ${validRolesClass}`}
          id='roles'
          multiple={true}
          size={3}
        >
          {options}
        </select>

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
            checked={isUserActive}
            onChange={onActiveChanged}
          />
        </label>
      </form>
    </>
  );
};
