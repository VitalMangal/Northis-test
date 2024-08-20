import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Response, QueryParams } from '../types';

const url = 'https://api.github.com/search/repositories';

export const repositoriesApi = createApi({
  reducerPath: 'repositories',
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getRepositories: builder.query<Response, QueryParams>({
      query: ({ q, per_page, page, sort, order }) => ({
        url: '',
        params: { q, per_page, page, sort, order },
        headers: { "Accept": 'application/vnd.github+json' },
      }),
    }),
  }),
});

export const {
  useGetRepositoriesQuery,
} = repositoriesApi;
