import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLazyGetUserQuery, useLazyGetSummonerQuery } from '../services/riot';

const UserInput = () => {
  const dispatch = useDispatch();
  const { user, summoner } = useSelector((state) => state.card);
  const [username, setUsername] = useState('');

  const [fetchUser, { data: userData, isLoading: userLoading, isError: userError, error: userErrorObj, isSuccess: userSuccess }] =
    useLazyGetUserQuery();
  const [
    fetchSummoner,
    { data: summonerData, isLoading: summonerLoading, isError: summonerError, error: summonerErrorObj, isSuccess: summonerSuccess },
  ] = useLazyGetSummonerQuery();

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      fetchUser(username);
      setUsername('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  useEffect(() => {
    if (userSuccess && userData) {
      fetchSummoner(userData.id);
    }
  }, [userSuccess, userData]);

  useEffect(() => {
    if (userSuccess || userError || summonerSuccess || summonerError) {
      // fetchSummoner(userData.id);
      console.log(summoner);
      console.log(user);
    }
  }, [userSuccess, userError]);

  return (
    <div className='userInputContainer'>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type='text' name='username' value={username} onChange={handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

export default UserInput;
