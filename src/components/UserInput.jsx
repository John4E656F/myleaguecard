import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserQuery } from '../services/riot';
import { setUser } from '../features/cardSlice';

const UserInput = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { data, isLoading, isError, error, isSuccess } = useGetUserQuery(username, { skip: !isSubmitted });

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const handleChange = (event) => {
    const { value } = event.target;
    setUsername(value);
  };

  if (isSuccess || isError) {
    dispatch(setUser(data));
    setIsSubmitted(false);
    console.log(user);
  }

  return (
    <div className='userInputContainer'>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type='text' name='username' value={username} onChange={handleChange} />
        </label>
        <input type='submit' value='Submit' />
      </form>
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {isSuccess && <div>User Data: {JSON.stringify(data)}</div>}
    </div>
  );
};

export default UserInput;
