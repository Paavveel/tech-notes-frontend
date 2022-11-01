import { User } from './User';
import { useGetUsersQuery } from './usersApiSlice';

export const UsersList = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p className='errmsg'>Не удалось загрузить пользователей</p>;
  }
  return (
    <table className='table table--users'>
      <thead className='table__thead'>
        <tr>
          <th scope='col' className='table__th user__username'>
            Username
          </th>
          <th scope='col' className='table__th user__roles'>
            Roles
          </th>
          <th scope='col' className='table__th user__edit'>
            Edit
          </th>
        </tr>
      </thead>
      <tbody>
        {users?.map((user) => (
          <User key={user.id} {...user} />
        ))}
      </tbody>
    </table>
  );
};
