export default function compareChampions(championsArray, championsObject, tilesAssets) {
  let matchedChampions = [];

  // Iterate over each championId in the array, starting from the beginning
  for (let i = 0; i < championsArray.length; i++) {
    const championData = championsArray[i];
    const championId = championData.championId;

    // Iterate over each champion in the object
    for (const champion in championsObject) {
      // If the championId matches the key, add the champion to the matchedChampions array
      if (championsObject[champion].key === String(championId)) {
        matchedChampions.push({
          key: championsObject[champion].key,
          name: championsObject[champion].id,
          tiles: tilesAssets[championsObject[champion].id],
          championLevel: championData.championLevel,
          championPoints: championData.championPoints,
        });
        break;
      }
    }

    // If we have found five matched champions, stop searching
    if (matchedChampions.length === 3) {
      break;
    }
  }

  return matchedChampions;
}
