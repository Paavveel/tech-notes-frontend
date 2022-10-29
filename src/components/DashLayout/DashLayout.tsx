import { Outlet } from 'react-router-dom';
import { DashFooter } from '../DashFooter/DashFooter';
import { DashHeader } from '../DashHeader/DashHeader';

export const DashLayout = () => {
  return (
    <>
      <DashHeader />
      <div className='dash-container'>
        <Outlet />
      </div>
      <DashFooter />
    </>
  );
};
