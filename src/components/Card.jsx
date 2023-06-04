import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { calcWinrate } from '../helper/calcWinrate';
import { top, jungle, mid, bot, support, fill } from '../assets/roles/roles';
import { IRON, BRONZE, SILVER, GOLD, PLATINUM, DIAMOND, MASTER, GRANDMASTER, CHALLENGER } from '../assets/ranks/ranks';
import * as Backgrounds from './index';

import DiscordIcon from '../assets/socials/DiscordIcon.svg';
import TwitchIcon from '../assets/socials/TwitchIcon.svg';

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
  const { user, summoner, championBg, age, championMastery, description, discord, twitch } = useSelector((state) => state.card);
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
    if (championBg) {
      if (championBg in Backgrounds) {
        setDisplayBG(Backgrounds[championBg]);
      }
    }
  }, [championBg, backgroundImage]);

  useEffect(() => {
    console.log(displayBG);
    console.log(user);
  }, [displayBG, user, description]);

  return (
    <>
      {summoner && Object.keys(user).length > 0 ? (
        <div className='card'>
          <div
            className='background'
            style={{
              zIndex: 1,
              backgroundImage: `url(${championBg ? displayBG : backgroundImage})`,
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
              <div className='championMasteryContainer'>
                <h3 className='detailsHeading'>Champion Mastery:</h3>
                <div className='championMasteryDetails'>
                  {championMastery
                    ? championMastery.map((champion, index) => (
                        <div className='cmDetailsContainer' key={index}>
                          <img className='tilesAssets' src={champion.tiles} alt={champion.name} />
                          <p className='infoData'>{champion.name}</p>
                          <p>
                            <span className='infoName'>Level:</span> <span className='infoData'>{champion.championLevel}</span>
                          </p>
                          <p>
                            <span className='infoName'>Points:</span> <span className='infoData'>{champion.championPoints}</span>
                          </p>
                        </div>
                      ))
                    : [...Array(3)].map((_, i) => (
                        <div key={i} className='cmDetailsContainer'>
                          <div className='skeletonCMImage' />
                          <div className='skeletonCMName' />
                          <div className='skeletonCMLevel' />
                          <div className='skeletonCMPoints' />
                        </div>
                      ))}
                </div>
              </div>
              <div className='divider v2' />
              <div className='userDetails'>
                <h3 className='detailsHeading'>About me:</h3>
                <p>
                  <span className='infoName'>Age:</span> <span className='infoData'>{age}</span>
                </p>
                <p>
                  <span className='infoName'>Description:</span>{' '}
                  <span className='infoData description'>
                    {description
                      ? description
                      : `Highly active League of Legends player seeking fellow summoners to share in the thrill of victory on the rift. All levels welcome. Let's make memories!`}
                  </span>
                </p>
              </div>
            </div>
            <div className='socialContainer'>
              {discord.trim() !== '' && (
                <div className='socialIcons'>
                  <img className='socialIcon' src={DiscordIcon} alt='Discord' />
                  <p className='socialUsername'>{discord}</p>
                </div>
              )}
              {twitch.trim() !== '' && (
                <div className='socialIcons'>
                  <img className='socialIcon' src={TwitchIcon} alt='Discord' />
                  <p className='socialUsername'>{twitch}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className='skeletonCard'>
          <div className='skeletonHeader'>
            <div className='skeletonTitle' />
            <div className='skeletonPositionIcon' />
          </div>
          <div className='skeletonDivider' />
          <div className='skeletonDetails'>
            <div className='skeletonRank' />
            <div className='skeletonRankIcon' />
          </div>
          <div className='skeletonDivider sv1' />
          <div className='skeletonExtraDetails'>
            <div className='skeletonUserInfo' />
            {
              <div className='skeletonCMContainer'>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className='skeletonCMDetails'>
                    <div className='skeletonCMImage' />
                    <div className='skeletonCMName' />
                    <div className='skeletonCMLevel' />
                    <div className='skeletonCMPoints' />
                  </div>
                ))}
              </div>
            }
          </div>
          <div className='skeletonDivider sv2' />
        </div>
      )}
    </>
  );
}

export default Card;
