import { apiSlice } from '../../app/api/apiSlice';
import { logOut } from './authSlice';
import { IAuthResponse, ICredential } from './authTypes';

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IAuthResponse, ICredential>({
      query: (credentials) => ({
        url: '/auth',
        method: 'POST',
        body: credentials,
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          //const { data } =
          await queryFulfilled;
          //console.log(data)
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation<IAuthResponse, void>({
      query: () => ({
        url: '/auth/refresh',
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } =
  authApiSlice;
