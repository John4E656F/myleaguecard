export default function compareChampions(championsArray, championsObject) {
  console.log(championsArray);
  console.log(championsObject);
  let matchedChampions = [];

  // Iterate over each championId in the array, starting from the beginning
  for (let i = 0; i < championsArray.length; i++) {
    const championId = championsArray[i].championId;

    // Iterate over each champion in the object
    for (const champion in championsObject) {
      // If the championId matches the key, add the champion to the matchedChampions array
      if (championsObject[champion].key === String(championId)) {
        matchedChampions.push(championsObject[champion]);
        break;
      }
    }

    // If we have found five matched champions, stop searching
    if (matchedChampions.length === 5) {
      break;
    }
  }

  return matchedChampions;
}
