import { createSlice } from '@reduxjs/toolkit';
import { riotApi } from '../services/riot';

const initialState = {
  user: {},
  summoner: {},
  username: '',
  championMastery: null,
  age: 18,
  description: null,
};

export const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setUsername: (state, { payload }) => {
      state.username = payload.username;
    },
    setChampionsMastery: (state, { payload }) => {
      state.championMastery = payload;
    },
    setUserAge: (state, { payload }) => {
      state.age = payload.age;
    },
    setUserDescription: (state, { payload }) => {
      state.description = payload.description;
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

export const { setUsername, setChampionsMastery, setUserAge, setUserDescription } = cardSlice.actions;
