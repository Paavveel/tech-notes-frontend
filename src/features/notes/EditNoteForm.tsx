import { faSave, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import cn from 'classnames';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useDeleteNoteMutation, useUpdateNoteMutation } from './notesApiSlice';
import { EditNoteFormProps, INoteUpdate } from './notesTypes';

export const EditNoteForm = ({ note, users }: EditNoteFormProps) => {
  const [
    updateNote,
    { isLoading: isUpdating, isSuccess: isUpdSuccess, error },
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

  const { isAdmin, isManager } = useAuth();

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
          ???? ?????????????? ???????????????? ?????????????? {JSON.stringify(error)}
        </p>
      )}

      {isDelError && <p className='errmsg'>???? ?????????????? ?????????????? ??????????????</p>}

      <form className='form' onSubmit={handleSubmit(onSaveNoteClicked)}>
        <div className='form__title-row'>
          <h2>???????????????????????????? ?????????????? #{note.ticket}</h2>
          <div className='form__action-buttons'>
            <button
              type='submit'
              className='icon-button'
              title='Save'
              disabled={isUpdating}
            >
              <FontAwesomeIcon icon={faSave} />
            </button>
            {(isAdmin || isManager) && (
              <button
                type='button'
                className='icon-button'
                title='Delete'
                disabled={isDeleting}
                onClick={onDeleteNoteClicked}
              >
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
            )}
          </div>
        </div>
        <label className='form__label' htmlFor='note-title'>
          ??????????????????:
        </label>
        <input
          {...register('title', {
            required: {
              value: true,
              message: '?????? ???????????????????????? ????????',
            },
            minLength: {
              value: 1,
              message: '?????????????????? ???????????? ???????? ???????????? 1 ??????????????',
            },
            maxLength: {
              value: 50,
              message: '?????????????????? ???????????? ???????? ???????????? 50 ????????????????',
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
          ????????????????:
        </label>
        <textarea
          {...register('text', {
            minLength: {
              value: 1,
              message: '???????????????? ???????????? ???????? ???????????? 1 ??????????????',
            },
            maxLength: {
              value: 12,
              message: '???????????????? ???????????? ???????? ???????????? 12 ????????????????',
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
              ??????????????????:
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
              ?????????????????? ?? ????????????????????????:
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
              ??????????????:
              <br />
              {created}
            </p>
            <p className='form__updated'>
              ????????????????:
              <br />
              {updated}
            </p>
          </div>
        </div>
      </form>
    </>
  );
};
