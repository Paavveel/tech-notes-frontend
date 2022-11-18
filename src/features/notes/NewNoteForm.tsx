import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { useGetUsersQuery } from '../users';
import { useAddNewNoteMutation } from './notesApiSlice';
import { INewNote } from './notesTypes';

export const NewNoteForm = () => {
  const {
    data: users,
    isSuccess: isUsersSuccess,
    isLoading: isUsersLoading,
  } = useGetUsersQuery(null, {
    refetchOnReconnect: true,
  });

  const [addNewNote, { isLoading, isError }] = useAddNewNoteMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INewNote>();

  const navigate = useNavigate();

  const onSaveNoteClicked: SubmitHandler<INewNote> = async (data) => {
    await addNewNote(data);
    navigate('/dash/notes');
  };

  const options = users?.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  if (isUsersLoading) {
    return <PulseLoader color='#FFF' />;
  }

  return (
    <>
      {isError && <p className='errmsg'>Не удалось создать заметку</p>}

      <form className='form' onSubmit={handleSubmit(onSaveNoteClicked)}>
        <div className='form__title-row'>
          <h2>Создание новой заметки</h2>
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
        <label className='form__label' htmlFor='title'>
          Заголовок:
        </label>
        <input
          {...register('title', {
            required: {
              value: true,
              message: 'Это обязательное поле',
            },
            minLength: {
              value: 3,
              message: 'Заголовок должен быть больше 3 символов',
            },
            maxLength: {
              value: 50,
              message: 'Заголовок должен быть меньше 50 символов',
            },
          })}
          className={cn('form__input', {
            'form__input--incomplete': errors.title,
          })}
          id='title'
          type='text'
          autoComplete='off'
        />
        {errors.title?.message && (
          <p className='errmsg'>{errors.title.message}</p>
        )}
        <label className='form__label' htmlFor='text'>
          Текст:
        </label>
        <textarea
          {...register('text', {
            required: {
              value: true,
              message: 'Это обязательное поле',
            },
            minLength: {
              value: 5,
              message: 'Текст должен быть больше 6 символов',
            },
            maxLength: {
              value: 500,
              message: 'Текст должен быть меньше 500 символов',
            },
          })}
          className={cn('form__input form__input--text', {
            'form__input--incomplete': errors.text,
          })}
          id='text'
        />
        {errors.text?.message && (
          <p className='errmsg'>{errors.text?.message}</p>
        )}

        <label className='form__label' htmlFor='user'>
          Относится:
        </label>
        {isUsersSuccess && (
          <select
            {...register('user', {
              required: {
                value: true,
                message: 'Это обязательное поле',
              },
            })}
            className={cn('form__select', {
              'form__input--incomplete': errors.user,
            })}
            id='user'
          >
            {options}
          </select>
        )}

        {errors.user?.message && (
          <p className='errmsg'>{errors.user.message}</p>
        )}
      </form>
    </>
  );
};
