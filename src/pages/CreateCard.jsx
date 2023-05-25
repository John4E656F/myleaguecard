import { useState, useEffect } from 'react';
import '../assets/css/Card.css';
import '../assets/css/UserInput.css';
import UserInput from '../components/UserInput';
import Card from '../components/Card';

function CreateCard() {
  const [backgroundImage, setBackgroundImage] = useState('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_1.jpg');
  const [data, setData] = useState();

  return (
    <>
      <div className='inputContainer'>
        <UserInput data={data} setData={setData} />
      </div>
      <div className='cardContainer'>
        <Card backgroundImage={backgroundImage} data={data} />
      </div>
    </>
  );
}

export default CreateCard;
