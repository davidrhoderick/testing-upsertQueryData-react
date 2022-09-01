import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import count from './countSlice';
// import {createWrapper, Context, HYDRATE} from 'next-redux-wrapper';

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    count,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export const makeStore = () => store;
