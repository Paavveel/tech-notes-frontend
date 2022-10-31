import { apiSlice } from '../../app/api/apiSlice';
import { IUser } from './usersTypes';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => '/users',
      keepUnusedDataFor: 5,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id: id }) => ({ type: 'User' as const, id })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
