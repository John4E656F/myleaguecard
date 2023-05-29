import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const dragonApi = createApi({
  reducerPath: 'dragonApi',
  baseQuery: fetchBaseQuery({ baseUrl: `http://ddragon.leagueoflegends.com/cdn/` }),
  endpoints: (builder) => ({
    getChampionsList: builder.query({
      query: () => {
        return {
          url: `12.6.1/data/en_US/champion.json`,
        };
      },
    }),
  }),
});

export const { useGetChampionsListQuery } = dragonApi;
