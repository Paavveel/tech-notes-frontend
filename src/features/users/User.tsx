import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { IUser } from './usersTypes';

export const User = ({ id, active, roles, username }: IUser) => {
  const navigate = useNavigate();

  const handleEdit = () => navigate(`/dash/users/${id}`);

  const cellStatus = active ? '' : 'table__cell--inactive';

  const userRolesString = roles.toString().replaceAll(',', ', ');

  return (
    <tr className='table__row user'>
      <td className={`table__cell ${cellStatus}`}>{username}</td>
      <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
      <td className={`table__cell ${cellStatus}`}>
        <button className='icon-button table__button' onClick={handleEdit}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </button>
      </td>
    </tr>
  );
};
