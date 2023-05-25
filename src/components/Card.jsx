import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calcWinrate } from '../helper/calcWinrate';
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

function Card({ backgroundImage }) {
  const { user, summoner } = useSelector((state) => state.card);
  const [winrate, setWinrate] = useState(null);
  const [tierImage, setTierImage] = useState(null);

  useEffect(() => {
    if (Array.isArray(summoner) && summoner.length > 0) {
      setWinrate(calcWinrate(summoner[0].wins, summoner[0].losses));
      const tier = summoner[0].tier;
      if (tierImages[tier]) {
        setTierImage(tierImages[tier]);
      }
    }

    console.log(user);
  }, [user, summoner]);

  return (
    <>
      {summoner ? (
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
                <div className='cardHeader'>
                  <h1 className='username'>{user.name}</h1>
                  <img src={roleImages.fill.assets} alt={roleImages.fill.name} className='rank' />
                </div>
                <div className='divider' />
                <div className='rankDetails'>
                  {Array.isArray(summoner) && summoner.length > 0 ? (
                    <>
                      <div className='eloDetails'>
                        <p>League Point: {summoner[0].leaguePoints}</p>
                        <div className='elo'>
                          <p>Wins: {summoner[0].wins}</p>
                          <p>Losses: {summoner[0].losses}</p>
                        </div>
                        <p>Winrate: {winrate}%</p>
                      </div>
                      <img src={tierImage} alt={summoner[0].tier} className='tier' />
                    </>
                  ) : (
                    <div className='eloDetails'>
                      <p>League Point: NaN</p>
                      <div className='elo'>
                        <p>Wins: NaN</p>
                        <p>Losses: Nan</p>
                      </div>
                      <p>Winrate: 0%</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default Card;
