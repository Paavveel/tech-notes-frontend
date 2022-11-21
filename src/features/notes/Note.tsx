import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { INote } from './notesTypes';

export const Note = memo(
  ({ completed, createdAt, updatedAt, username, title, id }: INote) => {
    const navigate = useNavigate();

    const created = new Date(createdAt).toLocaleString('ru', {
      day: 'numeric',
      month: 'numeric',
      year: '2-digit',
      hour: 'numeric',
      minute: 'numeric',
    });

    const updated = new Date(updatedAt).toLocaleString('ru', {
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
          {completed ? (
            <span className='note__status--completed'>Completed</span>
          ) : (
            <span className='note__status--open'>Open</span>
          )}
        </td>
        <td className='table__cell note__created'>{created}</td>
        <td className='table__cell note__updated'>{updated}</td>
        <td className='table__cell note__title'>{title}</td>
        <td className='table__cell note__username'>{username}</td>

        <td className='table__cell'>
          <button className='icon-button table__button' onClick={handleEdit}>
            <FontAwesomeIcon icon={faPenToSquare} />
          </button>
        </td>
      </tr>
    );
  }
);
