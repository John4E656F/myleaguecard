export default function getChampionImages(championName, championsListImages) {
  //   console.log(championName);
  //   console.log(championsListImages);
  const name = championName.name;

  let result = championsListImages.images.filter((obj) => obj.name.toLowerCase().includes(name.toLowerCase()));
  console.log(result);
  return result;
}
