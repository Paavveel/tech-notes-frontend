import { useParams } from 'react-router-dom';
import { EditUserForm } from './EditUserForm';

export const EditUser = () => {
  const { id } = useParams();
  return <EditUserForm />;
};
