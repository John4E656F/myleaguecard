import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserQuery } from '../services/riot';

const UserInput = ({ userInput, setUserInput }) => {
  const user = useSelector((state) => state.user);
  const [username, setUsername] = useState('');
  const { getUser, isLoading, isError, error, isSuccess } = useGetUserQuery(username);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(username);
    getUser;
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUsername(value);
    setUserInput({ ...userInput, [name]: value });
  };
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
