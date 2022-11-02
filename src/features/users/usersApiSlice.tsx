import { apiSlice } from '../../app/api/apiSlice';
import { INewUser, IUser, IUserApiResponse, IUserUpdate } from './usersTypes';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], null>({
      query: () => '/users',
      transformResponse: (response: IUserApiResponse[]) =>
        response?.map(({ _id, ...props }) => ({
          id: _id,
          ...props,
        })),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'User' as const,
                id,
              })),
              { type: 'User', id: 'LIST' },
            ]
          : [{ type: 'User', id: 'LIST' }],
    }),
    getUserById: builder.query<IUser, IUser['id']>({
      query: (id) => `/users/${id}`,
      keepUnusedDataFor: 0,
      transformResponse: ({ _id, ...props }: IUserApiResponse) => ({
        id: _id,
        ...props,
      }),
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
      invalidatesTags: (result, err, { id }) => [{ type: 'User', id }],
    }),
    deleteUser: builder.mutation<void, IUser['id']>({
      query: (id) => ({
        url: '/users',
        method: 'DELETE',
        body: {
          id,
        },
      }),
      invalidatesTags: (result, err, id) => [{ type: 'User', id }],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApiSlice;
