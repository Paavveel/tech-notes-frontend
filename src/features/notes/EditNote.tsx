import { useParams } from 'react-router-dom';

export const EditNote = () => {
  const { id } = useParams();
  return <div>EditNote</div>;
};
