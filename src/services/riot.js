import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const key = import.meta.env.VITE_API;

export const riotApi = createApi({
  reducerPath: 'riotApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://euw1.api.riotgames.com/` }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (username) => {
        return {
          url: `lol/summoner/v4/summoners/by-name/${username}?api_key=${key}`,
        };
      },
    }),
    getSummoner: builder.query({
      query: (id) => {
        return {
          url: `lol/league/v4/entries/by-summoner/${id}?api_key=${key}`,
        };
      },
    }),
    getChampionMastery: builder.query({
      query: (id) => {
        return {
          url: `lol/champion-mastery/v4/champion-masteries/by-summoner/${id}?api_key=${key}`,
        };
      },
    }),
  }),
});

export const { useGetUserQuery, useLazyGetUserQuery, useGetSummonerQuery, useLazyGetSummonerQuery, useLazyGetChampionMasteryQuery } = riotApi;
