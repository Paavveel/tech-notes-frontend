import { useParams } from 'react-router-dom';
import { useGetUsersQuery } from '../users';
import { EditNoteForm } from './EditNoteForm';
import { useGetNoteByIdQuery } from './notesApiSlice';
import { NoteParams } from './notesTypes';

export const EditNote = () => {
  const { id } = useParams<keyof NoteParams>() as NoteParams;

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
    return <p>Loading...</p>;
  }

  if (isNoteError || isUsersError) {
    return <p className='errmsg'>Что-то пошло не так</p>;
  }

  if (!note || !users) {
    return <p className='errmsg'>Не удалось загрузить заметку</p>;
  }

  return <EditNoteForm note={note} users={users} />;
};
