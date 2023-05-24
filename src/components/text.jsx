import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SummonerInfo() {
  const [backgroundImage, setBackgroundImage] = useState('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Jinx_1.jpg');
  const [summoner, setSummoner] = useState(null);
  const [data, setData] = useState({ position: 'jungle' });

  useEffect(() => {
    axios
      .get(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/neogenesis49?api_key=${import.meta.env.VITE_API}`)
      .then((response) => {
        setSummoner(response.data);
        console.log(data.position);
        console.log(summoner);
      })
      .catch((error) => {
        console.error('There was an error!', error);
      });
  }, []);

  return (
    <div className='card'>
      <div
        className='background'
        style={{
          zIndex: 1,
          backgroundImage: `url(${backgroundImage})`,
        }}
      >
        <div className='overlay'>
          <div className='details'>
            {summoner ? (
              <>
                <div className='flex gap-5'>
                  <h1 className='username'>{summoner.name}</h1>
                  <h2>no show</h2>
                </div>
                <div className='divider' />
                <h2>show </h2>
                <p>Level: {summoner.summonerLevel}</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummonerInfo;
