export const calcWinrate = (wins, losses) => {
  let totalGames = wins + losses;
  let winRate = (wins / totalGames) * 100;
  return winRate.toFixed(2);
};
