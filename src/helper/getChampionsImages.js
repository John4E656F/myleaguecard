export default function getChampionImages(championName, championsListImages) {
  const name = championName.name;
  let result = championsListImages[name];
  return result;
}
