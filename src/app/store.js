import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import cardReducer from '../features/cardSlice';
import { riotApi } from '../services/riot';
import { dragonApi } from '../services/dragon';

export const store = configureStore({
  reducer: {
    card: cardReducer,
    [riotApi.reducerPath]: riotApi.reducer,
    [dragonApi.reducerPath]: dragonApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(riotApi.middleware, dragonApi.middleware),
});

setupListeners(store.dispatch);
