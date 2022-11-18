import { isFetchBaseQueryError } from '../../app/api/helpers';
import { useAuth } from '../../hooks/useAuth';
import { Note } from './Note';
import { useGetNotesQuery } from './notesApiSlice';
import { INote } from './notesTypes';

export const NotesList = () => {
  const { username, isManager, isAdmin } = useAuth();
  const {
    data: sortedNotes,
    isLoading,
    error,
  } = useGetNotesQuery(null, {
    selectFromResult: ({ data, ...props }) => {
      let notes: INote[] | undefined;

      if (data) {
        if (isAdmin || isManager) {
          notes = data;
        } else {
          notes = data.filter((note) => note.username === username);
        }
      }

      return {
        data:
          notes &&
          [...notes].sort((a, b) =>
            a.completed === b.completed ? 0 : a.completed ? 1 : -1
          ),
        ...props,
      };
    },
    pollingInterval: 15 * 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <p>Loading...</p>;

  if (error) {
    let errorMsg;
    if (isFetchBaseQueryError(error)) {
      errorMsg = (error.data as { message: string }).message;
    }
    return <p className='errmsg'>{errorMsg ?? 'Something went wrong...'}</p>;
  }

  return (
    <table className='table table--notes'>
      <thead className='table__thead'>
        <tr>
          <th scope='col' className='table__th note__status'>
            Username
          </th>
          <th scope='col' className='table__th note__created'>
            Created
          </th>
          <th scope='col' className='table__th note__updated'>
            Updated
          </th>
          <th scope='col' className='table__th note__title'>
            Title
          </th>
          <th scope='col' className='table__th note__username'>
            Owner
          </th>
          <th scope='col' className='table__th note__edit'>
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedNotes?.map((note) => (
          <Note key={note.id} {...note} />
        ))}
      </tbody>
    </table>
  );
};
