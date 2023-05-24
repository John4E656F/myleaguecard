import axios from 'axios';
import { calcWinrate } from './calcWinrate';

export const fetchData = async ({ summoner, setSummoner, tierImages, data, setData }) => {
  try {
    const response = await axios.get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/FURAyu?api_key=${import.meta.env.VITE_API}`);
    setSummoner(response.data);
    console.log(response.data);
    const id = response.data.id;
    const leagueData = await axios.get(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${id}?api_key=${import.meta.env.VITE_API}`);
    console.log(leagueData.data[0]);
    const tier = leagueData.data[0].tier;
    const winrate = calcWinrate(leagueData.data[0].wins, leagueData.data[0].losses);
    if (tierImages[tier]) {
      const rankData = {
        tier: tier,
        tierImage: tierImages[tier],
        rank: leagueData.data[0].rank,
        wins: leagueData.data[0].wins,
        losses: leagueData.data[0].losses,
        lp: leagueData.data[0].leaguePoints,
        winrate: winrate,
      };
      setData(rankData);
    }
  } catch (error) {
    console.error('There was an error!', error);
  }
};
