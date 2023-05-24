import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import cardReducer from '../features/cardSlice';
import { riotApi } from '../services/riot';

export const store = configureStore({
  reducer: {
    card: cardReducer,
    [riotApi.reducerPath]: riotApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(riotApi.middleware),
});

setupListeners(store.dispatch);
