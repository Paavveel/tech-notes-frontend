import { apiSlice } from '../../app/api/apiSlice';
import { INewNote, INote, INoteApiResponse, INoteUpdate } from './notesTypes';

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<INote[], null>({
      query: () => '/notes',
      transformResponse: (response: INoteApiResponse[]) =>
        response?.map(({ _id, ...props }) => ({
          id: _id,
          ...props,
        })),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({
                type: 'Note' as const,
                id,
              })),
              { type: 'Note', id: 'LIST' },
            ]
          : [{ type: 'Note', id: 'LIST' }],
    }),
    getNoteById: builder.query<INote, INote['id']>({
      query: (id) => `/notes/${id}`,
      keepUnusedDataFor: 0,
      transformResponse: ({ _id, ...props }: INoteApiResponse) => ({
        id: _id,
        ...props,
      }),
    }),
    addNewNote: builder.mutation<void, INewNote>({
      query: (initialNoteData) => ({
        url: '/notes',
        method: 'POST',
        body: {
          ...initialNoteData,
        },
      }),
      invalidatesTags: [{ type: 'Note', id: 'LIST' }],
    }),
    updateNote: builder.mutation<void, INoteUpdate>({
      query: (initialNoteData) => ({
        url: '/notes',
        method: 'PATCH',
        body: {
          ...initialNoteData,
        },
      }),
      invalidatesTags: (result, err, { id }) => [{ type: 'Note', id }],
    }),
    deleteNote: builder.mutation<void, INote['id']>({
      query: (id) => ({
        url: '/notes',
        method: 'DELETE',
        body: {
          id,
        },
      }),
      invalidatesTags: (result, err, id) => [{ type: 'Note', id }],
    }),
  }),
});

export const {
  useGetNotesQuery,
  useGetNoteByIdQuery,
  useAddNewNoteMutation,
  useUpdateNoteMutation,
  useDeleteNoteMutation,
} = notesApiSlice;
