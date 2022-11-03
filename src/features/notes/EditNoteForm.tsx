import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice';
import { EditNoteFormProps, INoteUpdate } from './notesTypes';

export const EditNoteForm = ({ note, users }: EditNoteFormProps) => {
  const [
    updateNote,
    {
      isLoading: isUpdating,
      isSuccess: isUpdSuccess,
      isError: isUpdError,
      error,
    },
  ] = useUpdateNoteMutation();

  const [
    deleteNote,
    { isLoading: isDeleting, isSuccess: isDelSuccess, isError: isDelError },
  ] = useDeleteNoteMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<INoteUpdate>({
    defaultValues: {
      title: note.title,
      text: note.text,
      completed: note.completed,
      user: note.user,
    },
  });

  const navigate = useNavigate();

  const onSaveNoteClicked: SubmitHandler<INoteUpdate> = async ({
    title,
    text,
    user,
    completed,
  }) => {
    await updateNote({ id: note.id, user, title, text, completed });
  };

  const onDeleteNoteClicked = async () => {
    await deleteNote(note.id);
  };

  const created = new Date(note.createdAt).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });
  const updated = new Date(note.updatedAt).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  });

  const options = users?.map((user) => {
    return (
      <option key={user.id} value={user.id}>
        {user.username}
      </option>
    );
  });

  useEffect(() => {
    if (isUpdSuccess || isDelSuccess) {
      navigate('/dash/notes', { replace: true });
    }
  }, [isUpdSuccess, isDelSuccess, navigate]);
  return (
    <>
      {error && (
        <p className='errmsg'>
          Не удалось обновить заметку {JSON.stringify(error)}
        </p>
      )}

      {isDelError && <p className='errmsg'>Не удалось удалить заметку</p>}

      <form className='form' onSubmit={handleSubmit(onSaveNoteClicked)}>
        <div className='form__title-row'>
          <h2>Редактирование заметки #{note.ticket}</h2>
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
              onClick={onDeleteNoteClicked}
            >
              <FontAwesomeIcon icon={faTrashCan} />
            </button>
          </div>
        </div>
        <label className='form__label' htmlFor='note-title'>
          Заголовок:
        </label>
        <input
          {...register('title', {
            required: {
              value: true,
              message: 'Это обязательное поле',
            },
            minLength: {
              value: 1,
              message: 'Заголовок должен быть больше 1 символа',
            },
            maxLength: {
              value: 50,
              message: 'Заголовок должен быть меньше 50 символов',
            },
          })}
          className={cn('form__input', {
            'form__input--incomplete': errors.title,
          })}
          id='note-title'
          type='text'
          autoComplete='off'
        />
        {errors.title?.message && (
          <p className='errmsg'>{errors.title.message}</p>
        )}

        <label className='form__label' htmlFor='note-text'>
          Описание:
        </label>
        <textarea
          {...register('text', {
            minLength: {
              value: 1,
              message: 'Описание должно быть больше 1 символа',
            },
            maxLength: {
              value: 12,
              message: 'Описание должно быть меньше 12 символов',
            },
          })}
          className={cn('form__input form__input--text', {
            'form__input--incomplete': errors.text,
          })}
          id='note-text'
        />
        {errors.text?.message && (
          <p className='errmsg'>{errors.text?.message}</p>
        )}

        <div className='form__row'>
          <div className='form__divider'>
            <label
              className='form__label form__checkbox-container'
              htmlFor='note-completed'
            >
              Выполнена:
              <input
                {...register('completed')}
                className='form__checkbox'
                id='note-completed'
                type='checkbox'
              />
            </label>

            <label
              className='form__label form__checkbox-container'
              htmlFor='note-user'
            >
              Относится к пользователю:
            </label>
            <select
              {...register('user')}
              id='note-user'
              className='form__select'
            >
              {options}
            </select>
          </div>
          <div className='form__divider'>
            <p className='form__created'>
              Создана:
              <br />
              {created}
            </p>
            <p className='form__updated'>
              Изменена:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
