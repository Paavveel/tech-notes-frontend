import { Note } from './Note';
import { useGetNotesQuery } from './notesApiSlice';

export const NotesList = () => {
  const {
    data: sortedNotes,
    isLoading,
    isError,
  } = useGetNotesQuery(null, {
    selectFromResult: ({ data, ...props }) => ({
      data:
        data &&
        [...data].sort((a, b) =>
          a.completed === b.completed ? 0 : a.completed ? 1 : -1
        ),
      ...props,
    }),
    pollingInterval: 15 * 1000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) return <p>Loading...</p>;

  if (isError) {
    return <p className='errmsg'>Не удалось загрузить заметки</p>;
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
