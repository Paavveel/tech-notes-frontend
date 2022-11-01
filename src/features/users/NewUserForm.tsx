import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ROLES } from '../../config/roles';
import { useAddNewUserMutation } from './usersApiSlice';
import { INewUser } from './usersTypes';

export const NewUserForm = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewUser>();

  const navigate = useNavigate();

  const onSaveUserClicked: SubmitHandler<INewUser> = async (data) => {
    console.log(data);
    // navigate('/dash/users')
    //  await addNewUser({ username, password, roles });
  };

  const options = Object.values(ROLES).map((role) => {
    return (
      <option key={role} value={role}>
        {role}
      </option>
    );
  });

  const errClass = isError ? 'errmsg' : 'offscreen';
  const validUserClass = errors.username ? 'form__input--incomplete' : '';
  const validPwdClass = errors.password ? 'form__input--incomplete' : '';
  const validRolesClass = errors.roles ? 'form__input--incomplete' : '';

  return (
    <>
      {error && (
        <p className={errClass}>Не удалось создать нового пользователя</p>
      )}

      <form className='form' onSubmit={handleSubmit(onSaveUserClicked)}>
        <div className='form__title-row'>
          <h2>New User</h2>
          <div className='form__action-buttons'>
            <button className='icon-button' title='Save' disabled={isLoading}>
              <FontAwesomeIcon icon={faSave} />
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
      </form>
    </>
  );
};
