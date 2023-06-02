import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getChampionImages from '../helper/getChampionsImages';
import { useLazyGetUserQuery, useLazyGetSummonerQuery, useLazyGetChampionMasteryQuery } from '../services/riot';
import { useGetChampionsListQuery } from '../services/dragon';
import { setUsername, setUserAge, setChampionsMastery } from '../features/cardSlice';
import * as championimages from './index';
import * as championtiles from './tilesAssets';

import compareChampions from '../helper/compareChampions';

const UserInput = ({ setselectedBackground }) => {
  const dispatch = useDispatch();
  const { user, summoner, age } = useSelector((state) => state.card);
  const [userName, setUserName] = useState('');

  const [selectedChampion, setSelectedChampion] = useState('');

  const [fetchUser, { data: userData, isLoading: userLoading, isError: userError, error: userErrorObj, isSuccess: userSuccess }] =
    useLazyGetUserQuery();
  const [
    fetchSummoner,
    { data: summonerData, isLoading: summonerLoading, isError: summonerError, error: summonerErrorObj, isSuccess: summonerSuccess },
  ] = useLazyGetSummonerQuery();

  const [
    fetchChampionMastery,
    {
      data: championMasteryData,
      isLoading: championMasteryLoading,
      isError: championMasteryError,
      error: championMasteryErrorObj,
      isSuccess: championMasterySuccess,
    },
  ] = useLazyGetChampionMasteryQuery();

  const {
    data: championsList,
    isLoading: championsListLoading,
    isError: championsListError,
    error: championsListErrorObj,
    isSuccess: championsListSuccess,
  } = useGetChampionsListQuery();

  const handleChangeUsername = (event) => {
    setUserName(event.target.value);
  };

  const handleChangeChampion = (event) => {
    const name = event.target.value;
    const key = event.target.keyid;
    const images = event.target.images;
    setSelectedChampion({ name: name, key: key, images: images });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchUser(userName);
    dispatch(setUsername({ username: userName }));
  };

  const handleChangeAge = (event) => {
    const age = event.target.value;
    dispatch(setUserAge({ age: age }));
  };

  useEffect(() => {
    if (selectedChampion) {
      setselectedBackground(getChampionImages(selectedChampion, championimages));
    }
  }, [userSuccess, userError, selectedChampion]);

  useEffect(() => {
    if (userSuccess && userData) {
      console.log(userData.id);
      fetchSummoner(userData.id);
      fetchChampionMastery(userData.id).then(({ data }) => {
        console.log(data);
        dispatch(setChampionsMastery(compareChampions(data, championsList.data, championtiles)));
      });
    }
  }, [userSuccess, userData]);

  useEffect(() => {
    console.log(championsList);
  }, [championsList, userData]);

  return (
    <div className='userInputContainer'>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input className='userNameInput' type='text' name='username' value={userName} onChange={handleChangeUsername} />
        </label>
        <input className='submitUsername' type='submit' value='Submit' />
      </form>
      <div className='champAndAgeContainer'>
        {championsList && !championsListLoading && !championsListError && (
          <label className='inputCol'>
            Select your main champion:
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
        <label className='inputCol'>
          Your Age:
          <select value={age} onChange={handleChangeAge}>
            {[...Array(82)].map((_, i) => (
              <option key={i + 18} value={i + 18}>
                {i + 18}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
};

export default UserInput;
