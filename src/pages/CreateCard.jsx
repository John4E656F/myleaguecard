import { useState, useEffect } from 'react';
import '../assets/css/Card.css';
import '../assets/css/UserInput.css';
import UserInput from '../components/UserInput';
import Card from '../components/Card';
import { fetchData } from '../helper/fetch';
import { top, jungle, mid, bot, support, fill } from '../assets/roles/roles';
import { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER } from '../assets/ranks/ranks';

const roleImages = {
  top: { name: 'top', assets: top },
  jungle: { name: 'jungle', assets: jungle },
  mid: { name: 'mid', assets: mid },
  bot: { name: 'bot', assets: bot },
  support: { name: 'support', assets: support },
  fill: { name: 'fill', assets: fill },
};
const tierImages = { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER };

function CreateCard() {
  const [backgroundImage, setBackgroundImage] = useState('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_1.jpg');
  const [summoner, setSummoner] = useState(null);
  const [data, setData] = useState();
  const [userInput, setUserInput] = useState();

  useEffect(() => {
    fetchData({ summoner, setSummoner, tierImages, data, setData });
  }, []);

  return (
    <>
      <div className='inputContainer'>
        <UserInput userInput={userInput} setUserInput={setUserInput} />
      </div>
      <div className='cardContainer'>
        <Card backgroundImage={backgroundImage} summoner={summoner} data={data} roleImages={roleImages} />
      </div>
    </>
  );
}

export default CreateCard;
