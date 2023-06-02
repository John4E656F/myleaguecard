import { useState, useEffect } from 'react';
import '../assets/css/Card.css';
import '../assets/css/UserInput.css';
import UserInput from '../components/UserInput';
import Card from '../components/Card';

function CreateCard() {
  const [backgroundImage, setBackgroundImage] = useState('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_1.jpg');
  const [selectedBackground, setselectedBackground] = useState();
  const [data, setData] = useState();

  useEffect(() => {
    console.log(selectedBackground);
  }, [selectedBackground]);

  return (
    <>
      <div className='inputContainer'>
        <h1 className='header'>
          <span className='bigSpan'>
            Craft your gaming card! <br />{' '}
          </span>
          Showcase your prowess, share it on social media, and connect with gamers. <br /> Let the games begin!
        </h1>
        <UserInput data={data} setData={setData} setselectedBackground={setselectedBackground} />
      </div>
      <div className='cardContainer'>
        <Card backgroundImage={backgroundImage} selectedBackground={selectedBackground} data={data} />
      </div>
    </>
  );
}

export default CreateCard;
