import { createSlice } from '@reduxjs/toolkit';
import { riotApi } from '../services/riot';

const initialState = {
  user: {},
  summoner: {},
  username: '',
  age: 18,
  championMastery: null,
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
    setChampionsMastery: (state, { payload }) => {
      state.championMastery = payload;
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

export const { setUsername, setUserAge, setChampionsMastery } = cardSlice.actions;
