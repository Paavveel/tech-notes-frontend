import { isFetchBaseQueryError } from '../../app/api/helpers';
import { User } from './User';
import { useGetUsersQuery } from './usersApiSlice';

export const UsersList = () => {
  const {
    data: users,
    isLoading,
    error,
  } = useGetUsersQuery(null, {
    pollingInterval: 60000,
    refetchOnFocus: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }
  if (error) {
    let errorMsg;
    if (isFetchBaseQueryError(error)) {
      errorMsg = (error.data as { message: string }).message;
    }
    return <p className='errmsg'>{errorMsg ?? 'Something went wrong...'}</p>;
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
