import { createSlice } from '@reduxjs/toolkit';

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
});

export default cardSlice.reducer;

export const { setUser } = cardSlice.actions;
