import { configureStore } from '@reduxjs/toolkit';
import { repositoriesApi } from './repositoriesApi.ts';

export const store = configureStore({
  reducer: {
    [repositoriesApi.reducerPath]: repositoriesApi.reducer,
  },
  // поменять тип
  middleware: (getDefaultMiddleware: any) => getDefaultMiddleware()
    .concat(repositoriesApi.middleware)
});
