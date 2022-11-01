import { apiSlice } from '../../app/api/apiSlice';
import { INewUser, IUser, IUserUpdate } from './usersTypes';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => '/users',
      keepUnusedDataFor: 5,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id: id }) => ({
                type: 'User' as const,
                id,
              })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    addNewUser: builder.mutation<void, INewUser>({
      query: (initialUserData) => ({
        url: '/users',
        method: 'POST',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: 'User', id: 'LIST' }],
    }),
    updateUser: builder.mutation<void, IUserUpdate>({
      query: (initialUserData) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, err, { _id: id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<void, Pick<IUser, '_id'>>({
      query: ({ _id }) => ({
        url: '/users',
        method: 'PATCH',
        body: {
          id: _id,
        },
      }),
      invalidatesTags: (result, err, { _id: id }) => [{ type: 'User', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
