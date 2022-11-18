import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { useGetNoteByIdQuery } from './notesApiSlice';
import { INote } from './notesTypes';

export const Note = memo(({ id }: INote) => {
  const navigate = useNavigate();
  const {
    data: note,
    isLoading,
    isError,
  } = useGetNoteByIdQuery(id, {
    refetchOnReconnect: true,
  });

  if (isLoading) return <PulseLoader color='#FFF' />;

  if (!note) {
    return <p>error</p>;
  }

  const created = new Date(note.createdAt).toLocaleString('ru', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  });

  const updated = new Date(note.updatedAt).toLocaleString('ru', {
    day: 'numeric',
    month: 'numeric',
    year: '2-digit',
    hour: 'numeric',
    minute: 'numeric',
  });

  const handleEdit = () => navigate(`/dash/notes/${id}`);

  return (
    <tr className='table__row'>
      <td className='table__cell note__status'>
        {note.completed ? (
          <span className='note__status--completed'>Completed</span>
        ) : (
          <span className='note__status--open'>Open</span>
        )}
      </td>
      <td className='table__cell note__created'>{created}</td>
      <td className='table__cell note__updated'>{updated}</td>
      <td className='table__cell note__title'>{note.title}</td>
      <td className='table__cell note__username'>{note.username}</td>

      <td className='table__cell'>
        <button className='icon-button table__button' onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
});
