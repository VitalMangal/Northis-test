import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const url = 'https://api.github.com/search/repositories';

//поменять тип
export const repositoriesApi = createApi({
  reducerPath: 'repositories',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getRepositories: builder.query({
      query: ({ q, per_page, page, sort }: any) => ({
        url: '',
        params: {
          q,
          per_page,
          page,
          sort,
        }
      }),
    }),
  }),
});

export const {
  useGetRepositoriesQuery,
} = repositoriesApi;
