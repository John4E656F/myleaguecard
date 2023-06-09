import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyGetUserQuery, useLazyGetSummonerQuery, useLazyGetChampionMasteryQuery } from '../services/riot';
import { useGetChampionsListQuery } from '../services/dragon';
import { setUsername, setChampionsMastery, setChampionBg, setUserAge, setUserDescription, setDiscord, setTwitch } from '../features/cardSlice';
import * as championtiles from './tilesAssets';
import * as htmlToImage from 'html-to-image';
import { saveAs } from 'file-saver';

import compareChampions from '../helper/compareChampions';

const UserInput = () => {
  const dispatch = useDispatch();
  const { user, age, description, discord, twitch } = useSelector((state) => state.card);
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
    dispatch(setChampionBg(name));
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

  const handleDescriptionChange = (event) => {
    dispatch(setUserDescription({ description: event.target.value }));
  };

  const handleSocialChange = (event) => {
    const social = event.target.name;
    if (social === 'discord') {
      dispatch(setDiscord({ discord: event.target.value }));
    } else if (social === 'twitch') {
      dispatch(setTwitch({ twitch: event.target.value }));
    }
  };

  const downloadImage = async () => {
    const node = document.getElementsByClassName('card')[0]; // change this to your card's classname
    const dataUrl = await htmlToImage.toPng(node);
    saveAs(dataUrl, 'card.png');
  };

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
                <option key={champion.id} value={champion.id}>
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
      <label htmlFor='description'>Description:</label>
      <textarea
        id='description'
        value={description ? description : ''}
        onChange={handleDescriptionChange}
        maxLength='130'
        rows={3}
        cols={30}
        style={{ resize: 'none', borderRadius: '0.2em' }}
        placeholder=' Enter your description here'
      />
      <p style={{ fontSize: '0.8em', color: 'gray' }}>Description has 130-character limit. Character count: {description ? description.length : 0}</p>
      <label className='socialInput'>
        Discord:
        <input className='socialData' type='text' name='discord' value={discord} onChange={handleSocialChange} minLength={2} maxLength={32} />
      </label>
      <label className='socialInput'>
        Twitch:
        <input className='socialData' type='text' name='twitch' value={twitch} onChange={handleSocialChange} minLength={4} maxLength={25} />
      </label>
      {Object.keys(user).length > 0 ? (
        <button className='downloadButton' onClick={downloadImage}>
          Download Card
        </button>
      ) : null}
    </div>
  );
};

export default UserInput;
