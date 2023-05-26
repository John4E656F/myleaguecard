import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getChampionImages from '../helper/getChampionsImages';
import { useLazyGetUserQuery, useLazyGetSummonerQuery } from '../services/riot';
import { useGetChampionsListQuery } from '../services/dragon';
import championimages from './championimages.json';

const UserInput = ({ setselectedBackground }) => {
  const dispatch = useDispatch();
  const { user, summoner } = useSelector((state) => state.card);
  const [username, setUsername] = useState('');
  const [selectedChampion, setSelectedChampion] = useState('');
  const [skinList, setSkinList] = useState();
  const [selectedSkin, setSelectedSkin] = useState();

  const [fetchUser, { data: userData, isLoading: userLoading, isError: userError, error: userErrorObj, isSuccess: userSuccess }] =
    useLazyGetUserQuery();
  const [
    fetchSummoner,
    { data: summonerData, isLoading: summonerLoading, isError: summonerError, error: summonerErrorObj, isSuccess: summonerSuccess },
  ] = useLazyGetSummonerQuery();

  const {
    data: championsList,
    isLoading: championsListLoading,
    isError: championsListError,
    error: championsListErrorObj,
    isSuccess: championsListSuccess,
  } = useGetChampionsListQuery();

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeChampion = (event) => {
    const name = event.target.value;
    const key = event.target.keyid;
    const images = event.target.images;
    setSelectedChampion({ name: name, key: key, images: images });
  };
  const handleChangeSkin = (event) => {
    const selectElement = event.target;
    const selectedOption = selectElement.options[selectElement.selectedIndex];
    const id = selectedOption.value;
    const path = selectedOption.getAttribute('path');
    setselectedBackground(path);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUser(username);
    setUsername('');
  };

  useEffect(() => {
    // console.log(championimages);
    // if (championsListSuccess || championsListError) {
    //   console.log(championsList);
    //   console.log(championsListError);
    // }
    if (selectedChampion) {
      console.log(selectedChampion);
      console.log(championimages);
      setSkinList(getChampionImages(selectedChampion, championimages));
    }
  }, [userSuccess, userError, selectedChampion]);

  useEffect(() => {
    if (userSuccess && userData) {
      fetchSummoner(userData.id);
    }
  }, [userSuccess, userData]);

  useEffect(() => {
    if (userSuccess || userError || summonerSuccess || summonerError) {
      console.log(summoner);
      console.log(user);
    }
  }, [userSuccess, userError]);

  return (
    <div className='userInputContainer'>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type='text' name='username' value={username} onChange={handleChangeUsername} />
        </label>
        <input type='submit' value='Submit' />
      </form>
      {championsList && !championsListLoading && !championsListError && (
        <label>
          Champion:
          <select value={selectedChampion.name} onChange={handleChangeChampion}>
            <option value=''>--Please select a champion--</option>
            {Object.values(championsList.data).map((champion) => (
              <option key={champion.id} value={champion.id} keyid={champion.key} images={champion.image.full}>
                {champion.name}
              </option>
            ))}
          </select>
        </label>
      )}
      {skinList && (
        <label>
          Champion:
          <select value={selectedSkin} onChange={handleChangeSkin}>
            <option value=''>--Please select a skin--</option>
            {skinList.map((skin) => (
              <option key={skin.id} value={skin.id} path={skin.path}>
                {skin.name}
              </option>
            ))}
          </select>
        </label>
      )}
    </div>
  );
};

export default UserInput;
