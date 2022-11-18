import { useEffect, useRef, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { isFetchBaseQueryError } from '../../app/api/helpers';
import { useAppSelector } from '../../app/hooks';
import { usePersist } from '../../hooks/usePersist';
import { useRefreshMutation } from './authApiSlice';
import { selectCurrentToken } from './authSlice';

export const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useAppSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      // React 18 Strict Mode

      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          console.error(err);
        }
      };

      if (!token && persist) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  if (!persist) {
    // persist: no
    return <Outlet />;
  }
  if (isLoading) {
    //persist: yes, token: no
    return <p>Loading...</p>;
  }
  if (error) {
    //persist: yes, token: no
    let errorMsg;
    if (isFetchBaseQueryError(error)) {
      errorMsg = (error.data as { message: string }).message;
    }
    return (
      <p className='errmsg'>
        {errorMsg ?? 'Something went wrong...'}{' '}
        <Link to='/login'>Please login again</Link>.
      </p>
    );
  }
  if (isSuccess && trueSuccess) {
    //persist: yes, token: yes
    return <Outlet />;
  }
  if (token && isUninitialized) {
    //persist: yes, token: yes
    return <Outlet />;
  }
  return <p>Loading...</p>;
};
