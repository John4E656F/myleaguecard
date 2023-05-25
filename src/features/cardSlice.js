import { createSlice } from '@reduxjs/toolkit';
import { riotApi } from '../services/riot';

const initialState = {
  user: {},
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(riotApi.endpoints.getUser.matchFulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addMatcher(riotApi.endpoints.getSummoner.matchFulfilled, (state, action) => {
        state.summoner = action.payload;
      });
  },
});

export default cardSlice.reducer;

export const { setUser } = cardSlice.actions;
