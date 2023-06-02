import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calcWinrate } from '../helper/calcWinrate';
import { top, jungle, mid, bot, support, fill } from '../assets/roles/roles';
import { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER } from '../assets/ranks/ranks';
import * as Backgrounds from './index';

const roleImages = {
  top: { name: 'top', assets: top },
  jungle: { name: 'jungle', assets: jungle },
  mid: { name: 'mid', assets: mid },
  bot: { name: 'bot', assets: bot },
  support: { name: 'support', assets: support },
  fill: { name: 'fill', assets: fill },
};
const tierImages = { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER };

function Card({ backgroundImage, selectedBackground }) {
  const { user, summoner, age } = useSelector((state) => state.card);
  const [displayBG, setDisplayBG] = useState();
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
  }, [user, summoner]);

  useEffect(() => {
    if (selectedBackground) {
      let userSelectedBackground = selectedBackground.split('/').pop().split('.')[0];
      if (userSelectedBackground in Backgrounds) {
        setDisplayBG(Backgrounds[userSelectedBackground]);
      }
    }
  }, [selectedBackground, backgroundImage]);

  useEffect(() => {
    console.log(displayBG);
    console.log(user);
  }, [displayBG, user]);

  return (
    <>
      {summoner ? (
        <div className='card'>
          <div
            className='background'
            style={{
              zIndex: 1,
              backgroundImage: `url(${selectedBackground ? displayBG : backgroundImage})`,
            }}
          >
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
                      <h3 className='detailsHeading'>My League Stats:</h3>
                      <p className='infoText'>
                        <span className='infoName'>League Point: </span> <span className='infoData'> {summoner[0].leaguePoints}</span>
                      </p>
                      <div className='elo'>
                        <p className='infoText'>
                          <span className='infoName'>Wins: </span> <span className='infoData'>{summoner[0].wins}</span>
                        </p>
                        <p className='infoText'>
                          <span className='infoName'>Losses: </span> <span className='infoData'>{summoner[0].losses}</span>
                        </p>
                      </div>
                      <p className='infoText'>
                        <span className='infoName'>Winrate: </span> <span className='infoData'>{winrate}%</span>
                      </p>
                    </div>
                    <img src={tierImage} alt={summoner[0].tier} className='tier' />
                  </>
                ) : (
                  <div className='eloDetails'>
                    <p className='infoText'>
                      <span className='infoName'>League Point: </span> <span className='infoData'> 0 </span>
                    </p>
                    <div className='elo'>
                      <p className='infoText'>
                        <span className='infoName'>Wins: </span> <span className='infoData'> 0 </span>
                      </p>
                      <p className='infoText'>
                        <span className='infoName'>Losses: </span>
                        <span className='infoData'> 0 </span>
                      </p>
                    </div>
                    <p className='infoText'>
                      <span className='infoName'>Winrate: </span> <span className='infoData'>0%</span>
                    </p>
                  </div>
                )}
              </div>
              <div className='divider v1' />
              <div className='championMasteryDetails'>
                <h3 className='detailsHeading'>Champion Mastery:</h3>
              </div>
              <div className='divider v1' />
              <div className='userDetails'>
                <h3 className='detailsHeading'>About me:</h3>
                Age: {age}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className='skeletonCard'>
          <div className='skeletonHeader'>
            <div className='skeletonTitle' />
            <div className='skeletonPositionIcon' />
          </div>
          <div className='skeletonDetails'>
            <div className='skeletonRank' />
            <div className='skeletonRankIcon' />
          </div>
          <div className='skeletonExtraDetails'>
            <div className='skeletonUserInfo'>
              <div className='skeletonAge' />
              <div className='skeletonUsualPlayTime' />
            </div>
            <div className='skeletonSocial'>
              <div className='skeletonHolder'>
                <div className='skeletonHolderIcon' />
                <div className='skeletonHolderName' />
              </div>
              <div className='skeletonHolder'>
                <div className='skeletonHolderIcon' />
                <div className='skeletonHolderName' />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Card;
