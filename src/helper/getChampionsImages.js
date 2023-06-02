export default function getChampionImages(championName, championsListImages) {
  const name = championName.name;

  let result = championsListImages[name];

  console.log(result);
  return result;
}
