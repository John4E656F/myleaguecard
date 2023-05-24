import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const key = import.meta.env.VITE_API;

export const riotApi = createApi({
  reducerPath: 'riotApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/` }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => {
        return {
          url: `${username}?api_key=${key}`,
        };
      },
      async onQueryStarted({ dispatch, queryFulfilled }) {
        try {
          const data = await queryFulfilled;
          console.log(data);
        } catch (e) {
          console.log(e);
        }
      },
    }),
  }),
});

export const { useGetUserQuery } = riotApi;
