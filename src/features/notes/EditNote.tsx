import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { useAuth } from '../../hooks/useAuth';
import { useGetUsersQuery } from '../users';
import { EditNoteForm } from './EditNoteForm';
import { useGetNoteByIdQuery } from './notesApiSlice';
import { NoteParams } from './notesTypes';

export const EditNote = () => {
  const { id } = useParams<keyof NoteParams>() as NoteParams;
  const { username, isAdmin, isManager } = useAuth();
  const {
    data: note,
    isLoading: isNoteLoading,
    isError: isNoteError,
  } = useGetNoteByIdQuery(id, {
    refetchOnReconnect: true,
  });

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
  } = useGetUsersQuery(null, {
    refetchOnReconnect: true,
  });

  if (isNoteLoading || isUsersLoading) {
    return <PulseLoader color='#FFF' />;
  }

  if (isNoteError || isUsersError) {
    return <p className='errmsg'>Что-то пошло не так</p>;
  }

  if (!note || !users) {
    return <p className='errmsg'>Не удалось загрузить заметку</p>;
  }

  if (!isAdmin || !isManager) {
    if (note.username !== username) {
      return <p className='errmsg'>Нет доступа</p>;
    }
  }

  return <EditNoteForm note={note} users={users} />;
};
