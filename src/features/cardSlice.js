import { createSlice } from '@reduxjs/toolkit';
import { riotApi } from '../services/riot';

const initialState = {
  user: {},
  summoner: {},
  username: '',
  age: 18,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setUsername: (state, { payload }) => {
      state.username = payload.username;
    },
    setUserAge: (state, { payload }) => {
      state.age = payload.age;
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

export const { setUsername, setUserAge } = cardSlice.actions;
