import { useParams } from 'react-router-dom';
import PulseLoader from 'react-spinners/PulseLoader';
import { EditUserForm } from './EditUserForm';
import { useGetUserByIdQuery } from './usersApiSlice';
import { UserParams } from './usersTypes';

export const EditUser = () => {
  const { id } = useParams<keyof UserParams>() as UserParams;

  const {
    data: user,
    isLoading,
    isError,
  } = useGetUserByIdQuery(id, {
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <PulseLoader color='#FFF' />;
  }

  if (isError) {
    return <p className='errmsg'>Что-то пошло не так</p>;
  }

  if (!user) {
    return <p className='errmsg'>Не удалось загрузить пользователя</p>;
  }

  return <EditUserForm {...user} />;
};
