import { configureStore } from '@reduxjs/toolkit';
import { repositoriesApi } from './repositoriesApi.ts';

export const store = configureStore({
  reducer: {
    [repositoriesApi.reducerPath]: repositoriesApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(repositoriesApi.middleware)
});
