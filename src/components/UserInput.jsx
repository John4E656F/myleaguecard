import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import getChampionImages from '../helper/getChampionsImages';
import { useLazyGetUserQuery, useLazyGetSummonerQuery } from '../services/riot';
import { useGetChampionsListQuery } from '../services/dragon';
import * as championimages from './index';

const UserInput = ({ setselectedBackground }) => {
  const dispatch = useDispatch();
  const { user, summoner } = useSelector((state) => state.card);
  const [username, setUsername] = useState('');
  const [userAge, setUserAge] = useState('18');
  const [userDetails, setUserDetails] = useState();
  const [selectedChampion, setSelectedChampion] = useState('');

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

  const handleChangeAge = (event) => {
    const age = event.target.value;
    setUserAge(age);
    setUserDetails((prevDetails) => ({ ...prevDetails, age: age }));
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
      setselectedBackground(getChampionImages(selectedChampion, championimages));
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
          <input className='userNameInput' type='text' name='username' value={username} onChange={handleChangeUsername} />
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
          <select value={userAge} onChange={handleChangeAge}>
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
