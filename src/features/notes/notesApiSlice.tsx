import { apiSlice } from '../../app/api/apiSlice';
import { INote } from './notesTypes';

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query<INote[], void>({
      query: () => '/notes',
      keepUnusedDataFor: 5,
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ _id: id }) => ({ type: 'Note' as const, id })),
              { type: 'Note', id: 'LIST' },
            ]
          : [{ type: 'Note', id: 'LIST' }],
    }),
  }),
});

export const { useGetNotesQuery } = notesApiSlice;
